(function () {
    var ua = navigator.userAgent
    var isChrome = ua.indexOf('Chrome') > 0
    var matches = ua.match(/(chrome\/)(\d+\.\d+)/i)
    var version = (matches && matches.length && matches[2]) || "0"
    var divTag = document.createElement('div');
    var aTag = document.createElement('a')
    var closeTag = document.createElement('div');
    closeTag.className = 'close'
    closeTag.prepend('X')
    closeTag.addEventListener('click', function () {
        document.body.removeChild(document.body.firstChild)
    })
    aTag.prepend('点此下载Chrome浏览器')
    aTag.download = "Chrome.zip"
    aTag.href='asserts/Chrome.zip'
    divTag.className = 'exporter-warn-tip'
    divTag.append(aTag)
    divTag.append(closeTag)
    if (!isChrome) {
        divTag.prepend('为了获得良好的用户体验，建议您使用Chrome浏览器。')
        document.body.prepend(divTag)
    } else if (isChrome && version < 80) {
        divTag.prepend('您的Chrome浏览器版本过旧，为了获得良好的用户体验，请您更新Chrome浏览器。')
        document.body.prepend(divTag)
    }
})()