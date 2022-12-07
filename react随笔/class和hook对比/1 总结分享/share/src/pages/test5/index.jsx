import React from "react";

const Test5 = () => {

    return (
        <div style={{marginTop: 50}}>
            <button onClick={() => console.log(document.title)}>
                打印document.title
            </button>
        </div>
    );
};

export default Test5;