import illustrationSvg from "../assets/images/illustration.svg";
import logoSvg from "../assets/images/logo.svg";
import googleSvg from "../assets/images/google-icon.svg";

export function Home() {
  return (
    <section>
      <aside>
        <img src={illustrationSvg} alt="Illustration" loading="lazy"/>
        <strong>Crie sala de Q&amp;A ao-vivo</strong>
        <p>Tire as dúvidas audiência em tempo-real.</p>
      </aside>
      <main>
        <div>
          <img src={logoSvg} alt="Letmeask" />
          <button>
            <img src={googleSvg} alt="Google icon" />
            Crie sua sala com o Google
          </button>
          <div>ou entre em uma sala</div>

          <form>
            <input 
              type="text"
              placeholder="Digite o código da sala"
            />
            <button type="button">
              Entrar na sala
            </button>
          </form>
        </div>
      </main>
    </section>
  )
}