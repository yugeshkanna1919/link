import { useState } from "react";
import './State.css';

const State = () => {
    const [count, setCount] = useState(0);

    const handleIncrement = () => {
        setCount(count + 1);
    };
    const handleDecrement = () => {
        setCount(count - 1);
    };

    return (
      <div>
         <button onClick={handleIncrement}>👍</button>
         <button onClick={handleDecrement}>👎</button>
         <h1>Count: {count}</h1>
         </div>
    );
};

export default State;