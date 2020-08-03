import axios from '@/common/js/baseHttp.js';


export const postCategory = (query) => {
  return axios.post('/open/category/release/getCategoryList', query).then(res => res.data);
};

export const postBanner = (blockId) => {
  return axios.post(`/open/banner/release/getBannerList/${blockId}`).then(res => res.data);
};


export const getAnnouncement = () => {
  return axios.get('/open/notice/release/getHomePageNoticeList').then(res => res.data)
};

export const postHomeArticleList = () => {
  return axios.post('/open/article/release/getHomePageArticleList').then(res => res.data)

};

export const postlikeRecord = (query) => {
  return axios.post('/open/likeRecord/saveUserLikeRecord', query).then(res => res.data)
}
