<template>
    <div class="rang-slider-container">
        <h2>CodePen Home Custom range input slider with labels</h2>
        <div class="range">
            <input type="range" min="1" :max="Days.length" steps="1" :value="activeIndex">
        </div>

        <ul class="range-labels">
            <li v-for="ele, i in Days" :key="i" @click="activeIndex = i + 1"
                :class="{ active: activeIndex == i + 1, 'selected': i <= activeIndex - 1 }">
                {{ ele == 1 ? "Today" : (ele + " Days") }}
            </li>
        </ul>
    </div>
</template>

<script setup lang="ts">

const activeIndex = ref(2)
const Days = reactive([1, 2, 3, 4, 5, 6, 7])

const segment = computed(() => Days.length - 1)

const len = computed(() => {
    return (100 / (Days.length - 1)) * (activeIndex.value - 1) + '%'
})

</script>

<style scoped lang="scss">
.rang-slider-container {
    width: 100%;
    height: calc(100vh - var(--TopHeaderHeight));
    position: relative;
    overflow: hidden;
    padding: 80px;

    $widthSlider: 550px;

    h2 {
        text-align: center;
        margin-bottom: 50px;
    }

    @mixin rangeThumb {
        width: 18px;
        height: 18px;
        margin: -8px 0 0;
        border-radius: 50%;
        background: #37adbf;
        cursor: pointer;
        border: 0 !important;
    }

    @mixin rangeTrack {
        width: 100%;
        height: 2px;
        cursor: pointer;
        background: #b2b2b2;
    }

    .range {
        position: relative;
        width: $widthSlider;
        height: 5px;

        background: linear-gradient(to right, #37adbf 0%, #37adbf v-bind(len), #fff v-bind(len), #fff 100%);

        input {
            width: 100%;
            position: absolute;
            top: 2px;
            height: 0;
            -webkit-appearance: none;

            // Thumb
            &::-webkit-slider-thumb {
                -webkit-appearance: none; // needed again for Chrome & Safari
                @include rangeThumb;
            }

            &::-moz-range-thumb {
                @include rangeThumb;
            }

            &::-ms-thumb {
                @include rangeThumb;
            }

            // Track
            &::-webkit-slider-runnable-track {
                @include rangeTrack;
            }

            &::-moz-range-track {
                @include rangeTrack;
            }

            &::-ms-track {
                @include rangeTrack;
            }

            &:focus {
                // override outline/background on focus
                background: none;
                outline: none;
            }

            &::-ms-track {
                // A little somethin' somethin' for IE
                width: 100%;
                cursor: pointer;
                background: transparent;
                border-color: transparent;
                color: transparent;
            }
        }
    }



    .range input::-webkit-slider-runnable-track {
        background: linear-gradient(to right, #37adbf 0%, #37adbf v-bind(len), #b2b2b2 v-bind(len), #b2b2b2 100%)
    }



    .range input::-moz-range-track {
        background: linear-gradient(to right, #37adbf 0%, #37adbf v-bind(len), #b2b2b2 v-bind(len), #b2b2b2 100%)
    }


    .range input::-ms-track {
        background: linear-gradient(to right, #37adbf 0%, #37adbf v-bind(len), #b2b2b2 v-bind(len), #b2b2b2 100%)
    }

    // Labels below slider
    .range-labels {
        margin: 18px -41px 0;
        padding: 0;
        list-style: none;

        li {
            position: relative;
            float: left;
            width: calc(($widthSlider - 8.5px) / v-bind(segment));
            text-align: center;
            color: #b2b2b2;
            font-size: 14px;
            cursor: pointer;

            &::before {
                position: absolute;
                top: -25px;
                // right: 0;
                left: 41px;
                content: "";
                margin: 0 auto;
                width: 9px;
                height: 9px;
                background: #b2b2b2;
                border-radius: 50%;
            }
        }

        .active {
            color: #37adbf;
        }

        .selected::before {
            background: #37adbf;
        }

        .active.selected::before {
            display: none;
        }
    }

}
</style>