import React from "react";
import Zi from './components/Zi';

class Test11 extends React.PureComponent {
    constructor(props) {
        super(props);
        this.state = {
            count: 1,
            obj: {
                count: 1
            }
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
                <p>父组件当前count值：{this.state.count}</p>
                <input value={this.state.count} onChange={e => this.setState({count: e.target.value})} />
                <br />
                <br />
                <p>父组件当前obj.count值：{this.state.obj.count}</p>
                <button onClick={() => this.setState({obj: {count: this.state.obj.count + 1}})}>
                    父组件值obj.count + 1
                </button>
                <button onClick={() => this.setState({obj: {count: this.state.obj.count}})}>
                    父组件值obj.count值不变(换对象)
                </button>
                <p>(setState对于引用类型，地址不变，不识别为变化)</p>
                <button onClick={() => {const newObj = this.state.obj; newObj.count += 1; this.setState({obj: newObj})}}>
                    父组件值obj.count + 1(不渲染)
                </button>
                <br />
                <br />
                <p>以下为子组件</p>
                <Zi obj={this.state.obj}  onChange={this.onChange} />
            </div>
        );
    }
}

export default Test11;