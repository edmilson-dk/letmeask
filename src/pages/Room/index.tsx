import { FormEvent, useState } from "react";
import { useParams } from "react-router-dom";
import { toast } from "react-toastify";

import logoSvg from "../../assets/images/logo.svg";

// components
import { Question } from "../../components/Question";
import { Button } from "../../components/Button";
import { RoomCode } from "../../components/RoomCode";

import { database } from "../../services/firebase";
import { RoomParamsType } from "../../types/pages/Room";

import { useAuthContext } from "../../hooks/useAuthContext";
import { useRoom } from "../../hooks/useRoom";

import "../../styles/room.scss";

export function Room() {
  const params = useParams<RoomParamsType>();
  const { user } = useAuthContext();
  const roomId = params.id;

  const [newQuestion, setNewQuestion] = useState("");
  const { questions, roomTitle } = useRoom(roomId);

  async function handleSendQuestion(e: FormEvent) {
    e.preventDefault();

    if (newQuestion.trim() === '') {
      toast.error("The question cannot be empty.");
      return;
    };

    if (!user) {
      toast.error("You must be logged in.");
      return;
    }

    const question = {
      content: newQuestion,
      author: {
        name: user.name,
        avatar: user.avatar,
      },
      isHighLighted: false,
      isAnswered: false,
    }

    try {
      await database.ref(`rooms/${roomId}/questions`).push(question);

      toast.success("Your question has been sent successfully!");
      setNewQuestion("");
    } catch (err) {
      toast.warning("An unexpected error has occurred, please try again.");
    }
  }

  async function handleLikeQuestion(questionId: string, likeId: string | undefined) {
    try {
      if (!likeId) {
        await database.ref(`rooms/${roomId}/questions/${questionId}/likes`)
          .push({ authorId: user?.id });

        toast.success("Like successfully added!");
      } else {
        await database.ref(`rooms/${roomId}/questions/${questionId}/likes/${likeId}`).remove();
        toast.info("Like successfully removed!");
      }
    } catch (err) {
      toast.warning("An unexpected error has occurred, please try again.");
    }
  }

  return (
    <div id="page-room">
      <header>
        <div className="header-content">
          <img src={logoSvg} alt="Logo" />
          <RoomCode code={roomId} />
        </div>
      </header>

      <main className="content">
        <div className="room-title">
          <h1>Sala {roomTitle}</h1>
          {questions.length > 0 && <span>{questions.length} perguntas</span>}
        </div>

        <form onSubmit={handleSendQuestion}>
          <textarea
            placeholder="O que você quer perguntar?"
            onChange={(e) => setNewQuestion(e.target.value)}
            value={newQuestion}
          />

          <div className="form-footer">
            {user ? (
              <div className="user-info">
                <img src={user.avatar} alt={user.name} />
                <span>{user.name}</span>
              </div>
            ) : (
              <span>Para enviar uma pergunta, <button type="button">faça seu login</button>.</span>
            )}
            <Button type="submit" disabled={!user}>Enviar pergunta</Button>
          </div>
        </form>

        <article className="questions-list">
          {
            questions.length > 0 && questions.map(({
              author, id, content, likesCount, likeId, isAnswered, isHighLighted
            }) => (
              <Question
                key={id}
                author={author}
                content={content}
                isAnswered={isAnswered}
                isHighLighted={isHighLighted}
              >
                {
                  !isAnswered && (
                    <button
                      className={`question-like-btn ${likeId && 'liked'}`}
                      type="button"
                      aria-label="Marcar como gostei"
                      onClick={() => handleLikeQuestion(id, likeId)}
                    >
                      {likesCount > 0 && <span>{likesCount}</span>}
                      <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                        <path
                          d="M7 22H4C3.46957 22 2.96086 21.7893 2.58579 21.4142C2.21071 21.0391 2 20.5304 2 20V13C2 12.4696 2.21071 11.9609 2.58579 11.5858C2.96086 11.2107 3.46957 11 4 11H7M14 9V5C14 4.20435 13.6839 3.44129 13.1213 2.87868C12.5587 2.31607 11.7956 2 11 2L7 11V22H18.28C18.7623 22.0055 19.2304 21.8364 19.5979 21.524C19.9654 21.2116 20.2077 20.7769 20.28 20.3L21.66 11.3C21.7035 11.0134 21.6842 10.7207 21.6033 10.4423C21.5225 10.1638 21.3821 9.90629 21.1919 9.68751C21.0016 9.46873 20.7661 9.29393 20.5016 9.17522C20.2371 9.0565 19.9499 8.99672 19.66 9H14Z"
                          stroke="#737380" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"
                        />
                      </svg>
                    </button>
                  )
                }
              </Question>
            ))
          }
        </article>
      </main>
    </div>
  )
}