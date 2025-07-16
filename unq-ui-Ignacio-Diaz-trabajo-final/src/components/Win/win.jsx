import React from 'react';
import { useNavigate } from 'react-router-dom'; 
import dancing from '../dancing.gif';

export default function WinGame () {
  const navigate = useNavigate(); 

  return (
    <div style={styles.overlay}>
      <div style={styles.container}>
        <h2 style={styles.title}>YOU WIN</h2>

        <button 
          style={styles.button}
          onClick={() => navigate("/")} 
        >
          PLAY AGAIN
        </button>
      </div>
    </div>
  );
};

const styles = {
  overlay: {
    position: 'fixed',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    backgroundColor: 'rgba(0, 0, 0, 0.8)',
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    zIndex: 1000,
  },
  container: {
    backgroundColor: 'rgba(30, 30, 50, 0.9)',
    padding: '2rem',
    borderRadius: '15px',
    textAlign: 'center',
    border: '2px solid rgba(0, 170, 255, 0.5)',
    boxShadow: '0 0 20px rgba(0, 170, 255, 0.3)',
  },
  title: {
    color: '#0af',
    fontSize: '3rem',
    marginBottom: '1rem',
    textShadow: '0 0 10px rgba(0, 170, 255, 0.7)',
  },
  gif: {
    width: '200px',
    height: '200px',
    margin: '1rem 0',
    borderRadius: '10px',
  },
  button: {
    backgroundColor: '#4cb652',
    color: 'white',
    border: 'none',
    padding: '10px 20px',
    borderRadius: '8px',
    fontSize: '1rem',
    cursor: 'pointer',
    marginTop: '1rem',
    transition: 'all 0.3s',
  },
};


