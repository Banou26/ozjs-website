import * as ozjs from '/oz.js'
[...Object.entries(ozjs)].map(([key, val]) => (window[key] = val))
