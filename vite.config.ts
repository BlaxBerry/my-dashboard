import react from "@vitejs/plugin-react-swc";
import path from "path";
import { visualizer } from "rollup-plugin-visualizer";
import { defineConfig, loadEnv, type PluginOption } from "vite";

export default defineConfig(({ mode }) => {
  const env = loadEnv(mode, process.cwd(), "");

  return {
    server: {
      port: parseInt(env.VITE_APP_DEV_SERVER_PORT),
      strictPort: true,
      // proxy: {
      //   // localhost:3000/api -> localhost:8000
      //   "/api": {
      //     target: "http://localhost:8000",
      //     changeOrigin: true,
      //     rewrite: (path) => path.replace(/^\/api/, ""),
      //   },
      // },
    },

    resolve: {
      alias: {
        // import xx from "@/xx"; ( "src/ xx" )
        "@": path.resolve(__dirname, "./src"),
      },
    },

    build: {
      rollupOptions: {
        output: {
          // 分包策略
          manualChunks: (id) => {
            if (id.includes("node_modules")) {
              // node_modules 中使用的第三方依赖不会改变，单独打包出去
              // return "modules";
              return id
                .toString()
                .split("node_modules/")[1]
                .split("/")[0]
                .toString();
            }
          },
          chunkFileNames: "assets/js/[name]-[hash].js", // 引入文件名的名称
          entryFileNames: "assets/js/[name]-[hash].js", // 包的入口文件名称
          assetFileNames: "assets/[ext]/[name]-[hash].[ext]", // 资源文件像 字体，图片等
        },
      },
    },

    plugins: [
      react(),
      // 打包体积视图分析
      visualizer({
        open: true,
        filename: "packages-build-stats.html",
      }) as unknown as PluginOption,
    ],

    optimizeDeps: {
      include: [
        "react",
        "react-dom",
        "react-router-dom",
        "react-redux",
        "react-hook-form",
      ],
    },
  };
});
