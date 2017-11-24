/**
 * 对string类型原型扩展
 * author : liao jiabing
 * QQ : 656317441
 * email : admin@w3c.top
 */
import BASE64 from '@/config/base64.js'
// 支持字符串 format 方法  str='hello{0}'.format('world');
String.prototype.format = function() {
  var args = arguments
  return this.replace(/\{(\d+)\}/g, function(m, i) {
    return args[i]
  })
}

// 替换字符串中所有指定字符
String.prototype.replaceAll = function(arg1, arg2) {
  let count = this.split(arg1).length - 1
  let str = this
  for (let i = 0; i < count; i++) {
    str = str.replace(arg1, arg2)
  }
  return str
}

// 判断字符串是否为Null或者为空字符串。
// 为 空 则返回 true，否则返回false
String.prototype.isNullOrEmpty = function() {
  return this === undefined || this === null || this === ''
}

// 时间戳转日期字符串
String.prototype.timeToDate = function(regx) {
  let str = this.toInt()
  return new Date(str).format(regx)
}

// 判断字符串是否为Null或者为空字符串或者全是空格。
// 为 空 或者全部是空格 则返回 true，否则返回false
String.prototype.isNullOrWhiteSpace = function() {
  return this.isNullOrEmpty() || this.trim().isNullOrEmpty()
}

// 判断字符串是否包含指定的内容。val :指定内容
// 包含指定内容， 则返回 true，否则返回false
String.prototype.isContains = function(val) {
  return this.indexOf(val) > -1
}

// 返回字符串，返回反转后副本，并不改变原有的字符串。
String.prototype.reverse = function() {
  var chars = []
  for (var i = this.length - 1; i > -1; i--) {
    chars.push(this[i])
  }
  return chars.join('')
}

// 去除字符串左边的空格，返回处理后副本，并不改变原有的字符串。
String.prototype.ltrim = function() {
  return this.replace(/(^\s*)/g, '')
}

// 去除字符串右边的空格，返回处理后副本，并不改变原有的字符串。
String.prototype.rtrim = function() {
  return this.replace(/(\s*$)/g, '')
}

// 判断字符串是否以指定内容开头
// 以指定内容开头， 则返回 true，否则返回false
String.prototype.startsWith = function() {
  return this.substr(0, arguments[0].length) === arguments[0]
}

// 判断字符串是否以指定内容结尾
// 以指定内容结尾， 则返回 true，否则返回false
String.prototype.endsWith = function() {
  return this.substr(this.length - arguments[0].length) === arguments[0]
}

// 判断字符串是否是长日期，例如：2017-3-21 18:05:19
// 是 长日期， 则返回 true，否则返回false
String.prototype.isLongDate = function() {
  var r = this.replace(/(^\s*)|(\s*$)/g, '').match(/^(\d{1,4})(-|\/)(\d{1,2})\2(\d{1,2}) (\d{1,2}):(\d{1,2}):(\d{1,2})$/)
  if (r === null) {
    return false
  }
  var d = new Date(r[1], r[3] - 1, r[4], r[5], r[6], r[7])
  return (d.getFullYear() === r[1] && (d.getMonth() + 1) === r[3] && d.getDate() === r[4] && d.getHours() === r[5] && d.getMinutes() === r[6] && d.getSeconds() === r[7])
}

// 判断字符串是否是短日期，例如：2017-3-21
// 是 短日期， 则返回 true，否则返回false
String.prototype.isShortDate = function() {
  var r = this.replace(/(^\s*)|(\s*$)/g, '').match(/^(\d{1,4})(-|\/)(\d{1,2})\2(\d{1,2})$/)
  if (r === null) {
    return false
  }
  var d = new Date(r[1], r[3] - 1, r[4])
  return (d.getFullYear() === r[1] && (d.getMonth() + 1) === r[3] && d.getDate() === r[4])
}

// 判断字符串是否是日期，例如：2017-3-21
// 是 日期， 则返回 true，否则返回false
String.prototype.isDate = function() {
  return this.isShortDate() || this.isLongDate()
}

// 判断字符串是否是电话/传真号码
// 是 电话/传真号码， 则返回 true，否则返回false
String.prototype.isTelOrFax = function() {
  return this.isNullOrEmpty() ? false : /^((\(\d{2,3}\))|(\d{3}\-))?(\(0\d{2,3}\)|0\d{2,3}-)?[1-9]\d{6,7}(\-\d{1,4})?$/i.test(this)
}

// 判断字符串是否是手机号码
// 是 手机号码， 则返回 true，否则返回false
String.prototype.isMobile = function() {
  return this.isNullOrEmpty() ? false : /^(13|14|15|17|18)\d{9}$/i.test(this)
}

