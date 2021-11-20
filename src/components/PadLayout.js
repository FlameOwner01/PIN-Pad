import { useState } from "react";
 const mainPin = "1234";

const PadLayout = () =>{

    const [inputValue, setInputValue] = useState([]);
    const [counter, setCounter] = useState(1);
    const [isDisabled, setIsDisabled] = useState(false);
    const [inputText, setInputText] = useState("password");
    
    var number = 0;
    
    // userPin && njiovPin

    let commaSep = inputValue.map(e => e.value).join('');
    console.log(commaSep);
  
      const pad = [
        "1", "2", "3",
        "4", "5", "6",
        "7", "8", "9",
        "clear", "0",
    ];
    const enterPin = () =>{
        if(commaSep === "ERROR" || commaSep === "LOCKED") return;
        setCounter(counter+1);
        console.log('counter: ',counter);
        if(counter > 2 && commaSep!== mainPin){
            setInputText("text");
            setInputValue([...commaSep, {value: "LOCKED"}]);
            setIsDisabled(true);
            setTimeout(function(){
                        setIsDisabled(false);
                }, 30000);
            setCounter(1);
            
            
            console.log('is disabled: ',isDisabled);

        }else if(commaSep !== mainPin){
            setInputText("text");
            setInputValue([...commaSep, {value: "ERROR"}]);
            
        }
        else if (commaSep === mainPin){
            setIsDisabled(true);
            setInputText("text");
            setInputValue([...commaSep, {value: "OK"}]);
            
            setTimeout(function(){
                setInputValue([]);
                setText();
                setIsDisabled(false);
        }, 3000);
       
            setCounter(1);
            
            
        }

        
    }
    const setText = () =>{
        setInputText("password");
    }
   

    return (
        
        <div className="pin-login" id="main-pin-login">
            <input type={inputText} value = {commaSep} readOnly className="pin-login-text" id = "inputValue"></input>
        <div className="pin-login-numpad" >
            

               {pad.map((keys, i)=>{
                   
                   return <input className="pin-login-key" type="button" id="but" value={keys} key = {i} disabled={isDisabled} onClick={() =>{
                    if(inputText === "OK"){
                        setInputValue([]);
                        setText();
                         
                    }
                    if(inputText === "ERROR" || inputText === "LOCKED"){
                        setText();
                        setInputValue([]);
                        
                }
               
                       if(keys === "clear") {
                           setText();
                            setInputValue([]);
                    }
                        else{
                           number = parseInt(keys);
                           if(commaSep.length < 4){
                           setInputValue([...inputValue, {
                           value: number
                        }]);
                      }
                    }
                    
                   }}></input>
               })}
               <button className="pin-login-key" id="enter-btn" disabled={isDisabled} onClick ={() => {
                   enterPin();
                   }}>enter</button>
               
            </div>
        </div>
    

    )
}

export default PadLayout;