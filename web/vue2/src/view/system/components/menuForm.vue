<template>
  <div class="lv-form">
    <el-form
      :model="menuForm"
      ref="form"
      size="small"
      :rules="rules"
      label-position="right"
      label-width="110px"
    >
      <el-form-item label="节点类型：">
        <el-radio-group v-model="menuForm.menu_type">
          <el-radio :label="0">目录</el-radio>
          <el-radio :label="1">菜单</el-radio>
          <el-radio :label="2">权限</el-radio>
        </el-radio-group>
      </el-form-item>
      <el-form-item label="菜单名称：" class="is-flex" prop="menu_title">
        <div class="lv-form-item">
          <div class="lv-form-item__component is-flex">
            <el-input
              v-model="menuForm.menu_title"
              size="small"
              placeholder="请输入菜单名称"
            ></el-input>
          </div>
        </div>
      </el-form-item>
      <el-form-item label="节点路由名：" class="is-flex" prop="menu_name">
        <div class="lv-form-item">
          <div class="lv-form-item__component is-flex">
            <el-input
              v-model="menuForm.menu_name"
              size="small"
              placeholder="唯一英文字符串"
            ></el-input>
          </div>
        </div>
      </el-form-item>
      <el-form-item label="上级节点：">
        <menu-tree
          :menuList="menuList"
          :value="menuForm.parent_id"
          @input="menuParentInput"
        />
      </el-form-item>
      <el-form-item label="节点路由：" v-if="menuForm.menu_type == 1">
        <div class="lv-form-item">
          <div class="lv-form-item__component is-flex">
            <el-input
              v-model="menuForm.menu_router"
              size="small"
              placeholder="请输入节点路由"
            ></el-input>
          </div>
        </div>
      </el-form-item>
      <el-form-item label="是否开启缓存：" v-if="menuForm.menu_type == 1">
        <el-radio-group v-model="menuForm.keep_alive">
          <el-radio :label="true">开启</el-radio>
          <el-radio :label="false">关闭</el-radio>
        </el-radio-group>
      </el-form-item>
      <el-form-item label="文件路径：" v-if="menuForm.menu_type == 1">
        <view-file @input="menuFileInput" :value="menuForm.menu_component" />
      </el-form-item>
      <el-form-item label="是否显示：" v-if="menuForm.menu_type == 1">
        <el-switch v-model="menuForm.is_show"> </el-switch>
      </el-form-item>
      <el-form-item label="图标：" v-if="menuForm.menu_type != 2">
        <menu-icon :value="menuForm.menu_icon" @input="iconInput" />
      </el-form-item>
      <el-form-item label="权限标识：" v-if="menuForm.menu_type == 2">
        <div class="lv-form-item">
          <div class="lv-form-item__component is-flex">
            <el-select
              v-model="menuForm.api_path"
              placeholder="请选择权限标识"
              filterable
            >
              <el-option
                v-for="(item, index) in powerList"
                :key="index"
                :label="item"
                :value="item"
              ></el-option>
            </el-select>
          </div>
        </div>
      </el-form-item>
      <el-form-item label="排序：">
        <el-input-number
          v-model="menuForm.menu_order"
          size="small"
          controls-position="right"
          :min="0"
        ></el-input-number>
      </el-form-item>
    </el-form>
  </div>
</template>
<script>
import menuIcon from "@/components/menu-icon";
import viewFile from "@/components/view-file";
import menuTree from "@/components/menu-tree";
import menuApi from "@/api/menu";
import { treeParentId } from "@/config/env";
export default {
  name: "sysMenuForm",
  components: {
    menuIcon,
    viewFile,
    menuTree,
  },
  props: {
    isEdit: {
      type: Boolean,
      default: false,
    },
    menuData: {
      type: Object,
      default: function () {
        return {};
      },
    },
    parentId: {
      type: [String, Number],
      default: treeParentId,
    },
  },
  data() {
    return {
      menuForm: {
        menu_type: 0,
        menu_title: "",
        parent_id: treeParentId,
        menu_name: "",
        is_show: true,
        keep_alive: true,
        menu_order: 0,
        menu_router: "",
        menu_icon: "",
        menu_component: "",
        api_path: "",
      },
      powerList: [],
      menuList: [],
      rules: {
        menu_title: [
          { required: true, message: "请输入菜单名称", trigger: "blur" },
        ],
        menu_name:[
           { required: true, message: "请输入节点路由名", trigger: "blur" },
        ]
      },
    };
  },
  watch: {
    parentId(newV) {
      if (!this.isEdit) {
        this.menuForm.parent_id = newV === "" ? treeParentId : newV;
      }
    },
    menuData: {
      immediate: true,
      deep: true,
      handler(newVal) {
        if (this.isEdit) {
          this.menuForm = {
            menu_type: newVal.menuType,
            menu_title: newVal.title,
            parent_id: newVal.parentId,
            menu_name: newVal.name,
            is_show: !newVal.hidden,
            keep_alive: newVal.meta.keepAlive,
            menu_order: newVal.menuOrder,
            menu_router: newVal.path,
            menu_icon: newVal.meta.icon,
            menu_component: newVal.component,
            api_path: newVal.apiPath,
          };
        } else {
          this.menuForm = {
            menu_type: 0,
            menu_title: "",
            parent_id: this.parentId,
            menu_name: "",
            is_show: true,
            keep_alive: true,
            menu_order: 0,
            menu_router: "",
            menu_icon: "",
            menu_component: "",
            api_path: "",
          };
        }
      },
    },
  },
  mounted() {
    this.getPower();
    this.getMenuList();
  },
  methods: {
    iconInput(value) {
      this.menuForm.menu_icon = value;
    },
    menuFileInput(value) {
      this.menuForm.menu_component = value;
    },
    menuParentInput(value) {
      this.menuForm.parent_id = value;
    },
    getPower() {
      menuApi
        .getPower()
        .then((res) => {
          this.powerList = res.data;
        })
        .catch((err) => {
          this.$message.error(err);
        });
    },
    getMenuList() {
      menuApi
        .getList()
        .then((res) => {
          let list = res.data.filter((e) => e.menuType != 2);
          this.menuList = list;
        })
        .catch((err) => {
          this.$message.error(err);
        });
    },
  },
};
</script>