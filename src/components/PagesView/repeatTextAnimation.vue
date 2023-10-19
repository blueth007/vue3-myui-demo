<template>
    <div class="repeat-text-animation-container">
        <div class="section-warper">
            <div>
                <h1>Next Effect</h1><a id="next" @click="handleNext">Next &raquo;</a>
            </div>
            <div class="repeat-article-content" ref="rpt_art_content">
                <div class="repeat-article  current">
                </div>
                <div class="repeat-article">
                </div>
            </div>
        </div>
    </div>
</template>

<script setup lang="ts">

const currentIndex = ref(0)
const rpt_art_content = ref<HTMLElement>()
const isClick = ref(false);
const articles = reactive([
    {
        index: "0",
        content: `Lorem ipsum dolor sit amet, consectetur adipiscing elit. Morbi in risus quis quam mollis egestas vitae in 
             mi. Sed euismod ut quam eu ultricies. Curabitur id nunc rutrum, ultricies massa vel, tincidunt nisl. 
            Maecenas ac dui ornare, fermentum orci sit amet, ultrices metus. Maecenas ac ullamcorper augue. Proin sapien  
            nunc, condimentum eget blandit at, congue non leo. Curabitur ullamcorper mi eros, id scelerisque quam  
            egestas et. Aliquam egestas, leo ac viverra mollis, elit ipsum egestas justo, id faucibus metus dui sed 
            elit. Pellentesque sed libero nec nibh dignissim tincidunt a vel est. Aenean blandit augue quis turpis ultrices convallis`
    }, {
        index: "1",
        content: `Quisque tincidunt libero eros, et vulputate tortor sagittis non. Duis ullamcorper tortor ut tortor varius
                consequat. Vivamus suscipit consectetur fringilla. Etiam tristique porta elit id lacinia. Nam porta viverra
                adipiscing. Nullam gravida fermentum odio at ultrices. Cras et massa massa. Nam ligula mi, dignissim sit
                amet lectus eget, accumsan egestas metus. Aenean euismod id neque eget eleifend. Aliquam elementum blandit
                magna, a dapibus ipsum hendrerit vel. Duis ornare, lectus ut lobortis eleifend, ligula purus varius massa, a
                dictum tortor nulla eget massa. Sed sed augue a nunc faucibus lacinia sed vitae tortor. Curabitur non congue
                nisl, ac sodales erat. Morbi purus tortor, viverra vitae diam et, interdum dictum lectus. Donec at lacus
                est.`
    },
    {
        index: "2",
        content: `Suspendisse nec metus adipiscing justo vehicula suscipit. Integer et ultrices erat. Duis id mauris dapibus,
                vulputate libero at, condimentum urna. Maecenas sed pretium quam. In nec molestie turpis. Donec vel rhoncus
                diam. Quisque at vehicula eros. Cras turpis nisl, commodo nec tincidunt ac, feugiat vitae risus. Nunc sit
                amet gravida lectus, quis pellentesque sem.`
    }
])

onMounted(() => {
    nextTick(() => {
        inText()
    })
})

const inText = () => {
    const parent = rpt_art_content.value as HTMLElement;
    (parent.querySelector(".current")?.nextElementSibling as HTMLElement).innerHTML = articles[currentIndex.value].content
    nextTick(() => {
        spanText()
    })
}

