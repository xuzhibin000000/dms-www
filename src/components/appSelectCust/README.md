## 客户弹窗使用方法
###  1.使用方法
####
```
    ...
    // 弹出按钮  通过修改：:show来控制弹出
    <app-button @click.native="show = true" value="客户弹窗"></app-button>
    // 页面引入客户弹窗
    <app-dialog :show.sync='show'>
        <app-select-cust :data="customerData" :select="select" @callback="callbacks"/>
    </app-dialog>
    ...
    export default {
    data() {
      let _this = this
      return {
        // 显示
        show: false,
        // 弹窗内回传数据
        select: [],
        // 页面传入弹窗数据
        customerData: {
            type:radio,                  //（必填选项） 是单选框还是多选框 checkbox 多选 radio 单选
//          mainChannType: 'Z003',       // 主营渠道类型
//          customerStatus: 'Z1'         // 客户状态
//          regionCode: 'O 50002931',    // 区域
//          largeZoneCode: 'O 50002937', // 大区
//          localCode: '',               // 地区
//          officeCode: '',              // 办事处
//          tradeType: '699464',         // 贸易往来类型
//          channLevel: '',              // 渠道层级
//          customerType: '',            // 客户类型
//          customerSubClass: ''         // 客户子类

        },
        }

    },
    methods: {
      // 弹窗回调方法 obj为弹窗内数据 同上面的select
      callbacks(obj) {
        // 客户弹窗回调方法
        console.log('客户弹窗回调方法')
        console.log(obj)
      }

    }
```
###  2.参数传递（限制弹窗内的下拉数据）
#### &nbsp;&nbsp;&nbsp;&nbsp;弹出弹窗时如果需要限制搜索条件 可以根据上面参数进行传递。  但是需要注意如果需要限制办事处 则应同时传入相应的区域，大区，地区编码。同样如要限制渠道层级，客户类型 等带有级联的条件如需限制下层条件需要同时传入上层对应的条件
