import { NextResponse } from 'next/server';
import { prisma } from '@/lib/prisma';
import { sendPasswordResetEmail } from '@/lib/email';
import { generatePasswordResetToken } from '@/lib/utils';

export async function POST(req: Request) {
  try {
    const { email } = await req.json();

    if (!email || typeof email !== 'string') {
      return NextResponse.json({ error: 'Invalid email' }, { status: 400 });
    }

    const user = await prisma.user.findUnique({
      where: { email },
    });

    if (!user) {
      // Return 200 even if user doesn't exist to prevent email enumeration
      return NextResponse.json({ success: true });
    }

    // Generate token and expiry (1 hour)
    const { token, expiresAt } = generatePasswordResetToken();

    // Save token
    await prisma.passwordReset.create({
      data: {
        email,
        token,
        expiresAt,
      },
    });

    // Send email (this might fail if Resend is not fully configured, so we log the URL for local testing)
    const resetUrl = `${process.env.NEXTAUTH_URL || 'http://localhost:3000'}/reset-password?token=${token}`;
    console.log(`\n🔑 [DEV ONLY] Password Reset URL: ${resetUrl}\n`);
    
    // Send email
    await sendPasswordResetEmail(email, token);

    return NextResponse.json({ success: true });
  } catch (error) {
    console.error('Forgot password error:', error);
    return NextResponse.json(
      { error: 'Something went wrong' },
      { status: 500 }
    );
  }
}
