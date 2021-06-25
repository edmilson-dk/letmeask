import { memo } from "react";

import { QuestionPropsType } from "../../types/components/Question";

import "../../styles/question.scss";

const QuestionComponent = memo(({ author, content }: QuestionPropsType) => {
  return (
    <div className="question">
      <p>{content}</p>
      <footer>
        <div className="user-info">
          <img src={author.avatar} alt={author.name} />
          <span>{ author.name }</span>
        </div>
        <div>
          
        </div>
      </footer>
    </div>
  )
});

export const Question = QuestionComponent;