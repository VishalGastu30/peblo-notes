import { NextResponse } from 'next/server';
import { prisma } from '@/lib/prisma';
import bcrypt from 'bcryptjs';
import { resetPasswordSchema } from '@/lib/validations';

export async function POST(req: Request) {
  try {
    const { token, password } = await req.json();

    if (!token || typeof token !== 'string') {
      return NextResponse.json({ error: 'Invalid token' }, { status: 400 });
    }

    const validatedFields = resetPasswordSchema.safeParse({ password });

    if (!validatedFields.success) {
      return NextResponse.json(
        { error: 'Invalid password format' },
        { status: 400 }
      );
    }

    const passwordReset = await prisma.passwordReset.findUnique({
      where: { token },
    });

    if (!passwordReset) {
      return NextResponse.json(
        { error: 'Invalid or expired token' },
        { status: 400 }
      );
    }

    if (passwordReset.expiresAt < new Date()) {
      await prisma.passwordReset.delete({ where: { id: passwordReset.id } });
      return NextResponse.json(
        { error: 'Token has expired' },
        { status: 400 }
      );
    }

    const hashedPassword = await bcrypt.hash(validatedFields.data.password, 10);

    // Update password and delete all sessions to force re-login
    await prisma.$transaction([
      prisma.user.update({
        where: { email: passwordReset.email },
        data: { password: hashedPassword },
      }),
      prisma.session.deleteMany({
        where: { user: { email: passwordReset.email } },
      }),
      prisma.passwordReset.delete({
        where: { id: passwordReset.id },
      }),
    ]);

    return NextResponse.json({ success: true });
  } catch (error) {
    console.error('Reset password error:', error);
    return NextResponse.json(
      { error: 'Something went wrong' },
      { status: 500 }
    );
  }
}
