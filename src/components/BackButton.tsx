interface BackButtonProps{
    onClick:()=>void;
}

export default function BackButton({onClick} : BackButtonProps){
    return(
        <button onClick={onClick}
                style=  {{
                            padding:"0.6rem 1.75rem",
                            borderRadius:"8px",
                            border:"1px solid var(--color-button-secondary-border)",
                            backgroundColor:"var(--color-button-secondary-bg)",
                            color:"var(--color-button-secondary-text)",
                            cursor:"pointer",
                            fontFamily:"monospace",
                            fontSize:"1rem",
                            fontWeight:600,
                            minWidth:"90px"
                        }}
        >
            Back To Home
        </button>
    );
}