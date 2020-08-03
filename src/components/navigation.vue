<template>
  <div class='navigation'>
    <div class="header">
      <h1 class="logo">
        <a href="">logo</a>
      </h1>
      <ul class="nav">
        <el-menu :router=true menu-trigger="click" active-text-color="#5FB878" :default-active="activeIndex"
          mode="horizontal">
          <el-menu-item index="/home">首页</el-menu-item>
          <el-menu-item index="/original/all">文章</el-menu-item>
          <el-menu-item :index="currentIndex">关注</el-menu-item>
          <el-menu-item index="/original/answer">问答</el-menu-item>
        </el-menu>
      </ul>
      <ul class="nav_right">
        <el-menu :router=true menu-trigger="click" mode="horizontal" active-text-color="#5FB878">
          <el-menu-item index="/write/article">
            写文章
          </el-menu-item>
          <el-menu-item index="/home">
            搜索
          </el-menu-item>
          <el-menu-item index="/login" v-if="user==undefined">
            登录
          </el-menu-item>
          <el-menu-item index="/register" v-if="user==undefined">
            注册
          </el-menu-item>
          <el-menu-item :index="personal" v-else>
            <el-dropdown>
              <img
                src="https://s1.51cto.com//oss/201907/12/4fc5e71a2fa24c7e284336c190c02693.jpg?x-oss-process=image/resize,m_fixed,h_120,w_120"
                class="user_info" alt="头像" style="width:40px;height:40px;border-radius:50%" />
              <el-dropdown-menu slot="dropdown">
                <el-dropdown-item>
                  <span @click="toPersonal()">我的博客</span>
                </el-dropdown-item>
                <el-dropdown-item>
                  <span @click="deleteCookie()">退出</span>
                </el-dropdown-item>
              </el-dropdown-menu>
            </el-dropdown>

          </el-menu-item>
        </el-menu>
      </ul>
    </div>
  </div>
</template>

<script>
  import {
    getCookie,
    deleteCookie
  } from '@/util/Cookie'
  export default {
    name: 'banner',
    props: {
      activeIndex: String,
      simple: {
        type: Boolean,
        default: false
      }
    },
    data() {
      return {
        user: "",
        currentIndex: '/login',
        personal: '',
        userId: ''
      };
    },
    created() {
      this.userId = getCookie('studentId')
      this.personal=`/personal?userId=${this.userId}`
    },
    mounted() {
      this.user = getCookie('accessToken')
      if (this.user) {
        this.currentIndex = "/follow/all"
      }
    },
    methods: {
      deleteCookie() {
        // 需重新刷新
        deleteCookie('accessToken')
        deleteCookie('studentId')
        deleteCookie('head')
        this.$router.go(0)
      },
      toPersonal() {
        window.open(`/personal?userId=${this.userId}`, '_blank')
      }
    },

  };

</script>
<style lang="scss" scoped>
  .el-menu--horizontal>.el-menu-item.is-active {
    border-bottom: none;
  }

  .el-menu-item:hover {
    color: #4285f4 !important;
  }

  .el-menu-item *:hover {
    color: #4285f4 !important;
  }

  .el-menu-item.is-active {
    color: #4285f4 !important;
    border-bottom-color: transparent !important
  }

  .el-menu--horizontal>.el-menu-item {
    color: #303133;
  }

  .navigation {
    background: #FFF;
    border-bottom: 1px solid #DDD;
    height: 60px;
    position: relative;
    z-index: 21;
    min-width: 1000px;

    .header {
      width: 1200px;
      margin: 0 auto;
      overflow: hidden;

      .logo {
        width: 150px;
        //  background: url(/edu/blog/images/logonew2.0.1.png) no-repeat center;
        line-height: 60px;
        float: left;

        a {

          height: 100%;
          text-indent: -9999px;
        }
      }

      .nav {
        float: left;

        li {
          float: left;
          cursor: pointer;
          font-size: 16px;
          line-height: 60px;

          p:hover {
            color: #4285f4 !important;
          }
        }


        .active {
          color: #4285f4;
        }
      }

      .nav_right {
        float: right;


        li {
          font-size: 12px;
          line-height: 60px;
          display: inline-block;
        }

        .login {
          margin-right: 10px;
          background: url(/edu/blog/images/top-line.png) no-repeat right center;
          padding-right: 10px;
        }

      }
    }
  }

</style>
