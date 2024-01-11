import { getUserByClerkId } from '@/utils/auth';
import { prisma } from '@/utils/db';
import Editor from '@/components/Editor';

const getEntry = async (id: string) => {
  const user = await getUserByClerkId();
  const entry = prisma.journalEntry.findUnique({
    where: {
      userId_id: {
        userId: user.id,
        id,
      },
    },
  });

  return entry;
};

const EntryPage = async ({ params }: any) => {
  const entry = await getEntry(params.id);

  return (
    <div className="w-full h-full">
      <Editor entry={entry} />
    </div>
  );
};

export default EntryPage;
