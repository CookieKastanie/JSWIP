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

/***/ "../../../Akila/collision.js":
/*!************************************!*\
  !*** D:/GitHub/Akila/collision.js ***!
  \************************************/
/*! exports provided: BroadField2d, RayRaster2d */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
eval("__webpack_require__.r(__webpack_exports__);\n/* harmony import */ var _collision_BroadField2d__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./collision/BroadField2d */ \"../../../Akila/collision/BroadField2d.js\");\n/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, \"BroadField2d\", function() { return _collision_BroadField2d__WEBPACK_IMPORTED_MODULE_0__[\"BroadField2d\"]; });\n\n/* harmony import */ var _collision_RayRaster2d__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./collision/RayRaster2d */ \"../../../Akila/collision/RayRaster2d.js\");\n/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, \"RayRaster2d\", function() { return _collision_RayRaster2d__WEBPACK_IMPORTED_MODULE_1__[\"RayRaster2d\"]; });\n\n\r\n\r\n\n\n//# sourceURL=webpack:///D:/GitHub/Akila/collision.js?");

/***/ }),

/***/ "../../../Akila/collision/BroadField2d.js":
/*!*************************************************!*\
  !*** D:/GitHub/Akila/collision/BroadField2d.js ***!
  \*************************************************/
/*! exports provided: BroadField2d */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, \"BroadField2d\", function() { return BroadField2d; });\nclass BroadField2d {\r\n    constructor() {\r\n        this.field = new Map();\r\n    }\r\n\r\n    add(x, y, elem) {\r\n        const index = BroadField2d.coordToIndex(x, y);\r\n\r\n        let set = this.field.get(index);\r\n\r\n        if(!set) {\r\n            set = new Set();\r\n            this.field.set(index, set);\r\n        }\r\n\r\n        set.add(elem);\r\n    }\r\n\r\n    query(x, y, buffer = new Set()) {\r\n        const index = BroadField2d.coordToIndex(x, y);\r\n\r\n        const set = this.field.get(index);\r\n        if(set) {\r\n            for(let elem of set) buffer.add(elem);\r\n        }\r\n\r\n        return buffer;\r\n    }\r\n\r\n    static coordToIndex(x, y) {\r\n        return Math.floor(x) * BroadField2d.MAX_FIELD_VALUE + Math.floor(y);\r\n    }\r\n\r\n    clearAll() {\r\n        this.field.clear();\r\n    }\r\n}\r\n\r\nBroadField2d.MAX_FIELD_VALUE = Math.floor(Math.sqrt(Number.MAX_SAFE_INTEGER / 2));\r\nBroadField2d.MIN_FIELD_VALUE = -BroadField2d.MAX_FIELD_VALUE;\r\n\n\n//# sourceURL=webpack:///D:/GitHub/Akila/collision/BroadField2d.js?");

/***/ }),

/***/ "../../../Akila/collision/RayRaster2d.js":
/*!************************************************!*\
  !*** D:/GitHub/Akila/collision/RayRaster2d.js ***!
  \************************************************/
/*! exports provided: RayRaster2d */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, \"RayRaster2d\", function() { return RayRaster2d; });\n/* harmony import */ var _BroadField2d__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./BroadField2d */ \"../../../Akila/collision/BroadField2d.js\");\n\r\n\r\nclass RayRaster2d {\r\n    static addToField(x0, y0, x1, y1, field = new _BroadField2d__WEBPACK_IMPORTED_MODULE_0__[\"BroadField2d\"](), data) {\r\n        /*const dy = y1 - y0;\r\n        const dx = x1 - x0;\r\n        \r\n        if(dx == 0 && dy == 0) {\r\n            field.add(x0, y0, data);\r\n            return;\r\n        }*/\r\n\r\n        RayRaster2d.currentField = field;\r\n\r\n        const xDir = (x1 > x0);\r\n        const yDir = (y1 > y0);\r\n        const diff = (xDir ^ yDir) ? 1 : 0;\r\n\r\n        if (xDir) RayRaster2d._lookX(x0, y0, x1, y1, 0, data);\r\n        else RayRaster2d._lookX(x1, y1, x0, y0, diff, data);\r\n        \r\n        if (yDir) RayRaster2d._lookY(x0, y0, x1, y1, 0, data);\r\n        else RayRaster2d._lookY(x1, y1, x0, y0, diff, data);\r\n    }\r\n\r\n    static _lookX(x0, y0, x1, y1, dec, data) {\r\n        RayRaster2d.currentField.add(x0, y0, data);\r\n\r\n        const dy = y1 - y0;\r\n        const dx = x1 - x0;\r\n        const m = dy / dx;\r\n\r\n        for(let x = Math.floor(x0) + 1; x <= x1; ++x) {\r\n            const y = m * (x - x0) + y0;\r\n            RayRaster2d.currentField.add(x - dec, y, data);\r\n        }\r\n    }\r\n\r\n    static _lookY(x0, y0, x1, y1, dec, data) {\r\n        RayRaster2d.currentField.add(x0, y0, data);\r\n\r\n        const dy = y1 - y0;\r\n        const dx = x1 - x0;\r\n        const m = dx / dy;\r\n\r\n        for(let y = Math.floor(y0) + 1; y <= y1; ++y) {\r\n            const x =  m * (y - y0) + x0;\r\n            RayRaster2d.currentField.add(x, y - dec, data);\r\n        }\r\n    }\r\n}\r\n\r\nRayRaster2d.currentField = null;\r\n\n\n//# sourceURL=webpack:///D:/GitHub/Akila/collision/RayRaster2d.js?");

/***/ }),

/***/ "../../../Akila/inputs.js":
/*!*********************************!*\
  !*** D:/GitHub/Akila/inputs.js ***!
  \*********************************/
/*! exports provided: Keyboard, Mouse, Gamepad, Gesture */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
eval("__webpack_require__.r(__webpack_exports__);\n/* harmony import */ var _inputs_Keyboard__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./inputs/Keyboard */ \"../../../Akila/inputs/Keyboard.js\");\n/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, \"Keyboard\", function() { return _inputs_Keyboard__WEBPACK_IMPORTED_MODULE_0__[\"Keyboard\"]; });\n\n/* harmony import */ var _inputs_Mouse__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./inputs/Mouse */ \"../../../Akila/inputs/Mouse.js\");\n/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, \"Mouse\", function() { return _inputs_Mouse__WEBPACK_IMPORTED_MODULE_1__[\"Mouse\"]; });\n\n/* harmony import */ var _inputs_Gamepad__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./inputs/Gamepad */ \"../../../Akila/inputs/Gamepad.js\");\n/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, \"Gamepad\", function() { return _inputs_Gamepad__WEBPACK_IMPORTED_MODULE_2__[\"Gamepad\"]; });\n\n/* harmony import */ var _inputs_Gesture__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ./inputs/Gesture */ \"../../../Akila/inputs/Gesture.js\");\n/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, \"Gesture\", function() { return _inputs_Gesture__WEBPACK_IMPORTED_MODULE_3__[\"Gesture\"]; });\n\n\r\n\r\n\r\n\r\n\n\n//# sourceURL=webpack:///D:/GitHub/Akila/inputs.js?");

