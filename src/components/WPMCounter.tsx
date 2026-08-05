interface WpmCounterProps{
    wpm:number;
}

export default function WPMCounter({wpm} : WpmCounterProps){
    return(
        <div style= {{
                        display:"inline-flex",
                        padding:"0.5rem 1.25rem",
                        alignItems:"center",
                        justifyContent:"center",
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