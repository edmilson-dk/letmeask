import {  Link } from "react-router-dom";

import illustrationSvg from "../../assets/images/illustration.svg";
import logoSvg from "../../assets/images/logo.svg";

import "../../styles/auth.scss";

import { Button } from "../../components/Button";
import { useAuthContext } from "../../hooks/useAuthContext";

export function NewRoom() {
  const { user } = useAuthContext();

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
          <h1>{user?.name}</h1>
          <h2>Criar uma nova sala</h2>
          <form>
            <input 
              type="text"
              placeholder="Nome da sala"
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