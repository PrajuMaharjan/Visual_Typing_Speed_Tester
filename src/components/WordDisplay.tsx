interface WordDisplayProps{
    target:string;
    typed:string;
}

export default function WordDisplay({target,typed} : WordDisplayProps){
    return(
        <p>{[...target].map((char,i)=>{
            let color="black";
            let textDecoration="none";

            if(i<typed.length){
              if(typed[i] === char){
                color="green";
                textDecoration="line-through";
              } else{
                color="red";
            }
          }
            
            return(
              <span key={i} style={{color,textDecoration}}>
                {char}
              </span>
            );
          })}
      </p>

    );
}