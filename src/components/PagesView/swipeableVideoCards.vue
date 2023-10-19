<template>
    <div class="swipeable-video-container">
        <TransitionGroup tag='div' name="fade-in" class="elements">
            <div v-for="card, index in cards" :key="card.countryTitle" v-show="index == activeIndex"
                @mousedown="handleMouseDown" @mousemove="handleDrag" @mouseup="handleMouseUp">
                <div class="container">
                    <div class="slide " :class="index == activeIndex ? 'slide1' : ''">
                        <video height="310" autoplay muted loop poster="https://i.vimeocdn.com/video/590456190_640x360.jpg">
                            <source :src="card.videoLink" type="video/mp4" />Your browser doesn't support HTML5 video tag.
                        </video>
                    </div>
                </div>
                <div class="description">
                    <div class="description__country">
                        <span>{{ card.countryTitle }}</span>
                        <span class="country-icon"></span>
                    </div>
                    <div class="description__line"></div>
                    <div class="description__text"><span>{{ card.description }}</span></div>
                </div>
            </div>
        </TransitionGroup>
    </div>
</template>

<script setup lang="ts">
import { reactive } from 'vue';

const activeIndex = ref(0)
const isDrag = ref(false)
const cards = reactive([
    {
        countryTitle: "La Crusc, Italy",
        videoLink: "http://s2.pstatp.com/cdn/expire-1-M/byted-player-videos/1.0.0/xgplayer-demo.mp4",
        description: "How about you explore cultural events in La Crusc?",
        countryIcon: "@/assets/images/svg/italy.svg",
    },
    {
        countryTitle: "ItalyParis, France",
        videoLink: "http://s2.pstatp.com/cdn/expire-1-M/byted-player-videos/1.0.0/xgplayer-demo.mp4",
        description: "How about you explore cultural events in Paris?",
        countryIcon: "@/assets/images/svg/france.svg",
    }, {
        countryTitle: "Hong Kong, China",
        videoLink: "http://s2.pstatp.com/cdn/expire-1-M/byted-player-videos/1.0.0/xgplayer-demo.mp4",
        description: "How about you explore cultural events in Hong Kong?",
        countryIcon: "@/assets/images/svg/china.svg",
    }, {
        countryTitle: "Thx for watching",
        videoLink: "http://s2.pstatp.com/cdn/expire-1-M/byted-player-videos/1.0.0/xgplayer-demo.mp4",
        description: "More demos soon =)",
        countryIcon: "@/assets/images/svg/twitter.svg",
    }
])
const data = reactive({
    degree: 2.7,
    x0: 0,
    y0: 0,
    rotate: 0,
})

onMounted(() => {
    // window.addEventListener("mouseup", () => {
    //     isDrag.value = false
    // })
})
const handleMouseDown = (e: any) => {
    console.log("handleMouseDown", e)
    isDrag.value = true
    const startX = data.x0 = e.pageX || e.originalEvent.touches[0].pageX;
    const startY = data.y0 = e.pageY || e.originalEvent.touches[0].pageY;
    console.log("startX", startX, "startY", startY)
}
const handleDrag = (e: any) => {
    if (isDrag.value) {
        console.log("handleDrag", e)
        const x = e.pageX || e.originalEvent.touches[0].pageX;
        const y = e.pageY || e.originalEvent.touches[0].pageY;
        if (y - data.y0 < 0) {
            var rotate = Math.atan(Math.abs(y - data.y0) / Math.abs(x)) * 360 / (2 * Math.PI);
            data.rotate = Math.min(Math.max(rotate, 0), data.degree);
            console.log("roate", rotate, document.querySelector(".slide1"));

            (document.querySelector(".slide1") as HTMLElement).style.transform = `rotate(${data.rotate}deg)`
        }
    }
    else {
        (document.querySelector(".slide1") as HTMLElement).style.transform = `rotate(0deg)`
    }

}
const handleMouseUp = (e: any) => {
    console.log("handleMouseUp", e)

    if (isDrag.value) {
        //  
        if (data.rotate < 2.7) {
            (document.getElementsByClassName("slide1")[0] as HTMLElement).style.transform = `rotate(${0}deg)`;
            (document.getElementsByClassName("slide1")[0] as HTMLElement).style.animation = 'none';
        } else {
            console.log("moving");
            (document.getElementsByClassName("slide1")[0] as HTMLElement).style.animation = "slideMove 2s  ease";
        }
        isDrag.value = false
        setTimeout(() => {
            autoIncrement()
        }, 2000)
    }

}
const autoIncrement = () => {
    activeIndex.value++
    if (activeIndex.value >= cards.length) {
        activeIndex.value = 0
    }
}

