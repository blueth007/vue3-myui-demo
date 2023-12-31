<template>
    <div class="css-solar-container">
        <div class='description'>
            <h1>Solar System</h1>
            <hr>
            <p>
                I know this is not the first one on CodePen, but I'm a space and physics lover, and I wanted to create mine
                :)
            </p>
            <p>
                Here is a true time scaled solar-system, which means that every objects have a time relative to an Earth
                year.
                You can change the number in second of the
                <br>
                <code>$year-in-second</code>
                variable to increase the speed of revolutions. Here 1 year = 30 seconds.
            </p>
            <p class='hide'>
                Note the css tricks for the Saturn rings (box-shadow) and reverse animation to compensate the orbit.
            </p>
            <hr>
            <p class='author'>
                Made with
                <i class='fa fa-heart'></i>
                by Malik Dellidj
            </p>

        </div>
        <div class='solar-syst'>
            <div class='sun'></div>
            <div class='mercury'></div>
            <div class='venus'></div>
            <div class='earth'></div>
            <div class='mars'></div>
            <div class='jupiter'></div>
            <div class='saturn'></div>
            <div class='uranus'></div>
            <div class='neptune'></div>
            <div class='pluto'></div>
            <div class='asteroids-belt'></div>
        </div>

    </div>
</template>

<script setup lang="ts">

</script>

