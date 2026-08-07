import { useState,useEffect } from "react";

// For completion mode : Reads {length} lines
// For timed mode : Reads a line at a time. Is called when user is close to completing his line
export function getRandomLines(lines:string[],count:number):string{
    const selected:string[]=[];

    for(let i=0;i<count;i++){
        if(lines.length===0) break;
        const randomIndex=Math.floor(Math.random()*lines.length);
        selected.push(lines[randomIndex]);
    }
    return selected.join(" ");
}
export function useText(){
    const [text,setText]=useState<string[]>([]);
    const [loaded,setLoaded]=useState(false);

    useEffect(()=>{
        fetch('/text.txt')
            .then((res)=>res.text())
            .then((text)=>{
                const lines=text.split("\n").filter((line)=>line.trim().length>0);
                setText(lines);
            })
            .catch(()=>{
                setText([]);
            })
            .finally(()=>{
                setLoaded(true);
            });
    },[]);

    return {text,loaded}
}