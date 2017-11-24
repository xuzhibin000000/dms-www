<template>
  <el-upload
    ref="upload"
    :action="url"
    :auto-upload="true"
    :show-file-list='false'
    :on-success='uploadSuccess'
    :on-error='uploadError'
    :data='data.data'
    :accept='data.accept'
    :before-upload='showLoading'
    v-if='flag'>
    <!-- <el-button slot="trigger" size="small" type="primary">选取文件</el-button> -->
    <app-button slot='trigger' :value='getText' :icon='data.icon'/>
    <div slot="tip" class="el-upload__tip" icon='data.icon'></div>
    <!-- {{fileList}} -->
  </el-upload>
</template>

<script>
  import { baseUrl } from '@/config/env'
  import { Loading } from 'element-ui'
  import {
    mapGetters
  } from 'vuex'
  export default {
    data() {
      let _this = this
      return {
        // fileList: [],
        url: baseUrl + _this.data.url,
        loading: null,
        flag: false
      }
    },
    props: {
      data: {
        default: {}
      },
      rms: {
        default: null
      }
    },
    watch: {
      rms(val) {
        this.testRMS()
      }
    },
    computed: {
      ...mapGetters([
        'RMSLIST'
      ]),
      getText() {
        if (this.data.text !== null && this.data.text !== undefined) {
          return this.data.text
        }
        return '上传文件'
      }
    },
    created() {
      this.testRMS()
    },
    methods: {
      testRMS() {
        if (this.rms === null) {
          this.flag = true
          return
        }
        if (Array.isArray(this.rms)) {
          for (let i = 0; i < this.rms.length; i++) {
            let str = this.rms[i]
            if (this.RMSLIST.indexOf(str) !== -1) {
              this.flag = true
              return
            }
          }
          this.flag = false
          return
        }
        if (this.RMSLIST.indexOf(this.rms) !== -1) {
          this.flag = true
        } else {
          this.flag = false
        }
      },
      uploadSuccess(data) {
        this.loading.close()
        if (typeof data !== 'object') {
          try {
            JSON.parse(data)
          } catch (e) {
            let xml = this.parseXML(data)
            let obj = this.toJson(xml)
            for (let key in obj) {
              // console.log(key)
              data = obj[key]
            }
          }
        }
        console.debug('file upload success')
        if (this.data.that !== null && this.data.that !== undefined) {
          this.data.success.call(this.data.that, data)
          return
        }
        this.data.success(data)
      },
      showLoading() {
        this.loading = Loading.service({
          fullscreen: true,
          target: this.data.target
        })
      },
      // 解析xml字符串变量为XMLDOMDocument2
      parseXML(data) {
        var xml
        let tmp
        if (window.DOMParser) {
          // Standard
          tmp = new DOMParser()
          xml = tmp.parseFromString(data, "text/xml")
        } else {
          // IE
          xml = new window.ActiveXObject("Microsoft.XMLDOM")
          xml.async = "false"
          xml.loadXML(data)
        }
        tmp = xml.documentElement
        if (!tmp || !tmp.nodeName || tmp.nodeName === "parsererror") {
          return null
        }
        return xml
      },
      // 将 IXMLDOMDocument2 转换为JSON，参数为IXMLDOMDocument2对象
      toJson(obj) {
        if (this == null) return null
        var retObj = {}
        /* jQuery */
        buildObjectNode(retObj, obj)
        return retObj
        /* Element */
        function buildObjectNode(cycleOBJ, elNode) {
          /* NamedNodeMap */
          var nodeAttr = elNode.attributes
          if (nodeAttr != null) {
            if (nodeAttr.length && cycleOBJ == null) cycleOBJ = {}
            for (var i = 0; i < nodeAttr.length; i++) {
              cycleOBJ[nodeAttr[i].name] = nodeAttr[i].value
            }
          }
          var nodeText = "text"
          if (elNode.text == null) nodeText = "textContent"
          /* NodeList */
          var nodeChilds = elNode.childNodes
          if (nodeChilds != null) {
            if (nodeChilds.length && cycleOBJ == null) cycleOBJ = {}
            for (let i = 0; i < nodeChilds.length; i++) {
              if (nodeChilds[i].tagName != null) {
                if (nodeChilds[i].childNodes[0] != null && nodeChilds[i].childNodes.length <= 1 && (nodeChilds[i].childNodes[0].nodeType === 3 || nodeChilds[i].childNodes[0].nodeType === 4)) {
                  if (cycleOBJ[nodeChilds[i].tagName] == null) {
                    cycleOBJ[nodeChilds[i].tagName] = nodeChilds[i][nodeText]
                  } else {
                    if (typeof (cycleOBJ[nodeChilds[i].tagName]) === "object" && cycleOBJ[nodeChilds[i].tagName].length) {
                      cycleOBJ[nodeChilds[i].tagName][cycleOBJ[nodeChilds[i].tagName].length] = nodeChilds[i][nodeText]
                    } else {
                      cycleOBJ[nodeChilds[i].tagName] = [cycleOBJ[nodeChilds[i].tagName]]
                      cycleOBJ[nodeChilds[i].tagName][1] = nodeChilds[i][nodeText]
                    }
                  }
                } else {
                  if (nodeChilds[i].childNodes.length) {
                    if (cycleOBJ[nodeChilds[i].tagName] == null) {
                      cycleOBJ[nodeChilds[i].tagName] = {}
                      buildObjectNode(cycleOBJ[nodeChilds[i].tagName], nodeChilds[i])
                    } else {
                      if (cycleOBJ[nodeChilds[i].tagName].length) {
                        cycleOBJ[nodeChilds[i].tagName][cycleOBJ[nodeChilds[i].tagName].length] = {}
                        buildObjectNode(cycleOBJ[nodeChilds[i].tagName][cycleOBJ[nodeChilds[i].tagName].length - 1], nodeChilds[i])
                      } else {
                        cycleOBJ[nodeChilds[i].tagName] = [cycleOBJ[nodeChilds[i].tagName]]
                        cycleOBJ[nodeChilds[i].tagName][1] = {}
                        buildObjectNode(cycleOBJ[nodeChilds[i].tagName][1], nodeChilds[i])
                      }
                    }
                  } else {
                    cycleOBJ[nodeChilds[i].tagName] = nodeChilds[i][nodeText]
                  }
                }
              }
            }
          }
        }
      },
      uploadError(data) {
        this.loading.close()
        this.notify('错误提示', '文件上传失败,请联系管理员', 'error')
        this.data.error(data)
        console.debug('file upload error')
      },
      submitUpload() {
        console.debug('on click submit btn')
        // 提交
        this.$refs.upload.submit()
      }
    }
  }
</script>

<style lang='less' scope>
  
</style>
