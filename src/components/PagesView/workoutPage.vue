<template>
    <div class="workout-wrapper">
        <h1>30-Day Workout Challenge</h1>
        <div class="workout-main">
            <div class="workout-question">
                <div class="workout-day" v-if="!isAllWorkout && activeDay?.videos.length != 0">
                    <p>Did you complete the workout today? </p><a class="button js-did-workout" @click="handleDid">Yes, I
                        did!</a><a class="button button--white js-no-workout" @click="handleNot">Oh No</a>
                </div>
                <div class="rest-day" v-else="!isAllWorkout&&activeDay.videos.length==0">
                    <p>A gift from the heavens! It's a rest day today.</p><a class="button js-did-workout"
                        @click="handleDid">Woohoo!</a>
                </div>
                <div class="amazing-day" v-if="isAllWorkout">!isAllWorkout&&
                    <p>You did it! 🎉🎉🎉 It only took you <span class="js-day-count">30</span> days.</p>
                </div>
            </div>
            <div class="schedule-list js-schedule-list">
                <div class="day-item" :data-status="item.isWorkout" v-for="item in workDays" :key="item.day">
                    <div class="workout__info" :class="item.videos.length == 0 ? 'workout__rest' : ''">{{ item.videos.length
                        == 0 ? "REST" : (item.videos.length == 1 ? `${item.videos.length}
                        VIDEO`: `${item.videos.length} VIDEOS`) }} </div>
                    <div class="workout__links">
                        <a :href="v.link" target="_blank" v-for="v  in item.videos" :key="v.link">
                            <img :src="'https://s3-us-west-2.amazonaws.com/s.cdpn.io/567707/' + v.image" alt="" srcset="">
                        </a>
                    </div>
                </div>
            </div>
        </div>
        <div class="workout-aside">
            <p>At this rate, you will complete the challenge in <span class="large"><span class="js-day-count">30</span>
                    days</span></p>
        </div>
        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 437.79 269.44">
            <path class="cls-1"
                d="M388.02 228.31l-124.14-.43v-.04l-10.41.02-10.42-.02v.04l-193.28.43L0 269.44H437.79l-49.77-41.13z"></path>
            <path class="cls-2" d="M56.6 35.79s-21.36 2.3-26.11 17.51 14.39 36 33.78 21.3z"></path>
            <path class="cls-3" d="M78.33 89.6l20.03 17.82 16.97-16.11L82.3 67.89 78.33 89.6z"></path>
            <path class="cls-4" d="M87.9 98.11l-3.23-20.07-3.8 13.82 7.03 6.25z"></path>
            <path class="cls-3"
                d="M46.15 47.2s-9.47 7.73-2.51 21.22c0 0 2.55 5.19 10.08 19.13 4 7.36 13.87 14.17 22.72 8.4 4.29-2.8 7.61-8 10-13.79L89.27 73c5.09-23.9-22.33-41.79-41.72-26.94-.47.38-.93.75-1.4 1.14z">
            </path>
            <path class="cls-3" d="M50.06 78l.19 10.36c-.09.93.7 1.88 1.66 1.47L57.12 88z"></path>
            <path class="cls-2"
                d="M73.58 62.84S61.5 27.31 41.32 56.11c0 0 .71-23.62 31.06-26.93 6.35-.7 18.64 2.69 22.71 7.62 6.58 8-.63 21.37-.55 39.77L82.3 67.89c-1.82-1.89-8.72-5.05-8.72-5.05z">
            </path>
            <path class="cls-2" d="M54.7 39.56c-4.69 24.53 19.64 28 19.64 28l-.13-20.47S55.48 35.5 54.7 39.56z"></path>
            <path class="cls-3" d="M86.92 60.36a8.06 8.06 0 11-11.2-2.09 8.05 8.05 0 0111.2 2.09z"></path>
            <path d="M79 69.64s-1.77-3.81 1.85-7.64" stroke-linecap="round" stroke-linejoin="round" stroke="#b2b7e8"
                stroke-width=".72" fill="none"></path>
            <path class="cls-2"
                d="M109 15.06A19.12 19.12 0 1186.28.44 19.12 19.12 0 01109 15.06zM41.16 60.47s.88-10.15 13-15.29l1.37-4.57-12.87 3.78L36 51.05l-.12 8.74z">
            </path>
            <path class="cls-3" d="M265.1 158.42l31.11 66.33-8.53 24.85s-29.13-24.8-58-65.39v-37.7z"></path>
            <path class="cls-2"
                d="M203 114.5s30.2-10.85 48.43 14l16.46 27.9-18.68 14.69-11-6.63 2.42 12.41-10.95 7.56s-17.32-21.83-29.78-28z">
            </path>
            <path class="cls-3"
                d="M304.66 249.22l78.54-69.68-7-13.29-41 27.68s-42.53 20.16-50.55 37.07a17.43 17.43 0 00.92 16.17c4.13 6.39 13.43 7.11 19.09 2.05z">
            </path>
            <path class="cls-1"
                d="M378.08 173.43l.12.18a4.58 4.58 0 01-.8 5.94 9.63 9.63 0 00-2.79 4.91 4.24 4.24 0 002.81 5c7.09 2.36 24.77 8.7 37.93 17.35a11 11 0 0010.18 1l1.82-.74-41.49-54.8L368 164a4.42 4.42 0 00-2.07 5.75 4.42 4.42 0 005.21 2.47l2-.6a4.5 4.5 0 014.94 1.81z">
            </path>
            <path class="cls-2"
                d="M385.86 152.29a2.26 2.26 0 011.14-1.84 3.24 3.24 0 014.31.9l37.53 49.35a4.29 4.29 0 01-1.49 6.39z">
            </path>
            <path class="cls-6"
                d="M387.64 193.37s-1.19-1.75 1.4-5.79M390.87 194.84s-1.18-1.76 1.41-5.8M394.11 196.3s-1.18-1.75 1.41-5.79">
            </path>
            <path class="cls-4"
                d="M378.61 157s7.27 17.07 28.48 22.88l-21.23-27.62a11.75 11.75 0 00-7.25 4.74zM399.43 198.13s3.77-3.13 9-.22 4.8 7.53 4.8 7.53z">
            </path>
            <path class="cls-3" d="M168.62 100.56s18 18.62 34.39 13.94l-3.14 41.86s-32.46-4.25-43.74-11.88z"></path>
            <path class="cls-1"
                d="M119.71 142.73s10.19 7.91 25.18 0l11.24 1.75s12.49-17.39 12.49-43.92c0 0-33.23-27.66-61.53-13.35z">
            </path>
            <path class="cls-3" d="M102.35 87.65S133 80 138.91 95.49s-9.88 28.65-19.43 29.63-20.27-16.24-20.27-16.24z">
            </path>
            <path class="cls-3"
                d="M103.93 94.81s-9.23 7-4.72 28.84c3 14.55 5.91 32.37 7.52 42.67a10 10 0 009.92 8.48 10 10 0 0010-10c.08-17.65-.2-53.5-3.4-64.25z">
            </path>
            <path class="cls-7" d="M125.9 123.06s-.89-10.81.81-14.33M98.36 107.41s.5-7.18 5-10.8"></path>
            <path class="cls-3"
                d="M110.72 160.36a61.26 61.26 0 00-6.79 28.88c.35 16.38-1.35 48.62-5.24 59l13.5-4.73s15.08-50.35 14.5-83.12z">
            </path>
            <path class="cls-3"
                d="M102.07 230.07s-.73 8.81-18.42 13.41L65.79 248a2.18 2.18 0 00-2 2.17 2.17 2.17 0 002.21 2.18h38a8.1 8.1 0 008.16-8.87 15.19 15.19 0 00-2-5.59z">
            </path>
        </svg>
    </div>
