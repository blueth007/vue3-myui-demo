<template>
    <div class="file-folder">
        <div>
            <a href="https://codepen.io/dropside/pen/RBwdjz">jsLink</a>
        </div>
        <div class="stage">
            <div class="folder-wrap level-current scrolling">
                <div class="card" v-for="item in files">
                    <div class="card-content">
                        <div class="content  has-text-centered">
                            <Icon :icon="item.type === 'folder' ? 'mdi:folder' : 'mdi:file-document'" with="54" height="54"
                                color="#00A8FF">
                            </Icon>
                            <h3>{{ item.title }}</h3>
                            <p>{{ item.desc }}</p>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>

<script setup lang="ts">
import { reactive } from 'vue';


const files = reactive([
    {
        title: 'Folder name1',
        type: 'folder',
        desc: "这是文件夹",
        children: [{

        }],
    }, {
        title: 'Folder name2',
        type: 'folder',
        desc: "这是文件夹",
        children: [{

        }],

    }, {
        title: 'File name2',
        type: 'document',
        desc: "这是文件.exe.word.pdf",
    },
])
</script>

<style scoped lang="scss">
h3 {
    font-weight: 400;
    font-size: 16px;
}

p {
    font-size: 12px;
    color: #888;
}

.stage {
    max-width: 90%;
    margin: 60px 5%;
    position: relative;
}

.folder-wrap {
    display: flex;
    flex-wrap: wrap;
}

.folder-wrap::before {
    content: 'Folder name';
    display: block;
    position: absolute;
    top: -40px;
}

.folder-wrap:first-child::before {
    content: 'Home (top of file structure)';
    display: block;
    position: absolute;
    top: -40px;
}

.card {

    width: calc(20% - 17px);
    transition: 0.2s all cubic-bezier(0.4, 0.0, 0.2, 1);
    position: relative;
    margin-right: 17px;
    cursor: pointer;
}

.file-title:hover {
    box-shadow: 0px 7px 5px -6px rgba(0, 0, 0, 0.12);
}

.file-title i {
    color: #00A8FF;
    height: 55px;
    margin-bottom: 20px;
    font-size: 55px;
    display: block;
    line-height: 54px;
    cursor: pointer;
}

.file-title i.mdi-file-document {
    color: #8fd9ff;
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
}

.folder-wrap.level-down {
    transform: scale(0.8);
}
</style>