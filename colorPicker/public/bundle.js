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
/******/ 			Object.defineProperty(exports, name, { enumerable: true, get: getter });
/******/ 		}
/******/ 	};
/******/
/******/ 	// define __esModule on exports
/******/ 	__webpack_require__.r = function(exports) {
/******/ 		if(typeof Symbol !== 'undefined' && Symbol.toStringTag) {
/******/ 			Object.defineProperty(exports, Symbol.toStringTag, { value: 'Module' });
/******/ 		}
/******/ 		Object.defineProperty(exports, '__esModule', { value: true });
/******/ 	};
/******/
/******/ 	// create a fake namespace object
/******/ 	// mode & 1: value is a module id, require it
/******/ 	// mode & 2: merge all properties of value into the ns
/******/ 	// mode & 4: return value when already ns object
/******/ 	// mode & 8|1: behave like require
/******/ 	__webpack_require__.t = function(value, mode) {
/******/ 		if(mode & 1) value = __webpack_require__(value);
/******/ 		if(mode & 8) return value;
/******/ 		if((mode & 4) && typeof value === 'object' && value && value.__esModule) return value;
/******/ 		var ns = Object.create(null);
/******/ 		__webpack_require__.r(ns);
/******/ 		Object.defineProperty(ns, 'default', { enumerable: true, value: value });
/******/ 		if(mode & 2 && typeof value != 'string') for(var key in value) __webpack_require__.d(ns, key, function(key) { return value[key]; }.bind(null, key));
/******/ 		return ns;
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
/******/ 	__webpack_require__.p = "";
/******/
/******/
/******/ 	// Load entry module and return exports
/******/ 	return __webpack_require__(__webpack_require__.s = "./src/main.js");
/******/ })
/************************************************************************/
/******/ ({

/***/ "../../Akila/time.js":
/*!******************************************************!*\
  !*** C:/Users/Jérémy/Documents/GitHub/Akila/time.js ***!
  \******************************************************/
/*! exports provided: Time, Key, Timeline, StateTimeline, Clock */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
eval("__webpack_require__.r(__webpack_exports__);\n/* harmony import */ var _time_Time__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./time/Time */ \"../../Akila/time/Time.js\");\n/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, \"Time\", function() { return _time_Time__WEBPACK_IMPORTED_MODULE_0__[\"Time\"]; });\n\n/* harmony import */ var _time_Timeline__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./time/Timeline */ \"../../Akila/time/Timeline.js\");\n/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, \"Key\", function() { return _time_Timeline__WEBPACK_IMPORTED_MODULE_1__[\"Key\"]; });\n\n/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, \"Timeline\", function() { return _time_Timeline__WEBPACK_IMPORTED_MODULE_1__[\"Timeline\"]; });\n\n/* harmony import */ var _time_StateTimeline__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./time/StateTimeline */ \"../../Akila/time/StateTimeline.js\");\n/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, \"StateTimeline\", function() { return _time_StateTimeline__WEBPACK_IMPORTED_MODULE_2__[\"StateTimeline\"]; });\n\n/* harmony import */ var _time_Clock__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ./time/Clock */ \"../../Akila/time/Clock.js\");\n/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, \"Clock\", function() { return _time_Clock__WEBPACK_IMPORTED_MODULE_3__[\"Clock\"]; });\n\n\r\n\r\n\r\n\r\n\n\n//# sourceURL=webpack:///C:/Users/J%C3%A9r%C3%A9my/Documents/GitHub/Akila/time.js?");

/***/ }),

/***/ "../../Akila/time/Clock.js":
/*!************************************************************!*\
  !*** C:/Users/Jérémy/Documents/GitHub/Akila/time/Clock.js ***!
  \************************************************************/
