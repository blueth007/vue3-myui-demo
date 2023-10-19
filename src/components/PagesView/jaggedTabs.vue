<template>
    <div class="jagged-tabs-container">
        <div class="wrapper">
            <ul class="jagged-tabs clearfix">
                <li v-for="(tab, index) in tabs" :key="index" @click="activeIndex = index"><a
                        :class="{ active: index == activeIndex }">{{ tab.name }}</a></li>

            </ul>
            <section class="tabgroup">
                <div v-html="tabs[activeIndex].content"></div>
            </section>
        </div>
    </div>
</template>

<script setup lang="ts">

const activeIndex = ref(0)
const tabs = reactive([
    {
        name: 'tab1',
        content: `<h2>Heading 1</h2>
              <p>Lorem ipsum dolor sit amet, consectetur adipisicing elit. Nulla deserunt consectetur ratione id tempore laborum laudantium facilis reprehenderit beatae dolores ipsum nesciunt alias iusto dicta eius itaque blanditiis modi velit.</p>`
    },
    {
        name: 'tab2',
        content: `<h2>Heading 2</h2>
              <p>Adipisci autem obcaecati velit natus quos beatae explicabo at tempora minima voluptates deserunt eum consectetur reiciendis placeat dolorem repellat in nam asperiores impedit voluptas iure repellendus unde eveniet accusamus ex.</p>`
    },
    {
        name: 'tab3',
        content: ` <h2>Heading 3</h2>
              <p>Atque ratione soluta laboriosam illo inventore amet ipsum aliquam assumenda harum provident nam accusantium neque debitis obcaecati maxime officia saepe ad ducimus in quam libero vero quasi. Saepe sit nisi?</p>`
    },
    {
        name: 'tab4',
        content: ` <h2>Heading 4</h2>
              <p>Quidem perferendis id sapiente cumque ullam repellendus dolorum odit rerum quibusdam tempora voluptatibus ipsum. Maiores laborum velit aperiam dicta quisquam assumenda at esse exercitationem culpa sequi porro minus ipsa aut.</p>`
    },
    {
        name: 'tab5',
        content: ` <h2>Heading 5</h2>
              <p>Iste eligendi ratione libero impedit quos necessitatibus labore corporis deserunt quo porro hic eius delectus ea ad amet dolore officiis debitis! Libero officia magnam consequuntur dignissimos molestias quia modi repellat.</p>`
    }])

</script>

<style scoped lang="scss">
.jagged-tabs-container {
    width: 100%;
    height: calc(100vh - var(--TopHeaderHeight));
    background: url('https://westfieldcc.files.wordpress.com/2011/10/simple-blur-ipad-background.jpg') no-repeat center center fixed;
    background-size: cover;

    overflow: hidden;

    .wrapper {
        margin: 100px auto;
        width: 80%;
        font-family: sans-serif;
        color: #98927C;
        font-size: 14px;
        line-height: 24px;
        max-width: 600px;
        min-width: 340px;
        overflow: hidden;

        ul {
            margin: 0;
            list-style: none;

            li+li {
                margin-top: 0;
            }
        }
    }

    .jagged-tabs {
        li {
            list-style: none;
            float: left;
            width: 20%;
        }

        a {
            display: block;
            text-align: center;
            text-decoration: none;
            position: relative;
            text-transform: uppercase;
            color: #fff;
            height: 70px;
            line-height: 90px;
            background: linear-gradient(165deg, transparent 29%, #98927C 30%);

            &:hover,
            &.active {
                background: linear-gradient(165deg, transparent 29%, #F2EEE2 30%);
                color: #98927C;
            }

            &:before {
                content: '';
                position: absolute;
                z-index: 11;
                left: 100%;
                // top: -100%;
                height: 70px;
                line-height: 90px;
                width: 0;
                border-bottom: 70px solid rgba(0, 0, 0, .1);
                border-right: 7px solid transparent;
            }

            &.active:before {
                content: '';
                position: absolute;
                z-index: 11;
                left: 100%;
                // top: -100%;
                height: 70px;
                line-height: 90px;
                width: 0;
                border-bottom: 70px solid rgba(0, 0, 0, .2);
                border-right: 20px solid transparent;
            }

            // &:last-child:before, &.active:last-child:before{
            //   border: none;
            // }
        }
    }

    .tabgroup {
        box-shadow: 2px 2px 2px 2px rgba(0, 0, 0, .1);
        ;

        div {
            padding: 30px;
            background: #F2EEE2;
            box-shadow: 0 3px 10px rgba(0, 0, 0, .3);
        }
    }

    .clearfix:after {
        content: "";
        display: table;
        clear: both;
    }


}
</style>

 
 