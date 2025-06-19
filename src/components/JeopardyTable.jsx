import { useMemo, useRef, useState } from 'react';

import QuestionPopup from './QuestionPopup';

import './JeopardyTable.css';

/**
 *
 * @param {object} props
 * @param {CategoryData[]} props.questionsData
 * @returns
 */
export default function JeopardyTable({ questionsData }) {
  const [questionData, setQuestionData] = useState({ clue: '', answer: '' });
  const [category, setCategory] = useState('');
  const [points, setPoints] = useState(0);
  /**@type {React.RefObject<?HTMLButtonElement[][]>} */
  const buttonRefs = useRef(null);

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
    const buttonRefs = getButtonRefs();
    const node =
      buttonRefs[points / 100 - 1][
        questionsData.findIndex((value) => value.title === category)
      ];
    console.log(
      buttonRefs[questionsData.findIndex((value) => value.title === category)],
    );
    console.log(points / 100 - 1);
    node.disabled = true;

    setQuestionData({ clue: '', answer: '' });
    setCategory('');
    setPoints(0);
  }

  const titlesRow = useMemo(
    () => (
      <tr>
        {questionsData.map((value, index) => (
          <th scope="col" key={value.title}>
            {value.title}
          </th>
        ))}
      </tr>
    ),
    [questionsData],
  );

  const tableBody = [100, 200, 300, 400, 500].map((value, index) => (
    <tr key={`row ${index}`}>
      {[0, 1, 2, 3, 4].map((_, i) => (
        <td key={questionsData[i].title}>
          <button
            ref={(node) => {
              const buttonRefs = getButtonRefs();
              buttonRefs[index][i] = node;

              return () => {
                buttonRefs[index][i] = null;
              };
            }}
            onClick={() => openQuestion(questionsData[i].title, value)}
          >
            {String(value)}
          </button>
        </td>
      ))}
    </tr>
  ));

  return (
    <>
      <table className="jeopardy-table">
        <thead>{titlesRow}</thead>
        <tbody>{tableBody}</tbody>
      </table>
      <QuestionPopup
        questionData={questionData}
        category={category}
        points={points}
        onClose={handleClose}
      />
    </>
  );
}
