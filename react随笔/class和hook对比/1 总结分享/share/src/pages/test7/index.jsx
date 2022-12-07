import React, {useState} from "react";
import Zi from "./components/Zi";

const Test7 = () => {
    const [count, setCount] = useState(0);

    return (
        <div>
            <p>父组件当前值为：{count}</p>
            <button onClick={() => setCount(count + 1)}>
                父组件值 + 1
            </button>
            <Zi count={count} onChange={setCount} />
        </div>
    );
};

export default Test7;