import { useEffect, useRef, type KeyboardEvent,type MouseEvent } from "react";

interface TypingInputProps{
    typed:string;
    cursor:number;
    onType:(char:string) => void;
    onBackspace:()=>void;
    onMoveLeft:()=>void;
    onMoveRight:()=>void;
    disabled:boolean;
}

export default function TypingInput({typed,cursor,onType,onBackspace,onMoveLeft,onMoveRight,disabled} : TypingInputProps){
    const inputRef=useRef<HTMLInputElement>(null);

    useEffect(()=>{
        inputRef.current?.setSelectionRange(cursor,cursor);
    },[cursor,typed]);

    function handleKeyDown(e:KeyboardEvent<HTMLInputElement>){

        // Allowed keys for browser shortcuts
        if(e.ctrlKey || e.metaKey || e.altKey) return;

        if(e.key==="ArrowLeft"){
            e.preventDefault();
            onMoveLeft();
            return;
        }

        if(e.key==="ArrowRight"){
            e.preventDefault();
            onMoveRight();
            return;
        }

        if(e.key==="Backspace"){
            e.preventDefault();
            onBackspace();
            return;
        }

        if(e.key.length !== 1){
            e.preventDefault();
            return;
        }

        e.preventDefault();
        onType(e.key);
    }

    function disabledMouseClick(e:MouseEvent<HTMLInputElement>){
        e.preventDefault();
        inputRef.current?.focus();
    }

    return(
        <input  ref={inputRef}
                value={typed}
                placeholder="Type here"
                onChange={()=>{}}
                onKeyDown={handleKeyDown}
                onMouseDown={disabledMouseClick}
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