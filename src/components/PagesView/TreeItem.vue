<template>
    <li v-if="item" :class="item.type == 'folder' ? 'folder' : ''">
        <span class="pointer" v-if="item.type == 'folder'" @click="toggleTree">{{ item.title }}</span>
        <span v-else> {{ item.title }}</span>
        <Transition name="slide">
            <div v-show="isToggle">
                <ul v-if="item.children && (item.children.length > 0)">
                    <TreeItem v-for="it in item.children" :key="it.title" :item="it" />
                </ul>
            </div>
        </Transition>
    </li>
</template>

<script setup lang="ts">
import type { PropType } from 'vue'

interface TreeMenu {
    type: string,
    title: string,
    children?: TreeMenu[]
}
const isToggle = ref(true)
defineProps({
    item: {
        type: Object as PropType<TreeMenu>,
        require: true
    }
})

const toggleTree = () => {
    isToggle.value = !isToggle.value
}

</script>

<style scoped lang="scss">
.pointer {
    cursor: pointer;
}

.slide-enter-active {
    animation: scale-up-ver-top 0.4s cubic-bezier(0.390, 0.575, 0.565, 1.000) both
}

.slide-leave-active {
    animation: scale-up-ver-top 0.4s cubic-bezier(0.390, 0.575, 0.565, 1.000) reverse;
}

.scale-up-ver-top {
    transition: all 200ms linear;
    will-change: opacity, max-height;
    -webkit-animation: scale-up-ver-top 0.4s cubic-bezier(0.390, 0.575, 0.565, 1.000) both;
    animation: scale-up-ver-top 0.4s cubic-bezier(0.390, 0.575, 0.565, 1.000) both;
}

@-webkit-keyframes scale-up-ver-top {
    0% {
        opacity: 0;
        max-height: 0;
    }

    100% {
        opacity: 1;
        max-height: 9em;

    }
}

@keyframes scale-up-ver-top {
    0% {
        opacity: 0;
        max-height: 0;
    }

    100% {
        opacity: 1;
        max-height: 9em;

    }
}
</style>