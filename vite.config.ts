import { defineConfig } from "vite";
import react from "@vitejs/plugin-react-swc";
import path from "path";

export default defineConfig({
  plugins: [react()],
  resolve: {
    alias: {
      "@": path.resolve(__dirname, "./src"),
    },
  },
  server: {
    port: 5173,
    // Lets `npm run dev` talk to a locally running `npm run dev:server`
    // (server.js on port 3001) for testing the checkout API.
    proxy: {
      "/api": "http://localhost:3001",
    },
  },
});
