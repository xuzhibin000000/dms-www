<template>
  <a href="javacript:void(0);" @click='eventClick' class='app-config-inserts-button app-oh' v-if='flag'>
    <span class='iconfont icon-fuzhic '>{{value}}</span>
    <!--<input type="text" class='app-config-inserts-input app-tc' @input='inputKeyDown' v-model='key'/>-->
    <el-select v-model="key" placeholder="请选择" style="width: 40px!important;height: 20px;line-height: 20px;" @change="elSelectChange">
      <el-option
        v-for="item in options"
        :key="item.value"
        :label="item.label"
        :value="item.value">
      </el-option>
    </el-select>
    <span>{{text}}</span>
  </a>
</template>

<script>
  import {
    mapGetters
  } from 'vuex'
  export default {
    data() {
      return {
        flag: false,
        key: 1,
        options: [{
          label: '1',
          value: '1'
        }, {
          label: '2',
          value: '2'
        }, {
          label: '3',
          value: '3'
        }, {
          label: '4',
          value: '4'
        }, {
          label: '5',
          value: '5'
        }, {
          label: '6',
          value: '6'
        }, {
          label: '7',
          value: '7'
        }, {
          label: '8',
          value: '8'
        }, {
          label: '9',
          value: '9'
        }, {
          label: '10',
          value: '10'
        }]
      }
    },
    computed: {
      ...mapGetters([
        'RMSLIST'
      ])
    },
    created() {
      this.testRMS()
    },
    watch: {
      rms(val) {
        this.testRMS()
      }
    },
    props: {
      rms: {
        default: null
      },
      value: {
        default: ''
      },
      data: {
        default: 0
      },
      text: {
        default: '行'
      }
    },
    methods: {
      testRMS() {
        if (this.rms === null) {
          this.flag = true
          return
        }
        if (Array.isArray(this.rms)) {
          for (let i = 0; i < this.rms.length; i++) {
            let str = this.rms[i]
            if (this.RMSLIST.indexOf(str) !== -1) {
              this.flag = true
              return
            }
          }
          this.flag = false
          return
        }
        if (this.RMSLIST.indexOf(this.rms) !== -1) {
          this.flag = true
        } else {
          this.flag = false
        }
      },
      // 阻止冒泡
      eventClick(e) {
        e = e || window.event
        if (e !== undefined && e.preventDefault !== undefined) {
          // 阻止默认浏览器动作(W3C)
          e.preventDefault()
        } else {
          // IE中阻止函数器默认动作的方式
          window.event.returnValue = false
        }
        if (e.target.nodeName.toLowerCase() === 'span') {
          this.$emit('click')
        }
        return false
      },
      elSelectChange(e) {
//        e = e || window.event
//        let _this = this
//        if (e.keyCode === 13) {
//          let num = _this.key.toInt()
//          if (window.isNaN(num)) {
//            _this.message('请输入合法的数字', 'error')
//            _this.key = 0
//            return
//          }
//          this.$emit('enter', num)
//        }
        //  TODO 校验数据
        let num = this.key
        this.$emit('update:data', num)
//        if (isNaN(this.key)) {
//          this.key = 0
//        }
//        if (this.key < 0 || this.key > 10) {
//          this.message('批量复制数量不能小于1或者大于10', 'error')
//          this.key = 0
//          return
//        }
      }
    }
  }
</script>

<style lang='less' >
  .app-config-inserts-button{
    display: inline-block;
    background: #FFFFFF;
    height: 24px;
    line-height: 23px;
    border-radius: 5px;
    // width: 70px;
    padding: 0 10px;
    text-align: center;
    vertical-align: middle;
    // box-sizing: border-box;
    span{
      font-size: 14px;
    }
    color: #5E6D82;
    border: 1px solid #5E6D82;
    .el-select{
      height: 22px!important;
      line-height: 22px!important;
    }
    .el-input{
      height: 22px!important;
      line-height: 22px!important;
      .el-input__inner{
        height: 22px!important;
        line-height: 22px!important;
        background-color: #F9F9F9!important;
        font-size: 12px!important;
        color: #5E6D82!important;
      }
    }
    .el-input__icon {
      /*position: absolute;*/
      width: 20px;
    }
    .el-input__icon+.el-input__inner {
      padding-right: 10px;
    }
  }
  .app-config-inserts-input{
    border: 1px solid #5E6D82;
    border-radius: 2px;
    height: 18px;
    width: 20px;
    vertical-align: middle;
    margin-top: -2px;
  }
</style>
