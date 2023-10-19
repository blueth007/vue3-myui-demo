import Layout from "../views/Layout/index.vue";

export default {
  path: "/button-views",
  component: Layout,
  redirect: "/button-views/video-button",
  name: "ButtonViews",
  meta: {
    title: "ButtonViews Demos",
    icon: "mdi:exit-to-app",
  },
  children: [
    {
      path: "circle-nav-bar",
      name: "CircleNavBar",
      component: () => import("../components/PagesView/circleNav.vue"),
      meta: {
        title: "Circle Navigation",
        link: "https://codepen.io/gzuzkstro/pen/oemMyN",
      },
    },
    {
      path: "video-button",
      name: "Video Button",
      component: () => import("../components/ButtonViews/videoButton.vue"),
      meta: {
        title: "Video Button",
      },
    },
    {
      path: "search-button",
      name: "Search Button",
      component: () => import("../components/ButtonViews/searchButton.vue"),
      meta: {
        title: "Search Button",
      },
    },
    {
      path: "cube-plus",
      name: "Cube Plus",
      component: () => import("../components/ButtonViews/cubePlus.vue"),
      meta: {
        title: "Cube Plus Turn",
      },
    },
    {
      path: "hamburger-menu",
      name: "Hamburger Menu",
      component: () => import("../components/ButtonViews/hamburgerMenu.vue"),
      meta: {
        title: "Hamburger Menu",
        link: "https://codepen.io/jonwilcox/pen/WygLby",
      },
    },
    {
      path: "circle-menu",
      name: "Circle Menu",
      component: () => import("../components/ButtonViews/circleMenu.vue"),
      meta: {
        title: "Circle Menu",
        link: "https://codepen.io/wbarahona/pen/vLoyOb",
      },
    },
    {
      path: "menu-to-directional-arrow",
      name: "Menu to Directional Arrow",
      component: () => import("../components/ButtonViews/menuToDirectionalX.vue"),
      meta: {
        title: "Menu to Directional Arrow",
        link: "",
      },
    },
    {
      path: "password-strong",
      name: "Password Strong",
      component: () => import("../components/ButtonViews/password.vue"),
      meta: {
        title: "Password Strong",
        link: "https://codepen.io/Izumenko/pen/BdGXPe",
      },
    },
    {
      path: "orbital-icon",
      name: "Orbital Icon",
      component: () => import("../components/ButtonViews/orbitalIcon.vue"),
      meta: {
        title: "Orbital Icon",
        link: "https://codepen.io/pieter-biesemans/pen/xqVBdK",
      },
    },
    {
      path: "alarm-clock",
      name: "Alarm Clock",
      component: () => import("../components/ButtonViews/alarmClock.vue"),
      meta: {
        title: "Alarm Clock",
        link: "https://codepen.io/joshbivens/pen/jrZjzo",
      },
    },
    {
      path: "tag-cloud",
      name: "Tag Cloud",
      component: () => import("../components/ButtonViews/tagCloud.vue"),
      meta: {
        title: "Tag Cloud",
        link: "https://codepen.io/faizanasad/pen/OJbdbJ",
      },
    },
    {
      path: "corner-ribbon",
      name: "Corner Ribbon",
      component: () => import("../components/ButtonViews/cornerRibbon.vue"),
      meta: {
        title: "Corner Ribbon",
        link: "https://codepen.io/nxworld/pen/oLdoWb",
      },
    },
    {
      path: "range-slider",
      name: "Range Slider",
      component: () => import("../components/ButtonViews/rangeSlider.vue"),
      meta: {
        title: "Range Slider",
        link: "https://codepen.io/trevanhetzel/pen/rOVrGK",
      },
    },
    {
      path: "auto-textarea",
      name: "Auto Expanding Textarea",
      component: () => import("../components/ButtonViews/autoTextarea.vue"),
      meta: {
        title: "Auto Expanding Textarea",
        link: "",
      },
    },
    {
      path: "neumorphic-button",
      name: "Neumorphic Elements Button",
      component: () => import("../components/ButtonViews/neumorphicElements.vue"),
      meta: {
        title: "Neumorphic Elements Button",
        link: "https://codepen.io/myacode/pen/PoqQQNM",
      },
    },
    {
      path: "weather-icon",
      name: "Weather Icon",
      component: () => import("../components/ButtonViews/weather.vue"),
      meta: {
        title: "Weather Icon",
        link: "",
      },
    },
  ],
};
