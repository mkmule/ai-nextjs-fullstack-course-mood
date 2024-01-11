import { getUserByClerkId } from '@/utils/auth';
import { prisma } from '@/utils/db';

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

const Journal = async () => {
  const entries = await getEntries();
  console.log('entries', entries);

  return (
    <div>This is journal</div>
  );
};

export default Journal;
