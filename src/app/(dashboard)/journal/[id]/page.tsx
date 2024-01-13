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

  const { mood, summary, color, subject, negative } = entry.analysis;
  const analysisData = [
    { name: 'Subject', value: subject },
    { name: 'Summary', value: summary },
    { name: 'Mood', value: mood },
    { name: 'Negative', value: negative ? 'Yes' : 'No' },
  ];

  return (
    <div className="w-full h-full grid grid-cols-3">
      <div className="col-span-2">
        <Editor entry={entry} />
      </div>
      <div className="border-l border-black/10">
        <div className="px-6 py-10" style={{ backgroundColor: color }}>
          <h2 className="text-2xl">Analysis</h2>
        </div>
        <div>
          <ul>
            {analysisData.map(item => (
              <li key={item.name} className="px-2 py-4 flex items-center justify-between border-t border-black/10">
                <span className="text-lg font-semibold">{item.name}</span>
                <span className="text-sm">{item.value}</span>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </div>
  );
};

export default EntryPage;
