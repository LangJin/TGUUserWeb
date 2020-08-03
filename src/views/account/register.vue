<template>
  <div class="register">
    <el-container>
      <el-header>
        <div class="nav">
          <div class="nav_nr">
            <div class="nav_left">
              <a href="javascript:;" target="_blank">
                <img src="https://static1.51cto.com/home/web/images/reg_2015/logo.jpg" alt="logo" />
              </a>
              <div class="account_pass">
                <span>账号通行证</span>
              </div>
            </div>
            <div class="nav_right">
              <router-link :to="{path:'/login'}">登录</router-link>
              <a href="javascript:;">
                <i class="iconfont iconchangjianwenti"></i> 常见问题
              </a>
            </div>
          </div>
        </div>
      </el-header>

      <el-main class="main">
        <!-- 手机号注册 -->
        <div class="title" v-if="flag">
          <p>手机号注册</p>
        </div>
        <div class="title" v-else>
          <p>找回密码</p>
        </div>

        <el-form ref="registerForm" :model="user" class="registerForm" :rules="rules" v-if="flag">
          <el-form-item prop="studentPhone">
            <el-input v-model="user.studentPhone" autocomplete="off" placeholder="请输入手机号"></el-input>
          </el-form-item>
          <el-form-item prop="code">
            <el-input v-model="user.code" class="msgCode" placeholder="短信验证码"></el-input>
            <el-button @click="count(this)" class="sendCode" :disabled="dis">
              <template v-if="!sending">
                <span>发送验证码</span>
              </template>
              <template v-else>
                <span>{{ minute }}</span>
              </template>
            </el-button>
          </el-form-item>
          <el-form-item prop="studentName">
            <el-input v-model="user.studentName" placeholder="用户名" auto-complete="off"></el-input>
            <div>
              <span class="nameSpan">用户名一旦设置成功，不能修改</span>
            </div>
          </el-form-item>
          <el-form-item prop="studentPassword">
            <el-input type="password" v-model="user.studentPassword" placeholder="密码"></el-input>
          </el-form-item>
          <el-form-item>
            <div>
              <el-checkbox name="checkbox" class="checkBox" checked>
                <span>
                  我已认真阅读并同意
                  <a href="javascript:;" target="_blank">《51CTO服务条款》</a>
                  <a href="javascript:;" target="_blank">《隐私协议》</a>
                </span>
              </el-checkbox>
            </div>
          </el-form-item>
          <el-form-item class="btn_sub">
            <el-button type="danger" class="btn" @click="handleRegister">立即注册</el-button>
          </el-form-item>
        </el-form>

        <!-- 忘记密码 -->
        <el-form ref="forgetPwdForm" :model="user" class="registerForm" :rules="rules" v-else>
          <el-form-item prop="studentPhone">
            <el-input v-model="user.studentPhone" autocomplete="off" placeholder="请输入手机号"></el-input>
          </el-form-item>
          <el-form-item prop="code">
            <el-input v-model="user.code" class="msgCode" placeholder="短信验证码"></el-input>
            <el-button @click="count" class="sendCode" :disabled="dis">
              <template v-if="!sending">
                <span>发送验证码</span>
              </template>
              <template v-else>
                <span>{{ minute }}</span>
              </template>
            </el-button>
          </el-form-item>
          <el-form-item prop="studentPassword">
            <el-input type="password" v-model="user.studentPassword" placeholder="请输入新密码"></el-input>
          </el-form-item>
          <el-form-item class="btn_sub">
            <el-button type="danger" class="btn" @click="handleEditPwd">修改</el-button>
          </el-form-item>
        </el-form>

        <div class="other_way">
          <h3>使用第三方账号</h3>
          <div class="login_way">
            <a href="javascript:;" class="weChat"></a>
          </div>
        </div>
      </el-main>

      <el-footer id="footer" class="foot"></el-footer>
    </el-container>
  </div>
</template>

