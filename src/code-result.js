import * as ozjs from 'oz.js'
window.addEventListener('error', errorEvent => window.parent.postMessage(errorEvent.error && errorEvent.error.toString(), '*'));
[...Object.entries(ozjs)].map(([key, val]) => (window[key] = val))
