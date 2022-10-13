/*响应式布局 start*/
export const setRootFontSize = () => {
    const width: number = document.documentElement.clientWidth || document.body.clientWidth
    const fontSize: number = width >= 1440 ? 1 : (width / 1440)
    const elm: any = document.getElementsByTagName('html')[0]
    elm.style['font-size'] = fontSize + 'px'
}
setRootFontSize()

window.addEventListener('resize', function() {
    setRootFontSize()
}, false)