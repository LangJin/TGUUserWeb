
import axios from '@/common/js/baseHttp.js';

export const postRecommendAuthorList = (pageSize,pageNum) => {
    return axios.post(`/open/followRecord/release/getRecommendAuthorList/${pageSize}/${pageNum}`).then(res => res.data);
  };
  
export const postSaveUserFollowRecord = (query) => {
  return axios.post('/open/followRecord/saveUserFollowRecord',query).then(res => res.data);
};
