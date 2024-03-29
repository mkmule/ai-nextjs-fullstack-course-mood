import { getUserByClerkId } from '@/utils/auth';
import { prisma } from '@/utils/db';
import NewEntryCard from '@/components/NewEntryCard';
import React from 'react';
import EntryCard from '@/components/EntryCard';
import Link from 'next/link';
import Question from '@/components/Question';

const getEntries = async () => {
  const user = await getUserByClerkId();
  return prisma.journalEntry.findMany({
    where: {
      userId: user.id,
    },
    orderBy: {
      createdAt: 'desc',
    },
    include: {
      analysis: true,
    },
  });
};

const JournalPage = async () => {
  const entries = await getEntries();

  return (
    <div className="p-10 bg-zinc-400/10 h-full">
      <h2 className="text-3xl mb-8">Journal</h2>

      <div className="my-8">
        <Question />
      </div>

      <div className="grid grid-cols-4 gap-4">
        <NewEntryCard />
        {entries.map(entry => (
          <Link href={`/journal/${entry.id}`} key={entry.id}>
            <EntryCard key={entry.id} entry={entry} />
          </Link>
        ))}
      </div>
    </div>
  );
};

export default JournalPage;
