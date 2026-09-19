import { Injectable } from '@nestjs/common';

export interface EmailLogEntry {
  id: string;
  timestamp: string;
  recipient: string;
  subject: string;
  type: 
    | 'ACCOUNT_CREATED' 
    | 'PASSWORD_RESET' 
    | 'ADMISSION_RECEIVED' 
    | 'ADMISSION_UNDER_REVIEW' 
    | 'ADMISSION_ACCEPTED' 
    | 'ADMISSION_REJECTED';
  status: 'SENT' | 'SIMULATED';
  htmlContent: string;
  plainText: string;
}

@Injectable()
export class MailService {
  private emailLogs: EmailLogEntry[] = [];
  private baseUrl = process.env.FRONTEND_URL || 'http://localhost:3000';

  /**
   * Helper: Wrap content in official ecclesiastical email template
   */
  private wrapTemplate(title: string, contentHtml: string): string {
    return `
<!DOCTYPE html>
<html>
<head>
  <meta charset="utf-8">
  <title>${title}</title>
  <style>
    body { font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Helvetica, Arial, sans-serif; background-color: #f1f5f9; margin: 0; padding: 20px; color: #1e293b; }
    .container { max-width: 620px; margin: 0 auto; background-color: #ffffff; border-radius: 16px; overflow: hidden; border: 1px solid #e2e8f0; box-shadow: 0 10px 25px rgba(0,0,0,0.05); }
    .header { background: linear-gradient(135deg, #0F2A47 0%, #071526 100%); padding: 32px 24px; text-align: center; border-bottom: 4px solid #d97706; }
    .logo-badge { display: inline-block; background: #ffffff; padding: 6px 14px; border-radius: 10px; margin-bottom: 12px; }
    .logo-text { font-size: 16px; font-weight: 800; color: #0F2A47; letter-spacing: 1px; font-family: serif; }
    .header h1 { color: #ffffff; margin: 0 0 6px 0; font-size: 20px; font-weight: 700; font-family: serif; }
    .header p { color: #f59e0b; margin: 0; font-size: 11px; text-transform: uppercase; letter-spacing: 1.5px; font-weight: 600; }
    .content { padding: 32px 28px; line-height: 1.6; font-size: 14px; color: #334155; }
    .button-container { text-align: center; margin: 28px 0; }
    .btn { display: inline-block; background: linear-gradient(135deg, #d97706 0%, #b45309 100%); color: #ffffff !important; text-decoration: none; padding: 13px 28px; border-radius: 10px; font-weight: 700; font-size: 13px; letter-spacing: 0.5px; box-shadow: 0 4px 12px rgba(217, 119, 6, 0.3); }
    .info-box { background-color: #f8fafc; border-left: 4px solid #0F2A47; padding: 14px 18px; border-radius: 0 10px 10px 0; margin: 20px 0; font-size: 13px; }
    .badge { display: inline-block; padding: 4px 10px; border-radius: 6px; font-size: 11px; font-weight: 700; text-transform: uppercase; }
    .badge-gold { background: #fef3c7; color: #92400e; }
    .badge-green { background: #dcfce7; color: #166534; }
    .badge-red { background: #fee2e2; color: #991b1b; }
    .footer { background-color: #0f172a; padding: 22px; text-align: center; font-size: 11px; color: #94a3b8; border-top: 1px solid #1e293b; }
    .footer a { color: #d97706; text-decoration: none; }
  </style>
</head>
<body>
  <div class="container">
    <div class="header">
      <div class="logo-badge">
        <span class="logo-text">ISSR SAINTE BAKHITA</span>
      </div>
      <h1>Institut Supérieur des Sciences Religieuses</h1>
      <p>Rattaché à l'UCAC-ICY • Érection Canonique Rome 2022</p>
    </div>
    <div class="content">
      ${contentHtml}
    </div>
    <div class="footer">
      <p style="margin: 0 0 6px 0;"><strong>ISSR Sainte Joséphine Bakhita</strong> • Campus de Mvolyé, Yaoundé - Cameroun</p>
      <p style="margin: 0;">Secrétariat Général : (+237) 655 16 57 57 / 677 84 57 57 • <a href="https://issr-bakhita.cm">www.issr-bakhita.cm</a></p>
    </div>
  </div>
</body>
</html>
    `;
  }

