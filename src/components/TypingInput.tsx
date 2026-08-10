import { useEffect, useRef} from "react";
import type {KeyboardEvent,MouseEvent,ChangeEvent } from "react";

interface TypingInputProps{
    typed:string;
    target:string;
    cursor:number;
    onType:(char:string) => void;
    onBackspace:()=>void;
    onMoveLeft:()=>void;
    onMoveRight:()=>void;
    disabled:boolean;
    playKeySound:(isMistake?:boolean)=>void;
}

export default function TypingInput({typed,target,cursor,onType,onBackspace,onMoveLeft,onMoveRight,disabled,playKeySound} : TypingInputProps){
    const inputRef=useRef<HTMLInputElement>(null);

    // take over default browser type events with custom event
    useEffect(()=>{
        const element=inputRef.current;
        if(!element) return;
        
        element.setSelectionRange(cursor,cursor);

        const charWidth=element.scrollWidth/Math.max(typed.length,1);
        const cursorPos=cursor*charWidth;
        const visibleWidth=element.clientWidth;

        if(cursorPos<element.scrollLeft){
            element.scrollLeft=cursorPos;
        }else if(cursorPos>element.scrollLeft+visibleWidth){
            element.scrollLeft=cursorPos-visibleWidth+charWidth;
        }
    },[cursor,typed]);

    function handleKeyDown(e:KeyboardEvent<HTMLInputElement>){

        // Allowed keys for browser shortcuts
        if(e.ctrlKey || e.metaKey || e.altKey) return;

        if(e.key==="Unidentified"){
            return;
        }

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
            playKeySound(false);
            onBackspace();
            return;
        }

        if(e.key.length !== 1){
            e.preventDefault();
            return;
        }

        e.preventDefault();
        const isMistake=e.key !== target[cursor];
        playKeySound(isMistake);
        onType(e.key);
    }

    function handleChange(e:ChangeEvent<HTMLInputElement>){
        if(e.target.value.length > typed.length){
            const typedChar=e.target.value[e.target.value.length-1];
            const isMistake=typedChar !== target[cursor];
            playKeySound(isMistake);
            onType(typedChar);
        }else if(e.target.value.length<typed.length){
            playKeySound(false);
            onBackspace();
        }
    }

    function disabledMouseClick(e:MouseEvent<HTMLInputElement>){
        e.preventDefault();
        inputRef.current?.focus();
    }

    // A "pending" check so that correcting mistakes dont get marked as a mistake itself
    const lengthMatch=typed.length === target.length;

    return(
        <div style={{
                    position:"relative",
                    width:"100%",
                    maxWidth:"600px",
                    margin:"0 auto",
                    }}
        >
            {[...typed].map((char,i)=>{
                const isPending=!lengthMatch && i >= cursor;
                const isCorrect = !isPending && char === target[i];
                
                let color : string;
                if(isPending){
                    color="var(--color-pending)";
                }else if(isCorrect){
                    color="var(--color-correct)";
                }else{
                    color="var(--color-mistake)";
                }

                return(
                    <span key={i} style={{  color,
                                            textDecoration: isCorrect ? "line-through" : "none",
                                        }}
                    >
                        {char}
                    </span>
                );
            })}

            <input  ref={inputRef}
                    value={typed}
                    placeholder="Type here"
                    onChange={handleChange}
                    onKeyDown={handleKeyDown}
                    onMouseDown={disabledMouseClick}
                    autoFocus
                    autoCapitalize="off"
                    disabled={disabled}
                    style = {{
                            display:"block",
                            width:"100%",
                            maxWidth:"600px",
                            margin:"0 auto",
                            padding:"0.75rem 1rem",
                            fontFamily:"monospace",
                            fontSize:"1.5rem",
                            textAlign:'left',
                            border:"2px solid var(--color-border)",
                            borderRadius:"8px",
                            outline:"none",
                            boxSizing:"border-box",
                            backgroundColor:"var(--color-surface)",
                            color:"var(--color-text)"
                            }}
            />
        </div>
    );
}