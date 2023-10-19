<template>
    <div class="alarm-clock-container">
        <div class="container" :style="{ 'background-color': data.ampm === 'PM' ? '#152736' : 'skyblue' }">
            <div className="alarm">
                <div className="readout">
                    <span>{{ data.hour }}</span><span>:</span><span>{{ data.minute }}</span>&nbsp;
                    <span @click="setAmPm($event)" :style="{ ...ampmStyles }">
                        {{ data.ampm }}
                    </span>
                </div>
                <div className="sliders">
                    <input @change="changeHour($event)" type="range" min="1" max="12" :value="data.hour" />
                    <input @change="changeMinute($event)" type="range" max="59" :value="data.minute" />
                    <input @change="setAmPm($event)" type="range" max="1" :value="data.ampmIndex" />
                </div>
            </div>
        </div>
    </div>
</template>

<script setup lang="ts">

const data = reactive({
    hour: "01",
    minute: "00",
    ampmIndex: 0,
    ampm: "AM"
})

const ampmStyles = computed(() => {
    return {
        cursor: "pointer",
        color: data.ampm === "PM" ? "steelblue" : "yellow",
        transition: "all .3s ease-in"
    }
})
const setAmPm = (e: Event) => {
    const val = (e.target as HTMLInputElement).value
    if (val === "1") {
        data.ampm = "PM",
            data.ampmIndex = 1
    } else if (val === "0") {
        data.ampm = "AM",
            data.ampmIndex = 0
    }
}
const changeHour = (e: Event) => {
    const val = (e.target as HTMLInputElement).value
    if (val === "0") {
        data.hour = "00"
    } else if (parseInt(val) < 10) {
        data.hour = "0" + val
    } else {
        data.hour = val
    }
}
const changeMinute = (e: Event) => {
    const val = (e.target as HTMLInputElement).value
    if (val === "0") {
        data.minute = "00"
    } else if (parseInt(val) < 10) {
        data.minute = "0" + val
    } else {
        data.minute = val
    }
}
</script>

<style scoped lang="scss">
.alarm-clock-container {
    width: 100%;
    height: calc(100vh - var(--TopHeaderHeight));
    position: relative;
    overflow: hidden;

    .container {
        cursor: pointer;
        font-family: "Roboto";
        background: #333;
        display: flex;
        justify-content: center;
        align-items: center;
        height: 100vh;
        flex-direction: column;
        transition: "all .3s ease-in"
    }

    .alarm {
        display: flex;
        flex-direction: column;
        align-items: center;
        width: 400px;
    }

    input {
        width: 200px;
        margin-top: 55px;
    }

    input[type="range"] {
        appearance: none;
        width: 130px;
        height: 2px;
        background: #fff;
        outline: none;
        border: 0;
        border-radius: 20px;
        cursor: pointer;
    }

    input[type='range']::-webkit-slider-thumb {
        transition: all 0.1s ease-in;
        appearance: none;
        background: #fff;
        height: 20px;
        width: 20px;
        border-radius: 20px;

        &:active {
            background: dodgerblue;
        }
    }


    .sliders {
        transform: rotate(-90deg);
        width: 235px;
        margin-top: -70px;
        margin-left: -62px;
    }

    span {
        font-size: 2.8em;
        color: white;
    }
}
</style>