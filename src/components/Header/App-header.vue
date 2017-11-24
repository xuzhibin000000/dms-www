<template>
  <div class="root" v-cloak>
    <!-- 头部 -->
    <header id='header' class="app-header header_nav" :style='getHeaderBg'>
      <ul class="clearfix nav_box">
        <li style='width:10%;height:24px;'>
          <a href="javascript:void(0);"><img :src="getLogo" alt="" style="margin-left:10%;height:25px;margin-top:10px;"></a>
        </li>
        <!-- <li>
          <a href='javascript:void(0);' class="nav_list" :style='getNavBoxAStyle'>首页</a>
        </li> -->
        <li class="king-header-nav" v-for='item of menu'>
          <a href="javascript:void(0);" class="nav_list" :style='getNavBoxAStyle'>{{item.name}}</a>
          <div class="king-header-nav-box">
            <ul>
              <li v-for='children of item.children'>
                <a class="king-header-nav-show"
                 href="javascript:void(0)" @click="updateView(children.config.path, children.config.name, children.config.title)" v-if='children.config && children.config.hasPath === false'>
                  <span>{{children.name}}</span>
                </a>
                <span class="king-header-nav-show" :style='getNavBoxSpanStyle' v-else>
                  <img :src="menuflag" alt=""/>
              &nbsp;{{children.name}}
                </span>
                <div class="king-header-nav-mess">
                <!-- <div class="king-header-nav-mess" v-if='children.config && children.config.hasPath'> -->
                  <ul>
                    <li v-for='dblChild of children.children'>
                      <a class="dandu"
                       href="javascript:void(0)" @click="updateView(dblChild.config.path, dblChild.config.name, dblChild.config.title)">
                      <span>{{dblChild.name}}</span></a>
                    </li>
                  </ul>
                </div>
              </li>
            </ul>
          </div>
          </li>
          <li>
            <a  class="name_box">
              <img :src="getProfile" alt="">
              <span id="loginIn"></span></a><a href="javascript:void(0)" @click="cleanStorage" class="login_outBox" :style='getNavBoxAStyle'>{{getUserName}}/ 退出</a>
          </li>
        </ul>
    </header>
    <!-- 导航信息 -->
    <!-- <div class="msg" id='msg'>
      <img :src="nowPosition" width="12" height="15"
      alt="" /> 当前位置：订单管理&nbsp;&nbsp;
            <img :src="next" alt="">
            &nbsp;&nbsp;在线下单&nbsp;&nbsp;
            <img :src="next" alt="">
            &nbsp;&nbsp;需求到货日期更改申请查询
    </div> -->
  </div>

</template>

<script>
  import newsLogo from './images/newsLOGO.png'
  import logo from './images/logo1.png'
  import menuflag from './images/menuflag.png'
  import profile from './images/profile.png'
  import newsProfile from './images/newsProfile.png'
  import nowPosition from './images/nowPosition.png'
  import next from './images/next.png'
  import { mapGetters } from 'vuex'
  export default {
    data () {
      return {
        appData: this.data,
        logo,
        menuflag,
        profile,
        nowPosition,
        next,
        newsLogo,
        newsProfile,
        thatProfile: newsProfile,
        thatLogo: newsLogo,
        userName: ''
      }
    },
    props: {
      flag: {
        default: true
      }
    },
    methods: {
      cleanStorage() {
        // this.userName
        let _this = this
        _this.save('username', '')
        _this.save('password', '')
        _this.save('isAutoLogin', '')
        window.location.href = 'a/logout'
      },
      updateView(path, name, title) {
        // this.thatLogo = this.logo
        // this.thatProfile = this.profile
        this.$emit('update:flag', false)
        this.$emit('updateView', path, name, title)
      }
    },
    computed: {
      ...mapGetters(['menu', 'getUserName']),
      getLogo() {
        if (this.flag) {
          return this.newsLogo
        }
        return this.logo
      },
      getProfile() {
        if (this.flag) {
          return this.newsProfile
        }
        return this.profile
      },
      getNavBoxAStyle() {
        if (!this.flag) {
          return 'color: #111;'
        } else {
          return 'color: #FFF;'
        }
      },
      getNavBoxSpanStyle() {},
      getHeaderBg() {
        // if (!this.flag) {
        //   return 'background: #EEE;'
        // } else {
        //   return 'background: #089F48;'
        // }
        return ''
      }
    }
  }
</script>

<style lang='less' scoped>

  .app-header{
    width: 100%;
    height: 45px;
    line-height: 45px;
    /* background: -webkit-linear-gradient(top,#f5f4f5,#d2d0d2); */
    // background: #089F48;
    font-size: 14px;
  }

  .msg{
    height: 30px;
    line-height: 30px;
    box-sizing: border-box;
    padding-left:2%;
    box-shadow:0 0 2px #999;
  }

  .msg img{
    vertical-align: middle;
  }

  .header_nav .nav_box .king-header-nav{
    position:relative;
  }
  .header_nav .nav_box .king-header-nav a{
    transition:border-bottom .4s linear;
    border-bottom:5px solid rgba(0,0,0,0);
  }
  .header_nav .nav_box .king-header-nav:hover a{
    border-bottom:5px solid #007E41;
    transition:border-bottom .4s linear;
  }

  .header_nav .nav_box .king-header-nav:hover .king-header-nav-box{
    display:block;
  }

  .header_nav .nav_box .king-header-nav .king-header-nav-box{
    background:#FFF;
    position:absolute;
    left:-120px;
    top:45px;
    z-index:999999;
    padding:15px 15px 15px 15px;
    width:350px;
    box-shadow: 0 5px 10px #bbb;
    display: none;
  }
  .header_nav .nav_box .king-header-nav .king-header-nav-box ul{
    height:30px;
    line-height:30px;
    margin-left:0;
  }
  .header_nav .nav_box .king-header-nav .king-header-nav-box li{
    margin-top:0;
    clear: both;
    cursor:pointer;
    width:100%;
    diplay:block;
    transition:background .3s linear;
  }
  .header_nav .nav_box .king-header-nav .king-header-nav-box li ul li:hover{
    color:#000;
    cursor:pointer;
    background:#E4F3E5;
    transition:background .3s linear;
  }
  .header_nav .nav_box .king-header-nav .king-header-nav-box li span{
    display:block;
    width:100%;
    text-align: left;
    color: #000;
  }
  .header_nav .nav_box .king-header-nav .king-header-nav-box li ul li{
    text-indent: 2em;
    clear: both;
    text-align: left;
  }
  /* 下拉菜单选中class */
  .king-menu-active{
    color:#43A073;
  }
  /*勿删此行*/
  .header_nav .nav_box .king-header-nav:hover .king-test a{border-bottom:0px solid #FFF;}

  .header_nav .nav_box li{
    float: left;
    width: 10%;
    color: #000;
    text-align: center;
  }
  .header_nav .nav_box li a{
    color: #FFF;
  }
  .header_nav .header_right a{
    color: #000;
  }
  .nav_list{
    display: block;
    height: 40px;
  }
  .king-header-nav ul li{text-align: left;}
  .houtai:hover{
    display:block;
  }
  .height30{
    height: 30px!important;
  }
</style>
