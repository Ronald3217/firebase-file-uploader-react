import { defineConfig } from "tsup";

export default defineConfig({
  entry: ["src/lib/index.tsx"],
  outDir:"dist/lib",
  format: ["cjs", "esm"], // Build for commonJS and ESmodules
  dts: true, // Generate declaration file (.d.ts)
  splitting: false,
  sourcemap: false,
  clean: true,
  minify:true
});