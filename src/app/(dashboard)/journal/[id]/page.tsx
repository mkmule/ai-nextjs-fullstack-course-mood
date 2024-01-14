import { getUserByClerkId } from '@/utils/auth';
import { prisma } from '@/utils/db';
import Editor from '@/components/Editor';

const getEntry = async (id: string): Promise<any> => {
  const user = await getUserByClerkId();
  return prisma.journalEntry.findUnique({
    where: {
      userId_id: {
        userId: user.id,
        id,
      },
    },
    include: {
      analysis: true,
    },
  });
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
