export type Mode = "words" | "text";

interface ModeToggleProps{
    mode:Mode;
    onChange:(mode:Mode)=>void;
}

export default function ModeToggle({mode,onChange} : ModeToggleProps){
    function buttonStyle(isActive:boolean){
        return{
            padding:"0.5rem 1.25rem",
            flex:1,
            border:"none",
            color:"white",
            backgroundColor:isActive ? "green" : "red",
            cursor:isActive ? "default" : "pointer",
            fontWeight:600,
            fontSize:"0.95rem",
        };
    }
    
    return(
        <div style={{display:"flex",justifyContent:"center",maxWidth:"400px",margin:"1.5rem auto"}}>
            <button disabled={mode === "words"} onClick={()=>onChange("words")} style={buttonStyle(mode==="words")}>
                Random Words
            </button>

            <button disabled={mode==="text"} onClick={()=>onChange("text")} style={buttonStyle(mode==="text")}>
                Text
            </button>
        </div>
    );
}