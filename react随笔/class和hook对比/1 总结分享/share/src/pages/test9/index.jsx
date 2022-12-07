import React, {useRef} from "react";
import Zi from "./components/Zi";

const Test9 = () => {
    const fuRef = useRef();

    return (
        <div>
            <button onClick={() => console.log('属性---------', fuRef.current?.ziCount)}>
                属性打印当前子组件值
            </button>
            <button onClick={() => fuRef.current?.print()}>
                方法打印当前子组件值
            </button>
            {/*<Zi ref={fuRef} />*/}
            <Zi fuRef={fuRef} />
        </div>
    );
};

export default Test9;