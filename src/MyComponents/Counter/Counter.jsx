
import { useState } from 'react';
import './counter.css';

export default function Counter (){

 const [count , setCount] = useState(1  );

    return (
        <div className="Counter"> 
            <span className="count">{count}</span><br></br>
            <button className="counterButton" onClick={incrementCounterFunction} >Increment  {count}</button>
        </div>

    );

  function incrementCounterFunction() {

    setCount(count+1)
       // alert("increment clicked = "+(cnt)+"\n Counter is = "+count);
       
    }
}