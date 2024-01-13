import { getUserByClerkId } from '@/utils/auth';
import { prisma } from '@/utils/db';
import { NextResponse } from 'next/server';
import { analyse } from '@/utils/ai';

export const PATCH = async (request: Request, { params }: any) => {
  const user = await getUserByClerkId();
  const { content } = await request.json();

  const updatedEntry = await prisma.journalEntry.update({
    where: {
      userId_id: {
        userId: user.id,
        id: params.id,
      },
    },
    data: {
      content,
    },
  });

  const analysis = await analyse(updatedEntry.content);
  await prisma.analysis.upsert({
    where: {
      entryId: updatedEntry.id,
    },
    // @ts-ignore
    create: {
      entryId: updatedEntry.id,
      ...analysis,
    },
    // @ts-ignore
    update: {
      ...analysis,
    },
  });

  return NextResponse.json(updatedEntry);
};
