<template>
  <div>
    <div ref='box' class='app-invoice default-style'>
      <div class="app-center">
        {{title}}
      </div>
      <ul class='select-list clearfix app-mt10'>
        <li style='margin-top: -0px;' class=''>
          <!-- <app-select-box name='客户名称:' type='text' :value.sync="customerName"/> -->
          <div class="left">
            客户名称:
          </div>
          <div class="right">
            {{customerName}}
          </div>
        </li>
        <li style='margin-top: -0px;' class=''>
          <!-- <app-select-box name='ERP订单编号:' type='text' :value.sync="erpOrderNumber"/> -->
          <div class="left">
            ERP订单编号:
          </div>
          <div class="right">
            {{erpOrderNumber}}
          </div>
        </li>
        <li style='margin-top: -0px;' class=''>
          <!-- <app-select-box name='发货单号:' type='text' :value.sync="shipmentNumber"/> -->
          <div class="left">
            发货单号:
          </div>
          <div class="right">
            {{shipmentNumber}}
          </div>
        </li>
      </ul>
      <ul class="select-list clearfix app-mt10">
        <li class=''>
          <!-- <app-select-box name='客户地址:' type='text' :value.sync="address"/> -->
          <div class="left">
            客户地址:
          </div>
          <div class="right">
            {{address}}
          </div>
        </li>
        <li class=''>
          <!-- <app-select-box name='联系人/电话:' type='text' :value.sync="telephoneNumber"/> -->
          <div class="left">
            联系人/电话:
          </div>
          <div class="right">
            {{telephoneNumber}}
          </div>
        </li>
        <li class=''>
          <!-- <app-select-box name='出货日期:' type='text' :value.sync="outStoreDate"/> -->
          <div class="left">
          <!-- <app-select-box name='出货日期:' type='text' :value.sync="outStoreDate"/> -->
            出货日期:
          </div>
          <div class="right">
            {{outStoreDate}}
          </div>
        </li>
      </ul>
      <ul class="select-list clearfix app-mt10">
        <li class=''>
          <!-- <app-select-box name='订单备注:' type='text' :value.sync="orderRemark"/> -->
          <div class="left">
            订单备注:
          </div>
          <div class="right">
            {{orderRemark}}
          </div>
        </li>
        <li class=''>
          <!-- <app-select-box name='出货备注:' type='text' :value.sync="shipRemark"/> -->
          <div class="left">
            出货备注:
          </div>
          <div class="right">
            {{shipRemark}}
          </div>
        </li>
      </ul>
      <div class="clearfix"></div>
      <div>
        <table class='app-custom-table app-mt10'>
          <thead>
            <tr>
              <th v-for='item in tableData.head'>
                {{item}}
              </th>
            </tr>
          </thead>
          <tbody>
            <tr v-for='item in tableData.body'>
              <td v-for='temp in item'>
                {{temp}}
              </td>
            </tr>
          </tbody>
        </table>
      </div>
      <p class='app-mt10 app-mb10 app-ft12'>{{relationProm}}</p>
      <ul class='select-list-one'>
        <li>
          <div class="left">
            经办人:
          </div>
          <div class="right">

          </div>
        </li>
        <li>
          <div class="left">
            电话:
          </div>
          <div class="right">

          </div>
        </li>
        <li>
          <div class="left">
            发货仓地址:
          </div>
          <div class="right">

          </div>
        </li>
        <li>
          <div class="left">
            打印日期:
          </div>
          <div class="right">

          </div>
        </li>
      </ul>
      <div class="clearfix"></div>
      <ul class='select-list-one'>
        <li>
          <div class="left">
            第一联:
          </div>
          <div class="right">
            存根联
          </div>
        </li>
        <li>
          <div class="left">
            第二联:
          </div>
          <div class="right">
            回执
          </div>
        </li>
        <li>
          <div class="left">
            第三联:
          </div>
          <div class="right">
            会计
          </div>
        </li>
        <li>
          <div class="left">
            第四联:
          </div>
          <div class="right">
            客户留存
          </div>
        </li>
      </ul>
    </div>
    <div class="clearfix"></div>
    <app-button value='打印' icon='print' class='app-center app-mt10' @click.native='printPage'/>
  </div>
</template>

