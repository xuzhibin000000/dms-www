<template>
  <div :style='getStyle'>
    <el-date-picker
      v-model="dateValue"
      :type="type"
      :disabled='Disabled'
      placeholder="选择日期"
      :clearable='clearBtn'
      @input='change'
      :editable="false"
      :picker-options="dateOptions"
      >
    </el-date-picker>
  </div>
</template>

<script>
  export default {
    data() {
      return {
        optionsData: this.data,
        Disabled: this.disabled,
        dateValue: this.value,
        Value: this.value
      }
    },
    props: {
      hover: {
        default: false
      },
      name: {
        default: ''
      },
      multiple: {
        default: null
      },
      value: {
        default: ''
      },
      disabled: {
        default: false
      },
      type: {
        default: 'date'
      },
      data: {
        default: null
      },
      left: {
        default: 0
      },
      right: {
        default: 0
      },
      border: {
        default: 1
      },
      placeholder: {
        default: null
      },
      clearBtn: {
        default: true
      },
      autoSelected: {
        default: true
      },
      minDate: {
        default: null
      },
      maxDate: {
        default: null
      },
      width: {
        default: null
      }
    },
    watch: {
      value(val) {
        this.dateValue = val
        this.Value = val
        this.inputValue = val
      },
      dateValue(val) {
        this.$emit('update:value', val)
      },
      disabled(val) {
        this.Disabled = val
      }
    },
    computed: {
      getStyle() {
        if (this.width === null) {
          return ''
        }
        return `width: ${this.width}px`
      },
      dateOptions() {
        let _this = this
        if (this.minDate && this.maxDate) {
          let json = {
            disabledDate(time) {
              return time.getTime() <= (new Date(_this.minDate) - 24 * 60 * 60 * 1000) || time.getTime() >= new Date(_this.maxDate).getTime()
            }
          }
          return json
        } else if (this.minDate) {
          let json = {
            disabledDate(time) {
              return time.getTime() <= (new Date(_this.minDate) - 24 * 60 * 60 * 1000)
            }
          }
          return json
        } else if (this.maxDate) {
          let json = {
            disabledDate(time) {
              return time.getTime() >= new Date(_this.maxDate).getTime()
            }
          }
          return json
        } else {
          return {}
        }
      },
      Data() {
        this.Value = ''
        this.$emit('update:value', '')
        if (this.autoSelected) {
          if (this.data.length === 1) {
            this.Value = this.data[0].value
            this.Disabled = true
            this.$emit('update:value', this.Value)
          } else {
            this.Disabled = false
          }
        }
        // this.update()
        return this.data
      },
      updateDateView() {
        this.dateValue = this.value
        this.showDate = false
        this.$nextTick(function() {
          this.showDate = true
        })
      }
    },
    methods: {
      change(event) {
        if (Array.isArray(event)) {
          this.$emit('update:value', event)
          // 调用外部change事件
          this.$emit('change', event)
          return
        }
        let _value = typeof event === 'string' ? event : this.Value
        this.$emit('update:value', _value)
        // 调用外部change事件
        this.$emit('change', _value)
      },
      changeValue(e) {
        this.change(e)
      }
    }
  }
</script>

<style lang='less' scoped>
  
</style>
