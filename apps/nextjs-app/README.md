This is a [Next.js](https://nextjs.org) project bootstrapped with [`create-next-app`](https://nextjs.org/docs/app/api-reference/cli/create-next-app).

## Getting Started

First, run the development server:

```bash
npm run dev
# or
yarn dev
# or
pnpm dev
# or
bun dev
```

Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.

You can start editing the page by modifying `app/page.tsx`. The page auto-updates as you edit the file.

This project uses [`next/font`](https://nextjs.org/docs/app/building-your-application/optimizing/fonts) to automatically optimize and load [Geist](https://vercel.com/font), a new font family for Vercel.

## Learn More

To learn more about Next.js, take a look at the following resources:

- [Next.js Documentation](https://nextjs.org/docs) - learn about Next.js features and API.
- [Learn Next.js](https://nextjs.org/learn) - an interactive Next.js tutorial.

You can check out [the Next.js GitHub repository](https://github.com/vercel/next.js) - your feedback and contributions are welcome!

## Deploy on Vercel

The easiest way to deploy your Next.js app is to use the [Vercel Platform](https://vercel.com/new?utm_medium=default-template&filter=next.js&utm_source=create-next-app&utm_campaign=create-next-app-readme) from the creators of Next.js.

Check out our [Next.js deployment documentation](https://nextjs.org/docs/app/building-your-application/deploying) for more details.


# Troubleshooting
## Module not found: Can't resolve <dynamic>
When executing `yarn next dev --turbopack`, it reports error:

```bash
./node_modules/@layerzerolabs/lz-utilities/dist/index.mjs:561:12
Module not found: Can't resolve <dynamic>
  559 |   if (fileName.endsWith(".ts")) {
  560 |     enableTS(relativeToPath);
> 561 |     return import(modulePath);
      |            ^^^^^^^^^^^^^^^^^^
  562 |   } else if (fileName.endsWith(".mjs")) {
  563 |     return import(modulePath);
  564 |   } else if (fileName.endsWith(".cjs")) {
```
https://github.com/vercel/next.js/issues/61180

It is an issue related to turbopack. use `yarn next dev` instead of `yarn next dev --turbopack`.

## Expected to use Webpack bindings (react-server-dom-webpack/server.edge) for React but the current process is referencing '__esModule' from the Turbopack bindings
When executing `yarn next start`, it reports:
```
 ⨯ Error: Expected to use Webpack bindings (react-server-dom-webpack/server.edge) for React but the current process is referencing '__esModule' from the Turbopack bindings (react-server-dom-turbopack/server.edge). This is likely a bug in our integration of the Next.js server runtime.
    at esmImport (.next/server/chunks/ssr/[turbopack]_runtime.js:138:79)
    at [project]/apps/nextjs-app/app/page.tsx (client proxy) <module evaluation> (.next/server/chunks/ssr/[project]__85b19a._.js:11:253)
    at instantiateModule (.next/server/chunks/ssr/[turbopack]_runtime.js:590:23)
    at getOrInstantiateModuleFromParent (.next/server/chunks/ssr/[turbopack]_runtime.js:645:12)
    at esmImport (.next/server/chunks/ssr/[turbopack]_runtime.js:132:20)
    at [project]/apps/nextjs-app/app/page.tsx [app-rsc] (ecmascript) (.next/server/chunks/ssr/[project]__85b19a._.js:36:152)
    at instantiateModule (.next/server/chunks/ssr/[turbopack]_runtime.js:590:23)
    at getOrInstantiateModuleFromParent (.next/server/chunks/ssr/[turbopack]_runtime.js:645:12)
    at esmImport (.next/server/chunks/ssr/[turbopack]_runtime.js:132:20)
```

https://github.com/vercel/next.js/discussions/61804

I deleted .next and rebuild 'yarn run build' ; it worked for me.




