interface WordsStatCounterProps{
    label:string;
    value:number;
}

export default function WordsStatCounter({label,value} : WordsStatCounterProps){
    return(
        <div style= {{
                        display:"inline-flex",
                        alignItems:"center",
                        justifyContent:"center",
                        padding:"0.5rem 1.25rem",
                        margin:"0 0.5rem",
                        border:"1px solid #ccc",
                        borderRadius:"8px",
                        fontFamily:"monospace",
                        fontSize:"1.1rem",
                        minWidth:"90px",
                    }}
        >
            {label} : {value}
        </div>
    );
}