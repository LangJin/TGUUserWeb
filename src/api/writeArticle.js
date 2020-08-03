import axios from '@/common/js/baseHttp.js';

export const postGetArticleList = (pageSize,pageNum,query) => {
  return axios.post(`/open/article/release/getArticleList/${pageSize}/${pageNum}`,query).then(res => res.data);
};


export const postGetMyLabel = (query) => {
  return axios.post('/open/label/getMyLabel',query).then(res => res.data);
};

export const postDelMyLabel = (labelId) => {
  return axios.post(`/open/label/deleteLabel/${labelId}`).then(res => res.data);
};

export const postSaveMyLabel = (query) => {
  return axios.post('/open/label/saveLabel', query).then(res => res.data);
}

export const postDictionary = (query) => {
  return axios.post("/open/systemDictionary/release/getSystemDictionaryListByList",query).then(res => res.data);
}


export const postSaveArticle = (query) => {
  return axios.post('/open/article/saveArticle', query).then(res => res.data);
}


// 文章详情
export const postGetArticle = (articleId) => {
  return axios.post(`/open/article/release/getArticle/${articleId}`).then(res => res.data);
}



