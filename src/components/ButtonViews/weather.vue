<template>
    <div class="weather-container">
        <div id="weather-animations">
            <div class="row">
                <div class="weather">
                    <div id="rays" class="rays"></div>
                    <div id="sun" class="sun"></div>
                </div>
                <div class="desc">sunny</div>
            </div>
            <br />
            <div class="row">
                <div class="weather">
                    <div id="miniRays" class="rays"></div>
                    <div id="miniSun" class="sun"></div>
                    <div id="miniCloud" class="cloud"></div>
                </div>
                <div class="desc">partly cloudy</div>
            </div>
            <br />
            <div class="row">
                <div class="weather">
                    <div id="miniDarkCloud" class="cloud"></div>
                    <div id="cloud" class="cloud"></div>
                </div>
                <div class="desc">cloudy</div>
            </div>
            <br />
            <div class="row">
                <div class="weather">
                    <div id="raindrop1" class="raindrop"></div>
                    <div id="raindrop2" class="raindrop"></div>
                    <div id="raindrop3" class="raindrop"></div>
                    <div id="raindrop4" class="raindrop"></div>
                    <div id="darkCloud" class="cloud"></div>
                </div>
                <div class="desc">rainy</div>
            </div>
            <br />
            <div class="row">
                <div class="weather">
                    <div id="star1" class="star"></div>
                    <div id="moon"></div>
                    <div id="star2" class="star"></div>
                    <div id="star3" class="star"></div>
                </div>
                <div class="desc">night</div>
            </div>
        </div>
    </div>
</template>

<script setup lang="ts">
//
</script>

