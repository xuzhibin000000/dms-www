<template>
  <div class='select-bar-box app-ml10'>
    <div class="left app-fl height24 app-tr" @click='next' style="width: 14px;">
      <i class='iconfont icon-you'></i>
    </div>
    <div class="center app-fl height24 app-oh" :style='getCenterStyle'>
      <ul ref='select-bar-box' style='margin-left: 0;transition: all .3s' class='select-bar-ul'>
        <li v-for='item in data.list' @click='selectBarClick' :style='getLiStyle'>
          {{item.text}}
          <span v-show='false'>{{item.code}}</span>
        </li>
      </ul>
    </div>
    <div class="right app-fl height24 app-tl" @click='prev' style="width: 14px;">
      <i class='iconfont icon-xia'></i>
    </div>
  </div>
</template>

<script>
  export default {
    data() {
      return {
        // width: this.data.config.width || 60
      }
    },
    props: {
      data: {
        default: {}
      }
    },
    computed: {
      width() {
        if (this.data.width === null || this.data.width === undefined) {
          return 60
        }
        return this.data.width
      },
      getLiStyle() {
        return `width: ${this.width}px;`
      },
      getCenterStyle() {
        let width = this.width
        let size = width * this.data.size
        return 'width: ' + (size) + 'px'
      }
    },
    mounted() {
      this.data.selectBar = this.selectBar
    },
    watch: {
      data(val) {
        val.selectBar = this.selectBar
      }
    },
    methods: {
      selectBarClick(e) {
        e = e || window.event
        let target = e.target
        // 先决否定！
        if (target === null || target === undefined) return
        this.toArray(target.parentElement.children).forEach(e => {
          e.classList.remove('active')
        })
        target.classList.add('active')
        // ========业务处理请写在以下函数中==========
        this.selectBarClickTool(window.$(target.querySelector('span')).text())
      },
      selectBarGogo(index = 0) {
        this.toArray(this.$refs['select-bar-box'].children).forEach((e, i) => {
          if (i === index) e.classList.add('active')
          else e.classList.remove('active')
        })
      },
      selectBar(code) {
        let _this = this
        for (let i = 0; i < _this.data.list.length; i++) {
          let temp = _this.data.list[i]
          if (code === temp.code) {
            let item = _this.$refs['select-bar-box']
            console.debug(item.children[i])
            let target = item.children[i]
            this.toArray(target.parentElement.children).forEach(e => {
              e.classList.remove('active')
            })
            target.classList.add('active')
            return
          }
        }
      },
      selectBarClickTool(val) {
        this.data.click(val)
        // this.date = val
        // let _this = this
        // console.log(val)
        // 发送请求
        // let requestJson = _this.getRequestJson()
        // requestJson.currPage = 1
        // requestJson.pageSize = _this.tableData.config.pageSize
        // requestJson.demandArrivalDate = val
        // _this.http.post(preparedSchedualOrderSearch, requestJson, '.result-table').then(data => {
        //   _this.handleData(data, requestJson)
        // })
      },
      prev() {
        // console.log(this.$refs['select-bar-box']) 1014
        let width = this.width
        let size = width * this.data.size
        let selectBarBox = this.$refs['select-bar-box']
        let left = selectBarBox.style.marginLeft.toInt() || 0
        let max = window.Math.floor(selectBarBox.children.length / (size / width)) * size
        // let max = length * 78
        if (left >= max) return
        // console.log(max + " : " + window.Math.abs(left - 2000))
        if (window.Math.abs(left) >= max) {
          selectBarBox.style.marginLeft = `-${max}px`
          return
        }
        selectBarBox.style.transition = 'all .3s'
        selectBarBox.style.marginLeft = left - size + "px"
        // selectBarBox.style.width = size + (24 << 1) - 10 + 'px'
        // console.log(left)
      },
      next() {
        let width = this.width
        let size = width * this.data.size
        let selectBarBox = this.$refs['select-bar-box']
        let left = selectBarBox.style.marginLeft.toInt() || 0
        // console.log(left)
        if (left >= 0) {
          selectBarBox.style.marginLeft = 0
          return
        }
        selectBarBox.style.transition = 'all .3s'
        selectBarBox.style.marginLeft = left + size + "px"
        // selectBarBox.style.width = size + (24 << 1) - 10 + 'px'
        // console.log(selectBarBox)
      }
    }
  }
</script>

<style lang='less' scoped>
  .height24{
    height: 24px;
    line-height: 24px;
  }
  .select-bar-box{
    float: left;
    // width: 984px;
    // background: #000;
    div{
      float: left;
    }
    .select-bar-ul{
      width: 1000%;
      li{
        text-align: center;
        cursor: pointer;
      }
      .active{
        background: #089F48;
        border-radius: 3px;
        color: #FFF;
      }
    }
    // transition: all .5s;
    .left i,.right i{
      color: #089F48;
      font-size: 12px;
    }
    .center{
      width: 945px;
      ul{
        li{
          width: 135px;
          height: 24px;
          line-height: 24px;
          float: left;
          font-size: 12px;
          color: #089F48;
        }
      }
    }
  }
</style>
