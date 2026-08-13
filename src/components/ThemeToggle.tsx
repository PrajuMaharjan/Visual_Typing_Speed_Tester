interface ThemeToggleProps{
    theme:'light' | "dark";
    onToggle:()=>void;
}

export default function ThemeToggle({theme,onToggle}:ThemeToggleProps){
    return(
        <button onClick={onToggle}
                aria-label="Toggle dark mode"
                style = {{
                            position:'sticky',
                            top:'1rem',
                            float:'right',
                            marginRight:'1rem',
                            padding:'0.5rem 0.75rem',
                            border:'3px solid var(--color-border)',
                            borderRadius:'8px',
                            backgroundColor:'var(--color-bg)',
                            color:'var(--color-text)',
                            fontFamily:'monospace',
                            fontSize:"1rem",
                            cursor:'pointer',
                            zIndex:20
                        }}
        >
            {theme==='light' ? "🌙" : "☀️"}
        </button>
    );
}