/***/ }),

/***/ "../../../Akila/inputs/Gamepad.js":
/*!*****************************************!*\
  !*** D:/GitHub/Akila/inputs/Gamepad.js ***!
  \*****************************************/
/*! exports provided: Gamepad */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, \"Gamepad\", function() { return Gamepad; });\n/* harmony import */ var _time_Time__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../time/Time */ \"../../../Akila/time/Time.js\");\n\r\n\r\nclass Gamepad {\r\n    constructor() {\r\n        if(Gamepad.instance != null) return;\r\n        Gamepad.instance = this;\r\n        _time_Time__WEBPACK_IMPORTED_MODULE_0__[\"Time\"].gamepad = this.update;\r\n\r\n        this.states = new Array();\r\n        this.connect = [false, false, false, false];\r\n        this.setDeadZone(0.1);\r\n\r\n        for(let i = 0; i < 4; ++i) this.clear(i);\r\n\r\n        window.addEventListener(\"gamepadconnected\", event => {\r\n            this.connect[event.gamepad.index] = true;\r\n        });\r\n\r\n        window.addEventListener(\"gamepaddisconnected\", event => {\r\n            this.clear(event.gamepad.index);\r\n            this.connect[event.gamepad.index] = false;\r\n        });\r\n    }\r\n\r\n    clear(player = Gamepad.PLAYER1) {\r\n        const buttons = new Array();\r\n\r\n        for(let i = 0; i < 17; ++i) buttons.push({value: 0});\r\n\r\n        Gamepad.instance.states[player] = {\r\n            axes: [0, 0, 0, 0],\r\n            buttons: buttons\r\n        };\r\n    }\r\n\r\n    update() {\r\n        let i = 0;\r\n        for (let m of navigator.getGamepads()) if(m) {\r\n            const state = Gamepad.instance.states[i++];\r\n            state.buttons = m.buttons;\r\n            //state.axes = m.axes;\r\n            state.axes[0] = m.axes[0] >= Gamepad.deadZone || m.axes[0] <= -Gamepad.deadZone ? m.axes[0] : 0;\r\n            state.axes[1] = m.axes[1] >= Gamepad.deadZone || m.axes[1] <= -Gamepad.deadZone ? m.axes[1] : 0;\r\n            state.axes[2] = m.axes[2] >= Gamepad.deadZone || m.axes[2] <= -Gamepad.deadZone ? m.axes[2] : 0;\r\n            state.axes[3] = m.axes[3] >= Gamepad.deadZone || m.axes[3] <= -Gamepad.deadZone ? m.axes[3] : 0;\r\n        }\r\n    }\r\n\r\n    isConnect(player = Gamepad.PLAYER1) {\r\n        return Gamepad.instance.connect[player];\r\n    }\r\n\r\n    setDeadZone(value) {\r\n        Gamepad.deadZone = value;\r\n    }\r\n\r\n    getButton(button, player = Gamepad.PLAYER1) {\r\n        return Gamepad.instance.states[player].buttons[button].value;\r\n    }\r\n\r\n    getStickAX(player = Gamepad.PLAYER1) {\r\n        return Gamepad.instance.states[player].axes[0];\r\n    }\r\n\r\n    getStickAY(player = Gamepad.PLAYER1) {\r\n        return Gamepad.instance.states[player].axes[1];\r\n    }\r\n\r\n    getStickBX(player = Gamepad.PLAYER1) {\r\n        return Gamepad.instance.states[player].axes[2];\r\n    }\r\n\r\n    getStickBY(player = Gamepad.PLAYER1) {\r\n        return Gamepad.instance.states[player].axes[3];\r\n    }\r\n}\r\n\r\nGamepad.instance = null;\r\n\r\nGamepad.PLAYER1 = 0;\r\nGamepad.PLAYER2 = 2;\r\nGamepad.PLAYER3 = 2;\r\nGamepad.PLAYER4 = 3;\r\n\r\nGamepad.A = 0;\r\nGamepad.B = 1;\r\nGamepad.X = 2;\r\nGamepad.Y = 3;\r\n\r\nGamepad.LEFT_BUTTON = 4;\r\nGamepad.RIGHT_BUTTON = 5;\r\n\r\nGamepad.LEFT_TRIGGER = 6;\r\nGamepad.RIGHT_TRIGGER = 7;\r\n\r\nGamepad.SELECT = 8;\r\nGamepad.START = 9;\r\n\r\nGamepad.LEFT_STICK = 10;\r\nGamepad.RIGHT_STICK = 11;\r\n\r\nGamepad.UP = 12;\r\nGamepad.DOWN = 13;\r\nGamepad.LEFT = 14;\r\nGamepad.RIGHT = 15;\r\n\r\nGamepad.GUIDE = 16;\r\n\n\n//# sourceURL=webpack:///D:/GitHub/Akila/inputs/Gamepad.js?");

/***/ }),

/***/ "../../../Akila/inputs/Gesture.js":
/*!*****************************************!*\
  !*** D:/GitHub/Akila/inputs/Gesture.js ***!
  \*****************************************/
