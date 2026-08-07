import TestOptionCard from "../components/TestOptionCard";
import cat from "../../assets/images/cat.gif";

export default function LandingPage() {
    return (
        <div style= {{
                    minHeight:"100vh",
                    backgroundColor:"#eaf7ec"
                    }}
        >
            <div style={{
                            maxWidth:"700px",
                            margin:"0 auto",
                            padding:"2rem 1rem 4rem",
                            textAlign:"center",
                            fontFamily:"sans-serif"
                        }}
            >
                <h1>Visual Typing Speed Tester</h1>

                {/* Humor */}
                <img  src={cat}
                        alt="Typing speed tester"
                        style={{
                                    maxWidth:"280px",
                                    width:"100%",
                                    margin:"1rem auto",
                                    borderRadius:"8px",
                                    display:"block"
                            }}
                />

                <div style={{display:"flex",flexWrap:"wrap",justifyContent:"center",gap:"1.5rem",marginTop:"2rem"}}>

                    <TestOptionCard title="Timed Tests"
                                    subheader="Type as much as you can before time runs out."
                                    type="timed"
                                    primaryLabel="Duration"
                                    primaryParamName="duration"
                                    primaryOptions={[
                                                        {label:"1 min",value:"1"},
                                                        {label:"2 min",value:"2"},
                                                        {label:"3 min",value:"3"},
                                                    ]}
                    />

                    <TestOptionCard title="Completion Tests"
                                    subheader="Type until you've finished the passage."
                                    type="completion"
                                    primaryLabel="Length"
                                    primaryParamName="length"
                                    primaryOptions={[
                                                        {label:"1 line",value:"1"},
                                                        {label:"2 line",value:"2"},
                                                        {label:"3 line",value:"3"},
                                                    ]}
                    />

                </div>
            </div>
        </div>
    );
}