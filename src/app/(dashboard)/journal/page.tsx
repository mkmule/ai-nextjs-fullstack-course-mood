import { getUserByClerkId } from '@/utils/auth';
import { prisma } from '@/utils/db';
import NewEntryCard from '@/components/NewEntryCard';
import React from 'react';
import EntryCard from '@/components/EntryCard';

const getEntries = async () => {
  const user = await getUserByClerkId();
  return prisma.journalEntry.findMany({
    where: {
      userId: user.id,
    },
    orderBy: {
      createdAt: 'desc',
    },
  });
};

const JournalPage = async () => {
  const entries = await getEntries();

  return (
    <div className="p-10">
      <h2 className="text-3xl mb-8">Journal</h2>
      <div className="grid grid-cols-4 gap-4">
        <NewEntryCard />
        {entries.map(entry => <EntryCard key={entry.id} entry={entry} />)}
      </div>
    </div>
  );
};

export default JournalPage;
