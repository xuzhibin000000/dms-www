import getters from './getters'

const state = {
  // 菜单选项
  // menu: []
  menu: [
    {
      name: '订单管理',
      children: [
        {
          name: '在线下单',
          children: [
            {
              name: '在线下单',
              config: {
                // url路径
                path: '/index/downOrder',
                // 模块名称
                name: 'DownOrder',
                // 中文名称(用户所见)
                title: '在线下单'
              }
            },
            {
              name: '订单查询',
              config: {
                // url路径
                path: '/index/orderSearch',
                // 模块名称
                name: 'OrderSearch',
                // 中文名称(用户所见)
                title: '订单查询'
              }
            },
            {
              name: '需求到货日期更改申请查询',
              config: {
                path: '/index/orderDemandTimeExamine',
                name: 'OrderDemandTimeExamine',
                title: '需求到货日期更改申请查询'
              }
            }
          ]
        },
        {
          name: '下游订单管理',
          children: [
            {
              name: '下游订单处理',
              config: {
                path: '/index/downStreamOrder',
                name: 'DownStreamOrder',
                title: '下游订单处理'
              }
            }
          ]
        },
        {
          name: '调拨单管理',
          children: [
            {
              name: '调拨单录入',
              config: {
                path: '/index/adjustOrder',
                name: 'AdjustOrder',
                title: '调拨单录入'
              }
            },
            {
              name: '调拨单查询',
              config: {
                path: '/index/adjustOrderQuery',
                name: 'AdjustOrderQuery',
                title: '调拨单查询'
              }
            }
          ]
        },
        {
          name: '借货单管理',
          children: [
            {
              name: '借货单录入',
              config: {
                path: '/index/lendOrder',
                name: 'LendOrder',
                title: '借货单录入'
              }
            },
            {
              name: '借货单查询及处理',
              config: {
                path: '/index/lendOrderQuery',
                name: 'LendOrderQuery',
                title: '借货单查询及处理'
              }
            }
          ]
        }
      ]
    },
    {
      name: '价格管理',
      children: [
        {
          name: '基本价格管理',
          children: [
            {
              name: '查询现有价格',
              config: {
                path: '/index/queryPrice',
                name: 'QueryPrice',
                title: '查询现有价格'
              }
            },
            {
              name: '创建新协议价',
              config: {
                path: '/index/createPrice',
                name: 'CreatePrice',
                title: '创建新协议价'
              }
            },
            {
              name: '代收运费维护',
              config: {
                path: '/index/collectFreight',
                name: 'CollectFreight',
                title: '代收运费维护'
              }
            }
          ]
        },
        {
          name: '促销活动发布',
          children: [
            {
              name: '促销活动查询',
              config: {
                path: '/index/promotionSearch',
                name: 'PromotionSearch',
                title: '促销活动查询'
              }
            },
            {
              name: '促销活动维护',
              config: {
                path: '/index/promotionManage',
                name: 'PromotionManage',
                title: '促销活动维护'
              }
            }
          ]
        },
        {
          name: '费用核销管理',
          children: [
            {
              name: '核销明细维护',
              config: {
                path: '/index/costReturnCheck',
                name: 'CostReturnCheck',
                title: '核销明细维护'
              }
            },
            {
              name: '费用返还查询',
              config: {
                path: '/index/costReturnSearch',
                name: 'CostReturnSearch',
                title: '费用返还查询'
              }
            },
            {
              name: '费用返还创建',
              config: {
                path: '/index/costReturnCreate',
                name: 'CostReturnCreate',
                title: '费用返还创建'
              }
            },
            {
              name: '费用核算台账查询',
              config: {
                path: '/index/costAccountLedger',
                name: 'CostAccountLedger',
                title: '费用核算台账查询'
              }
            }
          ]
        }
      ]
    },
    {
      name: '排单管理',
      children: [
        {
          name: '分批发货拆单',
          children: [
            {
              name: '分批发货拆单',
              config: {
                path: '/index/roworder/batchShipSplitOrder',
                name: 'BatchShipmentSplitOrder',
                title: '分批发货拆单'
              }
            }
          ]
        },
        // {
        //   name: '选单预排',
        //   children: [
        //     {
        //       name: '选单预排',
        //       config: {
        //         path: '/index/rowOfLayout',
        //         name: 'RowOfLayout',
        //         title: '选单预排'
        //       }
        //     }
        //   ]
        // },
        {
          name: '排单',
          children: [
            {
              name: '排单',
              config: {
                path: '/index/rowOfSingle',
                name: 'RowOfSingleBox',
                title: '排单'
              }
            }
          ]
        },
        // {
        //   name: '排单明细',
        //   children: [
        //     {
        //       name: '排单明细',
        //       config: {
        //         path: '/index/rowOfSingleDeta',
        //         name: 'RowOfSingleDeta',
        //         title: '排单明细'
        //       }
        //     }
        //   ]
        // },
        {
          name: '排单查询',
          children: [
            {
              name: '排单查询',
              config: {
                path: '/index/roworder/roworderSearch',
                name: 'RoworderSearch',
                title: '排单查询'
              }
            }
          ]
        }
      ]
    },
    {
      name: '计划管理',
      children: [
        {
          name: '任务管理',
          children: [
            {
              name: '渠道商任务导入',
              config: {
                path: '/index/channelTaskImport',
                name: 'ChannelTaskImport',
                title: '渠道商任务导入'
              }
            },
            {
              name: '渠道商任务查询',
              config: {
                path: '/index/channelTaskSearch',
                name: 'ChannelTaskSearch',
                title: '渠道商任务查询'
              }
            },
            {
              name: '内部任务导入',
              config: {
                path: '/index/taskImport',
                name: 'TaskImport',
                title: '内部任务导入'
              }
            },
            {
              name: '内部任务查询',
              config: {
                path: '/index/taskSearch',
                name: 'TaskSearch',
                title: '内部任务查询'
              }
            }
          ]
        },
        {
          name: '计划管理',
          children: [
            {
              name: '月目标设置',
              config: {
                path: '/index/monthlyConfig',
                name: 'MonthlyConfig',
                title: '月目标设置'
              }
            },
            {
              name: '三月九旬计划审核',
              config: {
                path: '/index/planCheck39',
                name: 'PlanCheck39',
                title: '三月九旬计划审核'
              }
            },
            {
              name: '三月九旬计划提报',
              config: {
                path: '/index/planSubmitTime39',
                name: 'PlanSubmitTime39',
                title: '三月九旬计划提报'
              }
            }
          ]
        },
        {
          name: '执行跟踪',
          children: [
            {
              name: '任务达成跟踪',
              config: {
                path: '',
                name: '',
                title: ''
              }
            },
            {
              name: '计划执行跟踪',
              config: {
                path: '',
                name: '',
                title: ''
              }
            },
            {
              name: '业绩达成跟踪',
              config: {
                path: '',
                name: '',
                title: ''
              }
            }
          ]
        }
      ]
    },
    {
      name: '进销存管理',
      children: [
        {
          name: '入库管理',
          children: [
            {
              name: '收货确认',
              config: {
                path: '/index/receiptConfirmation',
                name: 'ReceiptConfirmation',
                title: '收货确认'
              }
            }
          ]
        },
        {
          name: '出库管理',
          children: [
            {
              name: '出货提报',
              config: {
                path: '/index/shipmentQuote/shippingDeta',
                name: 'ShipmentQuote',
                title: '出货提报'
              }
            },
            {
              name: '出货查询',
              config: {
                path: '/index/shipmentSubmitSearch',
                name: 'ShipmentSubmitSearch',
                title: '出货查询'
              }
            }
          ]
        },
        {
          name: '盘点管理',
          children: [
            {
              name: '库存盘点',
              config: {
                path: '/index/inventorySearchAndConfirm',
                name: 'InventorySearchAndConfirm',
                title: '库存盘点'
              }
            },
            {
              name: '库存确认',
              config: {
                path: '/index/inventorySearchAndConfirm?flag=1',
                name: 'InventorySearchAndConfirm',
                title: '库存确认'
              }
            },
            {
              name: '客户库存盘点提报查询',
              config: {
                path: '/index/inventoryReportSearch',
                name: 'InventoryReportSearch',
                title: '客户库存盘点提报查询'
              }
            }
          ]
        },
        {
          name: '库存调整',
          children: [
            {
              name: '经销商库存调整',
              config: {
                path: '/index/invManager',
                name: 'InvManager',
                title: '经销商库存调整'
              }
            }
          ]
        },
        {
          name: '库存分析',
          children: [
            {
              name: '进出货流水查询',
              config: {
                path: '/index/shipmentFlowSearch',
                name: 'ShipmentFlowSearch',
                title: '进出货流水查询'
              }
            },
            {
              name: '经销商出货明细查询',
              config: {
                path: '/index/shipmentSearch',
                name: 'ShipmentSearch',
                title: '经销商出货明细查询'
              }
            },
            {
              name: '提货商库存查询',
              config: {
                path: '/index/inventoryQuery',
                name: 'InventoryQuery',
                title: '提货商库存查询'
              }
            }
          ]
        },
        {
          name: '发运管理',
          children: [
            {
              name: '装运界面',
              config: {
                path: '/index/shippingSearch',
                name: 'ShippingSearch',
                title: '装运界面'
              }
            },
            {
              name: '装运查询',
              config: {
                path: '/index/shipListSearch',
                name: 'ShipListSearch',
                title: '装运单查询'
              }
            }
          ]
        }
      ]
    },
    {
      name: '财务协同管理',
      children: [
        {
          name: '查账对账',
          children: [
            {
              name: '查账对账',
              config: {
                path: '',
                name: '',
                title: ''
              }
            }
          ]
        }
      ]
    },
    {
      name: '报表管理',
      children: [
        {
          name: '订单排单',
          children: [
            {
              name: '订单明细报表',
              config: {
                path: '',
                name: '',
                title: ''
              }
            },
            {
              name: '排单报表(已排未排)',
              config: {
                path: '/index/scheduleOrderReport',
                name: 'ScheduleOrderReport',
                title: '排单报表(已排未排)'
              }
            },
            {
              name: '经销商借货还货明细',
              config: {
                path: '/index/lendOrderReport',
                name: 'LendOrderReport',
                title: '经销商借货还货明细'
              }
            },
            {
              name: '销量汇总导出',
              config: {
                path: '/index/salesCollect',
                name: 'SalesCollect',
                title: '销量汇总导出'
              }
            }
          ]
        },
        {
          name: '进销存',
          children: [
            {
              name: '发货明细报表',
              config: {
                path: '/index/shippmentDetailReport',
                name: 'ShippmentDetailReport',
                title: '发货明细报表'
              }
            },
            {
              name: '核销报表(搭赠)',
              config: {
                path: '',
                name: '',
                title: ''
              }
            },
            {
              name: '装运报表',
              config: {
                path: '/index/shippingReport',
                name: 'ShippingReport',
                title: '装运报表'
              }
            }
          ]
        },
        {
          name: '计划任务',
          children: [
            {
              name: '经分销商月度达成率分析',
              config: {
                path: '/index/monthTargetReport',
                name: 'MonthTargetReport',
                title: '经分销商月度达成率分析'
              }
            }, {
              name: '计划执行跟踪',
              config: {
                path: '/index/planExecuteTrack',
                name: 'PlanExecuteTrack',
                title: '计划执行跟踪'
              }
            }
          ]
        },
        {
          name: '客户基本信息管理',
          children: [
            {
              name: '客户基本信息',
              config: {
                path: '/index/customerInfoManage',
                name: 'CustomerInfoManage',
                title: '客户基本信息'
              }
            }
          ]
        }
      ]
    },
    {
      name: '后台管理',
      children: [
        {
          name: '用户管理',
          children: [
            {
              name: '用户管理',
              config: {
                path: '/index/userAdmin',
                name: 'UserAdmin',
                title: '用户管理'
              }
            }
            // ,
            // {
            //   name: '用户账号管理',
            //   config: {
            //     path: '',
            //     name: '',
            //     title: ''
            //   }
            // },
            // {
            //   name: '角色/用户基本信息',
            //   config: {
            //     path: '',
            //     name: '',
            //     title: ''
            //   }
            // },
            // {
            //   name: '用户密码修改',
            //   config: {
            //     path: '/index/userModifyPassword',
            //     name: 'UserModifyPassword',
            //     title: '用户密码修改'
            //   }
            // }
          ]
        },
        {
          name: '订单配置',
          children: [
            {
              name: '订单配置',
              config: {
                path: '/index/orderConfig',
                name: 'OrderConfig',
                title: '一级订单编号规则'
              }
            },
            {
              name: '时效提报配置',
              config: {
                path: '/index/planManageConfig',
                name: 'PlanManageConfig',
                title: '时效提报配置'
              }
            }
            // {
            //   name: '订单起订量',
            //   config: {
            //     path: '',
            //     name: '',
            //     title: ''
            //   }
            // },
            // {
            //   name: '最早需求到货日期',
            //   config: {
            //     path: '',
            //     name: '',
            //     title: ''
            //   }
            // },
            // {
            //   name: '预计入库量',
            //   config: {
            //     path: '',
            //     name: '',
            //     title: ''
            //   }
            // },
            // {
            //   name: '子库最大发运量',
            //   config: {
            //     path: '/index/maximumShippAmount',
            //     name: 'maximumShippAmount',
            //     title: '子库最大发运量'
            //   }
            // }
            // {
            //   name: '默认业务实体',
            //   config: {
            //     path: '',
            //     name: '',
            //     title: ''
            //   }
            // },
            // {
            //   name: '提货方式',
            //   config: {
            //     path: '',
            //     name: '',
            //     title: ''
            //   }
            // },
            // {
            //   name: '借货方信息',
            //   config: {
            //     path: '',
            //     name: '',
            //     title: ''
            //   }
            // },
            // {
            //   name: '订单类型',
            //   config: {
            //     path: '',
            //     name: '',
            //     title: ''
            //   }
            // },
            // {
            //   name: '品类子项',
            //   config: {
            //     path: '',
            //     name: '',
            //     title: ''
            //   }
            // },
            // {
            //   name: '其它订单编号规则',
            //   config: {
            //     path: '',
            //     name: '',
            //     title: ''
            //   }
            // },
            // {
            //   name: 'DMS与ERP订单匹配',
            //   config: {
            //     path: '',
            //     name: '',
            //     title: ''
            //   }
            // },
            // {
            //   name: '区域与发货仓关系',
            //   config: {
            //     path: '',
            //     name: '',
            //     title: ''
            //   }
            // }
          ]
        },
        {
          name: '进销存配置',
          children: [
            {
              name: '进销存配置',
              config: {
                path: '/index/invoicingConfig',
                name: 'InvoicingConfig',
                title: '进销存配置'
              }
            }]
        },
        {
          name: '后台图片管理',
          children: [
            {
              name: '后台图片管理',
              config: {
                path: '/index/imageManage',
                name: 'ImageManage',
                title: '后台图片管理'
              }
            }]
        },
        {
          name: '帮助中心',
          children: [
            {
              name: '帮助中心',
              config: {
                path: '/index/helperCenter',
                name: 'HelperCenter',
                title: '帮助中心'
              }
            },
            {
              name: '创建帮助',
              config: {
                path: '/index/createHelp',
                name: 'CreateHelp',
                title: '创建帮助'
              }
            }
          ]
        },
        {
          name: '数据库对比',
          children: [
            {
              name: '数据库对比',
              config: {
                path: '/index/databaseCompare',
                name: 'DatabaseCompare',
                title: '数据库对比'
              }
            }
          ]
        }
      ]
    }
  ]
  // 每页记录数
  // pageSize: 10
}

const mutations = {
  SET_PAGE_SIZE(state, pageSize) {
    state.pageSize = pageSize
  },
  setMenu(state, obj) {
    // console.error(obj)
    state.menu = obj
  }
}

export default {
  state,
  mutations,
  getters
}
