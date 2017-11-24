<template>
  <div class='app-select-box' v-if='showSwipe'>
    <div class="app-fl app-w30 app-tr app-pr10 app-select-box-name" :style='getLeft'>
      {{name}}
    </div>
    <div class="app-fl app-w70" v-if="type === 'input'" :style='getRight'>
      <template v-if='hover === true'>
        <el-popover
          ref="selectPopover"
          placement="top-start"
          title=""
          width="200"
          trigger="hover"
          :content="inputValue">
        </el-popover>
        <el-input v-model="inputValue" v-popover:selectPopover :placeholder="Placeholder" @input="change" :disabled='Disabled' :style='getInputStyle'></el-input>
      </template>
      <el-input v-else v-model="inputValue" :placeholder="Placeholder" @input="change" :disabled='Disabled' :style='getInputStyle'></el-input>
    </div>
    <div class="app-fl app-w70" v-else-if="type === 'password'" :style='getRight'>
      <template v-if='hover === true'>
        <el-popover
          ref="selectPopover"
          placement="top-start"
          title=""
          width="200"
          trigger="hover"
          :content="inputValue">
        </el-popover>
        <el-input v-model="inputValue" v-popover:selectPopover type='password' :placeholder="Placeholder" @input="change" :disabled='Disabled' :style='getInputStyle'></el-input>
      </template>
      <el-input v-model="inputValue" type='password' :placeholder="Placeholder" @input="change" :disabled='Disabled' :style='getInputStyle'></el-input>
    </div>
    <div class="app-fl app-w70" v-if="type === 'text'" :style='getRight'>
      <template v-if='hover === true'>
        <el-popover
          ref="selectPopover"
          placement="top-start"
          title=""
          width="200"
          trigger="hover"
          :content="inputValue">
        </el-popover>
        <el-input v-model="inputValue" v-popover:selectPopover class='app-select-box-text' @input="change" :disabled='true' :style='getInputStyle'></el-input>
      </template>
      <el-input v-else v-model="inputValue" class='app-select-box-text text-overflow' @input="change" :disabled='true' :style='getInputStyle'></el-input>
    </div>
    <div class="app-fl app-w70" v-if="type === 'select'" :style='getRight'>
      <template v-if='multiple === true'>
        <el-popover
          ref="selectPopover"
          placement="top-start"
          title=""
          width="200"
          trigger="hover"
          :content="getContents">
        </el-popover>
        <el-select v-model="values" multiple placeholder="请选择"
        @input="changeValue(values)"
        v-popover:selectPopover>
          <el-option
            v-for="item in Data"
            :key="item.value"
            :label="item.label"
            :value="item.value">
          </el-option>
        </el-select>
      </template>
      <template v-else-if='hover === true'>
        <el-popover
          ref="selectPopover"
          placement="top-start"
          title=""
          width="200"
          trigger="hover"
          :content="getContent">
        </el-popover>
        <el-select :value.sync='Value' filterable :clearable='clearBtn' v-model='Value' placeholder="请选择"
          :disabled='disabled'
          @input="changeValue"
          v-popover:selectPopover>
          <el-option
            v-for="item in Data"
            :key="item.value"
            :label="item.label"
            :value="item.value">
          </el-option>
        </el-select>
      </template>
      <template v-else>
        <el-select :value.sync='Value' filterable :clearable='clearBtn' v-model='Value' placeholder="请选择"
          :disabled='disabled'
          @input="changeValue">
          <el-option
            v-for="item in Data"
            :key="item.value"
            :label="item.label"
            :value="item.value">
          </el-option>
        </el-select>
      </template>
    </div>
    <div class="app-fl app-w70 app-search" v-if="type === 'search'" :style='getRight'>
      <template v-if='hover === true'>
        <el-popover
          ref="selectPopover"
          placement="top-start"
          title=""
          width="200"
          trigger="hover"
          :content="inputValue">
        </el-popover>
        <el-input
          placeholder="请选择"
          icon="search"
          v-popover:selectPopover
          :value="value"
          @input="change"
          @click='clickSearch'
          :disabled='true'>
        </el-input>
      </template>
      <template v-else>
        <el-input
          placeholder="请选择"
          icon="search"
          :value="value"
          @input="change"
          @click='clickSearch'
          :disabled='true'>
        </el-input>
      </template>
    </div>
    <div class="app-fl app-w70" v-if="type === 'checkbox'" :style='getRight'>
      <el-checkbox v-model="Value" @input="change"></el-checkbox>
    </div>
    <div class="app-fl app-w70" v-if="type === 'date' || type === 'month' || type === 'year' || type === 'week' || type === 'datetime'" :style='getRight'>
      <el-date-picker
        v-model="dateValue"
        :type="type"
        :disabled='Disabled'
        placeholder="选择日期"
        :clearable='clearBtn'
        @change='change'
        :editable="false"
        :picker-options="dateOptions"
        v-if='showDate'
        >
      </el-date-picker>
    </div>
  </div>
</template>

