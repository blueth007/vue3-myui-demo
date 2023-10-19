<template>
    <div class="auto-textarea-container">
        <textarea class='autoExpand' rows='3' @input="handleInput($event)" data-min-rows='3'
            placeholder='Auto-Expanding Textarea' autofocus></textarea>
    </div>
</template>

<script setup lang="ts" name="autoTextarea">

const handleInput = (e: Event) => {
    const elm = e.target as HTMLTextAreaElement
    if (!elm.classList.contains('autoExpand') || elm.nodeName.toLowerCase() !== 'textarea') {
        return
    }
    var minRows = elm.getAttribute('data-min-rows') || 0, rows;
    !elm._baseScrollHeight && getScrollHeight(elm)

    console.log("ScrollHeight:", elm.scrollHeight)
    elm.rows = +minRows;
    rows = Math.ceil((elm.scrollHeight - elm._baseScrollHeight) / 24) // 16px * 1.5 = line-height有关系
    elm.rows = +minRows + rows
}
function getScrollHeight(elm: HTMLTextAreaElement) {
    var savedValue = elm.value
    elm.value = ''
    elm._baseScrollHeight = elm.scrollHeight
    console.log(elm.scrollHeight)
    elm.value = savedValue
}

</script>

<style scoped lang="scss">
.auto-textarea-container {
    width: 100%;
    height: calc(100vh - var(--TopHeaderHeight));
    position: relative;
    overflow: hidden;
    background-color: #4a90e2;

    textarea {
        display: block;
        // font-family: monospace; // 
        overflow: hidden;
        box-sizing: content-box;
        padding: 10px;
        width: 250px;
        font-size: 16px;
        line-height: 1.5;
        margin: 50px auto;
        border-radius: 6px;
        box-shadow: 2px 2px 8px rgba(black, .3);
        border: 0;

        &:focus {
            border: none;
            outline: none;
        }
    }
}
</style>