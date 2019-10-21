import {speed1, speed2, speed3, speed4} from '../config/speed'

class app {
    constructor(context, pattern, unitIndex, unitStartX) {
        this.context = context
        this.number = unitIndex
        this.x = unitStartX
        this.status = 1 //刚启动加速1，正常加速2，快要到终点 3
        // 皮肤
        this.pattern = pattern
        // 速度
        this.speed = 0
        this.drawStart()
    }
    drawStart() {
        this.context.drawImage(
            this.pattern,
            207, // 剪切的x
            0,   // 剪切的y
            148, // 剪切的宽
            40,  // 剪切的高
            this.x, // 放置x
            (128 + 25.5 * this.number), //放置y
            148, //要使用图像的宽
            40  //要使用图像的高
        )
    }
    drwaMove() {
        if (this.x <= -200) {
            return
        }
        // 获取加速
        this.x += this.getSpeed()
        // 绘制
        this.context.drawImage(
            this.pattern,
            0, // 剪切的x
            0,   // 剪切的y
            207, // 剪切的宽
            40,  // 剪切的高
            this.x, // 放置x
            128 + 25.5 * this.number, //放置y
            207, //要使用图像的宽
            40  //要使用图像的高
        )
        // 判断距离赋值状态
        this.judgeSpeed()
    }
    // 判断速度状态
    judgeSpeed() {
        if (this.x < 300 && this.status === 1) {
            this.setStatus(2)
        } 
        // 加速
        else if (this.x < 100 && this.status === 2) {
            this.setStatus(3)
        }
        // 启动加速
        else if (this.x > 650) {
            this.setStatus(4)
        }
        else if(this.status === 4 && this.x < 450) {
            this.setStatus(2)
        }
    }
    // 获取速度
    getSpeed() {
        if (this.status === 1) {
            return speed1[Math.floor(Math.random() * speed1.length)]
        }
        else if(this.status === 2) {
            return speed2[Math.floor(Math.random() * speed2.length)]
        }
        else if (this.status === 3){
            return speed3[Math.floor(Math.random() * speed3.length)]
        }
        else if (this.status === 4) {
            return speed4[Math.floor(Math.random() * speed4.length)]
        }
        else if (this.status === 5) {
            return -12
        }
    }
    // 设置状态
    setStatus(num) {
        this.status = num
    }
}

export default app