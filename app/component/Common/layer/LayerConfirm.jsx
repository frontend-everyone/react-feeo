import React from 'react';
import LayerModalHOC from './LayerModalHOC';

@LayerModalHOC()
class LayerConfirm extends React.Component {
    render() {
        return this.props.children;
    }
}

export default LayerConfirm;