</template>

<script setup lang="ts">
import { ref, computed } from "vue"
import schedule from "./workout"

type workDayType = {
    day: string | number,
    videos: Array<{ link: string, image: string }>
    isWorkout: boolean | string
}

const activeIndex = ref(0)
const temp = schedule.map((item) => ({ ...item, isWorkout: false }));
const workDays = reactive<Array<workDayType>>(temp);

const activeDay = computed({
    get() {
        return (activeIndex.value <= workDays.length) && workDays[activeIndex.value] || workDays[workDays.length - 1]
    }
    , set(value) {
        workDays.some(item => {
            if ((+item.day <= workDays.length) && item.day == activeIndex.value + 1) {
                item.isWorkout = value.isWorkout
                return true
            }
        })
    }
})
const isAllWorkout = computed(() => {
    return workDays.every((item) => item.isWorkout
    )
})
const handleDid = () => {
    activeDay.value.isWorkout = "success"
    activeIndex.value++
}
const handleNot = () => {
    activeDay.value.isWorkout = "failed"
    activeIndex.value++
}

</script>

<style scoped lang="scss">
.workout-wrapper {
    position: relative;
    display: grid;
    margin: auto;

    grid-template-columns: min-content 1fr 2fr;

    h1 {
        align-self: flex-end;
        font: 700 4.8rem/1 "Dosis";
        text-transform: uppercase;
        padding: 0.5rem 1rem 0.5rem 0.5rem;
    }


    .workout-aside {
        grid-row: 1;
        grid-column: 3/4;
        text-align: right;
        align-self: flex-end;
        justify-self: flex-end;
        margin-bottom: 1rem;
        max-width: 18rem;
        font-size: 1.5rem;
        line-height: 1.3;
        margin: 2rem 0.5rem;
        text-transform: uppercase;

        .large {
            font-size: 3.8rem;


            display: block;
            font: 700 3rem/1 "Audiowide";
            margin-top: 0.5rem;
            color: #4b5aae;

        }
    }

    .workout-main {
        position: relative;
        display: block;
        grid-column: 1/-1;
    }

    svg {
        width: 170%;
        margin-right: -30%;
        opacity: 0.6;
        grid-column: 2;
        grid-row: 1;

        max-height: 90%;
        justify-self: flex-end;
    }

    .schedule-list {
        counter-reset: day;
        display: grid;
        grid-template-columns: repeat(auto-fill, minmax(12rem, 1fr));
        grid-auto-rows: minmax(12.5rem, auto);
        grid-gap: 12px;
        padding: 10px;

        .day-item {
            position: relative;
            background: #f6f6ff;
            border-radius: 10px;
            box-shadow: 1px 1px 8px rgba(98, 127, 232, 0.4);
            display: flex;
            flex-wrap: wrap;


            &:after {
                content: "";
                position: absolute;
                left: 0;
                top: 0;
                width: 100%;
                height: 100%;
                border-radius: inherit;
                background: rgba(255, 255, 255, 0.7);
                display: flex;
                align-items: center;
                justify-content: center;
                font-size: 5rem;
                transform: scale(0);
                transition: 0.35s cubic-bezier(0.34, 1.56, 0.64, 1);
                background-position: center;
                background-repeat: no-repeat;
                background-size: 40%;
            }

            &[data-status="success"],
            &[data-status="failed"] {
                &:after {
                    transform: scale(1);
                }
            }

            &[data-status="success"]:after {
                content: "🤩";
            }

            &[data-status="failed"]:after {
                content: "☹️";
            }

            &:before {
                counter-increment: day;
                content: counter(day);
                font: 3rem/1 "Audiowide";
                position: absolute;
                right: 0.8rem;
                top: 0.5rem;
                color: #d9deff;
                text-shadow: 2px 2px 0px #f5f5ff, 2px 2.3px 0px #d5dafe,
                    2px 3px 5px rgba(155, 168, 239, 0.5);
            }

        }



        .workout__info {
            text-align: center;
            width: 100%;
            font: 1.3rem "Dosis";
            color: #5c58ac;
            margin-top: 5rem;
            text-transform: uppercase;
        }

        .workout__rest {
            align-self: center;
            text-align: center;
            width: 100%;
            font: 2rem "Dosis";
            margin-top: 5rem;
            color: #5c58ac;
        }

        .workout__links {
            display: flex;
            flex-wrap: wrap;
            justify-content: center;
            padding: 0.5rem 0.2rem 1.2rem;
            position: relative;
            width: 100%;
            align-self: flex-end;

            a {
                display: inline-block;
                border-radius: 50%;
                width: 3.8rem;
                height: 3.8rem;
                overflow: hidden;
                border: 4px solid #fff;
                box-shadow: 2px 2px 8px rgba(98, 127, 232, 0.2);
                margin: 0.2rem;

                &:not(:first-child) {
                    margin-left: -1.5rem;
                }

                transition: 0.3s ease-in-out;

                &:hover {
                    transform: scale(1.3);
                    z-index: 10;
                }
            }

            img {
                width: 100%;
                height: 100%;
                object-fit: cover;
                object-position: left;
            }
        }
    }

    .workout-question {
        margin: 1rem 0.5rem 0.5rem;
        padding: 2rem;
        font-size: 1.5rem;
        line-height: 1.2;
        background: #fff;
        border-radius: 1rem;
        box-shadow: 1px 1px 8px rgba(98, 127, 232, 0.3);
        text-align: center;
        color: #5753a9;
        text-transform: uppercase;
        letter-spacing: 0.1rem;
        position: sticky;
        top: 1rem;
        z-index: 1;

        // @media (min-width: 850px) {
        //     padding: 1rem 2rem;
        // }
        .workout-day {
            text-align: left;
        }

        >* {
            display: flex;
            flex-wrap: wrap;
            align-items: center;
            justify-content: center;
        }

        .rest-day,
        .amazing-day {
            //display: none;
        }

        .amazing-day {
            padding: 1.5rem;
            text-align: center;
        }

        p {
            margin-bottom: 0.6rem;
            width: auto;

            // @media (min-width: 850px) {
            //     width: auto;
            //     margin: 0;
            // }
        }

        a.button {
            display: inline-block;
            padding: 0.5rem 1.4rem;
            background: #627fe8;
            color: #fff;
            margin: 0.5rem 0.3rem;
            border-radius: 2rem;
            cursor: pointer;
            font-size: 1.2rem;
            transition: 0.3s;

            &:hover,
            &:focus,
            &:active {
                box-shadow: 0 0 0 4px #b2b7e8;
            }

            &:nth-child(2) {
                @media (min-width: 850px) {
                    margin-left: auto;
                }
            }

            &--white {
                background: #fff;
                color: #627fe8;
            }
        }
    }

}

@media(max-width: 1410px) {
    .workout-wrapper {
        display: block;
        text-align: center;

        .workout-aside {
            max-width: 100%;
            text-align: center;

        }

        svg {
            width: 40%;
            margin: 0;
        }

        .workout-day {


            p {
                width: 100%;
                text-align: center;
            }

            a.button:nth-child(2) {
                margin: 0;
            }
        }
    }

}

/*SVG*/
.cls-1 {
    fill: #9ba7ef;
}

.cls-2 {
    fill: #627fe8;
}

.cls-3,
.cls-7 {
    fill: #d1d5f8;
}

.cls-4 {
    fill: #b2b7e8;
}

.cls-7 {
    stroke: #b2b7e8;
    stroke-width: 0.72px;
}

.cls-6,
.cls-7 {
    stroke-linecap: round;
    stroke-linejoin: round;
}

.cls-6 {
    fill: #f5f5ff;
    stroke: #627fe8;
    stroke-width: 1.1px;
}
</style>