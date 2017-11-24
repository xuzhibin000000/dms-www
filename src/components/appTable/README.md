## app-table组件开发文档

```
  <app-table :data.sync='tableData' class='app-mt20'></app-table>

  // 关闭自动计算每页记录数
  <app-table :data='tableData' :auto='false'/>

  // 默认自动计算记录数，configHeight属性用于对计算出的表格高度进行手动微调(用于在表格下方存在元素的情况下配置)
  <app-table :configHeight='-60'/>

  export default {
    data() {
      tableData() {
        // 表头字段
        head: [{
          key: 'id',
          value: '客户编号',
          // 存在链接样式
          type: 'link',
          rms: 'H03_03',
          // 隐藏此列
          hide: true
        }, {
          key: 'orderType',
          value: '客户简称',
          // 本列点击事件,item为当前行数据
          click(item) {
            // 更新视图(新增)
            // 参数一：页面url
            // 参数二：模块名(一定要写正确)
            // tabs标签显示名称
            window.updateView('/index/queryPrice', 'QueryPrice', '查询现有价格')
          }
        }, {
          key: 'region',
          value: '主营渠道类型',
          // 跨行跨列
          children: [{
            key: 'state81',
            value: '预排量',
            width: 90,
            // 本列是否显示(可选)
            hide: true,
            // 跨行跨列
            children: [{
              key: 'state811',
              value: 'state811'
            }]
          }, {
            key: 'state82',
            value: '确认量',
            width: 75,
            hide: true
          }, {
            key: 'state83',
            value: '库存量',
            width: 75,
            hide: true
          }, {
            key: 'state84',
            value: '占有量',
            width: 75,
            hide: true
          }, {
            key: 'state85',
            value: '可用库存差异',
            width: 110,
            hide: true
          }, {
            key: 'state86',
            value: '预计库存量',
            width: 100,
            hide: true
          }, {
            key: 'state87',
            value: '预计差异',
            width: 300
          }]
        }, {
          key: 'regionCode',
          value: '客户状态',
          // 显示删除按钮图标
          type: 'remove',
          // 禁用
          disabled: true,
          // 点击删除触发
          click(item) {
            console.log(item)
          }
        }, {
          key: 'erpEntity',
          value: '贸易来往类型',
          // 点击展开
          open: {
            // 展开状态
            value: false,
            // 需要折叠展开的选项
            position: ['erpEntityCode'...]
          }
        }, {
          key: 'disting',
          value: '渠道层级',
          // 固定列
          fixed: true
        }, {
          key: 'erpEntityCode',
          value: '客户类型'
        }, {
          key: 'channelCode',
          value: '客户子类'
        }, {
          key: 'maxId',
          value: '区域'
        }, {
          key: 'defautlOrderType',
          value: '大区'
        }, {
          key: 'state',
          value: '地区'
        }, {
          key: 'state1',
          value: '办事处'
        }],
        // 表数据
        body: [{
          // 当select值发生改变，该字段会自动变更为下拉框label显示的值,value将被赋于_key（_orderType）之上
          orderType: '',
          id: '',
          region: '',
          regionCode: 0,
          erpEntity: '',
          disting: '',
          channelCode: 0,
          erpEntityCode: 0,
          maxId: 0,
          defautlOrderType: 0,
          state: 0,
          state1: 'imgURL',
          // 表格配置
          bodyConfig: [{
            // 状态
            type: 'status',
            position: [{
              key: 'state1',
              // 状态: 绿色/红色/黄色/灰色
              type: 'success/warn/info/default'
            }]
          }, {
            type: 'total',
            position: []
          }, {
            // image config
            type: 'image',
            position: [{
              key: 'state1'
            }]
          }, {
            // 元素类型
            type: 'input',
            // 定位列,需要一个数组,填入需要改变显示类型的key
            position: ['region', 'id']
          }, {
            // 下拉框配置
            type: 'select',
            position: {
              'orderType': [{
                value: '选项1',
                label: '黄金糕'
              }, {
                value: '选项2',
                label: '双皮奶'
              }]
            }
          }, {
            // change事件配置
            type: 'change',
            position: {
              // key : change触发的事件回调，该函数会回传两个参数
              // 如果为select,第一个参数为一个JSON对象,key为label显示的值,value为选中label对应value的值
              // 如果为input/date，第一个参数为当前input/date框的value
              // 第二个参数统一为这一行的数据对象,拿到这个对象可直接进行修改,页面会自动刷新！
              'orderType': function(value, row) {
                console.log(value)
                console.log(row)
                // item.id = 10
              },
              'id': function(value, row) {
                console.log(value)
                console.log(row)
                // item.channelCode = 10
              },
              'regionCode': function(value, row) {
                // 如果是date框,回传的第一个参数为date对象，可以通过format函数进行格式化,传入一个表达式即可
                console.log(value.format('yyyy-MM-dd'))
                console.log(row)
              }
            }
          }, {
            type: 'date',
            // 默认配置
            // position: ['regionCode']
            // 个性化配置
            position: [{
              name: 'regionCode',
              config: {
                minDate: '2017-09-20',
                maxDate: '2017-09-30',
                clearBtn: false
              }
            }]
          }, {
            // 是否存在收藏功能（有五角星）
            type: 'collection',
            position: {
              erpEntity: {
                // 收藏状态（空实心五角）
                checked: true,
                // 五角点击事件,val为td中显示的文字, item为当前行的数据源
                click(val, item) {
                  console.log(val)
                }
              }
            }
          }, {
            // 搜索输入框
            type: 'input-search',
            position: {
              // 点击搜索图标回调, row为行数据, item为一当前列数据,方法名为对应key名即可
              id(row, item) {
                console.log(row)
                console.log(item)
              }
            }
          }, {
            // 起终时间选择
            type: 'time',
            position: [{
              start: 'startingTime',
              end: 'endingTime'
            }]
          }, {
            // td显示icon图标
            type: 'img',
            // 定位td
            position: {
              id: {
                // 急单icon
                icon: 'jidan',
                // 是否带色
                active: true
              },
              orderType: {
                // 分批
                icon: 'fenpi',
                active: true
              },
              region: {
                // 带板
                icon: 'daiban',
                active: true
              },
              regionCode: {
                // 红包
                icon: 'hongbao',
                active: true
              },
              erpEntity: {
                // 备注
                icon: 'beizhu',
                active: true
              }
            }
          }, {
            // 悬浮tip提示框
            type: 'tip',
            position: [{
              // key
              name: 'state1',
              // 提示内容(多条单列)
              tips: [
                'Java: Spring',
                'Java: Hibernate',
                'Java: MyBatis',
                'Node: Express'
              ],
              // 提示内容(多条多列)
              tips: [{
                title: 'title1',
                values: [
                  'Java: Spring',
                  'Java: Hibernate',
                  'Java: MyBatis',
                  'Node: Express'
                ]
              }, {
                title: 'title2',
                values: [
                  'Java: Spring',
                  'Java: Hibernate',
                  'Java: MyBatis',
                  'Node: Express'
                ]
              }, {
                title: 'title3',
                values: [
                  'Java: Spring',
                  'Java: Hibernate',
                  'Java: MyBatis',
                  'Node: Express'
                ]
              }],
              // 标题
              title: 'heheda'
            }, {
              name: 'state2',
              tips: [
                'Java: Struts',
                'Java: SpringMVC',
                'Java: JFinal',
                'Node: Koa'
              ],
              title: 'haha'
            }]
          }, {
            // 设置属性
            type: 'attr',
            position: {
              state1: {
                colspan: '8'
              }
            }
          }, {
            // 设置样式
            type: 'style',
            position: {
              // td样式
              state1: {
                'text-align': 'right'
              }
            },
            // tr样式
            background: '#C2EBFA'
          }, {
            type: 'upload',
            position: {
              state1: {
                // 请求URL
                url: 'url',
                // 上传成功回调
                success(data) {
                  // TODO ...
                },
                // 上传失败回调
                error(data) {
                  // TODO ...
                },
                // 请求参数
                data: {

                },
                // Loading显示区域
                target: 'body',
                // 按钮图标
                icon: '',
                // 显示文字
                text: '文件上传'
              }
            }
          }, {
            state1: '10',
            state2: '怡纯,350ml,1×24',
            state3: '1',
            state4: '201706',
            state5: '-43',
            state6: '0',
            bodyConfig: [{
              type: 'attr',
              position: {
                state1: {
                  rowspan: '2'
                },
                state2: {
                  rowspan: '2'
                },
                state3: {
                  rowspan: '2'
                }
              }
            }, {
              type: 'input',
              position: ['state6']
            }]
          }, {
            // 跨行跨列，被占用的字段必须设置为null
            state1: null,
            state2: null,
            state3: null,
            state4: '201706',
            state5: '-43',
            state6: '0',
            bodyConfig: [{
              type: 'input',
              position: ['state6']
            }]
          }, {
            // 状态
            type: 'state',
            position: {
              state5: false
            }
          }, {
            // 表格按钮
            type: 'button',
            position: [{
              key: 'key',
              // 按钮类型
              type: 'default/success/main/warn',
              rms: '权限编码',
              // 按钮click事件
              click() {
                // TODO...
              }
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

  // =============
  // 手动选中元素
  this.tableData.selected(item1, item2...)
  this.tableData.selectedAll(list)
  // 添加元素
  this.tableData.add(item1, item2...)
  // 添加元素(直接添加一个数组)
  this.tableData.addAll([item1, item2])
  // 删除元素
  this.tableData.remove()
  // 高亮行,参数一：行数
  this.tableData.brightRow('1')
  // 取消高亮
  this.tableData.brightRow('1', false)
  // 强制重新渲染
  this.tableData.reloadView()

  // ======== 🌲树结构🌲 =========
  <app-table :data='tableData' class='app-mt10 app-oh'/>
  // 数据源
  tableData: {
    head: [{
      key: 'state1',
      value: '板块'
    }, {
      key: 'state2',
      value: '组织/客户'
    }, {
      key: 'state3',
      value: '1-6月实际达成差值'
    }, {
      key: 'state4',
      value: '1-6月任务达成率'
    }, {
      key: 'state5',
      value: '预估7月任务达成差值'
    }, {
      key: 'state6',
      value: '预估7月任务达成率'
    }, {
      key: 'state7',
      value: '8月任务量'
    }, {
      key: 'state8',
      value: '8月任务达成率(设定指标)',
      width: '120'
    }, {
      key: 'state9',
      value: '8月目标量'
    }, {
      key: 'state10',
      value: '预估1-8月累计任务达成率',
      width: '120'
    }, {
      key: 'state11',
      value: '占年度比'
    }, {
      key: 'state12',
      value: '去年同期比'
    }, {
      key: 'state13',
      value: '预估8月末库存周转天数',
      width: '120'
    }],
    body: [{
      state1: '水',
      state2: '湖南大区',
      state3: '516832',
      // ID,最外层无父ID
      'table-id': 1,
      bodyConfig: []
    }, {
      state1: '',
      state2: '河东1部办事处',
      state3: '516832 ',
      // 父ID
      'table-parent-id': 1,
      'table-id': 2,
      bodyConfig: []
    }, {
      state1: '',
      state2: '河东1部办事处2',
      state3: '516832 ',
      // 父ID,最内层无ID
      'table-parent-id': 2,
      bodyConfig: []
    }, {
      state1: '',
      state2: '株洲办事处',
      state3: '516832 ',
      'table-id': 3,
      'table-parent-id': 1,
      bodyConfig: []
    }, {
      state1: '',
      state2: '株洲鸿大商行',
      state3: '516832 ',
      'table-parent-id': 3,
      bodyConfig: []
    }, {
      state1: '饮料',
      state2: '湖南大区',
      state3: '516832',
      'table-id': 11,
      bodyConfig: []
    }, {
      state1: '',
      state2: '河东1部办事处',
      state3: '516832 ',
      'table-parent-id': 11,
      'table-id': 21,
      bodyConfig: []
    }, {
      state1: '',
      state2: '株洲办事处',
      state3: '516832 ',
      'table-parent-id': 21,
      bodyConfig: []
    }],
    select: [],
    // 表格配置
    config: {
      // cover: true,
      width: 1400,
      // cover: true,
      // 是否存在多选按钮
      // select: true,
      // 是否存在边框
      border: true,
      // 总记录数
      total: 0,
      // 每页记录数
      pageSize: 16,
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
  // ========= 🌲 =========

```