class app {
    constructor(context, pattern) {
        this.x = -92
        this.pattern = pattern
        this.context = context
    }
    draw() {
        if (this.x < 0) {
            this.x += 2
        }else if (this.x > 0) {
            this.x = 0
        }
        this.context.drawImage(this.pattern, this.x, 126, 92, 274)
    }
}
export default app
