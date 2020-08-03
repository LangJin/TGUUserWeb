<template>

  <div class="expert">
    <div class='author_banner'>
      <img src="https://static1.51cto.com/edu/blog/images/banner_author.png" />
    </div>
    <div class="author_content">
      <div class="author_title">
        <p>推荐博主</p>
      </div>
      <div class="author_list">
        <ul>
          <li v-for="item in recommendList" :key="item.id">
            <div>
              <p class="avar">
                <img :src="item.head" alt="">
              </p>
              <p>{{item.studentName}}</p>
              <p>
                <span>关注{{item.followNum}}</span>
                <span>粉丝{{item.followVolume }}</span>
                <span>文章{{item.articleVolume}}</span>
              </p>
              <p>
                {{item.introduce}}
              </p>

              <div style="width:262px;margin-top:20px">
                <div v-if="item.isFollow==0">
                  <div class="is_follow" @click="saveFollow(item.id)">
                    + 关注
                  </div>
                </div>
                <div v-else>
                  <div class="followed" @click="cancleFollow(item.id)">
                    √ 已关注
                  </div>
                </div>
              </div>
              <p class="recent">
                最新更新
              </p>
              <p>
                {{item.newestArticle}}
              </p>
            </div>
          </li>
        </ul>
      </div>
      <div class="pagination">
        <el-pagination @size-change="handleSizeChange" @current-change="handleCurrentChange" :current-page="currentPage"
          :page-size="pageSize" layout="prev, pager, next,total" :total="total">
        </el-pagination>
      </div>
    </div>
  </div>

</template>

<script>
  export default {
    components: {},
    data() {
      return {
        currentPage: 1,
        pageSize: 9,
        total: 0,
        recommendList: [],
        isFollow: 0,
        typeId: '',
      };
    },
    watch: {},
    computed: {},
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
      saveFollowRecord() {
        let params = {
          "isFollow": this.isFollow,
          "type": 1,
          "typeId": this.typeId
        }
        this.$http.postSaveFollowRecord(params).then(res => {});
      },
      getRecommendAuthor() {
        this.$http.postRecommendAuthorList(this.pageSize, this.currentPage).then(res => {
          this.recommendList = res.data
          this.total = res.pagination.total
        });
      },
      handleSizeChange(size) {
        this.pageSize = size // 每页下拉显示数据
        this.getRecommendAuthor()
      },
      handleCurrentChange(currentPage) {
        this.currentPage = currentPage; //点击第几页
        this.getRecommendAuthor()
      },
    },
    created() {
      this.getRecommendAuthor()
    },
    mounted() {

    }
  };

</script>
<style lang="scss" scoped>
  //@import url(); 引入公共css类
  .category_box {
    width: 300px;
    margin-top: 30px;
    padding-bottom: 8px;
    background: #f7f7f8;
    float: right;
    overflow-y: auto;
  }

  .category_box ul>li {
    padding: 10px;
    border-bottom: dotted 1px #dedede;
    font-size: 15px;
    color: #999;
  }

  .category_box ul>li i {
    margin-left: 5px;
  }

  .category_box ul>li ul li {
    border-bottom: 0;
    font-size: 14px;
    color: #333;
  }

  .cancle-match {
    position: relative;

    &:hover {
      .cancal-matching {
        .cancal-matching-body {
          display: block;
        }
      }
    }
  }

  .cancal-matching {
    position: relative;
    display: flex;
    justify-content: center;

    .cancal-matching-body {
      background-image: linear-gradient(180deg, #e6e6e6 0%, #e6e6e6 100%),
        linear-gradient(#e6e6e6, #e6e6e6);
      justify-content: space-around;
      align-items: center;
      width: 96px;
      cursor: pointer;
      border: 1px solid #eee;
      color: #666;
      display: none;
      position: absolute;
      left: 0;
      top: -26px;
      z-index: 2;
    }
  }

  .is_follow,
  .followed {
    width: 82px;
    text-align: center;
    margin: auto;
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
    color: #666;
    border: 1px solid #999;
  }

  .expert {
    min-height: 800px;
    overflow-x: hidden;
    background-color: #fff;

    .author_banner {
      width: 1450px;
      height: 232px;

      img {
        width: 100%;
        height: 100%;
      }
    }

    .author_content {
      width: 1100px;
      margin: auto;

      .author_title {
        font-size: 16px;
        font-weight: bold;
        text-align: center;
        margin: 60px 0;
      }

      .author_list {
        ul {
          li {
            display: inline-block;
            width: 264px;
            height: 328px;
            padding: 30px;
            margin-left: 30px;
            margin-bottom: 40px;
            border: 1px solid #f2f2f2;
            border-radius: 14px;

            .avar {
              width: 70px;
              height: 70px;
              border-radius: 50%;

              margin: 0 auto;

              img {
                width: 100%;
                height: 100%;
              }
            }

            p:nth-child(2) {
              text-align: center;
            }

            p:nth-child(3) {
              margin-top: 4px;
              text-align: center;

              span {
                font-size: 12px;
                color: #666;
                margin-left: 30px;
              }
            }

            p:nth-child(4) {
              color: #666;
              height: 48px;
              overflow: hidden;
              margin-top: 14px;
            }

            p:nth-child(5) {
              text-align: center;
            }

            .recent {
              font-size: 12px;
              color: #666;
              margin-top: 20px;
            }

            p:last-child {
              color: #333;
              margin-top: 10px;
              height: 48px;
              overflow: hidden;
            }
          }
        }
      }
    }

    .pagination {
      text-align: center;
      margin: 30px auto;
    }
  }

</style>
