import { useParams, useHistory } from "react-router-dom";
import { toast } from "react-toastify";

import logoSvg from "../../assets/images/logo.svg";
import deleteImg from "../../assets/images/delete.svg";
import checkImg from "../../assets/images/check.svg";
import answerImg from "../../assets/images/answer.svg";
import emptyQuestionsImg from "../../assets/images/empty-questions.svg";

// components
import { Question } from "../../components/Question";
import { Button } from "../../components/Button";
import { RoomCode } from "../../components/RoomCode";

import { database } from "../../services/firebase";
import { RoomParamsType } from "../../types/pages/Room";

import { useRoom } from "../../hooks/useRoom";

import "../../styles/room.scss";
import { Fragment } from "react";

export function AdminRoom() {
  const params = useParams<RoomParamsType>();
  const history = useHistory();

  const roomId = params.id;

  const { questions, roomTitle } = useRoom(roomId);

  async function handleEndRoom() {
    await database.ref(`rooms/${roomId}`).update({
      endedAt: new Date(),
    });

    history.push("/");
    toast.info("Room closed successfully");
  }

  async function handleCheckQuestionAsAnswered(questionId: string) {
    await database.ref(`rooms/${roomId}/questions/${questionId}`).update({
      isAnswered: true,
    });

    toast.info("Question marked as answered");
  }

  async function handleHighLightQuestion(questionId: string) {
    await database.ref(`rooms/${roomId}/questions/${questionId}`).update({
      isHighLighted: true,
    });

    toast.info("highlighted question");
  }

  async function handleDeleteQuestion(questionId: string) {
    const response = window.confirm("Tem certeza que você deseja excluir esta pergunta?");

    if (response) {
      await database.ref(`rooms/${roomId}/questions/${questionId}`).remove();
      toast.info("Question removed with successfully!");
    }
  }

  return (
    <div id="page-room">
      <header>
        <div className="header-content">
          <img src={logoSvg} alt="Logo" />
          <div>
            <RoomCode code={roomId} />
            <Button isOutlined onClick={handleEndRoom}>Encerrar sala</Button>
          </div>
        </div>
      </header>

      <main className="content">
        <div className="room-title">
          <h1>Sala {roomTitle}</h1>
          {questions.length > 0 && <span>{questions.length} perguntas</span>}
        </div>

        <article className="questions-list">
          {
            questions.length > 0 ? questions.map(({ author, id, content, isAnswered, isHighLighted }) => (
              <Question
                key={id}
                author={author}
                content={content}
                isAnswered={isAnswered}
                isHighLighted={isHighLighted}
              >
                {
                  !isAnswered && (
                    <Fragment>
                      <button
                        type="button"
                        onClick={() => handleCheckQuestionAsAnswered(id)}
                      >
                        <img src={checkImg} alt="Marcar pergunta como respondida" />
                      </button>
                      <button
                        type="button"
                        onClick={() => handleHighLightQuestion(id)}
                      >
                        <img src={answerImg} alt="Destacar está pergunta" />
                      </button>
                    </Fragment>
                  )
                }
                <button
                  type="button"
                  onClick={() => handleDeleteQuestion(id)}
                >
                  <img src={deleteImg} alt="Remover pergunta" />
                </button>
              </Question>
            )) : (
              <img src={emptyQuestionsImg} alt="Nenhuma questão disponivél"/>
            )
          }
        </article>
      </main>
    </div>
  )
}