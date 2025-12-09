import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import tailwindcss from "@tailwindcss/vite";
import path from "path";

// https://vite.dev/config/
export default defineConfig({
  plugins: [react(), tailwindcss()],
  resolve: {
    alias: {
      // design-system 내부의 @/ 경로를 design-system/src로 해석
      "@/components/ui": path.resolve(__dirname, "./design-system/src/components/ui"),
      "@/components": path.resolve(__dirname, "./design-system/src/components"),
      "@/hooks": path.resolve(__dirname, "./design-system/src/hooks"),
      "@/lib": path.resolve(__dirname, "./design-system/src/lib"),
      // design-system alias
      "@design-system": path.resolve(__dirname, "./design-system"),
    },
  },
});
