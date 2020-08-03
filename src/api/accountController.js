import axios from '@/common/js/baseHttp.js';

export const postValicode = (phone) => {
  return axios.post(`/account/getValicode/${phone}`).then(res => res.data);
};

export const postRegister = (params) => {
  return axios.post('/account/saveRegister', params).then(res => res.data);
};

export const postLogin = (params) => {
  return axios.post('/account/getLogin', params).then(res => res.data);
};

export const postUpdatePwd = (params) => {
  return axios.post('/account/updateForgetPwd', params).then(res => res.data);
};

export const postStudentPersonalMessage = (targetStudentId) => {
  return axios.post(`/open/personal/getStudentPersonalMessage/${targetStudentId}`).then(res => res.data);
};

export const postMyFollowRecordList = (pageSize, pageNum, targetStudentId) => {
  return axios.post(`/open/followRecord/getMyFollowRecordList/${pageSize}/${pageNum}/${targetStudentId}`).then(res => res.data);
};

export const postCancelUserFollowRecord = (data) => {
  return axios.post('/open/followRecord/saveUserFollowRecord', data).then(res => res.data);
};

export const postGetMyArticleList = (pageSize, pageNum, targetStudentId) => {
  return axios.post(`/open/article/getMyArticleList/${pageSize}/${pageNum}/${targetStudentId}`).then(res => res.data);
};

export const postgetMyFansList = (pageSize, pageNum, targetStudentId) => {
  return axios.post(`/open/followRecord/getMyFansList/${pageSize}/${pageNum}/${targetStudentId}`).then(res => res.data);
};

export const postDeleteArticle = (articleId) => {
  return axios.post(`/open/article/deleteArticle/${articleId}`).then(res => res.data);
};


// 保存关注
export const postSaveFollowRecord = (query) => {
  return axios.post('/open/followRecord/saveUserFollowRecord', query).then(res => res.data);
};


export const postGetMyQuestionList = (pageSize, pageNum, targetStudentId) => {
  return axios.post(`/open/question/getMyQuestionList/${pageSize}/${pageNum}/${targetStudentId}`).then(res => res.data);
};
