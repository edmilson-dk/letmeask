import {  Link } from "react-router-dom";
import { FormEvent, useState } from "react";

import illustrationSvg from "../../assets/images/illustration.svg";
import logoSvg from "../../assets/images/logo.svg";

import "../../styles/auth.scss";

import { Button } from "../../components/Button";
import { useAuthContext } from "../../hooks/useAuthContext";
import { database } from "../../services/firebase";

export function NewRoom() {
  const { user } = useAuthContext();
  const [newRoom, setNewRoom] = useState("");

  async function handleCreateRoom(e: FormEvent) {
    e.preventDefault();

    if (newRoom.trim() === "") return;

    const roomRef = database.ref("rooms");
    const firebaseRoom = await roomRef.push({
      title: newRoom,
      authorId: user?.id,
    });
  }

  return (
    <section id="page-auth">
      <aside>
        <img src={illustrationSvg} alt="Illustration" loading="lazy"/>
        <strong>Crie sala de Q&amp;A ao-vivo</strong>
        <p>Tire as dúvidas audiência em tempo-real.</p>
      </aside>
      <main> 
        <div className="main-content">
          <img src={logoSvg} alt="Letmeask" />
          <h2>Criar uma nova sala</h2>
          <form onSubmit={handleCreateRoom}>
            <input 
              type="text"
              placeholder="Nome da sala"
              onChange={(e) => setNewRoom(e.target.value)}
              value={newRoom}
            />
            <Button type="submit">
              Criar sala
            </Button>
          </form>
          <p>
            Quer entrar em uma sala existente? <Link to="/">Clique aqui</Link>
          </p>
        </div>
      </main>
    </section>
  )
}