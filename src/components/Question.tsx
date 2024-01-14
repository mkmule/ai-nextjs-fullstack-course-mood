'use client';

import { ChangeEvent, FormEvent, useState } from 'react';
import { askQuestion } from '@/utils/api';

const Question = () => {
  const [value, setValue] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [response, setResponse] = useState('');

  const onChange = (e: ChangeEvent<HTMLInputElement>) => {
    e.preventDefault();
    setValue(e.target.value);
  };

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();

    setIsLoading(true);
    const answer = await askQuestion(value);
    setValue('');
    setResponse(answer);
    setIsLoading(false);
  };

  return (
    <div>
      <form onSubmit={handleSubmit}>
        <input
          disabled={isLoading}
          type="text"
          placeholder="Ask a question"
          onChange={onChange}
          className="border border-black/20 px-4 py-2 text-lg rounded-lg"
        />
        <button disabled={isLoading} type="submit" className="bg-blue-400 px-4 py-2 ml-2 rounded-lg text-lg">Ask
        </button>
      </form>
      {isLoading && <div>loading...</div>}
      {response && <div>{response}</div>}
    </div>
  );
};

export default Question;
