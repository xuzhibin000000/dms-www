<template>
  <a href="javacript:void(0);" @click='eventClick' :class='btnClass' ref='id' :style='getAStyle' v-if='flag'>
    <span :class='getClass'>{{value}}</span>
  </a>
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
      value: {
        default: ''
      },
      type: {
        default: ''
      },
      border: {
        default: null
      },
      rms: {
        default: null
      }
    },
    watch: {
      rms(val) {
        this.testRMS()
      }
    },
    created() {
      this.testRMS()
    },
    computed: {
      ...mapGetters([
        'RMSLIST'
      ]),
      getAStyle() {
        if (this.border && this.border === '0') {
          return 'border: none;background: rgba(0,0,0,0);'
        }
      },
      getClass() {
        if (this.type === 'fahuo') {
          return 'iconfont icon-peisongfahuo'
        }
        if (this.type === 'peisong') {
          return 'iconfont icon-zhuanyibaopeisong'
        }
        if (this.type === 'add') {
          return 'iconfont icon-xinzengc '
        }
        if (this.type === 'remove') {
          return 'iconfont icon-delete1 '
        }
        if (this.type === 'invalid') {
          return 'iconfont icon-zanting '
        }
        if (this.type === 'open') {
          return 'iconfont icon-zhankai '
        }
        if (this.type === 'reload') {
          return 'iconfont icon-svg- '
        }
        if (this.type === 'genggaifahuo') {
          return 'iconfont icon-daohuobiangengriqic '
        }
        if (this.type === 'search') {
          return 'iconfont icon-sousuo '
        }
        // 折叠按钮
        if (this.type === 'zhedie') {
          return 'iconfont icon-menu-zhangkai1 '
        }
        // 复制按钮
        if (this.type === 'copy') {
          return 'iconfont icon-fuzhichuangjianc '
        }
        // 创建按钮
        if (this.type === 'create') {
          return 'iconfont icon-zhongxinchuangjianc '
        }
        // 撤销
        if (this.type === 'chexiao') {
          return 'iconfont icon-chexiaoyixuan '
        }
        // 编辑按钮
        if (this.type === 'edit') {
          return 'iconfont icon-bianji '
        }
        // 保存按钮
        if (this.type === 'save') {
          return 'iconfont icon-baocun1 '
        }
        // 粘贴
        if (this.type === 'zhantie') {
          return 'iconfont icon-niantiec '
        }
        // 导出按钮
        if (this.type === 'daochu') {
          return 'iconfont icon-daochuc '
        }
        // 失效
        if (this.type === 'shixiao') {
          return 'iconfont icon-shixiaoc '
        }
        // 选择高亮
        if (this.type === 'xuanzegaoliang') {
          return 'iconfont icon-xuanzegaoliang '
        }
        // 撤销
        if (this.type === 'chexiao') {
          return 'iconfont icon-chexiaoyixuan '
        }
      },
      btnClass() {
        // 新增
        if (this.type === 'add' || this.type === 'copy' || this.type === 'create' || this.type === 'daochu' || this.type === 'edit' || this.type === 'zhantie' || this.type === 'xuanzegaoliang' || this.type === 'open' || this.type === 'reload' || this.type === 'zhedie') {
          return 'first-sale-button first-sale-button-add '
        }
        // 失效
        if (this.type === 'invalid' || this.type === 'shixiao' || this.type === 'fahuo' || this.type === 'chexiao') {
          return 'first-sale-button first-sale-button-invalid '
        }
        // 删除
        if (this.type === 'remove' || this.type === 'peisong') {
          return 'first-sale-button first-sale-button-remove '
        }
        if (this.type === 'genggaifahuo') {
          return 'first-sale-button first-sale-button-genggaifahuo '
        }
        if (this.type === 'search') {
          return 'first-sale-button first-sale-button-search'
        }
        return 'first-sale-button first-sale-button-add '
      }
    },
    methods: {
      eventClick(e) {
        if (e !== undefined && e.preventDefault !== undefined) {
          // 阻止默认浏览器动作(W3C)
          e.preventDefault()
        } else {
          // IE中阻止函数器默认动作的方式
          window.event.returnValue = false
        }
        return false
      },
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
    }
  }

</script>
<style lang='less'>
  .first-sale-button{
    display: inline-block;
    background: #FFFFFF;
    height: 24px;
    line-height: 24px;
    border-radius: 5px;
    // width: 70px;
    padding: 0 10px;
    text-align: center;
    vertical-align: middle;
    span{
      font-size: 14px;
    }
    .iconfont:before{
      margin-right: 5px;
    }
  }
  .first-sale-button-genggaifahuo{
    color: #F6A623;
    border: 1px solid #F6A623;
  }
  .first-sale-button-search{
    color: #5E6D82;
    border: 1px solid #5E6D82;
  }
  // .first-sale-button-add,.first-sale-button-invalid,.first-sale-button-remove{
  //   transition: all .3s;
  //   :hover{
  //     color: #FFF;
  //     trnasition: all .3s;
  //   }
  // }
  .first-sale-button-add{
    color: #089F48;
    border: 1px solid #089F48;
    // &:hover{
    //   background-color: #089F48;
    // }
  }
  .first-sale-button-invalid{
    color: #5E6D82;
    border: 1px solid #5E6D82;
    // &:hover{
    //   background-color: #5E6D82;
    // }
  }
  .first-sale-button-remove{
    color: #F45164;
    border: 1px solid #F45164;
    // &:hover{
    //   background-color: #F45164;
    // }
  }

</style>
