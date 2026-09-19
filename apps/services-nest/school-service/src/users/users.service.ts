import { Injectable, BadRequestException, ForbiddenException, NotFoundException } from '@nestjs/common';
import * as crypto from 'crypto';
import { MailService } from '../notifications/mail.service';

export interface UserAccount {
  id: string;
  email: string;
  role: 
    | 'admin'
    | 'directeur'
    | 'secretaire_admin'
    | 'secretaire_acad'
    | 'prefet_etudes'
    | 'econome'
    | 'rep_enseignants'
    | 'enseignants'
    | 'etudiants';
  roleTitle: string;
  firstName: string;
  lastName: string;
  department: string;
  isActive: boolean;
  passwordHash?: string;
  resetToken?: string;
  resetTokenExpires?: string;
  createdAt: string;
  createdBy: string;
}

export interface CreateUserDto {
  email: string;
  role: UserAccount['role'];
  roleTitle?: string;
  firstName: string;
  lastName: string;
  department: string;
}

const ROLE_TITLES: Record<UserAccount['role'], string> = {
  admin: 'Super-Admin (DSI)',
  directeur: "Direction de l'Institut",
  secretaire_admin: 'Secrétariat Administratif',
  secretaire_acad: 'Secrétariat Académique & Examens',
  prefet_etudes: 'Préfecture des Études',
  econome: 'Économat & Intendance',
  rep_enseignants: 'Délégation des Enseignants',
  enseignants: 'Corps Professoral',
  etudiants: 'Espace Étudiant',
};

