import axios from '@/common/js/baseHttp.js';

export const postDeleteAnswer = (answerId) => {
  return axios.post(`/open/question/deleteAnswer/${answerId}`).then(res => res.data);
};

// 保存回答
export const postSaveAnswer = (query) => {
  return axios.post('/open/question/saveAnswer', query).then(res => res.data);
};

// 回答详情列表
export const getAnswerList = (questionId, pageSize, pageNum) => {
  return axios.get(`/open/question/release/getAnswerList/${questionId}/${pageSize}/${pageNum}`).then(res => res.data);
};


//问题列表
export const postQuestionList = (pageSize, pageNum, query) => {
  return axios.post(`/open/question/release/getQuestionList/${pageSize}/${pageNum}`, query).then(res => res.data);
};


// 保存问题
export const postSaveQuestion = (query) => {
  return axios.post('/open/question/saveQuestion', query).then(res => res.data);
};


// 删除问题
export const postDeleteQuestion = (questionId) => {
  return axios.post(`/open/question/deleteQuestion/${questionId}`).then(res => res.data);
};

//问题详情
export const postGetQuestion = (questionId) => {
  return axios.post(`/open/question/release/getQuestion/${questionId}`).then(res => res.data);
}