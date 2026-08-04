export type Mode = "words" | "text";

interface ModeToggleProps{
    mode:Mode;
    onChange:(mode:Mode)=>void;
}

export default function ModeToggle({mode,onChange} : ModeToggleProps){
    return(
        <div>
            <button disabled={mode === "words"} onClick={()=>onChange("words")}>
                Random Words
            </button>

            <button disabled={mode==="text"} onClick={()=>onChange("text")}>
                Text
            </button>
        </div>
    );
}