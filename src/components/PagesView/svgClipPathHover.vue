<template>
    <div class="svg-clip-path-container">
        <div class="svg-clip-main">
            <div class='items'>
                <div class='item' v-for="item, index in items" ref="itemRefs" :key="item.name + index"
                    @mousemove="handleMousemove" @touchmove="touchMoveHandler">
                    <svg preserveAspectRatio='xMidYMid slice' viewBox='0 0 300 200'>
                        <defs>
                            <clipPath :id="'clip-' + index">
                                <circle cx='0' cy='0' fill='#000' r='100px'></circle>
                            </clipPath>
                        </defs>
                        <text class='svg-text' dy='.3em' x='50%' y='50%'>
                            {{ item.name }}
                        </text>
                        <g :clip-path="`url(#clip-${index})`">
                            <image height='100%' preserveAspectRatio='xMinYMin slice' width='100%'
                                :xlink:href='item.imageUrl'></image>
                            <text class='svg-masked-text' dy='.3em' x='50%' y='50%'>
                                {{ item.name }}
                            </text>
                        </g>
                    </svg>
                </div>
            </div>
        </div>
    </div>
</template>

<script setup lang="ts">
import { ref, reactive } from 'vue'


const itemRefs = ref()

const items = reactive([
    {
        name: "X-rays",
        imageUrl: "https://s3-us-west-2.amazonaws.com/s.cdpn.io/9473/i-xrays.png"
    }, {
        name: "Worms",
        imageUrl: "https://s3-us-west-2.amazonaws.com/s.cdpn.io/9473/i-worms.png",
    },
    {
        name: "Aurora",
        imageUrl: "https://s3-us-west-2.amazonaws.com/s.cdpn.io/9473/i-aurora.png",
    },
    {
        name: "Angus",
        imageUrl: "https://s3-us-west-2.amazonaws.com/s.cdpn.io/9473/i-angus.png",
    },
    {
        name: "D",
        imageUrl: "https://s3-us-west-2.amazonaws.com/s.cdpn.io/9473/i-d.png",
    },
    {
        name: "V",
        imageUrl: "https://s3-us-west-2.amazonaws.com/s.cdpn.io/9473/i-v.png",
    },
    {
        name: "V II",
        imageUrl: "https://s3-us-west-2.amazonaws.com/s.cdpn.io/9473/i-v2.png",
    }, {
        name: "V III",
        imageUrl: "https://s3-us-west-2.amazonaws.com/s.cdpn.io/9473/i-v3.png",
    }
])
const handleMousemove = (e: MouseEvent) => {
    const p = (e.target as Element).closest(".item")
    const $svg = p?.querySelector("svg") as SVGSVGElement
    const $clip = p?.querySelector("svg circle")
    const c = getCoordinates(e, $svg) as DOMPoint;
    // console.log("C:", c, p)
    $clip?.setAttribute('cx', c.x + "");
    $clip?.setAttribute('cy', c.y + "");

}
const touchMoveHandler = (e: TouchEvent) => {
    e.preventDefault();
    var touch = e.targetTouches[0];
    if (touch) {
        const p = (touch.target as Element).closest(".item")
        const $svg = p?.querySelector("svg") as SVGSVGElement
        const $clip = p?.querySelector("svg circle")
        const c = getCoordinates(touch, $svg) as DOMPoint;
        // console.log("C:", c, p)
        $clip?.setAttribute('cx', c.x + "");
        $clip?.setAttribute('cy', c.y + "");
    }
}

function getCoordinates(e: MouseEvent | Touch, svg: SVGSVGElement) {
    var point = document.querySelector('svg')?.createSVGPoint();
    if (!point) return;
    point.x = e.clientX;
    point.y = e.clientY;
    return svg && point.matrixTransform(svg.getScreenCTM()?.inverse());
}
</script>

<style scoped lang="scss">
.svg-clip-path-container {
    width: 100%;
    position: relative;


    font-size: 13px;
    font-family: 'Source Sans Pro', sans-serif;
    line-height: 1.618;
    font-weight: 400;

    $db: #2f3238;
    $dc: #f5f5f5;
    $lb: #f9f9f9;
    $lc: #1a1a1a;
    $l: #1abc89;


    a {
        color: $l
    }

    a:hover {
        opacity: .8
    }

    p {
        font-size: 1.2rem;
        color: rgba($dc, .5);
    }

    .small {
        font-size: 1rem;
        margin-top: 1em;
    }

    .svg-container {
        max-width: 1200px;
        margin: 0 auto;
        padding: 4rem 2rem;
    }

    header {
        text-align: center;
        padding-bottom: 3rem;
    }

    h1 {
        font-size: 2.6rem;
        line-height: 1.2em;
        padding-bottom: 1rem;
        font-weight: 600;
    }

    svg {
        position: absolute;
        top: 0;
        left: 0;
        width: 100%;
        height: 100%;
    }

    circle {
        transform-origin: 50% 50%;
        transform: scale(0);
        transition: transform 200ms cubic-bezier(0.250, 0.460, 0.450, 0.940);
    }

    text {
        font-size: 1.1rem;
        text-transform: uppercase;
        text-anchor: middle;
        letter-spacing: 1px;
        font-weight: 600;
    }

    .svg-text {
        fill: lighten($db, 16)
    }

    .svg-masked-text {
        fill: rgba(#fff, 1);
    }

    image {
        transform: scale(1.1);
        transform-origin: 50% 50%;
        transition: transform 200ms cubic-bezier(0.250, 0.460, 0.450, 0.940);
    }

    .items {
        display: flex;
        flex-flow: row wrap;
        justify-content: center;
    }

    .item {
        display: flex;
        align-items: center;
        justify-content: center;
        position: relative;
        overflow: hidden;
        width: 200px;
        height: 200px;
        margin: 5px;
        cursor: pointer;
        background-color: lighten($db, 5);
        border-radius: 2px;
        box-shadow: 0 5px 5px rgba(0, 0, 0, 0.02), inset 0 0px 0px 1px rgba(0, 0, 0, 0.07);
        transform: translateZ(0);
    }

    .item:hover {

        circle,
        image {
            transform: scale(1)
        }
    }


    .options {
        position: absolute;
        top: 1rem;
        right: 1rem;

        button {
            margin-left: .5rem
        }
    }

    .light {
        background-color: $lb;
        color: $lc;

        p {
            color: rgba($lc, .5);
        }

        .item {
            background: $dc;
        }

        .svg-text {
            fill: rgba(#000, .1);
        }
    }
}
</style>