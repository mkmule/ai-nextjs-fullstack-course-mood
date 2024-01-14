import { getUserByClerkId } from '@/utils/auth';
import { prisma } from '@/utils/db';
import { qa } from '@/utils/ai';
import { NextResponse } from 'next/server';

export const POST = async (request: Request) => {
  const { question } = await request.json();
  const user: any = getUserByClerkId();

  const entries = await prisma.journalEntry.findMany({
    where: {
      userId: user.id,
    },
    select: {
      id: true,
      content: true,
      createdAt: true,
    },
  });

  const answer = await qa(question, entries);
  return NextResponse.json({ data: answer });
};