@Injectable()
export class UsersService {
  private users: UserAccount[] = [
    {
      id: 'usr-admin-01',
      email: 'maxwellbaboula@gmail.com',
      role: 'admin',
      roleTitle: 'Super-Admin (DSI)',
      firstName: 'Maxwell',
      lastName: 'BABOULA',
      department: 'Direction des Systèmes d’Information',
      isActive: true,
      passwordHash: 'bbb4b4be35030d5d2acbe4f83b63e084:e1aca59a50c170b14bde2d66e4a494d550a77307e5f55ec7dbcb6381c337cd81aa51876862a0550e2f7b8a64012d7351f50ed9e5755847f1ff03df84cad4081c', // Admin@Bakhita2026!
      createdAt: '2026-09-01T08:00:00Z',
      createdBy: 'SYSTEM_BOOTSTRAP',
    },
    {
      id: 'usr-admin-02',
      email: 'dsi@issr-bakhita.cm',
      role: 'admin',
      roleTitle: 'Super-Admin (DSI)',
      firstName: 'Gaël Marcel',
      lastName: 'ABANDA',
      department: 'Direction des Systèmes d’Information',
      isActive: true,
      passwordHash: 'bbb4b4be35030d5d2acbe4f83b63e084:e1aca59a50c170b14bde2d66e4a494d550a77307e5f55ec7dbcb6381c337cd81aa51876862a0550e2f7b8a64012d7351f50ed9e5755847f1ff03df84cad4081c', // Admin@Bakhita2026!
      createdAt: '2026-09-01T08:00:00Z',
      createdBy: 'SYSTEM_BOOTSTRAP',
    },
    {
      id: 'usr-dir-01',
      email: 'direction@issr-bakhita.cm',
      role: 'directeur',
      roleTitle: "Direction de l'Institut",
      firstName: 'Patrice',
      lastName: 'MEKANA',
      department: 'Direction Générale',
      isActive: true,
      passwordHash: 'ee9e99d71c4ebaadcb11955a6385065f:709b2e915dcc76dc59c95c535aae4790204372c411283e7c06e64bc1211bc9fa3137e53d09585295b28c38902801003cd1cb4c5ea29096d23c875cf059bdd2f0', // Direction@2026!
      createdAt: '2026-09-01T08:00:00Z',
      createdBy: 'SYSTEM_BOOTSTRAP',
    },
    {
      id: 'usr-secadmin-01',
      email: 'secretariat@issr-bakhita.cm',
      role: 'secretaire_admin',
      roleTitle: 'Secrétariat Administratif',
      firstName: 'Christine',
      lastName: 'NKOLO',
      department: 'Accueil & Admissions',
      isActive: true,
      passwordHash: '882cd66274ef444b56baa99d012819ce:dd28e9728916b3154e2a8df33da7aceeee4385c8c5fed93074fab199448a3763f689648f63159bbe28bff63c109c35843b6268d76a549ac1ad5b4dd24f8e561e', // Secretariat@2026!
      createdAt: '2026-09-01T08:00:00Z',
      createdBy: 'SYSTEM_BOOTSTRAP',
    },
    {
      id: 'usr-secacad-01',
      email: 'scolarite.acad@issr-bakhita.cm',
      role: 'secretaire_acad',
      roleTitle: 'Secrétariat Académique & Examens',
      firstName: 'Jean Claude',
      lastName: 'MEKOULOU',
      department: 'Service de la Scolarité & Examens',
      isActive: true,
      passwordHash: '6c4565ebb85bed2d266842afe7517ff0:db1cf44effd6c5ed13d3f7e2b4c2edda13172d97aac9904d3f3d619f1bb711fa0da1ddb2027405cb132d60dfa9501dfbc393dd6a3a0127fafb3e6209cbb6b839', // Scolarite@2026!
      createdAt: '2026-09-01T08:00:00Z',
      createdBy: 'SYSTEM_BOOTSTRAP',
    },
    {
      id: 'usr-prefet-01',
      email: 'prefet.etudes@issr-bakhita.cm',
      role: 'prefet_etudes',
      roleTitle: 'Préfecture des Études',
      firstName: 'Patience',
      lastName: 'ENGANEMBEN',
      department: 'Direction Académique & Pédagogique',
      isActive: true,
      passwordHash: '2cac7cafef4bf1d0ae596ad566e2b3bd:960934e8666817753a5bf3b311424170e5859bf100a3fab410ec7db6968b3c203828aef219d43d73b6b523bf7ccafa847df2f3c59d7ab792e2112467dc867223', // Prefet@2026!
      createdAt: '2026-09-01T08:00:00Z',
      createdBy: 'SYSTEM_BOOTSTRAP',
    },
    {
      id: 'usr-econome-01',
      email: 'economat@issr-bakhita.cm',
      role: 'econome',
      roleTitle: 'Économat & Intendance',
      firstName: 'Jean-Paul',
      lastName: 'BESSALA',
      department: 'Économat & Intendance',
      isActive: true,
      passwordHash: '2f1058d7e3ac59ec9969808b987c7bff:a98a064dd26dd496bc9991c9ec5027f507a732eb4b665b3b179b908f39913b84ea4eb8d5b9209c0159f9733e72967e0ffac411af12e314a90d0066aa2b100130', // Economat@2026!
      createdAt: '2026-09-01T08:00:00Z',
      createdBy: 'SYSTEM_BOOTSTRAP',
    },
    {
      id: 'usr-repens-01',
      email: 'rep.enseignants@issr-bakhita.cm',
      role: 'rep_enseignants',
      roleTitle: 'Délégation des Enseignants',
      firstName: 'Antoine',
      lastName: 'ESSOMBA',
      department: 'Conseil Pédagogique',
      isActive: true,
      passwordHash: '8d7a45e38f3282db38a8e7ff6a440f63:1bd9618291fadc1aef7256a5c742f1174106494f4e6ced0f8cce7704e18e257f930603fa37149a75c2a28e0d572f7356e8af65ea8fb039c836df37ff3e11c50d', // Delegue@2026!
      createdAt: '2026-09-01T08:00:00Z',
      createdBy: 'SYSTEM_BOOTSTRAP',
    },
    {
      id: 'usr-ens-01',
      email: 't.ndong@issr-bakhita.cm',
      role: 'enseignants',
      roleTitle: 'Corps Professoral',
      firstName: 'Théophile',
      lastName: 'NDONG',
      department: 'Département d’Études Bibliques',
      isActive: true,
      passwordHash: '6d78f287c994271a567e1e82fcfffa77:f9059e60aeb750b6a3a11ceae324824fe0f4440e0840f0be4ec756f250ea8ca89ce53e302970e56d9c8ad71bcb812cffcb98040b208f83bc3c2d5230c0a96654', // Enseignant@2026!
      createdAt: '2026-09-01T08:00:00Z',
      createdBy: 'SYSTEM_BOOTSTRAP',
    },
    {
      id: 'usr-ens-02',
      email: 'enseignant@issr-bakhita.cm',
      role: 'enseignants',
      roleTitle: 'Corps Professoral',
      firstName: 'Théophile',
      lastName: 'NDONG',
      department: 'Département d’Études Bibliques',
      isActive: true,
      passwordHash: '6d78f287c994271a567e1e82fcfffa77:f9059e60aeb750b6a3a11ceae324824fe0f4440e0840f0be4ec756f250ea8ca89ce53e302970e56d9c8ad71bcb812cffcb98040b208f83bc3c2d5230c0a96654', // Enseignant@2026!
      createdAt: '2026-09-01T08:00:00Z',
      createdBy: 'SYSTEM_BOOTSTRAP',
    },
    {
      id: 'usr-etud-01',
      email: 'e.ngoumou@etudiant.issr-bakhita.cm',
      role: 'etudiants',
      roleTitle: 'Espace Étudiant',
      firstName: 'Emmanuel',
      lastName: 'NGOUMOU',
      department: 'Promotion Saint Thomas d’Aquin',
      isActive: true,
      passwordHash: '3e44303b5e2f8bd20e4a29b39862db30:d1aed1cca179dfa5cd43f380f8f8cf6ec6817deba4d953e6a21c247cb2a206eeb85575e4c04d14779e3c63cba7ee6070b624f9150cad96d90999266a4a206afe', // Etudiant@2026!
      createdAt: '2026-09-01T08:00:00Z',
      createdBy: 'SYSTEM_BOOTSTRAP',
    },
    {
      id: 'usr-etud-02',
      email: 'etudiant@issr-bakhita.cm',
      role: 'etudiants',
      roleTitle: 'Espace Étudiant',
      firstName: 'Emmanuel',
      lastName: 'NGOUMOU',
      department: 'Promotion Saint Thomas d’Aquin',
      isActive: true,
      passwordHash: '3e44303b5e2f8bd20e4a29b39862db30:d1aed1cca179dfa5cd43f380f8f8cf6ec6817deba4d953e6a21c247cb2a206eeb85575e4c04d14779e3c63cba7ee6070b624f9150cad96d90999266a4a206afe', // Etudiant@2026!
      createdAt: '2026-09-01T08:00:00Z',
      createdBy: 'SYSTEM_BOOTSTRAP',
    }
  ];

