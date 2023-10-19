<template>
    <div class="circle-menu-container">
        <div class="menu-wrapper">
            <button class="menu-btn" :class="active ? 'clicked' : ''" has-ripple="true" @click="handleButton">
                <i></i>
                <i></i>
                <i></i>
                <span class="ripple"></span>
            </button>
            <ul class="menu" :class="active ? 'open' : ''">
                <li class="menuitem-wrapper" v-for="item, index in menus" :key="item.name"
                    :style="{ '--rotate': 360 / menus.length * index + 'deg' }">
                    <div class="icon-holder">
                        <a :href="item.path" class="menu-item"
                            :style="{ '--rotate': (0 - 360 / menus.length * index) + 'deg', backgroundColor: bgColor[index] }">
                            <Icon :icon="item.icon" class="material-icons">
                                {{ item.name }}
                            </Icon>
                        </a>
                    </div>

                </li>
            </ul>
        </div>

    </div>
</template>

<script setup lang="ts">
import { ref, reactive } from 'vue'

const active = ref(false)
const menus = reactive([
    {
        name: 'Home',
        icon: "mdi:home",
        path: "javascript:void(0);"
    }, {
        name: "Face",
        icon: "mdi:face-man",
        path: "javascript:void(0);"
    }, {
        name: "Android",
        icon: "mdi:android-head",
        path: "javascript:void(0);"
    }, {
        name: "shopping_cart",
        icon: "mdi:shopping",
        path: "javascript:void(0);"
    }, {
        name: "room",
        icon: "mdi:map-marker",
        path: "javascript:void(0);"
    }
])

const handleButton = () => {

    active.value = !active.value
}
const bgColor = ['#2980b9', '#c0392b', '#1abc9c', '#f39c12', '#8e44ad']
</script>

