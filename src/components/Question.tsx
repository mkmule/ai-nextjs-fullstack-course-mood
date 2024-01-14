'use client';

import { ChangeEvent, FormEvent, useState } from 'react';

const Question = () => {
  const [value, setValue] = useState('');

  const onChange = (e: ChangeEvent<HTMLInputElement>) => {
    e.preventDefault();
    setValue(e.target.value);
  };

  const handleSubmit = (e: FormEvent) => {
    e.preventDefault();
  };

  return (
    <div>
      <form onSubmit={handleSubmit}>
        <input
          type="text"
          placeholder="Ask a question"
          onChange={onChange}
          className="border border-black/20 px-4 py-2 text-lg rounded-lg"
        />
        <button type="submit" className="bg-blue-400 px-4 py-2 ml-2 rounded-lg text-lg">Ask</button>
      </form>
    </div>
  );
};

export default Question;
