<template>
    <div class="summary-catalog-container">
        <ul>
            <li v-for="card in catalogs" :key="card.pageNumber">
                <a :href="card.targetLink" :data-page="card.pageNumber">{{ card.title }}</a>
            </li>
        </ul>
    </div>
</template>

<script setup lang="ts">

const catalogs = reactive([
    {
        title: "Lorem ipsum",
        targetLink: "javascript:void(0)",
        pageNumber: 1
    }, {
        title: "Delete",
        targetLink: "javascript:void(0)",
        pageNumber: 4
    }, {
        title: "Lorem ipsum",
        targetLink: "javascript:void(0)",
        pageNumber: 5
    }, {
        title: "Vel,illo",
        targetLink: "javascript:void(0)",
        pageNumber: 8
    }, {
        title: "Lorem ipsum 2",
        targetLink: "javascript:void(0)",
        pageNumber: 11
    }, {
        title: "Lorem ipsum 3",
        targetLink: "javascript:void(0)",
        pageNumber: 15
    }
])
</script>

<style scoped lang="scss">
.summary-catalog-container {
    width: 100%;
    height: calc(100vh - var(--TopHeaderHeight));
    position: relative;
    overflow: hidden;
    background-color: #3498db;
    color: white;
    font: 1.5em/1.4 "lato";
    font-weight: 300;

    ul {
        width: 60%;
        margin: 5rem auto;
        padding: 0;
        list-style: none;

        li {
            margin: .5em 0;
        }

        li a {
            display: flex;
            flex-flow: row nowrap;
            align-items: baseline;
            text-decoration: none;
            color: inherit;
            transition: color .2s ease-in-out;

            &::before {
                content: "";
                order: 1;
                height: .4em;
                flex: 1 1 auto;
                order: 1;
                border-top: 4px dotted;
                margin: 0 6px;
                // background: left bottom / contain repeat-x url(data:image/svg+xml;base64,PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHZpZXdCb3g9IjAgMCA3IDIiPjxjaXJjbGUgZmlsbD0iI2ZmZiIgY3g9IjMuNSIgY3k9IjEiIHI9IjEiLz48L3N2Zz4=);

            }

            &::after {
                content: attr(data-page);
                order: 2;
            }

            &:hover,
            &:focus {
                color: black;
            }
        }
    }
}
</style>