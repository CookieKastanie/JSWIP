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

/***/ "./src/Cup.js":
/*!********************!*\
  !*** ./src/Cup.js ***!
  \********************/
/*! exports provided: Cup */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, \"Cup\", function() { return Cup; });\n/* harmony import */ var _Dice__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./Dice */ \"./src/Dice.js\");\n\r\n\r\nclass Cup {\r\n    constructor(numberOfDice = 5) {\r\n        this.currentDices = new Array();\r\n        for(let i = 0; i < numberOfDice; ++i) this.currentDices.push(new _Dice__WEBPACK_IMPORTED_MODULE_0__[\"Dice\"]());\r\n\r\n        this.outDices = new Array();\r\n    }\r\n\r\n    shake() {\r\n        for(const dice of this.currentDices) dice.roll();\r\n    }\r\n\r\n    getDices() {\r\n        return this.currentDices;\r\n    }\r\n\r\n    count(value, paco = true) {\r\n        let total = 0;\r\n\r\n        for(const dice of this.currentDices)\r\n            if(dice.getValue() == value || (paco && dice.getValue() == 1)) ++total;\r\n\r\n        return total;\r\n    }\r\n\r\n    lostOne() {\r\n        if(this.currentDices.length > 0) {\r\n            const dice = this.currentDices.pop();\r\n            this.outDices.push(dice);\r\n        }\r\n    }\r\n\r\n    gainOne() {\r\n        if(this.outDices.length > 0) {\r\n            const dice = this.outDices.pop();\r\n            this.currentDices.push(dice);\r\n        }\r\n    }\r\n}\r\n\n\n//# sourceURL=webpack:///./src/Cup.js?");

/***/ }),

/***/ "./src/Dice.js":
/*!*********************!*\
  !*** ./src/Dice.js ***!
  \*********************/
/*! exports provided: Dice */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, \"Dice\", function() { return Dice; });\nclass Dice {\r\n    constructor() {\r\n        this.roll();\r\n    }\r\n\r\n    roll() {\r\n        this.value = Math.random() * 6 + 1 >> 0;\r\n    }\r\n\r\n    getValue() {\r\n        return this.value;\r\n    }\r\n}\r\n\n\n//# sourceURL=webpack:///./src/Dice.js?");

/***/ }),

/***/ "./src/EndingState.js":
/*!****************************!*\
  !*** ./src/EndingState.js ***!
  \****************************/
/*! exports provided: EndingState */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, \"EndingState\", function() { return EndingState; });\nclass EndingState {\r\n    betAction(player) {\r\n        \r\n    }\r\n\r\n    doubtAction(player) {\r\n\r\n    }\r\n\r\n    calzaAction(player) {\r\n\r\n    }\r\n}\r\n\n\n//# sourceURL=webpack:///./src/EndingState.js?");

/***/ }),

/***/ "./src/Perudo.js":
/*!***********************!*\
  !*** ./src/Perudo.js ***!
  \***********************/
/*! exports provided: Perudo */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, \"Perudo\", function() { return Perudo; });\n/* harmony import */ var _PlayingState__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./PlayingState */ \"./src/PlayingState.js\");\n/* harmony import */ var _EndingState__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./EndingState */ \"./src/EndingState.js\");\n\r\n\r\n\r\nclass Perudo {\r\n    constructor(players) {\r\n        this.players = players;\r\n        this.lastWinner = null;\r\n\r\n        for(const player of players) player.setCurrentGame(this);\r\n    }\r\n\r\n    getplayers() {\r\n        return this.players;\r\n    }\r\n\r\n    start() {\r\n        this.state = new _PlayingState__WEBPACK_IMPORTED_MODULE_0__[\"PlayingState\"](this);\r\n    }\r\n\r\n    betAction(player) {\r\n        this.state.betAction(player);\r\n    }\r\n\r\n    doubtAction(player) {\r\n        this.state.doubtAction(player);\r\n    }\r\n\r\n    calzaAction(player) {\r\n        this.state.calzaAction(player);\r\n    }\r\n}\r\n\n\n//# sourceURL=webpack:///./src/Perudo.js?");

/***/ }),

/***/ "./src/Player.js":
/*!***********************!*\
  !*** ./src/Player.js ***!
  \***********************/
/*! exports provided: Player */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, \"Player\", function() { return Player; });\n/* harmony import */ var _Cup__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./Cup */ \"./src/Cup.js\");\n\r\n\r\nclass Player {\r\n    constructor(name) {\r\n        this.name = name;\r\n        this.cup = new _Cup__WEBPACK_IMPORTED_MODULE_0__[\"Cup\"]();\r\n        this.bet = null;\r\n    }\r\n\r\n    setCurrentGame(perudo) {\r\n        this.perudo = perudo;\r\n    }\r\n\r\n    bet(bet) {\r\n        this.bet = bet;\r\n        this.perudo.betAction(this);\r\n    }\r\n\r\n    doubt() {\r\n        this.perudo.doubtAction(this);\r\n    }\r\n\r\n    calza() {\r\n        this.perudo.calzaAction(this);\r\n    }\r\n\r\n    getBet() {\r\n        return this.bet;\r\n    }\r\n\r\n    getCup() {\r\n        return this.cup;\r\n    }\r\n\r\n    lostOneDice() {\r\n        this.cup.lostOne();\r\n    }\r\n\r\n    gainOneDice() {\r\n        this.cup.gainOne();\r\n    }\r\n\r\n    haveLost() {\r\n        return this.cup.getDices().length <= 0;\r\n    }\r\n}\r\n\n\n//# sourceURL=webpack:///./src/Player.js?");

/***/ }),

/***/ "./src/PlayingState.js":
/*!*****************************!*\
  !*** ./src/PlayingState.js ***!
  \*****************************/
/*! exports provided: PlayingState */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, \"PlayingState\", function() { return PlayingState; });\nclass PlayingState {\r\n    constructor(perudo) {\r\n        this.perudo = perudo;\r\n        this.lastBet = null;\r\n\r\n        \r\n    }\r\n\r\n    betAction(player) {\r\n        \r\n    }\r\n\r\n    doubtAction(player) {\r\n\r\n    }\r\n\r\n    calzaAction(player) {\r\n\r\n    }\r\n}\r\n\n\n//# sourceURL=webpack:///./src/PlayingState.js?");

/***/ }),

/***/ "./src/main.js":
/*!*********************!*\
  !*** ./src/main.js ***!
  \*********************/
/*! no exports provided */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
eval("__webpack_require__.r(__webpack_exports__);\n/* harmony import */ var _Perudo__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./Perudo */ \"./src/Perudo.js\");\n/* harmony import */ var _Player__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./Player */ \"./src/Player.js\");\n\r\n\r\n\r\nconst players = [new _Player__WEBPACK_IMPORTED_MODULE_1__[\"Player\"]('p1'), new _Player__WEBPACK_IMPORTED_MODULE_1__[\"Player\"]('p2'), new _Player__WEBPACK_IMPORTED_MODULE_1__[\"Player\"]('p3')]\r\n\r\nlet perudo = new _Perudo__WEBPACK_IMPORTED_MODULE_0__[\"Perudo\"](players);\r\n\r\nconsole.log(perudo);\r\n\n\n//# sourceURL=webpack:///./src/main.js?");

/***/ })

/******/ });