  /**
   * Record email in audit log
   */
  private recordLog(recipient: string, subject: string, type: EmailLogEntry['type'], htmlContent: string, plainText: string) {
    const entry: EmailLogEntry = {
      id: `mail-${Date.now()}-${Math.floor(Math.random() * 1000)}`,
      timestamp: new Date().toISOString(),
      recipient,
      subject,
      type,
      status: 'SENT',
      htmlContent,
      plainText
    };
    this.emailLogs.unshift(entry);
    console.log(`[MAIL_SERVICE] ✉️ Email sent to <${recipient}> | Subject: "${subject}" | Type: ${type}`);
    return entry;
  }

  /**
   * 1. Send Account Creation Email with Password Setup Link
   */
  async sendAccountCreatedEmail(user: { email: string; firstName: string; lastName: string; roleTitle: string; department: string }, resetToken: string) {
    const setupUrl = `${this.baseUrl}/reset-password?token=${resetToken}&email=${encodeURIComponent(user.email)}`;
    const subject = `[ISSR Bakhita] Création de votre compte institutionnel — Définition de votre mot de passe`;
    
    const contentHtml = `
      <h2 style="color: #0F2A47; margin-top: 0; font-family: serif;">Bienvenue sur le Portail Institutionnel</h2>
      <p>Bonjour <strong>${user.firstName} ${user.lastName}</strong>,</p>
      <p>Un compte utilisateur vient de vous être ouvert manuellement par l'administration de l'ISSR Sainte Joséphine Bakhita pour exercer votre mission au sein de l'établissement.</p>
      
      <div class="info-box">
        <p style="margin: 0 0 6px 0;"><strong>Fonction attribuée :</strong> <span class="badge badge-gold">${user.roleTitle}</span></p>
        <p style="margin: 0 0 6px 0;"><strong>Département / Service :</strong> ${user.department}</p>
        <p style="margin: 0;"><strong>Identifiant de connexion :</strong> <span style="font-family: monospace; font-weight: bold;">${user.email}</span></p>
      </div>

      <p>Pour des impératifs de confidentialité et de sécurité ecclésiale, aucun mot de passe temporaire n'est communiqué en clair. Veuillez cliquer sur le bouton ci-dessous pour choisir votre mot de passe confidentiel personnel :</p>
      
      <div class="button-container">
        <a href="${setupUrl}" class="btn">Définir mon Mot de Passe</a>
      </div>

      <p style="font-size: 12px; color: #64748b;">Ce lien de sécurité est strictement personnel et expirera dans <strong>48 heures</strong>. Si vous n'êtes pas à l'origine de cette demande, veuillez contacter immédiatement le Secrétariat Général.</p>
    `;

    const plainText = `Bonjour ${user.firstName} ${user.lastName},\nVotre compte institutionnel (${user.roleTitle}) a été créé à l'ISSR Bakhita.\nVeuillez définir votre mot de passe en visitant: ${setupUrl}`;
    const fullHtml = this.wrapTemplate(subject, contentHtml);

    return this.recordLog(user.email, subject, 'ACCOUNT_CREATED', fullHtml, plainText);
  }

  /**
   * 2. Send Password Reset Email
   */
  async sendPasswordResetEmail(email: string, resetToken: string) {
    const resetUrl = `${this.baseUrl}/reset-password?token=${resetToken}&email=${encodeURIComponent(email)}`;
    const subject = `[ISSR Bakhita] Réinitialisation de votre mot de passe institutionnel`;

    const contentHtml = `
      <h2 style="color: #0F2A47; margin-top: 0; font-family: serif;">Demande de Réinitialisation d'Accès</h2>
      <p>Bonjour,</p>
      <p>Une demande de réinitialisation de mot de passe a été initiée pour l'identifiant académique : <strong>${email}</strong>.</p>
      
      <div class="button-container">
        <a href="${resetUrl}" class="btn">Réinitialiser mon Mot de Passe</a>
      </div>

      <div class="info-box">
        <p style="margin: 0; font-size: 12px; color: #64748b;">
          <strong>Délai de validité :</strong> Ce lien sécurisé est valable pendant <strong>24 heures</strong>. Passé ce délai, une nouvelle demande sera nécessaire.
        </p>
      </div>

      <p style="font-size: 12px; color: #64748b;">Si vous n'êtes pas à l'origine de cette demande, vous pouvez ignorer cet email en toute sécurité. Vos accès actuels restent inchangés.</p>
    `;

    const plainText = `Demande de réinitialisation pour ${email}.\nCliquez ici pour changer votre mot de passe: ${resetUrl}\nValable 24h.`;
    const fullHtml = this.wrapTemplate(subject, contentHtml);

    return this.recordLog(email, subject, 'PASSWORD_RESET', fullHtml, plainText);
  }

