<template>
  <div class="Home">
    <base-header :activeIndex="activeIndex"></base-header>
    <router-view class="me-container" />
    <base-footer v-if="$route.meta.footShow"></base-footer>
    <div class="other_footer" v-else>
      <p class="copy">
        Copyright © 2005-2020
        <a href target="_black">51CTO.COM</a>
        版权所有 京ICP证060544号
      </p>
    </div>
  </div>
</template>

<script>
  import BaseHeader from "@/components/navigation";
  import BaseFooter from "@/components/footer";

  export default {
    name: 'Home',
    data() {
      return {
        activeIndex: '/home',
        footerShow: false
      }
    },
    components: {
      'base-header': BaseHeader,
      'base-footer': BaseFooter
    },
    created() {
    },
    beforeRouteEnter(to, from, next) {
      next(vm => {
        vm.activeIndex = to.path
      })
    },
  }

</script>

<style lang="scss">
  $a_color: #999;

  .base_footer {
    min-width: 100%;
    position: absolute;
    bottom: 0;
    left: 0;
  }

  .other_footer {
    padding: 40px 0;
    font-size: 12px;
    background: #eaeaeb;
    text-align: center;

  }

  .copy {
    color: #999;

    a {
      color: $a_color;
    }
  }

</style>
