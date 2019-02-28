/**
 * Created by Kirk liu on 2017/8/17.
 * @LayerModalHOC('我要应答')
 * import Answer from 'shop/demand/common/Answer';
 * 组件内部处理
 *
 */
import React, {Component} from 'react';
import layerCommon from './layerCommon'

export default (title) => (ComponentParam) => {
    return class HOC extends Component {
        constructor(props) {
            super(props);
            this.state = {
                show: false,
                now: '',
                drag_x: '',
                drag_y: ''
            }
        }

        show() {
            this.setState({show: !this.state.show, now: 'layerModal_' + new Date().getTime()}, () => {
                if (this.state.show) {
                    layerCommon.windowAuto(this.state.now);
                    window.onresize = () => layerCommon.windowAuto(this.state.now)
                }
            })
        }

        render() {
            let state = this.state;
            return (
                <div>
                    {
                        state.show ?
                            <div className="layerModal" id={state.now}>
                                <div className="Modal animation-default animation-default-scale" id="layer_modal"
                                     style={{top: state.drag_y, left: state.drag_x}}
                                >
                                    <div className="head"
                                         onMouseDown={(e) => {
                                             let oDiv = document.getElementById("layer_modal");
                                             let disX = e.clientX - oDiv.offsetLeft;
                                             let disY = e.clientY - oDiv.offsetTop;
                                             if (oDiv.setCapture) {
                                                 oDiv.setCapture();
                                             }
                                             let dragBox_width = oDiv.offsetWidth;
                                             let dragBox_height = oDiv.offsetHeight;
                                             let clientWidth = document.body.clientWidth;
                                             let clientHeight = document.body.clientHeight;
                                             document.body.style.userSelect = 'none';//禁止选择
                                             document.onmousemove = (e) => {
                                                 let drag_x = e.clientX - disX;
                                                 let drag_y = e.clientY - disY;
                                                 this.setState({
                                                     drag_x: drag_x >= 0 ? dragBox_width + drag_x >= clientWidth ? clientWidth - dragBox_width : drag_x : 0,
                                                     drag_y: drag_y >= 0 ? dragBox_height + drag_y >= clientHeight ? clientHeight - dragBox_height : drag_y : 0
                                                 })
                                             };
                                             document.onmouseup = () => {
                                                 document.onmousemove = null;
                                                 document.body.style.userSelect = 'initial';//解除选择
                                                 if (oDiv.releaseCapture) {
                                                     oDiv.releaseCapture()
                                                 }
                                             };
                                             return false;//阻止默认行为（如果页面中有文字，则会默认拖动文字），ie8及一下不行
                                         }}
                                    >
                                        <div className="title fl">{title || this.props.title || '提醒'}</div>
                                        <i className="ico-close fr" onClick={this.show.bind(this)}>
                                            <i className="ico-close-line"/>
                                            <i className="ico-close-line line2"/>
                                        </i>
                                    </div>
                                    <div className="content">
                                        <ComponentParam {...this.props} show={this.show.bind(this)}/>
                                    </div>
                                </div>
                            </div>
                            :
                            null
                    }
                </div>
            )
        }
    }
};