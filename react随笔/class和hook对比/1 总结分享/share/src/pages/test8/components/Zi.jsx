import React from "react";

class Zi extends React.PureComponent {
    constructor(props) {
        super(props);
        this.state = {
            count: 0,
        };
    }

    componentDidMount() {
        this.props.onRef(this);
    }

    print = () => {
        console.log('方法--------', this.state.count);
    };

    render() {
        return (
            <div>
                <p>子组件当前值为：{this.state.count}</p>
                <button onClick={() => this.setState({count: this.state.count + 1})}>
                    子组件值 + 1
                </button>
            </div>
        );
    }
}

export default Zi;