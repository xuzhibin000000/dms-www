<template>
  <div class="app-select-category">
    <app-table v-if="showSwipe" :data.sync='tableData' :configHeight='-60' :padding='false' :auto="auto"/>
  </div>
</template>

<script>
  import {
    orderProductSelectFavSave
  } from '@/api/api.js'

  export default {
    name: 'app-select-order-product',
    props: {
      orderType: {
        default: '1'
      },
      orderSource: {
        default: ''
      },
      costFlag: {
        default: '1'
      },
      productUtil: {
        default: {}
      },
      auto: {
        default: true
      },
      isIU: {
        default: true
      }
    },
    data() {
      // let _this = this
      return {
        showSwipe: true,
        tableData: {},
        categoryList: [],
        tableDataMap: {},
        CategoryCode: this.categoryCode
      }
    },
    methods: {
      getTableData() {
        let _this = this
        let returnData
        if (this.orderType === 3 || this.orderType === 4 || this.orderType === '3' || this.orderType === '4') {
          returnData = {
            head: [{
              key: 'productNumber',
              value: '产品编号'
            }, {
              key: 'productDescrip',
              value: '产品名称'
            }, {
              key: 'unit',
              value: '单位',
              width: 70
            }, {
              key: 'negotiatedPrice',
              value: '单价',
              width: 90
            }, {
              key: 'orderQuantity',
              value: '订货量',
              type: 'input'
            }, {
              key: 'bankAmount',
              value: '金额'
            }, {
              key: 'weight',
              value: '重量(吨)'
            }],
            // 表数据
            body: [],
            select: [],
            // 表格配置
            config: {
              select: false,
              border: true,
              cover: true,
              // 每页记录数
              pageSize: 16,
              // currentPage: 1,
              noLimit: true,
              http: {}
            }
          }
          return returnData
        } else if (this.orderType === '1' || this.orderType === 1) {
          returnData = {
            head: [{
              key: 'productNumber',
              value: '产品编号',
              width: 87
            }, {
              key: 'productDescrip',
              value: '产品名称',
              width: 181
            }, {
              key: 'unit',
              value: '单位',
              width: 70
            }, {
              key: 'negotiatedPrice',
              value: '协议价',
              width: 75
            }, {
              key: 'promotionDiscount',
              value: '促销折扣',
              width: 84
            }, {
              key: 'costReturn',
              value: '费用返还',
              width: 84
            }, {
              key: 'onePrice',
              value: '单价',
              width: 99,
              open: {
                value: false,
                position: ['negotiatedPrice', 'promotionDiscount', 'costReturn']
              }
            }, {
              key: 'orderQuantity',
              value: '订货量',
              type: 'input',
              width: 103
            }, {
              key: 'bankAmount',
              value: '金额',
              width: 105
            }, {
              key: 'freightCollect',
              value: '代收运费',
              hide: !_this.isIU,
              width: 86
            }, {
              key: 'openPrice',
              value: '开单价',
              hide: !_this.isIU,
              width: 75
            }, {
              key: 'allMount',
              value: '开单金额',
              hide: !_this.isIU,
              width: 90
            }, {
              key: 'weight',
              value: '重量(吨)'
            }],
            // 表数据
            body: [],
            select: [],
            // 表格配置
            config: {
              select: false,
              border: true,
              cover: true,
              // 每页记录数
              pageSize: 16,
              // currentPage: 1,
              noLimit: true,
              http: {}
            }
          }
          return returnData
        }
      }
    },
    computed: {},
    created() {
      this.tableData = this.getTableData()
    },
    mounted() {
      let _this = this
      this.productUtil.addCategory = (mapInfo) => {
        let index = 0
        _this.tableData.body = []
        let positions = ['orderQuantity']
        if (_this.orderType === 3 || _this.orderType === '3') {
          positions.add('negotiatedPrice')
        }
        let i = 0
        for (let productNumber in mapInfo) {
          let mapKey = ''
          if ((_this.orderType === 1 || _this.orderType === '1') && (_this.orderSource === 'ZZ' || _this.orderSource === 'DZ')) {
            mapKey = mapInfo[productNumber].productNumber + '-' + i
            i++
          } else {
            mapKey = productNumber
          }
          let promoList = []
          if (mapInfo[productNumber].promList) {
            let promPojoTitle = {}
            promPojoTitle.title = '促销活动编号'
            promPojoTitle.values = []
            let promPojoDescription = {}
            promPojoDescription.title = '促销活动名称'
            promPojoDescription.values = []
            let promPojoMoney = {}
            promPojoMoney.title = '折扣金额'
            promPojoMoney.values = []
            mapInfo[productNumber].promList.forEach(e => {
              promPojoTitle.values.add(e.promotionActNumber)
              promPojoDescription.values.add(e.promotionName)
              promPojoMoney.values.add(e.amount)
            })
            promoList.add(promPojoTitle)
            promoList.add(promPojoDescription)
            promoList.add(promPojoMoney)
          }
          mapInfo[mapKey].bodyConfig = [{
            type: 'input',
            position: positions
          }, {
            type: 'change',
            position: {
              'orderQuantity': function (value, item, isCopy) {
                if (_this.orderType === 1 || _this.orderType === '1') {
                  let quantity = _this.integerCheck(value, 8, 'POSITIVE', !isCopy)
                  item.orderQuantity = quantity
                  if (quantity === '0') {
                    item.bankAmount = 0
                    item.weight = 0
                  } else {
                    item.bankAmount = _this.fix(item.orderQuantity * item.onePrice)
                    item.weight = _this.fix(item.orderQuantity * item.grossWeightKg)
                    // 开单金额
                    item.allMount = _this.fix(item.orderQuantity * item.openPrice)
                  }
                } else {
                  let quantity = _this.decimalCheck(value, 8, 2, 'POSITIVE', !isCopy)
                  item.bankAmount = _this.fix(quantity * item.negotiatedPrice)
                  item.weight = _this.fix(quantity * item.grossWeightKg)
                  item.orderQuantity = quantity
                }
                _this.$emit('addProduct')
              }
            }
          }, {
            type: 'collection',
            position: {
              productDescrip: {
                // 收藏状态（空实心五角）
                checked: mapInfo[mapKey].isFav,
                click(val, item) {
                  _this.http.post(orderProductSelectFavSave + '?productNuber=' + item.productNumber + '&isSave=' + !item.isFav).then(res => {
                    if (res.code === '00000') {
                      item.isFav = !item.isFav
                      item.bodyConfig.forEach(e => {
                        if (e.type === 'collection') {
                          e.position.productDescrip.checked = item.isFav
                        }
                      })
                    }
                  })
                }
              }
            }
          }]
          if (promoList && promoList.length !== 0) {
            mapInfo[mapKey].bodyConfig.add({
              type: 'tip',
              position: [{
                // key
                name: 'promotionDiscount',
                // 提示内容(多条)
                tips: promoList,
                // 标题
                title: '促销详情'
              }]
            })
          }
          if (_this.orderType === 3 || _this.orderType === '3') {
            mapInfo[mapKey].bodyConfig.add({
              type: 'change',
              position: {
                'negotiatedPrice': function (value, item, isCopy) {
                  if (isNaN(value)) {
                    item.bankAmount = 0
                    item.negotiatedPrice = 0
                  } else {
                    let price = _this.decimalCheck(value, 4, 2, 'POSITIVE', !isCopy)
                    item.negotiatedPrice = price
                    item.bankAmount = _this.fix(value * item.orderQuantity)
                  }
                  _this.$emit('addProduct')
                }
              }
            })
          }
          mapInfo[mapKey].index = ++index
          mapInfo[mapKey].negotiatedPrice = _this.fix(mapInfo[mapKey].negotiatedPrice)
          mapInfo[mapKey].bankAmount = _this.fix(mapInfo[mapKey].bankAmount)
          mapInfo[mapKey].weight = _this.fix(mapInfo[mapKey].weight)
          if (_this.orderType === 1 || _this.orderType === '1') {
            // 设置促销折扣
            mapInfo[mapKey].promotionDiscount = _this.fix(mapInfo[mapKey].promotionDiscount)
            // 设置费用返还
            mapInfo[mapKey].costReturn = _this.fix(mapInfo[mapKey].costReturn)
            // 设置费用返还
            mapInfo[mapKey].costReturnBack = _this.fix(mapInfo[mapKey].costReturn)
            let onePrice = mapInfo[mapKey].negotiatedPrice - mapInfo[mapKey].promotionDiscount - mapInfo[mapKey].costReturn
            // 设置单价
            mapInfo[mapKey].onePrice = _this.fix(onePrice)
            // 代收运费
            mapInfo[mapKey].freightCollect = _this.fix(mapInfo[mapKey].freightCollect)
            // 开单价
            let openPrice = onePrice - mapInfo[mapKey].freightCollect
            mapInfo[mapKey].openPrice = _this.fix(openPrice)
            // 发货仓
            mapInfo[mapKey].carrier = mapInfo[mapKey].carrier
            // 发运方法
            mapInfo[mapKey].shipmentMethod = mapInfo[mapKey].shipmentMethod
            // 运费条款
            mapInfo[mapKey].freightTerms = mapInfo[mapKey].freightTerms
            // 仓库编码
            mapInfo[mapKey].wareHouseCode = mapInfo[mapKey].wareHouseCode
          }
          mapInfo[mapKey].orderQuantity = _this.fix(mapInfo[mapKey].orderQuantity)
          let product = _this.tableDataMap[mapKey] ? _this.tableDataMap[mapKey] : mapInfo[mapKey]
          product.isFav = mapInfo[mapKey].isFav
          _this.tableData.add(product)
          !_this.tableDataMap[mapKey] ? _this.tableDataMap[mapKey] = mapInfo[mapKey] : ''
        }
      }
      this.productUtil.getProductList = () => {
        let list = []
        for (let productNumber in _this.tableDataMap) {
          if (_this.tableDataMap[productNumber].orderQuantity > 0) {
            list.add(_this.tableDataMap[productNumber])
          }
        }
        return list
      }
      this.productUtil.clear = () => {
//        _this.tableData.reloadView()
        _this.tableDataMap = {}
        _this.tableData.body = []
      }
      this.productUtil.reloadView = () => {
        _this.showTable = false
        _this.$nextTick(() => {
          _this.$nextTick(() => {
            _this.showTable = true
            _this.tableData.reloadView()
          })
        })
      }
      this.productUtil.initProductMap = (productList) => {
        productList.forEach(e => {
          _this.tableDataMap[e.productNumber] = e
          e.grossWeightKg = _this.fix(e.weight / e.orderQuantity)
        })
      }
    }
  }
</script>

<style lang='less'>
  .product-type {
    text-indent: 0.4em;
    .iconfont {
      margin-right: 2px;
    }
    .icon-wujiaoxing {
      color: #F5C023;
    }
    .icon-shui {
      color: #5E6D82;
    }
  }

  .product-type-img {
    width: 110px;
    height: 110px;
    background: #D8D8D8;
    margin: 5px auto;
    cursor: pointer;
  }
</style>
