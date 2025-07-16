import "./header.css";


export default function Header({ showSubtitle = true }) {
    return (
        <header className="header">
            <div className="header-top-row">
                
                <h1 className="header-title">Wordle</h1>
            </div>
            {showSubtitle && (
                <h2 className="header-subtitle">Select the difficulty</h2>
            )}
        </header>
    );
}