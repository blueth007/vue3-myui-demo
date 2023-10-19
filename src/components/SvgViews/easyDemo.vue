
<template>
    <div class="svg-easy-demo-container">
        <div>
            <p> <strong>&lt g &gt</strong>标签是分组 整体的一些属性共用。 text-anchor="middle"是文字左右居中，垂直居中:y+ font-size/2-2</p>
            <svg width="200px" height="200px" style="border:1px solid">
                <g transform="translate( 100,100 )" fill="none" stroke-width="5" style="cursor: pointer;">
                    <circle r="50" stroke="red"></circle>
                    <circle r="70" stroke="blue"></circle>
                    <circle r="90" stroke="green"></circle>
                    <text x="0" y="8" text-anchor="middle" font-size="20" fill="#ccc">文字</text>
                    <image x="-45" y="-45" xlink:href="../../assets/images/cloud-bg.png" width="90" height="90">居中要平移一半宽高
                    </image>
                </g>
            </svg>
        </div>
        <div class="hover-svg"></div>
        <h3>仿百度地图标尺： move svg 移动鼠标画折线(点击画折线，移动找位置，右键取消移动)</h3>
        <div class="move-svg"></div>
        <h3>path A 命令 a(x半径,y半径,deg旋转角度,ar弧长(0:小弧，1：大弧),dir方向(0:逆时针，1:顺时针)，x终点坐标X,y终点坐标Y)</h3>
        <div class="a-svg"></div>
        <h3>饼状图（apply：可以画弧线，然后stroke-width来渲染颜色 dasharray可以设置虚线来增宽）</h3>
        <div class="pie-svg"></div>
        <h3>SVG 沿Path 运动</h3>
        <svg width="300" height="300">
            <path id="path" d="M100 20 A100 130 0 1 0 200 20 " stroke="none" stroke-width="3" fill="none" />
            <circle id="circle" r="10" x="-100" y="-100" fill="red"></circle>
        </svg>
    </div>
</template>

<script setup lang="ts">

const _mapData = reactive({
    centerNode: { text: "Center" },
    otherNode: [
        {
            x: 100, y: 100, text: "易车网"
        }, {
            x: 550, y: 180, text: "蜂鸟网"
        }
    ]
})

const _data = reactive({
    centerX: 0,
    centerY: 0,
    circleArr: [] as Array<any>
})

