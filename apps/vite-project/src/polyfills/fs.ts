// fsMock.js
export function stat(path, callback) {
    // Simulate a successful stat operation
    callback(null, {});
  }
  
  export function statSync(path) {
    // Return an empty object to simulate stat result
    return {};
  }
  
  // Mock other fs methods as needed
  