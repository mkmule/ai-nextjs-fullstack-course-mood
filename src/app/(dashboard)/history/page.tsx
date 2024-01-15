import { getUserByClerkId } from '@/utils/auth';
import { prisma } from '@/utils/db';
import HistoryChart from '@/components/HistoryChart';

const getData = async () => {
  const user = await getUserByClerkId();
  const analyses = await prisma.analysis.findMany({
    where: {
      userId: user.id,
    },
    orderBy: {
      createdAt: 'asc',
    },
  });

  const sum = analyses.reduce((all, cur) => all + cur.sentimentScore, 0);
  const avg = Math.round(sum / analyses.length);

  return { analyses, avg };
};

const HistoryPage = async () => {
  const { analyses, avg }: any = await getData();

  return (
    <div className="w-full h-full">
      <div className="w-full h-[24px]">{`Avg. Sentiment ${avg}`}</div>
      <div className="w-full h-[calc(100%-24px)]"><HistoryChart data={analyses} /></div>
    </div>
  );
};

export default HistoryPage;
