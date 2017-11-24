/**
 * 配置编译环境和线上环境之间的切换
 *
 * baseUrl: 域名地址
 * routerMode: 路由模式
 * baseImgPath: 图片存放地址
 *
 */
let baseUrl = ''
let routerMode = 'history'
let baseImgPath = 'http://images.cangdu.org/'

if (process.env.NODE_ENV === 'development') {
  // baseUrl = '/dms-web/d/'
  // baseUrl = 'http://localhost:9999/dms-web/d/'
  // baseUrl = 'http://10.208.61.4:8084/dmp-sup/'
} else {
  // baseUrl = '/dms-web/d/'
  // baseUrl = 'http://10.208.61.4:8084/dmp-sup/'
}
baseUrl = '/dms-web/d/'
// baseUrl = 'http://10.208.61.123:9999/dms-web/d/'
// http://10.208.60.181/
// baseUrl = 'http://10.208.60.181:9999/dms-web/d/'
export {
  baseUrl,
  routerMode,
  baseImgPath
}
