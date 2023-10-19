<template>
    <div class="nav-ajax-sites-container">
        <div id="main-nav">
            <ul id="nav-holder">
                <TransitionGroup name="fade" tag="div">
                    <li class="nav-item" v-for="item, index in titles" :key="item.title + index"
                        @click="handleClickItem(item, $event)" :style="{ backgroundColor: item.backgroundColor }">
                        <a :href="item.link">
                            <Icon :icon="item.icon">{{ item.title }}</Icon>
                        </a>
                    </li>
                </TransitionGroup>
            </ul>
        </div>
        <div id="header" class="animate hidden" :style="{ backgroundColor: navBackgroundColor }">
            <div id="h-inner" class="animate">
                <h1>Page title</h1>
            </div>
        </div>
    </div>
</template>

<script setup lang="ts">

const navBackgroundColor = ref("red")
const titles = reactive([
    {
        title: "Home",
        icon: "mdi:home",
        link: "javascript:void(0)",
        backgroundColor: "#5fb3f9",
    },
    {
        title: "Home1",
        icon: "mdi:home",
        link: "javascript:void(0)",
        backgroundColor: "#60ead3",
    },
    {
        title: "Home2",
        icon: "mdi:home",
        link: "javascript:void(0)",
        backgroundColor: "#fda660",
    },
    {
        title: "Home3",
        icon: "mdi:home",
        link: "javascript:void(0)",
        backgroundColor: "#fd7b87",
    }
])
const handleClickItem = (item: any, event: Event) => {
    console.log("Item:", item)

    const $header = document.getElementById("header");
    $header?.classList.remove("show")
    $header?.classList.add("hide");
    const elm = (event.target as HTMLElement).closest("li");
    elm?.classList.add('active')
    const pare = elm?.closest("ul")
    setTimeout(() => {
        elm && pare?.insertBefore(elm, pare?.childNodes[0])
        elm?.classList.remove('active')
        $header?.classList.remove("hide")
        $header?.classList.add("show");
        navBackgroundColor.value = item.backgroundColor;
    }, 800)
}
</script>

<style scoped lang="scss">
.nav-ajax-sites-container {
    width: 100%;
    height: calc(100vh - var(--TopHeaderHeight));
    position: relative;
    overflow: hidden;
    background-color: #f1f4f5;
    font: 14px/28px 'Open Sans', sans-serif;

    #header {
        position: relative;
        width: 100%;
        display: block;
        text-align: center;
        z-index: 0;
        height: 150px;

        &.hide {
            left: -100%;
        }
    }

    #h-inner {
        width: 100%;
        height: 100%;
        color: #fff;
        line-height: 150px;
        font-size: 20px;
    }

    .show {
        left: 0;
    }



    #main-nav {
        float: left;
        z-index: 2;
    }

    #nav-holder {
        position: relative;
    }

    .nav-item {
        width: 150px;
        height: 150px;
        background-color: orange;
        display: block;
        text-align: center;
        line-height: 150px;
        z-index: 2;
        cursor: pointer;

        // transition: opacity 0.8s ease-in-out, width 0.8s ease-in-out, height 0.8s ease-in-out;
        animation: fadeIn 0.8s ease-in-out;

        @keyframes fadeIn {
            from {
                width: 0;
                height: 0;
                opacity: 0;
            }

            to {

                opacity: 1;
            }
        }
    }

    .nav-item a:hover i {
        -webkit-transition: all .4s ease-in-out;
        -moz-transition: all .4s ease-in-out;
        -o-transition: all .4s ease-in-out;
        transition: all .4s ease-in-out;
        -webkit-transform: rotate(360deg);
        transform: rotate(360deg);
    }

    .nav-item {
        a {
            text-decoration: none;
            color: #fff;
            width: 100%;
            height: 100%;
            display: block;
            font-size: 34px;
        }

        &.active {

            animation: fadeOut 0.8s ease-in-out forwards;

        }

        @keyframes fadeOut {
            from {
                opacity: 1;
            }

            to {
                width: 0;
                height: 0;
                opacity: 0;
            }

        }
    }

    .nav-item i {
        font-size: 30px;
    }

    .animate {
        -webkit-transition: all .8s ease-in-out;
        -moz-transition: all .8s ease-in-out;
        -o-transition: all .8s ease-in-out;
        transition: all .8s ease-in-out;
    }

    .cred {
        color: #969696;
        font-size: 7pt;
        text-align: center;
        margin-top: 20px;
        text-decoration: none;
        width: 100%;
        display: block;
    }

    .fade-enter-active,
    .fade-leave-active {
        transition: all 0.8s ease-in-out;
    }

    .fade-enter-from,
    .fade-leave-to {
        width: 0;
        height: 0;
        opacity: 0;
    }
}
</style>