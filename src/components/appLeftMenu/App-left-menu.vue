<template>
  <div>
    <app-title :value='data.title'></app-title>
    <ul class="app-left-menu" id='app-left-menu-ul' ref="box">
      <li v-for='item in data.list' @click='active' :data-url="item.url">
        <!-- <router-link :to='item.url'>{{item.text}}</router-link> -->
        <a href="javascript:void(0);" @click='add(item.url, item.name)'>{{item.text}}</a>
      </li>
    </ul>
  </div>
</template>

<script>
  import {
    mapGetters
  } from 'vuex'
  export default {
    props: {
      data: {
        default: []
      }
    },
    mounted() {
      this.$nextTick(function() {
        console.log(window.$(this.$refs.box).find('li:eq(0) a').text())
        window.$(this.$refs.box).find('li:eq(0)').click()
//          window.$(this.$refs.box).find('li:eq(0) a').click()
//        this.$router.push(this.data.list[0].url)
        this.$router.push(window.$(this.$refs.box).find('li:eq(0)').data('url'))
      })
    },
    computed: {
      ...mapGetters([
        'RMSLIST'
      ])
    },
    watch: {
      data() {
        window.$(this.$refs.box).find('li:eq(0)').click()
//          window.$(this.$refs.box).find('li:eq(0) a').click()
//        console.log(this.data.list[0].url)
        this.$router.push(window.$(this.$refs.box).find('li:eq(0)').data('url'))
      }
    },
    methods: {
      menuRMS(item) {
        let key = item.permission
        return this.RMSLIST.exists(key)
      },
      add(url, name) {
        // let target = window.event.target
        // this.toArray(window.$('#app-left-menu-ul').get(0).children).forEach(e => {
        //   e.children[0].className = ''
        // })
        // target.className = 'router-link-active'
        this.$router.push(url)
      },
      active(e) {
        e = e || window.event
        let target = e.target
        if (target.nodeName === 'A') {
          target = target.parentElement
        }
        window.$(target).addClass('router-link-active').siblings().removeClass('router-link-active')
        // this.stopBubble(e)
      }
    }
  }
</script>

<style lang='less'>
  .app-left-menu{
    li{
      font-size: 13px!important;
      color: #5E6D82;
      letter-spacing: 0;
      height: 30px!important;
      line-height: 30px!important;
      padding-left: 25px;
      cursor: pointer;
      margin-top: 0!important;
      a{
        color: #5E6D82;
      }
    }
  }
  .router-link-active {
    a{
      color: #21A85A!important;
    }
  }
</style>
