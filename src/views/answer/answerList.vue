<template>
  <div class="page" v-title :data-title="categoryTagTitle">
    <div class="blog_left">
      <el-tabs v-model="activeName" @tab-click="handleClick">
        <el-tab-pane label="最新问答" name="original">
          <!-- 文章列表 -->
          <div v-if="question_list&&question_list.length">
            <div v-for="(item,index) in question_list" :key="index" class="article_container" v-loading="Loading"
              element-loading-text="拼命加载中">
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
                    <a target="_blank" @click="toDetail(item.id)">{{item.questionName}}</a>
                  </h2>
                  <p class="article_detail" v-if="item.answerVO" v-html="item.answerVO.content">{{item.answerVO.content}}</p>
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
                      <span>阅读&nbsp;{{item.readVolume}}</span>
                    </p>
                    <p>
                      <span>评论&nbsp;{{item.commentVolume}}</span>
                    </p>
                    <p>
                      <span>收藏{{item.collectionVolume}}</span>
                    </p>
                  </div>
                </li>
              </ul>
            </div>
          </div>
          <div class="article_container" v-else style="font-size: 24px;line-height: 200px;text-align: center;">
            暂无数据~
          </div>
          <div class="pagination" v-if="question_list.length>0">
            <el-pagination @size-change="handleSizeChange" @current-change="handleCurrentChange"
              :current-page="currentPageN" :page-size="pageSizeN" layout="prev, pager, next,total"
              :total="question_total">
            </el-pagination>
          </div>
        </el-tab-pane>
        <el-tab-pane label="推荐问答" name="recommend">
          <div v-if="question_list&&question_list.length">
            <div v-for="(item,index) in question_list" :key="index" class="article_container" v-loading="Loading"
              element-loading-text="拼命加载中">
              <ul>
                <li>
                  <div class="userInfo clearfix">
                    <p style="float: left;cursor: pointer;">
                      <a href target="_blank">
                        <img class="avatar" :src="item.head" alt />
                      </a>
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
                  <p class="article_detail" v-if="item.answerVO" v-html="item.answerVO.content">{{item.answerVO.content}}</p>
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
                  </div>
                </li>
              </ul>
            </div>
          </div>
          <div class="article_container" v-else style="font-size: 24px;line-height: 200px;text-align: center;">
            暂无数据~
          </div>
          <div class="pagination" v-if="question_list.length>0">
            <el-pagination @size-change="handleSizeChange" @current-change="handleCurrentChange"
              :current-page="currentPageR" :page-size="pageSizeR" layout="prev, pager, next,total"
              :total="question_total">
            </el-pagination>
          </div>
        </el-tab-pane>
        <el-tab-pane label="关注" name="follow">
          <div v-if="question_list&&question_list.length">
            <div v-for="(item,index) in question_list" :key="index" class="article_container" v-loading="Loading"
              element-loading-text="拼命加载中">
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
                  <p class="article_detail" v-if="item.answerVO" v-html="item.answerVO.content">{{item.answerVO.content}}</p>
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
                  </div>
                </li>
              </ul>
            </div>
          </div>
          <div class="article_container" v-else style="font-size: 24px;line-height: 200px;text-align: center;">
            暂无数据~
          </div>
          <div class="pagination" v-if="question_list&&question_list.length>0">
            <el-pagination @size-change="handleSizeChange" @current-change="handleCurrentChange"
              :current-page="currentPageF" :page-size="pageSizeF" layout="prev, pager, next,total"
              :total="question_total">
            </el-pagination>
          </div>
          <div class="follow_recommend" v-if="recommendList&&recommendList.length>0">
            <h2>
              <p>为你推荐</p>
              <p>
                <router-link :to="{ path: '/expert' }" style="font-size: 12px;color: #999;"> 更多作者></router-link>
              </p>
            </h2>
            <ul>
              <li v-for="item in recommendList" :key="item.id">
                <div class="avar">
                  <img class="avatar" :src="item.head" alt />
                </div>
                <div class="info">
                  <p>
                    <a href="javascript:;">{{item.studentName}}</a>
                  </p>
                  <p>
                    <span>关注{{item.followNum}}</span>
                    <span>粉丝{{item.followVolume }}</span>
                    <span>文章{{item.articleVolume}}</span>
                  </p>
                </div>
                <div v-if="item.isFollow==0">
                  <div class="is_follow" @click="changeMes(item.id)" v-show="i != item.id">
                    + 关注
                  </div>
                  <div class="is_follow" @click="saveFollow(item.id)">
                    + 关注
                  </div>
                </div>
                <div v-else>
                  <div :class="[hover ? Ingin : '',Ingout ]">
                    <div v-show="i ==item.id">
                      <div style="border: 1px solid #eee;"> √ 已关注</div>
                      <div class="cancal-matching" v-show="hover" @click="cancelHover(item.id)">
                        <div class="cancal-matching-body">
                          <div>× 取消关注</div>
                        </div>
                      </div>
                    </div>
                  </div>
                  <div class="followed" @click="cancleFollow(item.id)">
                    √ 已关注
                  </div>
                </div>
              </li>
              <div class="clear"></div>
            </ul>
          </div>
        </el-tab-pane>
      </el-tabs>
    </div>
    <div class="right_box">
      <!-- 指南 -->
      <div class="guid">
        <ul>
          <li>
            <i class="iconfont iconwenzhang"></i>
            <p>
              <router-link to="/write/question">提问题</router-link>
            </p>

          </li>
          <li>
            <i class="iconfont iconshuxie"></i>
            <p>
              <router-link to="/write/article">写文章</router-link>
            </p>
          </li>
          <!-- <li>
            <i class="iconfont iconshuxie"></i>
            <p>
              <router-link to="/write/think">写想法</router-link>
            </p>
          </li> -->
        </ul>
      </div>
      <div class="category_box">
        <ul>
          <li @click="closeAll()" :class="{active: activeId == 0}">
             <i class="iconfont iconfenlei" style="margin-right: 13px;"></i>
            全部</li>
          <li v-for="nav in categoryNav" :key="nav.id" @click="showNav(nav.id)" :class="{active: activeId == nav.id}">
               <i class="iconfont iconfenlei" style=" margin-right: 20px;"></i>{{nav.name}}
            <ul class="nav_child" v-show="currentTab==nav.id">
              <li v-for="item in nav.children" :key="item.id" @click="showNa(item.id)"
                :class="{active: activeId == item.id}">{{item.name}}</li>
            </ul>
          </li>
        </ul>
      </div>
    </div>
    <div class="clear"></div>
  </div>
