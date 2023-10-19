<template>
    <div @resize='_pexresize' class="rain-container">
        <canvas id='canvas' width='1280' height='720' ref="canvasRef"></canvas>

    </div>
</template>

<script setup lang="ts">

const canvasRef = ref<HTMLCanvasElement>()
const ctx = ref<CanvasRenderingContext2D>()
const data = reactive({
    count: 100,
    stgw: 1280,
    stgh: 720,
    stact: false,
    stt: 0,
    lcount: 6,
    loffset: 0,
    toffset: 0,
    layery: [] as any[],
    layer: [] as any[],
    str: Date.now() + Math.random() * 4000
})

onMounted(() => {
    init()
    _pexresize()
    nextTick(() => {

        animate()
    })
})


function init() {
    ctx.value = canvasRef.value?.getContext('2d') || undefined
    if (!ctx.value) {
        return
    }
    ctx.value.fillStyle = "rgba(255,255,255,0.5)";
    for (var l = 0; l < data.lcount; l++) {
        ctx.value.clearRect(0, 0, data.stgw, data.stgh);
        for (var i = 0; i < data.count * (data.lcount - l) / 1.5; i++) {
            var myx = Math.floor(Math.random() * data.stgw);
            var myy = Math.floor(Math.random() * data.stgh);
            var myh = l * 6 + 8;
            var myw = myh / 10;
            ctx.value.beginPath();
            ctx.value.moveTo(myx, myy);
            ctx.value.lineTo(myx + myw, myy + myh);
            ctx.value.arc(myx, myy + myh, myw, 0, 1 * Math.PI);
            ctx.value.lineTo(myx - myw, myy + myh);
            ctx.value.closePath();
            ctx.value.fill();
        }
        data.layer[l] = new Image();
        data.layer[l].src = canvasRef.value?.toDataURL("image/png");
        data.layery[l] = 0;
    }
}
const _pexresize = () => {
    var cw = document.querySelector(".rain-container")?.clientWidth || 0
    var ch = document.querySelector(".rain-container")?.clientHeight || 0;
    if (!canvasRef.value) {
        return
    }
    if (cw <= ch * data.stgw / data.stgh) {
        data.loffset = 0;
        data.toffset = Math.floor(ch - (cw * data.stgh / data.stgw)) / 2;
        canvasRef.value.style.width = cw + "px";
        canvasRef.value.style.height = Math.floor(cw * data.stgh / data.stgw) + "px";
    } else {
        data.loffset = Math.floor(cw - (ch * data.stgw / data.stgh)) / 2;
        data.toffset = 0;
        canvasRef.value.style.height = ch + "px";
        canvasRef.value.style.width = Math.floor(ch * data.stgw / data.stgh) + "px";
    }
    canvasRef.value.style.marginLeft = data.loffset + "px";
    canvasRef.value.style.marginTop = data.toffset + "px";
}

const animate = () => {
    ctx.value?.clearRect(0, 0, data.stgw, data.stgh);

    for (let l = 0; l < data.lcount; l++) {
        data.layery[l] += (l + 1.5) * 5;
        if (data.layery[l] > data.stgh) {
            data.layery[l] = data.layery[l] - data.stgh;
        }
        ctx.value?.drawImage(data.layer[l], 0, data.layery[l]);
        ctx.value?.drawImage(data.layer[l], 0, data.layery[l] - data.stgh);
    }
    if (Date.now() > data.str) {
        data.stact = true;
    }
    if (data.stact) {
        data.stt++;
        if (data.stt < 5 + Math.random() * 10) {
            var ex = data.stt / 30;
        } else {
            var ex = (data.stt - 10) / 30;
        }
        if (data.stt > 20) {
            data.stt = 0;
            data.stact = false;
            data.str = Date.now() + Math.random() * 8000 + 2000;
        }

        ctx.value && (ctx.value.fillStyle = "rgba(255,255,255," + ex + ")");
        ctx.value?.fillRect(0, 0, data.stgw, data.stgh);
    }
    window.requestAnimationFrame(animate);
}

</script>

<style scoped lang="scss">
.rain-container {
    margin: 0;
    background: #000;
    width: 100%;
    height: calc(100vh - var(--TopHeaderHeight));
}

canvas {
    background: url('https://i.postimg.cc/6q3KG8Hw/maxresdefault.jpg');
    background-size: cover;
    background-repeat: no-repeat;
    background-position: center center;
}
</style>