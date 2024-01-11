import { getUserByClerkId } from '@/utils/auth';
import { prisma } from '@/utils/db';
import { NextResponse } from 'next/server';

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

  return NextResponse.json(updatedEntry);
};
