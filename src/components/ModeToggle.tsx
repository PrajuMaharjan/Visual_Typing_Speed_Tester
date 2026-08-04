export type Mode = "words" | "text";

interface ModeToggleProps{
    mode:Mode;
    onChange:(mode:Mode)=>void;
}

export default function ModeToggle({mode,onChange} : ModeToggleProps){
    function buttonStyle(isActive:boolean){
        return{
            padding:"0.5rem 1.25rem",
            margin:"0 0.5rem",
            border:"none",
            borderRadius:"6px",
            color:"white",
            backgroundColor:isActive ? "green" : "red",
            cursor:isActive ? "default" : "pointer",
            fontWeight:600,
            fontSize:"0.95rem",
        };
    }
    
    return(
        <div style={{display:"flex",justifyContent:"center",margin:"1.5rem 0"}}>
            <button disabled={mode === "words"} onClick={()=>onChange("words")} style={buttonStyle(mode==="words")}>
                Random Words
            </button>

            <button disabled={mode==="text"} onClick={()=>onChange("text")} style={buttonStyle(mode==="words")}>
                Text
            </button>
        </div>
    );
}