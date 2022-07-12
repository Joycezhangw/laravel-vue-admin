export default function RoleSchemas() {
    //表格
    const tableConfig = {
        attrs: {
            rowKey: "menuId", //表格索引
            size: "small", //表格和搜索表单尺寸
        },
        columns: [
            {
                title: "角色名",
                width: 200,
                align: "center",
                key: "role_name",
            },
            {
                title: '描述',
                align: 'center',
                key: 'role_desc'
            },
            {
                title: "操作",
                width: 200,
                fixed: "right",
                align: "center",
                customSlot: "handleSlot",
            },
        ]
    }
    //表单
    const formSchemas = [
        {
            field: "role_name",
            label: "角色名称",
            component: "Input",
            required: true,
            defaultValue: "",
            componentProps: {
                placeholder: "请输入角色名称",
            },
        },
        {
            field: "role_desc",
            label: "备注",
            component: "Input",
            required: true,
            defaultValue: "",
            componentProps: {
                placeholder: "请输入角色说明",
                type: "textarea",
                row: 4,
                maxlength: 300,
                showWordLimit: true
            },
        },
        {
            field: "menus",
            label: "功能权限",
            defaultValue: [],
            slot: "treeMenuPermSlot",
            rules: [
                { required: true, message: "请选择功能权限", trigger: "change" },
            ]
        },
    ];

    return {
        tableConfig, formSchemas
    }
}