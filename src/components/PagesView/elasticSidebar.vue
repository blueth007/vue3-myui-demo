<template>
    <div class="elastic-sidebar-container">
        <div class="demo">
            <svg class="sidebar" viewBox="0 0 300 500">
                <path class="s-path" fill="#fff" d="M0,0 50,0 a0,250 0 1,1 0,500 L0,500" />
            </svg>
            <div class="static">
                <div class="static__text">Pull white sidebar to the right</div>
            </div>
            <div class="sidebar-content">
                <div class="contact" v-for="con in contacts" @click="handleContact(con, $event)" :key="con.name">
                    <img :src="con.photo" alt="" class="contact__photo" />
                    <span class="contact__name">{{ con.name }}</span>
                    <span class="contact__status " :class="{ 'online': con.online }"></span>
                </div>
                <div class="search">
                    <img src="https://s3-us-west-2.amazonaws.com/s.cdpn.io/142996/elastic-srch.png" alt=""
                        class="search__img" />
                    <input type="text" class="search__input" placeholder="Search" />
                </div>
            </div>
            <div class="chat" v-if="activeContact">
                <span class="chat__back" @click="handleBack"></span>
                <span class="chat__status">status</span>
                <div class="chat__person">
                    <span class="chat__online " :class="activeContact.online ? 'active' : ''"></span>
                    <span class="chat__name">{{ activeContact.name }}</span>
                </div>
                <div class="chat__person_photo">
                    <img :src="activeContact.photo" alt="">
                </div>
                <div class="chat__messages">
                    <div class="chat__msgRow">
                        <div class="chat__message mine">Such SVG, much Javascript, very CSS!</div>
                    </div>
                    <div class="chat__msgRow">
                        <div class="chat__message notMine">Wow!</div>
                    </div>
                    <div class="chat__msgRow">
                        <div class="chat__message notMine">Very elastic! Such easings!</div>
                    </div>
                    <div class="chat__msgRow">
                        <div class="chat__message mine">
                            Check out my other <a href="https://codepen.io/suez/public/" target="_blank">pens</a>
                        </div>
                    </div>
                    <div class="chat__msgRow">
                        <div class="chat__message mine">
                            Check out my other <a href="https://codepen.io/suez/public/" target="_blank">pens</a>
                        </div>
                    </div>
                    <div class="chat__msgRow">
                        <div class="chat__message mine">
                            Check out my other <a href="https://codepen.io/suez/public/" target="_blank">pens</a>
                        </div>
                    </div>
                    <div class="chat__msgRow">
                        <div class="chat__message mine">
                            Check out my other <a href="https://codepen.io/suez/public/" target="_blank">pens</a>
                        </div>
                    </div>
                    <div class="chat__msgRow">
                        <div class="chat__message mine">
                            Check out my other <a href="https://codepen.io/suez/public/" target="_blank">pens</a>
                        </div>
                    </div>
                </div>
                <input type="text" class="chat__input" placeholder="Your message" />
            </div>
        </div>
    </div>
</template>

<script setup lang="ts">
import { reactive, computed, onMounted } from 'vue'
const data = reactive({
    diffX: 0,
    curX: 0,
    finalX: 0,
    frame: 1000 / 60,
    animTime: 600,
    sContTrans: 200,
    animating: false
})

const activeContact = ref()

const contacts = reactive([
    {
        id: 0,
        name: "Ethan Hawke",
        photo: "https://s3-us-west-2.amazonaws.com/s.cdpn.io/142996/elastic-man.png",
        online: true,
    }, {
        id: 1,
        name: "Rosamund Pike",
        photo: "https://s3-us-west-2.amazonaws.com/s.cdpn.io/142996/elastic-girl.png",
        online: true
    }, {
        id: 2,
        name: "Scarlett Johansson",
        photo: "https://s3-us-west-2.amazonaws.com/s.cdpn.io/142996/elastic-man.png",
        online: true
    },
    {
        id: 3,
        name: "Kevin Spacey",
        photo: "https://s3-us-west-2.amazonaws.com/s.cdpn.io/142996/elastic-man.png",
        online: true
    }, {
        id: 4,
        name: "Natalie Portman",
        photo: "https://s3-us-west-2.amazonaws.com/s.cdpn.io/142996/elastic-girl.png",
        online: false
    }, {
        id: 5,
        name: "Robert Redford",
        photo: "https://s3-us-west-2.amazonaws.com/s.cdpn.io/142996/elastic-man.png",
        online: false
    },
    {
        id: 6,
        name: "Tom Cruise",
        photo: "https://s3-us-west-2.amazonaws.com/s.cdpn.io/142996/elastic-man.png",
        online: false
    }
])

