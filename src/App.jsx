import { useState, Suspense } from 'react';
import { ErrorBoundary } from 'react-error-boundary';

import Game from '@components/Game';

import reactLogo from './assets/react.svg';
import viteLogo from '/vite.svg';

import './App.css';

function App() {
  const [questionsDataPromise, setQuestionsDataPromise] =
    useState(fetchQuestionData());

  async function fetchQuestionData() {
    const questionDataBlob = await fetch('/testSet');
    /**@type {{categories: CategoryData[]}} */
    const questionData = await questionDataBlob.json();
    return questionData.categories;
  }

  return (
    <>
      <div className="title">
        <a href="https://vite.dev" target="_blank">
          <img src={viteLogo} className="logo" alt="Vite logo" />
        </a>
        <h1>
          Vite + React <i>Jeopardy!</i>
        </h1>
        <a href="https://react.dev" target="_blank">
          <img src={reactLogo} className="logo react" alt="React logo" />
        </a>
      </div>
      <div className="card">
        {/* <button onClick={() => setCount((count) => count + 1)}>
          count is {count}
        </button> */}
        <p>
          Edit <code>src/App.jsx</code> and save to test HMR
        </p>
      </div>
      <p className="read-the-docs">
        Click on the Vite and React logos to learn more
      </p>
      {/* <ErrorBoundary fallback={<h3>Something went wrong...</h3>}> */}
      <Suspense fallback={<div className="loading-shimmer"></div>}>
        <Game questionsDataPromise={questionsDataPromise} />
      </Suspense>
      {/* </ErrorBoundary> */}
    </>
  );
}

export default App;
