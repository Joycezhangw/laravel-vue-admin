import { deepTree } from "@/landao/utils";
import { MenuService } from "@/service";
export function useMenuSchemas() {
    //获取视图路径
    function getViewFilePath() {
        const files = import.meta.globEager("/**/views/**/*.{vue,tsx}");
        let list = [];
        const reg = /components|login|error/;
        for (const key in files) {
            if (!reg.test(key)) {
                const val = key.substr(5);
                list.push({
                    label: val,
                    value: val,
                });
            }
        }
        return list;
    }
    //表格
    const tableConfig = {
        attrs: {
            rowKey: "menuId", //表格索引
            size: "small", //表格和搜索表单尺寸
        },
        formatData: deepTree, //格式化数据，一维数组转树形数组
        columns: [
            {
                title: "名称",
                width: 200,
                align: "center",
                customSlot: "titleSlot",
            },
            {
                title: "图标",
                width: 200,
                align: "center",
                customSlot: "iconSlot",
            },
            {
                title: "类型",
                width: 200,
                align: "center",
                customSlot: "menuTypeSlot",
            },
            {
                title: "路由名",
                width: 200,
                align: "center",
                key: "name",
            },
            {
                title: "节点路由",
                width: 180,
                align: "center",
                key: "path",
            },
            {
                title: "路由缓存",
                width: 100,
                align: "center",
                customSlot: "keepAliveSlot",
            },
            {
                title: "文件路径",
                width: 200,
                align: "center",
                key: "component",
            },
            {
                title: "权限",
                width: 200,
                align: "center",
                customSlot: "apiPathSlot",
            },
            {
                title: "排序",
                width: 90,
                align: "center",
                key: "menuOrder",
            },
            {
                title: "更新时间",
                width: 150,
                align: "center",
                key: "updatedAt",
            },
            {
                title: "操作",
                width: 200,
                fixed: "right",
                align: "center",
                customSlot: "handleSlot",
            },
        ],
    };
    //表单
    const formSchemas = [
        {
            field: "menu_type",
            component: "RadioGroup",
            label: "节点类型",
            defaultValue: "0",
            componentProps: {
                options: [
                    { label: "目录", value: "0" },
                    { label: "菜单", value: "1" },
                    { label: "权限", value: "2" },
                ],
            },
        },
        {
            field: "menu_title",
            label: "菜单名称",
            component: "Input",
            required: true,
            defaultValue: "",
            componentProps: {
                placeholder: "请输入菜单名称",
            },
        },
        {
            field: "menu_name",
            label: "节点路由名",
            component: "Input",
            required: true,
            defaultValue: "",
            componentProps: {
                placeholder: "请输入唯一英文字符串",
            },
        },
        {
            field: "parent_id",
            label: "上级节点",
            required: true,
            defaultValue: 0,
            slot: "treeSelectSlot",
        },
        {
            field: "keep_alive",
            label: "是否开启缓存",
            required: true,
            component: "Switch",
            defaultValue: true,
            ifShow: ({ values }) => {
                return parseInt(values.menu_type) === 1;
            },
        },
        {
            field: "is_show",
            label: "是否显示",
            required: true,
            component: "Switch",
            defaultValue: true,
            ifShow: ({ values }) => {
                return parseInt(values.menu_type) === 1;
            },
        },
        {
            field: "menu_component",
            label: "文件路径",
            required: true,
            defaultValue: "",
            component: "Select",
            helpMessage: "视图文件路径", //标签名右侧温馨提示
            componentProps: {
                placeholder: "请选择视图文件路径",
                options: getViewFilePath() || [],
                filterable: true,
            },
            ifShow: ({ values }) => {
                return parseInt(values.menu_type) === 1;
            },
        },
        {
            field: "menu_icon",
            label: "节点图标",
            required: true,
            defaultValue: "",
            slot: "menuIconSlot",
            ifShow: ({ values }) => {
                return parseInt(values.menu_type) !== 2;
            },
        },
        {
            field: "api_path",
            label: "权限标识",
            required: true,
            component: "ApiSelect",
            defaultValue: "",
            componentProps: {
                placeholder: "请选择权限标识",
                api: MenuService.getPower,
                immediate: false,
                filterable: true,
            },
            ifShow: ({ values }) => {
                return parseInt(values.menu_type) === 2;
            },
        },
        {
            field: "menu_order",
            label: "排序",
            component: "InputNumber",
            defaultValue: 1,
            componentProps: {
                controlsPosition: "right",
                min: 0,
            },
        },
    ];
    return {
        tableConfig, formSchemas
    }
}
