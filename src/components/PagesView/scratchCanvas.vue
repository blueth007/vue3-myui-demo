<template>
    <div class="scratch-canvas-container">
        <figure id="bridgeContainer">
            <canvas id="bridge" width="750" height="465" ref="bridgeRef"></canvas>
            <figcaption>Downtown Calgary in 2013 and 1943; mouse down or touch on photo to reveal</figcaption>
        </figure>
    </div>
</template>

<script setup lang="ts">
import { getAssetsImage } from '../../util';
const bridgeRef = ref<HTMLCanvasElement>()
const bridgeCanvas = computed(() => bridgeRef.value?.getContext('2d'))

onMounted(() => {

    loadImage()
    bridgeRef.value?.addEventListener("mousemove", function (e) {
        var brushPos = getBrushPos(e.clientX, e.clientY);
        var leftBut = detectLeftButton(e);
        if (leftBut) {
            drawDot(brushPos.x, brushPos.y);
        }
    }, false)
})
const brushRadius = computed(() => {
    if (!bridgeRef.value?.width) {
        return 0
    }
    let r = (bridgeRef.value?.width / 100) * 5 || 50;
    if (r < 50) { r = 50; }
    return r
})

const loadImage = () => {
    let img = new Image();
    // img.loc = 'https://s3-us-west-2.amazonaws.com/s.cdpn.io/4273/';
    // img.filename = 'calgary-bridge-2013.jpg';
    if (window.devicePixelRatio >= 2) {
        // var nameParts = img.filename.split('.');
        // img.src = img.loc + nameParts[0] + "-2x" + "." + nameParts[1];
        // img.src = "https://s3-us-west-2.amazonaws.com/s.cdpn.io/4273/calgary-bridge-2013-2x.jpg";
        img.src = getAssetsImage('calgary-bridge-2013.jpg')
    } else {
        // img.src = "https://s3-us-west-2.amazonaws.com/s.cdpn.io/4273/calgary-bridge-2013.jpg";
        img.src = getAssetsImage('calgary-bridge-2013.jpg')
    }
    img.onload = function () {
        bridgeCanvas.value?.drawImage(img, 0, 0, (bridgeRef.value as HTMLCanvasElement).width, (bridgeRef.value as HTMLCanvasElement).height);
    }
}


function detectLeftButton(event: any) {
    if ('buttons' in event) {
        return event.buttons === 1;
    } else if ('which' in event) {
        return event.which === 1;
    } else {
        return event.button === 1;
    }
}

function getBrushPos(xRef: number, yRef: number) {
    var bridgeRect = bridgeRef.value?.getBoundingClientRect() as DOMRect;
    return {
        x: Math.floor((xRef - bridgeRect.left) / (bridgeRect.right - bridgeRect.left) * (bridgeRef.value as HTMLCanvasElement).width),
        y: Math.floor((yRef - bridgeRect.top) / (bridgeRect.bottom - bridgeRect.top) * (bridgeRef.value as HTMLCanvasElement).height)
    };
}

function drawDot(mouseX: number, mouseY: number) {
    bridgeCanvas.value?.beginPath();
    bridgeCanvas.value?.arc(mouseX, mouseY, brushRadius.value, 0, 2 * Math.PI, true);
    (bridgeCanvas.value as CanvasRenderingContext2D).fillStyle = '#000';
    (bridgeCanvas.value as CanvasRenderingContext2D).globalCompositeOperation = "destination-out";
    bridgeCanvas.value?.fill();
}

</script>

<style scoped lang="scss">
.scratch-canvas-container {
    width: 100%;
    height: calc(100vh - var(--TopHeaderHeight));
    position: relative;
    overflow: hidden;

    #bridge {
        display: block;
        margin: 0 auto;
        background-image: url("@/assets/images/calgary-bridge-1943.jpg");
        background-image: -webkit-image-set(url("https://s3-us-west-2.amazonaws.com/s.cdpn.io/4273/calgary-bridge-1943.jpg") 1x, url("https://s3-us-west-2.amazonaws.com/s.cdpn.io/4273/calgary-bridge-1943-2x.jpg") 2x);
        background-size: cover;
        width: 100%;
        max-width: 750px;
        height: auto;
        cursor: crosshair;
        cursor: url('@/assets/images/circular-cursor.png') 53 53, crosshair;
    }

    #bridgeContainer {
        text-align: center;
        font-family: Avenir, sans-serif;
    }

    #bridgeContainer figcaption {
        margin-top: 2rem;
    }
}
</style>