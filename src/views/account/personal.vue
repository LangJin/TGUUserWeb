<template>
  <div class="content_box">
    <div class="main">
      <div class="main_header">
        <div class="header_page">
          <div class="header_top">
            <div class="photo">
              <a href="javascript:;" class="a_img">
                <img class="photo_img" :src="user.head" />
              </a>
            </div>

            <div class="center">
              <a href="javascript:;" class="name">{{user.studentName}}的博客</a>
              <ul class="number_list">
                <li>
                  <span>{{user.popularityVolume}}</span>
                  <p>人气</p>
                </li>
                <li>
                  <span>{{user.articleVolume}}</span>
                  <p>文章</p>
                </li>
                <li>
                  <span>{{user.commentVolume}}</span>
                  <p>评论</p>
                </li>
                <li>
                  <span>{{user.likeVolume}}</span>
                  <p>点赞</p>
                </li>
              </ul>
              <ul class="icon_list">
                <div class="clear"></div>
              </ul>
            </div>

            <div class="right_msg">
              <a href="javascript:;" class="siMsg" target="_blank">私信</a>
            </div>
            <div class="clear"></div>
          </div>

          <div class="header_bottom">
            <ul class="left_list">
              <!-- <li v-for="list in leftList">{{list.name}} {{list.num}}</li> -->
              <li>原创 0</li>
              <li>翻译 0</li>
              <li>转载 0</li>
            </ul>
            <div class="right_list">
              <p>分享：</p>
              <a href="javascript:;" class="bds_qq" title="分享到QQ好友"></a>
              <a href="javascript:;" class="bds_tsina" title="分享到新浪微博"></a>
              <a href="javascript:;" class="bds_weChat" title="分享到微信"></a>
            </div>
            <div class="clear"></div>
          </div>
        </div>
      </div>
      <div class="mian_page">
        <div class="left_page" id="Tab">
          <el-tabs v-model="activeName" type="card" @tab-click="handleClick">
            <!-- 文章列表 -->
            <el-tab-pane class="aticles_list" label="文章" name="first">
              <div v-if="article_list&&article_list.length" style="min-height:400px">
                <div
                  v-for="(item,index) in article_list"
                  :key="index"
                  class="article_container"
                  v-loading="Loading"
                  element-loading-text="拼命加载中"
                >
                  <ul>
                    <li>
                      <div class="userInfo clearfix">
                        <p style="float: left;">
                          <a href target="_blank">
                            <img class="avatar" :src="item.studentVO.head" alt />
                            <!-- <img
                              class="avatar"
                              src="https://s1.51cto.com//oss/201907/12/4fc5e71a2fa24c7e284336c190c02693.jpg?x-oss-process=image/resize,m_fixed,h_120,w_120"
                            />-->
                          </a>
                        </p>
                        <a href class="username">{{item.studentVO.studentName}}</a>
                        <span class="time">发布于:</span>
                        <time-ago :datetime="item.createTime" locale="zh_CN" refresh long></time-ago>
                      </div>
                      <h2>
                        <a @click="toDetail(item.id)">{{item.articleName}}</a>
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
                        <div v-show="isMyPage">
                          <p class="remove">
                            <a href="javascript:;" @click="handleRemove(item.id)">删除</a>
                          </p>
                          <p class="edit">
                            <a href="javascript:;" @click="handEdit(item.id)">编辑</a>
                          </p>
                        </div>
                      </div>
                      <span class="zan_favour_num" @click="isLike(item.id)">
                        <i
                          class="iconfont icondianzan"
                          v-if="item.isLike == 1"
                          style="color:orange"
                        ></i>
                        <i class="iconfont icondianzan" v-else></i>
                        {{item.likeVolume}}
                      </span>
                    </li>
                  </ul>
                </div>
              </div>
              <div
                class="article_container"
                v-else
                style="font-size: 24px;line-height: 200px;text-align: center;"
              >暂无数据~</div>
              <div class="pagination" v-if="article_list&&article_list.length>0">
                <el-pagination
                  @size-change="handleSizeChange"
                  @current-change="handleCurrentChange"
                  :current-page="currentPage"
                  :page-size="pageSize"
                  layout="prev, pager, next,total"
                  :total="total"
                ></el-pagination>
              </div>
            </el-tab-pane>

            <!-- 关注列表 -->
            <el-tab-pane class="attention_list" label="关注" name="second">
              <div v-if="attention_list&&attention_list.length" style="min-height:400px">
                <div
                  v-for="(item,index) in attention_list"
                  :key="index"
                  class="attention_container"
                  v-loading="Loading"
                  element-loading-text="拼命加载中"
                >
                  <ul>
                    <li>
                      <div class="attention_head">
                        <a class="left" href="javascript:;" target="_blank">
                          <img v-if="item.head" :src="item.head" class="user_info" alt="头像" />
                          <img
                            v-else
                            src="https://s1.51cto.com//oss/201907/12/4fc5e71a2fa24c7e284336c190c02693.jpg?x-oss-process=image/resize,m_fixed,h_120,w_120"
                            class="user_info"
                            alt="头像"
                          />
                        </a>
                      </div>
                      <div class="attention_content">
                        <a href="javascript:;" class="attention_name">{{item.studentName}}</a>
                        <a class="span3">
                          <em>关注 {{item.followVolume}}</em>
                          <em>粉丝 {{item.fansVolume}}</em>
                          <em>文章 {{item.articleVolume}}</em>
                        </a>
                      </div>
                      <div v-if="item.isFollow==0">
                        <div class="is_follow" @click="saveFollow(item.id)">+ 关注</div>
                      </div>
                      <div v-else>
                        <div class="followed" @click="cancleFollow(item.id)">√ 已关注</div>
                      </div>
                      <!-- <a id="check_attention" class="right" href="javascript:;" @mouseenter="enterText"
                      @mouseleave="leaveText1" @click="unfollow(item.id)">{{content}}</a>-->
                      <div class="clear"></div>
                    </li>
                  </ul>
                </div>
              </div>
              <div
                v-else
                class="attention_container"
                style="font-size: 24px;line-height: 200px;text-align: center;"
              >暂无数据~</div>
              <div class="pagination" v-if="attention_list&&attention_list.length>0">
                <el-pagination
                  @size-change="handleSizeFollow"
                  @current-change="handleCurrentFollow"
                  :current-page="currentPageL"
                  :page-size="pageSizeL"
                  layout="prev, pager, next,total"
                  :total="total"
                ></el-pagination>
              </div>
            </el-tab-pane>

            <!-- 粉丝列表 -->
            <el-tab-pane class="attention_list" label="粉丝" name="third">
              <div v-if="fans_list&&fans_list.length" style="min-height:400px">
                <div
                  v-for="(item,index) in fans_list"
                  :key="index"
                  class="attention_container"
                  v-loading="Loading"
                  element-loading-text="拼命加载中"
                >
                  <ul>
                    <li>
                      <div class="attention_head">
                        <a class="left" href="javascript:;" target="_blank">
                          <img v-if="item.head" :src="item.head" class="user_info" alt="头像" />
                          <img
                            v-else
                            src="https://s1.51cto.com//oss/201907/12/4fc5e71a2fa24c7e284336c190c02693.jpg?x-oss-process=image/resize,m_fixed,h_120,w_120"
                            class="user_info"
                            alt="头像"
                          />
                        </a>
                      </div>
                      <div class="attention_content">
                        <a href="javascript:;" class="attention_name">{{item.studentName}}</a>
                        <a class="span3">
                          <em>关注 {{item.followVolume}}</em>
                          <em>粉丝 {{item.fansVolume}}</em>
                          <em>文章 {{item.articleVolume}}</em>
                        </a>
                      </div>
                      <div class="clear"></div>
                    </li>
                  </ul>
                </div>
              </div>
              <div
                v-else
                class="attention_container"
                style="font-size: 24px;line-height: 200px;text-align: center;"
              >暂无数据~</div>
              <div class="pagination" v-if="fans_list&&fans_list.length>0">
                <el-pagination
                  @size-change="handleSizeFans"
                  @current-change="handleCurrentFans"
                  :current-page="currentPageF"
                  :page-size="pageSizeF"
                  layout="prev, pager, next,total"
                  :total="total"
                ></el-pagination>
              </div>
            </el-tab-pane>
            <el-tab-pane class="aticles_list" label="问答" name="fourth">
              <div v-if="question_list&&question_list.length">
                <div
                  v-for="(item,index) in question_list"
                  :key="index"
                  class="article_container"
                  v-loading="Loading"
                  element-loading-text="拼命加载中"
                >
                  <ul>
                    <li>
                      <div class="userInfo clearfix">
                        <p style="float: left;cursor: pointer;">
                          <span @click="toPersonal(item.id)">
                            <img class="avatar" :src="item.head" alt />
                          </span>
                        </p>
                        <span @click="toPersonal(item.id)">
                          <a href class="username">{{item.studentName}}</a>
                        </span>
                        <span class="time">发布于:</span>
                        <time-ago :datetime="item.createTime" locale="zh_CN" refresh long></time-ago>
                      </div>
                      <h2>
                        <a href target="_blank">{{item.questionName}}</a>
                      </h2>
                      <p class="article_detail" v-if="item.answerVO">{{item.answerVO.content}}</p>
                      <div class="introduction" v-if="item.answerVO">
                        <p class="agree">
                          <template v-if="item.answerVO.isLike == 0">
                            <button class="like" @click="isLike(item.answerVO.id)">
                              <i class="iconfont iconshengxu"></i>
                              赞同&nbsp;{{item.answerVO.numberOfLikes}}
                            </button>
                          </template>
                          <template v-else>
                            <button class="liked">
                              <i class="iconfont iconshengxu"></i>
                              已赞同&nbsp;{{item.answerVO.numberOfLikes}}
                            </button>
                          </template>
                        </p>
                        <p class="cancle_agree" @click="cancleLike(item.answerVO.id)">
                          <i class="iconfont iconjiangxu"></i>
                        </p>
                        <p>
                          <span>阅读{{item.readVolume}}</span>
                        </p>
                        <p>
                          <span>评论{{item.commentVolume}}</span>
                        </p>
                        <p>
                          <span>收藏{{item.collectionVolume}}</span>
                        </p>
                        <div v-show="isMyPage">
                          <p class="remove">
                            <a href="javascript:;" @click="handleRemove(item.id)">删除</a>
                          </p>
                          <!-- <p class="edit">
                            <a href="javascript:;" @click="handEdit(item.id)">编辑</a>
                          </p>-->
                        </div>
                      </div>
                    </li>
                  </ul>
                </div>
              </div>
              <div
                class="article_container"
                v-else
                style="font-size: 24px;line-height: 200px;text-align: center;"
              >暂无数据~</div>
              <div class="pagination" v-if="question_list&&question_list.length>0">
                <el-pagination
                  @size-change="handleSizeQuestion"
                  @current-change="handleCurrentQuestion"
                  :current-page="currentPageQ"
                  :page-size="pageSizeQ"
                  layout="prev, pager, next,total"
                  :total="total"
                ></el-pagination>
              </div>
            </el-tab-pane>
          </el-tabs>
        </div>

        <div class="right_page">
          <div class="myPage" v-show="isMyPage">
            <div class="index_mesg_follow">
              <span>如何拥有关注功能</span>
              <p>
                <i></i>
                1. 原创有1篇被编辑推荐且近一年内有更新文章
                <br />2. 原创有3篇上首页且近一年内有更新文章
                <br />3. 有一篇10000+的文章
                <br />4. 专栏作者
                <br />5. 以上满足其一则便会拥有关注功能；
                不满足，还需开通可联系管家
              </p>
            </div>
            <!-- 写文章 -->
            <div class="write">
              <router-link :to="{path:'/write/article'}">我要写文章</router-link>
              <p class="havepush_article">
                已发布文章
                <span>{{ user.articleVolume }}</span>
                篇
              </p>
            </div>
          </div>
          <!-- 名称介绍 -->
          <div class="articleBox">
            <div class="list">
              <a href="javasctipt:;" class="box_name">{{user.studentName}}</a>
              <div class="box_til2">
                <span></span>
                <div>
                  <img src="https://blog.51cto.com/blogger/qr?domain=14859802" />
                  <p>分享到朋友圈</p>
                </div>
              </div>
              <div class="clear"></div>
              <div class="bottom">
                <div class="msg_title">
                  <i class="l"></i>
                  <p class="msg_1">
                    {{user.introduce}}
                    <a
                      class="icon"
                      href="https://blog.51cto.com/blogger/setting#D"
                      target="_blank"
                    ></a>
                  </p>
                  <i class="r"></i>
                </div>
                <ul class="my_list"></ul>
              </div>
            </div>
          </div>

          <!-- 七日热门 -->
          <h3 class="boxTil">七日热门</h3>
          <div class="box artilces">
            <div class="list">
              <ul class="seven_list">
                <!-- <li v-for="list in articleList">
                  <a href="javascript:;" target="_blank">{{list.name}}</a>
                </li>-->
                <li class="s1">
                  <a
                    href="javascript:;"
                    target="_blank"
                  >Netty网编程实战：四种解决粘包方式切换、两种生产级双向监听模式并行、高效编解码、多处理器协同作战</a>
                </li>
                <li class="s2">
                  <a href="javascript:;" target="_blank">Proxmox VE + OpenMediaVault + NextCloud</a>
                </li>
              </ul>
            </div>
          </div>

          <!-- 最近来访 -->
          <h3 class="boxTil">最近来访</h3>
          <div class="box artilces">
            <div class="list">
              <ul class="come_round_list">
                <li>
                  <div class="is_vip_bg_3">
                    <a href="javascript:;" class="a_img" target="_blank">
                      <img
                        class="is_vip_img"
                        src="https://s1.51cto.com//oss/202003/18/9d25cb9e7212fa5a2f48353d8d0030a7.jpg?x-oss-process=image/resize,m_fixed,h_120,w_120"
                        alt
                      />
                    </a>
                  </div>
                  <a href="javascript:;" class="con" target="_blank">db2start</a>
                </li>
                <div class="clear"></div>
              </ul>
            </div>
          </div>
        </div>
        <div class="clear"></div>
      </div>
    </div>
  </div>
