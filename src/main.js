import './css/style.less'
import playerCanvas from './js/plaeryCanvas'

// 准备路由 #/card/wite
// 开跑路由 #/card/start
// 结果路由 #/card/result/1,2,4,5,6,8,7,9,10
new playerCanvas('#playerGame', window.location.hash.split('/')[1])
