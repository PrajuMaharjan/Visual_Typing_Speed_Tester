import { useState,useEffect,useCallback } from "react";

type Theme="light" | "dark";

const STORAGE_KEY="theme";

function getStoredTheme():Theme{
    const stored=localStorage.getItem(STORAGE_KEY);
    return stored==="dark" ? "dark" : "light";
}

export function useTheme(){
    const [theme,setTheme]=useState<Theme>(getStoredTheme);

    // Apply theme and store in local storage for next visit
    useEffect(()=>{
        document.documentElement.setAttribute("data-theme",theme);
        localStorage.setItem(STORAGE_KEY,theme);
    },[theme]);

    const toggleTheme=useCallback(()=>{
        setTheme(prevTheme=>prevTheme==="light" ? "dark" : "light");
    },[]);

    return {theme,toggleTheme};
}