<script>
  export default {
    props: {
      data: {
        default: {}
      }
    },
    watch: {
      data() {
        this.initTable()
      }
    },
    data() {
      return {
        title: '',
        customerName: '',
        erpOrderNumber: '',
        shipmentNumber: '',
        address: '',
        telephoneNumber: '',
        outStoreDate: '',
        orderRemark: '',
        shipRemark: '',
        relationProm: '',
        tableData: {
          head: [
            '产品编码',
            '产品名称',
            '规格',
            '单位',
            '销量',
            '赠品量',
            '合计',
            '单价',
            '金额',
            '促销活动名称'
          ],
          body: []
        }
      }
    },
    methods: {
      printPage() {
        const box = this.$refs.box
        this.print(box)
      },
      initTable() {
        let _this = this
        _this.tableData.body = []
        _this.relationProm = []
        console.log(_this.data)
        _this.title = _this.data.pojo.supplyCustomerName + '发货单'
        _this.customerName = _this.data.pojo.supplyCustomerName
        _this.erpOrderNumber = _this.data.pojo.erpOrderNumber ? _this.data.pojo.erpOrderNumber : ''
        _this.shipmentNumber = _this.data.pojo.shipmentNumber ? _this.data.pojo.shipmentNumber : ''
        _this.address = _this.data.pojo.address ? _this.data.pojo.address : ''
        _this.telephoneNumber = _this.data.pojo.telephoneNumber ? _this.data.pojo.telephoneNumber : ''
        _this.outStoreDate = _this.data.pojo.outStoreData ? _this.data.pojo.outStoreData : ''
        _this.orderRemark = _this.data.pojo.orderRemarks ? _this.data.pojo.orderRemarks : ''
        _this.shipRemark = _this.data.pojo.shipRemarks ? _this.data.pojo.shipRemarks : ''
        // 行信息
        let lineList = []
        if (_this.data.pojo.lineList && _this.data.pojo.lineList.length > 0) {
          _this.data.pojo.lineList.add(_this.data.pojo.totalBean)
          _this.data.pojo.lineList.forEach(item => {
            let itemList = []
            item.productNumber ? itemList.add(item.productNumber) : itemList.add("")
            item.productDesc ? itemList.add(item.productDesc) : itemList.add("")
            item.productSepcification ? itemList.add(item.productSepcification) : itemList.add("")
            item.productUnit ? itemList.add(item.productUnit) : itemList.add("")
            item.salesVolume ? itemList.add(item.salesVolume) : itemList.add("")
            item.promVolume ? itemList.add(item.promVolume) : itemList.add("")
            item.totalVolume ? itemList.add(item.totalVolume) : itemList.add("")
            item.shipPrice ? itemList.add(item.shipPrice) : itemList.add("")
            item.amount ? itemList.add(item.amount) : itemList.add("")
            item.promotionDesc ? itemList.add(item.promotionDesc) : itemList.add("")
            lineList.add(itemList)
          })
        }
        if (lineList.length > 0) {
          lineList[lineList.length - 1][0] = '合计'
        }
        _this.tableData.body = lineList
        // 关联促销信息
        let promRelation = '*无赠品促销：'
        if (_this.data.pojo.relationPromList && _this.data.pojo.relationPromList.length > 0) {
          _this.data.pojo.relationPromList.foreach(item => {
            promRelation = promRelation + item.label + ';'
          })
        }
        _this.relationProm = promRelation
      }
    },
    mounted() {
      this.initTable()
    }
  }
</script>

<style lang='less'>
  .app-invoice{
    .select-list{
      li{
        width: 30%;
        float: left;
        margin-right: 3%;
        font-size: 12px;
        line-height: 18px;
        .left,.right{
          float: left;
          text-align: right;
          min-height: 18px;
          // line-height: 24px;
        }
        .left{
          width: 40%;
        }
        .right{
          width: 60%;
          word-wrap: break-word;
          text-align: left;
          padding-left: 10px;
          box-sizing: border-box;
        }
      }
    }
    .app-select-box .is-disabled .el-input__inner{
      background: #FFF!important;
    }
    .select-list-one{
      li{
        width: 20%;
        float: left;
        margin-right: 5%;
        box-sizing: border-box;
        margin-bottom: 10px;
        .left,.right{
          float: left;
          font-size: 12px;
        }
        .left{
          width: 50%;
          text-align: right;
        }
        .right{
          width: 50%;
          text-align: left;
          text-indent: 1em;
        }
      }
    }
    .select-list-two{
      li{
        width: 25%;
        float: left;
        text-align: center;
        margin-top: 10px;
      }
    }
    .app-custom-table{
      // height: 500px;
      td{
        // text-align: center;
      }
      td{
        // background: #111;
      }
      // 设置表头样式
      thead{
        tr{
          // th{
          //   text-align: center;
          //   background: #373D41!important;
          //   height: 30px;
          //   font-size: 12px;
          //   color: #FFFFFF!important;
          //   letter-spacing: 0;
          //   padding: 0;
          // }
          // th.checkbox{
          //   width: 40px;
          // }
          th{
            font-weight: 600;
          }
        }
      }
    }
    .dialog-title{
      color: #373D41;
      text-align: center;
      font-size: 18px;
      position: relative;
      top: -30px;
      z-index: -1;
    }
  }
</style>
