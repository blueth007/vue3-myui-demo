import Layout from "../views/Layout/index.vue";

export default {
  path: "/svg-view",
  component: Layout,
  redirect: "/svg-view/easy-demo",
  name: "SvgViews",
  meta: {
    title: "ButtonViews Demos",
    icon: "mdi:exit-to-app",
  },
  children: [
    {
      path: "easy-demo",
      name: "Easy Demo",
      component: () => import("@/components/SvgViews/easyDemo.vue"),
      meta: {
        title: "Easy Demo",
        icon: "mdi:exit-to-app",
      },
    } 
  ],
};
