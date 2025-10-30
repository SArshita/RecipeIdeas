import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";

export default defineConfig({
  plugins: [react()],
  server: {
    host: "0.0.0.0", // 👈 allows access from CodeSandbox VM
    port: 5173,
    strictPort: true,
    allowedHosts: [".csb.app"], // 👈 whitelist all sandbox subdomains
  },
  preview: {
    host: "0.0.0.0",
    port: 5173,
  },
});