</template>

<script>
import TimeAgo from "vue2-timeago";
import { getCookie } from "@/util/Cookie";
export default {
  name: "Personal",
  components: {
    TimeAgo,
  },
  data() {
    return {
      activeName: "first",
      user: {},
      Loading: false,
      total: 0,
      single: true,
      content: "已关注",
      article_list: [],
      attention_list: [],
      fans_list: [],
      currentPage: 1,
      pageSize: 5,
      currentPageL: 1,
      pageSizeL: 5,
      currentPageF: 1,
      pageSizeF: 5,
      currentPageQ: 1,
      pageSizeQ: 5,
      total: 0,
      userId: "",
      isMyPage: false,
      isFollow: "",
      typeId: "",
      question_list: [],
      tag_id: "",
    };
  },
  mounted: function () {
    // 获取登录用户信息
    this.$http.postStudentPersonalMessage(this.userId).then((res) => {
      this.user = res.data[0];
    });
  },
  created() {
    this.userId = this.$route.query.userId;
    if (this.userId === getCookie("studentId")) {
      this.isMyPage = true;
    } else {
      this.isMyPage = false;
    }
    this.init();
  },
  methods: {
    saveFollowRecord() {
      let params = {
        isFollow: this.isFollow,
        type: 1,
        typeId: this.typeId,
      };
      this.$http.postSaveFollowRecord(params).then((res) => {});
      this.$forceUpdate();
    },
    saveFollow(id) {
      this.isFollow = 0;
      this.typeId = id;
      this.saveFollowRecord();
      this.getMyFollowRecordList();
    },
    cancleFollow(id) {
      this.$confirm("是否取消关注?", "提示", {
        confirmButtonText: "确定",
        cancelButtonText: "取消",
        type: "warning",
      }).then(() => {
        this.isFollow = 1;
        this.typeId = id;
        this.saveFollowRecord();
        this.getMyFollowRecordList();
      });
    },
    init() {
      this.getMyArticleList();
    },
    // 问答
    getMyQuestionList() {
      this.$http
        .postGetMyQuestionList(this.pageSizeQ, this.currentPageQ, this.userId)
        .then((res) => {
          this.question_list = res.data;
          this.total = res.pagination.total;
        });
    },
    // 文章
    getMyArticleList() {
      this.$http
        .postGetMyArticleList(this.pageSize, this.currentPage, this.userId)
        .then((res) => {
          this.article_list = res.data;
          this.total = res.pagination.total;
        });
    },
    // 粉丝
    getMyFansList() {
      this.$http
        .postgetMyFansList(this.pageSizeF, this.currentPageF, this.userId)
        .then((res) => {
          this.fans_list = res.data;
          this.total = res.pagination.total;
        });
    },
    isLike(isLikeId) {
      let params = {
        isLike: 0,
        type: 2,
        typeId: isLikeId,
      };
      this.$http.postlikeRecord(params).then((res) => {
        this.getMyArticleList();
      });
    },
    // 关注
    getMyFollowRecordList() {
      this.$http
        .postMyFollowRecordList(this.pageSizeL, this.currentPageL, this.userId)
        .then((res) => {
          this.attention_list = res.data;
          console.log(res.data);
          this.total = res.pagination.total;
        });
    },
    handleClick(tab, event) {
      this.tag_id = event.target.getAttribute("id");
      if (tab.name === "second") {
        // 获取关注列表
        this.getMyFollowRecordList();
      } else if (tab.name === "third") {
        //获取粉丝列表
        this.getMyFansList();
      } else if (tab.name === "fourth") {
        this.getMyQuestionList();
      }
    },
    enterText() {
      this.content = "取消关注";
    },
    leaveText1() {
      this.content = "关注";
    },
    unfollow(id) {
      let data = {
        isFollow: 1,
        type: 1,
        typeId: id,
      };
      this.$http.postCancelUserFollowRecord(data).then((res) => {
        if (res.code === 1) {
          this.$message({
            message: res.msg,
            type: "success",
          });
        } else {
          return false;
          console.log("操作失败");
          this.$message({
            message: res.msg,
            type: "warning",
          });
        }
      });
    },
    handleSearch() {},
    handleRemove(articleId) {
      if (this.tag_id === "tab-fourth") {
        this.$confirm("确定删除？", "提示", {
          confirmButtonText: "确定",
          cancelButtonText: "取消",
          type: "warning",
        }).then(() => {
          this.Loading = true;
          this.$http.postDeleteQuestion(articleId).then((res) => {
            this.Loading = false;
            this.getMyQuestionList();
          });
        });
      } else {
        this.$confirm("确定删除？", "提示", {
          confirmButtonText: "确定",
          cancelButtonText: "取消",
          type: "warning",
        }).then(() => {
          this.Loading = true;
          //删除文章
          this.$http.postDeleteArticle(articleId).then((res) => {
            this.Loading = false;
            this.getMyArticleList();
          });
        });
      }
    },
    handEdit(id) {
      this.$router.push({
        path: "/",
        query: {
          id: id,
        },
      });
    },
    handleSizeChange(size) {
      this.pageSize = size;
      this.getMyArticleList();
    },
    handleCurrentChange(currentPage) {
      this.currentPage = currentPage;
      this.getMyArticleList();
    },
    handleSizeFollow(size) {
      this.pageSizeL = size;
      this.getMyFollowRecordList();
    },
    handleCurrentFollow(currentPage) {
      this.currentPageL = currentPage;
      this.getMyFollowRecordList();
    },
    handleSizeFans(size) {
      this.pageSizeF = size;
      this.getMyFansList();
    },
    handleCurrentFans(currentPage) {
      this.currentPageF = currentPage;
      this.getMyFansList();
    },
    handleSizeQuestion(size) {
      this.pageSizeQ = size;
      this.getMyQuestionList();
    },
    handleCurrentQuestion(currentPage) {
      this.currentPageQ = currentPage;
      this.getMyQuestionList();
    },
    toDetail(articleId) {
      window.open(`/articleDetail?articleId=${articleId}`, "_blank");
    },
  },
};
</script>

