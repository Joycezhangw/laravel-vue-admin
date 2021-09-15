<template>
  <div class="lv-form">
    <el-form
      :model="deptForm"
      ref="form"
      size="small"
      :rules="rules"
      label-position="right"
      label-width="110px"
    >
      <el-form-item label="上级部门">
        <div class="lv-form-item">
          <div class="lv-form-item__component is-flex">
            <dept-tree ref="deptTree"
              :value="deptForm.parent_id"
              @input="deptTreeInputSelect"
            />
          </div>
        </div>
      </el-form-item>
      <el-form-item label="部门名称" class="is-flex" prop="dept_name">
        <div class="lv-form-item">
          <div class="lv-form-item__component is-flex">
            <el-input
              v-model="deptForm.dept_name"
              size="small"
              placeholder="请输入部门名称"
            ></el-input>
          </div>
        </div>
      </el-form-item>
      <el-form-item label="备注" class="is-flex">
        <div class="lv-form-item">
          <div class="lv-form-item__component is-flex">
            <el-input
              v-model="deptForm.dept_desc"
              type="textarea"
              :rows="4"
              size="small"
              placeholder="请输入部门备注"
            ></el-input>
          </div>
        </div>
      </el-form-item>
      <el-form-item label="排序：">
        <el-input-number
          v-model="deptForm.dept_order"
          size="small"
          controls-position="right"
          :min="0"
        ></el-input-number>
      </el-form-item>
    </el-form>
  </div>
</template>
<script>
import { treeParentId } from "@/config/env";
import deptTree from "@/view/system/components/deptTree";
export default {
  name: "deptForm",
  components: {
    deptTree,
  },
  props: {
    isEdit: {
      type: Boolean,
      default: false,
    },
    deptData: {
      type: Object,
      default: function () {
        return {};
      },
    },
  },
  data() {
    return {
      deptForm: {
        dept_name: "",
        dept_desc: "",
        parent_id: treeParentId,
        dept_order: 0,
      },
      rules: {
        dept_name: [
          { required: true, message: "请输入部门名称", trigger: "blur" },
        ],
        dept_desc: [
          { max: 250, message: "备注最多250个字符", trigger: "blur" },
        ],
      },
    };
  },
  watch: {
    deptData: {
      immediate: true,
      deep: true,
      handler(newVal) {
        if (this.isEdit) {
          this.deptForm = {
            dept_name: newVal.dept_name,
            dept_desc: newVal.dept_desc,
            parent_id: newVal.parent_id,
            dept_order: newVal.dept_order,
          };
        } else {
          this.deptForm = {
            dept_name: "",
            dept_desc: "",
            parent_id: treeParentId,
            dept_order: 0,
          };
        }
      },
    },
  },
  methods: {
    deptTreeInputSelect(row) {
      this.deptForm.parent_id = row.dept_id;
    },
  },
};
</script>