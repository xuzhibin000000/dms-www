<!--
  * 公用table组件
  * author : liao jiabing
  * QQ : 656317441
  * email : admin@w3c.top
-->
<template>
  <div>
    <div :style='getTableBoxStyle' v-if='showSwipe' ref='appTableBox'>
      <div>
        <!--
          data: body数据
          height: 表格高度
          highlight-current-row: 是否存在单选功能
          border: 是否存在边框
        -->
        <el-table
          :data="tableData.body"
          :height="getHeight"
          style="width: 100%"
          stripe
          ref='appTable'
          empty-text=' '
          @selection-change="selectChange"
          :highlight-current-row='tableData.config.radio'
          :border='tableData.config.border'
          @current-change="handleCurrentChange"
          @sort-change='sortChange'
          @row-click='toggleOpen'
          :show-summary='tableData.config.sum === true'>
          <!-- 判断是否存在复选框 -->
          <el-table-column
            type="selection"
            width="40"
            :selectable="selectable"
            :fixed='data.config.cover !== true'
            v-if='tableData.config.select'>
          </el-table-column>
          <template v-for='item of tableData.head'>
            <!--  存在跨行跨列 -->
            <template v-if='item.children !== undefined && item.children !== null'>
              <el-table-column
                :label="item.value"
                v-if="item.hide !== true">
                <!-- TODO -->
                <template v-for='temp of item.children'>
                  <el-table-column
                    v-if='temp.children !== undefined && temp.children !== null && temp.hide !== true'
                    :label="temp.value">
                    <!-- TODO -->
                    <!-- <el-table-column
                      v-if='temp.children !== undefined && temp.children !== null'
                      :label="temp.value">
                    </el-table-column> -->
                    <template v-for='temp3 in temp.children'>
                      <!-- 三层 - start -->
                      <el-table-column
                        :prop="temp3.key"
                        :label="temp3.value"
                        :sortable='temp3.sort === true ? "custom" : false'
                        :fixed='temp.fixed === true'
                        :width="getTdWidth(temp3)">
                        <!-- TODO -->
                        <!-- 支持自定义模板 -->
                        <template scope="scope">
                          <template v-if='testRemoveBtn(temp3)'>
                            <!--  删除按钮 -->
                            <i class="iconfont icon-shanchu1" style='color: #F35164' @click='removeClick(scope.row, temp3)'></i>
                          </template>
                          <!-- 输入框 -->
                          <el-input v-model='scope.row[temp3.key]' placeholder="请输入内容"
                                    @change.native='changeValue(scope.row, temp3, true)'
                                    @keyup.native='changeValue(scope.row, temp3, true)' @paste.native='changeValue(scope.row, temp3, false)' v-else-if="testInput(scope.row, temp3)"
                                    class='app-table-input'
                                    @click='tdClick(scope.row, temp3)'
                                    :maxlength='temp3.maxlength'>
                          </el-input>
                          <!-- 搜索 -->
                          <el-input
                            placeholder="请选择..."
                            icon="search"
                            v-model='scope.row[temp3.key]'
                            @input='changeValue(scope.row, temp3)'
                            @click='searchClick(scope.row, temp3)'
                            v-else-if="testInputSearch(scope.row, temp3)"
                            :disabled="true">
                          </el-input>
                          <!-- 下拉选框 -->
                          <el-select v-model="scope.row[temp3.key]" filterable clearable placeholder="请选择" v-else-if='testSelect(scope.row, temp3)' @input='selectEventChange(scope.row, temp3)'>
                            <template v-for='item1 in scope.row.bodyConfig'>
                              <el-option
                                v-for="item2 in item1.position[temp3.key]"
                                :key="item2.value"
                                :label="item2.label"
                                :value="item2.value"
                                v-if='item1.type === "select"'>
                              </el-option>
                            </template>
                          </el-select>
                          <!-- 日期选择器 -->
                          <!-- <el-date-picker
                            v-model="scope.row[temp.key]"
                            :type="item.type || 'date'"
                            :editable="false"
                            :placeholder="item.placeholder || '选择日期'"
                            :picker-options="getDateOptions(scope.row, item)"
                            v-else-if='testDate(scope.row, temp)'
                            @input='changeValue(scope.row, temp)'>
                          </el-date-picker> -->
                          <app-date :value.sync='scope.row[temp3.key]'
                            :type='item.type'
                            :placeholder="item.placeholder || '选择日期'"
                            v-else-if='testDate(scope.row, temp3)'
                            @change='changeValue(scope.row, temp3, temp3.type)'
                            :clearBtn='getDateConfig(scope.row, temp3, "clearBtn")'
                            :minDate='getDateConfig(scope.row, temp3, "minDate")'
                            :maxDate='getDateConfig(scope.row, temp3, "maxDate")'/>
                          <!-- 时间选择器 -->
                          <el-time-select
                            placeholder="起始时间"
                            v-model="scope.row[temp3.key]"
                            :picker-options="{
                              start: '00:00',
                              step: '00:30',
                              end: '23:59'
                            }"
                            v-else-if='testTime(scope.row, temp3, "start")'
                            @change='minTime(scope.row, temp3)'
                            @click='tdClick(scope.row, temp3)'>
                          </el-time-select>
                          <el-time-select
                            placeholder="结束时间"
                            v-model="scope.row[temp3.key]"
                            :picker-options="{
                              start: '00:29',
                              step: '00:30',
                              end: '23:59',
                              minTime: scope.row[temp3.key]
                            }"
                            v-else-if='testTime(scope.row, temp3, "end")'
                            @click='tdClick(scope.row, temp3)'>
                          </el-time-select>
                          <!-- 只显示图标 -->
                          <template v-else-if='testImg(scope.row, temp3)'>
                            <span v-if='testImgType(scope.row, temp3, "beizhu")'>
                              <i class='iconfont icon-beizhu app-ft12 icon-beizhu-active'
                                 v-if='testImgTypeActive(scope.row, temp3, "beizhu")'></i>
                              <i class='iconfont icon-beizhu app-ft12 color-eee' v-else></i>
                            </span>
                            <span v-else-if='testImgType(scope.row, temp3, "jidan")'>
                              <i class='iconfont icon-jidan app-ft12 icon-jidan-active' v-if='testImgTypeActive(scope.row, temp3, "jidan")'></i>
                              <i class='iconfont icon-jidan app-ft12 color-eee' v-else></i>
                            </span>
                            <span v-else-if='testImgType(scope.row, temp3, "fenpi")'>
                              <i class='iconfont icon-fenpi app-ft12 icon-fenpi-active' v-if='testImgTypeActive(scope.row, temp, "fenpi")'></i>
                              <i class='iconfont icon-fenpi app-ft12 color-eee' v-else></i>
                            </span>
                            <span v-else-if='testImgType(scope.row, temp3, "hongbao")'>
                              <i class='iconfont icon-shifouyouqian app-ft12 icon-hongbao-active' v-if='testImgTypeActive(scope.row, temp3, "hongbao")'></i>
                              <i class='iconfont icon-shifouyouqian app-ft12 color-eee' v-else></i>
                            </span>
                            <span v-else-if='testImgType(scope.row, temp3, "daiban")'>
                              <i class='iconfont icon-daiban app-ft12 icon-daiban-active' v-if='testImgTypeActive(scope.row, temp3, "daiban")'></i>
                              <i class='iconfont icon-daiban app-ft12 color-eee' v-else></i>
                            </span>
                          </template>
                          <template v-else-if='testImage(scope.row, temp3)'>
                            <img :src="scope.row[temp3.key]" height="80" style='margin-top: 6px; margin-left: -8px;'>
                          </template>
                          <!-- 收藏图标 -->
                          <template v-else>
                            <i class='iconfont icon-wujiaoxingman app-ft12' v-if='testCollection(scope.row, temp3) === "true"' style='color:#F5C023'
                               @click='collectionClick(scope.row, temp3)'>
                            </i>
                            <i class='iconfont icon-wujiaoxing2 app-ft12' v-else-if='testCollection(scope.row, temp3) === "false"' style='color:#F5C023'
                               @click='collectionClick(scope.row, temp3)'>
                            </i>
                            <span @click='tdClick(scope.row, temp3)' v-else-if='temp.type === "link" && textTdFlag' class='app-table-span-link'>
                              <template v-if='testLineRMS(temp3)'>
                                {{scope.row[temp.key]}}
                              </template>
                            </span>
                            <span @click='tdClick(scope.row, temp3)' v-else-if='textTdFlag'>{{scope.row[temp3.key]}}</span>
                          </template>
                        </template>
                      </el-table-column>
                      <!-- 三层 - end -->
                    </template>
                  </el-table-column>
                  <el-table-column
                    v-else-if='temp.hide !== true'
                    :prop="temp.key"
                    :label="temp.value"
                    :sortable='temp.sort === true ? "custom" : false'
                    :fixed='temp.fixed === true'
                    :width="getTdWidth(temp)">
                    <!-- TODO -->
                    <!-- 支持自定义模板 -->
                    <template scope="scope" v-if='false'>
                      <template v-if='testRemoveBtn(temp)'>
                        <!--  删除按钮 -->
                        <i class="iconfont icon-shanchu1" style='color: #F35164' @click='removeClick(scope.row, temp)'></i>
                      </template>
                      <!-- 输入框 -->
                      <el-input v-model='scope.row[temp.key]' placeholder="请输入内容"
                                @change.native='changeValue(scope.row, temp, true)'
                                @keyup.native='changeValue(scope.row, temp, true)' @paste.native='changeValue(scope.row, temp, false)' v-else-if="testInput(scope.row, temp)"
                                class='app-table-input'
                                @click='tdClick(scope.row, temp)'
                                :maxlength='temp.maxlength'>
                      </el-input>
                      <!-- 搜索 -->
                      <el-input
                        placeholder="请选择..."
                        icon="search"
                        v-model='scope.row[temp.key]'
                        @input='changeValue(scope.row, temp)'
                        @click='searchClick(scope.row, temp)'
                        v-else-if="testInputSearch(scope.row, temp)"
                        :disabled="true">
                      </el-input>
                      <!-- 下拉选框 -->
                      <el-select v-model="scope.row[temp.key]" filterable clearable placeholder="请选择" v-else-if='testSelect(scope.row, temp)' @input='selectEventChange(scope.row, temp)'>
                        <template v-for='item1 in scope.row.bodyConfig'>
                          <el-option
                            v-for="item2 in item1.position[temp.key]"
                            :key="item2.value"
                            :label="item2.label"
                            :value="item2.value"
                            v-if='item1.type === "select"'>
                          </el-option>
                        </template>
                      </el-select>
                      <!-- 日期选择器 -->
                      <!-- <el-date-picker
                        v-model="scope.row[temp.key]"
                        :type="item.type || 'date'"
                        :editable="false"
                        :placeholder="item.placeholder || '选择日期'"
                        :picker-options="getDateOptions(scope.row, temp)"
                        v-else-if='testDate(scope.row, temp)'
                        @input='changeValue(scope.row, temp)'>
                      </el-date-picker> -->
                      <app-date :value.sync='scope.row[temp.key]'
                        :type='item.type'
                        :placeholder="item.placeholder || '选择日期'"
                        v-else-if='testDate(scope.row, temp)'
                        @change='changeValue(scope.row, temp, temp.type)'
                        :clearBtn='getDateConfig(scope.row, temp, "clearBtn")'
                        :minDate='getDateConfig(scope.row, temp, "minDate")'
                        :maxDate='getDateConfig(scope.row, temp, "maxDate")'/>
                      <!-- 时间选择器 -->
                      <el-time-select
                        placeholder="起始时间"
                        v-model="scope.row[temp.key]"
                        :picker-options="{
                          start: '00:00',
                          step: '00:30',
                          end: '23:59'
                        }"
                        v-else-if='testTime(scope.row, temp, "start")'
                        @change='minTime(scope.row, temp)'
                        @click='tdClick(scope.row, temp)'>
                      </el-time-select>
                      <el-time-select
                        placeholder="结束时间"
                        v-model="scope.row[temp.key]"
                        :picker-options="{
                          start: '00:29',
                          step: '00:30',
                          end: '23:59',
                          minTime: scope.row[temp.key]
                        }"
                        v-else-if='testTime(scope.row, temp, "end")'
                        @click='tdClick(scope.row, temp)'>
                      </el-time-select>
                      <!-- 只显示图标 -->
                      <template v-else-if='testImg(scope.row, temp)'>
                        <el-popover trigger="hover" placement="top" v-if='testTip(scope.row, temp)'>
                          <div v-html='getTips(scope.row, temp)'></div>
                          <div slot="reference" class="name-wrapper">
                            <span v-if='testImgType(scope.row, temp, "beizhu")'>
                              <i class='iconfont icon-beizhu app-ft12 icon-beizhu-active'
                                 v-if='testImgTypeActive(scope.row, temp, "beizhu")'></i>
                              <i class='iconfont icon-beizhu app-ft12 color-eee' v-else></i>
                            </span>
                            <i class='iconfont icon-jidan app-ft12 color-eee' v-else></i>
                            </span>
                            <span v-else-if='testImgType(scope.row, temp, "fenpi")'>
                              <i class='iconfont icon-fenpi app-ft12 icon-fenpi-active' v-if='testImgTypeActive(scope.row, temp, "fenpi")'></i>
                              <i class='iconfont icon-fenpi app-ft12 color-eee' v-else></i>
                            </span>
                            <span v-else-if='testImgType(scope.row, temp, "hongbao")'>
                              <i class='iconfont icon-shifouyouqian app-ft12 icon-hongbao-active' v-if='testImgTypeActive(scope.row, temp, "hongbao")'></i>
                              <i class='iconfont icon-shifouyouqian app-ft12 color-eee' v-else></i>
                            </span>
                            <span v-else-if='testImgType(scope.row, temp, "daiban")'>
                              <i class='iconfont icon-daiban app-ft12 icon-daiban-active' v-if='testImgTypeActive(scope.row, temp, "daiban")'></i>
                              <i class='iconfont icon-daiban app-ft12 color-eee' v-else></i>
                            </span>
                          </div>
                        </el-popover>
                        <template v-else>
                          <span v-if='testImgType(scope.row, temp, "beizhu")'>
                            <i class='iconfont icon-beizhu app-ft12 icon-beizhu-active'
                               v-if='testImgTypeActive(scope.row, temp, "beizhu")'></i>
                            <i class='iconfont icon-beizhu app-ft12 color-eee' v-else></i>
                          </span>
                          <span v-else-if='testImgType(scope.row, temp, "jidan")'>
                            <i class='iconfont icon-jidan app-ft12 icon-jidan-active' v-if='testImgTypeActive(scope.row, temp, "jidan")'></i>
                            <i class='iconfont icon-jidan app-ft12 color-eee' v-else></i>
                          </span>
                          <span v-else-if='testImgType(scope.row, temp, "fenpi")'>
                            <i class='iconfont icon-fenpi app-ft12 icon-fenpi-active' v-if='testImgTypeActive(scope.row, temp, "fenpi")'></i>
                            <i class='iconfont icon-fenpi app-ft12 color-eee' v-else></i>
                          </span>
                          <span v-else-if='testImgType(scope.row, temp, "hongbao")'>
                            <i class='iconfont icon-shifouyouqian app-ft12 icon-hongbao-active' v-if='testImgTypeActive(scope.row, temp, "hongbao")'></i>
                            <i class='iconfont icon-shifouyouqian app-ft12 color-eee' v-else></i>
                          </span>
                          <span v-else-if='testImgType(scope.row, temp, "daiban")'>
                            <i class='iconfont icon-daiban app-ft12 icon-daiban-active' v-if='testImgTypeActive(scope.row, temp, "daiban")'></i>
                            <i class='iconfont icon-daiban app-ft12 color-eee' v-else></i>
                          </span>
                        </template>
                      </template>
                      <!-- <template v-else-if='testBtn(scope.row, temp)'>
                        <button :disabled='getBtnDisabled(scope.row, item)'
                        @click='btnClick(scope.row, item)' class='app-table-button app-table-button-main'>
                          {{scope.row[item.key]}}
                        </button>
                      </template> -->
                      <template v-else-if='testBtn(scope.row, temp, "success")'>
                        <button :disabled='getBtnDisabled(scope.row, temp)'
                                @click='btnClick(scope.row, temp)' class='app-table-button app-table-button-main'
                                v-if='testBtnRMS(scope.row, temp)'>
                          {{scope.row[temp.key]}}
                        </button>
                      </template>
                      <template v-else-if='testBtn(scope.row, temp, "main")'>
                        <button :disabled='getBtnDisabled(scope.row, temp)'
                                @click='btnClick(scope.row, temp)' class='app-table-button app-table-button-main'
                                v-if='testBtnRMS(scope.row, temp)'>
                          {{scope.row[temp.key]}}
                        </button>
                      </template>
                      <template v-else-if='testBtn(scope.row, temp, "warn")'>
                        <button :disabled='getBtnDisabled(scope.row, temp)'
                                @click='btnClick(scope.row, temp)' class='app-table-button app-table-button-warn'
                                v-if='testBtnRMS(scope.row, temp)'>
                          {{scope.row[temp.key]}}
                        </button>
                      </template>
                      <template v-else-if='testBtn(scope.row, temp, "default")'>
                        <button :disabled='getBtnDisabled(scope.row, temp)'
                                @click='btnClick(scope.row, temp)' class='app-table-button app-table-button-default'
                                v-if='testBtnRMS(scope.row, temp)'>
                          {{scope.row[temp.key]}}
                        </button>
                      </template>
                      <template v-else-if='testBtn(scope.row, temp, "text")'>
                        <button :disabled='getBtnDisabled(scope.row, temp)'
                                @click='btnClick(scope.row, temp)' class='app-table-button app-table-button-text'
                                v-if='testBtnRMS(scope.row, temp)'>
                          {{scope.row[temp.key]}}
                        </button>
                      </template>
                      <template v-else-if='testImage(scope.row, temp)'>
                        <img :src="scope.row[item.key]" height="80" style='margin-top: 6px; margin-left: -8px;'>
                      </template>
                      <!-- 收藏图标 -->
                      <template v-else>
                        <i class='iconfont icon-wujiaoxingman app-ft12' v-if='testCollection(scope.row, temp) === "true"' style='color:#F5C023'
                           @click='collectionClick(scope.row, temp)'>
                        </i>
                        <i class='iconfont icon-wujiaoxing2 app-ft12' v-else-if='testCollection(scope.row, temp) === "false"' style='color:#F5C023'
                           @click='collectionClick(scope.row, temp)'>
                        </i>
                        <el-popover trigger="hover" placement="top" v-if='testTip(scope.row, temp)'>
                          <div v-html='getTips(scope.row, temp)' class='app-table-tips'></div>
                          <div slot="reference" class="name-wrapper">
                            <span @click='tdClick(scope.row, temp)'>{{scope.row[temp.key]}}</span>
                          </div>
                        </el-popover>
                        <span @click='tdClick(scope.row, temp)' v-else-if='temp.type === "link" && textTdFlag' class='app-table-span-link'>
                          <template v-if='testLineRMS(temp)'>
                            {{scope.row[temp.key]}}
                          </template>
                        </span>
                        <span @click='tdClick(scope.row, temp)' v-else-if='textTdFlag'>{{scope.row[temp.key]}}</span>
                      </template>
                    </template>
                  </el-table-column>
                </template>
              </el-table-column>
            </template>
            <template v-else>
              <el-table-column
                :prop="item.key"
                :label="item.value"
                :sortable='item.sort === true ? "custom" : false'
                :fixed='item.fixed === true'
                :width="getTdWidth(item)"
                v-if='getShow(item) && item.hide !== true'>
                <!-- 支持自定义模板 -->
                <template scope="scope">
                  <template v-if='testUploadBtn(scope.row, item)'>
                    <app-upload :data='getUploadData(scope.row, item)'/>
                  </template>
                  <template v-else-if='testRemoveBtn(item)'>
                    <!--  删除按钮 -->
                    <i class="iconfont icon-shanchu1" style='color: #F35164' @click='removeClick(scope.row, item)'></i>
                  </template>
                  <!-- 输入框 -->
                  <el-input v-model='scope.row[item.key]' placeholder="请输入内容"
                            @change.native='changeValue(scope.row, item, true)'
                            @keyup.native='changeValue(scope.row, item, true)' @paste.native='changeValue(scope.row, item, false)' v-else-if="testInput(scope.row, item)"
                            class='app-table-input'
                            @click='tdClick(scope.row, item)'
                            :maxlength='item.maxlength'>
                  </el-input>
                  <!-- 搜索 -->
                  <el-input
                    placeholder="请选择..."
                    icon="search"
                    v-model='scope.row[item.key]'
                    @input='changeValue(scope.row, item)'
                    @click='searchClick(scope.row, item)'
                    v-else-if="testInputSearch(scope.row, item)"
                    :disabled="true">
                  </el-input>
                  <!-- 下拉选框 -->
                  <el-select v-model="scope.row[item.key]" filterable clearable placeholder="请选择" v-else-if='testSelect(scope.row, item)' @input='selectEventChange(scope.row, item)'>
                    <template v-for='item1 in scope.row.bodyConfig'>
                      <el-option
                        v-for="item2 in item1.position[item.key]"
                        :key="item2.value"
                        :label="item2.label"
                        :value="item2.value"
                        v-if='item1.type === "select"'>
                      </el-option>
                    </template>
                  </el-select>
                  <!-- 日期选择器 -->
                  <!-- <el-date-picker
                    v-model="scope.row[item.key]"
                    :type="item.type || 'date'"
                    :editable="false"
                    :placeholder="item.placeholder || '选择日期'"
                    :picker-options="getDateOptions(scope.row, item)"
                    v-else-if='testDate(scope.row, item)'
                    @input='changeValue(scope.row, item)'>
                  </el-date-picker> -->
                  <app-date :value.sync='scope.row[item.key]'
                    :type='item.type'
                    :placeholder="item.placeholder || '选择日期'"
                    v-else-if='testDate(scope.row, item)'
                    @change='changeValue(scope.row, item, item.type)'
                    :clearBtn='getDateConfig(scope.row, item, "clearBtn")'
                    :minDate='getDateConfig(scope.row, item, "minDate")'
                    :maxDate='getDateConfig(scope.row, item, "maxDate")'/>
                  <!-- 时间选择器 -->
                  <el-time-select
                    placeholder="起始时间"
                    v-model="scope.row[item.key]"
                    :picker-options="{
                      start: '00:00',
                      step: '00:30',
                      end: '23:59'
                    }"
                    v-else-if='testTime(scope.row, item, "start")'
                    @change='minTime(scope.row, item)'
                    @click='tdClick(scope.row, item)'>
                  </el-time-select>
                  <el-time-select
                    placeholder="结束时间"
                    v-model="scope.row[item.key]"
                    :picker-options="{
                      start: '00:29',
                      step: '00:30',
                      end: '23:59',
                      minTime: scope.row[item.key]
                    }"
                    v-else-if='testTime(scope.row, item, "end")'
                    @click='tdClick(scope.row, item)'>
                  </el-time-select>
                  <!-- 只显示图标 -->
                  <template v-else-if='testImg(scope.row, item)'>
                    <el-popover trigger="hover" placement="top" v-if='testTip(scope.row, item)'>
                      <div v-html='getTips(scope.row, item)'></div>
                      <div slot="reference" class="name-wrapper">
                        <span v-if='testImgType(scope.row, item, "beizhu")'>
                          <i class='iconfont icon-beizhu app-ft12 icon-beizhu-active'
                             v-if='testImgTypeActive(scope.row, item, "beizhu")'></i>
                          <i class='iconfont icon-beizhu app-ft12 color-eee' v-else></i>
                        </span>
                        <span v-else-if='testImgType(scope.row, item, "jidan")'>
                          <i class='iconfont icon-jidan app-ft12 icon-jidan-active' v-if='testImgTypeActive(scope.row, item, "jidan")'></i>
                          <i class='iconfont icon-jidan app-ft12 color-eee' v-else></i>
                        </span>
                        <span v-else-if='testImgType(scope.row, item, "fenpi")'>
                          <i class='iconfont icon-fenpi app-ft12 icon-fenpi-active' v-if='testImgTypeActive(scope.row, item, "fenpi")'></i>
                          <i class='iconfont icon-fenpi app-ft12 color-eee' v-else></i>
                        </span>
                        <span v-else-if='testImgType(scope.row, item, "hongbao")'>
                          <i class='iconfont icon-shifouyouqian app-ft12 icon-hongbao-active' v-if='testImgTypeActive(scope.row, item, "hongbao")'></i>
                          <i class='iconfont icon-shifouyouqian app-ft12 color-eee' v-else></i>
                        </span>
                        <span v-else-if='testImgType(scope.row, item, "daiban")'>
                          <i class='iconfont icon-daiban app-ft12 icon-daiban-active' v-if='testImgTypeActive(scope.row, item, "daiban")'></i>
                          <i class='iconfont icon-daiban app-ft12 color-eee' v-else></i>
                        </span>
                      </div>
                    </el-popover>
                    <template v-else>
                      <span v-if='testImgType(scope.row, item, "beizhu")'>
                        <i class='iconfont icon-beizhu app-ft12 icon-beizhu-active'
                           v-if='testImgTypeActive(scope.row, item, "beizhu")'></i>
                        <i class='iconfont icon-beizhu app-ft12 color-eee' v-else></i>
                      </span>
                      <span v-else-if='testImgType(scope.row, item, "jidan")'>
                        <i class='iconfont icon-jidan app-ft12 icon-jidan-active' v-if='testImgTypeActive(scope.row, item, "jidan")'></i>
                        <i class='iconfont icon-jidan app-ft12 color-eee' v-else></i>
                      </span>
                      <span v-else-if='testImgType(scope.row, item, "fenpi")'>
                        <i class='iconfont icon-fenpi app-ft12 icon-fenpi-active' v-if='testImgTypeActive(scope.row, item, "fenpi")'></i>
                        <i class='iconfont icon-fenpi app-ft12 color-eee' v-else></i>
                      </span>
                      <span v-else-if='testImgType(scope.row, item, "hongbao")'>
                        <i class='iconfont icon-shifouyouqian app-ft12 icon-hongbao-active' v-if='testImgTypeActive(scope.row, item, "hongbao")'></i>
                        <i class='iconfont icon-shifouyouqian app-ft12 color-eee' v-else></i>
                      </span>
                      <span v-else-if='testImgType(scope.row, item, "daiban")'>
                        <i class='iconfont icon-daiban app-ft12 icon-daiban-active' v-if='testImgTypeActive(scope.row, item, "daiban")'></i>
                        <i class='iconfont icon-daiban app-ft12 color-eee' v-else></i>
                      </span>
                    </template>
                  </template>
                  <template v-else-if='testBtn(scope.row, item, "success")'>
                    <button :disabled='getBtnDisabled(scope.row, item)'
                            @click='btnClick(scope.row, item)' class='app-table-button app-table-button-main'
                            v-if='testBtnRMS(scope.row, item)'>
                      {{scope.row[item.key]}}
                    </button>
                  </template>
                  <template v-else-if='testBtn(scope.row, item, "main")'>
                    <button :disabled='getBtnDisabled(scope.row, item)'
                            @click='btnClick(scope.row, item)' class='app-table-button app-table-button-main'
                            v-if='testBtnRMS(scope.row, item)'>
                      {{scope.row[item.key]}}
                    </button>
                  </template>
                  <template v-else-if='testBtn(scope.row, item, "warn")'>
                    <button :disabled='getBtnDisabled(scope.row, item)'
                            @click='btnClick(scope.row, item)' class='app-table-button app-table-button-warn'
                            v-if='testBtnRMS(scope.row, item)'>
                      {{scope.row[item.key]}}
                    </button>
                  </template>
                  <template v-else-if='testBtn(scope.row, item, "default")'>
                    <button :disabled='getBtnDisabled(scope.row, item)'
                            @click='btnClick(scope.row, item)' class='app-table-button app-table-button-default'
                            v-if='testBtnRMS(scope.row, item)'>
                      {{scope.row[item.key]}}
                    </button>
                  </template>
                  <template v-else-if='testBtn(scope.row, item, "text")'>
                    <button :disabled='getBtnDisabled(scope.row, item)'
                            @click='btnClick(scope.row, item)' class='app-table-button app-table-button-text'
                            v-if='testBtnRMS(scope.row, item)'>
                      {{scope.row[item.key]}}
                    </button>
                  </template>
                  <!-- 状态判断 - start -->
                  <template v-else-if='testBtn(scope.row, item, "success", "status")'>
                    <button :disabled='getBtnDisabled(scope.row, item)'
                            @click='btnClick(scope.row, item)' class='app-table-status app-table-status-main'>
                      {{scope.row[item.key]}}
                    </button>
                  </template>
                  <template v-else-if='testBtn(scope.row, item, "info", "status")'>
                    <button :disabled='getBtnDisabled(scope.row, item)'
                            @click='btnClick(scope.row, item)' class='app-table-status app-table-status-info'>
                      {{scope.row[item.key]}}
                    </button>
                  </template>
                  <template v-else-if='testBtn(scope.row, item, "warn", "status")'>
                    <button :disabled='getBtnDisabled(scope.row, item)'
                            @click='btnClick(scope.row, item)' class='app-table-status app-table-status-warn'>
                      {{scope.row[item.key]}}
                    </button>
                  </template>
                  <template v-else-if='testBtn(scope.row, item, "default", "status")'>
                    <button :disabled='getBtnDisabled(scope.row, item)'
                            @click='btnClick(scope.row, item)' class='app-table-status app-table-status-default'>
                      {{scope.row[item.key]}}
                    </button>
                  </template>
                  <!-- 状态判断 - end -->
                  <template v-else-if='testState(scope.row, item, true)'>
                    <a href="javascript:void(0);" class='app-table-confirm-state'>
                      {{scope.row[item.key]}}
                    </a>
                  </template>
                  <template v-else-if='testState(scope.row, item, false)'>
                    <a href="javascript:void(0);" class='app-table-confirm-state app-table-confirm-state-false'>
                      {{scope.row[item.key]}}
                    </a>
                  </template>
                  <template v-else-if='testImage(scope.row, item)'>
                    <img :src="scope.row[item.key]" height="80" style='margin-top: 6px; margin-left: -8px;'>
                  </template>
                  <!-- 收藏图标 -->
                  <template v-else>
                    <i class='iconfont icon-wujiaoxingman app-ft12' v-if='testCollection(scope.row, item) === "true"' style='color:#F5C023'
                       @click='collectionClick(scope.row, item)'>
                    </i>
                    <i class='iconfont icon-wujiaoxing2 app-ft12' v-else-if='testCollection(scope.row, item) === "false"' style='color:#F5C023'
                       @click='collectionClick(scope.row, item)'>
                    </i>
                    <el-popover trigger="hover" placement="top" v-if='testTip(scope.row, item)'>
                      <div v-html='getTips(scope.row, item)' class='app-table-tips'></div>
                      <div slot="reference" class="name-wrapper">
                        <span @click='tdClick(scope.row, item)'>{{scope.row[item.key]}}</span>
                      </div>
                    </el-popover>
                    <span @click='tdClick(scope.row, item)' v-else-if='item.type === "link" && textTdFlag' class='app-table-span-link'>
                      <template v-if='testLineRMS(item)'>
                        {{scope.row[item.key]}}
                      </template>
                    </span>
                    <span @click='tdClick(scope.row, item)' v-else-if='textTdFlag'>{{scope.row[item.key]}}</span>
                  </template>
                </template>
              </el-table-column>
            </template>
          </template>
        </el-table>
      </div>
    </div>
    <!-- 分页组件(小) -->
    <el-pagination
      small
      layout="prev, pager, next"
      :total="tableData.config.total"
      ref='paginstion'
      style='margin:20px;text-align:center;'
      @current-change="currentChange"
      :current-page.sync="currentPage"
      :page-size="pageSize"
      v-if='tableData.config.small === true'>
    </el-pagination>
    <!-- 分页组件(大) -->
    <el-pagination
      layout="prev, pager, next, jumper, total"
      ref='paginstion'
      :total="tableData.config.total"
      style='margin:20px;text-align:center;'
      @current-change="currentChange"
      :current-page.sync="currentPage"
      :page-size="data.config.pageSize"
      v-else-if='tableData.config.noLimit !== true'>
    </el-pagination>
  </div>
