<template>
  <div class="article_details">
    <div class="content_box">
      <div class="content">
        <div class="article_page">
          <!--文章内容-->
          <div class="article_content">
            <div class="status">
              <a class="status_name" href="javascript:;" v-if="articleMessage.articleType==1">转载</a>
              <a class="status_name original" href="javascript:;" v-if="articleMessage.articleType==2">原创</a>
            </div>
            <h1 class="title">{{articleMessage.articleName}}</h1>
            <div class="author">
              <div class="author_photo fl">
                <a class="a_img" href="javascript:;" target="_blank">
                  <img :src="articleMessage.studentVO.head" />
                </a>
              </div>
              <a class="name fl" href="javascript:;" target="_blank">{{articleMessage.studentVO.studentName}}</a>

              <a class="check_follow fl" href="javascript:;" v-if="articleMessage.isFollow===1"
                @click="handleAttention(articleMessage.studentVO.id)">关注</a>
              <a class="followed fl" href="javascript:;" v-else>已关注</a>

              <a class="comment_num fr" href="javascript:;">
                <font class="num">{{articleMessage.commentVolume}}</font>人评论
              </a>
              <span class="span_fr fr"></span>
              <a class="read fr" href="javascript:;">{{articleMessage.readVolume}}阅读</a>
              <a class="time fr" href="javascript:;">{{articleMessage.createTime | dateFrm}}</a>
              <div class="clear"></div>
            </div>
            <div class="main_content" v-html="articleMessage.articleContent">{{articleMessage.articleContent}}</div>
            <div class="copyright">©著作权归作者所有：如需转载，请注明出处，否则将追究法律责任</div>
            <div class="zan_list">
              <p class="is_praise fl">
                <i class="iconfont icondianzan" v-if="articleMessage.isLike == 1" style="color:orange"></i>
                <i class="iconfont icondianzan" v-else @click="isLikeArticle(articleMessage.id)"></i>
                {{articleMessage.likeVolume}}
              </p>
              <p class="share fr">
                <i class="iconfont iconfenxiang"></i> 分享
              </p>
              <p class="favorite fr">
                <i class="iconfont iconwujiaoxingkong"></i> 收藏
              </p>
              <div class="clear"></div>
            </div>
            <div class="author_module">
              <div class="author_module_photo fl">
                <a class="a_img" href="javascript:;">
                  <img :src="articleMessage.studentVO.head" alt />
                </a>
              </div>
              <div class="author_module_center fl" v-if="articleMessage.studentVO">
                <a class="h2" href="javascript:;" target="_blank">{{articleMessage.studentVO.studentName}}</a>
                <h3>
                  {{articleMessage.articleVolume}}篇文章，{{articleMessage.studentReadVolume}}人气，{{articleMessage.followVolume}}粉丝
                </h3>
                <h4>{{articleMessage.introduce }}</h4>
              </div>
              <div class="author_module_right fr">
                <a class="check_follow follow" href="javascript:;" v-if="articleMessage.isFollow===1"
                  @click="handleAttention(articleMessage.studentVO.id)">关注</a>
                <a class="followed unfollowed" href="javascript:;" v-else>已关注</a>
              </div>
              <div class="clear"></div>
            </div>
          </div>
          <div class="article_comment">
            <div class="comment_create">
              <div class="photo fl">
                <a class="header_img" href="javascript:;" target="_blank">
                  <img src="@/assets/images/default_photo.gif" />
                </a>
              </div>
              <div class="first_publish fr">
                <el-form ref="commentForm" :rules="rules" :model="user">
                  <el-form-item prop="content">
                    <el-input v-model="user.content" class="textarea_content" type="textarea" :rows="6" resize="none"
                      placeholder="提问和评论都可以，用心的回复会被更多人看到和认可"></el-input>
                  </el-form-item>
                  <div class="comment_push">
                    <el-button class="publish fr" size="mini" type="primary" @click="publishComment">发布</el-button>
                    <p class="cancel_btn fr" @click="handleCancel">取消</p>
                  </div>
                </el-form>
              </div>
              <div class="clear"></div>
            </div>

            <!--是否有评论，有就显示-->
            <div v-if="articleMessage.commentVolume > 0">
              <div class="comment_number">
                <p class="number fl">
                  <span class="num">{{articleMessage.commentVolume}}</span>条评论
                </p>
                <a class="time time_last fr" href="javascript:;">按时间倒序</a>
                <a class="time time_first fr" href="javascript:;">按时间正序</a>
                <div class="clear"></div>
              </div>
              <!--评论列表-->
              <div v-if="commentMessage&&commentMessage.length" class="comment_list">
                <div v-for="(item,index) in commentMessage" :key="index" class="commentList_box">
                  <div class="comment_1 publish_user_id">
                    <div class="top">
                      <div class="header fl">
                        <a class="header_img" href="javascript:;" target="_blank">
                          <img :src="item.head" alt />
                        </a>
                      </div>
                      <div class="head_right">
                        <p class="name">
                          <a href="javascript:;">{{item.studentName}}</a>
                        </p>
                        <div class="time">
                          <span class="fl">{{item.createTime | dateFrm}}</span>

                          <span v-if="item.isDelete===0" class="reply_btn fr" @click="showReplyBox(index)">
                            <i class="iconfont iconhuifu"></i>
                            {{item.commentReplyNum}}
                          </span>
                          <span v-else class="reply_btn fr" @click="deleteComment(item.id)">
                            <i class="iconfont iconshanchu"></i>
                          </span>

                          <span class="zan fr">
                            <i class="iconfont icondianzan" v-if="item.isLike===1" style="color:orange"></i>
                            <i v-else class="iconfont icondianzan" @click="isLikeComment(item.id)"></i>
                            {{item.numberOfLikes}}
                          </span>
                          <div class="clear"></div>
                        </div>
                      </div>
                    </div>
                    <div class="comment_con">{{item.content}}</div>
                    <!--评论回复框-->
                    <el-form v-show="isShow===index">
                      <el-form-item prop="replyComment">
                        <el-input v-model="replyComment" class="textarea_content" type="textarea" :rows="3"
                          resize="none" placeholder="提问和评论都可以，用心的回复会被更多人看到和认可"></el-input>
                      </el-form-item>
                      <el-form-item>
                        <div class="comment_push">
                          <el-button class="publish fr" size="mini" type="primary"
                            @click="handleReplyComment(item.id, item.studentId)">发布</el-button>
                          <p class="cancel_btn fr" @click="handleCancelReply">取消</p>
                        </div>
                      </el-form-item>
                    </el-form>
                  </div>
                  <!--回复列表-->
                  <div v-if="item.commentReplyNum>0">
                    <a size="small" class="showReply" @click="showReplyList(item.id, index)">回复信息</a>
                    <div v-if="replyMessage&&replyMessage.length&&replyIndex===index" class="comment_2">
                      <ul v-for="(reply,i) in replyMessage" :key="i" class="comment_2_list">
                        <li class="reply_box">
                          <div class="top">
                            <!-- <a class="author fl" href="javascript:;">作者</a> -->
                            <a class="name fl" href="javascript:;">{{reply.studentName}}</a>
                            <a class="name fl" href="javascript:;">:@{{reply.fromStudentName}}</a>
                            <div class="clear"></div>
                          </div>
                          <div class="con">{{reply.content}}</div>
                          <div class="bot">
                            <p class="time">{{reply.createTime | dateFrm}}</p>
                            <p v-if="reply.isDelete===0" class="reply_btn" @click="showReplyAnswer(i)">
                              <i class="iconfont iconhuifu"></i> 回复
                            </p>
                            <p v-else class="reply_btn" @click="deleteReplyAnswer(reply.id, item.id, index)">
                              <i class="iconfont iconshanchu"></i> 删除
                            </p>
                            <div class="clear"></div>
                          </div>
                          <!--回复框-->
                          <el-form v-show="isShowReplyAnswer===i">
                            <el-form-item prop="replyAnswer">
                              <el-input v-model="replyAnswer" class="textarea_content" type="textarea" :rows="3"
                                resize="none" placeholder="提问和评论都可以，用心的回复会被更多人看到和认可"></el-input>
                            </el-form-item>
                            <div class="comment_push">
                              <el-button class="publish fr" size="mini" type="primary"
                                @click="handleReplyAnswer(item.id, item.studentId, reply.id)">发布</el-button>
                              <p class="cancel_btn fr" @click="handleCancelReplyAnswer">取消</p>
                            </div>
                          </el-form>
                        </li>
                      </ul>
                    </div>
                  </div>
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
  import moment from 'moment'

  export default {
    name: "Article_details",
    components: {},
    data() {
      return {
        articleId: '',
        articleMessage: {},
        commentMessage: [],
        replyMessage: [],
        user: {
          content: "",
        },
        replyComment: "",
        replyAnswer: "",
        isShow: -1,
        isShowReplyAnswer: -1,
        replyIndex: -1,
        pageNum: 1,
        pageSize: 5,
        total: 0,
        index: 0,
        i: 0,
        rules: {
          content: [{
            required: true,
            message: "评论内容不能为空"
          }],
        },
      };
    },
    filters: {
      dateFrm: function (el) {
        return moment(el).format("YYYY-MM-DD HH:mm:ss")
      }
    },
    created: function () {
      this.articleId = this.$route.query.articleId;
      this.init();
    },
    methods: {
      init() {
        //获取指定文章详情
        this.getArticle(this.articleId);
        this.getCommentList(this.pageSize, this.pageNum, this.articleId);
      },
      getArticle(articleId) {
        this.$http.postGetArticle(articleId).then((res) => {
          // console.log("getArticle", res);
          this.articleMessage = res.data[0];
        });
      },
      getCommentList(pageSize, pageNum, articleId) {
        //获取文章评论列表
        const type = 2;
        this.$http
          .postGetCommentList(this.pageSize, this.pageNum, type, articleId)
          .then((res) => {
            console.log("commentMessage", res);
            this.commentMessage = res.data;
          });
      }, //点击显示评论回复列表
      showReplyList(commentId, index) {
        if (this.replyIndex === index) {
          this.replyIndex = -1;
        } else {
          this.replyMessage = [];
          this.replyIndex = index;
          this.getCommentReplyList(this.pageSize, this.pageNum, commentId);
        }
      },
      getCommentReplyList(pageSize, pageNum, commentId) {
        //获取评论回复列表
        this.$http
          .postGetCommentReplyList(this.pageSize, this.pageNum, commentId)
          .then((res) => {
            // console.log("replyList", res);
            this.replyMessage = res.data;
          });
      },
      showReplyBox(index) {
        this.isShow = index;
        this.isShowReplyAnswer = -1;
      },
      publishComment() {
        //发布评论
        this.$refs.commentForm.validate((valid) => {
          if (valid) {
            let data = {
              content: this.user.content,
              type: 2,
              typeId: this.articleId,
            };
            console.log(data);
            this.$http.postSaveComment(data).then((res) => {
              console.log("saveComment", res);
              if (res.code === 1) {
                this.$message({
                  message: res.msg,
                  type: "success"
                });
                this.user.content = "";
                this.$refs.commentForm.resetFields();
                this.getArticle(this.articleId);
                this.getCommentList(this.pageSize, this.pageNum, this.articleId);
              } else {
                this.$message({
                  message: res.msg,
                  type: "warning"
                });
              }
            });
          } else {
            return false;
          }
        });
      },
      handleCancel() {
        this.user.content = "";
        this.$refs.commentForm.resetFields();
      },
      handleReplyComment(commentId, studentId) {
        //评论回复
        if (!this.replyComment) {
          this.$message({
            message: "评论内容不能为空",
            type: "warning"
          });
        } else {
          let data = {
            commentId: commentId,
            content: this.replyComment,
            replyType: 1,
            studentId: studentId,
          };
          console.log(data);
          this.$http.postSaveCommentReply(data).then((res) => {
            console.log("reply", res);
            if (res.code === 1) {
              this.$message({
                message: res.msg,
                type: "success"
              });
              this.handleCancelReply();
              this.getCommentReplyList(this.pageSize, this.pageNum, commentId);
              this.getCommentList(this.pageSize, this.pageNum, this.articleId);
            } else {
              this.$message({
                message: res.msg,
                type: "warning"
              });
            }
          });
        }
      },
      deleteComment(commentId) {
        //删除评论
        this.$confirm("确定删除该条评论吗？", "提示", {
          confirmButtonText: "确定",
          cancelButtonText: "取消",
          type: "warning",
        }).then(() => {
          this.$http.postDeleteComment(commentId).then((res) => {
            console.log("delComment", res);
            if (res.code === 1) {
              this.$message({
                message: res.msg,
                type: "success"
              });
              this.getCommentList(this.pageSize, this.pageNum, this.articleId);
            } else {
              this.$message({
                message: res.msg,
                type: "warning"
              });
            }
          });
        });
      },
      handleCancelReply() {
        this.isShow = -1;
        this.replyComment = "";
      },
      showReplyAnswer(i) {
        this.isShowReplyAnswer = i;
        this.isShow = -1;
      },
      handleCancelReplyAnswer() {
        this.isShowReplyAnswer = -1;
        this.replyAnswer = "";
      },
      handleReplyAnswer(commentId, studentId, replyId) {
        //回复回复
        if (!this.replyAnswer) {
          this.$message({
            message: "评论内容不能为空",
            type: "warning"
          });
        } else {
          let data = {
            commentId: commentId,
            content: this.replyAnswer,
            replyId: replyId,
            replyType: 2,
            studentId: studentId,
          };
          console.log(data);
          this.$http.postSaveCommentReply(data).then((res) => {
            console.log("answer", res);
            if (res.code === 1) {
              this.$message({
                message: res.msg,
                type: "success"
              });
              this.handleCancelReplyAnswer();
              this.getCommentReplyList(this.pageSize, this.pageNum, commentId);
              this.getCommentList(this.pageSize, this.pageNum, this.articleId);
            } else {
              this.$message({
                message: res.msg,
                type: "warning"
              });
            }
          });
        }
      },
      deleteReplyAnswer(replyId, commentId) {
        //删除回复
        this.$confirm("确定删除该条回复吗？", "提示", {
          confirmButtonText: "确定",
          cancelButtonText: "取消",
          type: "warning",
        }).then(() => {
          this.$http.postDeleteCommentReply(replyId).then((res) => {
            console.log("del", res);
            if (res.code === 1) {
              this.$message({
                message: res.msg,
                type: "success"
              });
              this.getCommentReplyList(this.pageSize, this.pageNum, commentId);
              this.getCommentList(this.pageSize, this.pageNum, this.articleId);
            } else {
              this.$message({
                message: res.msg,
                type: "warning"
              });
            }
          });
        });
      },
      handleAttention(id) {
        //关注
        let data = {
          isFollow: 0,
          type: 1,
          typeId: id,
        };
        this.$http.postCancelUserFollowRecord(data).then((res) => {
          if (res.code === 1) {
            this.$message({
              message: res.msg,
              type: "success"
            });
          } else {
            this.$message({
              message: res.msg,
              type: "warning"
            });
          }
        });
      },
      isLikeArticle(articleId) {
        let data = {
          isLike: 0,
          type: 2,
          typeId: articleId,
        };
        this.$http.postlikeRecord(data).then((res) => {
          console.log(res);
          if (res.code === 1) {
            this.getArticle(1);
          }
        });
      },
      isLikeComment(commentId) {
        let data = {
          isLike: 0,
          type: 0,
          typeId: commentId,
        };
        this.$http.postlikeRecord(data).then((res) => {
          console.log(res);
          if (res.code === 1) {
            this.getCommentList(this.pageSize, this.pageNum, this.articleId);
          }
        });

      }
    },
  };

</script>
<style lang='scss' scope>
  @import "@/assets/css/articleDetail.scss";

</style>
