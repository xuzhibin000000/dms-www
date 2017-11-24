### 客户产品弹窗使用方法
#### 1：使用案列
```
    ...
    // 弹出按钮  通过修改：:show来控制弹出
    <app-button @click.native="show = true" value="弹窗"></app-button>
    // 页面引入弹窗
    <app-dialog :show.sync='show'>
        <app-select-prod-and-cust :data="testData" :selectData="selectData" @callback="callbacks"/>
    </app-dialog>
    ...
    export default {
    data() {
      let _this = this
      return {
        // 显示
        show: false,
        // 弹窗内回传数据
        // 回传数据 格式
        // selectData: {customers：[], products: []}
        // 分别为客户数据和产品数据
        selectData: {},
        // 页面传入弹窗数据
        testData: {
//          regionCode: 'O 50002931',    // 区域
//          largeZoneCode: 'O 50002937', // 大区
//          localCode: '',               // 地区
//          officeCode: '',              // 办事处
//          channLevel: '',              // 渠道层级


        },
        }

    },
    methods: {
      // 弹窗回调方法 obj为弹窗内数据 同上面selectData
      callbacks(obj) {
        // 客户弹窗回调方法
        console.log('弹窗回调方法')
        console.log(obj)
      }

    }
```
