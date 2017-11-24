<template>
  <div class="app-submit-deta">
    <app-title value='提交明细' class='app-submit-title'/>
    <app-table :data='tableData' :auto='false'/>
    <div class="app-center">
      <app-button value='取消' />
      <app-button value='确定'/>
    </div>
  </div>
</template>

<script>
  export default {
    data() {
      return {
        tableData: {
          head: [{
            key: 'state1',
            value: '产品名称'
          }, {
            key: 'state2',
            value: '工厂库存量'
          }, {
            key: 'state3',
            value: '工厂占有量'
          }, {
            key: 'state4',
            value: '工厂待检量'
          }, {
            key: 'state5',
            value: '工厂预计入库量'
          }, {
            key: 'state6',
            value: '工厂确认量'
          }, {
            key: 'state7',
            value: '排单备注'
          }, {
            key: 'state8',
            value: '六安仓'
          }, {
            key: 'state9',
            value: '承运商'
          }, {
            key: 'state10',
            value: '发运方法'
          }, {
            key: 'state11',
            value: '地区'
          }, {
            key: 'state12',
            value: '办事处'
          }],
          body: [{
            state1: '',
            state2: '',
            bodyConfig: [{
              type: 'img',
              position: {
                state1: {
                  // 急单icon
                  icon: 'jidan',
                  // 是否带色
                  active: true
                },
                state2: {
                  // 分批
                  icon: 'fenpi',
                  active: true
                }
              }
            }]
          }],
          select: [],
          // 表格配置
          config: {
            cover: true,
            // width: 1200,
            // cover: true,
            // 是否存在多选按钮
            select: true,
            // 是否存在边框
            border: true,
            // 总记录数
            total: 15,
            // 每页记录数
            pageSize: 15,
            // 请求配置
            http: {
              // 请求url
              url: '',
              // 当前页,此项会自动更新
              currentPage: 1,
              // 数据
              data: {},
              // 回调函数
              callback: function(data) {
              }
            }
          }
        }
      }
    }
  }
</script>

<style lang='less' scoped>
  .app-submit-deta{
    .app-submit-title{
      position: absolute;
      top: 12px;
      z-index: -1;
    }
  }
</style>
