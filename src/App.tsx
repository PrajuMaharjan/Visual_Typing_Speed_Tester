import { useTypingEngine } from "./hooks/useTypingEngine";

function App() {
  const {target,typed,handleInputChange,reset}=useTypingEngine();

  return (
    <div>
      <h1>Visual Typing Speed Tester</h1>

      {/* the field where the words appear */}
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

      {/* The field where the user types */}
      <input value={typed}
             onChange={(e)=>handleInputChange(e.target.value)}
             autoFocus
      />

      {/* Restart Button */}
      <button onClick={reset}>Restart</button>
    
    </div>
  );
}

export default App;