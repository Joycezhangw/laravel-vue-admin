<template>
  <div class="page-account">
    <div class="main-wrapper">
      <div class="layout-container">
        <div class="login-form">
          <div class="login-form-main">
            <div class="login-form-logo">
              <a href="/"><img src="@/assets/logo.png" alt="" /></a>
            </div>
            <div class="login-form-content">
              <div class="account-slogon">
                <h2 class="account-slogon-main">
                  <span>LaravelVue</span>
                </h2>
                <p class="account-slogon-subhead">
                  <span>Laravel8+Vite+Vue3</span>
                </p>
              </div>
              <div class="account-login">
                <el-form
                  ref="refLoginForm"
                  :model="loginForm"
                  :disabled="saving"
                  size="large"
                >
                  <el-form-item prop="username">
                    <el-input
                      v-model="loginForm.username"
                      placeholder="请输入用户名"
                      :prefix-icon="iconUser"
                      auto-complete="off"
                    >
                    </el-input>
                  </el-form-item>
                  <el-form-item prop="password">
                    <el-input
                      :type="isLock ? 'password' : 'text'"
                      v-model="loginForm.password"
                      placeholder="请输入密码"
                      :prefix-icon="iconLock"
                      auto-complete="off"
                    >
                      <template #suffix>
                        <el-icon class="el-input__icon" @click="lockToggle()">
                          <template v-if="isLock">
                            <iconView />
                          </template>
                          <template v-else>
                            <iconHide />
                          </template>
                        </el-icon>
                      </template>
                    </el-input>
                  </el-form-item>
                  <el-form-item prop="captcha">
                    <el-input
                      v-model="loginForm.captcha"
                      placeholder="请输入验证码"
                      maxlength="4"
                      style="width: 60%; float: left"
                    ></el-input>
                    <captcha
                      :ref="setRefs('captcha')"
                      v-model="loginForm.captcha_uniqid"
                      @change="
                        () => {
                          loginForm.captcha = '';
                        }
                      "
                    />
                  </el-form-item>
                  <el-form-item>
                    <el-button
                      type="primary"
                      style="width: 100%"
                      :loading="saving"
                      @click="submitForm"
                      >登 录</el-button
                    >
                  </el-form-item>
                </el-form>
                <div class="third-login">
                  <div class="third-login-link">
                    <a
                      class="third-login-a"
                      target="_blank"
                      title="laravel-vue-admin"
                      href="https://github.com/Joycezhangw/laravel-vue-admin"
                    >
                      <span class="github"></span>
                    </a>
                  </div>
                </div>
                <div class="copyright">
                  Copyright &copy; {{ curYear }} 💖 JoyceZhangw
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>
<script>
import { reactive, defineComponent, toRaw } from "vue";
import { User, Lock, View, Hide } from "@element-plus/icons-vue";
import Captcha from "./components/captcha.vue";
import { useBoolean, useRequest, useRefs } from "@/landao/hooks";
import { PassportService } from "@/service";
import { ElMessage } from "element-plus";
export default defineComponent({
  components: {
    iconView: View,
    iconHide: Hide,
    Captcha,
  },
  setup() {
    const curYear = new Date().getFullYear();
    // 表单数据,注意表单不能输入的原因的：ref 和 model 的名字不能一样
    //  ref="refLoginForm"  :model="loginForm"
    const { refs, setRefs } = useRefs();
    const loginForm = reactive({
      username: "peadmin",
      password: "123456qwe@A",
      captcha: "",
      captcha_uniqid: "",
    });
    //密码框和文本框切换
    const { state: isLock, toggle: lockToggle } = useBoolean(true);
    //登录
    const { loading: saving, run: doLogin } = useRequest(
      PassportService.login,
      {
        manual: true,
        onSuccess(res) {
          console.log("登录结果", res);
        },
        onError(msg) {
          //刷新验证码
          refs.value.captcha.refresh();
          ElMessage.error(msg);
        },
      }
    );
    //提交登录
    const submitForm = () => {
      if (!loginForm.username) {
        return ElMessage.error("用户名不能为空");
      }

      if (!loginForm.password) {
        return ElMessage.error("密码不能为空");
      }

      if (!loginForm.captcha) {
        return ElMessage.error("图片验证码不能为空");
      }
      doLogin(toRaw(loginForm));
    };

    return {
      curYear,
      loginForm,
      saving,
      submitForm,
      setRefs,
      isLock,
      lockToggle,
      iconUser: User,
      iconLock: Lock,
    };
  },
});
</script>
<style lang="scss" scoped>
.page-account {
  position: relative;
  margin: 0 auto;
  min-height: 100vh;
  display: flex;
  -webkit-box-orient: vertical;
  -webkit-box-direction: normal;
  flex-direction: column;
  background-color: #fafafa;
  .main-wrapper {
    flex: 1 0;
    width: 100%;
    background: #fafafa;
  }
  .layout-container {
    padding-left: 16px;
    padding-right: 16px;
    margin-left: auto;
    margin-right: auto;
    height: 100%;
  }
  .login-form {
    width: 400px;
    margin: auto;
    padding-top: 96px;
  }
  .login-form-main {
    background-color: #fff;
    padding: 36px 8px 48px;
    margin-bottom: 64px;
    border: 1px solid #e9e9e9;
    border-radius: 4px;
    padding-bottom: 16px;
    .login-form-logo {
      max-width: 320px;
      margin: 0 auto;
      text-align: center;
      padding-bottom: 20px;
      img {
        width: 64px;
        height: 64px;
        border-radius: 4px;
      }
    }
    .login-form-content {
      max-width: 320px;
      margin: 0 auto;
      border-radius: 4px;
      font-size: 14px;
      text-align: center;
      .account-slogon-main {
        font-size: 32px;
        line-height: 1.2;
        color: #262626;
      }
      .account-slogon-subhead {
        color: #595959;
        margin-top: 8px;
        font-size: 18px;
      }
    }
  }
  .account-login {
    margin-top: 32px;
  }
  .copyright {
    color: #777;
    margin-top: 5px;
  }
  .icon-lock {
    cursor: pointer;
    &:hover {
      color: #262626;
    }
  }
  .third-login-a {
    width: 35px;
    height: 35px;
    display: inline-block;
  }
  .third-login {
    position: relative;
    margin-top: 26px;
    padding-top: 26px;
    .third-login-link {
      margin-left: 25px;
      justify-content: center;
      text-align: center;
      a {
        margin-right: 20px;
        white-space: nowrap;
        overflow: hidden;
        text-overflow: ellipsis;
        cursor: pointer;
      }
    }
    span {
      display: inline-block;
      width: 28px;
      height: 29px;
      vertical-align: middle;
      margin-right: 5px;
    }
  }
  :deep(.el-input__suffix-inner) {
    cursor: pointer;
  }
}
</style>