<style lang="scss" scoped>
.weather-container {
    height: calc(100vh - var(--TopHeaderHeight));
    width: 100%;
    position: relative;
    overflow: hidden;
    text-align: center;

    background: -webkit-linear-gradient(#55C1FF, #33658A);
    background: -moz-linear-gradient(#55C1FF, #33658A);
    background: -ms-linear-gradient(#55C1FF, #33658A);
    background: -o-linear-gradient(#55C1FF, #33658A);
    background: linear-gradient(#55C1FF, #33658A);

    #weather-animations {
        display: flex;
        flex-direction: row;
        flex-wrap: wrap;
        gap: 4rem;
        padding: 2rem;


        .row {
            display: flex;
            align-items: center;
            height: 200px;
            width: auto;

            .weather {
                display: inline-block;
                position: relative;
                width: 200px;
                min-width: 200px;
                height: 200px;

                .rays {
                    background: #FEC601;
                    position: absolute;
                    z-index: 0;
                    -webkit-transform: rotate(20deg);
                    -moz-transform: rotate(20deg);
                    -ms-transform: rotate(20deg);
                    -o-transform: rotate(20deg);
                    transform: rotate(20deg);
                    animation: sunRotate 10s infinite linear;

                    &::after {
                        content: "";
                        background: #FEC601;
                        position: absolute;
                        z-index: 0;
                        -webkit-transform: rotate(40deg);
                        -moz-transform: rotate(40deg);
                        -ms-transform: rotate(40deg);
                        -o-transform: rotate(40deg);
                        transform: rotate(40deg);
                    }
                }

                .sun {
                    display: relative;
                    background: -webkit-linear-gradient(#FEC601, #EA7317);
                    background: -moz-linear-gradient(#FEC601, #EA7317);
                    background: -ms-linear-gradient(#FEC601, #EA7317);
                    background: -o-linear-gradient(#FEC601, #EA7317);
                    background: linear-gradient(#FEC601, #EA7317);
                    -webkit-border-radius: 50px;
                    -moz-border-radius: 50px;
                    -ms-border-radius: 50px;
                    -o-border-radius: 50px;
                    border-radius: 50px;
                    position: absolute;
                    z-index: 1;
                }

                .cloud {
                    -webkit-border-radius: 50px;
                    -moz-border-radius: 50px;
                    -ms-border-radius: 50px;
                    -o-border-radius: 50px;
                    border-radius: 50px;
                    position: relative;
                    z-index: 2;

                    &::before {
                        content: "";
                        -webkit-border-radius: 50px;
                        -moz-border-radius: 50px;
                        -ms-border-radius: 50px;
                        -o-border-radius: 50px;
                        border-radius: 50px;
                        position: absolute;
                        z-index: 2;
                    }

                    &::after {
                        content: "";
                        position: absolute;
                        -webkit-border-radius: 50px;
                        -moz-border-radius: 50px;
                        -ms-border-radius: 50px;
                        -o-border-radius: 50px;
                        border-radius: 50px;
                        z-index: 3;
                    }
                }

                .raindrop {
                    width: 5px;
                    height: 5px;
                    border-radius: 80% 0 55% 50%/55% 0 80% 50%;
                    border: 3px solid #0A81D1;
                    background: #0A81D1;
                    display: inline-block;
                    -webkit-transform: rotate(-45deg);
                    -moz-transform: rotate(-45deg);
                    -ms-transform: rotate(-45deg);
                    -o-transform: rotate(-45deg);
                    transform: rotate(-45deg);
                    position: relative;
                    backface-visibility: hidden;
                }

                .star {
                    margin: 50px 0;
                    position: relative;
                    display: block;
                    width: 0px;
                    height: 0px;
                    border-left: 100px solid transparent;
                    border-right: 100px solid transparent;
                    border-bottom: 70px solid #ECE4B7;
                    -webkit-transform: rotate(35deg);
                    -moz-transform: rotate(35deg);
                    -ms-transform: rotate(35deg);
                    -o-transform: rotate(35deg);
                    transform: rotate(35deg);
                    -webkit-transform: scale(0.15);
                    -moz-transform: scale(0.15);
                    -ms-transform: scale(0.15);
                    -o-transform: scale(0.15);
                    transform: scale(0.15);

                    &::before {
                        content: "";
                        border-left: 30px solid transparent;
                        border-right: 30px solid transparent;
                        border-bottom: 80px solid #ECE4B7;
                        position: absolute;
                        height: 0;
                        width: 0;
                        top: -45px;
                        left: -60px;
                        display: block;
                        -webkit-transform: rotate(-35deg);
                        -moz-transform: rotate(-35deg);
                        -ms-transform: rotate(-35deg);
                        -o-transform: rotate(-35deg);
                        transform: rotate(-35deg);
                    }

                    &::after {
                        content: "";
                        position: absolute;
                        display: block;
                        top: 3px;
                        left: -105px;
                        width: 0px;
                        height: 0px;
                        border-right: 100px solid transparent;
                        border-bottom: 70px solid #ECE4B7;
                        border-left: 100px solid transparent;
                        -webkit-transform: rotate(-70deg);
                        -moz-transform: rotate(-70deg);
                        -ms-transform: rotate(-70deg);
                        -o-transform: rotate(-70deg);
                        transform: rotate(-70deg);
                    }
                }
            }

            .desc {
                position: relative;
                color: #FFFFFF;
                font-size: 30px;
                font-family: "Pacifico", cursive;
            }
        }

        #rays {
            width: 100px;
            height: 100px;
            top: 35px;
            left: 25px;
        }

        #rays:after {
            height: 100px;
            width: 100px;
            top: 0px;
            left: 0px;
        }

        #sun {
            width: 100px;
            height: 100px;
            top: 35px;
            left: 25px;
        }

        #miniRays {
            width: 75px;
            height: 75px;
            top: 25px;
            left: 75px;
        }

        #miniRays:after {
            height: 75px;
            width: 75px;
            top: 0px;
            left: 0px;
        }

        #miniSun {
            width: 75px;
            height: 75px;
            top: 25px;
            left: 75px;
        }

        #miniCloud {
            background-color: #DBE4EE;
            width: 75px;
            height: 75px;
            top: 40px;
            animation: cloudFloat 5s infinite linear;
        }

        #miniCloud:before {
            background-color: #DBE4EE;
            width: 50px;
            height: 50px;
            top: 17px;
            left: 55px;
        }

        #miniCloud:after {
            background: -webkit-linear-gradient(#DBE4EE, #A9BBCF);
            background: -moz-linear-gradient(#DBE4EE, #A9BBCF);
            background: -ms-linear-gradient(#DBE4EE, #A9BBCF);
            background: -o-linear-gradient(#DBE4EE, #A9BBCF);
            background: linear-gradient(#DBE4EE, #A9BBCF);
            width: 140px;
            height: 60px;
            top: 40px;
            left: -15px;
        }

        #miniDarkCloud {
            background-color: #90A7BF;
            width: 75px;
            height: 75px;
            top: -10px;
            left: 75px;
            -webkit-transform: scale(0.75);
            -moz-transform: scale(0.75);
            -ms-transform: scale(0.75);
            -o-transform: scale(0.75);
            transform: scale(0.75);
            animation: cloudFloatOpposite 5s infinite linear;
        }

        #miniDarkCloud:before {
            background-color: #90A7BF;
            width: 50px;
            height: 50px;
            top: 17px;
            left: 55px;
        }

        #miniDarkCloud:after {
            background: -webkit-linear-gradient(#90A7BF, #7792AF);
            background: -moz-linear-gradient(#90A7BF, #7792AF);
            background: -ms-linear-gradient(#90A7BF, #7792AF);
            background: -o-linear-gradient(#90A7BF, #7792AF);
            background: linear-gradient(#90A7BF, #7792AF);
            width: 140px;
            height: 60px;
            top: 40px;
            left: -15px;
        }

        #cloud {
            background-color: #DBE4EE;
            width: 75px;
            height: 75px;
            top: -50px;
            -webkit-transform: scale(1.25);
            -moz-transform: scale(1.25);
            -ms-transform: scale(1.25);
            -o-transform: scale(1.25);
            transform: scale(1.25);
            animation: cloudFloat 5s infinite linear;
        }

        #cloud:before {
            background-color: #DBE4EE;
            width: 50px;
            height: 50px;
            top: 17px;
            left: 55px;
        }

        #cloud:after {
            background: -webkit-linear-gradient(#DBE4EE, #A9BBCF);
            background: -moz-linear-gradient(#DBE4EE, #A9BBCF);
            background: -ms-linear-gradient(#DBE4EE, #A9BBCF);
            background: -o-linear-gradient(#DBE4EE, #A9BBCF);
            background: linear-gradient(#DBE4EE, #A9BBCF);
            width: 140px;
            height: 60px;
            top: 40px;
            left: -15px;
        }

        #raindrop1 {
            left: -72px;
            animation: raindrop 2s infinite linear, raindropFade 2s infinite linear;
        }

        #raindrop2 {
            left: -48px;
            animation: raindropAlt 2s infinite linear, raindropFade 2s infinite linear;
        }

        #raindrop3 {
            left: -24px;
            animation: raindrop 2s infinite linear, raindropFade 2s infinite linear;
        }

        #raindrop4 {
            left: 0px;
            animation: raindropAlt 2s infinite linear, raindropFade 2s infinite linear;
        }

        #darkCloud {
            background-color: #90A7BF;
            width: 75px;
            height: 75px;
            top: 0px;
            animation: cloudFloat 5s infinite linear;
        }

        #darkCloud:before {
            background-color: #90A7BF;
            width: 50px;
            height: 50px;
            top: 17px;
            left: 55px;
        }

        #darkCloud:after {
            background: -webkit-linear-gradient(#90A7BF, #7792AF);
            background: -moz-linear-gradient(#90A7BF, #7792AF);
            background: -ms-linear-gradient(#90A7BF, #7792AF);
            background: -o-linear-gradient(#90A7BF, #7792AF);
            background: linear-gradient(#90A7BF, #7792AF);
            width: 140px;
            height: 60px;
            top: 40px;
            left: -15px;
        }

        #moon {
            width: 100px;
            height: 100px;
            top: -150px;
            left: 55px;
            -webkit-border-radius: 50px;
            -moz-border-radius: 50px;
            -ms-border-radius: 50px;
            -o-border-radius: 50px;
            border-radius: 50px;
            position: relative;
            box-shadow: 30px 15px 0 0 #ECE4B7;
            -webkit-transform: rotate(130deg);
            -moz-transform: rotate(130deg);
            -ms-transform: rotate(130deg);
            -o-transform: rotate(130deg);
            transform: rotate(130deg);
            animation: moonSwing 3s infinite linear;
        }

        #star1 {
            top: 35px;
            left: -100px;
            animation: starFadeIn 5s infinite linear;
        }

        #star2 {
            top: -300px;
            left: 15px;
            animation: starFadeOut 6s infinite linear;
        }

        #star3 {
            top: -375px;
            left: 50px;
            animation: starFadeIn 7s infinite linear;
        }

        @keyframes sunRotate {
            from {
                -webkit-transform: rotate(0deg);
                -moz-transform: rotate(0deg);
                -ms-transform: rotate(0deg);
                -o-transform: rotate(0deg);
                transform: rotate(0deg);
            }

            to {
                -webkit-transform: rotate(359deg);
                -moz-transform: rotate(359deg);
                -ms-transform: rotate(359deg);
                -o-transform: rotate(359deg);
                transform: rotate(359deg);
            }
        }

        @keyframes cloudFloat {
            0% {
                left: 0px;
            }

            50% {
                left: 20px;
            }

            100% {
                left: 0px;
            }
        }

        @keyframes cloudFloatOpposite {
            0% {
                left: 75px;
            }

            50% {
                left: 50px;
            }

            100% {
                left: 75px;
            }
        }

        @keyframes raindrop {
            from {
                top: 100px;
            }

            to {
                top: 175px;
            }
        }

        @keyframes raindropAlt {
            from {
                top: 75px;
            }

            to {
                top: 150px;
            }
        }

        @keyframes raindropFade {
            75% {
                opacity: 1;
            }

            100% {
                opacity: 0;
            }
        }

        @keyframes moonSwing {
            0% {
                -webkit-transform: rotate(125deg);
                -moz-transform: rotate(125deg);
                -ms-transform: rotate(125deg);
                -o-transform: rotate(125deg);
                transform: rotate(125deg);
            }

            50% {
                -webkit-transform: rotate(135deg);
                -moz-transform: rotate(135deg);
                -ms-transform: rotate(135deg);
                -o-transform: rotate(135deg);
                transform: rotate(135deg);
            }

            100% {
                -webkit-transform: rotate(125deg);
                -moz-transform: rotate(125deg);
                -ms-transform: rotate(125deg);
                -o-transform: rotate(125deg);
                transform: rotate(125deg);
            }
        }

        @keyframes starFadeIn {
            0% {
                opacity: 0;
            }

            50% {
                opacity: 1;
            }

            100% {
                opacity: 0;
            }
        }

        @keyframes starFadeOut {
            0% {
                opacity: 1;
            }

            50% {
                opacity: 0;
            }

            100% {
                opacity: 1;
            }
        }
    }


}
</style>