import React, {useState, useMemo, useCallback} from "react";
import Zi from "./components/Zi";

const Test12 = () => {
    const [count, setCount] = useState(1);
    const [obj, setObj] = useState({count: 1});

    const onChange = val => {
        setCount(val)
    };

    const memoObj = useMemo(() => {
        return obj;
    }, [obj.count]);

    const memoChange = useCallback(val => {
        return setCount(val)
    }, []);

    return (
        <div>
            <p>父组件当前count值：{count}</p>
            <input value={count} onChange={e => setCount(e.target.value)} />
            <br />
            <br />
            <p>父组件当前obj.count值：{obj.count}</p>
            <button onClick={() => setObj({count: obj.count + 1})}>
                父组件值obj.count + 1
            </button>
            <button onClick={() => setObj({...obj})}>
                父组件值obj.count值不变(换对象)
            </button>
            <p>(setState对于引用类型，地址不变，不识别为变化)</p>
            <button onClick={() => {const newObj = obj; newObj.count += 1; setObj(newObj)}}>
                父组件值obj.count + 1(不渲染)
            </button>
            <br />
            <br />
            <p>以下为子组件</p>
            {/*<Zi />*/}
            {/*<Zi count={count}/>*/}
            {/*<Zi obj={obj} onChange={onChange} />*/}
            <Zi obj={memoObj}  onChange={memoChange} />
        </div>
    );
};

export default Test12;