</script>

<style scoped lang="scss">
@import url('https://fonts.googleapis.com/css?family=Questrial');

.swipeable-video-container {
    width: 100%;
    height: calc(100vh - var(--TopHeaderHeight));
    position: relative;
    overflow: hidden;


    $width: 25rem;
    $vidWidth: 22rem;
    $vidHeight: 21rem;
    $vidPadding: 1.5rem;

    $secondFontCol: #aaaaaa;

    *,
    *:before,
    *:after {
        box-sizing: border-box;
        margin: 0;
        padding: 0;
    }

    html,
    body {
        font-size: 62.5%;
    }

    body {
        background: #eeeeee;
        overflow-x: hidden;
        font-family: 'Questrial', "Helvetica Neue", Helvetica, sans-serif;
    }

    .elements {
        position: absolute;
        top: 50%;
        left: 50%;
        transform: translate(-50%, -50%);
        width: $width;
        height: 33rem;
        background-color: #fff;
        border-radius: 3px;
        box-shadow: 0.5rem 1rem 3rem rgba(0, 0, 0, 0.7);
    }

    .container {
        position: relative;
        margin: 2rem auto 0;
        width: $vidWidth;
    }

    .slide {
        position: absolute;
        height: $vidHeight;
        width: $vidWidth;
        border-radius: 3px;
        cursor: grab;

        background-color: gray;
        overflow: hidden;

        will-change: transform;
        transform: translateZ(0);

        &1 {
            box-shadow: 0.1rem 0.1rem 1.5rem rgba(0, 0, 0, 0.3);
            background-image: url("https://i.vimeocdn.com/video/590456190_640x360.jpg");
            background-size: 55rem;
        }
    }

    .slide1 {
        transform-origin: top right;
    }

    @keyframes slideMove {
        from {
            transform: rotate(2.7deg);
        }

        to {
            transform: rotate(2.7deg) translate(300px, -300px);
            opacity: 0;
        }
    }

    .fade-in-enter-active,
    .fade-in-leave-active {
        transition: all 0.5s ease;
    }

    .fade-in-enter-from,
    .fade-in-leave-to {
        opacity: 0;
        transform: translateY(15px);
    }

    #paris {
        margin-left: -15rem;
    }

    #italy,
    #prog {
        margin-left: -0rem;
    }

    #hongkong {
        margin-left: -10rem;
    }

    .index {
        &1 {
            z-index: 1;
        }

        &2 {
            z-index: 2;
        }

        &3 {
            z-index: 3;
        }

        &4 {
            z-index: 4;
        }
    }

    .description {
        position: absolute;
        top: 25rem;
        margin: auto 3.2rem;
        width: $width - 3.2 * 2rem;

        &__line {
            position: absolute;
            top: 3.2rem;
            width: 100%;
            border-bottom: 1px solid #eeeeee;
        }

        &__country,
        &__text {
            position: absolute;
            will-change: transform, opacity;
            transform: translateZ(0);
            opacity: 1;
            transition: all .25s cubic-bezier(.74, .05, .94, .36);
        }

        &__country {
            width: 100%;
            font-size: 2rem;
            font-weight: 600;

            .country-icon {
                position: absolute;
                right: 0;
            }
        }

        &__text {
            top: 4rem;
            font-size: 1.2rem;
            font-weight: 300;
            color: $secondFontCol;
            transition-delay: 0.03s;
            line-height: 1;

            &.hide {
                transition-delay: .28s;
            }
        }
    }

    .fadeout-up {
        opacity: 0;
        transform: translate3D(0, -2rem, 0);
    }

    .hide {
        opacity: 0;
        transform: translate3D(0, 2rem, 0);
        transition: all .25s cubic-bezier(.05, .67, .47, .99);
        transition-delay: .25s;
    }

    .fadein-up {
        opacity: 1;
        transform: translate3D(0, 0, 0);
    }

    svg {
        width: 3.5rem;
        height: 2.3rem;
        position: absolute;
        right: 0;
        top: -0.1rem;
    }
}
</style>
 