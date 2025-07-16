import { useNavigate } from 'react-router-dom'; 
import skull from '../sk2.gif';

export default function LostGame (){
  const navigate = useNavigate();  
  return (
    <div style={styles.overlay}>
      <div style={styles.container}>
        <h2 style={styles.title}>YOU Lose!</h2>
         <img 
          src={skull} 
          alt="Celebration" 
          style={styles.gif} 
        />
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
const styles = {
  overlay: {
    position: 'fixed',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    backgroundColor: 'rgba(0, 0, 0, 0.9)',
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    zIndex: 1000,
    overflow: 'hidden', 
  },
  container: {
    backgroundColor: 'rgba(20, 25, 40, 0.95)',
    padding: '3rem',
    borderRadius: '20px',
    textAlign: 'center',
    border: '2px solid rgba(255, 50, 50, 0.6)',
    boxShadow: `
      0 0 25px rgba(255, 0, 0, 0.4),
      inset 0 0 15px rgba(255, 100, 100, 0.3)
    `,
    maxWidth: '90%', 
    width: 'fit-content', 
    margin: '20px', 
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
  },
  title: {
    color: '#ff4444',
    fontSize: 'clamp(2rem, 5vw, 3.5rem)', 
    margin: '0 0 1.5rem 0',
    textShadow: '0 0 12px rgba(255, 50, 50, 0.8)',
    fontWeight: '800',
    letterSpacing: '1px',
    lineHeight: '1.2',
  },
  gif: {
    width: 'min(200px, 60vw)', 
    height: 'auto', 
    aspectRatio: '1/1', 
    margin: '1.5rem 0',
    borderRadius: '12px',
    objectFit: 'contain', 
    filter: 'drop-shadow(0 0 10px rgba(255, 0, 0, 0.6))',
  },
  button: {
    backgroundColor: '#ff4444',
    color: 'white',
    border: 'none',
    padding: '12px 28px',
    borderRadius: '10px',
    fontSize: '1.1rem',
    cursor: 'pointer',
    marginTop: '1.5rem',
    transition: 'all 0.3s ease',
    fontWeight: '600',
    letterSpacing: '0.5px',
    boxShadow: '0 4px 15px rgba(255, 50, 50, 0.4)',
    width: 'fit-content', 
    ':hover': {
      transform: 'translateY(-3px)',
      boxShadow: '0 6px 20px rgba(255, 50, 50, 0.6)',
      backgroundColor: '#ff3333',
    }
  },
};
