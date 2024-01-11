const EntryCard = ({ entry }: any) => {
  const date = new Date(entry.createdAt).toDateString();

  return (
    <div className="divide-y divide-gray-200 overflow-hidden rounded-lg bg-white shadow">
      <div className="px-4 py-5">{date}</div>
      <div className="px-4 py-5">{entry.analysis?.summary || 'N/A'}</div>
      <div className="px-4 py-5">{entry.analysis?.mood || 'N/A'}</div>
    </div>
  );
};

export default EntryCard;