/*! exports provided: Clock */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, \"Clock\", function() { return Clock; });\n/* harmony import */ var _Time__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./Time */ \"../../Akila/time/Time.js\");\n\r\n\r\nclass ClockNoLoopState {\r\n    static calculate(clock) {\r\n        clock.currentTime += _Time__WEBPACK_IMPORTED_MODULE_0__[\"Time\"].delta * clock.delta;\r\n        if(clock.currentTime >= clock.end) clock.currentTime = clock.end;\r\n    }\r\n}\r\n\r\nclass ClockLoopState {\r\n    static calculate(clock) {\r\n        clock.currentTime += _Time__WEBPACK_IMPORTED_MODULE_0__[\"Time\"].delta * clock.delta;\r\n        while(clock.currentTime >= clock.end) clock.currentTime -= clock.diff;\r\n    }\r\n}\r\n\r\nclass Clock {\r\n    constructor(start = 0, end = 10, delta = 1) {\r\n        this.start = start;\r\n        this.end = end;\r\n        this.delta = delta;\r\n        this.diff = end - start;\r\n\r\n        this.setLoop(true);\r\n        this.reset();\r\n    }\r\n\r\n    setLoop(loop) {\r\n        if(loop) this.state = ClockLoopState;\r\n        else this.state = ClockNoLoopState;\r\n    }\r\n\r\n    next() {\r\n        this.state.calculate(this);\r\n        this.tic = Math.floor(this.currentTime);\r\n    }\r\n\r\n    getValue() {\r\n        return this.tic;\r\n    }\r\n\r\n    isFirst() {\r\n        return this.currentTime == this.start;\r\n    }\r\n\r\n    reset() {\r\n        this.currentTime = this.start;\r\n        this.tic = this.start;\r\n    }\r\n}\r\n\n\n//# sourceURL=webpack:///C:/Users/J%C3%A9r%C3%A9my/Documents/GitHub/Akila/time/Clock.js?");

/***/ }),

/***/ "../../Akila/time/StateTimeline.js":
/*!********************************************************************!*\
  !*** C:/Users/Jérémy/Documents/GitHub/Akila/time/StateTimeline.js ***!
  \********************************************************************/
/*! exports provided: StateTimeline */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, \"StateTimeline\", function() { return StateTimeline; });\nclass StateTimelineNoLoopState {\r\n    static calculateIndex(tl) {\r\n        tl.currentIndex = Math.min(tl.currentIndex + 1, tl.states.length - 1);\r\n    }\r\n}\r\n\r\nclass StateTimelineLoopState {\r\n    static calculateIndex(tl) {\r\n        ++tl.currentIndex;\r\n        if(tl.currentIndex >= tl.states.length) tl.currentIndex = 0;\r\n    }\r\n}\r\n\r\nclass StateTimeline {\r\n    constructor() {\r\n        this.states = new Array();\r\n        this.buffer = new Object();\r\n        this.setLoop(false);\r\n        this.reset();\r\n    }\r\n\r\n    addState(obj) {\r\n        if(this.states.length == 0) this.buffer = obj;\r\n        this.states.push(obj);\r\n        return this;\r\n    }\r\n\r\n    setLoop(loop) {\r\n        if(loop) this.state = StateTimelineLoopState;\r\n        else this.state = StateTimelineNoLoopState;\r\n        return this;\r\n    }\r\n\r\n    next() {\r\n        this.state.calculateIndex(this);\r\n        this.buffer = this.states[this.currentIndex];\r\n    }\r\n\r\n    reset() {\r\n        this.currentIndex = 0;\r\n    }\r\n\r\n    getData() {\r\n        return this.buffer;\r\n    }\r\n}\r\n\n\n//# sourceURL=webpack:///C:/Users/J%C3%A9r%C3%A9my/Documents/GitHub/Akila/time/StateTimeline.js?");

/***/ }),

/***/ "../../Akila/time/Time.js":
/*!***********************************************************!*\
  !*** C:/Users/Jérémy/Documents/GitHub/Akila/time/Time.js ***!
  \***********************************************************/
