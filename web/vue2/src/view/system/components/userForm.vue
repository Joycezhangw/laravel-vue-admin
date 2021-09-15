<template>
  <div class="lv-form">
    <el-form
      :model="userForm"
      ref="form"
      size="small"
      :rules="rules"
      label-position="right"
      label-width="110px"
    >
      <el-form-item label="用户名：" prop="username">
        <div class="lv-form-item">
          <div class="lv-form-item__component is-flex">
            <el-input
              v-model="userForm.username"
              size="small"
              placeholder="请输入用户名"
            />
          </div>
        </div>
      </el-form-item>
      <el-form-item label="所属部门：" prop="dept_id">
        <div class="lv-form-item">
          <div class="lv-form-item__component is-flex">
            <dept-tree
              :value="userForm.dept_id"
              form-type="user"
              @input="deptTreeInputSelect"
            />
          </div>
        </div>
      </el-form-item>
      <el-form-item label="角色：" prop="roles">
        <div class="lv-form-item">
          <div class="lv-form-item__component is-flex">
            <el-select
              v-model="userForm.roles"
              :multiple-limit="3"
              multiple
              placeholder="请选择"
            >
              <el-option
                v-for="item in roleList"
                :key="item.role_id"
                :label="item.role_name"
                :value="item.role_id"
              >
              </el-option>
            </el-select>
          </div>
        </div>
      </el-form-item>
      <el-row>
        <el-col :span="12">
          <el-form-item label="真实姓名：" prop="realname">
            <div class="lv-form-item">
              <div class="lv-form-item__component is-flex">
                <el-input
                  v-model="userForm.realname"
                  size="small"
                  placeholder="请输入真实姓名"
                />
              </div>
            </div>
          </el-form-item>
        </el-col>
        <el-col :span="12">
          <el-form-item label="昵称：" prop="nickname">
            <div class="lv-form-item">
              <div class="lv-form-item__component is-flex">
                <el-input
                  v-model="userForm.nickname"
                  size="small"
                  placeholder="请输入昵称"
                />
              </div>
            </div>
          </el-form-item>
        </el-col>
      </el-row>
      <el-row>
        <el-col :span="12">
          <el-form-item label="手机号：">
            <div class="lv-form-item">
              <div class="lv-form-item__component is-flex">
                <el-input
                  v-model="userForm.phone"
                  size="small"
                  placeholder="请输入手机号"
                />
              </div>
            </div>
          </el-form-item>
        </el-col>
        <el-col :span="12">
          <el-form-item label="状态：">
            <div class="lv-form-item">
              <div class="lv-form-item__component is-flex">
                <el-radio-group v-model="userForm.manage_status">
                  <el-radio :label="1">启用</el-radio>
                  <el-radio :label="0">禁用</el-radio>
                </el-radio-group>
              </div>
            </div>
          </el-form-item>
        </el-col>
      </el-row>
      <el-form-item label="备注" class="is-flex">
        <div class="lv-form-item">
          <div class="lv-form-item__component is-flex">
            <el-input
              v-model="userForm.introduce"
              type="textarea"
              :rows="4"
              size="small"
              placeholder="请输入角色备注"
            ></el-input>
          </div>
        </div>
      </el-form-item>
      <el-form-item label="">
        <div class="lv-form-item">
          <div class="lv-form-item__component is-flex">
            <i class="el-icon-warning text-delete"></i
            >新增用户默认密码为：123qwe@ASD
          </div>
        </div>
      </el-form-item>
    </el-form>
  </div>
</template>
<script>
import deptTree from "@/view/system/components/deptTree";
import roleApi from "@/api/role";
export default {
  name: "userForm",
  components: {
    deptTree,
  },
  props: {
    isEdit: {
      type: Boolean,
      default: false,
    },
    userData: {
      type: Object,
      default: function () {
        return {};
      },
    },
  },
  watch: {
    userData: {
      immediate: true,
      deep: true,
      handler(newVal) {
        if (this.isEdit) {
          let roleIds = [];
          if (newVal.roles.length > 0) {
            roleIds = newVal.roles.map((item) => {
              return item.role_id;
            });
          }
          this.userForm = {
            dept_id: newVal.dept_id,
            username: newVal.username,
            realname: newVal.realname,
            nickname: newVal.nickname,
            manage_status: newVal.manage_status,
            phone: newVal.phone,
            introduce: newVal.introduce,
            roles: roleIds,
          };
        } else {
          this.userForm = {
            dept_id: "",
            username: "",
            realname: "",
            nickname: "",
            manage_status: 1,
            phone: "",
            introduce: "",
            roles: [],
          };
        }
      },
    },
  },
  data() {
    return {
      userForm: {
        dept_id: "",
        username: "",
        realname: "",
        nickname: "",
        manage_status: 1,
        phone: "",
        introduce: "",
        roles: [],
      },
      roleList: [],
      rules: {
        username: [
          { required: true, message: "请输入用户名", trigger: "blur" },
        ],
        realname: [
          { required: true, message: "请输入真实姓名", trigger: "blue" },
        ],
        nickname: [{ required: true, message: "请输入昵称", trigger: "blue" }],
        dept_id: [{ required: true, message: "请选择部门", trigger: "change" }],
        roles: [{ required: true, message: "请选择角色", trigger: "change" }],
      },
    };
  },
  async mounted() {
    await this.getRoleList();
  },
  methods: {
    deptTreeInputSelect(e) {
      this.userForm.dept_id = e.dept_id;
    },
    async getRoleList() {
      await roleApi
        .getAllList()
        .then((res) => {
          this.roleList = res.data;
        })
        .catch((err) => {
          this.$message.error(err);
        });
    },
  },
};
</script>