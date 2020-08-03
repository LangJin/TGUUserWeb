import axios from '@/common/js/baseHttp.js';
export const postGetArticle = (articleId) => {
    return axios.post(`/open/article/release/getArticle/${articleId}`).then(res => res.data);
  };
  
  export const postGetCommentList = (pageSize,pageNum,type,typeId) => {
    return axios.post(`/open/comment/release/getCommentList/${pageSize}/${pageNum}/${type}/${typeId}`).then(res => res.data);
  };
  
  export const postSaveComment = (data) => {
    return axios.post('/open/comment/saveComment',data).then(res => res.data);
  };
  
  export const postDeleteComment = (commentId) => {
    return axios.post(`/open/comment/deleteComment/${commentId}`).then(res => res.data);
  };
  
  export const postGetCommentReplyList = (pageSize,pageNum,commentId) => {
    return axios.post(`/open/commentReply/release/getCommentReplyList/${pageSize}/${pageNum}/${commentId}`).then(res => res.data);
  };       
  
  export const postSaveCommentReply = (data) => {
    return axios.post('/open/commentReply/saveCommentReply',data).then(res => res.data);
  }; 
  
  export const postDeleteCommentReply = (replyId) => {
    return axios.post(`/open/commentReply/deleteCommentReply/${replyId}`).then(res => res.data);
  }; 