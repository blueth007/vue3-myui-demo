<template>
    <div class="directionally-container">
        <h2>Hover around the boxes below</h2>
        <div class="directionally-wrapper">
            <div class="row">
                <div class="col">
                    <div class="photo-container"
                        style="background-image:url(https://source.unsplash.com/600x250/?sig=263);"></div>
                    <h2>Image 263 </h2>
                    <div class="slide">
                        <p>Autem possimus perspiciatis, eaque quos repudiandae modi labore sed repellat dolorum magnam
                            praesentium expedita esse tempore saepe nulla.</p>
                    </div>
                </div>
                <div class="col">
                    <div class="photo-container" style="background-image:url(https://source.unsplash.com/600x250/?sig=3);">
                    </div>
                    <h2>Image 3 </h2>
                    <div class="slide">
                        <p>Lorem ipsum dolor sit amet, consectetur adipisicing elit.</p>
                    </div>
                </div>
            </div>
            <div class="row">
                <div class="col">
                    <div class="photo-container"
                        style="background-image:url(https://source.unsplash.com/600x250/?sig=200);"></div>
                    <h2>Image 200 </h2>
                    <div class="slide">
                        <p>Lorem ipsum dolor sit amet, consectetur adipisicing elit.</p>
                    </div>
                </div>
            </div>
            <div class="row">
                <div class="col">
                    <div class="photo-container"
                        style="background-image:url(https://source.unsplash.com/600x250/?sig=167);"></div>
                    <h2>Image 167 </h2>
                    <div class="slide">
                        <p>Doloremque quisquam molestias, est laudantium vero aliquid dolorum inventore atque sint
                            perferendis qui dolor voluptas consequuntur non.</p>
                    </div>
                </div>
                <div class="col">
                    <div class="photo-container"
                        style="background-image:url(https://source.unsplash.com/600x250/?sig=185);"></div>
                    <h2>Image 185 </h2>
                    <div class="slide">
                        <p>Facere illo pariatur necessitatibus fugit quo impedit, quae, corporis placeat recusandae dolor
                            ipsa nobis!</p>
                    </div>
                </div>
                <div class="col">
                    <div class="photo-container" style="background-image:url(https://source.unsplash.com/600x250/?sig=64);">
                    </div>
                    <h2>Image 64 </h2>
                    <div class="slide">
                        <p>Quam molestiae ipsa sapiente mollitia, nobis.</p>
                    </div>
                </div>
                <div class="col">
                    <div class="photo-container" style="background-image:url(https://source.unsplash.com/600x250/?sig=27);">
                    </div>
                    <h2>Image 27 </h2>
                    <div class="slide">
                        <p>Autem possimus perspiciatis, eaque quos repudiandae modi labore sed repellat dolorum magnam
                            praesentium expedita esse tempore saepe nulla.</p>
                    </div>
                </div>
                <div class="col">
                    <div class="photo-container" style="background-image:url(https://source.unsplash.com/600x250/?sig=15);">
                    </div>
                    <h2>Image 15 </h2>
                    <div class="slide">
                        <p>Lorem ipsum dolor sit amet, consectetur adipisicing elit.</p>
                    </div>
                </div>
            </div>
            <div class="row">
                <div class="col">
                    <div class="photo-container"
                        style="background-image:url(https://source.unsplash.com/600x250/?sig=151);"></div>
                    <h2>Image 151 </h2>
                    <div class="slide">
                        <p>Lorem ipsum dolor sit amet, consectetur adipisicing elit.</p>
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>

<script setup lang="ts">


</script>

<style scoped lang="scss">
.directionally-container {

    width: 100%;
    height: calc(100vh - var(--TopHeaderHeight));
    position: relative;

    h2 {
        font-size: 2.5rem;
        font-weight: 300;
        margin: 1.5em 0.5rem 1em;
        text-align: center;
    }

    // overflow: hidden;
    .directionally-wrapper {
        margin: 0 auto;
        padding: 2rem;
        max-width: 1200px;
    }


    /* The magic */
    .col {
        // Prepare for absolute slide
        overflow: hidden;
        position: relative;
    }

    .slide {
        // Position inside column
        position: absolute;
        top: 0;
        right: 0;
        bottom: 0;
        left: 0;

        /* 
    Visibility delay gives the previously hovered element time to slide out before disappearing.
    Remove the `visibility` transition to slide in current element without sliding out previous element
  */
        $speed: 0.275s;
        transition: all $speed ease-in-out, visibility 0s $speed;
        visibility: hidden;
        will-change: transform;
        // Slides start below their columns, giving upward motion on hover
        transform: translateY(100%);
    }

    .row:hover {

        // Next row, slides are above their columns, giving downward motion on hover
        &~.row .slide {
            transform: translateY(-100%);
        }

        // Current row, slides to the right of their columns, giving left motion on hover
        .slide {
            transform: translateX(100%);
        }

        // Current row, next slides, slides to the left of their columns, giving right motion on hover
        & .col:hover~.col .slide {
            transform: translateX(-100%);
        }

        // Current slide
        .col:hover .slide {
            transform: none;
            visibility: visible;
            transition-delay: 0s;
        }
    }

    /* Pen styling */

    .row {
        display: flex;
    }

    .col {
        color: #fff;
        flex: 1 1 auto;
        min-height: 260px;
        position: relative;

        h2 {
            font-weight: 300;
            font-size: calc((14 * 1.33333) / 14) * 1rem;
            line-height: 1.25;
            margin: 0;
            position: absolute;
            bottom: 1.5rem;
            right: 1.5rem;
            z-index: 0;
        }
    }

    // Some size difference for variety
    .col:nth-child(2) {
        min-width: 20%;
    }

    .col:nth-child(4) {
        min-width: 33%;
    }

    .col:nth-child(3)+.col:nth-child(3) {
        min-width: 50%;
    }

    // Photo is in its own container, so we can zoom it
    .photo-container {
        background: #0f0523 50% 50% / cover;
        position: absolute;
        top: 0;
        right: 0;
        bottom: 0;
        left: 0;
        transition: 1s;
        transform-origin: bottom right;

        &::before {
            background: linear-gradient(transparent, rgba(#431133, 0.5), #000320);
            content: '';
            position: absolute;
            top: 0;
            right: 0;
            bottom: 0;
            left: 0;
        }

        .col:hover & {
            transform: scale(1.25);
        }
    }

    // Basic slide styles
    .slide {
        background: rgba(#190115, 0.8);
        padding: 0 1.5rem;
    }
}
</style>