/**
 * Created by Kirk liu on 2018/8/6.
 */
import React from 'react';
import '../../public/css/common/UpLoadPic.pcss'
import apiRequest from "../../public/js/apiRequest";

class PicUpLoad extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            preview:''
        };
    }

    loadImg = () => {
        const imgFrom = document.getElementById("inputArea2");
        imgFrom.click();
    };
    inputChange = () => {
        const imgFrom = document.getElementById("inputArea2");
        let myFrom = new FormData();
        let imageData = imgFrom.files[0];//获取表单中第一个文件
        myFrom.append("file", imageData);//向表单中添加一个键值对
        let reader = new FileReader(); //调用FileReader对象
        reader.readAsDataURL(imageData); //通过DataURL的方式返回图像
        reader.onload = (e)=> {
            this.upload(e.target.result,myFrom)
        };
    };
    upload = (result,myFrom) => {
        apiRequest.post('uploadPic', {uploadPic: true, data: myFrom}, () => {
            this.setState({preview:result})
        }, () => {
            this.setState({preview:result})
        })
    };

    componentDidMount() {

    }

    render() {
        const {preview} = this.state;
        return (
            <div className="UploadPic">
                <img src={preview} alt=""/>
                <input id="inputArea2" type="file" onChange={this.inputChange}/>
                <button onClick={this.loadImg}>
                    上传图片
                </button>
            </div>
        );
    }
}

export default PicUpLoad;