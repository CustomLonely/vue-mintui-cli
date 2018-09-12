/**
 * 存储localStorage
 */

export const setStore = (name, content) => {
    if (!name) {
        return;
    }
    if (typeof content !== 'string') {
        content = JSON.stringify(content);
    }
    window.localStorage.setItem(name, content);
}

/**
 * 获取localStorage
 */

export const getStore = (name) => {
    if (!name) {
        return;
    }
    return window.localStorage.getItem(name);
}

/**
 * 删除localStorage
 */

export const removeStore = name => {
    if (!name) {
        return;
    }
    window.localStorage.removeItem(name);
}

/***
 * 获取style样式
 * @param 
 * 
 */

export const getStyle = (element, attr, numberMode = 'int') => {
    let target;//获得属性方式
    // scrollTop 获取方式不同，没有它不属于style，而且只有document.body才能用
    if (attr === 'scrollTop') {
        target = element.scrollTop;
        //currentStyle:该属性只兼容IE,不兼容火狐和谷歌
    } else if (element.currentStyle) {
        target = element.currentStyle[attr]
        //getComputedStyle:该属性是兼容火狐谷歌,不兼容IE
    } else {
        target = element.defaultView.getComputedStyle(element, null);
    }
    //在获取 opactiy 时需要获取小数 parseFloat
    return numberMode = 'float' ? parseFloat(target) : parseInt(target);
}

/**
* 页面到达底部，加载更多
*/

export const loadMore = (element, callback) => {
    let windowHeight = window.screen.height;
    let height,
        setTop,
        paddingBottom,
        marginBottom,
        requestFram,
        oldScrollTop;
    /**事件是先捕获再冒泡的，而第三个参数就决定了是先捕获还是先冒泡，
    如果是true就是捕获，反正则是冒泡，是先执行最外层的还是最里面层的先**/
    document.body.addEventListener('scroll', () => {
        loadMore();
    }, false);

    //运动开始时获取元素 高度 和 offseTop, pading, margin
    element.addEventListener('touchstart', () => {

        height = element.offsetHeight;

    }, { passive: true });
}

 /**
 * 显示返回顶部按钮，开始、结束、运动 三个过程中调用函数判断是否达到目标点
 */

 /**
 * 运动效果
 * @param {HTMLElement} element   运动对象，必选
 * @param {JSON}        target    属性：目标值，必选
 * @param {number}      duration  运动时间，可选
 * @param {string}      mode      运动模式，可选
 * @param {function}    callback  可选，回调函数，链式动画
 */