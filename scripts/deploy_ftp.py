#!/usr/bin/env python3
"""
FTP Deployment Script for ISSR Sainte Joséphine Bakhita
Deploys Next.js export from apps/web/out to cPanel public_html
"""

import os
import sys
import ftplib
import time

FTP_HOST = "ftp.issr-bakhita.com"
FTP_USER = "c2690850c"
FTP_PASS = "kqBX5h2eeX4NUnX"
FTP_PORT = 21

LOCAL_OUT_DIR = "/home/likali/Public/issr-bakhita/apps/web/out"

def connect_ftp():
    print(f"Connecting to {FTP_HOST}:{FTP_PORT}...")
    ftp = ftplib.FTP()
    ftp.connect(FTP_HOST, FTP_PORT, timeout=60)
    ftp.login(FTP_USER, FTP_PASS)
    ftp.set_pasv(True)
    return ftp

def ensure_remote_dir(ftp, remote_dir):
    """Recursively ensure that a remote directory exists."""
    parts = [p for p in remote_dir.replace("\\", "/").split("/") if p]
    current = ""
    for part in parts:
        current += "/" + part
        try:
            ftp.cwd(current)
        except ftplib.error_perm:
            try:
                ftp.mkd(current)
                ftp.cwd(current)
            except Exception as e:
                # Might already exist or race condition
                pass

def main():
    if not os.path.isdir(LOCAL_OUT_DIR):
        print(f"Error: {LOCAL_OUT_DIR} does not exist. Run build first.")
        sys.exit(1)

    # Collect all local files to upload
    all_files = []
    for root, dirs, files in os.walk(LOCAL_OUT_DIR):
        for file in files:
            full_path = os.path.join(root, file)
            rel_path = os.path.relpath(full_path, LOCAL_OUT_DIR).replace("\\", "/")
            all_files.append((full_path, rel_path))

    # Explicitly ensure .htaccess is included if present
    htaccess_path = os.path.join(LOCAL_OUT_DIR, ".htaccess")
    if os.path.exists(htaccess_path) and not any(r == ".htaccess" for _, r in all_files):
        all_files.append((htaccess_path, ".htaccess"))

    total_files = len(all_files)
    total_bytes = sum(os.path.getsize(f) for f, _ in all_files)
    print(f"Total files to deploy: {total_files} ({total_bytes / (1024*1024):.2f} MB)")

    ftp = connect_ftp()
    print("✓ Connected to FTP server.")

    # Go to public_html
    ftp.cwd("public_html")
    remote_base = ftp.pwd()
    print(f"Remote working directory: {remote_base}")

    # Backup old WordPress index.php if exists
    pub_files = ftp.nlst()
    if "index.php" in pub_files:
        try:
            print("Backing up old index.php -> index.php.wordpress_bak...")
            try:
                ftp.delete("index.php.wordpress_bak")
            except:
                pass
            ftp.rename("index.php", "index.php.wordpress_bak")
            print("✓ Old index.php renamed safely to index.php.wordpress_bak")
        except Exception as e:
            print(f"Notice: Could not rename index.php ({e})")

    # Start uploading
    print("\n🚀 Starting upload to public_html...")
    start_time = time.time()
    uploaded_bytes = 0

    for idx, (local_path, rel_path) in enumerate(all_files, 1):
        remote_file_dir = os.path.dirname(rel_path)
        file_name = os.path.basename(rel_path)
        file_size = os.path.getsize(local_path)

        # Retry loop for resilience
        success = False
        for attempt in range(3):
            try:
                if remote_file_dir:
                    target_dir = remote_base + "/" + remote_file_dir
                    ensure_remote_dir(ftp, target_dir)
                else:
                    ftp.cwd(remote_base)

                # Fast skip for unchanged static image assets
                if rel_path.startswith("images/"):
                    try:
                        remote_size = ftp.size(file_name)
                        if remote_size == file_size:
                            success = True
                            print(f"[{idx}/{total_files} - {(idx/total_files)*100:5.1f}%] Skipped (identical): {rel_path}")
                            break
                    except:
                        pass

                with open(local_path, "rb") as fp:
                    ftp.storbinary(f"STOR {file_name}", fp)

                success = True
                uploaded_bytes += file_size
                percent = (idx / total_files) * 100
                print(f"[{idx}/{total_files} - {percent:5.1f}%] Uploaded: {rel_path} ({file_size/1024:.1f} KB)")
                break
            except Exception as e:
                print(f"⚠️ Retry {attempt+1}/3 on {rel_path} due to error: {e}")
                time.sleep(2)
                try:
                    ftp.quit()
                except:
                    pass
                ftp = connect_ftp()
                ftp.cwd("public_html")

        if not success:
            print(f"❌ Failed to upload {rel_path} after 3 attempts.")
            sys.exit(1)

    elapsed = time.time() - start_time
    print(f"\n🎉 Deployment completed successfully in {elapsed:.1f} seconds!")
    print(f"Uploaded {total_files} files ({uploaded_bytes / (1024*1024):.2f} MB).")

    # Verify upload of index.html and .htaccess
    ftp.cwd(remote_base)
    verified = ftp.nlst()
    print("\nVerification in public_html:")
    print(" - index.html present:", "index.html" in verified)
    print(" - .htaccess present :", ".htaccess" in verified)
    print(" - _next present     :", "_next" in verified)
    print(" - images present    :", "images" in verified)

    ftp.quit()
    print("\n✓ FTP session closed cleanly.")

if __name__ == "__main__":
    main()
