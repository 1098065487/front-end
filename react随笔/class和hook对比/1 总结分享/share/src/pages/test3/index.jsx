import React, {useState, useEffect} from "react";

const Test3 = () => {
    const [count, setCount] = useState(0);

    useEffect(() => {
        document.title = `You clicked ${count} times`;

        // 这里是一个函数闭包
        return () => {
            console.log(`函数组件-页面卸载，当前count：${count}`)

            document.title = '已清空'
        }
    }, [count]);

    return (
        <div>
            <p>You clicked {count} times</p>
            <button onClick={() => setCount(count + 1)}>
                Click me
            </button>
        </div>
    );
};

export default Test3;