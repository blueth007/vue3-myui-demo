<template>
    <div class="file-folder" id="file-folder">
        <div class="button is-primary" @click="openFileFolder">
            打开文件夹
        </div>
        <div>
            <button class="back" @click="goBackFile">
                <Icon icon="mdi:arrow-left"></Icon>
            </button>
            <div class="stage">
                <ul class="bread-crumb">
                    <li v-for="item, index in fileName" :key="item" @click="handleBreakItem(index)"><a>{{ item }}</a></li>
                </ul>
                <div class="folder-wrap level-current scrolling" ref="parentFile" :data-name="fileName.join('/')">
                    <div class="card" v-for="(item, index) in activeItem" @click="handleFileClick(item)"
                        :data-name="item.name + index" :key="item.name + index">
                        <div class="card-content">
                            <div class="   has-text-centered">
                                <Icon :icon="item.kind === 'directory' ? 'mdi:folder' : 'mdi:file-document'" with="54"
                                    height="54" color="#00A8FF">
                                </Icon>
                                <h3>{{ item.name }} </h3>
                                <p>{{ item.desc }}</p>
                            </div>
                        </div>

                    </div>
                </div>
            </div>
        </div>
    </div>
</template>

<script setup lang="ts">
import { reactive, ref } from 'vue';

type fileKind = {
    name: string,
    kind: string,
    desc?: string,
    path?: string,
    children?: Array<fileKind>

};

const parentFile = ref<HTMLElement>();
const fileName = ref(['Home (top of file structure)'])
const files = reactive<Array<fileKind>>([
    {
        name: 'Folder name1',
        kind: 'directory',
        desc: "这是文件夹",
        children: [{
            name: 'Folder name-1-children-1',
            kind: 'directory',
            desc: "这是文件夹",
            children: [
                {
                    name: 'Folder name-1-children-1-children-1',
                    kind: 'directory',
                    desc: "这是文件夹",
                    children: [],
                },
                {
                    name: 'Folder name-1-children-2-children-2',
                    kind: 'directory',
                    desc: "这是文件夹",
                    children: [],
                },
                {
                    name: 'File name-1-children-3-children-3',
                    kind: 'file',
                    desc: "测试：这是文件孙子文件-children-3",
                }
            ],
        },
        {
            name: 'Folder name-1-children-2',
            kind: 'directory',
            desc: "这是文件夹",
            children: [],
        },
        {
            name: 'File name-1-children-3',
            kind: 'file',
            desc: "测试：这是文件11111-children-3",
        }],
    },
    {
        name: 'Folder name2',
        kind: 'directory',
        desc: "这是文件夹",
        children: [
            {
                name: 'Folder name-2-children-1',
                kind: 'directory',
                desc: "这是文件夹",
                children: [],
            },
            {
                name: 'Folder name-2-children-2',
                kind: 'folder',
                desc: "这是文件夹",
                children: [],
            },
            {
                name: 'File name-2-children-3',
                kind: 'file',
                desc: "测试：这是文件22222222-children-3",
            }
        ],

    }, {
        name: 'File name2',
        kind: 'file',
        desc: "测试：这是文件.exe.word.pdf",
    },
])

const root = ref<{ [key: string]: any }>({})
const activeArr = ref<Array<Array<fileKind>>>([files])
const activeItem = computed(() => activeArr.value[activeArr.value.length - 1])
const openFileFolder = async () => {
    fileName.value.length = 1
    try {
        //获得文件夹的句柄, 返回都是迭代器
        const handle = await (window as any).showDirectoryPicker();
        const folders = await processHandler(handle);
        console.log("handle directory:", handle, transData(folders), root)

        // 在此重新改写 把root作为对象[{a:file}]?不同文件夹同名文件处理，
        // activeArr单独作为对象存[[{name,kind,desc}]]
        // root.value = [root2]
        activeArr.value = [[transData(folders)]]
    }
    catch (err: any) {
        //用户拒绝查看文件
        alert('访问失败' + err)
    } finally {

    }
}

const readFile = async (fileHandle: any) => {
    //   获得文件内容
    const file = await fileHandle.getFile();// blob 对象
    const reader = new FileReader();
    reader.onload = (e: Event) => {
        // 读取结果
        console.log((<FileReader>e.target).result)
    }
    reader.readAsText(file, 'utf-8')// 可以根据文件类型进行读取文件
}
async function processHandler(handle: any, path: string = "") {

    if (handle.kind === 'file') {
        root.value[path] = handle
        handle.desc = "这是一个文件"
        return handle
    }
    handle.children = [];
    handle.desc = "这是文件夹"
    const iter = await handle.entries();//获得文件夹中的所有内容
    //iter:异步迭代器
    for await (const info of iter) {
        // console.log("INFO:", info)
        var subHandle = await processHandler(info[1], path + handle.name + "/" + info[0]);
        handle.children.push(subHandle)
        handle.children.sort((a: any, b: any) => b.kind.length - a.kind.length)
    }
    if (handle.children.length == 0) {
        handle.desc = "这是空文件夹！"
    }

    return handle
}

