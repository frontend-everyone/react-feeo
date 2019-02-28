/**
 * Created by Kirk liu on 2018/8/6.
 */
import React from 'react';
import '../../public/css/common/PicCut.pcss'
import apiRequest from "../../public/js/apiRequest";

class PicCutUpLoad extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            select: '选择图片',
            upload: false
        };
    }

    loadImg = () => {
        const imgFrom = document.getElementById("inputArea");
        imgFrom.click();
    };
    inputChange = () => {
        this.setState({select: '重新选择', upload: true});
        const imgFrom = document.getElementById("inputArea");
        let myFrom = new FormData();
        let imageData = imgFrom.files[0];//获取表单中第一个文件
        myFrom.append("image", imageData);//向表单中添加一个键值对
        console.log(myFrom.getAll("image"));//获取表单中image字段对应的值，结果见下图

        let reader = new FileReader(); //调用FileReader对象
        reader.readAsDataURL(imageData); //通过DataURL的方式返回图像

        let theCanvas = document.getElementById("imgCanvas");
        let canvasImg = theCanvas.getContext("2d");
        let img = new Image();//创建img对象

        reader.onload = function (e) {
            img.src = e.target.result;
        };

        img.onload = () => {
            theCanvas.width = img.width;//将img对象的长款赋给canvas标签
            theCanvas.height = img.height;
            canvasImg.drawImage(img, 0, 0);

            //截图
            let flag = false;//记录是否为点击状态的标记
            let W = img.width;
            let H = img.height;
            let startX = 0;
            let startY = 0;
            let resultCanvas = document.getElementById("resultCanvas");
            let resultImg = resultCanvas.getContext("2d");
            let cutData = canvasImg.getImageData(100, 100, 200, 200);
            resultImg.putImageData(cutData, 0, 0);
            //当鼠标被按下
            theCanvas.addEventListener("mousedown", e => {
                flag = true;//改变标记状态，置为点击状态
                startX = e.offsetX;//获得起始点横坐标
                startY = e.offsetY;//获得起始点纵坐标
            });

            //当鼠标在移动
            theCanvas.addEventListener("mousemove", e => {
                if (flag) {
                    canvasImg.clearRect(0, 0, W, H);
                    resultImg.clearRect(0, 0, cutData.width, cutData.height);
                    canvasImg.drawImage(img, 0, 0);
                    canvasImg.fillStyle = 'rgba(255,255,255,0.6)';//设定为半透明的白色
                    canvasImg.fillRect(0, 0, e.clientX, startY);//矩形A
                    canvasImg.fillRect(e.clientX, 0, W, e.clientY);//矩形B
                    canvasImg.fillRect(startX, e.clientY, W - startX, H - e.clientY);//矩形C
                    canvasImg.fillRect(0, startY, startX, H - startY);//矩形D
                    cutData = canvasImg.getImageData(startX, startY, e.clientX - startX, e.clientY - startY);
                    resultImg.putImageData(cutData, 0, 0);
                }
            });

            //当鼠标左键抬起
            let resultFile = {};
            theCanvas.addEventListener("mouseup", () => {
                resultCanvas.toBlob(blob => {
                    resultFile = blob;
                    let fd = new FormData();
                    fd.append('file', blob);
                    this.resultFile = fd;
                    console.log(resultFile);//Blob(1797) {size: 1797, type: "image/png"}
                });
                flag = false;//将标志置为已抬起状态
            })
        }
    };
    upload = () => {
        if (!this.state.upload) {
            return
        }
        console.log(this.resultFile);
        apiRequest.post('uploadPic', {uploadPic: true, data: this.resultFile}, () => {

        }, () => {

        })
    };

    componentDidMount() {

    }

    render() {
        const {select, upload} = this.state;
        return (
            <div className="imageUpload">
                <div className="imageSelect">
                    <div className="imgCanvas">
                        <canvas id="imgCanvas"/>
                    </div>
                    <input id="inputArea" type="file" onChange={this.inputChange}/>
                    <button className="imageSelect_button_select" onClick={this.loadImg}>
                        {select}
                    </button>
                    <button className={"imageSelect_button_upload " + (upload ? "ok" : "")} onClick={this.upload}>
                        上传图片
                    </button>
                </div>
                <div className="imageCutting">
                    <canvas id="resultCanvas"/>
                </div>
            </div>
        );
    }
}

export default PicCutUpLoad;