<style lang='scss' scope>
$common_float: left;
$a_color: #999;

.is_follow {
  float: right;
  width: 82px;
  text-align: center;
  margin-top: 20px;
  background-color: #fff;
  color: #4285f4;
  border: 1px solid #4285f4;

  &:hover {
    color: #fff;
    cursor: pointer;
    background-color: #3477e6;
  }
}

.followed {
  float: right;
  width: 82px;
  text-align: center;
  margin-top: 20px;
  color: #666;
  border: 1px solid #999;
  cursor: pointer;

  &:hover {
    color: #fff;
    cursor: pointer;
    background-color: #3477e6;
  }
}

.content_box {
  min-height: 396px;

  .main {
    position: relative;
    z-index: 10;

    .main_header {
      background: #436394;

      .header_page {
        padding: 60px 0 30px;
        width: 1200px;
        margin: 0 auto;

        .header_top {
          position: relative;

          .photo {
            float: left;

            .a_img {
              display: block;

              img {
                display: block;
                width: 120px;
                height: 120px;
                border-radius: 50%;
              }
            }
          }

          .center {
            position: absolute;
            left: 165px;
            top: 10px;

            .name {
              font-size: 24px;
              color: #fff;
              font-weight: bold;
              margin: 0 0 20px;
              line-height: 1;
              width: 900px;
              overflow: hidden;
              display: block;
              white-space: nowrap;
              text-overflow: ellipsis;
            }

            .number_list {
              margin-left: -35px;

              li:first-child {
                border-left: 0;
              }

              li {
                float: left;
                width: 116px;
                text-align: center;
                border-left: 1px solid #e0e0e0;

                span {
                  display: block;
                  font-size: 20px;
                  color: #fff;
                  line-height: 1;
                }

                p {
                  color: #fff;
                  line-height: 1;
                  margin-top: 8px;
                  font-size: 12px;
                  opacity: 0.5;
                  filter: opacity(50);
                }
              }
            }

            .icon_list {
              margin-top: 20px;
            }
          }

          .right_msg {
            position: absolute;
            right: 0;
            top: 10px;

            .siMsg {
              display: inline-block;
              width: 75px;
              height: 30px;
              text-align: center;
              line-height: 30px;
              color: #fff;
              border: 1px solid #fff;
              border-radius: 2px;
              cursor: pointer;
              margin-left: 20px;
              text-decoration: none;
            }
          }
        }

        .header_bottom {
          margin-top: 40px;

          .left_list {
            float: left;
            margin-left: 166px;

            li {
              float: left;
              line-height: 34px;
              font-size: 12px;
              color: #fff;
              margin-right: 26px;
            }
          }

          .right_list {
            float: right;
            zoom: 1;

            p {
              float: left;
              color: #fff;
              line-height: 33px;
            }

            .bds_qq {
              background-position: left -82px;
              width: 35px;
              height: 35px;
            }

            .bds_tsina {
              background-position: left bottom;
              width: 33px;
              height: 33px;
            }

            .bds_weChat {
              background-position: left 0;
              width: 33px;
              height: 33px;
            }

            a {
              float: left;
              background-image: url(../../assets/images/26.png);
              background-repeat: no-repeat;
              padding-left: 0;
              margin: 0;
              margin-left: 10px;
            }
          }
        }
      }
    }

    .mian_page {
      width: 1200px;
      margin: 0 auto;

      .left_page {
        margin-top: 27px;
        width: 880px;
        float: left;

        .el-tabs__item {
          font-size: 14px;
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

                .agree {
                  .like,
                  .liked {
                    padding: 0 10px;
                    color: #0084ff;
                    outline: none;
                    background: rgba(0, 132, 255, 0.1);
                    border-color: transparent;
                    border-radius: 3px;
                    font-size: 14px;
                    line-height: 32px;
                    text-align: center;
                    cursor: pointer;

                    .iconshengxu {
                      color: #0084ff;
                      vertical-align: middle;
                    }
                  }

                  .like:hover {
                    background-color: rgba(0, 132, 255, 0.15);
                  }

                  .liked {
                    color: #fff;
                    background: #0084ff;

                    .iconshengxu {
                      color: #fff;
                      vertical-align: middle;
                    }
                  }
                }

                .cancle_agree {
                  padding: 0 10px;
                  color: #0084ff;
                  background: rgba(0, 132, 255, 0.1);
                  border-color: transparent;
                  font-size: 14px;
                  line-height: 36px;
                  cursor: pointer;

                  &:hover {
                    background-color: rgba(0, 132, 255, 0.15);
                  }

                  .iconjiangxu {
                    color: #0084ff;
                    font-size: 14px;
                    vertical-align: middle;
                  }
                }

                p {
                  float: $common_float;
                  margin-right: 20px;
                  line-height: 36px;
                  font-size: 14px;

                  span {
                    color: #999;
                  }

                  a {
                    color: #999;
                  }
                }

                .remove {
                  margin-right: 10px;
                  float: right;
                }

                .edit {
                  float: right;
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

                  &:hover {
                    color: orange;
                    cursor: pointer;
                  }
                }
              }
            }
          }
        }

        .attention_list {
          .attention_container {
            ul {
              display: block;

              li {
                padding: 30px 20px;
                position: relative;
                border-top: 1px solid #eee;

                .attention_head {
                  float: left;
                  position: relative;
                  height: 100%;

                  .left {
                    margin-left: 0;
                    display: block;

                    .user_info {
                      width: 72px;
                      height: 72px;
                      display: block;
                      border-radius: 50%;
                    }
                  }
                }

                .attention_content {
                  margin-left: 20px;
                  max-width: 600px;
                  float: left;

                  .attention_name {
                    margin-top: 8px;
                    font-size: 16px;
                    color: #333;
                    display: block;
                    line-height: 1;
                  }

                  .span3 {
                    margin-top: 26px;
                    display: block;
                    line-height: 1;

                    em {
                      font-size: 12px;
                      color: #999;
                      margin-right: 40px;
                    }
                  }
                }

                .right {
                  float: right;
                  background-image: url(../../assets/images/attention_icon.png);
                  margin-top: 30px;
                  margin-left: 20px;
                  color: #666;
                  height: 24px;
                  line-height: 24px;
                  border: 1px solid #666;
                  background-repeat: no-repeat;
                  background-position: 14px center;
                  padding: 0 20px 0 32px !important;
                  border-radius: 4px;

                  &:hover {
                    background-image: url(../../assets/images/unattention_icon.png);
                  }
                }
              }
            }
          }
        }
      }

      .right_page {
        width: 300px;
        float: right;
        margin-top: 27px;

        .index_mesg_follow {
          position: relative;
          margin-bottom: 15px;
          z-index: 2;
          border: 1px solid #eee;

          span {
            display: inline-block;
            padding: 5px 24px 6px 0;
            margin-left: 12px;
            line-height: 1.5;
            color: #e56861;
            background: url();
            cursor: pointer;

            &:hover {
              + p {
                display: inline-block;
              }
            }
          }

          p {
            position: absolute;
            top: 32px;
            left: 42px;
            color: #666;
            font-size: 12px;
            line-height: 20px;
            padding: 15px;
            background: #fff;
            border: 1px solid #efefef;
            display: none;

            i {
              display: inline-block;
              position: absolute;
              top: -7px;
              left: 92px;
              width: 17px;
              height: 18px;
            }
          }
        }

        .write {
          margin-bottom: 20px;
          height: 22px;
          padding: 12px 25px;
          position: relative;
          background: #fff;
          border: 1px solid #eee;

          a {
            &:hover {
              color: rgb(62, 62, 194);
            }
          }

          .havepush_article {
            display: block;
            float: right;
            line-height: 22px;

            span {
              font-size: 16px;
              color: #333;
              margin: 0 5px;
            }
          }
        }

        .articleBox {
          padding: 0;
          margin-bottom: 30px;
          border: 1px solid #eee;
          background: #fff;
          position: relative;
          z-index: 1;

          .list {
            padding: 10px 15px;

            .box_name {
              display: block;
              white-space: nowrap;
              text-overflow: ellipsis;
              line-height: 1.2;
              font-size: 20px;
              font-weight: bold;
              color: #333;
              margin-top: 10px;
              float: left;
            }

            .box_til2 {
              position: relative;
              margin-top: 10px;
              z-index: 1;
              float: right;

              span {
                display: inline-block;
                width: 18px;
                height: 18px;
                background: url(../../assets/images/weChat_icon.png) no-repeat;
                cursor: pointer;

                &:hover {
                  + div {
                    display: block;
                  }
                }
              }

              div {
                position: absolute;
                right: 0;
                top: 22;
                text-align: center;
                padding: 10px 14px;
                background: #fff;
                border: 1px solid #ccc;
                display: none;

                img {
                  width: 86px;
                  height: 86px;
                }

                p {
                  color: #666;
                }
              }
            }
          }

          .bottom {
            margin-top: 16px;

            .msg_title {
              position: relative;
              color: #333;

              i {
                display: inline-block;
                width: 16px;
                height: 12px;
              }

              .l {
                position: absolute;
                bottom: 0;
                background: url();
                margin-left: 10px;
              }

              .r {
                background: url();
                margin-left: 10px;
              }

              .msg_1 {
                display: inline-block;
                max-width: 206px;
                vertical-align: text-top;
                max-height: 46px;
                overflow: hidden;

                .icon {
                  display: inline-block;
                  width: 11px;
                  height: 13px;
                  background: url();
                  margin-left: 6px;
                  cursor: pointer;
                }
              }
            }
          }
        }

        .boxTil {
          font-size: 16px;
          padding-left: 10px;
          border-left: 3px solid #4285f4;
          line-height: 1;
          font-weight: normal;
          margin-bottom: 15px;
          position: relative;
        }

        .box {
          margin-bottom: 30px;
          border: 1px solid #eee;
          background: #fff;

          .list {
            padding: 10px 15px;

            .seven_list {
              padding-top: 10px;

              li {
                list-style: none;
                display: list-item;
                text-align: -webkit-match-parent;
              }

              a {
                display: block;
                padding-left: 15px;
                line-height: 16px;
                margin-bottom: 15px;
                word-spacing: normal;
                white-space: nowrap;
                text-overflow: ellipsis;
                overflow: hidden;
                background: url();

                &:hover {
                  color: rgb(62, 62, 194);
                }
              }
            }
          }

          .come_round_list {
            margin: 0 14px;
            width: 240px;

            li {
              float: left;
              text-align: center;
              width: 78px;
              padding: 15px 0;
              list-style: none;
              display: list-item;

              .is_vip_bg_3 {
                position: relative;
                height: 100%;

                .a_img {
                  display: block;
                  white-space: nowrap;
                  text-overflow: ellipsis;

                  .is_vip_img {
                    width: 44px;
                    height: 44px;
                    border-radius: 50%;
                    display: block;
                    margin: 0 auto;
                  }
                }

                .con {
                  font-size: 12px;
                  color: #3d464d;
                  margin-top: 12px;
                  white-space: nowrap;
                  text-overflow: ellipsis;
                  overflow: hidden;
                  height: 21px;
                  display: block;
                }
              }
            }
          }
        }

        .artilces {
          padding: 0;
        }
      }
    }
  }
}

.pagination {
  margin: 30px auto;
  text-align: center;
  font-size: 12px;
}
</style>