var startD = createD(50, 0, 1),
    midD = createD(125, 75, 0),
    finalD = createD(200, 0, 1),
    clickMidD = createD(300, 80, 0),
    clickMidDRev = createD(200, 100, 1),
    clickD = createD(300, 0, 1),
    currentPath = startD;

// const $svg = computed(() => document.querySelector(".sidebar") as HTMLElement)
const $path = computed(() => document.querySelector(".s-path") as HTMLElement)
const $sCont = computed(() => document.querySelector(".sidebar-content") as HTMLElement)
const $demo = computed(() => document.querySelector(".demo") as HTMLElement)
const $chat = computed(() => document.querySelector(".chat") as HTMLElement)
const demoTop = computed(() => $demo.value.offsetTop)
const demoLeft = computed(() => $demo.value.offsetLeft)

onMounted(() => {
    handlers1();
})
var easings = {
    smallElastic: function (t: number, b: number, c: number, d: number) {
        var ts = (t /= d) * t;
        var tc = ts * t;
        return b + c * (33 * tc * ts + -106 * ts * ts + 126 * tc + -67 * ts + 15 * t);
    },
    inCubic: function (t: number, b: number, c: number, d: number) {
        var tc = (t /= d) * t * t;
        return b + c * (tc);
    }
} as { [key: string]: (t: number, b: number, c: number, d: number) => number };

const handlePathMousedown = (e: any) => {
    var startX = e.pageX || e.originalEvent.touches[0].pageX;



    const handleDrag = (e: any) => {
        var x = e.pageX || e.originalEvent.touches[0].pageX;
        data.diffX = x - startX;
        if (data.diffX < 0) data.diffX = 0;
        if (data.diffX > 300) data.diffX = 300;
        data.curX = Math.floor(data.diffX / 2);
        $path.value.setAttribute("d", newD(data.curX));
    }
    document.addEventListener("mousemove", handleDrag);
    document.addEventListener("touchmove", handleDrag);
    document.addEventListener("mouseup", function () {
        document.removeEventListener("mousemove", handleDrag);
        if (data.animating) return;
        if (!data.diffX) return
        if (data.diffX < 40) {
            animatePathD($path.value, newD(0), data.animTime, true);
        } else {
            animatePathD($path.value, finalD, data.animTime, false, function () {
                $sCont.value.classList.add("active");
                setTimeout(function () {
                    // $(document).on("click", closeSidebar);
                    document.addEventListener("click", closeSidebar);
                }, data.sContTrans);
            });
        }
    });

}

function animatePathD(path: HTMLElement, d: string, time: number, handlers: boolean, callback?: Function, easingTop?: string, easingX?: string) {
    var steps = Math.floor(time / data.frame),
        curStep = 0,
        oldArr = currentPath.split(" "),
        newArr = d.split(" "),
        // oldLen = oldArr.length,
        // newLen = newArr.length,
        oldTop = +oldArr[1].split(",")[0],
        topDiff = +newArr[1].split(",")[0] - oldTop,
        nextTop,
        nextX,
        // easingTop = easingTop && easings[easingTop] || easings.smallElastic,
        easing_Top = easings[easingTop ? easingTop : 'smallElastic'],
        easing_X = easingX && easings[easingX] || easing_Top;

    // $(document).off("mousedown mouseup");
    document.removeEventListener("mousedown", handlePathMousedown);
    document.removeEventListener("mouseup", handlePathMousedown);

    function animate() {
        curStep++;
        nextTop = easing_Top(curStep, oldTop, topDiff, steps);
        nextX = easing_X(curStep, data.curX, data.finalX - data.curX, steps);
        oldArr[1] = nextTop + ",0";
        oldArr[2] = "a" + Math.abs(nextX) + ",250";
        oldArr[4] = (nextX >= 0) ? "1,1" : "1,0";
        path.setAttribute("d", oldArr.join(" "));
        if (curStep > steps) {
            data.curX = 0;
            data.diffX = 0;
            path.setAttribute("d", d);
            currentPath = d;
            if (handlers) handlers1();
            if (callback) callback();
            return;
        }
        requestAnimationFrame(animate);
    }
    animate();
}
function handlers1() {
    $path.value.addEventListener("mousedown", handlePathMousedown);
    $path.value.addEventListener("touchstart", handlePathMousedown);
}
function createD(top: number, ax: number, dir: number) {
    return "M0,0 " + top + ",0 a" + ax + ",250 0 1," + dir + " 0,500 L0,500";
}
function newD(num1: number, num2?: number) {
    var $path = document.querySelector(".s-path") as HTMLElement;
    var d = $path.getAttribute("d") as string;
    let num_2 = num2 || 250
    var nd = d.replace(/\ba(\d+),(\d+)\b/gi, "a" + num1 + "," + num_2);
    return nd;
}


