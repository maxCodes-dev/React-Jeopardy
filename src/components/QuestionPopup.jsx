import { useEffect, useRef } from 'react';
import './QuestionPopup.css';

/**
 *
 * @param {object} props
 * @param {QuestionData} props.questionData
 * @param {string} props.category
 * @param {number} props.points
 * @param {React.RefObject} props.ref
 */
export default function QuestionPopup({
  questionData,
  category,
  points,
  onClose,
}) {
  /**@type {{current: HTMLDialogElement}} */
  const dialogRef = useRef(null);

  useEffect(() => {
    category === '' ? dialogRef.current.close() : dialogRef.current.showModal();
  }, [questionData, category, points]);

  return (
    <dialog className="question-popup" ref={dialogRef}>
      <h2>
        {category} for {points}
      </h2>
      <hr />
      <p>{questionData.clue}</p>
      <button onClick={onClose}>Close</button>
    </dialog>
  );
}
