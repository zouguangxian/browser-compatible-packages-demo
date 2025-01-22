import { defineConfig } from "tsup";

export default defineConfig({
  entry: ["src/index.ts"], // Entry point of your application
  clean: true, // Clean the output directory before building
  format: ["cjs", "esm"], // Output formats (CommonJS and ES modules)
  dts: true, // Generate TypeScript declaration files
});
