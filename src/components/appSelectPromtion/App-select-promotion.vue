<template>
  <div class="app-freight-query app-pr">
    <div class="title">
      选择促销
    </div>
    <div>
      <ul class="list-box" v-if="userType">
        <li>
          <app-select-box name='区域' :value.sync="requestJson.regionCode"  border='0' left='80' right='150' class='app-fl app-mr10'
                          :data="regionOption" type="select" style='margin-top: -15px;'/>
        </li>
        <li>
          <app-select-box name='大区' :value.sync="requestJson.largeZoneCode" type="select" border='0' left='80' right='150' class='app-fl app-mr10'
                          :data="zoneOption" style='margin-top: -15px;'/>
        </li>
        <li>
          <app-select-box name='地区' :value.sync="requestJson.localCode" type="select" border='0' left='80' right='150' class='app-fl app-mr10'
                          :data="localOption" style='margin-top: -15px;'/>
        </li>
        <li>
          <app-select-box name='促销类型' :value.sync="requestJson.proType"  border='0' left='80' right='150' class='app-fl app-mr10'
                          :data="promTypeOption" type="select" style='margin-top: -15px;'/>
        </li>
        <li style="margin-top: -14px;">
          <app-button value='重置' type='text'@click.native='repeal'></app-button>
          <app-button class='app-ml10' value='搜索' icon='search'@click.native='search'></app-button>
        </li>
      </ul>
      <div class="clearfix"></div>
      <ul class="list-box app-mt20">
        <li>
          <app-select-box name='促销编码' :value.sync="requestJson.promotionNum" border='0' left='80' right='150' class='app-fl app-mr10'
                          style='margin-top: -15px;' type="input"/>
        </li>
        <li>
          <app-select-box name='促销名称' :value.sync="requestJson.promotionName" border='0' left='80' right='150' class='app-fl app-mr10'
                          style='margin-top: -15px;' type="input"/>
        </li>
        <li>
          <app-select-box name='起始时间' :value.sync="requestJson.periodStart" border='0' left='80' right='150' class='app-fl app-mr10'
                          style='margin-top: -15px;' type="date"/>
        </li>
        <li>
          <app-select-box name='结束时间' :value.sync="requestJson.periodEnd" border='0' left='80' right='150' class='app-fl app-mr10'
                          style='margin-top: -15px;' type="date"/>
        </li>
        <li v-if="!userType" style="margin-top: -14px;">
          <app-button value='重置' type='text'@click.native='repeal'></app-button>
          <app-button class='app-ml10' value='搜索' icon='search'@click.native='search'></app-button>
        </li>
      </ul>
      <div class="clearfix"></div>
      <ul v-if="!userType" class="list-box app-mt20">
        <li>
          <app-select-box name='促销类型' :value.sync="requestJson.proType" border='0' left='80' right='150' class='app-fl app-mr10'
                          :data="promTypeOption" style='margin-top: -15px;' type="select"/>
        </li>
      </ul>
    </div>
    <div class="clearfix app-mb10"></div>
    <div ref="detailResultDiv">
      <app-table :data='tableData' :auto='false'/>
    </div>
    <div class='app-fr right-btn app-pa'>
      <app-button value='取消' icon='text' @click.native="cancel"/>
      <app-button value='确定' icon='confirm' @click.native="confirm"/>
    </div>
  </div>
</template>