const transData = (data: any, path: string = '') => {
    let item: fileKind = { name: data.name, kind: data.kind, desc: data.desc, path: path }
    if (data.kind == 'directory' && data.children.length && data.children.length > 0) {
        item.children = data.children.map((b: fileKind) => {
            return transData(b, path + data.name + "/" + b.name)
        })
    }
    return item
}
const handleBreakItem = (index: number) => {

    activeArr.value.splice(index + 1)
    fileName.value.splice(index + 1)
}
const handleFileClick = (item: fileKind) => {

    if (item.kind === 'directory' && item.children && item.children.length > 0) {

        fileName.value.push(item.name)
        activeArr.value.push(item.children);
        parentFile.value?.classList.add("fade-in");
        setTimeout(() => {
            parentFile.value?.classList.contains("fade-in") &&
                parentFile.value?.classList.remove("fade-in");

        }, 500)
    } else if (item.kind == 'file' && item.path) {
        // console.log(item, root.value[item.path])
        readFile(root.value[item.path])
    }

}
const goBackFile = () => {

    if (activeArr.value.length > 1) {
        activeArr.value.pop();
        if (activeArr.value.length == 1) {
            fileName.value = ['Home (top of file structure)']
        } else {
            fileName.value.pop()
        }
        parentFile.value?.classList.add("fade-out");
        setTimeout(() => {
            parentFile.value?.classList.contains("fade-out") &&
                parentFile.value?.classList.remove("fade-out");
        }, 500)
    }

}
</script>

<style scoped lang="scss">
.file-folder {
    width: 100%;
    position: relative;
    height: calc(100vh - var(--TopHeaderHeight));
    padding: 20px 10px;

    h3 {
        word-wrap: break-word;
        font-weight: 400;
        font-size: 16px;
    }



    .stage {
        max-width: 90%;
        margin: 18px 5%;
        position: relative;

        .bread-crumb {
            font-size: 18px;
            font-weight: bold;
            margin: 10px 0;
            list-style-type: none;

            li {
                display: inline-block;
                position: relative;
                padding-right: 2em;
                margin: 0;

                p {
                    font-size: 12px;
                    color: #888;
                }
            }

            li:after {
                content: '>';
                position: absolute;
                display: inline-block;
                right: 0;
                width: 2em;
                text-align: center;
            }

            li:last-child {
                font-weight: bold;

                a {
                    max-width: 100%;
                }
            }

            li:last-child:after {
                content: '';
            }

            a {
                text-decoration: none;
                display: inline-block;
                color: #333;
                white-space: nowrap;
            }

            a:hover {
                text-decoration: underline;
            }

            li {
                overflow: hidden;
            }

            li:after {
                background: #fff;
                background: linear-gradient(90deg, rgba(255, 255, 255, 0.4) 0%, rgb(255, 255, 255) 35%);
                padding-left: 1em;
            }


            a {
                max-width: 2em;
                transition: max-width 300ms ease-in-out;
            }

            a:hover,
            a:focus,
            li:hover a {
                max-width: 1000px;
            }

            li:hover:after {
                padding-left: 0em;
                background: transparent;
            }
        }
    }

    .folder-wrap {
        display: flex;
        flex-wrap: wrap;
        gap: 8px;

        p {
            font-size: 12px;
            color: #888;
        }
    }

    .folder-wrap::before {
        // content: 'Folder';
        // display: block;
        // position: absolute;
        // top: -40px;
    }

    .folder-wrap:first-child::before {
        // content: attr(data-name);
        // display: block;
        // position: absolute;
        // top: -40px;
    }

    .card {
        width: calc(25% - 8px);
        transition: 0.2s all cubic-bezier(0.4, 0.0, 0.2, 1);
        position: relative;

        cursor: pointer;
    }

    .card:hover {
        box-shadow: 0px 0 8px 4px rgba(79, 221, 190, 1);
        // box-shadow: 0px 7px 5px -6px rgba(79, 221, 190, 0.12);
    }

    .back {
        font-size: 26px;
        border-radius: 50px;
        background: #00a8ff;
        border: 0;
        color: white;
        width: 60px;
        height: 60px;
        margin: 20px 20px 0;
        outline: none;
        cursor: pointer;
    }

    /* Transitioning */
    .folder-wrap {
        position: absolute;
        width: 100%;
        transition: .365s all cubic-bezier(.4, 0, .2, 1);
        pointer-events: none;
        opacity: 0;
        top: 0;
    }

    .folder-wrap.level-up {
        transform: scale(1.2);

    }

    .folder-wrap.level-current {
        transform: scale(1);
        pointer-events: all;
        opacity: 1;
        position: relative;
        height: auto;
        overflow: visible;
        // animation: fadeIn 0.365s cubic-bezier(.4, 0, .2, 1);
    }

    .folder-wrap.level-down {
        transform: scale(0.8);
    }

    .card-fade-enter-active {
        transition: all .365s .365s cubic-bezier(0.4, 0.0, 0.2, 1);
    }

    .card-fade-leave-active {


        transition: all .365s cubic-bezier(0.4, 0.0, 0.2, 1);
    }

    .card-fade-enter-from {
        opacity: 0;
        transform: scale(0.8);
    }

    .card-fade-leave-to {
        opacity: 0;
        transform: scale(1.1);
    }

    .fade-in {
        animation: K_fadeIn 0.3s cubic-bezier(0.4, 0.0, 0.2, 1);
    }

    @keyframes K_fadeIn {
        from {
            opacity: 0;
            transform: scale(0.8);
        }

        to {
            opacity: 1;
            transform: scale(1);
        }
    }

    .fade-out {
        animation: K_fadeOut 0.3s cubic-bezier(0.4, 0.0, 0.2, 1);
    }

    @keyframes K_fadeOut {
        from {
            opacity: 0;
            transform: scale(1.1);
        }

        to {
            opacity: 1;
            transform: scale(1);
        }
    }
}
</style>
<style>
.modal {
    position: absolute;
    display: block;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
    background-color: #00a8ff;

}
</style>