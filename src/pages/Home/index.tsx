import {  useHistory } from "react-router-dom";

import illustrationSvg from "../../assets/images/illustration.svg";
import logoSvg from "../../assets/images/logo.svg";
import googleSvg from "../../assets/images/google-icon.svg";

import "../../styles/auth.scss";

import { Button } from "../../components/Button";
import { useAuthContext } from "../../hooks/useAuthContext";
import { FormEvent, useState } from "react";
import { database } from "../../services/firebase";
import { toast } from "react-toastify";

export function Home() {
  const history = useHistory();
  const { user, signInWithGoogle } = useAuthContext();
  const [roomCode, setRoomCode] = useState("");

  async function handleCreateRoom() {
    if (!user) {
      await signInWithGoogle()
    };

    toast.info("User successfully logged in.");
    history.push("/rooms/new");
  }

  async function handleJoinRoom(e: FormEvent) {
    e.preventDefault();

    if (roomCode.trim() === "") return;

    const roomRef = await database.ref(`rooms/${roomCode}`).get();

    if (!roomRef.exists()) {
      toast.error("Room does not exists.");
      return;
    }

    history.push(`/rooms/${roomCode}`);
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
          <button onClick={handleCreateRoom} className="create-room">
            <img src={googleSvg} alt="Google icon" />
            Crie sua sala com o Google
          </button>
          <div className="separator">ou entre em uma sala</div>

          <form onSubmit={handleJoinRoom}>
            <input 
              type="text"
              placeholder="Digite o código da sala"
              onChange={(e) => setRoomCode(e.target.value)}
              value={roomCode}
            />
            <Button type="submit">
              Entrar na sala
            </Button>
          </form>
        </div>
      </main>
    </section>
  )
}