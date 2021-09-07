import { mapGetters } from "vuex";
import "./index.scss";

export default {
    name: "lv-menu-slider",
    data() {
        return {
            visible: true
        }
    },
    computed: {
        ...mapGetters(['appInfo', 'browser', 'menuCollapse', 'menuGroup'])
    },
    methods: {
        toView(url) {
            if (url != this.$route.path) {
                this.$router.push(url)
            }
        }
    },
    render() {
        const fn = list => {
            return list.filter(item => !item.hidden).map(item => {
                let html = null;
                if (item.menuType == 0) {
                    html = (
                        <el-submenu
                            popper-class="lv-slider-menu__submenu"
                            index={String(item.menuId)}
                            key={item.menuId}>
                            <template slot="title">
                                <icon-svg name={item.meta.icon}></icon-svg>
                                <span slot="title">{item.meta.title}</span>
                            </template>
                            {fn(item.children)}
                        </el-submenu>
                    );
                } else {
                    html = (
                        <el-menu-item index={item.path} key={item.path}>
                            <icon-svg name={item.meta.icon}></icon-svg>
                            <span slot="title">{item.meta.title}</span>
                        </el-menu-item>
                    );
                }
                return html;
            })
        };
        let el = fn(this.menuGroup);
        return (
            this.visible && (
                <div class="lv-slider-menu">
                    <el-menu
                        default-active={this.$route.path}
                        background-color="transparent"
                        collapse-transition={false}
                        collapse={this.browser.isMini ? false : this.menuCollapse}
                        on-select={this.toView}>
                        {el}
                    </el-menu>
                </div>
            )
        );
    }
};