onMounted(() => {
    const p = document.querySelector(".hover-svg") as HTMLElement;
    _data.centerX = p.offsetWidth / 2, _data.centerY = p.offsetHeight / 2;

    // 自定义圈环环绕
    initCircleArrData(7, 150)
    initCircleArrData(12, 290)
    createSvg()
    // move svg
    moveSvgDom()
    // pie svg
    pieSvg()
    // svg 沿Path 运动
    nextTick(() => {
        Part4Move()
    })
})
// num : 小圈的个数，R：距离中心点距离
const initCircleArrData = (num: number, R: number) => {
    // 设定在一个小圈 外面设9个小圈环绕，每个圈的旋转角度 360/9=40，坐标根据圆心和半径来确定

    for (let i = 0; i < num; i++) {
        let x = Math.cos(i * (360 / num) * Math.PI / 180) * R + _data.centerX;
        let y = Math.sin(i * (360 / num) * Math.PI / 180) * R + _data.centerY;
        // 判断在svg 内部点
        if (x > 50 && y > 50 && (x + 50) < _data.centerX * 2 && (y + 50) < _data.centerY * 2) {
            _data.circleArr.push({ x, y, text: "TEXT" + i })
        }

    }
}
const createSvg = () => {
    const p = document.querySelector(".hover-svg") as HTMLElement;
    const _svg = createTag("svg", { width: "100%", height: "100%", });
    const _gc = createTag("g", { transform: `translate(${_data.centerX},${_data.centerY})`, fill: "white", "stroke-width": "2", "style": "cursor: pointer" });

    const _centerCir = createTag("circle", { r: "50", stroke: "blue", })
    const _text = createTag("text", { y: "8", "text-anchor": "middle", fontSize: "20", fill: "#ccc", html: _mapData.centerNode.text });
    const _img = createTag("image", { x: "-45", y: "-45", style: "z-index:1", "href": "src/assets/images/cloud-bg.png", width: "90", height: "90" });
    _gc.appendChild(_centerCir)
    _gc.appendChild(_text)
    _gc.appendChild(_img)
    // 遍历otherNode 添加到g
    _data.circleArr.forEach((item: any) => {
        _svg.appendChild(addOtherNode(item.x, item.y, item.text))
    })

    //svg 内部style
    const _style = document.createElement("style");
    _style.innerHTML = `
    .other_node circle{ transition:all 0.5s linear}
    .other_node:hover line{stroke-width:1;stroke:purple;} 
    .other_node:hover rect{ fill:skyblue;} .other_node:hover circle{  r:50;transition:all 0.5s ease  ;}`

    p?.appendChild(_svg)
    _svg.appendChild(_gc)
    _svg.appendChild(_style)
}
const createTag = (tag: string, attrs: { [key: string]: string }) => {
    const _nameSpace = "http://www.w3.org/2000/svg";
    const _svg = document.createElementNS(_nameSpace, tag);
    for (const key in attrs) {
        _svg.setAttribute(key, attrs[key])

    }
    if (attrs["html"]) {
        _svg.innerHTML = attrs['html']
    }
    if (attrs["href"]) {
        _svg.setAttributeNS("http://www.w3.org/1999/xlink", "href", attrs["href"])
    }
    return _svg
}
const addOtherNode = (x: string, y: string, text: string = "易车网") => {

    const _g = createTag("g", { "stroke-width": "1", fill: "white", "style": "cursor: pointer;", class: "other_node" });
    const _cir = createTag("circle", { cx: x, cy: y, r: "40", stroke: "red" });
    const _cirText = createTag("text", { x: x, y: +y + 8 + "", stroke: "red", "fontSize": "20", "text-anchor": "middle", html: text });
    const line = createTag("line", { x1: x, y1: y, x2: _data.centerX + '', y2: _data.centerY + '', "stroke-width": "1", stroke: "#ccc" })
    const line2 = createTag("line", { x1: x, y1: y, x2: _data.centerX + '', y2: _data.centerY + '', "stroke-width": "10", stroke: "transparent" })
    const rect = createTag("rect", { x: (+x + _data.centerX) / 2 - 10 + "", y: (+y + _data.centerY) / 2 - 10 + "", fill: "#ccc", height: "20", width: "20" });
    const _text = createTag("text", { "fontSize": "20", x: (+x + _data.centerX) / 2 + "", y: (+y + _data.centerY) / 2 + 8 + "", "text-anchor": "middle", html: "?" })

    _g.appendChild(line)
    _g.appendChild(line2)
    _g.appendChild(_cir)
    _g.appendChild(_cirText)
    _g.appendChild(rect)
    _g.appendChild(_text)

    return _g
}
const moveSvgDom = () => {
    const p = document.querySelector(".move-svg") as HTMLElement;
    var pointNum = "";
    const _svg = createTag("svg", { width: "100%", height: "100%", fill: "none" });
    const polyline = createTag("polyline", { points: pointNum, "stroke-width": "2", stroke: "rgba(255,0,0,0.4)" });
    _svg.addEventListener("mousedown", (e: any) => {
        const x = e.clientX - p.getBoundingClientRect().left, y = e.clientY - p.getBoundingClientRect().top;
        if (pointNum == "") {
            pointNum = x + "," + y
        } else {
            pointNum = pointNum + " " + x + "," + y
        }
        if (e.button === 0) {

            _svg.appendChild(createTag("circle", { cx: x + "", cy: y + "", r: "4", "stroke-width": "2", fill: "white", stroke: "red" }))
            polyline.setAttribute("points", pointNum)
        }

        _svg.addEventListener("mousemove", handleMove)
    })
    const handleMove = (e: MouseEvent) => {
        const mx = e.clientX - p.getBoundingClientRect().left, my = e.clientY - p.getBoundingClientRect().top;
        polyline.setAttribute("points", pointNum + " " + mx + "," + my)
    }
    _svg.addEventListener("contextmenu", (e: any) => {
        e.preventDefault()
        console.log("Right:", e.clientX, e.clientY)
        // 取消掉最后一个移动点
        pointNum = pointNum.substring(0, pointNum.lastIndexOf(" "))
        polyline.setAttribute("points", pointNum)
        _svg.removeEventListener("mousemove", handleMove)

    })
    _svg.appendChild(polyline)
    p?.appendChild(_svg)
}

