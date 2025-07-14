import axios from "axios";
import { useEffect, useState } from "react";
import { api } from "../services/api";
import { API_ROUTES } from "../constants/api";
import Button from "../components/Buttom.jsx";
import Container from "../components/Container/Container.jsx";

export default function HomePage() {
  const [difficulties, setDifficulties] = useState([]);
  const [loadingDifficulties, setLoadingDifficulties] = useState(true);

  const fetchDifficulties = async () => {
    try {
      setLoadingDifficulties(true);
      const res = await axios.get(API_ROUTES.getDificulties);
      setDifficulties(res.data);
    } catch (error) {
      console.error("Error fetching difficulties:", error);
    } finally {
      setLoadingDifficulties(false);
    }
  };

  useEffect(() => {
    fetchDifficulties();
  }, []);

  return (
    <main className="container bg-white">
      <Container justify="center" align="center" gap="1.5rem">
        {loadingDifficulties ? (
          <p>Loading difficulties...</p>
        ) : (
          difficulties.map((difficulty) => (
            <Button key={difficulty.id} variant="outline">
              {difficulty.name}
            </Button>
          ))
        )}
      </Container>
    </main>
  );
}