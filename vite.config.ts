import { defineConfig } from "vite";
import vue from "@vitejs/plugin-vue";
import path from "path"; // 需要安装的插件@types/node

// 自动导入vue中hook reactive ref等
import AutoImport from "unplugin-auto-import/vite";
//自动导入ui-组件
import Components from "unplugin-vue-components/vite";
import Icons from "unplugin-icons/vite";
import IconsResolver from "unplugin-icons/resolver";

// https://vitejs.dev/config/
export default defineConfig({
  base: "./",
  server: {
    host: "0.0.0.0",
    https: false, // 是否开启 https
    open: true, // 是否自动在浏览器打开
    proxy: {
      "/api": {
        target: "", // 后台接口
        changeOrigin: true,
        secure: false, // 如果是https接口，需要配置这个参数
        // ws: true, // websocket是否支持
        rewrite: (path) => path.replace(/^\/api/, ""),
      },
    },
  },
  // 打包相关
  build: {
    target: "es2020", //指定es版本,浏览器的兼容性
    outDir: "dist",
    assetsDir: "assets", // 指定静态资源存放路径
    // cssCodeSplit: true, // css代码拆分,禁用则所有样式保存在一个css里面
    sourcemap: false, // 是否构建source map 文件
    // manifest: true, // 是否在outDir中生成 manifest.json
    rollupOptions: {
      // input: '/path/to/main.ts' // 覆盖默认的 .html 入口
    },
  },
  resolve: {
    // 配置项目路径别名，在开发时不需要写完整的路径名称，需要安装 @types/node，执行命令npm i -D @types/node --save-dev即可
    alias: {
      "@": path.resolve(__dirname, "src"),
      "@assets": path.resolve(__dirname, "src/assets"),
      "@components": path.resolve(__dirname, "src/components"),
    },
  },
  optimizeDeps: {
    include: ["@iconify/vue"],
  },
  plugins: [
    vue(),
    Components({
      //自定义的模块

      extensions: ["vue", "ts"],
      resolvers: [
        // 自动注册图标组件
        IconsResolver({
          enabledCollections: ["mdi"],
        }),
      ], //所自动导入的element和Ant
      dts: "src/auto-components.d.ts",
      // 遍历子目录
      deep: true,
    }),
    AutoImport({
      // 插件进行自动导入相关的依赖库
      //安装两行后你会发现在组件中不用再导入ref，reactive等
      imports: ["vue", "vue-router"],
      resolvers: [
        // Auto import icon components
        IconsResolver(),
      ],
      // 可选，用于自动导入组件类型
      dts: "src/auto-imports.d.ts",
    }),
    Icons({
      // 自动安装图标
      compiler: "vue3",
      autoInstall: true,
    }),
  ],
});
