import React from "react";

class Test2 extends React.PureComponent {
    state = {
        count: 0
    };

    handleAlertClick = () => {
        setTimeout(() => {
            alert('You clicked on: ' + this.state.count);
        }, 3000)
    };

    render() {
        return (
            <div>
                <p>You clicked {this.state.count} times</p>
                <button onClick={() => this.setState({count: this.state.count + 1})}>
                    增加 count
                </button>
                <button onClick={this.handleAlertClick}>
                    显示 count
                </button>
            </div>
        );
    }
}

export default Test2;