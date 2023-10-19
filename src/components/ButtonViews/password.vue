<template>
    <div class="password-strong-container">
        <div class="form-container">
            <form class="form-1" action="">
                <label>Enter password
                    <input class="input-1" type="password" @input="handleChange1($event)" v-model="password1"
                        placeholder="&#8226;&#8226;&#8226;&#8226;&#8226;&#8226;">
                </label>
                <div class="progress-bar_wrap">
                    <div class="progress-bar_item progress-bar_item" :class="checkPassword(password1) > 0 ? 'active' : ''">
                    </div>
                    <div class="progress-bar_item progress-bar_item" :class="checkPassword(password1) > 4 ? 'active' : ''">
                    </div>
                    <div class="progress-bar_item progress-bar_item" :class="checkPassword(password1) > 7 ? 'active' : ''">
                    </div>
                </div>
                <span class="progress-bar_text">
                    {{ checkPassword(password1) == 0 ? 'Password is blank' : (checkPassword(password1) < 5
                        ? 'Password is weak' : (checkPassword(password1) < 8 ? 'Could be stronger' : 'Password is strong'))
                    }} </span>
            </form>
        </div>

        <div class="form-container">
            <form class="form-2" action="">
                <label>Enter password
                    <input class="input-2" type="password" @input="handleChange2($event)" v-model="password2"
                        placeholder="&#8226;&#8226;&#8226;&#8226;&#8226;&#8226;">
                </label>
                <div class="progress-bar_wrap">
                    <div class="progress-bar_item progress-bar_item" :class="checkPassword(password2) > 0 ? 'active' : ''">
                    </div>
                    <div class="progress-bar_item progress-bar_item" :class="checkPassword(password2) > 4 ? 'active' : ''">
                    </div>
                    <div class="progress-bar_item progress-bar_item" :class="checkPassword(password2) > 7 ? 'active' : ''">
                    </div>
                </div>
                <span class="progress-bar_text">
                    {{ checkPassword(password2) == 0 ? 'Password is blank' : (checkPassword(password2) < 5
                        ? 'Password is weak' : (checkPassword(password2) < 8 ? 'Could be stronger' : 'Password is strong'))
                    }} </span>
            </form>
        </div>

        <div class="form-container">
            <form class="form-3" action="">
                <label>Enter password
                    <input class="input-3" type="password" v-model="password3" @input="handleChange3($event)"
                        placeholder="&#8226;&#8226;&#8226;&#8226;&#8226;&#8226;">
                </label>
                <span class="progress-bar_text">Password is blank</span>
            </form>
        </div>

        <div class="form-container">
            <form class="form-4" action="">
                <label>Enter password
                    <input class="input-4" type="password" @input="handleChange4($event)" v-model="password4"
                        placeholder="&#8226;&#8226;&#8226;&#8226;&#8226;&#8226;">
                </label>
                <span class="progress-bar_text">Password is blank</span>
            </form>
        </div>

    </div>
</template>

