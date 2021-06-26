import { memo } from "react";

import { QuestionPropsType } from "../../types/components/Question";

import "../../styles/question.scss";

const QuestionComponent = memo(({ 
  author, content, children, 
  isAnswered = false,
  isHighLighted = false 
}: QuestionPropsType) => {
  return (
    <div 
      className={
        `question 
        ${isAnswered ? "answered" : ""}
        ${(isHighLighted && !isAnswered) ? "highlighted": ""}`}
    >
      <p>{content}</p>
      <footer>
        <div className="user-info">
          <img src={author.avatar} alt={author.name} />
          <span>{ author.name }</span>
        </div>
        <div>
          { children }
        </div>
      </footer>
    </div>
  )
});

export const Question = QuestionComponent;