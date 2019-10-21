class app {
    constructor(context, pattern) {
        this.context = context
        this.x = -1500
        this.x2 = -3750
        this.width = 2250
        this.height = 400
        this.speed = 15
        this.pattern = pattern
        this.drawStart()
    }
    drawStart() {
        this.context.drawImage(this.pattern, this.x, 0, this.width , this.height)
        this.context.drawImage(this.pattern, this.x2, 0, this.width , this.height)
    }
    drawMove(stop) {
        if (!stop) {
            this.x += this.speed
            this.x2 += this.speed
        }
        if (this.x >= 750) {
            this.x = -3750
        }
        if (this.x2 >= 750) {
            this.x2 = -3750
        }
        this.drawStart()
    }
}

export default app