<template>
  <div class="answerDetail">
    <div class="detailHeader">
      <div class="detailHeader_content">
        <div class="detailHeader_main">
          <div class="detailHeader_tags">
            <el-tag v-for="item in items" :key="item.id" effect="dark">{{ item.content }}</el-tag>
          </div>
          <h1 class="detailHeader_title">{{ questionMessage.questionName }}</h1>
          <div class="detailHeader_intro">{{ questionMessage.questionIntroduce }}</div>
        </div>
        <div class="detailHeader_side">
          <div class="follow_status">
            <div class="status_number">
              <div class="number_name">关注者</div>
              <strong class="number_value">{{ questionMessage.numberOfFollow }}</strong>
            </div>
            <div class="status_number">
              <div class="number_name">被浏览</div>
              <strong class="number_value">{{ questionMessage.readVolume }}</strong>
            </div>
          </div>
        </div>
      </div>
      <div class="detailHeader_footer">
        <ul>
          <li>
            <!-- 是否关注字段 -->
            <button
              v-if="questionMessage.isFollow===0"
              class="button_blue"
              type="button"
              @click="followQuestion"
            >关注问题</button>
            <button
              v-else
              type="button"
              class="button_grey"
              @mouseenter="enterText"
              @mouseleave="leaveText"
              @click="cancleFollow"
            >{{text}}</button>
          </li>
          <li>
            <button class="button_blue" type="button" @click="writeAnswer">写回答</button>
          </li>
          <li>
            <button class="button_blue" type="button">邀请回答</button>
          </li>
          <li style="cursor: pointer;">
            <i class="iconfont icondianzan1"></i>
            <span>好问题</span>
          </li>
        </ul>
      </div>
    </div>
    <div class="detail_main" style="min-height:0;" v-show="editMavon">
      <mavon-editor v-model="writeAnswerContent" ref="md" />
      <div style="text-align:right;margin:10px 0">
        <el-button class="btnSaveAnswer" type="primary" @click="saveAnswer">提交回答</el-button>
      </div>
    </div>

    <div class="detail_main">
      <div class="topbar">
        <div class="total_value">{{questionMessage.answerNum}}个回答</div>
        <div class="default_sort">
          默认排序
          <i class="iconfont iconpaixu2"></i>
        </div>
      </div>
      <!-- 回答列表 -->
      <div v-if="questionMessage.answerNum>0&&answerList&&answerList.length">
        <div v-for="(answer,index1) in answerList" :key="index1" class="detail_list">
          <div class="list_header">
            <div class="avatar">
              <el-avatar shape="square" :size="50" :src="answer.head"></el-avatar>
            </div>
            <div class="author_info">
              <p class="author_name">{{answer.studentName}}</p>
              <p class="author_intro"></p>
            </div>
          </div>
          <div v-if="answer.numberOfLikes>0" class="voters">{{answer.numberOfLikes}}人赞同了该回答</div>
          <div class="list_content" v-html="answer.content">{{answer.content}}</div>
          <div class="contentItem_time">发布于{{answer.createTime | dateFrm}}</div>
          <div class="list_footer">
            <ul>
              <li
                v-if="answer.isLike == 1"
                style="background:#0084ff"
                class="agree"
                @click="disagreeAnswer(answer.id, answer.isLike)"
              >
                <button style="color:#fff">
                  <i class="iconfont iconshengxu" style="color:#fff"></i>
                  已赞同{{answer.numberOfLikes}}
                </button>
              </li>
              <li v-else class="agree" @click="agreeAnswer(answer.id)">
                <button>
                  <i class="iconfont iconshengxu"></i>
                  赞同{{answer.numberOfLikes}}
                </button>
              </li>
              <li class="cancle_agree" @click="disagreeAnswer(answer.id, answer.isLike)">
                <i class="iconfont iconjiangxu"></i>
              </li>

              <li
                v-if="isShow!=index1"
                class="add_comment"
                @click="showCommentList(index1, answer.id)"
              >
                <i class="iconfont iconpinglun"></i>
                <span v-if="answer.numberOfComments>0">{{answer.numberOfComments}}评论</span>
                <span v-else>添加评论</span>
              </li>
              <li v-else class="add_comment" @click="hideCommentList">
                <i class="iconfont iconpinglun"></i>
                <span>收起评论</span>
              </li>
              <!-- 差一个是否可删除答案字段 -->
              <li v-if="answer.isDelete==1" class="del_answer" @click="deleteAnsewer(answer.id)">
                <i class="iconfont iconshanchu"></i>
                <span>删除</span>
              </li>
            </ul>

            <!--评论列表-->
            <div v-if="answer.numberOfComments>0&&isShow===index1" class="comment_list">
              <div v-for="(item,index) in commentList" :key="index" class="commentList_box">
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

                        <span
                          v-if="item.isDelete===0"
                          class="reply_btn fr"
                          @click="showReplyBox(index)"
                        >
                          <i class="iconfont iconhuifu"></i>
                          {{item.commentReplyNum}}
                        </span>
                        <span v-else class="reply_btn fr" @click="deleteComment(item.id)">
                          <i class="iconfont iconshanchu"></i>
                        </span>

                        <span class="zan fr">
                          <i
                            class="iconfont icondianzan"
                            v-if="item.isLike===1"
                            style="color:orange"
                          ></i>
                          <i v-else class="iconfont icondianzan" @click="isLikeComment(item.id)"></i>
                          {{item.numberOfLikes}}
                        </span>

                        <div class="clear"></div>
                      </div>
                    </div>
                  </div>
                  <div class="comment_con">{{item.content}}</div>
                  <!-- 评论回复框 -->
                  <div class="commentBox">
                    <el-form v-if="showCommentBox===index">
                      <el-form-item prop="answerContent">
                        <el-input
                          v-model="answerContent"
                          class="textarea_content"
                          type="textarea"
                          :rows="3"
                          resize="none"
                          placeholder="提问和评论都可以，用心的回复会被更多人看到和认可"
                        ></el-input>
                      </el-form-item>
                      <el-form-item>
                        <div class="comment_push">
                          <el-button
                            class="publish fr"
                            size="mini"
                            type="primary"
                            @click="handleReplyComment(item.id, item.studentId)"
                          >
                            <span style="color:#fff">发布</span>
                          </el-button>
                          <p class="cancel_btn fr" @click="handleCancelReply">取消</p>
                        </div>
                      </el-form-item>
                    </el-form>
                  </div>
                </div>
                <!--回复列表-->
                <div v-if="item.commentReplyNum>0">
                  <a size="small" class="showReply" @click="showReplyList(item.id, index)">回复信息</a>
                  <div v-if="replyList&&replyList.length&&replyIndex===index" class="comment_2">
                    <ol v-for="(reply,i) in replyList" :key="i" class="comment_2_list">
                      <li class="reply_box">
                        <div class="top">
                          <a class="name fl" href="javascript:;">{{reply.studentName}}</a>
                          <a class="name fl" href="javascript:;">回复{{reply.fromStudentName}}</a>
                          <div class="clear"></div>
                        </div>
                        <div class="con">{{reply.content}}</div>
                        <div class="bot">
                          <p class="time">{{reply.createTime | dateFrm}}</p>
                          <p
                            v-if="reply.isDelete===0"
                            class="reply_btn"
                            @click="showReplyAnswer(i)"
                          >
                            <i class="iconfont iconhuifu"></i> 回复
                          </p>
                          <p v-else class="reply_btn" @click="deleteReplyAnswer(reply.id, item.id)">
                            <i class="iconfont iconshanchu"></i> 删除
                          </p>
                          <div class="clear"></div>
                        </div>
                        <!--回复框-->
                        <el-form v-show="isShowReplyAnswer===i">
                          <el-form-item prop="replyContent">
                            <el-input
                              v-model="replyContent"
                              class="textarea_content"
                              type="textarea"
                              :rows="3"
                              resize="none"
                              placeholder="提问和评论都可以，用心的回复会被更多人看到和认可"
                            ></el-input>
                          </el-form-item>
                          <el-form-item>
                            <div class="comment_push">
                              <el-button
                                class="publish fr"
                                size="mini"
                                type="primary"
                                @click="handleReplyAnswer(item.id, item.studentId, reply.id)"
                              >
                                <span style="color:#fff">发布</span>
                              </el-button>
                              <p class="cancel_btn fr" @click="handleCancelReplyAnswer">取消</p>
                            </div>
                          </el-form-item>
                        </el-form>
                      </li>
                    </ol>
                  </div>
                </div>
              </div>
            </div>
            <!--评论回复框-->
            <el-form v-if="isShow===index1">
              <el-form-item prop="commentContent">
                <el-input
                  v-model="commentContent"
                  class="textarea_content"
                  type="textarea"
                  :rows="3"
                  resize="none"
                  placeholder="提问和评论都可以，用心的回复会被更多人看到和认可"
                ></el-input>
              </el-form-item>
              <div class="comment_push">
                <el-button class="publish fr" size="mini" type="primary" @click="publishComment">
                  <span style="color:#fff">发布</span>
                </el-button>
              </div>
              <div class="clear"></div>
            </el-form>
          </div>
        </div>
      </div>
      <div v-else style="font-size: 20px;line-height: 200px;text-align: center;">暂无回答~</div>
    </div>
  </div>
