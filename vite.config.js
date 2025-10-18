import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import tailwindcss from "@tailwindcss/vite";
import path from "path";

export default defineConfig({
  plugins: [react(), tailwindcss()],
  resolve: {
    alias: {
      '@api': path.resolve(__dirname, './src/core/api'),
      "@data": path.resolve(__dirname, "./src/core/data"),
      "@components": path.resolve(__dirname, "src/view/components"),
      '@': path.resolve(__dirname, './src'),
      '@assets': path.resolve(__dirname, './src/view'),
      '@elements': path.resolve(__dirname, './src/view/components/elements'),
      '@fragments': path.resolve(__dirname, './src/view/components/fragments'),
      '@pages': path.resolve(__dirname, './src/view/pages'),
    },
  },
});
