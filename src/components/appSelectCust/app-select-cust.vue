<template>
  <div class="app-select-cust" ref='app-select-cust'>
    <div class="title">
      选择客户
    </div>
    <div class="left app-fl customer-search-box app-pr" style='margin-top: -14px;' ref="left">
      <ul class='input-list app-mt10 clearfix'>
        <li>
          <app-select-box left="90" right="120" name='客户编号' :value.sync='customerNumber' type='input' />
        </li>
        <li class='app-mt10'>
          <app-select-box left="90" right="120" name='客户简称' :value.sync='customerName' type='input' />
        </li>
        <li class='app-mt10'>
          <app-select-box left="90" right="120" name='供货方编号' :value.sync='supplierNumber' type='input' />
        </li>
        <li class='app-mt10'>
          <app-select-box left="90" right="120" name='供货方简称' :value.sync='supplierName' type='input' />
        </li>
        <li class='app-mt10'>
          <app-select-box left="90" right="120" name='主营渠道类型' :value.sync='mainChannTypeCode' :data='mainChannTypeOptions' type='select' class="select-box" />
        </li>
        <li class='app-mt10'>
          <app-select-box left="90" right="120" name='客户状态' :value.sync='customerStatus' :data='customerStatusOptions'  type='select' class="select-box" />
        </li>
        <li class='app-mt10'>
          <app-select-box left="90" right="120" name='贸易来往类型' :value.sync='tradeType' :data='tradeTypeOptions' type='select' class="select-box" />
        </li>
        <li class='app-mt10'>
          <app-select-box left="90" right="120" name='渠道层级' :value.sync='channLevel' :data='channLevelOptions' type='select' class="select-box" />
        </li>
        <li class='app-mt10'>
          <app-select-box left="90" right="120" name='客户类型' :value.sync='customerType' :data='customerTypeOptions' type='select' class="select-box" />
        </li>
        <li class='app-mt10'>
          <app-select-box left="90" right="120" name='客户子类' :value.sync='customerSubClass' :data='customerSubClassOptions' type='select' class="select-box" />
        </li>
        <li class='app-mt10'>
          <app-select-box left="90" right="120" name='区域' :value.sync='regionCode' :data='regionOptions' type='select' class="select-box" />
        </li>
        <li class='app-mt10'>
          <app-select-box left="90" right="120" name='大区' :value.sync='largeZoneCode' :data='zoneOptions' type='select' class="select-box" />
        </li>
        <li class='app-mt10'>
          <app-select-box left="90" right="120" name='地区' :value.sync='localCode' :data='localOptions' type='select' class="select-box" />
        </li>
        <li class='app-mt10'>
          <app-select-box left="90" right="120" name='办事处' :value.sync='officeCode' :data='officeOptions' type='select' class="select-box" />
        </li>
      </ul>
      <div class="clearfix"></div>
      <div class='app-mt20 app-tc'>
        <app-button value='重置' type='text' @click.native="reset"></app-button>
        <app-button value='搜索' icon='search' @click.native="search(1)" :enter='true' @click='alert(1)'/>
      </div>
    </div>
    <div class="right app-fl customer-result-table" ref="right">
      <app-table :data='tableData' :auto='false'/>
    </div>
    <div class="clearfix"></div>
    <div class='app-tc app-pa' style="right: 150px; bottom: 15px;" v-if="ifHaveAllSelectBtn">
      <app-button value='全部选择' icon="confirm" @click.native="allSelect()"/>
    </div>
    <div class='app-tc app-pa' style="right: 60px; bottom: 15px;">
      <app-button value='确定' icon="confirm" @click.native="confim()"/>
    </div>
  </div>
</template>

