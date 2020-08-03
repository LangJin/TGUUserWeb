import axios from 'axios';
import NProgress from './progressbar';
import router from '@/router'
import {
  Message
} from 'element-ui';
import {
  getCookie
} from '@/util/Cookie'

let myAxios = axios.create();
myAxios.defaults.timeout = 30000;
myAxios.defaults.headers.post['Content-Type'] = 'application/x-www-form-urlencoded;charset=UTF-8';
myAxios.defaults.baseURL = '/Counselor';

// 请求拦截器
myAxios.interceptors.request.use(config => {
  NProgress.start();
  // 请求头携带参数
  if (getCookie("studentId") != undefined) {
    config.headers['studentId'] = getCookie("studentId")
    config.headers['accessToken'] = getCookie('accessToken')
    // console.log(getCookie("studentId"), getCookie('accessToken'))
  }

  return config;
}, error => {
  return Promise.reject(error);
});


// 响应拦截器即异常处理
myAxios.interceptors.response.use(response => {
  NProgress.done();
  // console.log(response) // 请求成功时
  if (response.data.code === 0) {
    Message.warning(response.data.msg);
  } else if (response.data.code === 9) {
    router.push({
      name: 'login'
    });
  }else if(response.data === ''){
    Message.error('服务器出错');
  }
  return response;
}, err => {
  NProgress.done();
  const response = err.response
  if (!response) {
    if (err && err.message === 'cancel') {
      // 手动取消情况下的处理
      return Promise.reject(err)
    }
    // 请求超时，崩溃页面？
    Message.error('服务请求超时！')
    return Promise.reject(err)
  }
  if (response) {
    switch (response.status) {
      case 400:
        err.message = '错误请求';
        break;
      case 401:
        err.message = '未授权，请重新登录';
        break;
      case 403:
        err.message = '拒绝访问';
        break;
      case 404:
        err.message = '请求错误,未找到该资源';
        break;
      case 405:
        err.message = '请求方法未允许';
        break;
      case 408:
        err.message = '请求超时';
        break;
      case 500:
        err.message = '服务器端出错';
        break;
      case 501:
        err.message = '网络未实现';
        break;
      case 502:
        err.message = '网络错误';
        break;
      case 503:
        err.message = '服务不可用';
        break;
      case 504:
        err.message = '网络超时';
        break;
      case 505:
        err.message = 'http版本不支持该请求';
        break;
      default:
        err.message = `连接错误${response.status}`;
    }
  } else {
    err.message = '连接到服务器失败';
  }
  return Promise.resolve(response);
});

export default myAxios;
