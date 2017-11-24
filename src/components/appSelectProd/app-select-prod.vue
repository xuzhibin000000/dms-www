<template>
  <div class="app-select-prod">
    <div class="title">
      选择产品
    </div>
    <div class="left app-fl app-oa" style='margin-top: -14px;height: 500px;'>
      <div class='product-type'><i class='iconfont icon-wujiaoxing'></i>常用</div>
      <div><img class='product-type-img' @click="sreach('', '', '')" :src="frequentlyUsedImgUrl" height="110" width="110"/></div>
      <div v-for='item in allTypes'>
        <div class='product-type'>
          <!-- <i class='iconfont icon-shui'></i>{{ item.category.categoryDescription }} -->
          <i class='iconfont icon-shui' v-if='testIconType(item.category.categoryDescription, "纯水")'>{{item.category.categoryDescription}}</i>
          <i class='iconfont icon-kuangquanshui' v-else-if='testIconType(item.category.categoryDescription, "矿泉水")'>{{item.category.categoryDescription}}</i>
          <i class='iconfont icon-naicha' v-else-if='testIconType(item.category.categoryDescription, "奶茶")'>{{item.category.categoryDescription}}</i>
          <i class='iconfont icon-gongneng' v-else-if='testIconType(item.category.categoryDescription, "功能")'>{{item.category.categoryDescription}}</i>
          <i class='iconfont icon-kafei' v-else-if='testIconType(item.category.categoryDescription, "咖啡")'>{{item.category.categoryDescription}}</i>
          <i class='iconfont icon-shui' v-else>{{ item.category.categoryDescription }}</i>
        </div>
        <div v-for='subCategory in item.subCategorys'>
          <img class='product-type-img' @click='sreach(item.category.categoryCode, subCategory.subTypeCode, subCategory.code)'
               :src='subCategory.pictureUrl' height="110" width="110"/>
        </div>
      </div>
    </div>
    <div class="right app-fl">
      <app-table :data='tableData' :auto='false'/>
    </div>
    <div class='app-fr app-mt10 app-pa' style='right: 2%; bottom: 20px;'>
      <!--<app-button value='取消' type='text' @click.native='cencelData'></app-button>-->
      <app-button value='确定' icon='save' @click.native='sureData' />
    </div>
  </div>
</template>