<script>
  import {
    customerGetCondition,
    customerSearch
  } from '@/api/api'
  export default {
    props: {
      // 主数据源对象
      data: {
        default: null
      },
      // 被选中的选项
      select: {
        default: []
      },
      show: {
        default: null
      },
      closeType: {
        default: null
      }
    },
    watch: {
      show() {
        let _this = this
        if (!_this.show) return
        _this.reset()
        // 清除页面数据  和选中的数据
        _this.tableData.body = []
        _this.tableData.config.total = 0
        _this.tableData.select = []
        _this.selectData = []
      },
      data() {
        let _this = this
        console.log(_this.data)
        if (_this.data.isRefresh) {
          if (_this.tableData.body.length > 0) {
            _this.tableData.body.forEach(item => {
              if (_this.selectData.indexOf(item) >= 0 || _this.tableData.select.indexOf(item) >= 0) {
                _this.tableData.unSelected(item)
              }
            })
          }
          _this.selectData = []
          _this.tableData.select = []
        }
      }
    },
    data() {
      let _this = this
      return {
        width: 0,
        selectData: [],
        regionZoneData: {},
        zoneLocalData: {},
        localOfficeData: {},
        tradeTypeAndChannelLevel: {},
        channelLevelAndCustomerType: {},
        customerTypeAndCustomerSubClass: {},
        // 客户编码
        customerNumber: '',
        // 客户名称
        customerName: '',
        // 供货方编号
        supplierNumber: '',
        // 供货方简称
        supplierName: '',
        // 主营渠道类型
        mainChannTypeCode: '',
        mainChannTypeOptions: [],
        // 客户状态
        customerStatus: '',
        customerStatusOptions: [],
        // 贸易往来类型
        tradeType: '',
        tradeTypeOptions: [],
        // 渠道层级
        channLevel: '',
        // 客户类型
        customerType: '',
        // 客户子类
        customerSubClass: '',
        // 区域编码
        regionCode: '',
        regionOptions: [],
        // 大区编码
        largeZoneCode: '',
        // 地区编码
        localCode: '',
        // 办事处编码
        officeCode: '',
        isFirstSearch: true,
        ifHaveAllSelectBtn: false,
        tableData: {
          head: [{
            key: 'dmsCustomNumber',
            value: '客户编号'
          }, {
            key: 'customerAbbreviation',
            value: '客户简称'
          }, {
            key: 'channTypeDesc',
            value: '主营渠道类型',
            width: 120
          }, {
            key: 'custoStatusDesc',
            value: '客户状态',
            width: 100
          }, {
            key: 'tradeTypeDesc',
            value: '贸易往来类型',
            width: 120
          }, {
            key: 'channLeveDesc',
            value: '渠道层级',
            width: 100
          }, {
            key: 'customerTypeDesc',
            value: '客户类型',
            width: 100
          }, {
            key: 'cusSubDaDesc',
            value: '客户子类',
            width: 100
          }, {
            key: 'salesRegionName',
            value: '区域',
            width: 100
          }, {
            key: 'salesLargeZoneName',
            value: '大区',
            width: 100
          }, {
            key: 'salesLocalName',
            value: '地区',
            width: 100
          }, {
            key: 'salesOfiiceName',
            value: '办事处',
            width: 100
          }
          ],
          body: [],
          select: [],
          // 表格配置
          config: {
            // 表格宽度
//            width: 1600,
            // width: 600,
            // 是否存在多选按钮
            target: '.customer-result-table',
//            radio: true,
//            cover: true,
            // 是否存在边框
            border: true,
            // 总记录数
            total: 0,
            height: 400,
            // 每页记录数
            pageSize: 14,
            // 请求配置
            http: {
              // 请求url
              url: customerSearch,
              // 当前页,此项会自动更新
              currentPage: 1,
              // 数据
              data: {},
              // 回调函数
              callback: function(data) {
                if (_this.tableData.config.select && _this.tableData.config.select === true) {
                  _this.addCustomer()
//                  _this.selectData.addAll(_this.tableData.select).length > 0 ? _this.selectData.unique() : _this.selectData
                }
                _this.handleData(data)
              }
            }
          }
        }
      }
    },
    destroyed() {
      window.$(window.document).off('keyup', this.enterClick)
      window.removeEventListener('resize', this.initWidth, false)
    },
    mounted() {
      this.$nextTick(function() {
        window.$(window.document).on('keyup', this.enterClick)
        // window.$(window.document).off('keyup', this.enterClick)
        this.initWidth()
        let _this = this
        window.addEventListener('resize', _this.initWidth, false)
      })
      // 根据传入参数类型 判断是单选还是多选
      if (this.data.type === 'checkbox') {
        this.tableData.config.select = true
        this.ifHaveAllSelectBtn = true
      } else if (this.data.type === 'radio') {
        this.tableData.config.radio = true
      }
      // 发送请求 获取查询条件
      let _this = this
      _this.http.post(customerGetCondition, {}, 'body').then(data => {
        if (data.code === '00000') {
          // 主营渠道类型  并且根据传入参数限制  下拉选
          if (data.pojo.mainChannelTypeList && !_this.data.mainChannType) {
            _this.mainChannTypeOptions = data.pojo.mainChannelTypeList
          } else {
            let options = []
            data.pojo.mainChannelTypeList.forEach(item => {
              if (item.value === _this.data.mainChannType) {
                options.add(item)
              }
            })
            _this.mainChannTypeOptions = options
          }
          // 客户状态
          if (data.pojo.customerStatusList && !_this.data.customerStatus) {
            _this.customerStatusOptions = data.pojo.customerStatusList
          } else {
            let options = []
            data.pojo.customerStatusList.forEach(item => {
              if (item.value === _this.data.customerStatus) {
                options.add(item)
              }
            })
            _this.customerStatusOptions = options
          }
          _this.tradeTypeAndChannelLevel = data.pojo.tradeAndChannelMap
          _this.channelLevelAndCustomerType = data.pojo.channelAndCustomerTypeMap
          _this.customerTypeAndCustomerSubClass = data.pojo.customerTypeAndSubCusMap
          // 贸易往来类型
          if (data.pojo.tradeTypeList && !_this.data.tradeType) {
            _this.tradeTypeOptions = data.pojo.tradeTypeList
          } else {
            let options = []
            data.pojo.tradeTypeList.forEach(item => {
              if (item.value === _this.data.tradeType) {
                options.add(item)
              }
            })
            _this.tradeTypeOptions = options
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
    },
    methods: {
      initWidth() {
        let maxWidth = this.$refs['app-select-cust'].offsetWidth
        let leftWidth = this.$refs.left.offsetWidth
        this.width = maxWidth - leftWidth - 10
        this.$refs.right.style.width = this.width + 'px'
      },
      enterClick(e) {
        e = e || window.event
        // console.log(e.keyCode)
        if (e.target.nodeName === 'INPUT' && e.target.className === 'el-pagination__editor') return
        if (e.keyCode === 13) {
          // alert(1)
          this.search(1)
        }
      },
      // 添加客户
      addCustomer () {
        let _this = this
        if (_this.tableData.select.length > 0) {
          let selectedMap = new Map()
          if (_this.selectData.length > 0) {
            _this.selectData.forEach(item => {
              selectedMap.set(item.dmsCustomNumber, item)
            })
          }
          _this.tableData.select.forEach(item => {
            if (!selectedMap.has(item.dmsCustomNumber)) {
              _this.selectData.add(item)
            }
          })
        }
      },
      reset() {
        this.customerNumber = ''
        this.customerName = ''
        this.supplierNumber = ''
        this.supplierName = ''
        this.mainChannTypeCode = ''
        this.tradeType = ''
        this.channLevel = ''
        this.customerType = ''
        this.customerSubClass = ''
        this.customerStatus = ''
        this.regionCode = ''
        this.largeZoneCode = ''
        this.localCode = ''
        this.officeCode = ''
      },
      getSearchRequestData() {
        let _this = this
        let requestJson = {}
        requestJson.dmsCustomNumber = _this.customerNumber
        requestJson.customerAbbreviation = _this.customerName
        requestJson.supplierNumber = _this.supplierNumber
        requestJson.supplierName = _this.supplierName
        requestJson.channTypeCode = _this.mainChannTypeCode
        requestJson.tradeTypeCode = _this.tradeType
        requestJson.channLeveCode = _this.channLevel
        requestJson.customerType = _this.customerType
        requestJson.cusSubDaCode = _this.customerSubClass
        requestJson.custoStatusCode = _this.customerStatus
        requestJson.salesRegionCode = _this.regionCode
        requestJson.salesLargeZoneCode = _this.largeZoneCode
        requestJson.salesLocalCode = _this.localCode
        requestJson.salesOfficeCode = _this.officeCode
        return requestJson
      },
      search(currPage) {
        // 获取参数
        let _this = this
        // 清空页面数据
        _this.tableData.body = []
        _this.tableData.config.total = 0
        let requestJson = _this.getSearchRequestData()
        requestJson.currPage = currPage
        requestJson.pageSize = _this.tableData.config.pageSize
        if (_this.isFirstSearch) {
          _this.http.post(customerSearch, requestJson, 'body').then(data => {
            _this.tableData.config.http.data = requestJson
            _this.handleData(data)
            _this.isFirstSearch = false
          })
        } else {
          _this.tableData.config.http.data = requestJson
          _this.tableData.setCurrentPage(currPage)
        }
      },
      handleData(data) {
        let _this = this
        if (data.code === '00000') {
          let selectMap = new Map()
          _this.selectData.forEach(item => {
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
            _this.tableData.body = list
            _this.$nextTick(() => {
              _this.$nextTick(() => {
                _this.tableData.body.forEach(item => {
                  if (selectMap.has(item.dmsCustomNumber)) {
                    _this.tableData.selected(item)
                  }
                })
              })
            })
            _this.tableData.config.total = data.totalRow
          }
        }
      },
      confim() {
        // 判断是单选还是多选
        if (this.tableData.config.select && this.tableData.config.select === true) {
          this.addCustomer()
//          this.selectData.addAll(this.tableData.select).length > 0 ? this.selectData.unique() : this.selectData
//        this.selectData.concat(this.tableData.select).length > 0 ? this.selectData.unique() : this.selectData
          if (this.selectData.length > 0) {
            if (this.closeType === 'prototype') this.$emit('update:show', false)
            else this.closeDialog()
            this.$emit('update:select', this.selectData)
            this.$emit('callback', this.selectData)
          } else {
            this.message('您还没有选择数据', 'warning')
            return
          }
        } else if (this.tableData.config.radio && this.tableData.config.radio === true) {
          if (this.tableData.select.length > 0) {
            if (this.closeType === 'prototype') this.$emit('update:show', false)
            else this.closeDialog()
            this.$emit('update:show', false)
            this.$emit('update:select', this.tableData.select)
            this.$emit('callback', this.tableData.select)
          } else {
            this.message('您还没有选择数据', 'warning')
            return
          }
        }
      },
      allSelect() {
        console.log('')
        let _this = this
        _this.messageBox('confirm', '您将选择当前条件下的所有客户,确定全部选择么?').then(() => {
          let requestJson = _this.getSearchRequestData()
          requestJson.currPage = 1
          requestJson.pageSize = _this.tableData.config.pageSize
          requestJson.limitType = 'NOLIMIT'
          _this.http.post(customerSearch, requestJson, 'body').then(data => {
            if (data.code === '00000') {
              if (data.listInfo && data.listInfo.length > 0) {
                if (_this.closeType === 'prototype') _this.$emit('update:show', false)
                else _this.closeDialog()
                _this.$emit('update:select', data.listInfo)
                _this.$emit('callback', data.listInfo)
              } else {
                _this.message('当前条件下没有查询到客户,请重新选择条件', 'warning')
              }
            } else {
              _this.message(data.msg, 'warning')
            }
          })
        }).catch(() => {
          return
        })
      }
    },
    computed: {
      // 区域下拉选改变 重新计算大区下拉选的值
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
          this.this.localOfficeData[this.localCode].forEach(item => {
            if (this.data.officeCode === item.value) {
              options.add(item)
            }
          })
          return options
        } else {
          return this.localOfficeData[this.localCode]
        }
      },
      // 贸易类型改变 重新计算渠道层级下拉选的值
      channLevelOptions() {
        if (this.tradeType === '') {
          return []
        } else if (this.data.channLevel) {
          let options = []
          this.tradeTypeAndChannelLevel[this.tradeType].forEach(item => {
            if (this.data.channLevel === item.value) {
              options.add(item)
            }
          })
          return options
        } else {
          return this.tradeTypeAndChannelLevel[this.tradeType]
        }
      },
      // 渠道层级改变  重新计算客户类型下拉选的值
      customerTypeOptions() {
        if (this.channLevel === '') {
          return []
        } else if (this.data.customerType) {
          let options = []
          this.channelLevelAndCustomerType[this.channLevel].forEach(item => {
            if (this.data.customerType === item.value) {
              options.add(item)
            }
          })
          return options
        } else {
          return this.channelLevelAndCustomerType[this.channLevel]
        }
      },
      // 客户类型改变 重新计算客户子类下拉选的值
      customerSubClassOptions() {
        if (this.customerType === '') {
          return []
        } else if (this.data.customerSubClass) {
          let options
          this.customerTypeAndCustomerSubClass[this.customerType].forEach(item => {
            if (this.data.customerSubClass === item.value) {
              options.add(item)
            }
          })
          return options
        } else {
          return this.customerTypeAndCustomerSubClass[this.customerType]
        }
      }
    }
  }
</script>

<style lang='less' scoped>
  .app-select-cust{
    .title{
      color: #373D41;
      text-align: center;
      font-size: 18px;
      position: relative;
      top: -30px;
      z-index: -1;
    }
    .left{
      /*width: 18%;*/
      /*margin-right: 2%;*/
      .input-list{
        .app-w30{
          width: 40%;
        }
        .app-w70{
          width: 60%;
        }
      }
      .select-box{
        width: 100%;
      }
    }
    .right{
      /*width: 78%;*/
    }
    .left,.right{
      height: 500px;
      margin-top: -10px;
    }
  }
</style>
