import { Resend } from 'resend';

const resend = new Resend(process.env.RESEND_API_KEY);

export const sendPasswordResetEmail = async (
  email: string,
  token: string
) => {
  const resetLink = `${process.env.NEXTAUTH_URL}/reset-password?token=${token}`;

  await resend.emails.send({
    from: 'Peblo Notes <onboarding@resend.dev>', // Use a verified domain in production
    to: email,
    subject: 'Reset your Peblo Notes password',
    html: `
      <div style="font-family: sans-serif; max-width: 600px; margin: 0 auto;">
        <h2>Reset your password</h2>
        <p>You requested a password reset for your Peblo Notes account.</p>
        <p>Click the link below to set a new password:</p>
        <div style="margin: 30px 0;">
          <a href="${resetLink}" style="background-color: #f2ca50; color: #131315; padding: 12px 24px; text-decoration: none; border-radius: 4px; font-weight: bold;">
            Reset Password
          </a>
        </div>
        <p>If you didn't request this, you can safely ignore this email.</p>
        <p>The link will expire in 1 hour.</p>
      </div>
    `,
  });
};