/*! exports provided: Gesture */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, \"Gesture\", function() { return Gesture; });\n/* harmony import */ var _time_Time__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../time/Time */ \"../../../Akila/time/Time.js\");\n/* harmony import */ var _webgl_Display__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ../webgl/Display */ \"../../../Akila/webgl/Display.js\");\n\r\n\r\n\r\nclass Gesture {\r\n    constructor() {\r\n        if(Gesture.instance != null) return;\r\n        Gesture.instance = this;\r\n\r\n        if(_webgl_Display__WEBPACK_IMPORTED_MODULE_1__[\"Display\"].ctx) this.setDOMElementReference(_webgl_Display__WEBPACK_IMPORTED_MODULE_1__[\"Display\"].ctx.canvas);\r\n        else this.setDOMElementReference({\r\n            getBoundingClientRect: () => {\r\n                return {left: 0, top: 0};\r\n            } \r\n        });\r\n\r\n        //document.getElementsByTagName('body')[0].requestFullscreen().then(console.log).catch(console.log)\r\n\r\n        this.clear();\r\n\r\n        window.addEventListener('touchstart', event => {\r\n            const rect = Gesture.domRef.getBoundingClientRect();\r\n            const t1 = event.touches[0];\r\n\r\n            Gesture.instance.x = t1.clientX - (rect.left + window.scrollX);\r\n            Gesture.instance.y = t1.clientY - (rect.top + window.scrollY);\r\n\r\n            Gesture.instance.lastX = Gesture.instance.x;\r\n            Gesture.instance.lastY = Gesture.instance.y;\r\n        });\r\n\r\n        window.addEventListener('touchmove', event => {\r\n            const rect = Gesture.domRef.getBoundingClientRect();\r\n            const t1 = event.touches[0];\r\n            //console.log(t1)\r\n\r\n            Gesture.instance.x = t1.clientX - (rect.left + window.scrollX);\r\n            Gesture.instance.y = t1.clientY - (rect.top + window.scrollY);\r\n\r\n\r\n\r\n            Gesture.instance.movX = Gesture.instance.x - Gesture.instance.lastX;\r\n            Gesture.instance.movY = Gesture.instance.y - Gesture.instance.lastY;\r\n\r\n\r\n\r\n            Gesture.instance.lastX = Gesture.instance.x;\r\n            Gesture.instance.lastY = Gesture.instance.y;\r\n        });\r\n\r\n        window.addEventListener('touchend', event => {\r\n            Gesture.instance.movX = 0;\r\n            Gesture.instance.movY = 0;\r\n        });\r\n    }\r\n\r\n    clear() {\r\n        Gesture.instance.lastX = 0;\r\n        Gesture.instance.lastY = 0;\r\n\r\n        Gesture.instance.x = 0;\r\n        Gesture.instance.y = 0;\r\n\r\n        Gesture.instance.movX = 0;\r\n        Gesture.instance.movY = 0;\r\n    }\r\n\r\n    touchX() {\r\n        return Gesture.instance.x;\r\n    }\r\n\r\n    touchY() {\r\n        return Gesture.instance.y;\r\n    }\r\n\r\n    swipX() {\r\n        return Gesture.instance.movX;\r\n    }\r\n\r\n    swipY() {\r\n        return Gesture.instance.movY;\r\n    }\r\n\r\n    scaleVel() {\r\n        \r\n    }\r\n\r\n    setDOMElementReference(elem) {\r\n        Gesture.domRef = elem;\r\n    }\r\n}\r\n\r\nGesture.instance = null;\r\n\n\n//# sourceURL=webpack:///D:/GitHub/Akila/inputs/Gesture.js?");

/***/ }),

/***/ "../../../Akila/inputs/Keyboard.js":
/*!******************************************!*\
  !*** D:/GitHub/Akila/inputs/Keyboard.js ***!
  \******************************************/
/*! exports provided: Keyboard */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, \"Keyboard\", function() { return Keyboard; });\nclass Keyboard {\r\n    constructor() {\r\n        if(Keyboard.instance != null) return;\r\n        Keyboard.instance = this;\r\n\r\n        this.pressStates = new Array();\r\n        this.toggleStates = new Array();\r\n\r\n        this.clear();\r\n\r\n        window.onkeydown = event => {\r\n            if (!event.ctrlKey) return;\r\n            switch (event.keyCode) {\r\n                case 83: //Block Ctrl+S\r\n                case 68: //Block Ctrl+D\r\n                    event.preventDefault();\r\n                    event.stopPropagation();\r\n                    break;\r\n            }\r\n        };\r\n\r\n        window.addEventListener('keydown', event => {\r\n            this.pressStates[event.keyCode] = true;\r\n            this.toggleStates[event.keyCode] = !this.toggleStates[event.keyCode];\r\n            return false;\r\n        });\r\n\r\n        window.addEventListener('keyup', event => {\r\n            this.pressStates[event.keyCode] = false;\r\n            return false;\r\n        });\r\n    }\r\n\r\n    clear() {\r\n        for(let i = 0; i < 256; ++i) {\r\n            Keyboard.instance.pressStates[i] = false;\r\n            Keyboard.instance.toggleStates[i] = false;\r\n        }\r\n    }\r\n\r\n    isPressed(key) {\r\n        return Keyboard.instance.pressStates[key];\r\n    }\r\n\r\n    isToggled(key) {\r\n        return Keyboard.instance.toggleStates[key];\r\n    }\r\n}\r\n\r\nKeyboard.instance = null;\r\n\r\nKeyboard.BACKSPACE = 8;\r\nKeyboard.TAB = 9;\r\nKeyboard.ENTER = 13;\r\nKeyboard.SHIFT = 16;\r\nKeyboard.CTRL = 17;\r\nKeyboard.ALT = 18;\r\nKeyboard.PAUSE = 19;\r\nKeyboard.CAPS_LOCK = 20;\r\nKeyboard.ESCAPE = 27;\r\nKeyboard.SPACE = 32;\r\nKeyboard.PAGE_UP = 33;\r\nKeyboard.PAGE_DOWN = 34;\r\nKeyboard.END = 35;\r\nKeyboard.HOME = 36;\r\nKeyboard.LEFT_ARROW = 37;\r\nKeyboard.UP_ARROW = 38;\r\nKeyboard.RIGHT_ARROW = 39;\r\nKeyboard.DOWN_ARROW = 40;\r\nKeyboard.INSERT = 45;\r\nKeyboard.DELETE = 46;\r\nKeyboard.KEY_0 = 48;\r\nKeyboard.KEY_1 = 49;\r\nKeyboard.KEY_2 = 50;\r\nKeyboard.KEY_3 = 51;\r\nKeyboard.KEY_4 = 52;\r\nKeyboard.KEY_5 = 53;\r\nKeyboard.KEY_6 = 54;\r\nKeyboard.KEY_7 = 55;\r\nKeyboard.KEY_8 = 56;\r\nKeyboard.KEY_9 = 57;\r\nKeyboard.KEY_A = 65;\r\nKeyboard.KEY_B = 66;\r\nKeyboard.KEY_C = 67;\r\nKeyboard.KEY_D = 68;\r\nKeyboard.KEY_E = 69;\r\nKeyboard.KEY_F = 70;\r\nKeyboard.KEY_G = 71;\r\nKeyboard.KEY_H = 72;\r\nKeyboard.KEY_I = 73;\r\nKeyboard.KEY_J = 74;\r\nKeyboard.KEY_K = 75;\r\nKeyboard.KEY_L = 76;\r\nKeyboard.KEY_M = 77;\r\nKeyboard.KEY_N = 78;\r\nKeyboard.KEY_O = 79;\r\nKeyboard.KEY_P = 80;\r\nKeyboard.KEY_Q = 81;\r\nKeyboard.KEY_R = 82;\r\nKeyboard.KEY_S = 83;\r\nKeyboard.KEY_T = 84;\r\nKeyboard.KEY_U = 85;\r\nKeyboard.KEY_V = 86;\r\nKeyboard.KEY_W = 87;\r\nKeyboard.KEY_X = 88;\r\nKeyboard.KEY_Y = 89;\r\nKeyboard.KEY_Z = 90;\r\nKeyboard.LEFT_META = 91;\r\nKeyboard.RIGHT_META = 92;\r\nKeyboard.SELECT = 93;\r\nKeyboard.NUMPAD_0 = 96;\r\nKeyboard.NUMPAD_1 = 97;\r\nKeyboard.NUMPAD_2 = 98;\r\nKeyboard.NUMPAD_3 = 99;\r\nKeyboard.NUMPAD_4 = 100;\r\nKeyboard.NUMPAD_5 = 101;\r\nKeyboard.NUMPAD_6 = 102;\r\nKeyboard.NUMPAD_7 = 103;\r\nKeyboard.NUMPAD_8 = 104;\r\nKeyboard.NUMPAD_9 = 105;\r\nKeyboard.MULTIPLY = 106;\r\nKeyboard.ADD = 107;\r\nKeyboard.SUBTRACT = 109;\r\nKeyboard.DECIMAL = 110;\r\nKeyboard.DIVIDE = 111;\r\nKeyboard.F1 = 112;\r\nKeyboard.F2 = 113;\r\nKeyboard.F3 = 114;\r\nKeyboard.F4 = 115;\r\nKeyboard.F5 = 116;\r\nKeyboard.F6 = 117;\r\nKeyboard.F7 = 118;\r\nKeyboard.F8 = 119;\r\nKeyboard.F9 = 120;\r\nKeyboard.F10 = 121;\r\nKeyboard.F11 = 122;\r\nKeyboard.F12 = 123;\r\nKeyboard.NUM_LOCK = 144;\r\nKeyboard.SCROLL_LOCK = 145;\r\nKeyboard.SEMICOLON = 186;\r\nKeyboard.EQUALS = 187;\r\nKeyboard.COMMA = 188;\r\nKeyboard.DASH = 189;\r\nKeyboard.PERIOD = 190;\r\nKeyboard.FORWARD_SLASH = 191;\r\nKeyboard.GRAVE_ACCENT = 192;\r\nKeyboard.OPEN_BRACKET = 219;\r\nKeyboard.BACK_SLASH = 220;\r\nKeyboard.CLOSE_BRACKET = 221;\r\nKeyboard.SINGLE_QUOTE = 222;\r\n\n\n//# sourceURL=webpack:///D:/GitHub/Akila/inputs/Keyboard.js?");

