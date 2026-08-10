import { useState } from "react";
import { useNavigate } from "react-router-dom";

interface DropDownOption{
    label:string;
    value:string;
}

interface TestoptionCardProps{
    title:string;
    subheader:string;
    type:"timed" | "completion";
    primaryLabel:string;
    primaryParamName:string;
    primaryOptions:DropDownOption[];
}

const CONTENT_OPTIONS:DropDownOption[]=[
    {label:"Random Words",value:"words"},
    {label:"Text Excerpt",value:"text"},
];

export default function TestOptionCard({title,subheader,type,primaryLabel,primaryParamName,primaryOptions} : TestoptionCardProps){
    const navigate=useNavigate();

    const [primaryValue,setPrimaryValue]=useState(primaryOptions[0].value);
    const [contentValue,setContentValue]=useState(CONTENT_OPTIONS[0].value);

    function handleStart(){
        const params=new URLSearchParams({
            type,
            [primaryParamName]:primaryValue,
            content:contentValue,
        });
        navigate(`/test?${params.toString()}`);
    }

    return(
        <div style={{
                        flex:"1 1 240px",
                        maxWidth:"320px",
                        border:"1px solid var(--color-border)",
                        borderRadius:"12px",
                        padding:"1.5rem",
                        textAlign:"center",
                        fontFamily:'monospace',
                        color:"var(--color-text)"
                    }}
        >
            <h2 style={{margin:"0 0 0.5rem"}}>{title}</h2>
            
            <p style={{margin:"0 0 1.25rem",color:"var(--color-text-muted)",fontSize:"0.95rem"}}>{subheader}</p>

            <div style={{marginBottom:"0.75rem",textAlign:"left"}}>
                <label style={{display:"block",fontSize:"0.85rem",marginBottom:"0.25rem",color:"var(-color-text-muted)"}}>
                    {primaryLabel}
                </label>
                <select value={primaryValue}
                        onChange={(e)=>setPrimaryValue(e.target.value)}
                        style={{width:"100%",padding:"0.4rem",fontFamily:"monospace",borderRadius:"6px",border:"1px solid var(--color-border)",backgroundColor:"var(--color-surface)",color:"var(--color-text)"}}
                >
                    {primaryOptions.map((opt)=>(
                        <option key={opt.value} value={opt.value}>{opt.label}</option>
                    ))}
                </select>
            </div>

            <div style={{marginBottom:"1.25rem",textAlign:"left"}}>
                <label style={{display:"block",fontSize:"0.85rem",marginBottom:"0.25rem",color:"var(--color-text-muted)"}}>
                    Content
                </label>
                <select value={contentValue}
                        onChange={(e)=>setContentValue(e.target.value)}
                        style={{
                                    width:"100%",
                                    padding:"0.4rem",
                                    fontFamily:"monospace",
                                    borderRadius:"6px",
                                    border:"1px solid var(--color-border)",
                                    backgroundColor:'var(--color-surface)',
                                    color:"var(--color-text)",
                                }}
                >
                    {CONTENT_OPTIONS.map((opt)=>(
                        <option key={opt.value} value={opt.value}>{opt.label}</option>
                    ))}
                </select>
            </div>

            {/* Start button */}
            <button onClick={handleStart}
                    style={{
                                width:"100%",
                                padding:"0.6rem 1rem",
                                borderRadius:"8px",
                                border:"none",
                                backgroundColor:"var(--color-button-primary-bg)",
                                color:"var(--color-button-primary-text)",
                                fontFamily:"monospace",
                                fontSize:"1rem",
                                cursor:"pointer"
                            }}
            >
                Start
            </button>
        </div>
    );
}