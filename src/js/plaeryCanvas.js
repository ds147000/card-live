import Background from './background'
import ResultImg from './resultImg'
import card from './card'
import {cardUrl} from '../config/url'

class app {
    constructor(query, type) {
        // 保存类型
        this.type = type
        this.Element = document.querySelector(query)
        // 设置大小
        this.Element.width = 750
        this.Element.height = 400
        // 创建画布环境
        this.context = this.Element.getContext('2d')
        // 背景资源
        this.background = null
        // 终点线资源
        this.resultImg = null
        // 车子起始点
        this.unitStartX = 590
        // 单位资源
        this.unit = []
        this.init()
    }
    init() {
        this.loadSkie()
        .then(() => {
            this.run()
        })
    }
    // 加载资源
    loadSkie() {
        return new Promise((res, rej) => {
            let _this = this
            // 创建图片
            let backImgae = new Image()
            let resultImg = new Image()
            let unit
            let unitIndex = 0
            // 根据类型加载背景
            switch (this.type) {
                case 'card':
                    backImgae.src = cardUrl.backgroundUrl
                    unit = cardUrl.card
                    break
                case 'ferry':

                    break
                case 'fly':

                    break
            }
            // 背景
            backImgae.onload = () => {
                // 创建复用资源
                this.background = new Background(this.context, backImgae)
                saveCar()
            }
            // 终点线
            resultImg.onload = () => {
                this.resultImg = new ResultImg(this.context, resultImg)
            }
            resultImg.src = './static/img/finisher.png'
            // 缓存车子资源
            function saveCar() {
                let img = new Image()
                img.onload = () => {
                    // 绘制
                    _this.unit.push( new card(_this.context, img, unitIndex, _this.unitStartX) )
                    if (unitIndex < unit.length - 1) {
                        unitIndex += 1
                        saveCar()
                    } else {
                        res()
                    }
                }
                img.src = unit[unitIndex]
            }
        })
        
    }
    run() {
        window.requestAnimationFrame(() => {
            let hash = window.location.hash.split('/')
            // 起跑
            if (hash[2] === 'start') {
                this.context.clearRect(0, 0, this.Element.width, this.Element.height)
                this.background.drawMove()
                this.unit.forEach(el => {
                    el.drwaMove()
                })
            }
            // 等待
            else if (hash[2] === 'wite') {
                return this.run()
            }
            // 结束
            else if(hash[2] === 'result')  {
                this.context.clearRect(0, 0, this.Element.width, this.Element.height)
                // 背景继续移动
                if (this.resultImg.x < 0) {
                    this.background.drawMove()
                }
                // 停止背景
                else {
                    this.background.drawMove(true)
                }
                this.resultImg.draw()
                // 根据结果排列
                hash[3] = hash[3].split(',')
                if (this.unit[parseInt(hash[3][0]) -1].x > -200) {
                    this.unit[parseInt(hash[3][0]) -1].setStatus(5)
                } else {
                    hash[3].forEach(el => {
                        this.unit[parseInt(el) -1].setStatus(5)
                    })
                }
                // 移动车子
                this.unit.forEach(el => {
                    el.drwaMove()
                })
            }
            this.run()
        })
    }
}

export default app