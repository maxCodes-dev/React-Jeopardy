import { Suspense, use, useEffect, useState } from 'react';
import JeopardyTable from './JeopardyTable';

export default function Game() {
  const [questionData, setQuestionData] = useState(null);

  useEffect(() => {
    fetchQuestionData();
  }, []);

  async function fetchQuestionData() {
    const questionDataBlob = await fetch('/categories');
    setQuestionData(await questionDataBlob.json());
  }

  return (
    <>
      {questionData === null ? null : (
        <JeopardyTable questionsData={questionData} />
      )}
    </>
  );
}
