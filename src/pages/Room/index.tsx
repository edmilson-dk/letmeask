import { FormEvent, useState } from "react";
import { useParams } from "react-router-dom";
import { toast } from "react-toastify";

import logoSvg from "../../assets/images/logo.svg";

import { Button } from "../../components/Button";
import { RoomCode } from "../../components/RoomCode";
import { useAuthContext } from "../../hooks/useAuthContext";
import { database } from "../../services/firebase";

import "../../styles/room.scss";

type RoomParamsType = {
  id: string;
}

export function Room() {
  const [newQuestion, setNewQuestion] = useState("");
  const params = useParams<RoomParamsType>();
  const { user } = useAuthContext();
  const roomId = params.id;

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
          <h1>Sala react</h1>
          <span>
            4 perguntas
          </span>
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
      </main>
    </div>
  )
}