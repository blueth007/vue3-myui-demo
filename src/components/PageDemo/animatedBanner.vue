<template>
    <div class="banner-main">
        <div class="animated-banner" @mousemove="handleMove" @mouseover="handleOver" @mouseleave="handleLeave">
            <div class="layer" v-for="(item, index) in  banners " :key="index" ref="layers">
                <video :src="item.url" :style="{ ...item.style }" v-if="item.type === 'video'" loop playsinline
                    :height="parseInt(item.style.height + '')" :width="parseInt(item.style.width + '')" autoplay
                    muted></video>
                <img :src="item.url" :style="{ ...item.style }" v-else :data-lazy="Math.floor(Math.random() * 20 + 10)" />
            </div>
        </div>
        <div class="banner-title">
            <h1> BiliBili的视差滚动效果 animated banner <a href="/">返回首页</a> </h1>
        </div>
    </div>
</template>

<script setup lang="ts">

import { ref, onActivated } from "vue";

const layers = ref()
const banners = <Array<{ url: string, type?: string, style: { [key: string]: string | number } }>>([
    {
        url: "/src/assets/bilinavbar/1.png",
        style: {
            height: "196.7px",
            width: "2100px",
            transform: "translate(0px, 0px) rotate(0deg) scale(1)",
            opacity: 1
        }
    }, {
        url: "/src/assets/bilinavbar/2.png",
        style: {
            height: "106.8px",
            width: "201px",
            transform: "translate(78px, 6px) rotate(0deg) scale(1)",
            opacity: 1,
        }
    }, {
        url: "/src/assets/bilinavbar/3.webm",
        type: "video",
        style: {
            "object-fit": "cover",
            height: "99.6px",
            width: "1800px",
            transform: "translate(36px, 42px) rotate(0deg) scale(1)",
            opacity: 1,
        }
    }, {
        url: "/src/assets/bilinavbar/4.png",
        style: {
            height: "23px",
            width: "62.25px",
            transform: " translate(-15px, 32.5px) rotate(0deg) scale(1)",
            filter: "blur(0.5px)",
            opacity: 0.7
        }
    }, {
        url: "/src/assets/bilinavbar/5.png",
        style: {
            height: "159.2px",
            width: " 755.2px",
            transform: "translate(800px, -32px) rotate(0deg) scale(1)",
            opacity: 1
        }
    }, {
        url: "/src/assets/bilinavbar/6.png",
        style: {
            height: "170px",
            width: "1141px",
            transform: "translate(850px, -10px) rotate(0deg) scale(1)",
            opacity: 1
        }
    }, {
        url: "/src/assets/bilinavbar/7.png",
        style: {
            height: "46px",
            width: "124.5px",
            transform: "translate(225px, 30px) rotate(0deg) scale(1)",
            opacity: 1
        }
    }, {
        url: "/src/assets/bilinavbar/8.png",
        style: {
            height: "162.4px",
            width: " 660.1px",
            transform: "translate(-560px, 0px) rotate(0deg) scale(1)",
            opacity: 1
        }
    }, {
        url: "/src/assets/bilinavbar/9.png",
        style: {
            height: "55.2px",
            width: "149.4px",
            transform: "translate(-660px, 24px) rotate(0deg) scale(1)",
            opacity: 1
        }
    }, {
        url: "/src/assets/bilinavbar/10.webm",
        type: "video",
        style: {
            "object-fit": "cover",
            height: "133.8px",
            width: "1255.8px",
            transform: "translate(0px, 0px) rotate(0deg) scale(1)",
            opacity: 0.6
        }
    }, {
        url: "/src/assets/bilinavbar/11.png",
        style: {
            height: "156.1px",
            width: "1465.1px",
            transform: "translate(0px, 0px) rotate(0deg) scale(1)",
            opacity: 1
        }
    }, {
        url: "/src/assets/bilinavbar/12.png",
        style: {
            height: "87.45px",
            width: "225.5px",
            transform: "translate(-110px, 27.5px) rotate(0deg) scale(1)",
            opacity: 1
        }
    }, {
        url: "/src/assets/bilinavbar/13.png",
        style: {
            height: "102.5px",
            width: "192.5px",
            transform: "translate(350px, 35px) rotate(0deg) scale(1)",
            opacity: 0
        }
    }, {
        url: "/src/assets/bilinavbar/14.png",
        style: {
            height: "168.6px",
            width: "436.2px",
            transform: "translate(-420px, 0px) rotate(0deg) scale(1)",
            opacity: 0
        }
    }, {
        url: "/src/assets/bilinavbar/15.png",
        style: {
            height: "108.9px",
            width: "326.15px",
            transform: "translate(-385px, 22px) rotate(0deg) scale(1)",
            opacity: 1
        }
    }, {
        url: "/src/assets/bilinavbar/16.png",
        style: {
            height: " 224.8px",
            width: "581.6px",
            transform: "translate(800px, 0px) rotate(0deg) scale(1)",
            opacity: 1
        }
    },
    {
        url: "/src/assets/bilinavbar/17.png",
        style: {
            height: "140.7px",
            width: " 445.9px",
            transform: "translate(-140px, 0px) rotate(0deg) scale(1)",
            opacity: 1
        }
    }, {
        url: "/src/assets/bilinavbar/18.png",
        style: {
            height: "140.7px",
            width: "445.9px",
            transform: "translate(560px, 0px) rotate(0deg) scale(1)",
            opacity: 1
        }
    }
])
const initX = ref(0); // 初始值

const handleOver = (e: any) => {
    initX.value = e.pageX
}
const handleMove = (e: any) => {
    let moveX = e.pageX - initX.value;
    layers.value.forEach((item: any,) => {
        if (item.querySelector("img")) {
            const r = item.querySelector("img").getAttribute("data-lazy") || 20;
            item.style = `transform:translate(${moveX / r}px, 0)`;// 根据鼠标移动距离来移动
        }
    })
}

const handleLeave = () => {
    layers.value.forEach((item: any) => {
        item.style.transform = `translate(0, 0)`
    })
}
onActivated(() => {

    document.querySelectorAll("video").forEach((item: any) => {
        item.play()
    })
})
</script>

<style scoped lang="scss">
.banner-main {
    position: relative;
    z-index: 0;
    display: flex;
    -ms-flex-pack: center;
    justify-content: center;
    margin: 0 auto;
    min-width: 1000px;
    min-height: 155px;
    height: 9.375vw;
    max-height: 240px;
    background-color: #e3e5e7;
    background-position: center 0;
    background-size: cover;
    background-repeat: no-repeat;
}

.animated-banner {
    position: absolute;
    top: 0;
    bottom: 0;
    left: 0;
    right: 0;
    overflow: hidden;

    .layer {
        position: absolute;
        left: 0;
        top: 0;
        height: 100%;
        width: 100%;
        display: flex;
        align-items: center;
        justify-content: center;

        img,
        video {
            max-width: initial;
            transition: all 0.3s;
        }
    }
}

.banner-title {
    position: absolute;
    color: #fff;
    z-index: 0;
    font-size: 24px;
}
</style>