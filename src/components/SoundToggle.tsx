interface SoundToggleProps{
    soundEnabled:boolean;
    onToggle:()=>void;
}

export default function SoundToggle({soundEnabled,onToggle}:SoundToggleProps){
    return(
        <button onClick={onToggle}
                aria-label="Toggle typing sound"
                style = {{
                            position:'sticky',
                            top:'1rem',
                            float:'left',
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
            {soundEnabled ? "🔊" : "🔇"}
        </button>
    );
}