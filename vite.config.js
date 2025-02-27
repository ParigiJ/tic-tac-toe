import { defineConfig } from "vite";
import tailwindcss from "@tailwindcss/vite";
import react from "@vitejs/plugin-react-swc";

// https://vite.dev/config/
export default defineConfig({
  base: "/tic-tac-toe/",
  build: {
    outDir: "dist", // Ensure build output is correct
  },
  plugins: [react(), tailwindcss()],
});
