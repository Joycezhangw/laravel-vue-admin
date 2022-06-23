<template>
  <div class="view-home scroller">
    <el-row :gutter="15">
      <el-col :lg="6" :md="12" :xs="24">
        <div class="card">
          <count-student />
        </div>
      </el-col>
      <el-col :lg="6" :md="12" :xs="24">
        <div class="card">
          <count-teacher />
        </div>
      </el-col>
      <el-col :lg="6" :md="12" :xs="24">
        <div class="card">
          <count-user />
        </div>
      </el-col>
      <el-col :lg="6" :md="12" :xs="24">
        <div class="card">
          <count-attend />
        </div>
      </el-col>
    </el-row>
    <el-row>
      <el-col>
        <div class="dt-box initguide-content">
          <div class="dt-box__header">
            <span class="dt-box__title">运营设置</span>
          </div>
          <div class="dt-box__container clearfix">
            <div class="flex-center">
              <div class="initguide-line flex"></div>
              <div
                v-for="(item, index) in flowStep"
                :key="index"
                class="initguide-step initguide-step1"
                :class="[`initguide-step${index + 1}`]"
              >
                <div class="steps-circle">
                  <div
                    class="initguide-steps-content steps-complete flex-vertical-horizontal-center"
                  >
                    <span class="steps-complete-icon"></span>
                  </div>
                </div>
                <div class="flex-vertical-horizontal-center step-title">
                  <div class="step-title1">{{ item.name }}</div>
                  <div>{{ item.setting }}</div>
                </div>
                <div class="flex-center step-desc">
                  <div
                    class="step-desc-text"
                    v-for="(v, j) in item.descList"
                    :key="j"
                  >
                    {{ v }}
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </el-col>
    </el-row>
    <el-row :gutter="15">
      <el-col :lg="16" :xs="24">
        <div class="dt-box">
          <div class="dt-box__header">
            <span class="dt-box__title">常用功能</span>
          </div>
          <div class="dt-box__container clearfix">
            <div class="dt-warp" v-for="(item, index) in funList" :key="index">
              <div class="dt-btn_link">
                <icon-svg :name="item.icon_name" />
                <div class="right-b">
                  <div class="text">{{ item.name }}</div>
                  <span class="foot">
                    {{ item.tip }}<span>{{ item.num }}</span>
                  </span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </el-col>
      <el-col :lg="8" :xs="24">
        <div class="card"></div>
      </el-col>
    </el-row>
  </div>
</template>
<script>
import { reactive, defineComponent } from "vue";
import countAttend from "@/views/home/components/count-attend";
import countStudent from "@/views/home/components/count-student";
import countTeacher from "@/views/home/components/count-teacher";
import countUser from "@/views/home/components/count-user";
export default defineComponent({
  components: {
    countAttend,
    countStudent,
    countTeacher,
    countUser,
  },
  setup() {
    const flowStep = reactive([
      {
        name: "运营区域",
        setting: "设置",
        descList: ["市级部署", "多个区县"],
        url: "/sys/config/region",
      },
      {
        name: "学校",
        setting: "设置",
        descList: ["学校管理", "授课教室"],
        url: "/school/school/index",
      },
      {
        name: "课程",
        setting: "设置",
        descList: ["基础信息", "指导价"],
        url: "/educational/course",
      },
      {
        name: "班级",
        setting: "设置",
        descList: ["满班人数", "班课价格"],
        url: "/educational/class/index",
      },
      {
        name: "排课",
        setting: "管理",
        descList: ["授课信息", "排课安排"],
        url: "/educational/schedule/list",
      },
      {
        name: "学员",
        setting: "报名",
        descList: ["选班级", "支付班课费"],
        url: "",
      },
    ]);
    const funList = reactive([
      {
        name: "课程",
        tip: "课程数",
        num: 1,
        icon_name: "course-icon",
        url: "/educational/course",
      },
      {
        name: "班级",
        tip: "班级数",
        num: 1,
        icon_name: "course-class",
        url: "/educational/class/index",
      },
      {
        name: "排课",
        tip: "",
        num: "",
        icon_name: "course-schedule",
        url: "/educational/schedule/list",
      },
      {
        name: "学员",
        tip: "学员数",
        num: "0",
        icon_name: "student-icon",
        url: "/educational/student/index",
      },
    ]);
    return {
      flowStep,
      funList,
    };
  },
});
</script>

