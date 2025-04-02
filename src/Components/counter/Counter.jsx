export default function Counter() {
    return(
        <div className="Counter">Counter
            <span className="count">0</span>
            <button className="counterButton" onClick={incrementCounterFunction}>increment</button>
         </div>
    )
}

function incrementCounterFunction() {
alert('Clicked')
}