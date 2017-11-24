<template>
  <div class="app-time-axis">
    <app-title :value='data.title'/>
    <ul class='app-time-axis-ul' ref='app-time-axis-ul'>
      <li v-for='item in data.list'>
        <span class='app-time-axis-list-title'>{{item.date}}</span>
        <div class='app-time-axis-list-box'>
          <div class="list-box-title">
            <div class="">
              {{item.title}}&nbsp;&nbsp;{{item.subTitle}}
            </div>
            <!-- <div class="right app-fr">
              {{item.subTitle}}
            </div> -->
            <div class="clearfix"></div>
          </div>
          {{item.text}}
        </div>
      </li>
    </ul>
  </div>
</template>

<script>
  export default {
    data() {
      return {}
    },
    props: {
      data: {
        default: null
      },
      configHeight: {
        default: 0
      }
    },
    mounted() {
      let _this = this
      this.$nextTick(() => {
        let ul = _this.$refs['app-time-axis-ul']
        let top = window.$(ul).offset().top
        let maxTop = window.innerHeight
        let hh = maxTop - top
        hh += _this.configHeight
        ul.style.height = hh + 'px'
        ul.style.overflow = 'auto'
      })
    }
  }
</script>

<style lang='less' scoped>
  .app-time-axis{
    padding-right: 20px;
    box-sizing: border-box;
    .app-time-axis-list-title{
      // font-family: MicrosoftYaHei;
      font-size: 12px;
      color: #5E6D82;
      letter-spacing: 0;
      line-height: 18px;
    }
    .app-time-axis-list-box{
      background: #F2F2F5;
      border-radius: 3px;
      font-size: 12px;
      color: #354661;
      letter-spacing: 0;
      line-height: 18px;
      padding: 4px;
      text-align: justify;
      box-sizing: border-box;
      .left{
        width: 55%;
        word-break: break-all;
      }
      .right{
        width: 43%;
        word-break: break-all;
      }
      .list-box-title{
        font-size: 12px;
        color: #44C3F2;
        letter-spacing: 0;
        border-bottom: 1px solid #B9B9BB;
      }
    }
    .app-time-axis-ul{
      li{
        // margin-top: 15px;
        padding-bottom: 15px;
        &:first-child{
          margin-top: 0;
        }
      }
    }
  }
</style>
