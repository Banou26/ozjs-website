/******/ (function(modules) { // webpackBootstrap
/******/ 	// The module cache
/******/ 	var installedModules = {};
/******/
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/
/******/ 		// Check if module is in cache
/******/ 		if(installedModules[moduleId]) {
/******/ 			return installedModules[moduleId].exports;
/******/ 		}
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = installedModules[moduleId] = {
/******/ 			i: moduleId,
/******/ 			l: false,
/******/ 			exports: {}
/******/ 		};
/******/
/******/ 		// Execute the module function
/******/ 		modules[moduleId].call(module.exports, module, module.exports, __webpack_require__);
/******/
/******/ 		// Flag the module as loaded
/******/ 		module.l = true;
/******/
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/
/******/
/******/ 	// expose the modules object (__webpack_modules__)
/******/ 	__webpack_require__.m = modules;
/******/
/******/ 	// expose the module cache
/******/ 	__webpack_require__.c = installedModules;
/******/
/******/ 	// define getter function for harmony exports
/******/ 	__webpack_require__.d = function(exports, name, getter) {
/******/ 		if(!__webpack_require__.o(exports, name)) {
/******/ 			Object.defineProperty(exports, name, {
/******/ 				configurable: false,
/******/ 				enumerable: true,
/******/ 				get: getter
/******/ 			});
/******/ 		}
/******/ 	};
/******/
/******/ 	// getDefaultExport function for compatibility with non-harmony modules
/******/ 	__webpack_require__.n = function(module) {
/******/ 		var getter = module && module.__esModule ?
/******/ 			function getDefault() { return module['default']; } :
/******/ 			function getModuleExports() { return module; };
/******/ 		__webpack_require__.d(getter, 'a', getter);
/******/ 		return getter;
/******/ 	};
/******/
/******/ 	// Object.prototype.hasOwnProperty.call
/******/ 	__webpack_require__.o = function(object, property) { return Object.prototype.hasOwnProperty.call(object, property); };
/******/
/******/ 	// __webpack_public_path__
/******/ 	__webpack_require__.p = "/assets";
/******/
/******/ 	// Load entry module and return exports
/******/ 	return __webpack_require__(__webpack_require__.s = 10);
/******/ })
/************************************************************************/
/******/ ([
/* 0 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


// shim for using process in browser
var process = module.exports = {};

// cached from whatever global is present so that test runners that stub it
// don't break things.  But we need to wrap it in a try catch in case it is
// wrapped in strict mode code which doesn't define any globals.  It's inside a
// function because try/catches deoptimize in certain engines.

var cachedSetTimeout;
var cachedClearTimeout;

function defaultSetTimout() {
    throw new Error('setTimeout has not been defined');
}
function defaultClearTimeout() {
    throw new Error('clearTimeout has not been defined');
}
(function () {
    try {
        if (typeof setTimeout === 'function') {
            cachedSetTimeout = setTimeout;
        } else {
            cachedSetTimeout = defaultSetTimout;
        }
    } catch (e) {
        cachedSetTimeout = defaultSetTimout;
    }
    try {
        if (typeof clearTimeout === 'function') {
            cachedClearTimeout = clearTimeout;
        } else {
            cachedClearTimeout = defaultClearTimeout;
        }
    } catch (e) {
        cachedClearTimeout = defaultClearTimeout;
    }
})();
function runTimeout(fun) {
    if (cachedSetTimeout === setTimeout) {
        //normal enviroments in sane situations
        return setTimeout(fun, 0);
    }
    // if setTimeout wasn't available but was latter defined
    if ((cachedSetTimeout === defaultSetTimout || !cachedSetTimeout) && setTimeout) {
        cachedSetTimeout = setTimeout;
        return setTimeout(fun, 0);
    }
    try {
        // when when somebody has screwed with setTimeout but no I.E. maddness
        return cachedSetTimeout(fun, 0);
    } catch (e) {
        try {
            // When we are in I.E. but the script has been evaled so I.E. doesn't trust the global object when called normally
            return cachedSetTimeout.call(null, fun, 0);
        } catch (e) {
            // same as above but when it's a version of I.E. that must have the global object for 'this', hopfully our context correct otherwise it will throw a global error
            return cachedSetTimeout.call(this, fun, 0);
        }
    }
}
function runClearTimeout(marker) {
    if (cachedClearTimeout === clearTimeout) {
        //normal enviroments in sane situations
        return clearTimeout(marker);
    }
    // if clearTimeout wasn't available but was latter defined
    if ((cachedClearTimeout === defaultClearTimeout || !cachedClearTimeout) && clearTimeout) {
        cachedClearTimeout = clearTimeout;
        return clearTimeout(marker);
    }
    try {
        // when when somebody has screwed with setTimeout but no I.E. maddness
        return cachedClearTimeout(marker);
    } catch (e) {
        try {
            // When we are in I.E. but the script has been evaled so I.E. doesn't  trust the global object when called normally
            return cachedClearTimeout.call(null, marker);
        } catch (e) {
            // same as above but when it's a version of I.E. that must have the global object for 'this', hopfully our context correct otherwise it will throw a global error.
            // Some versions of I.E. have different rules for clearTimeout vs setTimeout
            return cachedClearTimeout.call(this, marker);
        }
    }
}
var queue = [];
var draining = false;
var currentQueue;
var queueIndex = -1;

function cleanUpNextTick() {
    if (!draining || !currentQueue) {
        return;
    }
    draining = false;
    if (currentQueue.length) {
        queue = currentQueue.concat(queue);
    } else {
        queueIndex = -1;
    }
    if (queue.length) {
        drainQueue();
    }
}

function drainQueue() {
    if (draining) {
        return;
    }
    var timeout = runTimeout(cleanUpNextTick);
    draining = true;

    var len = queue.length;
    while (len) {
        currentQueue = queue;
        queue = [];
        while (++queueIndex < len) {
            if (currentQueue) {
                currentQueue[queueIndex].run();
            }
        }
        queueIndex = -1;
        len = queue.length;
    }
    currentQueue = null;
    draining = false;
    runClearTimeout(timeout);
}

process.nextTick = function (fun) {
    var args = new Array(arguments.length - 1);
    if (arguments.length > 1) {
        for (var i = 1; i < arguments.length; i++) {
            args[i - 1] = arguments[i];
        }
    }
    queue.push(new Item(fun, args));
    if (queue.length === 1 && !draining) {
        runTimeout(drainQueue);
    }
};

// v8 likes predictible objects
function Item(fun, array) {
    this.fun = fun;
    this.array = array;
}
Item.prototype.run = function () {
    this.fun.apply(null, this.array);
};
process.title = 'browser';
process.browser = true;
process.env = {};
process.argv = [];
process.version = ''; // empty string to avoid regexp issues
process.versions = {};

function noop() {}

process.on = noop;
process.addListener = noop;
process.once = noop;
process.off = noop;
process.removeListener = noop;
process.removeAllListeners = noop;
process.emit = noop;
process.prependListener = noop;
process.prependOnceListener = noop;

process.listeners = function (name) {
    return [];
};

process.binding = function (name) {
    throw new Error('process.binding is not supported');
};

process.cwd = function () {
    return '/';
};
process.chdir = function (dir) {
    throw new Error('process.chdir is not supported');
};
process.umask = function () {
    return 0;
};

/***/ }),
/* 1 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
Object.defineProperty(__webpack_exports__, "__esModule", { value: true });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__util_index_js__ = __webpack_require__(2);
/* harmony namespace reexport (by provided) */ __webpack_require__.d(__webpack_exports__, "UUID", function() { return __WEBPACK_IMPORTED_MODULE_0__util_index_js__["a"]; });
/* harmony namespace reexport (by provided) */ __webpack_require__.d(__webpack_exports__, "isObject", function() { return __WEBPACK_IMPORTED_MODULE_0__util_index_js__["j"]; });
/* harmony namespace reexport (by provided) */ __webpack_require__.d(__webpack_exports__, "builtInObjects", function() { return __WEBPACK_IMPORTED_MODULE_0__util_index_js__["b"]; });
/* harmony namespace reexport (by provided) */ __webpack_require__.d(__webpack_exports__, "isBuiltIn", function() { return __WEBPACK_IMPORTED_MODULE_0__util_index_js__["h"]; });
/* harmony namespace reexport (by provided) */ __webpack_require__.d(__webpack_exports__, "isIgnoredObjectType", function() { return __WEBPACK_IMPORTED_MODULE_0__util_index_js__["i"]; });
/* harmony namespace reexport (by provided) */ __webpack_require__.d(__webpack_exports__, "cloneObject", function() { return __WEBPACK_IMPORTED_MODULE_0__util_index_js__["c"]; });
/* harmony namespace reexport (by provided) */ __webpack_require__.d(__webpack_exports__, "getPropertyDescriptorPair", function() { return __WEBPACK_IMPORTED_MODULE_0__util_index_js__["e"]; });
/* harmony namespace reexport (by provided) */ __webpack_require__.d(__webpack_exports__, "hasProperty", function() { return __WEBPACK_IMPORTED_MODULE_0__util_index_js__["g"]; });
/* harmony namespace reexport (by provided) */ __webpack_require__.d(__webpack_exports__, "getPropertyDescriptor", function() { return __WEBPACK_IMPORTED_MODULE_0__util_index_js__["d"]; });
/* harmony namespace reexport (by provided) */ __webpack_require__.d(__webpack_exports__, "getPropertyDescriptorPrototype", function() { return __WEBPACK_IMPORTED_MODULE_0__util_index_js__["f"]; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__template_literal_tags_index_js__ = __webpack_require__(16);
/* harmony namespace reexport (by provided) */ __webpack_require__.d(__webpack_exports__, "list", function() { return __WEBPACK_IMPORTED_MODULE_1__template_literal_tags_index_js__["a"]; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__reactivity_index_js__ = __webpack_require__(4);
/* harmony namespace reexport (by provided) */ __webpack_require__.d(__webpack_exports__, "Reactivity", function() { return __WEBPACK_IMPORTED_MODULE_2__reactivity_index_js__["b"]; });
/* harmony namespace reexport (by provided) */ __webpack_require__.d(__webpack_exports__, "defaultReactiveRoot", function() { return __WEBPACK_IMPORTED_MODULE_2__reactivity_index_js__["c"]; });
/* harmony namespace reexport (by provided) */ __webpack_require__.d(__webpack_exports__, "setDefaultReactiveRoot", function() { return __WEBPACK_IMPORTED_MODULE_2__reactivity_index_js__["e"]; });
/* harmony namespace reexport (by provided) */ __webpack_require__.d(__webpack_exports__, "IsIgnoredObjectType", function() { return __WEBPACK_IMPORTED_MODULE_2__reactivity_index_js__["a"]; });
/* harmony namespace reexport (by provided) */ __webpack_require__.d(__webpack_exports__, "reactify", function() { return __WEBPACK_IMPORTED_MODULE_2__reactivity_index_js__["d"]; });
/* harmony namespace reexport (by provided) */ __webpack_require__.d(__webpack_exports__, "watch", function() { return __WEBPACK_IMPORTED_MODULE_2__reactivity_index_js__["f"]; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3__elements_index_js__ = __webpack_require__(18);
/* harmony namespace reexport (by provided) */ __webpack_require__.d(__webpack_exports__, "ElementClass", function() { return __WEBPACK_IMPORTED_MODULE_3__elements_index_js__["b"]; });
/* harmony namespace reexport (by provided) */ __webpack_require__.d(__webpack_exports__, "Element", function() { return __WEBPACK_IMPORTED_MODULE_3__elements_index_js__["a"]; });
/* harmony namespace reexport (by provided) */ __webpack_require__.d(__webpack_exports__, "registerElement", function() { return __WEBPACK_IMPORTED_MODULE_3__elements_index_js__["e"]; });
/* harmony namespace reexport (by provided) */ __webpack_require__.d(__webpack_exports__, "RouterLink", function() { return __WEBPACK_IMPORTED_MODULE_3__elements_index_js__["c"]; });
/* harmony namespace reexport (by provided) */ __webpack_require__.d(__webpack_exports__, "RouterView", function() { return __WEBPACK_IMPORTED_MODULE_3__elements_index_js__["d"]; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_4__router_index_js__ = __webpack_require__(23);
/* harmony namespace reexport (by provided) */ __webpack_require__.d(__webpack_exports__, "Router", function() { return __WEBPACK_IMPORTED_MODULE_4__router_index_js__["a"]; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_5__template_index_js__ = __webpack_require__(25);
/* harmony namespace reexport (by provided) */ __webpack_require__.d(__webpack_exports__, "html", function() { return __WEBPACK_IMPORTED_MODULE_5__template_index_js__["b"]; });
/* harmony namespace reexport (by provided) */ __webpack_require__.d(__webpack_exports__, "css", function() { return __WEBPACK_IMPORTED_MODULE_5__template_index_js__["a"]; });







/***/ }),
/* 2 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (immutable) */ __webpack_exports__["c"] = cloneObject;
function _objectWithoutProperties(obj, keys) { var target = {}; for (var i in obj) { if (keys.indexOf(i) >= 0) continue; if (!Object.prototype.hasOwnProperty.call(obj, i)) continue; target[i] = obj[i]; } return target; }

const UUID = a => a ? (a ^ Math.random() * 16 >> a / 4).toString(16) : ([1e7] + -1e3 + -4e3 + -8e3 + -1e11).replace(/[018]/g, UUID);
/* harmony export (immutable) */ __webpack_exports__["a"] = UUID;


const isObject = item => item && typeof item === 'object' && !Array.isArray(item);
/* harmony export (immutable) */ __webpack_exports__["j"] = isObject;


// todo add more of the built-in objects, some of them are in https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects
const builtInObjects = new Map([[URL, url => new URL(url.href)], [URLSearchParams, urlSearchParams => new URLSearchParams(urlSearchParams.toString())], [RegExp, regexp => new RegExp(regexp.source, regexp.flags)], [Map, map => new Map(cloneObject([...map]))], [Set, set => new Set(cloneObject([...set]))]]);
/* harmony export (immutable) */ __webpack_exports__["b"] = builtInObjects;


const isBuiltIn = obj => {
  for (const pair of builtInObjects) {
    if (obj instanceof pair[0]) return pair;
  }
};
/* harmony export (immutable) */ __webpack_exports__["h"] = isBuiltIn;


const ignoreObjectType = [WeakSet, WeakMap, Node];

const isIgnoredObjectType = obj => {
  for (const type of ignoreObjectType) {
    if (obj instanceof type) return obj;
  }
};
/* harmony export (immutable) */ __webpack_exports__["i"] = isIgnoredObjectType;


function cloneObject(original, refs = new Map()) {
  if (refs.has(original)) return refs.get(original);
  if (!original || typeof original !== 'object') throw new TypeError(`Oz cloneObject: first argument has to be typeof 'object' & non null, typeof was '${typeof original}'`);
  if (isIgnoredObjectType(original)) return original;
  const builtInPair = isBuiltIn(original);
  if (builtInPair) return builtInPair[1](original);
  let object = Array.isArray(original) ? [...original] : Object.create(Object.getPrototypeOf(original));
  refs.set(original, object);
  for (const [prop, desc] of Object.entries(Object.getOwnPropertyDescriptors(original))) {
    let { value } = desc,
        rest = _objectWithoutProperties(desc, ['value']);
    Object.defineProperty(object, prop, Object.assign({}, rest, value !== undefined && { value: value && typeof value === 'object' ? cloneObject(value, refs) : value }));
  }
  return object;
}

const getPropertyDescriptorPair = (prototype, property) => {
  let descriptor = Object.getOwnPropertyDescriptor(prototype, property);
  while (!descriptor) {
    prototype = Object.getPrototypeOf(prototype);
    if (!prototype) return;
    descriptor = Object.getOwnPropertyDescriptor(prototype, property);
  }
  return { prototype, descriptor };
};
/* harmony export (immutable) */ __webpack_exports__["e"] = getPropertyDescriptorPair;


const hasProperty = (object, property) => {
  return !!getPropertyDescriptorPair(object, property);
};
/* harmony export (immutable) */ __webpack_exports__["g"] = hasProperty;


const getPropertyDescriptor = (object, property) => {
  const result = getPropertyDescriptorPair(object, property);
  if (result) return result.descriptor;
};
/* harmony export (immutable) */ __webpack_exports__["d"] = getPropertyDescriptor;

const getPropertyDescriptorPrototype = (object, property) => {
  const result = getPropertyDescriptorPair(object, property);
  if (result) return result.prototype;
};
/* harmony export (immutable) */ __webpack_exports__["f"] = getPropertyDescriptorPrototype;


/***/ }),
/* 3 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__html_template_js__ = __webpack_require__(20);


const attribute = /^\s*([^\s"'<>/=]+)(?:\s*(=)\s*(?:"([^"]*)"+|'([^']*)'+|([^\s"'=<>`]+)))?/;
const ncname = '[a-zA-Z_][\\w\\-\\.]*';
const qnameCapture = `((?:${ncname}\\:)?${ncname})`;
const startTagOpen = new RegExp(`^<${qnameCapture}`);
const startTagClose = /^\s*(\/?)>/;
const endTag = new RegExp(`^<\\/(${qnameCapture}[^>]*)>`);

const html = Object(__WEBPACK_IMPORTED_MODULE_0__html_template_js__["a" /* htmlTemplate */])((sourceArr, values, { placeholderStr, placeholderRegex, placeholderRegexGlobal, split, getSplitIds, execSplit, joinSrcWithPlaceholders }) => {
  let source = joinSrcWithPlaceholders(sourceArr);
  let html = '';
  let placeholders = [];
  const advance = (n, type, ...vals) => {
    let replacement = '';
    let placeholder;
    if (type) {
      placeholder = { type, ids: [], /* values: vals, */splits: [], path: [] };
      let { splits } = placeholder;
      for (const val of vals) {
        if (!val) continue;
        const valSplit = split(val);
        splits.push(valSplit);
        placeholder.ids = [...placeholder.ids, ...getSplitIds(valSplit)];
      }
      let { ids } = placeholder;
      if (ids.length) {
        placeholders.push(placeholder);
        if (type === 'attribute' || type === 'property') {
          replacement = ' ' + placeholderStr(ids[0]);
        } else if (type === 'startTagName') {
          replacement = execSplit(splits[0], values) + ' ' + placeholderStr(ids[0]);
        } else if (type === 'endTagName') {
          replacement = execSplit(splits[0], values);
        } else if (type === 'comment') {
          replacement = placeholderStr(ids[0]);
        }
      }
    }
    html += replacement || source.substr(0, n);
    source = source.substring(n);
    return placeholder;
  };

  while (source) {
    // eslint-disable-line no-unmodified-loop-condition
    const textEnd = source.indexOf('<');
    if (textEnd === 0) {
      if (source.startsWith('<!--')) {
        // Comment
        const commentEnd = source.indexOf('-->');
        if (commentEnd === -1) throw new Error(`Comment not closed, can't continue the template parsing "${source.substring(0, textEnd)}"`);
        advance(4);
        advance(commentEnd - 4, 'comment', source.substr(0, commentEnd - 4));
        advance(3);
        continue;
      }

      const endTagMatch = source.match(endTag);
      if (endTagMatch) {
        // End tag
        advance(endTagMatch[0].length, 'endTagName', source.substr(0, endTagMatch[0].length));
        continue;
      }

      const startTagMatch = source.match(startTagOpen);
      if (startTagMatch) {
        // Start tag
        advance(1);
        const placeholder = advance(startTagMatch[1].length, 'startTagName', startTagMatch[1]);
        let attributes = [];
        let end, attr;
        while (!(end = source.match(startTagClose)) && (attr = source.match(attribute))) {
          if (attr[5]) {
            attributes.push(advance(attr[0].length, 'property', attr[1], attr[3], attr[4], attr[5]));
          } else {
            attributes.push(advance(attr[0].length, 'attribute', attr[1], attr[3], attr[4], attr[5]));
          }
        }
        attributes = attributes.filter(item => item);
        if (attributes.length) placeholder.dependents = attributes;
        if (!end) throw new Error(`Start tag not closed, can't continue the template parsing "${source.substring(0, textEnd)}"`);
        advance(end[0].length);
        continue;
      }
    }
    const textContent = source.substring(0, textEnd !== -1 ? textEnd : textEnd.length);
    const textSplit = split(textContent);
    for (const i in textSplit) {
      const str = i % 2 ? placeholderStr(textSplit[i]) : textSplit[i];
      advance(str.length, 'text', str);
    }
  }
  return { placeholders, html };
});
/* harmony export (immutable) */ __webpack_exports__["a"] = html;


/***/ }),
/* 4 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "b", function() { return Reactivity; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "c", function() { return defaultReactiveRoot; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__util_index_js__ = __webpack_require__(2);


let Reactivity = class Reactivity {
  constructor() {
    this.watchers = [];
    this.properties = new Map();
    this.cache = new Map();
  }
};

const reactiveProperties = ['__reactivity__', '$watch'];

// Object where reactive objects register themselves when a watcher search for dependencies
let defaultReactiveRoot = {
  watchers: [],
  Reactivity

  // In case there can be multiple windows sharing one reactiveRoot (e.g. Electron/WebExtensions)
};const setDefaultReactiveRoot = reactiveRoot => {
  defaultReactiveRoot = reactiveRoot;
  Reactivity = reactiveRoot.Reactivity;
};
/* harmony export (immutable) */ __webpack_exports__["e"] = setDefaultReactiveRoot;


const includeWatcherObj = (arr, { object, prop, watcher }) => {
  for (const item of arr) {
    const { object: _object, prop: _prop, watcher: _watcher } = item;
    if (object && prop && object === _object && prop === _prop || watcher === _watcher) return item;
  }
};

const getCurrentWatcher = ({ watchers }) => watchers[watchers.length - 1];

const registerWatcher = (getter, watcher, options) => {
  const { object, prop, reactiveRoot = defaultReactiveRoot } = options;
  const watcherObj = { object, prop, watcher };
  const length = reactiveRoot.watchers.push(watcherObj);
  const value = getter();
  reactiveRoot.watchers.splice(length - 1, 1);
  return value;
};

const callWatchers = watchers => {
  const cacheWatchers = [];
  const nonCacheWatchers = [];
  for (const watcherObj of watchers) {
    if (watcherObj.watcher.cache) cacheWatchers.push(watcherObj);else nonCacheWatchers.push(watcherObj);
  }
  for (const watcherObj of [...cacheWatchers, ...nonCacheWatchers]) watcherObj.watcher();
};

const callObjectsWatchers = (...objects) => {
  let watchers = [];
  for (const obj of objects) watchers = [...watchers, ...obj.watchers];
  for (const obj of objects) obj.watchers = [];
  callWatchers(watchers);
};

const initDefaultPropertyReactivity = (props, prop) => {
  if (!props.has(prop)) props.set(prop, { watchers: [] });
};

const ignoreObjectType = [Error, Node];

const IsIgnoredObjectType = obj => {
  for (const type of ignoreObjectType) {
    if (obj instanceof type) return obj;
  }
};
/* harmony export (immutable) */ __webpack_exports__["a"] = IsIgnoredObjectType;


const reactify = (_object = {}, reactiveRoot = defaultReactiveRoot) => {
  if (_object.__reactivity__ instanceof Reactivity || IsIgnoredObjectType(_object) || _object.__reactivity__ === false) return _object;
  const object = Object(__WEBPACK_IMPORTED_MODULE_0__util_index_js__["c" /* cloneObject */])(_object);
  const isBuiltIn = Object(__WEBPACK_IMPORTED_MODULE_0__util_index_js__["h" /* isBuiltIn */])(object);
  const protoProps = isBuiltIn ? Object.getOwnPropertyNames(isBuiltIn[0].prototype) : [];
  const reactivity = new Reactivity();
  Object.defineProperty(object, '__reactivity__', { value: reactivity });
  for (let i in object) {
    const desc = Object(__WEBPACK_IMPORTED_MODULE_0__util_index_js__["d" /* getPropertyDescriptor */])(object, i);
    const { value } = desc;
    if (value && typeof value === 'object') {
      if (value.__reactivity__ instanceof Reactivity) object[i] = _object[i];else object[i] = reactify(value, reactiveRoot);
    }
  }
  const proxy = new Proxy(object, {
    get(target, prop, receiver) {
      if (reactiveProperties.includes(prop)) return Reflect.get(target, prop, isBuiltIn ? target : receiver);
      initDefaultPropertyReactivity(reactivity.properties, prop);
      const propReactivity = reactivity.properties.get(prop);
      const propWatchers = propReactivity.watchers;
      const desc = Object(__WEBPACK_IMPORTED_MODULE_0__util_index_js__["d" /* getPropertyDescriptor */])(target, prop);
      let value;
      if (desc && Reflect.has(desc, 'value')) {
        // property
        value = Reflect.get(target, prop, isBuiltIn ? target : receiver);
      } else {
        // getter
        if (reactivity.cache.has(prop)) {
          value = reactivity.cache.get(prop);
        } else {
          const watcher = _ => {
            reactivity.cache.delete(prop);
            callObjectsWatchers(propReactivity, reactivity);
          };
          watcher.cache = true;
          value = registerWatcher(_ => {
            let _value = Reflect.get(target, prop, isBuiltIn ? target : receiver);
            reactivity.cache.set(prop, _value);
            return _value;
          }, watcher, { object, prop, reactiveRoot });
        }
      }
      if (isBuiltIn && typeof value === 'function') {
        value = value.bind(target);
        if (protoProps.includes(prop)) {
          const _value = value;
          value = (...args) => {
            _value(...args);
            callObjectsWatchers(propReactivity, reactivity);
            return receiver;
          };
        }
      }
      if (reactiveRoot.watchers.length) {
        const currentWatcher = getCurrentWatcher(reactiveRoot);
        if (!includeWatcherObj(propWatchers, currentWatcher)) propWatchers.push(currentWatcher);
      }
      return value;
    },
    set(target, prop, value, receiver) {
      if (value === target[prop]) return true;
      if (reactiveProperties.includes(prop)) return Reflect.set(target, prop, value, receiver);
      initDefaultPropertyReactivity(reactivity.properties, prop);
      if (value && typeof value === 'object') value = reactify(value, reactiveRoot);
      const result = Reflect.set(target, prop, value, receiver);
      callObjectsWatchers(reactivity.properties.get(prop), reactivity);
      return result;
    },
    deleteProperty(target, prop) {
      if (reactiveProperties.includes(prop)) return Reflect.delete(target, prop);
      initDefaultPropertyReactivity(reactivity.properties, prop);
      const result = Reflect.deleteProperty(target, prop);
      callObjectsWatchers(reactivity.properties.get(prop), reactivity);
      if (!reactivity.properties.get(prop).watchers.length /* && reactivity.watchers.length */) {
          reactivity.properties.delete(prop);
          reactivity.cache.delete(prop);
        }
      return result;
    }
  });
  Object.defineProperty(object, '$watch', {
    value: (getter, handler) => {
      if (!handler) {
        handler = getter;
        getter = null;
      }
      let unwatch, oldValue;
      const watcher = _ => {
        if (unwatch) return;
        if (getter) {
          let newValue = registerWatcher(getter.bind(proxy), watcher, { reactiveRoot });
          handler(newValue, oldValue);
          oldValue = newValue;
        } else {
          handler(proxy, proxy);
          reactivity.watchers.push({ object, watcher, reactiveRoot });
        }
      };
      if (getter) oldValue = registerWatcher(getter.bind(proxy), watcher, { reactiveRoot });else reactivity.watchers.push({ object, watcher, reactiveRoot });
      return _ => unwatch = true;
    }
  });
  return proxy;
};
/* harmony export (immutable) */ __webpack_exports__["d"] = reactify;


const watch = (getter, handler, reactiveRoot = defaultReactiveRoot) => {
  let unwatch, oldValue;
  const watcher = _ => {
    if (unwatch) return;
    let newValue = registerWatcher(getter, watcher, { reactiveRoot });
    if (handler) handler(newValue, oldValue);
    oldValue = newValue;
  };
  oldValue = registerWatcher(getter, watcher, { reactiveRoot });
  return _ => unwatch = true;
};
/* harmony export (immutable) */ __webpack_exports__["f"] = watch;


/***/ }),
/* 5 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__reactivity_index_js__ = __webpack_require__(4);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__template_utils_js__ = __webpack_require__(6);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__util_index_js__ = __webpack_require__(2);




const injectRouter = (elem, router) => {
  const ozElements = [];
  const walker = document.createTreeWalker(elem.shadowRoot || elem, NodeFilter.SHOW_ELEMENT, { acceptNode: node => {
      if (node instanceof Element || node.constructor.__ozElement__ && node.__context__) {
        ozElements.push(node);
        return NodeFilter.FILTER_REJECT;
      } else return NodeFilter.FILTER_SKIP;
    } }, false);
  while (walker.nextNode()) {}
  for (const element of ozElements) element.$router = router;
};

const ElementClass = (_class = HTMLElement) => class OzElement extends _class {
  constructor({ store, router, shadowDom }) {
    super();
    if (store) this.$store = store;
    if (router) this.$router = router;
    const cstr = this.constructor;
    const hasTemplate = Object(__WEBPACK_IMPORTED_MODULE_2__util_index_js__["g" /* hasProperty */])(cstr, 'template');
    const hasStyle = Object(__WEBPACK_IMPORTED_MODULE_2__util_index_js__["g" /* hasProperty */])(cstr, 'style');
    let state;
    if (Object(__WEBPACK_IMPORTED_MODULE_2__util_index_js__["g" /* hasProperty */])(this, 'state')) state = this.$state = Object(__WEBPACK_IMPORTED_MODULE_0__reactivity_index_js__["d" /* reactify */])(this.state());
    const host = this.$host = shadowDom ? this.attachShadow({ mode: shadowDom }) : this;
    if (hasTemplate) {
      let templateReturn;
      let template;
      Object(__WEBPACK_IMPORTED_MODULE_0__reactivity_index_js__["f" /* watch */])(_ => templateReturn = cstr.template.apply(this, [{ state, store }]), templateBuild => {
        template.update(...templateBuild.values);
        if (router) injectRouter(this, router);
      });
      if (!Object(__WEBPACK_IMPORTED_MODULE_1__template_utils_js__["e" /* isBuild */])(templateReturn)) throw new Error('Template should return a html-template build.');
      template = this.$template = templateReturn();
      host.appendChild(template.content);
      if (router) injectRouter(this, router);
    }
    if (hasStyle) {
      const style = this.$style = cstr.style.apply(this, [{ state, store }])();
      Object(__WEBPACK_IMPORTED_MODULE_0__reactivity_index_js__["f" /* watch */])(_ => cstr.style.apply(this, [{ state, store }]), styleBuild => style.update(...styleBuild.values));
      host.appendChild(this.$style.content);
      style.update();
    }
  }

  set $router(router) {
    this._$router = router;
    injectRouter(this, this.$router);
  }
  get $router() {
    return this._$router;
  }
};
/* harmony export (immutable) */ __webpack_exports__["b"] = ElementClass;

const Element = ElementClass();
/* harmony export (immutable) */ __webpack_exports__["a"] = Element;


const injectGettersContext = (ctx, obj) => {
  const descs = Object.getOwnPropertyDescriptors(obj);
  for (const prop in descs) {
    const desc = descs[prop];
    const { get, value } = desc;
    if (get) {
      Object.defineProperty(obj, prop, Object.assign({}, desc, { get: get.bind(obj, ctx) }));
    } else if (value) {
      injectGettersContext(ctx, value);
    }
  }
  return obj;
};

const registerElement = ({
  name,
  extend = HTMLElement,
  options: _options = {},
  props: _props = [],
  state: _state,
  template: _template,
  style: _style,
  router: _router,
  store: _store,
  watchers: _watchers = {},
  created: _created,
  connected: _connected,
  disconnected: _disconnected,
  customElements = window.customElements
}) => {
  _props = [..._props, '$router'];
  class OzFunctionnalElement extends extend {
    constructor(cstrOptions = {}) {
      super();
      const { shadowDom, router: router_ } = Object.assign({}, _options, cstrOptions);
      const context = this.__context__ = Object(__WEBPACK_IMPORTED_MODULE_0__reactivity_index_js__["d" /* reactify */])({
        host: shadowDom ? this.attachShadow({ mode: shadowDom }) : this,
        props: {},
        get router() {
          return this.props.$router || router_;
        },
        watchers: {},
        template: undefined,
        style: undefined
      });
      const { host, router, props, watchers } = context;
      context.state = Object(__WEBPACK_IMPORTED_MODULE_0__reactivity_index_js__["d" /* reactify */])(typeof _state === 'function' ? _state(context) : _state || {});
      if (props) {
        const propsDescriptors = {};
        for (const prop of _props) {
          propsDescriptors[prop] = {
            enumerable: true,
            get: _ => props[prop],
            set: val => props[prop] = val
          };
        }
        Object.defineProperties(this, propsDescriptors);
      }
      if (_template) {
        let template, build;
        const buildTemplate = _template.bind(null, context);
        Object(__WEBPACK_IMPORTED_MODULE_0__reactivity_index_js__["f" /* watch */])(_ => build = buildTemplate(context), build => {
          template.update(...build.values);
          if (router) injectRouter(host, router);
        });
        if (!Object(__WEBPACK_IMPORTED_MODULE_1__template_utils_js__["e" /* isBuild */])(build)) throw new Error('Template should return a html-template build.');
        template = build();
        context.template = template;
      }
      if (_style) {
        let style, build;
        const buildStyle = _style.bind(null, context);
        Object(__WEBPACK_IMPORTED_MODULE_0__reactivity_index_js__["f" /* watch */])(_ => build = buildStyle(), styleBuild => style.update(...styleBuild.values));
        if (!Object(__WEBPACK_IMPORTED_MODULE_1__template_utils_js__["e" /* isBuild */])(build)) throw new Error('Style should return a css-template build.');
        style = build();
        context.style = style;
      }
      for (const [name, _watcher] of Object.entries(_watchers)) {
        Object(__WEBPACK_IMPORTED_MODULE_0__reactivity_index_js__["f" /* watch */])(watchers[name] = _watcher.bind(null, context));
      }
      if (_created) _created(context);
    }

    static get __ozElement__() {
      return true;
    }
    static get name() {
      return name;
    }
    static get observedAttributes() {
      return _props;
    }

    attributeChangedCallback(attr, oldValue, newValue) {
      if (_props.includes(attr)) this[attr] = newValue;
    }

    connectedCallback() {
      const ctx = this.__context__;
      const { host, style, router, template } = ctx;
      if (template) {
        host.appendChild(template.content);
        if (router) injectRouter(host, router);
      }
      if (style) {
        host.appendChild(style.content);
        style.update();
      }
      if (_connected) _connected(ctx);
    }

    disconnectedCallback() {
      const ctx = this.__context__;
      if (_disconnected) _disconnected(ctx);
    }
  }
  customElements.define(name, OzFunctionnalElement);
  return OzFunctionnalElement;
};
/* harmony export (immutable) */ __webpack_exports__["c"] = registerElement;


/***/ }),
/* 6 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
const envCachesTemplates = (t => t() === t())(_ => (s => s)``);
/* harmony export (immutable) */ __webpack_exports__["a"] = envCachesTemplates;

const random = Math.floor(Math.random() * Number.MAX_SAFE_INTEGER).toString(16);
/* unused harmony export random */

const placeholderRegex = new RegExp(`oz-template-placeholder-(\\d*)-${random}`);
/* harmony export (immutable) */ __webpack_exports__["g"] = placeholderRegex;

const placeholderRegexGlobal = new RegExp(`oz-template-placeholder-(\\d*)-${random}`, 'g');
/* harmony export (immutable) */ __webpack_exports__["h"] = placeholderRegexGlobal;


const isBuild = value => value.hasOwnProperty('id') && value.hasOwnProperty('values');
/* harmony export (immutable) */ __webpack_exports__["e"] = isBuild;


const placeholderStr = id => `oz-template-placeholder-${id}-${random}`;
/* harmony export (immutable) */ __webpack_exports__["i"] = placeholderStr;


const split = str => str.split(placeholderRegexGlobal);
/* harmony export (immutable) */ __webpack_exports__["j"] = split;


const getSplitIds = split => split.filter((str, i) => i % 2);
/* harmony export (immutable) */ __webpack_exports__["c"] = getSplitIds;


const execSplit = (split, values) => split.map((str, i) => i % 2 ? values[str] : str).join('');
/* harmony export (immutable) */ __webpack_exports__["b"] = execSplit;


const indexToPlaceholder = placeholders => {
  const arr = [];
  for (const placeholder of placeholders) {
    for (const id of placeholder.ids) arr.push(placeholder); // eslint-disable-line no-unused-vars
  }
  return arr;
};
/* harmony export (immutable) */ __webpack_exports__["d"] = indexToPlaceholder;


const valuesDif = (values, values2) => {
  let dif = [];
  const highestLength = values.length > values2.length ? values.length : values2.length;
  for (let i = 0; i < highestLength; i++) {
    if (values[i] !== values2[i]) dif.push(i);
  }
  return dif;
};
/* harmony export (immutable) */ __webpack_exports__["k"] = valuesDif;


// export const joinSrcWithPlaceholders = strings => strings[0] + [...strings].splice(1).map((str, i) => placeholderStr(i) + str).join('')
const joinSrcWithPlaceholders = strings => {
  let str = strings[0];
  for (const i in strings) {
    if (i === 0) continue;
    str += placeholderStr(i) + (strings[parseInt(i) + 1] || '');
  }
  return str;
};
/* harmony export (immutable) */ __webpack_exports__["f"] = joinSrcWithPlaceholders;


/***/ }),
/* 7 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var g;

// This works in non-strict mode
g = function () {
	return this;
}();

try {
	// This works if eval is allowed (see CSP)
	g = g || Function("return this")() || (1, eval)("this");
} catch (e) {
	// This works if the window reference is available
	if (typeof window === "object") g = window;
}

// g can still be undefined, but nothing to do about it...
// We return undefined, instead of nothing here, so it's
// easier to handle this case. if(!global) { ...}

module.exports = g;

/***/ }),
/* 8 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__css_template_js__ = __webpack_require__(21);


const css = Object(__WEBPACK_IMPORTED_MODULE_0__css_template_js__["a" /* cssTemplate */])((source, values, { placeholderStr, joinSrcWithPlaceholders }) => {
  let src = source[0];
  for (const i in values) {
    if (i === 0) continue;
    src += `var(--${placeholderStr(i)})${source[parseInt(i) + 1]}`;
  }
  return { css: src };
});
/* harmony export (immutable) */ __webpack_exports__["a"] = css;

// todo: add features with a css parser, https://github.com/reworkcss/css/blob/master/lib/parse/index.js

/***/ }),
/* 9 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
/* WEBPACK VAR INJECTION */(function(process) {

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.Markdown = exports.Code = exports.Header = exports.Mount = undefined;

var _oz = __webpack_require__(1);

var _mount = __webpack_require__(26);

var _mount2 = _interopRequireDefault(_mount);

var _header = __webpack_require__(27);

var _header2 = _interopRequireDefault(_header);

var _code = __webpack_require__(28);

var _code2 = _interopRequireDefault(_code);

var _markdown = __webpack_require__(32);

var _markdown2 = _interopRequireDefault(_markdown);

var _componentOverview = __webpack_require__(35);

var componentOverview = _interopRequireWildcard(_componentOverview);

var _templateOverview = __webpack_require__(36);

var templateOverview = _interopRequireWildcard(_templateOverview);

var _reactivityOverview = __webpack_require__(37);

var reactivityOverview = _interopRequireWildcard(_reactivityOverview);

function _interopRequireWildcard(obj) { if (obj && obj.__esModule) { return obj; } else { var newObj = {}; if (obj != null) { for (var key in obj) { if (Object.prototype.hasOwnProperty.call(obj, key)) newObj[key] = obj[key]; } } newObj.default = obj; return newObj; } }

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

const style = _ => _oz.css`

:host {
  display: flex;
  flex-direction: column;
}
/* firefox fix */
app-index {
  display: flex;
  flex-direction: column;
}

.header {
  display: inline-block;
  position: relative;
  margin: auto;
  margin-top: 10rem;
}

#logo {
  margin: auto;
  height: 20rem;
}

#discord {
  position: absolute;
  right: -4rem;
  bottom: 0;
  height: 4rem;
}

#github {
  position: absolute;
  right: -3.6rem;
  bottom: 4.2rem;
  height: 3.2rem;
}

footer {
  text-align: center;
  color: #ECECEC;
  padding: 2.5rem;
}

#description {
  display: block;
  margin: 5rem 0;
  text-align: center;
  color: #ECECEC;
  align-self: end;
  font-family: Roboto;
  font-size: 4rem;
  font-weight: 100;
  width: 100%;
  height: 4.8rem;
}

#inner {
  display: flex;
  flex-direction: column;
  align-items: start;
  justify-content: center;
}

.example {
  display: flex;
  margin: 4rem auto;
  width: 120rem;
}

.example oz-markdown {
  font-family: Roboto;
  color: #ECECEC;
  font-weight: 300;
  font-size: 1.8rem;
  line-height: 2.25rem;
  flex: 0 0 30%;
}

.example oz-markdown oz-code {
  font-size: 1.5rem;
  flex: none;
}

.example oz-code {
  flex: 0 0 70%;
}

@media screen and (max-width: 1250px) {
  /* #inner {
    margin: 5rem 2.5rem;
  } */

  #description {
    height: calc(4.8rem * 2);
  }

  .example {
    flex-direction: column;
    width: auto;
    max-width: calc(100% - 1 * 2rem);
    margin: 0 1rem;
  }
}
`;

const template = ({ host }) => {
  const descNode = document.createElement('iframe');
  descNode.setAttribute('frameborder', '0');
  descNode.setAttribute('scrolling', 'no');
  descNode.id = 'description';
  // const items = [{
  //   documentation: componentOverview.documentation,
  //   html: componentOverview.style,
  //   result: descNode,
  //   value: componentOverview.code
  // }, {
  //   documentation: templateOverview.documentation,
  //   result: 'true',
  //   value: templateOverview.code
  // }, {
  //   documentation: reactivityOverview.documentation,
  //   result: 'true',
  //   value: reactivityOverview.code
  // }]
  //   ${items.map(item => html`<div class="example">
  //   <oz-markdown value=${item.documentation}></oz-markdown>
  //   <oz-code
  //     html=${item.html || ''}
  //     language="javascript"
  //     result=${item.result}
  //     editable="true"
  //     value=${item.value}
  //   ></oz-code>
  // </div>`)}
  const ozjsBundle = process && true ? '<script src="/assets/code-result.js"></script>' : '';
  return _oz.html`
  <div class="header">
    <img id="logo" src="/assets/imgs/logo.svg">
    <a href="https://github.com/Banou26/ozjs" target="_blank"><img id="github" src="/assets/imgs/github-light-120.png"></a>
    <a href="https://discord.gg/ZKEbTqf" target="_blank"><img id="discord" src="/assets/imgs/discord-logo-white.svg"></a>
  </div>
  ${descNode}
  <div id="inner">
    <div class="example">
      <oz-markdown value=${componentOverview.documentation}></oz-markdown>
      <oz-code
        html=${ozjsBundle + componentOverview.style}
        language="javascript"
        result=${descNode}
        editable="true"
        value=${componentOverview.code}
      ></oz-code>
    </div>
    <div class="example">
      <oz-markdown value=${templateOverview.documentation}></oz-markdown>
      <oz-code
      html=${ozjsBundle}
        language="javascript"
        result="true"
        editable="true"
        value=${templateOverview.code}
      ></oz-code>
    </div>
    <div class="example">
      <oz-markdown value=${reactivityOverview.documentation}></oz-markdown>
      <oz-code
      html=${ozjsBundle}
        language="javascript"
        result="true"
        editable="true"
        value=${reactivityOverview.code}
      ></oz-code>
    </div>
  </div>
  <footer>Released under the MIT License<br>Copyright © 2018 Dias-Santos Thomas</footer>
  `;
};

const Index = {
  name: 'app-index',
  options: { shadowDom: 'open' },
  template,
  style
};

exports.default = (0, _oz.registerElement)(Index);
exports.Mount = _mount2.default;
exports.Header = _header2.default;
exports.Code = _code2.default;
exports.Markdown = _markdown2.default;
/* WEBPACK VAR INJECTION */}.call(exports, __webpack_require__(0)))

/***/ }),
/* 10 */
/***/ (function(module, exports, __webpack_require__) {

__webpack_require__(11);
module.exports = __webpack_require__(12);


/***/ }),
/* 11 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
/* WEBPACK VAR INJECTION */(function(global, process) {

(function () {
  /*
  Copyright (c) 2016 The Polymer Project Authors. All rights reserved.
  This code may only be used under the BSD style license found at http://polymer.github.io/LICENSE.txt
  The complete set of authors may be found at http://polymer.github.io/AUTHORS.txt
  The complete set of contributors may be found at http://polymer.github.io/CONTRIBUTORS.txt
  Code distributed by Google as part of the polymer project is also
  subject to an additional IP rights grant found at http://polymer.github.io/PATENTS.txt
  */
  'use strict';
  var p,
      q = "undefined" != typeof window && window === this ? this : "undefined" != typeof global && null != global ? global : this,
      da = "function" == typeof Object.defineProperties ? Object.defineProperty : function (a, b, c) {
    a != Array.prototype && a != Object.prototype && (a[b] = c.value);
  };function ea() {
    ea = function () {};q.Symbol || (q.Symbol = fa);
  }var fa = function () {
    var a = 0;return function (b) {
      return "jscomp_symbol_" + (b || "") + a++;
    };
  }();
  function ha() {
    ea();var a = q.Symbol.iterator;a || (a = q.Symbol.iterator = q.Symbol("iterator"));"function" != typeof Array.prototype[a] && da(Array.prototype, a, { configurable: !0, writable: !0, value: function () {
        return ia(this);
      } });ha = function () {};
  }function ia(a) {
    var b = 0;return ja(function () {
      return b < a.length ? { done: !1, value: a[b++] } : { done: !0 };
    });
  }function ja(a) {
    ha();a = { next: a };a[q.Symbol.iterator] = function () {
      return this;
    };return a;
  }function ka(a) {
    ha();var b = a[Symbol.iterator];return b ? b.call(a) : ia(a);
  }
  function la(a) {
    for (var b, c = []; !(b = a.next()).done;) c.push(b.value);return c;
  }
  (function () {
    if (!function () {
      var a = document.createEvent("Event");a.initEvent("foo", !0, !0);a.preventDefault();return a.defaultPrevented;
    }()) {
      var a = Event.prototype.preventDefault;Event.prototype.preventDefault = function () {
        this.cancelable && (a.call(this), Object.defineProperty(this, "defaultPrevented", { get: function () {
            return !0;
          }, configurable: !0 }));
      };
    }var b = /Trident/.test(navigator.userAgent);if (!window.CustomEvent || b && "function" !== typeof window.CustomEvent) window.CustomEvent = function (a, b) {
      b = b || {};var c = document.createEvent("CustomEvent");
      c.initCustomEvent(a, !!b.bubbles, !!b.cancelable, b.detail);return c;
    }, window.CustomEvent.prototype = window.Event.prototype;if (!window.Event || b && "function" !== typeof window.Event) {
      var c = window.Event;window.Event = function (a, b) {
        b = b || {};var c = document.createEvent("Event");c.initEvent(a, !!b.bubbles, !!b.cancelable);return c;
      };if (c) for (var d in c) window.Event[d] = c[d];window.Event.prototype = c.prototype;
    }if (!window.MouseEvent || b && "function" !== typeof window.MouseEvent) {
      b = window.MouseEvent;window.MouseEvent = function (a, b) {
        b = b || {};var c = document.createEvent("MouseEvent");c.initMouseEvent(a, !!b.bubbles, !!b.cancelable, b.view || window, b.detail, b.screenX, b.screenY, b.clientX, b.clientY, b.ctrlKey, b.altKey, b.shiftKey, b.metaKey, b.button, b.relatedTarget);return c;
      };if (b) for (d in b) window.MouseEvent[d] = b[d];window.MouseEvent.prototype = b.prototype;
    }Array.from || (Array.from = function (a) {
      return [].slice.call(a);
    });Object.assign || (Object.assign = function (a, b) {
      for (var c = [].slice.call(arguments, 1), d = 0, e; d < c.length; d++) if (e = c[d]) for (var f = a, m = e, n = Object.getOwnPropertyNames(m), w = 0; w < n.length; w++) e = n[w], f[e] = m[e];return a;
    });
  })(window.WebComponents);(function () {
    function a() {}function b(a, b) {
      if (!a.childNodes.length) return [];switch (a.nodeType) {case Node.DOCUMENT_NODE:
          return w.call(a, b);case Node.DOCUMENT_FRAGMENT_NODE:
          return I.call(a, b);default:
          return n.call(a, b);}
    }var c = "undefined" === typeof HTMLTemplateElement,
        d = !(document.createDocumentFragment().cloneNode() instanceof DocumentFragment),
        e = !1;/Trident/.test(navigator.userAgent) && function () {
      function a(a, b) {
        if (a instanceof DocumentFragment) for (var d; d = a.firstChild;) c.call(this, d, b);else c.call(this, a, b);return a;
      }e = !0;var b = Node.prototype.cloneNode;Node.prototype.cloneNode = function (a) {
        a = b.call(this, a);this instanceof DocumentFragment && (a.__proto__ = DocumentFragment.prototype);return a;
      };DocumentFragment.prototype.querySelectorAll = HTMLElement.prototype.querySelectorAll;DocumentFragment.prototype.querySelector = HTMLElement.prototype.querySelector;Object.defineProperties(DocumentFragment.prototype, { nodeType: { get: function () {
            return Node.DOCUMENT_FRAGMENT_NODE;
          }, configurable: !0 }, localName: { get: function () {},
          configurable: !0 }, nodeName: { get: function () {
            return "#document-fragment";
          }, configurable: !0 } });var c = Node.prototype.insertBefore;Node.prototype.insertBefore = a;var d = Node.prototype.appendChild;Node.prototype.appendChild = function (b) {
        b instanceof DocumentFragment ? a.call(this, b, null) : d.call(this, b);return b;
      };var f = Node.prototype.removeChild,
          h = Node.prototype.replaceChild;Node.prototype.replaceChild = function (b, c) {
        b instanceof DocumentFragment ? (a.call(this, b, c), f.call(this, c)) : h.call(this, b, c);return c;
      };Document.prototype.createDocumentFragment = function () {
        var a = this.createElement("df");a.__proto__ = DocumentFragment.prototype;return a;
      };var g = Document.prototype.importNode;Document.prototype.importNode = function (a, b) {
        b = g.call(this, a, b || !1);a instanceof DocumentFragment && (b.__proto__ = DocumentFragment.prototype);return b;
      };
    }();var f = Node.prototype.cloneNode,
        h = Document.prototype.createElement,
        g = Document.prototype.importNode,
        k = Node.prototype.removeChild,
        l = Node.prototype.appendChild,
        m = Node.prototype.replaceChild,
        n = Element.prototype.querySelectorAll,
        w = Document.prototype.querySelectorAll,
        I = DocumentFragment.prototype.querySelectorAll,
        cb = function () {
      if (!c) {
        var a = document.createElement("template"),
            b = document.createElement("template");b.content.appendChild(document.createElement("div"));a.content.appendChild(b);a = a.cloneNode(!0);return 0 === a.content.childNodes.length || 0 === a.content.firstChild.content.childNodes.length || d;
      }
    }();if (c) {
      var t = document.implementation.createHTMLDocument("template"),
          pa = !0,
          Z = document.createElement("style");Z.textContent = "template{display:none;}";
      var aa = document.head;aa.insertBefore(Z, aa.firstElementChild);a.prototype = Object.create(HTMLElement.prototype);var ba = !document.createElement("div").hasOwnProperty("innerHTML");a.D = function (b) {
        if (!b.content) {
          b.content = t.createDocumentFragment();for (var c; c = b.firstChild;) l.call(b.content, c);if (ba) b.__proto__ = a.prototype;else if (b.cloneNode = function (b) {
            return a.ca(this, b);
          }, pa) try {
            R(b), ca(b);
          } catch (Lg) {
            pa = !1;
          }a.J(b.content);
        }
      };var R = function (b) {
        Object.defineProperty(b, "innerHTML", { get: function () {
            for (var a = "", b = this.content.firstChild; b; b = b.nextSibling) a += b.outerHTML || b.data.replace(Ee, qa);return a;
          }, set: function (b) {
            t.body.innerHTML = b;for (a.J(t); this.content.firstChild;) k.call(this.content, this.content.firstChild);for (; t.body.firstChild;) l.call(this.content, t.body.firstChild);
          }, configurable: !0 });
      },
          ca = function (a) {
        Object.defineProperty(a, "outerHTML", { get: function () {
            return "<template>" + this.innerHTML + "</template>";
          }, set: function (a) {
            if (this.parentNode) {
              t.body.innerHTML = a;for (a = this.ownerDocument.createDocumentFragment(); t.body.firstChild;) l.call(a, t.body.firstChild);m.call(this.parentNode, a, this);
            } else throw Error("Failed to set the 'outerHTML' property on 'Element': This element has no parent node.");
          }, configurable: !0 });
      };R(a.prototype);ca(a.prototype);a.J = function (c) {
        c = b(c, "template");for (var d = 0, e = c.length, f; d < e && (f = c[d]); d++) a.D(f);
      };document.addEventListener("DOMContentLoaded", function () {
        a.J(document);
      });Document.prototype.createElement = function () {
        var b = h.apply(this, arguments);"template" === b.localName && a.D(b);return b;
      };var Ee = /[&\u00A0<>]/g,
          qa = function (a) {
        switch (a) {case "&":
            return "&amp;";case "<":
            return "&lt;";case ">":
            return "&gt;";case "\u00a0":
            return "&nbsp;";}
      };
    }if (c || cb) {
      a.ca = function (a, b) {
        var c = f.call(a, !1);this.D && this.D(c);b && (l.call(c.content, f.call(a.content, !0)), Ca(c.content, a.content));return c;
      };var Ca = function (c, d) {
        if (d.querySelectorAll && (d = b(d, "template"), 0 !== d.length)) {
          c = b(c, "template");for (var e = 0, f = c.length, h, g; e < f; e++) g = d[e], h = c[e], a && a.D && a.D(g), m.call(h.parentNode, Fe.call(g, !0), h);
        }
      },
          Fe = Node.prototype.cloneNode = function (b) {
        if (!e && d && this instanceof DocumentFragment) {
          if (b) var c = Ge.call(this.ownerDocument, this, !0);else return this.ownerDocument.createDocumentFragment();
        } else c = this.nodeType === Node.ELEMENT_NODE && "template" === this.localName ? a.ca(this, b) : f.call(this, b);b && Ca(c, this);return c;
      },
          Ge = Document.prototype.importNode = function (c, d) {
        d = d || !1;if ("template" === c.localName) return a.ca(c, d);var e = g.call(this, c, d);if (d) {
          Ca(e, c);c = b(e, 'script:not([type]),script[type="application/javascript"],script[type="text/javascript"]');for (var f, k = 0; k < c.length; k++) {
            f = c[k];d = h.call(document, "script");d.textContent = f.textContent;for (var l = f.attributes, ca = 0, qa; ca < l.length; ca++) qa = l[ca], d.setAttribute(qa.name, qa.value);m.call(f.parentNode, d, f);
          }
        }return e;
      };
    }c && (window.HTMLTemplateElement = a);
  })();var ma = Array.isArray ? Array.isArray : function (a) {
    return "[object Array]" === Object.prototype.toString.call(a);
  };var na = 0,
      oa,
      ra = "undefined" !== typeof window ? window : void 0,
      sa = ra || {},
      ta = sa.MutationObserver || sa.WebKitMutationObserver,
      ua = "undefined" !== typeof Uint8ClampedArray && "undefined" !== typeof importScripts && "undefined" !== typeof MessageChannel;function va() {
    return "undefined" !== typeof oa ? function () {
      oa(wa);
    } : xa();
  }function ya() {
    var a = 0,
        b = new ta(wa),
        c = document.createTextNode("");b.observe(c, { characterData: !0 });return function () {
      c.data = a = ++a % 2;
    };
  }
  function za() {
    var a = new MessageChannel();a.port1.onmessage = wa;return function () {
      return a.port2.postMessage(0);
    };
  }function xa() {
    var a = setTimeout;return function () {
      return a(wa, 1);
    };
  }var Aa = Array(1E3);function wa() {
    for (var a = 0; a < na; a += 2) (0, Aa[a])(Aa[a + 1]), Aa[a] = void 0, Aa[a + 1] = void 0;na = 0;
  }var Ba, Da;
  if ("undefined" === typeof self && "undefined" !== typeof process && "[object process]" === {}.toString.call(process)) Da = function () {
    return process.ib(wa);
  };else {
    var Ea;if (ta) Ea = ya();else {
      var Fa;if (ua) Fa = za();else {
        var Ga;if (void 0 === ra && "function" === "function") try {
          var Ha = __webpack_require__(!(function webpackMissingModule() { var e = new Error("Cannot find module \"vertx\""); e.code = 'MODULE_NOT_FOUND'; throw e; }()));oa = Ha.kb || Ha.jb;Ga = va();
        } catch (a) {
          Ga = xa();
        } else Ga = xa();Fa = Ga;
      }Ea = Fa;
    }Da = Ea;
  }Ba = Da;function Ia(a, b) {
    Aa[na] = a;Aa[na + 1] = b;na += 2;2 === na && Ba();
  };function Ja(a, b) {
    var c = this,
        d = new this.constructor(Ka);void 0 === d[La] && Ma(d);var e = c.g;if (e) {
      var f = arguments[e - 1];Ia(function () {
        return Na(e, d, f, c.f);
      });
    } else Oa(c, d, a, b);return d;
  };function Pa(a) {
    if (a && "object" === typeof a && a.constructor === this) return a;var b = new this(Ka);Qa(b, a);return b;
  };var La = Math.random().toString(36).substring(16);function Ka() {}var Sa = new Ra();function Ta(a) {
    try {
      return a.then;
    } catch (b) {
      return Sa.error = b, Sa;
    }
  }function Ua(a, b, c, d) {
    try {
      a.call(b, c, d);
    } catch (e) {
      return e;
    }
  }function Va(a, b, c) {
    Ia(function (a) {
      var d = !1,
          f = Ua(c, b, function (c) {
        d || (d = !0, b !== c ? Qa(a, c) : r(a, c));
      }, function (b) {
        d || (d = !0, u(a, b));
      });!d && f && (d = !0, u(a, f));
    }, a);
  }function Wa(a, b) {
    1 === b.g ? r(a, b.f) : 2 === b.g ? u(a, b.f) : Oa(b, void 0, function (b) {
      return Qa(a, b);
    }, function (b) {
      return u(a, b);
    });
  }
  function Xa(a, b, c) {
    b.constructor === a.constructor && c === Ja && b.constructor.resolve === Pa ? Wa(a, b) : c === Sa ? (u(a, Sa.error), Sa.error = null) : void 0 === c ? r(a, b) : "function" === typeof c ? Va(a, b, c) : r(a, b);
  }function Qa(a, b) {
    if (a === b) u(a, new TypeError("You cannot resolve a promise with itself"));else {
      var c = typeof b;null === b || "object" !== c && "function" !== c ? r(a, b) : Xa(a, b, Ta(b));
    }
  }function Ya(a) {
    a.na && a.na(a.f);Za(a);
  }function r(a, b) {
    void 0 === a.g && (a.f = b, a.g = 1, 0 !== a.I.length && Ia(Za, a));
  }
  function u(a, b) {
    void 0 === a.g && (a.g = 2, a.f = b, Ia(Ya, a));
  }function Oa(a, b, c, d) {
    var e = a.I,
        f = e.length;a.na = null;e[f] = b;e[f + 1] = c;e[f + 2] = d;0 === f && a.g && Ia(Za, a);
  }function Za(a) {
    var b = a.I,
        c = a.g;if (0 !== b.length) {
      for (var d, e, f = a.f, h = 0; h < b.length; h += 3) d = b[h], e = b[h + c], d ? Na(c, d, e, f) : e(f);a.I.length = 0;
    }
  }function Ra() {
    this.error = null;
  }var $a = new Ra();
  function Na(a, b, c, d) {
    var e = "function" === typeof c;if (e) {
      try {
        var f = c(d);
      } catch (l) {
        $a.error = l, f = $a;
      }if (f === $a) {
        var h = !0;var g = f.error;f.error = null;
      } else var k = !0;if (b === f) {
        u(b, new TypeError("A promises callback cannot return that same promise."));return;
      }
    } else f = d, k = !0;void 0 === b.g && (e && k ? Qa(b, f) : h ? u(b, g) : 1 === a ? r(b, f) : 2 === a && u(b, f));
  }function ab(a, b) {
    try {
      b(function (b) {
        Qa(a, b);
      }, function (b) {
        u(a, b);
      });
    } catch (c) {
      u(a, c);
    }
  }var bb = 0;function Ma(a) {
    a[La] = bb++;a.g = void 0;a.f = void 0;a.I = [];
  };function db(a, b) {
    this.Ea = a;this.A = new a(Ka);this.A[La] || Ma(this.A);if (ma(b)) {
      if (this.S = this.length = b.length, this.f = Array(this.length), 0 === this.length) r(this.A, this.f);else {
        this.length = this.length || 0;for (a = 0; void 0 === this.g && a < b.length; a++) eb(this, b[a], a);0 === this.S && r(this.A, this.f);
      }
    } else u(this.A, Error("Array Methods must be provided an Array"));
  }
  function eb(a, b, c) {
    var d = a.Ea,
        e = d.resolve;e === Pa ? (e = Ta(b), e === Ja && void 0 !== b.g ? fb(a, b.g, c, b.f) : "function" !== typeof e ? (a.S--, a.f[c] = b) : d === v ? (d = new d(Ka), Xa(d, b, e), gb(a, d, c)) : gb(a, new d(function (a) {
      return a(b);
    }), c)) : gb(a, e(b), c);
  }function fb(a, b, c, d) {
    var e = a.A;void 0 === e.g && (a.S--, 2 === b ? u(e, d) : a.f[c] = d);0 === a.S && r(e, a.f);
  }function gb(a, b, c) {
    Oa(b, void 0, function (b) {
      return fb(a, 1, c, b);
    }, function (b) {
      return fb(a, 2, c, b);
    });
  };function hb(a) {
    return new db(this, a).A;
  };function ib(a) {
    var b = this;return ma(a) ? new b(function (c, d) {
      for (var e = a.length, f = 0; f < e; f++) b.resolve(a[f]).then(c, d);
    }) : new b(function (a, b) {
      return b(new TypeError("You must pass an array to race."));
    });
  };function jb(a) {
    var b = new this(Ka);u(b, a);return b;
  };function v(a) {
    this[La] = bb++;this.f = this.g = void 0;this.I = [];if (Ka !== a) {
      if ("function" !== typeof a) throw new TypeError("You must pass a resolver function as the first argument to the promise constructor");if (this instanceof v) ab(this, a);else throw new TypeError("Failed to construct 'Promise': Please use the 'new' operator, this object constructor cannot be called as a function.");
    }
  }v.prototype = { constructor: v, then: Ja, a: function (a) {
      return this.then(null, a);
    } }; /*
         Copyright (c) 2017 The Polymer Project Authors. All rights reserved.
         This code may only be used under the BSD style license found at http://polymer.github.io/LICENSE.txt
         The complete set of authors may be found at http://polymer.github.io/AUTHORS.txt
         The complete set of contributors may be found at http://polymer.github.io/CONTRIBUTORS.txt
         Code distributed by Google as part of the polymer project is also
         subject to an additional IP rights grant found at http://polymer.github.io/PATENTS.txt
         */
  window.Promise || (window.Promise = v, v.prototype["catch"] = v.prototype.a, v.prototype.then = v.prototype.then, v.all = hb, v.race = ib, v.resolve = Pa, v.reject = jb);(function (a) {
    function b(a, b) {
      if ("function" === typeof window.CustomEvent) return new CustomEvent(a, b);var c = document.createEvent("CustomEvent");c.initCustomEvent(a, !!b.bubbles, !!b.cancelable, b.detail);return c;
    }function c(a) {
      if (m) return a.ownerDocument !== document ? a.ownerDocument : null;var b = a.__importDoc;if (!b && a.parentNode) {
        b = a.parentNode;if ("function" === typeof b.closest) b = b.closest("link[rel=import]");else for (; !g(b) && (b = b.parentNode););a.__importDoc = b;
      }return b;
    }function d(a) {
      var b = document.querySelectorAll("link[rel=import]:not([import-dependency])"),
          c = b.length;c ? l(b, function (b) {
        return h(b, function () {
          0 === --c && a();
        });
      }) : a();
    }function e(a) {
      function b() {
        "loading" !== document.readyState && document.body && (document.removeEventListener("readystatechange", b), a());
      }document.addEventListener("readystatechange", b);b();
    }function f(a) {
      e(function () {
        return d(function () {
          return a && a();
        });
      });
    }function h(a, b) {
      if (a.__loaded) b && b();else if ("script" === a.localName && !a.src || "style" === a.localName && !a.firstChild) a.__loaded = !0, b && b();else {
        var c = function (d) {
          a.removeEventListener(d.type, c);a.__loaded = !0;b && b();
        };a.addEventListener("load", c);Z && "style" === a.localName || a.addEventListener("error", c);
      }
    }function g(a) {
      return a.nodeType === Node.ELEMENT_NODE && "link" === a.localName && "import" === a.rel;
    }function k() {
      var a = this;this.a = {};this.b = 0;this.c = new MutationObserver(function (b) {
        return a.Ra(b);
      });this.c.observe(document.head, { childList: !0, subtree: !0 });this.loadImports(document);
    }function l(a, b, c) {
      var d = a ? a.length : 0,
          e = c ? -1 : 1;for (c = c ? d - 1 : 0; c < d && 0 <= c; c += e) b(a[c], c);
    }var m = "import" in document.createElement("link"),
        n = null;!1 === "currentScript" in document && Object.defineProperty(document, "currentScript", { get: function () {
        return n || ("complete" !== document.readyState ? document.scripts[document.scripts.length - 1] : null);
      }, configurable: !0 });var w = /(url\()([^)]*)(\))/g,
        I = /(@import[\s]+(?!url\())([^;]*)(;)/g,
        cb = /(<link[^>]*)(rel=['|"]?stylesheet['|"]?[^>]*>)/g,
        t = { La: function (a, b) {
        a.href && a.setAttribute("href", t.Y(a.getAttribute("href"), b));a.src && a.setAttribute("src", t.Y(a.getAttribute("src"), b));if ("style" === a.localName) {
          var c = t.ta(a.textContent, b, w);a.textContent = t.ta(c, b, I);
        }
      }, ta: function (a, b, c) {
        return a.replace(c, function (a, c, d, e) {
          a = d.replace(/["']/g, "");b && (a = t.Y(a, b));return c + "'" + a + "'" + e;
        });
      }, Y: function (a, b) {
        if (void 0 === t.ba) {
          t.ba = !1;try {
            var c = new URL("b", "http://a");c.pathname = "c%20d";t.ba = "http://a/c%20d" === c.href;
          } catch (Ca) {}
        }if (t.ba) return new URL(a, b).href;c = t.Ba;c || (c = document.implementation.createHTMLDocument("temp"), t.Ba = c, c.ma = c.createElement("base"), c.head.appendChild(c.ma), c.la = c.createElement("a"));c.ma.href = b;c.la.href = a;return c.la.href || a;
      } },
        pa = { async: !0, load: function (a, b, c) {
        if (a) {
          if (a.match(/^data:/)) {
            a = a.split(",");var d = a[1];d = -1 < a[0].indexOf(";base64") ? atob(d) : decodeURIComponent(d);b(d);
          } else {
            var e = new XMLHttpRequest();e.open("GET", a, pa.async);e.onload = function () {
              var a = e.responseURL || e.getResponseHeader("Location");a && 0 === a.indexOf("/") && (a = (location.origin || location.protocol + "//" + location.host) + a);var d = e.response || e.responseText;304 === e.status || 0 === e.status || 200 <= e.status && 300 > e.status ? b(d, a) : c(d);
            };
            e.send();
          }
        } else c("error: href must be specified");
      } },
        Z = /Trident/.test(navigator.userAgent) || /Edge\/\d./i.test(navigator.userAgent);k.prototype.loadImports = function (a) {
      var b = this;a = a.querySelectorAll("link[rel=import]");l(a, function (a) {
        return b.s(a);
      });
    };k.prototype.s = function (a) {
      var b = this,
          c = a.href;if (void 0 !== this.a[c]) {
        var d = this.a[c];d && d.__loaded && (a.__import = d, this.h(a));
      } else this.b++, this.a[c] = "pending", pa.load(c, function (a, d) {
        a = b.Sa(a, d || c);b.a[c] = a;b.b--;b.loadImports(a);b.L();
      }, function () {
        b.a[c] = null;b.b--;b.L();
      });
    };k.prototype.Sa = function (a, b) {
      if (!a) return document.createDocumentFragment();Z && (a = a.replace(cb, function (a, b, c) {
        return -1 === a.indexOf("type=") ? b + " type=import-disable " + c : a;
      }));var c = document.createElement("template");c.innerHTML = a;if (c.content) {
        a = c.content;var d = function (a) {
          l(a.querySelectorAll("template"), function (a) {
            l(a.content.querySelectorAll('script:not([type]),script[type="application/javascript"],script[type="text/javascript"]'), function (a) {
              var b = document.createElement("script");
              l(a.attributes, function (a) {
                return b.setAttribute(a.name, a.value);
              });b.textContent = a.textContent;a.parentNode.insertBefore(b, a);a.parentNode.removeChild(a);
            });d(a.content);
          });
        };d(a);
      } else for (a = document.createDocumentFragment(); c.firstChild;) a.appendChild(c.firstChild);if (c = a.querySelector("base")) b = t.Y(c.getAttribute("href"), b), c.removeAttribute("href");c = a.querySelectorAll('link[rel=import],link[rel=stylesheet][href][type=import-disable],style:not([type]),link[rel=stylesheet][href]:not([type]),script:not([type]),script[type="application/javascript"],script[type="text/javascript"]');
      var e = 0;l(c, function (a) {
        h(a);t.La(a, b);a.setAttribute("import-dependency", "");"script" === a.localName && !a.src && a.textContent && (a.setAttribute("src", "data:text/javascript;charset=utf-8," + encodeURIComponent(a.textContent + ("\n//# sourceURL=" + b + (e ? "-" + e : "") + ".js\n"))), a.textContent = "", e++);
      });return a;
    };k.prototype.L = function () {
      var a = this;if (!this.b) {
        this.c.disconnect();this.flatten(document);var b = !1,
            c = !1,
            d = function () {
          c && b && (a.loadImports(document), a.b || (a.c.observe(document.head, { childList: !0, subtree: !0 }), a.Pa()));
        };this.Ua(function () {
          c = !0;d();
        });this.Ta(function () {
          b = !0;d();
        });
      }
    };k.prototype.flatten = function (a) {
      var b = this;a = a.querySelectorAll("link[rel=import]");l(a, function (a) {
        var c = b.a[a.href];(a.__import = c) && c.nodeType === Node.DOCUMENT_FRAGMENT_NODE && (b.a[a.href] = a, a.readyState = "loading", a.__import = a, b.flatten(c), a.appendChild(c));
      });
    };k.prototype.Ta = function (a) {
      function b(e) {
        if (e < d) {
          var f = c[e],
              g = document.createElement("script");f.removeAttribute("import-dependency");l(f.attributes, function (a) {
            return g.setAttribute(a.name, a.value);
          });n = g;f.parentNode.replaceChild(g, f);h(g, function () {
            n = null;b(e + 1);
          });
        } else a();
      }var c = document.querySelectorAll("script[import-dependency]"),
          d = c.length;b(0);
    };k.prototype.Ua = function (a) {
      var b = document.querySelectorAll("style[import-dependency],link[rel=stylesheet][import-dependency]"),
          d = b.length;if (d) {
        var e = Z && !!document.querySelector("link[rel=stylesheet][href][type=import-disable]");l(b, function (b) {
          h(b, function () {
            b.removeAttribute("import-dependency");0 === --d && a();
          });if (e && b.parentNode !== document.head) {
            var f = document.createElement(b.localName);f.__appliedElement = b;f.setAttribute("type", "import-placeholder");b.parentNode.insertBefore(f, b.nextSibling);for (f = c(b); f && c(f);) f = c(f);f.parentNode !== document.head && (f = null);document.head.insertBefore(b, f);b.removeAttribute("type");
          }
        });
      } else a();
    };k.prototype.Pa = function () {
      var a = this,
          b = document.querySelectorAll("link[rel=import]");l(b, function (b) {
        return a.h(b);
      }, !0);
    };k.prototype.h = function (a) {
      a.__loaded || (a.__loaded = !0, a.import && (a.import.readyState = "complete"), a.dispatchEvent(b(a.import ? "load" : "error", { bubbles: !1, cancelable: !1, detail: void 0 })));
    };k.prototype.Ra = function (a) {
      var b = this;l(a, function (a) {
        return l(a.addedNodes, function (a) {
          a && a.nodeType === Node.ELEMENT_NODE && (g(a) ? b.s(a) : b.loadImports(a));
        });
      });
    };var aa = null;if (m) {
      var ba = document.querySelectorAll("link[rel=import]");l(ba, function (a) {
        a.import && "loading" === a.import.readyState || (a.__loaded = !0);
      });ba = function (a) {
        a = a.target;g(a) && (a.__loaded = !0);
      };document.addEventListener("load", ba, !0);document.addEventListener("error", ba, !0);
    } else {
      var R = Object.getOwnPropertyDescriptor(Node.prototype, "baseURI");Object.defineProperty((!R || R.configurable ? Node : Element).prototype, "baseURI", { get: function () {
          var a = g(this) ? this : c(this);return a ? a.href : R && R.get ? R.get.call(this) : (document.querySelector("base") || window.location).href;
        }, configurable: !0, enumerable: !0 });Object.defineProperty(HTMLLinkElement.prototype, "import", { get: function () {
          return this.__import || null;
        }, configurable: !0, enumerable: !0 });e(function () {
        aa = new k();
      });
    }f(function () {
      return document.dispatchEvent(b("HTMLImportsLoaded", { cancelable: !0, bubbles: !0, detail: void 0 }));
    });a.useNative = m;a.whenReady = f;a.importForElement = c;a.loadImports = function (a) {
      aa && aa.loadImports(a);
    };
  })(window.HTMLImports = window.HTMLImports || {}); /*
                                                     Copyright (c) 2014 The Polymer Project Authors. All rights reserved.
                                                     This code may only be used under the BSD style license found at http://polymer.github.io/LICENSE.txt
                                                     The complete set of authors may be found at http://polymer.github.io/AUTHORS.txt
                                                     The complete set of contributors may be found at http://polymer.github.io/CONTRIBUTORS.txt
                                                     Code distributed by Google as part of the polymer project is also
                                                     subject to an additional IP rights grant found at http://polymer.github.io/PATENTS.txt
                                                     */
  window.WebComponents = window.WebComponents || { flags: {} };var kb = document.querySelector('script[src*="webcomponents-lite.js"]'),
      lb = /wc-(.+)/,
      x = {};if (!x.noOpts) {
    location.search.slice(1).split("&").forEach(function (a) {
      a = a.split("=");var b;a[0] && (b = a[0].match(lb)) && (x[b[1]] = a[1] || !0);
    });if (kb) for (var mb = 0, nb; nb = kb.attributes[mb]; mb++) "src" !== nb.name && (x[nb.name] = nb.value || !0);if (x.log && x.log.split) {
      var ob = x.log.split(",");x.log = {};ob.forEach(function (a) {
        x.log[a] = !0;
      });
    } else x.log = {};
  }
  window.WebComponents.flags = x;var pb = x.shadydom;pb && (window.ShadyDOM = window.ShadyDOM || {}, window.ShadyDOM.force = pb);var qb = x.register || x.ce;qb && window.customElements && (window.customElements.forcePolyfill = qb); /*
                                                                                                                                                                                                                                        Copyright (c) 2016 The Polymer Project Authors. All rights reserved.
                                                                                                                                                                                                                                        This code may only be used under the BSD style license found at http://polymer.github.io/LICENSE.txt
                                                                                                                                                                                                                                        The complete set of authors may be found at http://polymer.github.io/AUTHORS.txt
                                                                                                                                                                                                                                        The complete set of contributors may be found at http://polymer.github.io/CONTRIBUTORS.txt
                                                                                                                                                                                                                                        Code distributed by Google as part of the polymer project is also
                                                                                                                                                                                                                                        subject to an additional IP rights grant found at http://polymer.github.io/PATENTS.txt
                                                                                                                                                                                                                                        */
  var y = window.ShadyDOM || {};y.Na = !(!Element.prototype.attachShadow || !Node.prototype.getRootNode);var rb = Object.getOwnPropertyDescriptor(Node.prototype, "firstChild");y.M = !!(rb && rb.configurable && rb.get);y.sa = y.force || !y.Na;function sb(a) {
    return a.__shady && void 0 !== a.__shady.firstChild;
  }function z(a) {
    return "ShadyRoot" === a.ya;
  }function tb(a) {
    a = a.getRootNode();if (z(a)) return a;
  }var ub = Element.prototype,
      vb = ub.matches || ub.matchesSelector || ub.mozMatchesSelector || ub.msMatchesSelector || ub.oMatchesSelector || ub.webkitMatchesSelector;
  function wb(a, b) {
    if (a && b) for (var c = Object.getOwnPropertyNames(b), d = 0, e; d < c.length && (e = c[d]); d++) {
      var f = Object.getOwnPropertyDescriptor(b, e);f && Object.defineProperty(a, e, f);
    }
  }function xb(a, b) {
    for (var c = [], d = 1; d < arguments.length; ++d) c[d - 1] = arguments[d];for (d = 0; d < c.length; d++) wb(a, c[d]);return a;
  }function yb(a, b) {
    for (var c in b) a[c] = b[c];
  }var zb = document.createTextNode(""),
      Ab = 0,
      Bb = [];new MutationObserver(function () {
    for (; Bb.length;) try {
      Bb.shift()();
    } catch (a) {
      throw zb.textContent = Ab++, a;
    }
  }).observe(zb, { characterData: !0 });
  function Cb(a) {
    Bb.push(a);zb.textContent = Ab++;
  }var Db = !!document.contains;function Eb(a, b) {
    for (; b;) {
      if (b == a) return !0;b = b.parentNode;
    }return !1;
  };var Fb = [],
      Gb;function Hb(a) {
    Gb || (Gb = !0, Cb(Ib));Fb.push(a);
  }function Ib() {
    Gb = !1;for (var a = !!Fb.length; Fb.length;) Fb.shift()();return a;
  }Ib.list = Fb;function Jb() {
    this.a = !1;this.addedNodes = [];this.removedNodes = [];this.V = new Set();
  }function Kb(a) {
    a.a || (a.a = !0, Cb(function () {
      Lb(a);
    }));
  }function Lb(a) {
    if (a.a) {
      a.a = !1;var b = a.takeRecords();b.length && a.V.forEach(function (a) {
        a(b);
      });
    }
  }Jb.prototype.takeRecords = function () {
    if (this.addedNodes.length || this.removedNodes.length) {
      var a = [{ addedNodes: this.addedNodes, removedNodes: this.removedNodes }];this.addedNodes = [];this.removedNodes = [];return a;
    }return [];
  };
  function Mb(a, b) {
    a.__shady = a.__shady || {};a.__shady.N || (a.__shady.N = new Jb());a.__shady.N.V.add(b);var c = a.__shady.N;return { Ca: b, C: c, Ga: a, takeRecords: function () {
        return c.takeRecords();
      } };
  }function Nb(a) {
    var b = a && a.C;b && (b.V.delete(a.Ca), b.V.size || (a.Ga.__shady.N = null));
  }
  function Ob(a, b) {
    var c = b.getRootNode();return a.map(function (a) {
      var b = c === a.target.getRootNode();if (b && a.addedNodes) {
        if (b = Array.from(a.addedNodes).filter(function (a) {
          return c === a.getRootNode();
        }), b.length) return a = Object.create(a), Object.defineProperty(a, "addedNodes", { value: b, configurable: !0 }), a;
      } else if (b) return a;
    }).filter(function (a) {
      return a;
    });
  };var A = {},
      Pb = Element.prototype.insertBefore,
      Qb = Element.prototype.removeChild,
      Rb = Element.prototype.setAttribute,
      Sb = Element.prototype.removeAttribute,
      Tb = Element.prototype.cloneNode,
      Ub = Document.prototype.importNode,
      Vb = Element.prototype.addEventListener,
      Wb = Element.prototype.removeEventListener,
      Xb = Window.prototype.addEventListener,
      Yb = Window.prototype.removeEventListener,
      Zb = Element.prototype.dispatchEvent,
      $b = Element.prototype.querySelector,
      ac = Element.prototype.querySelectorAll,
      bc = Node.prototype.contains || HTMLElement.prototype.contains;A.appendChild = Element.prototype.appendChild;A.insertBefore = Pb;A.removeChild = Qb;A.setAttribute = Rb;A.removeAttribute = Sb;A.cloneNode = Tb;A.importNode = Ub;A.addEventListener = Vb;A.removeEventListener = Wb;A.ab = Xb;A.bb = Yb;A.dispatchEvent = Zb;A.querySelector = $b;A.querySelectorAll = ac;A.contains = bc;var cc = /[&\u00A0"]/g,
      dc = /[&\u00A0<>]/g;function ec(a) {
    switch (a) {case "&":
        return "&amp;";case "<":
        return "&lt;";case ">":
        return "&gt;";case '"':
        return "&quot;";case "\u00a0":
        return "&nbsp;";}
  }function fc(a) {
    for (var b = {}, c = 0; c < a.length; c++) b[a[c]] = !0;return b;
  }var gc = fc("area base br col command embed hr img input keygen link meta param source track wbr".split(" ")),
      hc = fc("style script xmp iframe noembed noframes plaintext noscript".split(" "));
  function ic(a, b) {
    "template" === a.localName && (a = a.content);for (var c = "", d = b ? b(a) : a.childNodes, e = 0, f = d.length, h; e < f && (h = d[e]); e++) {
      a: {
        var g = h;var k = a;var l = b;switch (g.nodeType) {case Node.ELEMENT_NODE:
            for (var m = g.localName, n = "<" + m, w = g.attributes, I = 0; k = w[I]; I++) n += " " + k.name + '="' + k.value.replace(cc, ec) + '"';n += ">";g = gc[m] ? n : n + ic(g, l) + "</" + m + ">";break a;case Node.TEXT_NODE:
            g = g.data;g = k && hc[k.localName] ? g : g.replace(dc, ec);break a;case Node.COMMENT_NODE:
            g = "\x3c!--" + g.data + "--\x3e";break a;default:
            throw window.console.error(g), Error("not implemented");}
      }c += g;
    }return c;
  };var B = {},
      C = document.createTreeWalker(document, NodeFilter.SHOW_ALL, null, !1),
      D = document.createTreeWalker(document, NodeFilter.SHOW_ELEMENT, null, !1);function jc(a) {
    var b = [];C.currentNode = a;for (a = C.firstChild(); a;) b.push(a), a = C.nextSibling();return b;
  }B.parentNode = function (a) {
    C.currentNode = a;return C.parentNode();
  };B.firstChild = function (a) {
    C.currentNode = a;return C.firstChild();
  };B.lastChild = function (a) {
    C.currentNode = a;return C.lastChild();
  };B.previousSibling = function (a) {
    C.currentNode = a;return C.previousSibling();
  };
  B.nextSibling = function (a) {
    C.currentNode = a;return C.nextSibling();
  };B.childNodes = jc;B.parentElement = function (a) {
    D.currentNode = a;return D.parentNode();
  };B.firstElementChild = function (a) {
    D.currentNode = a;return D.firstChild();
  };B.lastElementChild = function (a) {
    D.currentNode = a;return D.lastChild();
  };B.previousElementSibling = function (a) {
    D.currentNode = a;return D.previousSibling();
  };B.nextElementSibling = function (a) {
    D.currentNode = a;return D.nextSibling();
  };
  B.children = function (a) {
    var b = [];D.currentNode = a;for (a = D.firstChild(); a;) b.push(a), a = D.nextSibling();return b;
  };B.innerHTML = function (a) {
    return ic(a, function (a) {
      return jc(a);
    });
  };B.textContent = function (a) {
    switch (a.nodeType) {case Node.ELEMENT_NODE:case Node.DOCUMENT_FRAGMENT_NODE:
        a = document.createTreeWalker(a, NodeFilter.SHOW_TEXT, null, !1);for (var b = "", c; c = a.nextNode();) b += c.nodeValue;return b;default:
        return a.nodeValue;}
  };var kc = Object.getOwnPropertyDescriptor(Element.prototype, "innerHTML") || Object.getOwnPropertyDescriptor(HTMLElement.prototype, "innerHTML"),
      lc = document.implementation.createHTMLDocument("inert"),
      mc = Object.getOwnPropertyDescriptor(Document.prototype, "activeElement"),
      nc = { parentElement: { get: function () {
        var a = this.__shady && this.__shady.parentNode;a && a.nodeType !== Node.ELEMENT_NODE && (a = null);return void 0 !== a ? a : B.parentElement(this);
      }, configurable: !0 }, parentNode: { get: function () {
        var a = this.__shady && this.__shady.parentNode;
        return void 0 !== a ? a : B.parentNode(this);
      }, configurable: !0 }, nextSibling: { get: function () {
        var a = this.__shady && this.__shady.nextSibling;return void 0 !== a ? a : B.nextSibling(this);
      }, configurable: !0 }, previousSibling: { get: function () {
        var a = this.__shady && this.__shady.previousSibling;return void 0 !== a ? a : B.previousSibling(this);
      }, configurable: !0 }, className: { get: function () {
        return this.getAttribute("class") || "";
      }, set: function (a) {
        this.setAttribute("class", a);
      }, configurable: !0 }, nextElementSibling: { get: function () {
        if (this.__shady && void 0 !== this.__shady.nextSibling) {
          for (var a = this.nextSibling; a && a.nodeType !== Node.ELEMENT_NODE;) a = a.nextSibling;return a;
        }return B.nextElementSibling(this);
      }, configurable: !0 }, previousElementSibling: { get: function () {
        if (this.__shady && void 0 !== this.__shady.previousSibling) {
          for (var a = this.previousSibling; a && a.nodeType !== Node.ELEMENT_NODE;) a = a.previousSibling;return a;
        }return B.previousElementSibling(this);
      }, configurable: !0 } },
      oc = { childNodes: { get: function () {
        if (sb(this)) {
          if (!this.__shady.childNodes) {
            this.__shady.childNodes = [];for (var a = this.firstChild; a; a = a.nextSibling) this.__shady.childNodes.push(a);
          }var b = this.__shady.childNodes;
        } else b = B.childNodes(this);b.item = function (a) {
          return b[a];
        };return b;
      }, configurable: !0 }, childElementCount: { get: function () {
        return this.children.length;
      }, configurable: !0 }, firstChild: { get: function () {
        var a = this.__shady && this.__shady.firstChild;return void 0 !== a ? a : B.firstChild(this);
      }, configurable: !0 }, lastChild: { get: function () {
        var a = this.__shady && this.__shady.lastChild;return void 0 !== a ? a : B.lastChild(this);
      },
      configurable: !0 }, textContent: { get: function () {
        if (sb(this)) {
          for (var a = [], b = 0, c = this.childNodes, d; d = c[b]; b++) d.nodeType !== Node.COMMENT_NODE && a.push(d.textContent);return a.join("");
        }return B.textContent(this);
      }, set: function (a) {
        switch (this.nodeType) {case Node.ELEMENT_NODE:case Node.DOCUMENT_FRAGMENT_NODE:
            for (; this.firstChild;) this.removeChild(this.firstChild);(0 < a.length || this.nodeType === Node.ELEMENT_NODE) && this.appendChild(document.createTextNode(a));break;default:
            this.nodeValue = a;}
      }, configurable: !0 }, firstElementChild: { get: function () {
        if (this.__shady && void 0 !== this.__shady.firstChild) {
          for (var a = this.firstChild; a && a.nodeType !== Node.ELEMENT_NODE;) a = a.nextSibling;return a;
        }return B.firstElementChild(this);
      }, configurable: !0 }, lastElementChild: { get: function () {
        if (this.__shady && void 0 !== this.__shady.lastChild) {
          for (var a = this.lastChild; a && a.nodeType !== Node.ELEMENT_NODE;) a = a.previousSibling;return a;
        }return B.lastElementChild(this);
      }, configurable: !0 }, children: { get: function () {
        var a = sb(this) ? Array.prototype.filter.call(this.childNodes, function (a) {
          return a.nodeType === Node.ELEMENT_NODE;
        }) : B.children(this);a.item = function (b) {
          return a[b];
        };return a;
      }, configurable: !0 }, innerHTML: { get: function () {
        var a = "template" === this.localName ? this.content : this;return sb(this) ? ic(a) : B.innerHTML(a);
      }, set: function (a) {
        for (var b = "template" === this.localName ? this.content : this; b.firstChild;) b.removeChild(b.firstChild);var c = this.localName;c && "template" !== c || (c = "div");c = lc.createElement(c);for (kc && kc.set ? kc.set.call(c, a) : c.innerHTML = a; c.firstChild;) b.appendChild(c.firstChild);
      }, configurable: !0 } },
      pc = { shadowRoot: { get: function () {
        return this.__shady && this.__shady.Va || null;
      }, configurable: !0 } },
      qc = { activeElement: { get: function () {
        var a = mc && mc.get ? mc.get.call(document) : y.M ? void 0 : document.activeElement;if (a && a.nodeType) {
          var b = !!z(this);if (this === document || b && this.host !== a && A.contains.call(this.host, a)) {
            for (b = tb(a); b && b !== this;) a = b.host, b = tb(a);a = this === document ? b ? null : a : b === this ? a : null;
          } else a = null;
        } else a = null;return a;
      }, set: function () {}, configurable: !0 } };
  function E(a, b, c) {
    for (var d in b) {
      var e = Object.getOwnPropertyDescriptor(a, d);e && e.configurable || !e && c ? Object.defineProperty(a, d, b[d]) : c && console.warn("Could not define", d, "on", a);
    }
  }function F(a) {
    E(a, nc);E(a, oc);E(a, qc);
  }var rc = y.M ? function () {} : function (a) {
    a.__shady && a.__shady.za || (a.__shady = a.__shady || {}, a.__shady.za = !0, E(a, nc, !0));
  },
      sc = y.M ? function () {} : function (a) {
    a.__shady && a.__shady.xa || (a.__shady = a.__shady || {}, a.__shady.xa = !0, E(a, oc, !0), E(a, pc, !0));
  };function tc(a, b, c) {
    rc(a);c = c || null;a.__shady = a.__shady || {};b.__shady = b.__shady || {};c && (c.__shady = c.__shady || {});a.__shady.previousSibling = c ? c.__shady.previousSibling : b.lastChild;var d = a.__shady.previousSibling;d && d.__shady && (d.__shady.nextSibling = a);(d = a.__shady.nextSibling = c) && d.__shady && (d.__shady.previousSibling = a);a.__shady.parentNode = b;c ? c === b.__shady.firstChild && (b.__shady.firstChild = a) : (b.__shady.lastChild = a, b.__shady.firstChild || (b.__shady.firstChild = a));b.__shady.childNodes = null;
  }
  function uc(a) {
    if (!a.__shady || void 0 === a.__shady.firstChild) {
      a.__shady = a.__shady || {};a.__shady.firstChild = B.firstChild(a);a.__shady.lastChild = B.lastChild(a);sc(a);for (var b = a.__shady.childNodes = B.childNodes(a), c = 0, d; c < b.length && (d = b[c]); c++) d.__shady = d.__shady || {}, d.__shady.parentNode = a, d.__shady.nextSibling = b[c + 1] || null, d.__shady.previousSibling = b[c - 1] || null, rc(d);
    }
  };function vc(a, b, c) {
    if (b === a) throw Error("Failed to execute 'appendChild' on 'Node': The new child element contains the parent.");if (c) {
      var d = c.__shady && c.__shady.parentNode;if (void 0 !== d && d !== a || void 0 === d && B.parentNode(c) !== a) throw Error("Failed to execute 'insertBefore' on 'Node': The node before which the new node is to be inserted is not a child of this node.");
    }if (c === b) return b;b.parentNode && wc(b.parentNode, b);d = tb(a);var e;if (e = d) a: {
      if (!b.__noInsertionPoint) {
        var f;"slot" === b.localName ? f = [b] : b.querySelectorAll && (f = b.querySelectorAll("slot"));if (f && f.length) {
          e = f;break a;
        }
      }e = void 0;
    }(f = e) && d.H.push.apply(d.H, [].concat(f instanceof Array ? f : la(ka(f))));d && ("slot" === a.localName || f) && xc(d);if (sb(a)) {
      d = c;sc(a);a.__shady = a.__shady || {};void 0 !== a.__shady.firstChild && (a.__shady.childNodes = null);if (b.nodeType === Node.DOCUMENT_FRAGMENT_NODE) {
        f = b.childNodes;for (e = 0; e < f.length; e++) tc(f[e], a, d);b.__shady = b.__shady || {};d = void 0 !== b.__shady.firstChild ? null : void 0;b.__shady.firstChild = b.__shady.lastChild = d;b.__shady.childNodes = d;
      } else tc(b, a, d);if (yc(a)) {
        xc(a.__shady.root);var h = !0;
      } else a.__shady.root && (h = !0);
    }h || (h = z(a) ? a.host : a, c ? (c = zc(c), A.insertBefore.call(h, b, c)) : A.appendChild.call(h, b));Ac(a, b);return b;
  }
  function wc(a, b) {
    if (b.parentNode !== a) throw Error("The node to be removed is not a child of this node: " + b);var c = tb(b);if (sb(a)) {
      b.__shady = b.__shady || {};a.__shady = a.__shady || {};b === a.__shady.firstChild && (a.__shady.firstChild = b.__shady.nextSibling);b === a.__shady.lastChild && (a.__shady.lastChild = b.__shady.previousSibling);var d = b.__shady.previousSibling,
          e = b.__shady.nextSibling;d && (d.__shady = d.__shady || {}, d.__shady.nextSibling = e);e && (e.__shady = e.__shady || {}, e.__shady.previousSibling = d);b.__shady.parentNode = b.__shady.previousSibling = b.__shady.nextSibling = void 0;void 0 !== a.__shady.childNodes && (a.__shady.childNodes = null);if (yc(a)) {
        xc(a.__shady.root);var f = !0;
      }
    }Bc(b);if (c) {
      (d = a && "slot" === a.localName) && (f = !0);Cc(c);e = c.l;for (var h in e) for (var g = e[h], k = 0; k < g.length; k++) {
        var l = g[k];if (Eb(b, l)) {
          g.splice(k, 1);var m = c.o.indexOf(l);0 <= m && c.o.splice(m, 1);k--;if (m = l.__shady.K) for (l = 0; l < m.length; l++) {
            var n = m[l],
                w = B.parentNode(n);w && A.removeChild.call(w, n);
          }m = !0;
        }
      }(m || d) && xc(c);
    }f || (f = z(a) ? a.host : a, (!a.__shady.root && "slot" !== b.localName || f === B.parentNode(b)) && A.removeChild.call(f, b));Ac(a, null, b);return b;
  }function Bc(a) {
    if (a.__shady && void 0 !== a.__shady.ka) for (var b = a.childNodes, c = 0, d = b.length, e; c < d && (e = b[c]); c++) Bc(e);a.__shady && (a.__shady.ka = void 0);
  }function zc(a) {
    var b = a;a && "slot" === a.localName && (b = (b = a.__shady && a.__shady.K) && b.length ? b[0] : zc(a.nextSibling));return b;
  }function yc(a) {
    return (a = a && a.__shady && a.__shady.root) && Dc(a);
  }
  function Ec(a, b) {
    if ("slot" === b) a = a.parentNode, yc(a) && xc(a.__shady.root);else if ("slot" === a.localName && "name" === b && (b = tb(a))) {
      var c = a.Aa,
          d = Fc(a);if (d !== c) {
        c = b.l[c];var e = c.indexOf(a);0 <= e && c.splice(e, 1);c = b.l[d] || (b.l[d] = []);c.push(a);1 < c.length && (b.l[d] = Gc(c));
      }xc(b);
    }
  }function Ac(a, b, c) {
    if (a = a.__shady && a.__shady.N) b && a.addedNodes.push(b), c && a.removedNodes.push(c), Kb(a);
  }
  function Hc(a) {
    if (a && a.nodeType) {
      a.__shady = a.__shady || {};var b = a.__shady.ka;void 0 === b && (b = z(a) ? a : (b = a.parentNode) ? Hc(b) : a, A.contains.call(document.documentElement, a) && (a.__shady.ka = b));return b;
    }
  }function Ic(a, b, c) {
    var d = [];Jc(a.childNodes, b, c, d);return d;
  }function Jc(a, b, c, d) {
    for (var e = 0, f = a.length, h; e < f && (h = a[e]); e++) {
      var g;if (g = h.nodeType === Node.ELEMENT_NODE) {
        g = h;var k = b,
            l = c,
            m = d,
            n = k(g);n && m.push(g);l && l(n) ? g = n : (Jc(g.childNodes, k, l, m), g = void 0);
      }if (g) break;
    }
  }var Kc = null;
  function Lc(a, b, c) {
    Kc || (Kc = window.ShadyCSS && window.ShadyCSS.ScopingShim);Kc && "class" === b ? Kc.setElementClass(a, c) : (A.setAttribute.call(a, b, c), Ec(a, b));
  }function Mc(a, b) {
    if (a.ownerDocument !== document) return A.importNode.call(document, a, b);var c = A.importNode.call(document, a, !1);if (b) {
      a = a.childNodes;b = 0;for (var d; b < a.length; b++) d = Mc(a[b], !0), c.appendChild(d);
    }return c;
  };var Nc = "__eventWrappers" + Date.now(),
      Oc = { blur: !0, focus: !0, focusin: !0, focusout: !0, click: !0, dblclick: !0, mousedown: !0, mouseenter: !0, mouseleave: !0, mousemove: !0, mouseout: !0, mouseover: !0, mouseup: !0, wheel: !0, beforeinput: !0, input: !0, keydown: !0, keyup: !0, compositionstart: !0, compositionupdate: !0, compositionend: !0, touchstart: !0, touchend: !0, touchmove: !0, touchcancel: !0, pointerover: !0, pointerenter: !0, pointerdown: !0, pointermove: !0, pointerup: !0, pointercancel: !0, pointerout: !0, pointerleave: !0, gotpointercapture: !0, lostpointercapture: !0,
    dragstart: !0, drag: !0, dragenter: !0, dragleave: !0, dragover: !0, drop: !0, dragend: !0, DOMActivate: !0, DOMFocusIn: !0, DOMFocusOut: !0, keypress: !0 };function Pc(a, b) {
    var c = [],
        d = a;for (a = a === window ? window : a.getRootNode(); d;) c.push(d), d = d.assignedSlot ? d.assignedSlot : d.nodeType === Node.DOCUMENT_FRAGMENT_NODE && d.host && (b || d !== a) ? d.host : d.parentNode;c[c.length - 1] === document && c.push(window);return c;
  }
  function Qc(a, b) {
    if (!z) return a;a = Pc(a, !0);for (var c = 0, d, e, f, h; c < b.length; c++) if (d = b[c], f = d === window ? window : d.getRootNode(), f !== e && (h = a.indexOf(f), e = f), !z(f) || -1 < h) return d;
  }
  var Rc = { get composed() {
      !1 !== this.isTrusted && void 0 === this.Z && (this.Z = Oc[this.type]);return this.Z || !1;
    }, composedPath: function () {
      this.b || (this.b = Pc(this.__target, this.composed));return this.b;
    }, get target() {
      return Qc(this.currentTarget, this.composedPath());
    }, get relatedTarget() {
      if (!this.$) return null;this.c || (this.c = Pc(this.$, !0));return Qc(this.currentTarget, this.c);
    }, stopPropagation: function () {
      Event.prototype.stopPropagation.call(this);this.a = !0;
    }, stopImmediatePropagation: function () {
      Event.prototype.stopImmediatePropagation.call(this);
      this.a = this.h = !0;
    } };function Sc(a) {
    function b(b, d) {
      b = new a(b, d);b.Z = d && !!d.composed;return b;
    }yb(b, a);b.prototype = a.prototype;return b;
  }var Tc = { focus: !0, blur: !0 };function Uc(a) {
    return a.__target !== a.target || a.$ !== a.relatedTarget;
  }function Vc(a, b, c) {
    if (c = b.__handlers && b.__handlers[a.type] && b.__handlers[a.type][c]) for (var d = 0, e; (e = c[d]) && (!Uc(a) || a.target !== a.relatedTarget) && (e.call(b, a), !a.h); d++);
  }
  function Wc(a) {
    var b = a.composedPath();Object.defineProperty(a, "currentTarget", { get: function () {
        return d;
      }, configurable: !0 });for (var c = b.length - 1; 0 <= c; c--) {
      var d = b[c];Vc(a, d, "capture");if (a.a) return;
    }Object.defineProperty(a, "eventPhase", { get: function () {
        return Event.AT_TARGET;
      } });var e;for (c = 0; c < b.length; c++) {
      d = b[c];var f = d.__shady && d.__shady.root;if (0 === c || f && f === e) if (Vc(a, d, "bubble"), d !== window && (e = d.getRootNode()), a.a) break;
    }
  }
  function Xc(a, b, c, d, e, f) {
    for (var h = 0; h < a.length; h++) {
      var g = a[h],
          k = g.type,
          l = g.capture,
          m = g.once,
          n = g.passive;if (b === g.node && c === k && d === l && e === m && f === n) return h;
    }return -1;
  }
  function Yc(a, b, c) {
    if (b) {
      var d = typeof b;if ("function" === d || "object" === d) if ("object" !== d || b.handleEvent && "function" === typeof b.handleEvent) {
        if (c && "object" === typeof c) {
          var e = !!c.capture;var f = !!c.once;var h = !!c.passive;
        } else e = !!c, h = f = !1;var g = c && c.aa || this,
            k = b[Nc];if (k) {
          if (-1 < Xc(k, g, a, e, f, h)) return;
        } else b[Nc] = [];k = function (e) {
          f && this.removeEventListener(a, b, c);e.__target || Zc(e);if (g !== this) {
            var h = Object.getOwnPropertyDescriptor(e, "currentTarget");Object.defineProperty(e, "currentTarget", { get: function () {
                return g;
              },
              configurable: !0 });
          }if (e.composed || -1 < e.composedPath().indexOf(g)) if (Uc(e) && e.target === e.relatedTarget) e.eventPhase === Event.BUBBLING_PHASE && e.stopImmediatePropagation();else if (e.eventPhase === Event.CAPTURING_PHASE || e.bubbles || e.target === g || g instanceof Window) {
            var k = "function" === d ? b.call(g, e) : b.handleEvent && b.handleEvent(e);g !== this && (h ? (Object.defineProperty(e, "currentTarget", h), h = null) : delete e.currentTarget);return k;
          }
        };b[Nc].push({ node: this, type: a, capture: e, once: f, passive: h, cb: k });Tc[a] ? (this.__handlers = this.__handlers || {}, this.__handlers[a] = this.__handlers[a] || { capture: [], bubble: [] }, this.__handlers[a][e ? "capture" : "bubble"].push(k)) : (this instanceof Window ? A.ab : A.addEventListener).call(this, a, k, c);
      }
    }
  }
  function $c(a, b, c) {
    if (b) {
      if (c && "object" === typeof c) {
        var d = !!c.capture;var e = !!c.once;var f = !!c.passive;
      } else d = !!c, f = e = !1;var h = c && c.aa || this,
          g = void 0;var k = null;try {
        k = b[Nc];
      } catch (l) {}k && (e = Xc(k, h, a, d, e, f), -1 < e && (g = k.splice(e, 1)[0].cb, k.length || (b[Nc] = void 0)));(this instanceof Window ? A.bb : A.removeEventListener).call(this, a, g || b, c);g && Tc[a] && this.__handlers && this.__handlers[a] && (a = this.__handlers[a][d ? "capture" : "bubble"], g = a.indexOf(g), -1 < g && a.splice(g, 1));
    }
  }
  function ad() {
    for (var a in Tc) window.addEventListener(a, function (a) {
      a.__target || (Zc(a), Wc(a));
    }, !0);
  }function Zc(a) {
    a.__target = a.target;a.$ = a.relatedTarget;if (y.M) {
      var b = Object.getPrototypeOf(a);if (!b.hasOwnProperty("__patchProto")) {
        var c = Object.create(b);c.fb = b;wb(c, Rc);b.__patchProto = c;
      }a.__proto__ = b.__patchProto;
    } else wb(a, Rc);
  }var bd = Sc(window.Event),
      cd = Sc(window.CustomEvent),
      dd = Sc(window.MouseEvent);function ed(a, b) {
    return { index: a, O: [], U: b };
  }
  function fd(a, b, c, d) {
    var e = 0,
        f = 0,
        h = 0,
        g = 0,
        k = Math.min(b - e, d - f);if (0 == e && 0 == f) a: {
      for (h = 0; h < k; h++) if (a[h] !== c[h]) break a;h = k;
    }if (b == a.length && d == c.length) {
      g = a.length;for (var l = c.length, m = 0; m < k - h && gd(a[--g], c[--l]);) m++;g = m;
    }e += h;f += h;b -= g;d -= g;if (0 == b - e && 0 == d - f) return [];if (e == b) {
      for (b = ed(e, 0); f < d;) b.O.push(c[f++]);return [b];
    }if (f == d) return [ed(e, b - e)];k = e;h = f;d = d - h + 1;g = b - k + 1;b = Array(d);for (l = 0; l < d; l++) b[l] = Array(g), b[l][0] = l;for (l = 0; l < g; l++) b[0][l] = l;for (l = 1; l < d; l++) for (m = 1; m < g; m++) if (a[k + m - 1] === c[h + l - 1]) b[l][m] = b[l - 1][m - 1];else {
      var n = b[l - 1][m] + 1,
          w = b[l][m - 1] + 1;b[l][m] = n < w ? n : w;
    }k = b.length - 1;h = b[0].length - 1;d = b[k][h];for (a = []; 0 < k || 0 < h;) 0 == k ? (a.push(2), h--) : 0 == h ? (a.push(3), k--) : (g = b[k - 1][h - 1], l = b[k - 1][h], m = b[k][h - 1], n = l < m ? l < g ? l : g : m < g ? m : g, n == g ? (g == d ? a.push(0) : (a.push(1), d = g), k--, h--) : n == l ? (a.push(3), k--, d = l) : (a.push(2), h--, d = m));a.reverse();b = void 0;k = [];for (h = 0; h < a.length; h++) switch (a[h]) {case 0:
        b && (k.push(b), b = void 0);e++;f++;break;case 1:
        b || (b = ed(e, 0));b.U++;e++;b.O.push(c[f]);f++;break;case 2:
        b || (b = ed(e, 0));
        b.U++;e++;break;case 3:
        b || (b = ed(e, 0)), b.O.push(c[f]), f++;}b && k.push(b);return k;
  }function gd(a, b) {
    return a === b;
  };var hd = {};function G(a, b, c) {
    if (a !== hd) throw new TypeError("Illegal constructor");a = document.createDocumentFragment();a.__proto__ = G.prototype;a.ya = "ShadyRoot";uc(b);uc(a);a.host = b;a.Fa = c && c.mode;b.__shady = b.__shady || {};b.__shady.root = a;b.__shady.Va = "closed" !== a.Fa ? a : null;a.T = !1;a.o = [];a.l = {};a.H = [];c = B.childNodes(b);for (var d = 0, e = c.length; d < e; d++) A.removeChild.call(b, c[d]);return a;
  }G.prototype = Object.create(DocumentFragment.prototype);function xc(a) {
    a.T || (a.T = !0, Hb(function () {
      return id(a);
    }));
  }
  function id(a) {
    for (var b; a;) {
      a.T && (b = a);a: {
        var c = a;a = c.host.getRootNode();if (z(a)) for (var d = c.host.childNodes, e = 0; e < d.length; e++) if (c = d[e], "slot" == c.localName) break a;a = void 0;
      }
    }b && b._renderRoot();
  }
  G.prototype._renderRoot = function () {
    this.T = !1;Cc(this);for (var a = 0, b; a < this.o.length; a++) {
      b = this.o[a];var c = b.__shady.assignedNodes;b.__shady.assignedNodes = [];b.__shady.K = [];if (b.__shady.oa = c) for (var d = 0; d < c.length; d++) {
        var e = c[d];e.__shady.ga = e.__shady.assignedSlot;e.__shady.assignedSlot === b && (e.__shady.assignedSlot = null);
      }
    }for (b = this.host.firstChild; b; b = b.nextSibling) jd(this, b);for (a = 0; a < this.o.length; a++) {
      b = this.o[a];if (!b.__shady.assignedNodes.length) for (c = b.firstChild; c; c = c.nextSibling) jd(this, c, b);c = b.parentNode;(c = c.__shady && c.__shady.root) && Dc(c) && c._renderRoot();kd(this, b.__shady.K, b.__shady.assignedNodes);if (c = b.__shady.oa) {
        for (d = 0; d < c.length; d++) c[d].__shady.ga = null;b.__shady.oa = null;c.length > b.__shady.assignedNodes.length && (b.__shady.ia = !0);
      }b.__shady.ia && (b.__shady.ia = !1, ld(this, b));
    }a = this.o;b = [];for (c = 0; c < a.length; c++) d = a[c].parentNode, d.__shady && d.__shady.root || !(0 > b.indexOf(d)) || b.push(d);for (a = 0; a < b.length; a++) {
      c = b[a];d = c === this ? this.host : c;e = [];c = c.childNodes;for (var f = 0; f < c.length; f++) {
        var h = c[f];if ("slot" == h.localName) {
          h = h.__shady.K;for (var g = 0; g < h.length; g++) e.push(h[g]);
        } else e.push(h);
      }c = void 0;f = B.childNodes(d);h = fd(e, e.length, f, f.length);for (var k = g = 0; g < h.length && (c = h[g]); g++) {
        for (var l = 0, m; l < c.O.length && (m = c.O[l]); l++) B.parentNode(m) === d && A.removeChild.call(d, m), f.splice(c.index + k, 1);k -= c.U;
      }for (k = 0; k < h.length && (c = h[k]); k++) for (g = f[c.index], l = c.index; l < c.index + c.U; l++) m = e[l], A.insertBefore.call(d, m, g), f.splice(l, 0, m);
    }
  };
  function jd(a, b, c) {
    b.__shady = b.__shady || {};var d = b.__shady.ga;b.__shady.ga = null;c || (c = (a = a.l[b.slot || "__catchall"]) && a[0]);c ? (c.__shady.assignedNodes.push(b), b.__shady.assignedSlot = c) : b.__shady.assignedSlot = void 0;d !== b.__shady.assignedSlot && b.__shady.assignedSlot && (b.__shady.assignedSlot.__shady.ia = !0);
  }function kd(a, b, c) {
    for (var d = 0, e; d < c.length && (e = c[d]); d++) if ("slot" == e.localName) {
      var f = e.__shady.assignedNodes;f && f.length && kd(a, b, f);
    } else b.push(c[d]);
  }
  function ld(a, b) {
    A.dispatchEvent.call(b, new Event("slotchange"));b.__shady.assignedSlot && ld(a, b.__shady.assignedSlot);
  }function Cc(a) {
    if (a.H.length) {
      for (var b = a.H, c, d = 0; d < b.length; d++) {
        var e = b[d];e.__shady = e.__shady || {};uc(e);uc(e.parentNode);var f = Fc(e);a.l[f] ? (c = c || {}, c[f] = !0, a.l[f].push(e)) : a.l[f] = [e];a.o.push(e);
      }if (c) for (var h in c) a.l[h] = Gc(a.l[h]);a.H = [];
    }
  }function Fc(a) {
    var b = a.name || a.getAttribute("name") || "__catchall";return a.Aa = b;
  }
  function Gc(a) {
    return a.sort(function (a, c) {
      a = md(a);for (var b = md(c), e = 0; e < a.length; e++) {
        c = a[e];var f = b[e];if (c !== f) return a = Array.from(c.parentNode.childNodes), a.indexOf(c) - a.indexOf(f);
      }
    });
  }function md(a) {
    var b = [];do b.unshift(a); while (a = a.parentNode);return b;
  }function Dc(a) {
    Cc(a);return !!a.o.length;
  }G.prototype.addEventListener = function (a, b, c) {
    "object" !== typeof c && (c = { capture: !!c });c.aa = this;this.host.addEventListener(a, b, c);
  };
  G.prototype.removeEventListener = function (a, b, c) {
    "object" !== typeof c && (c = { capture: !!c });c.aa = this;this.host.removeEventListener(a, b, c);
  };G.prototype.getElementById = function (a) {
    return Ic(this, function (b) {
      return b.id == a;
    }, function (a) {
      return !!a;
    })[0] || null;
  };var nd = G.prototype;E(nd, oc, !0);E(nd, qc, !0);function od(a) {
    var b = a.getRootNode();z(b) && id(b);return a.__shady && a.__shady.assignedSlot || null;
  }
  var pd = { addEventListener: Yc.bind(window), removeEventListener: $c.bind(window) },
      qd = { addEventListener: Yc, removeEventListener: $c, appendChild: function (a) {
      return vc(this, a);
    }, insertBefore: function (a, b) {
      return vc(this, a, b);
    }, removeChild: function (a) {
      return wc(this, a);
    }, replaceChild: function (a, b) {
      vc(this, a, b);wc(this, b);return a;
    }, cloneNode: function (a) {
      if ("template" == this.localName) var b = A.cloneNode.call(this, a);else if (b = A.cloneNode.call(this, !1), a) {
        a = this.childNodes;for (var c = 0, d; c < a.length; c++) d = a[c].cloneNode(!0), b.appendChild(d);
      }return b;
    }, getRootNode: function () {
      return Hc(this);
    }, contains: function (a) {
      return Eb(this, a);
    }, get isConnected() {
      var a = this.ownerDocument;if (Db && A.contains.call(a, this) || a.documentElement && A.contains.call(a.documentElement, this)) return !0;for (a = this; a && !(a instanceof Document);) a = a.parentNode || (a instanceof G ? a.host : void 0);return !!(a && a instanceof Document);
    }, dispatchEvent: function (a) {
      Ib();return A.dispatchEvent.call(this, a);
    } },
      rd = { get assignedSlot() {
      return od(this);
    } },
      sd = { querySelector: function (a) {
      return Ic(this, function (b) {
        return vb.call(b, a);
      }, function (a) {
        return !!a;
      })[0] || null;
    }, querySelectorAll: function (a) {
      return Ic(this, function (b) {
        return vb.call(b, a);
      });
    } },
      td = { assignedNodes: function (a) {
      if ("slot" === this.localName) {
        var b = this.getRootNode();z(b) && id(b);return this.__shady ? (a && a.flatten ? this.__shady.K : this.__shady.assignedNodes) || [] : [];
      }
    } },
      ud = xb({ setAttribute: function (a, b) {
      Lc(this, a, b);
    }, removeAttribute: function (a) {
      A.removeAttribute.call(this, a);Ec(this, a);
    }, attachShadow: function (a) {
      if (!this) throw "Must provide a host.";
      if (!a) throw "Not enough arguments.";return new G(hd, this, a);
    }, get slot() {
      return this.getAttribute("slot");
    }, set slot(a) {
      Lc(this, "slot", a);
    }, get assignedSlot() {
      return od(this);
    } }, sd, td);Object.defineProperties(ud, pc);var vd = xb({ importNode: function (a, b) {
      return Mc(a, b);
    }, getElementById: function (a) {
      return Ic(this, function (b) {
        return b.id == a;
      }, function (a) {
        return !!a;
      })[0] || null;
    } }, sd);Object.defineProperties(vd, { _activeElement: qc.activeElement });
  var wd = HTMLElement.prototype.blur,
      xd = xb({ blur: function () {
      var a = this.__shady && this.__shady.root;(a = a && a.activeElement) ? a.blur() : wd.call(this);
    } });function H(a, b) {
    for (var c = Object.getOwnPropertyNames(b), d = 0; d < c.length; d++) {
      var e = c[d],
          f = Object.getOwnPropertyDescriptor(b, e);f.value ? a[e] = f.value : Object.defineProperty(a, e, f);
    }
  };if (y.sa) {
    var ShadyDOM = { inUse: y.sa, patch: function (a) {
        return a;
      }, isShadyRoot: z, enqueue: Hb, flush: Ib, settings: y, filterMutations: Ob, observeChildren: Mb, unobserveChildren: Nb, nativeMethods: A, nativeTree: B };window.ShadyDOM = ShadyDOM;window.Event = bd;window.CustomEvent = cd;window.MouseEvent = dd;ad();var yd = window.customElements && window.customElements.nativeHTMLElement || HTMLElement;H(window.Node.prototype, qd);H(window.Window.prototype, pd);H(window.Text.prototype, rd);H(window.DocumentFragment.prototype, sd);H(window.Element.prototype, ud);H(window.Document.prototype, vd);window.HTMLSlotElement && H(window.HTMLSlotElement.prototype, td);H(yd.prototype, xd);y.M && (F(window.Node.prototype), F(window.Text.prototype), F(window.DocumentFragment.prototype), F(window.Element.prototype), F(yd.prototype), F(window.Document.prototype), window.HTMLSlotElement && F(window.HTMLSlotElement.prototype));window.ShadowRoot = G;
  };var zd = new Set("annotation-xml color-profile font-face font-face-src font-face-uri font-face-format font-face-name missing-glyph".split(" "));function Ad(a) {
    var b = zd.has(a);a = /^[a-z][.0-9_a-z]*-[\-.0-9_a-z]*$/.test(a);return !b && a;
  }function J(a) {
    var b = a.isConnected;if (void 0 !== b) return b;for (; a && !(a.__CE_isImportDocument || a instanceof Document);) a = a.parentNode || (window.ShadowRoot && a instanceof ShadowRoot ? a.host : void 0);return !(!a || !(a.__CE_isImportDocument || a instanceof Document));
  }
  function Bd(a, b) {
    for (; b && b !== a && !b.nextSibling;) b = b.parentNode;return b && b !== a ? b.nextSibling : null;
  }
  function K(a, b, c) {
    c = void 0 === c ? new Set() : c;for (var d = a; d;) {
      if (d.nodeType === Node.ELEMENT_NODE) {
        var e = d;b(e);var f = e.localName;if ("link" === f && "import" === e.getAttribute("rel")) {
          d = e.import;if (d instanceof Node && !c.has(d)) for (c.add(d), d = d.firstChild; d; d = d.nextSibling) K(d, b, c);d = Bd(a, e);continue;
        } else if ("template" === f) {
          d = Bd(a, e);continue;
        }if (e = e.__CE_shadowRoot) for (e = e.firstChild; e; e = e.nextSibling) K(e, b, c);
      }d = d.firstChild ? d.firstChild : Bd(a, d);
    }
  }function L(a, b, c) {
    a[b] = c;
  };function Cd() {
    this.a = new Map();this.s = new Map();this.h = [];this.c = !1;
  }function Dd(a, b, c) {
    a.a.set(b, c);a.s.set(c.constructor, c);
  }function Ed(a, b) {
    a.c = !0;a.h.push(b);
  }function Fd(a, b) {
    a.c && K(b, function (b) {
      return a.b(b);
    });
  }Cd.prototype.b = function (a) {
    if (this.c && !a.__CE_patched) {
      a.__CE_patched = !0;for (var b = 0; b < this.h.length; b++) this.h[b](a);
    }
  };function M(a, b) {
    var c = [];K(b, function (a) {
      return c.push(a);
    });for (b = 0; b < c.length; b++) {
      var d = c[b];1 === d.__CE_state ? a.connectedCallback(d) : Gd(a, d);
    }
  }
  function N(a, b) {
    var c = [];K(b, function (a) {
      return c.push(a);
    });for (b = 0; b < c.length; b++) {
      var d = c[b];1 === d.__CE_state && a.disconnectedCallback(d);
    }
  }
  function O(a, b, c) {
    c = void 0 === c ? {} : c;var d = c.$a || new Set(),
        e = c.va || function (b) {
      return Gd(a, b);
    },
        f = [];K(b, function (b) {
      if ("link" === b.localName && "import" === b.getAttribute("rel")) {
        var c = b.import;c instanceof Node && (c.__CE_isImportDocument = !0, c.__CE_hasRegistry = !0);c && "complete" === c.readyState ? c.__CE_documentLoadHandled = !0 : b.addEventListener("load", function () {
          var c = b.import;if (!c.__CE_documentLoadHandled) {
            c.__CE_documentLoadHandled = !0;var f = new Set(d);f.delete(c);O(a, c, { $a: f, va: e });
          }
        });
      } else f.push(b);
    }, d);if (a.c) for (b = 0; b < f.length; b++) a.b(f[b]);for (b = 0; b < f.length; b++) e(f[b]);
  }
  function Gd(a, b) {
    if (void 0 === b.__CE_state) {
      var c = b.ownerDocument;if (c.defaultView || c.__CE_isImportDocument && c.__CE_hasRegistry) if (c = a.a.get(b.localName)) {
        c.constructionStack.push(b);var d = c.constructor;try {
          try {
            if (new d() !== b) throw Error("The custom element constructor did not produce the element being upgraded.");
          } finally {
            c.constructionStack.pop();
          }
        } catch (h) {
          throw b.__CE_state = 2, h;
        }b.__CE_state = 1;b.__CE_definition = c;if (c.attributeChangedCallback) for (c = c.observedAttributes, d = 0; d < c.length; d++) {
          var e = c[d],
              f = b.getAttribute(e);null !== f && a.attributeChangedCallback(b, e, null, f, null);
        }J(b) && a.connectedCallback(b);
      }
    }
  }Cd.prototype.connectedCallback = function (a) {
    var b = a.__CE_definition;b.connectedCallback && b.connectedCallback.call(a);
  };Cd.prototype.disconnectedCallback = function (a) {
    var b = a.__CE_definition;b.disconnectedCallback && b.disconnectedCallback.call(a);
  };
  Cd.prototype.attributeChangedCallback = function (a, b, c, d, e) {
    var f = a.__CE_definition;f.attributeChangedCallback && -1 < f.observedAttributes.indexOf(b) && f.attributeChangedCallback.call(a, b, c, d, e);
  };function Hd(a) {
    var b = document;this.j = a;this.a = b;this.C = void 0;O(this.j, this.a);"loading" === this.a.readyState && (this.C = new MutationObserver(this.b.bind(this)), this.C.observe(this.a, { childList: !0, subtree: !0 }));
  }Hd.prototype.disconnect = function () {
    this.C && this.C.disconnect();
  };Hd.prototype.b = function (a) {
    var b = this.a.readyState;"interactive" !== b && "complete" !== b || this.disconnect();for (b = 0; b < a.length; b++) for (var c = a[b].addedNodes, d = 0; d < c.length; d++) O(this.j, c[d]);
  };function Id() {
    var a = this;this.b = this.a = void 0;this.c = new Promise(function (b) {
      a.b = b;a.a && b(a.a);
    });
  }Id.prototype.resolve = function (a) {
    if (this.a) throw Error("Already resolved.");this.a = a;this.b && this.b(a);
  };function P(a) {
    this.da = !1;this.j = a;this.ha = new Map();this.ea = function (a) {
      return a();
    };this.R = !1;this.fa = [];this.Da = new Hd(a);
  }
  P.prototype.define = function (a, b) {
    var c = this;if (!(b instanceof Function)) throw new TypeError("Custom element constructors must be functions.");if (!Ad(a)) throw new SyntaxError("The element name '" + a + "' is not valid.");if (this.j.a.get(a)) throw Error("A custom element with name '" + a + "' has already been defined.");if (this.da) throw Error("A custom element is already being defined.");this.da = !0;try {
      var d = function (a) {
        var b = e[a];if (void 0 !== b && !(b instanceof Function)) throw Error("The '" + a + "' callback must be a function.");
        return b;
      },
          e = b.prototype;if (!(e instanceof Object)) throw new TypeError("The custom element constructor's prototype is not an object.");var f = d("connectedCallback");var h = d("disconnectedCallback");var g = d("adoptedCallback");var k = d("attributeChangedCallback");var l = b.observedAttributes || [];
    } catch (m) {
      return;
    } finally {
      this.da = !1;
    }b = { localName: a, constructor: b, connectedCallback: f, disconnectedCallback: h, adoptedCallback: g, attributeChangedCallback: k, observedAttributes: l, constructionStack: [] };Dd(this.j, a, b);this.fa.push(b);
    this.R || (this.R = !0, this.ea(function () {
      return Jd(c);
    }));
  };function Jd(a) {
    if (!1 !== a.R) {
      a.R = !1;for (var b = a.fa, c = [], d = new Map(), e = 0; e < b.length; e++) d.set(b[e].localName, []);O(a.j, document, { va: function (b) {
          if (void 0 === b.__CE_state) {
            var e = b.localName,
                f = d.get(e);f ? f.push(b) : a.j.a.get(e) && c.push(b);
          }
        } });for (e = 0; e < c.length; e++) Gd(a.j, c[e]);for (; 0 < b.length;) {
        var f = b.shift();e = f.localName;f = d.get(f.localName);for (var h = 0; h < f.length; h++) Gd(a.j, f[h]);(e = a.ha.get(e)) && e.resolve(void 0);
      }
    }
  }
  P.prototype.get = function (a) {
    if (a = this.j.a.get(a)) return a.constructor;
  };P.prototype.a = function (a) {
    if (!Ad(a)) return Promise.reject(new SyntaxError("'" + a + "' is not a valid custom element name."));var b = this.ha.get(a);if (b) return b.c;b = new Id();this.ha.set(a, b);this.j.a.get(a) && !this.fa.some(function (b) {
      return b.localName === a;
    }) && b.resolve(void 0);return b.c;
  };P.prototype.b = function (a) {
    this.Da.disconnect();var b = this.ea;this.ea = function (c) {
      return a(function () {
        return b(c);
      });
    };
  };
  window.CustomElementRegistry = P;P.prototype.define = P.prototype.define;P.prototype.get = P.prototype.get;P.prototype.whenDefined = P.prototype.a;P.prototype.polyfillWrapFlushCallback = P.prototype.b;var Kd = window.Document.prototype.createElement,
      Ld = window.Document.prototype.createElementNS,
      Md = window.Document.prototype.importNode,
      Nd = window.Document.prototype.prepend,
      Od = window.Document.prototype.append,
      Pd = window.DocumentFragment.prototype.prepend,
      Qd = window.DocumentFragment.prototype.append,
      Rd = window.Node.prototype.cloneNode,
      Sd = window.Node.prototype.appendChild,
      Td = window.Node.prototype.insertBefore,
      Ud = window.Node.prototype.removeChild,
      Vd = window.Node.prototype.replaceChild,
      Wd = Object.getOwnPropertyDescriptor(window.Node.prototype, "textContent"),
      Xd = window.Element.prototype.attachShadow,
      Yd = Object.getOwnPropertyDescriptor(window.Element.prototype, "innerHTML"),
      Zd = window.Element.prototype.getAttribute,
      $d = window.Element.prototype.setAttribute,
      ae = window.Element.prototype.removeAttribute,
      be = window.Element.prototype.getAttributeNS,
      ce = window.Element.prototype.setAttributeNS,
      de = window.Element.prototype.removeAttributeNS,
      ee = window.Element.prototype.insertAdjacentElement,
      fe = window.Element.prototype.prepend,
      ge = window.Element.prototype.append,
      he = window.Element.prototype.before,
      ie = window.Element.prototype.after,
      je = window.Element.prototype.replaceWith,
      ke = window.Element.prototype.remove,
      le = window.HTMLElement,
      me = Object.getOwnPropertyDescriptor(window.HTMLElement.prototype, "innerHTML"),
      ne = window.HTMLElement.prototype.insertAdjacentElement;var oe = new function () {}();function pe() {
    var a = qe;window.HTMLElement = function () {
      function b() {
        var b = this.constructor,
            d = a.s.get(b);if (!d) throw Error("The custom element being constructed was not registered with `customElements`.");var e = d.constructionStack;if (0 === e.length) return e = Kd.call(document, d.localName), Object.setPrototypeOf(e, b.prototype), e.__CE_state = 1, e.__CE_definition = d, a.b(e), e;d = e.length - 1;var f = e[d];if (f === oe) throw Error("The HTMLElement constructor was either called reentrantly for this constructor or called multiple times.");
        e[d] = oe;Object.setPrototypeOf(f, b.prototype);a.b(f);return f;
      }b.prototype = le.prototype;return b;
    }();
  };function re(a, b, c) {
    function d(b) {
      return function (c) {
        for (var d = [], e = 0; e < arguments.length; ++e) d[e - 0] = arguments[e];e = [];for (var f = [], l = 0; l < d.length; l++) {
          var m = d[l];m instanceof Element && J(m) && f.push(m);if (m instanceof DocumentFragment) for (m = m.firstChild; m; m = m.nextSibling) e.push(m);else e.push(m);
        }b.apply(this, d);for (d = 0; d < f.length; d++) N(a, f[d]);if (J(this)) for (d = 0; d < e.length; d++) f = e[d], f instanceof Element && M(a, f);
      };
    }void 0 !== c.X && (b.prepend = d(c.X));void 0 !== c.append && (b.append = d(c.append));
  };function se() {
    var a = qe;L(Document.prototype, "createElement", function (b) {
      if (this.__CE_hasRegistry) {
        var c = a.a.get(b);if (c) return new c.constructor();
      }b = Kd.call(this, b);a.b(b);return b;
    });L(Document.prototype, "importNode", function (b, c) {
      b = Md.call(this, b, c);this.__CE_hasRegistry ? O(a, b) : Fd(a, b);return b;
    });L(Document.prototype, "createElementNS", function (b, c) {
      if (this.__CE_hasRegistry && (null === b || "http://www.w3.org/1999/xhtml" === b)) {
        var d = a.a.get(c);if (d) return new d.constructor();
      }b = Ld.call(this, b, c);a.b(b);return b;
    });
    re(a, Document.prototype, { X: Nd, append: Od });
  };function te() {
    var a = qe;function b(b, d) {
      Object.defineProperty(b, "textContent", { enumerable: d.enumerable, configurable: !0, get: d.get, set: function (b) {
          if (this.nodeType === Node.TEXT_NODE) d.set.call(this, b);else {
            var c = void 0;if (this.firstChild) {
              var e = this.childNodes,
                  g = e.length;if (0 < g && J(this)) {
                c = Array(g);for (var k = 0; k < g; k++) c[k] = e[k];
              }
            }d.set.call(this, b);if (c) for (b = 0; b < c.length; b++) N(a, c[b]);
          }
        } });
    }L(Node.prototype, "insertBefore", function (b, d) {
      if (b instanceof DocumentFragment) {
        var c = Array.prototype.slice.apply(b.childNodes);
        b = Td.call(this, b, d);if (J(this)) for (d = 0; d < c.length; d++) M(a, c[d]);return b;
      }c = J(b);d = Td.call(this, b, d);c && N(a, b);J(this) && M(a, b);return d;
    });L(Node.prototype, "appendChild", function (b) {
      if (b instanceof DocumentFragment) {
        var c = Array.prototype.slice.apply(b.childNodes);b = Sd.call(this, b);if (J(this)) for (var e = 0; e < c.length; e++) M(a, c[e]);return b;
      }c = J(b);e = Sd.call(this, b);c && N(a, b);J(this) && M(a, b);return e;
    });L(Node.prototype, "cloneNode", function (b) {
      b = Rd.call(this, b);this.ownerDocument.__CE_hasRegistry ? O(a, b) : Fd(a, b);return b;
    });L(Node.prototype, "removeChild", function (b) {
      var c = J(b),
          e = Ud.call(this, b);c && N(a, b);return e;
    });L(Node.prototype, "replaceChild", function (b, d) {
      if (b instanceof DocumentFragment) {
        var c = Array.prototype.slice.apply(b.childNodes);b = Vd.call(this, b, d);if (J(this)) for (N(a, d), d = 0; d < c.length; d++) M(a, c[d]);return b;
      }c = J(b);var f = Vd.call(this, b, d),
          h = J(this);h && N(a, d);c && N(a, b);h && M(a, b);return f;
    });Wd && Wd.get ? b(Node.prototype, Wd) : Ed(a, function (a) {
      b(a, { enumerable: !0, configurable: !0, get: function () {
          for (var a = [], b = 0; b < this.childNodes.length; b++) a.push(this.childNodes[b].textContent);return a.join("");
        }, set: function (a) {
          for (; this.firstChild;) Ud.call(this, this.firstChild);Sd.call(this, document.createTextNode(a));
        } });
    });
  };function ue(a) {
    var b = Element.prototype;function c(b) {
      return function (c) {
        for (var d = [], e = 0; e < arguments.length; ++e) d[e - 0] = arguments[e];e = [];for (var g = [], k = 0; k < d.length; k++) {
          var l = d[k];l instanceof Element && J(l) && g.push(l);if (l instanceof DocumentFragment) for (l = l.firstChild; l; l = l.nextSibling) e.push(l);else e.push(l);
        }b.apply(this, d);for (d = 0; d < g.length; d++) N(a, g[d]);if (J(this)) for (d = 0; d < e.length; d++) g = e[d], g instanceof Element && M(a, g);
      };
    }void 0 !== he && (b.before = c(he));void 0 !== he && (b.after = c(ie));void 0 !== je && L(b, "replaceWith", function (b) {
      for (var c = [], d = 0; d < arguments.length; ++d) c[d - 0] = arguments[d];d = [];for (var h = [], g = 0; g < c.length; g++) {
        var k = c[g];k instanceof Element && J(k) && h.push(k);if (k instanceof DocumentFragment) for (k = k.firstChild; k; k = k.nextSibling) d.push(k);else d.push(k);
      }g = J(this);je.apply(this, c);for (c = 0; c < h.length; c++) N(a, h[c]);if (g) for (N(a, this), c = 0; c < d.length; c++) h = d[c], h instanceof Element && M(a, h);
    });void 0 !== ke && L(b, "remove", function () {
      var b = J(this);ke.call(this);b && N(a, this);
    });
  };function ve() {
    var a = qe;function b(b, c) {
      Object.defineProperty(b, "innerHTML", { enumerable: c.enumerable, configurable: !0, get: c.get, set: function (b) {
          var d = this,
              e = void 0;J(this) && (e = [], K(this, function (a) {
            a !== d && e.push(a);
          }));c.set.call(this, b);if (e) for (var f = 0; f < e.length; f++) {
            var l = e[f];1 === l.__CE_state && a.disconnectedCallback(l);
          }this.ownerDocument.__CE_hasRegistry ? O(a, this) : Fd(a, this);return b;
        } });
    }function c(b, c) {
      L(b, "insertAdjacentElement", function (b, d) {
        var e = J(d);b = c.call(this, b, d);e && N(a, d);J(b) && M(a, d);
        return b;
      });
    }Xd && L(Element.prototype, "attachShadow", function (a) {
      return this.__CE_shadowRoot = a = Xd.call(this, a);
    });Yd && Yd.get ? b(Element.prototype, Yd) : me && me.get ? b(HTMLElement.prototype, me) : Ed(a, function (a) {
      b(a, { enumerable: !0, configurable: !0, get: function () {
          return Rd.call(this, !0).innerHTML;
        }, set: function (a) {
          var b = "template" === this.localName,
              c = b ? this.content : this,
              d = Kd.call(document, this.localName);for (d.innerHTML = a; 0 < c.childNodes.length;) Ud.call(c, c.childNodes[0]);for (a = b ? d.content : d; 0 < a.childNodes.length;) Sd.call(c, a.childNodes[0]);
        } });
    });L(Element.prototype, "setAttribute", function (b, c) {
      if (1 !== this.__CE_state) return $d.call(this, b, c);var d = Zd.call(this, b);$d.call(this, b, c);c = Zd.call(this, b);a.attributeChangedCallback(this, b, d, c, null);
    });L(Element.prototype, "setAttributeNS", function (b, c, f) {
      if (1 !== this.__CE_state) return ce.call(this, b, c, f);var d = be.call(this, b, c);ce.call(this, b, c, f);f = be.call(this, b, c);a.attributeChangedCallback(this, c, d, f, b);
    });L(Element.prototype, "removeAttribute", function (b) {
      if (1 !== this.__CE_state) return ae.call(this, b);var c = Zd.call(this, b);ae.call(this, b);null !== c && a.attributeChangedCallback(this, b, c, null, null);
    });L(Element.prototype, "removeAttributeNS", function (b, c) {
      if (1 !== this.__CE_state) return de.call(this, b, c);var d = be.call(this, b, c);de.call(this, b, c);var e = be.call(this, b, c);d !== e && a.attributeChangedCallback(this, c, d, e, b);
    });ne ? c(HTMLElement.prototype, ne) : ee ? c(Element.prototype, ee) : console.warn("Custom Elements: `Element#insertAdjacentElement` was not patched.");re(a, Element.prototype, { X: fe, append: ge });ue(a);
  }
  ;var we = window.customElements;if (!we || we.forcePolyfill || "function" != typeof we.define || "function" != typeof we.get) {
    var qe = new Cd();pe();se();re(qe, DocumentFragment.prototype, { X: Pd, append: Qd });te();ve();document.__CE_hasRegistry = !0;var customElements = new P(qe);Object.defineProperty(window, "customElements", { configurable: !0, enumerable: !0, value: customElements });
  };function xe() {
    this.end = this.start = 0;this.rules = this.parent = this.previous = null;this.cssText = this.parsedCssText = "";this.atRule = !1;this.type = 0;this.parsedSelector = this.selector = this.keyframesName = "";
  }
  function ye(a) {
    a = a.replace(ze, "").replace(Ae, "");var b = Be,
        c = a,
        d = new xe();d.start = 0;d.end = c.length;for (var e = d, f = 0, h = c.length; f < h; f++) if ("{" === c[f]) {
      e.rules || (e.rules = []);var g = e,
          k = g.rules[g.rules.length - 1] || null;e = new xe();e.start = f + 1;e.parent = g;e.previous = k;g.rules.push(e);
    } else "}" === c[f] && (e.end = f + 1, e = e.parent || d);return b(d, a);
  }
  function Be(a, b) {
    var c = b.substring(a.start, a.end - 1);a.parsedCssText = a.cssText = c.trim();a.parent && (c = b.substring(a.previous ? a.previous.end : a.parent.start, a.start - 1), c = Ce(c), c = c.replace(De, " "), c = c.substring(c.lastIndexOf(";") + 1), c = a.parsedSelector = a.selector = c.trim(), a.atRule = 0 === c.indexOf("@"), a.atRule ? 0 === c.indexOf("@media") ? a.type = He : c.match(Ie) && (a.type = Je, a.keyframesName = a.selector.split(De).pop()) : a.type = 0 === c.indexOf("--") ? Ke : Le);if (c = a.rules) for (var d = 0, e = c.length, f; d < e && (f = c[d]); d++) Be(f, b);return a;
  }function Ce(a) {
    return a.replace(/\\([0-9a-f]{1,6})\s/gi, function (a, c) {
      a = c;for (c = 6 - a.length; c--;) a = "0" + a;return "\\" + a;
    });
  }
  function Me(a, b, c) {
    c = void 0 === c ? "" : c;var d = "";if (a.cssText || a.rules) {
      var e = a.rules,
          f;if (f = e) f = e[0], f = !(f && f.selector && 0 === f.selector.indexOf("--"));if (f) {
        f = 0;for (var h = e.length, g; f < h && (g = e[f]); f++) d = Me(g, b, d);
      } else b ? b = a.cssText : (b = a.cssText, b = b.replace(Ne, "").replace(Oe, ""), b = b.replace(Pe, "").replace(Qe, "")), (d = b.trim()) && (d = "  " + d + "\n");
    }d && (a.selector && (c += a.selector + " {\n"), c += d, a.selector && (c += "}\n\n"));return c;
  }
  var Le = 1,
      Je = 7,
      He = 4,
      Ke = 1E3,
      ze = /\/\*[^*]*\*+([^/*][^*]*\*+)*\//gim,
      Ae = /@import[^;]*;/gim,
      Ne = /(?:^[^;\-\s}]+)?--[^;{}]*?:[^{};]*?(?:[;\n]|$)/gim,
      Oe = /(?:^[^;\-\s}]+)?--[^;{}]*?:[^{};]*?{[^}]*?}(?:[;\n]|$)?/gim,
      Pe = /@apply\s*\(?[^);]*\)?\s*(?:[;\n]|$)?/gim,
      Qe = /[^;:]*?:[^;]*?var\([^;]*\)(?:[;\n]|$)?/gim,
      Ie = /^@[^\s]*keyframes/,
      De = /\s+/g;var Q = !(window.ShadyDOM && window.ShadyDOM.inUse),
      Re;function Se(a) {
    Re = a && a.shimcssproperties ? !1 : Q || !(navigator.userAgent.match(/AppleWebKit\/601|Edge\/15/) || !window.CSS || !CSS.supports || !CSS.supports("box-shadow", "0 0 0 var(--foo)"));
  }window.ShadyCSS && void 0 !== window.ShadyCSS.nativeCss ? Re = window.ShadyCSS.nativeCss : window.ShadyCSS ? (Se(window.ShadyCSS), window.ShadyCSS = void 0) : Se(window.WebComponents && window.WebComponents.flags);var S = Re;var Te = /(?:^|[;\s{]\s*)(--[\w-]*?)\s*:\s*(?:((?:'(?:\\'|.)*?'|"(?:\\"|.)*?"|\([^)]*?\)|[^};{])+)|\{([^}]*)\}(?:(?=[;\s}])|$))/gi,
      Ue = /(?:^|\W+)@apply\s*\(?([^);\n]*)\)?/gi,
      Ve = /(--[\w-]+)\s*([:,;)]|$)/gi,
      We = /(animation\s*:)|(animation-name\s*:)/,
      Xe = /@media\s(.*)/,
      Ye = /\{[^}]*\}/g;var Ze = new Set();function $e(a, b) {
    if (!a) return "";"string" === typeof a && (a = ye(a));b && af(a, b);return Me(a, S);
  }function bf(a) {
    !a.__cssRules && a.textContent && (a.__cssRules = ye(a.textContent));return a.__cssRules || null;
  }function cf(a) {
    return !!a.parent && a.parent.type === Je;
  }function af(a, b, c, d) {
    if (a) {
      var e = !1,
          f = a.type;if (d && f === He) {
        var h = a.selector.match(Xe);h && (window.matchMedia(h[1]).matches || (e = !0));
      }f === Le ? b(a) : c && f === Je ? c(a) : f === Ke && (e = !0);if ((a = a.rules) && !e) {
        e = 0;f = a.length;for (var g; e < f && (g = a[e]); e++) af(g, b, c, d);
      }
    }
  }
  function df(a, b, c, d) {
    var e = document.createElement("style");b && e.setAttribute("scope", b);e.textContent = a;ef(e, c, d);return e;
  }var T = null;function ef(a, b, c) {
    b = b || document.head;b.insertBefore(a, c && c.nextSibling || b.firstChild);T ? a.compareDocumentPosition(T) === Node.DOCUMENT_POSITION_PRECEDING && (T = a) : T = a;
  }
  function ff(a, b) {
    var c = a.indexOf("var(");if (-1 === c) return b(a, "", "", "");a: {
      var d = 0;var e = c + 3;for (var f = a.length; e < f; e++) if ("(" === a[e]) d++;else if (")" === a[e] && 0 === --d) break a;e = -1;
    }d = a.substring(c + 4, e);c = a.substring(0, c);a = ff(a.substring(e + 1), b);e = d.indexOf(",");return -1 === e ? b(c, d.trim(), "", a) : b(c, d.substring(0, e).trim(), d.substring(e + 1).trim(), a);
  }function gf(a, b) {
    Q ? a.setAttribute("class", b) : window.ShadyDOM.nativeMethods.setAttribute.call(a, "class", b);
  }
  function U(a) {
    var b = a.localName,
        c = "";b ? -1 < b.indexOf("-") || (c = b, b = a.getAttribute && a.getAttribute("is") || "") : (b = a.is, c = a.extends);return { is: b, P: c };
  };function hf() {}function jf(a, b, c) {
    var d = V;a.__styleScoped ? a.__styleScoped = null : kf(d, a, b || "", c);
  }function kf(a, b, c, d) {
    b.nodeType === Node.ELEMENT_NODE && lf(b, c, d);if (b = "template" === b.localName ? (b.content || b.gb).childNodes : b.children || b.childNodes) for (var e = 0; e < b.length; e++) kf(a, b[e], c, d);
  }
  function lf(a, b, c) {
    if (b) if (a.classList) c ? (a.classList.remove("style-scope"), a.classList.remove(b)) : (a.classList.add("style-scope"), a.classList.add(b));else if (a.getAttribute) {
      var d = a.getAttribute(mf);c ? d && (b = d.replace("style-scope", "").replace(b, ""), gf(a, b)) : gf(a, (d ? d + " " : "") + "style-scope " + b);
    }
  }function nf(a, b, c) {
    var d = V,
        e = a.__cssBuild;Q || "shady" === e ? b = $e(b, c) : (a = U(a), b = of(d, b, a.is, a.P, c) + "\n\n");return b.trim();
  }
  function of(a, b, c, d, e) {
    var f = pf(c, d);c = c ? qf + c : "";return $e(b, function (b) {
      b.c || (b.selector = b.m = rf(a, b, a.b, c, f), b.c = !0);e && e(b, c, f);
    });
  }function pf(a, b) {
    return b ? "[is=" + a + "]" : a;
  }function rf(a, b, c, d, e) {
    var f = b.selector.split(sf);if (!cf(b)) {
      b = 0;for (var h = f.length, g; b < h && (g = f[b]); b++) f[b] = c.call(a, g, d, e);
    }return f.join(sf);
  }function tf(a) {
    return a.replace(uf, function (a, c, d) {
      -1 < d.indexOf("+") ? d = d.replace(/\+/g, "___") : -1 < d.indexOf("___") && (d = d.replace(/___/g, "+"));return ":" + c + "(" + d + ")";
    });
  }
  hf.prototype.b = function (a, b, c) {
    var d = !1;a = a.trim();var e = uf.test(a);e && (a = a.replace(uf, function (a, b, c) {
      return ":" + b + "(" + c.replace(/\s/g, "") + ")";
    }), a = tf(a));a = a.replace(vf, wf + " $1");a = a.replace(xf, function (a, e, g) {
      d || (a = yf(g, e, b, c), d = d || a.stop, e = a.Ka, g = a.value);return e + g;
    });e && (a = tf(a));return a;
  };
  function yf(a, b, c, d) {
    var e = a.indexOf(zf);0 <= a.indexOf(wf) ? a = Af(a, d) : 0 !== e && (a = c ? Bf(a, c) : a);c = !1;0 <= e && (b = "", c = !0);if (c) {
      var f = !0;c && (a = a.replace(Cf, function (a, b) {
        return " > " + b;
      }));
    }a = a.replace(Df, function (a, b, c) {
      return '[dir="' + c + '"] ' + b + ", " + b + '[dir="' + c + '"]';
    });return { value: a, Ka: b, stop: f };
  }function Bf(a, b) {
    a = a.split(Ef);a[0] += b;return a.join(Ef);
  }
  function Af(a, b) {
    var c = a.match(Ff);return (c = c && c[2].trim() || "") ? c[0].match(Gf) ? a.replace(Ff, function (a, c, f) {
      return b + f;
    }) : c.split(Gf)[0] === b ? c : Hf : a.replace(wf, b);
  }function If(a) {
    a.selector === Jf && (a.selector = "html");
  }hf.prototype.c = function (a) {
    return a.match(zf) ? this.b(a, Kf) : Bf(a.trim(), Kf);
  };q.Object.defineProperties(hf.prototype, { a: { configurable: !0, enumerable: !0, get: function () {
        return "style-scope";
      } } });
  var uf = /:(nth[-\w]+)\(([^)]+)\)/,
      Kf = ":not(.style-scope)",
      sf = ",",
      xf = /(^|[\s>+~]+)((?:\[.+?\]|[^\s>+~=[])+)/g,
      Gf = /[[.:#*]/,
      wf = ":host",
      Jf = ":root",
      zf = "::slotted",
      vf = new RegExp("^(" + zf + ")"),
      Ff = /(:host)(?:\(((?:\([^)(]*\)|[^)(]*)+?)\))/,
      Cf = /(?:::slotted)(?:\(((?:\([^)(]*\)|[^)(]*)+?)\))/,
      Df = /(.*):dir\((?:(ltr|rtl))\)/,
      qf = ".",
      Ef = ":",
      mf = "class",
      Hf = "should_not_match",
      V = new hf();function Lf(a, b, c, d) {
    this.w = a || null;this.b = b || null;this.ja = c || [];this.G = null;this.P = d || "";this.a = this.u = this.B = null;
  }function W(a) {
    return a ? a.__styleInfo : null;
  }function Mf(a, b) {
    return a.__styleInfo = b;
  }Lf.prototype.c = function () {
    return this.w;
  };Lf.prototype._getStyleRules = Lf.prototype.c;var Nf,
      Of = window.Element.prototype;Nf = Of.matches || Of.matchesSelector || Of.mozMatchesSelector || Of.msMatchesSelector || Of.oMatchesSelector || Of.webkitMatchesSelector;var Pf = navigator.userAgent.match("Trident");function Qf() {}function Rf(a) {
    var b = {},
        c = [],
        d = 0;af(a, function (a) {
      Sf(a);a.index = d++;a = a.i.cssText;for (var c; c = Ve.exec(a);) {
        var e = c[1];":" !== c[2] && (b[e] = !0);
      }
    }, function (a) {
      c.push(a);
    });a.b = c;a = [];for (var e in b) a.push(e);return a;
  }
  function Sf(a) {
    if (!a.i) {
      var b = {},
          c = {};Tf(a, c) && (b.v = c, a.rules = null);b.cssText = a.parsedCssText.replace(Ye, "").replace(Te, "");a.i = b;
    }
  }function Tf(a, b) {
    var c = a.i;if (c) {
      if (c.v) return Object.assign(b, c.v), !0;
    } else {
      c = a.parsedCssText;for (var d; a = Te.exec(c);) {
        d = (a[2] || a[3]).trim();if ("inherit" !== d || "unset" !== d) b[a[1].trim()] = d;d = !0;
      }return d;
    }
  }
  function Uf(a, b, c) {
    b && (b = 0 <= b.indexOf(";") ? Vf(a, b, c) : ff(b, function (b, e, f, h) {
      if (!e) return b + h;(e = Uf(a, c[e], c)) && "initial" !== e ? "apply-shim-inherit" === e && (e = "inherit") : e = Uf(a, c[f] || f, c) || f;return b + (e || "") + h;
    }));return b && b.trim() || "";
  }
  function Vf(a, b, c) {
    b = b.split(";");for (var d = 0, e, f; d < b.length; d++) if (e = b[d]) {
      Ue.lastIndex = 0;if (f = Ue.exec(e)) e = Uf(a, c[f[1]], c);else if (f = e.indexOf(":"), -1 !== f) {
        var h = e.substring(f);h = h.trim();h = Uf(a, h, c) || h;e = e.substring(0, f) + h;
      }b[d] = e && e.lastIndexOf(";") === e.length - 1 ? e.slice(0, -1) : e || "";
    }return b.join(";");
  }
  function Wf(a, b) {
    var c = {},
        d = [];af(a, function (a) {
      a.i || Sf(a);var e = a.m || a.parsedSelector;b && a.i.v && e && Nf.call(b, e) && (Tf(a, c), a = a.index, e = parseInt(a / 32, 10), d[e] = (d[e] || 0) | 1 << a % 32);
    }, null, !0);return { v: c, key: d };
  }
  function Xf(a, b, c, d) {
    b.i || Sf(b);if (b.i.v) {
      var e = U(a);a = e.is;e = e.P;e = a ? pf(a, e) : "html";var f = b.parsedSelector,
          h = ":host > *" === f || "html" === f,
          g = 0 === f.indexOf(":host") && !h;"shady" === c && (h = f === e + " > *." + e || -1 !== f.indexOf("html"), g = !h && 0 === f.indexOf(e));"shadow" === c && (h = ":host > *" === f || "html" === f, g = g && !h);if (h || g) c = e, g && (Q && !b.m && (b.m = rf(V, b, V.b, a ? qf + a : "", e)), c = b.m || e), d({ Xa: c, Qa: g, hb: h });
    }
  }
  function Yf(a, b) {
    var c = {},
        d = {},
        e = b && b.__cssBuild;af(b, function (b) {
      Xf(a, b, e, function (e) {
        Nf.call(a.b || a, e.Xa) && (e.Qa ? Tf(b, c) : Tf(b, d));
      });
    }, null, !0);return { Wa: d, Oa: c };
  }
  function Zf(a, b, c, d) {
    var e = U(b),
        f = pf(e.is, e.P),
        h = new RegExp("(?:^|[^.#[:])" + (b.extends ? "\\" + f.slice(0, -1) + "\\]" : f) + "($|[.:[\\s>+~])");e = W(b).w;var g = $f(e, d);return nf(b, e, function (b) {
      var e = "";b.i || Sf(b);b.i.cssText && (e = Vf(a, b.i.cssText, c));b.cssText = e;if (!Q && !cf(b) && b.cssText) {
        var k = e = b.cssText;null == b.ra && (b.ra = We.test(e));if (b.ra) if (null == b.W) {
          b.W = [];for (var n in g) k = g[n], k = k(e), e !== k && (e = k, b.W.push(n));
        } else {
          for (n = 0; n < b.W.length; ++n) k = g[b.W[n]], e = k(e);k = e;
        }b.cssText = k;b.m = b.m || b.selector;e = "." + d;
        n = b.m.split(",");k = 0;for (var w = n.length, I; k < w && (I = n[k]); k++) n[k] = I.match(h) ? I.replace(f, e) : e + " " + I;b.selector = n.join(",");
      }
    });
  }function $f(a, b) {
    a = a.b;var c = {};if (!Q && a) for (var d = 0, e = a[d]; d < a.length; e = a[++d]) {
      var f = e,
          h = b;f.h = new RegExp(f.keyframesName, "g");f.a = f.keyframesName + "-" + h;f.m = f.m || f.selector;f.selector = f.m.replace(f.keyframesName, f.a);c[e.keyframesName] = ag(e);
    }return c;
  }function ag(a) {
    return function (b) {
      return b.replace(a.h, a.a);
    };
  }
  function bg(a, b) {
    var c = cg,
        d = bf(a);a.textContent = $e(d, function (a) {
      var d = a.cssText = a.parsedCssText;a.i && a.i.cssText && (d = d.replace(Ne, "").replace(Oe, ""), a.cssText = Vf(c, d, b));
    });
  }q.Object.defineProperties(Qf.prototype, { a: { configurable: !0, enumerable: !0, get: function () {
        return "x-scope";
      } } });var cg = new Qf();var dg = {},
      eg = window.customElements;if (eg && !Q) {
    var fg = eg.define;eg.define = function (a, b, c) {
      var d = document.createComment(" Shady DOM styles for " + a + " "),
          e = document.head;e.insertBefore(d, (T ? T.nextSibling : null) || e.firstChild);T = d;dg[a] = d;return fg.call(eg, a, b, c);
    };
  };function gg() {
    this.cache = {};
  }gg.prototype.store = function (a, b, c, d) {
    var e = this.cache[a] || [];e.push({ v: b, styleElement: c, u: d });100 < e.length && e.shift();this.cache[a] = e;
  };gg.prototype.fetch = function (a, b, c) {
    if (a = this.cache[a]) for (var d = a.length - 1; 0 <= d; d--) {
      var e = a[d],
          f;a: {
        for (f = 0; f < c.length; f++) {
          var h = c[f];if (e.v[h] !== b[h]) {
            f = !1;break a;
          }
        }f = !0;
      }if (f) return e;
    }
  };function hg() {}
  function ig(a) {
    for (var b = 0; b < a.length; b++) {
      var c = a[b];if (c.target !== document.documentElement && c.target !== document.head) for (var d = 0; d < c.addedNodes.length; d++) {
        var e = c.addedNodes[d];if (e.nodeType === Node.ELEMENT_NODE) {
          var f = e.getRootNode();var h = e;var g = [];h.classList ? g = Array.from(h.classList) : h instanceof window.SVGElement && h.hasAttribute("class") && (g = h.getAttribute("class").split(/\s+/));h = g;g = h.indexOf(V.a);if ((h = -1 < g ? h[g + 1] : "") && f === e.ownerDocument) jf(e, h, !0);else if (f.nodeType === Node.DOCUMENT_FRAGMENT_NODE && (f = f.host)) if (f = U(f).is, h === f) for (e = window.ShadyDOM.nativeMethods.querySelectorAll.call(e, ":not(." + V.a + ")"), f = 0; f < e.length; f++) lf(e[f], h);else h && jf(e, h, !0), jf(e, f);
        }
      }
    }
  }
  if (!Q) {
    var jg = new MutationObserver(ig),
        kg = function (a) {
      jg.observe(a, { childList: !0, subtree: !0 });
    };if (window.customElements && !window.customElements.polyfillWrapFlushCallback) kg(document);else {
      var lg = function () {
        kg(document.body);
      };window.HTMLImports ? window.HTMLImports.whenReady(lg) : requestAnimationFrame(function () {
        if ("loading" === document.readyState) {
          var a = function () {
            lg();document.removeEventListener("readystatechange", a);
          };document.addEventListener("readystatechange", a);
        } else lg();
      });
    }hg = function () {
      ig(jg.takeRecords());
    };
  }
  var mg = hg;var ng = {};var og = Promise.resolve();function pg(a) {
    if (a = ng[a]) a._applyShimCurrentVersion = a._applyShimCurrentVersion || 0, a._applyShimValidatingVersion = a._applyShimValidatingVersion || 0, a._applyShimNextVersion = (a._applyShimNextVersion || 0) + 1;
  }function qg(a) {
    return a._applyShimCurrentVersion === a._applyShimNextVersion;
  }function rg(a) {
    a._applyShimValidatingVersion = a._applyShimNextVersion;a.qa || (a.qa = !0, og.then(function () {
      a._applyShimCurrentVersion = a._applyShimNextVersion;a.qa = !1;
    }));
  };var sg = null,
      tg = window.HTMLImports && window.HTMLImports.whenReady || null,
      ug;function vg(a) {
    requestAnimationFrame(function () {
      tg ? tg(a) : (sg || (sg = new Promise(function (a) {
        ug = a;
      }), "complete" === document.readyState ? ug() : document.addEventListener("readystatechange", function () {
        "complete" === document.readyState && ug();
      })), sg.then(function () {
        a && a();
      }));
    });
  };var wg = new gg();function X() {
    var a = this;this.L = {};this.c = document.documentElement;var b = new xe();b.rules = [];this.h = Mf(this.c, new Lf(b));this.s = !1;this.b = this.a = null;vg(function () {
      xg(a);
    });
  }p = X.prototype;p.wa = function () {
    mg();
  };p.Ma = function (a) {
    return bf(a);
  };p.Za = function (a) {
    return $e(a);
  };
  p.prepareTemplate = function (a, b, c) {
    if (!a.Ia) {
      a.Ia = !0;a.name = b;a.extends = c;ng[b] = a;var d = (d = a.content.querySelector("style")) ? d.getAttribute("css-build") || "" : "";var e = [];for (var f = a.content.querySelectorAll("style"), h = 0; h < f.length; h++) {
        var g = f[h];if (g.hasAttribute("shady-unscoped")) {
          if (!Q) {
            var k = g.textContent;Ze.has(k) || (Ze.add(k), k = g.cloneNode(!0), document.head.appendChild(k));g.parentNode.removeChild(g);
          }
        } else e.push(g.textContent), g.parentNode.removeChild(g);
      }e = e.join("").trim();c = { is: b, extends: c,
        eb: d };Q || jf(a.content, b);xg(this);f = Ue.test(e) || Te.test(e);Ue.lastIndex = 0;Te.lastIndex = 0;e = ye(e);f && S && this.a && this.a.transformRules(e, b);a._styleAst = e;a.a = d;d = [];S || (d = Rf(a._styleAst));if (!d.length || S) e = Q ? a.content : null, b = dg[b], f = nf(c, a._styleAst), b = f.length ? df(f, c.is, e, b) : void 0, a.pa = b;a.Ha = d;
    }
  };
  function yg(a) {
    !a.b && window.ShadyCSS && window.ShadyCSS.CustomStyleInterface && (a.b = window.ShadyCSS.CustomStyleInterface, a.b.transformCallback = function (b) {
      a.ua(b);
    }, a.b.validateCallback = function () {
      requestAnimationFrame(function () {
        (a.b.enqueued || a.s) && a.F();
      });
    });
  }function xg(a) {
    !a.a && window.ShadyCSS && window.ShadyCSS.ApplyShim && (a.a = window.ShadyCSS.ApplyShim, a.a.invalidCallback = pg);yg(a);
  }
  p.F = function () {
    xg(this);if (this.b) {
      var a = this.b.processStyles();if (this.b.enqueued) {
        if (S) for (var b = 0; b < a.length; b++) {
          var c = this.b.getStyleForCustomStyle(a[b]);if (c && S && this.a) {
            var d = bf(c);xg(this);this.a.transformRules(d);c.textContent = $e(d);
          }
        } else for (zg(this, this.c, this.h), b = 0; b < a.length; b++) (c = this.b.getStyleForCustomStyle(a[b])) && bg(c, this.h.B);this.b.enqueued = !1;this.s && !S && this.styleDocument();
      }
    }
  };
  p.styleElement = function (a, b) {
    var c = U(a).is,
        d = W(a);if (!d) {
      var e = U(a);d = e.is;e = e.P;var f = dg[d];d = ng[d];if (d) {
        var h = d._styleAst;var g = d.Ha;
      }d = Mf(a, new Lf(h, f, g, e));
    }a !== this.c && (this.s = !0);b && (d.G = d.G || {}, Object.assign(d.G, b));if (S) {
      if (d.G) {
        b = d.G;for (var k in b) null === k ? a.style.removeProperty(k) : a.style.setProperty(k, b[k]);
      }if (((k = ng[c]) || a === this.c) && k && k.pa && !qg(k)) {
        if (qg(k) || k._applyShimValidatingVersion !== k._applyShimNextVersion) xg(this), this.a && this.a.transformRules(k._styleAst, c), k.pa.textContent = nf(a, d.w), rg(k);Q && (c = a.shadowRoot) && (c.querySelector("style").textContent = nf(a, d.w));d.w = k._styleAst;
      }
    } else if (zg(this, a, d), d.ja && d.ja.length) {
      c = d;k = U(a).is;d = (b = wg.fetch(k, c.B, c.ja)) ? b.styleElement : null;h = c.u;(g = b && b.u) || (g = this.L[k] = (this.L[k] || 0) + 1, g = k + "-" + g);c.u = g;g = c.u;e = cg;e = d ? d.textContent || "" : Zf(e, a, c.B, g);f = W(a);var l = f.a;l && !Q && l !== d && (l._useCount--, 0 >= l._useCount && l.parentNode && l.parentNode.removeChild(l));Q ? f.a ? (f.a.textContent = e, d = f.a) : e && (d = df(e, g, a.shadowRoot, f.b)) : d ? d.parentNode || (Pf && -1 < e.indexOf("@media") && (d.textContent = e), ef(d, null, f.b)) : e && (d = df(e, g, null, f.b));d && (d._useCount = d._useCount || 0, f.a != d && d._useCount++, f.a = d);g = d;Q || (d = c.u, f = e = a.getAttribute("class") || "", h && (f = e.replace(new RegExp("\\s*x-scope\\s*" + h + "\\s*", "g"), " ")), f += (f ? " " : "") + "x-scope " + d, e !== f && gf(a, f));b || wg.store(k, c.B, g, c.u);
    }
  };function Ag(a, b) {
    return (b = b.getRootNode().host) ? W(b) ? b : Ag(a, b) : a.c;
  }
  function zg(a, b, c) {
    a = Ag(a, b);var d = W(a);a = Object.create(d.B || null);var e = Yf(b, c.w);b = Wf(d.w, b).v;Object.assign(a, e.Oa, b, e.Wa);b = c.G;for (var f in b) if ((e = b[f]) || 0 === e) a[f] = e;f = cg;b = Object.getOwnPropertyNames(a);for (e = 0; e < b.length; e++) d = b[e], a[d] = Uf(f, a[d], a);c.B = a;
  }p.styleDocument = function (a) {
    this.styleSubtree(this.c, a);
  };
  p.styleSubtree = function (a, b) {
    var c = a.shadowRoot;(c || a === this.c) && this.styleElement(a, b);if (b = c && (c.children || c.childNodes)) for (a = 0; a < b.length; a++) this.styleSubtree(b[a]);else if (a = a.children || a.childNodes) for (b = 0; b < a.length; b++) this.styleSubtree(a[b]);
  };p.ua = function (a) {
    var b = this,
        c = bf(a);af(c, function (a) {
      if (Q) If(a);else {
        var c = V;a.selector = a.parsedSelector;If(a);a.selector = a.m = rf(c, a, c.c, void 0, void 0);
      }S && (xg(b), b.a && b.a.transformRule(a));
    });S ? a.textContent = $e(c) : this.h.w.rules.push(c);
  };
  p.getComputedStyleValue = function (a, b) {
    var c;S || (c = (W(a) || W(Ag(this, a))).B[b]);return (c = c || window.getComputedStyle(a).getPropertyValue(b)) ? c.trim() : "";
  };p.Ya = function (a, b) {
    var c = a.getRootNode();b = b ? b.split(/\s/) : [];c = c.host && c.host.localName;if (!c) {
      var d = a.getAttribute("class");if (d) {
        d = d.split(/\s/);for (var e = 0; e < d.length; e++) if (d[e] === V.a) {
          c = d[e + 1];break;
        }
      }
    }c && b.push(V.a, c);S || (c = W(a)) && c.u && b.push(cg.a, c.u);gf(a, b.join(" "));
  };p.Ja = function (a) {
    return W(a);
  };X.prototype.flush = X.prototype.wa;
  X.prototype.prepareTemplate = X.prototype.prepareTemplate;X.prototype.styleElement = X.prototype.styleElement;X.prototype.styleDocument = X.prototype.styleDocument;X.prototype.styleSubtree = X.prototype.styleSubtree;X.prototype.getComputedStyleValue = X.prototype.getComputedStyleValue;X.prototype.setElementClass = X.prototype.Ya;X.prototype._styleInfoForNode = X.prototype.Ja;X.prototype.transformCustomStyleForDocument = X.prototype.ua;X.prototype.getStyleAst = X.prototype.Ma;X.prototype.styleAstToString = X.prototype.Za;
  X.prototype.flushCustomStyles = X.prototype.F;Object.defineProperties(X.prototype, { nativeShadow: { get: function () {
        return Q;
      } }, nativeCss: { get: function () {
        return S;
      } } });var Y = new X(),
      Bg,
      Cg;window.ShadyCSS && (Bg = window.ShadyCSS.ApplyShim, Cg = window.ShadyCSS.CustomStyleInterface);window.ShadyCSS = { ScopingShim: Y, prepareTemplate: function (a, b, c) {
      Y.F();Y.prepareTemplate(a, b, c);
    }, styleSubtree: function (a, b) {
      Y.F();Y.styleSubtree(a, b);
    }, styleElement: function (a) {
      Y.F();Y.styleElement(a);
    }, styleDocument: function (a) {
      Y.F();Y.styleDocument(a);
    }, getComputedStyleValue: function (a, b) {
      return Y.getComputedStyleValue(a, b);
    }, nativeCss: S, nativeShadow: Q };Bg && (window.ShadyCSS.ApplyShim = Bg);
  Cg && (window.ShadyCSS.CustomStyleInterface = Cg);var Dg = window.customElements,
      Eg = window.HTMLImports,
      Fg = window.HTMLTemplateElement;window.WebComponents = window.WebComponents || {};if (Dg && Dg.polyfillWrapFlushCallback) {
    var Gg,
        Hg = function () {
      if (Gg) {
        Fg.J && Fg.J(window.document);var a = Gg;Gg = null;a();return !0;
      }
    },
        Ig = Eg.whenReady;Dg.polyfillWrapFlushCallback(function (a) {
      Gg = a;Ig(Hg);
    });Eg.whenReady = function (a) {
      Ig(function () {
        Hg() ? Eg.whenReady(a) : a();
      });
    };
  }
  Eg.whenReady(function () {
    requestAnimationFrame(function () {
      window.WebComponents.ready = !0;document.dispatchEvent(new CustomEvent("WebComponentsReady", { bubbles: !0 }));
    });
  });var Jg = document.createElement("style");Jg.textContent = "body {transition: opacity ease-in 0.2s; } \nbody[unresolved] {opacity: 0; display: block; overflow: hidden; position: relative; } \n";var Kg = document.querySelector("head");Kg.insertBefore(Jg, Kg.firstChild);
}).call(undefined);
/* WEBPACK VAR INJECTION */}.call(exports, __webpack_require__(7), __webpack_require__(0)))

/***/ }),
/* 12 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


__webpack_require__(13);

var _index = __webpack_require__(14);

var _index2 = _interopRequireDefault(_index);

var _index3 = __webpack_require__(15);

var _index4 = _interopRequireDefault(_index3);

var _index5 = __webpack_require__(9);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

document.body.appendChild(new _index5.Mount({
  store: _index2.default,
  router: _index4.default
}));

/***/ }),
/* 13 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
/* WEBPACK VAR INJECTION */(function(process) {

try {
  if (!process) {
    window.process = { env: {} };
  }
} catch (err) {
  window.process = { env: {} };
}
/* WEBPACK VAR INJECTION */}.call(exports, __webpack_require__(0)))

/***/ }),
/* 14 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = {};

/***/ }),
/* 15 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});

var _oz = __webpack_require__(1);

var _index = __webpack_require__(9);

var _index2 = _interopRequireDefault(_index);

var _guide = __webpack_require__(38);

var _guide2 = _interopRequireDefault(_guide);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

exports.default = new _oz.Router({
  routes: [{
    path: '/',
    components: [_index2.default]
  }, {
    path: '/guide',
    components: [_guide2.default]
  }]
});

/***/ }),
/* 16 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__list_js__ = __webpack_require__(17);
/* harmony namespace reexport (by used) */ __webpack_require__.d(__webpack_exports__, "a", function() { return __WEBPACK_IMPORTED_MODULE_0__list_js__["a"]; });


/***/ }),
/* 17 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
const symbolPrefix = '__ozjs-list-tag-prop-symbol__';
const symbols = [];

const list = new Proxy((strArr, ...args) => list => {
  let resolvedSymbols = [];
  let listResult = list.map((elem, elemIndex) => {
    return strArr.map((str, index) => {
      if (!args[index]) return str;
      let result = str;
      if (typeof args[index] === 'symbol' && symbols.includes(args[index])) {
        result += elem[Symbol.keyFor(args[index]).slice(symbolPrefix.length)];
        resolvedSymbols.push(args[index]);
      } else if (args[index] && index !== 'raw') {
        result += args[index];
      }
      return result;
    }).join('');
  }).join('');
  resolvedSymbols.map(symbol => symbols.splice(symbols.indexOf(symbol, 1)));
  return listResult;
}, {
  get(target, prop, receiver) {
    let symbol = Symbol.for(symbolPrefix + prop);
    symbols.push(symbol);
    return symbol;
  }
});
/* harmony export (immutable) */ __webpack_exports__["a"] = list;


/***/ }),
/* 18 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__element_js__ = __webpack_require__(5);
/* harmony namespace reexport (by used) */ __webpack_require__.d(__webpack_exports__, "a", function() { return __WEBPACK_IMPORTED_MODULE_0__element_js__["a"]; });
/* harmony namespace reexport (by used) */ __webpack_require__.d(__webpack_exports__, "b", function() { return __WEBPACK_IMPORTED_MODULE_0__element_js__["b"]; });
/* harmony namespace reexport (by used) */ __webpack_require__.d(__webpack_exports__, "e", function() { return __WEBPACK_IMPORTED_MODULE_0__element_js__["c"]; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__router_link_js__ = __webpack_require__(19);
/* harmony namespace reexport (by used) */ __webpack_require__.d(__webpack_exports__, "c", function() { return __WEBPACK_IMPORTED_MODULE_1__router_link_js__["a"]; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__router_view_js__ = __webpack_require__(22);
/* harmony namespace reexport (by used) */ __webpack_require__.d(__webpack_exports__, "d", function() { return __WEBPACK_IMPORTED_MODULE_2__router_view_js__["a"]; });




/***/ }),
/* 19 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__element_js__ = __webpack_require__(5);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__template_html_js__ = __webpack_require__(3);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__template_css_js__ = __webpack_require__(8);




class RouterLink extends __WEBPACK_IMPORTED_MODULE_0__element_js__["a" /* Element */] {
  constructor(href, router) {
    super({ shadowDom: 'open' });
    this.router = router;
    this.href = href;
    this.addEventListener('click', ev => {
      if (!this.router) throw new Error('No router defined for this router-link');
      this.router.push(this.href);
    });
  }

  static get observedAttributes() {
    return ['href'];
  }

  attributeChangedCallback(attr, oldValue, newValue) {
    if (attr === 'href') this.href = newValue;
  }

  static template() {
    return __WEBPACK_IMPORTED_MODULE_1__template_html_js__["a" /* html */]`<slot></slot>`;
  }

  static style() {
    return __WEBPACK_IMPORTED_MODULE_2__template_css_js__["a" /* css */]`
    :host {
      cursor: pointer;
    }
    `;
  }

  set href(href) {
    this._href = href;
  }

  get href() {
    return this._href;
  }
}
/* harmony export (immutable) */ __webpack_exports__["a"] = RouterLink;


/***/ }),
/* 20 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (immutable) */ __webpack_exports__["a"] = htmlTemplate;
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__utils_js__ = __webpack_require__(6);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__html_js__ = __webpack_require__(3);
/* unused harmony namespace reexport */




const isInstance = value => value.hasOwnProperty('id') && value.hasOwnProperty('values') && value.hasOwnProperty('update') && value.hasOwnProperty('content') && value.hasOwnProperty('childNodes') && value.hasOwnProperty('_childNodes');
/* unused harmony export isInstance */


const deconstructArray = arr => {
  for (const item of arr) {
    if (Array.isArray(item)) arr.splice(arr.indexOf(item), 1, ...item);
  }
  return arr;
};

function getNodePath(node) {
  let path = [];
  let parent = node.parentNode;
  if (parent) {
    while (parent) {
      path.push([...parent.childNodes].indexOf(node));
      node = parent;
      parent = node.parentNode;
    }
  } else {
    let index = 0;
    let previousNode = node.previousSibling;
    while (previousNode) {
      index++;
      previousNode = node.previousSibling;
    }
    path.push(index);
  }
  return path.reverse();
}

const getNode = (path, rootNode) => path.reduce((currNode, i) => currNode.childNodes.item(i), rootNode);

function setPlaceholdersPaths(node, placeholders, pointerArray, values) {
  const walker = document.createTreeWalker(node, NodeFilter.SHOW_COMMENT + NodeFilter.SHOW_TEXT, null, false);
  const nodes = new Map();
  while (walker.nextNode()) {
    const currentNode = walker.currentNode;
    const match = currentNode.nodeValue.match(__WEBPACK_IMPORTED_MODULE_0__utils_js__["g" /* placeholderRegex */]);
    if (match) {
      if (currentNode.nodeType === Node.TEXT_NODE) {
        const placeholderNode = currentNode.splitText(match.index);
        nodes.set(pointerArray[match[1]], placeholderNode);
        placeholderNode.nodeValue = placeholderNode.nodeValue.substring(match[0].length);
        placeholderNode.splitText(0);
      } else if (currentNode.nodeType === Node.COMMENT_NODE) {
        nodes.set(pointerArray[match[1]], currentNode);
      }
    }
  }
  for (const [placeholder, node] of nodes) {
    placeholder.path = getNodePath(node);
  }
  for (const placeholder of placeholders) {
    const type = placeholder.type;
    if (type === 'attribute' || type === 'property' || type === 'startTagName') {
      const attributeName = Object(__WEBPACK_IMPORTED_MODULE_0__utils_js__["i" /* placeholderStr */])(placeholder.ids[0]);
      const foundNode = node.querySelector(`[${attributeName}]`);
      foundNode.removeAttribute(attributeName);
      placeholder.path = getNodePath(foundNode);
    }
  }
}

function htmlTemplate(parser, options) {
  const cache = new Map();
  return (strings, ...values) => {
    const id = __WEBPACK_IMPORTED_MODULE_0__utils_js__["a" /* envCachesTemplates */] ? strings : strings.join(Object(__WEBPACK_IMPORTED_MODULE_0__utils_js__["i" /* placeholderStr */])(''));
    const cached = cache.get(id);
    if (cached) return cached(...values);
    const { placeholders, html } = parser(strings, values, {
      placeholderStr: __WEBPACK_IMPORTED_MODULE_0__utils_js__["i" /* placeholderStr */],
      placeholderRegex: __WEBPACK_IMPORTED_MODULE_0__utils_js__["g" /* placeholderRegex */],
      placeholderRegexGlobal: __WEBPACK_IMPORTED_MODULE_0__utils_js__["h" /* placeholderRegexGlobal */],
      split: __WEBPACK_IMPORTED_MODULE_0__utils_js__["j" /* split */],
      getSplitIds: __WEBPACK_IMPORTED_MODULE_0__utils_js__["c" /* getSplitIds */],
      execSplit: __WEBPACK_IMPORTED_MODULE_0__utils_js__["b" /* execSplit */],
      joinSrcWithPlaceholders: __WEBPACK_IMPORTED_MODULE_0__utils_js__["f" /* joinSrcWithPlaceholders */]
    });
    const pointerArray = Object(__WEBPACK_IMPORTED_MODULE_0__utils_js__["d" /* indexToPlaceholder */])(placeholders);
    const template = document.createElement('template');
    template.innerHTML = html;
    setPlaceholdersPaths(template.content, placeholders, pointerArray, values);
    const createCachedInstance = (...values) => {
      const createInstance = _ => {
        const docFrag = document.importNode(template.content, true);
        const childNodes = [...docFrag.childNodes];
        const placeholdersInstances = new Map();
        const instance = {
          id,
          values: [],
          update(...values) {
            const dif = Object(__WEBPACK_IMPORTED_MODULE_0__utils_js__["k" /* valuesDif */])(values, this.values);
            this.values = values;
            let updated = [];
            for (const index of dif) {
              const placeholder = pointerArray[index];
              const placeholderInstance = placeholdersInstances.get(placeholder);
              const value = values[index];
              if (typeof value === 'function' && placeholder.type !== 'property' && !Object(__WEBPACK_IMPORTED_MODULE_0__utils_js__["e" /* isBuild */])(value)) {
                value(val => {
                  const { instance } = placeholderInstance;
                  const vals = [...instance.values];
                  vals[index] = val;
                  instance.update(...vals);
                });
                return;
              }
              if (updated.includes(placeholder)) continue;
              updated.push(placeholder);
              switch (placeholder.type) {
                case 'attribute':
                  updateAttribute(placeholderInstance, values, index);
                  break;
                case 'property':
                  updateProperty(placeholderInstance, values, index);
                  break;
                case 'text':
                  updateText(placeholderInstance, values, childNodes, index);
                  break;
                case 'startTagName':
                  const dependents = placeholder.dependents || [];
                  updated = [...updated, ...dependents];
                  const dependentsInstances = [];
                  for (const dependent of dependents) {
                    dependentsInstances.push(placeholdersInstances.get(dependent));
                  }
                  updateElement(placeholderInstance, values, childNodes, dependentsInstances, index);
                  break;
                case 'comment':
                  updateComment(placeholderInstance, values, index);
                  break;
              }
            }
          },
          _childNodes: childNodes,
          get childNodes() {
            return deconstructArray(this._childNodes);
          },
          get content() {
            for (const node of this.childNodes) docFrag.appendChild(node);
            return docFrag;
          },
          __reactivity__: false
        };
        for (const placeholder of placeholders) {
          const isText = placeholder.type === 'text';
          let node = getNode(placeholder.path, docFrag);
          if (isText) {
            node = [node];
            const firstNodeIndex = childNodes.indexOf(node[0]);
            if (firstNodeIndex !== -1) childNodes.splice(firstNodeIndex, 1, node);
          }
          placeholdersInstances.set(placeholder, {
            instance,
            placeholder,
            node,
            values: {}
          });
        }
        instance.update(...values);
        return instance;
      };
      createInstance.id = id;
      createInstance.values = values;
      return createInstance;
    };
    cache.set(id, createCachedInstance);
    return createCachedInstance(...values);
  };
}

function updateElement(placeholderInstance, values, childNodes, dependentsInstances, index) {
  const { placeholder, node } = placeholderInstance;
  const { splits } = placeholder;
  // const instanceValues = placeholderInstance.values
  const newTagName = Object(__WEBPACK_IMPORTED_MODULE_0__utils_js__["b" /* execSplit */])(splits[0], values);
  // instanceValues.name = newTagName
  const newElem = document.createElement(newTagName);
  const parent = node.parentNode;
  placeholderInstance.node = newElem;
  if (parent) {
    parent.insertBefore(newElem, node);
    parent.removeChild(node);
  }
  if (node.hasAttributes()) {
    for (const _ref of node.attributes) {
      const { name, value } = _ref;

      newElem.setAttribute(name, value);
    }
  }
  const nodeIndex = childNodes.indexOf(node);
  if (nodeIndex !== -1) childNodes.splice(nodeIndex, 1, newElem);
  while (node.firstChild) newElem.appendChild(node.firstChild);
  for (const dependentInstance of dependentsInstances) {
    dependentInstance.node = newElem;
    if (dependentInstance.placeholder.type === 'attribute') {
      updateAttribute(dependentInstance, values);
    } else if (dependentInstance.placeholder.type === 'property') {
      updateProperty(dependentInstance, values);
    }
  }
}

function updateAttribute(placeholderInstance, values, index) {
  const { placeholder, node } = placeholderInstance;
  const { splits } = placeholder;
  const instanceValues = placeholderInstance.values;
  const oldName = instanceValues.name;
  const newAttributeName = Object(__WEBPACK_IMPORTED_MODULE_0__utils_js__["b" /* execSplit */])(splits[0], values);
  const newAttributeValue = Object(__WEBPACK_IMPORTED_MODULE_0__utils_js__["b" /* execSplit */])(splits[1], values);
  if (oldName && oldName !== newAttributeName) node.removeAttribute(oldName);
  instanceValues.name = newAttributeName;
  node.setAttribute(newAttributeName, newAttributeValue);
}

const updateProperty = (placeholderInstance, values, index) => {
  const { placeholder, node } = placeholderInstance;
  const { splits } = placeholder;
  const instanceValues = placeholderInstance.values;
  if (instanceValues.listenerName && instanceValues.propValue) {
    node.removeEventListener(instanceValues.listenerName, instanceValues.propValue);
    instanceValues.listenerName = null;
    instanceValues.propValue = null;
  }
  const propName = Object(__WEBPACK_IMPORTED_MODULE_0__utils_js__["b" /* execSplit */])(splits[0], values);
  const propValue = values[splits[1][1]];
  let isEvent = propName.startsWith('on-') ? 1 : propName.startsWith('@') ? 2 : 0;
  if (isEvent) {
    // Event handling
    const listenerName = propName.substring(isEvent === 1 ? 3 : 1);
    node.addEventListener(listenerName, propValue);
    instanceValues.listenerName = listenerName;
    instanceValues.propValue = propValue;
  } else {
    node[propName] = propValue;
  }
};

const updateComment = (placeholderInstance, values, index) => {
  const { placeholder, node } = placeholderInstance;
  const { splits } = placeholder;
  node.nodeValue = Object(__WEBPACK_IMPORTED_MODULE_0__utils_js__["b" /* execSplit */])(splits[0], values);
};

const textNewNodes = (instanceValues, value, index) => {
  const oldValue = instanceValues.value;
  instanceValues.value = value;
  let nodes = [];
  switch (typeof value) {
    case 'string':
      nodes = [new Text(value)];
      break;
    case 'number':
      nodes = [new Text(value)];
      break;
    case 'object':
      if (value instanceof Node) {
        nodes = [value];
      } else if (Array.isArray(value)) {
        instanceValues.arrValues = {};
        for (const val of value) {
          nodes = [...nodes, ...textNewNodes(instanceValues.arrValues, val)];
        }
      } else if (value === null) {
        nodes = [new Comment('')];
      }
      break;
    case 'function':
      if (Object(__WEBPACK_IMPORTED_MODULE_0__utils_js__["e" /* isBuild */])(value)) {
        const build = value;
        if (oldValue && isInstance(oldValue) && oldValue.id === build.id) {
          oldValue.update(...build.values);
          nodes = oldValue._childNodes;
        } else {
          const instance = build();
          instanceValues.value = instance;
          nodes = instance._childNodes;
        }
      } else {}
      break;
    default:
      nodes = [new Comment('')];
      break;
  }
  return nodes;
};

const updateText = (placeholderInstance, values, childNodes, index) => {
  const { placeholder } = placeholderInstance;
  const { splits } = placeholder;
  const instanceValues = placeholderInstance.values;
  const currentNodes = placeholderInstance.node;
  const value = values[splits[0][1]];
  let firstCurrentChild = currentNodes[0];
  let firstCurrentChildParent = firstCurrentChild.parentNode;
  let newNodes = textNewNodes(instanceValues, value);
  const currentNodesIndex = childNodes.indexOf(currentNodes);
  if (currentNodesIndex !== -1) childNodes.splice(currentNodesIndex, 1, newNodes);
  const nodesToKeep = [];
  firstCurrentChild = currentNodes[0];
  firstCurrentChildParent = firstCurrentChild.parentNode;
  for (const node of deconstructArray(newNodes)) {
    if (currentNodes.includes(node)) nodesToKeep.push(node);
    if (firstCurrentChildParent) firstCurrentChildParent.insertBefore(node, firstCurrentChild);
  }
  for (const node of currentNodes) {
    if (nodesToKeep.includes(node)) continue;
    if (node.parentNode) node.parentNode.removeChild(node);
  }
  placeholderInstance.node = newNodes;
};

/***/ }),
/* 21 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__utils_js__ = __webpack_require__(6);


async function setPlaceholdersPaths(sheet, placeholders, values) {
  const rules = sheet.cssRules;
  const arrRules = [...rules];
  for (const rulesI in arrRules) {
    const rule = arrRules[rulesI];
    if (!rule.cssText.includes('var(--oz-template-placeholder-')) continue;
    for (const style of rule.style) {
      const val = rule.style[style];
      if (rule.cssText.includes('var(--oz-template-placeholder-')) {
        const valSplit = Object(__WEBPACK_IMPORTED_MODULE_0__utils_js__["j" /* split */])(val);
        placeholders.push({
          type: 'value',
          ids: Object(__WEBPACK_IMPORTED_MODULE_0__utils_js__["c" /* getSplitIds */])(valSplit),
          path: ['rules', rulesI, 'style', style],
          split: valSplit
        });
      }
    }
  }
}

const getStyle = (path, sheet) => path.reduce((item, i) => item[i], sheet);

const cssTemplate = (parser, options) => {
  const cache = new Map();
  return (strings, ...values) => {
    const id = __WEBPACK_IMPORTED_MODULE_0__utils_js__["a" /* envCachesTemplates */] ? strings : strings.join(Object(__WEBPACK_IMPORTED_MODULE_0__utils_js__["i" /* placeholderStr */])(''));
    const cached = cache.get(id);
    if (cached) return cached(...values);
    const { css } = parser(strings, values, {
      placeholderStr: __WEBPACK_IMPORTED_MODULE_0__utils_js__["i" /* placeholderStr */],
      placeholderRegex: __WEBPACK_IMPORTED_MODULE_0__utils_js__["g" /* placeholderRegex */],
      placeholderRegexGlobal: __WEBPACK_IMPORTED_MODULE_0__utils_js__["h" /* placeholderRegexGlobal */],
      split: __WEBPACK_IMPORTED_MODULE_0__utils_js__["j" /* split */],
      getSplitIds: __WEBPACK_IMPORTED_MODULE_0__utils_js__["c" /* getSplitIds */],
      execSplit: __WEBPACK_IMPORTED_MODULE_0__utils_js__["b" /* execSplit */],
      joinSrcWithPlaceholders: __WEBPACK_IMPORTED_MODULE_0__utils_js__["f" /* joinSrcWithPlaceholders */]
    });
    const placeholders = [];
    const style = document.createElement('style');
    style.type = 'text/css';
    style.innerHTML = css;
    document.body.appendChild(style);
    setPlaceholdersPaths(style.sheet, placeholders, values); // setPlaceholdersPaths is async to make firefox gucci since they deal asynchronously with css parsing
    document.body.removeChild(style);
    const createCachedInstance = (...values) => {
      const createInstance = _ => {
        const node = style.cloneNode(true);
        const instance = {
          values: [],
          update(...values) {
            if (values.length) this.values = values;else values = this.values;
            const { sheet } = node;
            if (!sheet) return;
            for (const placeholder of placeholders) {
              const path = [...placeholder.path];
              const name = path.splice(-1, 1);
              let styleDeclaration = getStyle(path, sheet);
              switch (placeholder.type) {
                case 'value':
                  styleDeclaration[name] = Object(__WEBPACK_IMPORTED_MODULE_0__utils_js__["b" /* execSplit */])(placeholder.split, values).slice(6, -1);
                  break;
              }
            }
          },
          content: node
        };
        instance.update(...values);
        return instance;
      };
      createInstance.id = id;
      createInstance.values = values;
      return createInstance;
    };
    cache.set(id, createCachedInstance);
    return createCachedInstance(...values);
  };
};
/* harmony export (immutable) */ __webpack_exports__["a"] = cssTemplate;


/***/ }),
/* 22 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__element_js__ = __webpack_require__(5);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__template_html_js__ = __webpack_require__(3);



const nthRouterView = routerView => {
  let nth = 0;
  let elem = routerView.parentElement;
  while (elem) {
    if (elem instanceof RouterView && elem.router === routerView.router) nth++;
    elem = elem.parentElement;
  }
  return nth;
};

const getRouteConfigNthParent = (routeConfig, nth) => {
  let elem = routeConfig;
  while (nth) {
    elem = elem.parent;
    nth--;
  }
  return elem;
};

const template = ({ state: { components } }) => {
  const elems = [];
  if (components) {
    for (const Component of components) elems.push(new (customElements.get(Component.name))());
  }
  return __WEBPACK_IMPORTED_MODULE_1__template_html_js__["a" /* html */]`${elems.length ? elems : ''}`;
};

const RouterView = customElements.get('router-view') || Object(__WEBPACK_IMPORTED_MODULE_0__element_js__["c" /* registerElement */])({
  name: 'router-view',
  template,
  state: ctx => ({
    get components() {
      const { router, host } = ctx;
      return router && router.currentRoute.matched && getRouteConfigNthParent(router.currentRoute.matched.components, nthRouterView(host));
    }
  }),
  props: ['$router']
});
/* harmony export (immutable) */ __webpack_exports__["a"] = RouterView;


/***/ }),
/* 23 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__reactivity_index_js__ = __webpack_require__(4);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__libs_path_to_regexp_js__ = __webpack_require__(24);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__util_index_js__ = __webpack_require__(2);




const flattenRoutes = (routes, __path = '', parent) => {
  let map = new Map();
  for (const route of routes) {
    const { path, children } = route;
    const childPath = __path + path;
    const keys = [];
    const _route = Object.assign({}, Object(__WEBPACK_IMPORTED_MODULE_2__util_index_js__["c" /* cloneObject */])(route), parent && { parent }, { keys, regex: Object(__WEBPACK_IMPORTED_MODULE_1__libs_path_to_regexp_js__["a" /* default */])(childPath, keys) });
    map.set(childPath, _route);
    if (children) {
      for (const [_path, child] of flattenRoutes(children, childPath, _route)) {
        map.set(_path, child);
      }
    }
  }
  return map;
};

const Router = class OzRouter {
  constructor(config = {}, options = {}) {
    this.config = config;
    this.options = options;
    this.routes = config.routes ? flattenRoutes(config.routes) : new Map();
    this.fullPath = location.href;
    this.push(location.href);
    return Object(__WEBPACK_IMPORTED_MODULE_0__reactivity_index_js__["d" /* reactify */])(this);
  }

  get url() {
    return new URL(this.fullPath);
  }

  get path() {
    return this.url.pathname;
  }

  get hash() {
    return this.url.hash;
  }

  get query() {
    const query = {};
    for (const [key, value] of this.url.searchParams) query[key] = value;
    return query;
  }

  get params() {
    for (const [, route] of this.routes) {
      const match = route.regex.exec(this.url.pathname);
      if (match) {
        const params = {};
        for (const i in route.keys) {
          const key = route.keys[i];
          params[key.name] = match[i + 1];
        }
        return params;
      }
    }
  }

  get matched() {
    for (const [, route] of this.routes) {
      const match = route.regex.exec(this.url.pathname);
      if (match) return route;
    }
  }

  get name() {
    return this.matched.name;
  }

  get currentRoute() {
    const { path, fullPath, query, params, hash, matched, name } = this;
    return { path, fullPath, query, params, hash, matched, name };
  }

  match(url) {}

  back() {
    return this.go(-1);
  }

  forward() {
    return this.go(1);
  }

  go(num) {
    return window.history.go(num);
  }

  push(url) {
    const result = window.history.pushState({}, '', url);
    this.fullPath = location.href;
    return result;
  }

  replace(url) {
    return window.history.replaceState({}, '', url);
  }
};
/* harmony export (immutable) */ __webpack_exports__["a"] = Router;


/***/ }),
/* 24 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* unused harmony export parse */
/* unused harmony export compile */
/* unused harmony export tokensToFunction */
/* unused harmony export tokensToRegExp */
/*
The MIT License (MIT)

Copyright (c) 2014 Blake Embrey (hello@blakeembrey.com)

Permission is hereby granted, free of charge, to any person obtaining a copy
of this software and associated documentation files (the "Software"), to deal
in the Software without restriction, including without limitation the rights
to use, copy, modify, merge, publish, distribute, sublicense, and/or sell
copies of the Software, and to permit persons to whom the Software is
furnished to do so, subject to the following conditions:

The above copyright notice and this permission notice shall be included in
all copies or substantial portions of the Software.

THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN
THE SOFTWARE.
*/

// v2.1.0

/**
 * Expose `pathToRegexp`.
 */
/* harmony default export */ __webpack_exports__["a"] = (pathToRegexp);


/**
 * Default configs.
 */
var DEFAULT_DELIMITER = '/';
var DEFAULT_DELIMITERS = './';

/**
 * The main path matching regexp utility.
 *
 * @type {RegExp}
 */
var PATH_REGEXP = new RegExp([
// Match escaped characters that would otherwise appear in future matches.
// This allows the user to escape special characters that won't transform.
'(\\\\.)',
// Match Express-style parameters and un-named parameters with a prefix
// and optional suffixes. Matches appear as:
//
// "/:test(\\d+)?" => ["/", "test", "\d+", undefined, "?"]
// "/route(\\d+)"  => [undefined, undefined, undefined, "\d+", undefined]
'(?:\\:(\\w+)(?:\\(((?:\\\\.|[^\\\\()])+)\\))?|\\(((?:\\\\.|[^\\\\()])+)\\))([+*?])?'].join('|'), 'g');

/**
 * Parse a string for the raw tokens.
 *
 * @param  {string}  str
 * @param  {Object=} options
 * @return {!Array}
 */
function parse(str, options) {
  var tokens = [];
  var key = 0;
  var index = 0;
  var path = '';
  var defaultDelimiter = options && options.delimiter || DEFAULT_DELIMITER;
  var delimiters = options && options.delimiters || DEFAULT_DELIMITERS;
  var pathEscaped = false;
  var res;

  while ((res = PATH_REGEXP.exec(str)) !== null) {
    var m = res[0];
    var escaped = res[1];
    var offset = res.index;
    path += str.slice(index, offset);
    index = offset + m.length;

    // Ignore already escaped sequences.
    if (escaped) {
      path += escaped[1];
      pathEscaped = true;
      continue;
    }

    var prev = '';
    var next = str[index];
    var name = res[2];
    var capture = res[3];
    var group = res[4];
    var modifier = res[5];

    if (!pathEscaped && path.length) {
      var k = path.length - 1;

      if (delimiters.indexOf(path[k]) > -1) {
        prev = path[k];
        path = path.slice(0, k);
      }
    }

    // Push the current path onto the tokens.
    if (path) {
      tokens.push(path);
      path = '';
      pathEscaped = false;
    }

    var partial = prev !== '' && next !== undefined && next !== prev;
    var repeat = modifier === '+' || modifier === '*';
    var optional = modifier === '?' || modifier === '*';
    var delimiter = prev || defaultDelimiter;
    var pattern = capture || group;

    tokens.push({
      name: name || key++,
      prefix: prev,
      delimiter: delimiter,
      optional: optional,
      repeat: repeat,
      partial: partial,
      pattern: pattern ? escapeGroup(pattern) : '[^' + escapeString(delimiter) + ']+?'
    });
  }

  // Push any remaining characters.
  if (path || index < str.length) {
    tokens.push(path + str.substr(index));
  }

  return tokens;
}

/**
 * Compile a string to a template function for the path.
 *
 * @param  {string}             str
 * @param  {Object=}            options
 * @return {!function(Object=, Object=)}
 */
function compile(str, options) {
  return tokensToFunction(parse(str, options));
}

/**
 * Expose a method for transforming tokens into the path function.
 */
function tokensToFunction(tokens) {
  // Compile all the tokens into regexps.
  var matches = new Array(tokens.length);

  // Compile all the patterns before compilation.
  for (var i = 0; i < tokens.length; i++) {
    if (typeof tokens[i] === 'object') {
      matches[i] = new RegExp('^(?:' + tokens[i].pattern + ')$');
    }
  }

  return function (data, options) {
    var path = '';
    var encode = options && options.encode || encodeURIComponent;

    for (var i = 0; i < tokens.length; i++) {
      var token = tokens[i];

      if (typeof token === 'string') {
        path += token;
        continue;
      }

      var value = data ? data[token.name] : undefined;
      var segment;

      if (Array.isArray(value)) {
        if (!token.repeat) {
          throw new TypeError('Expected "' + token.name + '" to not repeat, but got array');
        }

        if (value.length === 0) {
          if (token.optional) continue;

          throw new TypeError('Expected "' + token.name + '" to not be empty');
        }

        for (var j = 0; j < value.length; j++) {
          segment = encode(value[j]);

          if (!matches[i].test(segment)) {
            throw new TypeError('Expected all "' + token.name + '" to match "' + token.pattern + '"');
          }

          path += (j === 0 ? token.prefix : token.delimiter) + segment;
        }

        continue;
      }

      if (typeof value === 'string' || typeof value === 'number' || typeof value === 'boolean') {
        segment = encode(String(value));

        if (!matches[i].test(segment)) {
          throw new TypeError('Expected "' + token.name + '" to match "' + token.pattern + '", but got "' + segment + '"');
        }

        path += token.prefix + segment;
        continue;
      }

      if (token.optional) {
        // Prepend partial segment prefixes.
        if (token.partial) path += token.prefix;

        continue;
      }

      throw new TypeError('Expected "' + token.name + '" to be ' + (token.repeat ? 'an array' : 'a string'));
    }

    return path;
  };
}

/**
 * Escape a regular expression string.
 *
 * @param  {string} str
 * @return {string}
 */
function escapeString(str) {
  return str.replace(/([.+*?=^!:${}()[\]|/\\])/g, '\\$1');
}

/**
 * Escape the capturing group by escaping special characters and meaning.
 *
 * @param  {string} group
 * @return {string}
 */
function escapeGroup(group) {
  return group.replace(/([=!:$/()])/g, '\\$1');
}

/**
 * Get the flags for a regexp from the options.
 *
 * @param  {Object} options
 * @return {string}
 */
function flags(options) {
  return options && options.sensitive ? '' : 'i';
}

/**
 * Pull out keys from a regexp.
 *
 * @param  {!RegExp} path
 * @param  {Array=}  keys
 * @return {!RegExp}
 */
function regexpToRegexp(path, keys) {
  if (!keys) return path;

  // Use a negative lookahead to match only capturing groups.
  var groups = path.source.match(/\((?!\?)/g);

  if (groups) {
    for (var i = 0; i < groups.length; i++) {
      keys.push({
        name: i,
        prefix: null,
        delimiter: null,
        optional: false,
        repeat: false,
        partial: false,
        pattern: null
      });
    }
  }

  return path;
}

/**
 * Transform an array into a regexp.
 *
 * @param  {!Array}  path
 * @param  {Array=}  keys
 * @param  {Object=} options
 * @return {!RegExp}
 */
function arrayToRegexp(path, keys, options) {
  var parts = [];

  for (var i = 0; i < path.length; i++) {
    parts.push(pathToRegexp(path[i], keys, options).source);
  }

  return new RegExp('(?:' + parts.join('|') + ')', flags(options));
}

/**
 * Create a path regexp from string input.
 *
 * @param  {string}  path
 * @param  {Array=}  keys
 * @param  {Object=} options
 * @return {!RegExp}
 */
function stringToRegexp(path, keys, options) {
  return tokensToRegExp(parse(path, options), keys, options);
}

/**
 * Expose a function for taking tokens and returning a RegExp.
 *
 * @param  {!Array}  tokens
 * @param  {Array=}  keys
 * @param  {Object=} options
 * @return {!RegExp}
 */
function tokensToRegExp(tokens, keys, options) {
  options = options || {};

  var strict = options.strict;
  var end = options.end !== false;
  var delimiter = escapeString(options.delimiter || DEFAULT_DELIMITER);
  var delimiters = options.delimiters || DEFAULT_DELIMITERS;
  var endsWith = [].concat(options.endsWith || []).map(escapeString).concat('$').join('|');
  var route = '';
  var isEndDelimited = false;

  // Iterate over the tokens and create our regexp string.
  for (var i = 0; i < tokens.length; i++) {
    var token = tokens[i];

    if (typeof token === 'string') {
      route += escapeString(token);
      isEndDelimited = i === tokens.length - 1 && delimiters.indexOf(token[token.length - 1]) > -1;
    } else {
      var prefix = escapeString(token.prefix);
      var capture = token.repeat ? '(?:' + token.pattern + ')(?:' + prefix + '(?:' + token.pattern + '))*' : token.pattern;

      if (keys) keys.push(token);

      if (token.optional) {
        if (token.partial) {
          route += prefix + '(' + capture + ')?';
        } else {
          route += '(?:' + prefix + '(' + capture + '))?';
        }
      } else {
        route += prefix + '(' + capture + ')';
      }
    }
  }

  if (end) {
    if (!strict) route += '(?:' + delimiter + ')?';

    route += endsWith === '$' ? '$' : '(?=' + endsWith + ')';
  } else {
    if (!strict) route += '(?:' + delimiter + '(?=' + endsWith + '))?';
    if (!isEndDelimited) route += '(?=' + delimiter + '|' + endsWith + ')';
  }

  return new RegExp('^' + route, flags(options));
}

/**
 * Normalize the given path string, returning a regular expression.
 *
 * An empty array can be passed in for the keys, which will hold the
 * placeholder key descriptions. For example, using `/user/:id`, `keys` will
 * contain `[{ name: 'id', delimiter: '/', optional: false, repeat: false }]`.
 *
 * @param  {(string|RegExp|Array)} path
 * @param  {Array=}                keys
 * @param  {Object=}               options
 * @return {!RegExp}
 */
function pathToRegexp(path, keys, options) {
  if (path instanceof RegExp) {
    return regexpToRegexp(path, keys);
  }

  if (Array.isArray(path)) {
    return arrayToRegexp( /** @type {!Array} */path, keys, options);
  }

  return stringToRegexp( /** @type {string} */path, keys, options);
}

/***/ }),
/* 25 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__html_js__ = __webpack_require__(3);
/* harmony namespace reexport (by used) */ __webpack_require__.d(__webpack_exports__, "b", function() { return __WEBPACK_IMPORTED_MODULE_0__html_js__["a"]; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__css_js__ = __webpack_require__(8);
/* harmony namespace reexport (by used) */ __webpack_require__.d(__webpack_exports__, "a", function() { return __WEBPACK_IMPORTED_MODULE_1__css_js__["a"]; });



/***/ }),
/* 26 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});

var _oz = __webpack_require__(1);

exports.default = (0, _oz.registerElement)({
  name: 'app-mount',
  template() {
    return _oz.html`<router-view></router-view>`;
  },
  style() {
    return _oz.css`
    @import url('https://fonts.googleapis.com/css?family=News+Cycle');
    @import url('https://fonts.googleapis.com/css?family=Roboto:100,300,400,700');
    @import url('https://fonts.googleapis.com/icon?family=Material+Icons');
    
    html {
      font-size: 62.5%;
      height: 100%;
      width: 100%;
      background-color: #0f0f0f/*#151a1e #262d33*/;
    }
    
    body {
      font-size: 1.5rem;
      height: 100%;
      width: 100%;
      margin: 0;
      font-family: "Source Sans Pro", "Helvetica Neue", Arial, sans-serif;
    }
    
    app-mount {
      height: 100%;
      width: 100%;
      display: inline-block;
    }
    `;
  }
});

/***/ }),
/* 27 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});

var _oz = __webpack_require__(1);

class Header extends _oz.Element {
  constructor() {
    super({ shadowDom: 'open' });
  }

  static template() {
    return _oz.html`
    <router-link href="/" id="logo">
      <img src="/assets/logo.svg">
      <span>Oz.js</span>
    </router-link>
    <router-link href="/guide">
      <span>Guide</span>
    </router-link>
    `;
  }

  static style() {
    return _oz.css`
    :host {
      height: 6rem;
      width: 100%;
      color: #2c3e50;
      border-bottom: 1px solid rgba(0,0,0,0.14);
      display: flex;
      align-items: center;
    }

    #logo {
      display: flex;
      align-items: center;
      margin-left: 2rem;
    }

    #logo img {
      height: 4rem;
      width: 4rem;
    }

    #logo span {
      font-family: "News Cycle";
      font-size: 2.25rem;
      margin-left: .5rem;
    }
    `;
  }
}
exports.default = Header;
customElements.define('app-header', Header);

/***/ }),
/* 28 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
/* WEBPACK VAR INJECTION */(function(process) {

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.OzCodeErrorEvent = undefined;

var _oz = __webpack_require__(1);

var _caret = __webpack_require__(29);

__webpack_require__(30);

__webpack_require__(31);

/* global Prism */

const style = _ => _oz.css`
@import url('/assets/client/libs/prism.css');

:host {
  display: inline-flex;
}

oz-code { /* firefox fixes */
  display: inline-flex;
}
oz-code code {
  padding: 1rem;
}
:host code {
  padding: 1rem;
}  /* firefox fixes */

code {
  position: relative;
  text-shadow: none !important;
  outline: none;
  background-color: #151a1e !important;
  border-radius: 1rem;
  white-space: pre-wrap !important;
  border-bottom-right-radius: 1rem;
  border-top-right-radius: 1rem;
}

code[contenteditable=""]::after, code[contenteditable="true"]::after {
  content: "live editor";
  position: absolute;
  top: 0;
  right: .5rem;
  color: #a5a5a5;
  font-size: 1.3rem;
}

.error {
  color: #a91000/*#740b00*/;
}

code.extended {
  flex: 0 0 100%;
}

code.compact {
  flex: none;
  padding: .25rem;
  border-radius: .25rem;
  border-bottom-right-radius: .25rem;
  border-top-right-radius: .25rem;
}

code.result {
  display: inline-block;
  width: calc(70% - 4 * 1rem);
  /* flex: 0 0 calc(70% - calc(4 * 1rem)); */
  border-bottom-right-radius: 0;
  border-top-right-radius: 0;
  word-wrap: break-word;
}

code.result.external {
  border-bottom-right-radius: 1rem;
  border-top-right-radius: 1rem;
}

div.result {
  display: inline-block;
  /* flex: 0 0 calc(30% - calc(4 * 1rem)); */
  background-color: rgb(200, 200, 200);
  border-bottom-right-radius: 1rem;
  border-top-right-radius: 1rem;
  padding: 1rem;
}

@media screen and (max-width: 950px) {
  oz-code{ /* firefox fix */
    flex-direction: column;
  }
  :host {
    flex-direction: column;
  }

  code.compact {
    border-bottom-right-radius: .25rem;
    border-top-right-radius: .25rem;
  }

  code.result {
    width: calc(100% - 2 * 1rem);
    border-bottom-left-radius: 0;
    border-bottom-right-radius: 0;
    border-top-right-radius: 1rem;
  }
  code.result.external {
    border-bottom-right-radius: 1rem;
    border-bottom-left-radius: 1rem;
  }

  div.result {
    border-top-right-radius: 0;
    border-top-left-radius: 0;
    border-bottom-right-radius: 1rem;
    border-bottom-left-radius: 1rem;
  }
}
`;

const template = ({ host, state, props: { language, value: pValue, editable, display, result } }) => {
  const { value = pValue, error, mountNode } = state;
  const code = document.createElement('div');
  if (value && Prism.languages[language]) code.innerHTML = Prism.highlight(value, Prism.languages[language]);
  let borderClass = '';
  if (result instanceof Node) borderClass = 'external';else borderClass = result ? 'result' : 'extended';
  return _oz.html`<code
    class="language-${language} ${borderClass} ${error ? 'error' : ''} ${display === 'compact' ? 'compact' : ''}"
    contenteditable="${editable ? '' : 'false'}"
    spellcheck="false"
    on-input=${editable ? ev => input(ev, { host, state }) : null}
    on-keydown=${editable ? keydown : null}
  >${code.childNodes.length ? [...code.childNodes] : ''}</code>
  ${typeof result === 'string' || error ? _oz.html`
  <div class="result ${error ? 'error' : ''}">
    ${error ? error.toString() : mountNode}
  </div>
  ` : ''}`;
};

const keydown = ev => {
  if (ev.keyCode === 9) {
    // Tab
    document.execCommand('insertHTML', false, '  ');
    ev.preventDefault();
  }
};

const input = (ev, { host, state }) => {
  const elem = ev.composedPath()[0];
  const offset = (0, _caret.caret)(host, elem);
  state.value = elem.textContent;
  (0, _caret.caret)(host, elem, offset);
};

const OzCodeErrorEvent = exports.OzCodeErrorEvent = new Event('error', { bubbles: true, composed: true });

exports.default = (0, _oz.registerElement)({
  name: 'oz-code',
  options: { shadowDom: 'open' },
  props: ['language', 'value', 'result', 'editable', 'display', 'html'],
  template,
  style,
  state: ({ host, props, watchers }) => ({
    error: undefined,
    value: undefined,
    ready: false,
    get mountNode() {
      const { result } = props;
      let node;
      if (result !== undefined) {
        if (result instanceof Node) {
          node = result;
        } else {
          node = document.createElement('iframe');
          node.setAttribute('frameborder', '0');
          node.classList.add('mountNode');
        }
        window.addEventListener('message', ev => {
          if (ev.source !== node.contentWindow) return;
          const offset = (0, _caret.caret)(host, host.querySelector('code'));
          this.error = ev.data;
          (0, _caret.caret)(host, host.querySelector('code'), offset);
        });
        node.addEventListener('load', _ => this.ready = true);
      }
      return node;
    }
  }),
  watchers: {
    resetValue({ state, props: { pValue } }) {
      state.value = pValue;
    },
    result({ host, state, props: { value: pValue, html } }) {
      const { value = pValue, mountNode, ready } = state;
      if (!mountNode || !value || !ready) return;
      try {
        // code awaiting for https://bugs.chromium.org/p/chromium/issues/detail?id=717715
        // mountNode.contentWindow.location.reload(true)
        // mountNode.contentDocument.open()
        // mountNode.contentDocument.write(`
        // <html>
        //   <head></head>
        //   <body>
        //     ${html}
        //     <script type="module">window.addEventListener('error', errorEvent => window.parent.postMessage(errorEvent.error.toString(), '*'))</script>
        //     <script type="module">${value}</script>
        //   </body>
        // </html>`)
        // mountNode.contentDocument.close()
        mountNode.srcdoc = `
        <html>
          <head></head>
          <body>
            ${html || ''}
            <script ${process && true ? '' : 'type="module"'}>window.addEventListener('error', errorEvent => window.parent.postMessage(errorEvent.error.toString(), '*'))</script>
            <script ${process && true ? '' : 'type="module"'}>${value}</script>
          </body>
        </html>`;
        state.error = undefined;
      } catch (err) {
        state.error = err;
        console.error(err);
        host.dispatchEvent(OzCodeErrorEvent);
      }
    }
  }
});
/* WEBPACK VAR INJECTION */}.call(exports, __webpack_require__(0)))

/***/ }),
/* 29 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});
const getSelection = host => host.getSelection ? host.getSelection() : window.getSelection();

const makeSelection = (host, range) => {
  let sel = getSelection(host);
  sel.removeAllRanges();
  sel.addRange(range);
};

const caret = exports.caret = (host, el, pos) => {
  const sel = getSelection(host);
  if (!pos) {
    const range = sel.getRangeAt(0);
    const clone = range.cloneRange();
    clone.selectNodeContents(el);
    clone.setEnd(range.endContainer, range.endOffset);
    const end = clone.toString().length;
    clone.setStart(range.startContainer, range.startOffset);
    return {
      start: end - clone.toString(),
      end,
      atStart: clone.startOffset === 0,
      commonAncestorContainer: clone.commonAncestorContainer,
      endContainer: clone.endContainer,
      startContainer: clone.startContainer
    };
  }
  let setSel = pos.end && pos.end !== pos.start;
  let length = 0;
  let startindex;
  let start = pos.start > el.textContent.length ? el.textContent.length : pos.start;
  let end = pos.end > el.textContent.length ? el.textContent.length : pos.end;
  let atStart = pos.atStart;
  let range = document.createRange();
  const walker = document.createTreeWalker(el, NodeFilter.SHOW_TEXT, null, false);
  while (walker.nextNode()) {
    let olen = length;
    const currentNode = walker.currentNode;
    length += currentNode.textContent.length;

    let atLength = atStart ? length > start : length >= start;
    if (!startindex && atLength) {
      startindex = true;
      range.setStart(currentNode, start - olen);
      if (!setSel) {
        range.collapse(true);
        makeSelection(host, range);
        break;
      }
    }

    if (setSel && length >= end) {
      range.setEnd(currentNode, end - olen);
      makeSelection(host, range);
      break;
    }
  }
};

/***/ }),
/* 30 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
/* WEBPACK VAR INJECTION */(function(global) {

/* PrismJS 1.9.0
http://prismjs.com/download.html?themes=prism&languages=markup+css+clike+javascript+pug */
var _self = "undefined" != typeof window ? window : "undefined" != typeof WorkerGlobalScope && self instanceof WorkerGlobalScope ? self : {},
    Prism = function () {
  var e = /\blang(?:uage)?-(\w+)\b/i,
      t = 0,
      n = _self.Prism = { manual: _self.Prism && _self.Prism.manual, disableWorkerMessageHandler: _self.Prism && _self.Prism.disableWorkerMessageHandler, util: { encode: function (e) {
        return e instanceof r ? new r(e.type, n.util.encode(e.content), e.alias) : "Array" === n.util.type(e) ? e.map(n.util.encode) : e.replace(/&/g, "&amp;").replace(/</g, "&lt;").replace(/\u00a0/g, " ");
      }, type: function (e) {
        return Object.prototype.toString.call(e).match(/\[object (\w+)\]/)[1];
      }, objId: function (e) {
        return e.__id || Object.defineProperty(e, "__id", { value: ++t }), e.__id;
      }, clone: function (e) {
        var t = n.util.type(e);switch (t) {case "Object":
            var r = {};for (var a in e) e.hasOwnProperty(a) && (r[a] = n.util.clone(e[a]));return r;case "Array":
            return e.map(function (e) {
              return n.util.clone(e);
            });}return e;
      } }, languages: { extend: function (e, t) {
        var r = n.util.clone(n.languages[e]);for (var a in t) r[a] = t[a];return r;
      }, insertBefore: function (e, t, r, a) {
        a = a || n.languages;var l = a[e];if (2 == arguments.length) {
          r = arguments[1];for (var i in r) r.hasOwnProperty(i) && (l[i] = r[i]);return l;
        }var o = {};for (var s in l) if (l.hasOwnProperty(s)) {
          if (s == t) for (var i in r) r.hasOwnProperty(i) && (o[i] = r[i]);o[s] = l[s];
        }return n.languages.DFS(n.languages, function (t, n) {
          n === a[e] && t != e && (this[t] = o);
        }), a[e] = o;
      }, DFS: function (e, t, r, a) {
        a = a || {};for (var l in e) e.hasOwnProperty(l) && (t.call(e, l, e[l], r || l), "Object" !== n.util.type(e[l]) || a[n.util.objId(e[l])] ? "Array" !== n.util.type(e[l]) || a[n.util.objId(e[l])] || (a[n.util.objId(e[l])] = !0, n.languages.DFS(e[l], t, l, a)) : (a[n.util.objId(e[l])] = !0, n.languages.DFS(e[l], t, null, a)));
      } }, plugins: {}, highlightAll: function (e, t) {
      n.highlightAllUnder(document, e, t);
    }, highlightAllUnder: function (e, t, r) {
      var a = { callback: r, selector: 'code[class*="language-"], [class*="language-"] code, code[class*="lang-"], [class*="lang-"] code' };n.hooks.run("before-highlightall", a);for (var l, i = a.elements || e.querySelectorAll(a.selector), o = 0; l = i[o++];) n.highlightElement(l, t === !0, a.callback);
    }, highlightElement: function (t, r, a) {
      for (var l, i, o = t; o && !e.test(o.className);) o = o.parentNode;o && (l = (o.className.match(e) || [, ""])[1].toLowerCase(), i = n.languages[l]), t.className = t.className.replace(e, "").replace(/\s+/g, " ") + " language-" + l, t.parentNode && (o = t.parentNode, /pre/i.test(o.nodeName) && (o.className = o.className.replace(e, "").replace(/\s+/g, " ") + " language-" + l));var s = t.textContent,
          g = { element: t, language: l, grammar: i, code: s };if (n.hooks.run("before-sanity-check", g), !g.code || !g.grammar) return g.code && (n.hooks.run("before-highlight", g), g.element.textContent = g.code, n.hooks.run("after-highlight", g)), n.hooks.run("complete", g), void 0;if (n.hooks.run("before-highlight", g), r && _self.Worker) {
        var u = new Worker(n.filename);u.onmessage = function (e) {
          g.highlightedCode = e.data, n.hooks.run("before-insert", g), g.element.innerHTML = g.highlightedCode, a && a.call(g.element), n.hooks.run("after-highlight", g), n.hooks.run("complete", g);
        }, u.postMessage(JSON.stringify({ language: g.language, code: g.code, immediateClose: !0 }));
      } else g.highlightedCode = n.highlight(g.code, g.grammar, g.language), n.hooks.run("before-insert", g), g.element.innerHTML = g.highlightedCode, a && a.call(t), n.hooks.run("after-highlight", g), n.hooks.run("complete", g);
    }, highlight: function (e, t, a) {
      var l = n.tokenize(e, t);return r.stringify(n.util.encode(l), a);
    }, matchGrammar: function (e, t, r, a, l, i, o) {
      var s = n.Token;for (var g in r) if (r.hasOwnProperty(g) && r[g]) {
        if (g == o) return;var u = r[g];u = "Array" === n.util.type(u) ? u : [u];for (var c = 0; c < u.length; ++c) {
          var h = u[c],
              f = h.inside,
              d = !!h.lookbehind,
              m = !!h.greedy,
              p = 0,
              y = h.alias;if (m && !h.pattern.global) {
            var v = h.pattern.toString().match(/[imuy]*$/)[0];h.pattern = RegExp(h.pattern.source, v + "g");
          }h = h.pattern || h;for (var b = a, k = l; b < t.length; k += t[b].length, ++b) {
            var w = t[b];if (t.length > e.length) return;if (!(w instanceof s)) {
              h.lastIndex = 0;var _ = h.exec(w),
                  P = 1;if (!_ && m && b != t.length - 1) {
                if (h.lastIndex = k, _ = h.exec(e), !_) break;for (var A = _.index + (d ? _[1].length : 0), j = _.index + _[0].length, x = b, O = k, N = t.length; N > x && (j > O || !t[x].type && !t[x - 1].greedy); ++x) O += t[x].length, A >= O && (++b, k = O);if (t[b] instanceof s || t[x - 1].greedy) continue;P = x - b, w = e.slice(k, O), _.index -= k;
              }if (_) {
                d && (p = _[1].length);var A = _.index + p,
                    _ = _[0].slice(p),
                    j = A + _.length,
                    S = w.slice(0, A),
                    C = w.slice(j),
                    M = [b, P];S && (++b, k += S.length, M.push(S));var E = new s(g, f ? n.tokenize(_, f) : _, y, _, m);if (M.push(E), C && M.push(C), Array.prototype.splice.apply(t, M), 1 != P && n.matchGrammar(e, t, r, b, k, !0, g), i) break;
              } else if (i) break;
            }
          }
        }
      }
    }, tokenize: function (e, t) {
      var r = [e],
          a = t.rest;if (a) {
        for (var l in a) t[l] = a[l];delete t.rest;
      }return n.matchGrammar(e, r, t, 0, 0, !1), r;
    }, hooks: { all: {}, add: function (e, t) {
        var r = n.hooks.all;r[e] = r[e] || [], r[e].push(t);
      }, run: function (e, t) {
        var r = n.hooks.all[e];if (r && r.length) for (var a, l = 0; a = r[l++];) a(t);
      } } },
      r = n.Token = function (e, t, n, r, a) {
    this.type = e, this.content = t, this.alias = n, this.length = 0 | (r || "").length, this.greedy = !!a;
  };if (r.stringify = function (e, t, a) {
    if ("string" == typeof e) return e;if ("Array" === n.util.type(e)) return e.map(function (n) {
      return r.stringify(n, t, e);
    }).join("");var l = { type: e.type, content: r.stringify(e.content, t, a), tag: "span", classes: ["token", e.type], attributes: {}, language: t, parent: a };if (e.alias) {
      var i = "Array" === n.util.type(e.alias) ? e.alias : [e.alias];Array.prototype.push.apply(l.classes, i);
    }n.hooks.run("wrap", l);var o = Object.keys(l.attributes).map(function (e) {
      return e + '="' + (l.attributes[e] || "").replace(/"/g, "&quot;") + '"';
    }).join(" ");return "<" + l.tag + ' class="' + l.classes.join(" ") + '"' + (o ? " " + o : "") + ">" + l.content + "</" + l.tag + ">";
  }, !_self.document) return _self.addEventListener ? (n.disableWorkerMessageHandler || _self.addEventListener("message", function (e) {
    var t = JSON.parse(e.data),
        r = t.language,
        a = t.code,
        l = t.immediateClose;_self.postMessage(n.highlight(a, n.languages[r], r)), l && _self.close();
  }, !1), _self.Prism) : _self.Prism;var a = document.currentScript || [].slice.call(document.getElementsByTagName("script")).pop();return a && (n.filename = a.src, n.manual || a.hasAttribute("data-manual") || ("loading" !== document.readyState ? window.requestAnimationFrame ? window.requestAnimationFrame(n.highlightAll) : window.setTimeout(n.highlightAll, 16) : document.addEventListener("DOMContentLoaded", n.highlightAll))), _self.Prism;
}();"undefined" != typeof module && module.exports && (module.exports = Prism), "undefined" != typeof global && (global.Prism = Prism);
Prism.languages.markup = { comment: /<!--[\s\S]*?-->/, prolog: /<\?[\s\S]+?\?>/, doctype: /<!DOCTYPE[\s\S]+?>/i, cdata: /<!\[CDATA\[[\s\S]*?]]>/i, tag: { pattern: /<\/?(?!\d)[^\s>\/=$<]+(?:\s+[^\s>\/=]+(?:=(?:("|')(?:\\[\s\S]|(?!\1)[^\\])*\1|[^\s'">=]+))?)*\s*\/?>/i, inside: { tag: { pattern: /^<\/?[^\s>\/]+/i, inside: { punctuation: /^<\/?/, namespace: /^[^\s>\/:]+:/ } }, "attr-value": { pattern: /=(?:("|')(?:\\[\s\S]|(?!\1)[^\\])*\1|[^\s'">=]+)/i, inside: { punctuation: [/^=/, { pattern: /(^|[^\\])["']/, lookbehind: !0 }] } }, punctuation: /\/?>/, "attr-name": { pattern: /[^\s>\/]+/, inside: { namespace: /^[^\s>\/:]+:/ } } } }, entity: /&#?[\da-z]{1,8};/i }, Prism.languages.markup.tag.inside["attr-value"].inside.entity = Prism.languages.markup.entity, Prism.hooks.add("wrap", function (a) {
  "entity" === a.type && (a.attributes.title = a.content.replace(/&amp;/, "&"));
}), Prism.languages.xml = Prism.languages.markup, Prism.languages.html = Prism.languages.markup, Prism.languages.mathml = Prism.languages.markup, Prism.languages.svg = Prism.languages.markup;
Prism.languages.css = { comment: /\/\*[\s\S]*?\*\//, atrule: { pattern: /@[\w-]+?.*?(?:;|(?=\s*\{))/i, inside: { rule: /@[\w-]+/ } }, url: /url\((?:(["'])(?:\\(?:\r\n|[\s\S])|(?!\1)[^\\\r\n])*\1|.*?)\)/i, selector: /[^{}\s][^{};]*?(?=\s*\{)/, string: { pattern: /("|')(?:\\(?:\r\n|[\s\S])|(?!\1)[^\\\r\n])*\1/, greedy: !0 }, property: /[-_a-z\xA0-\uFFFF][-\w\xA0-\uFFFF]*(?=\s*:)/i, important: /\B!important\b/i, "function": /[-a-z0-9]+(?=\()/i, punctuation: /[(){};:]/ }, Prism.languages.css.atrule.inside.rest = Prism.util.clone(Prism.languages.css), Prism.languages.markup && (Prism.languages.insertBefore("markup", "tag", { style: { pattern: /(<style[\s\S]*?>)[\s\S]*?(?=<\/style>)/i, lookbehind: !0, inside: Prism.languages.css, alias: "language-css", greedy: !0 } }), Prism.languages.insertBefore("inside", "attr-value", { "style-attr": { pattern: /\s*style=("|')(?:\\[\s\S]|(?!\1)[^\\])*\1/i, inside: { "attr-name": { pattern: /^\s*style/i, inside: Prism.languages.markup.tag.inside }, punctuation: /^\s*=\s*['"]|['"]\s*$/, "attr-value": { pattern: /.+/i, inside: Prism.languages.css } }, alias: "language-css" } }, Prism.languages.markup.tag));
Prism.languages.clike = { comment: [{ pattern: /(^|[^\\])\/\*[\s\S]*?(?:\*\/|$)/, lookbehind: !0 }, { pattern: /(^|[^\\:])\/\/.*/, lookbehind: !0 }], string: { pattern: /(["'])(?:\\(?:\r\n|[\s\S])|(?!\1)[^\\\r\n])*\1/, greedy: !0 }, "class-name": { pattern: /((?:\b(?:class|interface|extends|implements|trait|instanceof|new)\s+)|(?:catch\s+\())[\w.\\]+/i, lookbehind: !0, inside: { punctuation: /[.\\]/ } }, keyword: /\b(?:if|else|while|do|for|return|in|instanceof|function|new|try|throw|catch|finally|null|break|continue)\b/, "boolean": /\b(?:true|false)\b/, "function": /[a-z0-9_]+(?=\()/i, number: /\b-?(?:0x[\da-f]+|\d*\.?\d+(?:e[+-]?\d+)?)\b/i, operator: /--?|\+\+?|!=?=?|<=?|>=?|==?=?|&&?|\|\|?|\?|\*|\/|~|\^|%/, punctuation: /[{}[\];(),.:]/ };
Prism.languages.javascript = Prism.languages.extend("clike", { keyword: /\b(?:as|async|await|break|case|catch|class|const|continue|debugger|default|delete|do|else|enum|export|extends|finally|for|from|function|get|if|implements|import|in|instanceof|interface|let|new|null|of|package|private|protected|public|return|set|static|super|switch|this|throw|try|typeof|var|void|while|with|yield)\b/, number: /\b-?(?:0[xX][\dA-Fa-f]+|0[bB][01]+|0[oO][0-7]+|\d*\.?\d+(?:[Ee][+-]?\d+)?|NaN|Infinity)\b/, "function": /[_$a-z\xA0-\uFFFF][$\w\xA0-\uFFFF]*(?=\s*\()/i, operator: /-[-=]?|\+[+=]?|!=?=?|<<?=?|>>?>?=?|=(?:==?|>)?|&[&=]?|\|[|=]?|\*\*?=?|\/=?|~|\^=?|%=?|\?|\.{3}/ }), Prism.languages.insertBefore("javascript", "keyword", { regex: { pattern: /(^|[^\/])\/(?!\/)(\[[^\]\r\n]+]|\\.|[^\/\\\[\r\n])+\/[gimyu]{0,5}(?=\s*($|[\r\n,.;})]))/, lookbehind: !0, greedy: !0 }, "function-variable": { pattern: /[_$a-z\xA0-\uFFFF][$\w\xA0-\uFFFF]*(?=\s*=\s*(?:function\b|(?:\([^()]*\)|[_$a-z\xA0-\uFFFF][$\w\xA0-\uFFFF]*)\s*=>))/i, alias: "function" } }), Prism.languages.insertBefore("javascript", "string", { "template-string": { pattern: /`(?:\\[\s\S]|[^\\`])*`/, greedy: !0, inside: { interpolation: { pattern: /\$\{[^}]+\}/, inside: { "interpolation-punctuation": { pattern: /^\$\{|\}$/, alias: "punctuation" }, rest: Prism.languages.javascript } }, string: /[\s\S]+/ } } }), Prism.languages.markup && Prism.languages.insertBefore("markup", "tag", { script: { pattern: /(<script[\s\S]*?>)[\s\S]*?(?=<\/script>)/i, lookbehind: !0, inside: Prism.languages.javascript, alias: "language-javascript", greedy: !0 } }), Prism.languages.js = Prism.languages.javascript;
!function (e) {
  e.languages.pug = { comment: { pattern: /(^([\t ]*))\/\/.*(?:(?:\r?\n|\r)\2[\t ]+.+)*/m, lookbehind: !0 }, "multiline-script": { pattern: /(^([\t ]*)script\b.*\.[\t ]*)(?:(?:\r?\n|\r(?!\n))(?:\2[\t ]+.+|\s*?(?=\r?\n|\r)))+/m, lookbehind: !0, inside: { rest: e.languages.javascript } }, filter: { pattern: /(^([\t ]*)):.+(?:(?:\r?\n|\r(?!\n))(?:\2[\t ]+.+|\s*?(?=\r?\n|\r)))+/m, lookbehind: !0, inside: { "filter-name": { pattern: /^:[\w-]+/, alias: "variable" } } }, "multiline-plain-text": { pattern: /(^([\t ]*)[\w\-#.]+\.[\t ]*)(?:(?:\r?\n|\r(?!\n))(?:\2[\t ]+.+|\s*?(?=\r?\n|\r)))+/m, lookbehind: !0 }, markup: { pattern: /(^[\t ]*)<.+/m, lookbehind: !0, inside: { rest: e.languages.markup } }, doctype: { pattern: /((?:^|\n)[\t ]*)doctype(?: .+)?/, lookbehind: !0 }, "flow-control": { pattern: /(^[\t ]*)(?:if|unless|else|case|when|default|each|while)\b(?: .+)?/m, lookbehind: !0, inside: { each: { pattern: /^each .+? in\b/, inside: { keyword: /\b(?:each|in)\b/, punctuation: /,/ } }, branch: { pattern: /^(?:if|unless|else|case|when|default|while)\b/, alias: "keyword" }, rest: e.languages.javascript } }, keyword: { pattern: /(^[\t ]*)(?:block|extends|include|append|prepend)\b.+/m, lookbehind: !0 }, mixin: [{ pattern: /(^[\t ]*)mixin .+/m, lookbehind: !0, inside: { keyword: /^mixin/, "function": /\w+(?=\s*\(|\s*$)/, punctuation: /[(),.]/ } }, { pattern: /(^[\t ]*)\+.+/m, lookbehind: !0, inside: { name: { pattern: /^\+\w+/, alias: "function" }, rest: e.languages.javascript } }], script: { pattern: /(^[\t ]*script(?:(?:&[^(]+)?\([^)]+\))*[\t ]+).+/m, lookbehind: !0, inside: { rest: e.languages.javascript } }, "plain-text": { pattern: /(^[\t ]*(?!-)[\w\-#.]*[\w\-](?:(?:&[^(]+)?\([^)]+\))*\/?[\t ]+).+/m, lookbehind: !0 }, tag: { pattern: /(^[\t ]*)(?!-)[\w\-#.]*[\w\-](?:(?:&[^(]+)?\([^)]+\))*\/?:?/m, lookbehind: !0, inside: { attributes: [{ pattern: /&[^(]+\([^)]+\)/, inside: { rest: e.languages.javascript } }, { pattern: /\([^)]+\)/, inside: { "attr-value": { pattern: /(=\s*)(?:\{[^}]*\}|[^,)\r\n]+)/, lookbehind: !0, inside: { rest: e.languages.javascript } }, "attr-name": /[\w-]+(?=\s*!?=|\s*[,)])/, punctuation: /[!=(),]+/ } }], punctuation: /:/ } }, code: [{ pattern: /(^[\t ]*(?:-|!?=)).+/m, lookbehind: !0, inside: { rest: e.languages.javascript } }], punctuation: /[.\-!=|]+/ };for (var t = "(^([\\t ]*)):{{filter_name}}(?:(?:\\r?\\n|\\r(?!\\n))(?:\\2[\\t ]+.+|\\s*?(?=\\r?\\n|\\r)))+", n = [{ filter: "atpl", language: "twig" }, { filter: "coffee", language: "coffeescript" }, "ejs", "handlebars", "hogan", "less", "livescript", "markdown", "mustache", "plates", { filter: "sass", language: "scss" }, "stylus", "swig"], a = {}, i = 0, r = n.length; r > i; i++) {
    var s = n[i];s = "string" == typeof s ? { filter: s, language: s } : s, e.languages[s.language] && (a["filter-" + s.filter] = { pattern: RegExp(t.replace("{{filter_name}}", s.filter), "m"), lookbehind: !0, inside: { "filter-name": { pattern: /^:[\w-]+/, alias: "variable" }, rest: e.languages[s.language] } });
  }e.languages.insertBefore("pug", "filter", a);
}(Prism);
/* WEBPACK VAR INJECTION */}.call(exports, __webpack_require__(7)))

/***/ }),
/* 31 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Prism.languages.insertBefore('javascript', 'template-string', {
  'html-template-string': {
    pattern: /(html)`(?:\\[\s\S]|[^\\`])*`/,
    lookbehind: true,
    inside: {
      'interpolation': {
        pattern: /\$\{[^}]+\}/,
        inside: {
          'interpolation-punctuation': {
            pattern: /^\$\{|\}$/,
            alias: 'punctuation'
          },
          rest: Prism.languages.javascript
        }
      },
      rest: Prism.languages.markup
    }
  },
  'css-template-string': {
    pattern: /(css)`(?:\\[\s\S]|[^\\`])*`/,
    lookbehind: true,
    inside: {
      'interpolation': {
        pattern: /\$\{[^}]+\}/,
        inside: {
          'interpolation-punctuation': {
            pattern: /^\$\{|\}$/,
            alias: 'punctuation'
          },
          rest: Prism.languages.javascript
        }
      },
      rest: Prism.languages.css
    }
  }
});

/***/ }),
/* 32 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});

var _oz = __webpack_require__(1);

__webpack_require__(33);

var _showdownExtension = __webpack_require__(34);

var _showdownExtension2 = _interopRequireDefault(_showdownExtension);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

/* global showdown */

const converter = new showdown.Converter({ extensions: [_showdownExtension2.default] });

const style = _ => _oz.css`
code {
  background: #151a1e;
  border-radius: .25rem;
}
`;

const template = ({ host, props: { value } }) => {
  const result = document.createElement('div');
  if (value) result.innerHTML = converter.makeHtml(value);
  return _oz.html`${result.childNodes.length ? [...result.childNodes] : ''}`;
};

exports.default = (0, _oz.registerElement)({
  name: 'oz-markdown',
  props: ['value'],
  template,
  style
});

/***/ }),
/* 33 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
var __WEBPACK_AMD_DEFINE_RESULT__;

/*! showdown v 1.8.6 - 22-12-2017 */
(function () {
  function g(g) {
    "use strict";
    var A = { omitExtraWLInCodeBlocks: { defaultValue: !1, describe: "Omit the default extra whiteline added to code blocks", type: "boolean" }, noHeaderId: { defaultValue: !1, describe: "Turn on/off generated header id", type: "boolean" }, prefixHeaderId: { defaultValue: !1, describe: "Add a prefix to the generated header ids. Passing a string will prefix that string to the header id. Setting to true will add a generic 'section-' prefix", type: "string" }, rawPrefixHeaderId: { defaultValue: !1, describe: 'Setting this option to true will prevent showdown from modifying the prefix. This might result in malformed IDs (if, for instance, the " char is used in the prefix)', type: "boolean" }, ghCompatibleHeaderId: { defaultValue: !1, describe: "Generate header ids compatible with github style (spaces are replaced with dashes, a bunch of non alphanumeric chars are removed)", type: "boolean" }, rawHeaderId: { defaultValue: !1, describe: "Remove only spaces, ' and \" from generated header ids (including prefixes), replacing them with dashes (-). WARNING: This might result in malformed ids", type: "boolean" }, headerLevelStart: { defaultValue: !1, describe: "The header blocks level start", type: "integer" }, parseImgDimensions: { defaultValue: !1, describe: "Turn on/off image dimension parsing", type: "boolean" }, simplifiedAutoLink: { defaultValue: !1, describe: "Turn on/off GFM autolink style", type: "boolean" }, excludeTrailingPunctuationFromURLs: { defaultValue: !1, describe: "Excludes trailing punctuation from links generated with autoLinking", type: "boolean" }, literalMidWordUnderscores: { defaultValue: !1, describe: "Parse midword underscores as literal underscores", type: "boolean" }, literalMidWordAsterisks: { defaultValue: !1, describe: "Parse midword asterisks as literal asterisks", type: "boolean" }, strikethrough: { defaultValue: !1, describe: "Turn on/off strikethrough support", type: "boolean" }, tables: { defaultValue: !1, describe: "Turn on/off tables support", type: "boolean" }, tablesHeaderId: { defaultValue: !1, describe: "Add an id to table headers", type: "boolean" }, ghCodeBlocks: { defaultValue: !0, describe: "Turn on/off GFM fenced code blocks support", type: "boolean" }, tasklists: { defaultValue: !1, describe: "Turn on/off GFM tasklist support", type: "boolean" }, smoothLivePreview: { defaultValue: !1, describe: "Prevents weird effects in live previews due to incomplete input", type: "boolean" }, smartIndentationFix: { defaultValue: !1, description: "Tries to smartly fix indentation in es6 strings", type: "boolean" }, disableForced4SpacesIndentedSublists: { defaultValue: !1, description: "Disables the requirement of indenting nested sublists by 4 spaces", type: "boolean" }, simpleLineBreaks: { defaultValue: !1, description: "Parses simple line breaks as <br> (GFM Style)", type: "boolean" }, requireSpaceBeforeHeadingText: { defaultValue: !1, description: "Makes adding a space between `#` and the header text mandatory (GFM Style)", type: "boolean" }, ghMentions: { defaultValue: !1, description: "Enables github @mentions", type: "boolean" }, ghMentionsLink: { defaultValue: "https://github.com/{u}", description: "Changes the link generated by @mentions. Only applies if ghMentions option is enabled.", type: "string" }, encodeEmails: { defaultValue: !0, description: "Encode e-mail addresses through the use of Character Entities, transforming ASCII e-mail addresses into its equivalent decimal entities", type: "boolean" }, openLinksInNewWindow: { defaultValue: !1, description: "Open all links in new windows", type: "boolean" }, backslashEscapesHTMLTags: { defaultValue: !1, description: "Support for HTML Tag escaping. ex: <div>foo</div>", type: "boolean" }, emoji: { defaultValue: !1, description: "Enable emoji support. Ex: `this is a :smile: emoji`", type: "boolean" }, underline: { defaultValue: !1, description: "Enable support for underline. Syntax is double or triple underscores: `__underline word__`. With this option enabled, underscores no longer parses into `<em>` and `<strong>`", type: "boolean" }, completeHTMLDocument: { defaultValue: !1, description: "Outputs a complete html document, including `<html>`, `<head>` and `<body>` tags", type: "boolean" }, metadata: { defaultValue: !1, description: "Enable support for document metadata (defined at the top of the document between `«««` and `»»»` or between `---` and `---`).", type: "boolean" }, splitAdjacentBlockquotes: { defaultValue: !1, description: "Split adjacent blockquote blocks", type: "boolean" } };if (!1 === g) return JSON.parse(JSON.stringify(A));var C = {};for (var I in A) A.hasOwnProperty(I) && (C[I] = A[I].defaultValue);return C;
  }function A(g, A) {
    "use strict";
    var C = A ? "Error in " + A + " extension->" : "Error in unnamed extension",
        e = { valid: !0, error: "" };I.helper.isArray(g) || (g = [g]);for (var r = 0; r < g.length; ++r) {
      var t = C + " sub-extension " + r + ": ",
          a = g[r];if ("object" != typeof a) return e.valid = !1, e.error = t + "must be an object, but " + typeof a + " given", e;if (!I.helper.isString(a.type)) return e.valid = !1, e.error = t + 'property "type" must be a string, but ' + typeof a.type + " given", e;var n = a.type = a.type.toLowerCase();if ("language" === n && (n = a.type = "lang"), "html" === n && (n = a.type = "output"), "lang" !== n && "output" !== n && "listener" !== n) return e.valid = !1, e.error = t + "type " + n + ' is not recognized. Valid values: "lang/language", "output/html" or "listener"', e;if ("listener" === n) {
        if (I.helper.isUndefined(a.listeners)) return e.valid = !1, e.error = t + '. Extensions of type "listener" must have a property called "listeners"', e;
      } else if (I.helper.isUndefined(a.filter) && I.helper.isUndefined(a.regex)) return e.valid = !1, e.error = t + n + ' extensions must define either a "regex" property or a "filter" method', e;if (a.listeners) {
        if ("object" != typeof a.listeners) return e.valid = !1, e.error = t + '"listeners" property must be an object but ' + typeof a.listeners + " given", e;for (var o in a.listeners) if (a.listeners.hasOwnProperty(o) && "function" != typeof a.listeners[o]) return e.valid = !1, e.error = t + '"listeners" property must be an hash of [event name]: [callback]. listeners.' + o + " must be a function but " + typeof a.listeners[o] + " given", e;
      }if (a.filter) {
        if ("function" != typeof a.filter) return e.valid = !1, e.error = t + '"filter" must be a function, but ' + typeof a.filter + " given", e;
      } else if (a.regex) {
        if (I.helper.isString(a.regex) && (a.regex = new RegExp(a.regex, "g")), !(a.regex instanceof RegExp)) return e.valid = !1, e.error = t + '"regex" property must either be a string or a RegExp object, but ' + typeof a.regex + " given", e;if (I.helper.isUndefined(a.replace)) return e.valid = !1, e.error = t + '"regex" extensions must implement a replace string or function', e;
      }
    }return e;
  }function C(g, A) {
    "use strict";
    return "¨E" + A.charCodeAt(0) + "E";
  }var I = {},
      e = {},
      r = {},
      t = g(!0),
      a = "vanilla",
      n = { github: { omitExtraWLInCodeBlocks: !0, simplifiedAutoLink: !0, excludeTrailingPunctuationFromURLs: !0, literalMidWordUnderscores: !0, strikethrough: !0, tables: !0, tablesHeaderId: !0, ghCodeBlocks: !0, tasklists: !0, disableForced4SpacesIndentedSublists: !0, simpleLineBreaks: !0, requireSpaceBeforeHeadingText: !0, ghCompatibleHeaderId: !0, ghMentions: !0, backslashEscapesHTMLTags: !0, emoji: !0, splitAdjacentBlockquotes: !0 }, original: { noHeaderId: !0, ghCodeBlocks: !1 }, ghost: { omitExtraWLInCodeBlocks: !0, parseImgDimensions: !0, simplifiedAutoLink: !0, excludeTrailingPunctuationFromURLs: !0, literalMidWordUnderscores: !0, strikethrough: !0, tables: !0, tablesHeaderId: !0, ghCodeBlocks: !0, tasklists: !0, smoothLivePreview: !0, simpleLineBreaks: !0, requireSpaceBeforeHeadingText: !0, ghMentions: !1, encodeEmails: !0 }, vanilla: g(!0), allOn: function () {
      "use strict";
      var A = g(!0),
          C = {};for (var I in A) A.hasOwnProperty(I) && (C[I] = !0);return C;
    }() };I.helper = {}, I.extensions = {}, I.setOption = function (g, A) {
    "use strict";
    return t[g] = A, this;
  }, I.getOption = function (g) {
    "use strict";
    return t[g];
  }, I.getOptions = function () {
    "use strict";
    return t;
  }, I.resetOptions = function () {
    "use strict";
    t = g(!0);
  }, I.setFlavor = function (g) {
    "use strict";
    if (!n.hasOwnProperty(g)) throw Error(g + " flavor was not found");I.resetOptions();var A = n[g];a = g;for (var C in A) A.hasOwnProperty(C) && (t[C] = A[C]);
  }, I.getFlavor = function () {
    "use strict";
    return a;
  }, I.getFlavorOptions = function (g) {
    "use strict";
    if (n.hasOwnProperty(g)) return n[g];
  }, I.getDefaultOptions = function (A) {
    "use strict";
    return g(A);
  }, I.subParser = function (g, A) {
    "use strict";
    if (I.helper.isString(g)) {
      if (void 0 === A) {
        if (e.hasOwnProperty(g)) return e[g];throw Error("SubParser named " + g + " not registered!");
      }e[g] = A;
    }
  }, I.extension = function (g, C) {
    "use strict";
    if (!I.helper.isString(g)) throw Error("Extension 'name' must be a string");if (g = I.helper.stdExtName(g), I.helper.isUndefined(C)) {
      if (!r.hasOwnProperty(g)) throw Error("Extension named " + g + " is not registered!");return r[g];
    }"function" == typeof C && (C = C()), I.helper.isArray(C) || (C = [C]);var e = A(C, g);if (!e.valid) throw Error(e.error);r[g] = C;
  }, I.getAllExtensions = function () {
    "use strict";
    return r;
  }, I.removeExtension = function (g) {
    "use strict";
    delete r[g];
  }, I.resetExtensions = function () {
    "use strict";
    r = {};
  }, I.validateExtension = function (g) {
    "use strict";
    var C = A(g, null);return !!C.valid || (console.warn(C.error), !1);
  }, I.hasOwnProperty("helper") || (I.helper = {}), I.helper.isString = function (g) {
    "use strict";
    return "string" == typeof g || g instanceof String;
  }, I.helper.isFunction = function (g) {
    "use strict";
    return g && "[object Function]" === {}.toString.call(g);
  }, I.helper.isArray = function (g) {
    "use strict";
    return Array.isArray(g);
  }, I.helper.isUndefined = function (g) {
    "use strict";
    return void 0 === g;
  }, I.helper.forEach = function (g, A) {
    "use strict";
    if (I.helper.isUndefined(g)) throw new Error("obj param is required");if (I.helper.isUndefined(A)) throw new Error("callback param is required");if (!I.helper.isFunction(A)) throw new Error("callback param must be a function/closure");if ("function" == typeof g.forEach) g.forEach(A);else if (I.helper.isArray(g)) for (var C = 0; C < g.length; C++) A(g[C], C, g);else {
      if ("object" != typeof g) throw new Error("obj does not seem to be an array or an iterable object");for (var e in g) g.hasOwnProperty(e) && A(g[e], e, g);
    }
  }, I.helper.stdExtName = function (g) {
    "use strict";
    return g.replace(/[_?*+\/\\.^-]/g, "").replace(/\s/g, "").toLowerCase();
  }, I.helper.escapeCharactersCallback = C, I.helper.escapeCharacters = function (g, A, I) {
    "use strict";
    var e = "([" + A.replace(/([\[\]\\])/g, "\\$1") + "])";I && (e = "\\\\" + e);var r = new RegExp(e, "g");return g = g.replace(r, C);
  };var o = function (g, A, C, I) {
    "use strict";
    var e,
        r,
        t,
        a,
        n,
        o = I || "",
        s = o.indexOf("g") > -1,
        i = new RegExp(A + "|" + C, "g" + o.replace(/g/g, "")),
        l = new RegExp(A, o.replace(/g/g, "")),
        c = [];do {
      for (e = 0; t = i.exec(g);) if (l.test(t[0])) e++ || (a = (r = i.lastIndex) - t[0].length);else if (e && ! --e) {
        n = t.index + t[0].length;var u = { left: { start: a, end: r }, match: { start: r, end: t.index }, right: { start: t.index, end: n }, wholeMatch: { start: a, end: n } };if (c.push(u), !s) return c;
      }
    } while (e && (i.lastIndex = r));return c;
  };I.helper.matchRecursiveRegExp = function (g, A, C, I) {
    "use strict";
    for (var e = o(g, A, C, I), r = [], t = 0; t < e.length; ++t) r.push([g.slice(e[t].wholeMatch.start, e[t].wholeMatch.end), g.slice(e[t].match.start, e[t].match.end), g.slice(e[t].left.start, e[t].left.end), g.slice(e[t].right.start, e[t].right.end)]);return r;
  }, I.helper.replaceRecursiveRegExp = function (g, A, C, e, r) {
    "use strict";
    if (!I.helper.isFunction(A)) {
      var t = A;A = function () {
        return t;
      };
    }var a = o(g, C, e, r),
        n = g,
        s = a.length;if (s > 0) {
      var i = [];0 !== a[0].wholeMatch.start && i.push(g.slice(0, a[0].wholeMatch.start));for (var l = 0; l < s; ++l) i.push(A(g.slice(a[l].wholeMatch.start, a[l].wholeMatch.end), g.slice(a[l].match.start, a[l].match.end), g.slice(a[l].left.start, a[l].left.end), g.slice(a[l].right.start, a[l].right.end))), l < s - 1 && i.push(g.slice(a[l].wholeMatch.end, a[l + 1].wholeMatch.start));a[s - 1].wholeMatch.end < g.length && i.push(g.slice(a[s - 1].wholeMatch.end)), n = i.join("");
    }return n;
  }, I.helper.regexIndexOf = function (g, A, C) {
    "use strict";
    if (!I.helper.isString(g)) throw "InvalidArgumentError: first parameter of showdown.helper.regexIndexOf function must be a string";if (A instanceof RegExp == !1) throw "InvalidArgumentError: second parameter of showdown.helper.regexIndexOf function must be an instance of RegExp";var e = g.substring(C || 0).search(A);return e >= 0 ? e + (C || 0) : e;
  }, I.helper.splitAtIndex = function (g, A) {
    "use strict";
    if (!I.helper.isString(g)) throw "InvalidArgumentError: first parameter of showdown.helper.regexIndexOf function must be a string";return [g.substring(0, A), g.substring(A)];
  }, I.helper.encodeEmailAddress = function (g) {
    "use strict";
    var A = [function (g) {
      return "&#" + g.charCodeAt(0) + ";";
    }, function (g) {
      return "&#x" + g.charCodeAt(0).toString(16) + ";";
    }, function (g) {
      return g;
    }];return g = g.replace(/./g, function (g) {
      if ("@" === g) g = A[Math.floor(2 * Math.random())](g);else {
        var C = Math.random();g = C > .9 ? A[2](g) : C > .45 ? A[1](g) : A[0](g);
      }return g;
    });
  }, "undefined" == typeof console && (console = { warn: function (g) {
      "use strict";
      alert(g);
    }, log: function (g) {
      "use strict";
      alert(g);
    }, error: function (g) {
      "use strict";
      throw g;
    } }), I.helper.regexes = { asteriskDashAndColon: /([*_:~])/g }, I.helper.emojis = { "+1": "👍", "-1": "👎", 100: "💯", 1234: "🔢", "1st_place_medal": "🥇", "2nd_place_medal": "🥈", "3rd_place_medal": "🥉", "8ball": "🎱", a: "🅰️", ab: "🆎", abc: "🔤", abcd: "🔡", accept: "🉑", aerial_tramway: "🚡", airplane: "✈️", alarm_clock: "⏰", alembic: "⚗️", alien: "👽", ambulance: "🚑", amphora: "🏺", anchor: "⚓️", angel: "👼", anger: "💢", angry: "😠", anguished: "😧", ant: "🐜", apple: "🍎", aquarius: "♒️", aries: "♈️", arrow_backward: "◀️", arrow_double_down: "⏬", arrow_double_up: "⏫", arrow_down: "⬇️", arrow_down_small: "🔽", arrow_forward: "▶️", arrow_heading_down: "⤵️", arrow_heading_up: "⤴️", arrow_left: "⬅️", arrow_lower_left: "↙️", arrow_lower_right: "↘️", arrow_right: "➡️", arrow_right_hook: "↪️", arrow_up: "⬆️", arrow_up_down: "↕️", arrow_up_small: "🔼", arrow_upper_left: "↖️", arrow_upper_right: "↗️", arrows_clockwise: "🔃", arrows_counterclockwise: "🔄", art: "🎨", articulated_lorry: "🚛", artificial_satellite: "🛰", astonished: "😲", athletic_shoe: "👟", atm: "🏧", atom_symbol: "⚛️", avocado: "🥑", b: "🅱️", baby: "👶", baby_bottle: "🍼", baby_chick: "🐤", baby_symbol: "🚼", back: "🔙", bacon: "🥓", badminton: "🏸", baggage_claim: "🛄", baguette_bread: "🥖", balance_scale: "⚖️", balloon: "🎈", ballot_box: "🗳", ballot_box_with_check: "☑️", bamboo: "🎍", banana: "🍌", bangbang: "‼️", bank: "🏦", bar_chart: "📊", barber: "💈", baseball: "⚾️", basketball: "🏀", basketball_man: "⛹️", basketball_woman: "⛹️&zwj;♀️", bat: "🦇", bath: "🛀", bathtub: "🛁", battery: "🔋", beach_umbrella: "🏖", bear: "🐻", bed: "🛏", bee: "🐝", beer: "🍺", beers: "🍻", beetle: "🐞", beginner: "🔰", bell: "🔔", bellhop_bell: "🛎", bento: "🍱", biking_man: "🚴", bike: "🚲", biking_woman: "🚴&zwj;♀️", bikini: "👙", biohazard: "☣️", bird: "🐦", birthday: "🎂", black_circle: "⚫️", black_flag: "🏴", black_heart: "🖤", black_joker: "🃏", black_large_square: "⬛️", black_medium_small_square: "◾️", black_medium_square: "◼️", black_nib: "✒️", black_small_square: "▪️", black_square_button: "🔲", blonde_man: "👱", blonde_woman: "👱&zwj;♀️", blossom: "🌼", blowfish: "🐡", blue_book: "📘", blue_car: "🚙", blue_heart: "💙", blush: "😊", boar: "🐗", boat: "⛵️", bomb: "💣", book: "📖", bookmark: "🔖", bookmark_tabs: "📑", books: "📚", boom: "💥", boot: "👢", bouquet: "💐", bowing_man: "🙇", bow_and_arrow: "🏹", bowing_woman: "🙇&zwj;♀️", bowling: "🎳", boxing_glove: "🥊", boy: "👦", bread: "🍞", bride_with_veil: "👰", bridge_at_night: "🌉", briefcase: "💼", broken_heart: "💔", bug: "🐛", building_construction: "🏗", bulb: "💡", bullettrain_front: "🚅", bullettrain_side: "🚄", burrito: "🌯", bus: "🚌", business_suit_levitating: "🕴", busstop: "🚏", bust_in_silhouette: "👤", busts_in_silhouette: "👥", butterfly: "🦋", cactus: "🌵", cake: "🍰", calendar: "📆", call_me_hand: "🤙", calling: "📲", camel: "🐫", camera: "📷", camera_flash: "📸", camping: "🏕", cancer: "♋️", candle: "🕯", candy: "🍬", canoe: "🛶", capital_abcd: "🔠", capricorn: "♑️", car: "🚗", card_file_box: "🗃", card_index: "📇", card_index_dividers: "🗂", carousel_horse: "🎠", carrot: "🥕", cat: "🐱", cat2: "🐈", cd: "💿", chains: "⛓", champagne: "🍾", chart: "💹", chart_with_downwards_trend: "📉", chart_with_upwards_trend: "📈", checkered_flag: "🏁", cheese: "🧀", cherries: "🍒", cherry_blossom: "🌸", chestnut: "🌰", chicken: "🐔", children_crossing: "🚸", chipmunk: "🐿", chocolate_bar: "🍫", christmas_tree: "🎄", church: "⛪️", cinema: "🎦", circus_tent: "🎪", city_sunrise: "🌇", city_sunset: "🌆", cityscape: "🏙", cl: "🆑", clamp: "🗜", clap: "👏", clapper: "🎬", classical_building: "🏛", clinking_glasses: "🥂", clipboard: "📋", clock1: "🕐", clock10: "🕙", clock1030: "🕥", clock11: "🕚", clock1130: "🕦", clock12: "🕛", clock1230: "🕧", clock130: "🕜", clock2: "🕑", clock230: "🕝", clock3: "🕒", clock330: "🕞", clock4: "🕓", clock430: "🕟", clock5: "🕔", clock530: "🕠", clock6: "🕕", clock630: "🕡", clock7: "🕖", clock730: "🕢", clock8: "🕗", clock830: "🕣", clock9: "🕘", clock930: "🕤", closed_book: "📕", closed_lock_with_key: "🔐", closed_umbrella: "🌂", cloud: "☁️", cloud_with_lightning: "🌩", cloud_with_lightning_and_rain: "⛈", cloud_with_rain: "🌧", cloud_with_snow: "🌨", clown_face: "🤡", clubs: "♣️", cocktail: "🍸", coffee: "☕️", coffin: "⚰️", cold_sweat: "😰", comet: "☄️", computer: "💻", computer_mouse: "🖱", confetti_ball: "🎊", confounded: "😖", confused: "😕", congratulations: "㊗️", construction: "🚧", construction_worker_man: "👷", construction_worker_woman: "👷&zwj;♀️", control_knobs: "🎛", convenience_store: "🏪", cookie: "🍪", cool: "🆒", policeman: "👮", copyright: "©️", corn: "🌽", couch_and_lamp: "🛋", couple: "👫", couple_with_heart_woman_man: "💑", couple_with_heart_man_man: "👨&zwj;❤️&zwj;👨", couple_with_heart_woman_woman: "👩&zwj;❤️&zwj;👩", couplekiss_man_man: "👨&zwj;❤️&zwj;💋&zwj;👨", couplekiss_man_woman: "💏", couplekiss_woman_woman: "👩&zwj;❤️&zwj;💋&zwj;👩", cow: "🐮", cow2: "🐄", cowboy_hat_face: "🤠", crab: "🦀", crayon: "🖍", credit_card: "💳", crescent_moon: "🌙", cricket: "🏏", crocodile: "🐊", croissant: "🥐", crossed_fingers: "🤞", crossed_flags: "🎌", crossed_swords: "⚔️", crown: "👑", cry: "😢", crying_cat_face: "😿", crystal_ball: "🔮", cucumber: "🥒", cupid: "💘", curly_loop: "➰", currency_exchange: "💱", curry: "🍛", custard: "🍮", customs: "🛃", cyclone: "🌀", dagger: "🗡", dancer: "💃", dancing_women: "👯", dancing_men: "👯&zwj;♂️", dango: "🍡", dark_sunglasses: "🕶", dart: "🎯", dash: "💨", date: "📅", deciduous_tree: "🌳", deer: "🦌", department_store: "🏬", derelict_house: "🏚", desert: "🏜", desert_island: "🏝", desktop_computer: "🖥", male_detective: "🕵️", diamond_shape_with_a_dot_inside: "💠", diamonds: "♦️", disappointed: "😞", disappointed_relieved: "😥", dizzy: "💫", dizzy_face: "😵", do_not_litter: "🚯", dog: "🐶", dog2: "🐕", dollar: "💵", dolls: "🎎", dolphin: "🐬", door: "🚪", doughnut: "🍩", dove: "🕊", dragon: "🐉", dragon_face: "🐲", dress: "👗", dromedary_camel: "🐪", drooling_face: "🤤", droplet: "💧", drum: "🥁", duck: "🦆", dvd: "📀", "e-mail": "📧", eagle: "🦅", ear: "👂", ear_of_rice: "🌾", earth_africa: "🌍", earth_americas: "🌎", earth_asia: "🌏", egg: "🥚", eggplant: "🍆", eight_pointed_black_star: "✴️", eight_spoked_asterisk: "✳️", electric_plug: "🔌", elephant: "🐘", email: "✉️", end: "🔚", envelope_with_arrow: "📩", euro: "💶", european_castle: "🏰", european_post_office: "🏤", evergreen_tree: "🌲", exclamation: "❗️", expressionless: "😑", eye: "👁", eye_speech_bubble: "👁&zwj;🗨", eyeglasses: "👓", eyes: "👀", face_with_head_bandage: "🤕", face_with_thermometer: "🤒", fist_oncoming: "👊", factory: "🏭", fallen_leaf: "🍂", family_man_woman_boy: "👪", family_man_boy: "👨&zwj;👦", family_man_boy_boy: "👨&zwj;👦&zwj;👦", family_man_girl: "👨&zwj;👧", family_man_girl_boy: "👨&zwj;👧&zwj;👦", family_man_girl_girl: "👨&zwj;👧&zwj;👧", family_man_man_boy: "👨&zwj;👨&zwj;👦", family_man_man_boy_boy: "👨&zwj;👨&zwj;👦&zwj;👦", family_man_man_girl: "👨&zwj;👨&zwj;👧", family_man_man_girl_boy: "👨&zwj;👨&zwj;👧&zwj;👦", family_man_man_girl_girl: "👨&zwj;👨&zwj;👧&zwj;👧", family_man_woman_boy_boy: "👨&zwj;👩&zwj;👦&zwj;👦", family_man_woman_girl: "👨&zwj;👩&zwj;👧", family_man_woman_girl_boy: "👨&zwj;👩&zwj;👧&zwj;👦", family_man_woman_girl_girl: "👨&zwj;👩&zwj;👧&zwj;👧", family_woman_boy: "👩&zwj;👦", family_woman_boy_boy: "👩&zwj;👦&zwj;👦", family_woman_girl: "👩&zwj;👧", family_woman_girl_boy: "👩&zwj;👧&zwj;👦", family_woman_girl_girl: "👩&zwj;👧&zwj;👧", family_woman_woman_boy: "👩&zwj;👩&zwj;👦", family_woman_woman_boy_boy: "👩&zwj;👩&zwj;👦&zwj;👦", family_woman_woman_girl: "👩&zwj;👩&zwj;👧", family_woman_woman_girl_boy: "👩&zwj;👩&zwj;👧&zwj;👦", family_woman_woman_girl_girl: "👩&zwj;👩&zwj;👧&zwj;👧", fast_forward: "⏩", fax: "📠", fearful: "😨", feet: "🐾", female_detective: "🕵️&zwj;♀️", ferris_wheel: "🎡", ferry: "⛴", field_hockey: "🏑", file_cabinet: "🗄", file_folder: "📁", film_projector: "📽", film_strip: "🎞", fire: "🔥", fire_engine: "🚒", fireworks: "🎆", first_quarter_moon: "🌓", first_quarter_moon_with_face: "🌛", fish: "🐟", fish_cake: "🍥", fishing_pole_and_fish: "🎣", fist_raised: "✊", fist_left: "🤛", fist_right: "🤜", flags: "🎏", flashlight: "🔦", fleur_de_lis: "⚜️", flight_arrival: "🛬", flight_departure: "🛫", floppy_disk: "💾", flower_playing_cards: "🎴", flushed: "😳", fog: "🌫", foggy: "🌁", football: "🏈", footprints: "👣", fork_and_knife: "🍴", fountain: "⛲️", fountain_pen: "🖋", four_leaf_clover: "🍀", fox_face: "🦊", framed_picture: "🖼", free: "🆓", fried_egg: "🍳", fried_shrimp: "🍤", fries: "🍟", frog: "🐸", frowning: "😦", frowning_face: "☹️", frowning_man: "🙍&zwj;♂️", frowning_woman: "🙍", middle_finger: "🖕", fuelpump: "⛽️", full_moon: "🌕", full_moon_with_face: "🌝", funeral_urn: "⚱️", game_die: "🎲", gear: "⚙️", gem: "💎", gemini: "♊️", ghost: "👻", gift: "🎁", gift_heart: "💝", girl: "👧", globe_with_meridians: "🌐", goal_net: "🥅", goat: "🐐", golf: "⛳️", golfing_man: "🏌️", golfing_woman: "🏌️&zwj;♀️", gorilla: "🦍", grapes: "🍇", green_apple: "🍏", green_book: "📗", green_heart: "💚", green_salad: "🥗", grey_exclamation: "❕", grey_question: "❔", grimacing: "😬", grin: "😁", grinning: "😀", guardsman: "💂", guardswoman: "💂&zwj;♀️", guitar: "🎸", gun: "🔫", haircut_woman: "💇", haircut_man: "💇&zwj;♂️", hamburger: "🍔", hammer: "🔨", hammer_and_pick: "⚒", hammer_and_wrench: "🛠", hamster: "🐹", hand: "✋", handbag: "👜", handshake: "🤝", hankey: "💩", hatched_chick: "🐥", hatching_chick: "🐣", headphones: "🎧", hear_no_evil: "🙉", heart: "❤️", heart_decoration: "💟", heart_eyes: "😍", heart_eyes_cat: "😻", heartbeat: "💓", heartpulse: "💗", hearts: "♥️", heavy_check_mark: "✔️", heavy_division_sign: "➗", heavy_dollar_sign: "💲", heavy_heart_exclamation: "❣️", heavy_minus_sign: "➖", heavy_multiplication_x: "✖️", heavy_plus_sign: "➕", helicopter: "🚁", herb: "🌿", hibiscus: "🌺", high_brightness: "🔆", high_heel: "👠", hocho: "🔪", hole: "🕳", honey_pot: "🍯", horse: "🐴", horse_racing: "🏇", hospital: "🏥", hot_pepper: "🌶", hotdog: "🌭", hotel: "🏨", hotsprings: "♨️", hourglass: "⌛️", hourglass_flowing_sand: "⏳", house: "🏠", house_with_garden: "🏡", houses: "🏘", hugs: "🤗", hushed: "😯", ice_cream: "🍨", ice_hockey: "🏒", ice_skate: "⛸", icecream: "🍦", id: "🆔", ideograph_advantage: "🉐", imp: "👿", inbox_tray: "📥", incoming_envelope: "📨", tipping_hand_woman: "💁", information_source: "ℹ️", innocent: "😇", interrobang: "⁉️", iphone: "📱", izakaya_lantern: "🏮", jack_o_lantern: "🎃", japan: "🗾", japanese_castle: "🏯", japanese_goblin: "👺", japanese_ogre: "👹", jeans: "👖", joy: "😂", joy_cat: "😹", joystick: "🕹", kaaba: "🕋", key: "🔑", keyboard: "⌨️", keycap_ten: "🔟", kick_scooter: "🛴", kimono: "👘", kiss: "💋", kissing: "😗", kissing_cat: "😽", kissing_closed_eyes: "😚", kissing_heart: "😘", kissing_smiling_eyes: "😙", kiwi_fruit: "🥝", koala: "🐨", koko: "🈁", label: "🏷", large_blue_circle: "🔵", large_blue_diamond: "🔷", large_orange_diamond: "🔶", last_quarter_moon: "🌗", last_quarter_moon_with_face: "🌜", latin_cross: "✝️", laughing: "😆", leaves: "🍃", ledger: "📒", left_luggage: "🛅", left_right_arrow: "↔️", leftwards_arrow_with_hook: "↩️", lemon: "🍋", leo: "♌️", leopard: "🐆", level_slider: "🎚", libra: "♎️", light_rail: "🚈", link: "🔗", lion: "🦁", lips: "👄", lipstick: "💄", lizard: "🦎", lock: "🔒", lock_with_ink_pen: "🔏", lollipop: "🍭", loop: "➿", loud_sound: "🔊", loudspeaker: "📢", love_hotel: "🏩", love_letter: "💌", low_brightness: "🔅", lying_face: "🤥", m: "Ⓜ️", mag: "🔍", mag_right: "🔎", mahjong: "🀄️", mailbox: "📫", mailbox_closed: "📪", mailbox_with_mail: "📬", mailbox_with_no_mail: "📭", man: "👨", man_artist: "👨&zwj;🎨", man_astronaut: "👨&zwj;🚀", man_cartwheeling: "🤸&zwj;♂️", man_cook: "👨&zwj;🍳", man_dancing: "🕺", man_facepalming: "🤦&zwj;♂️", man_factory_worker: "👨&zwj;🏭", man_farmer: "👨&zwj;🌾", man_firefighter: "👨&zwj;🚒", man_health_worker: "👨&zwj;⚕️", man_in_tuxedo: "🤵", man_judge: "👨&zwj;⚖️", man_juggling: "🤹&zwj;♂️", man_mechanic: "👨&zwj;🔧", man_office_worker: "👨&zwj;💼", man_pilot: "👨&zwj;✈️", man_playing_handball: "🤾&zwj;♂️", man_playing_water_polo: "🤽&zwj;♂️", man_scientist: "👨&zwj;🔬", man_shrugging: "🤷&zwj;♂️", man_singer: "👨&zwj;🎤", man_student: "👨&zwj;🎓", man_teacher: "👨&zwj;🏫", man_technologist: "👨&zwj;💻", man_with_gua_pi_mao: "👲", man_with_turban: "👳", tangerine: "🍊", mans_shoe: "👞", mantelpiece_clock: "🕰", maple_leaf: "🍁", martial_arts_uniform: "🥋", mask: "😷", massage_woman: "💆", massage_man: "💆&zwj;♂️", meat_on_bone: "🍖", medal_military: "🎖", medal_sports: "🏅", mega: "📣", melon: "🍈", memo: "📝", men_wrestling: "🤼&zwj;♂️", menorah: "🕎", mens: "🚹", metal: "🤘", metro: "🚇", microphone: "🎤", microscope: "🔬", milk_glass: "🥛", milky_way: "🌌", minibus: "🚐", minidisc: "💽", mobile_phone_off: "📴", money_mouth_face: "🤑", money_with_wings: "💸", moneybag: "💰", monkey: "🐒", monkey_face: "🐵", monorail: "🚝", moon: "🌔", mortar_board: "🎓", mosque: "🕌", motor_boat: "🛥", motor_scooter: "🛵", motorcycle: "🏍", motorway: "🛣", mount_fuji: "🗻", mountain: "⛰", mountain_biking_man: "🚵", mountain_biking_woman: "🚵&zwj;♀️", mountain_cableway: "🚠", mountain_railway: "🚞", mountain_snow: "🏔", mouse: "🐭", mouse2: "🐁", movie_camera: "🎥", moyai: "🗿", mrs_claus: "🤶", muscle: "💪", mushroom: "🍄", musical_keyboard: "🎹", musical_note: "🎵", musical_score: "🎼", mute: "🔇", nail_care: "💅", name_badge: "📛", national_park: "🏞", nauseated_face: "🤢", necktie: "👔", negative_squared_cross_mark: "❎", nerd_face: "🤓", neutral_face: "😐", new: "🆕", new_moon: "🌑", new_moon_with_face: "🌚", newspaper: "📰", newspaper_roll: "🗞", next_track_button: "⏭", ng: "🆖", no_good_man: "🙅&zwj;♂️", no_good_woman: "🙅", night_with_stars: "🌃", no_bell: "🔕", no_bicycles: "🚳", no_entry: "⛔️", no_entry_sign: "🚫", no_mobile_phones: "📵", no_mouth: "😶", no_pedestrians: "🚷", no_smoking: "🚭", "non-potable_water": "🚱", nose: "👃", notebook: "📓", notebook_with_decorative_cover: "📔", notes: "🎶", nut_and_bolt: "🔩", o: "⭕️", o2: "🅾️", ocean: "🌊", octopus: "🐙", oden: "🍢", office: "🏢", oil_drum: "🛢", ok: "🆗", ok_hand: "👌", ok_man: "🙆&zwj;♂️", ok_woman: "🙆", old_key: "🗝", older_man: "👴", older_woman: "👵", om: "🕉", on: "🔛", oncoming_automobile: "🚘", oncoming_bus: "🚍", oncoming_police_car: "🚔", oncoming_taxi: "🚖", open_file_folder: "📂", open_hands: "👐", open_mouth: "😮", open_umbrella: "☂️", ophiuchus: "⛎", orange_book: "📙", orthodox_cross: "☦️", outbox_tray: "📤", owl: "🦉", ox: "🐂", package: "📦", page_facing_up: "📄", page_with_curl: "📃", pager: "📟", paintbrush: "🖌", palm_tree: "🌴", pancakes: "🥞", panda_face: "🐼", paperclip: "📎", paperclips: "🖇", parasol_on_ground: "⛱", parking: "🅿️", part_alternation_mark: "〽️", partly_sunny: "⛅️", passenger_ship: "🛳", passport_control: "🛂", pause_button: "⏸", peace_symbol: "☮️", peach: "🍑", peanuts: "🥜", pear: "🍐", pen: "🖊", pencil2: "✏️", penguin: "🐧", pensive: "😔", performing_arts: "🎭", persevere: "😣", person_fencing: "🤺", pouting_woman: "🙎", phone: "☎️", pick: "⛏", pig: "🐷", pig2: "🐖", pig_nose: "🐽", pill: "💊", pineapple: "🍍", ping_pong: "🏓", pisces: "♓️", pizza: "🍕", place_of_worship: "🛐", plate_with_cutlery: "🍽", play_or_pause_button: "⏯", point_down: "👇", point_left: "👈", point_right: "👉", point_up: "☝️", point_up_2: "👆", police_car: "🚓", policewoman: "👮&zwj;♀️", poodle: "🐩", popcorn: "🍿", post_office: "🏣", postal_horn: "📯", postbox: "📮", potable_water: "🚰", potato: "🥔", pouch: "👝", poultry_leg: "🍗", pound: "💷", rage: "😡", pouting_cat: "😾", pouting_man: "🙎&zwj;♂️", pray: "🙏", prayer_beads: "📿", pregnant_woman: "🤰", previous_track_button: "⏮", prince: "🤴", princess: "👸", printer: "🖨", purple_heart: "💜", purse: "👛", pushpin: "📌", put_litter_in_its_place: "🚮", question: "❓", rabbit: "🐰", rabbit2: "🐇", racehorse: "🐎", racing_car: "🏎", radio: "📻", radio_button: "🔘", radioactive: "☢️", railway_car: "🚃", railway_track: "🛤", rainbow: "🌈", rainbow_flag: "🏳️&zwj;🌈", raised_back_of_hand: "🤚", raised_hand_with_fingers_splayed: "🖐", raised_hands: "🙌", raising_hand_woman: "🙋", raising_hand_man: "🙋&zwj;♂️", ram: "🐏", ramen: "🍜", rat: "🐀", record_button: "⏺", recycle: "♻️", red_circle: "🔴", registered: "®️", relaxed: "☺️", relieved: "😌", reminder_ribbon: "🎗", repeat: "🔁", repeat_one: "🔂", rescue_worker_helmet: "⛑", restroom: "🚻", revolving_hearts: "💞", rewind: "⏪", rhinoceros: "🦏", ribbon: "🎀", rice: "🍚", rice_ball: "🍙", rice_cracker: "🍘", rice_scene: "🎑", right_anger_bubble: "🗯", ring: "💍", robot: "🤖", rocket: "🚀", rofl: "🤣", roll_eyes: "🙄", roller_coaster: "🎢", rooster: "🐓", rose: "🌹", rosette: "🏵", rotating_light: "🚨", round_pushpin: "📍", rowing_man: "🚣", rowing_woman: "🚣&zwj;♀️", rugby_football: "🏉", running_man: "🏃", running_shirt_with_sash: "🎽", running_woman: "🏃&zwj;♀️", sa: "🈂️", sagittarius: "♐️", sake: "🍶", sandal: "👡", santa: "🎅", satellite: "📡", saxophone: "🎷", school: "🏫", school_satchel: "🎒", scissors: "✂️", scorpion: "🦂", scorpius: "♏️", scream: "😱", scream_cat: "🙀", scroll: "📜", seat: "💺", secret: "㊙️", see_no_evil: "🙈", seedling: "🌱", selfie: "🤳", shallow_pan_of_food: "🥘", shamrock: "☘️", shark: "🦈", shaved_ice: "🍧", sheep: "🐑", shell: "🐚", shield: "🛡", shinto_shrine: "⛩", ship: "🚢", shirt: "👕", shopping: "🛍", shopping_cart: "🛒", shower: "🚿", shrimp: "🦐", signal_strength: "📶", six_pointed_star: "🔯", ski: "🎿", skier: "⛷", skull: "💀", skull_and_crossbones: "☠️", sleeping: "😴", sleeping_bed: "🛌", sleepy: "😪", slightly_frowning_face: "🙁", slightly_smiling_face: "🙂", slot_machine: "🎰", small_airplane: "🛩", small_blue_diamond: "🔹", small_orange_diamond: "🔸", small_red_triangle: "🔺", small_red_triangle_down: "🔻", smile: "😄", smile_cat: "😸", smiley: "😃", smiley_cat: "😺", smiling_imp: "😈", smirk: "😏", smirk_cat: "😼", smoking: "🚬", snail: "🐌", snake: "🐍", sneezing_face: "🤧", snowboarder: "🏂", snowflake: "❄️", snowman: "⛄️", snowman_with_snow: "☃️", sob: "😭", soccer: "⚽️", soon: "🔜", sos: "🆘", sound: "🔉", space_invader: "👾", spades: "♠️", spaghetti: "🍝", sparkle: "❇️", sparkler: "🎇", sparkles: "✨", sparkling_heart: "💖", speak_no_evil: "🙊", speaker: "🔈", speaking_head: "🗣", speech_balloon: "💬", speedboat: "🚤", spider: "🕷", spider_web: "🕸", spiral_calendar: "🗓", spiral_notepad: "🗒", spoon: "🥄", squid: "🦑", stadium: "🏟", star: "⭐️", star2: "🌟", star_and_crescent: "☪️", star_of_david: "✡️", stars: "🌠", station: "🚉", statue_of_liberty: "🗽", steam_locomotive: "🚂", stew: "🍲", stop_button: "⏹", stop_sign: "🛑", stopwatch: "⏱", straight_ruler: "📏", strawberry: "🍓", stuck_out_tongue: "😛", stuck_out_tongue_closed_eyes: "😝", stuck_out_tongue_winking_eye: "😜", studio_microphone: "🎙", stuffed_flatbread: "🥙", sun_behind_large_cloud: "🌥", sun_behind_rain_cloud: "🌦", sun_behind_small_cloud: "🌤", sun_with_face: "🌞", sunflower: "🌻", sunglasses: "😎", sunny: "☀️", sunrise: "🌅", sunrise_over_mountains: "🌄", surfing_man: "🏄", surfing_woman: "🏄&zwj;♀️", sushi: "🍣", suspension_railway: "🚟", sweat: "😓", sweat_drops: "💦", sweat_smile: "😅", sweet_potato: "🍠", swimming_man: "🏊", swimming_woman: "🏊&zwj;♀️", symbols: "🔣", synagogue: "🕍", syringe: "💉", taco: "🌮", tada: "🎉", tanabata_tree: "🎋", taurus: "♉️", taxi: "🚕", tea: "🍵", telephone_receiver: "📞", telescope: "🔭", tennis: "🎾", tent: "⛺️", thermometer: "🌡", thinking: "🤔", thought_balloon: "💭", ticket: "🎫", tickets: "🎟", tiger: "🐯", tiger2: "🐅", timer_clock: "⏲", tipping_hand_man: "💁&zwj;♂️", tired_face: "😫", tm: "™️", toilet: "🚽", tokyo_tower: "🗼", tomato: "🍅", tongue: "👅", top: "🔝", tophat: "🎩", tornado: "🌪", trackball: "🖲", tractor: "🚜", traffic_light: "🚥", train: "🚋", train2: "🚆", tram: "🚊", triangular_flag_on_post: "🚩", triangular_ruler: "📐", trident: "🔱", triumph: "😤", trolleybus: "🚎", trophy: "🏆", tropical_drink: "🍹", tropical_fish: "🐠", truck: "🚚", trumpet: "🎺", tulip: "🌷", tumbler_glass: "🥃", turkey: "🦃", turtle: "🐢", tv: "📺", twisted_rightwards_arrows: "🔀", two_hearts: "💕", two_men_holding_hands: "👬", two_women_holding_hands: "👭", u5272: "🈹", u5408: "🈴", u55b6: "🈺", u6307: "🈯️", u6708: "🈷️", u6709: "🈶", u6e80: "🈵", u7121: "🈚️", u7533: "🈸", u7981: "🈲", u7a7a: "🈳", umbrella: "☔️", unamused: "😒", underage: "🔞", unicorn: "🦄", unlock: "🔓", up: "🆙", upside_down_face: "🙃", v: "✌️", vertical_traffic_light: "🚦", vhs: "📼", vibration_mode: "📳", video_camera: "📹", video_game: "🎮", violin: "🎻", virgo: "♍️", volcano: "🌋", volleyball: "🏐", vs: "🆚", vulcan_salute: "🖖", walking_man: "🚶", walking_woman: "🚶&zwj;♀️", waning_crescent_moon: "🌘", waning_gibbous_moon: "🌖", warning: "⚠️", wastebasket: "🗑", watch: "⌚️", water_buffalo: "🐃", watermelon: "🍉", wave: "👋", wavy_dash: "〰️", waxing_crescent_moon: "🌒", wc: "🚾", weary: "😩", wedding: "💒", weight_lifting_man: "🏋️", weight_lifting_woman: "🏋️&zwj;♀️", whale: "🐳", whale2: "🐋", wheel_of_dharma: "☸️", wheelchair: "♿️", white_check_mark: "✅", white_circle: "⚪️", white_flag: "🏳️", white_flower: "💮", white_large_square: "⬜️", white_medium_small_square: "◽️", white_medium_square: "◻️", white_small_square: "▫️", white_square_button: "🔳", wilted_flower: "🥀", wind_chime: "🎐", wind_face: "🌬", wine_glass: "🍷", wink: "😉", wolf: "🐺", woman: "👩", woman_artist: "👩&zwj;🎨", woman_astronaut: "👩&zwj;🚀", woman_cartwheeling: "🤸&zwj;♀️", woman_cook: "👩&zwj;🍳", woman_facepalming: "🤦&zwj;♀️", woman_factory_worker: "👩&zwj;🏭", woman_farmer: "👩&zwj;🌾", woman_firefighter: "👩&zwj;🚒", woman_health_worker: "👩&zwj;⚕️", woman_judge: "👩&zwj;⚖️", woman_juggling: "🤹&zwj;♀️", woman_mechanic: "👩&zwj;🔧", woman_office_worker: "👩&zwj;💼", woman_pilot: "👩&zwj;✈️", woman_playing_handball: "🤾&zwj;♀️", woman_playing_water_polo: "🤽&zwj;♀️", woman_scientist: "👩&zwj;🔬", woman_shrugging: "🤷&zwj;♀️", woman_singer: "👩&zwj;🎤", woman_student: "👩&zwj;🎓", woman_teacher: "👩&zwj;🏫", woman_technologist: "👩&zwj;💻", woman_with_turban: "👳&zwj;♀️", womans_clothes: "👚", womans_hat: "👒", women_wrestling: "🤼&zwj;♀️", womens: "🚺", world_map: "🗺", worried: "😟", wrench: "🔧", writing_hand: "✍️", x: "❌", yellow_heart: "💛", yen: "💴", yin_yang: "☯️", yum: "😋", zap: "⚡️", zipper_mouth_face: "🤐", zzz: "💤", octocat: '<img width="20" height="20" align="absmiddle" src="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAEAAAABACAYAAACqaXHeAAAOwUlEQVR42uVbCVyO6RbPmn0sw9gZS0aZO4y5GTEUE2ObxjZjrbHEJVy3sWS5pkaWxjLEkCVDSbSgFLdESaWSLIVUSIi4kvb9f895vi/zbbR+yZ339/tbnu99n/ec/3Oe85xznufV0CjDBaAdwZqwnzCJ0FXjHV70/i8J5oQDhCFV8cJdq1atwqxZs+Ds7Iz4+HhqwgXCLELNKlK6G2Ej4e6lS5ewZcsWzJgxA+fOnWNZFqvzxT1v3boF/qcsBg0ahP3796OwsJAFWKYuIqjfPoS9cXFxWL58Obp06SInh5aWFr//jjoJWLlu3TolAorRuXNn7Ny5k4W4Spgj81xrgj5hLmED4RDhlNRygglBhADCSakpWxFMCHoETUJTwrYHDx7A1NT0je9nPHz4kN/fXl0EeI0aNeqtAjB69+4NPz8/FsSdlXvy5An8/f1hZ2cHCwsLGBsbY/To0cJy9PT0MGDAAAwePBhGRkbClNesWYODBw8iODgYOTk53M/d9evXo27duiW++8iRI3z/ZHURENOjR48ShSjGuHHjhHJ16tQp9TOKaNWqlZKpvw1MHluQOpSvk5eXh5YtW5ZbmarAvHnzmIBd6iCgXnZ2Npo1a1atCWAfwY5SHQTUKCoqQocOHao1AebmHBJgi7p8QBDP6epMwKFDvMDAWF0ELLS1ta3WBNy9e5cJMFIXAdvt7e2rNQHDhw9nAv5D+KKylV9y8+bNCi1pVYWZM2cyCfaVTcDdsqzH7xpBQRxcwqyylLdi5/K+KM/Q0dFhAqIri4Bn1T0AUgVpdmhYUeVHnD59+r1TnjF27Fgm4HhFCThoYmLyXhLQoEGD4mRKsyIE3OrZs+d7SQCDCyZcNSqv8k1evXoFTU3NUr+wzUcfYqRBf8yb/C2WzfoBFoTF08fBdMIITDD8CsP1+kL30x7Q6dYZH7drjfZ0f4fWLdG1Q1t81qMLBvTRwejB/TBl1BDMnzQGS2dMxKo5k7Fs9iSY/jAaBvR8Pc26pZaH02quLZSXgO6xsbGlelGnli1wZKcVMqN8gKcRwItrf+K/VB95doXaLwOJIVSzOU/+2Re5kV7IuuyJrIhTyLt6mmztLBBPNZLHoUAy9fE8UvJ8ikxfj8PwJPQErJeYlkquTZs2MQFLykuANgc/Jb2kn3Z3ZMaQUrmxwO1zyAo7gfRAJ6RfOIyMEFdkXj5F8BTK5lzxQv610yi8QcFatI8gQoCIK7x+hojwRnaE5H4JTiEj9Pjr/rJDqcZyn9b4ovu45LYbdWvXeqtsXMHiSlZ5CegRExPz1hd83PYj5POo0QinXyLFg48hnZTOiQ1Dzr1IZEaeQRoJn0HKZIR7lA2kfHrQUerXHTlx4ZL+rnjjFRGRGeYB5MUj2GnbW+XbuJFrp1heXgI6JCYmvvUFN1x3Aek3SWkapRAXMeJFGS8ge2Xfuog0toaykED3Mpk8+shOk+sv68Y50V9WuKewBKt5094o39atW/mRf5WXgIYZGRlo3Lixys4nj6A6Z1YMcqRCpwU4ouDlUyHk/QA/hNttR25Wlvh/ZthJUsil9ATQ/axkYbqEzDgfL0Ts/x35+aLyTES7IY36Q6w/+Q4/tP6wuUoZ9+7dy7ebVmQZjO/atavKzn32rAdeXkd6KCkXdAxZ13yFcLFnvPD73zrDVrsdTs6eggKSuSjjORHkUGoC0i86Iyc6QPQX7eqMnTodYNuzHU4vnosiaitMSUSavwMy6d3IvEUrzViVMrq5uXEX4ytCgL++vr5Sx7Vr1cIDX0dKkQJfj37Rs3jw1sBxkwlwGD4Ax3+ciN1faCHW76xQRFgAOcjSEMBkIe0x8nLzcez7kTg8Rh/uxuOxR/cTJISFSfq7eATpZCk8CAfXLVFJwIULXHnHoIoQYLtw4UKljps2aogXQcQuef/XAiMDKY+S4DhyEFwpDnCj9f+Afl8EbbWRTANaAdihlYoAMn8aZzyNuYODX/eD29TvRH/7v+qN8H27JdOAyWQfQQ74xPafVRLAPox9WUlK6hIGEgx4f00Kg2JcvHhRqeP6FIwknXemyen/2gLIIeC/CYk49M0AuE4xgtu0sThg8AUCN62TEuBdRgJo2Y+Kxh9D/k59SQiwH9QHobt3SAk4KSGA4oWjm1YqyVi8U6Soj4yOrHM/jTAyKVby/PnzIoNi8L+L4eXlpXoFcLcTgc1rAlISkJeXDxeK2A6P1hdTwI6mQPTJE+WbAlnJyE7PhNO3Q3BkrKGYWtxfHMkkmQLO0ilwA7+vXqAkn66urtBLUZ9iHfm30NBQaPAf165dA0d9vP2UlJSEp0+f4vHjx3j06JH4e+rUqUovcNmyGkiNEkLwklXsBG+ecMUOnfbYod1emG5uboFKJ8jPFVD0l0dBUHqoPDHpQeQEb0qc4FUHe3KAbYUT9JgzDbwOFL5MfN0fXkXhJ5PxSvLt2LFD1Ah5u4z1YJ14l4qnBe8v3rhxAzz4PAVG8nLHivIP0dHRiIiIQGRkpEgmrl69ClW1QBMjQ7LDW8hmU+RRI69ckJIkhL7jfRJBm62R+TJVYq6h0jhBRslsivqenT2MF/7OyI70VmkFhWnPJaS6OyPkt43IycqR9EfWlH7JDQUUTuNhCHR7Ke9YcRp/5coVoQPrcvnyZURFRYmBZlLS0kR8MVLD29sbnp6e8PHxQUBAgCgn8YO8E3z79m3BGKeVc+bMkXuBZt06SA12F/F5Go0gR4C8HBalPZMPXKL8lQKhPAqF+f97KXFyNx6HQsoPsshJ/kmAp2TKkJLISpXvjyxNhMYcDVLOEO+lPDi8B5mamipkZx1YF9YpJCRErAy+vr5CZ9ZdWABhDGEYYTBhAOFz3g4nfMJelNCbkNCpUye5F034mvxIPi1/FM+zQCw0k5B9O0iEr5kRXkqhMJOVf9NXIHjtT7hmaymSoBzKETimkAuFpaF1dkwI9RcmIYaXv3BJXoGCuyIgk5WpefPmKCgoYK46SmX/RKoL69Sfl0WuFEl1HlmWJXE5z6WmTZvKJxxmxkIQ3AuU5APk6NICj4hRT6eITTEEzqWk55HHPjz3cxJhNF5cxeNT9kj2cRDTQjEkzpDtjyyCic5l5fEA7uSHFEefR5pPsahrb2B9QkICFHeJ51HunkdLIg0VLY0BFKdLwllVHp4dHyvst3QuEiiju21vA/+VZkiluIKt4I3RIfWXQ4QgKUxkni47LJWUP3PmjHo2RxVI+CebmKJP6EiFDVurxUgmExe5PHlnPAkn8w4QqW62NCVmYopozid5H0CI9RKE21ggJeAYEeMnfitOnRn5XCfgeJ+VTosWQU8MOc6ZE0cqnUm4fv165SrPBVHCfMI4TowUfmOfsIcdJh92kBWmUcP6GDt8EDZbzIffH5tx3/ewSFjw5LKk0MEFEkZenDBjgew7Yiog5brkt+QrknvJmhIp4Apw/A1bVpjhG/0v5d7Vrl07bNu2TelUSqUoz8uI3Z49OEtBAy+TdP1CqKtwHzvQUxxgTJs2TeX5gdq1a0ObSmCjh+jB+NuvRamL1+3ls77HCip1rTSdJP5eNnMizKndjMLoH42G4bthX+FzHS3UVVEC69evH3799VeKMXJZrlWKclUGAZ5jxoxB02ZNsNlxH74aagBHZyex986HlVTczyGmI58h4CjL2toa48ePFxsUPEotWrQoc0GT0/C2bduiY8eO4ISMcxLeoOFYhS6qm2EpoZG65jmbv+dPSyRZlt5QfVjvtX19AOFNL+aDFNI4m0eFc9Ho5ORkaGtrl5kAVp6DMOk88efEjLe++ZhclZwHTJHEHbs4YOCmLj2645fdvwnTK42zoXtaEHwNDQ3LXdZm5yad3/2r+gQmDsRnIF5KAldX6zdsgG/GG8F44Vzcu3eP2y1K6GPr2rVrK1zbnz59Or/LoaoJCPZ4kCZsjw9GECL79OmDj9q2wb+320C3/5fgPQO6Vrzh+fpcDqxXr16lbHBwgkZXm6okYJr0ECMrX5vraiJ1lArEjrEnzWuOqemiYj9spGd2ee478XkiPsJakmJ83qA05/8qXNurJFLiunXrhpo1a6LxB02wyHIFZpovgOHwYfjZ0hK2lH5u2rwZ5suWYv5ycyUlmjRpgl69eimlrFy3kwuoyOvXr19frm3RokVMwPZ3TYC57E6xVq+e6KzVDSaL/oEp82Zh8IhhWLjGAp/p9oX5ujVKBNjY2MDV1VWuzd3dXaTesm2biUQuZ8u28elSPmKr8a4vdog8GnJpcT1N1KHUuBbt0jSgWuGbzJh3mVhh2TYHBwdxjFa2jVcZnvPVlQBOLXdZWlqW2ZFxNYYVlm07fPgwAgMD5dr4OD5HeHLFFxM+O42DGtXhIkFaMQlcUjIzM0P37t1Ro0YNpZPjPJcVK7SOjo5ybU5OTqIAo0gAh97VlgAZIj4l8Pn4WFaO64ocuXG6zJtDbMqySnC7IgF8uptLVrJtq1evFuWqak+A4j4i4TNpltiJ8LPiNFFFwNGjRyWFyfedAFUny/joekkEuLi4KK0CfykCeFnkiu1flgBeFtl3/D8SsMbKykpOifv37ysRcPz4cVHKUiSA8wwNdR9/VTMBSh9Y8S4Nf2qnSICiBbDzVCRg9uzZTMC+94kAv6FDh8opwRsVHPjItnl4eEDxHNLKlStFXV+2javQ/M1SpZe+1KA4L4G7WDG57fSm/OUbXiqG0ewAFYOeYcN4fwZhvLkp2y4tftrxcltdlf/w+fPn4qNGxTCYU2m6nrRu3VqunT/EoiuZvw6TTZHpyuNNmEaNGsndP3fu3OJAq1N1JOAHDmyKheVtNP4OkE2crULRAW7fvl20EyyLy24a8p+/7WISFixYIMLt4t82bNhQYjXqXREgPq3j74mlX3AmSL8E1eOPIBXnuVT5OsVZpuLnOMeOHeN7vifwiYhYzhC5IpwlOXj1QXWdBmy/XWU/X+UqMZfKBw4cKAobHPlJlZe9h6tOu+7cuSN2dg0MDMSSyZUpmXvaSD+crq/xvl0k9BTCRa7qEPq+5T4t6ffF52WVV+f1P6zyLG30bsU4AAAAAElFTkSuQmCC">', showdown: '<img width="20" height="20" align="absmiddle" src="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAEAAAABACAYAAACqaXHeAAAACXBIWXMAAAsTAAALEwEAmpwYAAAKT2lDQ1BQaG90b3Nob3AgSUNDIHByb2ZpbGUAAHjanVNnVFPpFj333vRCS4iAlEtvUhUIIFJCi4AUkSYqIQkQSoghodkVUcERRUUEG8igiAOOjoCMFVEsDIoK2AfkIaKOg6OIisr74Xuja9a89+bN/rXXPues852zzwfACAyWSDNRNYAMqUIeEeCDx8TG4eQuQIEKJHAAEAizZCFz/SMBAPh+PDwrIsAHvgABeNMLCADATZvAMByH/w/qQplcAYCEAcB0kThLCIAUAEB6jkKmAEBGAYCdmCZTAKAEAGDLY2LjAFAtAGAnf+bTAICd+Jl7AQBblCEVAaCRACATZYhEAGg7AKzPVopFAFgwABRmS8Q5ANgtADBJV2ZIALC3AMDOEAuyAAgMADBRiIUpAAR7AGDIIyN4AISZABRG8lc88SuuEOcqAAB4mbI8uSQ5RYFbCC1xB1dXLh4ozkkXKxQ2YQJhmkAuwnmZGTKBNA/g88wAAKCRFRHgg/P9eM4Ors7ONo62Dl8t6r8G/yJiYuP+5c+rcEAAAOF0ftH+LC+zGoA7BoBt/qIl7gRoXgugdfeLZrIPQLUAoOnaV/Nw+H48PEWhkLnZ2eXk5NhKxEJbYcpXff5nwl/AV/1s+X48/Pf14L7iJIEyXYFHBPjgwsz0TKUcz5IJhGLc5o9H/LcL//wd0yLESWK5WCoU41EScY5EmozzMqUiiUKSKcUl0v9k4t8s+wM+3zUAsGo+AXuRLahdYwP2SycQWHTA4vcAAPK7b8HUKAgDgGiD4c93/+8//UegJQCAZkmScQAAXkQkLlTKsz/HCAAARKCBKrBBG/TBGCzABhzBBdzBC/xgNoRCJMTCQhBCCmSAHHJgKayCQiiGzbAdKmAv1EAdNMBRaIaTcA4uwlW4Dj1wD/phCJ7BKLyBCQRByAgTYSHaiAFiilgjjggXmYX4IcFIBBKLJCDJiBRRIkuRNUgxUopUIFVIHfI9cgI5h1xGupE7yAAygvyGvEcxlIGyUT3UDLVDuag3GoRGogvQZHQxmo8WoJvQcrQaPYw2oefQq2gP2o8+Q8cwwOgYBzPEbDAuxsNCsTgsCZNjy7EirAyrxhqwVqwDu4n1Y8+xdwQSgUXACTYEd0IgYR5BSFhMWE7YSKggHCQ0EdoJNwkDhFHCJyKTqEu0JroR+cQYYjIxh1hILCPWEo8TLxB7iEPENyQSiUMyJ7mQAkmxpFTSEtJG0m5SI+ksqZs0SBojk8naZGuyBzmULCAryIXkneTD5DPkG+Qh8lsKnWJAcaT4U+IoUspqShnlEOU05QZlmDJBVaOaUt2ooVQRNY9aQq2htlKvUYeoEzR1mjnNgxZJS6WtopXTGmgXaPdpr+h0uhHdlR5Ol9BX0svpR+iX6AP0dwwNhhWDx4hnKBmbGAcYZxl3GK+YTKYZ04sZx1QwNzHrmOeZD5lvVVgqtip8FZHKCpVKlSaVGyovVKmqpqreqgtV81XLVI+pXlN9rkZVM1PjqQnUlqtVqp1Q61MbU2epO6iHqmeob1Q/pH5Z/YkGWcNMw09DpFGgsV/jvMYgC2MZs3gsIWsNq4Z1gTXEJrHN2Xx2KruY/R27iz2qqaE5QzNKM1ezUvOUZj8H45hx+Jx0TgnnKKeX836K3hTvKeIpG6Y0TLkxZVxrqpaXllirSKtRq0frvTau7aedpr1Fu1n7gQ5Bx0onXCdHZ4/OBZ3nU9lT3acKpxZNPTr1ri6qa6UbobtEd79up+6Ynr5egJ5Mb6feeb3n+hx9L/1U/W36p/VHDFgGswwkBtsMzhg8xTVxbzwdL8fb8VFDXcNAQ6VhlWGX4YSRudE8o9VGjUYPjGnGXOMk423GbcajJgYmISZLTepN7ppSTbmmKaY7TDtMx83MzaLN1pk1mz0x1zLnm+eb15vft2BaeFostqi2uGVJsuRaplnutrxuhVo5WaVYVVpds0atna0l1rutu6cRp7lOk06rntZnw7Dxtsm2qbcZsOXYBtuutm22fWFnYhdnt8Wuw+6TvZN9un2N/T0HDYfZDqsdWh1+c7RyFDpWOt6azpzuP33F9JbpL2dYzxDP2DPjthPLKcRpnVOb00dnF2e5c4PziIuJS4LLLpc+Lpsbxt3IveRKdPVxXeF60vWdm7Obwu2o26/uNu5p7ofcn8w0nymeWTNz0MPIQ+BR5dE/C5+VMGvfrH5PQ0+BZ7XnIy9jL5FXrdewt6V3qvdh7xc+9j5yn+M+4zw33jLeWV/MN8C3yLfLT8Nvnl+F30N/I/9k/3r/0QCngCUBZwOJgUGBWwL7+Hp8Ib+OPzrbZfay2e1BjKC5QRVBj4KtguXBrSFoyOyQrSH355jOkc5pDoVQfujW0Adh5mGLw34MJ4WHhVeGP45wiFga0TGXNXfR3ENz30T6RJZE3ptnMU85ry1KNSo+qi5qPNo3ujS6P8YuZlnM1VidWElsSxw5LiquNm5svt/87fOH4p3iC+N7F5gvyF1weaHOwvSFpxapLhIsOpZATIhOOJTwQRAqqBaMJfITdyWOCnnCHcJnIi/RNtGI2ENcKh5O8kgqTXqS7JG8NXkkxTOlLOW5hCepkLxMDUzdmzqeFpp2IG0yPTq9MYOSkZBxQqohTZO2Z+pn5mZ2y6xlhbL+xW6Lty8elQfJa7OQrAVZLQq2QqboVFoo1yoHsmdlV2a/zYnKOZarnivN7cyzytuQN5zvn//tEsIS4ZK2pYZLVy0dWOa9rGo5sjxxedsK4xUFK4ZWBqw8uIq2Km3VT6vtV5eufr0mek1rgV7ByoLBtQFr6wtVCuWFfevc1+1dT1gvWd+1YfqGnRs+FYmKrhTbF5cVf9go3HjlG4dvyr+Z3JS0qavEuWTPZtJm6ebeLZ5bDpaql+aXDm4N2dq0Dd9WtO319kXbL5fNKNu7g7ZDuaO/PLi8ZafJzs07P1SkVPRU+lQ27tLdtWHX+G7R7ht7vPY07NXbW7z3/T7JvttVAVVN1WbVZftJ+7P3P66Jqun4lvttXa1ObXHtxwPSA/0HIw6217nU1R3SPVRSj9Yr60cOxx++/p3vdy0NNg1VjZzG4iNwRHnk6fcJ3/ceDTradox7rOEH0x92HWcdL2pCmvKaRptTmvtbYlu6T8w+0dbq3nr8R9sfD5w0PFl5SvNUyWna6YLTk2fyz4ydlZ19fi753GDborZ752PO32oPb++6EHTh0kX/i+c7vDvOXPK4dPKy2+UTV7hXmq86X23qdOo8/pPTT8e7nLuarrlca7nuer21e2b36RueN87d9L158Rb/1tWeOT3dvfN6b/fF9/XfFt1+cif9zsu72Xcn7q28T7xf9EDtQdlD3YfVP1v+3Njv3H9qwHeg89HcR/cGhYPP/pH1jw9DBY+Zj8uGDYbrnjg+OTniP3L96fynQ89kzyaeF/6i/suuFxYvfvjV69fO0ZjRoZfyl5O/bXyl/erA6xmv28bCxh6+yXgzMV70VvvtwXfcdx3vo98PT+R8IH8o/2j5sfVT0Kf7kxmTk/8EA5jz/GMzLdsAAECtaVRYdFhNTDpjb20uYWRvYmUueG1wAAAAAAA8P3hwYWNrZXQgYmVnaW49Iu+7vyIgaWQ9Ilc1TTBNcENlaGlIenJlU3pOVGN6a2M5ZCI/Pgo8eDp4bXBtZXRhIHhtbG5zOng9ImFkb2JlOm5zOm1ldGEvIiB4OnhtcHRrPSJBZG9iZSBYTVAgQ29yZSA1LjYtYzA2NyA3OS4xNTc3NDcsIDIwMTUvMDMvMzAtMjM6NDA6NDIgICAgICAgICI+CiAgIDxyZGY6UkRGIHhtbG5zOnJkZj0iaHR0cDovL3d3dy53My5vcmcvMTk5OS8wMi8yMi1yZGYtc3ludGF4LW5zIyI+CiAgICAgIDxyZGY6RGVzY3JpcHRpb24gcmRmOmFib3V0PSIiCiAgICAgICAgICAgIHhtbG5zOnhtcD0iaHR0cDovL25zLmFkb2JlLmNvbS94YXAvMS4wLyIKICAgICAgICAgICAgeG1sbnM6cGhvdG9zaG9wPSJodHRwOi8vbnMuYWRvYmUuY29tL3Bob3Rvc2hvcC8xLjAvIgogICAgICAgICAgICB4bWxuczpkYz0iaHR0cDovL3B1cmwub3JnL2RjL2VsZW1lbnRzLzEuMS8iCiAgICAgICAgICAgIHhtbG5zOnhtcE1NPSJodHRwOi8vbnMuYWRvYmUuY29tL3hhcC8xLjAvbW0vIgogICAgICAgICAgICB4bWxuczpzdEV2dD0iaHR0cDovL25zLmFkb2JlLmNvbS94YXAvMS4wL3NUeXBlL1Jlc291cmNlRXZlbnQjIgogICAgICAgICAgICB4bWxuczpzdFJlZj0iaHR0cDovL25zLmFkb2JlLmNvbS94YXAvMS4wL3NUeXBlL1Jlc291cmNlUmVmIyIKICAgICAgICAgICAgeG1sbnM6dGlmZj0iaHR0cDovL25zLmFkb2JlLmNvbS90aWZmLzEuMC8iCiAgICAgICAgICAgIHhtbG5zOmV4aWY9Imh0dHA6Ly9ucy5hZG9iZS5jb20vZXhpZi8xLjAvIj4KICAgICAgICAgPHhtcDpDcmVhdG9yVG9vbD5BZG9iZSBQaG90b3Nob3AgQ0MgMjAxNSAoV2luZG93cyk8L3htcDpDcmVhdG9yVG9vbD4KICAgICAgICAgPHhtcDpDcmVhdGVEYXRlPjIwMTUtMDEtMTVUMjE6MDE6MTlaPC94bXA6Q3JlYXRlRGF0ZT4KICAgICAgICAgPHhtcDpNZXRhZGF0YURhdGU+MjAxNy0xMC0yNFQxMzozMTozMCswMTowMDwveG1wOk1ldGFkYXRhRGF0ZT4KICAgICAgICAgPHhtcDpNb2RpZnlEYXRlPjIwMTctMTAtMjRUMTM6MzE6MzArMDE6MDA8L3htcDpNb2RpZnlEYXRlPgogICAgICAgICA8cGhvdG9zaG9wOkNvbG9yTW9kZT4zPC9waG90b3Nob3A6Q29sb3JNb2RlPgogICAgICAgICA8cGhvdG9zaG9wOklDQ1Byb2ZpbGU+c1JHQiBJRUM2MTk2Ni0yLjE8L3Bob3Rvc2hvcDpJQ0NQcm9maWxlPgogICAgICAgICA8cGhvdG9zaG9wOlRleHRMYXllcnM+CiAgICAgICAgICAgIDxyZGY6QmFnPgogICAgICAgICAgICAgICA8cmRmOmxpIHJkZjpwYXJzZVR5cGU9IlJlc291cmNlIj4KICAgICAgICAgICAgICAgICAgPHBob3Rvc2hvcDpMYXllck5hbWU+UyAtPC9waG90b3Nob3A6TGF5ZXJOYW1lPgogICAgICAgICAgICAgICAgICA8cGhvdG9zaG9wOkxheWVyVGV4dD5TIC08L3Bob3Rvc2hvcDpMYXllclRleHQ+CiAgICAgICAgICAgICAgIDwvcmRmOmxpPgogICAgICAgICAgICA8L3JkZjpCYWc+CiAgICAgICAgIDwvcGhvdG9zaG9wOlRleHRMYXllcnM+CiAgICAgICAgIDxkYzpmb3JtYXQ+aW1hZ2UvcG5nPC9kYzpmb3JtYXQ+CiAgICAgICAgIDx4bXBNTTpJbnN0YW5jZUlEPnhtcC5paWQ6N2NkMzQxNzctOWYyZi0yNDRiLWEyYjQtMzU1MzJkY2Y1MWJiPC94bXBNTTpJbnN0YW5jZUlEPgogICAgICAgICA8eG1wTU06RG9jdW1lbnRJRD5hZG9iZTpkb2NpZDpwaG90b3Nob3A6M2E1YzgxYmYtYjhiNy0xMWU3LTk0NDktYTQ2MzdlZjJkNjMzPC94bXBNTTpEb2N1bWVudElEPgogICAgICAgICA8eG1wTU06T3JpZ2luYWxEb2N1bWVudElEPnhtcC5kaWQ6NjBDNUFFNjVGNjlDRTQxMTk0NUE4NTVFM0JDQTdFRUI8L3htcE1NOk9yaWdpbmFsRG9jdW1lbnRJRD4KICAgICAgICAgPHhtcE1NOkhpc3Rvcnk+CiAgICAgICAgICAgIDxyZGY6U2VxPgogICAgICAgICAgICAgICA8cmRmOmxpIHJkZjpwYXJzZVR5cGU9IlJlc291cmNlIj4KICAgICAgICAgICAgICAgICAgPHN0RXZ0OmFjdGlvbj5jcmVhdGVkPC9zdEV2dDphY3Rpb24+CiAgICAgICAgICAgICAgICAgIDxzdEV2dDppbnN0YW5jZUlEPnhtcC5paWQ6NjBDNUFFNjVGNjlDRTQxMTk0NUE4NTVFM0JDQTdFRUI8L3N0RXZ0Omluc3RhbmNlSUQ+CiAgICAgICAgICAgICAgICAgIDxzdEV2dDp3aGVuPjIwMTUtMDEtMTVUMjE6MDE6MTlaPC9zdEV2dDp3aGVuPgogICAgICAgICAgICAgICAgICA8c3RFdnQ6c29mdHdhcmVBZ2VudD5BZG9iZSBQaG90b3Nob3AgQ1M2IChXaW5kb3dzKTwvc3RFdnQ6c29mdHdhcmVBZ2VudD4KICAgICAgICAgICAgICAgPC9yZGY6bGk+CiAgICAgICAgICAgICAgIDxyZGY6bGkgcmRmOnBhcnNlVHlwZT0iUmVzb3VyY2UiPgogICAgICAgICAgICAgICAgICA8c3RFdnQ6YWN0aW9uPnNhdmVkPC9zdEV2dDphY3Rpb24+CiAgICAgICAgICAgICAgICAgIDxzdEV2dDppbnN0YW5jZUlEPnhtcC5paWQ6ODZjNjBkMGQtOGY0Yy01ZTRlLWEwMjQtODI4ZWQyNTIwZDc3PC9zdEV2dDppbnN0YW5jZUlEPgogICAgICAgICAgICAgICAgICA8c3RFdnQ6d2hlbj4yMDE3LTEwLTI0VDEzOjMxOjMwKzAxOjAwPC9zdEV2dDp3aGVuPgogICAgICAgICAgICAgICAgICA8c3RFdnQ6c29mdHdhcmVBZ2VudD5BZG9iZSBQaG90b3Nob3AgQ0MgMjAxNSAoV2luZG93cyk8L3N0RXZ0OnNvZnR3YXJlQWdlbnQ+CiAgICAgICAgICAgICAgICAgIDxzdEV2dDpjaGFuZ2VkPi88L3N0RXZ0OmNoYW5nZWQ+CiAgICAgICAgICAgICAgIDwvcmRmOmxpPgogICAgICAgICAgICAgICA8cmRmOmxpIHJkZjpwYXJzZVR5cGU9IlJlc291cmNlIj4KICAgICAgICAgICAgICAgICAgPHN0RXZ0OmFjdGlvbj5jb252ZXJ0ZWQ8L3N0RXZ0OmFjdGlvbj4KICAgICAgICAgICAgICAgICAgPHN0RXZ0OnBhcmFtZXRlcnM+ZnJvbSBhcHBsaWNhdGlvbi92bmQuYWRvYmUucGhvdG9zaG9wIHRvIGltYWdlL3BuZzwvc3RFdnQ6cGFyYW1ldGVycz4KICAgICAgICAgICAgICAgPC9yZGY6bGk+CiAgICAgICAgICAgICAgIDxyZGY6bGkgcmRmOnBhcnNlVHlwZT0iUmVzb3VyY2UiPgogICAgICAgICAgICAgICAgICA8c3RFdnQ6YWN0aW9uPmRlcml2ZWQ8L3N0RXZ0OmFjdGlvbj4KICAgICAgICAgICAgICAgICAgPHN0RXZ0OnBhcmFtZXRlcnM+Y29udmVydGVkIGZyb20gYXBwbGljYXRpb24vdm5kLmFkb2JlLnBob3Rvc2hvcCB0byBpbWFnZS9wbmc8L3N0RXZ0OnBhcmFtZXRlcnM+CiAgICAgICAgICAgICAgIDwvcmRmOmxpPgogICAgICAgICAgICAgICA8cmRmOmxpIHJkZjpwYXJzZVR5cGU9IlJlc291cmNlIj4KICAgICAgICAgICAgICAgICAgPHN0RXZ0OmFjdGlvbj5zYXZlZDwvc3RFdnQ6YWN0aW9uPgogICAgICAgICAgICAgICAgICA8c3RFdnQ6aW5zdGFuY2VJRD54bXAuaWlkOjdjZDM0MTc3LTlmMmYtMjQ0Yi1hMmI0LTM1NTMyZGNmNTFiYjwvc3RFdnQ6aW5zdGFuY2VJRD4KICAgICAgICAgICAgICAgICAgPHN0RXZ0OndoZW4+MjAxNy0xMC0yNFQxMzozMTozMCswMTowMDwvc3RFdnQ6d2hlbj4KICAgICAgICAgICAgICAgICAgPHN0RXZ0OnNvZnR3YXJlQWdlbnQ+QWRvYmUgUGhvdG9zaG9wIENDIDIwMTUgKFdpbmRvd3MpPC9zdEV2dDpzb2Z0d2FyZUFnZW50PgogICAgICAgICAgICAgICAgICA8c3RFdnQ6Y2hhbmdlZD4vPC9zdEV2dDpjaGFuZ2VkPgogICAgICAgICAgICAgICA8L3JkZjpsaT4KICAgICAgICAgICAgPC9yZGY6U2VxPgogICAgICAgICA8L3htcE1NOkhpc3Rvcnk+CiAgICAgICAgIDx4bXBNTTpEZXJpdmVkRnJvbSByZGY6cGFyc2VUeXBlPSJSZXNvdXJjZSI+CiAgICAgICAgICAgIDxzdFJlZjppbnN0YW5jZUlEPnhtcC5paWQ6ODZjNjBkMGQtOGY0Yy01ZTRlLWEwMjQtODI4ZWQyNTIwZDc3PC9zdFJlZjppbnN0YW5jZUlEPgogICAgICAgICAgICA8c3RSZWY6ZG9jdW1lbnRJRD54bXAuZGlkOjYwQzVBRTY1RjY5Q0U0MTE5NDVBODU1RTNCQ0E3RUVCPC9zdFJlZjpkb2N1bWVudElEPgogICAgICAgICAgICA8c3RSZWY6b3JpZ2luYWxEb2N1bWVudElEPnhtcC5kaWQ6NjBDNUFFNjVGNjlDRTQxMTk0NUE4NTVFM0JDQTdFRUI8L3N0UmVmOm9yaWdpbmFsRG9jdW1lbnRJRD4KICAgICAgICAgPC94bXBNTTpEZXJpdmVkRnJvbT4KICAgICAgICAgPHRpZmY6T3JpZW50YXRpb24+MTwvdGlmZjpPcmllbnRhdGlvbj4KICAgICAgICAgPHRpZmY6WFJlc29sdXRpb24+NzIwMDAwLzEwMDAwPC90aWZmOlhSZXNvbHV0aW9uPgogICAgICAgICA8dGlmZjpZUmVzb2x1dGlvbj43MjAwMDAvMTAwMDA8L3RpZmY6WVJlc29sdXRpb24+CiAgICAgICAgIDx0aWZmOlJlc29sdXRpb25Vbml0PjI8L3RpZmY6UmVzb2x1dGlvblVuaXQ+CiAgICAgICAgIDxleGlmOkNvbG9yU3BhY2U+MTwvZXhpZjpDb2xvclNwYWNlPgogICAgICAgICA8ZXhpZjpQaXhlbFhEaW1lbnNpb24+NjQ8L2V4aWY6UGl4ZWxYRGltZW5zaW9uPgogICAgICAgICA8ZXhpZjpQaXhlbFlEaW1lbnNpb24+NjQ8L2V4aWY6UGl4ZWxZRGltZW5zaW9uPgogICAgICA8L3JkZjpEZXNjcmlwdGlvbj4KICAgPC9yZGY6UkRGPgo8L3g6eG1wbWV0YT4KICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIAogICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgCiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAKICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIAogICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgCiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAKICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIAogICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgCiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAKICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIAogICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgCiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAKICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIAogICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgCiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAKICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIAogICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgCiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAKICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIAogICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgCiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAKICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIAogICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgCiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAKICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIAogICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgCiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAKICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIAogICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgCiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAKICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIAogICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgCiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAKICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIAogICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgCiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAKICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIAogICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgCiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAKICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIAogICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgCiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAKICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIAogICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgCiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAKICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIAogICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgCiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAKICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIAogICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgCiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAKICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIAogICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgCiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAKICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIAogICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgCiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAKICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIAogICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgCiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAKICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIAogICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgCiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAKICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIAogICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgCiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAKICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIAogICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgCiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAKICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIAogICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgCiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAKICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIAogICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgCiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAKICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIAogICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgCiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAKICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIAogICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgCiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAKICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIAogICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgCiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAKICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIAogICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgCiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAKICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIAogICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgCiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAKICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIAogICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgCiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAKICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIAogICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgCiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAKICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIAogICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgCiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAKICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIAogICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgCiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAKICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIAogICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgCiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAKICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIAogICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgCiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAKICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIAogICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgCiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAKICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIAogICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgCiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAKICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIAogICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgCiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAKICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIAogICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgCiAgICAgICAgICAgICAgICAgICAgICAgICAgICAKPD94cGFja2V0IGVuZD0idyI/Pse7bzcAAAAgY0hSTQAAeiUAAICDAAD5/wAAgOkAAHUwAADqYAAAOpgAABdvkl/FRgAAA1JJREFUeNrsm1+OmlAUhz+aeS9dwZggJn1AnRUMO6jpBgZXULuC2hWUWUGZBTSxKyiuoA4mfUBMnB04K5g+9DihRBHlyh/lJLwIXLgf99xzzu9etZeXFy7Z3nDh1gBoAFy4XeVtQNO0zNcapmUDfUBPnFoBfhQGq6IBaHmjwD4Ahmk5wAD4kKG5J8CNwsAFaHe6DvA9cc0wCgOv8gDka3vA9RHNPgo0D7hNnJtGYWBXxgV2dH4MfMnRRA+Y1WIO2NJ5F/ikoKm3tYsChmkNFHW+fmHQMC1dfHaXPQP3wM1yMdc2B/AOGALTWobBmI1Shu0UGCwX83XyRBQGawHntTtdG5gUNfxVu4CTNqNv6/wWGL7kCc+1AmCYVisl3I2ydD4GYZUCs7IjoLXrxHIx9w9tLAqDCfBwDrXAY457x+cAoCfuwRGjYFUnAGk+PsjR7s8Dn1VeLWCYVlpDw+VivjVHSHt+u9PVJbzGzZXQWTkAkz0V31fATUaEsjVJlQBs4FeGcteLgzgbAALBA+4y3voAeJL8nA0AHfClnM1qm1HhnYUidCSE+KzvSSJUTwAxCOMcpfETMFYpfRUKIAbCFhC3OTJJJwqDWS0BxED0JZ4Pjix1P2+E0loCSMBwyK4S/xc1ojBwag8gMU84cvTKGgmlAYhngu1O9xAXuVE5J1QCQCz3bwHuHvdQui5QKQAxEO6eEKpsFCgTRSXkvdoxSlBMCxhJJbgrrbZRtHCiShN0pRB6PeQ3ckBw2K0oKXMBVYJIP+Nvh9qulFivGoBt1lLQxowT2ykBXCfnhZIglgYACWmqXQv+baioBYCeiCQHm+QEg1O7RhF7hO4OhSAhcJKSFU7qBGADwZeqMMuXn6TUBw8qlaMrirNb4LdhWlP+SWD+cjFfxTpuS2GUpik+o3jFSEkqbJiWn0P0OMSGqlWiOu0TvD+FRHZKAE+oW+cfRmEwqlsesJJEJs8y91QqP+9UL6lqEtz2gpuNEY5sm9sIHln2DRa2aFKGJtiXkZEMiWtgVvRKUSUFkSKt2S7fAGgAXLYpmQQXf36MUChTZdUa2u8/rkvPA6Tz30r4eH3ybcBS5gJ6SaNXb+aABkA1AMxKenclBZLW/He4cYEGwEXb3wEASelexk6LIIIAAAAASUVORK5CYII=">' }, I.Converter = function (g) {
    "use strict";
    function C(g, C) {
      if (C = C || null, I.helper.isString(g)) {
        if (g = I.helper.stdExtName(g), C = g, I.extensions[g]) return console.warn("DEPRECATION WARNING: " + g + " is an old extension that uses a deprecated loading method.Please inform the developer that the extension should be updated!"), void function (g, C) {
          "function" == typeof g && (g = g(new I.Converter()));I.helper.isArray(g) || (g = [g]);var e = A(g, C);if (!e.valid) throw Error(e.error);for (var r = 0; r < g.length; ++r) switch (g[r].type) {case "lang":
              s.push(g[r]);break;case "output":
              i.push(g[r]);break;default:
              throw Error("Extension loader error: Type unrecognized!!!");}
        }(I.extensions[g], g);if (I.helper.isUndefined(r[g])) throw Error('Extension "' + g + '" could not be loaded. It was either not found or is not a valid extension.');g = r[g];
      }"function" == typeof g && (g = g()), I.helper.isArray(g) || (g = [g]);var t = A(g, C);if (!t.valid) throw Error(t.error);for (var a = 0; a < g.length; ++a) {
        switch (g[a].type) {case "lang":
            s.push(g[a]);break;case "output":
            i.push(g[a]);}if (g[a].hasOwnProperty("listeners")) for (var n in g[a].listeners) g[a].listeners.hasOwnProperty(n) && e(n, g[a].listeners[n]);
      }
    }function e(g, A) {
      if (!I.helper.isString(g)) throw Error("Invalid argument in converter.listen() method: name must be a string, but " + typeof g + " given");if ("function" != typeof A) throw Error("Invalid argument in converter.listen() method: callback must be a function, but " + typeof A + " given");l.hasOwnProperty(g) || (l[g] = []), l[g].push(A);
    }var o = {},
        s = [],
        i = [],
        l = {},
        c = a,
        u = { parsed: {}, raw: "", format: "" };!function () {
      g = g || {};for (var A in t) t.hasOwnProperty(A) && (o[A] = t[A]);if ("object" != typeof g) throw Error("Converter expects the passed parameter to be an object, but " + typeof g + " was passed instead.");for (var e in g) g.hasOwnProperty(e) && (o[e] = g[e]);o.extensions && I.helper.forEach(o.extensions, C);
    }(), this._dispatch = function (g, A, C, I) {
      if (l.hasOwnProperty(g)) for (var e = 0; e < l[g].length; ++e) {
        var r = l[g][e](g, A, this, C, I);r && void 0 !== r && (A = r);
      }return A;
    }, this.listen = function (g, A) {
      return e(g, A), this;
    }, this.makeHtml = function (g) {
      if (!g) return g;var A = { gHtmlBlocks: [], gHtmlMdBlocks: [], gHtmlSpans: [], gUrls: {}, gTitles: {}, gDimensions: {}, gListLevel: 0, hashLinkCounts: {}, langExtensions: s, outputModifiers: i, converter: this, ghCodeBlocks: [], metadata: { parsed: {}, raw: "", format: "" } };return g = g.replace(/¨/g, "¨T"), g = g.replace(/\$/g, "¨D"), g = g.replace(/\r\n/g, "\n"), g = g.replace(/\r/g, "\n"), g = g.replace(/\u00A0/g, " "), o.smartIndentationFix && (g = function (g) {
        var A = g.match(/^\s*/)[0].length,
            C = new RegExp("^\\s{0," + A + "}", "gm");return g.replace(C, "");
      }(g)), g = "\n\n" + g + "\n\n", g = I.subParser("detab")(g, o, A), g = g.replace(/^[ \t]+$/gm, ""), I.helper.forEach(s, function (C) {
        g = I.subParser("runExtension")(C, g, o, A);
      }), g = I.subParser("metadata")(g, o, A), g = I.subParser("hashPreCodeTags")(g, o, A), g = I.subParser("githubCodeBlocks")(g, o, A), g = I.subParser("hashHTMLBlocks")(g, o, A), g = I.subParser("hashCodeTags")(g, o, A), g = I.subParser("stripLinkDefinitions")(g, o, A), g = I.subParser("blockGamut")(g, o, A), g = I.subParser("unhashHTMLSpans")(g, o, A), g = I.subParser("unescapeSpecialChars")(g, o, A), g = g.replace(/¨D/g, "$$"), g = g.replace(/¨T/g, "¨"), g = I.subParser("completeHTMLDocument")(g, o, A), I.helper.forEach(i, function (C) {
        g = I.subParser("runExtension")(C, g, o, A);
      }), u = A.metadata, g;
    }, this.setOption = function (g, A) {
      o[g] = A;
    }, this.getOption = function (g) {
      return o[g];
    }, this.getOptions = function () {
      return o;
    }, this.addExtension = function (g, A) {
      C(g, A = A || null);
    }, this.useExtension = function (g) {
      C(g);
    }, this.setFlavor = function (g) {
      if (!n.hasOwnProperty(g)) throw Error(g + " flavor was not found");var A = n[g];c = g;for (var C in A) A.hasOwnProperty(C) && (o[C] = A[C]);
    }, this.getFlavor = function () {
      return c;
    }, this.removeExtension = function (g) {
      I.helper.isArray(g) || (g = [g]);for (var A = 0; A < g.length; ++A) {
        for (var C = g[A], e = 0; e < s.length; ++e) s[e] === C && s[e].splice(e, 1);for (; 0 < i.length; ++e) i[0] === C && i[0].splice(e, 1);
      }
    }, this.getAllExtensions = function () {
      return { language: s, output: i };
    }, this.getMetadata = function (g) {
      return g ? u.raw : u.parsed;
    }, this.getMetadataFormat = function () {
      return u.format;
    }, this._setMetadataPair = function (g, A) {
      u.parsed[g] = A;
    }, this._setMetadataFormat = function (g) {
      u.format = g;
    }, this._setMetadataRaw = function (g) {
      u.raw = g;
    };
  }, I.subParser("anchors", function (g, A, C) {
    "use strict";
    var e = function (g, e, r, t, a, n, o) {
      if (I.helper.isUndefined(o) && (o = ""), r = r.toLowerCase(), g.search(/\(<?\s*>? ?(['"].*['"])?\)$/m) > -1) t = "";else if (!t) {
        if (r || (r = e.toLowerCase().replace(/ ?\n/g, " ")), t = "#" + r, I.helper.isUndefined(C.gUrls[r])) return g;t = C.gUrls[r], I.helper.isUndefined(C.gTitles[r]) || (o = C.gTitles[r]);
      }var s = '<a href="' + (t = t.replace(I.helper.regexes.asteriskDashAndColon, I.helper.escapeCharactersCallback)) + '"';return "" !== o && null !== o && (s += ' title="' + (o = (o = o.replace(/"/g, "&quot;")).replace(I.helper.regexes.asteriskDashAndColon, I.helper.escapeCharactersCallback)) + '"'), A.openLinksInNewWindow && !/^#/.test(t) && (s += ' target="¨E95Eblank"'), s += ">" + e + "</a>";
    };return g = (g = C.converter._dispatch("anchors.before", g, A, C)).replace(/\[((?:\[[^\]]*]|[^\[\]])*)] ?(?:\n *)?\[(.*?)]()()()()/g, e), g = g.replace(/\[((?:\[[^\]]*]|[^\[\]])*)]()[ \t]*\([ \t]?<([^>]*)>(?:[ \t]*((["'])([^"]*?)\5))?[ \t]?\)/g, e), g = g.replace(/\[((?:\[[^\]]*]|[^\[\]])*)]()[ \t]*\([ \t]?<?([\S]+?(?:\([\S]*?\)[\S]*?)?)>?(?:[ \t]*((["'])([^"]*?)\5))?[ \t]?\)/g, e), g = g.replace(/\[([^\[\]]+)]()()()()()/g, e), A.ghMentions && (g = g.replace(/(^|\s)(\\)?(@([a-z\d\-]+))(?=[.!?;,[\]()]|\s|$)/gim, function (g, C, e, r, t) {
      if ("\\" === e) return C + r;if (!I.helper.isString(A.ghMentionsLink)) throw new Error("ghMentionsLink option must be a string");var a = A.ghMentionsLink.replace(/\{u}/g, t),
          n = "";return A.openLinksInNewWindow && (n = ' target="¨E95Eblank"'), C + '<a href="' + a + '"' + n + ">" + r + "</a>";
    })), g = C.converter._dispatch("anchors.after", g, A, C);
  });var s = /([*~_]+|\b)(((https?|ftp|dict):\/\/|www\.)[^'">\s]+?\.[^'">\s]+?)()(\1)?(?=\s|$)(?!["<>])/gi,
      i = /([*~_]+|\b)(((https?|ftp|dict):\/\/|www\.)[^'">\s]+\.[^'">\s]+?)([.!?,()\[\]])?(\1)?(?=\s|$)(?!["<>])/gi,
      l = /()<(((https?|ftp|dict):\/\/|www\.)[^'">\s]+)()>()/gi,
      c = /(^|\s)(?:mailto:)?([A-Za-z0-9!#$%&'*+-/=?^_`{|}~.]+@[-a-z0-9]+(\.[-a-z0-9]+)*\.[a-z]+)(?=$|\s)/gim,
      u = /<()(?:mailto:)?([-.\w]+@[-a-z0-9]+(\.[-a-z0-9]+)*\.[a-z]+)>/gi,
      d = function (g) {
    "use strict";
    return function (A, C, e, r, t, a, n) {
      var o = e = e.replace(I.helper.regexes.asteriskDashAndColon, I.helper.escapeCharactersCallback),
          s = "",
          i = "",
          l = C || "",
          c = n || "";return (/^www\./i.test(e) && (e = e.replace(/^www\./i, "http://www.")), g.excludeTrailingPunctuationFromURLs && a && (s = a), g.openLinksInNewWindow && (i = ' target="¨E95Eblank"'), l + '<a href="' + e + '"' + i + ">" + o + "</a>" + s + c
      );
    };
  },
      p = function (g, A) {
    "use strict";
    return function (C, e, r) {
      var t = "mailto:";return e = e || "", r = I.subParser("unescapeSpecialChars")(r, g, A), g.encodeEmails ? (t = I.helper.encodeEmailAddress(t + r), r = I.helper.encodeEmailAddress(r)) : t += r, e + '<a href="' + t + '">' + r + "</a>";
    };
  };I.subParser("autoLinks", function (g, A, C) {
    "use strict";
    return g = C.converter._dispatch("autoLinks.before", g, A, C), g = g.replace(l, d(A)), g = g.replace(u, p(A, C)), g = C.converter._dispatch("autoLinks.after", g, A, C);
  }), I.subParser("simplifiedAutoLinks", function (g, A, C) {
    "use strict";
    return A.simplifiedAutoLink ? (g = C.converter._dispatch("simplifiedAutoLinks.before", g, A, C), g = A.excludeTrailingPunctuationFromURLs ? g.replace(i, d(A)) : g.replace(s, d(A)), g = g.replace(c, p(A, C)), g = C.converter._dispatch("simplifiedAutoLinks.after", g, A, C)) : g;
  }), I.subParser("blockGamut", function (g, A, C) {
    "use strict";
    return g = C.converter._dispatch("blockGamut.before", g, A, C), g = I.subParser("blockQuotes")(g, A, C), g = I.subParser("headers")(g, A, C), g = I.subParser("horizontalRule")(g, A, C), g = I.subParser("lists")(g, A, C), g = I.subParser("codeBlocks")(g, A, C), g = I.subParser("tables")(g, A, C), g = I.subParser("hashHTMLBlocks")(g, A, C), g = I.subParser("paragraphs")(g, A, C), g = C.converter._dispatch("blockGamut.after", g, A, C);
  }), I.subParser("blockQuotes", function (g, A, C) {
    "use strict";
    g = C.converter._dispatch("blockQuotes.before", g, A, C), g += "\n\n";var e = /(^ {0,3}>[ \t]?.+\n(.+\n)*\n*)+/gm;return A.splitAdjacentBlockquotes && (e = /^ {0,3}>[\s\S]*?(?:\n\n)/gm), g = g.replace(e, function (g) {
      return g = g.replace(/^[ \t]*>[ \t]?/gm, ""), g = g.replace(/¨0/g, ""), g = g.replace(/^[ \t]+$/gm, ""), g = I.subParser("githubCodeBlocks")(g, A, C), g = I.subParser("blockGamut")(g, A, C), g = g.replace(/(^|\n)/g, "$1  "), g = g.replace(/(\s*<pre>[^\r]+?<\/pre>)/gm, function (g, A) {
        var C = A;return C = C.replace(/^  /gm, "¨0"), C = C.replace(/¨0/g, "");
      }), I.subParser("hashBlock")("<blockquote>\n" + g + "\n</blockquote>", A, C);
    }), g = C.converter._dispatch("blockQuotes.after", g, A, C);
  }), I.subParser("codeBlocks", function (g, A, C) {
    "use strict";
    g = C.converter._dispatch("codeBlocks.before", g, A, C);return g = (g += "¨0").replace(/(?:\n\n|^)((?:(?:[ ]{4}|\t).*\n+)+)(\n*[ ]{0,3}[^ \t\n]|(?=¨0))/g, function (g, e, r) {
      var t = e,
          a = r,
          n = "\n";return t = I.subParser("outdent")(t, A, C), t = I.subParser("encodeCode")(t, A, C), t = I.subParser("detab")(t, A, C), t = t.replace(/^\n+/g, ""), t = t.replace(/\n+$/g, ""), A.omitExtraWLInCodeBlocks && (n = ""), t = "<pre><code>" + t + n + "</code></pre>", I.subParser("hashBlock")(t, A, C) + a;
    }), g = g.replace(/¨0/, ""), g = C.converter._dispatch("codeBlocks.after", g, A, C);
  }), I.subParser("codeSpans", function (g, A, C) {
    "use strict";
    return void 0 === (g = C.converter._dispatch("codeSpans.before", g, A, C)) && (g = ""), g = g.replace(/(^|[^\\])(`+)([^\r]*?[^`])\2(?!`)/gm, function (g, e, r, t) {
      var a = t;return a = a.replace(/^([ \t]*)/g, ""), a = a.replace(/[ \t]*$/g, ""), a = I.subParser("encodeCode")(a, A, C), a = e + "<code>" + a + "</code>", a = I.subParser("hashHTMLSpans")(a, A, C);
    }), g = C.converter._dispatch("codeSpans.after", g, A, C);
  }), I.subParser("completeHTMLDocument", function (g, A, C) {
    "use strict";
    if (!A.completeHTMLDocument) return g;g = C.converter._dispatch("completeHTMLDocument.before", g, A, C);var I = "html",
        e = "<!DOCTYPE HTML>\n",
        r = "",
        t = '<meta charset="utf-8">\n',
        a = "",
        n = "";void 0 !== C.metadata.parsed.doctype && (e = "<!DOCTYPE " + C.metadata.parsed.doctype + ">\n", "html" !== (I = C.metadata.parsed.doctype.toString().toLowerCase()) && "html5" !== I || (t = '<meta charset="utf-8">'));for (var o in C.metadata.parsed) if (C.metadata.parsed.hasOwnProperty(o)) switch (o.toLowerCase()) {case "doctype":
        break;case "title":
        r = "<title>" + C.metadata.parsed.title + "</title>\n";break;case "charset":
        t = "html" === I || "html5" === I ? '<meta charset="' + C.metadata.parsed.charset + '">\n' : '<meta name="charset" content="' + C.metadata.parsed.charset + '">\n';break;case "language":case "lang":
        a = ' lang="' + C.metadata.parsed[o] + '"', n += '<meta name="' + o + '" content="' + C.metadata.parsed[o] + '">\n';break;default:
        n += '<meta name="' + o + '" content="' + C.metadata.parsed[o] + '">\n';}return g = e + "<html" + a + ">\n<head>\n" + r + t + n + "</head>\n<body>\n" + g.trim() + "\n</body>\n</html>", g = C.converter._dispatch("completeHTMLDocument.after", g, A, C);
  }), I.subParser("detab", function (g, A, C) {
    "use strict";
    return g = C.converter._dispatch("detab.before", g, A, C), g = g.replace(/\t(?=\t)/g, "    "), g = g.replace(/\t/g, "¨A¨B"), g = g.replace(/¨B(.+?)¨A/g, function (g, A) {
      for (var C = A, I = 4 - C.length % 4, e = 0; e < I; e++) C += " ";return C;
    }), g = g.replace(/¨A/g, "    "), g = g.replace(/¨B/g, ""), g = C.converter._dispatch("detab.after", g, A, C);
  }), I.subParser("ellipsis", function (g, A, C) {
    "use strict";
    return g = C.converter._dispatch("ellipsis.before", g, A, C), g = g.replace(/\.\.\./g, "…"), g = C.converter._dispatch("ellipsis.after", g, A, C);
  }), I.subParser("emoji", function (g, A, C) {
    "use strict";
    if (!A.emoji) return g;return g = (g = C.converter._dispatch("emoji.before", g, A, C)).replace(/:([\S]+?):/g, function (g, A) {
      return I.helper.emojis.hasOwnProperty(A) ? I.helper.emojis[A] : g;
    }), g = C.converter._dispatch("emoji.after", g, A, C);
  }), I.subParser("encodeAmpsAndAngles", function (g, A, C) {
    "use strict";
    return g = C.converter._dispatch("encodeAmpsAndAngles.before", g, A, C), g = g.replace(/&(?!#?[xX]?(?:[0-9a-fA-F]+|\w+);)/g, "&amp;"), g = g.replace(/<(?![a-z\/?$!])/gi, "&lt;"), g = g.replace(/</g, "&lt;"), g = g.replace(/>/g, "&gt;"), g = C.converter._dispatch("encodeAmpsAndAngles.after", g, A, C);
  }), I.subParser("encodeBackslashEscapes", function (g, A, C) {
    "use strict";
    return g = C.converter._dispatch("encodeBackslashEscapes.before", g, A, C), g = g.replace(/\\(\\)/g, I.helper.escapeCharactersCallback), g = g.replace(/\\([`*_{}\[\]()>#+.!~=|-])/g, I.helper.escapeCharactersCallback), g = C.converter._dispatch("encodeBackslashEscapes.after", g, A, C);
  }), I.subParser("encodeCode", function (g, A, C) {
    "use strict";
    return g = C.converter._dispatch("encodeCode.before", g, A, C), g = g.replace(/&/g, "&amp;").replace(/</g, "&lt;").replace(/>/g, "&gt;").replace(/([*_{}\[\]\\=~-])/g, I.helper.escapeCharactersCallback), g = C.converter._dispatch("encodeCode.after", g, A, C);
  }), I.subParser("escapeSpecialCharsWithinTagAttributes", function (g, A, C) {
    "use strict";
    return g = (g = C.converter._dispatch("escapeSpecialCharsWithinTagAttributes.before", g, A, C)).replace(/<\/?[a-z\d_:-]+(?:[\s]+[\s\S]+?)?>/gi, function (g) {
      return g.replace(/(.)<\/?code>(?=.)/g, "$1`").replace(/([\\`*_~=|])/g, I.helper.escapeCharactersCallback);
    }), g = g.replace(/<!(--(?:(?:[^>-]|-[^>])(?:[^-]|-[^-])*)--)>/gi, function (g) {
      return g.replace(/([\\`*_~=|])/g, I.helper.escapeCharactersCallback);
    }), g = C.converter._dispatch("escapeSpecialCharsWithinTagAttributes.after", g, A, C);
  }), I.subParser("githubCodeBlocks", function (g, A, C) {
    "use strict";
    return A.ghCodeBlocks ? (g = C.converter._dispatch("githubCodeBlocks.before", g, A, C), g += "¨0", g = g.replace(/(?:^|\n)(```+|~~~+)([^\s`~]*)\n([\s\S]*?)\n\1/g, function (g, e, r, t) {
      var a = A.omitExtraWLInCodeBlocks ? "" : "\n";return t = I.subParser("encodeCode")(t, A, C), t = I.subParser("detab")(t, A, C), t = t.replace(/^\n+/g, ""), t = t.replace(/\n+$/g, ""), t = "<pre><code" + (r ? ' class="' + r + " language-" + r + '"' : "") + ">" + t + a + "</code></pre>", t = I.subParser("hashBlock")(t, A, C), "\n\n¨G" + (C.ghCodeBlocks.push({ text: g, codeblock: t }) - 1) + "G\n\n";
    }), g = g.replace(/¨0/, ""), C.converter._dispatch("githubCodeBlocks.after", g, A, C)) : g;
  }), I.subParser("hashBlock", function (g, A, C) {
    "use strict";
    return g = C.converter._dispatch("hashBlock.before", g, A, C), g = g.replace(/(^\n+|\n+$)/g, ""), g = "\n\n¨K" + (C.gHtmlBlocks.push(g) - 1) + "K\n\n", g = C.converter._dispatch("hashBlock.after", g, A, C);
  }), I.subParser("hashCodeTags", function (g, A, C) {
    "use strict";
    g = C.converter._dispatch("hashCodeTags.before", g, A, C);return g = I.helper.replaceRecursiveRegExp(g, function (g, e, r, t) {
      var a = r + I.subParser("encodeCode")(e, A, C) + t;return "¨C" + (C.gHtmlSpans.push(a) - 1) + "C";
    }, "<code\\b[^>]*>", "</code>", "gim"), g = C.converter._dispatch("hashCodeTags.after", g, A, C);
  }), I.subParser("hashElement", function (g, A, C) {
    "use strict";
    return function (g, A) {
      var I = A;return I = I.replace(/\n\n/g, "\n"), I = I.replace(/^\n/, ""), I = I.replace(/\n+$/g, ""), I = "\n\n¨K" + (C.gHtmlBlocks.push(I) - 1) + "K\n\n";
    };
  }), I.subParser("hashHTMLBlocks", function (g, A, C) {
    "use strict";
    g = C.converter._dispatch("hashHTMLBlocks.before", g, A, C);var e = ["pre", "div", "h1", "h2", "h3", "h4", "h5", "h6", "blockquote", "table", "dl", "ol", "ul", "script", "noscript", "form", "fieldset", "iframe", "math", "style", "section", "header", "footer", "nav", "article", "aside", "address", "audio", "canvas", "figure", "hgroup", "output", "video", "p"],
        r = function (g, A, I, e) {
      var r = g;return -1 !== I.search(/\bmarkdown\b/) && (r = I + C.converter.makeHtml(A) + e), "\n\n¨K" + (C.gHtmlBlocks.push(r) - 1) + "K\n\n";
    };A.backslashEscapesHTMLTags && (g = g.replace(/\\<(\/?[^>]+?)>/g, function (g, A) {
      return "&lt;" + A + "&gt;";
    }));for (var t = 0; t < e.length; ++t) for (var a, n = new RegExp("^ {0,3}(<" + e[t] + "\\b[^>]*>)", "im"), o = "<" + e[t] + "\\b[^>]*>", s = "</" + e[t] + ">"; -1 !== (a = I.helper.regexIndexOf(g, n));) {
      var i = I.helper.splitAtIndex(g, a),
          l = I.helper.replaceRecursiveRegExp(i[1], r, o, s, "im");if (l === i[1]) break;g = i[0].concat(l);
    }return g = g.replace(/(\n {0,3}(<(hr)\b([^<>])*?\/?>)[ \t]*(?=\n{2,}))/g, I.subParser("hashElement")(g, A, C)), g = I.helper.replaceRecursiveRegExp(g, function (g) {
      return "\n\n¨K" + (C.gHtmlBlocks.push(g) - 1) + "K\n\n";
    }, "^ {0,3}\x3c!--", "--\x3e", "gm"), g = g.replace(/(?:\n\n)( {0,3}(?:<([?%])[^\r]*?\2>)[ \t]*(?=\n{2,}))/g, I.subParser("hashElement")(g, A, C)), g = C.converter._dispatch("hashHTMLBlocks.after", g, A, C);
  }), I.subParser("hashHTMLSpans", function (g, A, C) {
    "use strict";
    function I(g) {
      return "¨C" + (C.gHtmlSpans.push(g) - 1) + "C";
    }return g = C.converter._dispatch("hashHTMLSpans.before", g, A, C), g = g.replace(/<[^>]+?\/>/gi, function (g) {
      return I(g);
    }), g = g.replace(/<([^>]+?)>[\s\S]*?<\/\1>/g, function (g) {
      return I(g);
    }), g = g.replace(/<([^>]+?)\s[^>]+?>[\s\S]*?<\/\1>/g, function (g) {
      return I(g);
    }), g = g.replace(/<[^>]+?>/gi, function (g) {
      return I(g);
    }), g = C.converter._dispatch("hashHTMLSpans.after", g, A, C);
  }), I.subParser("unhashHTMLSpans", function (g, A, C) {
    "use strict";
    g = C.converter._dispatch("unhashHTMLSpans.before", g, A, C);for (var I = 0; I < C.gHtmlSpans.length; ++I) {
      for (var e = C.gHtmlSpans[I], r = 0; /¨C(\d+)C/.test(e);) {
        var t = RegExp.$1;if (e = e.replace("¨C" + t + "C", C.gHtmlSpans[t]), 10 === r) {
          console.error("maximum nesting of 10 spans reached!!!");break;
        }++r;
      }g = g.replace("¨C" + I + "C", e);
    }return g = C.converter._dispatch("unhashHTMLSpans.after", g, A, C);
  }), I.subParser("hashPreCodeTags", function (g, A, C) {
    "use strict";
    g = C.converter._dispatch("hashPreCodeTags.before", g, A, C);return g = I.helper.replaceRecursiveRegExp(g, function (g, e, r, t) {
      var a = r + I.subParser("encodeCode")(e, A, C) + t;return "\n\n¨G" + (C.ghCodeBlocks.push({ text: g, codeblock: a }) - 1) + "G\n\n";
    }, "^ {0,3}<pre\\b[^>]*>\\s*<code\\b[^>]*>", "^ {0,3}</code>\\s*</pre>", "gim"), g = C.converter._dispatch("hashPreCodeTags.after", g, A, C);
  }), I.subParser("headers", function (g, A, C) {
    "use strict";
    function e(g) {
      var e, r;if (A.customizedHeaderId) {
        var t = g.match(/\{([^{]+?)}\s*$/);t && t[1] && (g = t[1]);
      }return e = g, r = I.helper.isString(A.prefixHeaderId) ? A.prefixHeaderId : !0 === A.prefixHeaderId ? "section-" : "", A.rawPrefixHeaderId || (e = r + e), e = A.ghCompatibleHeaderId ? e.replace(/ /g, "-").replace(/&amp;/g, "").replace(/¨T/g, "").replace(/¨D/g, "").replace(/[&+$,\/:;=?@"#{}|^¨~\[\]`\\*)(%.!'<>]/g, "").toLowerCase() : A.rawHeaderId ? e.replace(/ /g, "-").replace(/&amp;/g, "&").replace(/¨T/g, "¨").replace(/¨D/g, "$").replace(/["']/g, "-").toLowerCase() : e.replace(/[^\w]/g, "").toLowerCase(), A.rawPrefixHeaderId && (e = r + e), C.hashLinkCounts[e] ? e = e + "-" + C.hashLinkCounts[e]++ : C.hashLinkCounts[e] = 1, e;
    }g = C.converter._dispatch("headers.before", g, A, C);var r = isNaN(parseInt(A.headerLevelStart)) ? 1 : parseInt(A.headerLevelStart),
        t = A.smoothLivePreview ? /^(.+)[ \t]*\n={2,}[ \t]*\n+/gm : /^(.+)[ \t]*\n=+[ \t]*\n+/gm,
        a = A.smoothLivePreview ? /^(.+)[ \t]*\n-{2,}[ \t]*\n+/gm : /^(.+)[ \t]*\n-+[ \t]*\n+/gm;g = (g = g.replace(t, function (g, t) {
      var a = I.subParser("spanGamut")(t, A, C),
          n = A.noHeaderId ? "" : ' id="' + e(t) + '"',
          o = "<h" + r + n + ">" + a + "</h" + r + ">";return I.subParser("hashBlock")(o, A, C);
    })).replace(a, function (g, t) {
      var a = I.subParser("spanGamut")(t, A, C),
          n = A.noHeaderId ? "" : ' id="' + e(t) + '"',
          o = r + 1,
          s = "<h" + o + n + ">" + a + "</h" + o + ">";return I.subParser("hashBlock")(s, A, C);
    });var n = A.requireSpaceBeforeHeadingText ? /^(#{1,6})[ \t]+(.+?)[ \t]*#*\n+/gm : /^(#{1,6})[ \t]*(.+?)[ \t]*#*\n+/gm;return g = g.replace(n, function (g, t, a) {
      var n = a;A.customizedHeaderId && (n = a.replace(/\s?\{([^{]+?)}\s*$/, ""));var o = I.subParser("spanGamut")(n, A, C),
          s = A.noHeaderId ? "" : ' id="' + e(a) + '"',
          i = r - 1 + t.length,
          l = "<h" + i + s + ">" + o + "</h" + i + ">";return I.subParser("hashBlock")(l, A, C);
    }), g = C.converter._dispatch("headers.after", g, A, C);
  }), I.subParser("horizontalRule", function (g, A, C) {
    "use strict";
    g = C.converter._dispatch("horizontalRule.before", g, A, C);var e = I.subParser("hashBlock")("<hr />", A, C);return g = g.replace(/^ {0,2}( ?-){3,}[ \t]*$/gm, e), g = g.replace(/^ {0,2}( ?\*){3,}[ \t]*$/gm, e), g = g.replace(/^ {0,2}( ?_){3,}[ \t]*$/gm, e), g = C.converter._dispatch("horizontalRule.after", g, A, C);
  }), I.subParser("images", function (g, A, C) {
    "use strict";
    function e(g, A, e, r, t, a, n, o) {
      var s = C.gUrls,
          i = C.gTitles,
          l = C.gDimensions;if (e = e.toLowerCase(), o || (o = ""), g.search(/\(<?\s*>? ?(['"].*['"])?\)$/m) > -1) r = "";else if ("" === r || null === r) {
        if ("" !== e && null !== e || (e = A.toLowerCase().replace(/ ?\n/g, " ")), r = "#" + e, I.helper.isUndefined(s[e])) return g;r = s[e], I.helper.isUndefined(i[e]) || (o = i[e]), I.helper.isUndefined(l[e]) || (t = l[e].width, a = l[e].height);
      }A = A.replace(/"/g, "&quot;").replace(I.helper.regexes.asteriskDashAndColon, I.helper.escapeCharactersCallback);var c = '<img src="' + (r = r.replace(I.helper.regexes.asteriskDashAndColon, I.helper.escapeCharactersCallback)) + '" alt="' + A + '"';return o && (c += ' title="' + (o = o.replace(/"/g, "&quot;").replace(I.helper.regexes.asteriskDashAndColon, I.helper.escapeCharactersCallback)) + '"'), t && a && (c += ' width="' + (t = "*" === t ? "auto" : t) + '"', c += ' height="' + (a = "*" === a ? "auto" : a) + '"'), c += " />";
    }return g = (g = C.converter._dispatch("images.before", g, A, C)).replace(/!\[([^\]]*?)] ?(?:\n *)?\[([\s\S]*?)]()()()()()/g, e), g = g.replace(/!\[([^\]]*?)][ \t]*()\([ \t]?<?(data:.+?\/.+?;base64,[A-Za-z0-9+/=\n]+?)>?(?: =([*\d]+[A-Za-z%]{0,4})x([*\d]+[A-Za-z%]{0,4}))?[ \t]*(?:(["'])([^"]*?)\6)?[ \t]?\)/g, function (g, A, C, I, r, t, a, n) {
      return I = I.replace(/\s/g, ""), e(g, A, C, I, r, t, 0, n);
    }), g = g.replace(/!\[([^\]]*?)][ \t]*()\([ \t]?<([^>]*)>(?: =([*\d]+[A-Za-z%]{0,4})x([*\d]+[A-Za-z%]{0,4}))?[ \t]*(?:(?:(["'])([^"]*?)\6))?[ \t]?\)/g, e), g = g.replace(/!\[([^\]]*?)][ \t]*()\([ \t]?<?([\S]+?(?:\([\S]*?\)[\S]*?)?)>?(?: =([*\d]+[A-Za-z%]{0,4})x([*\d]+[A-Za-z%]{0,4}))?[ \t]*(?:(["'])([^"]*?)\6)?[ \t]?\)/g, e), g = g.replace(/!\[([^\[\]]+)]()()()()()/g, e), g = C.converter._dispatch("images.after", g, A, C);
  }), I.subParser("italicsAndBold", function (g, A, C) {
    "use strict";
    function I(g, A, C) {
      return A + g + C;
    }return g = C.converter._dispatch("italicsAndBold.before", g, A, C), g = A.literalMidWordUnderscores ? (g = (g = g.replace(/\b___(\S[\s\S]*)___\b/g, function (g, A) {
      return I(A, "<strong><em>", "</em></strong>");
    })).replace(/\b__(\S[\s\S]*)__\b/g, function (g, A) {
      return I(A, "<strong>", "</strong>");
    })).replace(/\b_(\S[\s\S]*?)_\b/g, function (g, A) {
      return I(A, "<em>", "</em>");
    }) : (g = (g = g.replace(/___(\S[\s\S]*?)___/g, function (g, A) {
      return (/\S$/.test(A) ? I(A, "<strong><em>", "</em></strong>") : g
      );
    })).replace(/__(\S[\s\S]*?)__/g, function (g, A) {
      return (/\S$/.test(A) ? I(A, "<strong>", "</strong>") : g
      );
    })).replace(/_([^\s_][\s\S]*?)_/g, function (g, A) {
      return (/\S$/.test(A) ? I(A, "<em>", "</em>") : g
      );
    }), g = A.literalMidWordAsterisks ? (g = (g = g.replace(/([^*]|^)\B\*\*\*(\S[\s\S]+?)\*\*\*\B(?!\*)/g, function (g, A, C) {
      return I(C, A + "<strong><em>", "</em></strong>");
    })).replace(/([^*]|^)\B\*\*(\S[\s\S]+?)\*\*\B(?!\*)/g, function (g, A, C) {
      return I(C, A + "<strong>", "</strong>");
    })).replace(/([^*]|^)\B\*(\S[\s\S]+?)\*\B(?!\*)/g, function (g, A, C) {
      return I(C, A + "<em>", "</em>");
    }) : (g = (g = g.replace(/\*\*\*(\S[\s\S]*?)\*\*\*/g, function (g, A) {
      return (/\S$/.test(A) ? I(A, "<strong><em>", "</em></strong>") : g
      );
    })).replace(/\*\*(\S[\s\S]*?)\*\*/g, function (g, A) {
      return (/\S$/.test(A) ? I(A, "<strong>", "</strong>") : g
      );
    })).replace(/\*([^\s*][\s\S]*?)\*/g, function (g, A) {
      return (/\S$/.test(A) ? I(A, "<em>", "</em>") : g
      );
    }), g = C.converter._dispatch("italicsAndBold.after", g, A, C);
  }), I.subParser("lists", function (g, A, C) {
    "use strict";
    function e(g, e) {
      C.gListLevel++, g = g.replace(/\n{2,}$/, "\n");var r = /(\n)?(^ {0,3})([*+-]|\d+[.])[ \t]+((\[(x|X| )?])?[ \t]*[^\r]+?(\n{1,2}))(?=\n*(¨0| {0,3}([*+-]|\d+[.])[ \t]+))/gm,
          t = /\n[ \t]*\n(?!¨0)/.test(g += "¨0");return A.disableForced4SpacesIndentedSublists && (r = /(\n)?(^ {0,3})([*+-]|\d+[.])[ \t]+((\[(x|X| )?])?[ \t]*[^\r]+?(\n{1,2}))(?=\n*(¨0|\2([*+-]|\d+[.])[ \t]+))/gm), g = g.replace(r, function (g, e, r, a, n, o, s) {
        s = s && "" !== s.trim();var i = I.subParser("outdent")(n, A, C),
            l = "";return o && A.tasklists && (l = ' class="task-list-item" style="list-style-type: none;"', i = i.replace(/^[ \t]*\[(x|X| )?]/m, function () {
          var g = '<input type="checkbox" disabled style="margin: 0px 0.35em 0.25em -1.6em; vertical-align: middle;"';return s && (g += " checked"), g += ">";
        })), i = i.replace(/^([-*+]|\d\.)[ \t]+[\S\n ]*/g, function (g) {
          return "¨A" + g;
        }), e || i.search(/\n{2,}/) > -1 ? (i = I.subParser("githubCodeBlocks")(i, A, C), i = I.subParser("blockGamut")(i, A, C)) : (i = (i = I.subParser("lists")(i, A, C)).replace(/\n$/, ""), i = (i = I.subParser("hashHTMLBlocks")(i, A, C)).replace(/\n\n+/g, "\n\n"), i = t ? I.subParser("paragraphs")(i, A, C) : I.subParser("spanGamut")(i, A, C)), i = i.replace("¨A", ""), i = "<li" + l + ">" + i + "</li>\n";
      }), g = g.replace(/¨0/g, ""), C.gListLevel--, e && (g = g.replace(/\s+$/, "")), g;
    }function r(g, A) {
      if ("ol" === A) {
        var C = g.match(/^ *(\d+)\./);if (C && "1" !== C[1]) return ' start="' + C[1] + '"';
      }return "";
    }function t(g, C, I) {
      var t = A.disableForced4SpacesIndentedSublists ? /^ ?\d+\.[ \t]/gm : /^ {0,3}\d+\.[ \t]/gm,
          a = A.disableForced4SpacesIndentedSublists ? /^ ?[*+-][ \t]/gm : /^ {0,3}[*+-][ \t]/gm,
          n = "ul" === C ? t : a,
          o = "";if (-1 !== g.search(n)) !function A(s) {
        var i = s.search(n),
            l = r(g, C);-1 !== i ? (o += "\n\n<" + C + l + ">\n" + e(s.slice(0, i), !!I) + "</" + C + ">\n", n = "ul" === (C = "ul" === C ? "ol" : "ul") ? t : a, A(s.slice(i))) : o += "\n\n<" + C + l + ">\n" + e(s, !!I) + "</" + C + ">\n";
      }(g);else {
        var s = r(g, C);o = "\n\n<" + C + s + ">\n" + e(g, !!I) + "</" + C + ">\n";
      }return o;
    }return g = C.converter._dispatch("lists.before", g, A, C), g += "¨0", g = C.gListLevel ? g.replace(/^(( {0,3}([*+-]|\d+[.])[ \t]+)[^\r]+?(¨0|\n{2,}(?=\S)(?![ \t]*(?:[*+-]|\d+[.])[ \t]+)))/gm, function (g, A, C) {
      return t(A, C.search(/[*+-]/g) > -1 ? "ul" : "ol", !0);
    }) : g.replace(/(\n\n|^\n?)(( {0,3}([*+-]|\d+[.])[ \t]+)[^\r]+?(¨0|\n{2,}(?=\S)(?![ \t]*(?:[*+-]|\d+[.])[ \t]+)))/gm, function (g, A, C, I) {
      return t(C, I.search(/[*+-]/g) > -1 ? "ul" : "ol", !1);
    }), g = g.replace(/¨0/, ""), g = C.converter._dispatch("lists.after", g, A, C);
  }), I.subParser("metadata", function (g, A, C) {
    "use strict";
    function I(g) {
      C.metadata.raw = g, (g = (g = g.replace(/&/g, "&amp;").replace(/"/g, "&quot;")).replace(/\n {4}/g, " ")).replace(/^([\S ]+): +([\s\S]+?)$/gm, function (g, A, I) {
        return C.metadata.parsed[A] = I, "";
      });
    }return A.metadata ? (g = C.converter._dispatch("metadata.before", g, A, C), g = g.replace(/^\s*«««+(\S*?)\n([\s\S]+?)\n»»»+\n/, function (g, A, C) {
      return I(C), "¨M";
    }), g = g.replace(/^\s*---+(\S*?)\n([\s\S]+?)\n---+\n/, function (g, A, e) {
      return A && (C.metadata.format = A), I(e), "¨M";
    }), g = g.replace(/¨M/g, ""), g = C.converter._dispatch("metadata.after", g, A, C)) : g;
  }), I.subParser("outdent", function (g, A, C) {
    "use strict";
    return g = C.converter._dispatch("outdent.before", g, A, C), g = g.replace(/^(\t|[ ]{1,4})/gm, "¨0"), g = g.replace(/¨0/g, ""), g = C.converter._dispatch("outdent.after", g, A, C);
  }), I.subParser("paragraphs", function (g, A, C) {
    "use strict";
    for (var e = (g = (g = (g = C.converter._dispatch("paragraphs.before", g, A, C)).replace(/^\n+/g, "")).replace(/\n+$/g, "")).split(/\n{2,}/g), r = [], t = e.length, a = 0; a < t; a++) {
      var n = e[a];n.search(/¨(K|G)(\d+)\1/g) >= 0 ? r.push(n) : n.search(/\S/) >= 0 && (n = (n = I.subParser("spanGamut")(n, A, C)).replace(/^([ \t]*)/g, "<p>"), n += "</p>", r.push(n));
    }for (t = r.length, a = 0; a < t; a++) {
      for (var o = "", s = r[a], i = !1; /¨(K|G)(\d+)\1/.test(s);) {
        var l = RegExp.$1,
            c = RegExp.$2;o = (o = "K" === l ? C.gHtmlBlocks[c] : i ? I.subParser("encodeCode")(C.ghCodeBlocks[c].text, A, C) : C.ghCodeBlocks[c].codeblock).replace(/\$/g, "$$$$"), s = s.replace(/(\n\n)?¨(K|G)\d+\2(\n\n)?/, o), /^<pre\b[^>]*>\s*<code\b[^>]*>/.test(s) && (i = !0);
      }r[a] = s;
    }return g = r.join("\n"), g = g.replace(/^\n+/g, ""), g = g.replace(/\n+$/g, ""), C.converter._dispatch("paragraphs.after", g, A, C);
  }), I.subParser("runExtension", function (g, A, C, I) {
    "use strict";
    if (g.filter) A = g.filter(A, I.converter, C);else if (g.regex) {
      var e = g.regex;e instanceof RegExp || (e = new RegExp(e, "g")), A = A.replace(e, g.replace);
    }return A;
  }), I.subParser("spanGamut", function (g, A, C) {
    "use strict";
    return g = C.converter._dispatch("spanGamut.before", g, A, C), g = I.subParser("codeSpans")(g, A, C), g = I.subParser("escapeSpecialCharsWithinTagAttributes")(g, A, C), g = I.subParser("encodeBackslashEscapes")(g, A, C), g = I.subParser("images")(g, A, C), g = I.subParser("anchors")(g, A, C), g = I.subParser("autoLinks")(g, A, C), g = I.subParser("simplifiedAutoLinks")(g, A, C), g = I.subParser("emoji")(g, A, C), g = I.subParser("underline")(g, A, C), g = I.subParser("italicsAndBold")(g, A, C), g = I.subParser("strikethrough")(g, A, C), g = I.subParser("ellipsis")(g, A, C), g = I.subParser("hashHTMLSpans")(g, A, C), g = I.subParser("encodeAmpsAndAngles")(g, A, C), A.simpleLineBreaks ? /\n\n¨K/.test(g) || (g = g.replace(/\n+/g, "<br />\n")) : g = g.replace(/  +\n/g, "<br />\n"), g = C.converter._dispatch("spanGamut.after", g, A, C);
  }), I.subParser("strikethrough", function (g, A, C) {
    "use strict";
    return A.strikethrough && (g = (g = C.converter._dispatch("strikethrough.before", g, A, C)).replace(/(?:~){2}([\s\S]+?)(?:~){2}/g, function (g, e) {
      return function (g) {
        return A.simplifiedAutoLink && (g = I.subParser("simplifiedAutoLinks")(g, A, C)), "<del>" + g + "</del>";
      }(e);
    }), g = C.converter._dispatch("strikethrough.after", g, A, C)), g;
  }), I.subParser("stripLinkDefinitions", function (g, A, C) {
    "use strict";
    var e = function (g, e, r, t, a, n, o) {
      return e = e.toLowerCase(), r.match(/^data:.+?\/.+?;base64,/) ? C.gUrls[e] = r.replace(/\s/g, "") : C.gUrls[e] = I.subParser("encodeAmpsAndAngles")(r, A, C), n ? n + o : (o && (C.gTitles[e] = o.replace(/"|'/g, "&quot;")), A.parseImgDimensions && t && a && (C.gDimensions[e] = { width: t, height: a }), "");
    };return g = (g += "¨0").replace(/^ {0,3}\[(.+)]:[ \t]*\n?[ \t]*<?(data:.+?\/.+?;base64,[A-Za-z0-9+/=\n]+?)>?(?: =([*\d]+[A-Za-z%]{0,4})x([*\d]+[A-Za-z%]{0,4}))?[ \t]*\n?[ \t]*(?:(\n*)["|'(](.+?)["|')][ \t]*)?(?:\n\n|(?=¨0)|(?=\n\[))/gm, e), g = g.replace(/^ {0,3}\[(.+)]:[ \t]*\n?[ \t]*<?([^>\s]+)>?(?: =([*\d]+[A-Za-z%]{0,4})x([*\d]+[A-Za-z%]{0,4}))?[ \t]*\n?[ \t]*(?:(\n*)["|'(](.+?)["|')][ \t]*)?(?:\n+|(?=¨0))/gm, e), g = g.replace(/¨0/, "");
  }), I.subParser("tables", function (g, A, C) {
    "use strict";
    function e(g) {
      return (/^:[ \t]*--*$/.test(g) ? ' style="text-align:left;"' : /^--*[ \t]*:[ \t]*$/.test(g) ? ' style="text-align:right;"' : /^:[ \t]*--*[ \t]*:$/.test(g) ? ' style="text-align:center;"' : ""
      );
    }function r(g, e) {
      var r = "";return g = g.trim(), (A.tablesHeaderId || A.tableHeaderId) && (r = ' id="' + g.replace(/ /g, "_").toLowerCase() + '"'), g = I.subParser("spanGamut")(g, A, C), "<th" + r + e + ">" + g + "</th>\n";
    }function t(g, e) {
      return "<td" + e + ">" + I.subParser("spanGamut")(g, A, C) + "</td>\n";
    }function a(g) {
      var a,
          n = g.split("\n");for (a = 0; a < n.length; ++a) /^ {0,3}\|/.test(n[a]) && (n[a] = n[a].replace(/^ {0,3}\|/, "")), /\|[ \t]*$/.test(n[a]) && (n[a] = n[a].replace(/\|[ \t]*$/, "")), n[a] = I.subParser("codeSpans")(n[a], A, C);var o = n[0].split("|").map(function (g) {
        return g.trim();
      }),
          s = n[1].split("|").map(function (g) {
        return g.trim();
      }),
          i = [],
          l = [],
          c = [],
          u = [];for (n.shift(), n.shift(), a = 0; a < n.length; ++a) "" !== n[a].trim() && i.push(n[a].split("|").map(function (g) {
        return g.trim();
      }));if (o.length < s.length) return g;for (a = 0; a < s.length; ++a) c.push(e(s[a]));for (a = 0; a < o.length; ++a) I.helper.isUndefined(c[a]) && (c[a] = ""), l.push(r(o[a], c[a]));for (a = 0; a < i.length; ++a) {
        for (var d = [], p = 0; p < l.length; ++p) I.helper.isUndefined(i[a][p]), d.push(t(i[a][p], c[p]));u.push(d);
      }return function (g, A) {
        for (var C = "<table>\n<thead>\n<tr>\n", I = g.length, e = 0; e < I; ++e) C += g[e];for (C += "</tr>\n</thead>\n<tbody>\n", e = 0; e < A.length; ++e) {
          C += "<tr>\n";for (var r = 0; r < I; ++r) C += A[e][r];C += "</tr>\n";
        }return C += "</tbody>\n</table>\n";
      }(l, u);
    }if (!A.tables) return g;return g = C.converter._dispatch("tables.before", g, A, C), g = g.replace(/\\(\|)/g, I.helper.escapeCharactersCallback), g = g.replace(/^ {0,3}\|?.+\|.+\n {0,3}\|?[ \t]*:?[ \t]*(?:[-=]){2,}[ \t]*:?[ \t]*\|[ \t]*:?[ \t]*(?:[-=]){2,}[\s\S]+?(?:\n\n|¨0)/gm, a), g = g.replace(/^ {0,3}\|.+\|[ \t]*\n {0,3}\|[ \t]*:?[ \t]*(?:[-=]){2,}[ \t]*:?[ \t]*\|[ \t]*\n( {0,3}\|.+\|[ \t]*\n)*(?:\n|¨0)/gm, a), g = C.converter._dispatch("tables.after", g, A, C);
  }), I.subParser("underline", function (g, A, C) {
    "use strict";
    return A.underline ? (g = C.converter._dispatch("underline.before", g, A, C), g = A.literalMidWordUnderscores ? g.replace(/\b_?__(\S[\s\S]*)___?\b/g, function (g, A) {
      return "<u>" + A + "</u>";
    }) : g.replace(/_?__(\S[\s\S]*?)___?/g, function (g, A) {
      return (/\S$/.test(A) ? "<u>" + A + "</u>" : g
      );
    }), g = g.replace(/(_)/g, I.helper.escapeCharactersCallback), g = C.converter._dispatch("underline.after", g, A, C)) : g;
  }), I.subParser("unescapeSpecialChars", function (g, A, C) {
    "use strict";
    return g = C.converter._dispatch("unescapeSpecialChars.before", g, A, C), g = g.replace(/¨E(\d+)E/g, function (g, A) {
      var C = parseInt(A);return String.fromCharCode(C);
    }), g = C.converter._dispatch("unescapeSpecialChars.after", g, A, C);
  }); true ? !(__WEBPACK_AMD_DEFINE_RESULT__ = (function () {
    "use strict";
    return I;
  }).call(exports, __webpack_require__, exports, module),
				__WEBPACK_AMD_DEFINE_RESULT__ !== undefined && (module.exports = __WEBPACK_AMD_DEFINE_RESULT__)) : "undefined" != typeof module && module.exports ? module.exports = I : this.showdown = I;
}).call(window);

/***/ }),
/* 34 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = {
  type: 'lang',
  regex: /```(\w*)\n(.*)```/g,
  replace: '<oz-code language="$1" value="$2" display="compact"></oz-code>'
};

/***/ }),
/* 35 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
/* WEBPACK VAR INJECTION */(function(process) {

Object.defineProperty(exports, "__esModule", {
  value: true
});
const style = exports.style = `
<style>
@import url('https://fonts.googleapis.com/css?family=News+Cycle');
@import url('https://fonts.googleapis.com/css?family=Roboto:100,300,400,700');
@import url('https://fonts.googleapis.com/icon?family=Material+Icons');

html {
  font-size: 62.5%;
  height: 100%;
  width: 100%;
  background-color: #0f0f0f/*#151a1e #262d33*/;
}

body {
  font-size: 1.5rem;
  height: 100%;
  width: 100%;
  margin: 0;
  font-family: "Source Sans Pro", "Helvetica Neue", Arial, sans-serif;
}

app-header {
  display: block;
  text-align: center;
  color: #ECECEC;
  align-self: end;
  font-family: Roboto;
  font-size: 4rem;
  font-weight: 100;
}
</style>
`;
const webpack = process && true;
const code = exports.code = `${webpack ? '/*\n  ' : ''}import { registerElement, html, css } from '/oz.js'
${webpack ? `  This browser doesn't support ES2015 modules
 */` : ''}

const AppHeader = registerElement({
  name: 'app-header',
  props: ['description'],
  template: ({props: {description}}) => html\`Oz.js, \${description}\`
})

const appHeader = new AppHeader() // Or document.createElement('app-header')
appHeader.description = 'Progressive Javascript Framework'
document.body.appendChild(appHeader)
`;

const documentation = exports.documentation = `###Component overview
Oz.js exposes a
\`\`\`javascript
registerElement(options)\`\`\`
function used to define custom elements.
Once the element is defined, you can create it by calling its constructor(
\`\`\`javascript
new myElement()\`\`\`
) or by calling
\`\`\`javascript
document.createElement('my-element')\`\`\`
and append it like any other elements to the dom
\`\`\`javascript
.appendChild(myElement)\`\`\``;
/* WEBPACK VAR INJECTION */}.call(exports, __webpack_require__(0)))

/***/ }),
/* 36 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
/* WEBPACK VAR INJECTION */(function(process) {

Object.defineProperty(exports, "__esModule", {
  value: true
});
const webpack = process && true;

const code = exports.code = `${webpack ? '/*\n  ' : ''}import { html } from '/oz.js'
${webpack ? `  This browser doesn't support ES2015 modules
 */` : ''}
const template = html\`<\${'p'}>\${'some text'}</\${'p'}>\`

const instance = template()
document.body.appendChild(instance.content)

let i
setInterval(_ => instance.update(...(i = !i) ? template.values : ['h1','another text', 'h1']), 1000)
`;

const documentation = exports.documentation = `###Templates overview
You can declare \`element tags\`, \`attributes\`, \`properties\`, \`events listeners\`, \`comments\`, 
\`texts\` in html and \`property values\` in css templates.

It's extensiveness allows you to write in Pug's syntax or any other that you'd want.`;
/* WEBPACK VAR INJECTION */}.call(exports, __webpack_require__(0)))

/***/ }),
/* 37 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
/* WEBPACK VAR INJECTION */(function(process) {

Object.defineProperty(exports, "__esModule", {
  value: true
});
const webpack = process && true;

const code = exports.code = `${webpack ? '/*\n  ' : ''}import { reactify, watch } from '/oz.js'
${webpack ? `  This browser doesn't support ES2015 modules
 */` : ''}
const react = reactify({
  a: 1,
  b: 2,
  get c () {
    return this.a + this.b
  }
})

const element = document.createElement('div')
element.textContent = react.c
document.body.appendChild(element)

watch(_ => react.c, newVal => (element.textContent = newVal))
setInterval(_ => react.a ++, 1000)
`;

const documentation = exports.documentation = `###Reactivity overview
A reactive system that allows you to react to data changes.

Reactive objects also get some optimisations, such as a getter's value will be cached until its dependencies change.`;
/* WEBPACK VAR INJECTION */}.call(exports, __webpack_require__(0)))

/***/ }),
/* 38 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});

var _oz = __webpack_require__(1);

class Guide extends _oz.Element {
  constructor() {
    super({ shadowDom: 'open' });
  }

  static template() {
    return _oz.html`
    Guide
    `;
  }

  static style() {
    return _oz.css`
    `;
  }
}
exports.default = Guide;
customElements.define('app-guide', Guide);

/***/ })
/******/ ]);