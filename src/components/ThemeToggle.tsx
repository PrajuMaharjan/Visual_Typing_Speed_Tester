interface ThemeToggleProps{
    theme:'light' | "dark";
    onToggle:()=>void;
}

export default function ThemeToggle({theme,onToggle}:ThemeToggleProps){
    return(
        <button onClick={onToggle}
                aria-label="Toggle dark mode"
                role="switch"
                style = {{
                            position:'sticky',
                            top:'1rem',
                            float:'right',
                            marginRight:'1rem',
                            width:"3.5rem",
                            height:"2rem",
                            padding:"0.25rem",
                            border:'1px solid var(--color-border)',
                            borderRadius:'999px',
                            backgroundColor:'var(--color-bg)',
                            cursor:'pointer',
                            zIndex:20,
                            display:"flex",
                            alignItems:"center",
                            justifyContent:theme ==="dark" ? "flex-end" : "flex-start",
                            transition:"justify-content 0.5s ease",                            
                        }}
        >
            <span style={{
                            width:"1.4rem",
                            height:"1.4rem",
                            borderRadius:"50%",
                            backgroundColor: 'var(--color-text)',
                            color: 'var(--color-bg)',
                            display: 'flex',
                            alignItems: 'center',
                            justifyContent: 'center',
                            fontSize: '0.75rem',
                            transform: theme==="dark" ? 'translateX(0)' : 'translateX(0)',
                            transition: 'transform 0.2s ease, background-color 0.2s ease',
                        }}
            >
                {theme==='dark' ? "🌙" : "☀️"}
            </span>
        </button>
    );
}