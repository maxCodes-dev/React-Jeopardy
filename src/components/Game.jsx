'use client';

import { use, useEffect, useState, useRef } from 'react';

import JeopardyTable from './JeopardyTable';
import QuestionPopup from './QuestionPopup';

export default function Game({ questionsDataPromise }) {
  const questionsData = use(questionsDataPromise);
  const [questionData, setQuestionData] = useState({ clue: '', answer: '' });
  const [category, setCategory] = useState('');
  const [points, setPoints] = useState(0);
  /**@type {React.RefObject<?HTMLButtonElement[][]>} */
  const buttonRefs = useRef(null);

  useEffect(() => {
    // fetchQuestionData();
  }, []);

  function getButtonRefs() {
    if (buttonRefs.current === null) {
      buttonRefs.current = Array(5);
      for (const [index, _] of buttonRefs.current.entries()) {
        buttonRefs.current[index] = Array(5).fill(null);
      }
    }
    return buttonRefs.current;
  }

  /**
   *
   * @param {string} questionCategory
   * @param {number} score
   */
  function openQuestion(questionCategory, score) {
    const question = questionsData.find(
      (value) => value.title === questionCategory,
    ).questions[String(score)];
    console.log(question);
    console.log(
      `${questionCategory} for ${score}\n${question.clue} ${question.answer}`,
    );
    setQuestionData(question);
    setCategory(questionCategory);
    setPoints(score);
  }

  function handleClose() {
    setQuestionData({ clue: '', answer: '' });
    setCategory('');
    setPoints(0);
    disableButton(category, points);
  }

  function disableButton(category, points) {
    const buttonRefs = getButtonRefs();
    const node =
      buttonRefs[points / 100 - 1][
        questionsData.findIndex((value) => value.title === category)
      ];
    node.disabled = true;
  }

  function resetButtons() {
    const buttonRefs = getButtonRefs();
    for (const [rowN, row] of buttonRefs.entries()) {
      row.forEach((node) => {
        node.disabled = false;
      });
    }
  }

  return (
    <div className="game">
      <button onClick={resetButtons}>Reset</button>
      <br />
      <br />
      <JeopardyTable
        questionsData={questionsData}
        onOpenQuestion={openQuestion}
        getButtonRefs={getButtonRefs}
      />

      <QuestionPopup
        questionData={questionData}
        category={category}
        points={points}
        onClose={handleClose}
      />
    </div>
  );
}
