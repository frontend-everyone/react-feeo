const initFontSize = () => {
    document.documentElement.style.fontSize = 100 * (document.body.clientWidth / 375) + 'px';
};
initFontSize();
window.onresize = () => {
    initFontSize();
};