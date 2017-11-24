<template>
  <div class='app-input-box'>
    <div class="app-fl app-w30 app-tr app-pr10">
      <span style='color:#F35164' v-if='notNull'>*</span>
      {{name}}
    </div>
    <div class="app-fl app-w70">
      <el-date-picker
        v-model="Value"
        type="date"
        placeholder="选择日期"
        :picker-options="pickerOptions0"
        @input="change"
        v-if='type === "date"'>
      </el-date-picker>
      <el-input v-model="Value" placeholder="请输入内容"
      :disabled="disabled"
      v-else
      @input="change"></el-input>
    </div>
  </div>
</template>

<script>
  export default {
    data() {
      return {
        Value: this.value,
        pickerOptions0: {
          disabledDate(time) {
            return time.getTime() < Date.now() - 8.64e7
          }
        }
      }
    },
    props: {
      value: {
        default: ''
      },
      disabled: {
        default: false
      },
      name: {
        default: 'null'
      },
      notNull: {
        default: false
      },
      type: {
        default: 'text'
      }
    },
    methods: {
      change(event) {
        let _value = typeof event === 'string' ? event : this.Value
        this.$emit('update:value', _value)
      }
    }
  }
</script>

<style lang='less'>
  .app-input-box{
    color: #5E6D82;
    font-size: 12px;
    line-height: 24px;
    overflow: hidden;
    .el-input__inner{
      height: 24px;
      line-height: 24px;
      background: #F2F2F5;
      border-radius: 3px;
    }
    .el-input__inner {
      background-color: #F2F2F5;
      font-size: 12px;
      color: #5E6D82;
    }
    .el-checkbox__inner {
      width: 14px;
      height: 14px;
    }
    .el-checkbox__inner::after {
      left: 3px;
      top: 0;
    }
    .el-input__inner {
      border: none;
    }
  }

  .app-input-box.m{
    width: 190px;
    overflow: hidden;
    div{
      box-sizing: content-box;
    }
    div.app-w30{
      width: 60px;
    }
    div.app-w70{
      width: 120px;
    }
  }
  .app-input-box.m1{
    width: 155px;
    overflow: hidden;
    div{
      box-sizing: content-box;
    }
    div.app-w30{
      width: 25px;
    }
    div.app-w70{
      width: 120px;
    }
  }

</style>
