import React, {useState} from "react";

const Test1 = () => {
    const [count, setCount] = useState(0);

    const handleAlertClick = () => {
        setTimeout(() => {
            alert('You clicked on: ' + count);
        }, 3000)
    };

    return (
        <div>
            <p>You clicked {count} times</p>
            <button onClick={() => setCount(count + 1)}>
                增加 count
            </button>
            <button onClick={handleAlertClick}>
                显示 count
            </button>
        </div>
    );
};

export default Test1;