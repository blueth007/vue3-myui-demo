<template>
    <div class="image-slider-container">
        <div class='parent'>
            <div class='slider' :class="isSliding ? 'is-sliding' : ''">
                <button type="button" id='right' class='right' name="button" @click="handleRight">
                    <svg version="1.1" id="Capa_1" width='40px' height='40px ' xmlns="http://www.w3.org/2000/svg"
                        xmlns:xlink="http://www.w3.org/1999/xlink" x="0px" y="0px" viewBox="0 0 477.175 477.175"
                        style="enable-background:new 0 0 477.175 477.175;" xml:space="preserve">
                        <g>
                            <path style='fill: #9d9d9d;' d="M360.731,229.075l-225.1-225.1c-5.3-5.3-13.8-5.3-19.1,0s-5.3,13.8,0,19.1l215.5,215.5l-215.5,215.5
          c-5.3,5.3-5.3,13.8,0,19.1c2.6,2.6,6.1,4,9.5,4c3.4,0,6.9-1.3,9.5-4l225.1-225.1C365.931,242.875,365.931,234.275,360.731,229.075z
          " />
                        </g>
                    </svg>
                </button>
                <button type="button" id='left' class='left' name="button" @click="handleLeft">
                    <svg version="1.1" id="Capa_2" xmlns="http://www.w3.org/2000/svg"
                        xmlns:xlink="http://www.w3.org/1999/xlink" x="0px" y="0px" viewBox="0 0 477.175 477.175"
                        style="enable-background:new 0 0 477.175 477.175;" xml:space="preserve">
                        <g>
                            <path style='fill: #9d9d9d;' d="M145.188,238.575l215.5-215.5c5.3-5.3,5.3-13.8,0-19.1s-13.8-5.3-19.1,0l-225.1,225.1c-5.3,5.3-5.3,13.8,0,19.1l225.1,225
          c2.6,2.6,6.1,4,9.5,4s6.9-1.3,9.5-4c5.3-5.3,5.3-13.8,0-19.1L145.188,238.575z" />
                        </g>
                    </svg>
                </button>
                <svg id='svg2' class='up2' v-if="directCircle == 'left'" xmlns="http://www.w3.org/2000/svg"
                    xmlns:xlink="http://www.w3.org/1999/xlink">
                    <circle :id="'circle' + (index + 1)" v-for="item, index in circles" :key="item + index + 10"
                        ref="circleOne" :class="['circle' + (index + 1) + ' steap']" cx="34px" cy="49%" :r="item" />

                </svg>
                <svg id='svg1' class='up2' v-if="directCircle == 'right'" xmlns="http://www.w3.org/2000/svg"
                    xmlns:xlink="http://www.w3.org/1999/xlink">
                    <circle :id="'circle' + (index + 10)" v-for="item, index in circles" :key="item + index + 10"
                        ref="circleTwo" :class="['circle' + (index + 10) + ' steap']" cx="648px" cy="49%" :r="item" />

                </svg>

                <TransitionGroup name="fade-tran" tag="div" class="slide-container-title">
                    <div v-for="item, index in images" ref="slideItem" :class="['slide' + (index + 1) + '']"
                        :key="item.title" :style="'background-image: url(' + getAssetsImage(item.image) + ')'"
                        v-show="curPage == index">
                        {{ index }}- {{ item.title }}
                    </div>
                </TransitionGroup>


            </div>
        </div>
    </div>
</template>

<script setup lang="ts">
import { reactive, ref } from 'vue';
import { getAssetsImage } from '../../util';
const curPage = ref(0);
const isClick = ref(true);
const isSliding = ref(false);
const directCircle = ref('left')
const slideItem = ref<Array<HTMLElement>>()
const circleOne = ref<Array<HTMLElement>>()
const circleTwo = ref<Array<HTMLElement>>()
const circles = ref([20, 100, 180, 260, 340, 420, 500, 580, 660])
const images = reactive([
    {
        title: "MOUNTAIN", image: 'mountain.jpg',// "https://images.unsplash.com/photo-1483068612337-c045daaca40e?ixlib=rb-0.3.5&q=80&fm=jpg&crop=entropy&cs=tinysrgb&w=1600&h=900&fit=crop&s=6de8746a693acc34ebe9e9a15c4c18d1",
    },
    {
        title: "BEACH", image: 'beach.jpg',//'https://images.unsplash.com/photo-1489914099268-1dad649f76bf?ixlib=rb-0.3.5&q=80&fm=jpg&crop=entropy&cs=tinysrgb&w=1600&h=900&fit=crop&s=f21f40bb93bae58300e83f7f72ebb5a5',
    }, {
        title: "FOREST", image: "forest.jpg",//'https://images.unsplash.com/photo-1490100667990-4fced8021649?ixlib=rb-0.3.5&q=80&fm=jpg&crop=entropy&cs=tinysrgb&w=1600&h=900&fit=crop&s=247f52de1a292b8a1877b0c7dd77a291',
    },
    {
        title: "DESERT", image: "desert.jpg",// 'https://images.unsplash.com/photo-1494783404829-a93883e74b68?ixlib=rb-0.3.5&q=80&fm=jpg&crop=entropy&cs=tinysrgb&w=1600&h=900&fit=crop&s=413f5f5c41f4db69a1474d92419601ac'
    }

])

