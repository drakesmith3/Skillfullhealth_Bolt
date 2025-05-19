import { defineConfig } from "vite";
import react from "@vitejs/plugin-react-swc";
import path from "path";
import { componentTagger } from "lovable-tagger";

// https://vitejs.dev/config/
export default defineConfig(({ mode }) => ({
  server: {
    host: "::",
    port: 8080,
    // Add history fallback to handle SPA routing
    historyApiFallback: true,
    middleware: [
      // Custom SPA fallback middleware
      (req, res, next) => {
        // Skip for asset requests
        if (req.url && /\.(js|css|ico|png|jpg|jpeg|gif|svg|mp3|woff|woff2|ttf|otf)$/i.test(req.url)) {
          return next();
        }
        next();
      }
    ]
  },
  // Setting base to '/' ensures proper path resolution
  base: '/',
  plugins: [
    react(),
    mode === 'development' &&
    componentTagger(),
  ].filter(Boolean),
  resolve: {
    alias: {
      "@": path.resolve(__dirname, "./src"),
    },
  },
  build: {
    rollupOptions: {
      output: {
        manualChunks: {
          vendor: [
            "react",
            "react-dom",
            "@tanstack/react-query",
            "gsap",
            "lucide-react",
          ],
        },
      },
    },
    chunkSizeWarningLimit: 1000, // Adjust the chunk size warning limit
  },
}));
