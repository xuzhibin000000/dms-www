<template>
  <div class="app-select-tab app-mainColor">
    <ul class='clearfix app-tc' :style='getUlStyle'>
      <li v-for='item in data' @click='toggleSelect(item)' :class='getClass(item)' v-if='testShowLi(item)'>
        {{item.text}}
        <div class="hr-active" v-show='item.active'>
          <img :src="topImg" width='20' alt="" class='app-pa' style='top: 30px;margin-left: -10px;'>
        </div>
      </li>
    </ul>
    <div class="hr">
    </div>
    <!-- <div class="hr-active"></div> -->
  </div>
</template>

<script>
  import topImg from './img.png'
  import {
    mapGetters
  } from 'vuex'
  export default {
    data() {
      return {
        topImg
      }
    },
    props: {
      data: {
        default: {}
      }
    },
    // watch: {
    //   data
    // },
    methods: {
      getClass(item) {
        if (item.active) {
          return 'active'
        }
        return ''
      },
      toggleSelect(item) {
        // this.data.indexOf(item) + 1
        this.data.forEach(e => {
          e.active = false
          e.className = ''
        })
        item.active = true
        item.className = 'active'
        item.click()
      },
      testShowLi(item) {
        const rms = item.rms
        return this.testRMS(rms)
      },
      testRMS(rms) {
        if (rms === null || rms === undefined) {
          return true
        }
        if (Array.isArray(rms)) {
          for (let i = 0; i < rms.length; i++) {
            let str = rms[i]
            if (this.RMSLIST.indexOf(str) !== -1) {
              return true
            }
          }
          return false
        }
        if (this.RMSLIST.indexOf(rms) !== -1) {
          return true
        } else {
          return false
        }
      }
    },
    computed: {
      ...mapGetters([
        'RMSLIST'
      ]),
      getUlStyle() {
        // if (this.data.length >= 1) {
        //   return `width: ${this.data.length * 300}px`
        // }
        // return ''
        let index = 0
        for (let i = 0; i < this.data.length; i++) {
          const rms = this.data[i].rms
          if (this.testRMS(rms)) {
            index++
          }
        }
        return `width: ${index * 300}px`
      }
    }
  }
</script>

<style lang='less' scoped>
  .app-select-tab{
    ul{
      width: 600px;
      margin: 0 auto;
      height: 30px;
      line-height: 30px;
      li{
        width: 300px;
        float: left;
        cursor: pointer;
      }
      .active{
        color: #089F48;
      }
    }
    .hr{
      margin-top: 10px;
      border-bottom: 2px solid #DEDEDE;
    }
    .hr-active{
      margin-top: 10px;
      border-bottom: 2px solid #089F48;
      transition: all .6s linear;
    }
  }
</style>
