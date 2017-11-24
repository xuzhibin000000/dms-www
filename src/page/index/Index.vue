<template>
  <div v-loading.body="loading" id='mainBody' class='default-style'>
    <app-header @updateView='updateView' :flag.sync='flag'></app-header>
    <el-tabs v-model="editableTabsValue" type="card" closable @edit="handleTabsEdit"
    @tab-click='changeUrl' id='editableTabs'>
      <el-tab-pane
        :key="item.tabName"
        v-for="(item, index) in editableTabs"
        :label="item.title"
        :name="item.tabName">
        <keep-alive>
          <router-view :name='item.name'></router-view>
        </keep-alive>
      </el-tab-pane>
    </el-tabs>
  </div>
</template>

<script>
  import appHeader from '@/components/Header/App-header.vue'
  import Home from '@/page/home/Home.vue'
  import {
    innerIndexGetUserMenu,
    innerIndexGetUserType,
    getSysTime
  } from '@/api/api.js'
  import { mapActions } from 'vuex'
  export default {
    data() {
      return {
        editableTabsValue: '2',
        loading: false,
        editableTabs: [],
        tabIndex: 2,
        flag: false
      }
    },
    components: {
      appHeader,
      appHome: Home
    },
    methods: {
      ...mapActions([
        'setMenu',
        'setUserType',
        'setUserName',
        'setCustomNumber',
        'setRMSLIST'
      ]),
      handleTabsEdit(targetName, action) {
        if (targetName.substring(0, 4) === 'Home') return
        // 删除标签页
        if (action === 'remove') {
          let tabs = this.editableTabs
          let activeName = this.editableTabsValue
          if (activeName === targetName) {
            if (tabs.length === 1) {
              // this.flag = true
              return
            }
            // let _index = -1
            tabs.forEach((tab, index) => {
              if (tab.tabName === targetName) {
                let nextTab = tabs[index + 1] || tabs[index - 1]
                if (nextTab) {
                  activeName = nextTab.tabName
                  let path = nextTab.path
                  this.$router.push(path)
                  // ---- 多tab判断 ----
                  // for (let i = 0; i < tabs.length; i++) {
                  //   if (tab.name === tabs[i].name) {
                  //     _index++
                  //     if (targetName === tabs[i].tabName) {
                  //       break
                  //     }
                  //   }
                  // }
                }
              }
            })
            // console.log(_index)
            // ----- 多tab开启 -----
            // let state = this.$store.state.firstSaleOrderRule.mutations
            // this.removeState({
            //   state,
            //   _index
            // })
            // console.log(this.$store.state.firstSaleOrderRule.mutations)
          }

          this.editableTabsValue = activeName
          this.editableTabs = tabs.filter(tab => tab.tabName !== targetName)
        }
      },
      updateView(path, name, title, flag = false) {
        let arr = this.editableTabs
        let tabName = name + new Date().getTime().toString()
        for (let i = 0; i < arr.length; i++) {
          let _path = arr[i].path
          if (path === _path) {
            // -------- 多tab关闭 -------
            // this.editableTabs.push({
            //   title: title,
            //   name: name,
            //   tabName: tabName,
            //   path: path
            // })
            // 开关切换
            // this.editableTabsValue = tabName
            if (flag) {
              let targetName = arr[i].tabName
              let tabs = this.editableTabs
              let activeName = this.editableTabsValue
              console.log(activeName, targetName)
              this.editableTabs = tabs.filter(tab => tab.tabName !== targetName)
              this.editableTabsValue = arr[i].tabName
              this.$router.push(path)
              window.updateView(path, name, title)
              return
            }
            this.editableTabsValue = arr[i].tabName
            this.$router.push(path)
            return
          }
        }
        this.editableTabs.push({
          title: title,
          name: name,
          tabName: tabName,
          path: path
        })
        this.editableTabsValue = tabName
        this.$router.push(path)
        this.initHeight()
      },
      changeUrl(tab, event) {
        // console.log(tab.index)
        // console.log(event)
        let path = this.editableTabs[tab.index].path
        this.$router.push(path)
        // window.location.href = path
      },
      initHeight() {
        if (this.flag) return
        let maxHeight = window.innerHeight
        let height = maxHeight - 45 - 24
        // height = height > 700 ? 700 : height
        window.$('#editableTabs .el-tabs__content').height(height)
      },
      testAsync: async function() {
        await this.messageBox('prompt', 'title').then(({value}) => { console.log(value) }).catch(() => {})
      }
    },
    watch: {
      flag(val) {
        if (this.flag) {
          window.$('#editableTabs .el-tabs__content').height(0)
        } else {
          this.$nextTick(function() {
            this.initHeight()
          })
        }
      }
    },
    created() {
      let _this = this
      window.onresize = function() {
        _this.initHeight()
      }
      window.updateView = function(path, name, title, flag) {
        _this.flag = false
        _this.updateView(path, name, title, flag)
      }
      _this.$nextTick(() => {
        window.updateView('/index/home', 'Home', '主页')
      })
      _this.http.post(innerIndexGetUserMenu, {}).then(res => {
        _this.setMenu(res.listInfo)
      })
      _this.http.post(innerIndexGetUserType, {}).then(res => {
        _this.setUserType(res.mapInfo['user'].userType)
        _this.setUserName(res.mapInfo['user'].name)
        _this.setCustomNumber(res.mapInfo['user'].cusNum)
        _this.setRMSLIST(res.mapInfo['buttonIdList'])
      })
      _this.http.post(getSysTime, {}).then(res => {
        const sysTime = res.mapInfo.sysTime
        const localTime = new Date().getTime()
        const x = 1000 * 60 * 60
        if (Math.abs(sysTime - localTime) > x) {
          _this.alert('时间日期错误', '本地电脑时间与服务器时间偏差较大,请校准本地计算机时间后重试', () => {
            window.location.href = '/dms-web/'
          })
        }
        // console.log('sysTime ===> ', res.mapInfo.sysTime, new Date().getTime(), Math.abs(sysTime - localTime))
      })
    },
    mounted() {
      // this.testAsync()
      // this.
    }
  }
</script>

<style lang="less">
  // @import '//at.alicdn.com/t/font_uc4kwp36s7s6ecdi.css';
  .el-tab-pane{
    // height: 100%;
    // overflow: hidden;
  }
  #app{
    overflow-x: auto;
    min-width: 1300px;
  }
  .el-tabs__item{
    background: #DEDEDE!important;
    // height: 32px;
    // line-height: 32px;
    border-top: 3px solid #DEDEDE!important;
  }
  .is-active{
    background: #FFF!important;
    border-top: 3px solid #339666!important;
  }
  .el-tabs__item.is-active{
    color: #777B7E!important;
  }
  .el-tabs__nav-scroll{
    background: #EEE!important;
  }
  .el-tabs--card>.el-tabs__header .el-tabs__item.is-active.is-closable{
    height: 24px!important;
    line-height: 18px!important;
    font-size: 12px!important;
  }
  .el-tabs__nav-wrap{
    width: 100%;
  }
  .el-tabs__item {
    height: 24px!important;
    line-height: 18px!important;
  }
  .el-tabs__item{
    font-size: 12px!important;
    box-sizing: border-box!important;
  }
  .el-tabs__nav-next,.el-tabs__nav-prev{
    line-height: 24px!important;
  }
  .el-tabs__nav-wrap {
    // width: 98%;
    overflow: hidden;
  }
  .el-tabs__nav-next {
    right: 30px;
    z-index: 99999;
    background: #FFF;
  }
  .el-tabs__header{
    overflow: hidden;
  }
</style>
