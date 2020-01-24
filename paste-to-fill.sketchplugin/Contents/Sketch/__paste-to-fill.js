var globalThis = this;
var global = this;
function __skpm_run (key, context) {
  globalThis.context = context;
  try {

var exports =
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
/******/ 	return __webpack_require__(__webpack_require__.s = "./src/paste-to-fill.js");
/******/ })
/************************************************************************/
/******/ ({

/***/ "./src/paste-to-fill.js":
/*!******************************!*\
  !*** ./src/paste-to-fill.js ***!
  \******************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
function initImageData(image) {
  if (MSImageData.alloc().initWithImage_convertColorSpace !== undefined) {
    return MSImageData.alloc().initWithImage_convertColorSpace(image, false);
  }

  return MSImageData.alloc().initWithImage(image);
}

function fillObject(image, selectedLayers, layersCount) {
  for (var i = 0; i < layersCount; i += 1) {
    var layer = selectedLayers[i];
    var fill = layer.style().fills().firstObject(); // https://developer.sketch.com/reference/api/#stylefilltype
    // https://github.com/sketch-hq/SketchAPI/blob/develop/Source/dom/style/Fill.js#L9

    fill.setFillType(4);
    fill.setImage(initImageData(image)); // https://developer.sketch.com/reference/api/#stylepatternfilltype
    // https://github.com/sketch-hq/SketchAPI/blob/develop/Source/dom/style/Fill.js#L25

    fill.setPatternFillType(1);
  }
}

/* harmony default export */ __webpack_exports__["default"] = (function (context) {
  var doc = context.document;
  var pasteBoard = NSPasteboard.generalPasteboard(); //copy file url from Finder

  var fileURL = pasteBoard.stringForType(NSPasteboardTypeFileURL); // copy image via Chrome

  var imgData = pasteBoard.dataForType(NSPasteboardTypePNG); // copy image via Safari

  var imgTiffData = pasteBoard.dataForType(NSPasteboardTypeTIFF);
  var selectedLayers = context.selection;
  var layersCount = selectedLayers.count();

  if (layersCount === 0) {
    doc.showMessage('please select a layer:)');
    return;
  }

  if (fileURL) {
    var image = NSImage.alloc().initWithContentsOfURL(NSURL.URLWithString(fileURL));
    fillObject(image, selectedLayers, layersCount);
    return;
  }

  if (imgData) {
    fillObject(NSImage.alloc().initWithData(imgData), selectedLayers, layersCount);
    return;
  }

  if (imgTiffData) {
    fillObject(NSImage.alloc().initWithData(imgTiffData), selectedLayers, layersCount);
  }
});

/***/ })

/******/ });
    if (key === 'default' && typeof exports === 'function') {
      exports(context);
    } else if (typeof exports[key] !== 'function') {
      throw new Error('Missing export named "' + key + '". Your command should contain something like `export function " + key +"() {}`.');
    } else {
      exports[key](context);
    }
  } catch (err) {
    if (typeof process !== 'undefined' && process.listenerCount && process.listenerCount('uncaughtException')) {
      process.emit("uncaughtException", err, "uncaughtException");
    } else {
      throw err
    }
  }
}
globalThis['onRun'] = __skpm_run.bind(this, 'default')

//# sourceMappingURL=__paste-to-fill.js.map