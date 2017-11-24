<template>
  <div class="app-select-prod-and-cust">
    <div class="title">
      选择客户及产品
    </div>
    <div class="body">
      <div class="left">
        <app-title value='选择客户'/>
        <ul class="search-condition">
          <li>
            <app-select-box name='渠道层级' type='select' :value.sync='channLevel':data='channelLeverOptions'
            class='select-box' left='60' right='120'/>
            <app-select-box name='客户编号' type='input' :value.sync='customerNumber' class='select-box' left='60' right='120' />
            <app-select-box name='客户简称' type='input' :value.sync='customerName' class='select-box' left='60' right='120'/>
          </li>
          <li>
            <app-select-box name='区域' type='select' :value.sync='regionCode' :data='regionOptions' class='select-box'  left='40' right='120'/>
            <app-select-box name='大区' type='select' :value.sync='largeZoneCode' :data='zoneOptions' class='select-box'  left='40' right='120' />
          </li>
          <li>
            <app-select-box name='地区' type='select' :value.sync='localCode' :data='localOptions' class='select-box' left='50' right='120'/>
            <app-select-box name='办事处' type='select' :value.sync='officeCode' :data='officeOptions' class='select-box' left='50' right='120'/>
          </li>
        </ul>
        <div class="clearfix"></div>
        <div class='app-tc'>
          <app-button value='搜索' icon='search' class='app-mt15' @click.native="searchCustomer" />
        </div>
        <app-table :data='tableData1' class='app-mt10 customer-table' :auto='false'/>
      </div>
      <div class="right">
        <app-title value='选择产品'/>
        <div class='prod-list product-search'>
          <div class="select app-mt10">
            <ul class='app-oh'>
              <li class='left' @click='prev'>
                <span class="iconfont icon-you"></span>
              </li>
              <li class='select-prod-box app-oh'>
                <ul class='select-prod app-w1000' ref='selectProd'>
                  <li @click="sreachDataCate('', [])">
                    <span>
                      <i style='color: #F6C023;font-size: 12px;' class='iconfont icon-wujiaoxing'></i>
                      常用
                    </span>
                  </li>
                  <li v-for='item in allTypes' @click="sreachDataCate(item.category.categoryCode, item.subCategorys)">
                    <!-- <span class='iconfont icon-kuangquanshui'>{{ item.category.categoryDescription }}</span> -->
                    <span class='iconfont icon-shui' v-if='testIconType(item.category.categoryDescription, "纯水")'>
                      {{item.category.categoryDescription}}
                    </span>
                    <span class='iconfont icon-kuangquanshui' v-else-if='testIconType(item.category.categoryDescription, "矿泉水")'>
                      {{item.category.categoryDescription}}
                    </span>
                    <span class='iconfont icon-naicha' v-else-if='testIconType(item.category.categoryDescription, "奶茶")'>
                      {{item.category.categoryDescription}}
                    </span>
                    <span class='iconfont icon-gongneng' v-else-if='testIconType(item.category.categoryDescription, "功能")'>
                      {{item.category.categoryDescription}}
                    </span>
                    <span class='iconfont icon-kafei' v-else-if='testIconType(item.category.categoryDescription, "咖啡")'>
                      {{item.category.categoryDescription}}
                    </span>
                    <span class='iconfont icon-shui' v-else>
                      {{ item.category.categoryDescription }}
                    </span>
                  </li>
                </ul>
              </li>
              <li class='right' @click='next'>
                <span class="iconfont icon-xia"></span>
              </li>
            </ul>
          </div>
          <div class="img-list app-mt15">
            <ul>
              <li v-for="subCategory in subCategorys" @click="sreachDataSub(subCategory.subTypeCode, subCategory.code)">
                <img class='product-type-img'
                     :src='subCategory.pictureUrl' style='width: 77px;height: 77px;margin: 0;' height="77" width="77"/>
              </li>
            </ul>
          </div>
        </div>
        <app-table :data='tableData2' class='app-mt15' :auto='false'/>
      </div>
    </div>
    <div class='app-fr app-mt10 app-pa' style='right: 2%; bottom: 40px;'>
      <!--<app-button value='取消' type='text' @click.native='cencelData'></app-button>-->
      <app-button value='确定' icon='save' @click.native='sureData' />
    </div>
  </div>
