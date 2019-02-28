/**
 * Created by Kirk liu on 2018/7/9.
 */
import React from 'react';
import LayerConfirm from '../common/layer/LayerConfirm'
import apiRequest from "../../public/js/apiRequest";
import apiManager from "../../public/js/apiManager";
import PicCutUpLoad from '../Common/PicCutUpLoad'
import PicUpLoad from '../Common/PicUpLoad'
import {ajaxFileUpload} from '../../public/plugin/ajaxfileupload';
import '../../public/css/Demo/Index.pcss'

class Main extends React.Component {
    constructor(props) {
        super(props);
        this.state = {};
    }
    getTodo = () =>{
        let data = {

        };
        apiRequest.post('todoList',data,(data)=>{
            console.log(data);
        },(data)=>{
            console.log(data);
        });
    };

    uploadPic() {
        ajaxFileUpload({
            api: apiManager.uploadPic,
            id: 'modifyImg',
            postData: {type: 8},
            size: {num: 3 * 1000 * 1000, text: '3M'},
            successCB: (data) => {
                console.log(data);
            },
            errorCB: (data) => {
                console.log(data);
            },
        });
    }

    componentDidMount() {

    }

    render() {
        return (
            <div className="Demo">
                <span onClick={() => window.Toast.show('123123123132')}>
                    Toast
                </span>
                <span onClick={() => window.Loading.open()}>
                    Loading
                </span>
                <span onClick={() => this.refs['LayerConfirm'].show()}>
                    LayerConfirm
                </span>
                <span onClick={() => this.getTodo()}>
                    api请求
                </span>
                <span>
                    <input type="file" id="modifyImg" name="file"
                           accept=".jpg,.jpeg,.png"
                           onChange={this.uploadPic.bind(this)}
                    />
                </span>
                <LayerConfirm ref="LayerConfirm">
                    <div className="">
                        撒旦撒打算大
                    </div>
                </LayerConfirm>


                <PicCutUpLoad/>
                <PicUpLoad/>
            </div>
        );
    }
}

export default Main;