// 判断字符串是否是电子邮箱
// 是 则返回 true，否则返回false
String.prototype.isEmail = function() {
  return this.isNullOrEmpty() ? false : /^((([a-z]|\d|[!#\$%&'\*\+\-\/=\?\^_`{\|}~]|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])+(\.([a-z]|\d|[!#\$%&'\*\+\-\/=\?\^_`{\|}~]|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])+)*)|((\x22)((((\x20|\x09)*(\x0d\x0a))?(\x20|\x09)+)?(([\x01-\x08\x0b\x0c\x0e-\x1f\x7f]|\x21|[\x23-\x5b]|[\x5d-\x7e]|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])|(\\([\x01-\x09\x0b\x0c\x0d-\x7f]|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF]))))*(((\x20|\x09)*(\x0d\x0a))?(\x20|\x09)+)?(\x22)))@((([a-z]|\d|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])|(([a-z]|\d|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])([a-z]|\d|-|\.|_|~|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])*([a-z]|\d|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])))\.)+(([a-z]|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])|(([a-z]|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])([a-z]|\d|-|\.|_|~|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])*([a-z]|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])))\.?$/i.test(this)
}

// 判断字符串是否是邮编
// 是 邮编， 则返回 true，否则返回false
String.prototype.isZip = function() {
  return this.isNullOrEmpty() ? false : /^[\d]{6}$/.test(this)
}

String.prototype.isQQ = function() {
  return this.isNullOrEmpty() ? false : /^[1-9]\d{5,11}$/i.test(this)
}

// 判断字符串是否存在汉字。
// 存在汉字， 则返回 true，否则返回false
String.prototype.isExistChinese = function() {
  return this.isNullOrEmpty() ? false : !/^[\x00-\xff]*$/.test(this)
}

// 判断字符串是否全是汉字。
// 全是汉字， 则返回 true，否则返回false
String.prototype.isChinese = function() {
  return this.isNullOrEmpty() ? false : /^[\u0391-\uFFE5]+$/i.test(this)
}

// 判断字符串是否全是字母。
// 全是字母， 则返回 true，否则返回false
String.prototype.isAbc = function() {
  return this.isNullOrEmpty() ? false : /^[A-Za-z]+$/i.test(this)
}

// 将字符串日期转换成日期类型
// 转换成功则返回对应的时间，失败则返回null
String.prototype.toDate = function() {
  try {
    // 切割年月日与时分秒称为数组
    var s = this.split(' ')
    var s1 = s[0].split('-')
    var s2 = s[1].split(':')
    if (s2.length === 2) {
      s2.push('00')
    }
    // return出一个新创建的Date对象
    return new Date(s1[0], s1[1] - 1, s1[2], s2[0], s2[1], s2[2])
  } catch (e) {
    return null
  }
}

// 将字符串转换成对应的bool值
// 转换成功则返回对应的bool值，失败则返回false
String.prototype.toBool = function() {
  var str = this.isNullOrEmpty() ? false : this.toLowerCase()
  str = str.trim()
  return str === 'true' || str === 'yes' || str === 'y' || str === 't' || str === '1' || str === '是'
}

// 将字符串转换成对应的int
// 转换成功则返回对应的int,失败返回NaN
String.prototype.toInt = function() {
  return isNaN(parseInt(this)) ? NaN : parseInt(this)
}

// 将字符串转换成对应的Double
// 转换成功则返回对应的Double，失败返回NaN
String.prototype.toDouble = function() {
  return isNaN(parseFloat(this)) ? NaN : parseFloat(this)
}

// 将字符串转换成对应的json对象
// 转换成功则返回对应的json，失败则返回null
String.prototype.toJson = function() {
  try {
    // 标准JSON格式数据
    return JSON.parse(this)
  } catch (e) {
    // 打印栈轨迹
    console.trace()
    // 抛出异常
    throw new Error('JSON对象转换失败')
  }
}

/**
 * 字符串对象新功能，去除字符串两端的空格
 */
String.prototype.trim = function() {
  var start, end
  start = 0
  end = this.length - 1
  while (start <= end && this.charAt(start) === ' ') {
    start++
  }
  while (start <= end && this.charAt(end) === ' ') {
    end--
  }
  return this.substring(start, end + 1)
}

/**
 * 字符串新功能，添加一个将字符串转成字符数组
 * 返回一个数组
 */
String.prototype.toCharArray = function() {
  // 定义一个数组
  var chs = []
  // 将字符串中的每一位字符存储到字符数组中
  for (var x = 0; x < this.length; x++) {
    chs[x] = this.charAt(x)
  }
  return chs
}

/**
 * 保留数字
 */
String.prototype.getNum = function() {
  var regEx = /[^\d]/g
  return this.replace(regEx, '')
}

/**
 * 保留中文
 */
String.prototype.getCN = function() {
  var regEx = /[^\u4e00-\u9fa5\uf900-\ufa2d]/g
  return this.replace(regEx, '')
}
/**
 * 将字符串转换为base64,不改变原字符串
 * @return {[type]} [description]
 */
String.prototype.toBase64 = function() {
  var __this = this
  return BASE64.base64(__this)
}
/**
 * 将base64编码的字符串解码
 * @return {[type]} [description]
 */
String.prototype.base64decode = function() {
  var __this = this
  return BASE64.base64decode(__this)
}