<script>
  import {
    promotionSearchPromotionHead,
    shipmentSearchSearchPromtion
  } from '@/api/api.js'
  export default {
    props: {
      data: {
        default: {}
      },
      select: {
        default: {}
      }
    },
    watch: {
      data() {
      }
    },
    data() {
      let _this = this
      return {
        customerName: '',
        userType: false,
        regionOption: [],
        promTypeOption: [],
        regionZoneRelation: {},
        zoneLocalRelation: {},
        localOfficeRelation: {},
        requestJson: {
          regionCode: '',
          largeZoneCode: '',
          localCode: '',
          proType: '',
          promotionNum: '',
          promotionName: '',
          periodStart: '',
          periodEnd: ''
        },
        tableData: {
          head: [{
            key: 'regionName',
            value: '区域'
          }, {
            key: 'largeZoneName',
            value: '大区'
          }, {
            key: 'localName',
            value: '地区'
          }, {
            key: 'promotionNum',
            value: '促销活动编码'
          }, {
            key: 'promotionName',
            value: '促销活动名称'
          }, {
            key: 'proType',
            value: '促销活动类型'
          }, {
            key: 'periodStart',
            value: '起始时间'
          }, {
            key: 'periodEnd',
            value: '结束时间'
          }],
          body: [],
          select: [],
          // 表格配置
          config: {
            // cover: true,
            // width: 1000,
            target: _this.$refs.detailResultDiv,
            cover: true,
            // 是否存在多选按钮
            radio: true,
            // 是否存在边框
            border: true,
            // 总记录数
            total: 0,
            // 每页记录数
            pageSize: 10,
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
                _this.handleData(data, _this.tableData.config.http.data)
              }
            }
          }
        }
      }
    },
    methods: {
      repeal() {
        this.requestJson = {
          regionCode: '',
          largeZoneCode: '',
          localCode: '',
          proType: '',
          promotionNum: '',
          promotionName: '',
          periodStart: '',
          periodEnd: ''
        }
      },
      search() {
        let _this = this
        let requestJson = _this.requestJson
        requestJson.currPage = 1
        requestJson.pageSize = _this.tableData.config.pageSize
        let url = _this.userType ? promotionSearchPromotionHead : shipmentSearchSearchPromtion
        _this.requestJson.periodEnd = _this.requestJson.periodEnd.format('yyyy-MM-dd')
        _this.requestJson.periodStart = _this.requestJson.periodStart.format('yyyy-MM-dd')
        if (_this.requestJson.periodEnd !== '' && _this.requestJson.periodStart !== '') {
          if (!_this.compareDateByStareAndEnd(_this.requestJson.periodStart, _this.requestJson.periodEnd)) {
            _this.message('查询结束时间不能小于开始时间', 'warning')
            return
          }
        }
        _this.tableData.config.total = 0
        _this.tableData.select = []
        _this.tableData.body = []
        _this.http.post(url, requestJson, _this.$refs.detailResultDiv).then(data => {
          _this.handleData(data, requestJson)
        })
      },
      handleData(data, requestJson) {
        let _this = this
        if (data.code === '00000') {
          _this.tableData.config.http.data = requestJson
          if (_this.userType) {
            _this.tableData.config.total = data.mapInfo.totalRec
            _this.tableData.body = data.mapInfo.list
          } else {
            _this.tableData.config.total = data.totalRow
            _this.tableData.body = data.listInfo
          }
        } else {
          _this.message(data.msg, 'warning')
          _this.tableData.body = []
        }
      },
      cancel() {
        this.closeDialog()
      },
      confirm() {
        let _this = this
        if (_this.tableData.select.length > 0) {
          let prom = _this.tableData.select[0]
          this.$emit('update:select', prom)
          this.$emit('callback', prom)
          _this.closeDialog()
        } else {
          _this.messageBox('confirm', '您还没有选择促销,确定退出么').then(() => {
            _this.closeDialog()
          }).catch(() => {
            return
          })
        }
      }
    },
    mounted() {
      let _this = this
      _this.userType = _this.data.userType
      _this.promTypeOption = _this.data.promType
      if (_this.userType) {
        _this.regionOption = this.data.regionList
        _this.regionZoneRelation = _this.data.regionZoneRelation
        _this.zoneLocalRelation = _this.data.zoneLocalRelation
        _this.tableData.config.http.url = promotionSearchPromotionHead
      } else {
        _this.tableData.config.http.url = shipmentSearchSearchPromtion
      }
    },
    computed: {
      zoneOption() {
        if (this.requestJson.regionCode === '') {
          return []
        } else {
          return this.regionZoneRelation[this.requestJson.regionCode]
        }
      },
      // 大区下拉选改变 重新计算地区下拉选的值
      localOption() {
        if (this.requestJson.largeZoneCode === '') {
          return []
        } else {
          return this.zoneLocalRelation[this.requestJson.largeZoneCode]
        }
      }
    }
  }
</script>

<style lang='less' scoped>
  .app-freight-query{
    .title{
      color: #373D41;
      text-align: center;
      font-size: 18px;
      position: relative;
      top: -30px;
      z-index: -1;
    }
    .left-btn,.right-btn{
      margin-top: -10px;
      bottom: 0;
    }
    .left-btn{
      left: 0;
    }
    .right-btn{
      right: 0;
    }
    .list-box{
      li{
        float: left;
      }
    }
  }
</style>
