<template>
  <div class="page-account">
    <div class="main-wrapper">
      <div class="layout-container">
        <div class="login-form">
          <div class="login-form-main">
            <div class="login-form-logo">
              <a href="/"
                ><img
                  src="https://gw.alipayobjects.com/mdn/prod_resource/afts/img/A*FsnmRIiTfe0AAAAAAAAAAABkARQnAQ"
                  alt="[object Object]"
              /></a>
            </div>
            <div class="login-form-content">
              <div class="account-slogon">
                <h2 class="account-slogon-main">
                  <span>LaravelVue</span>
                </h2>
                <p class="account-slogon-subhead">
                  <span>Laravel8+Vue2</span>
                </p>
              </div>
              <div class="account-login">
                <el-form
                  ref="loginForm"
                  :model="loginForm"
                  :rules="rules"
                  @keyup.enter.native="submitForm"
                >
                  <el-form-item prop="username">
                    <el-input
                      v-model="loginForm.username"
                      placeholder="请输入用户名"
                    >
                      <i slot="prefix" class="el-input__icon el-icon-user" />
                    </el-input>
                  </el-form-item>
                  <el-form-item prop="password">
                    <el-input
                      :type="isLock ? 'password' : 'text'"
                      v-model="loginForm.password"
                      placeholder="请输入密码"
                    >
                      <i slot="prefix" class="el-input__icon el-icon-lock" />
                      <span slot="suffix" class="icon-lock" @click="changeLock">
                        <icon-svg
                          :name="isLock ? 'icon-eye' : 'icon-eye-invisible'"
                        ></icon-svg>
                      </span>
                    </el-input>
                  </el-form-item>
                  <el-form-item prop="captcha">
                    <el-input
                      v-model="loginForm.captcha"
                      placeholder="请输入验证码"
                      maxlength="4"
                      style="width: 60%; float: left"
                    ></el-input>
                    <div class="captcha">
                      <img
                        :src="captchaImg"
                        alt="请输入验证码"
                        @click="loginVerify()"
                      />
                    </div>
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
import passportApi from "@/api/passport";
export default {
  name: "Login",
  data() {
    const checkUsername = (rule, value, callback) => {
      if (value.length < 5) {
        return callback(new Error("请输入正确的用户名"));
      } else {
        callback();
      }
    };
    const checkPassword = (rule, value, callback) => {
      if (value.length < 8) {
        return callback(new Error("请输入正确的密码"));
      } else {
        callback();
      }
    };
    const checkCaptcha = (rule, value, callback) => {
      if (value.length !== 4) {
        return callback(new Error("请输入正确的校验码"));
      } else {
        callback();
      }
    };
    return {
      loginForm: {
        username: "",
        password: "",
        captcha: "",
        captcha_uniqid: "",
      },
      rules: {
        username: [{ validator: checkUsername, trigger: "blur" }],
        password: [{ validator: checkPassword, trigger: "blur" }],
        captcha: [{ validator: checkCaptcha, trigger: "blur" }],
      },
      curYear: 0,
      isLock: true,
      captchaImg: "",
      saving: false,
      redirect: undefined,
    };
  },
  watch: {
    $route: {
      handler: function (route) {
        this.redirect = route.query && route.query.redirect;
      },
      immediate: true,
    },
  },
  created() {
    this.loginVerify();
    this.curYear = new Date().getFullYear();
  },
  methods: {
    changeLock() {
      this.isLock = !this.isLock;
    },
    //获取验证码
    loginVerify() {
      passportApi
        .getCaptcha()
        .then((res) => {
          if (res.code === 200) {
            this.captchaImg = res.data.captcha;
            this.loginForm.captcha_uniqid = res.data.captcha_uniqid;
          }
        })
        .catch((err) => {
          this.$message.error(err);
        });
    },
    async submitForm() {
      this.$refs.loginForm.validate(async (valid) => {
        if (valid) {
          this.saving = true;
          try {
            //登录
            await this.$store.dispatch("user/LoginIn", this.loginForm);
            //用户信息
            await this.$store.dispatch("user/GetUserInfo");
            //用户权限菜单
            let [first] = await this.$store.dispatch("router/premRules");
            //左侧菜单组不存在，代表没有权限
            if (!first) {
              this.$message.error("该账号没有权限");
            } else {
              this.$router
                .push({
                  path:
                    this.redirect == "" || this.redirect == "/"
                      ? "/init"
                      : this.redirect,
                })
                .catch(() => {}); // eslint-disable-line
            }
          } catch (err) {
            this.$message.error(err);
            this.loginVerify();
          }
          this.saving = false;
        } else {
          this.loginVerify();
          return false;
        }
      });
    },
  },
};
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
  .captcha {
    width: 33%;
    height: 38px;
    float: right !important;
    background: #ccc;
    cursor: pointer;
    img {
      width: 100%;
      height: 100%;
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
      background-image: url(~@/assets/img/third-login.png);
      background-repeat: no-repeat;
      background-size: 100%;
      vertical-align: middle;
      margin-right: 5px;
    }
  }
}
</style>