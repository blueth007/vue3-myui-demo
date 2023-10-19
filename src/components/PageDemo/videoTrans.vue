<template>
    <div class="video-trans-main">
        <div class="main" :class="{ 'active': isActive }" :style="{ 'background-color': dataArr[isIndex].bgColor }">
            <div class="header">
                <div class="logo">Travel</div>
                <div class="header-menu" @click="changeMenu">
                    <Icon icon="mdi:menu" v-if="!isActive"></Icon>
                    <Icon icon="mdi:close" v-else></Icon>
                </div>
            </div>
            <div class="content">
                <video :class="{ 'active': index == isIndex }" :src="'/src/assets/videos' + vd.video" autoplay muted loop
                    v-for="(vd, index) in dataArr" :key="vd.name"></video>
                <div class="content-desc">
                    <h1>{{ dataArr[isIndex].desc.h1 }}</h1>
                    <h2>{{ dataArr[isIndex].desc.h2 }}</h2>
                    <p>{{ dataArr[isIndex].desc.p }}</p>
                    <a class="link_btn"> Explore</a>
                </div>
                <div class="mask-over-delay"></div>
            </div>
            <div class="footer">
                <a>
                    <Icon icon="mdi:facebook"></Icon>
                </a>
                <a>
                    <Icon icon="mdi:instagram"></Icon>
                </a>
                <a>
                    <Icon icon="mdi:twitter"></Icon>
                </a>
            </div>
        </div>
        <div class="right-menu" v-show="isActive">
            <div class="right-menu-item" v-for="(item, index) in dataArr" :key="item.name" @click="isIndex = index">
                {{ item.name }}
            </div>

        </div>

    </div>
</template>

<script setup lang="ts">
import { ref, reactive, onActivated } from "vue";

const isActive = ref(false);
const isIndex = ref(0)
//视频地址是本地，否则远程回有onload事件
const dataArr = reactive([{
    name: "island",
    video: "/island.mp4",
    bgColor: "#9bc5fe",
    desc: {
        h1: "Island Never Stop",
        h2: "Explore the island",
        p: "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Maecenas in elit nec elit congue"
    }
}, {
    name: "spring",
    video: "/spring.mp4",
    bgColor: "#89b167",
    desc: {
        h1: "Spring is coming",
        h2: "Explore the spring",
        p: "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Maecenas in elit nec elit congue"
    }
}, {
    name: "summer",
    video: "/summer.mp4",
    bgColor: "##dede69",
    desc: {
        h1: "Summer is coming",
        h2: "Explore the summer",
        p: "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Maecenas in elit nec elit congue"
    }
}])

const changeMenu = () => {
    isActive.value = !isActive.value
}
onActivated(() => {

    document.querySelectorAll("video").forEach((item: any) => {
        item.play()
    })
})
</script>

<style scoped lang="scss">
.video-trans-main {

    --main-right-menu: 240px;
    --main-left-menu: 80px;
    --main-bottom-menu: 30px;
    --main-top-menu: 30px;

    height: calc(100vh - var(--TopHeaderHeight));
    position: relative;
    user-select: none;

    .main {
        height: 100%;
        width: 100%;
        max-width: 1440px;
        display: flex;
        flex-direction: column;
        justify-content: space-between;
        font-size: 32px;
        font-weight: bold;

        transition: all 0.5s;
        color: #fff;
        top: 0;
        left: 0;
        right: 0;
        bottom: 0;
        transform: perspective(5500px) translateX(0) translateY(0) translateZ(0) rotateX(0deg) rotateY(0deg) rotateZ(0deg);

        .logo {
            padding: 8px 12px;
            cursor: pointer;
        }

        .header {
            display: flex;
            justify-content: space-between;

            padding: 0 12px;

            .header-menu {
                display: flex;
                align-items: center;
                cursor: pointer;
            }
        }

        .content {
            flex: 1;
            margin: 0;
            padding: 0;
            overflow: hidden;

            .content-desc {
                position: absolute;
                top: 30%;
                left: 20px;

                h1,
                h2 {
                    margin: 0;
                    color: #fff;
                }

                p {
                    max-width: 60%;
                    margin-top: 24px;
                    font-size: 16px;
                }

                .link_btn {
                    display: inline-block;
                    text-decoration: none;
                    color: #fff;
                    font-size: 24px;

                    padding: 2px 16px;
                    text-transform: uppercase;
                    border: 1px solid #fff;
                    border-radius: 16px;
                    letter-spacing: 2px;
                    transition: all 0.5s;

                    &:hover {
                        letter-spacing: 4px;
                        box-shadow: 0 0 8px rgba(0, 0, 0, 0.3);
                        background-color: rgba(174, 177, 174, 0.3);
                    }
                }
            }
        }

        .footer {
            height: 50px;
            padding: 0;
            display: flex;
            align-items: center;
            padding-left: 30px;
            gap: 30px;
            background: transparent;

        }
    }

    video {
        position: absolute;
        z-index: -1;
        object-fit: cover;
        top: 0;
        height: 100%;
        clip-path: ellipse(0% 0% at 0 50%);
        transition: all 0.5s;

    }

    video.active {
        clip-path: ellipse(150% 70% at 0 50%);
    }

    .main.active {
        font-size: 24px;
        position: absolute;
        width: calc(100% - var(--main-right-menu) - var(--main-left-menu));
        top: var(--main-top-menu);
        right: var(--main-right-menu);
        left: var(--main-left-menu);
        bottom: var(--main-bottom-menu);
        border-radius: 1em;
        height: calc(100% - var(--main-top-menu) - var(--main-bottom-menu));
        overflow: hidden;
        transform: perspective(5500px) translateX(0) translateY(0) translateZ(0) rotateX(0deg) rotateY(30deg) rotateZ(0deg);

        .footer {
            gap: 20px;
        }
    }

    .right-menu {
        position: absolute;
        height: 100%;
        display: flex;
        width: var(--main-right-menu);
        flex-direction: column;
        align-items: center;
        justify-content: center;
        gap: 45px;
        text-align: center;
        right: 0;
        top: 0;
        transition: all 0.3s;

        .right-menu-item {
            text-transform: uppercase;
            font-weight: bolder;
            padding: 6px 36px;
            border: 1px solid skyblue;
            border-radius: 1em;
            color: skyblue;
            cursor: pointer;
            transition: all 0.5s;
            min-width: calc(var(--main-right-menu) *2/ 3);

            &:hover {
                transform: scale(1.05);

                box-shadow: 0 0 8px rgba(0, 0, 0, 0.3);
            }
        }
    }


}
</style>