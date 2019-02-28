import React from 'react';

class Toast extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            show: false,
            text: ''
        }
    }

    show(text, ck, time) {
        this.setState({show: true, text}, () => {
            this.timer = setTimeout(() => {
                this.setState({show: false}, () => ck && ck())
            }, time || 1500)
        })
    }

    componentWillUnmount() {
        this.timer && clearTimeout(this.timer)
    }

    render() {
        const {show, text} = this.state;
        return (
            [
                show &&
                <div className="Toast" key={'Toast'}>
                    <div className="text">{text}</div>
                </div>
            ]
        );
    }
}

export default Toast;