<template>
  <div class="home" v-title data-title="文章分享及技术交流平台">
    <div class="main">
      <div class="content">
        <div class="left">
          <!-- 二级菜单 -->
          <div class="menu">
            <p class="menu_title">
              <span style="display:inline-block;padding-left:12px">
                <i class="iconfont iconfenlei" style="color: #fff;"></i>
              </span>
              <span>全部分类</span>
              <ul class="menu_content">
                <!-- 一级菜单 -->
                <li v-for="(item,index) in List " :key="index">
                  <div style="display:inline-block" v-for="(items,cindex) in item" :key="items.id">
                    <p style="display:inline-block;color:#fff" @click="toArticleCategory(items.id)">{{items.name}}</p>
                    <span v-if="cindex==0"></span>
                    <span class="ident" v-else></span>
                  </div>
                  <!-- 二级菜单 -->
                  <div class="show_box">
                    <div v-for="(items) in item" :key="items.id">
                      <h3>{{items.name}}</h3>
                      <p style="display:inline-block" v-for="(items_child) in items.children" :key="items_child.id">
                        <span @click="toArticleCategory(items_child.id)">{{items_child.name}}</span>
                      </p>
                    </div>
                  </div>

                </li>
              </ul>
            </p>
          </div>
          <!-- 轮播 -->
          <div class="banners">
            <el-carousel height="315px">
              <el-carousel-item v-for="(item,index) in banner_img" :key="index">
                <img ref="imgHeight" :src="item.imageUrl" class="banner_img" />
              </el-carousel-item>
            </el-carousel>
          </div>
          <div class="clear"></div>
          <!-- 文章 -->
          <div class="article_head">
            <ul>
              <li class="quality_articles">
                <i class="buledot"></i>
                <a href>优质文章</a>
              </li>
            </ul>
          </div>
          <!-- 文章列表 -->
          <div v-if="article_list&&article_list.length" v-loading="Loading"
              element-loading-text="拼命加载中">
            <div v-for="(item,index) in article_list" :key="index" class="article_container">
              <ul>
                <li>
                  <div class="userInfo clearfix">
                    <p style="float: left;cursor: pointer;">
                      <span @click="toPersonal(item.studentVO.id)">
                        <img class="avatar" :src="item.studentVO.head" alt />
                      </span>
                    </p>
                     <span @click="toPersonal(item.studentVO.id)">
                             <a href class="username">{{item.studentVO.studentName}}</a>
                      </span>
                    <span class="time">发布于:</span>
                    <time-ago :datetime="item.createTime" locale="zh_CN" refresh long></time-ago>
                  </div>
                  <h2>
                    <a  @click="toDetail(item.id)">{{item.articleName}}</a>
                  </h2>
                  <p class="article_detail" v-html="item.articleContent">{{item.articleContent}}</p>
                  <div class="introduction">
                    <p>
                      <span>阅读{{item.readVolume}}</span>
                    </p>
                    <p>
                      <span>评论{{item.commentVolume}}</span>
                    </p>
                    <p>
                      <span>收藏{{item.collectionVolume}}</span>
                    </p>
                  </div>
                  <span class="zan_favour_num" @click="isLike(item.id)">
                    <i class="iconfont icondianzan" v-if="item.isLike == 1" style="color:orange"></i>
                    <i class="iconfont icondianzan" v-else></i>
                    {{item.likeVolume}}</span>
                </li>
              </ul>
            </div>
            <div class="more" v-if="article_list.length=10" @click="toArticleCategory()">
              <p style="color: #6483a2">点击浏览更多>></p>
            </div>
          </div>
          <div class="article_container" v-else style="font-size: 24px;line-height: 200px;text-align: center;">
            暂无数据~
          </div>
        </div>
        <div class="right">
          <div class="iwantWrite">
            <p>
              <span>
                <router-link :to="{path:'/write/article'}">我要写文章</router-link>
              </span>
              <span>
                <a href class="take_notes">记录自己</a>
              </span>
              <span>
                <a href class="take_notes">记录自己</a>
              </span>
            </p>
          </div>
          <div v-if="announcement_list&&announcement_list.length" v-loading="Loading" element-loading-text="拼命加载中">
            <ul class="announcement">
              <li>
                <span>公告</span>
                <a href target="_blank" style="color: #4285f4">{{articleOne}}</a>
              </li>
              <li v-for="(article,index) in announcement_list" :key="index">
                <a href>{{article.noticeName}}</a>
              </li>
            </ul>
          </div>
          <div class="announcement" style="line-height:80px;text-align:center;font-size:16px" v-else>暂无公告~</div>
        </div>
        <div class="clear"></div>
      </div>
    </div>
  </div>
