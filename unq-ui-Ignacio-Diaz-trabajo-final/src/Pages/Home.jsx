import axios from "axios";
import { useEffect, useState } from "react";
import { api } from "../services/api";
import { API_ROUTES } from "../constants/api";
import Button from "../components/Buttom.jsx";
import Container from "../components/Container/Container.jsx";
import { toast } from "react-toastify";
import { createSession } from "../services/game.jsx";
import { useNavigate } from "react-router-dom";
import Spinner from "../components/Spinner/Spinner.jsx";

export default function HomePage() {
  const navigate = useNavigate();
  const [dificulties, setDificulties] = useState([]);
  const [selectedDifficulty, setSelectedDifficulty] = useState(null);
  const [loadingDificulties, setLoadingDificulties] = useState(true);
  const [loading, setLoading] = useState(false);

  const fetchDificulties = async () => {
    try {
      setLoadingDificulties(true);
      const res = await api.get(API_ROUTES.getDificulties);
      setDificulties(res.data);
    } catch (error) {
      console.error("Error fetching difficulties:", error);
      toast.error("Failed to load difficulties");
    } finally {
      setLoadingDificulties(false);
    }
  };

  const handleCreateSession = async (difficulty) => {
    try {
      setLoading(true);
      toast.loading("Creating session...", { autoClose: false });
      const session = await createSession(difficulty);

      toast.dismiss();
      toast.success("Session created successfully!", { autoClose: 2000 });

      navigate(`/play/${session.sessionId}`, {
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
    fetchDificulties();
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

        {loadingDificulties ? (
          <div className="flex justify-center py-8">
            <Spinner size="lg" />
          </div>
        ) : !selectedDifficulty ? (
          <div className="flex flex-col gap-3 w-full max-w-xs">
            {dificulties.map((difficulty) => (
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
              disabled={loadingDificulties || loading}
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