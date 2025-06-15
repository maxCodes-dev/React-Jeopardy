import './QuestionPopup.css';

/**
 *
 * @param {object} props
 * @param {QuestionData} props.questionData
 * @param {string} props.category
 * @param {number} props.points
 * @param {React.RefObject} props.ref
 */
export default function QuestionPopup({ questionData, category, points, ref }) {
  return (
    <dialog className="question-popup" ref={ref} open={true}>
      <h2>
        {category} for {points}
      </h2>
      <hr />
      <p>{questionData.clue}</p>
    </dialog>
  );
}