</template>
<script>
  import TimeAgo from 'vue2-timeago';
  export default {
    components: {
      TimeAgo
    },
    data() {
      return {
        announcement_list: [],
        article_list: [],
        banner_img: [],
        Loading: false,
        articleOne: "",
        List: []
      };
    },
    watch: {},
    computed: {},
    methods: {
      init() {
        this.getBanners()
        this.initFetchData()
        this.getAnnouncement()
        this.getCategory()
      },
      getBanners() {
        this.$http.postBanner(1001).then(res => {
          this.banner_img = res.data;
        });
      },
      getAnnouncement() {
        this.$http.getAnnouncement().then(res => {
          this.articleOne = res.data[0].noticeName;
          this.announcement_list = res.data.slice(1);
        });
      },
      getCategory() {
        this.$http.postCategory({
            categoryType: 1}
          ).then(res => {
          let data = res.data
          let dataLength = data.length / 3
          let newList = []
          let a = 0;
          for (let j = 0; j < dataLength; j++) {
            newList.push(data.slice(a, a + 3))
            a = a + 3
          }
          this.List = newList
        })
      },
      async initFetchData() {
        this.Loading = true;
        await this.getHomeArticleList();
        await this.getAnnouncement();
        this.Loading = false;
      },
      getHomeArticleList() {
        this.$http.postHomeArticleList().then(res => {
          this.article_list = res.data;
        });
      },
      isLike(isLikeId) {
        let params = {
          "isLike": 0,
          "type": 2,
          "typeId": isLikeId
        }
        this.$http.postlikeRecord(params).then(res => {
          this.getHomeArticleList()
        });
      },
      toArticleCategory(categotyId) {
        this.$router.push({
          path: '/original/all',
          query: {
            categoryId: categotyId
          }
        })
      },
      toPersonal(userId) {
        window.open(`/personal?userId=${userId}`, '_blank')
      },
      toDetail(articleId){
         window.open(`/articleDetail?articleId=${articleId}`, '_blank')
      }
    },
    created() {
      this.init()
    },
    mounted() {}
  };

