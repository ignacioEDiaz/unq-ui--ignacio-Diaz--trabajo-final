import { useNavigate } from 'react-router-dom'; 
import skull from '../sk2.gif';

export default function LostGame (){
  const navigate = useNavigate();  
  return (
    <div style={styles.overlay}>
      <div style={styles.container}>
        <h2 style={styles.title}>YOU Lose!</h2>
        
        <button 
          style={styles.button}
          onClick={() => navigate("/")}
        >
          PLAY AGAIN
        </button>
      </div>
    </div>
  );
}
