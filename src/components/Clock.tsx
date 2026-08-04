interface ClockProps{
    elapsed:number;
}

export default function Clock({elapsed} : ClockProps){
    return(
        <div style= {{
                        display:"inline-block",
                        padding:"0.5rem 1.25rem",
                        margin:"0 0.5rem",
                        border:"1px solid #ccc",
                        borderRadius:"8px",
                        fontFamily:"monospace",
                        fontSize:"1.1rem",
                        minWidth:"90px"
                    }}
        >
            ⏱ {Math.floor(elapsed)}s
        </div>
    );
}