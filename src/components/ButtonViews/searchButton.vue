<template>
    <div class="search-button-container">
        <form id="singular-form" :class="{ 'toggle': toggle }">
            <button class=" shown  " type="button" @click="toggle = !toggle">搜索</button>
            <div id="input-container">
                <input type="text" placeholder="输入搜索内容...." v-model.trim="searchValue">
                <button type="button" @click="handleSend">Send</button>
            </div>
        </form>
    </div>
</template>

<script setup lang="ts">

const toggle = ref(false)
const searchValue = ref('')
onMounted(() => {
    window.addEventListener('click', (event: Event) => {
        // console.log("click:", (event.target as HTMLElement).closest('#singular-form'))
        if (!(event.target as HTMLElement).closest('#singular-form')) {
            toggle.value = false
        }
    })
})
const handleSend = () => {
    if (searchValue.value !== '') {
        console.log("send", searchValue.value)
        toggle.value = false
        searchValue.value = ''
    }
}
</script>

<style scoped lang="scss">
.search-button-container {
    --main-color: white;
    --accent-color: dodgerblue;

    width: 100%;
    height: 200px;
    margin: 0 auto;
    background-color: var(--accent-color);
    padding: 20px 0;

    #singular-form {
        position: relative;
        width: 18rem;
        height: 5rem;
        margin: 0 auto;
        padding: 10px;
        background-color: var(--main-color);
        text-align: center;
        border-radius: 3rem;
        overflow: hidden;
        transition: width .4s cubic-bezier(0.68, -0.55, 0.27, 1.55);
        border: none;

        button,
        #input-container {
            position: absolute;
            top: 0;
            left: 0;
            bottom: 0;
            right: 0;
            transform: scale(0);
            opacity: 0;
        }

        button,
        input {
            font-size: 2rem;
            font-family: 'Montserrat', sans-serif;
            font-weight: bold;
            border: none;
        }

        #input-container {

            z-index: 2;

            input {
                display: inline-block;
                height: 100%;
                width: 100%;
                background-color: var(--main-color);
                box-sizing: border-box;
                border: none;
                outline: none;
                padding: 0 26% 0 1.5rem;
                opacity: 0;
                transform: scale(0);
                transition: all .4s ease .4s;
            }
        }

        button.shown {
            padding: 0;
            width: 100%;
            color: var(--accent-color);
            background-color: transparent;
            z-index: 3;
            transform: scale(1);
            opacity: 1;
            z-index: 3;
        }

    }

    #singular-form.toggle {
        width: 37rem;



        #input-container,
        button,
        #input-container input {
            transform: scale(1);
            opacity: 1;

        }

        button.shown {
            transform: scale(0);
            opacity: 0;
        }

        #input-container button {
            width: 9rem;
            padding: 0;
            border: none;
            outline: none;
            border-radius: 3rem;
            cursor: pointer;
            position: absolute;
            top: 10px;
            right: 10px;
            bottom: 10px;
            left: auto;

            background-color: var(--accent-color);
            color: var(--main-color);


        }
    }

}
</style>