<style scoped lang="scss">
/*
  Malik Dellidj - @Dathink

  Solar System orbit animation true time scaled

  Revolution of planets in earth days (from Wikipedia)
  Mercury : ~87,5 days
  Venus : ~224,7 days
  Earth : ~365,2563 days
    + Moon : ~27,3216 days (around earth)
  Mars : ~687 days (~1,8 year)
  Jupiter : ~4 331 days (~12 years)
  Saturn : ~10 747 days (~30 years)
  Uranus : ~30 589 days (~84 years)
  Neptune : ~59 802 days (~165 years)
  Pluto : ~90 580 days (~248 years)
*/
.css-solar-container {
    width: 100%;
    height: calc(100vh - var(--TopHeaderHeight));
    position: relative;
    overflow: hidden;
    font: normal 1em/1.45em "Helvetica Neue", Helvetica, Arial, sans-serif;
    -webkit-font-smoothing: antialiased;
    color: #fff;
    background: radial-gradient(ellipse at bottom, #1C2837 0%, #050608 100%);
    background-attachment: fixed;

    $year-in-second : 30; // 1 Earth year = 30 sec

    @function revolution($pl-year-in-days) {
        @return calc($pl-year-in-days * $year-in-second / 365.2563)+s //Earth reference
    }

    @function alphaRandom() {
        @return random(1000)*.001;
    }

    @function stars($s, $max-area, $min-area : 0, $star-size : 0) {
        $stars : #{$min-area + random($max-area)}px #{$min-area + random($max-area)}px 0 #{$star-size}px rgba(255, 255, 255, alphaRandom());

        @for $i from 1 to $s {
            $stars: '#{$stars} , #{$min-area + random($max-area)}px #{$min-area + random($max-area)}px 0 #{$star-size}px rgba(255,255,255, #{alphaRandom()})'
        }

        @return unquote($stars);
    }

    $sun: 40px;
    $mercury-orb : 70px;
    $mercury-pl: 4px;
    $venus-orb : 100px;
    $venus-pl: 8px;
    $earth-orb : 145px;
    $earth-pl: 6px;
    $mars-orb : 190px;
    $mars-pl: 6px;
    $jupiter-orb : 340px;
    $jupiter-pl: 18px;
    $saturn-orb : 440px;
    $saturn-pl: 12px;
    $uranus-orb : 520px;
    $uranus-pl: 10px;
    $neptune-orb : 630px;
    $neptune-pl: 10px;
    $pluto-orb : 780px;
    $pluto-pl: 6px;

    $asteroids-belt-orb : 300px;
    $asteroids-belt-pl: 210px;


    *,
    *:before,
    *:after {
        padding: 0;
        margin: 0;
        box-sizing: border-box;
    }



    h1 {
        font-weight: 300;
        font-size: 2.5em;
        text-transform: uppercase;
        font-family: Lato;
        line-height: 1.6em;
        letter-spacing: .1em;
    }

    a,
    a:visited {
        text-decoration: none;
        color: white;
        opacity: .7;

        &:hover {
            opacity: 1
        }

        &.icon {
            margin-right: 2px;
            padding: 3px;
        }
    }

    .description {
        padding: 30px;
        position: absolute;
        top: 0;
        left: 0;
        width: 25%;
        z-index: 999;

        p {
            font-size: .9em;

            &+p {
                margin-top: 20px;
            }

            &.author {
                font-size: .7em;

                .fa-heart {
                    color: #860014;
                }
            }
        }
    }

    hr {
        margin: 26px 0;
        border: 0;
        border-top: 1px solid white;
        background: transparent;
        width: 25%;
        opacity: .1;
    }

    code {
        color: #ae94c0;
        font-family: Menlo, Monaco, Consolas, 'Courier New', monospace;
        font-size: .9em;
    }

    .solar-syst {

        &:after {
            content: "";
            position: absolute;
            height: 2px;
            width: 2px;
            top: -2px;
            background: white;
            box-shadow: stars(500, 1800);
            border-radius: 100px;
        }

        margin:30px auto;
        width:100%;
        height:100%;
        position:relative;

        div {
            border-radius: 1000px;
            top: 50%;
            left: 50%;
            position: absolute;
            z-index: 999;

            &:not(.sun) {
                border: 1px solid rgba(102, 166, 229, 0.12);

                &:before {
                    left: 50%;
                    border-radius: 100px;
                    content: "";
                    position: absolute;
                }
            }

            &:not(.asteroids-belt) {
                &:before {
                    box-shadow: inset 0 6px 0 -2px rgba(0, 0, 0, 0.25);
                }
            }
        }
    }

    .sun {
        background: radial-gradient(ellipse at center, #ffd000 1%, #f9b700 39%, #f9b700 39%, #e06317 100%);
        height: $sun;
        width: $sun;
        margin-top: 0 - calc($sun / 2);
        margin-left: 0 - calc($sun / 2);
        background-clip: padding-box;
        border: 0 !important;
        background-position: -28px -103px;
        background-size: 175%;
        box-shadow: 0 0 10px 2px rgba(255, 107, 0, 0.4), 0 0 22px 11px rgba(255, 203, 0, 0.13);
    }

    .mercury {
        height: $mercury-orb;
        width: $mercury-orb;
        margin-top: 0 - calc($mercury-orb / 2);
        margin-left: 0 - calc($mercury-orb / 2);
        animation: orb revolution(87.5) linear infinite;

        &:before {
            height: $mercury-pl;
            width: $mercury-pl;
            background: #9f5e26;
            margin-top: 0- calc($mercury-pl / 2);
            margin-left: 0 - calc($mercury-pl / 2);
        }
    }

    .venus {
        height: $venus-orb;
        width: $venus-orb;
        margin-top: 0 - calc($venus-orb / 2);
        margin-left: 0 - calc($venus-orb / 2);
        animation: orb revolution(224.7) linear infinite;

        &:before {
            height: $venus-pl;
            width: $venus-pl;
            background: #BEB768;
            margin-top: 0 - calc($venus-pl / 2);
            margin-left: 0 - calc($venus-pl / 2);
        }
    }

    .earth {
        height: $earth-orb;
        width: $earth-orb;
        margin-top: 0 - calc($earth-orb / 2);
        margin-left: 0 - calc($earth-orb / 2);
        animation: orb revolution(365.2563) linear infinite;

        &:before {
            height: $earth-pl;
            width: $earth-pl;
            background: #11abe9;
            margin-top: 0 - calc($earth-pl / 2);
            margin-left: 0 - calc($earth-pl / 2);
        }

        &:after {
            position: absolute;
            content: "";
            height: 18px;
            width: 18px;
            left: 50%;
            top: 0px;
            margin-left: -9px;
            margin-top: -9px;
            border-radius: 100px;
            box-shadow: 0 -10px 0 -8px grey;
            animation: orb revolution(27.3216) linear infinite;
        }
    }

    .mars {
        height: $mars-orb;
        width: $mars-orb;
        margin-top: 0 - calc($mars-orb / 2);
        margin-left: 0 - calc(($mars-orb / 2));
        animation: orb revolution(687) linear infinite;

        &:before {
            height: $mars-pl;
            width: $mars-pl;
            background: #cf3921;
            margin-top: 0 - calc($mars-pl / 2);
            margin-left: 0 - calc($mars-pl / 2);
        }
    }

    .jupiter {
        height: $jupiter-orb;
        width: $jupiter-orb;
        margin-top: 0 - calc($jupiter-orb / 2);
        margin-left: 0 - calc($jupiter-orb / 2);
        animation: orb revolution(4331) linear infinite;

        &:before {
            height: $jupiter-pl;
            width: $jupiter-pl;
            background: #c76e2a;
            margin-top: 0 - calc($jupiter-pl / 2);
            margin-left: 0 - calc($jupiter-pl / 2);
        }
    }

    .saturn {
        height: $saturn-orb;
        width: $saturn-orb;
        margin-top: 0 - calc($saturn-orb / 2);
        margin-left: 0 - calc($saturn-orb / 2);
        animation: orb revolution(10747) linear infinite;

        &:before {
            height: $saturn-pl;
            width: $saturn-pl;
            background: #e7c194;
            margin-top: 0 - calc($saturn-pl / 2);
            margin-left: 0 - calc($saturn-pl / 2);
        }

        &:after {
            position: absolute;
            content: "";
            height: 2.34%;
            width: 4.676%;
            left: 50%;
            top: 0px;
            transform: rotateZ(-52deg);
            margin-left: -2.3%;
            margin-top: -1.2%;
            border-radius: 50% 50% 50% 50%;
            box-shadow: 0 1px 0 1px #987641, 3px 1px 0 #987641, -3px 1px 0 #987641;
            animation: orb revolution(10747) linear infinite;
            animation-direction: reverse; // compensate to reverse main orbit animation
            transform-origin: 52% 60%;
        }
    }

    .uranus {
        height: $uranus-orb;
        width: $uranus-orb;
        margin-top: 0 - calc($uranus-orb / 2);
        margin-left: 0 - calc($uranus-orb / 2);
        animation: orb revolution(30589) linear infinite;

        &:before {
            height: $uranus-pl;
            width: $uranus-pl;
            background: #b5e3e3;
            margin-top: 0 - calc($uranus-pl / 2);
            margin-left: 0 - calc($uranus-pl / 2);
        }
    }

    .neptune {
        height: $neptune-orb;
        width: $neptune-orb;
        margin-top: 0 - calc($neptune-orb / 2);
        margin-left: 0 - calc($neptune-orb / 2);
        animation: orb revolution(59802) linear infinite;

        &:before {
            height: $neptune-pl;
            width: $neptune-pl;
            background: #175e9e;
            margin-top: 0 - calc($neptune-pl / 2);
            margin-left: 0 - calc($neptune-pl / 2);
        }
    }

    .asteroids-belt {
        opacity: .7;
        border-color: transparent !important;
        height: $asteroids-belt-orb;
        width: $asteroids-belt-orb;
        margin-top: 0 - calc($asteroids-belt-orb / 2);
        margin-left: 0 - calc($asteroids-belt-orb / 2);
        animation: orb revolution(2191) linear infinite;
        overflow: hidden;

        &:before {
            top: 50%;
            height: $asteroids-belt-pl;
            width: $asteroids-belt-pl;
            margin-left: 0 - calc($asteroids-belt-pl / 2);
            margin-top: 0 - calc($asteroids-belt-pl / 2);
            background: transparent;
            border-radius: 140px !important;
            box-shadow: stars(390, 290, 0 - calc(290 / 2), -104);
        }
    }

    .pluto {
        height: $pluto-orb;
        width: $pluto-orb;
        margin-top: 0- calc($pluto-orb / 2) + -60;
        margin-left: 0- calc($pluto-orb / 2) + 70;
        animation: orb revolution(90580) linear infinite;

        &:before {
            height: $pluto-pl;
            width: $pluto-pl;
            background: #a5e907;
            margin-top: 0- calc($pluto-pl / 2);
            margin-left: 0- calc($pluto-pl / 2);
        }
    }

    .hide {
        display: none;
    }

    .links {
        margin-top: 5px !important;
        font-size: 1em !important;
    }

    @keyframes orb {
        from {
            transform: rotate(0deg)
        }

        to {
            transform: rotate(-360deg)
        }
    }
}
</style>