import React from "react";

class Zi extends React.PureComponent {
    constructor(props) {
        super(props);
        this.state = {
            ziCount: props.count,
        };
    }

    static getDerivedStateFromProps(props, state) {
        if (props.count !== state.prevFuCount) {
            return {
                prevFuCount: props.count,
                ziCount: props.count,
            }
        }
        return null;
    }

    render() {
        return (
            <div>
                <p>父组件传值为：{this.props.count}</p>
                <p>子组件当前值为：{this.state.ziCount}</p>
                <button onClick={() => this.setState({ziCount: this.state.ziCount + 1})}>
                    子组件值 + 1
                </button>
                <button onClick={() => this.props.onChange(this.state.ziCount)}>
                    当前子组件值传回父组件
                </button>
            </div>
        );
    }
}

export default Zi;