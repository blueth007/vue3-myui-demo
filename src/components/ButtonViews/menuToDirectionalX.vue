<template>
    <div class="menu-to-directional-x-container">
        <div class="to-arrow">
            <div class="left">
                <input type="checkbox" id="menu-left" />
                <label for="menu-left"><span></span></label>
            </div>
            <div class="right">
                <input type="checkbox" id="menu-right" />
                <label for="menu-right"><span></span></label>
            </div>
            <div class="top">
                <input type="checkbox" id="menu-top" />
                <label for="menu-top"><span></span></label>
            </div>
            <div class="bottom">
                <input type="checkbox" id="menu-bottom" />
                <label for="menu-bottom"><span></span></label>
            </div>
        </div>

        <div class="to-close">
            <div class="x">
                <input type="checkbox" id="menu-x" />
                <label for="menu-x"><span></span></label>
            </div>
            <div class="x1">
                <input type="checkbox" id="menu-x1" />
                <label for="menu-x1"><span></span></label>
            </div>
            <div class="x2">
                <input type="checkbox" id="menu-x2" />
                <label for="menu-x2"><span></span></label>
            </div>
        </div>

    </div>
</template>

<script setup lang="ts">

</script>

<style scoped lang="scss">
.menu-to-directional-x-container {
    width: 100%;
    height: calc(100vh - var(--TopHeaderHeight));
    position: relative;
    overflow: hidden;
    background: #455A64;

    $size: 5rem;
    $thickness: .5rem;
    $gap: 1rem;
    $color: #CFD8DC;
    $roundCap: true;

    *,
    *:before,
    *:after {
        margin: 0;
        padding: 0;
        transition: all 300ms ease;
    }

    div>div {
        float: left;
        padding: 3rem;
    }

    input {
        display: none;
    }

    label {
        display: block;
        width: $size;
        height: calc($thickness * 3 + $gap * 2);
        position: relative;


        span {
            position: relative;
            top: 1.5rem;

            &,
            &::before,
            &::after {
                display: block;
                background: #CFD8DC;
                width: 5rem;
                height: 0.5rem;
                border-radius: 0.25rem;
            }

            &::before,
            &::after {
                content: "";
                position: absolute;
            }

            &::before {
                // bottom: 1.5rem;
                transform: translateY(-1.5rem);
            }

            &::after {
                // top: 1.5rem;
                transform: translateY(1.5rem);
            }
        }


    }

    .left label span:before,
    .top label span:before,
    .bottom label span:before {
        transform-origin: top left;
    }

    .left label span:after,
    .top label span:after,
    .bottom label span:after {
        transform-origin: bottom left;
    }

    .right label span:before {
        transform-origin: top right;
        right: 0;
    }

    .right label span:after {
        transform-origin: bottom right;
        right: 0;
    }

    .to-arrow :checked~label span:before,
    .to-arrow :checked~label span:after {
        width: 60%;
    }

    .to-arrow :checked~label span:before {
        bottom: -0.125rem;
    }

    .to-arrow :checked~label span:after {
        top: -0.125rem;
    }

    .left :checked~label span:before,
    .top :checked~label span:before,
    .bottom :checked~label span:before {
        transform: rotate(-40deg);
    }

    .left :checked~label span:after,
    .top :checked~label span:after,
    .bottom :checked~label span:after {
        transform: rotate(40deg);
    }

    .right :checked~label span:before {
        transform: rotate(40deg);
    }

    .right :checked~label span:after {
        transform: rotate(-40deg);
    }

    .top :checked~label span {
        transform: rotate(90deg);
    }

    .bottom :checked~label span {
        transform: rotate(-90deg);
    }

    .x :checked~label span {
        width: 0;
    }

    .x :checked~label span:before {
        transform: rotate(45deg);
        bottom: 0;
    }

    .x :checked~label span:after {
        transform: rotate(-45deg);
        top: 0;

    }

    .x1 :checked~label span {

        background-color: transparent;

    }

    .x1 :checked~label span:before {
        -webkit-animation: x1Before 500ms forwards;
        animation: x1Before 500ms forwards;
    }

    .x1 :checked~label span:after {
        -webkit-animation: x1After 500ms forwards;
        animation: x1After 500ms forwards;
    }

    @-webkit-keyframes x1Before {
        50% {
            bottom: 0;
            transform: rotate(0deg);
        }

        100% {
            bottom: 0;
            transform: rotate(45deg);
        }
    }

    @keyframes x1Before {
        50% {
            bottom: 0;
            transform: rotate(0deg);
        }

        100% {
            bottom: 0;
            transform: rotate(45deg);
        }
    }

    @-webkit-keyframes x1After {
        50% {
            top: 0;
            transform: rotate(0deg);
        }

        100% {
            top: 0;
            transform: rotate(-45deg);
        }
    }

    @keyframes x1After {
        50% {
            top: 0;
            transform: rotate(0deg);
        }

        100% {
            top: 0;
            transform: rotate(-45deg);
        }
    }

    /**x2 的style css */

    .x2 {
        label span {
            animation: x2spanBC 0.5s backwards;

            &,
            &::after,
            &::before {
                animation-direction: reverse;
            }

            &::before {

                animation: x2spanBCB 0.5s backwards;
            }

            &::after {

                animation: x2spanBCA 0.5s backwards;
            }

        }

        @keyframes x2spanBC {
            50% {
                transform: rotate(0deg);
            }

            100% {
                transform: rotate(45deg);
            }
        }

        @keyframes x2spanBCB {

            0% {
                transform: rotate(90deg);
            }

            50% {
                transform: rotate(0deg);
            }

            100% {
                transform: translateY(-1.5rem) rotate(0deg);
            }
        }

        @keyframes x2spanBCA {

            0% {
                transform: rotate(90deg);
            }

            50% {
                transform: rotate(0deg);
            }

            100% {
                transform: translateY(1.5rem) rotate(0deg);
            }
        }


    }

    /**x2 的style checked之后 css */
    .x2 :checked~label span {
        animation: x2SpanCk 500ms forwards;

    }

    @keyframes x2SpanCk {
        0% {
            transform: rotate(0deg);
        }

        50% {
            transform: rotate(0deg);
        }

        100% {
            transform: rotate(45deg);
        }
    }

    .x2 :checked~label span::before {
        animation: x2SpanCkB 500ms forwards;
    }

    @keyframes x2SpanCkB {
        0% {
            transform: rotate(0deg);
        }

        50% {
            transform: translateY(0rem);
        }

        100% {
            transform: translateY(0rem) rotate(-90deg);
        }

    }

    .x2 :checked~label span::after {
        animation: x2SpanCkA 500ms forwards;
    }

    @keyframes x2SpanCkA {
        0% {
            transform: rotate(0deg);
        }

        50% {
            transform: translateY(0rem);
        }

        100% {
            transform: translateY(0rem) rotate(-90deg);
        }

    }

}
</style>