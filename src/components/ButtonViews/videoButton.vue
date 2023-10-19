<template>
    <div class="video-button-wrapper">
        <div class="video-wrapper">
            <input type="checkbox" v-if="autoPlay">
            <input type="checkbox" @click="handleClick" v-else>
            <div class="video">
                <video src="http://s2.pstatp.com/cdn/expire-1-M/byted-player-videos/1.0.0/xgplayer-demo.mp4" loop
                    :autoplay="autoPlay" muted playsinline></video>
            </div>
            <div class="text">
                <span data-text="Watch the video"></span>
            </div>
        </div>
    </div>
</template>

<script setup lang="ts">
defineProps({
    autoPlay: {
        type: Boolean,
        default: true
    }
})

// 在 input 点击事件可以实现点击播放和缩小暂停
const handleClick = () => {
    const isCheckPlay = document.querySelector("input")?.checked
    if (isCheckPlay) {
        document.querySelector("video")?.play()
    } else {
        document.querySelector("video")?.pause()
    }

}
</script>

<style scoped lang="scss">
.video-wrapper {
    --color: #1F242D;
    --color-invert: #ffffff;
    --clip-path: circle(15px at left);
    --clip-path-hover: circle(70px at left);
    --clip-path-clicked: circle(100vw at left);
    --duration: .4s;
    --timing-function: ease;
    position: relative;
    display: flex;
    justify-content: center;
    align-items: center;
    width: 100%;

    .video {
        height: 100vh;
        overflow: hidden;
        display: flex;
        justify-content: center;
        align-items: center;
        margin-left: 15px;
        clip-path: var(--clip-path);
        transition: clip-path var(--duration) var(--timing-function);

        video {
            position: fixed;
            background: #c4cbde;
            top: 50%;
            left: 50%;
            min-width: 100%;
            min-height: 100%;
            width: auto;
            height: auto;
            transform: translate(-50%, -50%);
            z-index: 99999;
        }
    }

    .text {
        position: relative;
        text-transform: uppercase;
        font-weight: 600;
        letter-spacing: .2px;
        opacity: var(--opacity, 1);
        transition: opacity .3s var(--timing-function) .2s;

        &::before,
        &::after {
            content: "";
            position: absolute;
            bottom: 0;
            left: -1px;
            right: 25px;
            height: 0;
        }

        &::before {
            box-shadow: 26px 0 0 1px var(--color);
            right: var(--r, 100%);
            opacity: var(--opacity, 0);
            transition: right .5s ease-in, opacity .1s linear;
        }

        &::after {
            box-shadow: 26px 0 0 1px var(--color-invert);
            clip-path: var(--clip-path);
            transition: clip-path var(--duration) var(--timing-function);
        }

        >span {

            &::before,
            &::after {
                content: attr(data-text);
                padding-left: 26px;
            }

            &::before {
                color: var(--color);
            }

            &::after {
                color: var(--color-invert);
                clip-path: var(--clip-path);
                transition: clip-path var(--duration) var(--timing-function);
                position: absolute;
                left: 0;
            }
        }
    }

    input {
        width: 220px;
        height: 40px;
        margin: auto;
        position: absolute;
        left: 0;
        right: 0;
        border-radius: 40px;
        outline: none;
        z-index: 2;
        appearance: none;
        cursor: pointer;

        &:focus {
            outline: 0;
        }

        &:hover {
            ~.video {
                clip-path: var(--clip-path-hover);
            }

            ~.text {
                &::before {
                    --r: 25px;
                    --opacity: 1;
                }

                &::after {
                    clip-path: var(--clip-path-hover);
                }

                >span {
                    &::after {
                        clip-path: var(--clip-path-hover);
                    }
                }
            }
        }

        &:checked {
            width: 100%;
            height: 100%;
            border-radius: 0;

            ~.video {
                clip-path: var(--clip-path-clicked);
            }

            ~.text {
                --opacity: 0;
                transition: opacity .3s var(--timing-function);

                &::after {
                    clip-path: var(--clip-path-clicked);
                }

                >span {
                    &::after {
                        clip-path: var(--clip-path-clicked);
                    }
                }
            }
        }
    }
}

//--- ## BASIC #############
.video-button-wrapper {
    background: #E8EBF3;
    height: 100vh;
    font: 400 16px 'Poppins', sans-serif;
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;

}
</style>