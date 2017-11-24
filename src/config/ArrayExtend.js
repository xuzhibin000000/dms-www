/**
 * 原生数组函数扩展
 * author : liao jiabing
 * QQ : 656317441
 * email : admin@w3c.top
 */
/**
 * 清空数组
 * @returns {Array}
 */
Array.prototype.clear = function () {
  for (let i = this.length; i >= 0; i--) {
    this.splice(i, 1)
  }
  return this
}

/**
 * 返回item中数组中的位置
 * @param item
 * @returns {number}
 */
Array.prototype.indexOf = function (item) {
  if (this.length === 0) return -1
  for (var i = 0, len = this.length; i < len; i++) {
    if (this[i] === item) {
      return i
    }
  }
  return -1
}

Array.prototype.removeIndex = function (index) {
  this.splice(index, 1)
}

/**
 * 判断是否存在指定元素
 * @param item
 * @returns {boolean}
 */
Array.prototype.exists = function (item) {
  return item === null ? false : this.indexOf(item) !== -1
}

/**
 * 获取数组中第一个元素
 * @returns {null}
 */
Array.prototype.first = function () {
  return this.length === 0 ? null : this[0]
}

/**
 * 获取数组最后一个元素
 * @returns {null}
 */
Array.prototype.last = function () {
  return this.length === 0 ? null : this[this.length - 1]
}

/**
 * 克隆一个数组
 * @returns {Array.<T>}
 */
Array.prototype.clone = function () {
  return this.slice(0)
}

/**
 * 删除指定元素
 * @param item
 * @returns {*}
 */
Array.prototype.remove = function (item) {
  var itemIndex = this.indexOf(item)
  if (itemIndex >= 0) {
    this.splice(itemIndex, 1)
    return itemIndex
  }
  return -1
}

/**
 * 删除多个元素
 * @param arr
 */
Array.prototype.removeAll = function (...items) {
  for (var i = 0, len = items.length; i < len; i++) {
    this.remove(items[i])
  }
  return this
}

Array.prototype.add = function (...arr) {
  for (var i = 0, len = arr.length; i < len; i++) {
    this.push(arr[i])
  }
  return this
}

/**
 * 添加多个元素
 * @param arr
 */
Array.prototype.addAll = function (arr) {
  for (var i = 0, len = arr.length; i < len; i++) {
    this.push(arr[i])
  }
  return this
}

/**
 * 获取数组大小
 */
Array.prototype.size = function () {
  return this.length
}

/**
 * 数组去重
 */
Array.prototype.unique = function () {
  this.sort()
  var re = [this[0]]
  for (var i = 1; i < this.length; i++) {
    if (this[i] !== re[re.length - 1]) {
      re.push(this[i])
    }
  }
  return re
}

/**
 * 数字数组由小到大排序
 */
Array.prototype.min2Max = function () {
  var oValue
  for (var i = 0; i < this.length; i++) {
    for (var j = 0; j <= i; j++) {
      if (this[i] < this[j]) {
        oValue = this[i]
        this[i] = this[j]
        this[j] = oValue
      }
    }
  }
  return this
}

/**
 * 数字数组由大到小排序
 */
Array.prototype.max2Min = function () {
  var oValue
  for (var i = 0; i < this.length; i++) {
    for (var j = 0; j <= i; j++) {
      if (this[i] > this[j]) {
        oValue = this[i]
        this[i] = this[j]
        this[j] = oValue
      }
    }
  }
  return this
}

/**
 * 获得数字数组中最大项
 */
Array.prototype.getMax = function () {
  var oValue = 0
  for (var i = 0; i < this.length; i++) {
    if (this[i] > oValue) {
      oValue = this[i]
    }
  }
  return oValue
}

/**
 * 获得数字数组中最小项
 */
Array.prototype.getMin = function () {
  var oValue = 0
  for (var i = 0; i < this.length; i++) {
    if (this[i] < oValue) {
      oValue = this[i]
    }
  }
  return oValue
}

/**
 * 在数组的指定位置加元素
 */
Array.prototype.insert = function (index, item) {
  this.splice(index, 0, item)
}
