import { createRouter, createWebHashHistory } from "vue-router";
import Layout from "../views/Layout/index.vue";
import pageView from "./pageView";
import buttonView from "./buttonView";
import svgViews from "./svgViews";
export const routes = [
  {
    path: "/",
    component: Layout,
    name: "Dashboard",
    redirect: "/dashboard",
    meta: {
      title: "Dashboard",
      icon: "mdi:view-dashboard",
    },
    children: [
      {
        path: "dashboard",
        // component: () => import("../views/HomePage/index.vue"),
        component: () => import("@/components/PageDemo/videoTrans.vue"),
        name: "Dashboard",
        meta: { title: "videoTrans3D", affix: true },
      },
      {
        path: "/animated-banner",
        name: "animated-banner",
        component: () => import("@/components/PageDemo/animatedBanner.vue"),
        meta: {
          title: "Animated Banner",
        },
      },
    ],
  },
  pageView,
  buttonView,
  svgViews,
];

const router = createRouter({
  history: createWebHashHistory(),
  routes,
});

export default router;
