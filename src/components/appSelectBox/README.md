## API DOC

```
	// 输入框
	<app-select-box name='name' type='input' :hover='true'/>
	// 搜索🔍框
	<app-select-box name='name' type='search'/>
	// 下拉框
	<app-select-box name='name' type='input' :data='options'/>
	// 日期选择器
	<app-select-box name='name' type='date'/>
	// 日期选择器(选择月)
	<app-select-box name='name' type='month'/>
	// 日期选择器(选择年)
	<app-select-box name='name' type='year' />
	// 下拉框
	<app-select-box name='name' type='select' :hover='true' :data='options' :autoSelected='false'/>
	// 下拉框(多选)
	<app-select-box name='name' type='select' :multiple='true' :data='options'/>
	// 显示纯文本
	<app-select-box name='name' type='text' value='helloworld'/>
```