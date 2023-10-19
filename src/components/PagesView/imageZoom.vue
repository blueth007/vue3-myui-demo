<template>
    <div class="image-zoom-container">
        <img src="https://img1.baidu.com/it/u=3484532140,3563003760&fm=253&fmt=auto&app=120&f=JPEG?w=1280&h=800" />
        <div id="zoom" ref="zoom"></div>
    </div>
</template>

<script setup lang="ts">
import { ref, onMounted } from "vue";
const zoom = ref<HTMLElement>()

const Ix = ref(0)
const Iy = ref(0)
const ratio = ref(1)
const timeout = ref()
onMounted(() => {
    nextTick(() => {
        const img = document.querySelector("img") as HTMLImageElement
        img.addEventListener('load', imgLoad);
        img.addEventListener('mousemove', onMousemove);
        img.addEventListener('mouseleave', onMouseleave);
        window.onresize = function () {
            imgLoad()
            timeout.value = null
        }
    })

})

function imgLoad() {
    const img = document.querySelector("img") as HTMLImageElement
    ratio.value = img.naturalWidth / img.width;
    (zoom.value as HTMLElement).style.backgroundImage = 'url(' + img.src + ')';
    Ix.value = img.offsetLeft;
    Iy.value = img.offsetTop;
}

function activate() {
    document.querySelector(".image-zoom-container")?.classList.add('active');
}

function deactivate() {
    document.querySelector(".image-zoom-container")?.classList.remove('active');
}

function updateMagnifier(x: number, y: number) {
    var zoom_ele = (zoom.value as HTMLElement)
    if (!zoom_ele) return;
    var Zw = zoom_ele.offsetWidth;

    var Zh = zoom_ele.offsetHeight;

    zoom_ele.style.top = (y) + 'px';
    zoom_ele.style.left = (x) + 'px';
    //
    console.log("p:", x, y, Ix.value, Iy.value, ratio.value);
    zoom_ele.style.backgroundPosition = ((Ix.value - x) * ratio.value + Zw / 2) + 'px ' + ((Iy.value - y) * ratio.value + Zh / 2) + 'px';
}
function onMousemove(e: MouseEvent) {
    clearTimeout(timeout.value);
    activate();

    updateMagnifier(e.offsetX, e.offsetY);
    timeout.value = setTimeout(deactivate, 2500);
}

function onMouseleave() {
    deactivate();
}

</script>

<style scoped lang="scss">
.image-zoom-container {
    width: 100%;
    position: relative;
    height: calc(100% - 60px);
    overflow: hidden;
    background: #222;

    &.active img {
        -webkit-filter: grayscale(1);
    }

    img {
        display: block;
        margin: 20px auto;

        border: 1px solid rgba(255, 255, 255, 0.2);
        -webkit-transition: -webkit-filter 500ms;
    }

    #zoom {
        position: absolute;
        top: 50%;
        left: 50%;
        width: 250px;
        height: 250px;
        margin: -125px 0 0 -125px;
        background-repeat: no-repeat;
        box-shadow: 0 0 0 2px rgba(255, 0, 0, 0.5),
            5px 5px 10px 5px rgba(0, 0, 0, 0.2);
        border-radius: 50%;
        opacity: 0;
        -webkit-transform: scale(0);
        -webkit-transition: opacity 500ms, -webkit-transform 500ms;
        pointer-events: none;
    }

    &.active #zoom {
        opacity: 1;
        -webkit-transform: scale(1);
    }
}
</style>