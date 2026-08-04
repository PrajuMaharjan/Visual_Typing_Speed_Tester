interface WpmCounterProps{
    wpm:number;
}

export default function WPMCounter({wpm} : WpmCounterProps){
    return(
        <div style= {{
                        display:"inline-block",
                        padding:"0.5 rem 1.25rem",
                        margin:"0 0.5rem",
                        border:"1px solid #ccc",
                        borderRadius:"8px",
                        fontFamily:"monospace",
                        fontSize:"1.1rem",
                        minWidth:"90px"
                    }}
        >
            {wpm} wpm
        </div>
    )
}