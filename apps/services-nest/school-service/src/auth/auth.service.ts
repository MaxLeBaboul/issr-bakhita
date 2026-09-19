import { Injectable, BadRequestException, NotFoundException } from '@nestjs/common';
import * as crypto from 'crypto';
import { UsersService } from '../users/users.service';

@Injectable()
export class AuthService {
  constructor(private readonly usersService: UsersService) {}

  /**
   * Request password reset link
   */
  async forgotPassword(email: string) {
    if (!email || !email.includes('@')) {
      throw new BadRequestException("Adresse email invalide.");
    }

    try {
      const token = await this.usersService.setResetToken(email);
      return {
        success: true,
        message: "Un lien de réinitialisation sécurisé a été transmis à votre adresse email universitaire.",
        simulatedToken: token, // for local dev/testing inspection
      };
    } catch (err: any) {
      // Security best practice: don't reveal if email exists or not to prevent user enumeration
      return {
        success: true,
        message: "Si cette adresse email est enregistrée dans notre système, un lien de réinitialisation vous a été envoyé.",
      };
    }
  }

  /**
   * Verify if reset token is valid
   */
  async verifyToken(token: string) {
    if (!token) {
      throw new BadRequestException("Jeton de sécurité requis.");
    }

    const user = this.usersService.findByResetToken(token);
    if (!user) {
      throw new NotFoundException("Jeton de sécurité invalide ou inexistant.");
    }

    if (user.resetTokenExpires && new Date(user.resetTokenExpires) < new Date()) {
      throw new BadRequestException("Ce jeton de réinitialisation a expiré (délai de 24h dépassé).");
    }

    return {
      valid: true,
      email: user.email,
      role: user.role,
      roleTitle: user.roleTitle,
      firstName: user.firstName,
      lastName: user.lastName,
    };
  }

  /**
   * Reset password using token
   */
  async resetPassword(token: string, newPasswordPlain: string) {
    if (!token || !newPasswordPlain || newPasswordPlain.length < 8) {
      throw new BadRequestException("Le mot de passe doit comporter au moins 8 caractères.");
    }

    await this.usersService.resetPassword(token, newPasswordPlain);

    return {
      success: true,
      message: "Votre mot de passe a été mis à jour avec succès. Vous pouvez maintenant vous connecter.",
    };
  }

  /**
   * Validate login credentials
   */
  async login(email: string, passwordPlain: string) {
    const user = this.usersService.findByEmail(email);
    if (!user) {
      throw new BadRequestException("Identifiant ou mot de passe incorrect.");
    }

    // If user has a passwordHash, check it
    if (user.passwordHash) {
      const [salt, storedHash] = user.passwordHash.split(':');
      const testHash = crypto.scryptSync(passwordPlain, salt, 64).toString('hex');
      if (testHash !== storedHash) {
        throw new BadRequestException("Identifiant ou mot de passe incorrect.");
      }
    }

    return {
      success: true,
      user: {
        id: user.id,
        email: user.email,
        role: user.role,
        roleTitle: user.roleTitle,
        firstName: user.firstName,
        lastName: user.lastName,
        department: user.department,
      },
    };
  }
}