  /**
   * 3. Send Admission Received Email to Student
   */
  async sendAdmissionReceivedEmail(applicant: { firstName: string; lastName: string; email: string; trackingNumber: string; formationTitle: string }) {
    const subject = `[ISSR Bakhita] Accusé de réception de votre dossier #${applicant.trackingNumber}`;

    const contentHtml = `
      <h2 style="color: #0F2A47; margin-top: 0; font-family: serif;">Accusé de Réception de Candidature</h2>
      <p>Chère / Cher <strong>${applicant.firstName} ${applicant.lastName}</strong>,</p>
      <p>Nous vous confirmons la bonne réception de votre dossier de candidature en ligne pour l'année académique 2026-2027.</p>
      
      <div class="info-box">
        <p style="margin: 0 0 6px 0;"><strong>Numéro de suivi académique :</strong> <span style="font-family: monospace; font-size: 15px; font-weight: 800; color: #0F2A47;">${applicant.trackingNumber}</span></p>
        <p style="margin: 0 0 6px 0;"><strong>Filière sollicitée :</strong> ${applicant.formationTitle}</p>
        <p style="margin: 0;"><strong>Statut du dossier :</strong> <span class="badge badge-gold">En Attente de Vérification</span></p>
      </div>

      <p>Vos pièces justificatives et justificatifs académiques sont actuellement enregistrés dans notre système d'information. Vous serez notifié par email à chaque étape de l'instruction de votre dossier.</p>

      <p style="font-size: 12px; color: #64748b;">Conservez précieusement votre numéro de suivi <strong>${applicant.trackingNumber}</strong> pour toute correspondance avec le Secrétariat de l'Institut.</p>
    `;

    const plainText = `Bonjour ${applicant.firstName},\nVotre dossier #${applicant.trackingNumber} pour ${applicant.formationTitle} a bien été reçu. Conservez votre numéro de suivi.`;
    const fullHtml = this.wrapTemplate(subject, contentHtml);

    return this.recordLog(applicant.email, subject, 'ADMISSION_RECEIVED', fullHtml, plainText);
  }

  /**
   * 4. Send Admission Under Review Email to Student
   */
  async sendAdmissionUnderReviewEmail(applicant: { firstName: string; lastName: string; email: string; trackingNumber: string; formationTitle: string }) {
    const subject = `[ISSR Bakhita] Votre dossier #${applicant.trackingNumber} est en cours d'examen académique`;

    const contentHtml = `
      <h2 style="color: #0F2A47; margin-top: 0; font-family: serif;">Mise en Examen de votre Candidature</h2>
      <p>Chère / Cher <strong>${applicant.firstName} ${applicant.lastName}</strong>,</p>
      <p>Votre dossier de candidature référencé <strong>${applicant.trackingNumber}</strong> a passé avec succès l'étape de recevabilité administrative et est désormais transmis à la Commission Académique et Pédagogique.</p>
      
      <div class="info-box">
        <p style="margin: 0 0 6px 0;"><strong>Dossier N° :</strong> ${applicant.trackingNumber}</p>
        <p style="margin: 0 0 6px 0;"><strong>Filière :</strong> ${applicant.formationTitle}</p>
        <p style="margin: 0;"><strong>Étape en cours :</strong> <span class="badge badge-gold">Instruction par le Jury Académique</span></p>
      </div>

      <p>La commission étudie la conformité de vos diplômes antérieurs, l'adéquation de votre projet d'études théologiques et, pour les clercs et religieux, l'autorisation canonique de votre Ordinaire ou Supérieur(e) majeur(e).</p>

      <p>La décision finale validée par la Direction de l'Institut vous sera communiquée dans les prochains jours.</p>
    `;

    const plainText = `Bonjour ${applicant.firstName},\nVotre candidature #${applicant.trackingNumber} est désormais en cours d'examen par la Commission Académique.`;
    const fullHtml = this.wrapTemplate(subject, contentHtml);

    return this.recordLog(applicant.email, subject, 'ADMISSION_UNDER_REVIEW', fullHtml, plainText);
  }