const pieSvg = () => {
    // 根据 a来画两个圆弧闭合的折线
    const percent = [20, 20, 30, 30];
    const color = ["#ccc", "#80adf3", "#4a6ce3", "#80c1a2", "#b3c4a0"];
    const p = document.querySelector(".pie-svg") as HTMLElement;
    const _svg = createTag("svg", { width: "200", height: "200", fill: "none", viewBox: "-100 -100 200 200" });

    var single = 0;

    const _g = createTag("g", { "style": "cursor: pointer;" });
    const Rb = 80;

    function move() {
        const d_arr = [[80, 0]], dM = [];
        for (let i = 0; i < percent.length; i++) {
            single += (percent[i] / 100 * 360);
            const x1 = Math.floor(Math.cos(single * Math.PI / 180) * Rb),
                y1 = Math.floor(Math.sin(single * Math.PI / 180) * Rb)

            if (i == percent.length - 1) {
                dM.push("M" + d_arr[d_arr.length - 1].join(" ") + " A" + Rb + " " + Rb + " 0 " + (percent[i] / 100 > 0.5 ? '1' : '0') + " 1 " + Rb + " 0");
                d_arr.push([Rb, 0])
            } else {
                dM.push("M" + d_arr[d_arr.length - 1].join(" ") + " A" + Rb + " " + Rb + " 0 " + (percent[i] / 100 > 0.5 ? '1' : '0') + " 1 " + x1 + " " + y1);
                d_arr.push([x1, y1])

            }
        }
        const Rdeg = Math.ceil(Math.PI * 2 * Rb / 100);
        for (let i = 0; i < dM.length; i++) {
            const path = createTag("path", { d: dM[i], fill: "none", stroke: color[i], "stroke-width": "40", "stroke-dasharray": percent[i] * Rdeg + "," + percent[i] * Rdeg, "stroke-dashoffset": percent[i] * Rdeg + '' });
            path.innerHTML = `<animate
                attributeName="stroke-dashoffset" 
                from="${percent[i] * Rdeg} "
                to="0"
                dur="2s"
                begin="${i * 2}s"
                fill="freeze"
                 
                  />`
            _g.appendChild(path);

        }
    }
    move()
    _svg.appendChild(_g);
    p?.appendChild(_svg);
}

function Part4Move() {
    const path = document.getElementById('path') as SVGPathElement | null;
    const circle = document.getElementById('circle') as SVGCircleElement | null;

    console.log("SVG", path instanceof SVGPathElement, circle instanceof SVGCircleElement)
    if (path instanceof SVGPathElement && circle instanceof SVGCircleElement) {
        const pathLength = path.getTotalLength(); // 获取路径的总长度
        circle.style.transformOrigin = 'center'; // 设置圆心为旋转中心
        function moveAlongPath() {
            // var moveFlag = requestAnimationFrame(moveAlongPath);
            requestAnimationFrame(moveAlongPath);
            const distance = (performance.now() / 1000) * 60; // 根据时间计算移动的距离
            if (path && circle) {
                const point = path.getPointAtLength(distance % pathLength); // 计算当前距离处的路径点坐标
                path.style.strokeDashoffset = pathLength - distance % pathLength + "";
                path.style.strokeDasharray = "" + pathLength + "," + pathLength;
                path.style.stroke = "red";
                // if (+path.style.strokeDashoffset < 1) {
                //     cancelAnimationFrame(moveFlag)
                // }
                circle.style.transform = `translate(${point.x}px, ${point.y}px)`;
            }
        }
        moveAlongPath();
    }
}

</script>

<style scoped lang="scss" >
.svg-easy-demo-container {
    width: 100%;
    height: calc(100vh - var(--TopHeaderHeight));
    position: relative;

    .hover-svg {
        width: 780px;
        height: 400px;

        border: 1px solid #ccc;


    }

    .move-svg {
        width: 780px;
        height: 400px;

        border: 1px solid #ccc;
    }

    .pie-svg {
        width: 400px;
        height: 400px;
    }
}
</style>
 