/*! exports provided: Time */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, \"Time\", function() { return Time; });\nclass Time {\r\n    constructor() {\r\n        if(Time.instance) return;\r\n        Time.instance = this;\r\n\r\n        this.onInit(() => {});\r\n        this.onTick(() => {});\r\n        this.onDraw(() => {});\r\n\r\n        Time.mouse = () => {};\r\n        Time.gamepad = () => {};\r\n\r\n        Time.run = false;\r\n        Time.tickStart = 0;\r\n        Time.drawStart = 0;\r\n\r\n        this.setDeltaLimite(1 / 15);\r\n    }\r\n\r\n    onInit(callBack) {\r\n        Time.init = callBack;\r\n    }\r\n\r\n    onTick(callack) {\r\n        Time.tickCallback = () => {\r\n            callack();\r\n            Time.tick = Time.now - Time.tickStart;\r\n        }\r\n    }\r\n\r\n    onDraw(callack) {\r\n        Time.drawCallback = () => {\r\n            callack();\r\n            Time.draw = Time.now - Time.drawStart;\r\n        }\r\n    }\r\n\r\n    async start() {\r\n        if(Time.run) return;\r\n\r\n        await Time.init();\r\n\r\n        Time.run = true;\r\n\r\n        const cb = (iNow) => {\r\n            Time.now = iNow / 1e3;\r\n            Time.delta = (Time.now - Time.lastTime) * Time.scale;\r\n            Time.limitedDelta = Time.delta > Time.maxDelta ? Time.maxDelta : Time.delta;\r\n            Time.fps = Math.floor(1 / Time.delta * 100) / 100;\r\n            Time.lastTime = Time.now;\r\n\r\n            Time.gamepad();\r\n\r\n            Time.tickFunc();\r\n            Time.drawFunc();\r\n\r\n            Time.mouse();\r\n\r\n            requestAnimationFrame(cb);\r\n        }\r\n\r\n        requestAnimationFrame((iNow) => {\r\n            Time.lastTime = iNow / 1e3;\r\n\r\n            Time.now = Time.lastTime;\r\n            this.play();\r\n\r\n            requestAnimationFrame(cb);\r\n        });\r\n    }\r\n\r\n    setScale(scale) {\r\n        Time.scale = scale;\r\n    }\r\n\r\n    setDeltaLimite(limite) {\r\n        Time.maxDelta = limite;\r\n    }\r\n\r\n    pause() {\r\n        this.pauseTick();\r\n        this.pauseDraw();\r\n    }\r\n\r\n    play() {\r\n        this.playTick();\r\n        this.playDraw();\r\n    }\r\n\r\n    pauseTick() {\r\n        Time.tickFunc = () => {};\r\n    }\r\n\r\n    playTick() {\r\n        Time.tickFunc = Time.tickCallback;\r\n        Time.tickStart = Time.now - Time.tick;\r\n    }\r\n\r\n    pauseDraw() {\r\n        Time.drawFunc = () => {};\r\n    }\r\n\r\n    playDraw() {\r\n        Time.drawFunc = Time.drawCallback;\r\n        Time.drawStart = Time.now - Time.draw;\r\n    }\r\n}\r\n\r\nTime.delta = 0;\r\nTime.limitedDelta = 0;\r\nTime.lastTime = 0;\r\nTime.scale = 1;\r\nTime.fps = 0;\r\nTime.now = 0;\r\nTime.tick = 0;\r\nTime.draw = 0;\r\n\n\n//# sourceURL=webpack:///C:/Users/J%C3%A9r%C3%A9my/Documents/GitHub/Akila/time/Time.js?");

/***/ }),

/***/ "../../Akila/time/Timeline.js":
/*!***************************************************************!*\
  !*** C:/Users/Jérémy/Documents/GitHub/Akila/time/Timeline.js ***!
  \***************************************************************/
