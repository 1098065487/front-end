import React from "react";
import Zi from './components/Zi';

class Test6 extends React.PureComponent {
    constructor(props) {
        super(props);
        this.state = {
            count: 0,
        };
    }

    onChange = val => {
        this.setState({
            count: val,
        })
    };

    render() {
        return (
            <div>
                <p>父组件当前值为：{this.state.count}</p>
                <button onClick={() => this.setState({count: this.state.count + 1})}>
                    父组件值 + 1
                </button>
                <Zi count={this.state.count} onChange={this.onChange} />
            </div>
        );
    }
}

export default Test6;