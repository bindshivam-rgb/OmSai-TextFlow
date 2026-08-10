import { useState } from "react";
function Counter() {
    const [count, setCount] = useState(0);
    return(
        <div className="h-screen flex flex-cols items-center justify-center">
            <h1 className="text-6xl font-bold">{count}</h1>
            <button onClick={() => setCount (count + 1)} className="mt-8 bg-blue-700 
            text-white px-6 py-3 rounded-xl">Increase</button>
        </div>
    );
}
export default Counter;