/*! exports provided: Key, Timeline */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, \"Key\", function() { return Key; });\n/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, \"Timeline\", function() { return Timeline; });\n/* harmony import */ var _Time__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./Time */ \"../../Akila/time/Time.js\");\n\r\n\r\nclass KeyLinearState {\r\n    static calculate(buffer, indexDelimiter, key1, key2, delta) {\r\n        const data1 = key1.getData();\r\n        const data2 = key2.getData();\r\n\r\n        for(let i = 0; i < indexDelimiter; ++i) buffer[i] = TimelineUtils.bezier1(data1[i], data2[i], delta);\r\n        for(let i = indexDelimiter; i < data1.length; ++i) buffer[i] = data1[i];\r\n    }\r\n}\r\n\r\n\r\nclass KeyQuadraticBezierState {\r\n    static calculate(buffer, indexDelimiter, key1, key2, delta) {\r\n        const data1 = key1.getData();\r\n        const data2 = key2.getData();\r\n\r\n        const dataControl1 = key1.getController1();\r\n              \r\n        for(let i = 0; i < indexDelimiter; ++i) buffer[i] = TimelineUtils.bezier2(data1[i], dataControl1[i], data2[i], delta);\r\n        for(let i = indexDelimiter; i < data1.length; ++i) buffer[i] = data1[i];\r\n    }\r\n}\r\n\r\nclass KeyCubicBezierState {\r\n    static calculate(buffer, indexDelimiter, key1, key2, delta) {\r\n        const data1 = key1.getData();\r\n        const data2 = key2.getData();\r\n\r\n        const dataControl1 = key1.getController1();\r\n        const dataControl2 = key1.getController2();\r\n\r\n        for(let i = 0; i < indexDelimiter; ++i) buffer[i] = TimelineUtils.bezier3(data1[i], dataControl1[i], dataControl2[i], data2[i], delta);\r\n        for(let i = indexDelimiter; i < data1.length; ++i) buffer[i] = data1[i];\r\n    }\r\n}\r\n\r\nclass Key {\r\n    constructor(data, time) {\r\n        this.setData(data);\r\n        this.time = time;\r\n        this.state = KeyLinearState;\r\n    }\r\n\r\n    getTime() {\r\n        return this.time;\r\n    }\r\n\r\n    setData(data) {\r\n        this.data = data;\r\n        return this;\r\n    }\r\n\r\n    setController1(data) {\r\n        this.controller1 = data;\r\n        if(this.state == KeyLinearState) this.state = KeyQuadraticBezierState;\r\n        return this;\r\n    }\r\n\r\n    getController1() {\r\n        return this.controller1;\r\n    }\r\n\r\n    setController2(data) {\r\n        this.controller2 = data;\r\n        if(this.state != KeyCubicBezierState) this.state = KeyCubicBezierState;\r\n        return this;\r\n    }\r\n\r\n    getController2() {\r\n        return this.controller2;\r\n    }\r\n\r\n    getData() {\r\n        return this.data;\r\n    }\r\n}\r\n\r\n\r\nclass TimelineUtils {\r\n    static bezier1(p0, p1, t) {\r\n        return p0 * (1 - t) + p1 * t;\r\n    }\r\n\r\n    static bezier2(p0, p1, p2, t) {\r\n        const mt = 1 - t;\r\n        return p0 * (mt * mt) + 2 * p1 * t * mt + p2 * (t * t);\r\n    }\r\n\r\n    static bezier3(p0, p1, p2, p3, t) {\r\n        const t1 = 1 - t;\r\n        return p0 * (t1 * t1 * t1) + 3 * p1 * t * (t1 * t1) + 3 * p2 *(t * t) * t1 + p3 * (t * t * t);\r\n    }\r\n}\r\n\r\nclass TimelineNoLoopState {\r\n    static calculateIndex(tl) {\r\n        const indexMax = tl.keys.length - 2;\r\n        while (tl.keys[tl.currentIndex + 1].getTime() < tl.currentTime) {\r\n            if(tl.currentIndex < indexMax) {\r\n                ++tl.currentIndex;\r\n            } else {\r\n                tl.currentTime = tl.keys[tl.currentIndex + 1].getTime();\r\n                tl.currentIndex = indexMax;\r\n                break;\r\n            }\r\n        }\r\n    }\r\n}\r\n\r\nclass TimelineLoopState {\r\n    static calculateIndex(tl) {\r\n        while(tl.keys[tl.currentIndex + 1].getTime() < tl.currentTime) {\r\n            if(tl.currentIndex < (tl.keys.length - 2)) {\r\n                ++tl.currentIndex;\r\n            } else {\r\n                tl.currentTime -= tl.keys[tl.currentIndex + 1].getTime();\r\n                tl.currentIndex = 0;\r\n            }\r\n        }\r\n    }\r\n}\r\n\r\nclass Timeline {\r\n    constructor(interpolateIndexDelimiter = -1) {\r\n        this.keys = new Array();\r\n        this.buffer = new Array();\r\n        this.indexDelimiter = interpolateIndexDelimiter;\r\n        this.setLoop(false);\r\n        this.reset();\r\n    }\r\n\r\n    addKey(key) {\r\n        if(this.keys.length == 0) {\r\n            const data = key.getData();\r\n\r\n            if(data instanceof Float32Array) this.buffer = new Float32Array(data.length);\r\n            else if(data instanceof Float64Array) this.buffer = new Float64Array(data.length);\r\n            else if(data instanceof Int8Array) this.buffer = new Int8Array(data.length);\r\n            else if(data instanceof Int16Array) this.buffer = new Int16Array(data.length);\r\n            else if(data instanceof Int32Array) this.buffer = new Int32Array(data.length);\r\n            else this.buffer = new Array(data.length);\r\n\r\n            if(this.indexDelimiter == -1) this.indexDelimiter = data.length;\r\n            for(let i = 0; i < data.length; ++i) this.buffer[i] = data[i];\r\n        }\r\n        \r\n        this.keys.push(key);\r\n        return this;\r\n    }\r\n\r\n    setLoop(loop) {\r\n        if(loop) this.state = TimelineLoopState;\r\n        else this.state = TimelineNoLoopState;\r\n        return this;\r\n    }\r\n\r\n    next() {\r\n        this.state.calculateIndex(this);\r\n\r\n        const key1 = this.keys[this.currentIndex];\r\n        const key2 = this.keys[this.currentIndex + 1];\r\n        const delta = (this.currentTime - key1.getTime()) / (key2.getTime() - key1.getTime());\r\n\r\n        key1.state.calculate(this.buffer, this.indexDelimiter, key1, key2, delta);\r\n\r\n        this.currentTime += _Time__WEBPACK_IMPORTED_MODULE_0__[\"Time\"].delta;\r\n    }\r\n\r\n    getData() {\r\n        return this.buffer;\r\n    }\r\n\r\n    reset() {\r\n        this.currentTime = 0;\r\n        this.currentIndex = 0;\r\n    }\r\n}\r\n\n\n//# sourceURL=webpack:///C:/Users/J%C3%A9r%C3%A9my/Documents/GitHub/Akila/time/Timeline.js?");