function closeSidebar(e: Event) {

    if ((e.target as Element).closest(".sidebar-content") ||
        (e.target as Element).closest(".chat")) { return };
    if (data.animating) return;
    data.animating = true;
    $sCont.value.classList.remove("active");
    $chat.value.classList.remove("active");
    // $(".cloned").addClass("removed");
    document.querySelector(".cloned")?.classList.add("removed");
    data.finalX = -75;
    setTimeout(function () {
        animatePathD($path.value, midD, data.animTime / 3, false, function () {
            // $chat.hide();
            $chat.value.style.display = "none";
            // $(".cloned").remove();

            data.finalX = 0;
            data.curX = -75;
            animatePathD($path.value, startD, data.animTime / 3 * 2, true);
            data.animating = false;
        }, "inCubic");
    }, data.sContTrans);
    // $(document).off("click", closeSidebar);
    document.removeEventListener("click", closeSidebar);
}

const handleContact = (item: any, e: Event) => {
    console.log("handleContact", data.animating);
    activeContact.value = item
    if (data.animating) return;
    data.animating = true;
    document.removeEventListener("click", closeSidebar);
    const elem = document.querySelector(".contact") as HTMLElement
    // var name = elem.querySelector(".contact__name")?.innerHTML || "",
    //     online = elem.querySelector(".contact__status")?.classList.contains("online");
    // document.getElementsByClassName("chat__name")[0].innerHTML = name;
    // document.querySelector(".chat__online")?.classList.remove("active");
    if (item.online) {
        document.querySelector(".chat__online")?.classList.add("active");
    }
    ripple(elem, e as MouseEvent);
    setTimeout(function () {
        $sCont.value.classList.remove("active");
        // moveImage(elem);
        data.finalX = -80;
        setTimeout(function () {
            // $(".ripple").remove();
            animatePathD($path.value, clickMidD, data.animTime / 3, false, function () {
                data.curX = -80;
                data.finalX = 0;
                animatePathD($path.value, clickD, data.animTime * 2 / 3, true, function () {
                    // $chat.show();
                    // $chat.css("top");
                    // $chat.addClass("active");
                    $chat.value.classList.add("active")
                    $chat.value.style.display = 'block'
                    data.animating = false;
                    scrollBottom()
                });
            }, "inCubic");
        }, data.sContTrans);
    }, data.sContTrans);
}

// document.querySelectorAll(".contact")?.forEach((item: any) => {
//     item.addEventListener("click", handleContact);
// })

const handleBack = () => {
    if (data.animating) return;
    data.animating = true;
    $chat.value.classList.remove("active");
    setTimeout(function () {
        // $(".cloned").remove();
        $chat.value.style.display = "none"
        data.finalX = 100;
        animatePathD($path.value, clickMidDRev, data.animTime / 3, false, function () {
            data.curX = 100;
            data.finalX = 0;
            animatePathD($path.value, finalD, data.animTime * 2 / 3, true, function () {
                $sCont.value.classList.add("active");
                // $(document).on("click", closeSidebar);
                document.addEventListener("click", closeSidebar);
                data.animating = false;
            });
        }, "inCubic");
    }, data.sContTrans);
}


function moveImage(that: HTMLElement) {
    var $img = that.querySelector(".contact__photo") as HTMLImageElement,
        top = $img.offsetTop - demoTop.value,
        left = $img.offsetLeft - demoLeft.value,
        //  $clone = $img.clone().addClass("cloned");
        $clone = ($img.cloneNode(true) as HTMLElement);
    $clone.classList.add("cloned")
    //     $clone.css({ top: top, left: left });
    $clone.style.top = top + "px";
    $clone.style.left = left + "px";
    $demo.value.insertBefore($clone, $demo.value.childNodes[0]);
    // $demo.append($clone);
    // $clone.css("top");
    // $clone.css({ top: "1.8rem", left: "25rem" });
    $clone.style.top = "1.8rem";
    $clone.style.left = "25rem";
}
const scrollBottom = () => {
    const scrollHeight = document.querySelector(".chat__messages")?.scrollHeight;
    document.getElementsByClassName("chat__messages")[0].scrollTop = scrollHeight as number;
}

