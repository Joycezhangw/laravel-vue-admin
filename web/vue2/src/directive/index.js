import Vue from "vue";

Vue.directive('permission', {
    bind(el, bind, vnode) {
        const hasPermission = (permission) => {
            const powerList = vnode.context.$store.getters.permission;
            if (powerList.includes(permission)) {
                return true;
            }
            return false;
        }
        //获取到 v-permission 值
        if (!hasPermission(bind.value)) {
            // 没有权限 移除Dom元素
            if (!el.parentNode) {
                el.style.display = 'none';
            } else {
                el.parentNode.removeChild(el);
            }
        }
    }
});
/**
 * v-dialogDrag 弹窗拖拽
 */
Vue.directive('dialogDrag', {
    bind(el, bind, node, oldNode) {
        const dialogHeaderEl = el.querySelector('.el-dialog__header');
        const dragDom = el.querySelector('.el-dialog');
        dialogHeaderEl.style.cursor = 'move';

        //获取原有属性 ie dom 元素.currentStyle,火狐谷歌 window.getComputedStyle
        const dom = dragDom.currentStyle || window.getComputedStyle(dragDom, null);
        //获取可视区域
        const { clientWidth, clientHeight } = document.body;
        //鼠标按下
        dialogHeaderEl.onmousedown = (event) => {

            dragDom.style.marginTop = 0;
            dragDom.style.marginBottom = 0;
            dragDom.style.top = dragDom.style.top || '15vh';
            //鼠标按下，计算当前元素距离可视区的距离
            const dis = {
                top: event.clientY - dialogHeaderEl.offsetTop,
                left: event.clientX - dialogHeaderEl.offsetLeft
            };

            const box = (() => {
                const { left, top } = dom;
                //在ie下，第一次获得组件自带 50% 移动之后赋值px
                if (left.includes("%")) {
                    return {
                        top: +clientHeight * (+top.replace(/\%/g, "") / 100),
                        left: +clientWidth * (+left.replace(/\%/g, "") / 100)
                    };
                } else {
                    return {
                        top: +top.replace(/\px/g, ""),
                        left: +left.replace(/\px/g, "")
                    };
                }
            })();
            //只在可使区域内移动
            const pad = 5;
            const minLeft = -(clientWidth - dragDom.clientWidth) / 2 + pad;
            const maxLeft =
                (dragDom.clientWidth >= clientWidth / 2
                    ? dragDom.clientWidth / 2 - (dragDom.clientWidth - clientWidth / 2)
                    : dragDom.clientWidth / 2 + clientWidth / 2 - dragDom.clientWidth) - pad;

            const minTop = pad;
            const maxTop = clientHeight - dragDom.clientHeight - pad;
            //开始移动
            document.onmousemove = function (e) {
                let left = e.clientX - dis.left + box.left;
                let top = e.clientY - dis.top + box.top;
                //不超出可视区域
                if (left < minLeft) {
                    left = minLeft;
                } else if (left >= maxLeft) {
                    left = maxLeft;
                }
                if (top < minTop) {
                    top = minTop;
                } else if (top >= maxTop) {
                    top = maxTop;
                }

                // 设置dialog 位置
                dragDom.style.top = `${top}px`;
                dragDom.style.left = `${left}px`;
            };

            document.onmouseup = () => {
                document.onmousemove = null;
                document.onmouseup = null;
            }
        }

    }
});