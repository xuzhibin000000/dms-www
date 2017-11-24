## DOC

```
	// HTML ...
	<app-upload :data='fileUploadData' rms='H03_03'/>

	// JS ...
	export default {
		data() {
			return {
				fileUploadData: {
					// 请求URL
					url: 'url',
					// 上传成功回调
					success(data) {
						// TODO ...
					},
					accept: 'image',
					// 上传失败回调
					error(data) {
						// TODO ...
					},
					// 请求参数
					data: {

					},
					// Loading显示区域
					target: 'regx',
					// 按钮图标
					icon: '',
					text: '导入文件'
				}
			}
		}
	}

```
