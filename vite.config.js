import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";

export default defineConfig({
  plugins: [react()],
  server: {
    allowedHosts: ["pz68h9-4173.csb.app"], // 👈 Add this line
  },
  preview: {
    allowedHosts: ["pz68h9-4173.csb.app", "localhost", ".vercel.app"],
  },
});
