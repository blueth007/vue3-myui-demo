<template>
    <Icon v-bind="props" />
</template>

<script setup lang="ts">
const props = defineProps({
    icon: {
        type: String,
        default: "",
        required: true
    },
    color: String,
    with: String,
    height: String,
    rotate: Number,
    horizontalFlip: Boolean,
    verticalFlip: Boolean
})
import { Icon } from '@iconify/vue';

</script>

<style scoped></style>