import { Container } from "../components/ui/layout/Container";
import Button from "../components/ui/button/Button";

export default function HomePage() {
  return (
    <main className="container bg-white">
      <Container justify="center" align="center" gap="1.5rem">
        <img src="wordle-icon.svg" alt="Wordle Icon" />
        <h1 className="text-title">Wordle</h1>
        <p className="text-subtitle text-center">
          tenes 6 chances para adivinar una palabra de 5 letras.
        </p>
        <Button>Empezar Juego</Button>
      </Container>
    </main>
  );
}