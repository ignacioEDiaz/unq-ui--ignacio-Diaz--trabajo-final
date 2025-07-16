import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router';
import { getDifficulty , getSession  } from '../services/game.jsx';
import ListedDifficulties from '../components/ListedDifficulties/listedDifficulties';
import UserDifficulty from '../components/userDifficulty/userDifficulty';
import Header from '../components/header/header';
import Spinner from '../components/spinner/spinner';
import { ROUTES } from '../constants/routes';
import { toast } from 'react-toastify';

export default function HomePage() {
    const navigateTo = useNavigate();
    const [isFetchingDifficulties, setIsFetchingDifficulties] = useState(false);
    const [difficultyOptions, setDifficultyOptions] = useState([]);
    const [activeDifficulty, setActiveDifficulty] = useState(null);

    const loadDifficultyOptions = async () => {
        try {
            setIsFetchingDifficulties(true);
            const difficultyData = await getDifficulty();
            setDifficultyOptions(difficultyData);
            setIsFetchingDifficulties(false);
        } catch (error) {
            toast.error("Error fetching difficulties");
        }
    }

    const handleStartGame = async () => {
        try {
            const sessionData = await getSession(activeDifficulty.id);
            navigateTo(ROUTES.GAME.replace(":sessionId", sessionData.sessionId));
            localStorage.setItem("session", JSON.stringify(sessionData));
        } catch (error) {
            toast.error("Error starting game");
        }
    }

    useEffect(() => {
        loadDifficultyOptions();
    }, []);

    return (
        <div>
            <Header showSubtitle={!activeDifficulty} />
            <div>
                {isFetchingDifficulties ? (
                    <Spinner />
                ) : activeDifficulty ? (
                    <UserDifficulty
                        userDifficulty={activeDifficulty}
                        onReset={setActiveDifficulty}
                        onPlay={handleStartGame}
                    />
                ) : (
                    <ListedDifficulties
                        difficulties={difficultyOptions}
                        onSelect={setActiveDifficulty}
                    />
                )}
            </div>
        </div>
    );
}