</template>

<script>
  import TimeAgo from 'vue2-timeago';
  import {
    getCookie
  } from '@/util/Cookie'
  export default {
    name: 'answerList',
    components: {
      TimeAgo
    },
    created() {
      if (this.$route.path === "/follow/all") {
        this.question_status = 3
      }
      if (JSON.stringify(this.$route.query) === '{}') {
        this.categoryId = 1

      } else {
        this.categoryId = this.$route.query.categoryId
      }
      this.getQuestionList()
      this.getCategory()
      this.getRecommendAuthor()
    },
    data() {
      return {
        question_list: [],
        categorys: [],
        tags: [],
        currentActiveName: 'original',
        currentPage: 1,
        pageSize: 5,
        currentPageN: 1,
        pageSizeN: 5,
        currentPageR: 1,
        pageSizeR: 5,
        currentPageF: 1,
        pageSizeF: 5,
        question_total: 0,
        question_status: 1,
        Loading: false,
        tag_id: "tab-original",
        categoryId: 0,
        Ingin: 'cancle-match',
        Ingout: 'followed',
        hover: false,
        currentTab: '',
        categoryNav: [],
        recommendList: [],
        current: 0,
        i: null,
        activeId: -1,
        isFollow: '',
        typeId: '',
        params: {}
      }
    },
    computed: {
      activeName: {
        get() {
          return (this.currentActiveName = this.$route.params.classfiy)
        },
        set(newValue) {
          this.currentActiveName = newValue
        }
      },
      categoryTagTitle() {
        if (this.currentActiveName == 'original') {
          return '最新问答'
        }
        return '推荐问答'
      }
    },
    methods: {
      saveFollow(id) {
        this.isFollow = 0
        this.typeId = id
        this.saveFollowRecord()
        this.getRecommendAuthor()

      },
      cancleFollow(id) {
        this.$confirm('是否取消关注?', '提示', {
          confirmButtonText: '确定',
          cancelButtonText: '取消',
          type: 'warning'
        }).then(() => {
          this.isFollow = 1
          this.typeId = id
          this.saveFollowRecord()
          this.getRecommendAuthor()
        })
      },
      tagFlag() {
        if (this.tag_id === "tab-recommend") {
          this.question_status = 2 // 推荐
        } else if (this.tag_id === "tab-follow") {
          this.question_status = 3 //关注
        } else if (this.tag_id === "tab-original") {
          this.question_status = 1 // 原创
        }
      },
      handleClick: function (tab, event) {
        this.tag_id = event.target.getAttribute('id')
        if (this.$route.path === "/original/all") {
          if (this.tag_id === "tab-follow") {
            if (getCookie('accessToken') != undefined) {
              this.tagFlag()
              this.getArticleList()
            } else {
              this.$router.push('/login')
            }
          }
        } else {
          this.tagFlag()
          this.getQuestionList()
        }

      },

      getQuestionList() {
        if (this.tag_id === "tab-recommend") {
          this.pageSize = this.pageSizeR
          this.currentPage = this.currentPageR
        } else if (this.tag_id === "tab-follow") {
          this.pageSize = this.pageSizeF
          this.currentPage = this.currentPageF
        } else if (this.tag_id === "tab-original") {
          this.pageSize = this.pageSizeN
          this.currentPage = this.currentPageN
        }
        this.$http.postQuestionList(this.pageSize, this.currentPage, {
          "categoryId": this.categoryId,
          "status": this.question_status
        }).then(res => {
          this.question_list = res.data;
          this.question_total = res.pagination.total
        });
      },
      isLike(isLikeId) {
        this.params = {
          "isLike": 0,
          "type": 1,
          "typeId": isLikeId
        }
        this.liskeRecord()
      },
      liskeRecord() {
        this.$http.postlikeRecord(this.params).then(res => {
          this.getQuestionList()
        });
      },
      cancleLike(isLikeId) {
        this.params = {
          "isLike": 1,
          "type": 1,
          "typeId": isLikeId
        }
        this.liskeRecord()
      },
      handleSizeChange(size) {
        if (this.tag_id === "tab-recommend") {
          this.pageSizeR = size = 2 // 推荐
        } else if (this.tag_id === "tab-follow") {
          this.pageSizeF = size = 3 //关注
        } else if (this.tag_id === "tab-original") {
          this.pageSizeN = size // 原创
        }
        this.getQuestionList()
      },
      handleCurrentChange(currentPage) {
        if (this.tag_id === "tab-recommend") {
          this.currentPageR = currentPage // 推荐
        } else if (this.tag_id === "tab-follow") {
          this.currentPageF = currentPage //关注
        } else if (this.tag_id === "tab-original") {
          this.currentPageN = currentPage // 原创
        }
        this.getArticleList()
      },
      getRecommendAuthor() {
        this.$http.postRecommendAuthorList(4, 1).then(res => {
          this.recommendList = res.data
        });
      },
      saveFollowRecord() {
        let params = {
          "isFollow": this.isFollow,
          "type": 1,
          "typeId": this.typeId
        }
        this.$http.postSaveFollowRecord(params).then(res => {});
      },
      showNav(tab) {
        this.currentTab = tab
        this.current = tab
      },
      showNa(id) {
        this.categoryId = id
        this.activeId = id
        this.getQuestionList()

      },
      closeAll() {
        this.categoryId = 0;
        this.activeId = 0
        this.getQuestionList()
      },
      getCategory() {
        this.$http.postCategory({
          categoryType: 2
        }).then(res => {
          this.categoryNav = res.data

        })
      },
      toPersonal(userId) {
        window.open(`/personal?userId=${userId}`, '_blank')
      },
      toDetail(questionId){
        window.open(`/answerDetail?questionId=${questionId}`, '_blank')
      }
    }
  }

</script>

<style lang="scss">
  @import "@/assets/css/articleList.scss";

</style>
