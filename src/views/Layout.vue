<template>
    <div class="layout-main  container  ">
        <div class="columns">
            <div class="left-menu column   is-narrow">
                <div class=" " style="width: 240px;">
                    <aside class="menu">
                        <ul class="menu-list">
                            <MenuItem v-for="item in menus" :key="item.path" :item="item" />
                        </ul>
                    </aside>

                </div>
            </div>
            <div class="right-content column content">
                <div class="notification  ">
                    <button class="bulma-hamburger-mixin">
                        <span></span>
                        <span></span>
                        <span></span>
                    </button>
                    <router-view v-slot="{ Component, route }">
                        <transition name="fade-transform" mode="out-in">
                            <keep-alive>
                                <component :is="Component" :key="route.path" />
                            </keep-alive>
                        </transition>
                    </router-view>
                </div>
            </div>
        </div>
    </div>
</template>

<script setup lang="ts">

import { computed } from "vue";
import { useRouter } from "vue-router";
import MenuItem from "./HomePage/MenuItem.vue";


const $router = useRouter();
console.log($router.getRoutes());

const menus = computed(() => {

    return $router.getRoutes().filter(item => item.redirect).map(item => {

        if (item.children.length == 1) {
            const temp = item.children[0]
            temp.path = item.path + temp.path
            return temp
        }
        return item

    })

}) 
</script>

<style scoped lang="scss">
.left-menu,
.right-content {
    min-height: 100vh;

    >div:first-child {
        height: 100%;
    }
}

/* fade */
.fade-enter-active,
.fade-leave-active {
    transition: opacity 0.28s;
}

.fade-enter,
.fade-leave-active {
    opacity: 0;
}

/* fade-transform */
.fade-transform-leave-active,
.fade-transform-enter-active {
    transition: all 0.5s;
}

.fade-transform-enter {
    opacity: 0;
    transform: translateX(-30px);
}

.fade-transform-leave-to {
    opacity: 0;
    transform: translateX(30px);
}

.notification {
    padding: 0;
}
</style>