</template>

<script>
  import {
    productSearchProdInfo,
    productGetAllType,
    productIsCollection,
    customerSearch,
    customerGetCondition
  } from '@/api/api'
  export default {
    props: {
//      productInfo: {
//        default: {}
//      },
      data: {
        default: {}
      },
      selectData: {
        default: {}
      },
      show: {
        default: null
      }
    },
    watch: {
      show() {
        let _this = this
        if (!_this.show) return
//        _this.reset()
        // 清除客户页面数据  和选中的数据
        _this.customerNumber = ''
        _this.customerName = ''
        _this.channLevel = ''
        _this.regionCode = ''
        _this.largeZoneCode = ''
        _this.localCode = ''
        _this.officeCode = ''
        _this.tableData1.body = []
        _this.tableData1.config.total = 0
        _this.tableData1.select = []
        _this.selectCustomers = []
        // 清楚产品页面选中数据
        _this.selectProducts = []
        _this.tableData2.body = []
        _this.tableData2.select = []
        _this.sreachData()
      }
    },
    data() {
      let _this = this
      return {
        allTypes: [],
        subCategorys: [{pictureUrl: '/static/img/00000000.png'}],
        categoryCode: '',
        // 渠道层级
        channelLeverOptions: [],
        // 区域大区关系
        regionZoneData: {},
        // 大区地区关系
        zoneLocalData: {},
        // 地区办事处关系
        localOfficeData: {},
        regionOptions: [],
        channLevel: '',
        customerNumber: '',
        customerName: '',
        regionCode: '',
        largeZoneCode: '',
        localCode: '',
        officeCode: '',
        selectCustomers: [],
        selectProducts: [],
        tableData1: {
          head: [{
            key: 'dmsCustomNumber',
            value: '客户编号'
          }, {
            key: 'customerAbbreviation',
            value: '客户简称'
          }],
          body: [],
          select: [],
          // 表格配置
          config: {
            // 是否存在多选按钮
            select: true,
            // 是否存在边框
            border: true,
            // 总记录数
            total: 0,
            // height: 300,
            // 每页记录数
            pageSize: 9,
            cover: true,
            small: true,
            // 请求配置
            http: {
              // 请求url
              target: '.customer-table',
              url: customerSearch,
              // 当前页,此项会自动更新
              currentPage: 1,
              // 数据
              data: {},
              // 回调函数
              callback: function(data) {
                if (_this.tableData1.config.select && _this.tableData1.config.select === true) {
                  _this.addCustomer()
//                  _this.selectCustomers.addAll(_this.tableData1.select).length > 0 ? _this.selectCustomers.unique() : _this.selectCustomers
                }
                _this.handleCustomerData(data)
              }
            }
          }
        },
        tableData2: {
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
            // 是否存在多选按钮
//            radio: true,
            select: true,
            // 是否存在边框
            border: true,
            // 总记录数
            total: 0,
            // height: 300,
            // 每页记录数
            pageSize: 9,
            cover: true,
            small: true,
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
                _this.disposeData(data)
              }
            }
          }
        },
        sreachData(categoryCode, subTypeCode, code) {
          let _this = this
          let json = {}
          json.currPage = '1'
          json.pageSize = '9'
          json.categoryCode = categoryCode
          json.subTypeCode = subTypeCode
          json.code = code
          this.http.post(productSearchProdInfo, json).then(data => {
            _this.disposeData(data)
            _this.tableData2.config.http.data = json
          })
        },
        disposeData(data) {
          let _this = this
          if (_this.tableData2.config.select && _this.tableData2.config.select === true) {
            _this.selectProducts.addAll(_this.tableData2.select).length > 0 ? _this.selectProducts.unique() : _this.selectProducts
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
          })
          _this.tableData2.body = data.mapInfo.list
          _this.tableData2.config.total = data.mapInfo.totalCount
          if (_this.selectProducts && _this.selectProducts.length > 0) {
            let tempList = []
            _this.tableData2.body.forEach(item => {
              _this.selectProducts.forEach(bean => {
                if (item.productNumber === bean.productNumber) {
                  tempList.add(item)
                  _this.selectProducts.remove(bean)
                }
              })
            })
            _this.$nextTick(() => {
              _this.tableData2.selectedAll(tempList)
            })
          }
        },
        isCollection(val, item) {
          let _this = this
          let json = {}
          json.userId = '1'
          json.productNumber = item.productNumber
          json.isFavorite = item.isFavorite && item.isFavorite === 'Y' ? 'N' : 'Y'
          this.http.post(productIsCollection, json).then(data => {
            if (data.code === '00000') {
              let reqjson = _this.tableData2.config.http.data
              reqjson.currPage = _this.tableData2.config.http.currentPage
              reqjson.pageSize = '9'
              this.http.post(productSearchProdInfo, reqjson).then(data => {
                _this.disposeData(data)
                this.message(item.isFavorite && item.isFavorite === 'Y' ? '取消收藏成功' : '收藏成功', 'success')
              })
            }
          })
        }
      }
    },
    methods: {
      testIconType(dataType, type) {
        return dataType === type
        // return true
      },
      // 添加客户
      addCustomer () {
        let _this = this
        if (_this.tableData1.select.length > 0) {
          let selectedMap = new Map()
          if (_this.selectCustomers.length > 0) {
            _this.selectCustomers.forEach(item => {
              selectedMap.set(item.dmsCustomNumber, item)
            })
          }
          _this.tableData1.select.forEach(item => {
            if (!selectedMap.has(item.dmsCustomNumber)) {
              _this.selectCustomers.add(item)
            }
          })
        }
      },
      sureData() {
        let _this = this
        let isTrue = true
        _this.addCustomer()
//        _this.selectCustomers.addAll(_this.tableData1.select).length > 0 ? _this.selectCustomers.unique() : _this.selectCustomers
        _this.selectProducts.addAll(_this.tableData2.select).length > 0 ? _this.selectProducts.unique() : _this.selectProducts
        if (!_this.selectCustomers.length > 0) {
          isTrue = false
          _this.message('您还没有选择客户,请选择客户', 'warning')
          return
        }
        if (!_this.selectProducts.length > 0) {
          isTrue = false
          _this.message('您还没有选择产品,请选择产品', 'warning')
          return
        }
        if (isTrue) {
          // 回传选择的客户和产品
          let callBackData = {}
          callBackData.customers = _this.selectCustomers
          callBackData.products = _this.selectProducts
          // callBackData.products
          _this.$emit('update:selectData', callBackData)
          _this.$emit('callback', callBackData)
          _this.closeDialog()
        }
//        if (_this.tableData2.select.length > 0) {
//  //           _this.$emit('update:productInfo', _this.tableData2.select[0].productInfo)
//  //          _this.$emit('callback', _this.tableData2.select[0].productInfo)
//  //          _this.closeDialog()
//        } else {
//          this.message('您还没有选择产品,请选择产品', 'warning')
//        }
      },
      sreachDataCate(categoryCode, subCategorys) {
        let _this = this
        let subTypeCode = subCategorys && subCategorys.length > 0 ? subCategorys[0].subTypeCode : ''
        let code = subCategorys && subCategorys.length > 0 ? subCategorys[0].code : ''
        if (categoryCode === '') {
          _this.categoryCode = categoryCode
          _this.subCategorys = [{subTypeCode: '', code: '', pictureUrl: '/static/img/00000000.png'}]
        } else {
          _this.categoryCode = categoryCode
          _this.subCategorys = subCategorys
        }
        _this.sreachData(categoryCode, subTypeCode, code)
      },
      sreachDataSub(subTypeCode, code) {
        let _this = this
        _this.sreachData(_this.categoryCode, subTypeCode, code)
      },
      // 下一页
      next() {
        let box = this.$refs.selectProd
        let children = box.children
        let length = children.length
        let left = this.$refs.selectProd.style.marginLeft.toInt()
        left = window.isNaN(left) ? 0 : left
        let num = window.Math.round(length / 5) - 1
        let leftNum = window.Math.round(window.Math.abs(left) / 356)
        if (leftNum <= num) this.$refs.selectProd.style.marginLeft = left - 356 + 'px'
      },
      // 上一页
      prev() {
        let box = this.$refs.selectProd
        let children = box.children
        let length = children.length
        let left = this.$refs.selectProd.style.marginLeft.toInt()
        left = window.isNaN(left) ? 0 : left
        let num = window.Math.round(length / 5) - 1
        let leftNum = window.Math.round(window.Math.abs(left) / 356)
        if (leftNum >= num) this.$refs.selectProd.style.marginLeft = left + 356 + 'px'
      },
      searchCustomer() {
        // 获取查询条件
        let _this = this
        let requestJson = {}
        requestJson.dmsCustomNumber = _this.customerNumber
        requestJson.customerAbbreviation = _this.customerName
        requestJson.channLeveCode = _this.channLevel
        requestJson.salesRegionCode = _this.regionCode
        requestJson.salesLargeZoneCode = _this.largeZoneCode
        requestJson.salesLocalCode = _this.localCode
        requestJson.salesOfficeCode = _this.officeCode
        requestJson.currPage = 1
        requestJson.pageSize = _this.tableData1.config.pageSize
        _this.http.post(customerSearch, requestJson, '.customer-table').then(data => {
          _this.tableData1.config.http.data = requestJson
          _this.handleCustomerData(data)
        })
      },
      handleCustomerData(data) {
        let _this = this
        if (data.code === '00000') {
          let selectMap = new Map()
          _this.selectCustomers.forEach(item => {
            selectMap.set(item.dmsCustomNumber, item)
          })
          if (data.listInfo) {
            let list = []
            if (data.listInfo && data.listInfo.length > 0) {
              data.listInfo.forEach(item => {
                item.bodyConfig = []
                list.add(item)
              })
            }
            _this.tableData1.body = list
            _this.$nextTick(() => {
              _this.$nextTick(() => {
                _this.tableData1.body.forEach(item => {
                  if (selectMap.has(item.dmsCustomNumber)) {
                    _this.tableData1.selected(item)
                  }
                })
              })
            })
            _this.tableData1.config.total = data.totalRow
          }
        }
      }
    },
    mounted() {
      let _this = this
      // 获取客户查询条件
      _this.http.post(customerGetCondition, {}).then(data => {
        if (data.code === '00000') {
          if (data.pojo && data.pojo.channelLevelList) {
            data.pojo.channelLevelList = data.pojo.channelLevelList || []
            if (_this.data.channLevel) {
              let list = []
              data.pojo.channelLevelList.forEach(item => {
                if (_this.data.channLevel === item.value) {
                  list.add(item)
                }
              })
              _this.channelLeverOptions = list
            } else {
              _this.channelLeverOptions = data.pojo.channelLevelList
            }
          }
          // 处理组织数据
          // 区域和大区关系
          if (data.pojo.orgSelectBean && data.pojo.orgSelectBean.regionZoneListMap) {
            _this.regionZoneData = data.pojo.orgSelectBean.regionZoneListMap
          }
          // 大区和地区关系
          if (data.pojo.orgSelectBean && data.pojo.orgSelectBean.zoneLocalListMap) {
            _this.zoneLocalData = data.pojo.orgSelectBean.zoneLocalListMap
          }
          // 地区和办事处关系
          if (data.pojo.orgSelectBean && data.pojo.orgSelectBean.localOfficeListMap) {
            _this.localOfficeData = data.pojo.orgSelectBean.localOfficeListMap
          }
          let regionList = []
          if (data.pojo.orgSelectBean && data.pojo.orgSelectBean.regionMap) {
            for (let key in data.pojo.orgSelectBean.regionMap) {
              let region = {}
              region.value = key
              region.label = data.pojo.orgSelectBean.regionMap[key]
              regionList.add(region)
            }
            if (_this.data.regionCode) {
              let options = []
              regionList.forEach(item => {
                if (item.value === _this.data.regionCode) {
                  options.add(item)
                }
              })
              _this.regionOptions = options
            } else {
              _this.regionOptions = regionList
            }
          }
        }
      })
      _this.sreachData()
      this.http.post(productGetAllType).then(data => {
        _this.allTypes = data.mapInfo.list
        _this.subCategorys[0].pictureUrl = data.mapInfo.frequentlyUsedImgUrl
      })
    },
    computed: {
      zoneOptions() {
        if (this.regionCode === '') {
          return []
        } else if (this.data.largeZoneCode) {
          let options = []
          this.regionZoneData[this.regionCode].forEach(item => {
            if (this.data.largeZoneCode === item.value) {
              options.add(item)
            }
          })
          return options
        } else {
          return this.regionZoneData[this.regionCode]
        }
      },
      // 大区下拉选改变 重新计算地区下拉选的值
      localOptions() {
        if (this.largeZoneCode === '') {
          return []
        } else if (this.data.localCode) {
          let options = []
          this.zoneLocalData[this.largeZoneCode].forEach(item => {
            if (this.data.localCode === item.value) {
              options.add(item)
            }
          })
          return options
        } else {
          return this.zoneLocalData[this.largeZoneCode]
        }
      },
      // 地区下拉选改变  重新计算办事处下拉选的值
      officeOptions() {
        if (this.localCode === '') {
          return []
        } else if (this.data.officeCode) {
          let options = []
          this.localOfficeData[this.localCode].forEach(item => {
            if (this.data.officeCode === item.value) {
              options.add(item)
            }
          })
          return options
        } else {
          return this.localOfficeData[this.localCode]
        }
      }
    }

  }
