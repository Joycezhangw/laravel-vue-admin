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

    return {
        tableConfig
    }
}