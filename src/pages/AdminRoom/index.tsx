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

export function AdminRoom() {
  const params = useParams<RoomParamsType>();
  const { user } = useAuthContext();
  const roomId = params.id;
  
  const { questions, roomTitle } = useRoom(roomId);

  return (
    <div id="page-room">
      <header>
        <div className="header-content">
          <img src={logoSvg} alt="Logo" />
          <div>
            <RoomCode code={roomId}/>
            <Button isOutlined>Encerrar sala</Button>
          </div>
        </div>
      </header>

      <main className="content">
        <div className="room-title">
          <h1>Sala {roomTitle}</h1>
          { questions.length > 0 && <span>{ questions.length } perguntas</span>}
        </div>

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