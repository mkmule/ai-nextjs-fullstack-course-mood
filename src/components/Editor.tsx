'use client';

import { useState } from 'react';
import { useAutosave } from 'react-autosave';
import { updateEntry } from '@/utils/api';

const Editor = ({ entry }: any) => {
  const [value, setValue] = useState(entry.content);
  const [isLoading, setIsLoading] = useState(false);
  const [analysis, setAnalysis] = useState(entry.analysis);

  const { mood, summary, color, subject, negative } = analysis;
  const analysisData = [
    { name: 'Subject', value: subject },
    { name: 'Summary', value: summary },
    { name: 'Mood', value: mood },
    { name: 'Negative', value: negative ? 'Yes' : 'No' },
  ];

  useAutosave({
    data: value,
    onSave: async (_value) => {
      setIsLoading(true);
      const updatedEntry = await updateEntry(entry.id, _value);
      setAnalysis(updatedEntry.analysis)
      setIsLoading(false);
    },
  });

  return (
    <div className="w-full h-full grid grid-cols-3">
      <div className="col-span-2">
        {isLoading && (<div>...loading</div>)}
        <textarea className="h-full w-full p-8 text-xl" value={value} onChange={e => setValue(e.target.value)} />
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

export default Editor;
