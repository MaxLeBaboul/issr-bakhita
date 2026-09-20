"""
cPanel Phusion Passenger WSGI Entry Point for FastAPI
Microservice CMS — ISSR Sainte Joséphine Bakhita
"""

import os
import sys

# Ajouter le répertoire courant au PYTHONPATH
CURRENT_DIR = os.path.dirname(os.path.abspath(__file__))
if CURRENT_DIR not in sys.path:
    sys.path.insert(0, CURRENT_DIR)

try:
    from a2wsgi import ASGIMiddleware
    from main import app

    # Exposer l'application WSGI pour cPanel Phusion Passenger
    application = ASGIMiddleware(app)
except ImportError:
    # Fallback si a2wsgi n'est pas encore installé
    def application(environ, start_response):
        status = '500 Internal Server Error'
        output = b"Erreur cPanel: Veuillez installer 'a2wsgi' via le terminal ou le gestionnaire Python (pip install a2wsgi)."
        response_headers = [('Content-type', 'text/plain; charset=utf-8'),
                            ('Content-Length', str(len(output)))]
        start_response(status, response_headers)
        return [output]
