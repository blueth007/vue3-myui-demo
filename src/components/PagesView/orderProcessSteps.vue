<template>
    <div class="order-process-steps-container">
        <div class='progress'>
            <div class='progress_inner'>
                <div class='progress_inner__step' v-for="item, index in steps" :key="item.title">
                    <label :for="'step-' + (index + 1)" @click="activeIndex = index">
                        {{ item.title }}
                    </label>
                </div>
                <input :checked="activeIndex == index" :id="'step-' + (index + 1)" name='step' type='radio'
                    v-for="s, index in steps" :key="s.title">
                <div class='progress_inner__bar'></div>
                <div class='progress_inner__bar--set'></div>
                <div class='progress_inner__tabs'>
                    <transition name="fade">
                        <div class='tab' v-html="steps[activeIndex].content" :key="steps[activeIndex].title"> </div>
                    </transition>
                </div>
                <div class='progress_inner__status'>
                    <div class='box_base'></div>
                    <div class='box_lid'></div>
                    <div class='box_ribbon'></div>
                    <div class='box_bow'>
                        <div class='box_bow__left'></div>
                        <div class='box_bow__right'></div>
                    </div>
                    <div class='box_item'></div>
                    <div class='box_tag'></div>
                    <div class='box_string'></div>
                </div>
            </div>
        </div>
    </div>
</template>

<script setup lang="ts">

const activeIndex = ref(0)
const steps = reactive([
    {
        title: "Start order",
        content: ` <h1>Start order</h1>
        <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit. Mauris tortor ipsum, eleifend vitae massa non, dignissim finibus eros. Maecenas non eros tristique nisl maximus sollicitudin.</p>`
    }, {
        title: "Prepare gift",
        content: `<h1>Prepare gift</h1>
        <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit. Mauris tortor ipsum, eleifend vitae massa non, dignissim finibus eros. Maecenas non eros tristique nisl maximus sollicitudin.</p>`
    }, {
        title: "Pack gift",
        content: `<h1>Pack gift</h1>
        <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit. Mauris tortor ipsum, eleifend vitae massa non, dignissim finibus eros. Maecenas non eros tristique nisl maximus sollicitudin.</p>`
    }, {
        title: "Decorate box",
        content: `   <h1>Decorate box</h1>
        <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit. Mauris tortor ipsum, eleifend vitae massa non, dignissim finibus eros. Maecenas non eros tristique nisl maximus sollicitudin.</p>`
    }, {
        title: "Send gift",
        content: ` <h1>Send gift</h1>
        <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit. Mauris tortor ipsum, eleifend vitae massa non, dignissim finibus eros. Maecenas non eros tristique nisl maximus sollicitudin.</p>`
    }
])


</script>

