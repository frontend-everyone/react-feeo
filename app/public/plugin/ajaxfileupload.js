/*
api,id,postData,successCB,errorCB
//直接拷贝下面代码使用
ajaxFileUpload({
    api:apiManager.uploadPic,
    id:'licensePhotoInputId',
    postData:{type: 2},
    size:{num:10 * 1000 * 1000,text:'10M'},// 字节 mb * kb * byte  以1000 换算 不使用1024
    imgPreview:false,//如果是图片 true需要预览 blob , false 不需要预览
    successCB:(data)=>{
        window.Toast.show('营业执照上传成功');
        setTimeout(() => {
            this.setState({licensePhotoUrl: data.url})
        }, 200);
    },
    errorCB:(data)=>{
        window.Toast.show('营业执照上传失败:' + data.message);
    },
});

*/

import $ from 'jquery'

(function (ajaxFileUpload) {
    $.extend({
        createUploadIframe: function (id, uri) {
            //创建 frame
            var frameId = 'jUploadFrame' + id;
            var iframeHtml = '<iframe id="' + frameId + '" name="' + frameId + '" style="position:absolute; top:-9999px; left:-9999px"';
            if (window.ActiveXObject) {
                if (typeof uri == 'boolean') {
                    iframeHtml += ' src="' + 'javascript:false' + '"';
                }
                else if (typeof uri == 'string') {
                    iframeHtml += ' src="' + uri + '"';
                }
            }
            iframeHtml += ' />';
            $(iframeHtml).appendTo(document.body);
            return $('#' + frameId).get(0);
        },
        createUploadForm: function (id, fileElementId, data) {
            //创建 frame
            var formId = 'jUploadForm' + id;
            var fileId = 'jUploadFile' + id;
            var form = $('<form  action="" method="POST" name="' + formId + '" id="' + formId + '" enctype="multipart/form-data"></form>');
            if (data) {
                for (var i in data) {
                    $('<input type="hidden" name="' + i + '" value="' + data[i] + '" />').appendTo(form);
                }
            }
            var oldElement = $('#' + fileElementId);
            var newElement = $(oldElement).clone();
            $(oldElement).attr('id', fileId);
            $(oldElement).before(newElement);
            $(oldElement).appendTo(form);

            //设置属性
            $(form).css('position', 'absolute');
            $(form).css('top', '-1200px');
            $(form).css('left', '-1200px');
            $(form).appendTo('body');
            return form;
        },

        ajaxFileUpload: function (s) {
            s = $.extend({}, $.ajaxSettings, s);
            var id = new Date().getTime()
            var form = $.createUploadForm(id, s.fileElementId, (typeof (s.data) == 'undefined' ? false : s.data));
            var io = $.createUploadIframe(id, s.secureuri);
            var frameId = 'jUploadFrame' + id;
            var formId = 'jUploadForm' + id;
            // 监控请求
            if (s.global && !$.active++) {
                $.event.trigger("ajaxStart");
            }
            var requestDone = false;
            // 创建请求对象
            var xml = {}
            if (s.global)
                $.event.trigger("ajaxSend", [xml, s]);
            //等待一个响应返回
            var uploadCallback = function (isTimeout) {
                var io = document.getElementById(frameId);
                try {
                    if (io.contentWindow) {
                        xml.responseText = io.contentWindow.document.body ? io.contentWindow.document.body.innerHTML : null;
                        xml.responseXML = io.contentWindow.document.XMLDocument ? io.contentWindow.document.XMLDocument : io.contentWindow.document;

                    } else if (io.contentDocument) {
                        xml.responseText = io.contentDocument.document.body ? io.contentDocument.document.body.innerHTML : null;
                        xml.responseXML = io.contentDocument.document.XMLDocument ? io.contentDocument.document.XMLDocument : io.contentDocument.document;
                    }
                } catch (e) {
                    $.handleError(s, xml, null, e);
                }
                if (xml || isTimeout == "timeout") {
                    requestDone = true;
                    var status;
                    try {
                        status = isTimeout != "timeout" ? "success" : "error";
                        //请求成功
                        if (status != "error") {
                            // 处理数据
                            var data = $.uploadHttpData(xml, s.dataType);
                            if (s.success)
                                s.success(data, status);
                            // 触发全局返回
                            if (s.global)
                                $.event.trigger("ajaxSuccess", [xml, s]);
                        } else
                            $.handleError(s, xml, status);
                    } catch (e) {
                        status = "error";
                        $.handleError(s, xml, status, e);
                    }

                    // 请求完成
                    if (s.global)
                        $.event.trigger("ajaxComplete", [xml, s]);

                    // 处理全局AJAX计数器
                    if (s.global && !--$.active)
                        $.event.trigger("ajaxStop");

                    // 处理结果
                    if (s.complete)
                        s.complete(xml, status);

                    $(io).unbind()

                    setTimeout(function () {
                        try {
                            $(io).remove();
                            $(form).remove();

                        } catch (e) {
                            $.handleError(s, xml, null, e);
                        }

                    }, 100)

                    xml = null

                }
            }
            // 超时检查
            if (s.timeout > 0) {
                setTimeout(function () {
                    if (!requestDone) uploadCallback("timeout");
                }, s.timeout);
            }
            try {

                var form = $('#' + formId);
                $(form).attr('action', s.url);
                $(form).attr('method', 'POST');
                $(form).attr('target', frameId);
                if (form.encoding) {
                    $(form).attr('encoding', 'multipart/form-data');
                }
                else {
                    $(form).attr('enctype', 'multipart/form-data');
                }
                $(form).submit();

            } catch (e) {
                $.handleError(s, xml, null, e);
            }

            $('#' + frameId).load(uploadCallback);
            return {
                abort: function () {
                }
            };

        },

        uploadHttpData: function (r, type) {
            var data = !type;
            data = type == "xml" || data ? r.responseXML : r.responseText;
            if (type == "script")
                $.globalEval(data);
            if (type == "json")
                eval("data = " + data);
            if (type == "html")
                $("<div>").html(data).evalScripts();
            return data;
        },
        handleError: function (s, xml, status, e) {
            // If a local callback was specified, fire it
            if (s.error)
                s.error(xml, status, e);

            // Fire the global callback
            if (s.global)
                $.event.trigger("ajaxError", [xml, s, e]);
        }
    })
})($);