<style lang="scss">
.view-home.scroller {
  overflow: hidden auto;
  position: relative;
  z-index: 9;
}
.view-home {
  .card {
    background-color: #fff;
    border-radius: 5px;
    margin-bottom: 15px;
    font-size: 12px;
    letter-spacing: 0.5px;
    &__container {
      padding: 0 20px;
      height: 50px;
    }
    &__footer {
      display: flex;
      align-items: center;
      height: 50px;
      border-top: 1px solid #f7f7f7;
      font-size: 12px;
      margin: 0 5px;
      padding: 0 15px;
      box-sizing: border-box;
      .label {
        margin-right: 10px;
      }
      .value {
        font-size: 13px;
      }
    }
  }
  .card__header {
    display: flex;
    align-items: center;
    height: 50px;
    padding: 0 20px;
    .label {
      font-size: 12px;
    }
    .value {
      font-size: 18px;
      font-weight: bold;
      margin-left: 10px;
    }
  }
  .dt-box {
    background-color: #fff;
    border-radius: 5px;
    margin-bottom: 15px;
    font-size: 12px;
    letter-spacing: 0.5px;
    &__header {
      padding: 20px 20px 7px 24px;
    }
    &__header,
    &__title {
      position: relative;
      font-size: 16px;
    }
    .title_more {
      float: right;
      font-size: 12px;
      color: #007aff;
      cursor: pointer;
    }
    &__container {
      position: relative;
      padding: 11px 16px 20px;
    }
  }
  .dt-warp {
    position: relative;
    float: left;
    width: 25%;
    padding-bottom: 10px;
    .icon-svg {
      width: 32px;
      height: 32px;
    }
    .dt-btn_link {
      display: block;
      display: inline-flex;
      align-items: center;
      width: 188px;
      height: 64px;
      padding-left: 17px;
      font-size: 14px;
      transition: 0.3s;
      &:hover {
        border-radius: 2px;
        cursor: pointer;
        background-color: #f8faff;
        transform: translateY(-3px);
        .foot {
          color: #000;
          span {
            color: #007aff;
          }
        }
      }
      .right-b {
        position: relative;
        min-width: 100px;
        margin-top: -3px;
        margin-left: 15px;
        .text {
          font-weight: 700;
        }
      }
    }

    .foot {
      position: absolute;
      bottom: -20px;
      left: 0;
      font-size: 12px;
      color: #adb1b3;
      text-align: left;
      transition: all 0.3s ease;
      span {
        color: #000;
        transition: all 0.3s ease;
      }
      &:hover {
        color: #000;
        cursor: pointer;
      }
    }
  }
  .initguide-content {
    .initguide-line {
      position: absolute;
      top: 48px;
      left: 80px;
      z-index: 1;
      width: calc(100% - 160px);
      height: 5px;
      background-color: #f4f8ff;
    }
    .initguide-step {
      position: relative;
      width: 160px;
      padding-bottom: 18px;
      border: 1px solid #fff;
      border-radius: 8px;
      background-color: #fff;
      &:hover {
        cursor: pointer;
        background-color: #f8faff;
      }
    }
    .initguide-steps-content {
      width: 88px;
      height: 88px;
      margin: 0 auto;
    }
    .steps-complete .steps-complete-icon {
      position: relative;
      z-index: 2;
      display: inline-block;
      width: 88px;
      height: 88px;
      background: url(@/assets/img/step-complete.png) no-repeat;
      background-size: contain;
    }
    .step-title {
      font-size: 16px;
      font-weight: 700;
    }
    .step-desc {
      margin: 10px 13px 0 26px;
      font-size: 12px;
    }
    .step-title1 {
      color: #007aff;
    }
    .step-desc-text {
      position: relative;
      color: #4a4a4a;
    }
    .step-desc-text:before {
      position: absolute;
      content: "";
      top: 7px;
      left: -11px;
      width: 5px;
      height: 5px;
      border-radius: 50%;
      background-color: #97b6e3;
    }
  }
}

.count-sales {
  &__cop {
    display: flex;
    justify-content: space-between;
    align-items: center;
    height: 50px;
    li {
      display: flex;
      list-style: none;
      flex: 1;
      color: #d8d8d8;
      .fall,
      .rise {
        display: flex;
        align-items: center;
        margin-left: 10px;
      }
      .fall {
        color: #13ae7c;
      }
      .rise {
        color: #f21e37;
      }
    }
  }
}
.count-views {
  .card__footer {
    border-top: 0;
  }
}
</style>
