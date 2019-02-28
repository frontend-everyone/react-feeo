import $ from 'jquery';

const windowAuto = (id) => {
    /*弹窗 自适应 str*/
    let $modal = $('#' + id + ' .Modal');
    let windowInnerHeight = window.innerHeight;
    let windowInnerWidth = window.innerWidth;
    let modalHeight = $modal.height();
    let modalWidth = $modal.width();
    /*高度自适应*/
    if (modalHeight < windowInnerHeight) {
        $modal.css({top: (windowInnerHeight - modalHeight) / 2})
    }
    if (modalHeight === windowInnerHeight) {
        $modal.css({top: 0});
    }
    if (modalHeight > windowInnerHeight) {
        $modal.css({top: 0, 'height': windowInnerHeight, 'overflow-y': 'scroll'})
    }
    /*宽度自适应*/
    if (modalWidth < windowInnerWidth) {
        $modal.css({left: (windowInnerWidth - modalWidth) / 2})
    }
    if (modalWidth === windowInnerWidth) {
        $modal.css({left: 0});
    }
    if (modalWidth > windowInnerWidth) {
        $modal.css({left: 0, 'width': windowInnerWidth, 'overflow-y': 'scroll'})
    }
    /*弹窗 自适应 end*/
};
export default {
    windowAuto: windowAuto
}