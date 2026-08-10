interface MistakesCounterProps{
    mistakes:number;
}

export default function MistakesCounter({mistakes} : MistakesCounterProps){
    return(
        <div style= {{
                        display:"inline-flex",
                        alignItems:"center",
                        justifyContent:"center",
                        padding:"0.5rem 1.25rem",
                        border:"1px solid var(--color-border)",
                        borderRadius:"8px",
                        fontFamily:"monospace",
                        fontSize:"1.1rem",
                        color:mistakes>0 ? "var(--color-mistake)" : "var(--color-text)"
                    }}
        >
            Mistakes : {mistakes}
        </div>
    );
}