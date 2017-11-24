/**
 * Created by LJW on 2017/6/21.
 *
 * usage:
 * methods: {
 *    fetchData: async function () {
 *     let params = {}
 *     const res = await http.get(api.apiStart, params)
 *     if (res.data.success) {
 *       alert('请求成功')
 *     }
 *   }
 * }
 */

import axios from 'axios'
import { baseUrl } from './env'
import { Notification } from 'element-ui'
// Loading,
// let loading

axios.interceptors.request.use(config => {
  // loading
  return config
}, error => {
  return Promise.reject(error)
})

axios.interceptors.response.use(response => {
  return response
}, error => {
  return Promise.resolve(error.response)
})

// axios.defaults.withCredentials = true

function showLoading() {
  // loading = Loading.service({
  //   fullscreen: true,
  //   target: target,
  //   text: '数据加载中...'
  // })
  // text = text || '数据加载中...'
  return window.utils.loading('数据加载中...')
}

function hideLoading(name) {
  // loading.close()
  // try {
  //   let temp = window.$('.el-loading-mask').get(0)
  //   temp.parentElement.removeChild(temp)
  // } catch (e) {}
  window.removeLoading(name)
}

window.hideLoading = hideLoading

function checkStatus (response, name) {
  // loading
  hideLoading(name)
  // 如果http状态码正常，则直接返回数据
  if (response && (response.status === 200 || response.status === 304)) {
    if (response.data.code === 'E9999') {
      // Notification({
      //   title: '错误',
      //   message: `返回状态码:${response.data.code} , 异常信息:${response.data.msg}`,
      //   type: 'error',
      //   duration: '5000'
      // })
      // // 抛出中断信号.
      // throw new Error('请求异常,请联系管理员...')
      window.location.href = '/dms-web/'
    } else if (response.data.code === 'E9998') {
      Notification({
        title: '权限不足',
        message: `您没有权限进行此操作,请联系系统管理员`,
        type: 'error',
        duration: '5000'
      })
      // 抛出中断信号.
      throw new Error('请求异常,请联系管理员...')
    }
    return response.data
    // 如果不需要除了data之外的数据，可以直接 return response.data
  }
  if (response && response.status === 400) {
    Notification({
      title: '请求无效,发送字段与服务器所需参数不一致',
      message: `返回状态码:${response.status} , 异常信息:${response.statusText}`,
      type: 'error',
      duration: '5000'
    })
    console.debug('<<< response message: ↓')
    console.debug(response)
    throw new Error('请求无效,发送字段与服务器所需参数不一致...')
    // return {
    //   status: response.status,
    //   msg: response.message,
    //   data: response.data
    // }
  }
  checkCode(response, name)
}

function checkCode (res, name) {
  hideLoading(name)
  // 如果code异常(这里已经包括网络错误，服务器错误，后端抛出的错误)，可以弹出一个错误提示，告诉用户
  // if (res.status === -404) {
  //  alert(res.msg)
  // }
  // if (res.data && (!res.data.success)) {
  //  alert(res.data.error_msg)
  // }
  try {
    Notification({
      title: '错误',
      message: `返回状态码:${res.status} , 异常信息:${res.statusText}`,
      type: 'error',
      duration: '5000'
    })
  } catch (e) {
    Notification({
      title: '请求异常,请联系管理员',
      message: `网络异常`,
      type: 'error',
      duration: '5000'
    })
  }
  throw new Error('请求异常,请联系管理员')
  // 异常状态下，把错误信息返回去
  // return {
  //   status: res.status,
  //   msg: res.message,
  //   data: res.data
  // }
}

export default {
  post (url, data, target) {
    const name = showLoading(target)
    return axios({
      method: 'post',
      baseURL: baseUrl,
      url,
      data: data,
      timeout: 100000
    }).then(
      (response) => {
        return checkStatus(response, name)
      }
    )
  },
  get (url, params, target) {
    const name = showLoading(target)
    return axios({
      method: 'get',
      baseURL: baseUrl,
      url,
      params, // get 请求时带的参数
      timeout: 100000,
      headers: {
        'X-Requested-With': 'XMLHttpRequest'
      }
    }).then(
      (response) => {
        return checkStatus(response, name)
      }
    )
  }
}

