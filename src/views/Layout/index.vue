<template>
    <div class="layout-main  container ">
        <div class="columns">
            <div class="left-menu column is-narrow" :class="{ toggle: toggle }">

                <aside class="menu">
                    <ul class="menu-list">
                        <MenuItem v-for="item in menus" :key="item.path" :item="item" />
                    </ul>
                </aside>

            </div>
            <div class="right-content column ">
                <div class="content-main">
                    <button class="bulma-hamburger-mixin" @click="toggleMenu">
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
import MenuItem from "./MenuItem.vue";
// import routes from "@/router";
const $router = useRouter();

const toggle = ref(false)
const menus = computed(() => {

    // console.log("Routes:", $router.getRoutes())
    return $router.getRoutes().filter(item => item.redirect).map(item => {

        if (item.children.length == 1) {
            const temp = item.children[0]
            temp.path = item.path + "/" + temp.path
            return temp
        }
        return item

    })

})
const toggleMenu = () => {
    toggle.value = !toggle.value
}
</script>

<style scoped lang="scss">
.columns {
    position: relative;
}


.right-content {
    min-height: 100vh;
    position: relative;
    margin-left: 240px;

    >div:first-child {
        height: 100%;
    }
}

.left-menu {
    position: fixed;
    height: 100%;
    overflow-y: auto;
    width: 240px;
    background-color: #11cc2e26;
    transition: all 0.3s;

    &::-webkit-scrollbar {
        display: none;
    }

    &::-ms-scrollbar {
        width: 0;
    }
}

.left-menu.toggle {
    width: 70px;
    transition: 0.3s;
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

.content-main {
    padding: 0;
}

.toggle {
    :deep(a span.icon+span) {
        display: none;
    }

    :deep(button.right-icon) {
        display: none;
        opacity: 0;
    }

    :deep(.card-header .card-header-title) {
        text-overflow: initial;
    }

    :deep(.card-header .icon) {
        font-size: 24px;
    }

    :deep(.item-children-content) {
        position: fixed;
        z-index: 1;
    }
}

.toggle+.right-content {
    margin-left: 70px;
    transition: all 0.3s;

}
</style>