</script>

<style lang='less' scoped>
  .app-select-prod-and-cust{
    .title{
      color: #373D41;
      text-align: center;
      font-size: 18px;
      position: relative;
      top: -40px;
      z-index: -1;
    }
    .el-dialog__body{
      padding-bottom: 0;
    }
    .body{
      margin-top: -40px;
      height: 570px;
      overflow: hidden;
      .left,.right{
        float: left;
        width: 49%;
        margin-right: 1%;
        box-sizing: border-box;
        // background: #000;
        // height: 750px;
      }
      .left{
        ul{
          li{
            float: left;
            /*width: 33.3333333333%;*/
            .select-box{
              margin-top: 10px;
            }
          }
        }
      }
      .right{
        .prod-list{
          height: 136px;
          .select{
            height: 22px;
            // background: #000;
            width: 400px;
            margin: 0 auto;
            box-sizing: border-box;
            // padding: 0 20%;
            .left,.right{
              width: 22px;
              margin-right: 0;
            }
            li{
              cursor: pointer;
              text-align: center;
              float: left;
              font-size: 12px;
              span{
                font-size: 12px;
              }
            }
            .select-prod-box{
              width: 356px;
              li{
                width: 71.2px;
                float: left;
              }
            }
            .left{
              text-align: left;
            }
            .right{
              text-align: right;
            }
          }
          .img-list{
            height: 90px;
            width: 100%;
            overflow: hidden;
            overflow-x: auto;
            padding-bottom: 10px;
            ul{
              width: 10000%;
              // overflow: auto;
              li{
                background: #D8D8D8;
                border-radius: 3px;
                height: 77px;
                width: 77px;
                float: left;
                margin-right: 15px;
              }
            }
          }
        }
      }
    }
  }
</style>
