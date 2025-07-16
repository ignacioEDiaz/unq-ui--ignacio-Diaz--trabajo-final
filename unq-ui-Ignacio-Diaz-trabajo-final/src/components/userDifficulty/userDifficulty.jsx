import "./userDifficulty.css"

export default function UserDifficulty ({userDifficulty, onReset, onPlay}) {  
    return (
        <div className="container">
            <p className="difficultySelect">Selected difficulty: {userDifficulty.name}</p> 
            <button className="button play-button" onClick={onPlay}> 
                Play
            </button>
            <button className="button reset-button" onClick={() => onReset(null)}>
                Change difficulty
            </button>
        </div>
    )
}