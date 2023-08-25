import { createRouter, createWebHashHistory } from "vue-router";
import Layout from "../views/Layout.vue";

const routes = [
  {
    path: "/",
    component: Layout,
    name: "Dashboard",
    redirect: "/dashboard",
    children: [
      {
        path: "dashboard",
        component: () => import("../views/dashboard.vue"),
        name: "Dashboard",
        meta: { title: "Dashboard", icon: "mdi:view-dashboard", affix: true },
      },
    ],
  },

  {
    path: "/pagesView",
    component: Layout,
    redirect: "/pages/file-folder",
    name: "FileFolder",
    meta: {
      title: "FileFolder",
      icon: "mdi:lock",
    },
    children: [
      {
        path: "file-folder",
        component: () => import("../components/PagesView/fileFolder.vue"),
        name: "FileFolder",
        meta: {
          title: "FileFolder",
          roles: ["admin"], // or you can only set roles in sub nav
        },
      },
      {
        path: "directive",
        component: () => import("../views/HomePage/index.vue"),
        name: "DirectivePermission",
        meta: {
          title: "Directive Permission",
          // if do not set roles, means: this page does not require permission
        },
      },
    ],
  },
  {
    path: "/permission1",
    component: Layout,
    redirect: "/permission/page2",
    name: "Permission2",
    meta: {
      title: "Permission2",
      icon: "mdi:lock",
    },
    children: [
      {
        path: "page2",
        component: () => import("../views/HomePage/index.vue"),
        name: "PagePermission2",
        meta: {
          title: "Page Permission2",
          roles: ["admin"], // or you can only set roles in sub nav
        },
      },
      {
        path: "directive2",
        component: () => import("../views/HomePage/index.vue"),
        name: "DirectivePermission2",
        meta: {
          title: "Directive Permission2",
          // if do not set roles, means: this page does not require permission
        },
      },
    ],
  },
];

const router = createRouter({
  history: createWebHashHistory(),
  routes,
});

export default router;
