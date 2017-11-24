<template>
  <button :class='getClass' :disabled='disabled' v-if='flag'>
    <span>{{value}}</span>
  </button>
</template>

<script>
  import {
    mapGetters
  } from 'vuex'
  export default {
    data() {
      return {
        flag: false
      }
    },
    props: {
      // 显示文字
      value: {
        default: ''
      },
      // 按钮类型
      type: {
        default: ''
      },
      // 图标
      icon: {
        default: ''
      },
      disabled: {
        default: false
      },
      rms: {
        default: null
      }
    },
    created() {
      this.testRMS()
    },
    watch: {
      rms(val) {
        this.testRMS()
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
      }
    },
    computed: {
      ...mapGetters([
        'RMSLIST'
      ]),
      getClass() {
        let str = 'app-button '
        if (this.disabled) {
          str += 'app-disabled '
          return str
        }
        if (this.type === 'text') {
          str += 'app-button-text '
        }
        switch (this.icon) {
          case 'search':
            str += 'el-icon-search '
            break
          case 'remove':
            str += 'iconfont icon-delete1'
            break
          case 'save':
            str += 'iconfont icon-baocun '
            break
          case 'gouwuche':
            str += 'iconfont icon-gouwuche '
            break
          case 'add':
            str += 'iconfont icon-xinzengc '
            break
          case 'edit':
            str += 'iconfont icon-edit1'
            break
          case 'xuanzefabu':
            str += 'iconfont icon-xuanzefabu'
            break
          case 'quanbufabu':
            str += 'iconfont icon-quanbufabu'
            break
          case 'confirm':
            str += 'iconfont icon-queding'
            break
          case 'tianjia':
            str += 'iconfont icon-tianjiachanpin'
            break
          case 'daoru':
            str += 'iconfont icon-daoruwenjian'
            break
          case 'daochu':
            str += 'iconfont icon-daochu'
            break
          case 'text':
            str += 'app-button-text '
            break
          case 'print':
            str += 'iconfont icon-dayin'
            break
          case 'exit':
            str += 'iconfont icon-tuichu'
            break
          default:
            // str += 'iconfont icon-queding'
            break
        }
        return str
      }
    }
  }

</script>

<style lang='less'>
  .app-disabled{
    cursor: not-allowed!important;
    color: #bfcbd9!important;
    background: #eef1f6!important;
    &:hover{
      background: #eef1f6!important;
    }
  }
  .app-button{
    display: inline-block;
    height: 24px;
    line-height: 24px;
    padding: 0 10px;
    font-size: 12px;
    background-color: #089F48;
    color: #FFF;
    border-radius: 12px;
    cursor: pointer;
    &:hover{
      background-color: #42D885;
    }
    span{
      vertical-align: middle;
      margin-left: 1px;
      font-size: 14px;
    }
  }
  .app-button-text{
    background-color: #FFF;
    color: #089F48;
    &:hover{
      background-color: #FFF;
    }
  }

</style>