/***/ }),

/***/ "../../../Akila/inputs/Mouse.js":
/*!***************************************!*\
  !*** D:/GitHub/Akila/inputs/Mouse.js ***!
  \***************************************/
/*! exports provided: Mouse */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, \"Mouse\", function() { return Mouse; });\n/* harmony import */ var _time_Time__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../time/Time */ \"../../../Akila/time/Time.js\");\n/* harmony import */ var _webgl_Display__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ../webgl/Display */ \"../../../Akila/webgl/Display.js\");\n\r\n\r\n\r\nclass Mouse {\r\n    constructor() {\r\n        if(Mouse.instance != null) return;\r\n        Mouse.instance = this;\r\n        _time_Time__WEBPACK_IMPORTED_MODULE_0__[\"Time\"].mouse = this.update;\r\n\r\n        this.pressStates = new Array();\r\n        this.toggleStates = new Array();\r\n\r\n        this.x = 0;\r\n        this.y = 0;\r\n\r\n        this.update();\r\n\r\n        if(_webgl_Display__WEBPACK_IMPORTED_MODULE_1__[\"Display\"].ctx) this.setDOMElementReference(_webgl_Display__WEBPACK_IMPORTED_MODULE_1__[\"Display\"].ctx.canvas);\r\n        else this.setDOMElementReference({\r\n            getBoundingClientRect: () => {\r\n                return {left: 0, top: 0};\r\n            } \r\n        });\r\n\r\n        this.clear();\r\n\r\n        window.addEventListener('mousedown', event => {\r\n            event.preventDefault();\r\n            this.pressStates[event.button] = true;\r\n            this.toggleStates[event.button] = !this.toggleStates[event.button];\r\n        });\r\n\r\n        window.addEventListener('mouseup', event => {\r\n            this.pressStates[event.button] = false;\r\n        });\r\n\r\n        window.addEventListener('contextmenu', event => {\r\n            event.preventDefault();\r\n            return false;\r\n        });\r\n\r\n        window.addEventListener('mousemove', event => {\r\n            const rect = Mouse.domRef.getBoundingClientRect();\r\n            Mouse.instance.x = event.clientX - (rect.left + window.scrollX);\r\n            Mouse.instance.y = event.clientY - (rect.top + window.scrollY);\r\n\r\n            Mouse.instance.movX += event.movementX;\r\n            Mouse.instance.movY += event.movementY;\r\n        });\r\n\r\n        window.addEventListener('wheel', event => {\r\n            Mouse.instance.mouseScrollVelX = event.deltaX > 0 ? 1 : -1;\r\n            Mouse.instance.mouseScrollVelY = event.deltaY > 0 ? 1 : -1;\r\n\r\n            return false;\r\n        });\r\n    }\r\n\r\n\r\n\r\n    clear() {\r\n        for(let i = 0; i < 4; ++i) {\r\n            Mouse.instance.pressStates[i] = false;\r\n            Mouse.instance.toggleStates[i] = false;\r\n        }\r\n    }\r\n\r\n    update() {\r\n        Mouse.instance.mouseScrollVelX = 0;\r\n        Mouse.instance.mouseScrollVelY = 0;\r\n\r\n        Mouse.instance.movX = 0;\r\n        Mouse.instance.movY = 0;\r\n    }\r\n\r\n    isPressed(button) {\r\n        return Mouse.instance.pressStates[button];\r\n    }\r\n\r\n    isToggled(button) {\r\n        return Mouse.instance.toggleStates[button];\r\n    }\r\n\r\n    posX() {\r\n        return Mouse.instance.x;\r\n    }\r\n\r\n    posY() {\r\n        return Mouse.instance.y;\r\n    }\r\n\r\n    velX() {\r\n        return Mouse.instance.movX;\r\n    }\r\n\r\n    velY() {\r\n        return Mouse.instance.movY;\r\n    }\r\n\r\n    scrollVelX() {      \r\n        return Mouse.instance.mouseScrollVelX;\r\n    }\r\n\r\n    scrollVelY() {\r\n        return Mouse.instance.mouseScrollVelY;\r\n    }\r\n\r\n    setDOMElementReference(elem) {\r\n        Mouse.domRef = elem;\r\n    }\r\n}\r\n\r\nMouse.instance = null;\r\n\r\nMouse.LEFT_BUTTON = 0;\r\nMouse.WHEEL_BUTTON = 1;\r\nMouse.RIGHT_BUTTON = 2;\r\n\n\n//# sourceURL=webpack:///D:/GitHub/Akila/inputs/Mouse.js?");

