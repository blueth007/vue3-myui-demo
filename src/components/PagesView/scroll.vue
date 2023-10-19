<template>
    <div class="wrap">
        <div class="none">
            <div v-for="i in 1000" :key="i">{{ i + '' + i }}</div>
        </div>
        <div class="effect">
            <div v-for="i in 1000" :key="i">{{ i + '' + i }}</div>
        </div>
        <div class="top"> <span>普通滚动 🚫</span> <span style="color: red;">惯性滚动 🍺</span> </div>
    </div>
</template>

<script setup lang="ts">
const lerp = (start: number, end: number, amt: number) => (1 - amt) * start + amt * end; // 对两个值进行线性插值 (0 <= amt <= 1)
const damp = (x: number, y: number, lambda: number, dt: number) => lerp(x, y, 1 - Math.exp(-lambda * dt)) // 阻尼效果
const clamp = (min: number, input: number, max: number) => Math.max(min, Math.min(input, max)) // 获取一个中间值

let targetScroll = 0;
let animatedScroll = 0;
let timeRecord = 0

class Silky {

    lerp: number;
    duration: number;
    easing: (t: number) => number;
    content: any = null;
    value: number = 0;
    currentTime: any;
    from: number = 0;
    onUpdate: Function | null = null;
    to: number = 0
    constructor({ content, lerp, duration = 1, easing = (t) => 1 - Math.pow(1 - t, 2) }: { content: any, lerp: number, duration?: number, easing?: (t: number) => number, }) {
        this.lerp = isNaN(lerp) ? 0.1 : lerp
        this.duration = duration || 1;
        this.easing = easing;
        this.content = content || document.documentElement
        const onWeel = (e: any) => {
            e.preventDefault();
            this.onVirtualScroll(targetScroll + e.deltaY);
        }
        this.content.addEventListener('wheel', onWeel, { passive: false });
    }
    advance(deltaTime: number) {
        if (this.lerp) {
            // this.value = lerp(this.value, this.to, this.lerp);
            this.value = damp(this.value, this.to, this.lerp * 60, deltaTime)
        } else {
            this.currentTime += deltaTime
            const linearProgress = clamp(0, this.currentTime / this.duration, 1)
            const easedProgress = this.easing ? this.easing(linearProgress) : 1
            this.value = this.from + (this.to - this.from) * easedProgress
        }
        this.onUpdate?.(this.value);
    }


    onVirtualScroll(target: number) {
        this.from = this.value = animatedScroll;
        this.to = target;
        this.currentTime = 0;
        this.onUpdate = (value: number) => {
            animatedScroll = value;
            (this.content as HTMLElement).scrollTop = animatedScroll;
            targetScroll = value;
        }
    }

    raf(time: number) {
        const deltaTime = time - (timeRecord || time);
        timeRecord = time;
        this.advance(deltaTime * 0.001);
    }
}

onMounted(() => {
    const silky = new Silky({
        content: document.getElementsByClassName('effect')[0],
        lerp: 0.1
    })
    // 执行动画
    function raf(time: number) {
        silky.raf(time);
        requestAnimationFrame(raf);
    }
    requestAnimationFrame(raf);
})
</script>
<style scoped lang="scss">
.wrap {
    overflow: hidden;
}

.top {
    width: 100%;
    display: flex;

    span {
        width: 50%;
        text-align: center;
    }

}

.effect,
.none {
    height: calc(100vh - 80px);
    width: 50%;
    overflow-y: auto;
}

.effect {
    position: absolute;
    width: 50%;
    /* color: red; */
    left: 50%;
}

.none {
    position: absolute;
    width: 50%;
    color: rgba(0, 0, 0, .7);

}
</style>