  constructor(private readonly mailService: MailService) {}

  /**
   * Get display title for a role
   */
  getRoleTitle(role: string): string {
    return ROLE_TITLES[role as UserAccount['role']] || role;
  }

  /**
   * List all user accounts
   */
  findAll(): Omit<UserAccount, 'passwordHash' | 'resetToken'>[] {
    return this.users.map(({ passwordHash, resetToken, ...safeUser }) => safeUser);
  }

  /**
   * Find a user by email
   */
  findByEmail(email: string): UserAccount | undefined {
    return this.users.find(u => u.email.toLowerCase() === email.trim().toLowerCase());
  }

  /**
   * Find a user by reset token
   */
  findByResetToken(token: string): UserAccount | undefined {
    return this.users.find(u => u.resetToken === token);
  }

  /**
   * Manually create a user account (strictly restricted to Admin, Directeur, Secrétaire Admin)
   */
  async createUser(dto: CreateUserDto, actorRole: string): Promise<Omit<UserAccount, 'passwordHash' | 'resetToken'>> {
    // 1. Check permissions
    const authorizedRoles = ['admin', 'directeur', 'secretaire_admin'];
    if (!authorizedRoles.includes(actorRole)) {
      throw new ForbiddenException(
        "Accès refusé : Seuls l'Administrateur (DSI), le Directeur et la Secrétaire Administrative sont autorisés à créer des comptes."
      );
    }

    // 2. Check for duplicate email
    const existing = this.findByEmail(dto.email);
    if (existing) {
      throw new BadRequestException(`Un compte existe déjà avec l'adresse email ${dto.email}`);
    }

    // 3. Generate secure reset token for initial password setup (valid 48h)
    const resetToken = crypto.randomBytes(32).toString('hex');
    const resetTokenExpires = new Date(Date.now() + 48 * 3600 * 1000).toISOString();

    const roleTitle = dto.roleTitle || ROLE_TITLES[dto.role] || dto.role;

    const newUser: UserAccount = {
      id: `usr-${Date.now()}`,
      email: dto.email.trim().toLowerCase(),
      role: dto.role,
      roleTitle,
      firstName: dto.firstName.trim(),
      lastName: dto.lastName.trim(),
      department: dto.department.trim(),
      isActive: false, // Activated once user sets their password
      resetToken,
      resetTokenExpires,
      createdAt: new Date().toISOString(),
      createdBy: actorRole,
    };

    this.users.unshift(newUser);

    // 4. Dispatch official email with setup link
    await this.mailService.sendAccountCreatedEmail(
      {
        email: newUser.email,
        firstName: newUser.firstName,
        lastName: newUser.lastName,
        roleTitle: newUser.roleTitle,
        department: newUser.department,
      },
      resetToken
    );

    const { passwordHash, resetToken: _, ...safeUser } = newUser;
    return safeUser;
  }

  /**
   * Set a reset token for forgot password
   */
  async setResetToken(email: string): Promise<string> {
    const user = this.findByEmail(email);
    if (!user) {
      throw new NotFoundException(`Aucun compte institutionnel n'est associé à l'adresse ${email}`);
    }

    const resetToken = crypto.randomBytes(32).toString('hex');
    user.resetToken = resetToken;
    user.resetTokenExpires = new Date(Date.now() + 24 * 3600 * 1000).toISOString(); // 24h

    // Dispatch email
    await this.mailService.sendPasswordResetEmail(user.email, resetToken);

    return resetToken;
  }

  /**
   * Apply password reset
   */
  async resetPassword(token: string, newPasswordPlain: string): Promise<boolean> {
    const user = this.findByResetToken(token);
    if (!user) {
      throw new BadRequestException("Jeton de réinitialisation invalide ou inexistant.");
    }

    if (user.resetTokenExpires && new Date(user.resetTokenExpires) < new Date()) {
      throw new BadRequestException("Le jeton de réinitialisation a expiré. Veuillez refaire une demande.");
    }

    // Hash password with SHA-256 + salt
    const salt = crypto.randomBytes(16).toString('hex');
    const hash = crypto.scryptSync(newPasswordPlain, salt, 64).toString('hex');
    user.passwordHash = `${salt}:${hash}`;
    user.resetToken = undefined;
    user.resetTokenExpires = undefined;
    user.isActive = true;

    console.log(`[USERS_SERVICE] 🔐 Mot de passe mis à jour avec succès pour ${user.email}`);
    return true;
  }
}
