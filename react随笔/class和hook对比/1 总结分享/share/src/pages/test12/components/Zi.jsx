import React from "react";

const Zi = props => {

    const {obj = {}, onChange} = props;


    console.log('------render-----');
    return (
        <div>
            <p>父组件传值object.count：{obj.count}</p>
        </div>
    );
};

// export default Zi;
export default React.memo(Zi);