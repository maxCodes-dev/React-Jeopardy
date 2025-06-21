import { useEffect, useMemo, useRef, useState } from 'react';

import QuestionPopup from './QuestionPopup';

import './JeopardyTable.css';

/**
 *
 * @param {object} props
 * @param {CategoryData[]} props.questionsData
 * @returns
 */
export default function JeopardyTable({
  questionsData,
  onOpenQuestion,
  getButtonRefs,
}) {
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
            onClick={() => onOpenQuestion(questionsData[i].title, value)}
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
    </>
  );
}
