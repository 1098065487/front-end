import React, {useState} from "react";

const Test7 = props => {
    const {count, onChange} = props;

    const [ziCount, setZiCount] = useState(count);

    const [preFuCount, setPreFuCount] = useState(null);
    if(count !== preFuCount) {
        setPreFuCount(count);
        setZiCount(count)
    }

    return (
        <div>
            <p>父组件传值为：{count}</p>
            <p>子组件当前值为：{ziCount}</p>
            <button onClick={() => setZiCount(ziCount + 1)}>
                子组件值 + 1
            </button>
            <button onClick={() => onChange(ziCount)}>
                当前子组件值传回父组件
            </button>
        </div>
    );
};

export default Test7;