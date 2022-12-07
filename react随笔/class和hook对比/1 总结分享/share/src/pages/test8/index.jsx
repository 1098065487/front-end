import React from "react";
import Zi from './components/Zi';

class Test8 extends React.PureComponent {
    constructor(props) {
        super(props);
        this.state = {

        };
    }

    onRef = ref => {
        this.child = ref;
    };

    render() {
        return (
            <div>
                <button onClick={() => console.log('属性---------', this.child.state.count)}>
                    属性打印当前子组件值
                </button>
                <button onClick={() => this.child.print()}>
                    方法打印当前子组件值
                </button>
                <Zi onRef={this.onRef} />
            </div>
        );
    }
}

export default Test8;