</template>

<script>
  import tableBg2 from './img/tableBg2.png'
  import totalImg from './img/total.png'
  import {
    mapGetters
  } from 'vuex'
  export default {
    data () {
      // let _this = this
      return {
        showSwipe: true,
        tableImg: false,
        tableBg2,
        totalImg,
        currentPage: this.data.config.http.currentPage,
        // selectIndex: -1,
        currentRow: {},
        getHeight: 0,
        attr: false,
        // 下策
        textTdFlag: true,
        noLimitQuery: false,
        // tableData: this.data,
        dateOptions: {
          // // 快捷选项
          // shortcuts: [{
          //   text: '今天',
          //   onClick(picker) {
          //     picker.$emit('pick', new Date())
          //   }
          // }, {
          //   text: '昨天',
          //   onClick(picker) {
          //     const date = new Date()
          //     date.setTime(date.getTime() - 3600 * 1000 * 24)
          //     picker.$emit('pick', date)
          //   }
          // }, {
          //   text: '一周前',
          //   onClick(picker) {
          //     const date = new Date()
          //     date.setTime(date.getTime() - 3600 * 1000 * 24 * 7)
          //     picker.$emit('pick', date)
          //   }
          // }]
          disabledDate(time) {
            return null
          }
        }
      }
    },
    computed: {
      ...mapGetters([
        'RMSLIST'
      ]),
      // appTable外层盒子样式
      getTableBoxStyle() {
        if (this.padding === true) {
          return 'overflow: auto;padding: 0 10px;'
        }
        return 'overflow: auto;'
      },
      // 表格宽度
      getWidth() {
        if (this.data.config.width === null || this.data.config.width === undefined || this.data.config.width <= 0) {
          return `width:100%`
        } else {
          return `width:${this.data.config.width}px`
        }
      },
      // 每页记录数
      pageSize() {
        return this.data.config.pageSize || 10
      },
      // 数据源
      tableData() {
        if (this.data.config.treeIndex === null || this.data.config.treeIndex === undefined) this.data.config.treeIndex = 1
        let body = this.data.body
        for (let i = 0; i < body.length; i++) {
          let temp = body[i]
          // 不存在bodyConfig默认空数组
          if (temp.bodyConfig === null || temp.bodyConfig === undefined) temp.bodyConfig = []
        }
        return this.data
      }
    },
    watch: {
      'data.config': function(val) {
        const _this = this
        _this.$nextTick(() => {
          if (val.selectAll === false) {
            window.$(_this.$refs.appTableBox).find('.el-table__fixed-header-wrapper table thead tr:eq(0) th:eq(0) .cell,.el-table__header-wrapper thead tr:eq(0) th:eq(0) .cell').remove()
          }
        })
      },
      'data.body': function(val, oval) {
        if (val.length === 0) return
        this.$nextTick(function() {
          if (oval.length === 0) {
            this.initOpen(val)
          }
        })
        this.$nextTick(function() {
          this.initTotalImg()
          if (this.tableImg) {
            let appTableBox = this.$refs.appTableBox
            window.$(appTableBox).find('.el-table__body-wrapper').each((i, e) => {
              e.style.background = 'url(' + this.tableBg2 + ')'
              e.style['background-repeat'] = 'round'
            })
          }
        })
      }
    },
    methods: {
      sortChange(params) {
        if (this.tableData.config.sortChange && typeof this.tableData.config.sortChange === 'function') {
          this.tableData.config.sortChange(params)
        }
      },
      testLineRMS(item) {
        if (item.rms === undefined) return true
        return this.RMSLIST.indexOf(item.rms) !== -1
      },
      // 判断按钮权限
      testBtnRMS(row, item) {
        const bodyConfig = row.bodyConfig
        for (let i = 0; i < bodyConfig.length; i++) {
          const temp = bodyConfig[i]
          if (temp.type === 'button') {
            const position = temp.position
            for (let j = 0; j < position.length; j++) {
              const obj = position[j]
              if (obj.key === item.key) {
                if (obj.rms === null || obj.rms === undefined) {
                  return true
                }
                return this.RMSLIST.indexOf(obj.rms) !== -1
              }
            }
          }
        }
      },
      // 日期控件配置
      getDateConfig(row, item, configType) {
        const bodyConfig = row.bodyConfig
        for (let i = 0; i < bodyConfig.length; i++) {
          const temp = bodyConfig[i]
          if (temp.type === 'date') {
            const position = temp.position
            for (let j = 0; j < position.length; j++) {
              const tempObj = position[j]
              if (typeof tempObj === 'string') {
                if (tempObj === item.key) return null
                continue
              }
              if (tempObj.name === item.key) {
                return tempObj.config[configType]
              }
            }
          }
        }
        return null
      },
      getTableButtonStyle(row, item) {
        let style = `

        `
        return style
      },
      testState(row, item, type) {
        const bodyConfig = row.bodyConfig
        for (let i = 0; i < bodyConfig.length; i++) {
          const temp = bodyConfig[i]
          if (temp.type === 'state') {
            const position = temp.position
            return position[item.key] === type
          }
        }
        return false
      },
      // 纯图片
      testImage(row, item) {
        const bodyConfig = row.bodyConfig
        for (let i = 0; i < bodyConfig.length; i++) {
          const temp = bodyConfig[i]
          if (temp.type === 'image') {
            const position = temp.position
            for (let j = 0; j < position.length; j++) {
              const tempObj = position[j]
              if (tempObj.key === item.key) {
                this.tableImg = true
                return true
              }
            }
          }
        }
        return false
      },
      // 按钮禁用
      getBtnDisabled(row, item) {
        let bodyConfig = row.bodyConfig
        for (let i = 0; i < bodyConfig.length; i++) {
          let temp = bodyConfig[i]
          if (temp.type === 'button') {
            let position = temp.position
            for (let j = 0; j < position.length; j++) {
              let tempObj = position[j]
              if (tempObj.key === item.key) {
                return tempObj.disabled
              }
            }
          }
        }
      },
      // 按钮单击
      btnClick(row, item) {
        let bodyConfig = row.bodyConfig
        for (let i = 0; i < bodyConfig.length; i++) {
          let temp = bodyConfig[i]
          if (temp.type === 'button') {
            let position = temp.position
            for (let j = 0; j < position.length; j++) {
              let tempObj = position[j]
              if (tempObj.key === item.key) {
                if (tempObj.click && typeof tempObj.click === 'function') {
                  tempObj.click(row, item.key)
                }
              }
            }
          }
        }
      },
      // 判断是否为按钮/状态...
      testBtn(row, item, type, regx = 'button') {
        let bodyConfig = row.bodyConfig
        for (let i = 0; i < bodyConfig.length; i++) {
          let temp = bodyConfig[i]
          if (temp.type === regx) {
            let position = temp.position
            for (let j = 0; j < position.length; j++) {
              let tempObj = position[j]
              if (tempObj.key === item.key && type === tempObj.type) return true
            }
          }
        }
        return false
      },
      // 初始化跨行跨列
      initColspanAndRowspan() {
        let body = this.tableData.body
        let head = this.tableData.head
        let _this = this
        // 平级化表头
        let tempHead = []
        for (let i = 0; i < head.length; i++) {
          let temp = head[i]
          if (temp.children) {
            // TODO...
            for (let j = 0; j < temp.children.length; j++) {
              let temp1 = temp.children[j]
              if (temp1.children) {
                // TODO...
                for (let x = 0; x < temp1.children.length; x++) {
                  let temp2 = temp1.children[x]
                  tempHead.add(temp2)
                }
              } else {
                tempHead.add(temp1)
              }
            }
          } else {
            tempHead.add(temp)
          }
        }
        // console.log(tempHead)
        for (let i = 0; i < body.length; i++) {
          let temp = body[i]
          let bodyConfig = temp.bodyConfig
          for (let j = 0; j < bodyConfig.length; j++) {
            let item = bodyConfig[j]
            if (item.type === 'attr') {
              _this.attr = true
              let position = item.position
              for (let key in position) {
                let val = position[key]
                if (key === 'checkbox') {
                  _this.$nextTick(() => {
                    let appBox = _this.$refs.appTableBox
                    window.$(appBox).find(`tbody`).each((index, item) => {
                      let td = window.$(item).find(`tr:eq(${i}) .el-table-column--selection`).get(0)
                      for (let tempKey in val) {
                        let tempVal = val[tempKey]
                        td.setAttribute(tempKey, tempVal)
                        let sum = parseInt(tempVal)
                        for (let x = 1; x < sum; x++) {
                          // TODO...
                          window.$(item).find(`tr:eq(${i + x}) .el-table-column--selection`).hide()
                        }
                      }
                    })
                    window.$(appBox).find('.el-table__fixed-header-wrapper thead tr:eq(0) th .el-checkbox__input').hide()
                  })
                }
                // let tempHead = []
                // for (let x = 0; x < head.length; x++) {
                //   let xy = head[x]
                //   if (xy.children && xy.children.length !== 0) {
                //     for (let y = 0; y < xy.children.length; y++) {
                //       let temp = xy.children[y]
                //       tempHead.add(temp)
                //     }
                //   } else {
                //     tempHead.add(xy)
                //   }
                // }
                for (let x = 0; x < tempHead.length; x++) {
                  let xy = tempHead[x]
                  console.log(xy.key, key)
                  if (key === xy.key) {
                    ((x) => {
                      _this.$nextTick(() => {
                        let appBox = _this.$refs.appTableBox
                        window.$(appBox).find('tbody').each((index, element) => {
                          let tr = window.$(element).find('tr').get(i)
                          let td = tr.querySelectorAll('td')[_this.tableData.config.select === true ? (x + 1) : x]
                          console.log('TEST: ', td)
                          for (let tempKey in val) {
                            let tempVal = val[tempKey]
                            td.setAttribute(tempKey, tempVal)
                          }
                        })
                        // let tr = window.$(appBox).find('tbody tr').get(i)
                        // let td = tr.querySelectorAll('td')[_this.tableData.config.select === true ? (x + 1) : x]
                        // for (let tempKey in val) {
                        //   let tempVal = val[tempKey]
                        //   td.setAttribute(tempKey, tempVal)
                        // }
                      })
                    })(x)
                  }
                }
              }
              _this.$nextTick(() => {
                window.$('.el-table--border td,.el-table--border th').css('border', '1px solid #dfe6ec')
              })
            }
          }
        }
        this.$nextTick(() => {
          let appBox = _this.$refs.appTableBox
          let tempIndex = 0
          window.$(appBox).find('tbody tr').each((i, e) => {
            let flag = true
            window.$(e).find('td').each((index, item) => {
              let rowspan = item.getAttribute('rowspan')
              if (rowspan !== null && rowspan !== undefined) {
                if (flag) {
                  tempIndex++
                  flag = false
                }
                if (((tempIndex) % 2) === 0) {
                  item.style.background = '#EEE'
                }
              }
            })
          })
          // border-bottom: 1px solid #dfe6ec;
          // window.$('.el-table--border td,.el-table--border th').css('border', '1px solid #dfe6ec')
        })
        this.initStyles()
      },
      // 初始化自定义样式
      initStyles() {
        let body = this.tableData.body
        let head = this.tableData.head
        let tempHead = []
        for (let i = 0; i < head.length; i++) {
          let temp = head[i]
          // console.log('----->', temp)
          if (temp.children) {
            // TODO...
            if (temp.hide !== true) {
              for (let j = 0; j < temp.children.length; j++) {
                let temp1 = temp.children[j]
                // console.log('----->', temp1.hide)
                if (temp1.children) {
                  // TODO...
                  if (temp1.hide !== true) {
                    for (let x = 0; x < temp1.children.length; x++) {
                      let temp2 = temp1.children[x]
                      if (temp2.hide !== true) tempHead.add(temp2)
                    }
                  }
                } else if (temp1.hide !== true) {
                  tempHead.add(temp1)
                }
              }
            }
          } else if (temp.hide !== true) {
            tempHead.add(temp)
          }
        }
        head = tempHead
        // console.log('==========>', tempHead)
        let _this = this
        for (let i = 0; i < body.length; i++) {
          let temp = body[i]
          let bodyConfig = temp.bodyConfig
          for (let j = 0; j < bodyConfig.length; j++) {
            let item = bodyConfig[j]
            if (item.type === 'style') {
              let position = item.position
              for (let key in position) {
                let val = position[key]
                for (let x = 0; x < head.length; x++) {
                  let xy = head[x]
                  if (key === xy.key) {
                    _this.$nextTick(() => {
                      let appBox = _this.$refs.appTableBox
                      // let tr = window.$(appBox).find('tbody tr').get(i)
                      // let td = tr.querySelectorAll('td')[_this.tableData.config.select === true ? (x + 1) : x]
                      window.$(appBox).find(`tbody`).each((index, element) => {
                        // console.log(element)
                        let td = window.$(element).find(`tr:eq(${i}) td:eq(${_this.tableData.config.select === true ? (x + 1) : x})`).get(0)
                        for (let tempKey in val) {
                          let tempVal = val[tempKey]
                          td = tempKey === 'text-align' ? td.children[0] : td
                          if (tempKey === 'color') {
                            td = td.children[0].children[0]
                            // td.className = ''
                            td.style['border-bottom'] = `1px solid ${tempVal}`
                          }
                          td.style[tempKey] = tempVal
                          // console.log(head, td, tempVal)
                        }
                      })
                    })
                  }
                }
              }
              for (let tempKey in item) {
                if (tempKey !== 'type' && tempKey !== 'position') {
                  _this.$nextTick(() => {
                    let appBox = _this.$refs.appTableBox
                    window.$(appBox).find('tbody').each((index, element) => {
                      let tr = window.$(element).find('tr').get(i)
                      let tds = tr.querySelectorAll('td')
                      for (let x = 0; x < tds.length; x++) {
  //                      tds[x].children[0].style[tempKey] = item[tempKey]
                        (tempKey === 'text-align' ? tds[x].children[0] : tds[x]).style[tempKey] = item[tempKey]
                      }
                      tr.style[tempKey] = item[tempKey]
                    })
//                     let tr = window.$(appBox).find('tbody tr').get(i)
//                     let tds = tr.querySelectorAll('td')
//                     for (let x = 0; x < tds.length; x++) {
// //                      tds[x].children[0].style[tempKey] = item[tempKey]
//                       (tempKey === 'text-align' ? tds[x].children[0] : tds[x]).style[tempKey] = item[tempKey]
//                     }
//                     tr.style[tempKey] = item[tempKey]
                  })
                }
              }
            }
          }
        }
        this.initColspanAndRowspanRemoveTd()
      },
      // 删除跨行跨列多余的行列
      initColspanAndRowspanRemoveTd() {
        let body = this.tableData.body
        let _this = this
        let tempArr = []
        for (let i = 0; i < body.length; i++) {
          let temp = body[i]
          let bodyConfig = temp.bodyConfig
          for (let j = 0; j < bodyConfig.length; j++) {
            let item = bodyConfig[j]
            if (item.type === 'attr') {
              let position = item.position
              for (let key in position) {
                let style = position[key]
                for (let tempKey in style) {
                  if (tempKey === 'colspan' || tempKey === 'rowspan') {
                    tempArr.add(key)
                  }
                }
              }
            } else if (item.type === 'seleckbox') {
              // TODO...
            }
          }
          // let tempHead = []
          // for (let x = 0; x < head.length; x++) {
          //   let xy = head[x]
          //   if (xy.children && xy.children.length !== 0) {
          //     for (let y = 0; y < xy.children.length; y++) {
          //       let temp = xy.children[y]
          //       tempHead.add(temp)
          //     }
          //   } else {
          //     tempHead.add(xy)
          //   }
          // }
          // for (ley y = 0; y < tempHead.length; y++) {
          //   let key = tempHead[y].key
          // }
          // remove td....
          let index = 0
          for (let key in temp) {
            console.log('remove:::: ', key)
            if (this.removeTdType === '1') {
              if (tempArr.indexOf(key) === -1 && temp[key] === null) {
                index++
                (function(index) {
                  _this.$nextTick(() => {
                    let appBox = _this.$refs.appTableBox
                    if (window.$(appBox).find(`tbody tr:eq(${i}) td:eq(${_this.tableData.config.select === true ? (index + 1) : index})`).attr('colspan') !== undefined) return
                    // window.$(appBox).find(`tbody`).each((index, element) => {
                    //   if (window.$(element).find(`tr:eq(${i}) td:eq(${_this.tableData.config.select === true ? (index + 1) : index})`).attr('colspan') !== undefined) return
                    // })
                    window.$(appBox).find(`tbody`).each((index, element) => {
                      window.$(element).find(`tr:eq(${i}) td:eq(${_this.tableData.config.select === true ? (index + 1) : index})`).hide()
                    })
                  })
                })(index)
              }
            } else {
              if (tempArr.indexOf(key) !== -1 && (temp[key] === null)) {
                (function(index) {
                  _this.$nextTick(() => {
                    let _index = _this.getIndex(key)
                    let appBox = _this.$refs.appTableBox
                    window.$(appBox).find(`tbody`).each((index, element) => {
                      window.$(element).find(`tr:eq(${i}) td:eq(${_this.tableData.config.select === true ? (_index + 1) : _index})`).hide()
                    })
                    // window.$(appBox).find(`tbody tr:eq(${i}) td:eq(${_this.tableData.config.select === true ? (_index + 1) : _index})`).hide()
                  })
                })(index)
                index++
              }
            }
          }
        }
      },
      getIndex(key) {
        let index = 0
        for (let i = 0; i < this.data.head.length; i++) {
          let item = this.data.head[i]
          if (item.children && item.children.length > 0) {
            for (let j = 0; j < item.children.length; j++) {
              let child = item.children[j]
              if (key === child.key) {
                return index
              } else {
                index++
              }
            }
          } else {
            if (key === item.key) {
              return index
            } else {
              index++
            }
          }
        }
        return index
      },

      // 获取tip提示框内容
      getTips(row, item) {
        let str = ''
        let bodyConfig = row.bodyConfig
        for (let i = 0; i < bodyConfig.length; i++) {
          let tempObj = bodyConfig[i]
          if (tempObj.type === 'tip') {
            let position = tempObj.position
            for (let j = 0; j < position.length; j++) {
              let temp = position[j]
              if (temp.name === item.key) {
                let tips = temp.tips
                str += `<p class='app-table-tips-title'>${temp.title}</p>`
                for (let x = 0; x < tips.length; x++) {
                  if (typeof tips[x] === 'object') {
                    str += `
                      <div style='width: 200px;float: left;box-sizing: border-box;padding-right: ${x === tips.length - 1 ? 0 : 2}px;'>
                        <p class='app-table-tips-title' style='text-align: left;'>${tips[x].title}</p>
                    `
                    for (let y = 0; y < tips[x].values.length; y++) {
                      str += `<p>${tips[x].values[y]}</p>`
                    }
                    str += '</div>'
                  } else {
                    str += `<p>${tips[x]}</p>`
                  }
                }
                return str
              }
            }
          }
        }
        return str
      },
      // 测试是否存在tip框
      testTip(row, item) {
        let bodyConfig = row.bodyConfig
        for (let i = 0; i < bodyConfig.length; i++) {
          let tempObj = bodyConfig[i]
          if (tempObj.type === 'tip') {
            let position = tempObj.position
            for (let j = 0; j < position.length; j++) {
              let temp = position[j]
              if (temp.name === item.key) return true
            }
          }
        }
        return false
      },
      // 获得时间控件选项
      getDateOptions(row, item) {
        let bodyConfig = row.bodyConfig
        for (let i = 0; i < bodyConfig.length; i++) {
          let temp = bodyConfig[i]
          if (temp.type === 'date') {
            let position = temp.position
            for (let j = 0; j < position.length; j++) {
              let tempObj = position[j]
              if (typeof tempObj === 'object') {
                if (tempObj.name === item.key) {
                  return tempObj.config
                }
              } else if (tempObj === item.key) {
                return null
              }
            }
          }
        }
      },
      // 初始化树结构
      initOpen(val) {
        let _this = this
        for (let i = 0; i < val.length; i++) {
          let temp = val[i]
          if (temp['table-parent-id'] !== null && temp['table-parent-id'] !== undefined) {
            _this.$nextTick(() => {
              let trs = _this.$refs.appTableBox.querySelectorAll('tbody .el-table__row')
              let tr = trs[i]
              // 隐藏子
              tr.style.display = 'none'
              let index = 0
              // 控制tr背景色
              _this.toArray(trs).forEach(e => {
                e.classList.remove('el-table__row--striped')
                if (e.style.display !== 'none') {
                  index++
                  if ((index & 1) === 0) {
                    e.classList.add('el-table__row--striped')
                  }
                }
              })
            })
          }
        }
        // 异步操作DOM,以避免数据更新DOM未渲染完毕的情况
        _this.$nextTick(() => {
          // 所有元素加上右箭头
          try {
            let trs = _this.$refs.appTableBox.querySelectorAll('tbody .el-table__row')
            for (let i = 0; i < trs.length; i++) {
              let td
              td = trs[i].children[_this.data.config.treeIndex].children[0]
              if (this.data.body[i]['table-id'] && (this.data.body[i]['table-parent-id'] === null || this.data.body[i]['table-parent-id'] === undefined)) {
                // textIndent = 1
              }
              if (this.data.body[i]['table-parent-id'] && (this.data.body[i]['table-id'] === null || this.data.body[i]['table-id'] === undefined)) {
                continue
              }
              if (this.data.body[i]['table-id'] === undefined && this.data.body[i]['table-parent-id'] === undefined) continue
              td.innerHTML = '<i class="iconfont icon-shixinjiantouyou">' + window.$(td).text() + '</i>'
              // td.style.textAlign = 'left'
              td.parentElement.style.textAlign = 'left'
            }
          } catch (e) {
            // textIndent = 1
          }
        })
      },
      // 切换树展隐状态
      toggleOpen(row, event, column) {
        // 先决否定,不存在树结构
        if (row['table-id'] === null || row['table-id'] === undefined) return
        let id = row['table-id']
        let body = this.data.body
        let trs = this.$refs.appTableBox.querySelectorAll('tbody .el-table__row')
        for (let i = 0; i < body.length; i++) {
          let temp = body[i]
          // 判断是否为子
          if (temp['table-parent-id'] === id) {
            let tr = trs[i]
            let td = tr.children[this.data.config.treeIndex].children[0]
            // 获取当前点击的行以及需要设置箭头的列
            let x = body.indexOf(row)
            // get tr => td => div.cell
            let _td = trs[x].children[this.data.config.treeIndex].children[0]
            if (tr.style.display === 'none') {
              tr.style.display = 'table-row'
              if (this.data.body[i]['table-id'] !== null && this.data.body[i]['table-id'] !== undefined) {
                td.innerHTML = '<i class="iconfont icon-shixinjiantouyou">' + td.children[0].innerHTML + '</i>'
              }
              _td.innerHTML = '<i class="iconfont icon-angle-b-copy">' + _td.children[0].innerHTML + '</i>'
              // 测试是否为最后一个子元素
              // this.testLastChildren(id, i)
            } else {
              tr.style.display = 'none'
              if (this.data.body[i]['table-id'] !== null && this.data.body[i]['table-id'] !== undefined) {
                td.innerHTML = '<i class="iconfont icon-shixinjiantouyou">' + td.children[0].innerHTML + '</i>'
              }
              _td.innerHTML = '<i class="iconfont icon-shixinjiantouyou">' + _td.children[0].innerHTML + '</i>'
              this.closeOpen(id, i)
            }
          }
        }
        // 记录当前行数
        let index = 0
        // 计算tr背景色
        this.toArray(trs).forEach(e => {
          e.classList.remove('el-table__row--striped')
          if (e.style.display !== 'none') {
            index++
            // 双数行
            if ((index & 1) === 0) {
              e.classList.add('el-table__row--striped')
            }
          }
        })
      },
      // 测试是否为最后一个子元素（暂废）
      testLastChildren(id, x) {
        let body = this.data.body
        let trs = this.$refs.appTableBox.querySelectorAll('tbody .el-table__row')
        for (let i = 0; i < body.length; i++) {
          let temp = body[i]
          if (temp['table-parent-id'] === id) {
            return
          }
        }
        let td = trs[x].children[this.data.config.treeIndex].children[0]
        td.innerHTML = td.children[0].innerHTML
      },
      // 关闭展开状态
      closeOpen(id, j = 0) {
        if (id === null || id === undefined) return
        let body = this.data.body
        let trs = this.$refs.appTableBox.querySelectorAll('tbody .el-table__row')
        for (let i = j; i < body.length; i++) {
          let temp = body[i]
          if (temp['table-parent-id'] === id) {
            let tr = trs[i]
            this.$nextTick(function() {
              tr.style.display = 'none'
            })
            // 递归隐藏所有
            this.closeOpen(temp['table-id'], i)
          }
        }
      },
      // 删除按钮点击事件
      removeClick(row, item) {
        if (item.disabled === true) return
        item.click(row, item, this.tableData)
      },
      // 测试删除按钮
      testRemoveBtn(item) {
        if (item.type === null || item.type === undefined) return false
        if (item.type === 'remove') return true
        return false
      },
      // 获取文件上传按钮数据
      getUploadData(row, item) {
        let bodyConfig = row.bodyConfig
        for (let i = 0; i < bodyConfig.length; i++) {
          let temp = bodyConfig[i]
          if (temp.type === 'upload') {
            let data = temp.position[item.key]
            data.that = row
            return data
          }
        }
        // return false
      },
      // 判断是否显示
      getShow(item) {
        for (let i = 0; i < this.data.head.length; i++) {
          let temp = this.data.head[i]
          if (temp.open === null || temp.open === undefined) continue
          for (let j = 0; j < temp.open.position.length; j++) {
            let temp1 = temp.open.position[j]
            if (temp1 === item.key) {
              return temp.open.value
            }
          }
        }
        return true
      },
      // 获取表头文字
      getThLabel(item) {
        if (item.open === null || item.open === undefined) return item.value
        return `${item.value}`
      },
      // 行高亮(暂弃用)
      tableRowClassName(row, index) {
        let bodyConfig = row.bodyConfig
        for (let i = 0; i < bodyConfig.length; i++) {
          let obj = bodyConfig[i]
          if (obj.type === 'selected') {
            if (obj.value === true) return 'positive-row'
          }
        }
        return ''
      },
      // 当前行是否存在多选框
      selectable(row, item) {
        if (row.selectable === null) return true
        if (row.selectable === undefined) return true
        if (typeof row.selectable !== 'function') return true
        return row.selectable(row, item)
      },
      // td click
      tdClick(row, item) {
        if (item.click && typeof item.click === 'function') {
          item.click(row, item.key, this.tableData)
        }
      },
      // 搜索按钮click
      searchClick(row, item) {
        let bodyConfig = row.bodyConfig
        for (let i = 0; i < bodyConfig.length; i++) {
          let temp = bodyConfig[i]
          if (temp.type && temp.type === 'input-search') {
            let position = temp.position
            for (let key in position) {
              position[key](row, item)
              return
            }
          }
        }
      },
      // 测试是否存在上传按钮
      testUploadBtn(row, item) {
        let bodyConfig = row.bodyConfig
        for (let i = 0; i < bodyConfig.length; i++) {
          let temp = bodyConfig[i]
          if (temp.type === 'upload') {
            if (temp.position[item.key] !== undefined) return true
          }
        }
        return false
      },
      // 判断td图标
      testImg(row, item) {
        try {
          for (let i = 0; i < row.bodyConfig.length; i++) {
            if (row.bodyConfig[i].type === 'img') {
              let position = row.bodyConfig[i].position
              if (position[item.key] && position[item.key].icon && typeof position[item.key] === 'object') {
                return true
              }
            }
          }
          return false
        } catch (e) {
          return false
        }
      },
      // 判断td图标类型
      testImgType(row, item, type) {
        try {
          for (let i = 0; i < row.bodyConfig.length; i++) {
            if (row.bodyConfig[i].type === 'img') {
              let position = row.bodyConfig[i].position
              return position[item.key].icon === type
            }
          }
          return false
        } catch (e) {
          return false
        }
      },
      // testing input search button
      testInputSearch(row, item) {
        let bodyConfig = row.bodyConfig
        for (let i = 0; i < bodyConfig.length; i++) {
          let temp = bodyConfig[i]
          if (temp.type && temp.type === 'input-search') {
            let position = temp.position
            for (let key in position) {
              if (key === item.key) return true
            }
          }
        }
        return false
      },
      // test
      testCollection(row, item) {
        if (row[item.key] === '') return 'none'
        let bodyConfig = row.bodyConfig
        for (let i = 0; i < bodyConfig.length; i++) {
          if (bodyConfig[i].type === 'collection') {
            let position = bodyConfig[i].position
            for (let key in position) {
              if (key === item.key) {
                return position[key].checked + ''
              }
            }
          }
        }
        return 'none'
      },
      // 收藏图标
      collectionClick(row, item) {
        let bodyConfig = row.bodyConfig
        for (let i = 0; i < bodyConfig.length; i++) {
          if (bodyConfig[i].type === 'collection') {
            let position = bodyConfig[i].position
            for (let key in position) {
              if (key === item.key) {
                // 执行click事件
                position[key].click(row[item.key], row)
              }
            }
          }
        }
      },
      // 重新渲染
      update() {
        this.showSwipe = false
        this.$nextTick(function() {
          this.showSwipe = true
          this.$nextTick(function() {
            this.initColspanAndRowspan()
          })
        })
      },
      // 单选按钮触发
      handleCurrentChange(val) {
        if (this.data.config.radio && this.data.config.radio !== true) return
        if (this.data.config.radio === null || this.data.config.radio === undefined) return
        if (val === null || val === undefined || val.bodyConfig === null || val.bodyConfig === undefined || (val.bodyConfig && val.bodyConfig.length !== 0 && val.bodyConfig[0].type === 'none')) return
        console.debug('handle current change')
        if (this.data.config.radio === true && this.data.config.select === true) {
          this.data.radio = val
          return
        }
        this.data.select.splice(this.dataSum(), 1, val)
        this.data.select = this.data.select.unique()
        if (this.data.config.radio === true) this.data.select = [val]
        this.$emit('currentChange', val)
      },
      // 起始时间
      minTime(row, item) {
        let bodyConfig = row.bodyConfig
        for (let i = 0; i < bodyConfig.length; i++) {
          if (bodyConfig[i].type === 'time') {
            let position = bodyConfig[i].position
            for (let j = 0; j < position.length; j++) {
              let temp = position[j]
              if (temp.start === item.key) {
                // row[temp.end] = row[item.key]
                return
              }
            }
          }
        }
      },
      // 下拉框
      selectInput(row, item) {
        // const _this = this
        let value = row[item.key]
        let bodyConfig = row.bodyConfig
        for (let i = 0; i < bodyConfig.length; i++) {
          if (bodyConfig[i].type === 'select') {
            let position = bodyConfig[i].position
            for (let key in position) {
              if (key === item.key) {
                let tempObj = position[key]
                for (let j = 0; j < tempObj.length; j++) {
                  if (tempObj[j].value === value) {
                    // _this.$nextTick(() => {
                    //   row[item.key] = tempObj[j].label
                    //   row['_' + item.key] = tempObj[j].value
                    // })
                    row[item.key] = tempObj[j].label
                    row['_' + item.key] = tempObj[j].value
                  }
                }
              }
            }
          }
        }
      },
      // 时间改变
      timeChange(value) {
        console.debug('datetime change , news vlaue is : ' + value)
      },
      // 是否为时间控件
      testTime(row, item, type) {
        try {
          for (let i = 0; i < row.bodyConfig.length; i++) {
            if (row.bodyConfig[i].type === 'time') {
              let position = row.bodyConfig[i].position
              for (let j = 0; j < position.length; j++) {
                if (position[j][type] === item.key) return true
              }
            }
          }
          return false
        } catch (e) {
          return false
        }
      },
      // 下拉框改变事件
      selectEventChange(row, item) {
        this.selectInput(row, item)
        let _this = this
        let bodyConfig = row.bodyConfig
        for (let i = 0; i < bodyConfig.length; i++) {
          let temp = bodyConfig[i]
          if (temp.type && temp.type === 'change') {
            let position = temp.position
            for (let key in position) {
              if (key === item.key) {
                let _obj = {
                  label: row[item.key],
                  value: row['_' + item.key]
                }
                _this.$nextTick(() => {
                  // 处理清空
                  if (row[key] === '') row['_' + key] = ''
                  position[key](_obj, row)
                })
              }
            }
          } else {
            let position = temp.position
            for (let key in position) {
              if (key === item.key) {
                if (row[key] === '') row['_' + key] = ''
              }
            }
          }
        }
      },
      dataSum() {
        return this.data.body.length
      },
      // 判断类型
      testType(row, item, type) {
        try {
          if (row.bodyConfig[0].type === 'none') return false
          for (let i = 0; i < row.bodyConfig.length; i++) {
            if (row.bodyConfig[i].type === type) {
              let position = row.bodyConfig[i].position
              for (let j = 0; j < position.length; j++) {
                if (typeof position[j] === 'object') {
                  if (position[j].name === item.key) return true
                } else if (position[j] === item.key) {
                  return true
                }
              }
            }
          }
          return false
        } catch (e) {
          return false
        }
      },
      // test input
      testInput(row, item) {
        try {
          if (row.bodyConfig[0].type === 'none') return false
          for (let i = 0; i < row.bodyConfig.length; i++) {
            if (row.bodyConfig[i].type === 'input') {
              let position = row.bodyConfig[i].position
              for (let j = 0; j < position.length; j++) {
                if (typeof position[j] === 'object') {
                  if (position[j].key === item.key) {
                    return true
                  }
                } else if (position[j] === item.key) {
                  return true
                }
              }
            }
          }
          return false
        } catch (e) {
          return false
        }
      },
      testSelect(row, item) {
        let _this = this
        try {
          if (row.bodyConfig[0].type === 'none') return false
        } catch (e) {
          return false
        }
        for (let i = 0; i < row.bodyConfig.length; i++) {
          if (row.bodyConfig[i].type === 'select') {
            let position = row.bodyConfig[i].position
            for (let key in position) {
              if (key === item.key) {
                let value = row[item.key]
                let label
                for (let key in position) {
                  if (key === item.key) {
                    let tempObj = position[key]
                    if (tempObj.length === 1) {
                      // _this.$nextTick(() => {
                      //   row[item.key] = tempObj[0].value
                      //   row["_" + item.key] = tempObj[0].value
                      // })
                      row[item.key] = tempObj[0].label
                      row["_" + item.key] = tempObj[0].value
                    } else {
                      for (let j = 0; j < tempObj.length; j++) {
                        if (tempObj[j].label === value) {
                          label = tempObj[j].label
                          row[item.key] = label
                          row['_' + item.key] = tempObj[j].value
                        }
                      }
                    }
                  }
                }
                // ========================>
                row['set' + item.key.substring(0, 1).toUpperCase() + item.key.substring(1)] = function(val) {
                  row[item.key] = val
                  row['_' + item.key] = val
                  _this.showSwipe = false
                  _this.$nextTick(function() {
                    _this.showSwipe = true
                  })
                }
                return true
              }
            }
          }
        }
        return false
      },
      // 判断日期控件
      testDate(row, item) {
        return this.testType(row, item, 'date')
      },
      // 数据改变
      changeValue(row, item, flag) {
        // 不可获取实时数据,异步之...
        setTimeout(() => {
          let value = row[item.key]
          if (typeof value === 'object') {
            let str = 'yyyy-MM-dd'
            if (flag === 'month') str = 'yyyy-MM'
            if (flag === 'year') str = 'yyyy'
            if (flag === 'date') str = 'yyyy-MM-dd'
            value = row[item.key] = new Date(value).format(str)
          }
          let bodyConfig = row.bodyConfig
          for (let i = 0; i < bodyConfig.length; i++) {
            let temp = bodyConfig[i]
            if (temp.type && temp.type === 'change') {
              let position = temp.position
              for (let key in position) {
                if (key === item.key) {
                  position[key](value, row, flag)
                  this.textTdFlag = false
                  this.$nextTick(function() {
                    this.textTdFlag = true
                  })
                }
              }
            }
          }
        }, 1)
      },
      // 分页触发
      currentChange() {
        this.$nextTick(function() {
          if (this.noLimitQuery) {
            this.noLimitQuery = false
            return
          }
          console.debug('app-table currentPage change...')
          let config = this.data.config.http
          config.data.currPage = this.currentPage
          this.data.config.http.currentPage = this.currentPage
          // this.data.config.http.data.pageSize = this.pageSize
          this.data.config.http.data.pageSize = this.data.config.pageSize
          console.debug('>>> app-table request http => ' + config.url)
          this.http.post(config.url, config.data, this.$refs.appTableBox).then(data => {
            console.debug('<<< app-table response success')
            config.callback(data)
          })
        })
      },
      // 每个td宽度
      getTdWidth(item) {
        if (item.width === 0 || item.width === null || item.width === undefined) {
          if (this.data.config.cover && this.data.config.cover === true) {
            return ''
          }
          return "150"
        }
        return item.width
      },
      // 多选框改变
      selectChange(val) {
        console.debug('app-table select change...')
        this.data.select = []
        for (let i = 0; i < val.length; i++) {
          try {
            if (val[i].bodyConfig[0].type === 'none') {
              continue
            }
          } catch (e) {}
          // TODO ...
          this.data.select.add(val[i])
        }
      },
      // 判断图标选中
      testImgTypeActive(row, item, type) {
        try {
          if (row.bodyConfig[0].type === 'none') return false
          for (let i = 0; i < row.bodyConfig.length; i++) {
            if (row.bodyConfig[i].type === 'img') {
              let position = row.bodyConfig[i].position
              if (position[item.key].icon === type) {
                return position[item.key].active
              }
            }
          }
          return false
        } catch (e) {
          return false
        }
      },
      // 初始化合计图标
      initTotalImg() {
        // TODO...
        let _this = this
        let body = this.data.body
        for (let i = 0; i < body.length; i++) {
          let bodyConfig = body[i].bodyConfig
          if (!bodyConfig) return
          for (let j = 0; j < bodyConfig.length; j++) {
            let temp = bodyConfig[j]
            if (temp.type === 'total') {
              this.$nextTick(function() {
                let span = window.$(_this.$refs.appTableBox).find(`.el-table__body-wrapper tbody tr:eq(${i}) td:eq(${_this.tableData.config.select === true ? 1 : 0}) .cell span`)
                let div = window.$(_this.$refs.appTableBox).find(`.el-table__body-wrapper tbody tr:eq(${i}) td:eq(${_this.tableData.config.select === true ? 1 : 0}) .cell`)
                div.html(`<img src='${_this.totalImg}' height='10' style='margin-right: 5px;'/><span>${span.html()}</span>`)
              })
            }
          }
        }
      },
      // 判断操作系统
      detectOS() {
        var sUserAgent = navigator.userAgent
        var isWin = (navigator.platform === "Win32") || (navigator.platform === "Windows")
        var isMac = (navigator.platform === "Mac68K") || (navigator.platform === "MacPPC") || (navigator.platform === "Macintosh") || (navigator.platform === "MacIntel")
        if (isMac) return "Mac"
        var isUnix = (navigator.platform === "X11") && !isWin && !isMac
        if (isUnix) return "Unix"
        var isLinux = (String(navigator.platform).indexOf("Linux") > -1)
        if (isLinux) return "Linux"
        if (isWin) {
          var isWin2K = sUserAgent.indexOf("Windows NT 5.0") > -1 || sUserAgent.indexOf("Windows 2000") > -1
          if (isWin2K) return "Win2000"
          var isWinXP = sUserAgent.indexOf("Windows NT 5.1") > -1 || sUserAgent.indexOf("Windows XP") > -1
          if (isWinXP) return "WinXP"
          var isWin2003 = sUserAgent.indexOf("Windows NT 5.2") > -1 || sUserAgent.indexOf("Windows 2003") > -1
          if (isWin2003) return "Win2003"
          var isWinVista = sUserAgent.indexOf("Windows NT 6.0") > -1 || sUserAgent.indexOf("Windows Vista") > -1
          if (isWinVista) return "WinVista"
          var isWin7 = sUserAgent.indexOf("Windows NT 6.1") > -1 || sUserAgent.indexOf("Windows 7") > -1
          if (isWin7) return "Win7"
        }
        return "None"
      },
      // 初始化每页记录数和表格高度
      initPageSize() {
        this.$nextTick(function() {
          try {
            const table = this.$refs.appTableBox
            if (table === undefined) return
            // 可视区域高度
            let maxHeight = window.innerHeight
            if (this.detectOS() !== 'Mac' && this.tableData.config.cover !== true) {
              maxHeight -= 30
            }
            // 表格xy轴偏移
            let $offset = window.$(table).offset()
            if ($offset === undefined) return
            // 表格距离浏览器顶部距离
            const top = $offset.top
            // 表格未被初始化, return
            if (top === 0) return
            // 表头高度
            const headHeight = window.$(table).find('.el-table__header-wrapper').height() || window.$(table).find('.el-table__fixed-header-wrapper').height()
            let limitHeight = window.$(table).siblings('.el-pagination').height() || 0
            if (limitHeight !== 0) limitHeight += 44
            let maxBodyHeight = maxHeight - top - limitHeight - headHeight
            let col = Math.floor(maxBodyHeight / 30)
            // 奇数行
            if ((col % 2) !== 0 && !this.sum) {
              col -= 1
            } else {
              // 偶数行,TODO...
            }
            if (col <= 6) {
              col = 6
            }
            // MAC滚动条无高度
            if (this.detectOS() !== 'Mac') {
              this.data.config.pageSize = col - 1
              try {
                this.data.config.http.data.pageSize = col - 1
              } catch (e) {}
            } else {
              this.data.config.pageSize = col
              try {
                this.data.config.http.data.pageSize = col
              } catch (e) {}
            }
            let offHeight = this.$refs.appTableBox.querySelector('thead').offsetHeight
            let height = (this.data.config.pageSize) * 30 + offHeight + 3
            height += this.configHeight
            if (this.sum) {
              height += 30
            }
            this.getHeight = height + 30
            if (this.detectOS() === 'Mac' || this.tableData.config.cover === true) this.getHeight -= 30
            if (this.tableData.config.totalNumber) {
              this.data.config.pageSize = this.data.config.http.data.pageSize = this.data.config.http.data.pageSize - parseInt(this.tableData.config.totalNumber)
            }
          } catch (e) {}
        })
      }
    },
    props: {
      data: {
        default: null
      },
      padding: {
        default: true
      },
      auto: {
        default: true
      },
      sum: {
        default: false
      },
      configHeight: {
        default: 0
      },
      configRowSum: {
        default: 0
      },
      removeTdType: {
        default: 0
      }
    },
    mounted() {
      let _this = this
      if (this.auto) this.initPageSize()
      this.data.initPageSize = this.initPageSize
      // window.$(window).resize(function() {
      //   if (_this.auto) _this.initPageSize()
      // })
      _this.$nextTick(() => {
        if (this.data.config.selectAll === false) {
          window.$(_this.$refs.appTableBox).find('.el-table__fixed-header-wrapper table thead tr:eq(0) th:eq(0) .cell,.el-table__header-wrapper thead tr:eq(0) th:eq(0) .cell').remove()
        }
        this.initTotalImg()
      })
      console.debug('app-table created success...')
      // 清除选中
      this.data.clearSelection = function() {
        _this.$refs.appTable.clearSelection()
      }
      this.data.add = function(...obj) {
        for (let i = 0; i < obj.length; i++) {
          _this.data.body.splice(_this.dataSum(), 1, obj[i])
          _this.$refs.appTable.toggleRowSelection(obj[i])
        }
      }
      this.data.addAll = function(list) {
        list.forEach(e => {
          _this.data.body.splice(_this.dataSum(), 1, e)
          _this.$refs.appTable.toggleRowSelection(e)
        })
      }
      // 选中元素
      this.data.selected = function(...obj) {
        for (let i = 0; i < obj.length; i++) {
          _this.$refs.appTable.toggleRowSelection(obj[i], true)
        }
      }
      this.data.selectedAll = function(obj) {
        for (let i = 0; i < obj.length; i++) {
          _this.$refs.appTable.toggleRowSelection(obj[i], true)
        }
      }
      // 取消选中
      this.data.unSelected = function(...items) {
        for (let i = 0; i < items.length; i++) {
          _this.$refs.appTable.toggleRowSelection(items[i], false)
        }
      }
      this.data.unSelectedAll = function() {
        for (let i = 0; i < _this.tableData.body.length; i++) {
          _this.$refs.appTable.toggleRowSelection(_this.tableData.body[i], false)
        }
      }
      this.data.insert = function(index, obj) {
        _this.data.body.splice(index, 0, obj)
      }
      // 高亮行
      // one : 行数, two : 高亮/取消高亮
      this.data.brightRow = function(index, flag = true) {
        _this.$nextTick(function() {
          let trs = _this.$refs.appTableBox.querySelectorAll('tbody .el-table__row')
          let tr = trs[index]
          if (tr === null || tr === undefined) return
          if (flag) tr.classList.add('info-row')
          else tr.classList.remove('info-row')
        })
      }
      // 当前页改变事件,此事件默认会自动触发一次查询,可由参数二确定是否不触发查询
      this.data.setCurrentPage = function(currentPage, flag = false) {
        if (flag) {
          // 是否触发查询
          _this.noLimitQuery = true
          _this.currentPage = currentPage
          return
        }
        if (_this.currentPage === currentPage) {
          _this.data.reload()
          return
        }
        _this.currentPage = currentPage
      }

      // 强制刷新表格数据
      this.data.reload = function() {
        console.debug('U app-table run reload method')
        let config = _this.data.config.http
        config.data.pageSize = _this.data.config.pageSize
        _this.http.post(config.url, config.data, _this.$refs.appTableBox).then(data => {
          config.callback(data)
        })
      }
      // 删除
      this.data.remove = function(...list) {
        console.debug('D app-table run remove method')
        if (list.length === 0) list = _this.data.select
        for (let i = 0; i < list.length; i++) {
          _this.data.body.remove(list[i])
        }
        if (list === undefined) {
          _this.data.select = []
        }
      }
      // 删除传入数组中所有元素
      this.data.removeAll = function(list) {
        // console.debug('D app-table run removeAll method')
        (list || _this.data.select).forEach(e => {
          _this.data.body.remove(e)
        })
        if (list === undefined) {
          _this.data.select = []
        }
      }
      // 重新渲染
      this.data.reloadView = function() {
        _this.update()
      }
      this.data.reloadViewPlus = function() {
        // TODO...
        _this.textTdFlag = false
        _this.$nextTick(function() {
          _this.textTdFlag = true
        })
      }
      this.data.setBackgroundColor = function(index, color = '#C2EBFA') {
        _this.$nextTick(() => {
          window.$(_this.$refs.appTable.$el).find(`tbody tr:eq(${index}) td,.el-table__fixed-body-wrapper tbody tr:eq(${index}) td`).css('background', color)
          window.$(_this.$refs.appTable.$el).find(`tbody tr:eq(${index}) td,.el-table__fixed-body-wrapper tbody tr:eq(${index})`).css('background', color)
        })
      }
      console.debug('app-table data method extend success')
      function testOpen() {
        _this.$nextTick(() => {
          console.debug('start testing open btn ...')
          _this.initOpen(_this.data.body)
          // 添加展开图标
          for (let i = 0; i < _this.data.head.length; i++) {
            let item = _this.data.head[i]
            if (item.open === null || item.open === undefined) continue
            let position = item.open.position
            // 记录隐藏的元素个数
            let sum = 0
            for (let j = 0; j < position.length; j++) {
              let temp = position[j]
              let index = _this.data.head.indexOf(temp)
              if (index < i && item.open.value === false) sum++
            }
            // 获取存在图标的th
            let box = _this.$refs.appTableBox.querySelectorAll('thead tr th')[i - sum].querySelector('.cell')
            let html = box.innerHTML
            // 创建展开图标
            let i = '<i class="iconfont icon-you app-ft12" style="color: #089F48;cursor: pointer;"></i>'
            box.innerHTML = i + html
            // 图标点击事件
            box.querySelector('i').onclick = function() {
              item.open.value = !item.open.value
              // 重新渲染
              _this.update()
              // 异步创建展开图标
              _this.$nextTick(() => {
                testOpen()
              })
            }
          }
        })
      }
      testOpen()
      // 计算表格高度
      _this.$nextTick(() => {
        if (this.auto) {
          this.initPageSize()
        } else {
          if (_this.data.config.height && _this.data.config.height !== 0) _this.getHeight = _this.data.config.height
          let offHeight = _this.$refs.appTableBox.querySelector('thead').offsetHeight
          let height = (_this.data.config.pageSize) * 30 + offHeight + 1
          _this.getHeight = height
        }
      })
      // 初始化跨行跨列
      _this.initColspanAndRowspan()
    }
  }
