import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";

// If you publish at https://<user>.github.io/<repo>,
// set base to "/<repo>/" so assets load correctly.
export default defineConfig({
  plugins: [react()],
  base: "/portfolio/" // <-- change to "/<your-repo-name>/" if different
});