</template>

<script>
import moment from "moment";

export default {
  components: {},
  data() {
    return {
      items: [],
      questionId: "",
      questionMessage: {},
      answerList: [],
      commentList: [],
      replyList: [],
      commentContent: "", //评论内容
      answerContent: "", //评论回复内容
      replyContent: "", //回复回复内容
      pageNum: 1,
      pageSize: 5,
      total: 0,
      replyIndex: -1,
      isShowReplyAnswer: -1,
      isShow: -1,
      showCommentBox: -1,
      answerId: "",
      text: "已关注",
      params: {},
      writeAnswerContent: "",
      editMavon: false,
    };
  },
  filters: {
    dateFrm: function (el) {
      return moment(el).format("YYYY-MM-DD HH:mm:ss");
    },
  },
  created() {
    this.questionId = this.$route.query.questionId;
    this.init();
  },
  methods: {
    init() {
      this.getQuestion(this.questionId);
      this.getAnswerList(this.questionId, this.pageSize, this.pageNum);
    },
    getQuestion(questionId) {
      //获取指定问题详情
      this.$http.postGetQuestion(this.questionId).then((res) => {
        console.log("question", res);
        this.questionMessage = res.data[0];
        this.items = res.data[0].labelVOS;
      });
    },
    getAnswerList(questionId, pageSize, pageNum) {
      //获取回答列表
      this.$http.getAnswerList(questionId, pageSize, pageNum).then((res) => {
        console.log("answerList", res);
        this.answerList = res.data;
      });
    },
    getCommentList(pageSize, pageNum, answerId) {
      //根据Id获取评论列表
      const type = 1;
      this.$http
        .postGetCommentList(pageSize, pageNum, type, answerId)
        .then((res) => {
          console.log("commentList", res);
          this.commentList = res.data;
        });
    },
    getCommentReplyList(pageSize, pageNum, commentId) {
      this.$http
        .postGetCommentReplyList(this.pageSize, this.pageNum, commentId)
        .then((res) => {
          console.log("replyList", res);
          this.replyList = res.data;
        });
    },
    agreeAnswer(id) {
      let data = {
        isLike: 0,
        type: 1,
        typeId: id,
      };
      this.saveUserLikeRecord(data);
    },
    saveUserLikeRecord(data) {
      this.$http.postlikeRecord(data).then((res) => {
        console.log(data);
        console.log(res);
        if (res.code === 1) {
          this.getAnswerList(this.questionId, this.pageSize, this.pageNum);
        }
      });
    },
    disagreeAnswer(id, isLike) {
      if (isLike === 0) {
        return false;
      }
      let data = {
        isLike: 1,
        type: 1,
        typeId: id,
      };
      this.saveUserLikeRecord(data);
    },
    showCommentList(index1, answerId) {
      console.log(answerId);
      //显示评论
      this.isShow = index1;
      this.answerId = answerId;
      this.getCommentList(this.pageSize, this.pageNum, this.answerId);
      this.getAnswerList(this.questionId, this.pageSize, this.pageNum);
    },
    hideCommentList() {
      this.isShow = -1;
    },
    showReplyBox(index) {
      this.showCommentBox = index;
    },
    deleteComment(commentId) {
      this.$confirm("确定删除该条评论吗？", "提示", {
        confirmButtonText: "确定",
        cancelButtonText: "取消",
        type: "warning",
      }).then(() => {
        this.$http.postDeleteComment(commentId).then((res) => {
          console.log("delComment", res);
          if (res.code === 1) {
            this.$message({ message: res.msg, type: "success" });
            this.getCommentList(this.pageSize, this.pageNum, this.answerId);
            this.getAnswerList(this.questionId, this.pageSize, this.pageNum);
          } else {
            this.$message({ message: res.msg, type: "warning" });
          }
        });
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
          this.getCommentList(this.pageSize, this.pageNum, this.answerId);
        }
      });
    },
    publishComment() {
      //评论
      if (!this.commentContent) {
        this.$message({ message: "评论内容不能为空", type: "warning" });
      } else {
        let data = {
          content: this.commentContent,
          type: 1,
          typeId: this.answerId,
        };
        console.log(data);
        this.$http.postSaveComment(data).then((res) => {
          console.log("saveComment", res);
          if (res.code === 1) {
            this.$message({ message: res.msg, type: "success" });
            this.commentContent = "";
            this.getAnswerList(this.questionId, this.pageSize, this.pageNum);
            this.getCommentList(this.pageSize, this.pageNum, this.answerId);
          } else {
            this.$message({ message: res.msg, type: "warning" });
          }
        });
      }
    },
    handleReplyComment(commentId, studentId) {
      //评论回复
      if (!this.answerContent) {
        this.$message({ message: "评论内容不能为空", type: "warning" });
      } else {
        let data = {
          commentId: commentId,
          content: this.answerContent,
          replyType: 1,
          studentId: studentId,
        };
        console.log(data);
        this.$http.postSaveCommentReply(data).then((res) => {
          console.log("reply", res);
          if (res.code === 1) {
            this.$message({ message: res.msg, type: "success" });
            this.handleCancelReply();
            this.getCommentList(this.pageSize, this.pageNum, this.answerId);
            this.getCommentReplyList(this.pageSize, this.pageNum, commentId);
          } else {
            this.$message({ message: res.msg, type: "warning" });
          }
        });
      }
    },
    handleCancelReply() {
      this.showCommentBox = -1;
      this.answerContent = "";
    },
    showReplyList(commentId, index) {
      //显示评论回复列表
      if (this.replyIndex === index) {
        this.replyIndex = -1;
      } else {
        this.replyList = [];
        this.replyIndex = index;
        this.getCommentReplyList(this.pageSize, this.pageNum, commentId);
      }
    },
    showReplyAnswer(i) {
      this.isShowReplyAnswer = i;
      this.replyContent = "";
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
            this.$message({ message: res.msg, type: "success" });
            this.getCommentList(this.pageSize, this.pageNum, this.answerId);
            this.getCommentReplyList(this.pageSize, this.pageNum, commentId);
          } else {
            this.$message({ message: res.msg, type: "warning" });
          }
        });
      });
    },
    handleReplyAnswer(commentId, studentId, replyId) {
      //回复回复
      if (!this.replyContent) {
        this.$message({ message: "回复内容不能为空", type: "warning" });
      } else {
        let data = {
          commentId: commentId,
          content: this.replyContent,
          replyId: replyId,
          replyType: 2,
          studentId: studentId,
        };
        console.log(data);
        this.$http.postSaveCommentReply(data).then((res) => {
          console.log("answer", res);
          if (res.code === 1) {
            this.$message({ message: res.msg, type: "success" });
            this.handleCancelReplyAnswer();
            this.getCommentList(this.pageSize, this.pageNum, this.answerId);
            this.getCommentReplyList(this.pageSize, this.pageNum, commentId);
          } else {
            this.$message({ message: res.msg, type: "warning" });
          }
        });
      }
    },
    handleCancelReplyAnswer() {
      this.isShowReplyAnswer = -1;
      this.replyContent = "";
    },
    enterText() {
      this.text = "取消关注";
    },
    leaveText() {
      this.text = "已关注";
    },
    followQuestion() {
      this.params = {
        isFollow: 0,
        type: 0,
        typeId: this.questionId,
      };
      this.follow();
    },
    follow() {
      this.$http.postSaveUserFollowRecord(this.params).then((res) => {
        this.getQuestion(this.questionId);
      });
    },
    cancleFollow() {
      this.params = {
        isFollow: 1,
        type: 0,
        typeId: this.questionId,
      };
      this.follow();
    },
    saveAnswer() {
      this.writeAnswerContent = this.$refs.md.d_render; // html
      let md_answerContent = this.writeAnswerContent; // b 传给后端  a展示
      let html_answerContent = md_answerContent;
      md_answerContent = this.$refs.md.d_value; // md
      this.writeAnswerContent = md_answerContent;
      let params = {
        content: html_answerContent,
        questionId: this.questionId,
      };
      this.$http.postSaveAnswer(params).then((res) => {
        console.log("saveAnswer", res);
        this.editMavon = false;
        this.getQuestion(this.questionId);
        this.getAnswerList(this.questionId, this.pageSize, this.pageNum);
      });
    },
    deleteAnsewer(answerId) {
      this.$confirm("确定删除该条回答吗？", "提示", {
        confirmButtonText: "确定",
        cancelButtonText: "取消",
        type: "warning",
      }).then(() => {
        this.$http.postDeleteAnswer(answerId).then((res) => {
          console.log("delAnswer", res);
          this.getQuestion(this.questionId);
          this.getAnswerList(this.questionId, this.pageSize, this.pageNum);
        });
      });
    },
    writeAnswer() {
      this.editMavon = true;
    },
  },
};
</script>
<style lang="scss" scoped>
.answerDetail {
  .fl {
    float: left;
  }
  .fr {
    float: right;
  }
  .detailHeader {
    position: relative;
    min-width: 1032px;
    padding: 16px 0;
    overflow: hidden;
    background: #fff;
    -webkit-box-shadow: 0 1px 3px rgba(26, 26, 26, 0.1);
    box-shadow: 0 1px 3px rgba(26, 26, 26, 0.1);

    .detailHeader_content {
      display: flex;
      -webkit-box-pack: justify;
      -ms-flex-pack: justify;
      justify-content: space-between;
      width: 1000px;
      height: 100%;
      padding: 0 16px;
      margin: 0 auto;

      .detailHeader_main {
        .el-tag--dark {
          margin: 3px 5px 3px 0;
        }

        .detailHeader_title {
          margin-top: 12px;
          margin-bottom: 4px;
          font-size: 22px;
          font-weight: 600;
          font-synthesis: style;
          line-height: 32px;
          color: #1a1a1a;
        }

        .detailHeader_intro {
          min-height: 10px;
        }
      }

      .detailHeader_side {
        width: 214px;
        padding-right: 20px;

        .follow_status {
          display: flex;
          text-align: center;

          .status_number {
            flex: 1;

            &:nth-child(1) {
              border-right: 1px solid #eeeeee;
            }

            .number_name {
              font-size: 14px;
              color: #8590a6;
            }

            .number_value {
              font-size: 18px;
              color: #1a1a1a;
              font-weight: 600;
            }
          }
        }
      }
    }

    .detailHeader_footer {
      width: 1000px;
      height: 100%;
      padding: 0 16px;
      margin: 0 auto;

      ul > li {
        display: inline-block;
        margin: 2px 8px 0 0;

        button {
          color: #fff;
          display: inline-block;
          padding: 0 16px;
          font-size: 14px;
          line-height: 32px;
          min-width: 96px;
          text-align: center;
          cursor: pointer;
          background: none;
          border: 1px solid;
          border-radius: 3px;
          border-color: #0084ff;
          background-color: #0084ff;
        }
        .button_blue {
          &:hover {
            background-color: #0077e6;
            border-color: #0077e6;
          }
        }
        .button_grey {
          background-color: #8590a6;
          border-color: #8590a6;
        }

        i,
        span {
          color: #8590a6;
        }
      }
    }
  }

  .detail_main {
    width: 1000px;
    min-height: 100vh;
    margin: 10px auto 0;
    padding: 0 16px;
    background: #fff;
    span[data-v-13b9896e] {
      color: #8590a6 !important;
    }
    .topbar {
      display: flex;
      justify-content: space-between;
      padding: 10px 0;
      border-bottom: 1px solid #eeee;

      .total_value {
        font-weight: 600;
      }

      .default_sort {
        color: #8590a6;
      }
    }

    .detail_list {
      padding: 16px 0;
      border-bottom: 1px solid #eeeeee;

      .list_header {
        display: flex;

        .author_info {
          flex: 1;
          margin-left: 14px;
          overflow: hidden;

          .author_name {
            font-size: 16px;
            font-weight: 600;
            color: #444;
          }

          .author_intro {
            width: inherit;
            overflow: hidden;
            text-overflow: ellipsis;
            white-space: nowrap;
            color: #646464;
          }
        }
      }

      .voters {
        color: #8590a6;
      }

      .list_content {
        font-size: 15px;
        color: #1a1a1a;
      }

      .contentItem_time {
        color: #8590a6;
      }

      .list_footer {
        padding: 10px 20px;
        margin: 0 -20px -10px;
        button[data-v-13b9896e] span {
          color: #fff !important;
        }

        ul > li {
          display: inline-block;
          margin: 2px 8px 0 0;
          cursor: pointer;

          button {
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
        }

        .cancle_agree {
          padding: 0 10px;
          color: #0084ff;
          background: rgba(0, 132, 255, 0.1);
          border-color: transparent;
          font-size: 14px;
          line-height: 36px;

          .iconjiangxu {
            color: #0084ff;
            font-size: 14px;
            vertical-align: middle;
          }
        }

        .add_comment,
        .del_answer {
          color: #8590a6;

          i {
            color: inherit;
          }
        }
        .comment_list {
          margin-top: 10px;
          border: 1px solid #eee;
          border-radius: 5px;
          padding: 20px;

          .commentList_box {
            position: relative;
            left: 68px;
            top: 0;
            margin-bottom: 50px;
            width: 622px;

            .showReply {
              cursor: pointer;
              font-size: 12px;
              display: inline-block;
              color: #4285f4;
            }

            .comment_1 {
              .top {
                .header {
                  margin-left: -68px;
                  position: relative;

                  .header_img {
                    display: block;
                    margin-right: 10px;

                    img {
                      display: block;
                      width: 38px;
                      height: 38px;
                      border-radius: 50%;
                    }
                  }
                }

                .head_right {
                  width: 660px;

                  .name {
                    display: block;
                    line-height: 1.2;
                    font-size: 12px;

                    &:hover {
                      color: #4285f4;
                    }
                  }

                  .time {
                    font-size: 12px;
                    line-height: 1.2;
                    margin-top: 4px;

                    span:first-child {
                      margin-left: 0;
                      color: #9d9d9d;
                    }

                    span {
                      line-height: 20px;
                      cursor: pointer;
                      min-width: 22px;
                      height: 20px;
                      box-sizing: border-box;
                      display: inline-block;
                    }

                    .reply_btn {
                      height: 17px;
                      line-height: 17px;
                      padding-left: 46px;
                      margin-top: 3px;
                      color: #999;
                      position: relative;
                      font-size: 14px;

                      i {
                        color: #999;
                        position: absolute;
                        right: 9px;
                        top: 2px;
                        font-size: 21px;

                        &:hover {
                          color: #666;
                        }
                      }

                      &:hover {
                        color: #666;
                      }
                    }

                    .zan {
                      padding-left: 22px;
                      color: #999;
                      font-size: 14px;

                      i {
                        color: #999;
                        font-size: 21px;

                        &:hover {
                          color: #666;
                        }
                      }

                      &:hover {
                        color: #666;
                      }
                    }
                  }
                }
              }

              .comment_con {
                color: #666;
                line-height: 24px;
                margin-top: 10px;
              }
            }

            .comment_2 {
              padding-left: 16px;
              border-left: 1px solid #e7e5e5;
              margin-top: 20px;

              .comment_2_list {
                li:first-child {
                  margin-top: 0;
                }

                li {
                  margin-bottom: 25px;
                  display: list-item;

                  .top {
                    font-size: 14px;
                    color: #333;
                    line-height: 30px;
                    display: block;

                    .author {
                      margin-right: 10px;
                      position: relative;
                      color: #ff9902;
                      padding: 0 6px;
                      line-height: 18px;
                      font-size: 12px;
                      border: 1px solid #ff9902;
                      border-radius: 2px;
                    }

                    .name {
                      font-size: 12px;
                      color: #6a96ef;
                      line-height: 20px;
                      cursor: pointer;
                    }
                  }

                  .con {
                    color: #666;
                    font-size: 14px;
                  }

                  .bot {
                    margin-top: 14px;

                    p {
                      float: left;
                      font-size: 12px;
                      color: #9d9d9d;
                      line-height: 16px;
                    }

                    .reply_btn {
                      margin-left: 20px;
                      padding-left: 20px;
                      color: #9d9d9d;
                      cursor: pointer;
                      position: relative;

                      i {
                        color: #999;
                        position: absolute;
                        right: 25px;
                        top: 1px;
                        font-size: 20px;

                        &:hover {
                          color: #666;
                        }
                      }

                      &:hover {
                        color: #666;
                      }
                    }
                  }
                }
              }
              .textarea_content {
                width: 620px;
              }
            }
          }
        }
      }
    }
    .textarea_content {
      margin-top: 20px;
      width: 100%;
    }
    .comment_push {
      p {
        line-height: 28px;
        font-size: 12px;
      }
      .cancel_btn {
        padding: 0 20px;
        color: #999;
        cursor: pointer;

        &:hover {
          color: #3c78dc;
        }
      }
    }
  }
  background: #f6f6f6;
}
</style>