<script setup lang="ts">
import { ref } from 'vue';
const password1 = ref('');
const password2 = ref('');
const password3 = ref('');
const password4 = ref('');
const tipColor = ref('transparent');
const handleChange1 = (e: Event) => {
    const target = e.target as HTMLInputElement;
    console.log("target:", target.value, password1.value)
    let len = checkPassword(password1.value);
    if (len < 5) {
        tipColor.value = "#FF4B47";
    } else if (len < 8) {
        tipColor.value = "#F9AE35";
    } else {
        tipColor.value = "#2DAF7D";
    }
    // changeText(el, el.value, 'green');
};
const handleChange2 = (e: Event) => {
    const target = e.target as HTMLInputElement;
    console.log("target:", target.value)
    let len = checkPassword(password2.value);
    if (len < 5) {
        tipColor.value = "#FF4B47";
    } else if (len < 8) {
        tipColor.value = "#F9AE35";
    } else {
        tipColor.value = "#2DAF7D";
    }
    // changeText(el, el.value, 'green');
};
const handleChange3 = (e: Event) => {
    const target = e.target as HTMLInputElement;
    console.log("target:", target.value,)
    let len = checkPassword(password3.value);
    const elText = (target.closest("form") as HTMLElement).getElementsByClassName("progress-bar_text")[0] as HTMLElement;
    if (len < 5) {
        changeText(elText, "Too weak", "#FF4B47")
        target.style.borderBottomColor = "#FF4B47"
    } else if (len < 8) {
        changeText(elText, "Could be stronger", "#F9AE35")
        target.style.borderBottomColor = "#F9AE35"
    } else {
        changeText(elText, "Strong password", "#2DAF7D")
        target.style.borderBottomColor = "#2DAF7D"
    }
    // changeText(el, el.value, 'green');
};
const handleChange4 = (e: Event) => {
    const target = e.target as HTMLInputElement;
    console.log("target:", target.value,)
    let len = checkPassword(password4.value);
    const elText = (target.closest("form") as HTMLElement).getElementsByClassName("progress-bar_text")[0] as HTMLElement;
    if (len < 5) {
        changeText(elText, "Too weak", "#FF4B47")
        target.style.borderColor = "#FF4B47"
    } else if (len < 8) {
        changeText(elText, "Could be stronger", "#F9AE35")
        target.style.borderColor = "#F9AE35"
    } else {
        changeText(elText, "Strong password", "#2DAF7D")
        target.style.borderColor = "#2DAF7D"
    }
};

const checkPassword = (pass: string) => {
    //sample check
    return pass.length
}

const changeText = function (el: HTMLElement, text: string, color: string) {
    el.innerHTML = text;
    el.style.color = color
};
</script>

<style scoped lang="scss">
.password-strong-container {
    width: 100%;
    min-height: calc(100vh - var(--TopHeaderHeight));
    position: relative;
    border-color: #ccc;

    >div:first-child {
        margin-top: 0;
    }

    .form-container {
        display: block;
        width: 500px;
        margin: 50px auto;
        text-align: left;
    }

    label {
        display: block;
        position: relative;
        text-transform: uppercase;
        color: #aaa;
    }

    input[type='password'] {
        width: 100%;
        box-sizing: border-box;
        height: 55px;
        display: inline-block;
        border: 3px solid #2F96EF;
        border-radius: 5px;
        padding: 0 15px;
        margin: 10px 0;
        transition: .2s;
    }

    input[type='password']:focus {
        outline: none;
        -moz-outline: none;
        -webkit-outline: none;
    }

    label:before {
        content: "\f070";
        color: #aaa;
        font-size: 22px;
        font-family: FontAwesome;
        position: absolute;
        right: 25px;
        top: 44px;
    }

    .progress-bar_wrap {
        width: 300px;
        height: 5px;
        background: #F6F6FA;
        display: inline-block;
        vertical-align: middle;
        overflow: hidden;
        border-radius: 5px;
    }



    .form-1 .progress-bar_item {
        display: inline-block;
        height: 100%;
        width: 33.33%;
        float: left;
        visibility: hidden;
        transition: background-color .2s, visisility .1s;
    }

    .form-1 .active {
        visibility: visible;
    }

    .progress-bar_item-1 {}

    .progress-bar_item-2 {}

    .progress-bar_item-3 {}

    .progress-bar_text {
        display: inline-block;
        color: #aaa;
        margin-left: 5px;
        transition: .2s;
    }

    .form-2 .progress-bar_item {
        display: inline-block;
        height: 100%;
        width: 32.5%;
        margin-right: .8%;
        border-radius: 5px;
        float: left;
        transition: background-color .2s, visibility .1s;
    }

    .form-1 .progress-bar_item.active {
        background-color: v-bind(tipColor);
    }

    .form-2 .progress-bar_item.active {
        background-color: v-bind(tipColor);
    }
}
</style>