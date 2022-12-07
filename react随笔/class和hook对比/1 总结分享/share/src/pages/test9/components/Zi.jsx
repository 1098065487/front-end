import React, {useImperativeHandle, useState} from "react";

// const Zi = (props, ref) => {
const Zi = (props) => {
    const {fuRef} = props;

    const [count, setCount] = useState(0);

    // useImperativeHandle(ref, () => (
    useImperativeHandle(fuRef, () => (
        {
            ziCount: count,
            print: () => {
                console.log('方法-----', count);
            }
        }
    ));

    return (
        <div>
            <p>子组件当前值为：{count}</p>
            <button onClick={() => setCount(count + 1)}>
                子组件值 + 1
            </button>
        </div>
    );
};

// export default React.forwardRef(Zi);
export default Zi;