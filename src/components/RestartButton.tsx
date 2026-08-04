interface RestartButtonProps{
    onClick:()=>void;
}

export default function RestartButton({onClick} : RestartButtonProps){
    return(
        <button onClick={onClick}
                style=  {{
                            padding:"0.6rem 1.75rem",
                            borderRadius:"8px",
                            border:"none",
                            backgroundColor:"#333",
                            color:"white",
                            cursor:"pointer",
                            fontFamily:"monospace",
                            fontSize:"1rem",
                            fontWeight:600,
                            minWidth:"90px"
                        }}
        >
            Restart
        </button>
    );
}