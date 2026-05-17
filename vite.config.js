import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import { resolve } from "node:path";

export default defineConfig(({ mode }) => ({
  base: mode === "production" ? "/usdo-site/" : "/",
  plugins: [
    react(),
    {
      name: "dev-html-entry",
      configureServer(server) {
        server.middlewares.use((req, _res, next) => {
          if (req.url === "/" || req.url === "/index.html") {
            req.url = "/index.vite.html";
          }
          next();
        });
      },
    },
  ],
  build: {
    rollupOptions: {
      input: {
        index: resolve(__dirname, "index.vite.html"),
      },
    },
  },
  server: {
    host: true,
    port: 5173,
    allowedHosts: true,
  },
}));
