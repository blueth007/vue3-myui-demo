<template>
    <li>
        <header class="card-header">
            <a class="card-header-title icon-text" v-if="props.item.redirect" @click="isOpenChild = !isOpenChild"
                :class="$route.path == hrefUrl ? 'is-active' : ''">
                <span class="icon" v-if="item.meta?.icon">
                    <Icon :icon="item.meta.icon" color="#00A8FF" />
                </span>
                <span> {{ item.name }} </span>
            </a>
            <a class="card-header-title icon-text" :href="'#' + hrefUrl" v-else
                :class="$route.path == hrefUrl ? 'is-active' : ''">
                <span class="icon" v-if="item.meta?.icon">
                    <Icon :icon="item.meta.icon" color="#00A8FF" />
                </span>
                <span> {{ item.name }} </span>
            </a>

            <button class="card-header-icon  right-icon" aria-label="more options" v-if="item.children">
                <span class="bulma-arrow-mixin" :class="isOpenChild ? 'turn-up' : 'turn-down'"></span>
            </button>
        </header>
        <div class="card-header-content item-children-content" v-show="isOpenChild">
            <MenuItem v-for="(it, index ) in item.children" :key="it.path + index" :item="it" :basePath="item.path">
            </MenuItem>
        </div>
    </li>
</template>

<script setup lang="ts">
import { computed, ref } from 'vue';
import { useRoute } from 'vue-router';

const $route = useRoute();
const props = defineProps({
    item: {
        type: Object,
        default: {}
    },
    basePath: {
        type: String,
        default: ""
    }
})

const isOpenChild = ref(false)
const hrefUrl = computed(() => {
    // console.log("basePath:", props.basePath, "itemPath", props.item)
    return (props.basePath + "/" + props.item.path).replace(/(\/+)/g, "/")
})
onMounted(() => {
    document.title = props.item.meta.title
    // console.log("route.path:", $route.path, "Href,:", props.item)
    if ($route.path.split("/")[1] == hrefUrl.value.split("/")[1]) {
        isOpenChild.value = true
    } else {
        isOpenChild.value = false
    }
})
</script>

<style scoped lang="scss">
li {
    position: relative;
}

.card-header {
    box-shadow: none;

    .icon {
        vertical-align: bottom;
        transition: 0.3s;
    }



    .card-header-title {
        white-space: nowrap;
        text-overflow: ellipsis;
        overflow: hidden;
    }
}

.turn-up {
    transform: rotate(135deg);
    top: calc(50% + 3px);
    transition: 0.2s;
}

.turn-down {
    transition: 0.2s;
}

.right-icon {
    position: absolute;
    right: 0;
    top: 6px;
    cursor: pointer;

}

.item-children-content {
    margin-left: 35px;
}
</style>