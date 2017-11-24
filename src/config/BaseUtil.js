export default {
  // 去除空格  type 1-所有空格  2-前后空格  3-前空格 4-后空格
  trim (str, type) {
    switch (type) {
      case 1: return str.replace(/\s+/g, "")
      case 2: return str.replace(/(^\s*)|(\s*$)/g, "")
      case 3: return str.replace(/(^\s*)/g, "")
      case 4: return str.replace(/(\s*$)/g, "")
      default: return str
    }
  },
  /* type
    1: 首字母大写   
    2：首字母小写
    3：大小写转换
    4：全部大写
    5：全部小写
   * */
  // changeCase('asdasd',1)
  // Asdasd
  changeCase (str, type) {
    function ToggleCase (str) {
      var itemText = ""
      str.split("").forEach(
        function (item) {
          if (/^([a-z]+)/.test(item)) {
            itemText += item.toUpperCase()
          }
          else if (/^([A-Z]+)/.test(item)) {
            itemText += item.toLowerCase()
          }
          else{
            itemText += item
          }
        }
      )
      return itemText
    }
    switch (type) {
      case 1:
        return str.replace(/^(\w)(\w+)/, function (v, v1, v2) {
          return v1.toUpperCase() + v2.toLowerCase()
        })
      case 2:
        return str.replace(/^(\w)(\w+)/, function (v, v1, v2) {
          return v1.toLowerCase() + v2.toUpperCase()
        })
      case 3:
        return ToggleCase(str)
      case 4:
        return str.toUpperCase()
      case 5:
        return str.toLowerCase()
      default:
        return str
    }
  },
  // repeatStr(str->字符串, count->次数)
  // repeatStr('123',3)
  // "123123123"
  repeatStr (str, count) {
    var text = ''
    for (var i = 0; i < count; i++) {
      text += str
    }
    return text
  },
  // 字符串替换(字符串,要替换的字符,替换成什么)
  replaceAll (str, AFindText, ARepText){
　　raRegExp = new RegExp(AFindText, "g")
　　return str.replace(raRegExp, ARepText)
  },
  // replaceStr(字符串,字符格式, 替换方式,替换的字符（默认*）)
  replaceStr (str, regArr, type, ARepText) {
    var regtext = ''
    let Reg = null
    let replaceText = ARepText || '*'
    // replaceStr('18819322663',[3,5,3],0)
    // 188*****663
    // repeatStr是在上面定义过的（字符串循环复制），大家注意哦
    if (regArr.length === 3 && type === 0) {
      regtext = '(\\w{' + regArr[0] + '})\\w{' + regArr[1] + '}(\\w{' + regArr[2] + '})'
      Reg = new RegExp(regtext)
      var replaceCount = this.repeatStr(replaceText, regArr[1])
      return str.replace(Reg, '$1' + replaceCount + '$2')
    } else if (regArr.length === 3 && type === 1) {
      // replaceStr('asdasdasdaa',[3,5,3],1)
      // ***asdas***
      regtext = '\\w{' + regArr[0] + '}(\\w{' + regArr[1] + '})\\w{' + regArr[2] + '}'
      Reg = new RegExp(regtext)
      var replaceCount1 = repeatSte(replaceText, regArr[0])
      var replaceCount2 = repeatSte(replaceText, regArr[2])
      return str.replace(Reg, replaceCount1 + '$1' + replaceCount2)
    } else if (regArr.length === 1 && type == 0) {
      // replaceStr('1asd88465asdwqe3',[5],0)
      // *****8465asdwqe3
      regtext = '(^\\w{' + regArr[0] +  '})'
      Reg = new RegExp(regtext)
      var replaceCount = repeatSte(replaceText, regArr[0])
      return str.replace(Reg, replaceCount)
    } else if (regArr.length === 1 && type == 1) {
      // replaceStr('1asd88465asdwqe3',[5],1,'+')
      // "1asd88465as+++++"
      regtext = '(\\w{' + regArr[0] +  '}$)'
      Reg = new RegExp(regtext)
      var replaceCount = repeatSte(replaceText, regArr[0])
      return str.replace(Reg, replaceCount)
    }
  },
  // checkType('165226226326','phone')
  // false
  // 大家可以根据需要扩展
  checkType (str, type) {
    switch (type) {
      case 'email':
        return /^[\w-]+(\.[\w-]+)*@[\w-]+(\.[\w-]+)+$/.test(str)
      case 'phone':
        return /^1[3|4|5|7|8][0-9]{9}$/.test(str)
      case 'tel':
        return /^(0\d{2,3}-\d{7,8})(-\d{1,4})?$/.test(str)
      case 'number':
        return /^[0-9]$/.test(str)
      case 'english':
        return /^[a-zA-Z]+$/.test(str)
      case 'chinese':
        return /^[\u4E00-\u9FA5]+$/.test(str)
      case 'lower':
        return /^[a-z]+$/.test(str)
      case 'upper':
        return /^[A-Z]+$/.test(str)
      default :
        return true
    }
  },
  // checkPwd('12asdASAD')
  // 3(强度等级为3)
  checkPwd (str) {
    var nowLv = 0
    if (str.length < 6) {
      return nowLv
    }
    if (/[0-9]/.test(str)) {
      nowLv++
    }
    if (/[a-z]/.test(str)) {
      nowLv++
    }
    if (/[A-Z]/.test(str)) {
      nowLv++
    }
    if (/[\.|-|_]/.test(str)) {
      nowLv++
    }
    return nowLv
  },
  //count取值范围0-36
  //randomNumber(10)
  //"2584316588472575"
  //randomNumber(14)
  //"9b405070dd00122640c192caab84537"
  //Math.random().toString(36).substring(2)
  //"83vhdx10rmjkyb9"
  randomNumber (count) {
     return Math.random().toString(count).substring(2)
  },
  // var strTest='sad44654blog5a1sd67as9dablog4s5d16zxc4sdweasjkblogwqepaskdkblogahseiuadbhjcibloguyeajzxkcabloguyiwezxc967'
  // countStr(strTest,'blog')
  // 6
  countStr (str, strSplit) {
    return str.split(strSplit).length - 1
  },
  // 数组顺序打乱
  upsetArr (arr) {
    return arr.sort(function(){ return Math.random() - 0.5})
  },
  // 数组最大值最小值
  // 这一块的封装，主要是针对数字类型的数组
  maxArr (arr) {
    return Math.max.apply(null, arr)
  },
  minArr (arr) {
    return Math.min.apply(null, arr)
  },
  // 求和
  sumArr (arr) {
    var sumText = 0
    for (var i = 0, len = arr.length; i < len; i++) {
      sumText += arr[i]
    }
    return sumText
  },
  // 平均值,小数点可能会有很多位，这里不做处理，处理了使用就不灵活了！
  covArr (arr) {
    var sumText = sumArr(arr)
    var covText = sumText / length
    return covText
  },
  // 从数组中随机获取元素
  // randomOne([1,2,3,6,8,5,4,2,6])
  // 2
  // randomOne([1,2,3,6,8,5,4,2,6])
  // 8
  randomOne (arr) {
    return arr[Math.floor(Math.random() * arr.length)]
  },
  // 返回数组（字符串）一个元素出现的次数
  // getEleCount('asd56+asdasdwqe','a')
  // 3
  getEleCount (obj, ele) {
    var num = 0
    for (var i = 0, len = obj.length; i < len; i++) {
      if (ele == obj[i]) {
        num++
      }
    }
    return num
  }
}
