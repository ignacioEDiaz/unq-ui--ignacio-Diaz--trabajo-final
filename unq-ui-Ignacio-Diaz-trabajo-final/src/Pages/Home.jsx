import axios from "axios";
import { useEffect, useState } from "react";
import Button from "../components/Buttom";
import Container from "../components/Container/Container";
import { api } from "../services/api";
import { API_ROUTES } from "../constants/api";
import Spinner from "../components/Spinner/Spinner.jsx";
import { toast } from "react-toastify";
import { createSession } from "../services/game.jsx";
import { useNavigate } from "react-router-dom";
export default function HomePage() {
  const navigate = useNavigate();
  const [difficulties, setDificulties] = useState([]);
  const [selectedDifficulty, setSelectedDifficulty] = useState(null);
  const [loadingDifficulties, setLoadingDifficulties] = useState(true);
  const [loading, setLoading] = useState(false);

  const fetchDifficulties = async () => {
    try {
      setLoadingDifficulties(true);
      const res = await api.get(API_ROUTES.getDifficulties);
      setDificulties(res.data);
    } catch (error) {
      console.error("Error fetching difficulties:", error);
      toast.error("Failed to load difficulties");
    } finally {
      setLoadingDifficulties(false);
    }
  };

  const handleCreateSession = async (difficulty) => {
    try {
      setLoading(true);
      toast.loading("Creating session...", { autoClose: false });
      const session = await createSession(difficulty);

      toast.dismiss();
      toast.success("Session created successfully!", { autoClose: 2000 });

      navigate(`/game/${session.sessionId}`, {
        state: {
          difficulty: session.difficulty,
          wordLength: session.wordLenght,
        },
      });
    } catch (error) {
      console.error("Error creando sesion :", error);
      toast.dismiss();
      toast.error("Fallo el creado de sesion,intente nuevamente.", { autoClose: 3000 });
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchDifficulties();
  }, []);

  return (
    <main className="container bg-white">
      <Container justify="center" align="center" gap="1.5rem">
        <img 
          src="wordle-icon.svg" 
          alt="Wordle Icon" 
          className="w-16 h-16"
        />
        <h1 className="text-3xl font-bold text-gray-800">Wordle</h1>
        <p className="text-gray-600 text-center">
          Get 6 chances to guess a hidden word.
        </p>

        {loadingDifficulties ? (
          <div className="flex justify-center py-8">
            <Spinner size="lg" />
          </div>
        ) : !selectedDifficulty ? (
          <div className="flex flex-col gap-3 w-full max-w-xs">
            {difficulties.map((difficulty) => (
              <Button
                key={difficulty.id}
                variant="outline"
                onClick={() => setSelectedDifficulty(difficulty)}
                className="w-full py-3"
              >
                {difficulty.name}
              </Button>
            ))}
          </div>
        ) : (
          <div className="flex flex-col gap-3 w-full max-w-xs">
            <Button
              loading={loading}
              onClick={() => handleCreateSession(selectedDifficulty)}
              className="w-full py-3"
            >
              {`Play in ${selectedDifficulty.name.toLowerCase()}`}
            </Button>
            <Button
              variant="outline"
              disabled={loadingDifficulties || loading}
              onClick={() => setSelectedDifficulty(null)}
              className="w-full py-3"
            >
              Back to difficulties
            </Button>
          </div>
        )}
      </Container>
    </main>
  );
}