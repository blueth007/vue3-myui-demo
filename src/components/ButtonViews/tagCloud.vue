<template>
    <div class="tag-cloud-container">
        <div class="tag-cloud">
            <ul>
                <li><a href="javascript:void(0);"><span></span>high resolution</a></li>
                <li><a href="javascript:void(0);"><span></span>icons</a></li>
                <li><a href="javascript:void(0);"><span></span>layer styles</a></li>
                <li><a href="javascript:void(0);"><span></span>layout</a></li>
                <li><a href="javascript:void(0);"><span></span>letterpress</a></li>
                <li><a href="javascript:void(0);"><span></span>magazine</a></li>
                <li><a href="javascript:void(0);"><span></span>menu</a></li>
                <li><a href="javascript:void(0);"><span></span>metal</a></li>
                <li><a href="javascript:void(0);"><span></span>navigation</a></li>
                <li><a href="javascript:void(0);"><span></span>paper</a></li>
                <li><a href="javascript:void(0);"><span></span>pattern</a></li>
                <li><a href="javascript:void(0);"><span></span>plastic</a></li>
                <li><a href="javascript:void(0);"><span></span>ribbon</a></li>
                <li><a href="javascript:void(0);"><span></span>seamless</a></li>
                <li><a href="javascript:void(0);"><span></span>simple</a></li>
            </ul>
        </div>
    </div>
</template>

<script setup lang="ts" name="tagCloud">

</script>

<style scoped lang="scss">
.tag-cloud-container {
    width: 100%;
    height: calc(100vh - var(--TopHeaderHeight));
    position: relative;
    overflow: hidden;

    .tag-cloud {
        width: 332px;
        margin: auto;
    }

    .tag-cloud ul {
        list-style-type: none;
        padding: 0;
    }

    .tag-cloud li {
        margin: 5px 5px 5px 10px;
        float: left;
    }

    .tag-cloud a {
        display: inline-block;
        position: relative;
        color: #996633;
        text-shadow: 0 1px 0 rgba(255, 255, 255, 0.4);
        text-decoration: none;
        text-align: center;
        padding: 4px 9px 6px 6px;
        font: bold 11px Tahoma, sans-serif;
        border-radius: 3px;
        border: 1px solid #cc912d;

        -webkit-box-shadow: 0 1px 3px rgba(0, 0, 0, 0.12);
        box-shadow: 0 1px 2px rgba(0, 0, 0, 0.2),
            0 1px 0px rgba(255, 255, 255, 0.4) inset;

        background-image: -webkit-linear-gradient(top, rgba(254, 218, 113, 1) 0%, rgba(254, 205, 97, 1) 60%, rgba(254, 188, 74, 1) 100%);
        background-image: -moz-linear-gradient(top, rgba(254, 218, 113, 1) 0%, rgba(254, 205, 97, 1) 60%, rgba(254, 188, 74, 1) 100%);
        background-image: -o-linear-gradient(top, rgba(254, 218, 113, 1) 0%, rgba(254, 205, 97, 1) 60%, rgba(254, 188, 74, 1) 100%);
        background-image: -ms-linear-gradient(top, rgba(254, 218, 113, 1) 0%, rgba(254, 205, 97, 1) 60%, rgba(254, 188, 74, 1) 100%);
        background-image: linear-gradient(top, rgba(254, 218, 113, 1) 0%, rgba(254, 205, 97, 1) 60%, rgba(254, 188, 74, 1) 100%);
    }

    .tag-cloud a:hover {
        color: #492a0b;
    }

    .tag-cloud a:after {
        content: '';
        position: absolute;
        height: 50%;
        width: 15px;
        border-left: 1px solid #cc912d;

        background-image: -webkit-linear-gradient(top, rgba(255, 255, 255, 0) 0%, rgba(254, 218, 113, 1) 1%, rgba(254, 205, 97, 1) 100%);
        background-image: -moz-linear-gradient(top, rgba(255, 255, 255, 0) 0%, rgba(254, 218, 113, 1) 1%, rgba(254, 205, 97, 1) 100%);
        background-image: -o-linear-gradient(top, rgba(255, 255, 255, 0) 0%, rgba(254, 218, 113, 1) 1%, rgba(254, 205, 97, 1) 100%);
        background-image: -ms-linear-gradient(top, rgba(255, 255, 255, 0) 0%, rgba(254, 218, 113, 1) 1%, rgba(254, 205, 97, 1) 100%);
        background-image: linear-gradient(top, rgba(255, 255, 255, 0) 0%, rgba(254, 218, 113, 1) 1%, rgba(254, 205, 97, 1) 100%);
        left: -5px;
        top: 1px;

        -webkit-transform: skewX(-35deg);
        -moz-transform: skewX(-35deg);
        -o-transform: skewX(-35deg);
        -ms-transform: skewX(-35deg);
        transform: skewX(-35deg);
    }

    .tag-cloud a:before {
        content: '';
        position: absolute;
        height: 48%;
        width: 15px;
        border-left: 1px solid #cc912d;
        bottom: 1px;
        left: -5px;

        -webkit-transform: skewX(35deg);
        -moz-transform: skewX(35deg);
        -o-transform: skewX(35deg);
        -ms-transform: skewX(35deg);
        transform: skewX(35deg);

        background-image: -webkit-linear-gradient(top, rgba(240, 240, 240, 1) 0%, rgba(254, 205, 97, 1) 10%, rgba(254, 188, 74, 1) 100%);
        background-image: -moz-linear-gradient(top, rgba(240, 240, 240, 1) 0%, rgba(254, 205, 97, 1) 10%, rgba(254, 188, 74, 1) 100%);
        background-image: -o-linear-gradient(top, rgba(240, 240, 240, 1) 0%, rgba(254, 205, 97, 1) 10%, rgba(254, 188, 74, 1) 100%);
        background-image: -ms-linear-gradient(top, rgba(240, 240, 240, 1) 0%, rgba(254, 205, 97, 1) 10%, rgba(254, 188, 74, 1) 100%);
        background-image: linear-gradient(top, rgba(240, 240, 240, 1) 0%, rgba(254, 205, 97, 1) 10%, rgba(254, 188, 74, 1) 100%);

        -webkit-box-shadow: -2px 1px 2px rgba(100, 100, 100, 0.1);
        box-shadow: -2px 1px 2px rgba(100, 100, 100, 0.1);
    }

    .tag-cloud a span {
        background-color: #FFFFFF;
        border: 1px solid #CC912D;
        border-radius: 5px 5px 5px 5px;
        box-shadow: 0 1px 1px rgba(255, 255, 255, 0.4),
            0 1px 1px rgba(0, 0, 0, 0.2) inset;
        display: inline-block;
        height: 5px;
        left: -5px;
        position: relative;
        top: -1px;
        vertical-align: middle;
        width: 5px;
        z-index: 10;
    }
}</style>