<script>
  import {
    productSearchProdInfo,
    productGetAllType,
    productIsCollection
  } from '@/api/api'
  export default {
    methods: {
      testIconType(dataType, type) {
        return dataType === type
        // return true
      },
      sreach(categoryCode, subTypeCode, code) {
        let _this = this
        if (_this.tableData.select.length > 0) {
//          _this.selectData.addAll(_this.tableData.select).length > 0 ? _this.selectData.unique() : _this.selectData
          // 添加选择的数据
          _this.addProduct()
        }
        let json = {}
        json.currPage = '1'
        json.pageSize = '10'
        json.categoryCode = categoryCode
        json.subTypeCode = subTypeCode
        json.code = code
        if (_this.customerNumber !== '') {
          json.customerNumber = _this.customerNumber
        }
        if (_this.searchType !== '') {
          json.searchType = _this.searchType
        }
        this.http.post(productSearchProdInfo, json).then(data => {
          _this.disposeData(data)
          _this.tableData.config.http.data = json
        })
      },
      addProduct() {
        let _this = this
        if (_this.tableData.select.length > 0) {
          let selectedMap = new Map()
          if (_this.selectData.length > 0) {
            _this.selectData.forEach(item => {
              selectedMap.set(item.productNumber, item)
            })
          }
          _this.tableData.select.forEach(item => {
            if (!selectedMap.has(item.productNumber)) {
              _this.selectData.add(item)
            } else {
              selectedMap.get(item.productNumber).quantity = item.quantity
            }
          })
        }
      },
      sureData() {
        let _this = this
        if (_this.tableData.config.select && _this.tableData.config.select === true) {
//          _this.selectData.addAll(_this.tableData.select).length > 0 ? _this.selectData.unique() : _this.selectData
          _this.addProduct()
          if (_this.selectData.length > 0) {
            if (_this.isHaveInput) {
              let list = []
              _this.selectData.forEach(item => {
                item.quantity = ((item.quantity === '' || item.quantity === '-') ? 0 : (item.quantity * 1000) / 1000)
                if (item.quantity !== 0) {
                  list.add(item)
                }
              })
              if (list.length > 0) {
                let data = {}
                data.list = list
                _this.$emit('update:productInfo', data)
                _this.$emit('callback', data)
                if (_this.closeType === 'prototype') _this.$emit('update:show', false)
                else _this.closeDialog()
              } else {
                _this.message('您选择的数据都没有填写数量,请填写数量', 'warning')
              }
            } else {
              let data = {}
              data.list = _this.selectData
              _this.$emit('update:productInfo', data)
              _this.$emit('callback', data)
//              _this.closeDialog()
              if (_this.closeType === 'prototype') _this.$emit('update:show', false)
              else _this.closeDialog()
            }
          } else {
            _this.message('您还没有选择数据', 'warning')
          }
        } else {
          if (_this.tableData.select.length > 0) {
            _this.$emit('update:productInfo', _this.tableData.select[0].productInfo)
            _this.$emit('callback', _this.tableData.select[0].productInfo)
            if (this.closeType === 'prototype') this.$emit('update:show', false)
            else this.closeDialog()
//            _this.closeDialog()
          } else {
            this.message('您还没有选择数据', 'warning')
          }
        }
      }
//      cencelData() {
//        let _this = this
//        _this.tableData.select = []
//        _this.$emit('update:productInfo', {})
//        _this.closeDialog()
//      }
    },
    props: {
      productInfo: {
        default: {}
      },
      data: {
        default: null
      },
      closeType: {
        default: null
      }
    },
    watch: {
      data() {
        let _this = this
        if (_this.data !== null) {
          if (_this.data.type && _this.data.type === 'select') {
            _this.tableData.config.select = true
          } else {
            _this.tableData.config.radio = true
          }
          if (_this.data.customerNumber) {
            _this.customerNumber = _this.data.customerNumber
          }
          if (_this.data.searchType) {
            _this.searchType = _this.data.searchType
          }
          if (_this.data.isHaveInput) {
            _this.isHaveInput = true
            let isAdd = true
            _this.tableData.head.forEach(item => {
              if (item.key === 'quantity') {
                isAdd = false
              }
            })
            if (isAdd) {
              _this.tableData.head.add({
                key: 'quantity',
                value: '数量'
              })
            }
          }
          if (_this.data.shipType) {
            _this.shipType = _this.data.shipType
          }
        } else {
          _this.tableData.config.radio = true
        }
        _this.selectData = []
        _this.tableData.body = []
        _this.sreachData()
      }
    },
    data() {
      let _this = this
      return {
        frequentlyUsedImgUrl: '',
        customerNumber: '',
        searchType: '',
        isHaveInput: false,
        tableType: '',
        // 出货类型  供出货提报使用
        shipType: '',
        allTypes: [],
        selectData: [],
        value: '',
        tableData: {
          head: [{
            key: 'productNumber',
            value: '产品编号'
          }, {
            key: 'productDescription',
            value: '产品名称'
          }],
          body: [],
          select: [],
          // 表格配置
          config: {
            // 表格宽度
            width: 1600,
            // width: 600,
            // 是否存在多选按钮
//            radio: true,
            // 是否存在边框
            border: true,
            // 总记录数
            total: 0,
            height: 430,
            // 每页记录数
            pageSize: 10,
            // 是否平铺表格
            cover: true,
            // 请求配置
            http: {
              // 请求url
              url: productSearchProdInfo,
              // 当前页,此项会自动更新
              currentPage: 1,
              // 数据
              data: {},
              // 回调函数
              callback: function(data) {
                if (_this.tableData.config.select || _this.isHaveInput) {
                  // 特殊数据处理
//                  _this.selectData.addAll(_this.tableData.select).length > 0 ? _this.selectData.unique() : _this.selectData
                  _this.addProduct()
                }
                _this.disposeData(data)
              }
            }
          }
        },
        sreachData() {
          let _this = this
          let json = {}
          json.currPage = '1'
          json.pageSize = '10'
          if (_this.customerNumber !== '') {
            json.customerNumber = _this.customerNumber
          }
          if (_this.searchType !== '') {
            json.searchType = _this.searchType
          }
          this.http.post(productSearchProdInfo, json).then(data => {
            _this.tableData.config.http.data = json
            _this.disposeData(data)
          })
        },
        disposeData(data) {
          let _this = this
          let selectedMap = new Map()
          if (_this.selectData.length > 0) {
            _this.selectData.forEach(item => {
              selectedMap.set(item.productNumber, item.quantity)
            })
          }
          data.mapInfo.list.forEach(item => {
            let temp = false
            if (item.isFavorite === 'Y') {
              temp = true
            }
            let bodyConfig = [{
              type: 'collection',
              position: {
                productDescription: {
                  checked: temp,
                  click(val, item) {
                    _this.isCollection(val, item)
                  }
                }
              }
            }]
            item.bodyConfig = bodyConfig
            item.isSource = true
            item.productNumber = item.productInfo.productNumber
            item.productDescription = item.productInfo.productDescription
            if (_this.isHaveInput) {
              item.quantity = 0
              let inputConfig = {
                type: 'input',
                position: ['quantity']
              }
              let changeConfig = {
                type: 'change',
                position: {
                  quantity(value, item, isCopy) {
                    if (_this.shipType === 'D2L') {
                      let checkQuantity = _this.decimalCheck(value, 8, 2, 'POSITIVE', !isCopy)
                      item.quantity = checkQuantity
                    } else {
                      let checkQuantity = _this.decimalCheck(value, 8, 2, 'NEGATIVE', !isCopy)
                      item.quantity = checkQuantity
                    }
                    _this.tableData.selected(item)
                  }
                }
              }
              item.bodyConfig.add(inputConfig, changeConfig)
            }
          })
          _this.tableData.body = data.mapInfo.list
          _this.$nextTick(() => {
            _this.tableData.body.forEach(item => {
              if (selectedMap.has(item.productNumber)) {
                item.quantity = selectedMap.get(item.productNumber)
                _this.tableData.selected(item)
              }
            })
          })
          _this.tableData.config.total = data.mapInfo.totalCount
        },
        isCollection(val, item) {
          let json = {}
          json.userId = '1'
          json.productNumber = item.productNumber
          json.isFavorite = item.isFavorite && item.isFavorite === 'Y' ? 'N' : 'Y'
          this.http.post(productIsCollection, json).then(data => {
            if (data.code === '00000') {
              let reqjson = _this.tableData.config.http.data
              reqjson.currPage = _this.tableData.config.http.currentPage
              reqjson.pageSize = '10'
              this.http.post(productSearchProdInfo, reqjson).then(data => {
                _this.disposeData(data)
                this.message(item.isFavorite && item.isFavorite === 'Y' ? '取消收藏成功' : '收藏成功', 'success')
              })
            }
          })
        }
      }
    },
    created() {
      let _this = this
      if (_this.data !== null) {
        if (_this.data.type && _this.data.type === 'select') {
          _this.tableData.config.select = true
        } else {
          _this.tableData.config.radio = true
        }
        if (_this.data.customerNumber) {
          _this.customerNumber = _this.data.customerNumber
        }
        if (_this.data.searchType) {
          _this.searchType = _this.data.searchType
        }
        if (_this.data.isHaveInput) {
          _this.isHaveInput = true
          _this.tableData.head.add({
            key: 'quantity',
            value: '数量'
          })
        }
        if (_this.data.shipType) {
          _this.shipType = _this.data.shipType
        }
      } else {
        _this.tableData.config.radio = true
      }
      _this.sreachData()
      this.http.post(productGetAllType).then(data => {
        _this.allTypes = data.mapInfo.list
        _this.frequentlyUsedImgUrl = data.mapInfo.frequentlyUsedImgUrl
      })
    }
  }
</script>

<style lang='less' scoped>
  .app-select-prod{
    .title{
      color: #373D41;
      text-align: center;
      font-size: 18px;
      position: relative;
      top: -30px;
      z-index: -1;
    }
    .left{
      width: 12%;
    }
    .right{
      width: 88%;
    }
    .left,.right{
      height: 500px;
      margin-top: -10px;
    }
    .product-type{
      text-indent: 0.4em;
      .iconfont{
        margin-right: 2px;
      }
      .icon-wujiaoxing{
        color: #F5C023;
      }
      .icon-shui{
        color: #5E6D82;
      }
    }
    .product-type-img{
      width: 110px;
      height: 110px;
      /*background: #D8D8D8;*/
      margin: 5px auto;
    }
  }
</style>
