<template>
  <div class='body'>
    <app-table :data='tableData'/>
    <app-test />
  </div>
</template>

<script>
  export default {
    data() {
      return {
        msg: 'Hello World',
        tableData: {
          // 表头字段
          head: [{
            key: 'state1',
            value: '客户'
          }, {
            key: 'state2',
            value: '产品说明'
          }],
          // 表数据
          body: [{
            state1: 'aaa',
            state2: '2017-10-10',
            bodyConfig: [{
              // 状态
              type: 'status',
              position: [{
                key: 'state1',
                // 状态: 绿色/红色/黄色/灰色
                type: 'success'
              }]
            }, {
              type: 'date',
              position: ['state2']
            }]
          }],
          select: [],
          // 表格配置
          config: {
            // 表格宽度
            // width: 600,
            // 是否存在多选按钮
            select: true,
            // 是否存在边框
            border: true,
            // 总记录数
            total: 10,
            // 高度为必填属性
            height: 400,
            // 每页记录数
            pageSize: 10,
            // 合计行
            totalNumber: '1',
            // 自定义排序规则
            sortChange: function(params) {
              console.log(params)
            },
            // 表格选择器,用于查询时定位loading显示区域
            target: 'table',
            // 在空间有限的情况下，可以使用简单的小型分页。
            small: true,
            // 是否平铺表格
            cover: true,
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
                console.log(data)
              }
            }
          }
        }
      }
    }
  }
</script>

<style lang='less' scoped>
  // .body{
  //   height: 500px;
  //   line-height: 500px;
  //   text-align: center;
  // }
</style>
