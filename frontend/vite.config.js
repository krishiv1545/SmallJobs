// vite.config.js (or vite.config.ts)
import { loadEnv } from "vite";
import react from "@vitejs/plugin-react";
import path from "path";

export default defineConfig(({ mode }) => {

  // const env = loadEnv(mode, process.cwd(), "");
  // const apiTarget = env.VITE_DJANGO_BASE_URL;
  const env = loadEnv(import.meta.env.MODE, process.cwd(), "");
  const apiTarget = env.VITE_DJANGO_BASE_URL;

  return {
    plugins: [react()],
    resolve: {
      alias: {
        "@": path.resolve(__dirname, "./src"),
      },
    },
    server: {
      port: 5173,
      proxy: {
        "/api": {
          target: apiTarget,
          changeOrigin: true,
          secure: false,
          rewrite: (p) => p.replace(/^\/api/, ""),
        },
      },
    },
  };
});
