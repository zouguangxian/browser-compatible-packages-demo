export function createRequire() {
    console.warn(`createRequire is not supported in the browser environment.`);
    return function (path) {
      console.warn(`Attempted to use require() in the browser. Path: ${path}`);
      return {};
    };
  }