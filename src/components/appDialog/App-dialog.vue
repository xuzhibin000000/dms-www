<template>
  <el-dialog title="" :show-close="showClose" :visible="show" :size='getSize' :top='getTop' id="app-dialog" :lock-scroll='true' :before-close="handleClose" ref='appDialog'>
    <slot></slot>
  </el-dialog>
</template>

<script>
  export default {
    props: {
      show: {
        default: false
      },
      handleClose: {
        defalt: null
      },
      size: {
        default: null
      },
      top: {
        default: null
      },
      showClose: {
        dafault: true
      }
    },
    mounted() {
      let _this = this
      _this.$nextTick(() => {
        window.$(_this.$refs.appDialog.$el).find('.el-dialog__close,.el-dialog__headerbtn').click(function() {
          _this.$emit('update:show', false)
        })
      })
    },
    computed: {
      getSize() {
        if (this.size === null || this.size === undefined) {
          return 'large'
        }
        return this.size
      },
      getTop() {
        if (this.top === null || this.top === undefined) {
          return '5%'
        }
        return this.top
      }
    }
  }
</script>

<style lang='less'>

</style>
