<template>
  <div class="lv-form">
    <el-form
      :model="roleForm"
      ref="form"
      size="small"
      :rules="rules"
      label-position="right"
      label-width="110px"
    >
      <el-form-item label="角色名" class="is-flex" prop="role_name">
        <div class="lv-form-item">
          <div class="lv-form-item__component is-flex">
            <el-input
              v-model="roleForm.role_name"
              size="small"
              placeholder="请输入角色名称"
            ></el-input>
          </div>
        </div>
      </el-form-item>
      <el-form-item label="备注" class="is-flex">
        <div class="lv-form-item">
          <div class="lv-form-item__component is-flex">
            <el-input
              v-model="roleForm.role_desc"
              type="textarea"
              :rows="4"
              size="small"
              placeholder="请输入角色备注"
            ></el-input>
          </div>
        </div>
      </el-form-item>
      <el-form-item label="功能权限" class="is-flex">
        <div class="lv-form-item">
          <div class="lv-form-item__component is-flex">
            <role-perms :value="roleForm.menus" @input="menuInput" />
          </div>
        </div>
      </el-form-item>
    </el-form>
  </div>
</template>
<script>
import rolePerms from "@/components/role-perms";
export default {
  name: "roleForm",
  components: {
    rolePerms,
  },
  props: {
    isEdit: {
      type: Boolean,
      default: false,
    },
    roleData: {
      type: Object,
      default: function () {
        return {};
      },
    },
  },
  watch: {
    roleData: {
      immediate: true,
      deep: true,
      handler(newVal) {
        if (this.isEdit) {
          this.roleForm = {
            role_name: newVal.role_name,
            role_desc: newVal.role_desc,
            menus: newVal.menus,
          };
        } else {
          this.roleForm = {
            role_name: "",
            role_desc: "",
            menus: [],
          };
        }
      },
    },
  },
  data() {
    return {
      roleForm: {
        role_name: "",
        role_desc: "",
        menus: [],
      },
      rules: {
        role_name: [
          { required: true, message: "请输入角色名称", trigger: "blur" },
        ],
      },
    };
  },
  methods: {
    menuInput(checked) {
      this.roleForm.menus = checked;
    },
  },
};
</script>