</script>
<style lang="scss">
  $common_border: 1px solid #eee;
  $common_float: left;
  $a_color: #999;
  $hover_color:#4285f4;

  .v-time-ago__text {
    color: #999 !important;
    line-height: 0 !important;
    font-size: 100% !important;
  }

  .el-carousel__item h3 {
    color: #475669;
    font-size: 14px;
    opacity: 0.75;
    line-height: 150px;
    margin: 0;
  }

  .el-carousel__item:nth-child(2n) {
    background-color: #99a9bf;
  }

  .el-carousel__item:nth-child(2n + 1) {
    background-color: #d3dce6;
  }

  .home {
    background-color: #f7f7f8 !important;

    .main {
      min-height: 800px;
      padding-top: 20px;

      .content {
        width: 1200px;
        margin: 0 auto;

        .left {
          width: 880px;
          overflow: hidden;
          float: $common_float;

          .menu {
            background: #4285f4;
            width: 220px;
            height: 315px;
            float: $common_float;
            position: relative;

            .menu_title {
              font-size: 16px;
              line-height: 45px;

              span {
                color: #fff;
              }
            }

            .menu_content {
              li:hover .showbox {
                display: block;
              }

              li:hover {
                background: #fff;


                p {
                  color: #666 !important;

                  &:hover {
                    color: $hover_color !important;
                  }
                }

                .show_box {
                  display: block;
                }


              }

              li {
                height: 45px;
                padding-left: 10px;
                font-size: 14px;

                div {
                  overflow: hidden;

                }

                a {
                  float: $common_float;
                  color: #fff;
                }

                .ident {
                  float: $common_float;
                  width: 1px;
                  height: 12px;
                  background: #DDD;
                  margin: 17px 5px;
                  opacity: 0.6
                }


                p:hover {
                  cursor: pointer;
                  color: $hover_color;
                }

                .show_box {
                  position: absolute;
                  display: none;
                  z-index: 11;
                  top: 0;
                  left: 220px;
                  border: 1px solid #DDD;
                  background: #FFF;
                  height: 313px;
                  width: 350px;
                  padding: 0 20px;

                  h3 {
                    font-size: 14px;
                    font-weight: normal;
                    margin-top: 20px;
                    line-height: 1;
                  }

                  p {
                    overflow: hidden;

                    span {
                      cursor: pointer;
                      height: 30px;
                      margin-right: 15px;
                      font-size: 12px;
                      color: #666;
                      display: inline-block;
                    }

                    span:hover {
                      color: $hover_color;
                    }
                  }
                }
              }
            }
          }

          .banners {
            width: 650px;
            height: 315px;
            position: relative;
            margin-left: 10px;
            float: $common_float;

            img {
              width: 100%;
              height: inherit;
            }
          }

          .article_head {
            margin-top: 30px;
            border-bottom: $common_border;
            padding-bottom: 15px;
            line-height: 20px;

            li {
              position: relative;
              margin-right: 45px;
              padding-left: 10px;
              font-size: 16px;

              .buledot {
                position: absolute;
                width: 4px;
                height: 4px;
                left: 3px;
                top: 50%;
                overflow: hidden;
                padding: 0;
                display: block;
                background: #4285f4;
                margin-top: -2px;
                border-radius: 4px;
              }

              a {
                color: #4285f4;
              }
            }
          }

          .article_container {
            ul {
              li:hover {
                background-color: #fff;
              }

              li {
                padding: 20px 20px 20px 10px;
                border-bottom: 1px solid #eee;
                font-size: 12px;
                position: relative;
                overflow: hidden;

                .userInfo {
                  line-height: 32px;
                  margin-bottom: 15px;
                  overflow: hidden;

                  .avatar {
                    width: 32px;
                    height: 32px;
                    border-radius: 50%;
                    display: block;
                    float: $common_float;
                    margin-right: 0px;
                  }

                  a {
                    color: #333;
                    float: $common_float;
                    margin-left: 10px;
                  }

                  .time {
                    color: $a_color;
                    float: $common_float;
                    margin-left: 10px;
                  }
                }

                .clearfix::before {
                  display: table;
                  line-height: 0;
                  content: "";
                }

                h2 {
                  line-height: 1;
                  margin-bottom: 15px;
                  font-size: 20px;
                }

                .article_detail {
                  color: #666;
                  height: 48px;
                  line-height: 24px;
                  overflow: hidden;
                  font-size: 14px;
                }

                .introduction {
                  overflow: hidden;
                  line-height: 24px;
                  padding-top: 15px;

                  p {
                    float: $common_float;
                    margin-right: 20px;

                    span {
                      color: #999;
                    }
                  }
                }

                .zan_favour_num {
                  color: #666;
                  padding: 0;
                  padding-left: 25px;
                  padding-top: 6px;
                  position: absolute;
                  top: 20px;
                  right: 20px;

                  i {
                    font-size: 20px;
                  }

                  & i:hover {
                    color: orange;
                    cursor: pointer;
                  }
                }
              }
            }

          }

          .more {
            background: #cdd8e3;
            cursor: pointer;
            line-height: 32px;
            margin: 20px 0;
            text-align: center;
          }

          .more:hover {
            background: #bccbd9;
          }
        }

        .right {
          width: 300px;
          float: right;

          .iwantWrite {
            margin-bottom: 20px;
            height: 22px;
            padding: 12px 25px;
            position: relative;
            background: #fff;
            border: $common_border;

            p {
              .take_notes {
                border-left: $common_border;
                padding-left: 20px;
                color: #999;
                line-height: 22px;
                font-size: 12px;
              }

              .want_write {
                color: #4285f4;
                margin-right: 10px;
                font-size: 15px;
                background: url(/edu/blog/images/03_110_1.png) no-repeat 5px center;
              }
            }
          }

          .announcement {
            margin-bottom: 30px;
            padding: 10px 20px;
            border: $common_border;
            background: #fff;

            li:nth-child(2) a {
              color: #4285f4;
            }

            li {
              padding: 5px 0;
              word-wrap: normal;
              word-spacing: normal;
              white-space: nowrap;
              text-overflow: ellipsis;
              overflow: hidden;

              span {
                color: #4285f4;
                padding-right: 5px;
                margin-right: 5px;
                font-weight: bold;
                border-right: 1px solid #aaa;
              }
            }
          }
        }
      }
    }
  }

</style>
