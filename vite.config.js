import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";

export default defineConfig({
  plugins: [react()],
  server: {
    allowedHosts: [
      "localhost",
      "127.0.0.1",
      "pz68h9-5173.csb.app", // 👈 Add your current CodeSandbox subdomain
      "*.csb.app", // 👈 Wildcard for future sandbox URLs
    ],
    port: 5173,
    host: true,
  },
});
