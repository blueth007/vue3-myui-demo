<template>
    <div class="faq-container">
        <h2>Frequently Asked Questions</h2>
        <div class="accordion">
            <div class="accordion-item" v-for="(item, index) in faqs" :key="item.title">
                <button id="accordion-button-1" :aria-expanded="index == isActiveIndex" @click="handleClick(index)">
                    <span class="accordion-title">
                        {{ item.title }}</span>
                    <span class="icon" aria-hidden="true"></span>
                </button>
                <div class="accordion-content">
                    <p>{{ item.desc }}</p>
                </div>
            </div>

        </div>
    </div>
</template>

<script setup lang="ts">
import { ref, reactive } from 'vue'


const faqs = reactive([{
    title: 'Why is the moon sometimes out during the day?',
    desc: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Elementum sagittis vitae et leo duis ut.',
}, {
    title: 'Why is the sky blue?',
    desc: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Elementum sagittis vitae et leo duis ut.',
}, {
    title: 'Will we ever discover aliens?',
    desc: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Elementum sagittis vitae et leo duis ut.',
}, {
    title: 'How much does the Earth weigh?',
    desc: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Elementum sagittis vitae et leo duis ut.',
}, {
    title: 'How do airplanes stay up?',
    desc: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Elementum sagittis vitae et leo duis ut.',
}
])

const isActiveIndex = ref(-1)

const handleClick = (index: number) => {
    console.log(index)
    if (isActiveIndex.value == index) {
        isActiveIndex.value = -1
    } else
        isActiveIndex.value = index
}
</script>

<style scoped lang="scss">
.faq-container {

    $bg: #fff;
    $text: #7288a2;
    $gray: #4d5974;
    $lightgray: #e5e5e5;
    $blue: #03b5d2;

    padding: 0;
    font-family: 'Hind', sans-serif;
    background: $bg;
    color: $gray;
    margin: 0 auto;
    padding: 4rem;
    width: 48rem;

    .accordion {
        .accordion-item {
            border-bottom: 1px solid $lightgray;

            button[aria-expanded='true'] {
                border-bottom: 1px solid $blue;
            }
        }

        button {
            position: relative;
            display: block;
            text-align: left;
            width: 100%;
            padding: 1em 0;
            color: $text;
            font-size: 1.15rem;
            font-weight: 400;
            border: none;
            background: none;
            outline: none;

            &:hover,
            &:focus {
                cursor: pointer;
                color: $blue;

                &::after {
                    cursor: pointer;
                    color: $blue;
                    border: 1px solid $blue;
                }
            }

            .accordion-title {
                padding: 1em 1.5em 1em 0;
            }

            .icon {
                display: inline-block;
                position: absolute;
                top: 18px;
                right: 0;
                width: 22px;
                height: 22px;
                border: 1px solid;
                border-radius: 22px;

                &::before {
                    display: block;
                    position: absolute;
                    content: '';
                    top: 9px;
                    left: 5px;
                    width: 10px;
                    height: 2px;
                    background: currentColor;
                }

                &::after {
                    display: block;
                    position: absolute;
                    content: '';
                    top: 5px;
                    left: 9px;
                    width: 2px;
                    height: 10px;
                    background: currentColor;
                }
            }
        }

        button[aria-expanded='true'] {
            color: $blue;

            .icon {
                &::after {
                    width: 0;
                }
            }

            +.accordion-content {
                opacity: 1;
                max-height: 9em;
                transition: all 200ms linear;
                will-change: opacity, max-height;
            }
        }

        .accordion-content {
            opacity: 0;
            max-height: 0;
            overflow: hidden;
            transition: opacity 200ms linear, max-height 200ms linear;
            will-change: opacity, max-height;

            p {
                font-size: 1rem;
                font-weight: 300;
                margin: 2em 0;
            }
        }
    }
}
</style>