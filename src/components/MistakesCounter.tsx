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
                        border:"1px solid #ccc",
                        borderRadius:"8px",
                        fontFamily:"monospace",
                        fontSize:"1.1rem",
                        color:mistakes>0 ? "red" : "inherit"
                    }}
        >
            Mistakes : {mistakes}
        </div>
    );
}