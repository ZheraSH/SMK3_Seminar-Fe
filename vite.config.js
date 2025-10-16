import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import tailwindcss from "@tailwindcss/vite";
import path from "path";

export default defineConfig({
  plugins: [react(), tailwindcss()],
  resolve: {
    alias: {
      '@api': path.resolve(__dirname, './src/Core/Api'),
      "@data": path.resolve(__dirname, "src/Core/Data"),
      "@components": path.resolve(__dirname, "src/Assets/Components"),
      '@': path.resolve(__dirname, './src'),
      '@assets': path.resolve(__dirname, './src/assets'),
      '@elements': path.resolve(__dirname, './src/assets/components/Elements'),
      '@fragments': path.resolve(__dirname, './src/assets/components/Fragments'),
      '@pages': path.resolve(__dirname, './src/assets/pages'),
    },
  },
});