  /**
   * 5. Send Admission Decision Email (ACCEPTED / REJECTED)
   */
  async sendAdmissionDecisionEmail(
    applicant: { firstName: string; lastName: string; email: string; trackingNumber: string; formationTitle: string },
    decision: 'ACCEPTED' | 'REJECTED',
    notes?: string
  ) {
    const isAccepted = decision === 'ACCEPTED';
    const subject = isAccepted
      ? `[ISSR Bakhita] Félicitations ! Votre admission est validée #${applicant.trackingNumber}`
      : `[ISSR Bakhita] Décision concernant votre candidature #${applicant.trackingNumber}`;

    const contentHtml = isAccepted ? `
      <h2 style="color: #166534; margin-top: 0; font-family: serif;">Décision Favorable : Admission Validée</h2>
      <p>Chère / Cher <strong>${applicant.firstName} ${applicant.lastName}</strong>,</p>
      <p>Nous avons l'honneur de vous annoncer que la Direction Générale de l'ISSR Sainte Joséphine Bakhita a validé définitivement votre admission pour l'année académique 2026-2027.</p>
      
      <div class="info-box" style="border-left-color: #166534; background-color: #f0fdf4;">
        <p style="margin: 0 0 6px 0;"><strong>Dossier N° :</strong> ${applicant.trackingNumber}</p>
        <p style="margin: 0 0 6px 0;"><strong>Filière retenue :</strong> <strong>${applicant.formationTitle}</strong></p>
        <p style="margin: 0;"><strong>Statut :</strong> <span class="badge badge-green">ADMIS DÉFINITIF</span></p>
      </div>

      <h3 style="color: #0F2A47; font-size: 14px; margin-top: 20px;">Prochaines Étapes pour Finaliser votre Inscription :</h3>
      <ol style="padding-left: 20px; font-size: 13px; color: #334155;">
        <li style="margin-bottom: 6px;">Paiement des frais de dossier et d'inscription (50 000 FCFA) auprès de l'Économat ou par virement bancaire.</li>
        <li style="margin-bottom: 6px;">Règlement de la 1ère tranche des frais de scolarité avant le début des cours fixé en Octobre 2026.</li>
        <li style="margin-bottom: 6px;">Dépôt des pièces originales certifiées au Secrétariat de l'ISSR (Campus de Mvolyé).</li>
      </ol>

      ${notes ? `<p style="background-color: #fefce8; border: 1px solid #fef08a; padding: 10px; border-radius: 8px; font-size: 12px; color: #854d0e;"><strong>Observation :</strong> ${notes}</p>` : ''}

      <p style="margin-top: 24px;">Toute la communauté académique de Sainte Bakhita vous souhaite la bienvenue au sein de notre institut !</p>
      <p><em>« Se former pour mieux servir ! »</em></p>
    ` : `
      <h2 style="color: #991b1b; margin-top: 0; font-family: serif;">Décision relative à votre Candidature</h2>
      <p>Chère / Cher <strong>${applicant.firstName} ${applicant.lastName}</strong>,</p>
      <p>La commission d'admission de l'ISSR Sainte Joséphine Bakhita a examiné avec une grande attention votre dossier de candidature N° <strong>${applicant.trackingNumber}</strong> pour la filière <em>${applicant.formationTitle}</em>.</p>
      
      <div class="info-box" style="border-left-color: #991b1b; background-color: #fef2f2;">
        <p style="margin: 0 0 6px 0;"><strong>Dossier N° :</strong> ${applicant.trackingNumber}</p>
        <p style="margin: 0;"><strong>Statut :</strong> <span class="badge badge-red">NON RETENU</span></p>
      </div>

      <p>Nous avons le regret de vous informer que votre dossier n'a pas pu être retenu pour la présente session académique en raison des critères de sélection ou du nombre limité de places disponibles.</p>
      
      ${notes ? `<p style="background-color: #f8fafc; border: 1px solid #e2e8f0; padding: 10px; border-radius: 8px; font-size: 12px; color: #475569;"><strong>Motif / Observation :</strong> ${notes}</p>` : ''}

      <p>Nous vous remercions pour l'intérêt que vous portez à notre institut et vous souhaitons une pleine réussite dans vos projets d'études et de formation pastorale.</p>
    `;

    const plainText = isAccepted 
      ? `Félicitations ${applicant.firstName}, votre admission #${applicant.trackingNumber} est validée pour ${applicant.formationTitle}.`
      : `Bonjour ${applicant.firstName}, votre candidature #${applicant.trackingNumber} n'a pas été retenue.`;
    const fullHtml = this.wrapTemplate(subject, contentHtml);

    return this.recordLog(
      applicant.email, 
      subject, 
      isAccepted ? 'ADMISSION_ACCEPTED' : 'ADMISSION_REJECTED', 
      fullHtml, 
      plainText
    );
  }

  /**
   * Get all sent email logs
   */
  getLogs(): EmailLogEntry[] {
    return this.emailLogs;
  }
}
