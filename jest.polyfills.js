/*eslint-env node*/
// Temporary shims for the React 19 upgrade experiment: React 19 requires
// modern platform globals that jest 25's sandboxed jsdom does not expose.
if (typeof global.queueMicrotask === 'undefined') {
  global.queueMicrotask = cb => Promise.resolve().then(cb);
}
if (typeof global.MessageChannel === 'undefined') {
  global.MessageChannel = require('worker_threads').MessageChannel;
}
if (typeof global.TextEncoder === 'undefined') {
  global.TextEncoder = require('util').TextEncoder;
  global.TextDecoder = require('util').TextDecoder;
}