/***/ }),

/***/ "../../../Akila/time.js":
/*!*******************************!*\
  !*** D:/GitHub/Akila/time.js ***!
  \*******************************/
/*! exports provided: Time, Key, Timeline, StateTimeline */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
eval("__webpack_require__.r(__webpack_exports__);\n/* harmony import */ var _time_Time__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./time/Time */ \"../../../Akila/time/Time.js\");\n/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, \"Time\", function() { return _time_Time__WEBPACK_IMPORTED_MODULE_0__[\"Time\"]; });\n\n/* harmony import */ var _time_Timeline__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./time/Timeline */ \"../../../Akila/time/Timeline.js\");\n/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, \"Key\", function() { return _time_Timeline__WEBPACK_IMPORTED_MODULE_1__[\"Key\"]; });\n\n/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, \"Timeline\", function() { return _time_Timeline__WEBPACK_IMPORTED_MODULE_1__[\"Timeline\"]; });\n\n/* harmony import */ var _time_StateTimeline__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./time/StateTimeline */ \"../../../Akila/time/StateTimeline.js\");\n/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, \"StateTimeline\", function() { return _time_StateTimeline__WEBPACK_IMPORTED_MODULE_2__[\"StateTimeline\"]; });\n\n\r\n\r\n\r\n\n\n//# sourceURL=webpack:///D:/GitHub/Akila/time.js?");

/***/ }),

/***/ "../../../Akila/time/StateTimeline.js":
/*!*********************************************!*\
  !*** D:/GitHub/Akila/time/StateTimeline.js ***!
  \*********************************************/
/*! exports provided: StateTimeline */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, \"StateTimeline\", function() { return StateTimeline; });\nclass StateTimelineNoLoopState {\r\n    static calculateIndex(tl) {\r\n        tl.currentIndex = Math.min(tl.currentIndex + 1, tl.states.length - 1);\r\n    }\r\n}\r\n\r\nclass StateTimelineLoopState {\r\n    static calculateIndex(tl) {\r\n        ++tl.currentIndex;\r\n        if(tl.currentIndex >= tl.states.length) tl.currentIndex = 0;\r\n    }\r\n}\r\n\r\nclass StateTimeline {\r\n    constructor() {\r\n        this.states = new Array();\r\n        this.buffer = new Object();\r\n        this.setLoop(false);\r\n        this.reset();\r\n    }\r\n\r\n    addState(obj) {\r\n        if(this.states.length == 0) this.buffer = obj;\r\n        this.states.push(obj);\r\n        return this;\r\n    }\r\n\r\n    setLoop(loop) {\r\n        if(loop) this.state = StateTimelineLoopState;\r\n        else this.state = StateTimelineNoLoopState;\r\n        return this;\r\n    }\r\n\r\n    next() {\r\n        this.state.calculateIndex(this);\r\n        this.buffer = this.states[this.currentIndex];\r\n    }\r\n\r\n    reset() {\r\n        this.currentIndex = 0;\r\n    }\r\n\r\n    getData() {\r\n        return this.buffer;\r\n    }\r\n}\r\n\n\n//# sourceURL=webpack:///D:/GitHub/Akila/time/StateTimeline.js?");

/***/ }),

/***/ "../../../Akila/time/Time.js":
/*!************************************!*\
  !*** D:/GitHub/Akila/time/Time.js ***!
  \************************************/
/*! exports provided: Time */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, \"Time\", function() { return Time; });\nclass Time {\r\n    constructor() {\r\n        if(Time.instance) return;\r\n        Time.instance = this;\r\n\r\n        this.onInit(() => {});\r\n        this.onTick(() => {});\r\n        this.onDraw(() => {});\r\n\r\n        Time.mouse = () => {};\r\n        Time.gamepad = () => {};\r\n\r\n        Time.run = false;\r\n        Time.tickStart = 0;\r\n        Time.drawStart = 0;\r\n\r\n        this.setDeltaLimite(1 / 15);\r\n    }\r\n\r\n    onInit(callBack) {\r\n        Time.init = callBack;\r\n    }\r\n\r\n    onTick(callack) {\r\n        Time.tickCallback = () => {\r\n            callack();\r\n            Time.tick = Time.now - Time.tickStart;\r\n        }\r\n    }\r\n\r\n    onDraw(callack) {\r\n        Time.drawCallback = () => {\r\n            callack();\r\n            Time.draw = Time.now - Time.drawStart;\r\n        }\r\n    }\r\n\r\n    async start() {\r\n        if(Time.run) return;\r\n\r\n        await Time.init();\r\n\r\n        Time.run = true;\r\n\r\n        const cb = (iNow) => {\r\n            Time.now = iNow / 1e3;\r\n            Time.delta = (Time.now - Time.lastTime) * Time.scale;\r\n            Time.limitedDelta = Time.delta > Time.maxDelta ? Time.maxDelta : Time.delta;\r\n            Time.fps = Math.floor(1 / Time.delta * 100) / 100;\r\n            Time.lastTime = Time.now;\r\n\r\n            Time.gamepad();\r\n\r\n            Time.tickFunc();\r\n            Time.drawFunc();\r\n\r\n            Time.mouse();\r\n\r\n            requestAnimationFrame(cb);\r\n        }\r\n\r\n        requestAnimationFrame((iNow) => {\r\n            Time.lastTime = iNow / 1e3;\r\n\r\n            Time.now = Time.lastTime;\r\n            this.play();\r\n\r\n            requestAnimationFrame(cb);\r\n        });\r\n    }\r\n\r\n    setScale(scale) {\r\n        Time.scale = scale;\r\n    }\r\n\r\n    setDeltaLimite(limite) {\r\n        Time.maxDelta = limite;\r\n    }\r\n\r\n    pause() {\r\n        this.pauseTick();\r\n        this.pauseDraw();\r\n    }\r\n\r\n    play() {\r\n        this.playTick();\r\n        this.playDraw();\r\n    }\r\n\r\n    pauseTick() {\r\n        Time.tickFunc = () => {};\r\n    }\r\n\r\n    playTick() {\r\n        Time.tickFunc = Time.tickCallback;\r\n        Time.tickStart = Time.now - Time.tick;\r\n    }\r\n\r\n    pauseDraw() {\r\n        Time.drawFunc = () => {};\r\n    }\r\n\r\n    playDraw() {\r\n        Time.drawFunc = Time.drawCallback;\r\n        Time.drawStart = Time.now - Time.draw;\r\n    }\r\n}\r\n\r\nTime.delta = 0;\r\nTime.limitedDelta = 0;\r\nTime.lastTime = 0;\r\nTime.scale = 1;\r\nTime.fps = 0;\r\nTime.now = 0;\r\nTime.tick = 0;\r\nTime.draw = 0;\r\n\n\n//# sourceURL=webpack:///D:/GitHub/Akila/time/Time.js?");

