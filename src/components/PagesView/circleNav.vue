<template>
    <div class="container">
        <div class="circle-arc">
            <div class="content box-center-ab">
                <div class="circle-box  box-center-ab">
                    <span class="content-before"></span>
                    <span class="content-after"></span>
                    <div class="content-text">
                        <br>
                        <div class="content-text-title" style="font-size: 18px; font-weight: 800;margin-top: -12px;">{{
                            titles[ball_active_index].title }}</div>
                        <p v-html="titles[ball_active_index].content"></p>
                    </div>
                </div>
                <a class="box-center-ab learn-more-btn">learn more</a>
            </div>
            <div class="circle-ball" :style="ball_rotate"></div>
            <div class=" box-center-ab serve" :class="'serve-' + index" v-for="(item, index) in titles"
                :key="item.title + index" @click="handleClickItem(item, index)">
                <div class="serve-icon" :class="ball_active_index == index ? 'active' : ''">
                    <Icon :icon="item.icon" with="48" height="48" color="#fff"></Icon>
                    <p>{{ item.title }}</p>

                </div>
            </div>

        </div>
    </div>
</template>

<script setup lang="ts">
import { reactive, computed } from "vue"

type CircleType = {
    title: string,
    subtitle?: string
    icon?: string
    content?: string
}

const titles = reactive<Array<CircleType>>([
    {
        title: "Industries",
        icon: "mdi:blinds-horizontal",
        content: `<p>Our highly skilled staff is disciplined to work within arange of industries in the dynamic Life Sciences sectorto meet demanding andevolving expectations.</p> `
    }, {
        title: "Validation",
        icon: "mdi:webpack",
        subtitle: "(C&amp;Q and CSV)",
        content: "As part of our wide expertise,we provide Commissioning &Qualification and ComputerSystem Validation Solutions."
    }, {
        title: "Engineering",
        icon: "mdi:airplane",
        content: "Cost reduction and productivity enhancement.Principia engineers have hands-on experience in driving successful EnergyManagement Programs."
    }, {
        title: "Project",
        icon: "mdi:wiper-wash",
        subtitle: "Management",
        content: "We help your operations complete their project on time,under budget and meeting100% of the requirements."
    }, {
        title: "Manufacturing",
        icon: "mdi:bridge",
        subtitle: "IT",
        content: "Our Manufacturing ExecutionSystems comprise applications that connect the real-time data originated at the shop floor with the enter prise level applications."
    }, {
        title: "Technical",
        icon: "mdi:castle",
        subtitle: "Services",
        content: "We ensure that your process.manufacturing, packaging equipment, facility and utilities perform as the intended design."
    }, {
        title: "Process",
        icon: "mdi:compost",
        subtitle: "Automation",
        content: "Our process and IndustrialAutomation personnel are trained to offer a broad scope of services to meet or exceed your project goals."
    }
])

const handleClickItem = (item: CircleType, index: number) => {
    console.log(item, index)
    ball_active_index.value = index
}
const ball_active_index = ref(0)
const ball_rotate = computed(() => {
    let rotate = -ball_active_index.value * 30 - 45
    return `transform: rotate( ${rotate}deg) translate(35px, 35px);`
})
</script>

<style scoped lang="scss">
.container {
    position: relative;
    width: 100%;
    height: 480px;
    margin: 30px auto;
    border: 1px solid #ccc;

    .content {
        width: 316px;
        height: 316px;
        border-radius: 50%;
        padding: 40px;
        shape-outside: circle();
        // float: left;
        overflow-wrap: break-word;
        background-color: #fff;

        // color: #fff;
        .learn-more-btn {
            text-decoration: none;
            font-weight: 500;
            padding: 4px 12px;
            border: 1px solid #fff;
            background: #005fa4;
            transform: translate(-50%, 70px);
            border-radius: 10px;
            color: #fff;
            z-index: 99;
        }

    }

    .circle-arc {
        width: 320px;
        height: 320px;
        position: relative;
        margin: 20px auto;
        border-radius: 50%;
        background: linear-gradient(to top, #005fa4, transparent);
        transform-origin: center;

        .serve {
            font-size: 14px;
            width: 60px;
            height: 60px;
            border-radius: 50%;
            transform-origin: 0 0;
        }

        .serve-icon {
            width: 60px;
            height: 60px;
            padding-top: 5px;
            text-align: center;
            border-radius: 50%;
            background-color: #005fa4;
            color: #005fa4;
        }

        @for $i from 0 through 6 {
            .serve-#{$i} {
                transform: rotate($i * -1* 30deg) translate(-250px, -30px);

                .serve-icon {
                    transform: rotate($i * 30deg);
                }

                .active,
                .serve-icon:hover {
                    transform: rotate($i * 30deg) translate(0, -10%) scale(1.2);
                }
            }
        }
    }

    .box-center-ab {
        position: absolute;
        top: 50%;
        left: 50%;
        transform: translate(-50%, -50%);
    }

    .circle-ball {
        position: absolute;
        width: 24px;
        height: 24px;
        background-color: #fff;
        border-radius: 50%;
        transform-origin: 160px 160px;
        border: 2px solid #005fa4;
        left: 0;
        top: 0;
        z-index: 9;
        transition: all 0.5s;
        transform: rotate(-45deg) translate(35px, 35px);
    }

    .circle-box {
        position: relative;
        width: 250px;
        height: 250px;
        border-radius: 50%;
        background: #005fa4;
        color: #fff;
        padding: 10px;
        overflow: hidden;

        .content-before {
            float: left;
            width: 50%;
            height: 100%;
            shape-outside: radial-gradient(farthest-side ellipse at right, transparent 98%, red);
        }

        .content-after {
            float: right;
            width: 50%;
            height: 100%;
            shape-outside: radial-gradient(farthest-side ellipse at left, transparent 98%, red);
        }

        .content-text {
            text-align: center;
        }
    }
}
</style>