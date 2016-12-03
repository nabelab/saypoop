/******/ (function(modules) { // webpackBootstrap
/******/ 	// The module cache
/******/ 	var installedModules = {};
/******/
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/
/******/ 		// Check if module is in cache
/******/ 		if(installedModules[moduleId])
/******/ 			return installedModules[moduleId].exports;
/******/
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
/******/ 	// identity function for calling harmory imports with the correct context
/******/ 	__webpack_require__.i = function(value) { return value; };
/******/
/******/ 	// define getter function for harmory exports
/******/ 	__webpack_require__.d = function(exports, name, getter) {
/******/ 		Object.defineProperty(exports, name, {
/******/ 			configurable: false,
/******/ 			enumerable: true,
/******/ 			get: getter
/******/ 		});
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
/******/ 	// Load entry module and return exports
/******/ 	return __webpack_require__(__webpack_require__.s = 2);
/******/ })
/************************************************************************/
/******/ ([
/* 0 */
/***/ function(module, exports, __webpack_require__) {

/* Riot v3.0.1, @license MIT */
(function (global, factory) {
   true ? factory(exports) :
  typeof define === 'function' && define.amd ? define(['exports'], factory) :
  (factory((global.riot = global.riot || {})));
}(this, (function (exports) { 'use strict';

var __TAGS_CACHE = [];
var __TAG_IMPL = {};
var GLOBAL_MIXIN = '__global_mixin';
var RIOT_PREFIX = 'riot-';
var RIOT_TAG_IS = 'data-is';
var T_STRING = 'string';
var T_OBJECT = 'object';
var T_UNDEF  = 'undefined';
var T_FUNCTION = 'function';
var XLINK_NS = 'http://www.w3.org/1999/xlink';
var XLINK_REGEX = /^xlink:(\w+)/;
var WIN = typeof window === T_UNDEF ? undefined : window;
var RE_SPECIAL_TAGS = /^(?:t(?:body|head|foot|[rhd])|caption|col(?:group)?|opt(?:ion|group))$/;
var RE_SPECIAL_TAGS_NO_OPTION = /^(?:t(?:body|head|foot|[rhd])|caption|col(?:group)?)$/;
var RE_RESERVED_NAMES = /^(?:_(?:item|id|parent)|update|root|(?:un)?mount|mixin|is(?:Mounted|Loop)|tags|refs|parent|opts|trigger|o(?:n|ff|ne))$/;
var RE_SVG_TAGS = /^(altGlyph|animate(?:Color)?|circle|clipPath|defs|ellipse|fe(?:Blend|ColorMatrix|ComponentTransfer|Composite|ConvolveMatrix|DiffuseLighting|DisplacementMap|Flood|GaussianBlur|Image|Merge|Morphology|Offset|SpecularLighting|Tile|Turbulence)|filter|font|foreignObject|g(?:lyph)?(?:Ref)?|image|line(?:arGradient)?|ma(?:rker|sk)|missing-glyph|path|pattern|poly(?:gon|line)|radialGradient|rect|stop|svg|switch|symbol|text(?:Path)?|tref|tspan|use)$/;
var RE_HTML_ATTRS = /([-\w]+) ?= ?(?:"([^"]*)|'([^']*)|({[^}]*}))/g;
var RE_BOOL_ATTRS = /^(?:disabled|checked|readonly|required|allowfullscreen|auto(?:focus|play)|compact|controls|default|formnovalidate|hidden|ismap|itemscope|loop|multiple|muted|no(?:resize|shade|validate|wrap)?|open|reversed|seamless|selected|sortable|truespeed|typemustmatch)$/;
var IE_VERSION = (WIN && WIN.document || {}).documentMode | 0;

/**
 * Check whether a DOM node must be considered a part of an svg document
 * @param   { String } name -
 * @returns { Boolean } -
 */
function isSVGTag(name) {
  return RE_SVG_TAGS.test(name)
}

/**
 * Check Check if the passed argument is undefined
 * @param   { String } value -
 * @returns { Boolean } -
 */
function isBoolAttr(value) {
  return RE_BOOL_ATTRS.test(value)
}

/**
 * Check if passed argument is a function
 * @param   { * } value -
 * @returns { Boolean } -
 */
function isFunction(value) {
  return typeof value === T_FUNCTION || false // avoid IE problems
}

/**
 * Check if passed argument is an object, exclude null
 * NOTE: use isObject(x) && !isArray(x) to excludes arrays.
 * @param   { * } value -
 * @returns { Boolean } -
 */
function isObject(value) {
  return value && typeof value === T_OBJECT // typeof null is 'object'
}

/**
 * Check if passed argument is undefined
 * @param   { * } value -
 * @returns { Boolean } -
 */
function isUndefined(value) {
  return typeof value === T_UNDEF
}

/**
 * Check if passed argument is a string
 * @param   { * } value -
 * @returns { Boolean } -
 */
function isString(value) {
  return typeof value === T_STRING
}

/**
 * Check if passed argument is empty. Different from falsy, because we dont consider 0 or false to be blank
 * @param { * } value -
 * @returns { Boolean } -
 */
function isBlank(value) {
  return isUndefined(value) || value === null || value === ''
}

/**
 * Check if passed argument is a kind of array
 * @param   { * } value -
 * @returns { Boolean } -
 */
function isArray(value) {
  return Array.isArray(value) || value instanceof Array
}

/**
 * Check whether object's property could be overridden
 * @param   { Object }  obj - source object
 * @param   { String }  key - object property
 * @returns { Boolean } -
 */
function isWritable(obj, key) {
  var descriptor = Object.getOwnPropertyDescriptor(obj, key);
  return isUndefined(obj[key]) || descriptor && descriptor.writable
}

/**
 * Check if passed argument is a reserved name
 * @param   { String } value -
 * @returns { Boolean } -
 */
function isReservedName(value) {
  return RE_RESERVED_NAMES.test(value)
}

var check = Object.freeze({
	isSVGTag: isSVGTag,
	isBoolAttr: isBoolAttr,
	isFunction: isFunction,
	isObject: isObject,
	isUndefined: isUndefined,
	isString: isString,
	isBlank: isBlank,
	isArray: isArray,
	isWritable: isWritable,
	isReservedName: isReservedName
});

/**
 * Shorter and fast way to select multiple nodes in the DOM
 * @param   { String } selector - DOM selector
 * @param   { Object } ctx - DOM node where the targets of our search will is located
 * @returns { Object } dom nodes found
 */
function $$(selector, ctx) {
  return (ctx || document).querySelectorAll(selector)
}

/**
 * Shorter and fast way to select a single node in the DOM
 * @param   { String } selector - unique dom selector
 * @param   { Object } ctx - DOM node where the target of our search will is located
 * @returns { Object } dom node found
 */
function $(selector, ctx) {
  return (ctx || document).querySelector(selector)
}

/**
 * Create a document fragment
 * @returns { Object } document fragment
 */
function createFrag() {
  return document.createDocumentFragment()
}

/**
 * Create a document text node
 * @returns { Object } create a text node to use as placeholder
 */
function createDOMPlaceholder() {
  return document.createTextNode('')
}

/**
 * Create a generic DOM node
 * @param   { String } name - name of the DOM node we want to create
 * @param   { Boolean } isSvg - should we use a SVG as parent node?
 * @returns { Object } DOM node just created
 */
function mkEl(name, isSvg) {
  return isSvg ?
    document.createElementNS('http://www.w3.org/2000/svg', 'svg') :
    document.createElement(name)
}

/**
 * Get the outer html of any DOM node SVGs included
 * @param   { Object } el - DOM node to parse
 * @returns { String } el.outerHTML
 */
function getOuterHTML(el) {
  if (el.outerHTML)
    { return el.outerHTML }
  // some browsers do not support outerHTML on the SVGs tags
  else {
    var container = mkEl('div');
    container.appendChild(el.cloneNode(true));
    return container.innerHTML
  }
}

/**
 * Set the inner html of any DOM node SVGs included
 * @param { Object } container - DOM node where we'll inject new html
 * @param { String } html - html to inject
 */
function setInnerHTML(container, html) {
  if (!isUndefined(container.innerHTML))
    { container.innerHTML = html; }
    // some browsers do not support innerHTML on the SVGs tags
  else {
    var doc = new DOMParser().parseFromString(html, 'application/xml');
    var node = container.ownerDocument.importNode(doc.documentElement, true);
    container.appendChild(node);
  }
}

/**
 * Remove any DOM attribute from a node
 * @param   { Object } dom - DOM node we want to update
 * @param   { String } name - name of the property we want to remove
 */
function remAttr(dom, name) {
  dom.removeAttribute(name);
}

/**
 * Get the value of any DOM attribute on a node
 * @param   { Object } dom - DOM node we want to parse
 * @param   { String } name - name of the attribute we want to get
 * @returns { String | undefined } name of the node attribute whether it exists
 */
function getAttr(dom, name) {
  return dom.getAttribute(name)
}

/**
 * Set any DOM attribute
 * @param { Object } dom - DOM node we want to update
 * @param { String } name - name of the property we want to set
 * @param { String } val - value of the property we want to set
 */
function setAttr(dom, name, val) {
  var xlink = XLINK_REGEX.exec(name);
  if (xlink && xlink[1])
    { dom.setAttributeNS(XLINK_NS, xlink[1], val); }
  else
    { dom.setAttribute(name, val); }
}

/**
 * Insert safely a tag to fix #1962 #1649
 * @param   { HTMLElement } root - children container
 * @param   { HTMLElement } curr - node to insert
 * @param   { HTMLElement } next - node that should preceed the current node inserted
 */
function safeInsert(root, curr, next) {
  root.insertBefore(curr, next.parentNode && next);
}

/**
 * Minimize risk: only zero or one _space_ between attr & value
 * @param   { String }   html - html string we want to parse
 * @param   { Function } fn - callback function to apply on any attribute found
 */
function walkAttrs(html, fn) {
  if (!html)
    { return }
  var m;
  while (m = RE_HTML_ATTRS.exec(html))
    { fn(m[1].toLowerCase(), m[2] || m[3] || m[4]); }
}

/**
 * Walk down recursively all the children tags starting dom node
 * @param   { Object }   dom - starting node where we will start the recursion
 * @param   { Function } fn - callback to transform the child node just found
 * @param   { Object }   context - fn can optionally return an object, which is passed to children
 */
function walkNodes(dom, fn, context) {
  if (dom) {
    var res = fn(dom, context);
    var next;
    // stop the recursion
    if (res === false) { return }

    dom = dom.firstChild;

    while (dom) {
      next = dom.nextSibling;
      walkNodes(dom, fn, res);
      dom = next;
    }
  }
}

var dom = Object.freeze({
	$$: $$,
	$: $,
	createFrag: createFrag,
	createDOMPlaceholder: createDOMPlaceholder,
	mkEl: mkEl,
	getOuterHTML: getOuterHTML,
	setInnerHTML: setInnerHTML,
	remAttr: remAttr,
	getAttr: getAttr,
	setAttr: setAttr,
	safeInsert: safeInsert,
	walkAttrs: walkAttrs,
	walkNodes: walkNodes
});

var styleNode;
var cssTextProp;
var byName = {};
var remainder = [];

// skip the following code on the server
if (WIN) {
  styleNode = (function () {
    // create a new style element with the correct type
    var newNode = mkEl('style');
    setAttr(newNode, 'type', 'text/css');

    // replace any user node or insert the new one into the head
    var userNode = $('style[type=riot]');
    if (userNode) {
      if (userNode.id) { newNode.id = userNode.id; }
      userNode.parentNode.replaceChild(newNode, userNode);
    }
    else { document.getElementsByTagName('head')[0].appendChild(newNode); }

    return newNode
  })();
  cssTextProp = styleNode.styleSheet;
}

/**
 * Object that will be used to inject and manage the css of every tag instance
 */
var styleManager = {
  styleNode: styleNode,
  /**
   * Save a tag style to be later injected into DOM
   * @param { String } css - css string
   * @param { String } name - if it's passed we will map the css to a tagname
   */
  add: function add(css, name) {
    if (name) { byName[name] = css; }
    else { remainder.push(css); }
  },
  /**
   * Inject all previously saved tag styles into DOM
   * innerHTML seems slow: http://jsperf.com/riot-insert-style
   */
  inject: function inject() {
    if (!WIN) { return }
    var style = Object.keys(byName)
      .map(function(k) { return byName[k] })
      .concat(remainder).join('\n');
    if (cssTextProp) { cssTextProp.cssText = style; }
    else { styleNode.innerHTML = style; }
  }
};

/**
 * The riot template engine
 * @version v3.0.0
 */
/**
 * riot.util.brackets
 *
 * - `brackets    ` - Returns a string or regex based on its parameter
 * - `brackets.set` - Change the current riot brackets
 *
 * @module
 */

/* global riot */

var brackets = (function (UNDEF) {

  var
    REGLOB = 'g',

    R_MLCOMMS = /\/\*[^*]*\*+(?:[^*\/][^*]*\*+)*\//g,

    R_STRINGS = /"[^"\\]*(?:\\[\S\s][^"\\]*)*"|'[^'\\]*(?:\\[\S\s][^'\\]*)*'/g,

    S_QBLOCKS = R_STRINGS.source + '|' +
      /(?:\breturn\s+|(?:[$\w\)\]]|\+\+|--)\s*(\/)(?![*\/]))/.source + '|' +
      /\/(?=[^*\/])[^[\/\\]*(?:(?:\[(?:\\.|[^\]\\]*)*\]|\\.)[^[\/\\]*)*?(\/)[gim]*/.source,

    UNSUPPORTED = RegExp('[\\' + 'x00-\\x1F<>a-zA-Z0-9\'",;\\\\]'),

    NEED_ESCAPE = /(?=[[\]()*+?.^$|])/g,

    FINDBRACES = {
      '(': RegExp('([()])|'   + S_QBLOCKS, REGLOB),
      '[': RegExp('([[\\]])|' + S_QBLOCKS, REGLOB),
      '{': RegExp('([{}])|'   + S_QBLOCKS, REGLOB)
    },

    DEFAULT = '{ }';

  var _pairs = [
    '{', '}',
    '{', '}',
    /{[^}]*}/,
    /\\([{}])/g,
    /\\({)|{/g,
    RegExp('\\\\(})|([[({])|(})|' + S_QBLOCKS, REGLOB),
    DEFAULT,
    /^\s*{\^?\s*([$\w]+)(?:\s*,\s*(\S+))?\s+in\s+(\S.*)\s*}/,
    /(^|[^\\]){=[\S\s]*?}/
  ];

  var
    cachedBrackets = UNDEF,
    _regex,
    _cache = [],
    _settings;

  function _loopback (re) { return re }

  function _rewrite (re, bp) {
    if (!bp) { bp = _cache; }
    return new RegExp(
      re.source.replace(/{/g, bp[2]).replace(/}/g, bp[3]), re.global ? REGLOB : ''
    )
  }

  function _create (pair) {
    if (pair === DEFAULT) { return _pairs }

    var arr = pair.split(' ');

    if (arr.length !== 2 || UNSUPPORTED.test(pair)) {
      throw new Error('Unsupported brackets "' + pair + '"')
    }
    arr = arr.concat(pair.replace(NEED_ESCAPE, '\\').split(' '));

    arr[4] = _rewrite(arr[1].length > 1 ? /{[\S\s]*?}/ : _pairs[4], arr);
    arr[5] = _rewrite(pair.length > 3 ? /\\({|})/g : _pairs[5], arr);
    arr[6] = _rewrite(_pairs[6], arr);
    arr[7] = RegExp('\\\\(' + arr[3] + ')|([[({])|(' + arr[3] + ')|' + S_QBLOCKS, REGLOB);
    arr[8] = pair;
    return arr
  }

  function _brackets (reOrIdx) {
    return reOrIdx instanceof RegExp ? _regex(reOrIdx) : _cache[reOrIdx]
  }

  _brackets.split = function split (str, tmpl, _bp) {
    // istanbul ignore next: _bp is for the compiler
    if (!_bp) { _bp = _cache; }

    var
      parts = [],
      match,
      isexpr,
      start,
      pos,
      re = _bp[6];

    isexpr = start = re.lastIndex = 0;

    while ((match = re.exec(str))) {

      pos = match.index;

      if (isexpr) {

        if (match[2]) {
          re.lastIndex = skipBraces(str, match[2], re.lastIndex);
          continue
        }
        if (!match[3]) {
          continue
        }
      }

      if (!match[1]) {
        unescapeStr(str.slice(start, pos));
        start = re.lastIndex;
        re = _bp[6 + (isexpr ^= 1)];
        re.lastIndex = start;
      }
    }

    if (str && start < str.length) {
      unescapeStr(str.slice(start));
    }

    return parts

    function unescapeStr (s) {
      if (tmpl || isexpr) {
        parts.push(s && s.replace(_bp[5], '$1'));
      } else {
        parts.push(s);
      }
    }

    function skipBraces (s, ch, ix) {
      var
        match,
        recch = FINDBRACES[ch];

      recch.lastIndex = ix;
      ix = 1;
      while ((match = recch.exec(s))) {
        if (match[1] &&
          !(match[1] === ch ? ++ix : --ix)) { break }
      }
      return ix ? s.length : recch.lastIndex
    }
  };

  _brackets.hasExpr = function hasExpr (str) {
    return _cache[4].test(str)
  };

  _brackets.loopKeys = function loopKeys (expr) {
    var m = expr.match(_cache[9]);

    return m
      ? { key: m[1], pos: m[2], val: _cache[0] + m[3].trim() + _cache[1] }
      : { val: expr.trim() }
  };

  _brackets.array = function array (pair) {
    return pair ? _create(pair) : _cache
  };

  function _reset (pair) {
    if ((pair || (pair = DEFAULT)) !== _cache[8]) {
      _cache = _create(pair);
      _regex = pair === DEFAULT ? _loopback : _rewrite;
      _cache[9] = _regex(_pairs[9]);
    }
    cachedBrackets = pair;
  }

  function _setSettings (o) {
    var b;

    o = o || {};
    b = o.brackets;
    Object.defineProperty(o, 'brackets', {
      set: _reset,
      get: function () { return cachedBrackets },
      enumerable: true
    });
    _settings = o;
    _reset(b);
  }

  Object.defineProperty(_brackets, 'settings', {
    set: _setSettings,
    get: function () { return _settings }
  });

  /* istanbul ignore next: in the browser riot is always in the scope */
  _brackets.settings = typeof riot !== 'undefined' && riot.settings || {};
  _brackets.set = _reset;

  _brackets.R_STRINGS = R_STRINGS;
  _brackets.R_MLCOMMS = R_MLCOMMS;
  _brackets.S_QBLOCKS = S_QBLOCKS;

  return _brackets

})();

/**
 * @module tmpl
 *
 * tmpl          - Root function, returns the template value, render with data
 * tmpl.hasExpr  - Test the existence of a expression inside a string
 * tmpl.loopKeys - Get the keys for an 'each' loop (used by `_each`)
 */

var tmpl = (function () {

  var _cache = {};

  function _tmpl (str, data) {
    if (!str) { return str }

    return (_cache[str] || (_cache[str] = _create(str))).call(data, _logErr)
  }

  _tmpl.hasExpr = brackets.hasExpr;

  _tmpl.loopKeys = brackets.loopKeys;

  // istanbul ignore next
  _tmpl.clearCache = function () { _cache = {}; };

  _tmpl.errorHandler = null;

  function _logErr (err, ctx) {

    err.riotData = {
      tagName: ctx && ctx.root && ctx.root.tagName,
      _riot_id: ctx && ctx._riot_id  //eslint-disable-line camelcase
    };

    if (_tmpl.errorHandler) { _tmpl.errorHandler(err); }

    if (
      typeof console !== 'undefined' &&
      typeof console.error === 'function'
    ) {
      if (err.riotData.tagName) {
        console.error('Riot template error thrown in the <%s> tag', err.riotData.tagName);
      }
      console.error(err);
    }
  }

  function _create (str) {
    var expr = _getTmpl(str);

    if (expr.slice(0, 11) !== 'try{return ') { expr = 'return ' + expr; }

    return new Function('E', expr + ';')    // eslint-disable-line no-new-func
  }

  var
    CH_IDEXPR = String.fromCharCode(0x2057),
    RE_CSNAME = /^(?:(-?[_A-Za-z\xA0-\xFF][-\w\xA0-\xFF]*)|\u2057(\d+)~):/,
    RE_QBLOCK = RegExp(brackets.S_QBLOCKS, 'g'),
    RE_DQUOTE = /\u2057/g,
    RE_QBMARK = /\u2057(\d+)~/g;

  function _getTmpl (str) {
    var
      qstr = [],
      expr,
      parts = brackets.split(str.replace(RE_DQUOTE, '"'), 1);

    if (parts.length > 2 || parts[0]) {
      var i, j, list = [];

      for (i = j = 0; i < parts.length; ++i) {

        expr = parts[i];

        if (expr && (expr = i & 1

            ? _parseExpr(expr, 1, qstr)

            : '"' + expr
                .replace(/\\/g, '\\\\')
                .replace(/\r\n?|\n/g, '\\n')
                .replace(/"/g, '\\"') +
              '"'

          )) { list[j++] = expr; }

      }

      expr = j < 2 ? list[0]
           : '[' + list.join(',') + '].join("")';

    } else {

      expr = _parseExpr(parts[1], 0, qstr);
    }

    if (qstr[0]) {
      expr = expr.replace(RE_QBMARK, function (_, pos) {
        return qstr[pos]
          .replace(/\r/g, '\\r')
          .replace(/\n/g, '\\n')
      });
    }
    return expr
  }

  var
    RE_BREND = {
      '(': /[()]/g,
      '[': /[[\]]/g,
      '{': /[{}]/g
    };

  function _parseExpr (expr, asText, qstr) {

    expr = expr
          .replace(RE_QBLOCK, function (s, div) {
            return s.length > 2 && !div ? CH_IDEXPR + (qstr.push(s) - 1) + '~' : s
          })
          .replace(/\s+/g, ' ').trim()
          .replace(/\ ?([[\({},?\.:])\ ?/g, '$1');

    if (expr) {
      var
        list = [],
        cnt = 0,
        match;

      while (expr &&
            (match = expr.match(RE_CSNAME)) &&
            !match.index
        ) {
        var
          key,
          jsb,
          re = /,|([[{(])|$/g;

        expr = RegExp.rightContext;
        key  = match[2] ? qstr[match[2]].slice(1, -1).trim().replace(/\s+/g, ' ') : match[1];

        while (jsb = (match = re.exec(expr))[1]) { skipBraces(jsb, re); }

        jsb  = expr.slice(0, match.index);
        expr = RegExp.rightContext;

        list[cnt++] = _wrapExpr(jsb, 1, key);
      }

      expr = !cnt ? _wrapExpr(expr, asText)
           : cnt > 1 ? '[' + list.join(',') + '].join(" ").trim()' : list[0];
    }
    return expr

    function skipBraces (ch, re) {
      var
        mm,
        lv = 1,
        ir = RE_BREND[ch];

      ir.lastIndex = re.lastIndex;
      while (mm = ir.exec(expr)) {
        if (mm[0] === ch) { ++lv; }
        else if (!--lv) { break }
      }
      re.lastIndex = lv ? expr.length : ir.lastIndex;
    }
  }

  // istanbul ignore next: not both
  var // eslint-disable-next-line max-len
    JS_CONTEXT = '"in this?this:' + (typeof window !== 'object' ? 'global' : 'window') + ').',
    JS_VARNAME = /[,{][\$\w]+(?=:)|(^ *|[^$\w\.{])(?!(?:typeof|true|false|null|undefined|in|instanceof|is(?:Finite|NaN)|void|NaN|new|Date|RegExp|Math)(?![$\w]))([$_A-Za-z][$\w]*)/g,
    JS_NOPROPS = /^(?=(\.[$\w]+))\1(?:[^.[(]|$)/;

  function _wrapExpr (expr, asText, key) {
    var tb;

    expr = expr.replace(JS_VARNAME, function (match, p, mvar, pos, s) {
      if (mvar) {
        pos = tb ? 0 : pos + match.length;

        if (mvar !== 'this' && mvar !== 'global' && mvar !== 'window') {
          match = p + '("' + mvar + JS_CONTEXT + mvar;
          if (pos) { tb = (s = s[pos]) === '.' || s === '(' || s === '['; }
        } else if (pos) {
          tb = !JS_NOPROPS.test(s.slice(pos));
        }
      }
      return match
    });

    if (tb) {
      expr = 'try{return ' + expr + '}catch(e){E(e,this)}';
    }

    if (key) {

      expr = (tb
          ? 'function(){' + expr + '}.call(this)' : '(' + expr + ')'
        ) + '?"' + key + '":""';

    } else if (asText) {

      expr = 'function(v){' + (tb
          ? expr.replace('return ', 'v=') : 'v=(' + expr + ')'
        ) + ';return v||v===0?v:""}.call(this)';
    }

    return expr
  }

  _tmpl.version = brackets.version = 'v3.0.0';

  return _tmpl

})();

/**
 * Specialized function for looping an array-like collection with `each={}`
 * @param   { Array } list - collection of items
 * @param   {Function} fn - callback function
 * @returns { Array } the array looped
 */
function each(list, fn) {
  var len = list ? list.length : 0;

  for (var i = 0, el; i < len; ++i) {
    el = list[i];
    // return false -> current item was removed by fn during the loop
    if (fn(el, i) === false)
      { i--; }
  }
  return list
}

/**
 * Check whether an array contains an item
 * @param   { Array } array - target array
 * @param   { * } item - item to test
 * @returns { Boolean } -
 */
function contains(array, item) {
  return ~array.indexOf(item)
}

/**
 * Convert a string containing dashes to camel case
 * @param   { String } str - input string
 * @returns { String } my-string -> myString
 */
function toCamel(str) {
  return str.replace(/-(\w)/g, function (_, c) { return c.toUpperCase(); })
}

/**
 * Faster String startsWith alternative
 * @param   { String } str - source string
 * @param   { String } value - test string
 * @returns { Boolean } -
 */
function startsWith(str, value) {
  return str.slice(0, value.length) === value
}

/**
 * Helper function to set an immutable property
 * @param   { Object } el - object where the new property will be set
 * @param   { String } key - object key where the new property will be stored
 * @param   { * } value - value of the new property
 * @param   { Object } options - set the propery overriding the default options
 * @returns { Object } - the initial object
 */
function defineProperty(el, key, value, options) {
  Object.defineProperty(el, key, extend({
    value: value,
    enumerable: false,
    writable: false,
    configurable: true
  }, options));
  return el
}

/**
 * Extend any object with other properties
 * @param   { Object } src - source object
 * @returns { Object } the resulting extended object
 *
 * var obj = { foo: 'baz' }
 * extend(obj, {bar: 'bar', foo: 'bar'})
 * console.log(obj) => {bar: 'bar', foo: 'bar'}
 *
 */
function extend(src) {
  var obj, args = arguments;
  for (var i = 1; i < args.length; ++i) {
    if (obj = args[i]) {
      for (var key in obj) {
        // check if this property of the source object could be overridden
        if (isWritable(src, key))
          { src[key] = obj[key]; }
      }
    }
  }
  return src
}

var misc = Object.freeze({
	each: each,
	contains: contains,
	toCamel: toCamel,
	startsWith: startsWith,
	defineProperty: defineProperty,
	extend: extend
});

var observable = function(el) {

  /**
   * Extend the original object or create a new empty one
   * @type { Object }
   */

  el = el || {};

  /**
   * Private variables
   */
  var callbacks = {},
    slice = Array.prototype.slice;

  /**
   * Public Api
   */

  // extend the el object adding the observable methods
  Object.defineProperties(el, {
    /**
     * Listen to the given `event` ands
     * execute the `callback` each time an event is triggered.
     * @param  { String } event - event id
     * @param  { Function } fn - callback function
     * @returns { Object } el
     */
    on: {
      value: function(event, fn) {
        if (typeof fn == 'function')
          { (callbacks[event] = callbacks[event] || []).push(fn); }
        return el
      },
      enumerable: false,
      writable: false,
      configurable: false
    },

    /**
     * Removes the given `event` listeners
     * @param   { String } event - event id
     * @param   { Function } fn - callback function
     * @returns { Object } el
     */
    off: {
      value: function(event, fn) {
        if (event == '*' && !fn) { callbacks = {}; }
        else {
          if (fn) {
            var arr = callbacks[event];
            for (var i = 0, cb; cb = arr && arr[i]; ++i) {
              if (cb == fn) { arr.splice(i--, 1); }
            }
          } else { delete callbacks[event]; }
        }
        return el
      },
      enumerable: false,
      writable: false,
      configurable: false
    },

    /**
     * Listen to the given `event` and
     * execute the `callback` at most once
     * @param   { String } event - event id
     * @param   { Function } fn - callback function
     * @returns { Object } el
     */
    one: {
      value: function(event, fn) {
        function on() {
          el.off(event, on);
          fn.apply(el, arguments);
        }
        return el.on(event, on)
      },
      enumerable: false,
      writable: false,
      configurable: false
    },

    /**
     * Execute all callback functions that listen to
     * the given `event`
     * @param   { String } event - event id
     * @returns { Object } el
     */
    trigger: {
      value: function(event) {
        var arguments$1 = arguments;


        // getting the arguments
        var arglen = arguments.length - 1,
          args = new Array(arglen),
          fns,
          fn,
          i;

        for (i = 0; i < arglen; i++) {
          args[i] = arguments$1[i + 1]; // skip first argument
        }

        fns = slice.call(callbacks[event] || [], 0);

        for (i = 0; fn = fns[i]; ++i) {
          fn.apply(el, args);
        }

        if (callbacks['*'] && event != '*')
          { el.trigger.apply(el, ['*', event].concat(args)); }

        return el
      },
      enumerable: false,
      writable: false,
      configurable: false
    }
  });

  return el

};

var EVENTS_PREFIX_REGEX = /^on/;

/**
 * Trigger DOM events
 * @param   { HTMLElement } dom - dom element target of the event
 * @param   { Function } handler - user function
 * @param   { Object } e - event object
 */
function handleEvent(dom, handler, e) {
  var ptag = this._parent,
    item = this._item;

  if (!item)
    { while (ptag && !item) {
      item = ptag._item;
      ptag = ptag._parent;
    } }

  // override the event properties
  if (isWritable(e, 'currentTarget')) { e.currentTarget = dom; }
  if (isWritable(e, 'target')) { e.target = e.srcElement; }
  if (isWritable(e, 'which')) { e.which = e.charCode || e.keyCode; }

  e.item = item;

  handler.call(this, e);

  if (!e.preventUpdate) {
    var p = getImmediateCustomParentTag(this);
    // fixes #2083
    if (p.isMounted) { p.update(); }
  }
}

/**
 * Attach an event to a DOM node
 * @param { String } name - event name
 * @param { Function } handler - event callback
 * @param { Object } dom - dom node
 * @param { Tag } tag - tag instance
 */
function setEventHandler(name, handler, dom, tag) {
  var eventName,
    cb = handleEvent.bind(tag, dom, handler);

  if (!dom.addEventListener) {
    dom[name] = cb;
    return
  }

  // avoid to bind twice the same event
  dom[name] = null;

  // normalize event name
  eventName = name.replace(EVENTS_PREFIX_REGEX, '');

  // cache the callback directly on the DOM node
  if (!dom._riotEvents) { dom._riotEvents = {}; }

  if (dom._riotEvents[name])
    { dom.removeEventListener(eventName, dom._riotEvents[name]); }

  dom._riotEvents[name] = cb;
  dom.addEventListener(eventName, cb, false);
}

/**
 * Update dynamically created data-is tags with changing expressions
 * @param { Object } expr - expression tag and expression info
 * @param { Tag } parent - parent for tag creation
 */
function updateDataIs(expr, parent) {
  var tagName = tmpl(expr.value, parent),
    conf;

  if (expr.tag && expr.tagName === tagName) {
    expr.tag.update();
    return
  }

  // sync _parent to accommodate changing tagnames
  if (expr.tag) {
    var delName = expr.value,
      tags = expr.tag._parent.tags;

    setAttr(expr.tag.root, RIOT_TAG_IS, tagName); // update for css
    arrayishRemove(tags, delName, expr.tag);
  }

  expr.impl = __TAG_IMPL[tagName];
  conf = {root: expr.dom, parent: parent, hasImpl: true, tagName: tagName};
  expr.tag = initChildTag(expr.impl, conf, expr.dom.innerHTML, parent);
  expr.tagName = tagName;
  expr.tag.mount();
  expr.tag.update();

  // parent is the placeholder tag, not the dynamic tag so clean up
  parent.on('unmount', function () {
    var delName = expr.tag.opts.dataIs,
      tags = expr.tag.parent.tags,
      _tags = expr.tag._parent.tags;
    arrayishRemove(tags, delName, expr.tag);
    arrayishRemove(_tags, delName, expr.tag);
    expr.tag.unmount();
  });
}

/**
 * Update on single tag expression
 * @this Tag
 * @param { Object } expr - expression logic
 * @returns { undefined }
 */
function updateExpression(expr) {
  var dom = expr.dom,
    attrName = expr.attr,
    value = tmpl(expr.expr, this),
    isValueAttr = attrName === 'riot-value',
    isVirtual = expr.root && expr.root.tagName === 'VIRTUAL',
    parent = dom && (expr.parent || dom.parentNode),
    old;

  if (expr.bool)
    { value = value ? attrName : false; }
  else if (isUndefined(value) || value === null)
    { value = ''; }

  if (expr._riot_id) { // if it's a tag
    if (expr.isMounted) {
      expr.update();

    // if it hasn't been mounted yet, do that now.
    } else {
      expr.mount();

      if (isVirtual) {
        var frag = document.createDocumentFragment();
        makeVirtual.call(expr, frag);
        expr.root.parentElement.replaceChild(frag, expr.root);
      }
    }
    return
  }

  old = expr.value;
  expr.value = value;

  if (expr.update) {
    expr.update();
    return
  }

  if (old === value) { return }
  if (expr.isRtag && value) { return updateDataIs(expr, this) }
  // no change, so nothing more to do
  if (isValueAttr && dom.value === value) { return }

  // textarea and text nodes have no attribute name
  if (!attrName) {
    // about #815 w/o replace: the browser converts the value to a string,
    // the comparison by "==" does too, but not in the server
    value += '';
    // test for parent avoids error with invalid assignment to nodeValue
    if (parent) {
      // cache the parent node because somehow it will become null on IE
      // on the next iteration
      expr.parent = parent;
      if (parent.tagName === 'TEXTAREA') {
        parent.value = value;                    // #1113
        if (!IE_VERSION) { dom.nodeValue = value; }  // #1625 IE throws here, nodeValue
      }                                         // will be available on 'updated'
      else { dom.nodeValue = value; }
    }
    return
  }

  // remove original attribute
  if (!expr.isAttrRemoved || !value) {
    remAttr(dom, attrName);
    expr.isAttrRemoved = true;
  }

  // event handler
  if (isFunction(value)) {
    setEventHandler(attrName, value, dom, this);
  // show / hide
  } else if (/^(show|hide)$/.test(attrName)) {
    if (attrName === 'hide') { value = !value; }
    dom.style.display = value ? '' : 'none';
  // field value
  } else if (isValueAttr) {
    dom.value = value;
  // <img src="{ expr }">
  } else if (startsWith(attrName, RIOT_PREFIX) && attrName !== RIOT_TAG_IS) {
    if (value != null)
      { setAttr(dom, attrName.slice(RIOT_PREFIX.length), value); }
  } else {
    // <select> <option selected={true}> </select>
    if (attrName === 'selected' && parent && /^(SELECT|OPTGROUP)$/.test(parent.tagName) && value != null) {
      parent.value = dom.value;
    } if (expr.bool) {
      dom[attrName] = value;
      if (!value) { return }
    } if (value === 0 || value && typeof value !== T_OBJECT) {
      setAttr(dom, attrName, value);
    }
  }
}

/**
 * Update all the expressions in a Tag instance
 * @this Tag
 * @param { Array } expressions - expression that must be re evaluated
 */
function update$1$1(expressions) {
  each(expressions, updateExpression.bind(this));
}

var IfExpr = {
  init: function init(dom, parentTag, expr) {
    remAttr(dom, 'if');
    this.parentTag = parentTag;
    this.expr = expr;
    this.stub = document.createTextNode('');
    this.pristine = dom;

    var p = dom.parentNode;
    p.insertBefore(this.stub, dom);
    p.removeChild(dom);

    return this
  },
  update: function update$1() {
    var newValue = tmpl(this.expr, this.parentTag);

    if (newValue && !this.current) { // insert
      this.current = this.pristine.cloneNode(true);
      this.stub.parentNode.insertBefore(this.current, this.stub);

      this.expressions = [];
      parseExpressions.apply(this.parentTag, [this.current, this.expressions, true]);
    } else if (!newValue && this.current) { // remove
      unmountAll(this.expressions);
      if (this.current._tag) {
        this.current._tag.unmount();
      } else if (this.current.parentNode)
        { this.current.parentNode.removeChild(this.current); }
      this.current = null;
      this.expressions = [];
    }

    if (newValue) { update$1$1.call(this.parentTag, this.expressions); }
  },
  unmount: function unmount() {
    unmountAll(this.expressions || []);
    delete this.pristine;
    delete this.parentNode;
    delete this.stub;
  }
};

var RefExpr = {
  init: function init(dom, attrName, attrValue, parent) {
    this.dom = dom;
    this.attr = attrName;
    this.rawValue = attrValue;
    this.parent = parent;
    this.hasExp = tmpl.hasExpr(attrValue);
    this.firstRun = true;

    return this
  },
  update: function update() {
    var value = this.rawValue;
    if (this.hasExp)
      { value = tmpl(this.rawValue, this.parent); }

    // if nothing changed, we're done
    if (!this.firstRun && value === this.value) { return }

    var customParent = this.parent && getImmediateCustomParentTag(this.parent);

    // if the referenced element is a custom tag, then we set the tag itself, rather than DOM
    var tagOrDom = this.tag || this.dom;

    // the name changed, so we need to remove it from the old key (if present)
    if (!isBlank(this.value) && customParent)
      { arrayishRemove(customParent.refs, this.value, tagOrDom); }

    if (isBlank(value)) {
      // if the value is blank, we remove it
      remAttr(this.dom, this.attr);
    } else {
      // add it to the refs of parent tag (this behavior was changed >=3.0)
      if (customParent) { arrayishAdd(customParent.refs, value, tagOrDom); }
      // set the actual DOM attr
      setAttr(this.dom, this.attr, value);
    }
    this.value = value;
    this.firstRun = false;
  },
  unmount: function unmount() {
    var tagOrDom = this.tag || this.dom;
    var customParent = this.parent && getImmediateCustomParentTag(this.parent);
    if (!isBlank(this.value) && customParent)
      { arrayishRemove(customParent.refs, this.value, tagOrDom); }
    delete this.dom;
    delete this.parent;
  }
};

/**
 * Convert the item looped into an object used to extend the child tag properties
 * @param   { Object } expr - object containing the keys used to extend the children tags
 * @param   { * } key - value to assign to the new object returned
 * @param   { * } val - value containing the position of the item in the array
 * @param   { Object } base - prototype object for the new item
 * @returns { Object } - new object containing the values of the original item
 *
 * The variables 'key' and 'val' are arbitrary.
 * They depend on the collection type looped (Array, Object)
 * and on the expression used on the each tag
 *
 */
function mkitem(expr, key, val, base) {
  var item = base ? Object.create(base) : {};
  item[expr.key] = key;
  if (expr.pos) { item[expr.pos] = val; }
  return item
}

/**
 * Unmount the redundant tags
 * @param   { Array } items - array containing the current items to loop
 * @param   { Array } tags - array containing all the children tags
 * @param   { String } tagName - key used to identify the type of tag
 * @param   { Object } parent - parent tag to remove the child from
 */
function unmountRedundant(items, tags, tagName, parent) {

  var i = tags.length,
    j = items.length,
    t;

  while (i > j) {
    t = tags[--i];
    tags.splice(i, 1);
    t.unmount();
    arrayishRemove(parent.tags, tagName, t, true);
  }
}

/**
 * Move the nested custom tags in non custom loop tags
 * @this Tag
 * @param   { Number } i - current position of the loop tag
 */
function moveNestedTags(i) {
  var this$1 = this;

  each(Object.keys(this.tags), function (tagName) {
    var tag = this$1.tags[tagName];
    if (isArray(tag))
      { each(tag, function (t) {
        moveChildTag.apply(t, [tagName, i]);
      }); }
    else
      { moveChildTag.apply(tag, [tagName, i]); }
  });
}

/**
 * Move a child tag
 * @this Tag
 * @param   { HTMLElement } root - dom node containing all the loop children
 * @param   { Tag } nextTag - instance of the next tag preceding the one we want to move
 * @param   { Boolean } isVirtual - is it a virtual tag?
 */
function move(root, nextTag, isVirtual) {
  if (isVirtual)
    { moveVirtual.apply(this, [root, nextTag]); }
  else
    { safeInsert(root, this.root, nextTag.root); }
}

/**
 * Insert and mount a child tag
 * @this Tag
 * @param   { HTMLElement } root - dom node containing all the loop children
 * @param   { Tag } nextTag - instance of the next tag preceding the one we want to insert
 * @param   { Boolean } isVirtual - is it a virtual tag?
 */
function insert(root, nextTag, isVirtual) {
  if (isVirtual)
    { makeVirtual.apply(this, [root, nextTag]); }
  else
    { safeInsert(root, this.root, nextTag.root); }
}

/**
 * Append a new tag into the DOM
 * @this Tag
 * @param   { HTMLElement } root - dom node containing all the loop children
 * @param   { Boolean } isVirtual - is it a virtual tag?
 */
function append(root, isVirtual) {
  if (isVirtual)
    { makeVirtual.call(this, root); }
  else
    { root.appendChild(this.root); }
}

/**
 * Manage tags having the 'each'
 * @param   { HTMLElement } dom - DOM node we need to loop
 * @param   { Tag } parent - parent tag instance where the dom node is contained
 * @param   { String } expr - string contained in the 'each' attribute
 * @returns { Object } expression object for this each loop
 */
function _each(dom, parent, expr) {

  // remove the each property from the original tag
  remAttr(dom, 'each');

  var mustReorder = typeof getAttr(dom, 'no-reorder') !== T_STRING || remAttr(dom, 'no-reorder'),
    tagName = getTagName(dom),
    impl = __TAG_IMPL[tagName] || { tmpl: getOuterHTML(dom) },
    useRoot = RE_SPECIAL_TAGS.test(tagName),
    root = dom.parentNode,
    ref = createDOMPlaceholder(),
    child = getTag(dom),
    ifExpr = getAttr(dom, 'if'),
    tags = [],
    oldItems = [],
    hasKeys,
    isLoop = true,
    isAnonymous = !__TAG_IMPL[tagName],
    isVirtual = dom.tagName === 'VIRTUAL';

  // parse the each expression
  expr = tmpl.loopKeys(expr);
  expr.isLoop = true;

  if (ifExpr) { remAttr(dom, 'if'); }

  // insert a marked where the loop tags will be injected
  root.insertBefore(ref, dom);
  root.removeChild(dom);

  expr.update = function updateEach() {

    // get the new items collection
    var items = tmpl(expr.val, parent),
      parentNode,
      frag,
      placeholder;


    root = ref.parentNode;

    if (parentNode) {
      placeholder = createDOMPlaceholder('');
      parentNode.insertBefore(placeholder, root);
      parentNode.removeChild(root);
    } else {
      frag = createFrag();
    }

    // object loop. any changes cause full redraw
    if (!isArray(items)) {
      hasKeys = items || false;
      items = hasKeys ?
        Object.keys(items).map(function (key) {
          return mkitem(expr, items[key], key)
        }) : [];
    } else {
      hasKeys = false;
    }

    if (ifExpr) {
      items = items.filter(function(item, i) {
        if (expr.key) {
          return !!tmpl(ifExpr, mkitem(expr, item, i, parent))
        }
        // in case it's not a keyed loop
        // we test the validity of the if expression against
        // the item and the parent
        return !!tmpl(ifExpr, parent) || !!tmpl(ifExpr, item)
      });
    }

    // loop all the new items
    each(items, function(item, i) {
      // reorder only if the items are objects
      var
        _mustReorder = mustReorder && typeof item === T_OBJECT && !hasKeys,
        oldPos = oldItems.indexOf(item),
        pos = ~oldPos && _mustReorder ? oldPos : i,
        // does a tag exist in this position?
        tag = tags[pos];

      item = !hasKeys && expr.key ? mkitem(expr, item, i) : item;

      // new tag
      if (
        !_mustReorder && !tag // with no-reorder we just update the old tags
        ||
        _mustReorder && !~oldPos // by default we always try to reorder the DOM elements
      ) {

        var mustAppend = i === tags.length;

        tag = new Tag$$1(impl, {
          parent: parent,
          isLoop: isLoop,
          isAnonymous: isAnonymous,
          root: useRoot ? root : dom.cloneNode(),
          item: item
        }, dom.innerHTML);

        // mount the tag
        tag.mount();

        if (mustAppend)
          { append.apply(tag, [frag || root, isVirtual]); }
        else
          { insert.apply(tag, [root, tags[i], isVirtual]); }

        if (!mustAppend) { oldItems.splice(i, 0, item); }
        tags.splice(i, 0, tag);
        if (child) { arrayishAdd(parent.tags, tagName, tag, true); }
        pos = i; // handled here so no move
      } else { tag.update(item); }

      // reorder the tag if it's not located in its previous position
      if (pos !== i && _mustReorder) {
        // #closes 2040
        if (contains(items, oldItems[i])) {
          move.apply(tag, [root, tags[i], isVirtual]);
        }
        // update the position attribute if it exists
        if (expr.pos) { tag[expr.pos] = i; }
        // move the old tag instance
        tags.splice(i, 0, tags.splice(pos, 1)[0]);
        // move the old item
        oldItems.splice(i, 0, oldItems.splice(pos, 1)[0]);
        // if the loop tags are not custom
        // we need to move all their custom tags into the right position
        if (!child && tag.tags) { moveNestedTags.call(tag, i); }
      }

      // cache the original item to use it in the events bound to this node
      // and its children
      tag._item = item;
      // cache the real parent tag internally
      defineProperty(tag, '_parent', parent);
    });

    // remove the redundant tags
    unmountRedundant(items, tags, tagName, parent);

    // clone the items array
    oldItems = items.slice();

    if (frag) {
      root.insertBefore(frag, ref);
    } else {
      parentNode.insertBefore(root, placeholder);
      parentNode.removeChild(placeholder);
    }

  };

  expr.unmount = function() {
    each(tags, function(t) { t.unmount(); });
  };

  return expr
}

/**
 * Walk the tag DOM to detect the expressions to evaluate
 * @this Tag
 * @param   { HTMLElement } root - root tag where we will start digging the expressions
 * @param   { Array } expressions - empty array where the expressions will be added
 * @param   { Boolean } mustIncludeRoot - flag to decide whether the root must be parsed as well
 * @returns { Object } an object containing the root noode and the dom tree
 */
function parseExpressions(root, expressions, mustIncludeRoot) {
  var this$1 = this;

  var tree = {parent: {children: expressions}};

  walkNodes(root, function (dom, ctx) {
    var type = dom.nodeType, parent = ctx.parent, attr, expr, tagImpl;
    if (!mustIncludeRoot && dom === root) { return {parent: parent} }

    // text node
    if (type === 3 && dom.parentNode.tagName !== 'STYLE' && tmpl.hasExpr(dom.nodeValue))
      { parent.children.push({dom: dom, expr: dom.nodeValue}); }

    if (type !== 1) { return ctx } // not an element

    // loop. each does it's own thing (for now)
    if (attr = getAttr(dom, 'each')) {
      parent.children.push(_each(dom, this$1, attr));
      return false
    }

    // if-attrs become the new parent. Any following expressions (either on the current
    // element, or below it) become children of this expression.
    if (attr = getAttr(dom, 'if')) {
      parent.children.push(Object.create(IfExpr).init(dom, this$1, attr));
      return false
    }

    if (expr = getAttr(dom, RIOT_TAG_IS)) {
      if (tmpl.hasExpr(expr)) {
        parent.children.push({isRtag: true, expr: expr, dom: dom});
        return false
      }
    }

    // if this is a tag, stop traversing here.
    // we ignore the root, since parseExpressions is called while we're mounting that root
    tagImpl = getTag(dom);
    if (tagImpl && (dom !== root || mustIncludeRoot)) {
      var conf = {root: dom, parent: this$1, hasImpl: true};
      parent.children.push(initChildTag(tagImpl, conf, dom.innerHTML, this$1));
      return false
    }

    // attribute expressions
    parseAttributes.apply(this$1, [dom, dom.attributes, function(attr, expr) {
      if (!expr) { return }
      parent.children.push(expr);
    }]);

    // whatever the parent is, all child elements get the same parent.
    // If this element had an if-attr, that's the parent for all child elements
    return {parent: parent}
  }, tree);

  return { tree: tree, root: root }
}

/**
 * Calls `fn` for every attribute on an element. If that attr has an expression,
 * it is also passed to fn.
 * @this Tag
 * @param   { HTMLElement } dom - dom node to parse
 * @param   { Array } attrs - array of attributes
 * @param   { Function } fn - callback to exec on any iteration
 */
function parseAttributes(dom, attrs, fn) {
  var this$1 = this;

  each(attrs, function (attr) {
    var name = attr.name, bool = isBoolAttr(name), expr;

    if (~['ref', 'data-ref'].indexOf(name)) {
      expr =  Object.create(RefExpr).init(dom, name, attr.value, this$1);
    } else if (tmpl.hasExpr(attr.value)) {
      expr = {dom: dom, expr: attr.value, attr: attr.name, bool: bool};
    }

    fn(attr, expr);
  });
}

/*
  Includes hacks needed for the Internet Explorer version 9 and below
  See: http://kangax.github.io/compat-table/es5/#ie8
       http://codeplanet.io/dropping-ie8/
*/

var reHasYield  = /<yield\b/i;
var reYieldAll  = /<yield\s*(?:\/>|>([\S\s]*?)<\/yield\s*>|>)/ig;
var reYieldSrc  = /<yield\s+to=['"]([^'">]*)['"]\s*>([\S\s]*?)<\/yield\s*>/ig;
var reYieldDest = /<yield\s+from=['"]?([-\w]+)['"]?\s*(?:\/>|>([\S\s]*?)<\/yield\s*>)/ig;
var rootEls = { tr: 'tbody', th: 'tr', td: 'tr', col: 'colgroup' };
var tblTags = IE_VERSION && IE_VERSION < 10 ? RE_SPECIAL_TAGS : RE_SPECIAL_TAGS_NO_OPTION;
var GENERIC = 'div';


/*
  Creates the root element for table or select child elements:
  tr/th/td/thead/tfoot/tbody/caption/col/colgroup/option/optgroup
*/
function specialTags(el, tmpl, tagName) {

  var
    select = tagName[0] === 'o',
    parent = select ? 'select>' : 'table>';

  // trim() is important here, this ensures we don't have artifacts,
  // so we can check if we have only one element inside the parent
  el.innerHTML = '<' + parent + tmpl.trim() + '</' + parent;
  parent = el.firstChild;

  // returns the immediate parent if tr/th/td/col is the only element, if not
  // returns the whole tree, as this can include additional elements
  if (select) {
    parent.selectedIndex = -1;  // for IE9, compatible w/current riot behavior
  } else {
    // avoids insertion of cointainer inside container (ex: tbody inside tbody)
    var tname = rootEls[tagName];
    if (tname && parent.childElementCount === 1) { parent = $(tname, parent); }
  }
  return parent
}

/*
  Replace the yield tag from any tag template with the innerHTML of the
  original tag in the page
*/
function replaceYield(tmpl, html) {
  // do nothing if no yield
  if (!reHasYield.test(tmpl)) { return tmpl }

  // be careful with #1343 - string on the source having `$1`
  var src = {};

  html = html && html.replace(reYieldSrc, function (_, ref, text) {
    src[ref] = src[ref] || text;   // preserve first definition
    return ''
  }).trim();

  return tmpl
    .replace(reYieldDest, function (_, ref, def) {  // yield with from - to attrs
      return src[ref] || def || ''
    })
    .replace(reYieldAll, function (_, def) {        // yield without any "from"
      return html || def || ''
    })
}

/**
 * Creates a DOM element to wrap the given content. Normally an `DIV`, but can be
 * also a `TABLE`, `SELECT`, `TBODY`, `TR`, or `COLGROUP` element.
 *
 * @param   { String } tmpl  - The template coming from the custom tag definition
 * @param   { String } html - HTML content that comes from the DOM element where you
 *           will mount the tag, mostly the original tag in the page
 * @param   { Boolean } checkSvg - flag needed to know if we need to force the svg rendering in case of loop nodes
 * @returns { HTMLElement } DOM element with _tmpl_ merged through `YIELD` with the _html_.
 */
function mkdom(tmpl, html, checkSvg) {
  var match   = tmpl && tmpl.match(/^\s*<([-\w]+)/),
    tagName = match && match[1].toLowerCase(),
    el = mkEl(GENERIC, checkSvg && isSVGTag(tagName));

  // replace all the yield tags with the tag inner html
  tmpl = replaceYield(tmpl, html);

  /* istanbul ignore next */
  if (tblTags.test(tagName))
    { el = specialTags(el, tmpl, tagName); }
  else
    { setInnerHTML(el, tmpl); }

  el.stub = true;

  return el
}

/**
 * Another way to create a riot tag a bit more es6 friendly
 * @param { HTMLElement } el - tag DOM selector or DOM node/s
 * @param { Object } opts - tag logic
 * @returns { Tag } new riot tag instance
 */
function Tag$1(el, opts) {
  // get the tag properties from the class constructor
  var ref = this;
  var name = ref.name;
  var tmpl = ref.tmpl;
  var css = ref.css;
  var attrs = ref.attrs;
  var onCreate = ref.onCreate;
  // register a new tag and cache the class prototype
  if (!__TAG_IMPL[name]) {
    tag$$1(name, tmpl, css, attrs, onCreate);
    // cache the class constructor
    __TAG_IMPL[name].class = this.constructor;
  }

  // mount the tag using the class instance
  mountTo(el, name, opts, this);
  // inject the component css
  if (css) { styleManager.inject(); }

  return this
}

/**
 * Create a new riot tag implementation
 * @param   { String }   name - name/id of the new riot tag
 * @param   { String }   tmpl - tag template
 * @param   { String }   css - custom tag css
 * @param   { String }   attrs - root tag attributes
 * @param   { Function } fn - user function
 * @returns { String } name/id of the tag just created
 */
function tag$$1(name, tmpl, css, attrs, fn) {
  if (isFunction(attrs)) {
    fn = attrs;

    if (/^[\w\-]+\s?=/.test(css)) {
      attrs = css;
      css = '';
    } else
      { attrs = ''; }
  }

  if (css) {
    if (isFunction(css))
      { fn = css; }
    else
      { styleManager.add(css); }
  }

  name = name.toLowerCase();
  __TAG_IMPL[name] = { name: name, tmpl: tmpl, attrs: attrs, fn: fn };

  return name
}

/**
 * Create a new riot tag implementation (for use by the compiler)
 * @param   { String }   name - name/id of the new riot tag
 * @param   { String }   tmpl - tag template
 * @param   { String }   css - custom tag css
 * @param   { String }   attrs - root tag attributes
 * @param   { Function } fn - user function
 * @returns { String } name/id of the tag just created
 */
function tag2$$1(name, tmpl, css, attrs, fn) {
  if (css)
    { styleManager.add(css, name); }

  var exists = !!__TAG_IMPL[name];
  __TAG_IMPL[name] = { name: name, tmpl: tmpl, attrs: attrs, fn: fn };

  if (exists && util.hotReloader)
    { util.hotReloader(name); }

  return name
}

/**
 * Mount a tag using a specific tag implementation
 * @param   { * } selector - tag DOM selector or DOM node/s
 * @param   { String } tagName - tag implementation name
 * @param   { Object } opts - tag logic
 * @returns { Array } new tags instances
 */
function mount$$1(selector, tagName, opts) {
  var tags = [];

  function pushTagsTo(root) {
    if (root.tagName) {
      var riotTag = getAttr(root, RIOT_TAG_IS);

      // have tagName? force riot-tag to be the same
      if (tagName && riotTag !== tagName) {
        riotTag = tagName;
        setAttr(root, RIOT_TAG_IS, tagName);
      }

      var tag$$1 = mountTo(root, riotTag || root.tagName.toLowerCase(), opts);

      if (tag$$1)
        { tags.push(tag$$1); }
    } else if (root.length)
      { each(root, pushTagsTo); } // assume nodeList
  }

  // inject styles into DOM
  styleManager.inject();

  if (isObject(tagName)) {
    opts = tagName;
    tagName = 0;
  }

  var elem;
  var allTags;

  // crawl the DOM to find the tag
  if (isString(selector)) {
    selector = selector === '*' ?
      // select all registered tags
      // & tags found with the riot-tag attribute set
      allTags = selectTags() :
      // or just the ones named like the selector
      selector + selectTags(selector.split(/, */));

    // make sure to pass always a selector
    // to the querySelectorAll function
    elem = selector ? $$(selector) : [];
  }
  else
    // probably you have passed already a tag or a NodeList
    { elem = selector; }

  // select all the registered and mount them inside their root elements
  if (tagName === '*') {
    // get all custom tags
    tagName = allTags || selectTags();
    // if the root els it's just a single tag
    if (elem.tagName)
      { elem = $$(tagName, elem); }
    else {
      // select all the children for all the different root elements
      var nodeList = [];

      each(elem, function (_el) { return nodeList.push($$(tagName, _el)); });

      elem = nodeList;
    }
    // get rid of the tagName
    tagName = 0;
  }

  pushTagsTo(elem);

  return tags
}

// Create a mixin that could be globally shared across all the tags
var mixins = {};
var globals = mixins[GLOBAL_MIXIN] = {};
var _id = 0;

/**
 * Create/Return a mixin by its name
 * @param   { String }  name - mixin name (global mixin if object)
 * @param   { Object }  mix - mixin logic
 * @param   { Boolean } g - is global?
 * @returns { Object }  the mixin logic
 */
function mixin$$1(name, mix, g) {
  // Unnamed global
  if (isObject(name)) {
    mixin$$1(("__unnamed_" + (_id++)), name, true);
    return
  }

  var store = g ? globals : mixins;

  // Getter
  if (!mix) {
    if (isUndefined(store[name]))
      { throw new Error('Unregistered mixin: ' + name) }

    return store[name]
  }

  // Setter
  store[name] = isFunction(mix) ?
    extend(mix.prototype, store[name] || {}) && mix :
    extend(store[name] || {}, mix);
}

/**
 * Update all the tags instances created
 * @returns { Array } all the tags instances
 */
function update$2() {
  return each(__TAGS_CACHE, function (tag$$1) { return tag$$1.update(); })
}

function unregister$$1(name) {
  delete __TAG_IMPL[name];
}

// counter to give a unique id to all the Tag instances
var __uid = 0;

/**
 * We need to update opts for this tag. That requires updating the expressions
 * in any attributes on the tag, and then copying the result onto opts.
 * @this Tag
 * @param   {Boolean} isLoop - is it a loop tag?
 * @param   { Tag }  parent - parent tag node
 * @param   { Boolean }  isAnonymous - is it a tag without any impl? (a tag not registered)
 * @param   { Object }  opts - tag options
 * @param   { Array }  instAttrs - tag attributes array
 */
function updateOpts(isLoop, parent, isAnonymous, opts, instAttrs) {
  // isAnonymous `each` tags treat `dom` and `root` differently. In this case
  // (and only this case) we don't need to do updateOpts, because the regular parse
  // will update those attrs. Plus, isAnonymous tags don't need opts anyway
  if (isLoop && isAnonymous) { return }

  var ctx = !isAnonymous && isLoop ? this : parent || this;
  each(instAttrs, function (attr) {
    if (attr.expr) { update$1$1.call(ctx, [attr.expr]); }
    opts[toCamel(attr.name)] = attr.expr ? attr.expr.value : attr.value;
  });
}


/**
 * Tag class
 * @constructor
 * @param { Object } impl - it contains the tag template, and logic
 * @param { Object } conf - tag options
 * @param { String } innerHTML - html that eventually we need to inject in the tag
 */
function Tag$$1(impl, conf, innerHTML) {

  var opts = extend({}, conf.opts),
    parent = conf.parent,
    isLoop = conf.isLoop,
    isAnonymous = conf.isAnonymous,
    item = cleanUpData(conf.item),
    instAttrs = [], // All attributes on the Tag when it's first parsed
    implAttrs = [], // expressions on this type of Tag
    expressions = [],
    root = conf.root,
    tagName = conf.tagName || getTagName(root),
    isVirtual = tagName === 'virtual',
    propsInSyncWithParent = [],
    dom;

  // make this tag observable
  observable(this);
  // only call unmount if we have a valid __TAG_IMPL (has name property)
  if (impl.name && root._tag) { root._tag.unmount(true); }

  // not yet mounted
  this.isMounted = false;
  root.isLoop = isLoop;

  defineProperty(this, '_internal', {
    isAnonymous: isAnonymous,
    instAttrs: instAttrs,
    innerHTML: innerHTML,
    // these vars will be needed only for the virtual tags
    virts: [],
    tail: null,
    head: null
  });

  // create a unique id to this tag
  // it could be handy to use it also to improve the virtual dom rendering speed
  defineProperty(this, '_riot_id', ++__uid); // base 1 allows test !t._riot_id

  extend(this, { parent: parent, root: root, opts: opts }, item);
  // protect the "tags" and "refs" property from being overridden
  defineProperty(this, 'tags', {});
  defineProperty(this, 'refs', {});

  dom = mkdom(impl.tmpl, innerHTML, isLoop);

  /**
   * Update the tag expressions and options
   * @param   { * }  data - data we want to use to extend the tag properties
   * @returns { Tag } the current tag instance
   */
  defineProperty(this, 'update', function tagUpdate(data) {
    if (isFunction(this.shouldUpdate) && !this.shouldUpdate(data)) { return this }

    // make sure the data passed will not override
    // the component core methods
    data = cleanUpData(data);

    // inherit properties from the parent, but only for isAnonymous tags
    if (isLoop && isAnonymous) { inheritFrom.apply(this, [this.parent, propsInSyncWithParent]); }
    extend(this, data);
    updateOpts.apply(this, [isLoop, parent, isAnonymous, opts, instAttrs]);
    if (this.isMounted) { this.trigger('update', data); }
    update$1$1.call(this, expressions);
    if (this.isMounted) { this.trigger('updated'); }

    return this

  }.bind(this));

  /**
   * Add a mixin to this tag
   * @returns { Tag } the current tag instance
   */
  defineProperty(this, 'mixin', function tagMixin() {
    var this$1 = this;

    each(arguments, function (mix) {
      var instance,
        props = [],
        obj;

      mix = isString(mix) ? mixin$$1(mix) : mix;

      // check if the mixin is a function
      if (isFunction(mix)) {
        // create the new mixin instance
        instance = new mix();
      } else { instance = mix; }

      var proto = Object.getPrototypeOf(instance);

      // build multilevel prototype inheritance chain property list
      do { props = props.concat(Object.getOwnPropertyNames(obj || instance)); }
      while (obj = Object.getPrototypeOf(obj || instance))

      // loop the keys in the function prototype or the all object keys
      each(props, function (key) {
        // bind methods to this
        // allow mixins to override other properties/parent mixins
        if (key !== 'init') {
          // check for getters/setters
          var descriptor = Object.getOwnPropertyDescriptor(instance, key) || Object.getOwnPropertyDescriptor(proto, key);
          var hasGetterSetter = descriptor && (descriptor.get || descriptor.set);

          // apply method only if it does not already exist on the instance
          if (!this$1.hasOwnProperty(key) && hasGetterSetter) {
            Object.defineProperty(this$1, key, descriptor);
          } else {
            this$1[key] = isFunction(instance[key]) ?
              instance[key].bind(this$1) :
              instance[key];
          }
        }
      });

      // init method will be called automatically
      if (instance.init)
        { instance.init.bind(this$1)(); }
    });
    return this
  }.bind(this));

  /**
   * Mount the current tag instance
   * @returns { Tag } the current tag instance
   */
  defineProperty(this, 'mount', function tagMount() {
    var this$1 = this;

    root._tag = this; // keep a reference to the tag just created

    // Read all the attrs on this instance. This give us the info we need for updateOpts
    parseAttributes.apply(parent, [root, root.attributes, function (attr, expr) {
      if (!isAnonymous && RefExpr.isPrototypeOf(expr)) { expr.tag = this$1; }
      attr.expr = expr;
      instAttrs.push(attr);
    }]);

    // update the root adding custom attributes coming from the compiler
    implAttrs = [];
    walkAttrs(impl.attrs, function (k, v) { implAttrs.push({name: k, value: v}); });
    parseAttributes.apply(this, [root, implAttrs, function (attr, expr) {
      if (expr) { expressions.push(expr); }
      else { setAttr(root, attr.name, attr.value); }
    }]);

    // children in loop should inherit from true parent
    if (this._parent && isAnonymous) { inheritFrom.apply(this, [this._parent, propsInSyncWithParent]); }

    // initialiation
    updateOpts.apply(this, [isLoop, parent, isAnonymous, opts, instAttrs]);

    // add global mixins
    var globalMixin = mixin$$1(GLOBAL_MIXIN);

    if (globalMixin) {
      for (var i in globalMixin) {
        if (globalMixin.hasOwnProperty(i)) {
          this$1.mixin(globalMixin[i]);
        }
      }
    }

    if (impl.fn) { impl.fn.call(this, opts); }

    this.trigger('before-mount');

    // parse layout after init. fn may calculate args for nested custom tags
    parseExpressions.apply(this, [dom, expressions, false]);

    this.update(item);

    if (isLoop && isAnonymous) {
      // update the root attribute for the looped elements
      this.root = root = dom.firstChild;
    } else {
      while (dom.firstChild) { root.appendChild(dom.firstChild); }
      if (root.stub) { root = parent.root; }
    }

    defineProperty(this, 'root', root);
    this.isMounted = true;

    // if it's not a child tag we can trigger its mount event
    if (!this.parent || this.parent.isMounted) {
      this.trigger('mount');
    }
    // otherwise we need to wait that the parent event gets triggered
    else { this.parent.one('mount', function () {
      this$1.trigger('mount');
    }); }

    return this

  }.bind(this));

  /**
   * Unmount the tag instance
   * @param { Boolean } mustKeepRoot - if it's true the root node will not be removed
   * @returns { Tag } the current tag instance
   */
  defineProperty(this, 'unmount', function tagUnmount(mustKeepRoot) {
    var this$1 = this;

    var el = this.root,
      p = el.parentNode,
      ptag,
      tagIndex = __TAGS_CACHE.indexOf(this);

    this.trigger('before-unmount');

    // remove this tag instance from the global virtualDom variable
    if (~tagIndex)
      { __TAGS_CACHE.splice(tagIndex, 1); }

    if (p) {
      if (parent) {
        ptag = getImmediateCustomParentTag(parent);

        if (isVirtual) {
          Object.keys(this.tags).forEach(function (tagName) {
            arrayishRemove(ptag.tags, tagName, this$1.tags[tagName]);
          });
        } else {
          arrayishRemove(ptag.tags, tagName, this);
        }
      } else {
        while (el.firstChild) { el.removeChild(el.firstChild); }
      }

      if (!mustKeepRoot) {
        p.removeChild(el);
      } else {
        // the riot-tag and the data-is attributes aren't needed anymore, remove them
        remAttr(p, RIOT_TAG_IS);
      }
    }

    if (this._internal.virts) {
      each(this._internal.virts, function (v) {
        if (v.parentNode) { v.parentNode.removeChild(v); }
      });
    }

    // allow expressions to unmount themselves
    unmountAll(expressions);
    each(instAttrs, function (a) { return a.expr && a.expr.unmount && a.expr.unmount(); });

    this.trigger('unmount');
    this.off('*');
    this.isMounted = false;

    delete this.root._tag;

    return this

  }.bind(this));
}

/**
 * Detect the tag implementation by a DOM node
 * @param   { Object } dom - DOM node we need to parse to get its tag implementation
 * @returns { Object } it returns an object containing the implementation of a custom tag (template and boot function)
 */
function getTag(dom) {
  return dom.tagName && __TAG_IMPL[getAttr(dom, RIOT_TAG_IS) ||
    getAttr(dom, RIOT_TAG_IS) || dom.tagName.toLowerCase()]
}

/**
 * Inherit properties from a target tag instance
 * @this Tag
 * @param   { Tag } target - tag where we will inherit properties
 * @param   { Array } propsInSyncWithParent - array of properties to sync with the target
 */
function inheritFrom(target, propsInSyncWithParent) {
  var this$1 = this;

  each(Object.keys(target), function (k) {
    // some properties must be always in sync with the parent tag
    var mustSync = !isReservedName(k) && contains(propsInSyncWithParent, k);

    if (isUndefined(this$1[k]) || mustSync) {
      // track the property to keep in sync
      // so we can keep it updated
      if (!mustSync) { propsInSyncWithParent.push(k); }
      this$1[k] = target[k];
    }
  });
}

/**
 * Move the position of a custom tag in its parent tag
 * @this Tag
 * @param   { String } tagName - key where the tag was stored
 * @param   { Number } newPos - index where the new tag will be stored
 */
function moveChildTag(tagName, newPos) {
  var parent = this.parent,
    tags;
  // no parent no move
  if (!parent) { return }

  tags = parent.tags[tagName];

  if (isArray(tags))
    { tags.splice(newPos, 0, tags.splice(tags.indexOf(this), 1)[0]); }
  else { arrayishAdd(parent.tags, tagName, this); }
}

/**
 * Create a new child tag including it correctly into its parent
 * @param   { Object } child - child tag implementation
 * @param   { Object } opts - tag options containing the DOM node where the tag will be mounted
 * @param   { String } innerHTML - inner html of the child node
 * @param   { Object } parent - instance of the parent tag including the child custom tag
 * @returns { Object } instance of the new child tag just created
 */
function initChildTag(child, opts, innerHTML, parent) {
  var tag = new Tag$$1(child, opts, innerHTML),
    tagName = opts.tagName || getTagName(opts.root, true),
    ptag = getImmediateCustomParentTag(parent);
  // fix for the parent attribute in the looped elements
  tag.parent = ptag;
  // store the real parent tag
  // in some cases this could be different from the custom parent tag
  // for example in nested loops
  tag._parent = parent;

  // add this tag to the custom parent tag
  arrayishAdd(ptag.tags, tagName, tag);

  // and also to the real parent tag
  if (ptag !== parent)
    { arrayishAdd(parent.tags, tagName, tag); }

  // empty the child node once we got its template
  // to avoid that its children get compiled multiple times
  opts.root.innerHTML = '';

  return tag
}

/**
 * Loop backward all the parents tree to detect the first custom parent tag
 * @param   { Object } tag - a Tag instance
 * @returns { Object } the instance of the first custom parent tag found
 */
function getImmediateCustomParentTag(tag) {
  var ptag = tag;
  while (ptag._internal.isAnonymous) {
    if (!ptag.parent) { break }
    ptag = ptag.parent;
  }
  return ptag
}

/**
 * Trigger the unmount method on all the expressions
 * @param   { Array } expressions - DOM expressions
 */
function unmountAll(expressions) {
  each(expressions, function(expr) {
    if (expr instanceof Tag$$1) { expr.unmount(true); }
    else if (expr.unmount) { expr.unmount(); }
  });
}

/**
 * Get the tag name of any DOM node
 * @param   { Object } dom - DOM node we want to parse
 * @param   { Boolean } skipDataIs - hack to ignore the data-is attribute when attaching to parent
 * @returns { String } name to identify this dom node in riot
 */
function getTagName(dom, skipDataIs) {
  var child = getTag(dom),
    namedTag = !skipDataIs && getAttr(dom, RIOT_TAG_IS);
  return namedTag && !tmpl.hasExpr(namedTag) ?
                namedTag :
              child ? child.name : dom.tagName.toLowerCase()
}

/**
 * With this function we avoid that the internal Tag methods get overridden
 * @param   { Object } data - options we want to use to extend the tag instance
 * @returns { Object } clean object without containing the riot internal reserved words
 */
function cleanUpData(data) {
  if (!(data instanceof Tag$$1) && !(data && typeof data.trigger === T_FUNCTION))
    { return data }

  var o = {};
  for (var key in data) {
    if (!RE_RESERVED_NAMES.test(key)) { o[key] = data[key]; }
  }
  return o
}

/**
 * Set the property of an object for a given key. If something already
 * exists there, then it becomes an array containing both the old and new value.
 * @param { Object } obj - object on which to set the property
 * @param { String } key - property name
 * @param { Object } value - the value of the property to be set
 * @param { Boolean } ensureArray - ensure that the property remains an array
 */
function arrayishAdd(obj, key, value, ensureArray) {
  var dest = obj[key];
  var isArr = isArray(dest);

  if (dest && dest === value) { return }

  // if the key was never set, set it once
  if (!dest && ensureArray) { obj[key] = [value]; }
  else if (!dest) { obj[key] = value; }
  // if it was an array and not yet set
  else if (!isArr || isArr && !contains(dest, value)) {
    if (isArr) { dest.push(value); }
    else { obj[key] = [dest, value]; }
  }
}

/**
 * Removes an item from an object at a given key. If the key points to an array,
 * then the item is just removed from the array.
 * @param { Object } obj - object on which to remove the property
 * @param { String } key - property name
 * @param { Object } value - the value of the property to be removed
 * @param { Boolean } ensureArray - ensure that the property remains an array
*/
function arrayishRemove(obj, key, value, ensureArray) {
  if (isArray(obj[key])) {
    each(obj[key], function(item, i) {
      if (item === value) { obj[key].splice(i, 1); }
    });
    if (!obj[key].length) { delete obj[key]; }
    else if (obj[key].length === 1 && !ensureArray) { obj[key] = obj[key][0]; }
  } else
    { delete obj[key]; } // otherwise just delete the key
}

/**
 * Check whether a DOM node is in stub mode, useful for the riot 'if' directive
 * @param   { Object }  dom - DOM node we want to parse
 * @returns { Boolean } -
 */
function isInStub(dom) {
  while (dom) {
    if (dom.inStub)
      { return true }
    dom = dom.parentNode;
  }
  return false
}

/**
 * Mount a tag creating new Tag instance
 * @param   { Object } root - dom node where the tag will be mounted
 * @param   { String } tagName - name of the riot tag we want to mount
 * @param   { Object } opts - options to pass to the Tag instance
 * @param   { Object } ctx - optional context that will be used to extend an existing class ( used in riot.Tag )
 * @returns { Tag } a new Tag instance
 */
function mountTo(root, tagName, opts, ctx) {
  var impl = __TAG_IMPL[tagName],
    implClass = __TAG_IMPL[tagName].class,
    tag = ctx || (implClass ? Object.create(implClass.prototype) : {}),
    // cache the inner HTML to fix #855
    innerHTML = root._innerHTML = root._innerHTML || root.innerHTML;

  // clear the inner html
  root.innerHTML = '';

  var conf = { root: root, opts: opts };
  if (opts && opts.parent) { conf.parent = opts.parent; }

  if (impl && root) { Tag$$1.apply(tag, [impl, conf, innerHTML]); }

  if (tag && tag.mount) {
    tag.mount(true);
    // add this tag to the virtualDom variable
    if (!contains(__TAGS_CACHE, tag)) { __TAGS_CACHE.push(tag); }
  }

  return tag
}


/**
 * Adds the elements for a virtual tag
 * @this Tag
 * @param { Node } src - the node that will do the inserting or appending
 * @param { Tag } target - only if inserting, insert before this tag's first child
 */
function makeVirtual(src, target) {
  var this$1 = this;

  var head = createDOMPlaceholder(),
    tail = createDOMPlaceholder(),
    frag = createFrag(),
    sib, el;

  this._internal.head = this.root.insertBefore(head, this.root.firstChild);
  this._internal.tail = this.root.appendChild(tail);

  el = this._internal.head;

  while (el) {
    sib = el.nextSibling;
    frag.appendChild(el);
    this$1._internal.virts.push(el); // hold for unmounting
    el = sib;
  }

  if (target)
    { src.insertBefore(frag, target._internal.head); }
  else
    { src.appendChild(frag); }
}

/**
 * Move virtual tag and all child nodes
 * @this Tag
 * @param { Node } src  - the node that will do the inserting
 * @param { Tag } target - insert before this tag's first child
 */
function moveVirtual(src, target) {
  var this$1 = this;

  var el = this._internal.head,
    frag = createFrag(),
    sib;

  while (el) {
    sib = el.nextSibling;
    frag.appendChild(el);
    el = sib;
    if (el === this$1._internal.tail) {
      frag.appendChild(el);
      src.insertBefore(frag, target._internal.head);
      break
    }
  }
}

/**
 * Get selectors for tags
 * @param   { Array } tags - tag names to select
 * @returns { String } selector
 */
function selectTags(tags) {
  // select all tags
  if (!tags) {
    var keys = Object.keys(__TAG_IMPL);
    return keys + selectTags(keys)
  }

  return tags
    .filter(function (t) { return !/[^-\w]/.test(t); })
    .reduce(function (list, t) {
      var name = t.trim().toLowerCase();
      return list + ",[" + RIOT_TAG_IS + "=\"" + name + "\"]"
    }, '')
}


var tags = Object.freeze({
	getTag: getTag,
	inheritFrom: inheritFrom,
	moveChildTag: moveChildTag,
	initChildTag: initChildTag,
	getImmediateCustomParentTag: getImmediateCustomParentTag,
	unmountAll: unmountAll,
	getTagName: getTagName,
	cleanUpData: cleanUpData,
	arrayishAdd: arrayishAdd,
	arrayishRemove: arrayishRemove,
	isInStub: isInStub,
	mountTo: mountTo,
	makeVirtual: makeVirtual,
	moveVirtual: moveVirtual,
	selectTags: selectTags
});

/**
 * Riot public api
 */

var settings = Object.create(brackets.settings);
var util = {
  tmpl: tmpl,
  brackets: brackets,
  styleManager: styleManager,
  vdom: __TAGS_CACHE,
  styleNode: styleManager.styleNode,
  // export the riot internal utils as well
  dom: dom,
  check: check,
  misc: misc,
  tags: tags
};

exports.settings = settings;
exports.util = util;
exports.observable = observable;
exports.Tag = Tag$1;
exports.tag = tag$$1;
exports.tag2 = tag2$$1;
exports.mount = mount$$1;
exports.mixin = mixin$$1;
exports.update = update$2;
exports.unregister = unregister$$1;

Object.defineProperty(exports, '__esModule', { value: true });

})));


/***/ },
/* 1 */,
/* 2 */
/***/ function(module, exports, __webpack_require__) {

"use strict";
"use strict";
var riot_1 = __webpack_require__(0);
riot_1.mount("app");


/***/ }
/******/ ]);
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIndlYnBhY2s6Ly8vd2VicGFjay9ib290c3RyYXAgM2E5OGU2M2Y0Y2QzNWExYWQ4NzAiLCJ3ZWJwYWNrOi8vLy4uL34vcmlvdC9yaW90LmpzIiwid2VicGFjazovLy8uL2luZGV4LnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7QUFBQTtBQUNBOztBQUVBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBOztBQUVBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBOzs7QUFHQTtBQUNBOztBQUVBO0FBQ0E7O0FBRUE7QUFDQSxtREFBMkMsY0FBYzs7QUFFekQ7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsWUFBSTtBQUNKOztBQUVBO0FBQ0E7QUFDQTtBQUNBLG1DQUEyQiwwQkFBMEIsRUFBRTtBQUN2RCx5Q0FBaUMsZUFBZTtBQUNoRDtBQUNBO0FBQ0E7O0FBRUE7QUFDQSw4REFBc0QsK0RBQStEOztBQUVySDtBQUNBOztBQUVBO0FBQ0E7Ozs7Ozs7QUM5REE7QUFDQTtBQUNBO0FBQ0E7QUFDQSwyQ0FBMkM7QUFDM0MsQ0FBQyw0QkFBNEI7O0FBRTdCO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EseURBQXlELEdBQUcsR0FBRztBQUMvRDtBQUNBLDJDQUEyQzs7QUFFM0M7QUFDQTtBQUNBLGFBQWEsU0FBUztBQUN0QixhQUFhLFVBQVU7QUFDdkI7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBLGFBQWEsU0FBUztBQUN0QixhQUFhLFVBQVU7QUFDdkI7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBLGFBQWEsSUFBSTtBQUNqQixhQUFhLFVBQVU7QUFDdkI7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0EsYUFBYSxJQUFJO0FBQ2pCLGFBQWEsVUFBVTtBQUN2QjtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0EsYUFBYSxJQUFJO0FBQ2pCLGFBQWEsVUFBVTtBQUN2QjtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0EsYUFBYSxJQUFJO0FBQ2pCLGFBQWEsVUFBVTtBQUN2QjtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0EsV0FBVyxJQUFJO0FBQ2YsYUFBYSxVQUFVO0FBQ3ZCO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQSxhQUFhLElBQUk7QUFDakIsYUFBYSxVQUFVO0FBQ3ZCO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQSxhQUFhLFNBQVM7QUFDdEIsYUFBYSxTQUFTO0FBQ3RCLGFBQWEsVUFBVTtBQUN2QjtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQSxhQUFhLFNBQVM7QUFDdEIsYUFBYSxVQUFVO0FBQ3ZCO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxDQUFDOztBQUVEO0FBQ0E7QUFDQSxhQUFhLFNBQVM7QUFDdEIsYUFBYSxTQUFTO0FBQ3RCLGFBQWEsU0FBUztBQUN0QjtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0EsYUFBYSxTQUFTO0FBQ3RCLGFBQWEsU0FBUztBQUN0QixhQUFhLFNBQVM7QUFDdEI7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBLGFBQWEsU0FBUztBQUN0QjtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0EsYUFBYSxTQUFTO0FBQ3RCO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQSxhQUFhLFNBQVM7QUFDdEIsYUFBYSxVQUFVO0FBQ3ZCLGFBQWEsU0FBUztBQUN0QjtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBLGFBQWEsU0FBUztBQUN0QixhQUFhLFNBQVM7QUFDdEI7QUFDQTtBQUNBO0FBQ0EsS0FBSztBQUNMO0FBQ0E7QUFD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O0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBLGFBQWEsUUFBUTtBQUNyQixhQUFhLFNBQVM7QUFDdEI7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQSwwQkFBMEIsMEJBQTBCLEVBQUU7QUFDdEQ7QUFDQTtBQUNBO0FBQ0EsS0FBSztBQUNMOzs7QUFHQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLENBQUM7O0FBRUQ7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBLDhDQUE4QyxjQUFjOztBQUU1RCxDQUFDOzs7Ozs7Ozs7QUNqbEZEO0FBQ0E7QUFDQSIsImZpbGUiOiJidW5kbGUuanMiLCJzb3VyY2VzQ29udGVudCI6WyIgXHQvLyBUaGUgbW9kdWxlIGNhY2hlXG4gXHR2YXIgaW5zdGFsbGVkTW9kdWxlcyA9IHt9O1xuXG4gXHQvLyBUaGUgcmVxdWlyZSBmdW5jdGlvblxuIFx0ZnVuY3Rpb24gX193ZWJwYWNrX3JlcXVpcmVfXyhtb2R1bGVJZCkge1xuXG4gXHRcdC8vIENoZWNrIGlmIG1vZHVsZSBpcyBpbiBjYWNoZVxuIFx0XHRpZihpbnN0YWxsZWRNb2R1bGVzW21vZHVsZUlkXSlcbiBcdFx0XHRyZXR1cm4gaW5zdGFsbGVkTW9kdWxlc1ttb2R1bGVJZF0uZXhwb3J0cztcblxuIFx0XHQvLyBDcmVhdGUgYSBuZXcgbW9kdWxlIChhbmQgcHV0IGl0IGludG8gdGhlIGNhY2hlKVxuIFx0XHR2YXIgbW9kdWxlID0gaW5zdGFsbGVkTW9kdWxlc1ttb2R1bGVJZF0gPSB7XG4gXHRcdFx0aTogbW9kdWxlSWQsXG4gXHRcdFx0bDogZmFsc2UsXG4gXHRcdFx0ZXhwb3J0czoge31cbiBcdFx0fTtcblxuIFx0XHQvLyBFeGVjdXRlIHRoZSBtb2R1bGUgZnVuY3Rpb25cbiBcdFx0bW9kdWxlc1ttb2R1bGVJZF0uY2FsbChtb2R1bGUuZXhwb3J0cywgbW9kdWxlLCBtb2R1bGUuZXhwb3J0cywgX193ZWJwYWNrX3JlcXVpcmVfXyk7XG5cbiBcdFx0Ly8gRmxhZyB0aGUgbW9kdWxlIGFzIGxvYWRlZFxuIFx0XHRtb2R1bGUubCA9IHRydWU7XG5cbiBcdFx0Ly8gUmV0dXJuIHRoZSBleHBvcnRzIG9mIHRoZSBtb2R1bGVcbiBcdFx0cmV0dXJuIG1vZHVsZS5leHBvcnRzO1xuIFx0fVxuXG5cbiBcdC8vIGV4cG9zZSB0aGUgbW9kdWxlcyBvYmplY3QgKF9fd2VicGFja19tb2R1bGVzX18pXG4gXHRfX3dlYnBhY2tfcmVxdWlyZV9fLm0gPSBtb2R1bGVzO1xuXG4gXHQvLyBleHBvc2UgdGhlIG1vZHVsZSBjYWNoZVxuIFx0X193ZWJwYWNrX3JlcXVpcmVfXy5jID0gaW5zdGFsbGVkTW9kdWxlcztcblxuIFx0Ly8gaWRlbnRpdHkgZnVuY3Rpb24gZm9yIGNhbGxpbmcgaGFybW9yeSBpbXBvcnRzIHdpdGggdGhlIGNvcnJlY3QgY29udGV4dFxuIFx0X193ZWJwYWNrX3JlcXVpcmVfXy5pID0gZnVuY3Rpb24odmFsdWUpIHsgcmV0dXJuIHZhbHVlOyB9O1xuXG4gXHQvLyBkZWZpbmUgZ2V0dGVyIGZ1bmN0aW9uIGZvciBoYXJtb3J5IGV4cG9ydHNcbiBcdF9fd2VicGFja19yZXF1aXJlX18uZCA9IGZ1bmN0aW9uKGV4cG9ydHMsIG5hbWUsIGdldHRlcikge1xuIFx0XHRPYmplY3QuZGVmaW5lUHJvcGVydHkoZXhwb3J0cywgbmFtZSwge1xuIFx0XHRcdGNvbmZpZ3VyYWJsZTogZmFsc2UsXG4gXHRcdFx0ZW51bWVyYWJsZTogdHJ1ZSxcbiBcdFx0XHRnZXQ6IGdldHRlclxuIFx0XHR9KTtcbiBcdH07XG5cbiBcdC8vIGdldERlZmF1bHRFeHBvcnQgZnVuY3Rpb24gZm9yIGNvbXBhdGliaWxpdHkgd2l0aCBub24taGFybW9ueSBtb2R1bGVzXG4gXHRfX3dlYnBhY2tfcmVxdWlyZV9fLm4gPSBmdW5jdGlvbihtb2R1bGUpIHtcbiBcdFx0dmFyIGdldHRlciA9IG1vZHVsZSAmJiBtb2R1bGUuX19lc01vZHVsZSA/XG4gXHRcdFx0ZnVuY3Rpb24gZ2V0RGVmYXVsdCgpIHsgcmV0dXJuIG1vZHVsZVsnZGVmYXVsdCddOyB9IDpcbiBcdFx0XHRmdW5jdGlvbiBnZXRNb2R1bGVFeHBvcnRzKCkgeyByZXR1cm4gbW9kdWxlOyB9O1xuIFx0XHRfX3dlYnBhY2tfcmVxdWlyZV9fLmQoZ2V0dGVyLCAnYScsIGdldHRlcik7XG4gXHRcdHJldHVybiBnZXR0ZXI7XG4gXHR9O1xuXG4gXHQvLyBPYmplY3QucHJvdG90eXBlLmhhc093blByb3BlcnR5LmNhbGxcbiBcdF9fd2VicGFja19yZXF1aXJlX18ubyA9IGZ1bmN0aW9uKG9iamVjdCwgcHJvcGVydHkpIHsgcmV0dXJuIE9iamVjdC5wcm90b3R5cGUuaGFzT3duUHJvcGVydHkuY2FsbChvYmplY3QsIHByb3BlcnR5KTsgfTtcblxuIFx0Ly8gX193ZWJwYWNrX3B1YmxpY19wYXRoX19cbiBcdF9fd2VicGFja19yZXF1aXJlX18ucCA9IFwiXCI7XG5cbiBcdC8vIExvYWQgZW50cnkgbW9kdWxlIGFuZCByZXR1cm4gZXhwb3J0c1xuIFx0cmV0dXJuIF9fd2VicGFja19yZXF1aXJlX18oX193ZWJwYWNrX3JlcXVpcmVfXy5zID0gMik7XG5cblxuXG4vLyBXRUJQQUNLIEZPT1RFUiAvL1xuLy8gd2VicGFjay9ib290c3RyYXAgM2E5OGU2M2Y0Y2QzNWExYWQ4NzAiLCIvKiBSaW90IHYzLjAuMSwgQGxpY2Vuc2UgTUlUICovXG4oZnVuY3Rpb24gKGdsb2JhbCwgZmFjdG9yeSkge1xuICB0eXBlb2YgZXhwb3J0cyA9PT0gJ29iamVjdCcgJiYgdHlwZW9mIG1vZHVsZSAhPT0gJ3VuZGVmaW5lZCcgPyBmYWN0b3J5KGV4cG9ydHMpIDpcbiAgdHlwZW9mIGRlZmluZSA9PT0gJ2Z1bmN0aW9uJyAmJiBkZWZpbmUuYW1kID8gZGVmaW5lKFsnZXhwb3J0cyddLCBmYWN0b3J5KSA6XG4gIChmYWN0b3J5KChnbG9iYWwucmlvdCA9IGdsb2JhbC5yaW90IHx8IHt9KSkpO1xufSh0aGlzLCAoZnVuY3Rpb24gKGV4cG9ydHMpIHsgJ3VzZSBzdHJpY3QnO1xuXG52YXIgX19UQUdTX0NBQ0hFID0gW107XG52YXIgX19UQUdfSU1QTCA9IHt9O1xudmFyIEdMT0JBTF9NSVhJTiA9ICdfX2dsb2JhbF9taXhpbic7XG52YXIgUklPVF9QUkVGSVggPSAncmlvdC0nO1xudmFyIFJJT1RfVEFHX0lTID0gJ2RhdGEtaXMnO1xudmFyIFRfU1RSSU5HID0gJ3N0cmluZyc7XG52YXIgVF9PQkpFQ1QgPSAnb2JqZWN0JztcbnZhciBUX1VOREVGICA9ICd1bmRlZmluZWQnO1xudmFyIFRfRlVOQ1RJT04gPSAnZnVuY3Rpb24nO1xudmFyIFhMSU5LX05TID0gJ2h0dHA6Ly93d3cudzMub3JnLzE5OTkveGxpbmsnO1xudmFyIFhMSU5LX1JFR0VYID0gL154bGluazooXFx3KykvO1xudmFyIFdJTiA9IHR5cGVvZiB3aW5kb3cgPT09IFRfVU5ERUYgPyB1bmRlZmluZWQgOiB3aW5kb3c7XG52YXIgUkVfU1BFQ0lBTF9UQUdTID0gL14oPzp0KD86Ym9keXxoZWFkfGZvb3R8W3JoZF0pfGNhcHRpb258Y29sKD86Z3JvdXApP3xvcHQoPzppb258Z3JvdXApKSQvO1xudmFyIFJFX1NQRUNJQUxfVEFHU19OT19PUFRJT04gPSAvXig/OnQoPzpib2R5fGhlYWR8Zm9vdHxbcmhkXSl8Y2FwdGlvbnxjb2woPzpncm91cCk/KSQvO1xudmFyIFJFX1JFU0VSVkVEX05BTUVTID0gL14oPzpfKD86aXRlbXxpZHxwYXJlbnQpfHVwZGF0ZXxyb290fCg/OnVuKT9tb3VudHxtaXhpbnxpcyg/Ok1vdW50ZWR8TG9vcCl8dGFnc3xyZWZzfHBhcmVudHxvcHRzfHRyaWdnZXJ8byg/Om58ZmZ8bmUpKSQvO1xudmFyIFJFX1NWR19UQUdTID0gL14oYWx0R2x5cGh8YW5pbWF0ZSg/OkNvbG9yKT98Y2lyY2xlfGNsaXBQYXRofGRlZnN8ZWxsaXBzZXxmZSg/OkJsZW5kfENvbG9yTWF0cml4fENvbXBvbmVudFRyYW5zZmVyfENvbXBvc2l0ZXxDb252b2x2ZU1hdHJpeHxEaWZmdXNlTGlnaHRpbmd8RGlzcGxhY2VtZW50TWFwfEZsb29kfEdhdXNzaWFuQmx1cnxJbWFnZXxNZXJnZXxNb3JwaG9sb2d5fE9mZnNldHxTcGVjdWxhckxpZ2h0aW5nfFRpbGV8VHVyYnVsZW5jZSl8ZmlsdGVyfGZvbnR8Zm9yZWlnbk9iamVjdHxnKD86bHlwaCk/KD86UmVmKT98aW1hZ2V8bGluZSg/OmFyR3JhZGllbnQpP3xtYSg/OnJrZXJ8c2spfG1pc3NpbmctZ2x5cGh8cGF0aHxwYXR0ZXJufHBvbHkoPzpnb258bGluZSl8cmFkaWFsR3JhZGllbnR8cmVjdHxzdG9wfHN2Z3xzd2l0Y2h8c3ltYm9sfHRleHQoPzpQYXRoKT98dHJlZnx0c3Bhbnx1c2UpJC87XG52YXIgUkVfSFRNTF9BVFRSUyA9IC8oWy1cXHddKykgPz0gPyg/OlwiKFteXCJdKil8JyhbXiddKil8KHtbXn1dKn0pKS9nO1xudmFyIFJFX0JPT0xfQVRUUlMgPSAvXig/OmRpc2FibGVkfGNoZWNrZWR8cmVhZG9ubHl8cmVxdWlyZWR8YWxsb3dmdWxsc2NyZWVufGF1dG8oPzpmb2N1c3xwbGF5KXxjb21wYWN0fGNvbnRyb2xzfGRlZmF1bHR8Zm9ybW5vdmFsaWRhdGV8aGlkZGVufGlzbWFwfGl0ZW1zY29wZXxsb29wfG11bHRpcGxlfG11dGVkfG5vKD86cmVzaXplfHNoYWRlfHZhbGlkYXRlfHdyYXApP3xvcGVufHJldmVyc2VkfHNlYW1sZXNzfHNlbGVjdGVkfHNvcnRhYmxlfHRydWVzcGVlZHx0eXBlbXVzdG1hdGNoKSQvO1xudmFyIElFX1ZFUlNJT04gPSAoV0lOICYmIFdJTi5kb2N1bWVudCB8fCB7fSkuZG9jdW1lbnRNb2RlIHwgMDtcblxuLyoqXG4gKiBDaGVjayB3aGV0aGVyIGEgRE9NIG5vZGUgbXVzdCBiZSBjb25zaWRlcmVkIGEgcGFydCBvZiBhbiBzdmcgZG9jdW1lbnRcbiAqIEBwYXJhbSAgIHsgU3RyaW5nIH0gbmFtZSAtXG4gKiBAcmV0dXJucyB7IEJvb2xlYW4gfSAtXG4gKi9cbmZ1bmN0aW9uIGlzU1ZHVGFnKG5hbWUpIHtcbiAgcmV0dXJuIFJFX1NWR19UQUdTLnRlc3QobmFtZSlcbn1cblxuLyoqXG4gKiBDaGVjayBDaGVjayBpZiB0aGUgcGFzc2VkIGFyZ3VtZW50IGlzIHVuZGVmaW5lZFxuICogQHBhcmFtICAgeyBTdHJpbmcgfSB2YWx1ZSAtXG4gKiBAcmV0dXJucyB7IEJvb2xlYW4gfSAtXG4gKi9cbmZ1bmN0aW9uIGlzQm9vbEF0dHIodmFsdWUpIHtcbiAgcmV0dXJuIFJFX0JPT0xfQVRUUlMudGVzdCh2YWx1ZSlcbn1cblxuLyoqXG4gKiBDaGVjayBpZiBwYXNzZWQgYXJndW1lbnQgaXMgYSBmdW5jdGlvblxuICogQHBhcmFtICAgeyAqIH0gdmFsdWUgLVxuICogQHJldHVybnMgeyBCb29sZWFuIH0gLVxuICovXG5mdW5jdGlvbiBpc0Z1bmN0aW9uKHZhbHVlKSB7XG4gIHJldHVybiB0eXBlb2YgdmFsdWUgPT09IFRfRlVOQ1RJT04gfHwgZmFsc2UgLy8gYXZvaWQgSUUgcHJvYmxlbXNcbn1cblxuLyoqXG4gKiBDaGVjayBpZiBwYXNzZWQgYXJndW1lbnQgaXMgYW4gb2JqZWN0LCBleGNsdWRlIG51bGxcbiAqIE5PVEU6IHVzZSBpc09iamVjdCh4KSAmJiAhaXNBcnJheSh4KSB0byBleGNsdWRlcyBhcnJheXMuXG4gKiBAcGFyYW0gICB7ICogfSB2YWx1ZSAtXG4gKiBAcmV0dXJucyB7IEJvb2xlYW4gfSAtXG4gKi9cbmZ1bmN0aW9uIGlzT2JqZWN0KHZhbHVlKSB7XG4gIHJldHVybiB2YWx1ZSAmJiB0eXBlb2YgdmFsdWUgPT09IFRfT0JKRUNUIC8vIHR5cGVvZiBudWxsIGlzICdvYmplY3QnXG59XG5cbi8qKlxuICogQ2hlY2sgaWYgcGFzc2VkIGFyZ3VtZW50IGlzIHVuZGVmaW5lZFxuICogQHBhcmFtICAgeyAqIH0gdmFsdWUgLVxuICogQHJldHVybnMgeyBCb29sZWFuIH0gLVxuICovXG5mdW5jdGlvbiBpc1VuZGVmaW5lZCh2YWx1ZSkge1xuICByZXR1cm4gdHlwZW9mIHZhbHVlID09PSBUX1VOREVGXG59XG5cbi8qKlxuICogQ2hlY2sgaWYgcGFzc2VkIGFyZ3VtZW50IGlzIGEgc3RyaW5nXG4gKiBAcGFyYW0gICB7ICogfSB2YWx1ZSAtXG4gKiBAcmV0dXJucyB7IEJvb2xlYW4gfSAtXG4gKi9cbmZ1bmN0aW9uIGlzU3RyaW5nKHZhbHVlKSB7XG4gIHJldHVybiB0eXBlb2YgdmFsdWUgPT09IFRfU1RSSU5HXG59XG5cbi8qKlxuICogQ2hlY2sgaWYgcGFzc2VkIGFyZ3VtZW50IGlzIGVtcHR5LiBEaWZmZXJlbnQgZnJvbSBmYWxzeSwgYmVjYXVzZSB3ZSBkb250IGNvbnNpZGVyIDAgb3IgZmFsc2UgdG8gYmUgYmxhbmtcbiAqIEBwYXJhbSB7ICogfSB2YWx1ZSAtXG4gKiBAcmV0dXJucyB7IEJvb2xlYW4gfSAtXG4gKi9cbmZ1bmN0aW9uIGlzQmxhbmsodmFsdWUpIHtcbiAgcmV0dXJuIGlzVW5kZWZpbmVkKHZhbHVlKSB8fCB2YWx1ZSA9PT0gbnVsbCB8fCB2YWx1ZSA9PT0gJydcbn1cblxuLyoqXG4gKiBDaGVjayBpZiBwYXNzZWQgYXJndW1lbnQgaXMgYSBraW5kIG9mIGFycmF5XG4gKiBAcGFyYW0gICB7ICogfSB2YWx1ZSAtXG4gKiBAcmV0dXJucyB7IEJvb2xlYW4gfSAtXG4gKi9cbmZ1bmN0aW9uIGlzQXJyYXkodmFsdWUpIHtcbiAgcmV0dXJuIEFycmF5LmlzQXJyYXkodmFsdWUpIHx8IHZhbHVlIGluc3RhbmNlb2YgQXJyYXlcbn1cblxuLyoqXG4gKiBDaGVjayB3aGV0aGVyIG9iamVjdCdzIHByb3BlcnR5IGNvdWxkIGJlIG92ZXJyaWRkZW5cbiAqIEBwYXJhbSAgIHsgT2JqZWN0IH0gIG9iaiAtIHNvdXJjZSBvYmplY3RcbiAqIEBwYXJhbSAgIHsgU3RyaW5nIH0gIGtleSAtIG9iamVjdCBwcm9wZXJ0eVxuICogQHJldHVybnMgeyBCb29sZWFuIH0gLVxuICovXG5mdW5jdGlvbiBpc1dyaXRhYmxlKG9iaiwga2V5KSB7XG4gIHZhciBkZXNjcmlwdG9yID0gT2JqZWN0LmdldE93blByb3BlcnR5RGVzY3JpcHRvcihvYmosIGtleSk7XG4gIHJldHVybiBpc1VuZGVmaW5lZChvYmpba2V5XSkgfHwgZGVzY3JpcHRvciAmJiBkZXNjcmlwdG9yLndyaXRhYmxlXG59XG5cbi8qKlxuICogQ2hlY2sgaWYgcGFzc2VkIGFyZ3VtZW50IGlzIGEgcmVzZXJ2ZWQgbmFtZVxuICogQHBhcmFtICAgeyBTdHJpbmcgfSB2YWx1ZSAtXG4gKiBAcmV0dXJucyB7IEJvb2xlYW4gfSAtXG4gKi9cbmZ1bmN0aW9uIGlzUmVzZXJ2ZWROYW1lKHZhbHVlKSB7XG4gIHJldHVybiBSRV9SRVNFUlZFRF9OQU1FUy50ZXN0KHZhbHVlKVxufVxuXG52YXIgY2hlY2sgPSBPYmplY3QuZnJlZXplKHtcblx0aXNTVkdUYWc6IGlzU1ZHVGFnLFxuXHRpc0Jvb2xBdHRyOiBpc0Jvb2xBdHRyLFxuXHRpc0Z1bmN0aW9uOiBpc0Z1bmN0aW9uLFxuXHRpc09iamVjdDogaXNPYmplY3QsXG5cdGlzVW5kZWZpbmVkOiBpc1VuZGVmaW5lZCxcblx0aXNTdHJpbmc6IGlzU3RyaW5nLFxuXHRpc0JsYW5rOiBpc0JsYW5rLFxuXHRpc0FycmF5OiBpc0FycmF5LFxuXHRpc1dyaXRhYmxlOiBpc1dyaXRhYmxlLFxuXHRpc1Jlc2VydmVkTmFtZTogaXNSZXNlcnZlZE5hbWVcbn0pO1xuXG4vKipcbiAqIFNob3J0ZXIgYW5kIGZhc3Qgd2F5IHRvIHNlbGVjdCBtdWx0aXBsZSBub2RlcyBpbiB0aGUgRE9NXG4gKiBAcGFyYW0gICB7IFN0cmluZyB9IHNlbGVjdG9yIC0gRE9NIHNlbGVjdG9yXG4gKiBAcGFyYW0gICB7IE9iamVjdCB9IGN0eCAtIERPTSBub2RlIHdoZXJlIHRoZSB0YXJnZXRzIG9mIG91ciBzZWFyY2ggd2lsbCBpcyBsb2NhdGVkXG4gKiBAcmV0dXJucyB7IE9iamVjdCB9IGRvbSBub2RlcyBmb3VuZFxuICovXG5mdW5jdGlvbiAkJChzZWxlY3RvciwgY3R4KSB7XG4gIHJldHVybiAoY3R4IHx8IGRvY3VtZW50KS5xdWVyeVNlbGVjdG9yQWxsKHNlbGVjdG9yKVxufVxuXG4vKipcbiAqIFNob3J0ZXIgYW5kIGZhc3Qgd2F5IHRvIHNlbGVjdCBhIHNpbmdsZSBub2RlIGluIHRoZSBET01cbiAqIEBwYXJhbSAgIHsgU3RyaW5nIH0gc2VsZWN0b3IgLSB1bmlxdWUgZG9tIHNlbGVjdG9yXG4gKiBAcGFyYW0gICB7IE9iamVjdCB9IGN0eCAtIERPTSBub2RlIHdoZXJlIHRoZSB0YXJnZXQgb2Ygb3VyIHNlYXJjaCB3aWxsIGlzIGxvY2F0ZWRcbiAqIEByZXR1cm5zIHsgT2JqZWN0IH0gZG9tIG5vZGUgZm91bmRcbiAqL1xuZnVuY3Rpb24gJChzZWxlY3RvciwgY3R4KSB7XG4gIHJldHVybiAoY3R4IHx8IGRvY3VtZW50KS5xdWVyeVNlbGVjdG9yKHNlbGVjdG9yKVxufVxuXG4vKipcbiAqIENyZWF0ZSBhIGRvY3VtZW50IGZyYWdtZW50XG4gKiBAcmV0dXJucyB7IE9iamVjdCB9IGRvY3VtZW50IGZyYWdtZW50XG4gKi9cbmZ1bmN0aW9uIGNyZWF0ZUZyYWcoKSB7XG4gIHJldHVybiBkb2N1bWVudC5jcmVhdGVEb2N1bWVudEZyYWdtZW50KClcbn1cblxuLyoqXG4gKiBDcmVhdGUgYSBkb2N1bWVudCB0ZXh0IG5vZGVcbiAqIEByZXR1cm5zIHsgT2JqZWN0IH0gY3JlYXRlIGEgdGV4dCBub2RlIHRvIHVzZSBhcyBwbGFjZWhvbGRlclxuICovXG5mdW5jdGlvbiBjcmVhdGVET01QbGFjZWhvbGRlcigpIHtcbiAgcmV0dXJuIGRvY3VtZW50LmNyZWF0ZVRleHROb2RlKCcnKVxufVxuXG4vKipcbiAqIENyZWF0ZSBhIGdlbmVyaWMgRE9NIG5vZGVcbiAqIEBwYXJhbSAgIHsgU3RyaW5nIH0gbmFtZSAtIG5hbWUgb2YgdGhlIERPTSBub2RlIHdlIHdhbnQgdG8gY3JlYXRlXG4gKiBAcGFyYW0gICB7IEJvb2xlYW4gfSBpc1N2ZyAtIHNob3VsZCB3ZSB1c2UgYSBTVkcgYXMgcGFyZW50IG5vZGU/XG4gKiBAcmV0dXJucyB7IE9iamVjdCB9IERPTSBub2RlIGp1c3QgY3JlYXRlZFxuICovXG5mdW5jdGlvbiBta0VsKG5hbWUsIGlzU3ZnKSB7XG4gIHJldHVybiBpc1N2ZyA/XG4gICAgZG9jdW1lbnQuY3JlYXRlRWxlbWVudE5TKCdodHRwOi8vd3d3LnczLm9yZy8yMDAwL3N2ZycsICdzdmcnKSA6XG4gICAgZG9jdW1lbnQuY3JlYXRlRWxlbWVudChuYW1lKVxufVxuXG4vKipcbiAqIEdldCB0aGUgb3V0ZXIgaHRtbCBvZiBhbnkgRE9NIG5vZGUgU1ZHcyBpbmNsdWRlZFxuICogQHBhcmFtICAgeyBPYmplY3QgfSBlbCAtIERPTSBub2RlIHRvIHBhcnNlXG4gKiBAcmV0dXJucyB7IFN0cmluZyB9IGVsLm91dGVySFRNTFxuICovXG5mdW5jdGlvbiBnZXRPdXRlckhUTUwoZWwpIHtcbiAgaWYgKGVsLm91dGVySFRNTClcbiAgICB7IHJldHVybiBlbC5vdXRlckhUTUwgfVxuICAvLyBzb21lIGJyb3dzZXJzIGRvIG5vdCBzdXBwb3J0IG91dGVySFRNTCBvbiB0aGUgU1ZHcyB0YWdzXG4gIGVsc2Uge1xuICAgIHZhciBjb250YWluZXIgPSBta0VsKCdkaXYnKTtcbiAgICBjb250YWluZXIuYXBwZW5kQ2hpbGQoZWwuY2xvbmVOb2RlKHRydWUpKTtcbiAgICByZXR1cm4gY29udGFpbmVyLmlubmVySFRNTFxuICB9XG59XG5cbi8qKlxuICogU2V0IHRoZSBpbm5lciBodG1sIG9mIGFueSBET00gbm9kZSBTVkdzIGluY2x1ZGVkXG4gKiBAcGFyYW0geyBPYmplY3QgfSBjb250YWluZXIgLSBET00gbm9kZSB3aGVyZSB3ZSdsbCBpbmplY3QgbmV3IGh0bWxcbiAqIEBwYXJhbSB7IFN0cmluZyB9IGh0bWwgLSBodG1sIHRvIGluamVjdFxuICovXG5mdW5jdGlvbiBzZXRJbm5lckhUTUwoY29udGFpbmVyLCBodG1sKSB7XG4gIGlmICghaXNVbmRlZmluZWQoY29udGFpbmVyLmlubmVySFRNTCkpXG4gICAgeyBjb250YWluZXIuaW5uZXJIVE1MID0gaHRtbDsgfVxuICAgIC8vIHNvbWUgYnJvd3NlcnMgZG8gbm90IHN1cHBvcnQgaW5uZXJIVE1MIG9uIHRoZSBTVkdzIHRhZ3NcbiAgZWxzZSB7XG4gICAgdmFyIGRvYyA9IG5ldyBET01QYXJzZXIoKS5wYXJzZUZyb21TdHJpbmcoaHRtbCwgJ2FwcGxpY2F0aW9uL3htbCcpO1xuICAgIHZhciBub2RlID0gY29udGFpbmVyLm93bmVyRG9jdW1lbnQuaW1wb3J0Tm9kZShkb2MuZG9jdW1lbnRFbGVtZW50LCB0cnVlKTtcbiAgICBjb250YWluZXIuYXBwZW5kQ2hpbGQobm9kZSk7XG4gIH1cbn1cblxuLyoqXG4gKiBSZW1vdmUgYW55IERPTSBhdHRyaWJ1dGUgZnJvbSBhIG5vZGVcbiAqIEBwYXJhbSAgIHsgT2JqZWN0IH0gZG9tIC0gRE9NIG5vZGUgd2Ugd2FudCB0byB1cGRhdGVcbiAqIEBwYXJhbSAgIHsgU3RyaW5nIH0gbmFtZSAtIG5hbWUgb2YgdGhlIHByb3BlcnR5IHdlIHdhbnQgdG8gcmVtb3ZlXG4gKi9cbmZ1bmN0aW9uIHJlbUF0dHIoZG9tLCBuYW1lKSB7XG4gIGRvbS5yZW1vdmVBdHRyaWJ1dGUobmFtZSk7XG59XG5cbi8qKlxuICogR2V0IHRoZSB2YWx1ZSBvZiBhbnkgRE9NIGF0dHJpYnV0ZSBvbiBhIG5vZGVcbiAqIEBwYXJhbSAgIHsgT2JqZWN0IH0gZG9tIC0gRE9NIG5vZGUgd2Ugd2FudCB0byBwYXJzZVxuICogQHBhcmFtICAgeyBTdHJpbmcgfSBuYW1lIC0gbmFtZSBvZiB0aGUgYXR0cmlidXRlIHdlIHdhbnQgdG8gZ2V0XG4gKiBAcmV0dXJucyB7IFN0cmluZyB8IHVuZGVmaW5lZCB9IG5hbWUgb2YgdGhlIG5vZGUgYXR0cmlidXRlIHdoZXRoZXIgaXQgZXhpc3RzXG4gKi9cbmZ1bmN0aW9uIGdldEF0dHIoZG9tLCBuYW1lKSB7XG4gIHJldHVybiBkb20uZ2V0QXR0cmlidXRlKG5hbWUpXG59XG5cbi8qKlxuICogU2V0IGFueSBET00gYXR0cmlidXRlXG4gKiBAcGFyYW0geyBPYmplY3QgfSBkb20gLSBET00gbm9kZSB3ZSB3YW50IHRvIHVwZGF0ZVxuICogQHBhcmFtIHsgU3RyaW5nIH0gbmFtZSAtIG5hbWUgb2YgdGhlIHByb3BlcnR5IHdlIHdhbnQgdG8gc2V0XG4gKiBAcGFyYW0geyBTdHJpbmcgfSB2YWwgLSB2YWx1ZSBvZiB0aGUgcHJvcGVydHkgd2Ugd2FudCB0byBzZXRcbiAqL1xuZnVuY3Rpb24gc2V0QXR0cihkb20sIG5hbWUsIHZhbCkge1xuICB2YXIgeGxpbmsgPSBYTElOS19SRUdFWC5leGVjKG5hbWUpO1xuICBpZiAoeGxpbmsgJiYgeGxpbmtbMV0pXG4gICAgeyBkb20uc2V0QXR0cmlidXRlTlMoWExJTktfTlMsIHhsaW5rWzFdLCB2YWwpOyB9XG4gIGVsc2VcbiAgICB7IGRvbS5zZXRBdHRyaWJ1dGUobmFtZSwgdmFsKTsgfVxufVxuXG4vKipcbiAqIEluc2VydCBzYWZlbHkgYSB0YWcgdG8gZml4ICMxOTYyICMxNjQ5XG4gKiBAcGFyYW0gICB7IEhUTUxFbGVtZW50IH0gcm9vdCAtIGNoaWxkcmVuIGNvbnRhaW5lclxuICogQHBhcmFtICAgeyBIVE1MRWxlbWVudCB9IGN1cnIgLSBub2RlIHRvIGluc2VydFxuICogQHBhcmFtICAgeyBIVE1MRWxlbWVudCB9IG5leHQgLSBub2RlIHRoYXQgc2hvdWxkIHByZWNlZWQgdGhlIGN1cnJlbnQgbm9kZSBpbnNlcnRlZFxuICovXG5mdW5jdGlvbiBzYWZlSW5zZXJ0KHJvb3QsIGN1cnIsIG5leHQpIHtcbiAgcm9vdC5pbnNlcnRCZWZvcmUoY3VyciwgbmV4dC5wYXJlbnROb2RlICYmIG5leHQpO1xufVxuXG4vKipcbiAqIE1pbmltaXplIHJpc2s6IG9ubHkgemVybyBvciBvbmUgX3NwYWNlXyBiZXR3ZWVuIGF0dHIgJiB2YWx1ZVxuICogQHBhcmFtICAgeyBTdHJpbmcgfSAgIGh0bWwgLSBodG1sIHN0cmluZyB3ZSB3YW50IHRvIHBhcnNlXG4gKiBAcGFyYW0gICB7IEZ1bmN0aW9uIH0gZm4gLSBjYWxsYmFjayBmdW5jdGlvbiB0byBhcHBseSBvbiBhbnkgYXR0cmlidXRlIGZvdW5kXG4gKi9cbmZ1bmN0aW9uIHdhbGtBdHRycyhodG1sLCBmbikge1xuICBpZiAoIWh0bWwpXG4gICAgeyByZXR1cm4gfVxuICB2YXIgbTtcbiAgd2hpbGUgKG0gPSBSRV9IVE1MX0FUVFJTLmV4ZWMoaHRtbCkpXG4gICAgeyBmbihtWzFdLnRvTG93ZXJDYXNlKCksIG1bMl0gfHwgbVszXSB8fCBtWzRdKTsgfVxufVxuXG4vKipcbiAqIFdhbGsgZG93biByZWN1cnNpdmVseSBhbGwgdGhlIGNoaWxkcmVuIHRhZ3Mgc3RhcnRpbmcgZG9tIG5vZGVcbiAqIEBwYXJhbSAgIHsgT2JqZWN0IH0gICBkb20gLSBzdGFydGluZyBub2RlIHdoZXJlIHdlIHdpbGwgc3RhcnQgdGhlIHJlY3Vyc2lvblxuICogQHBhcmFtICAgeyBGdW5jdGlvbiB9IGZuIC0gY2FsbGJhY2sgdG8gdHJhbnNmb3JtIHRoZSBjaGlsZCBub2RlIGp1c3QgZm91bmRcbiAqIEBwYXJhbSAgIHsgT2JqZWN0IH0gICBjb250ZXh0IC0gZm4gY2FuIG9wdGlvbmFsbHkgcmV0dXJuIGFuIG9iamVjdCwgd2hpY2ggaXMgcGFzc2VkIHRvIGNoaWxkcmVuXG4gKi9cbmZ1bmN0aW9uIHdhbGtOb2Rlcyhkb20sIGZuLCBjb250ZXh0KSB7XG4gIGlmIChkb20pIHtcbiAgICB2YXIgcmVzID0gZm4oZG9tLCBjb250ZXh0KTtcbiAgICB2YXIgbmV4dDtcbiAgICAvLyBzdG9wIHRoZSByZWN1cnNpb25cbiAgICBpZiAocmVzID09PSBmYWxzZSkgeyByZXR1cm4gfVxuXG4gICAgZG9tID0gZG9tLmZpcnN0Q2hpbGQ7XG5cbiAgICB3aGlsZSAoZG9tKSB7XG4gICAgICBuZXh0ID0gZG9tLm5leHRTaWJsaW5nO1xuICAgICAgd2Fsa05vZGVzKGRvbSwgZm4sIHJlcyk7XG4gICAgICBkb20gPSBuZXh0O1xuICAgIH1cbiAgfVxufVxuXG52YXIgZG9tID0gT2JqZWN0LmZyZWV6ZSh7XG5cdCQkOiAkJCxcblx0JDogJCxcblx0Y3JlYXRlRnJhZzogY3JlYXRlRnJhZyxcblx0Y3JlYXRlRE9NUGxhY2Vob2xkZXI6IGNyZWF0ZURPTVBsYWNlaG9sZGVyLFxuXHRta0VsOiBta0VsLFxuXHRnZXRPdXRlckhUTUw6IGdldE91dGVySFRNTCxcblx0c2V0SW5uZXJIVE1MOiBzZXRJbm5lckhUTUwsXG5cdHJlbUF0dHI6IHJlbUF0dHIsXG5cdGdldEF0dHI6IGdldEF0dHIsXG5cdHNldEF0dHI6IHNldEF0dHIsXG5cdHNhZmVJbnNlcnQ6IHNhZmVJbnNlcnQsXG5cdHdhbGtBdHRyczogd2Fsa0F0dHJzLFxuXHR3YWxrTm9kZXM6IHdhbGtOb2Rlc1xufSk7XG5cbnZhciBzdHlsZU5vZGU7XG52YXIgY3NzVGV4dFByb3A7XG52YXIgYnlOYW1lID0ge307XG52YXIgcmVtYWluZGVyID0gW107XG5cbi8vIHNraXAgdGhlIGZvbGxvd2luZyBjb2RlIG9uIHRoZSBzZXJ2ZXJcbmlmIChXSU4pIHtcbiAgc3R5bGVOb2RlID0gKGZ1bmN0aW9uICgpIHtcbiAgICAvLyBjcmVhdGUgYSBuZXcgc3R5bGUgZWxlbWVudCB3aXRoIHRoZSBjb3JyZWN0IHR5cGVcbiAgICB2YXIgbmV3Tm9kZSA9IG1rRWwoJ3N0eWxlJyk7XG4gICAgc2V0QXR0cihuZXdOb2RlLCAndHlwZScsICd0ZXh0L2NzcycpO1xuXG4gICAgLy8gcmVwbGFjZSBhbnkgdXNlciBub2RlIG9yIGluc2VydCB0aGUgbmV3IG9uZSBpbnRvIHRoZSBoZWFkXG4gICAgdmFyIHVzZXJOb2RlID0gJCgnc3R5bGVbdHlwZT1yaW90XScpO1xuICAgIGlmICh1c2VyTm9kZSkge1xuICAgICAgaWYgKHVzZXJOb2RlLmlkKSB7IG5ld05vZGUuaWQgPSB1c2VyTm9kZS5pZDsgfVxuICAgICAgdXNlck5vZGUucGFyZW50Tm9kZS5yZXBsYWNlQ2hpbGQobmV3Tm9kZSwgdXNlck5vZGUpO1xuICAgIH1cbiAgICBlbHNlIHsgZG9jdW1lbnQuZ2V0RWxlbWVudHNCeVRhZ05hbWUoJ2hlYWQnKVswXS5hcHBlbmRDaGlsZChuZXdOb2RlKTsgfVxuXG4gICAgcmV0dXJuIG5ld05vZGVcbiAgfSkoKTtcbiAgY3NzVGV4dFByb3AgPSBzdHlsZU5vZGUuc3R5bGVTaGVldDtcbn1cblxuLyoqXG4gKiBPYmplY3QgdGhhdCB3aWxsIGJlIHVzZWQgdG8gaW5qZWN0IGFuZCBtYW5hZ2UgdGhlIGNzcyBvZiBldmVyeSB0YWcgaW5zdGFuY2VcbiAqL1xudmFyIHN0eWxlTWFuYWdlciA9IHtcbiAgc3R5bGVOb2RlOiBzdHlsZU5vZGUsXG4gIC8qKlxuICAgKiBTYXZlIGEgdGFnIHN0eWxlIHRvIGJlIGxhdGVyIGluamVjdGVkIGludG8gRE9NXG4gICAqIEBwYXJhbSB7IFN0cmluZyB9IGNzcyAtIGNzcyBzdHJpbmdcbiAgICogQHBhcmFtIHsgU3RyaW5nIH0gbmFtZSAtIGlmIGl0J3MgcGFzc2VkIHdlIHdpbGwgbWFwIHRoZSBjc3MgdG8gYSB0YWduYW1lXG4gICAqL1xuICBhZGQ6IGZ1bmN0aW9uIGFkZChjc3MsIG5hbWUpIHtcbiAgICBpZiAobmFtZSkgeyBieU5hbWVbbmFtZV0gPSBjc3M7IH1cbiAgICBlbHNlIHsgcmVtYWluZGVyLnB1c2goY3NzKTsgfVxuICB9LFxuICAvKipcbiAgICogSW5qZWN0IGFsbCBwcmV2aW91c2x5IHNhdmVkIHRhZyBzdHlsZXMgaW50byBET01cbiAgICogaW5uZXJIVE1MIHNlZW1zIHNsb3c6IGh0dHA6Ly9qc3BlcmYuY29tL3Jpb3QtaW5zZXJ0LXN0eWxlXG4gICAqL1xuICBpbmplY3Q6IGZ1bmN0aW9uIGluamVjdCgpIHtcbiAgICBpZiAoIVdJTikgeyByZXR1cm4gfVxuICAgIHZhciBzdHlsZSA9IE9iamVjdC5rZXlzKGJ5TmFtZSlcbiAgICAgIC5tYXAoZnVuY3Rpb24oaykgeyByZXR1cm4gYnlOYW1lW2tdIH0pXG4gICAgICAuY29uY2F0KHJlbWFpbmRlcikuam9pbignXFxuJyk7XG4gICAgaWYgKGNzc1RleHRQcm9wKSB7IGNzc1RleHRQcm9wLmNzc1RleHQgPSBzdHlsZTsgfVxuICAgIGVsc2UgeyBzdHlsZU5vZGUuaW5uZXJIVE1MID0gc3R5bGU7IH1cbiAgfVxufTtcblxuLyoqXG4gKiBUaGUgcmlvdCB0ZW1wbGF0ZSBlbmdpbmVcbiAqIEB2ZXJzaW9uIHYzLjAuMFxuICovXG4vKipcbiAqIHJpb3QudXRpbC5icmFja2V0c1xuICpcbiAqIC0gYGJyYWNrZXRzICAgIGAgLSBSZXR1cm5zIGEgc3RyaW5nIG9yIHJlZ2V4IGJhc2VkIG9uIGl0cyBwYXJhbWV0ZXJcbiAqIC0gYGJyYWNrZXRzLnNldGAgLSBDaGFuZ2UgdGhlIGN1cnJlbnQgcmlvdCBicmFja2V0c1xuICpcbiAqIEBtb2R1bGVcbiAqL1xuXG4vKiBnbG9iYWwgcmlvdCAqL1xuXG52YXIgYnJhY2tldHMgPSAoZnVuY3Rpb24gKFVOREVGKSB7XG5cbiAgdmFyXG4gICAgUkVHTE9CID0gJ2cnLFxuXG4gICAgUl9NTENPTU1TID0gL1xcL1xcKlteKl0qXFwqKyg/OlteKlxcL11bXipdKlxcKispKlxcLy9nLFxuXG4gICAgUl9TVFJJTkdTID0gL1wiW15cIlxcXFxdKig/OlxcXFxbXFxTXFxzXVteXCJcXFxcXSopKlwifCdbXidcXFxcXSooPzpcXFxcW1xcU1xcc11bXidcXFxcXSopKicvZyxcblxuICAgIFNfUUJMT0NLUyA9IFJfU1RSSU5HUy5zb3VyY2UgKyAnfCcgK1xuICAgICAgLyg/OlxcYnJldHVyblxccyt8KD86WyRcXHdcXClcXF1dfFxcK1xcK3wtLSlcXHMqKFxcLykoPyFbKlxcL10pKS8uc291cmNlICsgJ3wnICtcbiAgICAgIC9cXC8oPz1bXipcXC9dKVteW1xcL1xcXFxdKig/Oig/OlxcWyg/OlxcXFwufFteXFxdXFxcXF0qKSpcXF18XFxcXC4pW15bXFwvXFxcXF0qKSo/KFxcLylbZ2ltXSovLnNvdXJjZSxcblxuICAgIFVOU1VQUE9SVEVEID0gUmVnRXhwKCdbXFxcXCcgKyAneDAwLVxcXFx4MUY8PmEtekEtWjAtOVxcJ1wiLDtcXFxcXFxcXF0nKSxcblxuICAgIE5FRURfRVNDQVBFID0gLyg/PVtbXFxdKCkqKz8uXiR8XSkvZyxcblxuICAgIEZJTkRCUkFDRVMgPSB7XG4gICAgICAnKCc6IFJlZ0V4cCgnKFsoKV0pfCcgICArIFNfUUJMT0NLUywgUkVHTE9CKSxcbiAgICAgICdbJzogUmVnRXhwKCcoW1tcXFxcXV0pfCcgKyBTX1FCTE9DS1MsIFJFR0xPQiksXG4gICAgICAneyc6IFJlZ0V4cCgnKFt7fV0pfCcgICArIFNfUUJMT0NLUywgUkVHTE9CKVxuICAgIH0sXG5cbiAgICBERUZBVUxUID0gJ3sgfSc7XG5cbiAgdmFyIF9wYWlycyA9IFtcbiAgICAneycsICd9JyxcbiAgICAneycsICd9JyxcbiAgICAve1tefV0qfS8sXG4gICAgL1xcXFwoW3t9XSkvZyxcbiAgICAvXFxcXCh7KXx7L2csXG4gICAgUmVnRXhwKCdcXFxcXFxcXCh9KXwoW1soe10pfCh9KXwnICsgU19RQkxPQ0tTLCBSRUdMT0IpLFxuICAgIERFRkFVTFQsXG4gICAgL15cXHMqe1xcXj9cXHMqKFskXFx3XSspKD86XFxzKixcXHMqKFxcUyspKT9cXHMraW5cXHMrKFxcUy4qKVxccyp9LyxcbiAgICAvKF58W15cXFxcXSl7PVtcXFNcXHNdKj99L1xuICBdO1xuXG4gIHZhclxuICAgIGNhY2hlZEJyYWNrZXRzID0gVU5ERUYsXG4gICAgX3JlZ2V4LFxuICAgIF9jYWNoZSA9IFtdLFxuICAgIF9zZXR0aW5ncztcblxuICBmdW5jdGlvbiBfbG9vcGJhY2sgKHJlKSB7IHJldHVybiByZSB9XG5cbiAgZnVuY3Rpb24gX3Jld3JpdGUgKHJlLCBicCkge1xuICAgIGlmICghYnApIHsgYnAgPSBfY2FjaGU7IH1cbiAgICByZXR1cm4gbmV3IFJlZ0V4cChcbiAgICAgIHJlLnNvdXJjZS5yZXBsYWNlKC97L2csIGJwWzJdKS5yZXBsYWNlKC99L2csIGJwWzNdKSwgcmUuZ2xvYmFsID8gUkVHTE9CIDogJydcbiAgICApXG4gIH1cblxuICBmdW5jdGlvbiBfY3JlYXRlIChwYWlyKSB7XG4gICAgaWYgKHBhaXIgPT09IERFRkFVTFQpIHsgcmV0dXJuIF9wYWlycyB9XG5cbiAgICB2YXIgYXJyID0gcGFpci5zcGxpdCgnICcpO1xuXG4gICAgaWYgKGFyci5sZW5ndGggIT09IDIgfHwgVU5TVVBQT1JURUQudGVzdChwYWlyKSkge1xuICAgICAgdGhyb3cgbmV3IEVycm9yKCdVbnN1cHBvcnRlZCBicmFja2V0cyBcIicgKyBwYWlyICsgJ1wiJylcbiAgICB9XG4gICAgYXJyID0gYXJyLmNvbmNhdChwYWlyLnJlcGxhY2UoTkVFRF9FU0NBUEUsICdcXFxcJykuc3BsaXQoJyAnKSk7XG5cbiAgICBhcnJbNF0gPSBfcmV3cml0ZShhcnJbMV0ubGVuZ3RoID4gMSA/IC97W1xcU1xcc10qP30vIDogX3BhaXJzWzRdLCBhcnIpO1xuICAgIGFycls1XSA9IF9yZXdyaXRlKHBhaXIubGVuZ3RoID4gMyA/IC9cXFxcKHt8fSkvZyA6IF9wYWlyc1s1XSwgYXJyKTtcbiAgICBhcnJbNl0gPSBfcmV3cml0ZShfcGFpcnNbNl0sIGFycik7XG4gICAgYXJyWzddID0gUmVnRXhwKCdcXFxcXFxcXCgnICsgYXJyWzNdICsgJyl8KFtbKHtdKXwoJyArIGFyclszXSArICcpfCcgKyBTX1FCTE9DS1MsIFJFR0xPQik7XG4gICAgYXJyWzhdID0gcGFpcjtcbiAgICByZXR1cm4gYXJyXG4gIH1cblxuICBmdW5jdGlvbiBfYnJhY2tldHMgKHJlT3JJZHgpIHtcbiAgICByZXR1cm4gcmVPcklkeCBpbnN0YW5jZW9mIFJlZ0V4cCA/IF9yZWdleChyZU9ySWR4KSA6IF9jYWNoZVtyZU9ySWR4XVxuICB9XG5cbiAgX2JyYWNrZXRzLnNwbGl0ID0gZnVuY3Rpb24gc3BsaXQgKHN0ciwgdG1wbCwgX2JwKSB7XG4gICAgLy8gaXN0YW5idWwgaWdub3JlIG5leHQ6IF9icCBpcyBmb3IgdGhlIGNvbXBpbGVyXG4gICAgaWYgKCFfYnApIHsgX2JwID0gX2NhY2hlOyB9XG5cbiAgICB2YXJcbiAgICAgIHBhcnRzID0gW10sXG4gICAgICBtYXRjaCxcbiAgICAgIGlzZXhwcixcbiAgICAgIHN0YXJ0LFxuICAgICAgcG9zLFxuICAgICAgcmUgPSBfYnBbNl07XG5cbiAgICBpc2V4cHIgPSBzdGFydCA9IHJlLmxhc3RJbmRleCA9IDA7XG5cbiAgICB3aGlsZSAoKG1hdGNoID0gcmUuZXhlYyhzdHIpKSkge1xuXG4gICAgICBwb3MgPSBtYXRjaC5pbmRleDtcblxuICAgICAgaWYgKGlzZXhwcikge1xuXG4gICAgICAgIGlmIChtYXRjaFsyXSkge1xuICAgICAgICAgIHJlLmxhc3RJbmRleCA9IHNraXBCcmFjZXMoc3RyLCBtYXRjaFsyXSwgcmUubGFzdEluZGV4KTtcbiAgICAgICAgICBjb250aW51ZVxuICAgICAgICB9XG4gICAgICAgIGlmICghbWF0Y2hbM10pIHtcbiAgICAgICAgICBjb250aW51ZVxuICAgICAgICB9XG4gICAgICB9XG5cbiAgICAgIGlmICghbWF0Y2hbMV0pIHtcbiAgICAgICAgdW5lc2NhcGVTdHIoc3RyLnNsaWNlKHN0YXJ0LCBwb3MpKTtcbiAgICAgICAgc3RhcnQgPSByZS5sYXN0SW5kZXg7XG4gICAgICAgIHJlID0gX2JwWzYgKyAoaXNleHByIF49IDEpXTtcbiAgICAgICAgcmUubGFzdEluZGV4ID0gc3RhcnQ7XG4gICAgICB9XG4gICAgfVxuXG4gICAgaWYgKHN0ciAmJiBzdGFydCA8IHN0ci5sZW5ndGgpIHtcbiAgICAgIHVuZXNjYXBlU3RyKHN0ci5zbGljZShzdGFydCkpO1xuICAgIH1cblxuICAgIHJldHVybiBwYXJ0c1xuXG4gICAgZnVuY3Rpb24gdW5lc2NhcGVTdHIgKHMpIHtcbiAgICAgIGlmICh0bXBsIHx8IGlzZXhwcikge1xuICAgICAgICBwYXJ0cy5wdXNoKHMgJiYgcy5yZXBsYWNlKF9icFs1XSwgJyQxJykpO1xuICAgICAgfSBlbHNlIHtcbiAgICAgICAgcGFydHMucHVzaChzKTtcbiAgICAgIH1cbiAgICB9XG5cbiAgICBmdW5jdGlvbiBza2lwQnJhY2VzIChzLCBjaCwgaXgpIHtcbiAgICAgIHZhclxuICAgICAgICBtYXRjaCxcbiAgICAgICAgcmVjY2ggPSBGSU5EQlJBQ0VTW2NoXTtcblxuICAgICAgcmVjY2gubGFzdEluZGV4ID0gaXg7XG4gICAgICBpeCA9IDE7XG4gICAgICB3aGlsZSAoKG1hdGNoID0gcmVjY2guZXhlYyhzKSkpIHtcbiAgICAgICAgaWYgKG1hdGNoWzFdICYmXG4gICAgICAgICAgIShtYXRjaFsxXSA9PT0gY2ggPyArK2l4IDogLS1peCkpIHsgYnJlYWsgfVxuICAgICAgfVxuICAgICAgcmV0dXJuIGl4ID8gcy5sZW5ndGggOiByZWNjaC5sYXN0SW5kZXhcbiAgICB9XG4gIH07XG5cbiAgX2JyYWNrZXRzLmhhc0V4cHIgPSBmdW5jdGlvbiBoYXNFeHByIChzdHIpIHtcbiAgICByZXR1cm4gX2NhY2hlWzRdLnRlc3Qoc3RyKVxuICB9O1xuXG4gIF9icmFja2V0cy5sb29wS2V5cyA9IGZ1bmN0aW9uIGxvb3BLZXlzIChleHByKSB7XG4gICAgdmFyIG0gPSBleHByLm1hdGNoKF9jYWNoZVs5XSk7XG5cbiAgICByZXR1cm4gbVxuICAgICAgPyB7IGtleTogbVsxXSwgcG9zOiBtWzJdLCB2YWw6IF9jYWNoZVswXSArIG1bM10udHJpbSgpICsgX2NhY2hlWzFdIH1cbiAgICAgIDogeyB2YWw6IGV4cHIudHJpbSgpIH1cbiAgfTtcblxuICBfYnJhY2tldHMuYXJyYXkgPSBmdW5jdGlvbiBhcnJheSAocGFpcikge1xuICAgIHJldHVybiBwYWlyID8gX2NyZWF0ZShwYWlyKSA6IF9jYWNoZVxuICB9O1xuXG4gIGZ1bmN0aW9uIF9yZXNldCAocGFpcikge1xuICAgIGlmICgocGFpciB8fCAocGFpciA9IERFRkFVTFQpKSAhPT0gX2NhY2hlWzhdKSB7XG4gICAgICBfY2FjaGUgPSBfY3JlYXRlKHBhaXIpO1xuICAgICAgX3JlZ2V4ID0gcGFpciA9PT0gREVGQVVMVCA/IF9sb29wYmFjayA6IF9yZXdyaXRlO1xuICAgICAgX2NhY2hlWzldID0gX3JlZ2V4KF9wYWlyc1s5XSk7XG4gICAgfVxuICAgIGNhY2hlZEJyYWNrZXRzID0gcGFpcjtcbiAgfVxuXG4gIGZ1bmN0aW9uIF9zZXRTZXR0aW5ncyAobykge1xuICAgIHZhciBiO1xuXG4gICAgbyA9IG8gfHwge307XG4gICAgYiA9IG8uYnJhY2tldHM7XG4gICAgT2JqZWN0LmRlZmluZVByb3BlcnR5KG8sICdicmFja2V0cycsIHtcbiAgICAgIHNldDogX3Jlc2V0LFxuICAgICAgZ2V0OiBmdW5jdGlvbiAoKSB7IHJldHVybiBjYWNoZWRCcmFja2V0cyB9LFxuICAgICAgZW51bWVyYWJsZTogdHJ1ZVxuICAgIH0pO1xuICAgIF9zZXR0aW5ncyA9IG87XG4gICAgX3Jlc2V0KGIpO1xuICB9XG5cbiAgT2JqZWN0LmRlZmluZVByb3BlcnR5KF9icmFja2V0cywgJ3NldHRpbmdzJywge1xuICAgIHNldDogX3NldFNldHRpbmdzLFxuICAgIGdldDogZnVuY3Rpb24gKCkgeyByZXR1cm4gX3NldHRpbmdzIH1cbiAgfSk7XG5cbiAgLyogaXN0YW5idWwgaWdub3JlIG5leHQ6IGluIHRoZSBicm93c2VyIHJpb3QgaXMgYWx3YXlzIGluIHRoZSBzY29wZSAqL1xuICBfYnJhY2tldHMuc2V0dGluZ3MgPSB0eXBlb2YgcmlvdCAhPT0gJ3VuZGVmaW5lZCcgJiYgcmlvdC5zZXR0aW5ncyB8fCB7fTtcbiAgX2JyYWNrZXRzLnNldCA9IF9yZXNldDtcblxuICBfYnJhY2tldHMuUl9TVFJJTkdTID0gUl9TVFJJTkdTO1xuICBfYnJhY2tldHMuUl9NTENPTU1TID0gUl9NTENPTU1TO1xuICBfYnJhY2tldHMuU19RQkxPQ0tTID0gU19RQkxPQ0tTO1xuXG4gIHJldHVybiBfYnJhY2tldHNcblxufSkoKTtcblxuLyoqXG4gKiBAbW9kdWxlIHRtcGxcbiAqXG4gKiB0bXBsICAgICAgICAgIC0gUm9vdCBmdW5jdGlvbiwgcmV0dXJucyB0aGUgdGVtcGxhdGUgdmFsdWUsIHJlbmRlciB3aXRoIGRhdGFcbiAqIHRtcGwuaGFzRXhwciAgLSBUZXN0IHRoZSBleGlzdGVuY2Ugb2YgYSBleHByZXNzaW9uIGluc2lkZSBhIHN0cmluZ1xuICogdG1wbC5sb29wS2V5cyAtIEdldCB0aGUga2V5cyBmb3IgYW4gJ2VhY2gnIGxvb3AgKHVzZWQgYnkgYF9lYWNoYClcbiAqL1xuXG52YXIgdG1wbCA9IChmdW5jdGlvbiAoKSB7XG5cbiAgdmFyIF9jYWNoZSA9IHt9O1xuXG4gIGZ1bmN0aW9uIF90bXBsIChzdHIsIGRhdGEpIHtcbiAgICBpZiAoIXN0cikgeyByZXR1cm4gc3RyIH1cblxuICAgIHJldHVybiAoX2NhY2hlW3N0cl0gfHwgKF9jYWNoZVtzdHJdID0gX2NyZWF0ZShzdHIpKSkuY2FsbChkYXRhLCBfbG9nRXJyKVxuICB9XG5cbiAgX3RtcGwuaGFzRXhwciA9IGJyYWNrZXRzLmhhc0V4cHI7XG5cbiAgX3RtcGwubG9vcEtleXMgPSBicmFja2V0cy5sb29wS2V5cztcblxuICAvLyBpc3RhbmJ1bCBpZ25vcmUgbmV4dFxuICBfdG1wbC5jbGVhckNhY2hlID0gZnVuY3Rpb24gKCkgeyBfY2FjaGUgPSB7fTsgfTtcblxuICBfdG1wbC5lcnJvckhhbmRsZXIgPSBudWxsO1xuXG4gIGZ1bmN0aW9uIF9sb2dFcnIgKGVyciwgY3R4KSB7XG5cbiAgICBlcnIucmlvdERhdGEgPSB7XG4gICAgICB0YWdOYW1lOiBjdHggJiYgY3R4LnJvb3QgJiYgY3R4LnJvb3QudGFnTmFtZSxcbiAgICAgIF9yaW90X2lkOiBjdHggJiYgY3R4Ll9yaW90X2lkICAvL2VzbGludC1kaXNhYmxlLWxpbmUgY2FtZWxjYXNlXG4gICAgfTtcblxuICAgIGlmIChfdG1wbC5lcnJvckhhbmRsZXIpIHsgX3RtcGwuZXJyb3JIYW5kbGVyKGVycik7IH1cblxuICAgIGlmIChcbiAgICAgIHR5cGVvZiBjb25zb2xlICE9PSAndW5kZWZpbmVkJyAmJlxuICAgICAgdHlwZW9mIGNvbnNvbGUuZXJyb3IgPT09ICdmdW5jdGlvbidcbiAgICApIHtcbiAgICAgIGlmIChlcnIucmlvdERhdGEudGFnTmFtZSkge1xuICAgICAgICBjb25zb2xlLmVycm9yKCdSaW90IHRlbXBsYXRlIGVycm9yIHRocm93biBpbiB0aGUgPCVzPiB0YWcnLCBlcnIucmlvdERhdGEudGFnTmFtZSk7XG4gICAgICB9XG4gICAgICBjb25zb2xlLmVycm9yKGVycik7XG4gICAgfVxuICB9XG5cbiAgZnVuY3Rpb24gX2NyZWF0ZSAoc3RyKSB7XG4gICAgdmFyIGV4cHIgPSBfZ2V0VG1wbChzdHIpO1xuXG4gICAgaWYgKGV4cHIuc2xpY2UoMCwgMTEpICE9PSAndHJ5e3JldHVybiAnKSB7IGV4cHIgPSAncmV0dXJuICcgKyBleHByOyB9XG5cbiAgICByZXR1cm4gbmV3IEZ1bmN0aW9uKCdFJywgZXhwciArICc7JykgICAgLy8gZXNsaW50LWRpc2FibGUtbGluZSBuby1uZXctZnVuY1xuICB9XG5cbiAgdmFyXG4gICAgQ0hfSURFWFBSID0gU3RyaW5nLmZyb21DaGFyQ29kZSgweDIwNTcpLFxuICAgIFJFX0NTTkFNRSA9IC9eKD86KC0/W19BLVphLXpcXHhBMC1cXHhGRl1bLVxcd1xceEEwLVxceEZGXSopfFxcdTIwNTcoXFxkKyl+KTovLFxuICAgIFJFX1FCTE9DSyA9IFJlZ0V4cChicmFja2V0cy5TX1FCTE9DS1MsICdnJyksXG4gICAgUkVfRFFVT1RFID0gL1xcdTIwNTcvZyxcbiAgICBSRV9RQk1BUksgPSAvXFx1MjA1NyhcXGQrKX4vZztcblxuICBmdW5jdGlvbiBfZ2V0VG1wbCAoc3RyKSB7XG4gICAgdmFyXG4gICAgICBxc3RyID0gW10sXG4gICAgICBleHByLFxuICAgICAgcGFydHMgPSBicmFja2V0cy5zcGxpdChzdHIucmVwbGFjZShSRV9EUVVPVEUsICdcIicpLCAxKTtcblxuICAgIGlmIChwYXJ0cy5sZW5ndGggPiAyIHx8IHBhcnRzWzBdKSB7XG4gICAgICB2YXIgaSwgaiwgbGlzdCA9IFtdO1xuXG4gICAgICBmb3IgKGkgPSBqID0gMDsgaSA8IHBhcnRzLmxlbmd0aDsgKytpKSB7XG5cbiAgICAgICAgZXhwciA9IHBhcnRzW2ldO1xuXG4gICAgICAgIGlmIChleHByICYmIChleHByID0gaSAmIDFcblxuICAgICAgICAgICAgPyBfcGFyc2VFeHByKGV4cHIsIDEsIHFzdHIpXG5cbiAgICAgICAgICAgIDogJ1wiJyArIGV4cHJcbiAgICAgICAgICAgICAgICAucmVwbGFjZSgvXFxcXC9nLCAnXFxcXFxcXFwnKVxuICAgICAgICAgICAgICAgIC5yZXBsYWNlKC9cXHJcXG4/fFxcbi9nLCAnXFxcXG4nKVxuICAgICAgICAgICAgICAgIC5yZXBsYWNlKC9cIi9nLCAnXFxcXFwiJykgK1xuICAgICAgICAgICAgICAnXCInXG5cbiAgICAgICAgICApKSB7IGxpc3RbaisrXSA9IGV4cHI7IH1cblxuICAgICAgfVxuXG4gICAgICBleHByID0gaiA8IDIgPyBsaXN0WzBdXG4gICAgICAgICAgIDogJ1snICsgbGlzdC5qb2luKCcsJykgKyAnXS5qb2luKFwiXCIpJztcblxuICAgIH0gZWxzZSB7XG5cbiAgICAgIGV4cHIgPSBfcGFyc2VFeHByKHBhcnRzWzFdLCAwLCBxc3RyKTtcbiAgICB9XG5cbiAgICBpZiAocXN0clswXSkge1xuICAgICAgZXhwciA9IGV4cHIucmVwbGFjZShSRV9RQk1BUkssIGZ1bmN0aW9uIChfLCBwb3MpIHtcbiAgICAgICAgcmV0dXJuIHFzdHJbcG9zXVxuICAgICAgICAgIC5yZXBsYWNlKC9cXHIvZywgJ1xcXFxyJylcbiAgICAgICAgICAucmVwbGFjZSgvXFxuL2csICdcXFxcbicpXG4gICAgICB9KTtcbiAgICB9XG4gICAgcmV0dXJuIGV4cHJcbiAgfVxuXG4gIHZhclxuICAgIFJFX0JSRU5EID0ge1xuICAgICAgJygnOiAvWygpXS9nLFxuICAgICAgJ1snOiAvW1tcXF1dL2csXG4gICAgICAneyc6IC9be31dL2dcbiAgICB9O1xuXG4gIGZ1bmN0aW9uIF9wYXJzZUV4cHIgKGV4cHIsIGFzVGV4dCwgcXN0cikge1xuXG4gICAgZXhwciA9IGV4cHJcbiAgICAgICAgICAucmVwbGFjZShSRV9RQkxPQ0ssIGZ1bmN0aW9uIChzLCBkaXYpIHtcbiAgICAgICAgICAgIHJldHVybiBzLmxlbmd0aCA+IDIgJiYgIWRpdiA/IENIX0lERVhQUiArIChxc3RyLnB1c2gocykgLSAxKSArICd+JyA6IHNcbiAgICAgICAgICB9KVxuICAgICAgICAgIC5yZXBsYWNlKC9cXHMrL2csICcgJykudHJpbSgpXG4gICAgICAgICAgLnJlcGxhY2UoL1xcID8oW1tcXCh7fSw/XFwuOl0pXFwgPy9nLCAnJDEnKTtcblxuICAgIGlmIChleHByKSB7XG4gICAgICB2YXJcbiAgICAgICAgbGlzdCA9IFtdLFxuICAgICAgICBjbnQgPSAwLFxuICAgICAgICBtYXRjaDtcblxuICAgICAgd2hpbGUgKGV4cHIgJiZcbiAgICAgICAgICAgIChtYXRjaCA9IGV4cHIubWF0Y2goUkVfQ1NOQU1FKSkgJiZcbiAgICAgICAgICAgICFtYXRjaC5pbmRleFxuICAgICAgICApIHtcbiAgICAgICAgdmFyXG4gICAgICAgICAga2V5LFxuICAgICAgICAgIGpzYixcbiAgICAgICAgICByZSA9IC8sfChbW3soXSl8JC9nO1xuXG4gICAgICAgIGV4cHIgPSBSZWdFeHAucmlnaHRDb250ZXh0O1xuICAgICAgICBrZXkgID0gbWF0Y2hbMl0gPyBxc3RyW21hdGNoWzJdXS5zbGljZSgxLCAtMSkudHJpbSgpLnJlcGxhY2UoL1xccysvZywgJyAnKSA6IG1hdGNoWzFdO1xuXG4gICAgICAgIHdoaWxlIChqc2IgPSAobWF0Y2ggPSByZS5leGVjKGV4cHIpKVsxXSkgeyBza2lwQnJhY2VzKGpzYiwgcmUpOyB9XG5cbiAgICAgICAganNiICA9IGV4cHIuc2xpY2UoMCwgbWF0Y2guaW5kZXgpO1xuICAgICAgICBleHByID0gUmVnRXhwLnJpZ2h0Q29udGV4dDtcblxuICAgICAgICBsaXN0W2NudCsrXSA9IF93cmFwRXhwcihqc2IsIDEsIGtleSk7XG4gICAgICB9XG5cbiAgICAgIGV4cHIgPSAhY250ID8gX3dyYXBFeHByKGV4cHIsIGFzVGV4dClcbiAgICAgICAgICAgOiBjbnQgPiAxID8gJ1snICsgbGlzdC5qb2luKCcsJykgKyAnXS5qb2luKFwiIFwiKS50cmltKCknIDogbGlzdFswXTtcbiAgICB9XG4gICAgcmV0dXJuIGV4cHJcblxuICAgIGZ1bmN0aW9uIHNraXBCcmFjZXMgKGNoLCByZSkge1xuICAgICAgdmFyXG4gICAgICAgIG1tLFxuICAgICAgICBsdiA9IDEsXG4gICAgICAgIGlyID0gUkVfQlJFTkRbY2hdO1xuXG4gICAgICBpci5sYXN0SW5kZXggPSByZS5sYXN0SW5kZXg7XG4gICAgICB3aGlsZSAobW0gPSBpci5leGVjKGV4cHIpKSB7XG4gICAgICAgIGlmIChtbVswXSA9PT0gY2gpIHsgKytsdjsgfVxuICAgICAgICBlbHNlIGlmICghLS1sdikgeyBicmVhayB9XG4gICAgICB9XG4gICAgICByZS5sYXN0SW5kZXggPSBsdiA/IGV4cHIubGVuZ3RoIDogaXIubGFzdEluZGV4O1xuICAgIH1cbiAgfVxuXG4gIC8vIGlzdGFuYnVsIGlnbm9yZSBuZXh0OiBub3QgYm90aFxuICB2YXIgLy8gZXNsaW50LWRpc2FibGUtbmV4dC1saW5lIG1heC1sZW5cbiAgICBKU19DT05URVhUID0gJ1wiaW4gdGhpcz90aGlzOicgKyAodHlwZW9mIHdpbmRvdyAhPT0gJ29iamVjdCcgPyAnZ2xvYmFsJyA6ICd3aW5kb3cnKSArICcpLicsXG4gICAgSlNfVkFSTkFNRSA9IC9bLHtdW1xcJFxcd10rKD89Oil8KF4gKnxbXiRcXHdcXC57XSkoPyEoPzp0eXBlb2Z8dHJ1ZXxmYWxzZXxudWxsfHVuZGVmaW5lZHxpbnxpbnN0YW5jZW9mfGlzKD86RmluaXRlfE5hTil8dm9pZHxOYU58bmV3fERhdGV8UmVnRXhwfE1hdGgpKD8hWyRcXHddKSkoWyRfQS1aYS16XVskXFx3XSopL2csXG4gICAgSlNfTk9QUk9QUyA9IC9eKD89KFxcLlskXFx3XSspKVxcMSg/OlteLlsoXXwkKS87XG5cbiAgZnVuY3Rpb24gX3dyYXBFeHByIChleHByLCBhc1RleHQsIGtleSkge1xuICAgIHZhciB0YjtcblxuICAgIGV4cHIgPSBleHByLnJlcGxhY2UoSlNfVkFSTkFNRSwgZnVuY3Rpb24gKG1hdGNoLCBwLCBtdmFyLCBwb3MsIHMpIHtcbiAgICAgIGlmIChtdmFyKSB7XG4gICAgICAgIHBvcyA9IHRiID8gMCA6IHBvcyArIG1hdGNoLmxlbmd0aDtcblxuICAgICAgICBpZiAobXZhciAhPT0gJ3RoaXMnICYmIG12YXIgIT09ICdnbG9iYWwnICYmIG12YXIgIT09ICd3aW5kb3cnKSB7XG4gICAgICAgICAgbWF0Y2ggPSBwICsgJyhcIicgKyBtdmFyICsgSlNfQ09OVEVYVCArIG12YXI7XG4gICAgICAgICAgaWYgKHBvcykgeyB0YiA9IChzID0gc1twb3NdKSA9PT0gJy4nIHx8IHMgPT09ICcoJyB8fCBzID09PSAnWyc7IH1cbiAgICAgICAgfSBlbHNlIGlmIChwb3MpIHtcbiAgICAgICAgICB0YiA9ICFKU19OT1BST1BTLnRlc3Qocy5zbGljZShwb3MpKTtcbiAgICAgICAgfVxuICAgICAgfVxuICAgICAgcmV0dXJuIG1hdGNoXG4gICAgfSk7XG5cbiAgICBpZiAodGIpIHtcbiAgICAgIGV4cHIgPSAndHJ5e3JldHVybiAnICsgZXhwciArICd9Y2F0Y2goZSl7RShlLHRoaXMpfSc7XG4gICAgfVxuXG4gICAgaWYgKGtleSkge1xuXG4gICAgICBleHByID0gKHRiXG4gICAgICAgICAgPyAnZnVuY3Rpb24oKXsnICsgZXhwciArICd9LmNhbGwodGhpcyknIDogJygnICsgZXhwciArICcpJ1xuICAgICAgICApICsgJz9cIicgKyBrZXkgKyAnXCI6XCJcIic7XG5cbiAgICB9IGVsc2UgaWYgKGFzVGV4dCkge1xuXG4gICAgICBleHByID0gJ2Z1bmN0aW9uKHYpeycgKyAodGJcbiAgICAgICAgICA/IGV4cHIucmVwbGFjZSgncmV0dXJuICcsICd2PScpIDogJ3Y9KCcgKyBleHByICsgJyknXG4gICAgICAgICkgKyAnO3JldHVybiB2fHx2PT09MD92OlwiXCJ9LmNhbGwodGhpcyknO1xuICAgIH1cblxuICAgIHJldHVybiBleHByXG4gIH1cblxuICBfdG1wbC52ZXJzaW9uID0gYnJhY2tldHMudmVyc2lvbiA9ICd2My4wLjAnO1xuXG4gIHJldHVybiBfdG1wbFxuXG59KSgpO1xuXG4vKipcbiAqIFNwZWNpYWxpemVkIGZ1bmN0aW9uIGZvciBsb29waW5nIGFuIGFycmF5LWxpa2UgY29sbGVjdGlvbiB3aXRoIGBlYWNoPXt9YFxuICogQHBhcmFtICAgeyBBcnJheSB9IGxpc3QgLSBjb2xsZWN0aW9uIG9mIGl0ZW1zXG4gKiBAcGFyYW0gICB7RnVuY3Rpb259IGZuIC0gY2FsbGJhY2sgZnVuY3Rpb25cbiAqIEByZXR1cm5zIHsgQXJyYXkgfSB0aGUgYXJyYXkgbG9vcGVkXG4gKi9cbmZ1bmN0aW9uIGVhY2gobGlzdCwgZm4pIHtcbiAgdmFyIGxlbiA9IGxpc3QgPyBsaXN0Lmxlbmd0aCA6IDA7XG5cbiAgZm9yICh2YXIgaSA9IDAsIGVsOyBpIDwgbGVuOyArK2kpIHtcbiAgICBlbCA9IGxpc3RbaV07XG4gICAgLy8gcmV0dXJuIGZhbHNlIC0+IGN1cnJlbnQgaXRlbSB3YXMgcmVtb3ZlZCBieSBmbiBkdXJpbmcgdGhlIGxvb3BcbiAgICBpZiAoZm4oZWwsIGkpID09PSBmYWxzZSlcbiAgICAgIHsgaS0tOyB9XG4gIH1cbiAgcmV0dXJuIGxpc3Rcbn1cblxuLyoqXG4gKiBDaGVjayB3aGV0aGVyIGFuIGFycmF5IGNvbnRhaW5zIGFuIGl0ZW1cbiAqIEBwYXJhbSAgIHsgQXJyYXkgfSBhcnJheSAtIHRhcmdldCBhcnJheVxuICogQHBhcmFtICAgeyAqIH0gaXRlbSAtIGl0ZW0gdG8gdGVzdFxuICogQHJldHVybnMgeyBCb29sZWFuIH0gLVxuICovXG5mdW5jdGlvbiBjb250YWlucyhhcnJheSwgaXRlbSkge1xuICByZXR1cm4gfmFycmF5LmluZGV4T2YoaXRlbSlcbn1cblxuLyoqXG4gKiBDb252ZXJ0IGEgc3RyaW5nIGNvbnRhaW5pbmcgZGFzaGVzIHRvIGNhbWVsIGNhc2VcbiAqIEBwYXJhbSAgIHsgU3RyaW5nIH0gc3RyIC0gaW5wdXQgc3RyaW5nXG4gKiBAcmV0dXJucyB7IFN0cmluZyB9IG15LXN0cmluZyAtPiBteVN0cmluZ1xuICovXG5mdW5jdGlvbiB0b0NhbWVsKHN0cikge1xuICByZXR1cm4gc3RyLnJlcGxhY2UoLy0oXFx3KS9nLCBmdW5jdGlvbiAoXywgYykgeyByZXR1cm4gYy50b1VwcGVyQ2FzZSgpOyB9KVxufVxuXG4vKipcbiAqIEZhc3RlciBTdHJpbmcgc3RhcnRzV2l0aCBhbHRlcm5hdGl2ZVxuICogQHBhcmFtICAgeyBTdHJpbmcgfSBzdHIgLSBzb3VyY2Ugc3RyaW5nXG4gKiBAcGFyYW0gICB7IFN0cmluZyB9IHZhbHVlIC0gdGVzdCBzdHJpbmdcbiAqIEByZXR1cm5zIHsgQm9vbGVhbiB9IC1cbiAqL1xuZnVuY3Rpb24gc3RhcnRzV2l0aChzdHIsIHZhbHVlKSB7XG4gIHJldHVybiBzdHIuc2xpY2UoMCwgdmFsdWUubGVuZ3RoKSA9PT0gdmFsdWVcbn1cblxuLyoqXG4gKiBIZWxwZXIgZnVuY3Rpb24gdG8gc2V0IGFuIGltbXV0YWJsZSBwcm9wZXJ0eVxuICogQHBhcmFtICAgeyBPYmplY3QgfSBlbCAtIG9iamVjdCB3aGVyZSB0aGUgbmV3IHByb3BlcnR5IHdpbGwgYmUgc2V0XG4gKiBAcGFyYW0gICB7IFN0cmluZyB9IGtleSAtIG9iamVjdCBrZXkgd2hlcmUgdGhlIG5ldyBwcm9wZXJ0eSB3aWxsIGJlIHN0b3JlZFxuICogQHBhcmFtICAgeyAqIH0gdmFsdWUgLSB2YWx1ZSBvZiB0aGUgbmV3IHByb3BlcnR5XG4gKiBAcGFyYW0gICB7IE9iamVjdCB9IG9wdGlvbnMgLSBzZXQgdGhlIHByb3Blcnkgb3ZlcnJpZGluZyB0aGUgZGVmYXVsdCBvcHRpb25zXG4gKiBAcmV0dXJucyB7IE9iamVjdCB9IC0gdGhlIGluaXRpYWwgb2JqZWN0XG4gKi9cbmZ1bmN0aW9uIGRlZmluZVByb3BlcnR5KGVsLCBrZXksIHZhbHVlLCBvcHRpb25zKSB7XG4gIE9iamVjdC5kZWZpbmVQcm9wZXJ0eShlbCwga2V5LCBleHRlbmQoe1xuICAgIHZhbHVlOiB2YWx1ZSxcbiAgICBlbnVtZXJhYmxlOiBmYWxzZSxcbiAgICB3cml0YWJsZTogZmFsc2UsXG4gICAgY29uZmlndXJhYmxlOiB0cnVlXG4gIH0sIG9wdGlvbnMpKTtcbiAgcmV0dXJuIGVsXG59XG5cbi8qKlxuICogRXh0ZW5kIGFueSBvYmplY3Qgd2l0aCBvdGhlciBwcm9wZXJ0aWVzXG4gKiBAcGFyYW0gICB7IE9iamVjdCB9IHNyYyAtIHNvdXJjZSBvYmplY3RcbiAqIEByZXR1cm5zIHsgT2JqZWN0IH0gdGhlIHJlc3VsdGluZyBleHRlbmRlZCBvYmplY3RcbiAqXG4gKiB2YXIgb2JqID0geyBmb286ICdiYXonIH1cbiAqIGV4dGVuZChvYmosIHtiYXI6ICdiYXInLCBmb286ICdiYXInfSlcbiAqIGNvbnNvbGUubG9nKG9iaikgPT4ge2JhcjogJ2JhcicsIGZvbzogJ2Jhcid9XG4gKlxuICovXG5mdW5jdGlvbiBleHRlbmQoc3JjKSB7XG4gIHZhciBvYmosIGFyZ3MgPSBhcmd1bWVudHM7XG4gIGZvciAodmFyIGkgPSAxOyBpIDwgYXJncy5sZW5ndGg7ICsraSkge1xuICAgIGlmIChvYmogPSBhcmdzW2ldKSB7XG4gICAgICBmb3IgKHZhciBrZXkgaW4gb2JqKSB7XG4gICAgICAgIC8vIGNoZWNrIGlmIHRoaXMgcHJvcGVydHkgb2YgdGhlIHNvdXJjZSBvYmplY3QgY291bGQgYmUgb3ZlcnJpZGRlblxuICAgICAgICBpZiAoaXNXcml0YWJsZShzcmMsIGtleSkpXG4gICAgICAgICAgeyBzcmNba2V5XSA9IG9ialtrZXldOyB9XG4gICAgICB9XG4gICAgfVxuICB9XG4gIHJldHVybiBzcmNcbn1cblxudmFyIG1pc2MgPSBPYmplY3QuZnJlZXplKHtcblx0ZWFjaDogZWFjaCxcblx0Y29udGFpbnM6IGNvbnRhaW5zLFxuXHR0b0NhbWVsOiB0b0NhbWVsLFxuXHRzdGFydHNXaXRoOiBzdGFydHNXaXRoLFxuXHRkZWZpbmVQcm9wZXJ0eTogZGVmaW5lUHJvcGVydHksXG5cdGV4dGVuZDogZXh0ZW5kXG59KTtcblxudmFyIG9ic2VydmFibGUgPSBmdW5jdGlvbihlbCkge1xuXG4gIC8qKlxuICAgKiBFeHRlbmQgdGhlIG9yaWdpbmFsIG9iamVjdCBvciBjcmVhdGUgYSBuZXcgZW1wdHkgb25lXG4gICAqIEB0eXBlIHsgT2JqZWN0IH1cbiAgICovXG5cbiAgZWwgPSBlbCB8fCB7fTtcblxuICAvKipcbiAgICogUHJpdmF0ZSB2YXJpYWJsZXNcbiAgICovXG4gIHZhciBjYWxsYmFja3MgPSB7fSxcbiAgICBzbGljZSA9IEFycmF5LnByb3RvdHlwZS5zbGljZTtcblxuICAvKipcbiAgICogUHVibGljIEFwaVxuICAgKi9cblxuICAvLyBleHRlbmQgdGhlIGVsIG9iamVjdCBhZGRpbmcgdGhlIG9ic2VydmFibGUgbWV0aG9kc1xuICBPYmplY3QuZGVmaW5lUHJvcGVydGllcyhlbCwge1xuICAgIC8qKlxuICAgICAqIExpc3RlbiB0byB0aGUgZ2l2ZW4gYGV2ZW50YCBhbmRzXG4gICAgICogZXhlY3V0ZSB0aGUgYGNhbGxiYWNrYCBlYWNoIHRpbWUgYW4gZXZlbnQgaXMgdHJpZ2dlcmVkLlxuICAgICAqIEBwYXJhbSAgeyBTdHJpbmcgfSBldmVudCAtIGV2ZW50IGlkXG4gICAgICogQHBhcmFtICB7IEZ1bmN0aW9uIH0gZm4gLSBjYWxsYmFjayBmdW5jdGlvblxuICAgICAqIEByZXR1cm5zIHsgT2JqZWN0IH0gZWxcbiAgICAgKi9cbiAgICBvbjoge1xuICAgICAgdmFsdWU6IGZ1bmN0aW9uKGV2ZW50LCBmbikge1xuICAgICAgICBpZiAodHlwZW9mIGZuID09ICdmdW5jdGlvbicpXG4gICAgICAgICAgeyAoY2FsbGJhY2tzW2V2ZW50XSA9IGNhbGxiYWNrc1tldmVudF0gfHwgW10pLnB1c2goZm4pOyB9XG4gICAgICAgIHJldHVybiBlbFxuICAgICAgfSxcbiAgICAgIGVudW1lcmFibGU6IGZhbHNlLFxuICAgICAgd3JpdGFibGU6IGZhbHNlLFxuICAgICAgY29uZmlndXJhYmxlOiBmYWxzZVxuICAgIH0sXG5cbiAgICAvKipcbiAgICAgKiBSZW1vdmVzIHRoZSBnaXZlbiBgZXZlbnRgIGxpc3RlbmVyc1xuICAgICAqIEBwYXJhbSAgIHsgU3RyaW5nIH0gZXZlbnQgLSBldmVudCBpZFxuICAgICAqIEBwYXJhbSAgIHsgRnVuY3Rpb24gfSBmbiAtIGNhbGxiYWNrIGZ1bmN0aW9uXG4gICAgICogQHJldHVybnMgeyBPYmplY3QgfSBlbFxuICAgICAqL1xuICAgIG9mZjoge1xuICAgICAgdmFsdWU6IGZ1bmN0aW9uKGV2ZW50LCBmbikge1xuICAgICAgICBpZiAoZXZlbnQgPT0gJyonICYmICFmbikgeyBjYWxsYmFja3MgPSB7fTsgfVxuICAgICAgICBlbHNlIHtcbiAgICAgICAgICBpZiAoZm4pIHtcbiAgICAgICAgICAgIHZhciBhcnIgPSBjYWxsYmFja3NbZXZlbnRdO1xuICAgICAgICAgICAgZm9yICh2YXIgaSA9IDAsIGNiOyBjYiA9IGFyciAmJiBhcnJbaV07ICsraSkge1xuICAgICAgICAgICAgICBpZiAoY2IgPT0gZm4pIHsgYXJyLnNwbGljZShpLS0sIDEpOyB9XG4gICAgICAgICAgICB9XG4gICAgICAgICAgfSBlbHNlIHsgZGVsZXRlIGNhbGxiYWNrc1tldmVudF07IH1cbiAgICAgICAgfVxuICAgICAgICByZXR1cm4gZWxcbiAgICAgIH0sXG4gICAgICBlbnVtZXJhYmxlOiBmYWxzZSxcbiAgICAgIHdyaXRhYmxlOiBmYWxzZSxcbiAgICAgIGNvbmZpZ3VyYWJsZTogZmFsc2VcbiAgICB9LFxuXG4gICAgLyoqXG4gICAgICogTGlzdGVuIHRvIHRoZSBnaXZlbiBgZXZlbnRgIGFuZFxuICAgICAqIGV4ZWN1dGUgdGhlIGBjYWxsYmFja2AgYXQgbW9zdCBvbmNlXG4gICAgICogQHBhcmFtICAgeyBTdHJpbmcgfSBldmVudCAtIGV2ZW50IGlkXG4gICAgICogQHBhcmFtICAgeyBGdW5jdGlvbiB9IGZuIC0gY2FsbGJhY2sgZnVuY3Rpb25cbiAgICAgKiBAcmV0dXJucyB7IE9iamVjdCB9IGVsXG4gICAgICovXG4gICAgb25lOiB7XG4gICAgICB2YWx1ZTogZnVuY3Rpb24oZXZlbnQsIGZuKSB7XG4gICAgICAgIGZ1bmN0aW9uIG9uKCkge1xuICAgICAgICAgIGVsLm9mZihldmVudCwgb24pO1xuICAgICAgICAgIGZuLmFwcGx5KGVsLCBhcmd1bWVudHMpO1xuICAgICAgICB9XG4gICAgICAgIHJldHVybiBlbC5vbihldmVudCwgb24pXG4gICAgICB9LFxuICAgICAgZW51bWVyYWJsZTogZmFsc2UsXG4gICAgICB3cml0YWJsZTogZmFsc2UsXG4gICAgICBjb25maWd1cmFibGU6IGZhbHNlXG4gICAgfSxcblxuICAgIC8qKlxuICAgICAqIEV4ZWN1dGUgYWxsIGNhbGxiYWNrIGZ1bmN0aW9ucyB0aGF0IGxpc3RlbiB0b1xuICAgICAqIHRoZSBnaXZlbiBgZXZlbnRgXG4gICAgICogQHBhcmFtICAgeyBTdHJpbmcgfSBldmVudCAtIGV2ZW50IGlkXG4gICAgICogQHJldHVybnMgeyBPYmplY3QgfSBlbFxuICAgICAqL1xuICAgIHRyaWdnZXI6IHtcbiAgICAgIHZhbHVlOiBmdW5jdGlvbihldmVudCkge1xuICAgICAgICB2YXIgYXJndW1lbnRzJDEgPSBhcmd1bWVudHM7XG5cblxuICAgICAgICAvLyBnZXR0aW5nIHRoZSBhcmd1bWVudHNcbiAgICAgICAgdmFyIGFyZ2xlbiA9IGFyZ3VtZW50cy5sZW5ndGggLSAxLFxuICAgICAgICAgIGFyZ3MgPSBuZXcgQXJyYXkoYXJnbGVuKSxcbiAgICAgICAgICBmbnMsXG4gICAgICAgICAgZm4sXG4gICAgICAgICAgaTtcblxuICAgICAgICBmb3IgKGkgPSAwOyBpIDwgYXJnbGVuOyBpKyspIHtcbiAgICAgICAgICBhcmdzW2ldID0gYXJndW1lbnRzJDFbaSArIDFdOyAvLyBza2lwIGZpcnN0IGFyZ3VtZW50XG4gICAgICAgIH1cblxuICAgICAgICBmbnMgPSBzbGljZS5jYWxsKGNhbGxiYWNrc1tldmVudF0gfHwgW10sIDApO1xuXG4gICAgICAgIGZvciAoaSA9IDA7IGZuID0gZm5zW2ldOyArK2kpIHtcbiAgICAgICAgICBmbi5hcHBseShlbCwgYXJncyk7XG4gICAgICAgIH1cblxuICAgICAgICBpZiAoY2FsbGJhY2tzWycqJ10gJiYgZXZlbnQgIT0gJyonKVxuICAgICAgICAgIHsgZWwudHJpZ2dlci5hcHBseShlbCwgWycqJywgZXZlbnRdLmNvbmNhdChhcmdzKSk7IH1cblxuICAgICAgICByZXR1cm4gZWxcbiAgICAgIH0sXG4gICAgICBlbnVtZXJhYmxlOiBmYWxzZSxcbiAgICAgIHdyaXRhYmxlOiBmYWxzZSxcbiAgICAgIGNvbmZpZ3VyYWJsZTogZmFsc2VcbiAgICB9XG4gIH0pO1xuXG4gIHJldHVybiBlbFxuXG59O1xuXG52YXIgRVZFTlRTX1BSRUZJWF9SRUdFWCA9IC9eb24vO1xuXG4vKipcbiAqIFRyaWdnZXIgRE9NIGV2ZW50c1xuICogQHBhcmFtICAgeyBIVE1MRWxlbWVudCB9IGRvbSAtIGRvbSBlbGVtZW50IHRhcmdldCBvZiB0aGUgZXZlbnRcbiAqIEBwYXJhbSAgIHsgRnVuY3Rpb24gfSBoYW5kbGVyIC0gdXNlciBmdW5jdGlvblxuICogQHBhcmFtICAgeyBPYmplY3QgfSBlIC0gZXZlbnQgb2JqZWN0XG4gKi9cbmZ1bmN0aW9uIGhhbmRsZUV2ZW50KGRvbSwgaGFuZGxlciwgZSkge1xuICB2YXIgcHRhZyA9IHRoaXMuX3BhcmVudCxcbiAgICBpdGVtID0gdGhpcy5faXRlbTtcblxuICBpZiAoIWl0ZW0pXG4gICAgeyB3aGlsZSAocHRhZyAmJiAhaXRlbSkge1xuICAgICAgaXRlbSA9IHB0YWcuX2l0ZW07XG4gICAgICBwdGFnID0gcHRhZy5fcGFyZW50O1xuICAgIH0gfVxuXG4gIC8vIG92ZXJyaWRlIHRoZSBldmVudCBwcm9wZXJ0aWVzXG4gIGlmIChpc1dyaXRhYmxlKGUsICdjdXJyZW50VGFyZ2V0JykpIHsgZS5jdXJyZW50VGFyZ2V0ID0gZG9tOyB9XG4gIGlmIChpc1dyaXRhYmxlKGUsICd0YXJnZXQnKSkgeyBlLnRhcmdldCA9IGUuc3JjRWxlbWVudDsgfVxuICBpZiAoaXNXcml0YWJsZShlLCAnd2hpY2gnKSkgeyBlLndoaWNoID0gZS5jaGFyQ29kZSB8fCBlLmtleUNvZGU7IH1cblxuICBlLml0ZW0gPSBpdGVtO1xuXG4gIGhhbmRsZXIuY2FsbCh0aGlzLCBlKTtcblxuICBpZiAoIWUucHJldmVudFVwZGF0ZSkge1xuICAgIHZhciBwID0gZ2V0SW1tZWRpYXRlQ3VzdG9tUGFyZW50VGFnKHRoaXMpO1xuICAgIC8vIGZpeGVzICMyMDgzXG4gICAgaWYgKHAuaXNNb3VudGVkKSB7IHAudXBkYXRlKCk7IH1cbiAgfVxufVxuXG4vKipcbiAqIEF0dGFjaCBhbiBldmVudCB0byBhIERPTSBub2RlXG4gKiBAcGFyYW0geyBTdHJpbmcgfSBuYW1lIC0gZXZlbnQgbmFtZVxuICogQHBhcmFtIHsgRnVuY3Rpb24gfSBoYW5kbGVyIC0gZXZlbnQgY2FsbGJhY2tcbiAqIEBwYXJhbSB7IE9iamVjdCB9IGRvbSAtIGRvbSBub2RlXG4gKiBAcGFyYW0geyBUYWcgfSB0YWcgLSB0YWcgaW5zdGFuY2VcbiAqL1xuZnVuY3Rpb24gc2V0RXZlbnRIYW5kbGVyKG5hbWUsIGhhbmRsZXIsIGRvbSwgdGFnKSB7XG4gIHZhciBldmVudE5hbWUsXG4gICAgY2IgPSBoYW5kbGVFdmVudC5iaW5kKHRhZywgZG9tLCBoYW5kbGVyKTtcblxuICBpZiAoIWRvbS5hZGRFdmVudExpc3RlbmVyKSB7XG4gICAgZG9tW25hbWVdID0gY2I7XG4gICAgcmV0dXJuXG4gIH1cblxuICAvLyBhdm9pZCB0byBiaW5kIHR3aWNlIHRoZSBzYW1lIGV2ZW50XG4gIGRvbVtuYW1lXSA9IG51bGw7XG5cbiAgLy8gbm9ybWFsaXplIGV2ZW50IG5hbWVcbiAgZXZlbnROYW1lID0gbmFtZS5yZXBsYWNlKEVWRU5UU19QUkVGSVhfUkVHRVgsICcnKTtcblxuICAvLyBjYWNoZSB0aGUgY2FsbGJhY2sgZGlyZWN0bHkgb24gdGhlIERPTSBub2RlXG4gIGlmICghZG9tLl9yaW90RXZlbnRzKSB7IGRvbS5fcmlvdEV2ZW50cyA9IHt9OyB9XG5cbiAgaWYgKGRvbS5fcmlvdEV2ZW50c1tuYW1lXSlcbiAgICB7IGRvbS5yZW1vdmVFdmVudExpc3RlbmVyKGV2ZW50TmFtZSwgZG9tLl9yaW90RXZlbnRzW25hbWVdKTsgfVxuXG4gIGRvbS5fcmlvdEV2ZW50c1tuYW1lXSA9IGNiO1xuICBkb20uYWRkRXZlbnRMaXN0ZW5lcihldmVudE5hbWUsIGNiLCBmYWxzZSk7XG59XG5cbi8qKlxuICogVXBkYXRlIGR5bmFtaWNhbGx5IGNyZWF0ZWQgZGF0YS1pcyB0YWdzIHdpdGggY2hhbmdpbmcgZXhwcmVzc2lvbnNcbiAqIEBwYXJhbSB7IE9iamVjdCB9IGV4cHIgLSBleHByZXNzaW9uIHRhZyBhbmQgZXhwcmVzc2lvbiBpbmZvXG4gKiBAcGFyYW0geyBUYWcgfSBwYXJlbnQgLSBwYXJlbnQgZm9yIHRhZyBjcmVhdGlvblxuICovXG5mdW5jdGlvbiB1cGRhdGVEYXRhSXMoZXhwciwgcGFyZW50KSB7XG4gIHZhciB0YWdOYW1lID0gdG1wbChleHByLnZhbHVlLCBwYXJlbnQpLFxuICAgIGNvbmY7XG5cbiAgaWYgKGV4cHIudGFnICYmIGV4cHIudGFnTmFtZSA9PT0gdGFnTmFtZSkge1xuICAgIGV4cHIudGFnLnVwZGF0ZSgpO1xuICAgIHJldHVyblxuICB9XG5cbiAgLy8gc3luYyBfcGFyZW50IHRvIGFjY29tbW9kYXRlIGNoYW5naW5nIHRhZ25hbWVzXG4gIGlmIChleHByLnRhZykge1xuICAgIHZhciBkZWxOYW1lID0gZXhwci52YWx1ZSxcbiAgICAgIHRhZ3MgPSBleHByLnRhZy5fcGFyZW50LnRhZ3M7XG5cbiAgICBzZXRBdHRyKGV4cHIudGFnLnJvb3QsIFJJT1RfVEFHX0lTLCB0YWdOYW1lKTsgLy8gdXBkYXRlIGZvciBjc3NcbiAgICBhcnJheWlzaFJlbW92ZSh0YWdzLCBkZWxOYW1lLCBleHByLnRhZyk7XG4gIH1cblxuICBleHByLmltcGwgPSBfX1RBR19JTVBMW3RhZ05hbWVdO1xuICBjb25mID0ge3Jvb3Q6IGV4cHIuZG9tLCBwYXJlbnQ6IHBhcmVudCwgaGFzSW1wbDogdHJ1ZSwgdGFnTmFtZTogdGFnTmFtZX07XG4gIGV4cHIudGFnID0gaW5pdENoaWxkVGFnKGV4cHIuaW1wbCwgY29uZiwgZXhwci5kb20uaW5uZXJIVE1MLCBwYXJlbnQpO1xuICBleHByLnRhZ05hbWUgPSB0YWdOYW1lO1xuICBleHByLnRhZy5tb3VudCgpO1xuICBleHByLnRhZy51cGRhdGUoKTtcblxuICAvLyBwYXJlbnQgaXMgdGhlIHBsYWNlaG9sZGVyIHRhZywgbm90IHRoZSBkeW5hbWljIHRhZyBzbyBjbGVhbiB1cFxuICBwYXJlbnQub24oJ3VubW91bnQnLCBmdW5jdGlvbiAoKSB7XG4gICAgdmFyIGRlbE5hbWUgPSBleHByLnRhZy5vcHRzLmRhdGFJcyxcbiAgICAgIHRhZ3MgPSBleHByLnRhZy5wYXJlbnQudGFncyxcbiAgICAgIF90YWdzID0gZXhwci50YWcuX3BhcmVudC50YWdzO1xuICAgIGFycmF5aXNoUmVtb3ZlKHRhZ3MsIGRlbE5hbWUsIGV4cHIudGFnKTtcbiAgICBhcnJheWlzaFJlbW92ZShfdGFncywgZGVsTmFtZSwgZXhwci50YWcpO1xuICAgIGV4cHIudGFnLnVubW91bnQoKTtcbiAgfSk7XG59XG5cbi8qKlxuICogVXBkYXRlIG9uIHNpbmdsZSB0YWcgZXhwcmVzc2lvblxuICogQHRoaXMgVGFnXG4gKiBAcGFyYW0geyBPYmplY3QgfSBleHByIC0gZXhwcmVzc2lvbiBsb2dpY1xuICogQHJldHVybnMgeyB1bmRlZmluZWQgfVxuICovXG5mdW5jdGlvbiB1cGRhdGVFeHByZXNzaW9uKGV4cHIpIHtcbiAgdmFyIGRvbSA9IGV4cHIuZG9tLFxuICAgIGF0dHJOYW1lID0gZXhwci5hdHRyLFxuICAgIHZhbHVlID0gdG1wbChleHByLmV4cHIsIHRoaXMpLFxuICAgIGlzVmFsdWVBdHRyID0gYXR0ck5hbWUgPT09ICdyaW90LXZhbHVlJyxcbiAgICBpc1ZpcnR1YWwgPSBleHByLnJvb3QgJiYgZXhwci5yb290LnRhZ05hbWUgPT09ICdWSVJUVUFMJyxcbiAgICBwYXJlbnQgPSBkb20gJiYgKGV4cHIucGFyZW50IHx8IGRvbS5wYXJlbnROb2RlKSxcbiAgICBvbGQ7XG5cbiAgaWYgKGV4cHIuYm9vbClcbiAgICB7IHZhbHVlID0gdmFsdWUgPyBhdHRyTmFtZSA6IGZhbHNlOyB9XG4gIGVsc2UgaWYgKGlzVW5kZWZpbmVkKHZhbHVlKSB8fCB2YWx1ZSA9PT0gbnVsbClcbiAgICB7IHZhbHVlID0gJyc7IH1cblxuICBpZiAoZXhwci5fcmlvdF9pZCkgeyAvLyBpZiBpdCdzIGEgdGFnXG4gICAgaWYgKGV4cHIuaXNNb3VudGVkKSB7XG4gICAgICBleHByLnVwZGF0ZSgpO1xuXG4gICAgLy8gaWYgaXQgaGFzbid0IGJlZW4gbW91bnRlZCB5ZXQsIGRvIHRoYXQgbm93LlxuICAgIH0gZWxzZSB7XG4gICAgICBleHByLm1vdW50KCk7XG5cbiAgICAgIGlmIChpc1ZpcnR1YWwpIHtcbiAgICAgICAgdmFyIGZyYWcgPSBkb2N1bWVudC5jcmVhdGVEb2N1bWVudEZyYWdtZW50KCk7XG4gICAgICAgIG1ha2VWaXJ0dWFsLmNhbGwoZXhwciwgZnJhZyk7XG4gICAgICAgIGV4cHIucm9vdC5wYXJlbnRFbGVtZW50LnJlcGxhY2VDaGlsZChmcmFnLCBleHByLnJvb3QpO1xuICAgICAgfVxuICAgIH1cbiAgICByZXR1cm5cbiAgfVxuXG4gIG9sZCA9IGV4cHIudmFsdWU7XG4gIGV4cHIudmFsdWUgPSB2YWx1ZTtcblxuICBpZiAoZXhwci51cGRhdGUpIHtcbiAgICBleHByLnVwZGF0ZSgpO1xuICAgIHJldHVyblxuICB9XG5cbiAgaWYgKG9sZCA9PT0gdmFsdWUpIHsgcmV0dXJuIH1cbiAgaWYgKGV4cHIuaXNSdGFnICYmIHZhbHVlKSB7IHJldHVybiB1cGRhdGVEYXRhSXMoZXhwciwgdGhpcykgfVxuICAvLyBubyBjaGFuZ2UsIHNvIG5vdGhpbmcgbW9yZSB0byBkb1xuICBpZiAoaXNWYWx1ZUF0dHIgJiYgZG9tLnZhbHVlID09PSB2YWx1ZSkgeyByZXR1cm4gfVxuXG4gIC8vIHRleHRhcmVhIGFuZCB0ZXh0IG5vZGVzIGhhdmUgbm8gYXR0cmlidXRlIG5hbWVcbiAgaWYgKCFhdHRyTmFtZSkge1xuICAgIC8vIGFib3V0ICM4MTUgdy9vIHJlcGxhY2U6IHRoZSBicm93c2VyIGNvbnZlcnRzIHRoZSB2YWx1ZSB0byBhIHN0cmluZyxcbiAgICAvLyB0aGUgY29tcGFyaXNvbiBieSBcIj09XCIgZG9lcyB0b28sIGJ1dCBub3QgaW4gdGhlIHNlcnZlclxuICAgIHZhbHVlICs9ICcnO1xuICAgIC8vIHRlc3QgZm9yIHBhcmVudCBhdm9pZHMgZXJyb3Igd2l0aCBpbnZhbGlkIGFzc2lnbm1lbnQgdG8gbm9kZVZhbHVlXG4gICAgaWYgKHBhcmVudCkge1xuICAgICAgLy8gY2FjaGUgdGhlIHBhcmVudCBub2RlIGJlY2F1c2Ugc29tZWhvdyBpdCB3aWxsIGJlY29tZSBudWxsIG9uIElFXG4gICAgICAvLyBvbiB0aGUgbmV4dCBpdGVyYXRpb25cbiAgICAgIGV4cHIucGFyZW50ID0gcGFyZW50O1xuICAgICAgaWYgKHBhcmVudC50YWdOYW1lID09PSAnVEVYVEFSRUEnKSB7XG4gICAgICAgIHBhcmVudC52YWx1ZSA9IHZhbHVlOyAgICAgICAgICAgICAgICAgICAgLy8gIzExMTNcbiAgICAgICAgaWYgKCFJRV9WRVJTSU9OKSB7IGRvbS5ub2RlVmFsdWUgPSB2YWx1ZTsgfSAgLy8gIzE2MjUgSUUgdGhyb3dzIGhlcmUsIG5vZGVWYWx1ZVxuICAgICAgfSAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgLy8gd2lsbCBiZSBhdmFpbGFibGUgb24gJ3VwZGF0ZWQnXG4gICAgICBlbHNlIHsgZG9tLm5vZGVWYWx1ZSA9IHZhbHVlOyB9XG4gICAgfVxuICAgIHJldHVyblxuICB9XG5cbiAgLy8gcmVtb3ZlIG9yaWdpbmFsIGF0dHJpYnV0ZVxuICBpZiAoIWV4cHIuaXNBdHRyUmVtb3ZlZCB8fCAhdmFsdWUpIHtcbiAgICByZW1BdHRyKGRvbSwgYXR0ck5hbWUpO1xuICAgIGV4cHIuaXNBdHRyUmVtb3ZlZCA9IHRydWU7XG4gIH1cblxuICAvLyBldmVudCBoYW5kbGVyXG4gIGlmIChpc0Z1bmN0aW9uKHZhbHVlKSkge1xuICAgIHNldEV2ZW50SGFuZGxlcihhdHRyTmFtZSwgdmFsdWUsIGRvbSwgdGhpcyk7XG4gIC8vIHNob3cgLyBoaWRlXG4gIH0gZWxzZSBpZiAoL14oc2hvd3xoaWRlKSQvLnRlc3QoYXR0ck5hbWUpKSB7XG4gICAgaWYgKGF0dHJOYW1lID09PSAnaGlkZScpIHsgdmFsdWUgPSAhdmFsdWU7IH1cbiAgICBkb20uc3R5bGUuZGlzcGxheSA9IHZhbHVlID8gJycgOiAnbm9uZSc7XG4gIC8vIGZpZWxkIHZhbHVlXG4gIH0gZWxzZSBpZiAoaXNWYWx1ZUF0dHIpIHtcbiAgICBkb20udmFsdWUgPSB2YWx1ZTtcbiAgLy8gPGltZyBzcmM9XCJ7IGV4cHIgfVwiPlxuICB9IGVsc2UgaWYgKHN0YXJ0c1dpdGgoYXR0ck5hbWUsIFJJT1RfUFJFRklYKSAmJiBhdHRyTmFtZSAhPT0gUklPVF9UQUdfSVMpIHtcbiAgICBpZiAodmFsdWUgIT0gbnVsbClcbiAgICAgIHsgc2V0QXR0cihkb20sIGF0dHJOYW1lLnNsaWNlKFJJT1RfUFJFRklYLmxlbmd0aCksIHZhbHVlKTsgfVxuICB9IGVsc2Uge1xuICAgIC8vIDxzZWxlY3Q+IDxvcHRpb24gc2VsZWN0ZWQ9e3RydWV9PiA8L3NlbGVjdD5cbiAgICBpZiAoYXR0ck5hbWUgPT09ICdzZWxlY3RlZCcgJiYgcGFyZW50ICYmIC9eKFNFTEVDVHxPUFRHUk9VUCkkLy50ZXN0KHBhcmVudC50YWdOYW1lKSAmJiB2YWx1ZSAhPSBudWxsKSB7XG4gICAgICBwYXJlbnQudmFsdWUgPSBkb20udmFsdWU7XG4gICAgfSBpZiAoZXhwci5ib29sKSB7XG4gICAgICBkb21bYXR0ck5hbWVdID0gdmFsdWU7XG4gICAgICBpZiAoIXZhbHVlKSB7IHJldHVybiB9XG4gICAgfSBpZiAodmFsdWUgPT09IDAgfHwgdmFsdWUgJiYgdHlwZW9mIHZhbHVlICE9PSBUX09CSkVDVCkge1xuICAgICAgc2V0QXR0cihkb20sIGF0dHJOYW1lLCB2YWx1ZSk7XG4gICAgfVxuICB9XG59XG5cbi8qKlxuICogVXBkYXRlIGFsbCB0aGUgZXhwcmVzc2lvbnMgaW4gYSBUYWcgaW5zdGFuY2VcbiAqIEB0aGlzIFRhZ1xuICogQHBhcmFtIHsgQXJyYXkgfSBleHByZXNzaW9ucyAtIGV4cHJlc3Npb24gdGhhdCBtdXN0IGJlIHJlIGV2YWx1YXRlZFxuICovXG5mdW5jdGlvbiB1cGRhdGUkMSQxKGV4cHJlc3Npb25zKSB7XG4gIGVhY2goZXhwcmVzc2lvbnMsIHVwZGF0ZUV4cHJlc3Npb24uYmluZCh0aGlzKSk7XG59XG5cbnZhciBJZkV4cHIgPSB7XG4gIGluaXQ6IGZ1bmN0aW9uIGluaXQoZG9tLCBwYXJlbnRUYWcsIGV4cHIpIHtcbiAgICByZW1BdHRyKGRvbSwgJ2lmJyk7XG4gICAgdGhpcy5wYXJlbnRUYWcgPSBwYXJlbnRUYWc7XG4gICAgdGhpcy5leHByID0gZXhwcjtcbiAgICB0aGlzLnN0dWIgPSBkb2N1bWVudC5jcmVhdGVUZXh0Tm9kZSgnJyk7XG4gICAgdGhpcy5wcmlzdGluZSA9IGRvbTtcblxuICAgIHZhciBwID0gZG9tLnBhcmVudE5vZGU7XG4gICAgcC5pbnNlcnRCZWZvcmUodGhpcy5zdHViLCBkb20pO1xuICAgIHAucmVtb3ZlQ2hpbGQoZG9tKTtcblxuICAgIHJldHVybiB0aGlzXG4gIH0sXG4gIHVwZGF0ZTogZnVuY3Rpb24gdXBkYXRlJDEoKSB7XG4gICAgdmFyIG5ld1ZhbHVlID0gdG1wbCh0aGlzLmV4cHIsIHRoaXMucGFyZW50VGFnKTtcblxuICAgIGlmIChuZXdWYWx1ZSAmJiAhdGhpcy5jdXJyZW50KSB7IC8vIGluc2VydFxuICAgICAgdGhpcy5jdXJyZW50ID0gdGhpcy5wcmlzdGluZS5jbG9uZU5vZGUodHJ1ZSk7XG4gICAgICB0aGlzLnN0dWIucGFyZW50Tm9kZS5pbnNlcnRCZWZvcmUodGhpcy5jdXJyZW50LCB0aGlzLnN0dWIpO1xuXG4gICAgICB0aGlzLmV4cHJlc3Npb25zID0gW107XG4gICAgICBwYXJzZUV4cHJlc3Npb25zLmFwcGx5KHRoaXMucGFyZW50VGFnLCBbdGhpcy5jdXJyZW50LCB0aGlzLmV4cHJlc3Npb25zLCB0cnVlXSk7XG4gICAgfSBlbHNlIGlmICghbmV3VmFsdWUgJiYgdGhpcy5jdXJyZW50KSB7IC8vIHJlbW92ZVxuICAgICAgdW5tb3VudEFsbCh0aGlzLmV4cHJlc3Npb25zKTtcbiAgICAgIGlmICh0aGlzLmN1cnJlbnQuX3RhZykge1xuICAgICAgICB0aGlzLmN1cnJlbnQuX3RhZy51bm1vdW50KCk7XG4gICAgICB9IGVsc2UgaWYgKHRoaXMuY3VycmVudC5wYXJlbnROb2RlKVxuICAgICAgICB7IHRoaXMuY3VycmVudC5wYXJlbnROb2RlLnJlbW92ZUNoaWxkKHRoaXMuY3VycmVudCk7IH1cbiAgICAgIHRoaXMuY3VycmVudCA9IG51bGw7XG4gICAgICB0aGlzLmV4cHJlc3Npb25zID0gW107XG4gICAgfVxuXG4gICAgaWYgKG5ld1ZhbHVlKSB7IHVwZGF0ZSQxJDEuY2FsbCh0aGlzLnBhcmVudFRhZywgdGhpcy5leHByZXNzaW9ucyk7IH1cbiAgfSxcbiAgdW5tb3VudDogZnVuY3Rpb24gdW5tb3VudCgpIHtcbiAgICB1bm1vdW50QWxsKHRoaXMuZXhwcmVzc2lvbnMgfHwgW10pO1xuICAgIGRlbGV0ZSB0aGlzLnByaXN0aW5lO1xuICAgIGRlbGV0ZSB0aGlzLnBhcmVudE5vZGU7XG4gICAgZGVsZXRlIHRoaXMuc3R1YjtcbiAgfVxufTtcblxudmFyIFJlZkV4cHIgPSB7XG4gIGluaXQ6IGZ1bmN0aW9uIGluaXQoZG9tLCBhdHRyTmFtZSwgYXR0clZhbHVlLCBwYXJlbnQpIHtcbiAgICB0aGlzLmRvbSA9IGRvbTtcbiAgICB0aGlzLmF0dHIgPSBhdHRyTmFtZTtcbiAgICB0aGlzLnJhd1ZhbHVlID0gYXR0clZhbHVlO1xuICAgIHRoaXMucGFyZW50ID0gcGFyZW50O1xuICAgIHRoaXMuaGFzRXhwID0gdG1wbC5oYXNFeHByKGF0dHJWYWx1ZSk7XG4gICAgdGhpcy5maXJzdFJ1biA9IHRydWU7XG5cbiAgICByZXR1cm4gdGhpc1xuICB9LFxuICB1cGRhdGU6IGZ1bmN0aW9uIHVwZGF0ZSgpIHtcbiAgICB2YXIgdmFsdWUgPSB0aGlzLnJhd1ZhbHVlO1xuICAgIGlmICh0aGlzLmhhc0V4cClcbiAgICAgIHsgdmFsdWUgPSB0bXBsKHRoaXMucmF3VmFsdWUsIHRoaXMucGFyZW50KTsgfVxuXG4gICAgLy8gaWYgbm90aGluZyBjaGFuZ2VkLCB3ZSdyZSBkb25lXG4gICAgaWYgKCF0aGlzLmZpcnN0UnVuICYmIHZhbHVlID09PSB0aGlzLnZhbHVlKSB7IHJldHVybiB9XG5cbiAgICB2YXIgY3VzdG9tUGFyZW50ID0gdGhpcy5wYXJlbnQgJiYgZ2V0SW1tZWRpYXRlQ3VzdG9tUGFyZW50VGFnKHRoaXMucGFyZW50KTtcblxuICAgIC8vIGlmIHRoZSByZWZlcmVuY2VkIGVsZW1lbnQgaXMgYSBjdXN0b20gdGFnLCB0aGVuIHdlIHNldCB0aGUgdGFnIGl0c2VsZiwgcmF0aGVyIHRoYW4gRE9NXG4gICAgdmFyIHRhZ09yRG9tID0gdGhpcy50YWcgfHwgdGhpcy5kb207XG5cbiAgICAvLyB0aGUgbmFtZSBjaGFuZ2VkLCBzbyB3ZSBuZWVkIHRvIHJlbW92ZSBpdCBmcm9tIHRoZSBvbGQga2V5IChpZiBwcmVzZW50KVxuICAgIGlmICghaXNCbGFuayh0aGlzLnZhbHVlKSAmJiBjdXN0b21QYXJlbnQpXG4gICAgICB7IGFycmF5aXNoUmVtb3ZlKGN1c3RvbVBhcmVudC5yZWZzLCB0aGlzLnZhbHVlLCB0YWdPckRvbSk7IH1cblxuICAgIGlmIChpc0JsYW5rKHZhbHVlKSkge1xuICAgICAgLy8gaWYgdGhlIHZhbHVlIGlzIGJsYW5rLCB3ZSByZW1vdmUgaXRcbiAgICAgIHJlbUF0dHIodGhpcy5kb20sIHRoaXMuYXR0cik7XG4gICAgfSBlbHNlIHtcbiAgICAgIC8vIGFkZCBpdCB0byB0aGUgcmVmcyBvZiBwYXJlbnQgdGFnICh0aGlzIGJlaGF2aW9yIHdhcyBjaGFuZ2VkID49My4wKVxuICAgICAgaWYgKGN1c3RvbVBhcmVudCkgeyBhcnJheWlzaEFkZChjdXN0b21QYXJlbnQucmVmcywgdmFsdWUsIHRhZ09yRG9tKTsgfVxuICAgICAgLy8gc2V0IHRoZSBhY3R1YWwgRE9NIGF0dHJcbiAgICAgIHNldEF0dHIodGhpcy5kb20sIHRoaXMuYXR0ciwgdmFsdWUpO1xuICAgIH1cbiAgICB0aGlzLnZhbHVlID0gdmFsdWU7XG4gICAgdGhpcy5maXJzdFJ1biA9IGZhbHNlO1xuICB9LFxuICB1bm1vdW50OiBmdW5jdGlvbiB1bm1vdW50KCkge1xuICAgIHZhciB0YWdPckRvbSA9IHRoaXMudGFnIHx8IHRoaXMuZG9tO1xuICAgIHZhciBjdXN0b21QYXJlbnQgPSB0aGlzLnBhcmVudCAmJiBnZXRJbW1lZGlhdGVDdXN0b21QYXJlbnRUYWcodGhpcy5wYXJlbnQpO1xuICAgIGlmICghaXNCbGFuayh0aGlzLnZhbHVlKSAmJiBjdXN0b21QYXJlbnQpXG4gICAgICB7IGFycmF5aXNoUmVtb3ZlKGN1c3RvbVBhcmVudC5yZWZzLCB0aGlzLnZhbHVlLCB0YWdPckRvbSk7IH1cbiAgICBkZWxldGUgdGhpcy5kb207XG4gICAgZGVsZXRlIHRoaXMucGFyZW50O1xuICB9XG59O1xuXG4vKipcbiAqIENvbnZlcnQgdGhlIGl0ZW0gbG9vcGVkIGludG8gYW4gb2JqZWN0IHVzZWQgdG8gZXh0ZW5kIHRoZSBjaGlsZCB0YWcgcHJvcGVydGllc1xuICogQHBhcmFtICAgeyBPYmplY3QgfSBleHByIC0gb2JqZWN0IGNvbnRhaW5pbmcgdGhlIGtleXMgdXNlZCB0byBleHRlbmQgdGhlIGNoaWxkcmVuIHRhZ3NcbiAqIEBwYXJhbSAgIHsgKiB9IGtleSAtIHZhbHVlIHRvIGFzc2lnbiB0byB0aGUgbmV3IG9iamVjdCByZXR1cm5lZFxuICogQHBhcmFtICAgeyAqIH0gdmFsIC0gdmFsdWUgY29udGFpbmluZyB0aGUgcG9zaXRpb24gb2YgdGhlIGl0ZW0gaW4gdGhlIGFycmF5XG4gKiBAcGFyYW0gICB7IE9iamVjdCB9IGJhc2UgLSBwcm90b3R5cGUgb2JqZWN0IGZvciB0aGUgbmV3IGl0ZW1cbiAqIEByZXR1cm5zIHsgT2JqZWN0IH0gLSBuZXcgb2JqZWN0IGNvbnRhaW5pbmcgdGhlIHZhbHVlcyBvZiB0aGUgb3JpZ2luYWwgaXRlbVxuICpcbiAqIFRoZSB2YXJpYWJsZXMgJ2tleScgYW5kICd2YWwnIGFyZSBhcmJpdHJhcnkuXG4gKiBUaGV5IGRlcGVuZCBvbiB0aGUgY29sbGVjdGlvbiB0eXBlIGxvb3BlZCAoQXJyYXksIE9iamVjdClcbiAqIGFuZCBvbiB0aGUgZXhwcmVzc2lvbiB1c2VkIG9uIHRoZSBlYWNoIHRhZ1xuICpcbiAqL1xuZnVuY3Rpb24gbWtpdGVtKGV4cHIsIGtleSwgdmFsLCBiYXNlKSB7XG4gIHZhciBpdGVtID0gYmFzZSA/IE9iamVjdC5jcmVhdGUoYmFzZSkgOiB7fTtcbiAgaXRlbVtleHByLmtleV0gPSBrZXk7XG4gIGlmIChleHByLnBvcykgeyBpdGVtW2V4cHIucG9zXSA9IHZhbDsgfVxuICByZXR1cm4gaXRlbVxufVxuXG4vKipcbiAqIFVubW91bnQgdGhlIHJlZHVuZGFudCB0YWdzXG4gKiBAcGFyYW0gICB7IEFycmF5IH0gaXRlbXMgLSBhcnJheSBjb250YWluaW5nIHRoZSBjdXJyZW50IGl0ZW1zIHRvIGxvb3BcbiAqIEBwYXJhbSAgIHsgQXJyYXkgfSB0YWdzIC0gYXJyYXkgY29udGFpbmluZyBhbGwgdGhlIGNoaWxkcmVuIHRhZ3NcbiAqIEBwYXJhbSAgIHsgU3RyaW5nIH0gdGFnTmFtZSAtIGtleSB1c2VkIHRvIGlkZW50aWZ5IHRoZSB0eXBlIG9mIHRhZ1xuICogQHBhcmFtICAgeyBPYmplY3QgfSBwYXJlbnQgLSBwYXJlbnQgdGFnIHRvIHJlbW92ZSB0aGUgY2hpbGQgZnJvbVxuICovXG5mdW5jdGlvbiB1bm1vdW50UmVkdW5kYW50KGl0ZW1zLCB0YWdzLCB0YWdOYW1lLCBwYXJlbnQpIHtcblxuICB2YXIgaSA9IHRhZ3MubGVuZ3RoLFxuICAgIGogPSBpdGVtcy5sZW5ndGgsXG4gICAgdDtcblxuICB3aGlsZSAoaSA+IGopIHtcbiAgICB0ID0gdGFnc1stLWldO1xuICAgIHRhZ3Muc3BsaWNlKGksIDEpO1xuICAgIHQudW5tb3VudCgpO1xuICAgIGFycmF5aXNoUmVtb3ZlKHBhcmVudC50YWdzLCB0YWdOYW1lLCB0LCB0cnVlKTtcbiAgfVxufVxuXG4vKipcbiAqIE1vdmUgdGhlIG5lc3RlZCBjdXN0b20gdGFncyBpbiBub24gY3VzdG9tIGxvb3AgdGFnc1xuICogQHRoaXMgVGFnXG4gKiBAcGFyYW0gICB7IE51bWJlciB9IGkgLSBjdXJyZW50IHBvc2l0aW9uIG9mIHRoZSBsb29wIHRhZ1xuICovXG5mdW5jdGlvbiBtb3ZlTmVzdGVkVGFncyhpKSB7XG4gIHZhciB0aGlzJDEgPSB0aGlzO1xuXG4gIGVhY2goT2JqZWN0LmtleXModGhpcy50YWdzKSwgZnVuY3Rpb24gKHRhZ05hbWUpIHtcbiAgICB2YXIgdGFnID0gdGhpcyQxLnRhZ3NbdGFnTmFtZV07XG4gICAgaWYgKGlzQXJyYXkodGFnKSlcbiAgICAgIHsgZWFjaCh0YWcsIGZ1bmN0aW9uICh0KSB7XG4gICAgICAgIG1vdmVDaGlsZFRhZy5hcHBseSh0LCBbdGFnTmFtZSwgaV0pO1xuICAgICAgfSk7IH1cbiAgICBlbHNlXG4gICAgICB7IG1vdmVDaGlsZFRhZy5hcHBseSh0YWcsIFt0YWdOYW1lLCBpXSk7IH1cbiAgfSk7XG59XG5cbi8qKlxuICogTW92ZSBhIGNoaWxkIHRhZ1xuICogQHRoaXMgVGFnXG4gKiBAcGFyYW0gICB7IEhUTUxFbGVtZW50IH0gcm9vdCAtIGRvbSBub2RlIGNvbnRhaW5pbmcgYWxsIHRoZSBsb29wIGNoaWxkcmVuXG4gKiBAcGFyYW0gICB7IFRhZyB9IG5leHRUYWcgLSBpbnN0YW5jZSBvZiB0aGUgbmV4dCB0YWcgcHJlY2VkaW5nIHRoZSBvbmUgd2Ugd2FudCB0byBtb3ZlXG4gKiBAcGFyYW0gICB7IEJvb2xlYW4gfSBpc1ZpcnR1YWwgLSBpcyBpdCBhIHZpcnR1YWwgdGFnP1xuICovXG5mdW5jdGlvbiBtb3ZlKHJvb3QsIG5leHRUYWcsIGlzVmlydHVhbCkge1xuICBpZiAoaXNWaXJ0dWFsKVxuICAgIHsgbW92ZVZpcnR1YWwuYXBwbHkodGhpcywgW3Jvb3QsIG5leHRUYWddKTsgfVxuICBlbHNlXG4gICAgeyBzYWZlSW5zZXJ0KHJvb3QsIHRoaXMucm9vdCwgbmV4dFRhZy5yb290KTsgfVxufVxuXG4vKipcbiAqIEluc2VydCBhbmQgbW91bnQgYSBjaGlsZCB0YWdcbiAqIEB0aGlzIFRhZ1xuICogQHBhcmFtICAgeyBIVE1MRWxlbWVudCB9IHJvb3QgLSBkb20gbm9kZSBjb250YWluaW5nIGFsbCB0aGUgbG9vcCBjaGlsZHJlblxuICogQHBhcmFtICAgeyBUYWcgfSBuZXh0VGFnIC0gaW5zdGFuY2Ugb2YgdGhlIG5leHQgdGFnIHByZWNlZGluZyB0aGUgb25lIHdlIHdhbnQgdG8gaW5zZXJ0XG4gKiBAcGFyYW0gICB7IEJvb2xlYW4gfSBpc1ZpcnR1YWwgLSBpcyBpdCBhIHZpcnR1YWwgdGFnP1xuICovXG5mdW5jdGlvbiBpbnNlcnQocm9vdCwgbmV4dFRhZywgaXNWaXJ0dWFsKSB7XG4gIGlmIChpc1ZpcnR1YWwpXG4gICAgeyBtYWtlVmlydHVhbC5hcHBseSh0aGlzLCBbcm9vdCwgbmV4dFRhZ10pOyB9XG4gIGVsc2VcbiAgICB7IHNhZmVJbnNlcnQocm9vdCwgdGhpcy5yb290LCBuZXh0VGFnLnJvb3QpOyB9XG59XG5cbi8qKlxuICogQXBwZW5kIGEgbmV3IHRhZyBpbnRvIHRoZSBET01cbiAqIEB0aGlzIFRhZ1xuICogQHBhcmFtICAgeyBIVE1MRWxlbWVudCB9IHJvb3QgLSBkb20gbm9kZSBjb250YWluaW5nIGFsbCB0aGUgbG9vcCBjaGlsZHJlblxuICogQHBhcmFtICAgeyBCb29sZWFuIH0gaXNWaXJ0dWFsIC0gaXMgaXQgYSB2aXJ0dWFsIHRhZz9cbiAqL1xuZnVuY3Rpb24gYXBwZW5kKHJvb3QsIGlzVmlydHVhbCkge1xuICBpZiAoaXNWaXJ0dWFsKVxuICAgIHsgbWFrZVZpcnR1YWwuY2FsbCh0aGlzLCByb290KTsgfVxuICBlbHNlXG4gICAgeyByb290LmFwcGVuZENoaWxkKHRoaXMucm9vdCk7IH1cbn1cblxuLyoqXG4gKiBNYW5hZ2UgdGFncyBoYXZpbmcgdGhlICdlYWNoJ1xuICogQHBhcmFtICAgeyBIVE1MRWxlbWVudCB9IGRvbSAtIERPTSBub2RlIHdlIG5lZWQgdG8gbG9vcFxuICogQHBhcmFtICAgeyBUYWcgfSBwYXJlbnQgLSBwYXJlbnQgdGFnIGluc3RhbmNlIHdoZXJlIHRoZSBkb20gbm9kZSBpcyBjb250YWluZWRcbiAqIEBwYXJhbSAgIHsgU3RyaW5nIH0gZXhwciAtIHN0cmluZyBjb250YWluZWQgaW4gdGhlICdlYWNoJyBhdHRyaWJ1dGVcbiAqIEByZXR1cm5zIHsgT2JqZWN0IH0gZXhwcmVzc2lvbiBvYmplY3QgZm9yIHRoaXMgZWFjaCBsb29wXG4gKi9cbmZ1bmN0aW9uIF9lYWNoKGRvbSwgcGFyZW50LCBleHByKSB7XG5cbiAgLy8gcmVtb3ZlIHRoZSBlYWNoIHByb3BlcnR5IGZyb20gdGhlIG9yaWdpbmFsIHRhZ1xuICByZW1BdHRyKGRvbSwgJ2VhY2gnKTtcblxuICB2YXIgbXVzdFJlb3JkZXIgPSB0eXBlb2YgZ2V0QXR0cihkb20sICduby1yZW9yZGVyJykgIT09IFRfU1RSSU5HIHx8IHJlbUF0dHIoZG9tLCAnbm8tcmVvcmRlcicpLFxuICAgIHRhZ05hbWUgPSBnZXRUYWdOYW1lKGRvbSksXG4gICAgaW1wbCA9IF9fVEFHX0lNUExbdGFnTmFtZV0gfHwgeyB0bXBsOiBnZXRPdXRlckhUTUwoZG9tKSB9LFxuICAgIHVzZVJvb3QgPSBSRV9TUEVDSUFMX1RBR1MudGVzdCh0YWdOYW1lKSxcbiAgICByb290ID0gZG9tLnBhcmVudE5vZGUsXG4gICAgcmVmID0gY3JlYXRlRE9NUGxhY2Vob2xkZXIoKSxcbiAgICBjaGlsZCA9IGdldFRhZyhkb20pLFxuICAgIGlmRXhwciA9IGdldEF0dHIoZG9tLCAnaWYnKSxcbiAgICB0YWdzID0gW10sXG4gICAgb2xkSXRlbXMgPSBbXSxcbiAgICBoYXNLZXlzLFxuICAgIGlzTG9vcCA9IHRydWUsXG4gICAgaXNBbm9ueW1vdXMgPSAhX19UQUdfSU1QTFt0YWdOYW1lXSxcbiAgICBpc1ZpcnR1YWwgPSBkb20udGFnTmFtZSA9PT0gJ1ZJUlRVQUwnO1xuXG4gIC8vIHBhcnNlIHRoZSBlYWNoIGV4cHJlc3Npb25cbiAgZXhwciA9IHRtcGwubG9vcEtleXMoZXhwcik7XG4gIGV4cHIuaXNMb29wID0gdHJ1ZTtcblxuICBpZiAoaWZFeHByKSB7IHJlbUF0dHIoZG9tLCAnaWYnKTsgfVxuXG4gIC8vIGluc2VydCBhIG1hcmtlZCB3aGVyZSB0aGUgbG9vcCB0YWdzIHdpbGwgYmUgaW5qZWN0ZWRcbiAgcm9vdC5pbnNlcnRCZWZvcmUocmVmLCBkb20pO1xuICByb290LnJlbW92ZUNoaWxkKGRvbSk7XG5cbiAgZXhwci51cGRhdGUgPSBmdW5jdGlvbiB1cGRhdGVFYWNoKCkge1xuXG4gICAgLy8gZ2V0IHRoZSBuZXcgaXRlbXMgY29sbGVjdGlvblxuICAgIHZhciBpdGVtcyA9IHRtcGwoZXhwci52YWwsIHBhcmVudCksXG4gICAgICBwYXJlbnROb2RlLFxuICAgICAgZnJhZyxcbiAgICAgIHBsYWNlaG9sZGVyO1xuXG5cbiAgICByb290ID0gcmVmLnBhcmVudE5vZGU7XG5cbiAgICBpZiAocGFyZW50Tm9kZSkge1xuICAgICAgcGxhY2Vob2xkZXIgPSBjcmVhdGVET01QbGFjZWhvbGRlcignJyk7XG4gICAgICBwYXJlbnROb2RlLmluc2VydEJlZm9yZShwbGFjZWhvbGRlciwgcm9vdCk7XG4gICAgICBwYXJlbnROb2RlLnJlbW92ZUNoaWxkKHJvb3QpO1xuICAgIH0gZWxzZSB7XG4gICAgICBmcmFnID0gY3JlYXRlRnJhZygpO1xuICAgIH1cblxuICAgIC8vIG9iamVjdCBsb29wLiBhbnkgY2hhbmdlcyBjYXVzZSBmdWxsIHJlZHJhd1xuICAgIGlmICghaXNBcnJheShpdGVtcykpIHtcbiAgICAgIGhhc0tleXMgPSBpdGVtcyB8fCBmYWxzZTtcbiAgICAgIGl0ZW1zID0gaGFzS2V5cyA/XG4gICAgICAgIE9iamVjdC5rZXlzKGl0ZW1zKS5tYXAoZnVuY3Rpb24gKGtleSkge1xuICAgICAgICAgIHJldHVybiBta2l0ZW0oZXhwciwgaXRlbXNba2V5XSwga2V5KVxuICAgICAgICB9KSA6IFtdO1xuICAgIH0gZWxzZSB7XG4gICAgICBoYXNLZXlzID0gZmFsc2U7XG4gICAgfVxuXG4gICAgaWYgKGlmRXhwcikge1xuICAgICAgaXRlbXMgPSBpdGVtcy5maWx0ZXIoZnVuY3Rpb24oaXRlbSwgaSkge1xuICAgICAgICBpZiAoZXhwci5rZXkpIHtcbiAgICAgICAgICByZXR1cm4gISF0bXBsKGlmRXhwciwgbWtpdGVtKGV4cHIsIGl0ZW0sIGksIHBhcmVudCkpXG4gICAgICAgIH1cbiAgICAgICAgLy8gaW4gY2FzZSBpdCdzIG5vdCBhIGtleWVkIGxvb3BcbiAgICAgICAgLy8gd2UgdGVzdCB0aGUgdmFsaWRpdHkgb2YgdGhlIGlmIGV4cHJlc3Npb24gYWdhaW5zdFxuICAgICAgICAvLyB0aGUgaXRlbSBhbmQgdGhlIHBhcmVudFxuICAgICAgICByZXR1cm4gISF0bXBsKGlmRXhwciwgcGFyZW50KSB8fCAhIXRtcGwoaWZFeHByLCBpdGVtKVxuICAgICAgfSk7XG4gICAgfVxuXG4gICAgLy8gbG9vcCBhbGwgdGhlIG5ldyBpdGVtc1xuICAgIGVhY2goaXRlbXMsIGZ1bmN0aW9uKGl0ZW0sIGkpIHtcbiAgICAgIC8vIHJlb3JkZXIgb25seSBpZiB0aGUgaXRlbXMgYXJlIG9iamVjdHNcbiAgICAgIHZhclxuICAgICAgICBfbXVzdFJlb3JkZXIgPSBtdXN0UmVvcmRlciAmJiB0eXBlb2YgaXRlbSA9PT0gVF9PQkpFQ1QgJiYgIWhhc0tleXMsXG4gICAgICAgIG9sZFBvcyA9IG9sZEl0ZW1zLmluZGV4T2YoaXRlbSksXG4gICAgICAgIHBvcyA9IH5vbGRQb3MgJiYgX211c3RSZW9yZGVyID8gb2xkUG9zIDogaSxcbiAgICAgICAgLy8gZG9lcyBhIHRhZyBleGlzdCBpbiB0aGlzIHBvc2l0aW9uP1xuICAgICAgICB0YWcgPSB0YWdzW3Bvc107XG5cbiAgICAgIGl0ZW0gPSAhaGFzS2V5cyAmJiBleHByLmtleSA/IG1raXRlbShleHByLCBpdGVtLCBpKSA6IGl0ZW07XG5cbiAgICAgIC8vIG5ldyB0YWdcbiAgICAgIGlmIChcbiAgICAgICAgIV9tdXN0UmVvcmRlciAmJiAhdGFnIC8vIHdpdGggbm8tcmVvcmRlciB3ZSBqdXN0IHVwZGF0ZSB0aGUgb2xkIHRhZ3NcbiAgICAgICAgfHxcbiAgICAgICAgX211c3RSZW9yZGVyICYmICF+b2xkUG9zIC8vIGJ5IGRlZmF1bHQgd2UgYWx3YXlzIHRyeSB0byByZW9yZGVyIHRoZSBET00gZWxlbWVudHNcbiAgICAgICkge1xuXG4gICAgICAgIHZhciBtdXN0QXBwZW5kID0gaSA9PT0gdGFncy5sZW5ndGg7XG5cbiAgICAgICAgdGFnID0gbmV3IFRhZyQkMShpbXBsLCB7XG4gICAgICAgICAgcGFyZW50OiBwYXJlbnQsXG4gICAgICAgICAgaXNMb29wOiBpc0xvb3AsXG4gICAgICAgICAgaXNBbm9ueW1vdXM6IGlzQW5vbnltb3VzLFxuICAgICAgICAgIHJvb3Q6IHVzZVJvb3QgPyByb290IDogZG9tLmNsb25lTm9kZSgpLFxuICAgICAgICAgIGl0ZW06IGl0ZW1cbiAgICAgICAgfSwgZG9tLmlubmVySFRNTCk7XG5cbiAgICAgICAgLy8gbW91bnQgdGhlIHRhZ1xuICAgICAgICB0YWcubW91bnQoKTtcblxuICAgICAgICBpZiAobXVzdEFwcGVuZClcbiAgICAgICAgICB7IGFwcGVuZC5hcHBseSh0YWcsIFtmcmFnIHx8IHJvb3QsIGlzVmlydHVhbF0pOyB9XG4gICAgICAgIGVsc2VcbiAgICAgICAgICB7IGluc2VydC5hcHBseSh0YWcsIFtyb290LCB0YWdzW2ldLCBpc1ZpcnR1YWxdKTsgfVxuXG4gICAgICAgIGlmICghbXVzdEFwcGVuZCkgeyBvbGRJdGVtcy5zcGxpY2UoaSwgMCwgaXRlbSk7IH1cbiAgICAgICAgdGFncy5zcGxpY2UoaSwgMCwgdGFnKTtcbiAgICAgICAgaWYgKGNoaWxkKSB7IGFycmF5aXNoQWRkKHBhcmVudC50YWdzLCB0YWdOYW1lLCB0YWcsIHRydWUpOyB9XG4gICAgICAgIHBvcyA9IGk7IC8vIGhhbmRsZWQgaGVyZSBzbyBubyBtb3ZlXG4gICAgICB9IGVsc2UgeyB0YWcudXBkYXRlKGl0ZW0pOyB9XG5cbiAgICAgIC8vIHJlb3JkZXIgdGhlIHRhZyBpZiBpdCdzIG5vdCBsb2NhdGVkIGluIGl0cyBwcmV2aW91cyBwb3NpdGlvblxuICAgICAgaWYgKHBvcyAhPT0gaSAmJiBfbXVzdFJlb3JkZXIpIHtcbiAgICAgICAgLy8gI2Nsb3NlcyAyMDQwXG4gICAgICAgIGlmIChjb250YWlucyhpdGVtcywgb2xkSXRlbXNbaV0pKSB7XG4gICAgICAgICAgbW92ZS5hcHBseSh0YWcsIFtyb290LCB0YWdzW2ldLCBpc1ZpcnR1YWxdKTtcbiAgICAgICAgfVxuICAgICAgICAvLyB1cGRhdGUgdGhlIHBvc2l0aW9uIGF0dHJpYnV0ZSBpZiBpdCBleGlzdHNcbiAgICAgICAgaWYgKGV4cHIucG9zKSB7IHRhZ1tleHByLnBvc10gPSBpOyB9XG4gICAgICAgIC8vIG1vdmUgdGhlIG9sZCB0YWcgaW5zdGFuY2VcbiAgICAgICAgdGFncy5zcGxpY2UoaSwgMCwgdGFncy5zcGxpY2UocG9zLCAxKVswXSk7XG4gICAgICAgIC8vIG1vdmUgdGhlIG9sZCBpdGVtXG4gICAgICAgIG9sZEl0ZW1zLnNwbGljZShpLCAwLCBvbGRJdGVtcy5zcGxpY2UocG9zLCAxKVswXSk7XG4gICAgICAgIC8vIGlmIHRoZSBsb29wIHRhZ3MgYXJlIG5vdCBjdXN0b21cbiAgICAgICAgLy8gd2UgbmVlZCB0byBtb3ZlIGFsbCB0aGVpciBjdXN0b20gdGFncyBpbnRvIHRoZSByaWdodCBwb3NpdGlvblxuICAgICAgICBpZiAoIWNoaWxkICYmIHRhZy50YWdzKSB7IG1vdmVOZXN0ZWRUYWdzLmNhbGwodGFnLCBpKTsgfVxuICAgICAgfVxuXG4gICAgICAvLyBjYWNoZSB0aGUgb3JpZ2luYWwgaXRlbSB0byB1c2UgaXQgaW4gdGhlIGV2ZW50cyBib3VuZCB0byB0aGlzIG5vZGVcbiAgICAgIC8vIGFuZCBpdHMgY2hpbGRyZW5cbiAgICAgIHRhZy5faXRlbSA9IGl0ZW07XG4gICAgICAvLyBjYWNoZSB0aGUgcmVhbCBwYXJlbnQgdGFnIGludGVybmFsbHlcbiAgICAgIGRlZmluZVByb3BlcnR5KHRhZywgJ19wYXJlbnQnLCBwYXJlbnQpO1xuICAgIH0pO1xuXG4gICAgLy8gcmVtb3ZlIHRoZSByZWR1bmRhbnQgdGFnc1xuICAgIHVubW91bnRSZWR1bmRhbnQoaXRlbXMsIHRhZ3MsIHRhZ05hbWUsIHBhcmVudCk7XG5cbiAgICAvLyBjbG9uZSB0aGUgaXRlbXMgYXJyYXlcbiAgICBvbGRJdGVtcyA9IGl0ZW1zLnNsaWNlKCk7XG5cbiAgICBpZiAoZnJhZykge1xuICAgICAgcm9vdC5pbnNlcnRCZWZvcmUoZnJhZywgcmVmKTtcbiAgICB9IGVsc2Uge1xuICAgICAgcGFyZW50Tm9kZS5pbnNlcnRCZWZvcmUocm9vdCwgcGxhY2Vob2xkZXIpO1xuICAgICAgcGFyZW50Tm9kZS5yZW1vdmVDaGlsZChwbGFjZWhvbGRlcik7XG4gICAgfVxuXG4gIH07XG5cbiAgZXhwci51bm1vdW50ID0gZnVuY3Rpb24oKSB7XG4gICAgZWFjaCh0YWdzLCBmdW5jdGlvbih0KSB7IHQudW5tb3VudCgpOyB9KTtcbiAgfTtcblxuICByZXR1cm4gZXhwclxufVxuXG4vKipcbiAqIFdhbGsgdGhlIHRhZyBET00gdG8gZGV0ZWN0IHRoZSBleHByZXNzaW9ucyB0byBldmFsdWF0ZVxuICogQHRoaXMgVGFnXG4gKiBAcGFyYW0gICB7IEhUTUxFbGVtZW50IH0gcm9vdCAtIHJvb3QgdGFnIHdoZXJlIHdlIHdpbGwgc3RhcnQgZGlnZ2luZyB0aGUgZXhwcmVzc2lvbnNcbiAqIEBwYXJhbSAgIHsgQXJyYXkgfSBleHByZXNzaW9ucyAtIGVtcHR5IGFycmF5IHdoZXJlIHRoZSBleHByZXNzaW9ucyB3aWxsIGJlIGFkZGVkXG4gKiBAcGFyYW0gICB7IEJvb2xlYW4gfSBtdXN0SW5jbHVkZVJvb3QgLSBmbGFnIHRvIGRlY2lkZSB3aGV0aGVyIHRoZSByb290IG11c3QgYmUgcGFyc2VkIGFzIHdlbGxcbiAqIEByZXR1cm5zIHsgT2JqZWN0IH0gYW4gb2JqZWN0IGNvbnRhaW5pbmcgdGhlIHJvb3Qgbm9vZGUgYW5kIHRoZSBkb20gdHJlZVxuICovXG5mdW5jdGlvbiBwYXJzZUV4cHJlc3Npb25zKHJvb3QsIGV4cHJlc3Npb25zLCBtdXN0SW5jbHVkZVJvb3QpIHtcbiAgdmFyIHRoaXMkMSA9IHRoaXM7XG5cbiAgdmFyIHRyZWUgPSB7cGFyZW50OiB7Y2hpbGRyZW46IGV4cHJlc3Npb25zfX07XG5cbiAgd2Fsa05vZGVzKHJvb3QsIGZ1bmN0aW9uIChkb20sIGN0eCkge1xuICAgIHZhciB0eXBlID0gZG9tLm5vZGVUeXBlLCBwYXJlbnQgPSBjdHgucGFyZW50LCBhdHRyLCBleHByLCB0YWdJbXBsO1xuICAgIGlmICghbXVzdEluY2x1ZGVSb290ICYmIGRvbSA9PT0gcm9vdCkgeyByZXR1cm4ge3BhcmVudDogcGFyZW50fSB9XG5cbiAgICAvLyB0ZXh0IG5vZGVcbiAgICBpZiAodHlwZSA9PT0gMyAmJiBkb20ucGFyZW50Tm9kZS50YWdOYW1lICE9PSAnU1RZTEUnICYmIHRtcGwuaGFzRXhwcihkb20ubm9kZVZhbHVlKSlcbiAgICAgIHsgcGFyZW50LmNoaWxkcmVuLnB1c2goe2RvbTogZG9tLCBleHByOiBkb20ubm9kZVZhbHVlfSk7IH1cblxuICAgIGlmICh0eXBlICE9PSAxKSB7IHJldHVybiBjdHggfSAvLyBub3QgYW4gZWxlbWVudFxuXG4gICAgLy8gbG9vcC4gZWFjaCBkb2VzIGl0J3Mgb3duIHRoaW5nIChmb3Igbm93KVxuICAgIGlmIChhdHRyID0gZ2V0QXR0cihkb20sICdlYWNoJykpIHtcbiAgICAgIHBhcmVudC5jaGlsZHJlbi5wdXNoKF9lYWNoKGRvbSwgdGhpcyQxLCBhdHRyKSk7XG4gICAgICByZXR1cm4gZmFsc2VcbiAgICB9XG5cbiAgICAvLyBpZi1hdHRycyBiZWNvbWUgdGhlIG5ldyBwYXJlbnQuIEFueSBmb2xsb3dpbmcgZXhwcmVzc2lvbnMgKGVpdGhlciBvbiB0aGUgY3VycmVudFxuICAgIC8vIGVsZW1lbnQsIG9yIGJlbG93IGl0KSBiZWNvbWUgY2hpbGRyZW4gb2YgdGhpcyBleHByZXNzaW9uLlxuICAgIGlmIChhdHRyID0gZ2V0QXR0cihkb20sICdpZicpKSB7XG4gICAgICBwYXJlbnQuY2hpbGRyZW4ucHVzaChPYmplY3QuY3JlYXRlKElmRXhwcikuaW5pdChkb20sIHRoaXMkMSwgYXR0cikpO1xuICAgICAgcmV0dXJuIGZhbHNlXG4gICAgfVxuXG4gICAgaWYgKGV4cHIgPSBnZXRBdHRyKGRvbSwgUklPVF9UQUdfSVMpKSB7XG4gICAgICBpZiAodG1wbC5oYXNFeHByKGV4cHIpKSB7XG4gICAgICAgIHBhcmVudC5jaGlsZHJlbi5wdXNoKHtpc1J0YWc6IHRydWUsIGV4cHI6IGV4cHIsIGRvbTogZG9tfSk7XG4gICAgICAgIHJldHVybiBmYWxzZVxuICAgICAgfVxuICAgIH1cblxuICAgIC8vIGlmIHRoaXMgaXMgYSB0YWcsIHN0b3AgdHJhdmVyc2luZyBoZXJlLlxuICAgIC8vIHdlIGlnbm9yZSB0aGUgcm9vdCwgc2luY2UgcGFyc2VFeHByZXNzaW9ucyBpcyBjYWxsZWQgd2hpbGUgd2UncmUgbW91bnRpbmcgdGhhdCByb290XG4gICAgdGFnSW1wbCA9IGdldFRhZyhkb20pO1xuICAgIGlmICh0YWdJbXBsICYmIChkb20gIT09IHJvb3QgfHwgbXVzdEluY2x1ZGVSb290KSkge1xuICAgICAgdmFyIGNvbmYgPSB7cm9vdDogZG9tLCBwYXJlbnQ6IHRoaXMkMSwgaGFzSW1wbDogdHJ1ZX07XG4gICAgICBwYXJlbnQuY2hpbGRyZW4ucHVzaChpbml0Q2hpbGRUYWcodGFnSW1wbCwgY29uZiwgZG9tLmlubmVySFRNTCwgdGhpcyQxKSk7XG4gICAgICByZXR1cm4gZmFsc2VcbiAgICB9XG5cbiAgICAvLyBhdHRyaWJ1dGUgZXhwcmVzc2lvbnNcbiAgICBwYXJzZUF0dHJpYnV0ZXMuYXBwbHkodGhpcyQxLCBbZG9tLCBkb20uYXR0cmlidXRlcywgZnVuY3Rpb24oYXR0ciwgZXhwcikge1xuICAgICAgaWYgKCFleHByKSB7IHJldHVybiB9XG4gICAgICBwYXJlbnQuY2hpbGRyZW4ucHVzaChleHByKTtcbiAgICB9XSk7XG5cbiAgICAvLyB3aGF0ZXZlciB0aGUgcGFyZW50IGlzLCBhbGwgY2hpbGQgZWxlbWVudHMgZ2V0IHRoZSBzYW1lIHBhcmVudC5cbiAgICAvLyBJZiB0aGlzIGVsZW1lbnQgaGFkIGFuIGlmLWF0dHIsIHRoYXQncyB0aGUgcGFyZW50IGZvciBhbGwgY2hpbGQgZWxlbWVudHNcbiAgICByZXR1cm4ge3BhcmVudDogcGFyZW50fVxuICB9LCB0cmVlKTtcblxuICByZXR1cm4geyB0cmVlOiB0cmVlLCByb290OiByb290IH1cbn1cblxuLyoqXG4gKiBDYWxscyBgZm5gIGZvciBldmVyeSBhdHRyaWJ1dGUgb24gYW4gZWxlbWVudC4gSWYgdGhhdCBhdHRyIGhhcyBhbiBleHByZXNzaW9uLFxuICogaXQgaXMgYWxzbyBwYXNzZWQgdG8gZm4uXG4gKiBAdGhpcyBUYWdcbiAqIEBwYXJhbSAgIHsgSFRNTEVsZW1lbnQgfSBkb20gLSBkb20gbm9kZSB0byBwYXJzZVxuICogQHBhcmFtICAgeyBBcnJheSB9IGF0dHJzIC0gYXJyYXkgb2YgYXR0cmlidXRlc1xuICogQHBhcmFtICAgeyBGdW5jdGlvbiB9IGZuIC0gY2FsbGJhY2sgdG8gZXhlYyBvbiBhbnkgaXRlcmF0aW9uXG4gKi9cbmZ1bmN0aW9uIHBhcnNlQXR0cmlidXRlcyhkb20sIGF0dHJzLCBmbikge1xuICB2YXIgdGhpcyQxID0gdGhpcztcblxuICBlYWNoKGF0dHJzLCBmdW5jdGlvbiAoYXR0cikge1xuICAgIHZhciBuYW1lID0gYXR0ci5uYW1lLCBib29sID0gaXNCb29sQXR0cihuYW1lKSwgZXhwcjtcblxuICAgIGlmICh+WydyZWYnLCAnZGF0YS1yZWYnXS5pbmRleE9mKG5hbWUpKSB7XG4gICAgICBleHByID0gIE9iamVjdC5jcmVhdGUoUmVmRXhwcikuaW5pdChkb20sIG5hbWUsIGF0dHIudmFsdWUsIHRoaXMkMSk7XG4gICAgfSBlbHNlIGlmICh0bXBsLmhhc0V4cHIoYXR0ci52YWx1ZSkpIHtcbiAgICAgIGV4cHIgPSB7ZG9tOiBkb20sIGV4cHI6IGF0dHIudmFsdWUsIGF0dHI6IGF0dHIubmFtZSwgYm9vbDogYm9vbH07XG4gICAgfVxuXG4gICAgZm4oYXR0ciwgZXhwcik7XG4gIH0pO1xufVxuXG4vKlxuICBJbmNsdWRlcyBoYWNrcyBuZWVkZWQgZm9yIHRoZSBJbnRlcm5ldCBFeHBsb3JlciB2ZXJzaW9uIDkgYW5kIGJlbG93XG4gIFNlZTogaHR0cDovL2thbmdheC5naXRodWIuaW8vY29tcGF0LXRhYmxlL2VzNS8jaWU4XG4gICAgICAgaHR0cDovL2NvZGVwbGFuZXQuaW8vZHJvcHBpbmctaWU4L1xuKi9cblxudmFyIHJlSGFzWWllbGQgID0gLzx5aWVsZFxcYi9pO1xudmFyIHJlWWllbGRBbGwgID0gLzx5aWVsZFxccyooPzpcXC8+fD4oW1xcU1xcc10qPyk8XFwveWllbGRcXHMqPnw+KS9pZztcbnZhciByZVlpZWxkU3JjICA9IC88eWllbGRcXHMrdG89WydcIl0oW14nXCI+XSopWydcIl1cXHMqPihbXFxTXFxzXSo/KTxcXC95aWVsZFxccyo+L2lnO1xudmFyIHJlWWllbGREZXN0ID0gLzx5aWVsZFxccytmcm9tPVsnXCJdPyhbLVxcd10rKVsnXCJdP1xccyooPzpcXC8+fD4oW1xcU1xcc10qPyk8XFwveWllbGRcXHMqPikvaWc7XG52YXIgcm9vdEVscyA9IHsgdHI6ICd0Ym9keScsIHRoOiAndHInLCB0ZDogJ3RyJywgY29sOiAnY29sZ3JvdXAnIH07XG52YXIgdGJsVGFncyA9IElFX1ZFUlNJT04gJiYgSUVfVkVSU0lPTiA8IDEwID8gUkVfU1BFQ0lBTF9UQUdTIDogUkVfU1BFQ0lBTF9UQUdTX05PX09QVElPTjtcbnZhciBHRU5FUklDID0gJ2Rpdic7XG5cblxuLypcbiAgQ3JlYXRlcyB0aGUgcm9vdCBlbGVtZW50IGZvciB0YWJsZSBvciBzZWxlY3QgY2hpbGQgZWxlbWVudHM6XG4gIHRyL3RoL3RkL3RoZWFkL3Rmb290L3Rib2R5L2NhcHRpb24vY29sL2NvbGdyb3VwL29wdGlvbi9vcHRncm91cFxuKi9cbmZ1bmN0aW9uIHNwZWNpYWxUYWdzKGVsLCB0bXBsLCB0YWdOYW1lKSB7XG5cbiAgdmFyXG4gICAgc2VsZWN0ID0gdGFnTmFtZVswXSA9PT0gJ28nLFxuICAgIHBhcmVudCA9IHNlbGVjdCA/ICdzZWxlY3Q+JyA6ICd0YWJsZT4nO1xuXG4gIC8vIHRyaW0oKSBpcyBpbXBvcnRhbnQgaGVyZSwgdGhpcyBlbnN1cmVzIHdlIGRvbid0IGhhdmUgYXJ0aWZhY3RzLFxuICAvLyBzbyB3ZSBjYW4gY2hlY2sgaWYgd2UgaGF2ZSBvbmx5IG9uZSBlbGVtZW50IGluc2lkZSB0aGUgcGFyZW50XG4gIGVsLmlubmVySFRNTCA9ICc8JyArIHBhcmVudCArIHRtcGwudHJpbSgpICsgJzwvJyArIHBhcmVudDtcbiAgcGFyZW50ID0gZWwuZmlyc3RDaGlsZDtcblxuICAvLyByZXR1cm5zIHRoZSBpbW1lZGlhdGUgcGFyZW50IGlmIHRyL3RoL3RkL2NvbCBpcyB0aGUgb25seSBlbGVtZW50LCBpZiBub3RcbiAgLy8gcmV0dXJucyB0aGUgd2hvbGUgdHJlZSwgYXMgdGhpcyBjYW4gaW5jbHVkZSBhZGRpdGlvbmFsIGVsZW1lbnRzXG4gIGlmIChzZWxlY3QpIHtcbiAgICBwYXJlbnQuc2VsZWN0ZWRJbmRleCA9IC0xOyAgLy8gZm9yIElFOSwgY29tcGF0aWJsZSB3L2N1cnJlbnQgcmlvdCBiZWhhdmlvclxuICB9IGVsc2Uge1xuICAgIC8vIGF2b2lkcyBpbnNlcnRpb24gb2YgY29pbnRhaW5lciBpbnNpZGUgY29udGFpbmVyIChleDogdGJvZHkgaW5zaWRlIHRib2R5KVxuICAgIHZhciB0bmFtZSA9IHJvb3RFbHNbdGFnTmFtZV07XG4gICAgaWYgKHRuYW1lICYmIHBhcmVudC5jaGlsZEVsZW1lbnRDb3VudCA9PT0gMSkgeyBwYXJlbnQgPSAkKHRuYW1lLCBwYXJlbnQpOyB9XG4gIH1cbiAgcmV0dXJuIHBhcmVudFxufVxuXG4vKlxuICBSZXBsYWNlIHRoZSB5aWVsZCB0YWcgZnJvbSBhbnkgdGFnIHRlbXBsYXRlIHdpdGggdGhlIGlubmVySFRNTCBvZiB0aGVcbiAgb3JpZ2luYWwgdGFnIGluIHRoZSBwYWdlXG4qL1xuZnVuY3Rpb24gcmVwbGFjZVlpZWxkKHRtcGwsIGh0bWwpIHtcbiAgLy8gZG8gbm90aGluZyBpZiBubyB5aWVsZFxuICBpZiAoIXJlSGFzWWllbGQudGVzdCh0bXBsKSkgeyByZXR1cm4gdG1wbCB9XG5cbiAgLy8gYmUgY2FyZWZ1bCB3aXRoICMxMzQzIC0gc3RyaW5nIG9uIHRoZSBzb3VyY2UgaGF2aW5nIGAkMWBcbiAgdmFyIHNyYyA9IHt9O1xuXG4gIGh0bWwgPSBodG1sICYmIGh0bWwucmVwbGFjZShyZVlpZWxkU3JjLCBmdW5jdGlvbiAoXywgcmVmLCB0ZXh0KSB7XG4gICAgc3JjW3JlZl0gPSBzcmNbcmVmXSB8fCB0ZXh0OyAgIC8vIHByZXNlcnZlIGZpcnN0IGRlZmluaXRpb25cbiAgICByZXR1cm4gJydcbiAgfSkudHJpbSgpO1xuXG4gIHJldHVybiB0bXBsXG4gICAgLnJlcGxhY2UocmVZaWVsZERlc3QsIGZ1bmN0aW9uIChfLCByZWYsIGRlZikgeyAgLy8geWllbGQgd2l0aCBmcm9tIC0gdG8gYXR0cnNcbiAgICAgIHJldHVybiBzcmNbcmVmXSB8fCBkZWYgfHwgJydcbiAgICB9KVxuICAgIC5yZXBsYWNlKHJlWWllbGRBbGwsIGZ1bmN0aW9uIChfLCBkZWYpIHsgICAgICAgIC8vIHlpZWxkIHdpdGhvdXQgYW55IFwiZnJvbVwiXG4gICAgICByZXR1cm4gaHRtbCB8fCBkZWYgfHwgJydcbiAgICB9KVxufVxuXG4vKipcbiAqIENyZWF0ZXMgYSBET00gZWxlbWVudCB0byB3cmFwIHRoZSBnaXZlbiBjb250ZW50LiBOb3JtYWxseSBhbiBgRElWYCwgYnV0IGNhbiBiZVxuICogYWxzbyBhIGBUQUJMRWAsIGBTRUxFQ1RgLCBgVEJPRFlgLCBgVFJgLCBvciBgQ09MR1JPVVBgIGVsZW1lbnQuXG4gKlxuICogQHBhcmFtICAgeyBTdHJpbmcgfSB0bXBsICAtIFRoZSB0ZW1wbGF0ZSBjb21pbmcgZnJvbSB0aGUgY3VzdG9tIHRhZyBkZWZpbml0aW9uXG4gKiBAcGFyYW0gICB7IFN0cmluZyB9IGh0bWwgLSBIVE1MIGNvbnRlbnQgdGhhdCBjb21lcyBmcm9tIHRoZSBET00gZWxlbWVudCB3aGVyZSB5b3VcbiAqICAgICAgICAgICB3aWxsIG1vdW50IHRoZSB0YWcsIG1vc3RseSB0aGUgb3JpZ2luYWwgdGFnIGluIHRoZSBwYWdlXG4gKiBAcGFyYW0gICB7IEJvb2xlYW4gfSBjaGVja1N2ZyAtIGZsYWcgbmVlZGVkIHRvIGtub3cgaWYgd2UgbmVlZCB0byBmb3JjZSB0aGUgc3ZnIHJlbmRlcmluZyBpbiBjYXNlIG9mIGxvb3Agbm9kZXNcbiAqIEByZXR1cm5zIHsgSFRNTEVsZW1lbnQgfSBET00gZWxlbWVudCB3aXRoIF90bXBsXyBtZXJnZWQgdGhyb3VnaCBgWUlFTERgIHdpdGggdGhlIF9odG1sXy5cbiAqL1xuZnVuY3Rpb24gbWtkb20odG1wbCwgaHRtbCwgY2hlY2tTdmcpIHtcbiAgdmFyIG1hdGNoICAgPSB0bXBsICYmIHRtcGwubWF0Y2goL15cXHMqPChbLVxcd10rKS8pLFxuICAgIHRhZ05hbWUgPSBtYXRjaCAmJiBtYXRjaFsxXS50b0xvd2VyQ2FzZSgpLFxuICAgIGVsID0gbWtFbChHRU5FUklDLCBjaGVja1N2ZyAmJiBpc1NWR1RhZyh0YWdOYW1lKSk7XG5cbiAgLy8gcmVwbGFjZSBhbGwgdGhlIHlpZWxkIHRhZ3Mgd2l0aCB0aGUgdGFnIGlubmVyIGh0bWxcbiAgdG1wbCA9IHJlcGxhY2VZaWVsZCh0bXBsLCBodG1sKTtcblxuICAvKiBpc3RhbmJ1bCBpZ25vcmUgbmV4dCAqL1xuICBpZiAodGJsVGFncy50ZXN0KHRhZ05hbWUpKVxuICAgIHsgZWwgPSBzcGVjaWFsVGFncyhlbCwgdG1wbCwgdGFnTmFtZSk7IH1cbiAgZWxzZVxuICAgIHsgc2V0SW5uZXJIVE1MKGVsLCB0bXBsKTsgfVxuXG4gIGVsLnN0dWIgPSB0cnVlO1xuXG4gIHJldHVybiBlbFxufVxuXG4vKipcbiAqIEFub3RoZXIgd2F5IHRvIGNyZWF0ZSBhIHJpb3QgdGFnIGEgYml0IG1vcmUgZXM2IGZyaWVuZGx5XG4gKiBAcGFyYW0geyBIVE1MRWxlbWVudCB9IGVsIC0gdGFnIERPTSBzZWxlY3RvciBvciBET00gbm9kZS9zXG4gKiBAcGFyYW0geyBPYmplY3QgfSBvcHRzIC0gdGFnIGxvZ2ljXG4gKiBAcmV0dXJucyB7IFRhZyB9IG5ldyByaW90IHRhZyBpbnN0YW5jZVxuICovXG5mdW5jdGlvbiBUYWckMShlbCwgb3B0cykge1xuICAvLyBnZXQgdGhlIHRhZyBwcm9wZXJ0aWVzIGZyb20gdGhlIGNsYXNzIGNvbnN0cnVjdG9yXG4gIHZhciByZWYgPSB0aGlzO1xuICB2YXIgbmFtZSA9IHJlZi5uYW1lO1xuICB2YXIgdG1wbCA9IHJlZi50bXBsO1xuICB2YXIgY3NzID0gcmVmLmNzcztcbiAgdmFyIGF0dHJzID0gcmVmLmF0dHJzO1xuICB2YXIgb25DcmVhdGUgPSByZWYub25DcmVhdGU7XG4gIC8vIHJlZ2lzdGVyIGEgbmV3IHRhZyBhbmQgY2FjaGUgdGhlIGNsYXNzIHByb3RvdHlwZVxuICBpZiAoIV9fVEFHX0lNUExbbmFtZV0pIHtcbiAgICB0YWckJDEobmFtZSwgdG1wbCwgY3NzLCBhdHRycywgb25DcmVhdGUpO1xuICAgIC8vIGNhY2hlIHRoZSBjbGFzcyBjb25zdHJ1Y3RvclxuICAgIF9fVEFHX0lNUExbbmFtZV0uY2xhc3MgPSB0aGlzLmNvbnN0cnVjdG9yO1xuICB9XG5cbiAgLy8gbW91bnQgdGhlIHRhZyB1c2luZyB0aGUgY2xhc3MgaW5zdGFuY2VcbiAgbW91bnRUbyhlbCwgbmFtZSwgb3B0cywgdGhpcyk7XG4gIC8vIGluamVjdCB0aGUgY29tcG9uZW50IGNzc1xuICBpZiAoY3NzKSB7IHN0eWxlTWFuYWdlci5pbmplY3QoKTsgfVxuXG4gIHJldHVybiB0aGlzXG59XG5cbi8qKlxuICogQ3JlYXRlIGEgbmV3IHJpb3QgdGFnIGltcGxlbWVudGF0aW9uXG4gKiBAcGFyYW0gICB7IFN0cmluZyB9ICAgbmFtZSAtIG5hbWUvaWQgb2YgdGhlIG5ldyByaW90IHRhZ1xuICogQHBhcmFtICAgeyBTdHJpbmcgfSAgIHRtcGwgLSB0YWcgdGVtcGxhdGVcbiAqIEBwYXJhbSAgIHsgU3RyaW5nIH0gICBjc3MgLSBjdXN0b20gdGFnIGNzc1xuICogQHBhcmFtICAgeyBTdHJpbmcgfSAgIGF0dHJzIC0gcm9vdCB0YWcgYXR0cmlidXRlc1xuICogQHBhcmFtICAgeyBGdW5jdGlvbiB9IGZuIC0gdXNlciBmdW5jdGlvblxuICogQHJldHVybnMgeyBTdHJpbmcgfSBuYW1lL2lkIG9mIHRoZSB0YWcganVzdCBjcmVhdGVkXG4gKi9cbmZ1bmN0aW9uIHRhZyQkMShuYW1lLCB0bXBsLCBjc3MsIGF0dHJzLCBmbikge1xuICBpZiAoaXNGdW5jdGlvbihhdHRycykpIHtcbiAgICBmbiA9IGF0dHJzO1xuXG4gICAgaWYgKC9eW1xcd1xcLV0rXFxzPz0vLnRlc3QoY3NzKSkge1xuICAgICAgYXR0cnMgPSBjc3M7XG4gICAgICBjc3MgPSAnJztcbiAgICB9IGVsc2VcbiAgICAgIHsgYXR0cnMgPSAnJzsgfVxuICB9XG5cbiAgaWYgKGNzcykge1xuICAgIGlmIChpc0Z1bmN0aW9uKGNzcykpXG4gICAgICB7IGZuID0gY3NzOyB9XG4gICAgZWxzZVxuICAgICAgeyBzdHlsZU1hbmFnZXIuYWRkKGNzcyk7IH1cbiAgfVxuXG4gIG5hbWUgPSBuYW1lLnRvTG93ZXJDYXNlKCk7XG4gIF9fVEFHX0lNUExbbmFtZV0gPSB7IG5hbWU6IG5hbWUsIHRtcGw6IHRtcGwsIGF0dHJzOiBhdHRycywgZm46IGZuIH07XG5cbiAgcmV0dXJuIG5hbWVcbn1cblxuLyoqXG4gKiBDcmVhdGUgYSBuZXcgcmlvdCB0YWcgaW1wbGVtZW50YXRpb24gKGZvciB1c2UgYnkgdGhlIGNvbXBpbGVyKVxuICogQHBhcmFtICAgeyBTdHJpbmcgfSAgIG5hbWUgLSBuYW1lL2lkIG9mIHRoZSBuZXcgcmlvdCB0YWdcbiAqIEBwYXJhbSAgIHsgU3RyaW5nIH0gICB0bXBsIC0gdGFnIHRlbXBsYXRlXG4gKiBAcGFyYW0gICB7IFN0cmluZyB9ICAgY3NzIC0gY3VzdG9tIHRhZyBjc3NcbiAqIEBwYXJhbSAgIHsgU3RyaW5nIH0gICBhdHRycyAtIHJvb3QgdGFnIGF0dHJpYnV0ZXNcbiAqIEBwYXJhbSAgIHsgRnVuY3Rpb24gfSBmbiAtIHVzZXIgZnVuY3Rpb25cbiAqIEByZXR1cm5zIHsgU3RyaW5nIH0gbmFtZS9pZCBvZiB0aGUgdGFnIGp1c3QgY3JlYXRlZFxuICovXG5mdW5jdGlvbiB0YWcyJCQxKG5hbWUsIHRtcGwsIGNzcywgYXR0cnMsIGZuKSB7XG4gIGlmIChjc3MpXG4gICAgeyBzdHlsZU1hbmFnZXIuYWRkKGNzcywgbmFtZSk7IH1cblxuICB2YXIgZXhpc3RzID0gISFfX1RBR19JTVBMW25hbWVdO1xuICBfX1RBR19JTVBMW25hbWVdID0geyBuYW1lOiBuYW1lLCB0bXBsOiB0bXBsLCBhdHRyczogYXR0cnMsIGZuOiBmbiB9O1xuXG4gIGlmIChleGlzdHMgJiYgdXRpbC5ob3RSZWxvYWRlcilcbiAgICB7IHV0aWwuaG90UmVsb2FkZXIobmFtZSk7IH1cblxuICByZXR1cm4gbmFtZVxufVxuXG4vKipcbiAqIE1vdW50IGEgdGFnIHVzaW5nIGEgc3BlY2lmaWMgdGFnIGltcGxlbWVudGF0aW9uXG4gKiBAcGFyYW0gICB7ICogfSBzZWxlY3RvciAtIHRhZyBET00gc2VsZWN0b3Igb3IgRE9NIG5vZGUvc1xuICogQHBhcmFtICAgeyBTdHJpbmcgfSB0YWdOYW1lIC0gdGFnIGltcGxlbWVudGF0aW9uIG5hbWVcbiAqIEBwYXJhbSAgIHsgT2JqZWN0IH0gb3B0cyAtIHRhZyBsb2dpY1xuICogQHJldHVybnMgeyBBcnJheSB9IG5ldyB0YWdzIGluc3RhbmNlc1xuICovXG5mdW5jdGlvbiBtb3VudCQkMShzZWxlY3RvciwgdGFnTmFtZSwgb3B0cykge1xuICB2YXIgdGFncyA9IFtdO1xuXG4gIGZ1bmN0aW9uIHB1c2hUYWdzVG8ocm9vdCkge1xuICAgIGlmIChyb290LnRhZ05hbWUpIHtcbiAgICAgIHZhciByaW90VGFnID0gZ2V0QXR0cihyb290LCBSSU9UX1RBR19JUyk7XG5cbiAgICAgIC8vIGhhdmUgdGFnTmFtZT8gZm9yY2UgcmlvdC10YWcgdG8gYmUgdGhlIHNhbWVcbiAgICAgIGlmICh0YWdOYW1lICYmIHJpb3RUYWcgIT09IHRhZ05hbWUpIHtcbiAgICAgICAgcmlvdFRhZyA9IHRhZ05hbWU7XG4gICAgICAgIHNldEF0dHIocm9vdCwgUklPVF9UQUdfSVMsIHRhZ05hbWUpO1xuICAgICAgfVxuXG4gICAgICB2YXIgdGFnJCQxID0gbW91bnRUbyhyb290LCByaW90VGFnIHx8IHJvb3QudGFnTmFtZS50b0xvd2VyQ2FzZSgpLCBvcHRzKTtcblxuICAgICAgaWYgKHRhZyQkMSlcbiAgICAgICAgeyB0YWdzLnB1c2godGFnJCQxKTsgfVxuICAgIH0gZWxzZSBpZiAocm9vdC5sZW5ndGgpXG4gICAgICB7IGVhY2gocm9vdCwgcHVzaFRhZ3NUbyk7IH0gLy8gYXNzdW1lIG5vZGVMaXN0XG4gIH1cblxuICAvLyBpbmplY3Qgc3R5bGVzIGludG8gRE9NXG4gIHN0eWxlTWFuYWdlci5pbmplY3QoKTtcblxuICBpZiAoaXNPYmplY3QodGFnTmFtZSkpIHtcbiAgICBvcHRzID0gdGFnTmFtZTtcbiAgICB0YWdOYW1lID0gMDtcbiAgfVxuXG4gIHZhciBlbGVtO1xuICB2YXIgYWxsVGFncztcblxuICAvLyBjcmF3bCB0aGUgRE9NIHRvIGZpbmQgdGhlIHRhZ1xuICBpZiAoaXNTdHJpbmcoc2VsZWN0b3IpKSB7XG4gICAgc2VsZWN0b3IgPSBzZWxlY3RvciA9PT0gJyonID9cbiAgICAgIC8vIHNlbGVjdCBhbGwgcmVnaXN0ZXJlZCB0YWdzXG4gICAgICAvLyAmIHRhZ3MgZm91bmQgd2l0aCB0aGUgcmlvdC10YWcgYXR0cmlidXRlIHNldFxuICAgICAgYWxsVGFncyA9IHNlbGVjdFRhZ3MoKSA6XG4gICAgICAvLyBvciBqdXN0IHRoZSBvbmVzIG5hbWVkIGxpa2UgdGhlIHNlbGVjdG9yXG4gICAgICBzZWxlY3RvciArIHNlbGVjdFRhZ3Moc2VsZWN0b3Iuc3BsaXQoLywgKi8pKTtcblxuICAgIC8vIG1ha2Ugc3VyZSB0byBwYXNzIGFsd2F5cyBhIHNlbGVjdG9yXG4gICAgLy8gdG8gdGhlIHF1ZXJ5U2VsZWN0b3JBbGwgZnVuY3Rpb25cbiAgICBlbGVtID0gc2VsZWN0b3IgPyAkJChzZWxlY3RvcikgOiBbXTtcbiAgfVxuICBlbHNlXG4gICAgLy8gcHJvYmFibHkgeW91IGhhdmUgcGFzc2VkIGFscmVhZHkgYSB0YWcgb3IgYSBOb2RlTGlzdFxuICAgIHsgZWxlbSA9IHNlbGVjdG9yOyB9XG5cbiAgLy8gc2VsZWN0IGFsbCB0aGUgcmVnaXN0ZXJlZCBhbmQgbW91bnQgdGhlbSBpbnNpZGUgdGhlaXIgcm9vdCBlbGVtZW50c1xuICBpZiAodGFnTmFtZSA9PT0gJyonKSB7XG4gICAgLy8gZ2V0IGFsbCBjdXN0b20gdGFnc1xuICAgIHRhZ05hbWUgPSBhbGxUYWdzIHx8IHNlbGVjdFRhZ3MoKTtcbiAgICAvLyBpZiB0aGUgcm9vdCBlbHMgaXQncyBqdXN0IGEgc2luZ2xlIHRhZ1xuICAgIGlmIChlbGVtLnRhZ05hbWUpXG4gICAgICB7IGVsZW0gPSAkJCh0YWdOYW1lLCBlbGVtKTsgfVxuICAgIGVsc2Uge1xuICAgICAgLy8gc2VsZWN0IGFsbCB0aGUgY2hpbGRyZW4gZm9yIGFsbCB0aGUgZGlmZmVyZW50IHJvb3QgZWxlbWVudHNcbiAgICAgIHZhciBub2RlTGlzdCA9IFtdO1xuXG4gICAgICBlYWNoKGVsZW0sIGZ1bmN0aW9uIChfZWwpIHsgcmV0dXJuIG5vZGVMaXN0LnB1c2goJCQodGFnTmFtZSwgX2VsKSk7IH0pO1xuXG4gICAgICBlbGVtID0gbm9kZUxpc3Q7XG4gICAgfVxuICAgIC8vIGdldCByaWQgb2YgdGhlIHRhZ05hbWVcbiAgICB0YWdOYW1lID0gMDtcbiAgfVxuXG4gIHB1c2hUYWdzVG8oZWxlbSk7XG5cbiAgcmV0dXJuIHRhZ3Ncbn1cblxuLy8gQ3JlYXRlIGEgbWl4aW4gdGhhdCBjb3VsZCBiZSBnbG9iYWxseSBzaGFyZWQgYWNyb3NzIGFsbCB0aGUgdGFnc1xudmFyIG1peGlucyA9IHt9O1xudmFyIGdsb2JhbHMgPSBtaXhpbnNbR0xPQkFMX01JWElOXSA9IHt9O1xudmFyIF9pZCA9IDA7XG5cbi8qKlxuICogQ3JlYXRlL1JldHVybiBhIG1peGluIGJ5IGl0cyBuYW1lXG4gKiBAcGFyYW0gICB7IFN0cmluZyB9ICBuYW1lIC0gbWl4aW4gbmFtZSAoZ2xvYmFsIG1peGluIGlmIG9iamVjdClcbiAqIEBwYXJhbSAgIHsgT2JqZWN0IH0gIG1peCAtIG1peGluIGxvZ2ljXG4gKiBAcGFyYW0gICB7IEJvb2xlYW4gfSBnIC0gaXMgZ2xvYmFsP1xuICogQHJldHVybnMgeyBPYmplY3QgfSAgdGhlIG1peGluIGxvZ2ljXG4gKi9cbmZ1bmN0aW9uIG1peGluJCQxKG5hbWUsIG1peCwgZykge1xuICAvLyBVbm5hbWVkIGdsb2JhbFxuICBpZiAoaXNPYmplY3QobmFtZSkpIHtcbiAgICBtaXhpbiQkMSgoXCJfX3VubmFtZWRfXCIgKyAoX2lkKyspKSwgbmFtZSwgdHJ1ZSk7XG4gICAgcmV0dXJuXG4gIH1cblxuICB2YXIgc3RvcmUgPSBnID8gZ2xvYmFscyA6IG1peGlucztcblxuICAvLyBHZXR0ZXJcbiAgaWYgKCFtaXgpIHtcbiAgICBpZiAoaXNVbmRlZmluZWQoc3RvcmVbbmFtZV0pKVxuICAgICAgeyB0aHJvdyBuZXcgRXJyb3IoJ1VucmVnaXN0ZXJlZCBtaXhpbjogJyArIG5hbWUpIH1cblxuICAgIHJldHVybiBzdG9yZVtuYW1lXVxuICB9XG5cbiAgLy8gU2V0dGVyXG4gIHN0b3JlW25hbWVdID0gaXNGdW5jdGlvbihtaXgpID9cbiAgICBleHRlbmQobWl4LnByb3RvdHlwZSwgc3RvcmVbbmFtZV0gfHwge30pICYmIG1peCA6XG4gICAgZXh0ZW5kKHN0b3JlW25hbWVdIHx8IHt9LCBtaXgpO1xufVxuXG4vKipcbiAqIFVwZGF0ZSBhbGwgdGhlIHRhZ3MgaW5zdGFuY2VzIGNyZWF0ZWRcbiAqIEByZXR1cm5zIHsgQXJyYXkgfSBhbGwgdGhlIHRhZ3MgaW5zdGFuY2VzXG4gKi9cbmZ1bmN0aW9uIHVwZGF0ZSQyKCkge1xuICByZXR1cm4gZWFjaChfX1RBR1NfQ0FDSEUsIGZ1bmN0aW9uICh0YWckJDEpIHsgcmV0dXJuIHRhZyQkMS51cGRhdGUoKTsgfSlcbn1cblxuZnVuY3Rpb24gdW5yZWdpc3RlciQkMShuYW1lKSB7XG4gIGRlbGV0ZSBfX1RBR19JTVBMW25hbWVdO1xufVxuXG4vLyBjb3VudGVyIHRvIGdpdmUgYSB1bmlxdWUgaWQgdG8gYWxsIHRoZSBUYWcgaW5zdGFuY2VzXG52YXIgX191aWQgPSAwO1xuXG4vKipcbiAqIFdlIG5lZWQgdG8gdXBkYXRlIG9wdHMgZm9yIHRoaXMgdGFnLiBUaGF0IHJlcXVpcmVzIHVwZGF0aW5nIHRoZSBleHByZXNzaW9uc1xuICogaW4gYW55IGF0dHJpYnV0ZXMgb24gdGhlIHRhZywgYW5kIHRoZW4gY29weWluZyB0aGUgcmVzdWx0IG9udG8gb3B0cy5cbiAqIEB0aGlzIFRhZ1xuICogQHBhcmFtICAge0Jvb2xlYW59IGlzTG9vcCAtIGlzIGl0IGEgbG9vcCB0YWc/XG4gKiBAcGFyYW0gICB7IFRhZyB9ICBwYXJlbnQgLSBwYXJlbnQgdGFnIG5vZGVcbiAqIEBwYXJhbSAgIHsgQm9vbGVhbiB9ICBpc0Fub255bW91cyAtIGlzIGl0IGEgdGFnIHdpdGhvdXQgYW55IGltcGw/IChhIHRhZyBub3QgcmVnaXN0ZXJlZClcbiAqIEBwYXJhbSAgIHsgT2JqZWN0IH0gIG9wdHMgLSB0YWcgb3B0aW9uc1xuICogQHBhcmFtICAgeyBBcnJheSB9ICBpbnN0QXR0cnMgLSB0YWcgYXR0cmlidXRlcyBhcnJheVxuICovXG5mdW5jdGlvbiB1cGRhdGVPcHRzKGlzTG9vcCwgcGFyZW50LCBpc0Fub255bW91cywgb3B0cywgaW5zdEF0dHJzKSB7XG4gIC8vIGlzQW5vbnltb3VzIGBlYWNoYCB0YWdzIHRyZWF0IGBkb21gIGFuZCBgcm9vdGAgZGlmZmVyZW50bHkuIEluIHRoaXMgY2FzZVxuICAvLyAoYW5kIG9ubHkgdGhpcyBjYXNlKSB3ZSBkb24ndCBuZWVkIHRvIGRvIHVwZGF0ZU9wdHMsIGJlY2F1c2UgdGhlIHJlZ3VsYXIgcGFyc2VcbiAgLy8gd2lsbCB1cGRhdGUgdGhvc2UgYXR0cnMuIFBsdXMsIGlzQW5vbnltb3VzIHRhZ3MgZG9uJ3QgbmVlZCBvcHRzIGFueXdheVxuICBpZiAoaXNMb29wICYmIGlzQW5vbnltb3VzKSB7IHJldHVybiB9XG5cbiAgdmFyIGN0eCA9ICFpc0Fub255bW91cyAmJiBpc0xvb3AgPyB0aGlzIDogcGFyZW50IHx8IHRoaXM7XG4gIGVhY2goaW5zdEF0dHJzLCBmdW5jdGlvbiAoYXR0cikge1xuICAgIGlmIChhdHRyLmV4cHIpIHsgdXBkYXRlJDEkMS5jYWxsKGN0eCwgW2F0dHIuZXhwcl0pOyB9XG4gICAgb3B0c1t0b0NhbWVsKGF0dHIubmFtZSldID0gYXR0ci5leHByID8gYXR0ci5leHByLnZhbHVlIDogYXR0ci52YWx1ZTtcbiAgfSk7XG59XG5cblxuLyoqXG4gKiBUYWcgY2xhc3NcbiAqIEBjb25zdHJ1Y3RvclxuICogQHBhcmFtIHsgT2JqZWN0IH0gaW1wbCAtIGl0IGNvbnRhaW5zIHRoZSB0YWcgdGVtcGxhdGUsIGFuZCBsb2dpY1xuICogQHBhcmFtIHsgT2JqZWN0IH0gY29uZiAtIHRhZyBvcHRpb25zXG4gKiBAcGFyYW0geyBTdHJpbmcgfSBpbm5lckhUTUwgLSBodG1sIHRoYXQgZXZlbnR1YWxseSB3ZSBuZWVkIHRvIGluamVjdCBpbiB0aGUgdGFnXG4gKi9cbmZ1bmN0aW9uIFRhZyQkMShpbXBsLCBjb25mLCBpbm5lckhUTUwpIHtcblxuICB2YXIgb3B0cyA9IGV4dGVuZCh7fSwgY29uZi5vcHRzKSxcbiAgICBwYXJlbnQgPSBjb25mLnBhcmVudCxcbiAgICBpc0xvb3AgPSBjb25mLmlzTG9vcCxcbiAgICBpc0Fub255bW91cyA9IGNvbmYuaXNBbm9ueW1vdXMsXG4gICAgaXRlbSA9IGNsZWFuVXBEYXRhKGNvbmYuaXRlbSksXG4gICAgaW5zdEF0dHJzID0gW10sIC8vIEFsbCBhdHRyaWJ1dGVzIG9uIHRoZSBUYWcgd2hlbiBpdCdzIGZpcnN0IHBhcnNlZFxuICAgIGltcGxBdHRycyA9IFtdLCAvLyBleHByZXNzaW9ucyBvbiB0aGlzIHR5cGUgb2YgVGFnXG4gICAgZXhwcmVzc2lvbnMgPSBbXSxcbiAgICByb290ID0gY29uZi5yb290LFxuICAgIHRhZ05hbWUgPSBjb25mLnRhZ05hbWUgfHwgZ2V0VGFnTmFtZShyb290KSxcbiAgICBpc1ZpcnR1YWwgPSB0YWdOYW1lID09PSAndmlydHVhbCcsXG4gICAgcHJvcHNJblN5bmNXaXRoUGFyZW50ID0gW10sXG4gICAgZG9tO1xuXG4gIC8vIG1ha2UgdGhpcyB0YWcgb2JzZXJ2YWJsZVxuICBvYnNlcnZhYmxlKHRoaXMpO1xuICAvLyBvbmx5IGNhbGwgdW5tb3VudCBpZiB3ZSBoYXZlIGEgdmFsaWQgX19UQUdfSU1QTCAoaGFzIG5hbWUgcHJvcGVydHkpXG4gIGlmIChpbXBsLm5hbWUgJiYgcm9vdC5fdGFnKSB7IHJvb3QuX3RhZy51bm1vdW50KHRydWUpOyB9XG5cbiAgLy8gbm90IHlldCBtb3VudGVkXG4gIHRoaXMuaXNNb3VudGVkID0gZmFsc2U7XG4gIHJvb3QuaXNMb29wID0gaXNMb29wO1xuXG4gIGRlZmluZVByb3BlcnR5KHRoaXMsICdfaW50ZXJuYWwnLCB7XG4gICAgaXNBbm9ueW1vdXM6IGlzQW5vbnltb3VzLFxuICAgIGluc3RBdHRyczogaW5zdEF0dHJzLFxuICAgIGlubmVySFRNTDogaW5uZXJIVE1MLFxuICAgIC8vIHRoZXNlIHZhcnMgd2lsbCBiZSBuZWVkZWQgb25seSBmb3IgdGhlIHZpcnR1YWwgdGFnc1xuICAgIHZpcnRzOiBbXSxcbiAgICB0YWlsOiBudWxsLFxuICAgIGhlYWQ6IG51bGxcbiAgfSk7XG5cbiAgLy8gY3JlYXRlIGEgdW5pcXVlIGlkIHRvIHRoaXMgdGFnXG4gIC8vIGl0IGNvdWxkIGJlIGhhbmR5IHRvIHVzZSBpdCBhbHNvIHRvIGltcHJvdmUgdGhlIHZpcnR1YWwgZG9tIHJlbmRlcmluZyBzcGVlZFxuICBkZWZpbmVQcm9wZXJ0eSh0aGlzLCAnX3Jpb3RfaWQnLCArK19fdWlkKTsgLy8gYmFzZSAxIGFsbG93cyB0ZXN0ICF0Ll9yaW90X2lkXG5cbiAgZXh0ZW5kKHRoaXMsIHsgcGFyZW50OiBwYXJlbnQsIHJvb3Q6IHJvb3QsIG9wdHM6IG9wdHMgfSwgaXRlbSk7XG4gIC8vIHByb3RlY3QgdGhlIFwidGFnc1wiIGFuZCBcInJlZnNcIiBwcm9wZXJ0eSBmcm9tIGJlaW5nIG92ZXJyaWRkZW5cbiAgZGVmaW5lUHJvcGVydHkodGhpcywgJ3RhZ3MnLCB7fSk7XG4gIGRlZmluZVByb3BlcnR5KHRoaXMsICdyZWZzJywge30pO1xuXG4gIGRvbSA9IG1rZG9tKGltcGwudG1wbCwgaW5uZXJIVE1MLCBpc0xvb3ApO1xuXG4gIC8qKlxuICAgKiBVcGRhdGUgdGhlIHRhZyBleHByZXNzaW9ucyBhbmQgb3B0aW9uc1xuICAgKiBAcGFyYW0gICB7ICogfSAgZGF0YSAtIGRhdGEgd2Ugd2FudCB0byB1c2UgdG8gZXh0ZW5kIHRoZSB0YWcgcHJvcGVydGllc1xuICAgKiBAcmV0dXJucyB7IFRhZyB9IHRoZSBjdXJyZW50IHRhZyBpbnN0YW5jZVxuICAgKi9cbiAgZGVmaW5lUHJvcGVydHkodGhpcywgJ3VwZGF0ZScsIGZ1bmN0aW9uIHRhZ1VwZGF0ZShkYXRhKSB7XG4gICAgaWYgKGlzRnVuY3Rpb24odGhpcy5zaG91bGRVcGRhdGUpICYmICF0aGlzLnNob3VsZFVwZGF0ZShkYXRhKSkgeyByZXR1cm4gdGhpcyB9XG5cbiAgICAvLyBtYWtlIHN1cmUgdGhlIGRhdGEgcGFzc2VkIHdpbGwgbm90IG92ZXJyaWRlXG4gICAgLy8gdGhlIGNvbXBvbmVudCBjb3JlIG1ldGhvZHNcbiAgICBkYXRhID0gY2xlYW5VcERhdGEoZGF0YSk7XG5cbiAgICAvLyBpbmhlcml0IHByb3BlcnRpZXMgZnJvbSB0aGUgcGFyZW50LCBidXQgb25seSBmb3IgaXNBbm9ueW1vdXMgdGFnc1xuICAgIGlmIChpc0xvb3AgJiYgaXNBbm9ueW1vdXMpIHsgaW5oZXJpdEZyb20uYXBwbHkodGhpcywgW3RoaXMucGFyZW50LCBwcm9wc0luU3luY1dpdGhQYXJlbnRdKTsgfVxuICAgIGV4dGVuZCh0aGlzLCBkYXRhKTtcbiAgICB1cGRhdGVPcHRzLmFwcGx5KHRoaXMsIFtpc0xvb3AsIHBhcmVudCwgaXNBbm9ueW1vdXMsIG9wdHMsIGluc3RBdHRyc10pO1xuICAgIGlmICh0aGlzLmlzTW91bnRlZCkgeyB0aGlzLnRyaWdnZXIoJ3VwZGF0ZScsIGRhdGEpOyB9XG4gICAgdXBkYXRlJDEkMS5jYWxsKHRoaXMsIGV4cHJlc3Npb25zKTtcbiAgICBpZiAodGhpcy5pc01vdW50ZWQpIHsgdGhpcy50cmlnZ2VyKCd1cGRhdGVkJyk7IH1cblxuICAgIHJldHVybiB0aGlzXG5cbiAgfS5iaW5kKHRoaXMpKTtcblxuICAvKipcbiAgICogQWRkIGEgbWl4aW4gdG8gdGhpcyB0YWdcbiAgICogQHJldHVybnMgeyBUYWcgfSB0aGUgY3VycmVudCB0YWcgaW5zdGFuY2VcbiAgICovXG4gIGRlZmluZVByb3BlcnR5KHRoaXMsICdtaXhpbicsIGZ1bmN0aW9uIHRhZ01peGluKCkge1xuICAgIHZhciB0aGlzJDEgPSB0aGlzO1xuXG4gICAgZWFjaChhcmd1bWVudHMsIGZ1bmN0aW9uIChtaXgpIHtcbiAgICAgIHZhciBpbnN0YW5jZSxcbiAgICAgICAgcHJvcHMgPSBbXSxcbiAgICAgICAgb2JqO1xuXG4gICAgICBtaXggPSBpc1N0cmluZyhtaXgpID8gbWl4aW4kJDEobWl4KSA6IG1peDtcblxuICAgICAgLy8gY2hlY2sgaWYgdGhlIG1peGluIGlzIGEgZnVuY3Rpb25cbiAgICAgIGlmIChpc0Z1bmN0aW9uKG1peCkpIHtcbiAgICAgICAgLy8gY3JlYXRlIHRoZSBuZXcgbWl4aW4gaW5zdGFuY2VcbiAgICAgICAgaW5zdGFuY2UgPSBuZXcgbWl4KCk7XG4gICAgICB9IGVsc2UgeyBpbnN0YW5jZSA9IG1peDsgfVxuXG4gICAgICB2YXIgcHJvdG8gPSBPYmplY3QuZ2V0UHJvdG90eXBlT2YoaW5zdGFuY2UpO1xuXG4gICAgICAvLyBidWlsZCBtdWx0aWxldmVsIHByb3RvdHlwZSBpbmhlcml0YW5jZSBjaGFpbiBwcm9wZXJ0eSBsaXN0XG4gICAgICBkbyB7IHByb3BzID0gcHJvcHMuY29uY2F0KE9iamVjdC5nZXRPd25Qcm9wZXJ0eU5hbWVzKG9iaiB8fCBpbnN0YW5jZSkpOyB9XG4gICAgICB3aGlsZSAob2JqID0gT2JqZWN0LmdldFByb3RvdHlwZU9mKG9iaiB8fCBpbnN0YW5jZSkpXG5cbiAgICAgIC8vIGxvb3AgdGhlIGtleXMgaW4gdGhlIGZ1bmN0aW9uIHByb3RvdHlwZSBvciB0aGUgYWxsIG9iamVjdCBrZXlzXG4gICAgICBlYWNoKHByb3BzLCBmdW5jdGlvbiAoa2V5KSB7XG4gICAgICAgIC8vIGJpbmQgbWV0aG9kcyB0byB0aGlzXG4gICAgICAgIC8vIGFsbG93IG1peGlucyB0byBvdmVycmlkZSBvdGhlciBwcm9wZXJ0aWVzL3BhcmVudCBtaXhpbnNcbiAgICAgICAgaWYgKGtleSAhPT0gJ2luaXQnKSB7XG4gICAgICAgICAgLy8gY2hlY2sgZm9yIGdldHRlcnMvc2V0dGVyc1xuICAgICAgICAgIHZhciBkZXNjcmlwdG9yID0gT2JqZWN0LmdldE93blByb3BlcnR5RGVzY3JpcHRvcihpbnN0YW5jZSwga2V5KSB8fCBPYmplY3QuZ2V0T3duUHJvcGVydHlEZXNjcmlwdG9yKHByb3RvLCBrZXkpO1xuICAgICAgICAgIHZhciBoYXNHZXR0ZXJTZXR0ZXIgPSBkZXNjcmlwdG9yICYmIChkZXNjcmlwdG9yLmdldCB8fCBkZXNjcmlwdG9yLnNldCk7XG5cbiAgICAgICAgICAvLyBhcHBseSBtZXRob2Qgb25seSBpZiBpdCBkb2VzIG5vdCBhbHJlYWR5IGV4aXN0IG9uIHRoZSBpbnN0YW5jZVxuICAgICAgICAgIGlmICghdGhpcyQxLmhhc093blByb3BlcnR5KGtleSkgJiYgaGFzR2V0dGVyU2V0dGVyKSB7XG4gICAgICAgICAgICBPYmplY3QuZGVmaW5lUHJvcGVydHkodGhpcyQxLCBrZXksIGRlc2NyaXB0b3IpO1xuICAgICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICB0aGlzJDFba2V5XSA9IGlzRnVuY3Rpb24oaW5zdGFuY2Vba2V5XSkgP1xuICAgICAgICAgICAgICBpbnN0YW5jZVtrZXldLmJpbmQodGhpcyQxKSA6XG4gICAgICAgICAgICAgIGluc3RhbmNlW2tleV07XG4gICAgICAgICAgfVxuICAgICAgICB9XG4gICAgICB9KTtcblxuICAgICAgLy8gaW5pdCBtZXRob2Qgd2lsbCBiZSBjYWxsZWQgYXV0b21hdGljYWxseVxuICAgICAgaWYgKGluc3RhbmNlLmluaXQpXG4gICAgICAgIHsgaW5zdGFuY2UuaW5pdC5iaW5kKHRoaXMkMSkoKTsgfVxuICAgIH0pO1xuICAgIHJldHVybiB0aGlzXG4gIH0uYmluZCh0aGlzKSk7XG5cbiAgLyoqXG4gICAqIE1vdW50IHRoZSBjdXJyZW50IHRhZyBpbnN0YW5jZVxuICAgKiBAcmV0dXJucyB7IFRhZyB9IHRoZSBjdXJyZW50IHRhZyBpbnN0YW5jZVxuICAgKi9cbiAgZGVmaW5lUHJvcGVydHkodGhpcywgJ21vdW50JywgZnVuY3Rpb24gdGFnTW91bnQoKSB7XG4gICAgdmFyIHRoaXMkMSA9IHRoaXM7XG5cbiAgICByb290Ll90YWcgPSB0aGlzOyAvLyBrZWVwIGEgcmVmZXJlbmNlIHRvIHRoZSB0YWcganVzdCBjcmVhdGVkXG5cbiAgICAvLyBSZWFkIGFsbCB0aGUgYXR0cnMgb24gdGhpcyBpbnN0YW5jZS4gVGhpcyBnaXZlIHVzIHRoZSBpbmZvIHdlIG5lZWQgZm9yIHVwZGF0ZU9wdHNcbiAgICBwYXJzZUF0dHJpYnV0ZXMuYXBwbHkocGFyZW50LCBbcm9vdCwgcm9vdC5hdHRyaWJ1dGVzLCBmdW5jdGlvbiAoYXR0ciwgZXhwcikge1xuICAgICAgaWYgKCFpc0Fub255bW91cyAmJiBSZWZFeHByLmlzUHJvdG90eXBlT2YoZXhwcikpIHsgZXhwci50YWcgPSB0aGlzJDE7IH1cbiAgICAgIGF0dHIuZXhwciA9IGV4cHI7XG4gICAgICBpbnN0QXR0cnMucHVzaChhdHRyKTtcbiAgICB9XSk7XG5cbiAgICAvLyB1cGRhdGUgdGhlIHJvb3QgYWRkaW5nIGN1c3RvbSBhdHRyaWJ1dGVzIGNvbWluZyBmcm9tIHRoZSBjb21waWxlclxuICAgIGltcGxBdHRycyA9IFtdO1xuICAgIHdhbGtBdHRycyhpbXBsLmF0dHJzLCBmdW5jdGlvbiAoaywgdikgeyBpbXBsQXR0cnMucHVzaCh7bmFtZTogaywgdmFsdWU6IHZ9KTsgfSk7XG4gICAgcGFyc2VBdHRyaWJ1dGVzLmFwcGx5KHRoaXMsIFtyb290LCBpbXBsQXR0cnMsIGZ1bmN0aW9uIChhdHRyLCBleHByKSB7XG4gICAgICBpZiAoZXhwcikgeyBleHByZXNzaW9ucy5wdXNoKGV4cHIpOyB9XG4gICAgICBlbHNlIHsgc2V0QXR0cihyb290LCBhdHRyLm5hbWUsIGF0dHIudmFsdWUpOyB9XG4gICAgfV0pO1xuXG4gICAgLy8gY2hpbGRyZW4gaW4gbG9vcCBzaG91bGQgaW5oZXJpdCBmcm9tIHRydWUgcGFyZW50XG4gICAgaWYgKHRoaXMuX3BhcmVudCAmJiBpc0Fub255bW91cykgeyBpbmhlcml0RnJvbS5hcHBseSh0aGlzLCBbdGhpcy5fcGFyZW50LCBwcm9wc0luU3luY1dpdGhQYXJlbnRdKTsgfVxuXG4gICAgLy8gaW5pdGlhbGlhdGlvblxuICAgIHVwZGF0ZU9wdHMuYXBwbHkodGhpcywgW2lzTG9vcCwgcGFyZW50LCBpc0Fub255bW91cywgb3B0cywgaW5zdEF0dHJzXSk7XG5cbiAgICAvLyBhZGQgZ2xvYmFsIG1peGluc1xuICAgIHZhciBnbG9iYWxNaXhpbiA9IG1peGluJCQxKEdMT0JBTF9NSVhJTik7XG5cbiAgICBpZiAoZ2xvYmFsTWl4aW4pIHtcbiAgICAgIGZvciAodmFyIGkgaW4gZ2xvYmFsTWl4aW4pIHtcbiAgICAgICAgaWYgKGdsb2JhbE1peGluLmhhc093blByb3BlcnR5KGkpKSB7XG4gICAgICAgICAgdGhpcyQxLm1peGluKGdsb2JhbE1peGluW2ldKTtcbiAgICAgICAgfVxuICAgICAgfVxuICAgIH1cblxuICAgIGlmIChpbXBsLmZuKSB7IGltcGwuZm4uY2FsbCh0aGlzLCBvcHRzKTsgfVxuXG4gICAgdGhpcy50cmlnZ2VyKCdiZWZvcmUtbW91bnQnKTtcblxuICAgIC8vIHBhcnNlIGxheW91dCBhZnRlciBpbml0LiBmbiBtYXkgY2FsY3VsYXRlIGFyZ3MgZm9yIG5lc3RlZCBjdXN0b20gdGFnc1xuICAgIHBhcnNlRXhwcmVzc2lvbnMuYXBwbHkodGhpcywgW2RvbSwgZXhwcmVzc2lvbnMsIGZhbHNlXSk7XG5cbiAgICB0aGlzLnVwZGF0ZShpdGVtKTtcblxuICAgIGlmIChpc0xvb3AgJiYgaXNBbm9ueW1vdXMpIHtcbiAgICAgIC8vIHVwZGF0ZSB0aGUgcm9vdCBhdHRyaWJ1dGUgZm9yIHRoZSBsb29wZWQgZWxlbWVudHNcbiAgICAgIHRoaXMucm9vdCA9IHJvb3QgPSBkb20uZmlyc3RDaGlsZDtcbiAgICB9IGVsc2Uge1xuICAgICAgd2hpbGUgKGRvbS5maXJzdENoaWxkKSB7IHJvb3QuYXBwZW5kQ2hpbGQoZG9tLmZpcnN0Q2hpbGQpOyB9XG4gICAgICBpZiAocm9vdC5zdHViKSB7IHJvb3QgPSBwYXJlbnQucm9vdDsgfVxuICAgIH1cblxuICAgIGRlZmluZVByb3BlcnR5KHRoaXMsICdyb290Jywgcm9vdCk7XG4gICAgdGhpcy5pc01vdW50ZWQgPSB0cnVlO1xuXG4gICAgLy8gaWYgaXQncyBub3QgYSBjaGlsZCB0YWcgd2UgY2FuIHRyaWdnZXIgaXRzIG1vdW50IGV2ZW50XG4gICAgaWYgKCF0aGlzLnBhcmVudCB8fCB0aGlzLnBhcmVudC5pc01vdW50ZWQpIHtcbiAgICAgIHRoaXMudHJpZ2dlcignbW91bnQnKTtcbiAgICB9XG4gICAgLy8gb3RoZXJ3aXNlIHdlIG5lZWQgdG8gd2FpdCB0aGF0IHRoZSBwYXJlbnQgZXZlbnQgZ2V0cyB0cmlnZ2VyZWRcbiAgICBlbHNlIHsgdGhpcy5wYXJlbnQub25lKCdtb3VudCcsIGZ1bmN0aW9uICgpIHtcbiAgICAgIHRoaXMkMS50cmlnZ2VyKCdtb3VudCcpO1xuICAgIH0pOyB9XG5cbiAgICByZXR1cm4gdGhpc1xuXG4gIH0uYmluZCh0aGlzKSk7XG5cbiAgLyoqXG4gICAqIFVubW91bnQgdGhlIHRhZyBpbnN0YW5jZVxuICAgKiBAcGFyYW0geyBCb29sZWFuIH0gbXVzdEtlZXBSb290IC0gaWYgaXQncyB0cnVlIHRoZSByb290IG5vZGUgd2lsbCBub3QgYmUgcmVtb3ZlZFxuICAgKiBAcmV0dXJucyB7IFRhZyB9IHRoZSBjdXJyZW50IHRhZyBpbnN0YW5jZVxuICAgKi9cbiAgZGVmaW5lUHJvcGVydHkodGhpcywgJ3VubW91bnQnLCBmdW5jdGlvbiB0YWdVbm1vdW50KG11c3RLZWVwUm9vdCkge1xuICAgIHZhciB0aGlzJDEgPSB0aGlzO1xuXG4gICAgdmFyIGVsID0gdGhpcy5yb290LFxuICAgICAgcCA9IGVsLnBhcmVudE5vZGUsXG4gICAgICBwdGFnLFxuICAgICAgdGFnSW5kZXggPSBfX1RBR1NfQ0FDSEUuaW5kZXhPZih0aGlzKTtcblxuICAgIHRoaXMudHJpZ2dlcignYmVmb3JlLXVubW91bnQnKTtcblxuICAgIC8vIHJlbW92ZSB0aGlzIHRhZyBpbnN0YW5jZSBmcm9tIHRoZSBnbG9iYWwgdmlydHVhbERvbSB2YXJpYWJsZVxuICAgIGlmICh+dGFnSW5kZXgpXG4gICAgICB7IF9fVEFHU19DQUNIRS5zcGxpY2UodGFnSW5kZXgsIDEpOyB9XG5cbiAgICBpZiAocCkge1xuICAgICAgaWYgKHBhcmVudCkge1xuICAgICAgICBwdGFnID0gZ2V0SW1tZWRpYXRlQ3VzdG9tUGFyZW50VGFnKHBhcmVudCk7XG5cbiAgICAgICAgaWYgKGlzVmlydHVhbCkge1xuICAgICAgICAgIE9iamVjdC5rZXlzKHRoaXMudGFncykuZm9yRWFjaChmdW5jdGlvbiAodGFnTmFtZSkge1xuICAgICAgICAgICAgYXJyYXlpc2hSZW1vdmUocHRhZy50YWdzLCB0YWdOYW1lLCB0aGlzJDEudGFnc1t0YWdOYW1lXSk7XG4gICAgICAgICAgfSk7XG4gICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgYXJyYXlpc2hSZW1vdmUocHRhZy50YWdzLCB0YWdOYW1lLCB0aGlzKTtcbiAgICAgICAgfVxuICAgICAgfSBlbHNlIHtcbiAgICAgICAgd2hpbGUgKGVsLmZpcnN0Q2hpbGQpIHsgZWwucmVtb3ZlQ2hpbGQoZWwuZmlyc3RDaGlsZCk7IH1cbiAgICAgIH1cblxuICAgICAgaWYgKCFtdXN0S2VlcFJvb3QpIHtcbiAgICAgICAgcC5yZW1vdmVDaGlsZChlbCk7XG4gICAgICB9IGVsc2Uge1xuICAgICAgICAvLyB0aGUgcmlvdC10YWcgYW5kIHRoZSBkYXRhLWlzIGF0dHJpYnV0ZXMgYXJlbid0IG5lZWRlZCBhbnltb3JlLCByZW1vdmUgdGhlbVxuICAgICAgICByZW1BdHRyKHAsIFJJT1RfVEFHX0lTKTtcbiAgICAgIH1cbiAgICB9XG5cbiAgICBpZiAodGhpcy5faW50ZXJuYWwudmlydHMpIHtcbiAgICAgIGVhY2godGhpcy5faW50ZXJuYWwudmlydHMsIGZ1bmN0aW9uICh2KSB7XG4gICAgICAgIGlmICh2LnBhcmVudE5vZGUpIHsgdi5wYXJlbnROb2RlLnJlbW92ZUNoaWxkKHYpOyB9XG4gICAgICB9KTtcbiAgICB9XG5cbiAgICAvLyBhbGxvdyBleHByZXNzaW9ucyB0byB1bm1vdW50IHRoZW1zZWx2ZXNcbiAgICB1bm1vdW50QWxsKGV4cHJlc3Npb25zKTtcbiAgICBlYWNoKGluc3RBdHRycywgZnVuY3Rpb24gKGEpIHsgcmV0dXJuIGEuZXhwciAmJiBhLmV4cHIudW5tb3VudCAmJiBhLmV4cHIudW5tb3VudCgpOyB9KTtcblxuICAgIHRoaXMudHJpZ2dlcigndW5tb3VudCcpO1xuICAgIHRoaXMub2ZmKCcqJyk7XG4gICAgdGhpcy5pc01vdW50ZWQgPSBmYWxzZTtcblxuICAgIGRlbGV0ZSB0aGlzLnJvb3QuX3RhZztcblxuICAgIHJldHVybiB0aGlzXG5cbiAgfS5iaW5kKHRoaXMpKTtcbn1cblxuLyoqXG4gKiBEZXRlY3QgdGhlIHRhZyBpbXBsZW1lbnRhdGlvbiBieSBhIERPTSBub2RlXG4gKiBAcGFyYW0gICB7IE9iamVjdCB9IGRvbSAtIERPTSBub2RlIHdlIG5lZWQgdG8gcGFyc2UgdG8gZ2V0IGl0cyB0YWcgaW1wbGVtZW50YXRpb25cbiAqIEByZXR1cm5zIHsgT2JqZWN0IH0gaXQgcmV0dXJucyBhbiBvYmplY3QgY29udGFpbmluZyB0aGUgaW1wbGVtZW50YXRpb24gb2YgYSBjdXN0b20gdGFnICh0ZW1wbGF0ZSBhbmQgYm9vdCBmdW5jdGlvbilcbiAqL1xuZnVuY3Rpb24gZ2V0VGFnKGRvbSkge1xuICByZXR1cm4gZG9tLnRhZ05hbWUgJiYgX19UQUdfSU1QTFtnZXRBdHRyKGRvbSwgUklPVF9UQUdfSVMpIHx8XG4gICAgZ2V0QXR0cihkb20sIFJJT1RfVEFHX0lTKSB8fCBkb20udGFnTmFtZS50b0xvd2VyQ2FzZSgpXVxufVxuXG4vKipcbiAqIEluaGVyaXQgcHJvcGVydGllcyBmcm9tIGEgdGFyZ2V0IHRhZyBpbnN0YW5jZVxuICogQHRoaXMgVGFnXG4gKiBAcGFyYW0gICB7IFRhZyB9IHRhcmdldCAtIHRhZyB3aGVyZSB3ZSB3aWxsIGluaGVyaXQgcHJvcGVydGllc1xuICogQHBhcmFtICAgeyBBcnJheSB9IHByb3BzSW5TeW5jV2l0aFBhcmVudCAtIGFycmF5IG9mIHByb3BlcnRpZXMgdG8gc3luYyB3aXRoIHRoZSB0YXJnZXRcbiAqL1xuZnVuY3Rpb24gaW5oZXJpdEZyb20odGFyZ2V0LCBwcm9wc0luU3luY1dpdGhQYXJlbnQpIHtcbiAgdmFyIHRoaXMkMSA9IHRoaXM7XG5cbiAgZWFjaChPYmplY3Qua2V5cyh0YXJnZXQpLCBmdW5jdGlvbiAoaykge1xuICAgIC8vIHNvbWUgcHJvcGVydGllcyBtdXN0IGJlIGFsd2F5cyBpbiBzeW5jIHdpdGggdGhlIHBhcmVudCB0YWdcbiAgICB2YXIgbXVzdFN5bmMgPSAhaXNSZXNlcnZlZE5hbWUoaykgJiYgY29udGFpbnMocHJvcHNJblN5bmNXaXRoUGFyZW50LCBrKTtcblxuICAgIGlmIChpc1VuZGVmaW5lZCh0aGlzJDFba10pIHx8IG11c3RTeW5jKSB7XG4gICAgICAvLyB0cmFjayB0aGUgcHJvcGVydHkgdG8ga2VlcCBpbiBzeW5jXG4gICAgICAvLyBzbyB3ZSBjYW4ga2VlcCBpdCB1cGRhdGVkXG4gICAgICBpZiAoIW11c3RTeW5jKSB7IHByb3BzSW5TeW5jV2l0aFBhcmVudC5wdXNoKGspOyB9XG4gICAgICB0aGlzJDFba10gPSB0YXJnZXRba107XG4gICAgfVxuICB9KTtcbn1cblxuLyoqXG4gKiBNb3ZlIHRoZSBwb3NpdGlvbiBvZiBhIGN1c3RvbSB0YWcgaW4gaXRzIHBhcmVudCB0YWdcbiAqIEB0aGlzIFRhZ1xuICogQHBhcmFtICAgeyBTdHJpbmcgfSB0YWdOYW1lIC0ga2V5IHdoZXJlIHRoZSB0YWcgd2FzIHN0b3JlZFxuICogQHBhcmFtICAgeyBOdW1iZXIgfSBuZXdQb3MgLSBpbmRleCB3aGVyZSB0aGUgbmV3IHRhZyB3aWxsIGJlIHN0b3JlZFxuICovXG5mdW5jdGlvbiBtb3ZlQ2hpbGRUYWcodGFnTmFtZSwgbmV3UG9zKSB7XG4gIHZhciBwYXJlbnQgPSB0aGlzLnBhcmVudCxcbiAgICB0YWdzO1xuICAvLyBubyBwYXJlbnQgbm8gbW92ZVxuICBpZiAoIXBhcmVudCkgeyByZXR1cm4gfVxuXG4gIHRhZ3MgPSBwYXJlbnQudGFnc1t0YWdOYW1lXTtcblxuICBpZiAoaXNBcnJheSh0YWdzKSlcbiAgICB7IHRhZ3Muc3BsaWNlKG5ld1BvcywgMCwgdGFncy5zcGxpY2UodGFncy5pbmRleE9mKHRoaXMpLCAxKVswXSk7IH1cbiAgZWxzZSB7IGFycmF5aXNoQWRkKHBhcmVudC50YWdzLCB0YWdOYW1lLCB0aGlzKTsgfVxufVxuXG4vKipcbiAqIENyZWF0ZSBhIG5ldyBjaGlsZCB0YWcgaW5jbHVkaW5nIGl0IGNvcnJlY3RseSBpbnRvIGl0cyBwYXJlbnRcbiAqIEBwYXJhbSAgIHsgT2JqZWN0IH0gY2hpbGQgLSBjaGlsZCB0YWcgaW1wbGVtZW50YXRpb25cbiAqIEBwYXJhbSAgIHsgT2JqZWN0IH0gb3B0cyAtIHRhZyBvcHRpb25zIGNvbnRhaW5pbmcgdGhlIERPTSBub2RlIHdoZXJlIHRoZSB0YWcgd2lsbCBiZSBtb3VudGVkXG4gKiBAcGFyYW0gICB7IFN0cmluZyB9IGlubmVySFRNTCAtIGlubmVyIGh0bWwgb2YgdGhlIGNoaWxkIG5vZGVcbiAqIEBwYXJhbSAgIHsgT2JqZWN0IH0gcGFyZW50IC0gaW5zdGFuY2Ugb2YgdGhlIHBhcmVudCB0YWcgaW5jbHVkaW5nIHRoZSBjaGlsZCBjdXN0b20gdGFnXG4gKiBAcmV0dXJucyB7IE9iamVjdCB9IGluc3RhbmNlIG9mIHRoZSBuZXcgY2hpbGQgdGFnIGp1c3QgY3JlYXRlZFxuICovXG5mdW5jdGlvbiBpbml0Q2hpbGRUYWcoY2hpbGQsIG9wdHMsIGlubmVySFRNTCwgcGFyZW50KSB7XG4gIHZhciB0YWcgPSBuZXcgVGFnJCQxKGNoaWxkLCBvcHRzLCBpbm5lckhUTUwpLFxuICAgIHRhZ05hbWUgPSBvcHRzLnRhZ05hbWUgfHwgZ2V0VGFnTmFtZShvcHRzLnJvb3QsIHRydWUpLFxuICAgIHB0YWcgPSBnZXRJbW1lZGlhdGVDdXN0b21QYXJlbnRUYWcocGFyZW50KTtcbiAgLy8gZml4IGZvciB0aGUgcGFyZW50IGF0dHJpYnV0ZSBpbiB0aGUgbG9vcGVkIGVsZW1lbnRzXG4gIHRhZy5wYXJlbnQgPSBwdGFnO1xuICAvLyBzdG9yZSB0aGUgcmVhbCBwYXJlbnQgdGFnXG4gIC8vIGluIHNvbWUgY2FzZXMgdGhpcyBjb3VsZCBiZSBkaWZmZXJlbnQgZnJvbSB0aGUgY3VzdG9tIHBhcmVudCB0YWdcbiAgLy8gZm9yIGV4YW1wbGUgaW4gbmVzdGVkIGxvb3BzXG4gIHRhZy5fcGFyZW50ID0gcGFyZW50O1xuXG4gIC8vIGFkZCB0aGlzIHRhZyB0byB0aGUgY3VzdG9tIHBhcmVudCB0YWdcbiAgYXJyYXlpc2hBZGQocHRhZy50YWdzLCB0YWdOYW1lLCB0YWcpO1xuXG4gIC8vIGFuZCBhbHNvIHRvIHRoZSByZWFsIHBhcmVudCB0YWdcbiAgaWYgKHB0YWcgIT09IHBhcmVudClcbiAgICB7IGFycmF5aXNoQWRkKHBhcmVudC50YWdzLCB0YWdOYW1lLCB0YWcpOyB9XG5cbiAgLy8gZW1wdHkgdGhlIGNoaWxkIG5vZGUgb25jZSB3ZSBnb3QgaXRzIHRlbXBsYXRlXG4gIC8vIHRvIGF2b2lkIHRoYXQgaXRzIGNoaWxkcmVuIGdldCBjb21waWxlZCBtdWx0aXBsZSB0aW1lc1xuICBvcHRzLnJvb3QuaW5uZXJIVE1MID0gJyc7XG5cbiAgcmV0dXJuIHRhZ1xufVxuXG4vKipcbiAqIExvb3AgYmFja3dhcmQgYWxsIHRoZSBwYXJlbnRzIHRyZWUgdG8gZGV0ZWN0IHRoZSBmaXJzdCBjdXN0b20gcGFyZW50IHRhZ1xuICogQHBhcmFtICAgeyBPYmplY3QgfSB0YWcgLSBhIFRhZyBpbnN0YW5jZVxuICogQHJldHVybnMgeyBPYmplY3QgfSB0aGUgaW5zdGFuY2Ugb2YgdGhlIGZpcnN0IGN1c3RvbSBwYXJlbnQgdGFnIGZvdW5kXG4gKi9cbmZ1bmN0aW9uIGdldEltbWVkaWF0ZUN1c3RvbVBhcmVudFRhZyh0YWcpIHtcbiAgdmFyIHB0YWcgPSB0YWc7XG4gIHdoaWxlIChwdGFnLl9pbnRlcm5hbC5pc0Fub255bW91cykge1xuICAgIGlmICghcHRhZy5wYXJlbnQpIHsgYnJlYWsgfVxuICAgIHB0YWcgPSBwdGFnLnBhcmVudDtcbiAgfVxuICByZXR1cm4gcHRhZ1xufVxuXG4vKipcbiAqIFRyaWdnZXIgdGhlIHVubW91bnQgbWV0aG9kIG9uIGFsbCB0aGUgZXhwcmVzc2lvbnNcbiAqIEBwYXJhbSAgIHsgQXJyYXkgfSBleHByZXNzaW9ucyAtIERPTSBleHByZXNzaW9uc1xuICovXG5mdW5jdGlvbiB1bm1vdW50QWxsKGV4cHJlc3Npb25zKSB7XG4gIGVhY2goZXhwcmVzc2lvbnMsIGZ1bmN0aW9uKGV4cHIpIHtcbiAgICBpZiAoZXhwciBpbnN0YW5jZW9mIFRhZyQkMSkgeyBleHByLnVubW91bnQodHJ1ZSk7IH1cbiAgICBlbHNlIGlmIChleHByLnVubW91bnQpIHsgZXhwci51bm1vdW50KCk7IH1cbiAgfSk7XG59XG5cbi8qKlxuICogR2V0IHRoZSB0YWcgbmFtZSBvZiBhbnkgRE9NIG5vZGVcbiAqIEBwYXJhbSAgIHsgT2JqZWN0IH0gZG9tIC0gRE9NIG5vZGUgd2Ugd2FudCB0byBwYXJzZVxuICogQHBhcmFtICAgeyBCb29sZWFuIH0gc2tpcERhdGFJcyAtIGhhY2sgdG8gaWdub3JlIHRoZSBkYXRhLWlzIGF0dHJpYnV0ZSB3aGVuIGF0dGFjaGluZyB0byBwYXJlbnRcbiAqIEByZXR1cm5zIHsgU3RyaW5nIH0gbmFtZSB0byBpZGVudGlmeSB0aGlzIGRvbSBub2RlIGluIHJpb3RcbiAqL1xuZnVuY3Rpb24gZ2V0VGFnTmFtZShkb20sIHNraXBEYXRhSXMpIHtcbiAgdmFyIGNoaWxkID0gZ2V0VGFnKGRvbSksXG4gICAgbmFtZWRUYWcgPSAhc2tpcERhdGFJcyAmJiBnZXRBdHRyKGRvbSwgUklPVF9UQUdfSVMpO1xuICByZXR1cm4gbmFtZWRUYWcgJiYgIXRtcGwuaGFzRXhwcihuYW1lZFRhZykgP1xuICAgICAgICAgICAgICAgIG5hbWVkVGFnIDpcbiAgICAgICAgICAgICAgY2hpbGQgPyBjaGlsZC5uYW1lIDogZG9tLnRhZ05hbWUudG9Mb3dlckNhc2UoKVxufVxuXG4vKipcbiAqIFdpdGggdGhpcyBmdW5jdGlvbiB3ZSBhdm9pZCB0aGF0IHRoZSBpbnRlcm5hbCBUYWcgbWV0aG9kcyBnZXQgb3ZlcnJpZGRlblxuICogQHBhcmFtICAgeyBPYmplY3QgfSBkYXRhIC0gb3B0aW9ucyB3ZSB3YW50IHRvIHVzZSB0byBleHRlbmQgdGhlIHRhZyBpbnN0YW5jZVxuICogQHJldHVybnMgeyBPYmplY3QgfSBjbGVhbiBvYmplY3Qgd2l0aG91dCBjb250YWluaW5nIHRoZSByaW90IGludGVybmFsIHJlc2VydmVkIHdvcmRzXG4gKi9cbmZ1bmN0aW9uIGNsZWFuVXBEYXRhKGRhdGEpIHtcbiAgaWYgKCEoZGF0YSBpbnN0YW5jZW9mIFRhZyQkMSkgJiYgIShkYXRhICYmIHR5cGVvZiBkYXRhLnRyaWdnZXIgPT09IFRfRlVOQ1RJT04pKVxuICAgIHsgcmV0dXJuIGRhdGEgfVxuXG4gIHZhciBvID0ge307XG4gIGZvciAodmFyIGtleSBpbiBkYXRhKSB7XG4gICAgaWYgKCFSRV9SRVNFUlZFRF9OQU1FUy50ZXN0KGtleSkpIHsgb1trZXldID0gZGF0YVtrZXldOyB9XG4gIH1cbiAgcmV0dXJuIG9cbn1cblxuLyoqXG4gKiBTZXQgdGhlIHByb3BlcnR5IG9mIGFuIG9iamVjdCBmb3IgYSBnaXZlbiBrZXkuIElmIHNvbWV0aGluZyBhbHJlYWR5XG4gKiBleGlzdHMgdGhlcmUsIHRoZW4gaXQgYmVjb21lcyBhbiBhcnJheSBjb250YWluaW5nIGJvdGggdGhlIG9sZCBhbmQgbmV3IHZhbHVlLlxuICogQHBhcmFtIHsgT2JqZWN0IH0gb2JqIC0gb2JqZWN0IG9uIHdoaWNoIHRvIHNldCB0aGUgcHJvcGVydHlcbiAqIEBwYXJhbSB7IFN0cmluZyB9IGtleSAtIHByb3BlcnR5IG5hbWVcbiAqIEBwYXJhbSB7IE9iamVjdCB9IHZhbHVlIC0gdGhlIHZhbHVlIG9mIHRoZSBwcm9wZXJ0eSB0byBiZSBzZXRcbiAqIEBwYXJhbSB7IEJvb2xlYW4gfSBlbnN1cmVBcnJheSAtIGVuc3VyZSB0aGF0IHRoZSBwcm9wZXJ0eSByZW1haW5zIGFuIGFycmF5XG4gKi9cbmZ1bmN0aW9uIGFycmF5aXNoQWRkKG9iaiwga2V5LCB2YWx1ZSwgZW5zdXJlQXJyYXkpIHtcbiAgdmFyIGRlc3QgPSBvYmpba2V5XTtcbiAgdmFyIGlzQXJyID0gaXNBcnJheShkZXN0KTtcblxuICBpZiAoZGVzdCAmJiBkZXN0ID09PSB2YWx1ZSkgeyByZXR1cm4gfVxuXG4gIC8vIGlmIHRoZSBrZXkgd2FzIG5ldmVyIHNldCwgc2V0IGl0IG9uY2VcbiAgaWYgKCFkZXN0ICYmIGVuc3VyZUFycmF5KSB7IG9ialtrZXldID0gW3ZhbHVlXTsgfVxuICBlbHNlIGlmICghZGVzdCkgeyBvYmpba2V5XSA9IHZhbHVlOyB9XG4gIC8vIGlmIGl0IHdhcyBhbiBhcnJheSBhbmQgbm90IHlldCBzZXRcbiAgZWxzZSBpZiAoIWlzQXJyIHx8IGlzQXJyICYmICFjb250YWlucyhkZXN0LCB2YWx1ZSkpIHtcbiAgICBpZiAoaXNBcnIpIHsgZGVzdC5wdXNoKHZhbHVlKTsgfVxuICAgIGVsc2UgeyBvYmpba2V5XSA9IFtkZXN0LCB2YWx1ZV07IH1cbiAgfVxufVxuXG4vKipcbiAqIFJlbW92ZXMgYW4gaXRlbSBmcm9tIGFuIG9iamVjdCBhdCBhIGdpdmVuIGtleS4gSWYgdGhlIGtleSBwb2ludHMgdG8gYW4gYXJyYXksXG4gKiB0aGVuIHRoZSBpdGVtIGlzIGp1c3QgcmVtb3ZlZCBmcm9tIHRoZSBhcnJheS5cbiAqIEBwYXJhbSB7IE9iamVjdCB9IG9iaiAtIG9iamVjdCBvbiB3aGljaCB0byByZW1vdmUgdGhlIHByb3BlcnR5XG4gKiBAcGFyYW0geyBTdHJpbmcgfSBrZXkgLSBwcm9wZXJ0eSBuYW1lXG4gKiBAcGFyYW0geyBPYmplY3QgfSB2YWx1ZSAtIHRoZSB2YWx1ZSBvZiB0aGUgcHJvcGVydHkgdG8gYmUgcmVtb3ZlZFxuICogQHBhcmFtIHsgQm9vbGVhbiB9IGVuc3VyZUFycmF5IC0gZW5zdXJlIHRoYXQgdGhlIHByb3BlcnR5IHJlbWFpbnMgYW4gYXJyYXlcbiovXG5mdW5jdGlvbiBhcnJheWlzaFJlbW92ZShvYmosIGtleSwgdmFsdWUsIGVuc3VyZUFycmF5KSB7XG4gIGlmIChpc0FycmF5KG9ialtrZXldKSkge1xuICAgIGVhY2gob2JqW2tleV0sIGZ1bmN0aW9uKGl0ZW0sIGkpIHtcbiAgICAgIGlmIChpdGVtID09PSB2YWx1ZSkgeyBvYmpba2V5XS5zcGxpY2UoaSwgMSk7IH1cbiAgICB9KTtcbiAgICBpZiAoIW9ialtrZXldLmxlbmd0aCkgeyBkZWxldGUgb2JqW2tleV07IH1cbiAgICBlbHNlIGlmIChvYmpba2V5XS5sZW5ndGggPT09IDEgJiYgIWVuc3VyZUFycmF5KSB7IG9ialtrZXldID0gb2JqW2tleV1bMF07IH1cbiAgfSBlbHNlXG4gICAgeyBkZWxldGUgb2JqW2tleV07IH0gLy8gb3RoZXJ3aXNlIGp1c3QgZGVsZXRlIHRoZSBrZXlcbn1cblxuLyoqXG4gKiBDaGVjayB3aGV0aGVyIGEgRE9NIG5vZGUgaXMgaW4gc3R1YiBtb2RlLCB1c2VmdWwgZm9yIHRoZSByaW90ICdpZicgZGlyZWN0aXZlXG4gKiBAcGFyYW0gICB7IE9iamVjdCB9ICBkb20gLSBET00gbm9kZSB3ZSB3YW50IHRvIHBhcnNlXG4gKiBAcmV0dXJucyB7IEJvb2xlYW4gfSAtXG4gKi9cbmZ1bmN0aW9uIGlzSW5TdHViKGRvbSkge1xuICB3aGlsZSAoZG9tKSB7XG4gICAgaWYgKGRvbS5pblN0dWIpXG4gICAgICB7IHJldHVybiB0cnVlIH1cbiAgICBkb20gPSBkb20ucGFyZW50Tm9kZTtcbiAgfVxuICByZXR1cm4gZmFsc2Vcbn1cblxuLyoqXG4gKiBNb3VudCBhIHRhZyBjcmVhdGluZyBuZXcgVGFnIGluc3RhbmNlXG4gKiBAcGFyYW0gICB7IE9iamVjdCB9IHJvb3QgLSBkb20gbm9kZSB3aGVyZSB0aGUgdGFnIHdpbGwgYmUgbW91bnRlZFxuICogQHBhcmFtICAgeyBTdHJpbmcgfSB0YWdOYW1lIC0gbmFtZSBvZiB0aGUgcmlvdCB0YWcgd2Ugd2FudCB0byBtb3VudFxuICogQHBhcmFtICAgeyBPYmplY3QgfSBvcHRzIC0gb3B0aW9ucyB0byBwYXNzIHRvIHRoZSBUYWcgaW5zdGFuY2VcbiAqIEBwYXJhbSAgIHsgT2JqZWN0IH0gY3R4IC0gb3B0aW9uYWwgY29udGV4dCB0aGF0IHdpbGwgYmUgdXNlZCB0byBleHRlbmQgYW4gZXhpc3RpbmcgY2xhc3MgKCB1c2VkIGluIHJpb3QuVGFnIClcbiAqIEByZXR1cm5zIHsgVGFnIH0gYSBuZXcgVGFnIGluc3RhbmNlXG4gKi9cbmZ1bmN0aW9uIG1vdW50VG8ocm9vdCwgdGFnTmFtZSwgb3B0cywgY3R4KSB7XG4gIHZhciBpbXBsID0gX19UQUdfSU1QTFt0YWdOYW1lXSxcbiAgICBpbXBsQ2xhc3MgPSBfX1RBR19JTVBMW3RhZ05hbWVdLmNsYXNzLFxuICAgIHRhZyA9IGN0eCB8fCAoaW1wbENsYXNzID8gT2JqZWN0LmNyZWF0ZShpbXBsQ2xhc3MucHJvdG90eXBlKSA6IHt9KSxcbiAgICAvLyBjYWNoZSB0aGUgaW5uZXIgSFRNTCB0byBmaXggIzg1NVxuICAgIGlubmVySFRNTCA9IHJvb3QuX2lubmVySFRNTCA9IHJvb3QuX2lubmVySFRNTCB8fCByb290LmlubmVySFRNTDtcblxuICAvLyBjbGVhciB0aGUgaW5uZXIgaHRtbFxuICByb290LmlubmVySFRNTCA9ICcnO1xuXG4gIHZhciBjb25mID0geyByb290OiByb290LCBvcHRzOiBvcHRzIH07XG4gIGlmIChvcHRzICYmIG9wdHMucGFyZW50KSB7IGNvbmYucGFyZW50ID0gb3B0cy5wYXJlbnQ7IH1cblxuICBpZiAoaW1wbCAmJiByb290KSB7IFRhZyQkMS5hcHBseSh0YWcsIFtpbXBsLCBjb25mLCBpbm5lckhUTUxdKTsgfVxuXG4gIGlmICh0YWcgJiYgdGFnLm1vdW50KSB7XG4gICAgdGFnLm1vdW50KHRydWUpO1xuICAgIC8vIGFkZCB0aGlzIHRhZyB0byB0aGUgdmlydHVhbERvbSB2YXJpYWJsZVxuICAgIGlmICghY29udGFpbnMoX19UQUdTX0NBQ0hFLCB0YWcpKSB7IF9fVEFHU19DQUNIRS5wdXNoKHRhZyk7IH1cbiAgfVxuXG4gIHJldHVybiB0YWdcbn1cblxuXG4vKipcbiAqIEFkZHMgdGhlIGVsZW1lbnRzIGZvciBhIHZpcnR1YWwgdGFnXG4gKiBAdGhpcyBUYWdcbiAqIEBwYXJhbSB7IE5vZGUgfSBzcmMgLSB0aGUgbm9kZSB0aGF0IHdpbGwgZG8gdGhlIGluc2VydGluZyBvciBhcHBlbmRpbmdcbiAqIEBwYXJhbSB7IFRhZyB9IHRhcmdldCAtIG9ubHkgaWYgaW5zZXJ0aW5nLCBpbnNlcnQgYmVmb3JlIHRoaXMgdGFnJ3MgZmlyc3QgY2hpbGRcbiAqL1xuZnVuY3Rpb24gbWFrZVZpcnR1YWwoc3JjLCB0YXJnZXQpIHtcbiAgdmFyIHRoaXMkMSA9IHRoaXM7XG5cbiAgdmFyIGhlYWQgPSBjcmVhdGVET01QbGFjZWhvbGRlcigpLFxuICAgIHRhaWwgPSBjcmVhdGVET01QbGFjZWhvbGRlcigpLFxuICAgIGZyYWcgPSBjcmVhdGVGcmFnKCksXG4gICAgc2liLCBlbDtcblxuICB0aGlzLl9pbnRlcm5hbC5oZWFkID0gdGhpcy5yb290Lmluc2VydEJlZm9yZShoZWFkLCB0aGlzLnJvb3QuZmlyc3RDaGlsZCk7XG4gIHRoaXMuX2ludGVybmFsLnRhaWwgPSB0aGlzLnJvb3QuYXBwZW5kQ2hpbGQodGFpbCk7XG5cbiAgZWwgPSB0aGlzLl9pbnRlcm5hbC5oZWFkO1xuXG4gIHdoaWxlIChlbCkge1xuICAgIHNpYiA9IGVsLm5leHRTaWJsaW5nO1xuICAgIGZyYWcuYXBwZW5kQ2hpbGQoZWwpO1xuICAgIHRoaXMkMS5faW50ZXJuYWwudmlydHMucHVzaChlbCk7IC8vIGhvbGQgZm9yIHVubW91bnRpbmdcbiAgICBlbCA9IHNpYjtcbiAgfVxuXG4gIGlmICh0YXJnZXQpXG4gICAgeyBzcmMuaW5zZXJ0QmVmb3JlKGZyYWcsIHRhcmdldC5faW50ZXJuYWwuaGVhZCk7IH1cbiAgZWxzZVxuICAgIHsgc3JjLmFwcGVuZENoaWxkKGZyYWcpOyB9XG59XG5cbi8qKlxuICogTW92ZSB2aXJ0dWFsIHRhZyBhbmQgYWxsIGNoaWxkIG5vZGVzXG4gKiBAdGhpcyBUYWdcbiAqIEBwYXJhbSB7IE5vZGUgfSBzcmMgIC0gdGhlIG5vZGUgdGhhdCB3aWxsIGRvIHRoZSBpbnNlcnRpbmdcbiAqIEBwYXJhbSB7IFRhZyB9IHRhcmdldCAtIGluc2VydCBiZWZvcmUgdGhpcyB0YWcncyBmaXJzdCBjaGlsZFxuICovXG5mdW5jdGlvbiBtb3ZlVmlydHVhbChzcmMsIHRhcmdldCkge1xuICB2YXIgdGhpcyQxID0gdGhpcztcblxuICB2YXIgZWwgPSB0aGlzLl9pbnRlcm5hbC5oZWFkLFxuICAgIGZyYWcgPSBjcmVhdGVGcmFnKCksXG4gICAgc2liO1xuXG4gIHdoaWxlIChlbCkge1xuICAgIHNpYiA9IGVsLm5leHRTaWJsaW5nO1xuICAgIGZyYWcuYXBwZW5kQ2hpbGQoZWwpO1xuICAgIGVsID0gc2liO1xuICAgIGlmIChlbCA9PT0gdGhpcyQxLl9pbnRlcm5hbC50YWlsKSB7XG4gICAgICBmcmFnLmFwcGVuZENoaWxkKGVsKTtcbiAgICAgIHNyYy5pbnNlcnRCZWZvcmUoZnJhZywgdGFyZ2V0Ll9pbnRlcm5hbC5oZWFkKTtcbiAgICAgIGJyZWFrXG4gICAgfVxuICB9XG59XG5cbi8qKlxuICogR2V0IHNlbGVjdG9ycyBmb3IgdGFnc1xuICogQHBhcmFtICAgeyBBcnJheSB9IHRhZ3MgLSB0YWcgbmFtZXMgdG8gc2VsZWN0XG4gKiBAcmV0dXJucyB7IFN0cmluZyB9IHNlbGVjdG9yXG4gKi9cbmZ1bmN0aW9uIHNlbGVjdFRhZ3ModGFncykge1xuICAvLyBzZWxlY3QgYWxsIHRhZ3NcbiAgaWYgKCF0YWdzKSB7XG4gICAgdmFyIGtleXMgPSBPYmplY3Qua2V5cyhfX1RBR19JTVBMKTtcbiAgICByZXR1cm4ga2V5cyArIHNlbGVjdFRhZ3Moa2V5cylcbiAgfVxuXG4gIHJldHVybiB0YWdzXG4gICAgLmZpbHRlcihmdW5jdGlvbiAodCkgeyByZXR1cm4gIS9bXi1cXHddLy50ZXN0KHQpOyB9KVxuICAgIC5yZWR1Y2UoZnVuY3Rpb24gKGxpc3QsIHQpIHtcbiAgICAgIHZhciBuYW1lID0gdC50cmltKCkudG9Mb3dlckNhc2UoKTtcbiAgICAgIHJldHVybiBsaXN0ICsgXCIsW1wiICsgUklPVF9UQUdfSVMgKyBcIj1cXFwiXCIgKyBuYW1lICsgXCJcXFwiXVwiXG4gICAgfSwgJycpXG59XG5cblxudmFyIHRhZ3MgPSBPYmplY3QuZnJlZXplKHtcblx0Z2V0VGFnOiBnZXRUYWcsXG5cdGluaGVyaXRGcm9tOiBpbmhlcml0RnJvbSxcblx0bW92ZUNoaWxkVGFnOiBtb3ZlQ2hpbGRUYWcsXG5cdGluaXRDaGlsZFRhZzogaW5pdENoaWxkVGFnLFxuXHRnZXRJbW1lZGlhdGVDdXN0b21QYXJlbnRUYWc6IGdldEltbWVkaWF0ZUN1c3RvbVBhcmVudFRhZyxcblx0dW5tb3VudEFsbDogdW5tb3VudEFsbCxcblx0Z2V0VGFnTmFtZTogZ2V0VGFnTmFtZSxcblx0Y2xlYW5VcERhdGE6IGNsZWFuVXBEYXRhLFxuXHRhcnJheWlzaEFkZDogYXJyYXlpc2hBZGQsXG5cdGFycmF5aXNoUmVtb3ZlOiBhcnJheWlzaFJlbW92ZSxcblx0aXNJblN0dWI6IGlzSW5TdHViLFxuXHRtb3VudFRvOiBtb3VudFRvLFxuXHRtYWtlVmlydHVhbDogbWFrZVZpcnR1YWwsXG5cdG1vdmVWaXJ0dWFsOiBtb3ZlVmlydHVhbCxcblx0c2VsZWN0VGFnczogc2VsZWN0VGFnc1xufSk7XG5cbi8qKlxuICogUmlvdCBwdWJsaWMgYXBpXG4gKi9cblxudmFyIHNldHRpbmdzID0gT2JqZWN0LmNyZWF0ZShicmFja2V0cy5zZXR0aW5ncyk7XG52YXIgdXRpbCA9IHtcbiAgdG1wbDogdG1wbCxcbiAgYnJhY2tldHM6IGJyYWNrZXRzLFxuICBzdHlsZU1hbmFnZXI6IHN0eWxlTWFuYWdlcixcbiAgdmRvbTogX19UQUdTX0NBQ0hFLFxuICBzdHlsZU5vZGU6IHN0eWxlTWFuYWdlci5zdHlsZU5vZGUsXG4gIC8vIGV4cG9ydCB0aGUgcmlvdCBpbnRlcm5hbCB1dGlscyBhcyB3ZWxsXG4gIGRvbTogZG9tLFxuICBjaGVjazogY2hlY2ssXG4gIG1pc2M6IG1pc2MsXG4gIHRhZ3M6IHRhZ3Ncbn07XG5cbmV4cG9ydHMuc2V0dGluZ3MgPSBzZXR0aW5ncztcbmV4cG9ydHMudXRpbCA9IHV0aWw7XG5leHBvcnRzLm9ic2VydmFibGUgPSBvYnNlcnZhYmxlO1xuZXhwb3J0cy5UYWcgPSBUYWckMTtcbmV4cG9ydHMudGFnID0gdGFnJCQxO1xuZXhwb3J0cy50YWcyID0gdGFnMiQkMTtcbmV4cG9ydHMubW91bnQgPSBtb3VudCQkMTtcbmV4cG9ydHMubWl4aW4gPSBtaXhpbiQkMTtcbmV4cG9ydHMudXBkYXRlID0gdXBkYXRlJDI7XG5leHBvcnRzLnVucmVnaXN0ZXIgPSB1bnJlZ2lzdGVyJCQxO1xuXG5PYmplY3QuZGVmaW5lUHJvcGVydHkoZXhwb3J0cywgJ19fZXNNb2R1bGUnLCB7IHZhbHVlOiB0cnVlIH0pO1xuXG59KSkpO1xuXG5cblxuLy8vLy8vLy8vLy8vLy8vLy8vXG4vLyBXRUJQQUNLIEZPT1RFUlxuLy8gLi4vfi9yaW90L3Jpb3QuanNcbi8vIG1vZHVsZSBpZCA9IDBcbi8vIG1vZHVsZSBjaHVua3MgPSAwIiwiXCJ1c2Ugc3RyaWN0XCI7XG52YXIgcmlvdF8xID0gcmVxdWlyZShcInJpb3RcIik7XG5yaW90XzEubW91bnQoXCJhcHBcIik7XG5cblxuXG4vLy8vLy8vLy8vLy8vLy8vLy9cbi8vIFdFQlBBQ0sgRk9PVEVSXG4vLyAuL2luZGV4LnRzXG4vLyBtb2R1bGUgaWQgPSAyXG4vLyBtb2R1bGUgY2h1bmtzID0gMCJdLCJzb3VyY2VSb290IjoiIn0=