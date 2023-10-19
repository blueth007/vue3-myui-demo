<template>
    <div class="flowchart-diagram-container">
        <div class="tree">
            <ul>
                <Item v-for="node in trees" :key="node.title" :title="node.title" :children="node.children"></Item>
            </ul>
        </div>
    </div>
</template>

<script setup lang="ts">
import { reactive, h, defineComponent } from 'vue'

const Item: any = defineComponent({
    props: {
        title: {
            type: String,
            required: true
        },
        children: {
            type: Array,
            default: () => []
        }
    },
    setup(props) {
        return () => (
            h("li", [
                h("a", props.title),
                props.children && props.children.length > 0 && h("ul", {}, [
                    props.children.map((t: any) => h(Item, { key: t.title, title: t.title, children: t.children }))
                ])
            ])
        );
    }
});


const trees = reactive([
    {
        title: "parent",
        children: [
            {
                title: "child1",
                children: [{
                    title: "children1-Grand-chid1"
                }]
            },
            {
                title: "child2",
                children: [{
                    title: "children2-Grand-chid2",
                    children: [
                        { title: "children2-Grand-Grand1-chid1" },
                        { title: "children2-Grand-Grand1-chid2" },
                        { title: "children2-Grand-Grand1-chid3" }
                    ]
                }]
            },
            {
                title: "child3",
            }
        ]
    }
])

</script>

<style   lang="scss">
.flowchart-diagram-container {
    width: 100%;
    height: calc(100vh - var(--TopHeaderHeight));
    overflow: hidden;
    position: relative;

    /*Now the CSS*/
    * {
        margin: 0;
        padding: 0;
    }

    .tree ul {
        padding-top: 20px;
        position: relative;

        transition: all 0.5s;
        -webkit-transition: all 0.5s;
        -moz-transition: all 0.5s;
    }

    .tree li {
        float: left;
        text-align: center;
        list-style-type: none;
        position: relative;
        padding: 20px 5px 0 5px;

        transition: all 0.5s;
        -webkit-transition: all 0.5s;
        -moz-transition: all 0.5s;
    }

    /*We will use ::before and ::after to draw the connectors*/

    .tree li::before,
    .tree li::after {
        content: '';
        position: absolute;
        top: 0;
        right: 50%;
        border-top: 1px solid #ccc;
        width: 50%;
        height: 20px;
    }

    .tree li::after {
        right: auto;
        left: 50%;
        border-left: 1px solid #ccc;
    }

    /*We need to remove left-right connectors from elements without 
any siblings*/
    .tree li:only-child::after,
    .tree li:only-child::before {
        display: none;
    }

    /*Remove space from the top of single children*/
    .tree li:only-child {
        padding-top: 0;
    }

    /*Remove left connector from first child and 
right connector from last child*/
    .tree li:first-child::before,
    .tree li:last-child::after {
        border: 0 none;
    }

    /*Adding back the vertical connector to the last nodes*/
    .tree li:last-child::before {
        border-right: 1px solid #ccc;
        border-radius: 0 5px 0 0;
        -webkit-border-radius: 0 5px 0 0;
        -moz-border-radius: 0 5px 0 0;
    }

    .tree li:first-child::after {
        border-radius: 5px 0 0 0;
        -webkit-border-radius: 5px 0 0 0;
        -moz-border-radius: 5px 0 0 0;
    }

    /*Time to add downward connectors from parents*/
    .tree ul ul::before {
        content: '';
        position: absolute;
        top: 0;
        left: 50%;
        border-left: 1px solid #ccc;
        width: 0;
        height: 20px;
    }

    .tree li a {
        border: 1px solid #ccc;
        padding: 5px 10px;
        text-decoration: none;
        color: #666;
        font-family: arial, verdana, tahoma;
        font-size: 11px;
        display: inline-block;

        border-radius: 5px;
        -webkit-border-radius: 5px;
        -moz-border-radius: 5px;

        transition: all 0.5s;
        -webkit-transition: all 0.5s;
        -moz-transition: all 0.5s;
    }

    /*Time for some hover effects*/
    /*We will apply the hover effect the the lineage of the element also*/
    .tree li a:hover,
    .tree li a:hover+ul li a {
        background: #c8e4f8;
        color: #000;
        border: 1px solid #94a0b4;
    }

    /*Connector styles on hover*/
    .tree li a:hover+ul li::after,
    .tree li a:hover+ul li::before,
    .tree li a:hover+ul::before,
    .tree li a:hover+ul ul::before {
        border-color: #94a0b4;
    }

    /*Thats all. I hope you enjoyed it.
Thanks :)*/

}
</style>