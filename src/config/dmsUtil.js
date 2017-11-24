/**
 * dmsUtil公共API
 * author : liao jiabing
 * QQ : 656317441
 * email : admin@w3c.top
 */
import Vue from 'vue'
import '@/config/ArrayExtend.js'
import '@/config/StringExtend.js'
import '@/config/DateExtend.js'
import {baseUrl} from '@/config/env'
import DataBase from './Storage.js'
import {
  // 消息
  Message,
  // 通知
  Notification,
  // messgae-box弹框
  MessageBox
} from 'element-ui'

import $ from 'jquery'

window.$ = window.jQuery = $

// import * as Ps from 'perfect-scrollbar'
// require('perfect-scrollbar/jquery')($)

require('@/lib/jquery.jscrollpane.css')

require('@/lib/jquery.mousewheel.js')

require('@/lib/jquery.jscrollpane.min.js')

require('@/lib/perfect-scrollbar.jquery.min.js')

require('@/lib/jquery-migrate-1.2.1.min.js')

require('@/lib/jquery.jqprint-0.3.js')

// window.echarts = echarts

require('@/config/loading.js')

const echarts = require('echarts')

window.echarts = echarts

const utils = {
  loading(text) {
    let name = new Date().getTime() + ''
    $('body').loading({
      loadingWidth: 240,
      title: '',
      name: name,
      discription: text || '数据加载中...',
      direction: 'column',
      type: 'origin',
      // originBg:'#71EA71',
      originDivWidth: 40,
      originDivHeight: 40,
      originWidth: 6,
      originHeight: 6,
      smallLoading: false,
      loadingMaskBg: 'rgba(0,0,0,0.2)'
    })
    return name
  },
  removeLoading(name) {
    window.removeLoading(name)
  },
  print(regx) {
    window.$(regx).jqprint()
  },
  save(key, value) {
    DataBase.save(key, value)
  },
  find(key) {
    return DataBase.find(key)
  },
  saveSession(key, value) {
    DataBase.saveSession(key, value)
  },
  findSession(key) {
    return DataBase.querySession(key)
  },
  // 初始化滚动条
  initScroll(dom) {
    $(dom).perfectScrollbar()
  },
  /**
   * 导出文件
   * @param  {[type]} url  请求url
   * @param  {[type]} data 请求参数
   * @return {[type]}      [description]
   */
  exportFile(url, data, type = 'get') {
    const form = document.createElement('form')
    for (const key in data) {
      const input = document.createElement('input')
      input.name = key
      input.value = data[key]
      form.appendChild(input)
    }
    form.action = baseUrl + url
    form.method = type
    form.target = '_blank'
    document.body.appendChild(form)
    form.submit()
    setTimeout(() => {
      document.body.removeChild(form)
    }, 1000)
  },
  getViewHeight() {
    const height = window.innerHeight
    return height - 70
  },
  getPageSize() {
    return 14
  },
  getRemarksBgColor() {
    return '#F2F2F5'
  },
  getRemarksDisabledBgColor() {
    return '＃D5D5D5'
  },
  /**
   * JS对象深度克隆
   * 此函数仅允许传入一个参数,第二个参数千万不要自己传入
   */
  // cloneObject(p, c) {
  //   c = c || {}
  //   const _this = this
  //   Object.getOwnPropertyNames(p).forEach(i => {
  //     if (typeof p[i] === 'object') {
  //       c[i] = (p[i].constructor === Array) ? [] : {}
  //       _this.cloneObject(p[i], c[i])
  //     } else {
  //       c[i] = p[i]
  //     }
  //   })
  //   return c
  // },
  cloneObject(obj) {
    // const time = new Date().getTime()
    // window.localStorage.setItem(`crbr_password_${time}`, JSON.stringify(obj))
    // const str = window.localStorage.getItem(`crbr_password_${time}`)
    return JSON.parse(JSON.stringify(obj))
  },
  /**
   * 获取url参数
   * 如不传任何参数,则返回所有key-value
   */
  getUrlParams(key) {
    try {
      var vars = []
      var hash = []
      var hashes = window.location.href.slice(window.location.href.indexOf('?') + 1).split('&')
      for (let i = 0; i < hashes.length; i++) {
        hash = hashes[i].split('=')
        vars.push(hash[0])
        vars[hash[0]] = hash[1]
      }
      if (key && typeof key === 'string') {
        for (let i = 0; i < vars.length; i++) {
          if (key === vars[i]) {
            let value = vars[key]
            return value
          }
        }
        return null
      }
      return vars
    } catch (e) {
      return null
    }
  },
  // 保存对象
  setObject(key, object) {
    window.sessionStorage.setItem(`__crcpass${key}word`, JSON.stringify(object))
    return this
  },
  // 获取保存的对象
  getObject(key) {
    return JSON.parse(window.sessionStorage.getItem(`__crcpass${key}word`))
  },
  // 将数据缓存至浏览器本地
  setItem(key, value) {
    window.sessionStorage.setItem(`__crcpass${key}word`, value)
    return this
  },
  // 将缓存数据从浏览器中取出
  getItem(key) {
    return window.sessionStorage.getItem(`__crcpass${key}word`)
  },
  // 将缓存数据从浏览器中删除
  removeItem(key) {
    window.sessionStorage.removeItem(`__crcpass${key}word`)
    return this
  },
  // 获取本地缓存中的所有键值对,返回一个JSON Object
  getItems() {
    const _this = this
    const storage = window.sessionStorage
    const obj = {}
    // 循环本地缓存中所有key
    for (let i = 0, len = storage.length; i < len; i++) {
      // 获取循环得到得key
      let key = storage.key(i)
      // 根据前缀判断该缓存数据是否为本站产生
      if (key.substring(0, 9) === "__crcpass") {
        // 去除前缀
        key = key.replace("__crcpass", "")
        // 去除后缀
        key = key.substring(0, key.length - 4)
        // 获取key对应的value值
        const value = _this.getItem(key)
        obj[key] = value
      }
    }
    return obj
  },
  /**
   * 清除浏览器中所有缓存数据
   */
  clearItem() {
    window.sessionStorage.clear()
    return this
  },
  // 转义HTML中特殊字符
  encode(str) {
    var s
    if (str.length === 0) {
      return ""
    }
    s = str.replace(/&/g, "&gt;")
    s = s.replace(/</g, "&lt;")
    s = s.replace(/>/g, "&gt;")
    s = s.replace(/ /g, "&nbsp;")
    s = s.replace(/\'/g, "&#39;")
    s = s.replace(/\"/g, "&quot;")
    s = s.replace(/\n/g, "<br>")
    return s
  },
  // 去除字符串首尾空格
  trim(str) {
    return str.replace(/(^\s*)|(\s*$)/g, '')
  },
  fix(obj) {
    if (isNaN(obj)) {
      for (const attr in obj) {
        if (typeof obj[attr] !== 'boolean' && !isNaN(obj[attr]) && obj[attr] !== '') {
          obj[attr] = window.parseFloat(window.parseFloat(obj[attr]).toFixed(6))
        }
      }
      return obj
    }
    return window.parseFloat(window.parseFloat(obj).toFixed(6))
  },
  // 将类数组转化为数组
  toArray(list) {
    return Array.prototype.slice.call(list)
  },
  /**
   * 方法作用：【计算2个日期之间的天数】
   * 使用方法：this.dayMinus(startDate,endDate);
   * @startDate {Date}起始日期
   * @endDate {Date}结束日期
   * @return endDate - startDate的天数差
   */
  dayMinus(startDate, endDate) {
    if (startDate instanceof Date && endDate instanceof Date) {
      startDate.format("yyyy-MM-dd")
      endDate.format("yyyy-MM-dd")
      return Math.floor((endDate - startDate) / (1000 * 60 * 60 * 24))
    } else {
      return "Param error,date type!"
    }
  },
  /**
   * 提示消息
   * @param  {[type]} text 提示文字
   * @param  {[type]} type 提示消息类型 success/warning/info/error
   * @return {[type]}      [description]
   */
  message(text, type) {
    Message({
      showClose: true,
      message: text || '',
      type: type || 'info',
      duration: 10000
    })
  },
  /**
   * 消息通知
   * @param  {[type]} title 通知标题
   * @param  {[type]} msg   通知文字
   * @param  {[type]} type  通知类型 success/warning/info/error
   * @return {[type]}       [description]
   */
  notify(title, msg, type) {
    Notification({
      title: title,
      message: msg,
      type: type || 'success'
    })
  },
  /**
   * messageBox弹出框
   * @param  {[type]} type      弹出框类型
   * @param  {[type]} title     标题
   * @param  {[type]} regx      正则验证
   * @param  {[type]} errorInfo 错误提示信息
   * @return {[type]}           [description]
   * 使用示例：this.messageBox('prompt', 'title').then(({value}) => console.log()).catch(() => TODO)
   */
  messageBox(type, title, regx, errorInfo) {
    // 提交内容
    if (type === 'prompt') {
      return MessageBox.prompt(typeof title === 'string' ? title : title.tip, typeof title === 'string' ? '提示' : title.title, {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        inputPattern: regx,
        inputErrorMessage: errorInfo
      })
    }
    // 确认弹框
    if (type === 'confirm') {
      return MessageBox.confirm(typeof title === 'string' ? title : title.tip, typeof title === 'string' ? '提示' : title.title, {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      })
    }
  },
  // alert弹框
  alert(title, content, fn) {
    MessageBox.alert(content, title, {
      confirmButtonText: '确定',
      callback: action => {
        if (fn && typeof fn === 'function') {
          fn(action)
        }
      }
    })
  },
  /**
   * 关闭弹框
   */
  closeDialog(index = 0) {
    window.$('.el-dialog__close').click()
  },
  /**
   * 比较结束日期大于开始日期
   * @param dateStr1: 开始日期
   * @param dateStr2: 结束日期
   * @returns {boolean}
   */
  compareDateByStareAndEnd(dateStr1, dateStr2) {
    if (dateStr1 === '' || dateStr2 === '') {
      return false
    }
    let date1 = this.initDateToBegin(new Date(dateStr1))
    let date2 = this.initDateToBegin(new Date(dateStr2))
    let timeStamp1 = new Date(date1).getTime()
    let timeStamp2 = new Date(date2).getTime()
    if (timeStamp2 < timeStamp1) {
      return false
    } else {
      return true
    }
  },
  initDateToBegin(date) {
    date.setHours(0)
    date.setMinutes(0)
    date.setSeconds(0)
    date.setMilliseconds(0)
    return date
  },
  /**
   * 比较两个日期间隔在一个月范围内
   * @param date1
   * @param date2
   * @returns {boolean}
   */
  compareDateWithOneMonth(date1, date2) {
    let _this = this
    if (date1 === "" || date2 === "") {
      return false
    }
    let oDate1 = _this.initDateToBegin(new Date(date1))
    let oDate2 = _this.initDateToBegin(new Date(date2))
    // console.error(oDate1)
    // console.error(oDate2)
    let timeStrap = (oDate2.getTime() - oDate1.getTime()) / 1000
    // 获取开始时间的月分
    let days = parseInt(_this.getDaysInMonth(oDate2.getYear(), oDate2.getMonth() + 1))
    if (timeStrap > (days - 1) * 24 * 3600) {
      return false
    } else {
      return true
    }
  },
  compareDateWithThreeMonth(date1, date2) {
    let _this = this
    if (date1 === "" || date2 === "") {
      return false
    }
    let oDate1 = new Date(date1)
    oDate1.setHours(0)
    oDate1.setMinutes(0)
    oDate1.setSeconds(0)
    oDate1.setMilliseconds(0)
    let oDate2 = new Date(date2)
    oDate2.setHours(0)
    oDate2.setMinutes(0)
    oDate2.setSeconds(0)
    oDate2.setMilliseconds(0)
    let timeStrap = (oDate2.getTime() - oDate1.getTime()) / 1000
    // 获取开始时间的月分
    console.log(_this.getDaysInMonth(oDate2.getYear(), oDate2.getMonth() + 1))
    let tMonthDays = parseInt(_this.getDaysInMonth(oDate2.getYear(), oDate2.getMonth() + 1))
    // let tMonth = oDate2.getMonth()
    // console.log(oDate2.setMonth(tMonth - 1))
    console.log(oDate2.getMonth())
    let preMonthDays = parseInt(_this.getDaysInMonth(oDate2.getYear(), oDate2.getMonth()))
    console.log(_this.getDaysInMonth(oDate2.getYear(), oDate2.getMonth()))
    let prepreMonthDays = parseInt(_this.getDaysInMonth(oDate2.getYear(), oDate2.getMonth() - 1))
    console.log(_this.getDaysInMonth(oDate2.getYear(), oDate2.getMonth() - 1))
    // console.log(timeStrap)
    // console.log((tMonthDays + preMonthDays + prepreMonthDays - 1) * 24 * 3600)
    if (timeStrap > (tMonthDays + preMonthDays + prepreMonthDays - 1) * 24 * 3600) {
      return false
    } else {
      return true
    }
  },
  getCurrMonthDatys(date) {
    if (date) {
      var curMonth = date.getMonth()
      /*  生成实际的月份: 由于curMonth会比实际月份小1, 故需加1 */
      date.setMonth(curMonth + 1)
      date.setDate(0)
      /* 返回当月的天数 */
      return date.getDate()
    }
  },
  getDaysInMonth(year, month) {
    month = parseInt(month, 10)
    var temp = new Date(year, month, 0)
    return temp.getDate()
  },
  /**
   * 限制小数格式方法
   * @param sourceValue     源数据
   * @param integerLength   整数长度
   * @param decimalLength   小数长度
   * @param type            类型：POSITIVE:positive正数, NEGATIVE:negative负数
   * * @param isCopy       是否为复制
   * @return 格式检验后的值
   */
  decimalCheck(sourceValue, integerLength, decimalLength, type, isCopy) {
    console.log(isCopy)
    sourceValue = sourceValue + ''
    if (type === 'POSITIVE') {
      // 正数
      if (sourceValue === '' || !sourceValue) {
        return 0
      } else {
        if (isCopy) {
          // 判断总长度
          // console.error(sourceValue)
          // console.error(isCopy)
          if (sourceValue.length > (integerLength + decimalLength + 1)) {
            return 0
          }
          // 判断小数点位数
          if (sourceValue.split('.').length > 2) {
            return 0
          }
          // 判断整数位数和小数位数
          if (sourceValue.split('.').length > 1) {
            if (sourceValue.split('.')[0].length > integerLength || sourceValue.split('.')[1].length > decimalLength) {
              return 0
            }
          }
          if (sourceValue.charAt(0) === '.' || sourceValue.charAt(sourceValue.length - 1) === '.') {
            return 0
          }
          if (sourceValue.length > 1) {
            if (sourceValue.charAt(0) === '0' && sourceValue.charAt(1) !== '.') {
              return 0
            }
          }
          let replaceValue = sourceValue.replace(/[^\d.]/g, '')
          if (replaceValue.length !== sourceValue.length) {
            return 0
          }
          return replaceValue
        } else {
          let replaceValue = sourceValue.replace(/[^\d.]/g, '')
          // console.log(replaceValue)
          if (replaceValue.charAt(0) === '.') {
            return 0
          }
          if (replaceValue.charAt(0) === '0') {
            // console.log(replaceValue.charAt(1))
            if (replaceValue.length > 1) {
              if (replaceValue.charAt(1) !== '.') {
                return replaceValue.charAt(1)
              }
            }
          }
          if (replaceValue.indexOf('.') === -1 && replaceValue.length > integerLength) {
            replaceValue = replaceValue.substring(0, integerLength)
          }
          // console.log(11)
          if (replaceValue.split('.').length > 2) {
            replaceValue = replaceValue.substring(0, replaceValue.length - 1)
          }
          // console.log(replaceValue)
          if (replaceValue.split('.').length > 1) {
            if (replaceValue.split('.')[1].length > decimalLength) {
              let index = replaceValue.indexOf('.')
              replaceValue = replaceValue.split('.')[0] + replaceValue.substring(index, decimalLength + index + 1)
            }
            if (replaceValue.split('.')[0].length > integerLength) {
              let index = replaceValue.indexOf('.')
              replaceValue = replaceValue.substring(0, integerLength) + replaceValue.substring(index, decimalLength + index + 1)
            }
          }
          // console.log(22)
          // console.log(replaceValue)
          return replaceValue !== '' ? replaceValue : 0
        }
      }
    } else if (type === 'NEGATIVE') {
      // 负数
      if (sourceValue === '' || !sourceValue) {
        return 0
      }
      if (isCopy) {
        if (sourceValue.charAt(0) !== '-') {
          return 0
        }
        if (sourceValue.split('-') > 2 || sourceValue.split('.') > 2) {
          return 0
        }
        if (sourceValue.length > (integerLength + decimalLength + 2)) {
          return 0
        }
        if (sourceValue.split('.').length > 1) {
          if (sourceValue.split('.')[0].length > (integerLength + 1)) {
            return 0
          }
          if (sourceValue.split('.')[1].length > decimalLength) {
            return 0
          }
        }
        let replaceValue = sourceValue.replace(/[^\d.-]/g, '')
        if (replaceValue.length !== sourceValue.length) {
          return 0
        }
        return replaceValue
      } else {
        let replaceValue = sourceValue.replace(/[^\d.-]/g, '')
        // if (replaceValue.charAt(0) !== '-') {
        //   return ''
        // }
        if (replaceValue.length === 1) {
          if (replaceValue.charAt(0) !== '0' || replaceValue.charAt(0) !== '-') {
            return 0
          }
        }
        if (replaceValue.length > 1) {
          if (replaceValue.charAt(0) === '0') {
            if (replaceValue.charAt(1) !== '-') {
              return 0
            } else {
              return '-'
            }
          } else if (replaceValue.charAt(0) === '-') {
            if (replaceValue.charAt(1) === '.' || replaceValue.charAt(1) === '-') {
              return '-'
            }
          } else {
            return 0
          }
        }
        if (replaceValue.length > 2) {
          if (replaceValue.charAt(1) === '0' && replaceValue.charAt(2) !== '.') {
            return '-0'
          }
        }
        if (replaceValue.indexOf('.') === -1 && replaceValue.length > (integerLength + 1)) {
          replaceValue = replaceValue.substring(0, (integerLength + 1))
        }
        if (replaceValue.split('.').length > 2) {
          replaceValue = replaceValue.substring(0, replaceValue.length - 1)
        }
        if (replaceValue.split('-').length > 2) {
          replaceValue = replaceValue.substring(0, replaceValue.length - 1)
        }
        if (replaceValue.split('.').length > 1) {
          if (replaceValue.split('.')[1].length > decimalLength) {
            let index = replaceValue.indexOf('.')
            replaceValue = replaceValue.split('.')[0] + replaceValue.substring(index, decimalLength + index + 1)
          }
          if (replaceValue.split('.')[0].length > integerLength) {
            let index = replaceValue.indexOf('.')
            replaceValue = replaceValue.substring(0, integerLength) + replaceValue.substring(index, decimalLength + index + 1)
          }
        }
        return replaceValue
      }
    }
    // if (sourceValue === '' || !sourceValue) {
    //   return ''
    // } else {
    //   // 格式限制后的数据
    //   let replaceValue = ''
    //   // 判断类型
    //   if (type === 'NEGATIVE') {
    //     // 负数
    //     replaceValue = sourceValue.replace(/[^\d.-]/g, '')
    //     // 负数类型 首字符必须为负数
    //     if (replaceValue.charAt(0) !== '-') {
    //       return ''
    //     }
    //     // 首字符为负数后  其它字符不能负数
    //     if (replaceValue.charAt(0) === '-') {
    //       replaceValue = '-' + replaceValue.substring(1, replaceValue.length).replace(/[^\d.]/g, '')
    //     }
    //     // 第二个字符不可以为小数点 .
    //     if (replaceValue.charAt(1) === '.') {
    //       return ''
    //     }
    //     // 如果第二个字符为'0' 则第三个字符必须为小数点
    //     if (replaceValue.charAt(1) === '0' && replaceValue.charAt(2) !== '.') {
    //       return ''
    //     }
    //     // if
    //   } else {
    //     replaceValue = sourceValue.replace(/[^\d.]/g, '')
    //   }
    //   if (replaceValue.length > 0) {
    //     // 首字符不能为小数点
    //     if (replaceValue.charAt(0) === '.') {
    //       replaceValue = ''
    //     }
    //     // 当首字符为0时后面必须跟小数点
    //     if (replaceValue.charAt(0) === '0' && replaceValue.charAt(1) !== '.') {
    //       replaceValue = '0'
    //     }
    //     // 处理负数情况
    //     if (replaceValue.charAt(0) === '-' && (replaceValue.charAt(1) === '.' || replaceValue.charAt(1) === '-')) {
    //       replaceValue = '-'
    //     }
    //     // 处理小数位数
    //     let decimalCount = replaceValue.split('.').length - 1
    //     if (decimalCount > 1) {
    //       let index = replaceValue.indexOf('.')
    //       let index1 = replaceValue.indexOf('.', (index + 1))
    //       replaceValue = replaceValue.substring(0, index1)
    //     } else if (decimalCount === 1) {
    //       let index = replaceValue.indexOf('.')
    //       if (replaceValue.length - index > (decimalLength + 1)) {
    //         replaceValue = (replaceValue.substring(0, (index + decimalLength + 1)))
    //       }
    //       // 检验此时整数位长度
    //       var integerStr = replaceValue.split('.')[0]
    //       if (integerLength !== null) {
    //         if (integerStr.length > integerLength) {
    //           replaceValue = replaceValue.substring(0, integerLength) + replaceValue.substring((integerLength + 1), replaceValue.length)
    //         }
    //       }
    //     } else {
    //       // 处理整数长度
    //       if (integerLength != null) {
    //         if (replaceValue.length > integerLength) {
    //           replaceValue = (replaceValue.substring(0, integerLength))
    //         }
    //       }
    //     }
    //     // 处理负数的情况
    //     var negativeCount = replaceValue.split('-').length - 1;
    //     if (negativeCount > 1) {
    //       var index = negativeCount.indexOf('-')
    //       var index1 = negativeCount.indexOf('-', (index + 1))
    //       replaceValue = replaceValue.substring(0, index1)
    //     }
    //   }
    //   return replaceValue
    // }
  },
  /**
   * 限制整数格式方法
   * @param sourceValue  源数据
   * @param length       整数长度
   * @param type         类型：POSITIVE:positive正数, NEGATIVE:negative负数
   * @param isCopy       是否为复制
   * @return 格式检验后的值
   */
  integerCheck(value, length, type, isCopy) {
    console.log(123)
    let sourceValue = value
    if (sourceValue === '' || !sourceValue) {
      if (type === 'NEGATIVE') {
        return ''
      } else {
        return 0
      }
    } else {
      let replaceValue = ''
      if (type === 'NEGATIVE') {
        // 负数
        if (isCopy) {
          // todo
          if (sourceValue.length > length + 1) {
            return ''
          }
          replaceValue = sourceValue.replace(/[^\d-]/g, '')
          if (replaceValue.charAt(0) !== '-') {
            return ''
          }
          if (replaceValue.split('-').length > 2) {
            return ''
          }
          if (replaceValue.length !== sourceValue.length) {
            return ''
          }
          if (replaceValue.length > 1 && replaceValue.charAt(1) === '0') {
            return ''
          }
        } else {
          replaceValue = sourceValue.replace(/[^\d-]/g, '')
          if (replaceValue.charAt(0) !== '-') {
            return ''
          }
          if (replaceValue.charAt(0) === '-') {
            replaceValue = '-' + replaceValue.substring(1, replaceValue.length).replace(/[^\d]/g, '')
          }
          if (length !== null) {
            replaceValue = replaceValue.substring(0, length + 1)
          }
        }
      } else {
        if (isCopy) {
          if (sourceValue.length > length) {
            return 0
          }
          replaceValue = sourceValue.replace(/[^\d]/g, '')
          if (replaceValue.length !== sourceValue.length) {
            return 0
          }
          if (replaceValue.length > 1 && replaceValue.charAt(0) === '0') {
            return 0
          }
        } else {
          replaceValue = sourceValue.replace(/[^\d]/g, '')
          replaceValue = replaceValue !== '' ? parseInt(replaceValue) : 0
          if (length !== null) {
            replaceValue = (replaceValue + '').substring(0, length)
          }
        }
      }
      return replaceValue
    }
  },
  // map转换为list，里面是json串
  mapToList(map) {
    var list = []
    for (var item in map) {
      if (item !== '') {
        var json = {}
        json.value = item
        json.label = map[item]
        list.push(json)
      }
    }
    return list
  },
  // 校验密码强度的方法
  checkPass(pass) {
    console.log(pass.indexOf(' '))
    if (pass.indexOf(' ') !== -1) {
      return -1
    }
    if (pass.length < 8) {
      return 0
    }
    let ls = 0
    if (pass.match(/([a-z])+/)) {
      ls++
    }
    if (pass.match(/([0-9])+/)) {
      ls++
    }
    if (pass.match(/([A-Z])+/)) {
      ls++
    }
    if (pass.match(/[^a-zA-Z0-9]+/)) {
      ls++
    }
    return ls
  },
  // 金额数字转成中文大写
  changeNumMoneyToChinese(money) {
    let cnNums = ["零", "壹", "贰", "叁", "肆", "伍", "陆", "柒", "捌", "玖"] // 汉字的数字
    let cnIntRadice = ["", "拾", "佰", "仟"] // 基本单位
    let cnIntUnits = ["", "万", "亿", "兆"] // 对应整数部分扩展单位
    let cnDecUnits = ["角", "分", "毫", "厘"] // 对应小数部分单位
    let cnInteger = "整" // 整数金额时后面跟的字符
    let cnIntLast = "元" // 整型完以后的单位
    let maxNum = 999999999999999.9999 // 最大处理的数字
    let IntegerNum // 金额整数部分
    let DecimalNum // 金额小数部分
    let ChineseStr = "" // 输出的中文金额字符串
    let parts // 分离金额后用的数组，预定义
    if (money === "") {
      return ""
    }
    console.log('11')
    let moneyStr = money + ''
    console.log(moneyStr)
    let firstStr = moneyStr.substring(0, 1)
    console.log(firstStr)
    if (firstStr === '-') {
      ChineseStr = '负'
      console.log('22')
      money = (money + '').substring(1)
      console.log('33')
    }
    money = parseFloat(money)
    if (money >= maxNum) {
      alert('超出最大处理数字')
      return ""
    }
    if (money === 0) {
      ChineseStr = cnNums[0] + cnIntLast + cnInteger
      return ChineseStr
    }
    money = money.toString() // 转换为字符串
    if (money.indexOf(".") === -1) {
      IntegerNum = money
      DecimalNum = ''
    } else {
      parts = money.split(".")
      IntegerNum = parts[0]
      DecimalNum = parts[1].substr(0, 4)
    }
    if (parseInt(IntegerNum, 10) > 0) { // 获取整型部分转换
      let zeroCount = 0
      let IntLen = IntegerNum.length
      for (let i = 0; i < IntLen; i++) {
        let n = IntegerNum.substr(i, 1)
        let p = IntLen - i - 1
        let q = p / 4
        let m = p % 4
        if (n === "0") {
          zeroCount++
        } else {
          if (zeroCount > 0) {
            ChineseStr += cnNums[0]
          }
          zeroCount = 0 // 归零
          ChineseStr += cnNums[parseInt(n)] + cnIntRadice[m]
        }
        if (m === 0 && zeroCount < 4) {
          ChineseStr += cnIntUnits[q]
        }
      }
      ChineseStr += cnIntLast
      // 整型部分处理完毕
    }
    if (DecimalNum !== '') { // 小数部分
      let decLen = DecimalNum.length
      for (let i = 0; i < decLen; i++) {
        let n = DecimalNum.substr(i, 1)
        if (n !== '0') {
          ChineseStr += cnNums[Number(n)] + cnDecUnits[i]
        }
      }
    }
    if (ChineseStr === '') {
      ChineseStr += cnNums[0] + cnIntLast + cnInteger
    } else if (DecimalNum === '') {
      ChineseStr += cnInteger
    }
    return ChineseStr
  }
}

// window.$ = utils.getDomUtil

window.utils = utils

for (const key in utils) {
  // 全局化函数...
  Vue.prototype[key] = utils[key]
}
