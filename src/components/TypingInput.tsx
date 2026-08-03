interface TypingInputProps{
    typed:string;
    onChange:(value:string)=>void;
    disabled:boolean;
}

export default function TypingInput({typed,onChange,disabled} : TypingInputProps){
    return(
        <input  value={typed}
                onChange={(e)=>onChange(e.target.value)}
                autoFocus
                disabled={disabled}
        />
    );
}