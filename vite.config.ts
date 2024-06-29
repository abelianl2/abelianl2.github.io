import { defineConfig } from "vite";
import path from "path";
import react from "@vitejs/plugin-react";
import legacy from "@vitejs/plugin-legacy";
import UnoCSS from "unocss/vite";
export const isProd = process.env.NODE_ENV === "production" ? true : false;
// https://vitejs.dev/config/
export default defineConfig({
  base: isProd ? "/" : "/",
  plugins: [
    legacy({
      targets: ["since 2013"],
      additionalLegacyPolyfills: ["regenerator-runtime/runtime"],
      renderLegacyChunks: false,
      polyfills: [
        "es.symbol",
        "es.array.filter",
        "es.promise",
        "es.promise.finally",
        "es/map",
        "es/set",
        "es.array.for-each",
        "es.object.define-properties",
        "es.object.define-property",
        "es.object.get-own-property-descriptor",
        "es.object.get-own-property-descriptors",
        "es.object.keys",
        "es.object.to-string",
        "web.dom-collections.for-each",
        "esnext.global-this",
        "esnext.string.match-all",
      ],
    }),
    react(),
    UnoCSS(),
  ],
  esbuild: {
    drop: isProd ? ["console", "debugger"] : [],
  },
  build: {
    target: "esnext",
    chunkSizeWarningLimit: 1000,
    terserOptions: {
      compress: {
        drop_console: isProd ? true : false,
        drop_debugger: isProd ? true : false,
        pure_funcs: ["console.log", "console.warn"],
      },
      output: {
        // 去掉注释内容
        comments: true,
      },
    },
    rollupOptions: {
      output: {
        manualChunks(id) {
          if (id.includes("node_modules")) {
            return id
              .toString()
              .split("node_modules/")[1]
              .split("/")[0]
              .toString();
          }
        },
      },
    },
  },
  server: {
    // https: true,
    port: 5176,
    proxy: {
      "/botapi": {
        // target: "https://miniapp.linklayer.ai/botapi",
        target: "http://192.168.85.17:8888",
        changeOrigin: true,
        rewrite: (path) => path.replace(/^\/botapi/, ""),
      },
    },
  },
  optimizeDeps: {
    esbuildOptions: {
      target: "esnext",
      define: {
        global: "globalThis",
      },
      supported: {
        bigint: true,
      },
    },
  },
  define: {},
  resolve: {
    alias: {
      "@": path.resolve(__dirname, "src"),
    },
  },
});
