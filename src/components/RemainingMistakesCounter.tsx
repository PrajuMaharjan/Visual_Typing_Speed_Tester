interface RemainingMistakesCounterProps{
    leftMistakes:number;
    rightMistakes:number;
}

export default function RemainingMistakesCounter({leftMistakes,rightMistakes} : RemainingMistakesCounterProps){
    const hasMistakes=leftMistakes>0 || rightMistakes>0;

    return(
        <div style= {{
                        display:"inline-flex",
                        alignItems:"center",
                        justifyContent:"center",
                        padding:"0.5rem 1.25rem",
                        margin:"0 0.5rem",
                        border:"1px solid var(--color-border)",
                        borderRadius:"8px",
                        fontFamily:"monospace",
                        fontSize:"1.1rem",
                        minWidth:"200px",
                        color:hasMistakes ? "var(--color-mistake)" : "var(--color-text)"
                    }}
        >
            Remaining Mistakes : 🢘 {leftMistakes} | {rightMistakes} 🢚
        </div>
    );
}