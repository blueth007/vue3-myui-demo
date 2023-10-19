<template>
    <div class="hamburger-menu">
        <nav class="menu" :class="{ 'closed': closed }" :style="'--count:' + count + ';'">
            <div class="header">Menu
                <span>×</span>
            </div>
            <ol>
                <li class="menu-item" v-for="item in menus" :key="item.path">
                    <a ref="itemRefs">{{ item.name }}</a>
                    <ol class="sub-menu" v-if="item.children">
                        <li class="menu-item" v-for="it in item.children" :key="it.path">
                            <a ref="itemRefs">{{ it.name }}</a>
                        </li>
                    </ol>
                </li>
            </ol>
            <footer><button aria-label="Toggle Menu" @click="handleToggle">Toggle</button></footer>
        </nav>
    </div>
</template>

<script setup lang="ts">

const itemRefs = ref<Array<any>>();
const menus = reactive([{
    name: "Home",
    path: "/home"
}, {
    name: "About",
    path: "/about"
}, {
    name: "Widgets",
    path: "/widgets",
    children: [{
        name: "Big Widgets",
        path: "/widgets/big"
    }, {
        name: "Bigger Widgets",
        path: "/widgets/bigger"
    }, {
        name: "Huge Widgets",
        path: "/widgets/huge"
    }]
}, {
    name: "Kabobs",
    path: "/kabobs",
    children: [{
        name: "Shishkabobs",
        path: "/kabobs/shishkabobs"
    }, {
        name: "BBQ kabobs",
        path: "/kabobs/bbq"
    }, {
        name: "Summer kabobs",
        path: "/kabobs/summer"
    }]
}, {
    name: "Contact",
    path: "/contact"
}]);

const count = computed(() => {
    let i = 1;
    menus.forEach(item => {
        i++
        if (item.children) {
            i += item.children.length;
        }
    })
    return i
})

// const EleTop = (event: Event) => {
//     return (event.target as HTMLElement).getBoundingClientRect().top
// }
const closed = ref(false)
onMounted(() => {
    changeTop()
})
const changeTop = (desc: boolean = false) => {
    const p_top = document.querySelector(".hamburger-menu .menu")?.getBoundingClientRect().top || 0;
    if (!desc) {
        (document.querySelector(".hamburger-menu .menu .header") as HTMLElement).style.setProperty('--top', 0 + 'px');
        (document.querySelector(".hamburger-menu .menu .header") as HTMLElement).style.setProperty('--delay-in', count.value / 10 + 's');
        (document.querySelector(".hamburger-menu .menu .header") as HTMLElement).style.setProperty('--delay-out', 0 + 's')
    } else {
        (document.querySelector(".hamburger-menu .menu .header") as HTMLElement).style.setProperty('--top', 0 + 'px');
        (document.querySelector(".hamburger-menu .menu .header") as HTMLElement).style.setProperty('--delay-in', 0 + 's');
        (document.querySelector(".hamburger-menu .menu .header") as HTMLElement).style.setProperty('--delay-out', count.value / 10 + 's');

    }
    itemRefs.value && itemRefs.value.forEach((item, index) => {

        if (!desc) {
            item.style.setProperty('--top', p_top + 'px');
            item.style.setProperty('--delay-in', (count.value - index) * 0.1 + 's');
            item.style.setProperty('--delay-out', index * 0.1 + 's');
        } else {
            let top = item.getBoundingClientRect().top;
            //--top: 0px; --delay-in: 1.1s; --delay-out: 0.2s;
            item.style.setProperty('--top', (top - p_top - index % 3 * 15) + 'px');
            item.style.setProperty('--delay-in', index * 0.1 + 's');
            item.style.setProperty('--delay-out', (count.value - index) * 0.1 + 's');

        }
    })
}

const handleToggle = (e: Event) => {
    e.preventDefault();
    changeTop(true)
    closed.value = !closed.value
    e.stopPropagation();
}
</script>

<style scoped lang="scss">
.hamburger-menu {
    position: relative;
    width: 100%;
    height: 80%;
    background-color: #9fcedf;
    border: 1px solid #9fcedf;

    * {
        box-sizing: border-box;
        color: #333;
        font-size: 100%;
        line-height: 1.5;
    }
}

.menu {
    position: relative;
}

nav {
    --duration: 0.5s;
    --easing: ease-in-out;
    position: relative;
    width: 220px;
    margin: 20px;


}

nav ol {
    list-style-type: none;
    margin: 0;
    padding: 0;

}

nav li {
    margin: -4px 0 0 0;
    list-style: none;
}

nav a {
    display: block;
    text-decoration: none !important;
    background: #fff;
    transform-origin: 0 0;
    transition: transform var(--duration) var(--easing), color var(--duration) var(--easing);
    transition-delay: var(--delay-out);
    border-radius: 4px;
    padding: 1em 1.52em;

}



nav a:hover {
    background: #efefef;
}

nav .sub-menu a {
    font-size: 0.9em;
    color: #666666;
    border-left: 2em solid white;
    padding: 0.75em;
    background: linear-gradient(to right, #ddd 2px, #fff 2px);
}

nav .sub-menu a:hover {
    background: linear-gradient(to right, #ddd 2px, #efefef 2px);
}

nav .header {
    font-weight: 600;
    display: block;
    background: rgba(255, 255, 255, 0.5);
    transform-origin: 0 0;
    transition: transform var(--duration) var(--easing), color var(--duration) var(--easing);
    transition-delay: var(--delay-out);
    border-radius: 4px;
    padding: 1em 1.52em;
}

nav .header span {
    border: none;
    background: transparent;
    font-size: 1.5em;
    padding: 0;
    cursor: pointer;
    line-height: 1;
    float: right;
}

nav footer button {
    position: absolute;
    top: 0;
    left: 0;
    border: none;
    padding: calc(1em - 2px);
    width: 100%;
    transform-origin: 0 0;
    transition: transform var(--duration) var(--easing);
    transition-delay: calc(var(--duration) + (.1s * (var(--count) / 2)));
    cursor: pointer;
    outline: none;
    background: #cdcdcd;
    opacity: 0;
}

nav.closed a,
nav.closed .header {
    transform: translateY(calc(var(--top) * -1)) scaleY(0.1) scaleX(0.2);
    transition-delay: var(--delay-in);
    color: transparent;
}



nav.closed footer button {
    transition-delay: 0s;
    transform: scaleY(0.7) scaleX(0.2);
}
</style>