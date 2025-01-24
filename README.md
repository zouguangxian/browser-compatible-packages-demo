## Solutions for Compatibility Between Node.js and Browser Environments

There are two primary ways to handle compatibility between a Node.js package (e.g., `lz-utilities`) and a browser environment (e.g., a Next.js app). These solutions can be applied either on the **producer side** (in the package itself) or the **consumer side** (in the Next.js app). However, resolving this issue on the producer side is generally the preferred approach.

---

### **Producer Side Solutions**

1. **Conditional Imports or Dynamic Loading of `fs`**  
   Use conditional imports or dynamic loading to ensure that `fs` is only imported in a Node.js environment. For example, load `fs` only when the code is executed server-side:

   ```typescript
   if (typeof window === "undefined") {
     const fs = await import("fs");
   }
   ```

2. **Split `fs`-Related Functions into a Separate Package**  
   Separate `fs`-dependent code into a different package so that it can be conditionally imported in a browser-compatible manner. The core package would remain browser-friendly, and the package that relies on `fs` could be used exclusively in server-side environments.

3. **Use the `"exports"` Field to Define Browser-Specific Entry Points**  
   Leverage the `exports` field in `package.json` to define a separate entry point for the browser environment. This allows the package to specify which code to run in different environments:

   ```json
   {
     "exports": {
       "import": "./dist/index.mjs",
       "require": "./dist/index.cjs.js",
       "browser": "./dist/index.browser.js"
     }
   }
   ```

   You would also need to modify the build tool (e.g., `tsup`) to compile the package for both Node.js and browser environments.

4. **Use the `"browser"` Field in `package.json` to Mock or Remove `fs`**  
   In your `package.json`, add a `"browser"` field to replace the `fs` module with a mock or `false` to indicate it should be excluded in the browser:

   ```json
   {
     "browser": {
       "fs": false
     }
   }
   ```

   This method is supported by bundlers such as Webpack and Rollup, ensuring that `fs` is excluded from the browser build.

---

### **Consumer Side Solutions**

1. **Set `fs` to `false` in `webpack.config.js` (for Next.js App)**  
   In the `next.config.js` file, configure Webpack to resolve `fs` as `false`, effectively preventing bundlers from attempting to include it in the browser build:

   ```javascript
   module.exports = {
     webpack(config) {
       config.resolve.fallback = {
         fs: false,
       };
       return config;
     },
   };
   ```

2. **Use `webpack-node-externals` to Exclude `fs`**  
   You can also use `webpack-node-externals` in the Webpack configuration to explicitly exclude `fs` (and other Node.js built-ins) from being bundled into the client-side application.

---

### **Preferred Approach**

The most optimal solution would be to handle this issue on the **producer side** by using the **`browser` field in `package.json`** and defining the appropriate entry points for the browser environment. This approach allows you to tailor the package’s behavior for both Node.js and browser environments, and it avoids additional configuration on the consumer side.

## Examples

any of these solutions can resolve the compatibility issue between Node.js and browser environments.

### **Use the `"browser"` Field in `package.json` to Mock or Remove `fs`**

the [@example/utils](./packages/utils/package.json) package

```json
{
  "browser": {
    "fs": false
  }
}
```

### **Set `fs` to `false` in `webpack.config.js` (for Next.js App)**

the [@example/next-app](./packages/next-app/next.config.js) package

```typescript
import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  /* config options here */
  webpack: (config) => {
    config.resolve.fallback = {
      fs: false,
    };
    return config;
  },
};

export default nextConfig;
```

### **Set `resolve.alias` to module in `vite.config.ts` (for Vite App)**
```typescript
import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import { nodePolyfills } from 'vite-plugin-node-polyfills'
import * as path from 'path'

// https://vite.dev/config/
export default defineConfig({
  plugins: [react(), nodePolyfills({
    exclude: ['module'], // Exclude the unwanted modules
  })],

  resolve: {
    alias: {
      module: path.resolve(__dirname, './src/polyfills/module.js'), // Alias 'module' to an empty module
    },
  },
})
```
and the `src/polyfills/module.js` contains:
```typescript
export function createRequire() {
    console.warn(`createRequire is not supported in the browser environment.`);
    return function (path) {
      console.warn(`Attempted to use require() in the browser. Path: ${path}`);
      return {};
    };
  }
```

## Troubleshooting
When using pnp mode or pnpm mode, it may report an error like this:
```shell
error TS2307: Cannot find module 'fs' or its corresponding type declarations.
```
Setting `nodeLinker` to `node-modules` in the [.yarnrc.yml](./.yarnrc.yml) file can solve this problem.