let ajaxFileUpload = (obj) => {
    let funMain = () => {
        let input = document.getElementById(obj.id);
        /*判断浏览器是否支持 FileReader */
        if (typeof FileReader === 'undefined') {
            window.Toast.show("抱歉，你的浏览器不支持上传文件,请更换浏览器");
            input.setAttribute('disabled', 'disabled');
            return;
        }
        let file = input.files[0];
        /*判断file 是否存在*/
        if (!file) {
            window.Toast.show('获取文件失败,请重试');
            return;
        }
        /*判断是否 重复*/
        if (obj.uploaded) {
            if (JSON.stringify(obj.uploaded).indexOf(file.name) !== -1) {
                window.Toast.show('所上传的文件已存在');
                return
            }
        }
        /*如果有大小限制*/
        if (obj.size) {
            /*如果有限制大小*/
            if (file.size) {
                let byteSize = file.size;
                if (byteSize > obj.size.num) {
                    window.Toast.show('文件不能超过' + obj.size.text);
                    return;
                }
            } else {
                window.Toast.show('获取文件大小失败,请重试');
                return;
            }
        }
        /*启动ajaxFileUpload 上传*/
        let ajaxFileUploadFun = () => {
            window.Loading.open();
            $.ajaxFileUpload({
                url: obj.api,
                type: 'post',
                secureuri: false, // 一般设置为false
                fileElementId: obj.id, // 上传文件的id、name属性名
                dataType: 'text', // 返回值类型，一般设置为json、application/json
                data: obj.postData, // 传递参数到服务器
                success: function (data, status) {
                    window.Loading.close();
                    let dataResult = JSON.parse(data);
                    if (dataResult.code === 0) {
                        dataResult.data.fileName = file.name;
                        dataResult.data.blobUrl = obj.imgPreview ? window.URL.createObjectURL(file) : '';// 如果需要预览
                        obj.successCB(dataResult.data);
                    } else {
                        obj.errorCB(dataResult)
                    }
                    again();//多文件上传
                },
                error: function (data, status, e) {
                    window.Loading.close();
                    window.Toast.show('上传失败');
                    again();//多文件上传
                }
            });
        };
        /*如果有尺寸限制*/
        if (obj.size && obj.size.width && obj.size.height) {
            let reader = new FileReader();
            reader.readAsDataURL(file);
            let width = '';
            let height = '';
            reader.onload = function () {
                let image = new Image();
                image.src = this.result;
                image.onload = function () {
                    width = this.width;
                    height = this.height;
                    if (width !== obj.size.width || height !== obj.size.height) {
                        window.Toast.show('文件尺寸必须是:' + obj.size.width + ' x ' + obj.size.height);
                        return false
                    } else {
                        ajaxFileUploadFun();
                    }
                };
            };
        } else {
            ajaxFileUploadFun();
        }
    };
    /*如果有前置方法 一般用于 上传数量控制,如果没有,直接绑定事件;如果返回真 绑定事件*/
    let beforeReturn = () => {
        if (obj.beforeCB) {
            if (obj.beforeCB()) {
                funMain();
            }
        } else {
            funMain();
        }
    };
    /*多文件上传*/
    let again = () => {
        let $id = $('#' + obj.id);
        $id.val('');
        $id.change(function () {
            /*如果有前置方法 一般用于 上传数量控制*/
            beforeReturn()
        })
    };
    beforeReturn();
};
module.exports = {
    ajaxFileUpload: ajaxFileUpload
};