<script>
  export default {
    data() {
      return {
        showSwipe: true,
        showDate: true,
        optionsData: this.data,
        Disabled: this.disabled,
        dateValue: this.value,
        Value: this.value,
        inputValue: this.value,
        values: this.value
        // : {
        //   // shortcuts: [{
        //   //   text: '今天',
        //   //   onClick(picker) {
        //   //     picker.$emit('pick', new Date())
        //   //   }
        //   // }, {
        //   //   text: '昨天',
        //   //   onClick(picker) {
        //   //     const date = new Date()
        //   //     date.setTime(date.getTime() - 3600 * 1000 * 24)
        //   //     picker.$emit('pick', date)
        //   //   }
        //   // }, {
        //   //   text: '一周前',
        //   //   onClick(picker) {
        //   //     const date = new Date()
        //   //     date.setTime(date.getTime() - 3600 * 1000 * 24 * 7)
        //   //     picker.$emit('pick', date)
        //   //   }
        //   // }]
        // }
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
        default: 'input'
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
      }
    },
    watch: {
      value(val, oval) {
        if (Array.isArray(val)) {
          this.values = val
        }
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
      getContent() {
        for (let i = 0; i < this.Data.length; i++) {
          const temp = this.Data[i]
          if (temp.value === this.Value) {
            return temp.label
          }
        }
        return ''
      },
      getContents() {
        let str = ''
        for (let i = 0; i < this.Data.length; i++) {
          const temp = this.Data[i]
          for (let j = 0; j < this.values.length; j++) {
            if (temp.value === this.Value[j]) {
              // return temp
              str += temp.label + (i === this.Data.length - 1 ? '' : ', ')
            }
          }
        }
        return str
      },
      Placeholder() {
        if (this.placeholder === null) {
          return '请输入内容'
        }
        return this.placeholder
      },
      getInputStyle() {
        if (this.border === 0) {
          return 'border: none;'
        }
        return ''
      },
      // 获取文字宽度
      getLeft() {
        if (this.left === 0) return
        return `width: ${this.left}px`
      },
      // 获取右侧宽度
      getRight() {
        if (this.right === 0) return
        return `width: ${this.right}px;`
      },
      Data() {
        this.Value = ''
        if (this.multiple) {
          this.$emit('update:value', [])
        } else {
          this.$emit('update:value', '')
        }
        if (this.autoSelected) {
          if (this.data.length === 1) {
            if (this.multiple) {
              this.Value = [this.data[0].value]
            } else {
              this.Value = this.data[0].value
            }
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
//      inputValue() {
//        // let _this = this
//        // setTimeout(() => {
//        //   _this.update()
//        // }, 1)
//        return this.value
//      }
    },
    methods: {
      clickSearch(event) {
        if (this.Disabled) return
        let _value = typeof event === 'string' ? event : this.Value
        this.$emit('click', _value)
      },
      change(event) {
        if (Array.isArray(event)) {
          this.$emit('update:value', this.values)
          // 调用外部change事件
          this.$emit('change', this.values)
          return
        }
        let _value = typeof event === 'string' ? event : this.Value
        this.$emit('update:value', _value)
        // 调用外部change事件
        this.$emit('change', _value)
      },
      changeValue(e) {
        this.change(e)
        // this.$emit('change', this.Value)
      },
      update() {
        this.showSwipe = false
        this.$nextTick(function() {
          this.showSwipe = true
        })
      }
    }
  }
</script>

<style lang='less'>
  .el-select ,.el-date-editor.el-input {
    width: 100%!important;
  }
  .text-overflow{
    overflow: hidden;
    text-overflow: ellipsis;
  }
  .el-input__inner{
    height: 24px;
    color: #5E6D82;
  }
  .app-select-box-name{
    line-height: 24px;
    height: 24px;
    color: #5E6D82;
  }
  .el-input{
    color: #5E6D82;
  }
  .is-disabled{
    input{
      background: #D5D5D5!important;
      color: #74777A!important;
    }
  }
  .app-select-box{
    overflow: hidden;
    font-size: 12px;
    .app-select-box-text{
      .el-input__inner{
        background: #FFF!important;
        color: #BFBFBF!important;
      }
    }
    .is-disabled{
      .el-input__inner{
        background: #D5D5D5!important;
        color: #74777A!important;
      }
    }
    .app-search{
      .is-disabled{
        .el-input__inner{
          background-color: #F9F9F9!important;
          font-size: 12px!important;
          color: #5E6D82!important;
        }
      }
    }
    .el-select{
      .el-select__tags{
        overflow: hidden!important;
        height: 24px;
        > span{
          height: 24px;
          /* overflow: hidden; */
          display: block;
          width: 1000000px;
        }
        .el-tag{
          height: 20px;
          line-height: 20px;
          /* margin-top: 2px; */
          box-sizing: border-box;
          margin: 2px 0 3px 6px;
          /* float: left; */
          display: inline-block;
        }
      }
    }
  }
  .el-input__inner:hover, .el-input__inner {
    border: none;
  }
</style>
