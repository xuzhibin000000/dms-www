import appUpload from './App-upload'
import appUploadDrag from './App-upload-drag'

export default {
  install(Vue) {
    Vue.component('app-upload', appUpload)
    Vue.component('app-upload-drag', appUploadDrag)
  }
}

