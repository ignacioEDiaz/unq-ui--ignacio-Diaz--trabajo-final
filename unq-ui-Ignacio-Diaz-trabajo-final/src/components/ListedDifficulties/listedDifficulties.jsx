import "./listedDifficulties.css"

export default function ListedDifficulties({ difficulties, onSelect}) {
    return (
    <div className="container">
     <ul>
        {difficulties.map((difficulty) => (
            <li className="item-list" key={difficulty.id}>
                    <button className="difficulty-button" onClick={() => onSelect(difficulty)}>
                    {difficulty.name}
                    </button>
            </li>
                ))}
    </ul>
    </div>
    )
}