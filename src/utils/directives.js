export default {
    clickOutside: {
        inserted(el, bindings) {
            el.listener = function (e) {
                //事件源对象是el，当点击的是el本身；或者el包含事件源对象（点击的是el的子元素）这两种情况
                //不满足这两点，则点击的是其他地方，关闭弹窗
                if (e.target == el || el.contains(e.target)) {
                    return;
                }
                bindings.value(); //close事件
            };
            document.addEventListener("click", el.listener, false);
        },
        unbind(el) {
            document.removeEventListener('click',el.listener,false);
        }
    }
}