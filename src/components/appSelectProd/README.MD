## 产品弹窗使用方法
####
```
    ...
    // 绑定组件事件弹出  通过修改：:show来控制弹出
    <app-select-box name='产品编号' @click.native='show = true' :value.sync='productInfo.productNumber' type="input"></app-select-box>
    ...
    // 页面引入产品弹窗
    <app-dialog :show.sync='show'>
          <app-select-prod :productInfo.sync='productInfo' @callback="callbacks"></app-select-prod>
    </app-dialog>
    ...


    ...
    data() {
          return {
            // 显示/隐藏弹窗，变量名可自定义
            show: false,
            // 弹窗回传产品信息对象，变量名可自定义
            productInfo: {},
            ...
          }
    }
    ...

    ...
    methods: {
          // 弹窗回调方法 obj为弹窗内数据 同上面的productInfo
          callbacks(obj) {
            // 产品弹窗回调方法
            console.log('产品弹窗回调方法')
            console.log(obj)
          }

        }
    ...
```