/***/ }),

/***/ "./src/HSVVisualSelector.js":
/*!**********************************!*\
  !*** ./src/HSVVisualSelector.js ***!
  \**********************************/
/*! exports provided: HSVVisualSelector */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, \"HSVVisualSelector\", function() { return HSVVisualSelector; });\nconst clamp = (a, b, v) => {\r\n    return Math.min(b, Math.max(a, v));\r\n}\r\n\r\nclass HSVVisualSelector {\r\n    constructor(selectors = {container: null, pointer: null, canvas: null, hue: null, saturation: null, value: null}) {\r\n        this.hue = 0;\r\n        this.saturation = 0;\r\n        this.value = 0;\r\n\r\n        this.container = document.querySelector(selectors.container);\r\n        this.container.style = 'position: relative; width: fit-content; height: fit-content; display: block;';\r\n\r\n        this.canvas = document.querySelector(selectors.canvas);\r\n        this.canvas.setAttribute('id', 'grad');\r\n        this.ctx = this.canvas.getContext('2d');\r\n        let W = 512;\r\n        let H = 512;\r\n\r\n        this.canvas.width = W;\r\n        this.canvas.height = H;\r\n\r\n\r\n        this.hueSelector = document.querySelector(selectors.hue);\r\n        this.hueSelector.setAttribute('min', 0);\r\n        this.hueSelector.setAttribute('max', 360);\r\n        this.hueSelector.setAttribute('step', 0.01);\r\n \r\n        const hueEvent = () => {\r\n            this.hue = clamp(0, 360, this.hueSelector.value);\r\n        }\r\n        this.hueSelector.onchange = hueEvent;\r\n        this.hueSelector.onmousemove = hueEvent;\r\n\r\n\r\n\r\n        this.pointer = document.querySelector(selectors.pointer);\r\n        this.pointer.style.position = 'absolute';\r\n        this.setX(0);\r\n        this.setY(0);\r\n        \r\n\r\n\r\n        this.saturationSelector = document.querySelector(selectors.saturation);\r\n        this.saturationSelector.setAttribute('min', 0);\r\n        this.saturationSelector.setAttribute('max', 1);\r\n        this.saturationSelector.setAttribute('step', 0.00001);\r\n        \r\n        const satEvent = () => {\r\n            this.saturation = clamp(0, 1, this.saturationSelector.value);\r\n        }\r\n        this.saturationSelector.onchange = satEvent;\r\n        this.saturationSelector.onmousemove = satEvent;\r\n        \r\n\r\n        this.valueSelector = document.querySelector(selectors.value);\r\n        this.valueSelector.setAttribute('type', 'range');\r\n        this.valueSelector.setAttribute('min', 0);\r\n        this.valueSelector.setAttribute('max', 1);\r\n        this.valueSelector.setAttribute('step', 0.00001);\r\n\r\n        const valEvent = () => {\r\n            this.value = clamp(0, 1, this.valueSelector.value);\r\n        }\r\n        this.valueSelector.onchange = valEvent;\r\n        this.valueSelector.onmousemove = valEvent;\r\n    \r\n\r\n\r\n\r\n        this.saturationGrad = this.ctx.createLinearGradient(0, 0, this.canvas.width, 0);\r\n        this.saturationGrad.addColorStop(0, 'white');\r\n        this.saturationGrad.addColorStop(1, 'red');\r\n\r\n        this.valueGrad = this.ctx.createLinearGradient(0, 0, 0, this.canvas.height);\r\n        this.valueGrad.addColorStop(0, '#00000000');\r\n        this.valueGrad.addColorStop(1, '#000000ff');\r\n    }\r\n\r\n    setX(x) {\r\n        this.pointer.style.left = clamp(0, this.canvas.width, x)+ 'px';\r\n    }\r\n\r\n    setY(y) {\r\n        this.pointer.style.top = clamp(0, this.canvas.height, y)+ 'px';\r\n    }\r\n\r\n    getHue() {\r\n        return this.hue;\r\n    }\r\n\r\n    getSaturation() {\r\n        return this.saturation;\r\n    }\r\n\r\n    getValue() {\r\n        return this.value;\r\n    }\r\n\r\n    draw() {\r\n        this.setX(this.saturation * this.canvas.width);\r\n        this.setY(this.canvas.height - this.value * this.canvas.height);\r\n\r\n        this.ctx.fillStyle = this.saturationGrad;\r\n        this.ctx.fillRect(0, 0, this.canvas.width, this.canvas.height);\r\n\r\n        this.ctx.fillStyle = this.valueGrad;\r\n        this.ctx.fillRect(0, 0, this.canvas.width, this.canvas.height);\r\n    }\r\n}\r\n\n\n//# sourceURL=webpack:///./src/HSVVisualSelector.js?");

/***/ }),

/***/ "./src/main.js":
/*!*********************!*\
  !*** ./src/main.js ***!
  \*********************/
/*! no exports provided */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
eval("__webpack_require__.r(__webpack_exports__);\n/* harmony import */ var Akila_time__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! Akila/time */ \"../../Akila/time.js\");\n/* harmony import */ var _HSVVisualSelector__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./HSVVisualSelector */ \"./src/HSVVisualSelector.js\");\n\r\n\r\n\r\n\r\nconst time = new Akila_time__WEBPACK_IMPORTED_MODULE_0__[\"Time\"]();\r\nconst hsv = new _HSVVisualSelector__WEBPACK_IMPORTED_MODULE_1__[\"HSVVisualSelector\"]({container: '#gradContainer', canvas: '#grad', pointer: '#pointer', hue: '#hue', saturation: '#saturation', value: '#value'});\r\n\r\ntime.onInit(async () => {\r\n    \r\n});\r\n\r\ntime.onDraw(() => {\r\n    //console.log(hsv.getHue(), hsv.getSaturation(), hsv.getValue());\r\n    hsv.draw();\r\n});\r\n\r\ntime.start();\r\n\n\n//# sourceURL=webpack:///./src/main.js?");

/***/ })

/******/ });