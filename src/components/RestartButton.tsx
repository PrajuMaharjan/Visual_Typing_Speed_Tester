interface RestartButtonProps{
    onClick:()=>void;
}

export default function RestartButton({onClick} : RestartButtonProps){
    return(
        <button onClick={onClick}>Restart</button>
    );
}