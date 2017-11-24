<template>
  <div class='app-select'>
    <div class="app-fl app-tr app-pr10" style='width:30%;'>
      备注
    </div>
    <div class="app-fl" style='background: #F2F2F5;width: 70%;'>
      <el-select v-model="tempValue" :disabled='disabled' placeholder="选择常用备注"
      @input="change">
        <el-option
          v-for="item in data"
          :key="item.value"
          :label="item.label"
          :value="item.value">
          <span style="float: left">{{ item.label }}</span>
          <span style="float: right; color: #8492a6; font-size: 13px" @click='removeClick(item, $event)'>X</span>
        </el-option>
      </el-select>
      <textarea class='app-textarea' v-model="Value" maxlength="100" :disabled='disabled' :style='getStyle'>{{Value}}</textarea>
      <!-- <el-checkbox v-model="Checked" @click="changeChecked">添加到常用备注</el-checkbox> -->
      <span class='click-link' @click='addClick'>添加到常用备注</span>
    </div>
  </div>
</template>

<script>
  export default {
    data() {
      return {
        Value: this.value,
        Checked: this.checked,
        tempValue: this.value
      }
    },
    props: {
      data: {
        default: []
      },
      value: {
        default: ''
      },
      checked: {
        default: false
      },
      disabled: {
        default: false
      }
    },
    watch: {
      Value(val) {
        this.$emit('update:value', val)
      },
      tempValue(val) {
        this.Value = val
      },
      value(val) {
        this.Value = val
      },
      data(val) {
        for (let i = 0; i < val.length; i++) {
          let item = val[i]
          if (item.label.length > 10) {
            item.label = item.label.substring(0, 10) + '...'
          }
        }
        this.data = val
      }
    },
    methods: {
      changeChecked() {
        this.$emit('update:checked', this.Checked)
      },
      change(event) {
//        let _value = typeof event === 'string' ? event : this.Value
//        this.$emit('update:value', _value)
      },
      addClick() {
        if (this.disabled) return
        this.$emit('click')
      },
      removeClick(item, e) {
        if (e && e.stopPropagation) {
          e.stopPropagation()
        } else {
          window.event.cancelBubble = true
        }
        this.data.remove(item)
        this.$emit('remove', item)
      }
    },
    computed: {
      getStyle() {
        if (this.disabled) {
          return 'cursor: not-allowed;'
        } else {
          return ''
        }
      }
    }
  }
</script>

<style lang='less'>
  .app-select{
    .app-textarea{
      background: #F2F2F5;
      // border-radius: 3px;
      width: 100%;
      resize: none;
      height: 45px;
      border-top: 1px solid #BDAFCA;
      border-bottom: 1px solid #BDAFCA;
      box-sizing: border-box;
      padding: 5px;
    }
    .click-link{
      // font-family: MicrosoftYaHei;
      font-size: 12px;
      color: #089D47;
      letter-spacing: 0;
      text-decoration: underline;
      padding-left: 10px;
    }
  }
</style>