/***/ }),

/***/ "../../../Akila/time/Timeline.js":
/*!****************************************!*\
  !*** D:/GitHub/Akila/time/Timeline.js ***!
  \****************************************/
/*! exports provided: Key, Timeline */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, \"Key\", function() { return Key; });\n/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, \"Timeline\", function() { return Timeline; });\n/* harmony import */ var _Time__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./Time */ \"../../../Akila/time/Time.js\");\n\r\n\r\nclass KeyLinearState {\r\n    static calculate(buffer, indexDelimiter, key1, key2, delta) {\r\n        const data1 = key1.getData();\r\n        const data2 = key2.getData();\r\n\r\n        for(let i = 0; i < indexDelimiter; ++i) buffer[i] = TimelineUtils.bezier1(data1[i], data2[i], delta);\r\n        for(let i = indexDelimiter; i < data1.length; ++i) buffer[i] = data1[i];\r\n    }\r\n}\r\n\r\n\r\nclass KeyQuadraticBezierState {\r\n    static calculate(buffer, indexDelimiter, key1, key2, delta) {\r\n        const data1 = key1.getData();\r\n        const data2 = key2.getData();\r\n\r\n        const dataControl1 = key1.getController1();\r\n              \r\n        for(let i = 0; i < indexDelimiter; ++i) buffer[i] = TimelineUtils.bezier2(data1[i], dataControl1[i], data2[i], delta);\r\n        for(let i = indexDelimiter; i < data1.length; ++i) buffer[i] = data1[i];\r\n    }\r\n}\r\n\r\nclass KeyCubicBezierState {\r\n    static calculate(buffer, indexDelimiter, key1, key2, delta) {\r\n        const data1 = key1.getData();\r\n        const data2 = key2.getData();\r\n\r\n        const dataControl1 = key1.getController1();\r\n        const dataControl2 = key1.getController2();\r\n\r\n        for(let i = 0; i < indexDelimiter; ++i) buffer[i] = TimelineUtils.bezier3(data1[i], dataControl1[i], dataControl2[i], data2[i], delta);\r\n        for(let i = indexDelimiter; i < data1.length; ++i) buffer[i] = data1[i];\r\n    }\r\n}\r\n\r\nclass Key {\r\n    constructor(data, time) {\r\n        this.setData(data);\r\n        this.time = time;\r\n        this.state = KeyLinearState;\r\n    }\r\n\r\n    getTime() {\r\n        return this.time;\r\n    }\r\n\r\n    setData(data) {\r\n        this.data = data;\r\n        return this;\r\n    }\r\n\r\n    setController1(data) {\r\n        this.controller1 = data;\r\n        if(this.state == KeyLinearState) this.state = KeyQuadraticBezierState;\r\n        return this;\r\n    }\r\n\r\n    getController1() {\r\n        return this.controller1;\r\n    }\r\n\r\n    setController2(data) {\r\n        this.controller2 = data;\r\n        if(this.state != KeyCubicBezierState) this.state = KeyCubicBezierState;\r\n        return this;\r\n    }\r\n\r\n    getController2() {\r\n        return this.controller2;\r\n    }\r\n\r\n    getData() {\r\n        return this.data;\r\n    }\r\n}\r\n\r\n\r\nclass TimelineUtils {\r\n    static bezier1(p0, p1, t) {\r\n        return p0 * (1 - t) + p1 * t;\r\n    }\r\n\r\n    static bezier2(p0, p1, p2, t) {\r\n        const mt = 1 - t;\r\n        return p0 * (mt * mt) + 2 * p1 * t * mt + p2 * (t * t);\r\n    }\r\n\r\n    static bezier3(p0, p1, p2, p3, t) {\r\n        const t1 = 1 - t;\r\n        return p0 * (t1 * t1 * t1) + 3 * p1 * t * (t1 * t1) + 3 * p2 *(t * t) * t1 + p3 * (t * t * t);\r\n    }\r\n}\r\n\r\nclass TimelineNoLoopState {\r\n    static calculateIndex(tl) {\r\n        const indexMax = tl.keys.length - 2;\r\n        while (tl.keys[tl.currentIndex + 1].getTime() < tl.currentTime) {\r\n            if(tl.currentIndex < indexMax) {\r\n                ++tl.currentIndex;\r\n            } else {\r\n                tl.currentTime = tl.keys[tl.currentIndex + 1].getTime();\r\n                tl.currentIndex = indexMax;\r\n                break;\r\n            }\r\n        }\r\n    }\r\n}\r\n\r\nclass TimelineLoopState {\r\n    static calculateIndex(tl) {\r\n        while(tl.keys[tl.currentIndex + 1].getTime() < tl.currentTime) {\r\n            if(tl.currentIndex < (tl.keys.length - 2)) {\r\n                ++tl.currentIndex;\r\n            } else {\r\n                tl.currentTime -= tl.keys[tl.currentIndex + 1].getTime();\r\n                tl.currentIndex = 0;\r\n            }\r\n        }\r\n    }\r\n}\r\n\r\nclass Timeline {\r\n    constructor(interpolateIndexDelimiter = -1) {\r\n        this.keys = new Array();\r\n        this.buffer = new Array();\r\n        this.indexDelimiter = interpolateIndexDelimiter;\r\n        this.setLoop(false);\r\n        this.reset();\r\n    }\r\n\r\n    addKey(key) {\r\n        if(this.keys.length == 0) {\r\n            const data = key.getData();\r\n\r\n            if(data instanceof Float32Array) this.buffer = new Float32Array(data.length);\r\n            else if(data instanceof Float64Array) this.buffer = new Float64Array(data.length);\r\n            else if(data instanceof Int8Array) this.buffer = new Int8Array(data.length);\r\n            else if(data instanceof Int16Array) this.buffer = new Int16Array(data.length);\r\n            else if(data instanceof Int32Array) this.buffer = new Int32Array(data.length);\r\n            else this.buffer = new Array(data.length);\r\n\r\n            if(this.indexDelimiter == -1) this.indexDelimiter = data.length;\r\n            for(let i = 0; i < data.length; ++i) this.buffer[i] = data[i];\r\n        }\r\n        \r\n        this.keys.push(key);\r\n        return this;\r\n    }\r\n\r\n    setLoop(loop) {\r\n        if(loop) this.state = TimelineLoopState;\r\n        else this.state = TimelineNoLoopState;\r\n        return this;\r\n    }\r\n\r\n    next() {\r\n        this.state.calculateIndex(this);\r\n\r\n        const key1 = this.keys[this.currentIndex];\r\n        const key2 = this.keys[this.currentIndex + 1];\r\n        const delta = (this.currentTime - key1.getTime()) / (key2.getTime() - key1.getTime());\r\n\r\n        key1.state.calculate(this.buffer, this.indexDelimiter, key1, key2, delta);\r\n\r\n        this.currentTime += _Time__WEBPACK_IMPORTED_MODULE_0__[\"Time\"].delta;\r\n    }\r\n\r\n    getData() {\r\n        return this.buffer;\r\n    }\r\n\r\n    reset() {\r\n        this.currentTime = 0;\r\n        this.currentIndex = 0;\r\n    }\r\n}\r\n\n\n//# sourceURL=webpack:///D:/GitHub/Akila/time/Timeline.js?");

