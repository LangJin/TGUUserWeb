<template>
  <div class="footer">
    <div class="content">
        <div class="fl">
          <div class="title">关于我们</div>
          <ul>
            <li>
              <a href target="black">关于我们</a>
            </li>
            <li>
              <a href target="black">了解我们</a>
            </li>
            <li>
              <a href target="black">意见反馈</a>
            </li>
          </ul>
          <ul>
            <li>
              <a href target="black">关于我们</a>
            </li>
            <li>
              <a href target="black">了解我们</a>
            </li>
            <li>
              <a href target="black">意见反馈</a>
            </li>
          </ul>
        </div>
        <div class="fl">
          <div class="title">友情链接</div>
          <ul>
            <li>
              <a href target="black">关于我们</a>
            </li>
            <li>
              <a href target="black">了解我们</a>
            </li>
            <li>
              <a href target="black">意见反馈</a>
            </li>
          </ul>
          <ul>
            <li>
              <a href target="black">关于我们</a>
            </li>
            <li>
              <a href target="black">了解我们</a>
            </li>
            <li>
              <a href target="black">意见反馈</a>
            </li>
          </ul>
        </div>
        <div class="fl">
          <div class="title">关注我们</div>
          <div>
            <img src="https://static2.51cto.com/blog/web/images/qrcode_2.png" alt />
            <img src="https://static2.51cto.com/blog/web/images/qrcode_2.png" alt />
            <img src="https://static2.51cto.com/blog/web/images/qrcode_2.png" alt />
          </div>
        </div>
        <div class="fr">
          <div class="links">
            <a href target="_black">官方博客</a>
            <a href target="_black">QQ群</a>
            <a href target="_black">管家QQ</a>
          </div>
          <p class="copy">
            Copyright © 2005-2020
            <a href target="_black">51CTO.COM</a>
            版权所有 京ICP证060544号
          </p>
        </div>
      </div>
  </div>
</template>

<script>
  export default {
    name: 'footerr',
    data() {
      return {};
    },
    mounted() {},
    methods: {

    },

  };

</script>
<style lang="scss" scoped>
  $a_color: #999;
  $common_float: left;

  .footer {
    padding: 40px 0;
    overflow: hidden;
    font-size: 12px;
    color: #999;
    background: #eaeaeb;

    .content {
      width: 1200px;
      margin: 0 auto;

      .fl {
        float: $common_float;
        margin-right: 40px;
        font-size: 14px;

        .title {
          font-size: 16px;
          margin-bottom: 10px;
          color: #333;
        }

        ul {
          float: $common_float;

          li {
            padding-right: 35px;
            height: 28px;

            a {
              color: $a_color;
            }
          }
        }

        img {
          margin-right: 20px;
        }
      }

      .fr {
        float: right;

        .links {
          overflow: hidden;

          margin-top: 20px;
          margin-bottom: 22px;

          a {
            display: inline-block;
            width: 75px;
            text-align: center;
            color: $a_color;
          }
        }


      }
    }
  }

 

</style>