<style scoped  lang="scss">
.order-process-steps-container {
    width: 100%;
    position: relative;
    font-family: "Nunito", sans-serif;
    background: #a6cde2;
    color: #2e6c8e;
    text-align: center;
    font-weight: 900;
    height: calc(100vh - var(--TopHeaderHeight));


    .fade-enter-active,
    .fade-leave-active {
        transition: all 0.5s cubic-bezier(1, 0.5, 0.8, 1);
    }

    .fade-enter,
    .fade-leave-to {
        opacity: 0;
        transform: translateY(-30px);
    }

    .progress_inner #step-1:checked+input+input+input+input+div+div+div+div>.box_base,
    .progress_inner #step-5:checked+div+div+div+div>.box_base,
    .progress_inner #step-4:checked+input+div+div+div+div>.box_base,
    .progress_inner #step-3:checked+input+input+div+div+div+div>.box_base,
    .progress_inner #step-2:checked+input+input+input+div+div+div+div>.box_base {
        top: 50%;
        left: 0px;
        opacity: 1;
    }

    .progress_inner #step-1:checked+input+input+input+input+div+div+div+div>.box_item,
    .progress_inner #step-5:checked+div+div+div+div>.box_item,
    .progress_inner #step-4:checked+input+div+div+div+div>.box_item,
    .progress_inner #step-3:checked+input+input+div+div+div+div>.box_item,
    .progress_inner #step-2:checked+input+input+input+div+div+div+div>.box_item {
        top: -30px;
        left: 0px;
        opacity: 0;
    }

    .progress_inner #step-2:checked+input+input+input+div+div+div+div>.box_lid,
    .progress_inner #step-5:checked+div+div+div+div>.box_lid,
    .progress_inner #step-4:checked+input+div+div+div+div>.box_lid {
        top: -20px;
        left: 0px;
        opacity: 0;
    }

    .progress_inner #step-2:checked+input+input+input+div+div+div+div>.box_item,
    .progress_inner #step-5:checked+div+div+div+div>.box_item,
    .progress_inner #step-4:checked+input+div+div+div+div>.box_item {
        top: -10px;
        left: 0px;
        opacity: 1;
    }

    .progress_inner #step-3:checked+input+input+div+div+div+div>.box_item,
    .progress_inner #step-5:checked+div+div+div+div>.box_item,
    .progress_inner #step-4:checked+input+div+div+div+div>.box_item {
        top: 10px;
        left: 0px;
        opacity: 1;
    }

    progress_inner #step-3:checked+input+input+div+div+div+div>.box_lid,
    .progress_inner #step-5:checked+div+div+div+div>.box_lid,
    .progress_inner #step-4:checked+input+div+div+div+div>.box_lid {
        top: -1px;
        left: 0px;
        opacity: 1;
    }

    .progress_inner #step-3:checked+input+input+div+div+div+div>.box_ribbon,
    .progress_inner #step-5:checked+div+div+div+div>.box_ribbon,
    .progress_inner #step-4:checked+input+div+div+div+div>.box_ribbon {
        top: 70%;
        left: 0px;
        opacity: 0;
    }

    .progress_inner #step-3:checked+input+input+div+div+div+div>.box_bow,
    .progress_inner #step-5:checked+div+div+div+div>.box_bow,
    .progress_inner #step-4:checked+input+div+div+div+div>.box_bow {
        top: 0px;
        left: 0px;
        opacity: 0;
    }

    .progress_inner #step-4:checked+input+div+div+div+div>.box_ribbon,
    .progress_inner #step-5:checked+div+div+div+div>.box_ribbon {
        top: 50%;
        left: 0px;
        opacity: 1;
    }

    .progress_inner #step-4:checked+input+div+div+div+div>.box_bow,
    .progress_inner #step-5:checked+div+div+div+div>.box_bow {
        top: -10px;
        left: 0px;
        opacity: 1;
    }

    .progress_inner #step-5:checked+div+div+div+div>.box_tag {
        top: 10px;
        left: 20px;
        opacity: 1;
    }

    .progress_inner #step-5:checked+div+div+div+div>.box_string {
        top: 10px;
        left: 20px;
        opacity: 1;
    }

    * {
        box-sizing: border-box;
    }

    .progress_inner__status .box_string,
    .progress_inner__status .box_tag,
    .progress_inner__status .box_bow__right,
    .progress_inner__status .box_bow__left,
    .progress_inner__status .box_bow,
    .progress_inner__status .box_ribbon,
    .progress_inner__status .box_item,
    .progress_inner__status .box_base,
    .progress_inner,
    .progress_inner__step:before {
        position: absolute;
        left: 0;
        right: 0;
        top: 50%;
        transform: translateY(-50%);
        margin: auto;
    }

    .progress_inner__bar--set,
    .progress_inner__bar {
        height: 6px;
        left: 10%;
        background: repeating-linear-gradient(45deg, #1ea4ec, #1ea4ec 4px, #1f8bc5 4px, #1f8bc5 10px);
        transition: width 800ms cubic-bezier(0.915, 0.015, 0.3, 1.005);
        border-radius: 6px;
        width: 0;
        position: relative;
        z-index: -1;
    }

    .progress_inner__step:before {
        width: 30px;
        height: 30px;
        color: #70afd0;
        background: white;
        line-height: 24px;
        border: 3px solid #a6cde2;
        font-size: 12px;
        top: 3px;
        border-radius: 100%;
        transition: all 0.4s;
        cursor: pointer;
        pointer-events: none;
    }

    .progress_inner__step {
        width: 20%;
        font-size: 14px;
        padding: 0 10px;
        transition: all 0.4s;
        float: left;
        text-align: center;
        position: relative;
    }

    .progress_inner__step label {
        padding-top: 50px;
        top: -20px;
        display: block;
        position: relative;
        cursor: pointer;
    }

    .progress_inner__step:hover {
        color: white;
    }

    .progress_inner__step:hover:before {
        color: white;
        background: #1ea4ec;
    }





    .progress_inner {
        height: 200px;
        width: 700px;
    }

    .progress_inner #step-5:checked+div {
        width: 80%;
    }


    .progress_inner #step-5:checked+div+div+div+div {
        right: 10%;
    }

    .progress_inner #step-4:checked+input+div {
        width: 60%;
    }



    .progress_inner #step-4:checked+input+div+div+div+div {
        right: 30%;
    }

    .progress_inner #step-3:checked+input+input+div {
        width: 40%;
    }



    .progress_inner #step-3:checked+input+input+div+div+div+div {
        right: 50%;
    }

    .progress_inner #step-2:checked+input+input+input+div {
        width: 20%;
    }


    .progress_inner #step-2:checked+input+input+input+div+div+div+div {
        right: 70%;
    }

    .progress_inner #step-1:checked+input+input+input+input+div {
        width: 0%;
    }



    .progress_inner #step-1:checked+input+input+input+input+div+div+div+div {
        right: 90%;
    }

    .progress_inner__step:nth-of-type(1):before {
        content: "1";
    }

    .progress_inner__step:nth-of-type(2):before {
        content: "2";
    }

    .progress_inner__step:nth-of-type(3):before {
        content: "3";
    }

    .progress_inner__step:nth-of-type(4):before {
        content: "4";
    }

    .progress_inner__step:nth-of-type(5):before {
        content: "5";
    }

    .progress_inner__bar--set {
        width: 80%;
        top: -6px;
        background: #70afd0;
        position: relative;
        z-index: -2;
    }

    .progress_inner__tabs .tab {

        position: absolute;
        top: 0px;
        text-align: center;
        margin-top: 80px;
        box-shadow: 0px 2px 1px #80b7d5;
        padding: 30px;
        background: white;
        border-radius: 10px;
        transition: all 0.5s;
    }

    .progress_inner__tabs .tab h1 {
        margin: 0;
    }

    .progress_inner__tabs .tab p {
        font-weight: 400;
        opacity: 0.8;
    }

    .progress_inner__status {
        width: 40px;
        height: 40px;
        top: -80px;
        transition: right 800ms cubic-bezier(0.915, 0.015, 0.3, 1.005);
        transform: translateX(50%);
        position: absolute;
    }

    .progress_inner__status div {
        opacity: 0;
        transition: all 600ms cubic-bezier(0.915, 0.015, 0.3, 1.005);
        transition-delay: 300ms;
    }

    .progress_inner__status div {
        position: absolute;
    }

    .progress_inner__status .box_base {
        background: repeating-linear-gradient(45deg, #986c5d, #986c5d 2px, #775144 2px, #775144 4px);
        width: 36px;
        height: 40px;
        z-index: 1;
        border-radius: 1px;
    }

    .progress_inner__status .box_lid {
        width: 40px;
        height: 13.3333333333px;
        background: #775144;
        z-index: 2;
        border-radius: 1px;
        top: 0;
    }

    .progress_inner__status .box_item {
        width: 20px;
        height: 20px;
        background: #be69d2;
        z-index: 0;
        border-radius: 4px;
        transform: rotate(45deg);
    }

    .progress_inner__status .box_ribbon {
        width: 10px;
        height: 42px;
        background: #ee0f29;
        z-index: 4;
        border-radius: 1px;
    }

    .progress_inner__status .box_bow__right,
    .progress_inner__status .box_bow__left {
        width: 6px;
        height: 10px;
        background: #be0c21;
        position: absolute;
        z-index: 3;
        opacity: 1;
        border-radius: 1px;
    }

    .progress_inner__status .box_bow {
        top: -6px;
        z-index: 1;
        transition-delay: 500ms;
    }

    .progress_inner__status .box_bow__left {
        left: 6px;
        transform: rotate(45deg);
    }

    .progress_inner__status .box_bow__right {
        left: -4px;
        transform: rotate(-45deg);
    }

    .progress_inner__status .box_tag {
        width: 20px;
        height: 10px;
        background: #487ac7;
        z-index: 4;
        transform: rotate(-10deg) translateX(-40px) translateY(0px);
        border-radius: 2px;
        transition-delay: 500ms;
    }

    .progress_inner__status .box_string {
        width: 17px;
        height: 2px;
        background: #343434;
        z-index: 4;
        transform: rotate(-39deg) translateX(-22px) translateY(-12px);
    }

    .progress_inner input[type=radio] {
        display: none;
    }
}
</style>