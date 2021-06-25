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

  const [ newQuestion, setNewQuestion ] = useState("");
  const { questions, setIsSendNewQuestion, roomTitle } = useRoom(roomId);

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

      setIsSendNewQuestion(true);
      toast.success("Your question has been sent successfully!");
      setNewQuestion("");
    } catch(err) {
      toast.warning("An unexpected error has occurred, please try again.");
    }
  }

  return (
    <div id="page-room">
      <header>
        <div className="header-content">
          <img src={logoSvg} alt="Logo" />
          <RoomCode code={roomId}/>
        </div>
      </header>

      <main className="content">
        <div className="room-title">
          <h1>Sala {roomTitle}</h1>
          { questions.length > 0 && <span>{ questions.length } perguntas</span>}
        </div>

        <form onSubmit={handleSendQuestion}>
          <textarea 
            placeholder="O que você quer perguntar?"
            onChange={(e) => setNewQuestion(e.target.value)}
            value={newQuestion}
          />

          <div className="form-footer">
            { user ? (
              <div className="user-info">
                <img src={user.avatar} alt={user.name} />
                <span>{ user.name }</span>
              </div>
            ) : (
              <span>Para enviar uma pergunta, <button type="button">faça seu login</button>.</span>
            )}
            <Button type="submit" disabled={!user}>Enviar pergunta</Button>
          </div>
        </form>

        <article className="questions-list">
          {
            questions.length > 0 && questions.map(({ author, id, content }) => (
              <Question 
                key={id} 
                author={author} 
                content={content}
              />
            ))
          }
        </article>
      </main>
    </div>
  )
}