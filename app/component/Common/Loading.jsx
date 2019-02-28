import React from 'react';

class Loading extends React.Component {
    constructor(props) {
        super(props);
        this.num = 0;
        this.state = {
            show: false
        }
    }

    open() {
        this.num++;
        this.setState({show: true})
    }

    close() {
        this.num--;
        if(this.num <= 0 ){
            this.num = 0;
            this.setState({show: false})
        }
    }

    render() {
        const {show} = this.state;
        return (
            [
                show &&
                <div className="Loading" key={'loading'}>
                    <div className="loadEffect">
                        <i/>
                        <i/>
                        <i/>
                        <i/>
                        <i/>
                        <i/>
                        <i/>
                        <i/>
                    </div>
                </div>
            ]
        );
    }
}

export default Loading;