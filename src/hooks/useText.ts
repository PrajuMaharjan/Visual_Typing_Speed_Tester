import { useState,useEffect } from "react";

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