<style scoped lang="scss">
.circle-menu-container {
    width: 100%;
    height: calc(100vh - var(--TopHeaderHeight));
    position: relative;
    overflow: hidden;

    background: #2c3e50;
    box-sizing: border-box;
    transition: all 0.25s ease-in;
    font-size: 16px;

    $spin-speed: 0.7s;
    // $color-collection: (
    //     '#2980b9',
    //     '#c0392b',
    //     '#1abc9c',
    //     '#f39c12',
    //     '#8e44ad'
    // );
    $degFactor: 71.5;


    *,
    *:before,
    *:after {
        box-sizing: inherit;
    }

    a {
        color: white;
        text-decoration: none;
    }

    .menu-btn {
        position: absolute;
        top: 50%;
        left: 50%;
        z-index: 10;
        display: block;
        width: 4rem;
        height: 4rem;
        transform: translate(-50%, -50%);
        padding: 1.3rem;
        background: white;
        border: none;
        box-shadow: none;
        border-radius: 100%;
        text-align: center;
        line-height: 1;
        appearance: none;
        outline: none;
        cursor: pointer;
        font-size: 0;

        i {
            position: relative;
            z-index: 11;
            display: inline-block;
            vertical-align: middle;
            width: 100%;
            height: 0.1rem;
            margin: 0 auto;
            background: #2c3e50;
        }

        i:nth-child(2) {
            margin: 0.3rem auto;
        }
    }

    .menu-wrapper {
        position: absolute;
        top: 50%;
        left: 50%;
        display: block;
        width: 30rem;
        height: 30rem;
        transform: translate(-50%, -50%);
        // margin-top: -15rem;
        // margin-left: -15rem;
    }

    .menu {
        width: 100%;
        height: 100%;
        transform: scale(0);
        transform-origin: center;
        transition: all 0.08s ease-in-out;

        li {
            position: absolute;
            list-style: none;
            top: 50%;
            left: 50%;
            display: inline-block;
            width: 4rem;
            height: 80%;
            margin-top: -12rem;
            margin-left: -2rem;
            text-align: center;
            transform: rotate(var(--rotate));

            &.spin {
                z-index: 5;


            }


            .icon-holder {
                position: relative;
                z-index: 1;
                display: inline-block;
                width: 4rem;
                height: 100%;
                // animation: spin $spin-speed linear forwards;
            }

            .circle-holder {
                position: absolute;
                top: 50%;
                left: 50%;
                z-index: 0;
                display: none;
                width: 24rem;
                height: 24rem;
                margin: -12rem;
                padding: 1rem;
                transform: rotate(-90deg);

                circle {
                    width: 100%;
                    height: 100%;
                    stroke-width: 4rem;
                    stroke-dasharray: 560;
                    stroke-dashoffset: 560;
                    stroke-linecap: round;
                }
            }

            a {
                position: relative;
                display: inline-block;
                width: 4rem;
                height: 4rem;
                margin-top: 4.5rem;
                padding: 1rem;
                border-radius: 100%;
                transform: scale(1, 1);
                background-color: #ccc;
                transform: rotate(var(--rotate));


                .material-icons {
                    display: inline-block;
                    vertical-align: middle;
                    font-size: 26px;
                }
            }


        }

        &.open {
            transform: scale(1);
            // animation: bouncein linear 0.1s forwards 1;
        }
    }

    .clicked.menu-btn {
        -webkit-animation: buttonactive ease-in 0.2s forwards 1;
        animation: buttonactive ease-in 0.2s forwards 1;


        i:first-child {
            -webkit-animation: top-down ease-in 0.2s forwards 1;
            animation: top-down ease-in 0.2s forwards 1;
        }

        i:nth-child(2) {
            -webkit-animation: middle ease-in 0.01s forwards 1;
            animation: middle ease-in 0.01s forwards 1;
        }

        i:nth-child(3) {
            -webkit-animation: down-top ease-in 0.2s forwards 1;
            animation: down-top ease-in 0.2s forwards 1;
        }
    }

    .ripple {
        position: absolute;
        top: -1rem;
        left: -1rem;
        z-index: 10;
        display: block;
        width: 6rem;
        height: 6rem;
        transform: scale(0.5);
        opacity: 0;
        border: 2rem solid white;
        border-radius: 100%;
    }

    .clicked .ripple {
        -webkit-animation: ripples ease-in 0.35s forwards 1;
        animation: ripples ease-in 0.35s forwards 1;
    }

    @-webkit-keyframes spin {
        0% {
            transform: rotate(0deg);
            opacity: 1;
        }

        80% {
            transform: rotate(360deg);
            opacity: 1;
        }

        100% {
            transform: rotate(360deg);
            opacity: 0;
        }
    }

    @keyframes spin {
        0% {
            transform: rotate(0deg);
            opacity: 1;
        }

        80% {
            transform: rotate(360deg);
            opacity: 1;
        }

        100% {
            transform: rotate(360deg);
            opacity: 0;
        }
    }

    @-webkit-keyframes dash {
        0% {
            stroke-dashoffset: 560;
            stroke-width: 4rem;
        }

        80% {
            stroke-dashoffset: 0;
            stroke-width: 4rem;
            opacity: 1;
        }

        100% {
            stroke-dashoffset: 0;
            stroke-width: 6rem;
            opacity: 0;
        }
    }

    @keyframes dash {
        0% {
            stroke-dashoffset: 560;
            stroke-width: 4rem;
        }

        80% {
            stroke-dashoffset: 0;
            stroke-width: 4rem;
            opacity: 1;
        }

        100% {
            stroke-dashoffset: 0;
            stroke-width: 6rem;
            opacity: 0;
        }
    }

    @-webkit-keyframes buttonactive {
        0% {
            background: white;
            transform: rotate(0deg);
        }

        100% {
            background: #4f6f8f;
            transform: rotate(-90deg);
        }
    }

    @keyframes buttonactive {
        0% {
            background: white;
            transform: translate(-50%, -50%) rotate(0deg);
        }

        100% {
            background: #4f6f8f;
            transform: translate(-50%, -50%) rotate(-90deg);
        }
    }

    @-webkit-keyframes middle {
        0% {
            opacity: 1;
            left: 0;
        }

        100% {
            opacity: 0;
            left: -4rem;
        }
    }

    @keyframes middle {
        0% {
            opacity: 1;
            left: 0;
        }

        100% {
            opacity: 0;
            left: -4rem;
        }
    }

    @-webkit-keyframes top-down {
        0% {
            top: 0;
            transform: rotate(0);
        }

        100% {
            top: 0.35rem;
            transform: rotate(-45deg);
        }
    }

    @keyframes top-down {
        0% {
            top: 0;
            transform: rotate(0);
        }

        100% {
            top: 0.35rem;
            transform: rotate(-45deg);
        }
    }

    @-webkit-keyframes down-top {
        0% {
            top: 0;
            transform: rotate(0);
        }

        100% {
            top: -0.4rem;
            transform: rotate(45deg);
        }
    }

    @keyframes down-top {
        0% {
            top: 0;
            transform: rotate(0);
        }

        100% {
            top: -0.4rem;
            transform: rotate(45deg);
        }
    }

    @-webkit-keyframes ripples {
        0% {
            opacity: 1;
            transform: scale(0.5);
            border-width: 3rem;
        }

        100% {
            opacity: 0.5;
            transform: scale(1);
            border-width: 0rem;
        }
    }

    @keyframes ripples {
        0% {
            opacity: 1;
            transform: scale(0.5);
            border-width: 3rem;
        }

        100% {
            opacity: 0.5;
            transform: scale(1);
            border-width: 0rem;
        }
    }

    @-webkit-keyframes bouncein {
        to {
            transform: scale(1);
        }
    }

    @keyframes bouncein {
        to {
            transform: scale(1);
        }
    }
}
</style>