function ripple(elem: HTMLElement, e: MouseEvent) {
    var elTop = elem.offsetTop,
        elLeft = elem.offsetTop,
        x = e.pageX - elLeft,
        y = e.pageY - elTop;
    var $ripple = document.createElement("div");
    $ripple.className = "ripple";
    $ripple.style.top = y + "px";
    $ripple.style.left = x + "px";
    // $("<div class='ripple'></div>");
    // $ripple.css({ top: y, left: x });
    // elem.append($ripple);
    elem.insertBefore($ripple, elem.childNodes[0]);
}
</script>

<style scoped lang="scss">
.elastic-sidebar-container {
    width: 100%;
    height: calc(100vh - var(--TopHeaderHeight));
    position: relative;
    overflow: hidden;
    background: linear-gradient(45deg, #636f85, #6960a0);
    font-size: 62.5%;
    line-height: 1;

    *,
    *:before,
    *:after {
        box-sizing: border-box;
        margin: 0;
        padding: 0;
    }

    button,
    input {
        border: 0;
        outline: none;
    }

    .demo {
        position: absolute;
        top: 50%;
        left: 50%;
        margin-top: -25rem;
        margin-left: -15rem;
        width: 30rem;
        height: 50rem;
        box-shadow: 0 1rem 5rem rgba(0, 0, 0, 0.3);
    }

    .static {
        height: 100%;
        font-size: 1.8rem;
        font-family: "Open Sans", Helvetica, Arial, sans-serif;
        background: #6D7ADA;
    }

    .static:before,
    .static:after {
        content: "";
        position: absolute;
        left: 7rem;
        width: 2rem;
        height: 2rem;
        margin-left: -1rem;
        margin-top: -1rem;
        border: 2px solid #fff;
        border-left: none;
        border-bottom: none;
        transform: rotate(45deg);
        -webkit-animation: arrows 1.5s infinite;
        animation: arrows 1.5s infinite;
    }

    .static:before {
        top: 15rem;
    }

    .static:after {
        top: 35rem;
    }

    .static__text {
        width: 9rem;
        position: absolute;
        top: 50%;
        left: 50%;
        margin-left: -5rem;
        transform: translate3d(0, -50%, 0);
        color: #fff;
        perspective: 1px;
        -webkit-backface-visibility: hidden;
        backface-visibility: hidden;
    }

    .sidebar-content {
        z-index: -1;
        position: absolute;
        top: 0;
        left: 0;
        width: 20rem;
        height: 100%;
        padding-top: 1rem;
        opacity: 0;
        transition: opacity 200ms, z-index 0s 0s;
        background-color: #E9EAF3;
        overflow: hidden;
    }

    .sidebar-content.active {
        z-index: 2;
        opacity: 1;
    }

    .contact {
        position: relative;
        width: 100%;
        height: 5rem;
        padding-left: 1.7rem;
        display: flex;
        align-items: center;
        cursor: pointer;
        overflow: hidden;
    }

    .contact__photo {
        border-radius: 50%;
        margin-right: 1.5rem;
    }

    .contact__name {
        font-size: 1.2rem;
        font-family: "Open Sans", Helvetica, Arial, sans-serif;
    }

    .contact__status {
        position: absolute;
        top: 2.1rem;
        right: 1.5rem;
        width: 8px;
        height: 8px;
        border: 2px solid #00B570;
        border-radius: 50%;
        opacity: 0;
        transition: opacity 0.3s;
    }

    .contact__status.online {
        opacity: 1;
    }

    .search {
        position: absolute;
        bottom: 0;
        left: 0;
        width: 100%;
        height: 5.5rem;
        padding-left: 1.5rem;
        background: #fff;
        display: flex;
        align-items: center;
    }

    svg {
        overflow: visible;
    }

    .sidebar {
        z-index: 1;
        position: absolute;
        top: 0;
        left: 0;
        display: block;
        width: 100%;
        height: 100%;
    }

    .s-path {
        cursor: -webkit-grab;
        cursor: grab;
    }

    .cloned {
        position: absolute;
        z-index: 10;
        transition: top 0.3s, left 0.3s;
        transition-delay: 0.2s;
        transition-timing-function: cubic-bezier(0.55, 0.055, 0.675, 0.19);
    }

    .cloned.removed {
        transition: opacity 0.2s 0;
        opacity: 0;
    }

    .chat {
        display: none;
        z-index: 5;
        position: absolute;
        top: 0;
        left: 0;
        width: 100%;
        height: 100%;
        padding: 2.5rem 0 5.5rem 2.5rem;
        transition: opacity 200ms;
        opacity: 0;
    }

    .chat.active {
        opacity: 1;
    }

    .chat.active:before {
        width: 100%;
    }

    .chat:before {
        content: "";
        position: absolute;
        top: 0;
        left: 0;
        width: 100%;
        height: 0.5rem;
        background: #1CC6AE;
        width: 0;
        transition: width 0.2s;
    }

    .chat__back {
        position: relative;
        display: inline-block;
        width: 2rem;
        height: 2rem;
        margin-top: 0.5rem;
        margin-left: -0.6rem;
        cursor: pointer;
    }

    .chat__back:hover:before {
        transform: translateX(-0.3rem) rotate(-45deg);
    }

    .chat__back:before {
        content: "";
        position: absolute;
        display: block;
        top: 0.4rem;
        left: 0.6rem;
        width: 1.2rem;
        height: 1.2rem;
        border: 2px solid #545675;
        border-right: none;
        border-bottom: none;
        transform: rotate(-45deg);
        transition: transform 0.3s;
    }

    .chat__status {
        position: absolute;
        top: 2rem;
        right: 6.5rem;
        font-size: 1.2rem;
        font-family: "Open Sans", Helvetica, Arial, sans-serif;
        text-transform: uppercase;
        color: #B1A9A9;
    }

    .chat__person {
        display: inline-block;
        position: absolute;
        top: 3rem;
        right: 6.5rem;
        font-size: 2rem;
        font-family: "Open Sans", Helvetica, Arial, sans-serif;
        color: #36343D;
    }

    .chat__person_photo {
        position: absolute;
        border-radius: 50%;
        top: 2.2rem;
        left: 25rem;

        img {
            width: 100%;
            height: 100%;
            border-radius: 50%;
        }
    }

    .chat__online {
        position: absolute;
        top: 50%;
        left: -1.5rem;
        margin-top: -3px;
        width: 8px;
        height: 8px;
        border: 2px solid #00B570;
        border-radius: 50%;
        opacity: 0;
        transition: opacity 0.3s;
    }

    .chat__online.active {
        opacity: 1;
    }

    .chat__messages {
        position: absolute;
        top: 7.5rem;
        left: 2.5rem;
        width: 27.5rem;
        height: 37rem;
        padding-right: 2.5rem;
        overflow: auto;
        /* 隐藏默认的滚动条样式 */
        scrollbar-width: none;
        /* Firefox */
        -ms-overflow-style: none;

        /* IE and Edge */
        &::-webkit-scrollbar {
            display: none;
            /* Chrome, Safari, and Opera */
        }
    }

    .chat__msgRow {
        margin-bottom: 0.5rem;
    }

    .chat__msgRow:after {
        content: "";
        display: table;
        clear: both;
    }

    .chat__message {
        display: inline-block;
        max-width: 60%;
        padding: 1rem;
        font-size: 1.4rem;
        border-radius: 8px;
        font-family: "Open Sans", Helvetica, Arial, sans-serif;
    }

    .chat__message.mine {
        color: #2B2342;
        border: 1px solid #DFDFDF;
    }

    .chat__message.notMine {
        float: right;
        color: #23244E;
        background: #E9EAF3;
    }

    .chat__input {
        position: absolute;
        bottom: 0;
        left: 0;
        width: 100%;
        height: 5.5rem;
        padding: 1rem 1rem 1rem 4rem;
        background-image: url("https://s3-us-west-2.amazonaws.com/s.cdpn.io/142996/elastic-search.png");
        background-repeat: no-repeat;
        background-position: 1rem 1.5rem;
        background-color: #E9EAF3;
        color: #2B2342;
        font-size: 1.4rem;
        font-family: "Open Sans", Helvetica, Arial, sans-serif;
    }

    .ripple {
        position: absolute;
        width: 10rem;
        height: 10rem;
        margin-left: -5rem;
        margin-top: -5rem;
        background: rgba(0, 0, 0, 0.4);
        transform: scale(0);
        -webkit-animation: animRipple 0.3s;
        animation: animRipple 0.3s;
        border-radius: 50%;
    }

    @-webkit-keyframes animRipple {
        to {
            transform: scale(2.5);
            opacity: 0;
        }
    }

    @keyframes animRipple {
        to {
            transform: scale(2.5);
            opacity: 0;
        }
    }

    @-webkit-keyframes arrows {
        to {
            transform: translateX(100%) rotate(45deg);
            opacity: 0;
        }
    }

    @keyframes arrows {
        to {
            transform: translateX(100%) rotate(45deg);
            opacity: 0;
        }
    }


}
</style>