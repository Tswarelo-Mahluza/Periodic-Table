import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";

// Vite serves the React app on http://localhost:5173 by default.
export default defineConfig({
  plugins: [react()],
});
