# dms-www

> A Vue.js project

## Build Setup

``` bash
# install dependencies
npm install

# serve with hot reload at localhost:8080
npm run dev


# build for production with minification
npm run build

# build for production and view the bundle analyzer report
npm run build --report

# run unit tests
npm run unit

# run e2e tests
npm run e2e

# run all tests
npm test
```

For detailed explanation on how things work, checkout the [guide](http://vuejs-templates.github.io/webpack/) and [docs for vue-loader](http://vuejs.github.io/vue-loader).



## 命名规范

### 文件命名

- 所有文件夹都是小写
- js文件使用小写驼峰式, 参考java方法
- Vue文件使用首字母大写, 参考java类

### Vue 组件命名

- **有意义的**: 不过于具体，也不过于抽象

- **简短**: 2 到 3 个单词

- **具有可读性**: 以便于沟通交流

- **通用模板:** modul-sub-type

```
  # modul
  common, setting, order ...

  # sub
  ...

  #type
  radio, checkbox, input, select, switch, slider, timepicker, datepicker, form ...
  ```
​

### vue 方法放置顺序

1. components
2. props
3. data
4. created
5. mounted
6. activited
7. update
8. beforeRouteUpdate
9. metods
10. filter
11. computed
12. watch



### method 自定义方法命名

1. 动宾短语（good：jumpPage、openCarInfoDialog）（bad：go、nextPage、show、open、login）
2. ajax 方法以 get(查询), add(提交) , edit(修改), delect(删除)开头，以 数据类型 结尾（good：getCustomerList, editShenZhengObject）（bad：takeData、confirmData、getList、postForm）
3. 事件方法以 on 开头（onTypeChange、onUsernameInput）
4. init、refresh 单词除外
5. 尽量使用常用单词开头（set、get、open、close、jump）
6. 驼峰命名（good: getListData）（bad: get_list_data、getlistData）







