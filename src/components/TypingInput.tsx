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
                style = {{
                        display:"block",
                        width:"100%",
                        maxWidth:"600px",
                        margin:"0 auto",
                        padding:"0.75rem 1rem",
                        fontFamily:"monospace",
                        fontSize:"1.5rem",
                        textAlign:'center',
                        border:"2px solid #ccc",
                        borderRadius:"8px",
                        outline:"none",
                        boxSizing:"border-box",
                        }}
        />
    );
}