</script>
<style lang='less'>
  .el-table--striped .el-table__body tr.el-table__row--striped td{
    background: #eee;
  }
  .el-table__header-wrapper,.el-table__body-wrapper{
    table{
      // width: 100%!important;
    }
  }
  .el-table .info-row {
    background: #c9e5f5;
  }
  .el-table .positive-row {
    background: #e2f0e4;
  }
  .el-table--enable-row-hover .el-table__body .current-row:hover>td {
    background-color: #FFFAB2;
  }
  .el-table__body tr.current-row>td ,.el-table--striped .el-table__body tr.el-table__row--striped.current-row td {
    background: #FFFAB2;
  }
  .el-table{
    th,tr{
      text-align: center;
    }
    .app-table-button{
      display: block;
      margin: 0 auto;
      background: #74777A;
      border-radius: 3px;
      color: #FFF;
      min-width: 68px;
      text-align: center;
      box-sizing: border-box;
    }
    .app-table-status{
      display: block;
      margin: 0 auto;
      background: rgba(0, 0, 0, 0);
      border: 1px solid #74777A;
      border-radius: 3px;
      color: #74777A;
      min-width: 68px;
      text-align: center;
      box-sizing: border-box;
    }
    .app-table-status-main{
      border: 1px solid #55C281;
      color: #55C281;
    }
    .app-table-status-info{
      border: 1px solid rgb(242, 149, 28);
      color: rgb(242, 149, 28);
    }
    .app-table-status-warn{
      border: 1px solid #F45164;
      color: #F45164;
    }
    .app-table-status-default{
      border: 1px solid #74777A;
      color: #74777A;
    }

    .app-table-button-main{
      background: #55C281;
    }
    .app-table-button-warn{
      background: #F45164;
    }
    .app-table-button-default{
      background: #74777A;
    }
    .app-table-button-text{
      background: rgba(0,0,0,0);
      color: #55C281;
    }
    .el-table__body-wrapper{
      background: url(img/trBg.jpg);
      background-repeat: round;
    }
    .info-row{
      td{
        background: #c9e5f5!important;
      }
    }
    .el-input__inner {
      background-color: #FFF!important;
      font-size: 12px;
      color: #1f2d3d!important;
    }
    .el-checkbox__inner {
      width: 14px;
      height: 14px;
    }
    .el-checkbox__inner::after {
      left: 3px;
      top: 0;
    }
    .el-table th, .el-table th div {
      font-weight: 400;
    }
    th,th div{
      background: #373D41;
      font-size:12px;
      color:#ffffff;
      font-weight: 400;
    }
    th,td{
      height: auto;
      font-size:12px;
      input{
        text-align:center;
      }
    }
    // th{
    //   cursor: pointer;
    // }
    td{
      height: 30px;
      line-height: 30px;
      background: #F9F9F9;
      text-align: center;
      .app-table-input{
        input{
          height: 24px;
          line-height: 24px;
        }
      }
    }

    td .cell{
      overflow: hidden;
      text-overflow:ellipsis;
      white-space: nowrap;
      i{
        font-size: 12px;
      }
      .el-upload{
        .app-button{
          margin-top: 3px;
        }
      }
    }
  }
  .app-table-span-link{
    // font-family: MicrosoftYaHei;
    font-size: 12px;
    color: #089F48;
    letter-spacing: 0;
    border-bottom: 1px solid #089F48;
  }
  // 需要·时开启（表头）
  .el-table th>.cell {
    line-height: 16px!important;
    margin: 12px 0;
  }
  .el-pager li.active{
    background: #089F48;
  }
  .el-table--border td{
    border:none;
    // box-sizing: border-box;
  }
  .app-table-confirm-state{
    border: 1px solid #354661;
    border-radius: 3px;
    padding: 2px 10px;
    color: #354661;
  }
  .app-table-confirm-state-false{
    border: 1px solid #F6A623;
    color: #F6A623;
  }
  .el-popover{
    word-break:break-all;
    word-wrap:break-word;
    p{
      padding-left: 1em;
      padding-right: 1em;
      background: #FFF;
      max-width: 600px;
      white-space:normal;
    }
    p:nth-child(2n-1){
      background: #eee;
    }
    p.app-table-tips-title{
      text-align: center;
      background: #373D41;
      font-size: 12px;
      color: #ffffff;
      text-indent: 0;
    }
  }
</style>
