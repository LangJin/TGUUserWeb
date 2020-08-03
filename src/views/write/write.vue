<template>
  <div class="write">
    <base-header></base-header>
    <div class="Page">
      <div class="blog_title">
        <el-select v-model="dicName" placeholder="请选择" style="width: 100px;">
          <el-option v-for="item in articleType" :key="item.dicValue" :label="item.dicName" :value="item.dicValue">
          </el-option>
        </el-select>
        <el-input v-model="articleName" placeholder="请输入标题，您可以输入50字" style="width: 1096px"></el-input>
      </div>
      <div class="mark_down blog_title">
        <!-- 　<el-button class="fileParent" type="success" style="background:#273C48" @change="uploadFile">
          <input class="file" type="file" @change="uploadFile" multiple="multiple" />
          <img :src="tempImg" v-if="tempImg" alt />
        </el-button>-->
        <mavon-editor v-model="articleContent" @imgAdd="$imgAdd" @imgDel="$imgDel" ref="md" />
      </div>
      <div class="blog_title">
        <select name v-model="firstName">
          <option value selected:disabled style="diaplay:none">请选择一级分类</option>
          <option :value="item" v-for="item in article_title" :key="item.id">{{item.name}}</option>
        </select>
        <select name v-model="secondName">
          <option value selected:disabled style="diaplay:none">请选择二级分类</option>
          <option :value="item_child.id" v-for="item_child in firstName.children" :key="item_child.id">
            {{item_child.name}}</option>
        </select>
      </div>
      <div class="blog_title">
        <el-tag :key="tag.id" v-for="tag in myTags" closable :disable-transitions="false" @close="handleClose(tag)"
          style="margin-right:5px">{{tag.content}}</el-tag>
        <el-input class="input-new-tag" v-if="inputVisible" v-model="inputValue" ref="saveTagInput" size="small"
          @keyup.enter.native="handleInputConfirm" @blur="handleInputConfirm" style="width:100px"></el-input>
        <el-button v-else class="button-new-tag" size="small" @click="showInput">+ 新建标签</el-button>
      </div>
      <!-- <div v-html="articleContent2">{{articleContent2}}</div> -->
      <div class="blog_title" style="margin-bottom:100px" v-if="this.$route.path=='/write/article'">
        <el-input v-model="introduce" placeholder="请填写文章摘要，最多支持500字，如不填写会默认抓取正文前200字" style="width: 1200px"></el-input>
      </div>
    </div>
    <div class="submit_btns">
      <div class="max">
        <div>
          <el-radio-group v-model="radio">
            <el-radio :label="item.dicValue" v-for="item in isPublic" :key="item.dicValue">{{item.dicName}}</el-radio>
          </el-radio-group>
        </div>
        <div>
          <el-button type="primary" @click="submit_article">{{submit_text}}</el-button>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
  import marked from "marked";
  import BaseHeader from "@/components/navigation";
  export default {
    components: {
      "base-header": BaseHeader,
    },
    data() {
      return {
        dicName: "",
        articleName: "",
        articleContent: "",
        articleContent2: "",
        articleType: [],
        isPublic: [],
        value2: "",
        myTags: [],
        inputVisible: false,
        inputValue: "",
        radio: "0",
        article_title: [],
        firstName: "",
        secondName: "",
        introduce: "",
        img_file: {},
        submit_text: "",
        labelType: "",
        categoryType: ""
      };
    },
    watch: {},
    computed: {},
    methods: {
      init() {
        this.getMyLabel();
        this.getCategory();
        this.getDictionary();
      },
      handleClose(tag) {
        this.$http.postDelMyLabel(tag.id).then((res) => {
          this.myTags.splice(this.myTags.indexOf(tag), 1);
        });
      },

      showInput() {
        this.inputVisible = true;
        this.$nextTick((_) => {
          this.$refs.saveTagInput.$refs.input.focus();
        });
      },

      handleInputConfirm() {
        let inputValue = this.inputValue;
        if (inputValue) {
          this.$http
            .postSaveMyLabel({
              content: inputValue,
              labelType: this.labelType
            })
            .then((res) => {
              this.getMyLabel();
            });
        }
        this.inputVisible = false;
        this.inputValue = "";
      },
      $imgAdd(pos, $file) {
        let formdata = new FormData();
        formdata.append("image", $file);
        console.log(formdata);
        //  axios ({
        //      url: 'server url',
        //      method: 'post',
        //      data: formdata,
        //      headers: { 'Content-Type': 'multipart/form-data' },
        //  }).then((url) => {
        //      // 第二步.将返回的url替换到文本原位置![...](0) -> ![...](url)
        //      // $vm.$img2Url 详情见本页末尾
        //      $vm.$img2Url(pos, url);
        //  })
      },
      $imgDel(pos) {
        delete this.img_file[pos];
      },
      async uploadFile(event) {
        let file = event.target.files[0]; //获取input的图片file值
        let param = new FormData(); // 创建form对象
        param.append("imgFile", file); //对应后台接收图片名
        console.log(param);
        // await uploadPicture(param).then(res => { //uploadPicture为我的api接口
        //   if (res.code == 1) {
        //     let url = res.url[0].url;
        //     this.tempImg = "online" + url;
        //   }
        // });
        // this.$notify({
        //   duration: 3000,
        //   title: "成功",
        //   message: "上传成功！",
        //   type: "success"
        // });
      },
      submit_article() {
        if (!this.secondName) {
          this.$message({
            message: "请选择二级分类",
            type: "warning",
          });
        } else {
          this.articleContent = this.$refs.md.d_render; // html
          let md_articleContent = this.articleContent; // b 传给后端  a展示
          let html_articleContent = md_articleContent;
          md_articleContent = this.$refs.md.d_value; // md
          this.articleContent = md_articleContent;

          if (this.$route.path === "/write/article") {
            let params = {
              categoryId: 1,
              articleContent: html_articleContent,
              articleName: this.articleName,
              articleType: this.dicName,
              categoryId: this.secondName,
              introduce: this.introduce,
              isPrivate: this.radio,
              labelDTOS: this.myTags,
            };
            this.$http.postSaveArticle(params).then((res) => {
              if (res.code === 1) {
                this.$message({
                  message: "发布成功",
                  type: "success",
                });
              }
            });
          } else {
            // 缺少标签
            let params = {
              categoryId: 2,
              isPrivate: this.radio,
              questionIntroduce: html_articleContent,
              questionName: this.articleName,
              questionType: this.dicName,
            };
            this.$http.postSaveQuestion(params).then((res) => {
              if (res.code === 1) {
                this.$message({
                  message: "发布成功",
                  type: "success",
                });
              }
            });
          }
        }

      },
      getMyLabel() {
        this.$http.postGetMyLabel({
          "labelType": this.labelType

        }).then((res) => {
          this.myTags = res.data;
        });
      },
      getDictionary() {
        this.$http
          .postDictionary({
            typeCode: ["1001", "1002"],
          })
          .then((res) => {
            for (var i of res.data) {
              // 不存在返回-1
              if (i["typeCode"].indexOf("1001") !== -1) {
                this.articleType.push(i);
              } else {
                this.isPublic.push(i);
              }
            }
          });
      },
      getCategory() {
        this.$http
          .postCategory({
            categoryType: this.categoryType,
          })
          .then((res) => {
            this.article_title = res.data;
          });
      },
    },
    created() {
      if (this.$route.path == "/write/article") {
        this.submit_text = "发布文章"
        this.labelType = 1
        this.categoryType = 1
      } else {
        this.submit_text = "发布问题"
        this.labelType = 2
        this.categoryType = 2
      }
      this.init();
    },
    mounted() {},
    watch: {
      $route: {
        handler(val, oldval) {
          if (val.path === "/write/article") {
            this.labelType = 1
            this.categoryType = 1
             this.init();
          }
        },
        deep: true
      }
    }
  };

</script>
<style lang="scss" scoped>
  //@import url(); 引入公共css类
  .el-input__inner {
    height: 52px;
    line-height: 52px;
  }

  .v-note-wrapper {
    min-height: 500px;
  }

  .blog_title {
    margin-top: 30px;

    select {
      width: 220px;
      color: #c1c1c1;
      padding: 0px 15px;
      height: 40px;
      outline: none;
      border-radius: 4px;
      border: 1px solid rgb(220, 223, 230);
    }
  }

  .submit_btns {
    position: fixed;
    height: 60px;
    line-height: 60px;
    left: 0;
    bottom: 0;
    width: 100%;
    z-index: 9999;
    background: #fff;
    border-top: 1px solid #ddd;
    box-shadow: 0 0 3px #ddd;

    .max {
      display: flex;
      width: 90%;
      justify-content: space-between;
      padding: 10px 0;
      margin: 0 auto;
      line-height: 40px;
      min-width: 1000px;

      span {
        color: #fff !important;
      }
    }
  }

</style>