const handleRight = () => {
    if (curPage.value == images.length - 1) {
        curPage.value = -1
    }
    if (isClick.value) {
        isSliding.value = true
        directCircle.value = 'right'
        curPage.value++;
        isClick.value = false
        setTimeout(() => {
            isSliding.value = false
            isClick.value = true
        }, 2100);

    }
}
const handleLeft = () => {
    if (curPage.value == 0) {
        curPage.value = images.length
    }
    if (isClick.value) {
        directCircle.value = 'left';
        isSliding.value = true
        isClick.value = false
        curPage.value--;

        setTimeout(() => {
            isSliding.value = false
            isClick.value = true
        }, 2100);

    }

}

</script>

<style scoped lang="scss">
.image-slider-container {
    $width: 681px;
    $height: 384px;
    $circle: 'circle';
    $slide: 'slide';
    position: relative;
    width: 100%;
    height: calc(100vh - var(--TopHeaderHeight));
    background: #ccc;

    .parent {
        width: $width;
        height: $height;
        top: 0;
        bottom: 0;
        left: 0;
        right: 0;
        margin: auto auto;
        overflow: hidden;
        position: absolute;
        border-radius: 16px;
        -webkit-box-shadow: 0 0 88px 5px rgba(0, 0, 0, 0.75);
        -moz-box-shadow: 0 0 88px 5px rgba(0, 0, 0, 0.75);
        box-shadow: 0 0 88px 5px rgba(0, 0, 0, 0.75);
    }

    svg {
        position: absolute;
        z-index: 1;
        width: $width;
        height: $height;
    }

    button {
        position: absolute;
        z-index: 50;
        width: 40px;
        overflow: hidden;
        height: 40px;
        border: none;
        border-radius: 50%;
        background: #fff;
        cursor: pointer;
        -webkit-box-shadow: 0 0 88px 5px rgba(0, 0, 0, 0.75);
        -moz-box-shadow: 0 0 88px 5px rgba(0, 0, 0, 0.75);
        box-shadow: 0 0 88px 5px rgba(0, 0, 0, 0.75);

        &:focus {
            outline-width: 0;
        }
    }

    circle {
        stroke: #fff;
        fill: none;
        transition: 0.3s;
    }

    #svg1 {
        circle {
            transition-timing-function: linear;
        }
    }

    #svg2 {
        circle {
            transition-timing-function: linear;
        }
    }

    #Capa_1 {
        position: absolute;
        width: 16px;
        height: 16px;
        transform: translate(-7px, -8px);
    }

    #Capa_2 {
        position: absolute;
        width: 16px;
        height: 16px;
        transform: translate(-9px, -8px);
    }

    .right {
        margin-left: 628px;
        margin-top: 168px;
        border: 1px solid #849494;
        background-color: transparent;
        transition: .5s;

        &:hover {
            background-color: #fff;
            // box-shadow: 0px 0px 5px #fff
        }
    }

    .left {
        margin-left: 0.5%;
        margin-top: 168px;
        border: 1px solid #849494;
        background-color: transparent;
        transition: .5s;

        &:hover {
            background-color: #fff;
        }
    }

    @for $i from 1 through 9 {
        .#{$circle}#{$i} {
            transition-delay: calc($i / 20)+'s';
        }
    }

    @for $i from 1 through 9 {
        .#{$circle}#{$i + 9} {
            transition-delay: calc($i / 20)+'s';
        }
    }



    .slider {
        position: absolute;
        width: 400%;
        height: 100%;
        background: #000;
        display: inline-flex;
        overflow: hidden;
    }



    .slide1,
    .slide2,
    .slide3,
    .slide4 {
        position: absolute;
        background-position: center;
        background-size: cover;
        color: #fff;
        font-size: 62px;
        padding-top: 138px;
        font-weight: 800;
        font-family: 'Heebo', sans-serif;
        text-align: center;
        width: 25%;
        height: 100%;
        z-index: 10;
        // transition: 1.4s;

    }

    // .tran {
    //     transform: scale(1.3);
    // }
    .tran-active,
    .up1 {
        z-index: 20;

    }

    .up2 {
        z-index: 40;
    }

    .steap {
        stroke-width: 0;
    }

    // .streak {
    //     stroke-width: 82px;
    // }

    @media (max-width: 700px) {
        .parent {
            margin-left: 1%;
        }
    }

    .slider.is-sliding {


        svg {
            z-index: 45;
        }

        .steap {
            animation: svgMove 1.7s 0.2s linear;
            // stroke-width: 82px !important;
        }
    }



    @keyframes imgEnter {
        0% {

            transform: scale(1.3);
        }

        10% {

            transform: scale(1.3);
        }

        100% {

            transform: scale(1);
        }
    }

    @keyframes svgMove {
        0% {

            stroke-width: 0;
        }

        40% {

            stroke-width: 82px;
        }

        60% {

            stroke-width: 82px;
        }

        100% {

            stroke-width: 0;
        }
    }

    .fade-tran-enter-active,
    .fade-tran-leave-active {

        transition: all 1s linear;
    }

    .fade-tran-leave-active {
        z-index: 42;
    }

    .fade-tran-enter-active {
        transition-delay: 1s;
        z-index: 41;
    }

    .fade-tran-enter-from {
        z-index: 40;
        opacity: 0;
        transform: scale(1.3);

    }

    .fade-tran-leave-from {
        z-index: 42;
        transform: scale(1);
    }


    .fade-tran-leave-to {
        z-index: 42;
        transform: scale(1.3);
    }
}
</style>