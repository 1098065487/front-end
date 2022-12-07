import React from "react";

// class Zi extends React.PureComponent {
class Zi extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            preFunc: props.onChange.toString(),
            preObj: JSON.stringify(props.obj)
        };
    }

    shouldComponentUpdate(nextProps, nextState, nextContext) {
        if(this.state.preFunc === nextProps.onChange.toString() && this.state.preObj === JSON.stringify(nextProps.obj)) {
            return false;
        } else {
            this.setState({
                preFunc: nextProps.onChange.toString(),
                preObj: JSON.stringify(nextProps.obj)
            });
            return true;
        }
    }

    render() {
        console.log('------render-----');

        return (
            <div>
                <p>父组件传值object.count：{this.props.obj.count}</p>
            </div>
        );
    }
}

export default Zi;