<template>
  <div class="app-select-category" :style="getStyle">
    <app-title value='产品类别'/>
    <div class='product-type'><i class='iconfont icon-wujiaoxing'></i>常用</div>
    <div @click='clickImg' class='app-pr' id="category0000">
      <img class='product-type-img' @click='categoryClick("00","Z0","")' :src='frequentlyUsedImgUrl' height="110"
           width="110"></img>
      <div class="wujiao" style='display:none;'></div>
    </div>
    <template v-for="item of categoryList">
      <div v-if='item.subCategorys' class='product-type'>
        <i class='iconfont icon-shui' v-if='testIconType(item.category.categoryDescription, "纯水")'>{{item.category.categoryDescription}}</i>
        <i class='iconfont icon-kuangquanshui' v-else-if='testIconType(item.category.categoryDescription, "矿泉水")'>{{item.category.categoryDescription}}</i>
        <i class='iconfont icon-naicha' v-else-if='testIconType(item.category.categoryDescription, "奶茶")'>{{item.category.categoryDescription}}</i>
        <i class='iconfont icon-gongneng' v-else-if='testIconType(item.category.categoryDescription, "功能")'>{{item.category.categoryDescription}}</i>
        <i class='iconfont icon-kafei' v-else-if='testIconType(item.category.categoryDescription, "咖啡")'>{{item.category.categoryDescription}}</i>
      </div>
      <!--<div v-for='subCategory in item.subCategorys' class='product-type-img' @click='categoryClick(item.category.categoryCode, subCategory.subTypeCode, subCategory.code)' ></div>-->
      <div>
        <div v-for='subCategory in item.subCategorys' @click='imgListClick' class=' app-pr'>
          <img class='product-type-img'
               @click='categoryClick(item.category.categoryCode, subCategory.subTypeCode, subCategory.code)'
               :src='subCategory.pictureUrl' height="110" width="110"/>
          <div class="wujiao" style='display:none;'></div>
        </div>
      </div>
    </template>
  </div>
</template>

<script>
  import {
    productGetAllType
  } from '@/api/api'
  import $ from 'jquery'

  export default {
    name: 'app-select-category',
    props: {
      data: {
        default: () => {
          return {}
        }
      }
    },
    data() {
      return {
        categoryList: [],
        CategoryCode: this.categoryCode,
        frequentlyUsedImgUrl: ''
      }
    },
    methods: {
      testIconType(dataType, type) {
        return dataType === type
        // return true
      },
      clickImg(e) {
        e = e || window.event
        let target = e.target
        if (target.nodeName !== 'IMG') return
        window.$('.product-type-img').each((index, item) => {
          item.style.border = 'none'
          item.parentElement.children[1].style.display = 'none'
        })
        target.style.border = '1px solid #089F48'
        target.style.boxSizing = 'border-box'
        target.parentElement.children[1].style.display = 'block'
      },
      categoryClick(categoryCode, subTypeCode, code) {
        this.$emit('setCategoryCode', categoryCode, subTypeCode, code)
      },
      imgListClick(e) {
        e = e || window.event
        let img = e.target
        if (img.nodeName !== 'IMG') return
        window.$('.product-type-img').each((index, item) => {
          item.style.border = 'none'
          item.parentElement.children[1].style.display = 'none'
        })
        img.style.border = '1px solid #089F48'
        img.style.boxSizing = 'border-box'
        img.parentElement.children[1].style.display = 'block'
      }
    },
    created() {
      let _this = this
      _this.http.post(productGetAllType, {}).then(data => {
        _this.categoryList = data.mapInfo.list
        _this.frequentlyUsedImgUrl = data.mapInfo.frequentlyUsedImgUrl
      })
    },
    mounted() {
      let _this = this
      if (_this.data) {
        this.data.setChangYong = () => {
          _this.$nextTick(() => {
            $('#category0000').click()
            $('#category0000').find('img').click()
          })
        }
      }
    },
    computed: {
      getStyle() {
        return {
          height: this.getViewHeight() - 50 + 'px'
        }
      }
    }
  }
</script>

<style lang='less' scoped>

  .wujiao {
    border: 10px solid #FFF;
    border-left-color: #089F48;
    width: 0;
    height: 0;
    position: absolute;
    right: 5px;
    top: 50px;
  }

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
