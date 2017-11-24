/*
  全局注册组件
 */

import Vue from 'vue'

// 标题
import appTitle from './appTitle'
// 按钮
import appButton from './appButton'
// 输入框组
import appInputBox from './appInputBox'
// 常用备注
import appRemarks from './appRemarks'
// 表格
import appTable from './appTable'
// 配置页左侧菜单
import appLeftMenu from './appLeftMenu'
// 下拉框组
import appSelectBox from './appSelectBox'
// 配置页按钮
import appConfigButton from './appConfigButton'
// 选择客户
import appSelectCust from './appSelectCust'
// 选择产品
import appSelectProd from './appSelectProd'
// 弹框组件
import appDialog from './appDialog'
// 文件上传
import appUpload from './appUpload'
// 订单确认弹窗
import appOrderConfirm from './appOrderConfirm'
// 选择客户/产品弹窗
import appSelectProdAndCust from './appSelectProdAndCust'
// 批量插入按钮
import appConfigInsertsButton from './appConfigInsertsButton'
// select tab
import appSelectTab from './appSelectTab'
// 提交明细
import appSubmitDeta from './appSubmitDeta'
// selectBar
import appSelectBar from './appSelectBar'
// 时间轴
import appTimeAxis from './appTimeAxis'
// 日期控件
import appDate from './appDate'
// 选择促销弹窗
import appSelectPromotion from './appSelectPromtion'
// 发货单
import appInvoice from './appInvoice'
import appTest from './appTest'

Vue.use(appTest)
Vue.use(appInvoice)
Vue.use(appDate)
Vue.use(appTimeAxis)
Vue.use(appSelectBar)
Vue.use(appSubmitDeta)
Vue.use(appSelectTab)
Vue.use(appConfigInsertsButton)
Vue.use(appSelectProdAndCust)
Vue.use(appOrderConfirm)
Vue.use(appTable)
Vue.use(appTitle)
Vue.use(appLeftMenu)
Vue.use(appButton)
Vue.use(appInputBox)
Vue.use(appRemarks)
Vue.use(appSelectBox)
Vue.use(appConfigButton)
Vue.use(appSelectCust)
Vue.use(appSelectProd)
Vue.use(appDialog)
Vue.use(appUpload)
Vue.use(appSelectPromotion)