<script>
import md5 from "js-md5";
import ElFooter from "@/components/footerRegister";
import { setCookie} from "@/util/Cookie";
import {Message} from 'element-ui';
export default {
  name: "Register",
  components: { ElFooter },
  data() {
    return {
      sending: false,
      minute: 60,
      flag: true,
      dis: false,
      user: {
        studentPhone: "",
        code: "",
        studentName: "",
        studentPassword: ""
      },
      rules: {
        studentPhone: [
          { required: true, message: "电话不能为空", trigger: "blur" },
          { max: 11, message: "不能超过11位数字", trigger: "blur" },
          {
            pattern: /^0?(13[0-9]|15[012356789]|18[0123456789]|14[57]|17[3678]|170[059]|14[57]|166|19[89])[0-9]{8}$/,
            message: "手机号码格式不正确",
            trigger: "blur"
          }
        ],
        code: [{ required: true, message: "验证码不能为空", trigger: "blur" }],
        studentName: [
          { required: true, message: "用户名不能为空", trigger: "blur" }
        ],
        studentPassword: [
          { required: true, message: "密码不能为空", trigger: "blur" }
        ]
      }
    };
  },
  mounted: function() {
    let result = this.$route.query;
     if(result.flag==="forget"){
       this.flag = false
     }else{
       this.flag = true
     }

  },
  methods: {
    count(e) {
      let phone = this.user.studentPhone;
      let reg = /^0?(13[0-9]|15[012356789]|18[0123456789]|14[57]|17[3678]|170[059]|14[57]|166|19[89])[0-9]{8}$/;
      if (reg.test(phone)) {
        this.$http.postValicode(phone).then(res => {
          console.log('验证码',res)
          this.sending = true;
          this.dis = true;
          var clear = setInterval(() => {
            if (this.minute > 0) {
              --this.minute;
            } else {
              clearInterval(clear);
              this.sending = false;
              this.dis = false;
              this.minute = 60;
            }
          }, 1000);
        });
      }
    },
    handleRegister() {
      let params = {
        studentPhone: this.user.studentPhone,
        code: this.user.code,
        studentName: this.user.studentName,
        studentPassword: md5(this.user.studentPassword)
      };

      this.$refs.registerForm.validate(valid => {
        if (valid) {
          this.$http.postRegister(params).then(res => {
            console.log('注册', res);
            if (res.code != 0) {
              if(res.data[0].head){
                  setCookie('head',res.data[0].head)
              }
              setCookie("accessToken", res.data[0].accessToken);
              setCookie("studentId", res.data[0].id);
              this.$router.push("/login");
            }
          });
        } else {
          return false;
        }
      });
    },
    handleEditPwd() {
      let params = {
        studentPhone: this.user.studentPhone,
        code: this.user.code,
        studentPassword: md5(this.user.studentPassword)
      };
      this.$refs.forgetPwdForm.validate(valid => {
        if (valid) {
          this.$http.postUpdatePwd(params).then(res => {
            console.log(222, res);
            if (res.code === 1) {
              this.$router.push("/login");
            } 
          });
        } else {
          return false;
        }
      });
    }
  }
};
</script>

<style lang='scss'>
$font-color: #aaaaaa;
.register {
  width: 100%;
  margin: auto;
  height: 66px;
  border-bottom: 1px solid #dddddd;
  background: #fff;
  .nav {
    margin-bottom: 10%;
    .nav_nr {
      margin: auto;
      width: 1010px;
      .nav_left {
        width: 300px;
        margin: auto;
        float: left;
        padding-top: 20px;
        margin-right: 20px;
        .account_pass {
          width: 148px;
          height: 28px;
          float: right;
          border-left: 1px solid #c9c9c9;
          font-size: 18px;
          padding-left: 14px;
          span {
            color: #666666;
          }
        }
        img {
          vertical-align: bottom;
        }
      }
    }
  }
  .nav_right {
    width: 150px;
    float: right;
    line-height: 66px;
    a {
      color: $font-color;
      font-size: 13px;
      padding-right: 10%;
      &:hover {
        text-decoration: underline;
      }
      .back_picture {
        width: 57px;
        float: left;
        color: $font-color;
        font-size: 13px;
        background: url() no-repeat 0 25px;
        padding-left: 20px;
        text-align: right;
      }
    }
  }
  .main {
    width: 780px;
    margin: 50px auto;
    border: 1px solid #dcdcdc;
    background: #fff;
    border-radius: 1%;
    position: relative;
    .title {
      margin: auto;
      width: 720px;
      height: 50px;
      line-height: 46px;
      border-bottom: 1px solid #dddddd;
      color: #434343;
      font-size: 16px;
      padding: 0 10px;
    }
    .registerForm {
      width: 320px;
      margin: 70px 0 0 230px;
      position: relative;
      .msgCode {
        width: 200px;
        float: left;
        vertical-align: middle;
        margin-right: 2%;
      }
      .nameSpan {
        color: #1b66c7;
        font-size: 12px;
        margin-left: 8px;
      }
      .checkBox {
        float: left;
        margin-bottom: 0;
        span {
          color: #999;
          font-size: 12px;
        }
        a {
          color: #1b66c7;
        }
      }
      .btn_sub {
        .btn {
          width: 100%;
          font-size: 18px;
          background: #e03537;
          font-weight: 400;
          span {
            color: #fff;
          }
        }
      }
    }
    .other_way {
      width: 320px;
      margin: 60px 0 0px 230px;
      position: relative;
      h3 {
        text-align: center;
        height: 35px;
        color: #919191;
      }
      .login_way {
        width: 320px;
        text-align: center;
        .weChat {
          width: 59px;
          height: 60px;
          display: inline-block;
          margin: 0 25px 0 0;
          background: url(../../assets/images/weChat.png) no-repeat -20px 0;
        }
      }
    }
  }
  .foot {
    margin: 20px auto;
    width: 460px;
    height: 80px;
    font-size: 12px;
    line-height: 24px;
    text-align: center;
    color: $font-color;
    a {
      color: $font-color;
    }
  }
}
</style>