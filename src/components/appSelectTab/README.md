<app-select-tab :data='tabData' class='app-pr'/>

tabData: [{
  text: '选单预排',
  click() {
//            _this.layout = true
    _this.$router.push('/index/rowOfSingle/rowOfLayout')
    _this.title = '选单预排'
  },
  active: true,
  rms: ["A02_01_02", "H03_02"]
}, {
  text: '排单',
  click() {
//            _this.layout = false
    _this.$router.push('/index/rowOfSingle/single')
    _this.title = '排单'
  },
  active: false
  rms: 'B01_03_03'
}]