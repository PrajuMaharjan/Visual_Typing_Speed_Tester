interface ClockProps{
    elapsed:number;
    timeRemaining?:number | null;
}

export default function Clock({elapsed,timeRemaining} : ClockProps){
    // Only for Timed Mode
    const isCountdown=timeRemaining !=null;
    const displaySeconds=isCountdown ? Math.ceil(timeRemaining) : Math.floor(elapsed);
    
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
                        color:"var(--color-text)",
                    }}
        >
            ⏱ {displaySeconds}s
        </div>
    );
}