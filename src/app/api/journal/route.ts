import { getUserByClerkId } from '@/utils/auth';
import { prisma } from '@/utils/db';
import { NextResponse } from 'next/server';
import { revalidatePath } from 'next/cache';
import { analyse } from '@/utils/ai';

export const POST = async () => {
  const user = await getUserByClerkId();
  const entry = await prisma.journalEntry.create({
    data: {
      userId: user.id,
      content: 'Write about your day!',
    },
  });

  const analysis = await analyse(entry.content);
  await prisma.analysis.create({
    // @ts-ignore
    data: {
      userId: user.id,
      entryId: entry.id,
      ...analysis,
    },
  });

  revalidatePath('/journal');
  return NextResponse.json({ data: entry });
};
