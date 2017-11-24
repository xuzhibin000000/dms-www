## DOC

```
	// HTML 
	<app-config-inserts-button value='插入' @enter='testEnter' rms='B01_03_03' text='单'/>
	// JS
	export  default {
		methods: {
			// 传入val为输入的数字,组件内部会做一遍处理,如果内部无法处理则会抛出一个错误消息
			// 当用户按下回车时,会自动触发此函数
			testEnter(val) {
	        	console.log(val)
	      	}
		}
	}
```