import { NextResponse } from 'next/server';
import { prisma } from '@/lib/prisma';
import { sendPasswordResetEmail } from '@/lib/email';
import { nanoid } from 'nanoid';

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
    const token = nanoid(32);
    const expiresAt = new Date(Date.now() + 60 * 60 * 1000);

    // Save token
    await prisma.passwordReset.create({
      data: {
        email,
        token,
        expiresAt,
      },
    });

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
