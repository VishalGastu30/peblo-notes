import { PrismaClient } from '@prisma/client';
import bcrypt from 'bcryptjs';

const prisma = new PrismaClient();

async function main() {
  const password = await bcrypt.hash('demo1234', 10);

  const user = await prisma.user.upsert({
    where: { email: 'demo@peblo.ai' },
    update: {},
    create: {
      email: 'demo@peblo.ai',
      name: 'Julian Thorne',
      password,
    },
  });

  const designTag = await prisma.tag.upsert({
    where: { name_userId: { name: 'Design', userId: user.id } },
    update: {},
    create: { name: 'Design', userId: user.id, color: '#f2ca50' },
  });

  const aiTag = await prisma.tag.upsert({
    where: { name_userId: { name: 'AI', userId: user.id } },
    update: {},
    create: { name: 'AI', userId: user.id, color: '#ddb8ff' },
  });

  const category = await prisma.category.upsert({
    where: { name_userId: { name: 'Project Zenith', userId: user.id } },
    update: {},
    create: { name: 'Project Zenith', userId: user.id },
  });

  await prisma.note.create({
    data: {
      title: 'Project Zenith Design Specs',
      content: 'The Zenith initiative aims to redefine the spatial computing interface through a lens of quiet luxury. We move away from aggressive skeuomorphism toward a "weighted minimalism" that prioritizes user cognitive load above all else.\n\nVisual Tokens:\n- Copper Gold (#F2CA50)\n- Obsidian Ink (#131315)',
      userId: user.id,
      categoryId: category.id,
      tags: {
        create: [
          { tagId: designTag.id }
        ]
      }
    }
  });

  await prisma.note.create({
    data: {
      title: 'AI Summary Algorithms',
      content: 'We need to integrate GROQ API using llama-3.1-8b-instant for fast extraction of action items. The context window is more than enough for daily meeting notes.',
      userId: user.id,
      categoryId: category.id,
      tags: {
        create: [
          { tagId: aiTag.id }
        ]
      }
    }
  });

  console.log('Database seeded successfully.');
}

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
