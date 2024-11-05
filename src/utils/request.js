// src/utils/http.js
import axios from 'axios'

// 创建axios实例
const service = axios.create({
  baseURL: 'https://gw.alipayobjects.com', // API基础地址
  timeout: 8000 // 请求超时时间
});


// 响应拦截器
service.interceptors.response.use(
    response => {
      // 对响应数据做点什么
        const res = response.data;
        // if(res.code !== 200) {

        // }
        return res
    },
    error => {
      // 对响应错误做点什么
      console.error('Response Error:', error)
      return Promise.reject(error)
    }
  )

export default service;