/***/ }),

/***/ "../../../Akila/webgl/Display.js":
/*!****************************************!*\
  !*** D:/GitHub/Akila/webgl/Display.js ***!
  \****************************************/
/*! exports provided: Display */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, \"Display\", function() { return Display; });\nclass Display {\r\n  constructor(width = 300, height = 300, option = {webGLVersion: 1}) {\r\n    if(Display.ctx) throw `Display est un singleton -> qu'un seul canevas à la fois.`;\r\n\r\n    this.canvas = document.createElement('canvas');\r\n\r\n    this.canvas.id = \"webgl-canvas\";\r\n\r\n    this.conteneur = document.getElementById('webgl-screen');\r\n    if (!this.conteneur) throw `Impossible de créer le canevas, il faut ajouter une balise avec l'id \"webgl-screen\"`;\r\n\r\n    this.conteneur.appendChild(this.canvas);\r\n\r\n    this.ctx = this.canvas.getContext(option.webGLVersion == 2 ? \"webgl2\" : \"webgl\");\r\n    if (!this.ctx) this.ctx = this.canvas.getContext(\"experimental-webgl\");\r\n    if (!this.ctx) throw \"Impossible de d'initialiser le contexte WebGL\";\r\n\r\n    this.loadExtensions();\r\n\r\n    this.use();\r\n\r\n    this.setSize(width, height);\r\n\r\n    this.ctx.enable(this.ctx.DEPTH_TEST);\r\n    this.setClearColor(Math.random(), Math.random(), Math.random(), 1.0);\r\n\r\n    this.ctx.enable(this.ctx.BLEND);\r\n    this.ctx.enable(this.ctx.SAMPLE_ALPHA_TO_COVERAGE);\r\n    this.defaultBlendFunc();\r\n\r\n    this.ctx.enable(this.ctx.CULL_FACE);\r\n  \tthis.ctx.frontFace(this.ctx.CCW);\r\n  \tthis.ctx.cullFace(this.ctx.BACK);\r\n\r\n    this.clear();\r\n  }\r\n\r\n  loadExtensions() {\r\n    this.exts = {\r\n      WEBGL_depth_texture: this.ctx.getExtension('WEBGL_depth_texture')\r\n    }\r\n  }\r\n\r\n  getDiv(){\r\n    return this.conteneur;\r\n  }\r\n\r\n  setSize(w, h){\r\n    this.canvas.width = w;\r\n    this.canvas.height = h;\r\n    this.ctx.viewport(0, 0, w, h);\r\n  }\r\n\r\n  getWidth(){\r\n    return this.canvas.width;\r\n  }\r\n\r\n  getHeight(){\r\n    return this.canvas.height;\r\n  }\r\n\r\n  setClearColor(r, g, b, a){\r\n    this.ctx.clearColor(r, g, b, a);\r\n  }\r\n\r\n  clear(){\r\n    this.ctx.clear(this.ctx.COLOR_BUFFER_BIT | this.ctx.DEPTH_BUFFER_BIT);\r\n  }\r\n\r\n  clearColor(){\r\n    this.ctx.clear(this.ctx.COLOR_BUFFER_BIT);\r\n  }\r\n\r\n  clearDepth(){\r\n    this.ctx.clear(this.ctx.DEPTH_BUFFER_BIT);\r\n  }\r\n\r\n  getCtx(){\r\n    return this.ctx;\r\n  }\r\n\r\n  use(){\r\n    Display.ctx = this.getCtx();\r\n  }\r\n\r\n  useDefaultFrameBuffer(){\r\n    this.ctx.bindFramebuffer(this.ctx.FRAMEBUFFER, null);\r\n    this.ctx.bindRenderbuffer(this.ctx.RENDERBUFFER, null);\r\n    this.ctx.viewport(0, 0, this.getWidth(), this.getHeight());\r\n  }\r\n\r\n  enable(val){\r\n    this.ctx.enable(this.ctx[val]);\r\n  }\r\n\r\n  disable(val){\r\n    this.ctx.disable(this.ctx[val]);\r\n  }\r\n\r\n  blendFunc(sfactor, dfactor) {\r\n    this.ctx.blendFunc(this.ctx[sfactor], this.ctx[dfactor]);\r\n  }\r\n\r\n  defaultBlendFunc() {\r\n    this.ctx.blendFunc(this.ctx.SRC_ALPHA, this.ctx.ONE_MINUS_SRC_ALPHA);\r\n  }\r\n\r\n  blendFuncSeparate(srcRGB, dstRGB, srcAlpha, dstAlpha) {\r\n    this.ctx.blendFuncSeparate(this.ctx[srcRGB], this.ctx[dstRGB], this.ctx[srcAlpha], this.ctx[dstAlpha]);\r\n  }\r\n\r\n  getCanvas(){\r\n    return this.canvas;\r\n  }\r\n}\r\n\r\nDisplay.ctx = null;\r\n\r\nDisplay.BLEND = \"BLEND\";\r\nDisplay.CULL_FACE = \"CULL_FACE\";\r\nDisplay.DEPTH_TEST = \"DEPTH_TEST\";\r\nDisplay.DITHER = \"DITHER\";\r\nDisplay.POLYGON_OFFSET_FILL = \"POLYGON_OFFSET_FILL\";\r\nDisplay.SAMPLE_ALPHA_TO_COVERAGE = \"SAMPLE_ALPHA_TO_COVERAGE\";\r\nDisplay.SAMPLE_COVERAGE = \"SAMPLE_COVERAGE\";\r\nDisplay.SCISSOR_TEST = \"SCISSOR_TEST\";\r\nDisplay.STENCIL_TEST = \"STENCIL_TEST\";\r\n\r\n/**\r\n * Multiplies all colors by 0.\r\n */\r\nDisplay.ZERO = \"ZERO\";\r\n\r\n/**\r\n * Multiplies all colors by 1.\r\n */\r\nDisplay.ONE\t= \"ONE\";\r\n\r\n/**\r\n * Multiplies all colors by the source colors.\r\n */\r\nDisplay.SRC_COLOR\t= \"SRC_COLOR\";\r\n\r\n/**\r\n * Multiplies all colors by 1 minus each source color.\r\n */\r\nDisplay.ONE_MINUS_SRC_COLOR = \"ONE_MINUS_SRC_COLOR\";\r\n\r\n/**\r\n * Multiplies all colors by the destination color.\r\n */\r\nDisplay.DST_COLOR\t=\t\"DST_COLOR\";\r\n\r\n/**\r\n * Multiplies all colors by 1 minus each destination color.\r\n */\r\nDisplay.ONE_MINUS_DST_COLOR\t= \"ONE_MINUS_DST_COLOR\";\r\n\r\n/**\r\n * Multiplies all colors by the source alpha value.\r\n */\r\nDisplay.SRC_ALPHA\t= \"SRC_ALPHA\";\r\n\r\n/**\r\n * Multiplies all colors by 1 minus the source alpha value.\r\n */\r\nDisplay.ONE_MINUS_SRC_ALPHA\t= \"ONE_MINUS_SRC_ALPHA\";\r\n\r\n/**\r\n * Multiplies all colors by the destination alpha value.\r\n */\r\nDisplay.DST_ALPHA\t= \"DST_ALPHA\";\r\n\r\n/**\r\n * Multiplies all colors by 1 minus the destination alpha value.\r\n */\r\nDisplay.ONE_MINUS_DST_ALPHA\t= \"ONE_MINUS_DST_ALPHA\";\r\n\r\n/**\r\n * Multiplies all colors by a constant color.\r\n */\r\nDisplay.CONSTANT_COLOR = \"CONSTANT_COLOR\";\r\n\r\n/**\r\n * Multiplies all colors by 1 minus a constant color.\r\n */\r\nDisplay.ONE_MINUS_CONSTANT_COLOR = \"ONE_MINUS_CONSTANT_COLOR\";\r\n\r\n/**\r\n * Multiplies all colors by a constant alpha value.\r\n */\r\nDisplay.CONSTANT_ALPHA = \"CONSTANT_ALPHA\";\r\n\r\n/**\r\n * Multiplies all colors by 1 minus a constant alpha value.\r\n */\r\nDisplay.ONE_MINUS_CONSTANT_ALPHA = \"ONE_MINUS_CONSTANT_ALPHA\";\r\n\r\n/**\r\n * Multiplies the RGB colors by the smaller of either the source alpha value or the value of 1 minus the destination alpha value. The alpha value is multiplied by 1.\r\n */\r\nDisplay.SRC_ALPHA_SATURATE = \"SRC_ALPHA_SATURATE\";\r\n\n\n//# sourceURL=webpack:///D:/GitHub/Akila/webgl/Display.js?");