const spanText = () => {
    const parent = rpt_art_content.value as HTMLElement;
    parent.querySelectorAll(".repeat-article").forEach(element => {

        if (element.querySelector("span")) {
            return
        }
        const txt_old = element.innerHTML.split(/\s/);
        let text_new = "";
        for (let i = 0; i < txt_old.length; i++) {
            if (txt_old[i] != '') {
                text_new += `<span data-value='${txt_old[i]}'>${txt_old[i]}</span> `;
            }
        }
        element.innerHTML = text_new;
    })
    nextTick(() => {
        positionText()
    })
}
const beforeExchange = () => {
    const parent = rpt_art_content.value as HTMLElement;
    const current = parent.children[0], next = parent.children[1];
    // current.classList.add("ok")
    current.querySelectorAll("span").forEach(item => {
        item.classList.add("mute") // mute opacity:0
    })
    next.querySelectorAll("span").forEach(item => {
        let value = item.getAttribute("data-value");
        let eles = current.querySelectorAll(`span[data-value='${value}']:not(.set)`)
        if (eles?.length) {
            let ele = current.querySelector(`span[data-value='${value}']:not(.set)`);
            (ele as HTMLElement).style.top = item.style.top;
            (ele as HTMLElement).style.left = item.style.left;
            ele?.classList.add("set")
            ele?.classList.remove("mute");
        }
    })
    current.classList.add("mute");

}

const exChange = () => {

    const parent = rpt_art_content.value as HTMLElement;
    parent.querySelectorAll(".repeat-article").forEach(element => {
        element.classList.remove("current");
        element.classList.remove("ok");
    })
    const p0 = parent.children[0]
    const p1 = parent.children[1]
    parent.insertBefore(p1, p0);
    parent.querySelector(".repeat-article")?.classList.add("current");
    parent.querySelector(".repeat-article")?.classList.add('ok');
    currentIndex.value++;
    if (currentIndex.value == articles.length) {
        currentIndex.value = 0
    }
    nextTick(() => {
        inText()
    })
}

function positionText() {
    const parent = rpt_art_content.value as HTMLElement;
    parent.querySelectorAll(".repeat-article").forEach(element => {
        const spans = element.querySelectorAll("span");
        for (let i = 0; i < spans.length; i++) {
            spans[i].style.width = spans[i].offsetWidth + 'px';
            spans[i].style.top = spans[i].offsetTop + 'px';
            spans[i].style.left = spans[i].offsetLeft + 'px';
            spans[i].setAttribute("data-offset-y", spans[i].offsetTop + '');
            spans[i].setAttribute("data-offset-x", spans[i].offsetLeft + '');
        }
    })
    isClick.value = false
}


const handleNext = () => {
    if (isClick.value) {
        return
    }
    isClick.value = true
    beforeExchange()
    setTimeout(() => {
        exChange()
    }, 1100)
}
</script>

<style scoped lang="scss">
.repeat-text-animation-container {
    width: 100%;
    position: relative;
    height: calc(100vh - var(--TopHeaderHeight));
    overflow: hidden;
    background: #f1f1f1;
    font-family: "Open Sans";
    -webkit-text-size-adjust: 100%;

    .section-warper {
        width: 500px;
        margin: 50px auto;

        h1 {
            display: inline-block;
            font-size: 2em;
            margin: 0.67em 0;
        }

        #next {
            // display: inline-block;
            float: right;
            line-height: 85px;
            font-size: 20px;
            color: #36c;
            text-decoration: none;
        }

        .repeat-article:not(.current) {
            opacity: 0;
        }

    }

    // &.current {

    //     animation: fade-in 2s forwards;
    // }

    @keyframes fade-in {
        from {
            opacity: 0;
        }

        to {
            opacity: 1;
            color: red;
        }
    }
}
</style>
<style lang="scss">
.repeat-text-animation-container {

    .repeat-article {

        &.ok span {
            position: absolute;
        }

        &.mute span.mute {
            filter: progid:DXImageTransform.Microsoft.Alpha(Opacity=0);
            opacity: 0;
        }

        span {
            display: inline-block;
            -moz-transition-property: top, left, opacity;
            -o-transition-property: top, left, opacity;
            -webkit-transition-property: top, left, opacity;
            transition-property: top, left, opacity;
            -moz-transition-duration: 1000ms;
            -o-transition-duration: 1000ms;
            -webkit-transition-duration: 1000ms;
            transition-duration: 1000ms;
        }

        span.mute {
            filter: progid:DXImageTransform.Microsoft.Alpha(Opacity=30);
            opacity: 0.3;
        }

    }

}
</style>