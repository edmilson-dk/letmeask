import { useParams } from "react-router-dom";

import logoSvg from "../../assets/images/logo.svg";

import { Button } from "../../components/Button";
import { RoomCode } from "../../components/RoomCode";

import "../../styles/room.scss";

type RoomParamsType = {
  id: string;
}

export function Room() {
  const params = useParams<RoomParamsType>();

  return (
    <div id="page-room">
      <header>
        <div className="header-content">
          <img src={logoSvg} alt="Logo" />
          <RoomCode code={params.id}/>
        </div>
      </header>

      <main className="content">
        <div className="room-title">
          <h1>Sala react</h1>
          <span>
            4 perguntas
          </span>
        </div>

        <form>
          <textarea 
            placeholder="O que você quer perguntar?"
          />

          <div className="form-footer">
            <span>Para enviar uma pergunta, <button type="button">faça seu login</button>.</span>
            <Button type="submit">Enviar pergunta</Button>
          </div>
        </form>
      </main>
    </div>
  )
}