/***/ }),

/***/ "./src/main.js":
/*!*********************!*\
  !*** ./src/main.js ***!
  \*********************/
/*! no exports provided */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
eval("__webpack_require__.r(__webpack_exports__);\n/* harmony import */ var Akila_time__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! Akila/time */ \"../../../Akila/time.js\");\n/* harmony import */ var Akila_inputs__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! Akila/inputs */ \"../../../Akila/inputs.js\");\n/* harmony import */ var Akila_collision__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! Akila/collision */ \"../../../Akila/collision.js\");\n\n\n\n\nconst canvas = document.getElementById('canvas');\nconst ctx = canvas.getContext('2d');\nconst W = canvas.width = 600;\nconst H = canvas.height = 600;\nconst S = 18;\n\nconst time = new Akila_time__WEBPACK_IMPORTED_MODULE_0__[\"Time\"]();\nconst mouse = new Akila_inputs__WEBPACK_IMPORTED_MODULE_1__[\"Mouse\"]();\nmouse.setDOMElementReference(canvas);\nconst field = new Akila_collision__WEBPACK_IMPORTED_MODULE_2__[\"BroadField2d\"]();\n\n\nconst currentPoint = {\n    x: W / 2,\n    y: H / 2\n}\n\ntime.onDraw(() => {\n    ctx.fillStyle = '#000';\n    ctx.fillRect(0, 0, W, H);\n\n    field.clearAll();\n    if(mouse.isPressed(Akila_inputs__WEBPACK_IMPORTED_MODULE_1__[\"Mouse\"].LEFT_BUTTON)) {\n        currentPoint.x = mouse.posX();\n        currentPoint.y = mouse.posY();\n    }\n\n    Akila_collision__WEBPACK_IMPORTED_MODULE_2__[\"RayRaster2d\"].addToField(currentPoint.x / S, currentPoint.y / S, mouse.posX() / S, mouse.posY() / S, field, true);\n\n    for(let x = 0; x < W / S; ++x) {\n        for(let y = 0; y < H / S; ++y) {\n            const c = field.query(x, y);\n            if(c.size != 0) ctx.fillStyle = '#fff';\n            else ctx.fillStyle = '#000';\n\n            ctx.fillRect(x * S, y * S, S, S);\n        }\n    }\n\n    ctx.strokeStyle = '#f00';\n    ctx.beginPath();\n    ctx.moveTo(currentPoint.x, currentPoint.y);\n    ctx.lineTo(mouse.posX(), mouse.posY());\n    ctx.stroke();\n});\n\ntime.start();\n\n\n//# sourceURL=webpack:///./src/main.js?");

/***/ })

/******/ });