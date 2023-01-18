/******/ (() => { // webpackBootstrap
/******/ 	var __webpack_modules__ = ({

/***/ "./node_modules/cssfilter/lib/css.js":
/*!*******************************************!*\
  !*** ./node_modules/cssfilter/lib/css.js ***!
  \*******************************************/
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {

/**
 * cssfilter
 *
 * @author 老雷<leizongmin@gmail.com>
 */

var DEFAULT = __webpack_require__(/*! ./default */ "./node_modules/cssfilter/lib/default.js");
var parseStyle = __webpack_require__(/*! ./parser */ "./node_modules/cssfilter/lib/parser.js");
var _ = __webpack_require__(/*! ./util */ "./node_modules/cssfilter/lib/util.js");


/**
 * 返回值是否为空
 *
 * @param {Object} obj
 * @return {Boolean}
 */
function isNull (obj) {
  return (obj === undefined || obj === null);
}

/**
 * 浅拷贝对象
 *
 * @param {Object} obj
 * @return {Object}
 */
function shallowCopyObject (obj) {
  var ret = {};
  for (var i in obj) {
    ret[i] = obj[i];
  }
  return ret;
}

/**
 * 创建CSS过滤器
 *
 * @param {Object} options
 *   - {Object} whiteList
 *   - {Function} onAttr
 *   - {Function} onIgnoreAttr
 *   - {Function} safeAttrValue
 */
function FilterCSS (options) {
  options = shallowCopyObject(options || {});
  options.whiteList = options.whiteList || DEFAULT.whiteList;
  options.onAttr = options.onAttr || DEFAULT.onAttr;
  options.onIgnoreAttr = options.onIgnoreAttr || DEFAULT.onIgnoreAttr;
  options.safeAttrValue = options.safeAttrValue || DEFAULT.safeAttrValue;
  this.options = options;
}

FilterCSS.prototype.process = function (css) {
  // 兼容各种奇葩输入
  css = css || '';
  css = css.toString();
  if (!css) return '';

  var me = this;
  var options = me.options;
  var whiteList = options.whiteList;
  var onAttr = options.onAttr;
  var onIgnoreAttr = options.onIgnoreAttr;
  var safeAttrValue = options.safeAttrValue;

  var retCSS = parseStyle(css, function (sourcePosition, position, name, value, source) {

    var check = whiteList[name];
    var isWhite = false;
    if (check === true) isWhite = check;
    else if (typeof check === 'function') isWhite = check(value);
    else if (check instanceof RegExp) isWhite = check.test(value);
    if (isWhite !== true) isWhite = false;

    // 如果过滤后 value 为空则直接忽略
    value = safeAttrValue(name, value);
    if (!value) return;

    var opts = {
      position: position,
      sourcePosition: sourcePosition,
      source: source,
      isWhite: isWhite
    };

    if (isWhite) {

      var ret = onAttr(name, value, opts);
      if (isNull(ret)) {
        return name + ':' + value;
      } else {
        return ret;
      }

    } else {

      var ret = onIgnoreAttr(name, value, opts);
      if (!isNull(ret)) {
        return ret;
      }

    }
  });

  return retCSS;
};


module.exports = FilterCSS;


/***/ }),

/***/ "./node_modules/cssfilter/lib/default.js":
/*!***********************************************!*\
  !*** ./node_modules/cssfilter/lib/default.js ***!
  \***********************************************/
/***/ ((__unused_webpack_module, exports) => {

/**
 * cssfilter
 *
 * @author 老雷<leizongmin@gmail.com>
 */

function getDefaultWhiteList () {
  // 白名单值说明：
  // true: 允许该属性
  // Function: function (val) { } 返回true表示允许该属性，其他值均表示不允许
  // RegExp: regexp.test(val) 返回true表示允许该属性，其他值均表示不允许
  // 除上面列出的值外均表示不允许
  var whiteList = {};

  whiteList['align-content'] = false; // default: auto
  whiteList['align-items'] = false; // default: auto
  whiteList['align-self'] = false; // default: auto
  whiteList['alignment-adjust'] = false; // default: auto
  whiteList['alignment-baseline'] = false; // default: baseline
  whiteList['all'] = false; // default: depending on individual properties
  whiteList['anchor-point'] = false; // default: none
  whiteList['animation'] = false; // default: depending on individual properties
  whiteList['animation-delay'] = false; // default: 0
  whiteList['animation-direction'] = false; // default: normal
  whiteList['animation-duration'] = false; // default: 0
  whiteList['animation-fill-mode'] = false; // default: none
  whiteList['animation-iteration-count'] = false; // default: 1
  whiteList['animation-name'] = false; // default: none
  whiteList['animation-play-state'] = false; // default: running
  whiteList['animation-timing-function'] = false; // default: ease
  whiteList['azimuth'] = false; // default: center
  whiteList['backface-visibility'] = false; // default: visible
  whiteList['background'] = true; // default: depending on individual properties
  whiteList['background-attachment'] = true; // default: scroll
  whiteList['background-clip'] = true; // default: border-box
  whiteList['background-color'] = true; // default: transparent
  whiteList['background-image'] = true; // default: none
  whiteList['background-origin'] = true; // default: padding-box
  whiteList['background-position'] = true; // default: 0% 0%
  whiteList['background-repeat'] = true; // default: repeat
  whiteList['background-size'] = true; // default: auto
  whiteList['baseline-shift'] = false; // default: baseline
  whiteList['binding'] = false; // default: none
  whiteList['bleed'] = false; // default: 6pt
  whiteList['bookmark-label'] = false; // default: content()
  whiteList['bookmark-level'] = false; // default: none
  whiteList['bookmark-state'] = false; // default: open
  whiteList['border'] = true; // default: depending on individual properties
  whiteList['border-bottom'] = true; // default: depending on individual properties
  whiteList['border-bottom-color'] = true; // default: current color
  whiteList['border-bottom-left-radius'] = true; // default: 0
  whiteList['border-bottom-right-radius'] = true; // default: 0
  whiteList['border-bottom-style'] = true; // default: none
  whiteList['border-bottom-width'] = true; // default: medium
  whiteList['border-collapse'] = true; // default: separate
  whiteList['border-color'] = true; // default: depending on individual properties
  whiteList['border-image'] = true; // default: none
  whiteList['border-image-outset'] = true; // default: 0
  whiteList['border-image-repeat'] = true; // default: stretch
  whiteList['border-image-slice'] = true; // default: 100%
  whiteList['border-image-source'] = true; // default: none
  whiteList['border-image-width'] = true; // default: 1
  whiteList['border-left'] = true; // default: depending on individual properties
  whiteList['border-left-color'] = true; // default: current color
  whiteList['border-left-style'] = true; // default: none
  whiteList['border-left-width'] = true; // default: medium
  whiteList['border-radius'] = true; // default: 0
  whiteList['border-right'] = true; // default: depending on individual properties
  whiteList['border-right-color'] = true; // default: current color
  whiteList['border-right-style'] = true; // default: none
  whiteList['border-right-width'] = true; // default: medium
  whiteList['border-spacing'] = true; // default: 0
  whiteList['border-style'] = true; // default: depending on individual properties
  whiteList['border-top'] = true; // default: depending on individual properties
  whiteList['border-top-color'] = true; // default: current color
  whiteList['border-top-left-radius'] = true; // default: 0
  whiteList['border-top-right-radius'] = true; // default: 0
  whiteList['border-top-style'] = true; // default: none
  whiteList['border-top-width'] = true; // default: medium
  whiteList['border-width'] = true; // default: depending on individual properties
  whiteList['bottom'] = false; // default: auto
  whiteList['box-decoration-break'] = true; // default: slice
  whiteList['box-shadow'] = true; // default: none
  whiteList['box-sizing'] = true; // default: content-box
  whiteList['box-snap'] = true; // default: none
  whiteList['box-suppress'] = true; // default: show
  whiteList['break-after'] = true; // default: auto
  whiteList['break-before'] = true; // default: auto
  whiteList['break-inside'] = true; // default: auto
  whiteList['caption-side'] = false; // default: top
  whiteList['chains'] = false; // default: none
  whiteList['clear'] = true; // default: none
  whiteList['clip'] = false; // default: auto
  whiteList['clip-path'] = false; // default: none
  whiteList['clip-rule'] = false; // default: nonzero
  whiteList['color'] = true; // default: implementation dependent
  whiteList['color-interpolation-filters'] = true; // default: auto
  whiteList['column-count'] = false; // default: auto
  whiteList['column-fill'] = false; // default: balance
  whiteList['column-gap'] = false; // default: normal
  whiteList['column-rule'] = false; // default: depending on individual properties
  whiteList['column-rule-color'] = false; // default: current color
  whiteList['column-rule-style'] = false; // default: medium
  whiteList['column-rule-width'] = false; // default: medium
  whiteList['column-span'] = false; // default: none
  whiteList['column-width'] = false; // default: auto
  whiteList['columns'] = false; // default: depending on individual properties
  whiteList['contain'] = false; // default: none
  whiteList['content'] = false; // default: normal
  whiteList['counter-increment'] = false; // default: none
  whiteList['counter-reset'] = false; // default: none
  whiteList['counter-set'] = false; // default: none
  whiteList['crop'] = false; // default: auto
  whiteList['cue'] = false; // default: depending on individual properties
  whiteList['cue-after'] = false; // default: none
  whiteList['cue-before'] = false; // default: none
  whiteList['cursor'] = false; // default: auto
  whiteList['direction'] = false; // default: ltr
  whiteList['display'] = true; // default: depending on individual properties
  whiteList['display-inside'] = true; // default: auto
  whiteList['display-list'] = true; // default: none
  whiteList['display-outside'] = true; // default: inline-level
  whiteList['dominant-baseline'] = false; // default: auto
  whiteList['elevation'] = false; // default: level
  whiteList['empty-cells'] = false; // default: show
  whiteList['filter'] = false; // default: none
  whiteList['flex'] = false; // default: depending on individual properties
  whiteList['flex-basis'] = false; // default: auto
  whiteList['flex-direction'] = false; // default: row
  whiteList['flex-flow'] = false; // default: depending on individual properties
  whiteList['flex-grow'] = false; // default: 0
  whiteList['flex-shrink'] = false; // default: 1
  whiteList['flex-wrap'] = false; // default: nowrap
  whiteList['float'] = false; // default: none
  whiteList['float-offset'] = false; // default: 0 0
  whiteList['flood-color'] = false; // default: black
  whiteList['flood-opacity'] = false; // default: 1
  whiteList['flow-from'] = false; // default: none
  whiteList['flow-into'] = false; // default: none
  whiteList['font'] = true; // default: depending on individual properties
  whiteList['font-family'] = true; // default: implementation dependent
  whiteList['font-feature-settings'] = true; // default: normal
  whiteList['font-kerning'] = true; // default: auto
  whiteList['font-language-override'] = true; // default: normal
  whiteList['font-size'] = true; // default: medium
  whiteList['font-size-adjust'] = true; // default: none
  whiteList['font-stretch'] = true; // default: normal
  whiteList['font-style'] = true; // default: normal
  whiteList['font-synthesis'] = true; // default: weight style
  whiteList['font-variant'] = true; // default: normal
  whiteList['font-variant-alternates'] = true; // default: normal
  whiteList['font-variant-caps'] = true; // default: normal
  whiteList['font-variant-east-asian'] = true; // default: normal
  whiteList['font-variant-ligatures'] = true; // default: normal
  whiteList['font-variant-numeric'] = true; // default: normal
  whiteList['font-variant-position'] = true; // default: normal
  whiteList['font-weight'] = true; // default: normal
  whiteList['grid'] = false; // default: depending on individual properties
  whiteList['grid-area'] = false; // default: depending on individual properties
  whiteList['grid-auto-columns'] = false; // default: auto
  whiteList['grid-auto-flow'] = false; // default: none
  whiteList['grid-auto-rows'] = false; // default: auto
  whiteList['grid-column'] = false; // default: depending on individual properties
  whiteList['grid-column-end'] = false; // default: auto
  whiteList['grid-column-start'] = false; // default: auto
  whiteList['grid-row'] = false; // default: depending on individual properties
  whiteList['grid-row-end'] = false; // default: auto
  whiteList['grid-row-start'] = false; // default: auto
  whiteList['grid-template'] = false; // default: depending on individual properties
  whiteList['grid-template-areas'] = false; // default: none
  whiteList['grid-template-columns'] = false; // default: none
  whiteList['grid-template-rows'] = false; // default: none
  whiteList['hanging-punctuation'] = false; // default: none
  whiteList['height'] = true; // default: auto
  whiteList['hyphens'] = false; // default: manual
  whiteList['icon'] = false; // default: auto
  whiteList['image-orientation'] = false; // default: auto
  whiteList['image-resolution'] = false; // default: normal
  whiteList['ime-mode'] = false; // default: auto
  whiteList['initial-letters'] = false; // default: normal
  whiteList['inline-box-align'] = false; // default: last
  whiteList['justify-content'] = false; // default: auto
  whiteList['justify-items'] = false; // default: auto
  whiteList['justify-self'] = false; // default: auto
  whiteList['left'] = false; // default: auto
  whiteList['letter-spacing'] = true; // default: normal
  whiteList['lighting-color'] = true; // default: white
  whiteList['line-box-contain'] = false; // default: block inline replaced
  whiteList['line-break'] = false; // default: auto
  whiteList['line-grid'] = false; // default: match-parent
  whiteList['line-height'] = false; // default: normal
  whiteList['line-snap'] = false; // default: none
  whiteList['line-stacking'] = false; // default: depending on individual properties
  whiteList['line-stacking-ruby'] = false; // default: exclude-ruby
  whiteList['line-stacking-shift'] = false; // default: consider-shifts
  whiteList['line-stacking-strategy'] = false; // default: inline-line-height
  whiteList['list-style'] = true; // default: depending on individual properties
  whiteList['list-style-image'] = true; // default: none
  whiteList['list-style-position'] = true; // default: outside
  whiteList['list-style-type'] = true; // default: disc
  whiteList['margin'] = true; // default: depending on individual properties
  whiteList['margin-bottom'] = true; // default: 0
  whiteList['margin-left'] = true; // default: 0
  whiteList['margin-right'] = true; // default: 0
  whiteList['margin-top'] = true; // default: 0
  whiteList['marker-offset'] = false; // default: auto
  whiteList['marker-side'] = false; // default: list-item
  whiteList['marks'] = false; // default: none
  whiteList['mask'] = false; // default: border-box
  whiteList['mask-box'] = false; // default: see individual properties
  whiteList['mask-box-outset'] = false; // default: 0
  whiteList['mask-box-repeat'] = false; // default: stretch
  whiteList['mask-box-slice'] = false; // default: 0 fill
  whiteList['mask-box-source'] = false; // default: none
  whiteList['mask-box-width'] = false; // default: auto
  whiteList['mask-clip'] = false; // default: border-box
  whiteList['mask-image'] = false; // default: none
  whiteList['mask-origin'] = false; // default: border-box
  whiteList['mask-position'] = false; // default: center
  whiteList['mask-repeat'] = false; // default: no-repeat
  whiteList['mask-size'] = false; // default: border-box
  whiteList['mask-source-type'] = false; // default: auto
  whiteList['mask-type'] = false; // default: luminance
  whiteList['max-height'] = true; // default: none
  whiteList['max-lines'] = false; // default: none
  whiteList['max-width'] = true; // default: none
  whiteList['min-height'] = true; // default: 0
  whiteList['min-width'] = true; // default: 0
  whiteList['move-to'] = false; // default: normal
  whiteList['nav-down'] = false; // default: auto
  whiteList['nav-index'] = false; // default: auto
  whiteList['nav-left'] = false; // default: auto
  whiteList['nav-right'] = false; // default: auto
  whiteList['nav-up'] = false; // default: auto
  whiteList['object-fit'] = false; // default: fill
  whiteList['object-position'] = false; // default: 50% 50%
  whiteList['opacity'] = false; // default: 1
  whiteList['order'] = false; // default: 0
  whiteList['orphans'] = false; // default: 2
  whiteList['outline'] = false; // default: depending on individual properties
  whiteList['outline-color'] = false; // default: invert
  whiteList['outline-offset'] = false; // default: 0
  whiteList['outline-style'] = false; // default: none
  whiteList['outline-width'] = false; // default: medium
  whiteList['overflow'] = false; // default: depending on individual properties
  whiteList['overflow-wrap'] = false; // default: normal
  whiteList['overflow-x'] = false; // default: visible
  whiteList['overflow-y'] = false; // default: visible
  whiteList['padding'] = true; // default: depending on individual properties
  whiteList['padding-bottom'] = true; // default: 0
  whiteList['padding-left'] = true; // default: 0
  whiteList['padding-right'] = true; // default: 0
  whiteList['padding-top'] = true; // default: 0
  whiteList['page'] = false; // default: auto
  whiteList['page-break-after'] = false; // default: auto
  whiteList['page-break-before'] = false; // default: auto
  whiteList['page-break-inside'] = false; // default: auto
  whiteList['page-policy'] = false; // default: start
  whiteList['pause'] = false; // default: implementation dependent
  whiteList['pause-after'] = false; // default: implementation dependent
  whiteList['pause-before'] = false; // default: implementation dependent
  whiteList['perspective'] = false; // default: none
  whiteList['perspective-origin'] = false; // default: 50% 50%
  whiteList['pitch'] = false; // default: medium
  whiteList['pitch-range'] = false; // default: 50
  whiteList['play-during'] = false; // default: auto
  whiteList['position'] = false; // default: static
  whiteList['presentation-level'] = false; // default: 0
  whiteList['quotes'] = false; // default: text
  whiteList['region-fragment'] = false; // default: auto
  whiteList['resize'] = false; // default: none
  whiteList['rest'] = false; // default: depending on individual properties
  whiteList['rest-after'] = false; // default: none
  whiteList['rest-before'] = false; // default: none
  whiteList['richness'] = false; // default: 50
  whiteList['right'] = false; // default: auto
  whiteList['rotation'] = false; // default: 0
  whiteList['rotation-point'] = false; // default: 50% 50%
  whiteList['ruby-align'] = false; // default: auto
  whiteList['ruby-merge'] = false; // default: separate
  whiteList['ruby-position'] = false; // default: before
  whiteList['shape-image-threshold'] = false; // default: 0.0
  whiteList['shape-outside'] = false; // default: none
  whiteList['shape-margin'] = false; // default: 0
  whiteList['size'] = false; // default: auto
  whiteList['speak'] = false; // default: auto
  whiteList['speak-as'] = false; // default: normal
  whiteList['speak-header'] = false; // default: once
  whiteList['speak-numeral'] = false; // default: continuous
  whiteList['speak-punctuation'] = false; // default: none
  whiteList['speech-rate'] = false; // default: medium
  whiteList['stress'] = false; // default: 50
  whiteList['string-set'] = false; // default: none
  whiteList['tab-size'] = false; // default: 8
  whiteList['table-layout'] = false; // default: auto
  whiteList['text-align'] = true; // default: start
  whiteList['text-align-last'] = true; // default: auto
  whiteList['text-combine-upright'] = true; // default: none
  whiteList['text-decoration'] = true; // default: none
  whiteList['text-decoration-color'] = true; // default: currentColor
  whiteList['text-decoration-line'] = true; // default: none
  whiteList['text-decoration-skip'] = true; // default: objects
  whiteList['text-decoration-style'] = true; // default: solid
  whiteList['text-emphasis'] = true; // default: depending on individual properties
  whiteList['text-emphasis-color'] = true; // default: currentColor
  whiteList['text-emphasis-position'] = true; // default: over right
  whiteList['text-emphasis-style'] = true; // default: none
  whiteList['text-height'] = true; // default: auto
  whiteList['text-indent'] = true; // default: 0
  whiteList['text-justify'] = true; // default: auto
  whiteList['text-orientation'] = true; // default: mixed
  whiteList['text-overflow'] = true; // default: clip
  whiteList['text-shadow'] = true; // default: none
  whiteList['text-space-collapse'] = true; // default: collapse
  whiteList['text-transform'] = true; // default: none
  whiteList['text-underline-position'] = true; // default: auto
  whiteList['text-wrap'] = true; // default: normal
  whiteList['top'] = false; // default: auto
  whiteList['transform'] = false; // default: none
  whiteList['transform-origin'] = false; // default: 50% 50% 0
  whiteList['transform-style'] = false; // default: flat
  whiteList['transition'] = false; // default: depending on individual properties
  whiteList['transition-delay'] = false; // default: 0s
  whiteList['transition-duration'] = false; // default: 0s
  whiteList['transition-property'] = false; // default: all
  whiteList['transition-timing-function'] = false; // default: ease
  whiteList['unicode-bidi'] = false; // default: normal
  whiteList['vertical-align'] = false; // default: baseline
  whiteList['visibility'] = false; // default: visible
  whiteList['voice-balance'] = false; // default: center
  whiteList['voice-duration'] = false; // default: auto
  whiteList['voice-family'] = false; // default: implementation dependent
  whiteList['voice-pitch'] = false; // default: medium
  whiteList['voice-range'] = false; // default: medium
  whiteList['voice-rate'] = false; // default: normal
  whiteList['voice-stress'] = false; // default: normal
  whiteList['voice-volume'] = false; // default: medium
  whiteList['volume'] = false; // default: medium
  whiteList['white-space'] = false; // default: normal
  whiteList['widows'] = false; // default: 2
  whiteList['width'] = true; // default: auto
  whiteList['will-change'] = false; // default: auto
  whiteList['word-break'] = true; // default: normal
  whiteList['word-spacing'] = true; // default: normal
  whiteList['word-wrap'] = true; // default: normal
  whiteList['wrap-flow'] = false; // default: auto
  whiteList['wrap-through'] = false; // default: wrap
  whiteList['writing-mode'] = false; // default: horizontal-tb
  whiteList['z-index'] = false; // default: auto

  return whiteList;
}


/**
 * 匹配到白名单上的一个属性时
 *
 * @param {String} name
 * @param {String} value
 * @param {Object} options
 * @return {String}
 */
function onAttr (name, value, options) {
  // do nothing
}

/**
 * 匹配到不在白名单上的一个属性时
 *
 * @param {String} name
 * @param {String} value
 * @param {Object} options
 * @return {String}
 */
function onIgnoreAttr (name, value, options) {
  // do nothing
}

var REGEXP_URL_JAVASCRIPT = /javascript\s*\:/img;

/**
 * 过滤属性值
 *
 * @param {String} name
 * @param {String} value
 * @return {String}
 */
function safeAttrValue(name, value) {
  if (REGEXP_URL_JAVASCRIPT.test(value)) return '';
  return value;
}


exports.whiteList = getDefaultWhiteList();
exports.getDefaultWhiteList = getDefaultWhiteList;
exports.onAttr = onAttr;
exports.onIgnoreAttr = onIgnoreAttr;
exports.safeAttrValue = safeAttrValue;


/***/ }),

/***/ "./node_modules/cssfilter/lib/index.js":
/*!*********************************************!*\
  !*** ./node_modules/cssfilter/lib/index.js ***!
  \*********************************************/
/***/ ((module, exports, __webpack_require__) => {

/**
 * cssfilter
 *
 * @author 老雷<leizongmin@gmail.com>
 */

var DEFAULT = __webpack_require__(/*! ./default */ "./node_modules/cssfilter/lib/default.js");
var FilterCSS = __webpack_require__(/*! ./css */ "./node_modules/cssfilter/lib/css.js");


/**
 * XSS过滤
 *
 * @param {String} css 要过滤的CSS代码
 * @param {Object} options 选项：whiteList, onAttr, onIgnoreAttr
 * @return {String}
 */
function filterCSS (html, options) {
  var xss = new FilterCSS(options);
  return xss.process(html);
}


// 输出
exports = module.exports = filterCSS;
exports.FilterCSS = FilterCSS;
for (var i in DEFAULT) exports[i] = DEFAULT[i];

// 在浏览器端使用
if (typeof window !== 'undefined') {
  window.filterCSS = module.exports;
}


/***/ }),

/***/ "./node_modules/cssfilter/lib/parser.js":
/*!**********************************************!*\
  !*** ./node_modules/cssfilter/lib/parser.js ***!
  \**********************************************/
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {

/**
 * cssfilter
 *
 * @author 老雷<leizongmin@gmail.com>
 */

var _ = __webpack_require__(/*! ./util */ "./node_modules/cssfilter/lib/util.js");


/**
 * 解析style
 *
 * @param {String} css
 * @param {Function} onAttr 处理属性的函数
 *   参数格式： function (sourcePosition, position, name, value, source)
 * @return {String}
 */
function parseStyle (css, onAttr) {
  css = _.trimRight(css);
  if (css[css.length - 1] !== ';') css += ';';
  var cssLength = css.length;
  var isParenthesisOpen = false;
  var lastPos = 0;
  var i = 0;
  var retCSS = '';

  function addNewAttr () {
    // 如果没有正常的闭合圆括号，则直接忽略当前属性
    if (!isParenthesisOpen) {
      var source = _.trim(css.slice(lastPos, i));
      var j = source.indexOf(':');
      if (j !== -1) {
        var name = _.trim(source.slice(0, j));
        var value = _.trim(source.slice(j + 1));
        // 必须有属性名称
        if (name) {
          var ret = onAttr(lastPos, retCSS.length, name, value, source);
          if (ret) retCSS += ret + '; ';
        }
      }
    }
    lastPos = i + 1;
  }

  for (; i < cssLength; i++) {
    var c = css[i];
    if (c === '/' && css[i + 1] === '*') {
      // 备注开始
      var j = css.indexOf('*/', i + 2);
      // 如果没有正常的备注结束，则后面的部分全部跳过
      if (j === -1) break;
      // 直接将当前位置调到备注结尾，并且初始化状态
      i = j + 1;
      lastPos = i + 1;
      isParenthesisOpen = false;
    } else if (c === '(') {
      isParenthesisOpen = true;
    } else if (c === ')') {
      isParenthesisOpen = false;
    } else if (c === ';') {
      if (isParenthesisOpen) {
        // 在圆括号里面，忽略
      } else {
        addNewAttr();
      }
    } else if (c === '\n') {
      addNewAttr();
    }
  }

  return _.trim(retCSS);
}

module.exports = parseStyle;


/***/ }),

/***/ "./node_modules/cssfilter/lib/util.js":
/*!********************************************!*\
  !*** ./node_modules/cssfilter/lib/util.js ***!
  \********************************************/
/***/ ((module) => {

module.exports = {
  indexOf: function (arr, item) {
    var i, j;
    if (Array.prototype.indexOf) {
      return arr.indexOf(item);
    }
    for (i = 0, j = arr.length; i < j; i++) {
      if (arr[i] === item) {
        return i;
      }
    }
    return -1;
  },
  forEach: function (arr, fn, scope) {
    var i, j;
    if (Array.prototype.forEach) {
      return arr.forEach(fn, scope);
    }
    for (i = 0, j = arr.length; i < j; i++) {
      fn.call(scope, arr[i], i, arr);
    }
  },
  trim: function (str) {
    if (String.prototype.trim) {
      return str.trim();
    }
    return str.replace(/(^\s*)|(\s*$)/g, '');
  },
  trimRight: function (str) {
    if (String.prototype.trimRight) {
      return str.trimRight();
    }
    return str.replace(/(\s*$)/g, '');
  }
};


/***/ }),

/***/ "./node_modules/file-saver/dist/FileSaver.min.js":
/*!*******************************************************!*\
  !*** ./node_modules/file-saver/dist/FileSaver.min.js ***!
  \*******************************************************/
/***/ (function(module, exports, __webpack_require__) {

var __WEBPACK_AMD_DEFINE_FACTORY__, __WEBPACK_AMD_DEFINE_ARRAY__, __WEBPACK_AMD_DEFINE_RESULT__;(function(a,b){if(true)!(__WEBPACK_AMD_DEFINE_ARRAY__ = [], __WEBPACK_AMD_DEFINE_FACTORY__ = (b),
		__WEBPACK_AMD_DEFINE_RESULT__ = (typeof __WEBPACK_AMD_DEFINE_FACTORY__ === 'function' ?
		(__WEBPACK_AMD_DEFINE_FACTORY__.apply(exports, __WEBPACK_AMD_DEFINE_ARRAY__)) : __WEBPACK_AMD_DEFINE_FACTORY__),
		__WEBPACK_AMD_DEFINE_RESULT__ !== undefined && (module.exports = __WEBPACK_AMD_DEFINE_RESULT__));else {}})(this,function(){"use strict";function b(a,b){return"undefined"==typeof b?b={autoBom:!1}:"object"!=typeof b&&(console.warn("Deprecated: Expected third argument to be a object"),b={autoBom:!b}),b.autoBom&&/^\s*(?:text\/\S*|application\/xml|\S*\/\S*\+xml)\s*;.*charset\s*=\s*utf-8/i.test(a.type)?new Blob(["\uFEFF",a],{type:a.type}):a}function c(a,b,c){var d=new XMLHttpRequest;d.open("GET",a),d.responseType="blob",d.onload=function(){g(d.response,b,c)},d.onerror=function(){console.error("could not download file")},d.send()}function d(a){var b=new XMLHttpRequest;b.open("HEAD",a,!1);try{b.send()}catch(a){}return 200<=b.status&&299>=b.status}function e(a){try{a.dispatchEvent(new MouseEvent("click"))}catch(c){var b=document.createEvent("MouseEvents");b.initMouseEvent("click",!0,!0,window,0,0,0,80,20,!1,!1,!1,!1,0,null),a.dispatchEvent(b)}}var f="object"==typeof window&&window.window===window?window:"object"==typeof self&&self.self===self?self:"object"==typeof __webpack_require__.g&&__webpack_require__.g.global===__webpack_require__.g?__webpack_require__.g:void 0,a=f.navigator&&/Macintosh/.test(navigator.userAgent)&&/AppleWebKit/.test(navigator.userAgent)&&!/Safari/.test(navigator.userAgent),g=f.saveAs||("object"!=typeof window||window!==f?function(){}:"download"in HTMLAnchorElement.prototype&&!a?function(b,g,h){var i=f.URL||f.webkitURL,j=document.createElement("a");g=g||b.name||"download",j.download=g,j.rel="noopener","string"==typeof b?(j.href=b,j.origin===location.origin?e(j):d(j.href)?c(b,g,h):e(j,j.target="_blank")):(j.href=i.createObjectURL(b),setTimeout(function(){i.revokeObjectURL(j.href)},4E4),setTimeout(function(){e(j)},0))}:"msSaveOrOpenBlob"in navigator?function(f,g,h){if(g=g||f.name||"download","string"!=typeof f)navigator.msSaveOrOpenBlob(b(f,h),g);else if(d(f))c(f,g,h);else{var i=document.createElement("a");i.href=f,i.target="_blank",setTimeout(function(){e(i)})}}:function(b,d,e,g){if(g=g||open("","_blank"),g&&(g.document.title=g.document.body.innerText="downloading..."),"string"==typeof b)return c(b,d,e);var h="application/octet-stream"===b.type,i=/constructor/i.test(f.HTMLElement)||f.safari,j=/CriOS\/[\d]+/.test(navigator.userAgent);if((j||h&&i||a)&&"undefined"!=typeof FileReader){var k=new FileReader;k.onloadend=function(){var a=k.result;a=j?a:a.replace(/^data:[^;]*;/,"data:attachment/file;"),g?g.location.href=a:location=a,g=null},k.readAsDataURL(b)}else{var l=f.URL||f.webkitURL,m=l.createObjectURL(b);g?g.location=m:location.href=m,g=null,setTimeout(function(){l.revokeObjectURL(m)},4E4)}});f.saveAs=g.saveAs=g, true&&(module.exports=g)});

//# sourceMappingURL=FileSaver.min.js.map

/***/ }),

/***/ "./node_modules/sweetalert/dist/sweetalert.min.js":
/*!********************************************************!*\
  !*** ./node_modules/sweetalert/dist/sweetalert.min.js ***!
  \********************************************************/
/***/ (function(module) {

!function(t,e){ true?module.exports=e():0}(this,function(){return function(t){function e(o){if(n[o])return n[o].exports;var r=n[o]={i:o,l:!1,exports:{}};return t[o].call(r.exports,r,r.exports,e),r.l=!0,r.exports}var n={};return e.m=t,e.c=n,e.d=function(t,n,o){e.o(t,n)||Object.defineProperty(t,n,{configurable:!1,enumerable:!0,get:o})},e.n=function(t){var n=t&&t.__esModule?function(){return t.default}:function(){return t};return e.d(n,"a",n),n},e.o=function(t,e){return Object.prototype.hasOwnProperty.call(t,e)},e.p="",e(e.s=8)}([function(t,e,n){"use strict";Object.defineProperty(e,"__esModule",{value:!0});var o="swal-button";e.CLASS_NAMES={MODAL:"swal-modal",OVERLAY:"swal-overlay",SHOW_MODAL:"swal-overlay--show-modal",MODAL_TITLE:"swal-title",MODAL_TEXT:"swal-text",ICON:"swal-icon",ICON_CUSTOM:"swal-icon--custom",CONTENT:"swal-content",FOOTER:"swal-footer",BUTTON_CONTAINER:"swal-button-container",BUTTON:o,CONFIRM_BUTTON:o+"--confirm",CANCEL_BUTTON:o+"--cancel",DANGER_BUTTON:o+"--danger",BUTTON_LOADING:o+"--loading",BUTTON_LOADER:o+"__loader"},e.default=e.CLASS_NAMES},function(t,e,n){"use strict";Object.defineProperty(e,"__esModule",{value:!0}),e.getNode=function(t){var e="."+t;return document.querySelector(e)},e.stringToNode=function(t){var e=document.createElement("div");return e.innerHTML=t.trim(),e.firstChild},e.insertAfter=function(t,e){var n=e.nextSibling;e.parentNode.insertBefore(t,n)},e.removeNode=function(t){t.parentElement.removeChild(t)},e.throwErr=function(t){throw t=t.replace(/ +(?= )/g,""),"SweetAlert: "+(t=t.trim())},e.isPlainObject=function(t){if("[object Object]"!==Object.prototype.toString.call(t))return!1;var e=Object.getPrototypeOf(t);return null===e||e===Object.prototype},e.ordinalSuffixOf=function(t){var e=t%10,n=t%100;return 1===e&&11!==n?t+"st":2===e&&12!==n?t+"nd":3===e&&13!==n?t+"rd":t+"th"}},function(t,e,n){"use strict";function o(t){for(var n in t)e.hasOwnProperty(n)||(e[n]=t[n])}Object.defineProperty(e,"__esModule",{value:!0}),o(n(25));var r=n(26);e.overlayMarkup=r.default,o(n(27)),o(n(28)),o(n(29));var i=n(0),a=i.default.MODAL_TITLE,s=i.default.MODAL_TEXT,c=i.default.ICON,l=i.default.FOOTER;e.iconMarkup='\n  <div class="'+c+'"></div>',e.titleMarkup='\n  <div class="'+a+'"></div>\n',e.textMarkup='\n  <div class="'+s+'"></div>',e.footerMarkup='\n  <div class="'+l+'"></div>\n'},function(t,e,n){"use strict";Object.defineProperty(e,"__esModule",{value:!0});var o=n(1);e.CONFIRM_KEY="confirm",e.CANCEL_KEY="cancel";var r={visible:!0,text:null,value:null,className:"",closeModal:!0},i=Object.assign({},r,{visible:!1,text:"Cancel",value:null}),a=Object.assign({},r,{text:"OK",value:!0});e.defaultButtonList={cancel:i,confirm:a};var s=function(t){switch(t){case e.CONFIRM_KEY:return a;case e.CANCEL_KEY:return i;default:var n=t.charAt(0).toUpperCase()+t.slice(1);return Object.assign({},r,{text:n,value:t})}},c=function(t,e){var n=s(t);return!0===e?Object.assign({},n,{visible:!0}):"string"==typeof e?Object.assign({},n,{visible:!0,text:e}):o.isPlainObject(e)?Object.assign({visible:!0},n,e):Object.assign({},n,{visible:!1})},l=function(t){for(var e={},n=0,o=Object.keys(t);n<o.length;n++){var r=o[n],a=t[r],s=c(r,a);e[r]=s}return e.cancel||(e.cancel=i),e},u=function(t){var n={};switch(t.length){case 1:n[e.CANCEL_KEY]=Object.assign({},i,{visible:!1});break;case 2:n[e.CANCEL_KEY]=c(e.CANCEL_KEY,t[0]),n[e.CONFIRM_KEY]=c(e.CONFIRM_KEY,t[1]);break;default:o.throwErr("Invalid number of 'buttons' in array ("+t.length+").\n      If you want more than 2 buttons, you need to use an object!")}return n};e.getButtonListOpts=function(t){var n=e.defaultButtonList;return"string"==typeof t?n[e.CONFIRM_KEY]=c(e.CONFIRM_KEY,t):Array.isArray(t)?n=u(t):o.isPlainObject(t)?n=l(t):!0===t?n=u([!0,!0]):!1===t?n=u([!1,!1]):void 0===t&&(n=e.defaultButtonList),n}},function(t,e,n){"use strict";Object.defineProperty(e,"__esModule",{value:!0});var o=n(1),r=n(2),i=n(0),a=i.default.MODAL,s=i.default.OVERLAY,c=n(30),l=n(31),u=n(32),f=n(33);e.injectElIntoModal=function(t){var e=o.getNode(a),n=o.stringToNode(t);return e.appendChild(n),n};var d=function(t){t.className=a,t.textContent=""},p=function(t,e){d(t);var n=e.className;n&&t.classList.add(n)};e.initModalContent=function(t){var e=o.getNode(a);p(e,t),c.default(t.icon),l.initTitle(t.title),l.initText(t.text),f.default(t.content),u.default(t.buttons,t.dangerMode)};var m=function(){var t=o.getNode(s),e=o.stringToNode(r.modalMarkup);t.appendChild(e)};e.default=m},function(t,e,n){"use strict";Object.defineProperty(e,"__esModule",{value:!0});var o=n(3),r={isOpen:!1,promise:null,actions:{},timer:null},i=Object.assign({},r);e.resetState=function(){i=Object.assign({},r)},e.setActionValue=function(t){if("string"==typeof t)return a(o.CONFIRM_KEY,t);for(var e in t)a(e,t[e])};var a=function(t,e){i.actions[t]||(i.actions[t]={}),Object.assign(i.actions[t],{value:e})};e.setActionOptionsFor=function(t,e){var n=(void 0===e?{}:e).closeModal,o=void 0===n||n;Object.assign(i.actions[t],{closeModal:o})},e.default=i},function(t,e,n){"use strict";Object.defineProperty(e,"__esModule",{value:!0});var o=n(1),r=n(3),i=n(0),a=i.default.OVERLAY,s=i.default.SHOW_MODAL,c=i.default.BUTTON,l=i.default.BUTTON_LOADING,u=n(5);e.openModal=function(){o.getNode(a).classList.add(s),u.default.isOpen=!0};var f=function(){o.getNode(a).classList.remove(s),u.default.isOpen=!1};e.onAction=function(t){void 0===t&&(t=r.CANCEL_KEY);var e=u.default.actions[t],n=e.value;if(!1===e.closeModal){var i=c+"--"+t;o.getNode(i).classList.add(l)}else f();u.default.promise.resolve(n)},e.getState=function(){var t=Object.assign({},u.default);return delete t.promise,delete t.timer,t},e.stopLoading=function(){for(var t=document.querySelectorAll("."+c),e=0;e<t.length;e++){t[e].classList.remove(l)}}},function(t,e){var n;n=function(){return this}();try{n=n||Function("return this")()||(0,eval)("this")}catch(t){"object"==typeof window&&(n=window)}t.exports=n},function(t,e,n){(function(e){t.exports=e.sweetAlert=n(9)}).call(e,n(7))},function(t,e,n){(function(e){t.exports=e.swal=n(10)}).call(e,n(7))},function(t,e,n){"undefined"!=typeof window&&n(11),n(16);var o=n(23).default;t.exports=o},function(t,e,n){var o=n(12);"string"==typeof o&&(o=[[t.i,o,""]]);var r={insertAt:"top"};r.transform=void 0;n(14)(o,r);o.locals&&(t.exports=o.locals)},function(t,e,n){e=t.exports=n(13)(void 0),e.push([t.i,'.swal-icon--error{border-color:#f27474;-webkit-animation:animateErrorIcon .5s;animation:animateErrorIcon .5s}.swal-icon--error__x-mark{position:relative;display:block;-webkit-animation:animateXMark .5s;animation:animateXMark .5s}.swal-icon--error__line{position:absolute;height:5px;width:47px;background-color:#f27474;display:block;top:37px;border-radius:2px}.swal-icon--error__line--left{-webkit-transform:rotate(45deg);transform:rotate(45deg);left:17px}.swal-icon--error__line--right{-webkit-transform:rotate(-45deg);transform:rotate(-45deg);right:16px}@-webkit-keyframes animateErrorIcon{0%{-webkit-transform:rotateX(100deg);transform:rotateX(100deg);opacity:0}to{-webkit-transform:rotateX(0deg);transform:rotateX(0deg);opacity:1}}@keyframes animateErrorIcon{0%{-webkit-transform:rotateX(100deg);transform:rotateX(100deg);opacity:0}to{-webkit-transform:rotateX(0deg);transform:rotateX(0deg);opacity:1}}@-webkit-keyframes animateXMark{0%{-webkit-transform:scale(.4);transform:scale(.4);margin-top:26px;opacity:0}50%{-webkit-transform:scale(.4);transform:scale(.4);margin-top:26px;opacity:0}80%{-webkit-transform:scale(1.15);transform:scale(1.15);margin-top:-6px}to{-webkit-transform:scale(1);transform:scale(1);margin-top:0;opacity:1}}@keyframes animateXMark{0%{-webkit-transform:scale(.4);transform:scale(.4);margin-top:26px;opacity:0}50%{-webkit-transform:scale(.4);transform:scale(.4);margin-top:26px;opacity:0}80%{-webkit-transform:scale(1.15);transform:scale(1.15);margin-top:-6px}to{-webkit-transform:scale(1);transform:scale(1);margin-top:0;opacity:1}}.swal-icon--warning{border-color:#f8bb86;-webkit-animation:pulseWarning .75s infinite alternate;animation:pulseWarning .75s infinite alternate}.swal-icon--warning__body{width:5px;height:47px;top:10px;border-radius:2px;margin-left:-2px}.swal-icon--warning__body,.swal-icon--warning__dot{position:absolute;left:50%;background-color:#f8bb86}.swal-icon--warning__dot{width:7px;height:7px;border-radius:50%;margin-left:-4px;bottom:-11px}@-webkit-keyframes pulseWarning{0%{border-color:#f8d486}to{border-color:#f8bb86}}@keyframes pulseWarning{0%{border-color:#f8d486}to{border-color:#f8bb86}}.swal-icon--success{border-color:#a5dc86}.swal-icon--success:after,.swal-icon--success:before{content:"";border-radius:50%;position:absolute;width:60px;height:120px;background:#fff;-webkit-transform:rotate(45deg);transform:rotate(45deg)}.swal-icon--success:before{border-radius:120px 0 0 120px;top:-7px;left:-33px;-webkit-transform:rotate(-45deg);transform:rotate(-45deg);-webkit-transform-origin:60px 60px;transform-origin:60px 60px}.swal-icon--success:after{border-radius:0 120px 120px 0;top:-11px;left:30px;-webkit-transform:rotate(-45deg);transform:rotate(-45deg);-webkit-transform-origin:0 60px;transform-origin:0 60px;-webkit-animation:rotatePlaceholder 4.25s ease-in;animation:rotatePlaceholder 4.25s ease-in}.swal-icon--success__ring{width:80px;height:80px;border:4px solid hsla(98,55%,69%,.2);border-radius:50%;box-sizing:content-box;position:absolute;left:-4px;top:-4px;z-index:2}.swal-icon--success__hide-corners{width:5px;height:90px;background-color:#fff;padding:1px;position:absolute;left:28px;top:8px;z-index:1;-webkit-transform:rotate(-45deg);transform:rotate(-45deg)}.swal-icon--success__line{height:5px;background-color:#a5dc86;display:block;border-radius:2px;position:absolute;z-index:2}.swal-icon--success__line--tip{width:25px;left:14px;top:46px;-webkit-transform:rotate(45deg);transform:rotate(45deg);-webkit-animation:animateSuccessTip .75s;animation:animateSuccessTip .75s}.swal-icon--success__line--long{width:47px;right:8px;top:38px;-webkit-transform:rotate(-45deg);transform:rotate(-45deg);-webkit-animation:animateSuccessLong .75s;animation:animateSuccessLong .75s}@-webkit-keyframes rotatePlaceholder{0%{-webkit-transform:rotate(-45deg);transform:rotate(-45deg)}5%{-webkit-transform:rotate(-45deg);transform:rotate(-45deg)}12%{-webkit-transform:rotate(-405deg);transform:rotate(-405deg)}to{-webkit-transform:rotate(-405deg);transform:rotate(-405deg)}}@keyframes rotatePlaceholder{0%{-webkit-transform:rotate(-45deg);transform:rotate(-45deg)}5%{-webkit-transform:rotate(-45deg);transform:rotate(-45deg)}12%{-webkit-transform:rotate(-405deg);transform:rotate(-405deg)}to{-webkit-transform:rotate(-405deg);transform:rotate(-405deg)}}@-webkit-keyframes animateSuccessTip{0%{width:0;left:1px;top:19px}54%{width:0;left:1px;top:19px}70%{width:50px;left:-8px;top:37px}84%{width:17px;left:21px;top:48px}to{width:25px;left:14px;top:45px}}@keyframes animateSuccessTip{0%{width:0;left:1px;top:19px}54%{width:0;left:1px;top:19px}70%{width:50px;left:-8px;top:37px}84%{width:17px;left:21px;top:48px}to{width:25px;left:14px;top:45px}}@-webkit-keyframes animateSuccessLong{0%{width:0;right:46px;top:54px}65%{width:0;right:46px;top:54px}84%{width:55px;right:0;top:35px}to{width:47px;right:8px;top:38px}}@keyframes animateSuccessLong{0%{width:0;right:46px;top:54px}65%{width:0;right:46px;top:54px}84%{width:55px;right:0;top:35px}to{width:47px;right:8px;top:38px}}.swal-icon--info{border-color:#c9dae1}.swal-icon--info:before{width:5px;height:29px;bottom:17px;border-radius:2px;margin-left:-2px}.swal-icon--info:after,.swal-icon--info:before{content:"";position:absolute;left:50%;background-color:#c9dae1}.swal-icon--info:after{width:7px;height:7px;border-radius:50%;margin-left:-3px;top:19px}.swal-icon{width:80px;height:80px;border-width:4px;border-style:solid;border-radius:50%;padding:0;position:relative;box-sizing:content-box;margin:20px auto}.swal-icon:first-child{margin-top:32px}.swal-icon--custom{width:auto;height:auto;max-width:100%;border:none;border-radius:0}.swal-icon img{max-width:100%;max-height:100%}.swal-title{color:rgba(0,0,0,.65);font-weight:600;text-transform:none;position:relative;display:block;padding:13px 16px;font-size:27px;line-height:normal;text-align:center;margin-bottom:0}.swal-title:first-child{margin-top:26px}.swal-title:not(:first-child){padding-bottom:0}.swal-title:not(:last-child){margin-bottom:13px}.swal-text{font-size:16px;position:relative;float:none;line-height:normal;vertical-align:top;text-align:left;display:inline-block;margin:0;padding:0 10px;font-weight:400;color:rgba(0,0,0,.64);max-width:calc(100% - 20px);overflow-wrap:break-word;box-sizing:border-box}.swal-text:first-child{margin-top:45px}.swal-text:last-child{margin-bottom:45px}.swal-footer{text-align:right;padding-top:13px;margin-top:13px;padding:13px 16px;border-radius:inherit;border-top-left-radius:0;border-top-right-radius:0}.swal-button-container{margin:5px;display:inline-block;position:relative}.swal-button{background-color:#7cd1f9;color:#fff;border:none;box-shadow:none;border-radius:5px;font-weight:600;font-size:14px;padding:10px 24px;margin:0;cursor:pointer}.swal-button:not([disabled]):hover{background-color:#78cbf2}.swal-button:active{background-color:#70bce0}.swal-button:focus{outline:none;box-shadow:0 0 0 1px #fff,0 0 0 3px rgba(43,114,165,.29)}.swal-button[disabled]{opacity:.5;cursor:default}.swal-button::-moz-focus-inner{border:0}.swal-button--cancel{color:#555;background-color:#efefef}.swal-button--cancel:not([disabled]):hover{background-color:#e8e8e8}.swal-button--cancel:active{background-color:#d7d7d7}.swal-button--cancel:focus{box-shadow:0 0 0 1px #fff,0 0 0 3px rgba(116,136,150,.29)}.swal-button--danger{background-color:#e64942}.swal-button--danger:not([disabled]):hover{background-color:#df4740}.swal-button--danger:active{background-color:#cf423b}.swal-button--danger:focus{box-shadow:0 0 0 1px #fff,0 0 0 3px rgba(165,43,43,.29)}.swal-content{padding:0 20px;margin-top:20px;font-size:medium}.swal-content:last-child{margin-bottom:20px}.swal-content__input,.swal-content__textarea{-webkit-appearance:none;background-color:#fff;border:none;font-size:14px;display:block;box-sizing:border-box;width:100%;border:1px solid rgba(0,0,0,.14);padding:10px 13px;border-radius:2px;transition:border-color .2s}.swal-content__input:focus,.swal-content__textarea:focus{outline:none;border-color:#6db8ff}.swal-content__textarea{resize:vertical}.swal-button--loading{color:transparent}.swal-button--loading~.swal-button__loader{opacity:1}.swal-button__loader{position:absolute;height:auto;width:43px;z-index:2;left:50%;top:50%;-webkit-transform:translateX(-50%) translateY(-50%);transform:translateX(-50%) translateY(-50%);text-align:center;pointer-events:none;opacity:0}.swal-button__loader div{display:inline-block;float:none;vertical-align:baseline;width:9px;height:9px;padding:0;border:none;margin:2px;opacity:.4;border-radius:7px;background-color:hsla(0,0%,100%,.9);transition:background .2s;-webkit-animation:swal-loading-anim 1s infinite;animation:swal-loading-anim 1s infinite}.swal-button__loader div:nth-child(3n+2){-webkit-animation-delay:.15s;animation-delay:.15s}.swal-button__loader div:nth-child(3n+3){-webkit-animation-delay:.3s;animation-delay:.3s}@-webkit-keyframes swal-loading-anim{0%{opacity:.4}20%{opacity:.4}50%{opacity:1}to{opacity:.4}}@keyframes swal-loading-anim{0%{opacity:.4}20%{opacity:.4}50%{opacity:1}to{opacity:.4}}.swal-overlay{position:fixed;top:0;bottom:0;left:0;right:0;text-align:center;font-size:0;overflow-y:auto;background-color:rgba(0,0,0,.4);z-index:10000;pointer-events:none;opacity:0;transition:opacity .3s}.swal-overlay:before{content:" ";display:inline-block;vertical-align:middle;height:100%}.swal-overlay--show-modal{opacity:1;pointer-events:auto}.swal-overlay--show-modal .swal-modal{opacity:1;pointer-events:auto;box-sizing:border-box;-webkit-animation:showSweetAlert .3s;animation:showSweetAlert .3s;will-change:transform}.swal-modal{width:478px;opacity:0;pointer-events:none;background-color:#fff;text-align:center;border-radius:5px;position:static;margin:20px auto;display:inline-block;vertical-align:middle;-webkit-transform:scale(1);transform:scale(1);-webkit-transform-origin:50% 50%;transform-origin:50% 50%;z-index:10001;transition:opacity .2s,-webkit-transform .3s;transition:transform .3s,opacity .2s;transition:transform .3s,opacity .2s,-webkit-transform .3s}@media (max-width:500px){.swal-modal{width:calc(100% - 20px)}}@-webkit-keyframes showSweetAlert{0%{-webkit-transform:scale(1);transform:scale(1)}1%{-webkit-transform:scale(.5);transform:scale(.5)}45%{-webkit-transform:scale(1.05);transform:scale(1.05)}80%{-webkit-transform:scale(.95);transform:scale(.95)}to{-webkit-transform:scale(1);transform:scale(1)}}@keyframes showSweetAlert{0%{-webkit-transform:scale(1);transform:scale(1)}1%{-webkit-transform:scale(.5);transform:scale(.5)}45%{-webkit-transform:scale(1.05);transform:scale(1.05)}80%{-webkit-transform:scale(.95);transform:scale(.95)}to{-webkit-transform:scale(1);transform:scale(1)}}',""])},function(t,e){function n(t,e){var n=t[1]||"",r=t[3];if(!r)return n;if(e&&"function"==typeof btoa){var i=o(r);return[n].concat(r.sources.map(function(t){return"/*# sourceURL="+r.sourceRoot+t+" */"})).concat([i]).join("\n")}return[n].join("\n")}function o(t){return"/*# sourceMappingURL=data:application/json;charset=utf-8;base64,"+btoa(unescape(encodeURIComponent(JSON.stringify(t))))+" */"}t.exports=function(t){var e=[];return e.toString=function(){return this.map(function(e){var o=n(e,t);return e[2]?"@media "+e[2]+"{"+o+"}":o}).join("")},e.i=function(t,n){"string"==typeof t&&(t=[[null,t,""]]);for(var o={},r=0;r<this.length;r++){var i=this[r][0];"number"==typeof i&&(o[i]=!0)}for(r=0;r<t.length;r++){var a=t[r];"number"==typeof a[0]&&o[a[0]]||(n&&!a[2]?a[2]=n:n&&(a[2]="("+a[2]+") and ("+n+")"),e.push(a))}},e}},function(t,e,n){function o(t,e){for(var n=0;n<t.length;n++){var o=t[n],r=m[o.id];if(r){r.refs++;for(var i=0;i<r.parts.length;i++)r.parts[i](o.parts[i]);for(;i<o.parts.length;i++)r.parts.push(u(o.parts[i],e))}else{for(var a=[],i=0;i<o.parts.length;i++)a.push(u(o.parts[i],e));m[o.id]={id:o.id,refs:1,parts:a}}}}function r(t,e){for(var n=[],o={},r=0;r<t.length;r++){var i=t[r],a=e.base?i[0]+e.base:i[0],s=i[1],c=i[2],l=i[3],u={css:s,media:c,sourceMap:l};o[a]?o[a].parts.push(u):n.push(o[a]={id:a,parts:[u]})}return n}function i(t,e){var n=v(t.insertInto);if(!n)throw new Error("Couldn't find a style target. This probably means that the value for the 'insertInto' parameter is invalid.");var o=w[w.length-1];if("top"===t.insertAt)o?o.nextSibling?n.insertBefore(e,o.nextSibling):n.appendChild(e):n.insertBefore(e,n.firstChild),w.push(e);else{if("bottom"!==t.insertAt)throw new Error("Invalid value for parameter 'insertAt'. Must be 'top' or 'bottom'.");n.appendChild(e)}}function a(t){if(null===t.parentNode)return!1;t.parentNode.removeChild(t);var e=w.indexOf(t);e>=0&&w.splice(e,1)}function s(t){var e=document.createElement("style");return t.attrs.type="text/css",l(e,t.attrs),i(t,e),e}function c(t){var e=document.createElement("link");return t.attrs.type="text/css",t.attrs.rel="stylesheet",l(e,t.attrs),i(t,e),e}function l(t,e){Object.keys(e).forEach(function(n){t.setAttribute(n,e[n])})}function u(t,e){var n,o,r,i;if(e.transform&&t.css){if(!(i=e.transform(t.css)))return function(){};t.css=i}if(e.singleton){var l=h++;n=g||(g=s(e)),o=f.bind(null,n,l,!1),r=f.bind(null,n,l,!0)}else t.sourceMap&&"function"==typeof URL&&"function"==typeof URL.createObjectURL&&"function"==typeof URL.revokeObjectURL&&"function"==typeof Blob&&"function"==typeof btoa?(n=c(e),o=p.bind(null,n,e),r=function(){a(n),n.href&&URL.revokeObjectURL(n.href)}):(n=s(e),o=d.bind(null,n),r=function(){a(n)});return o(t),function(e){if(e){if(e.css===t.css&&e.media===t.media&&e.sourceMap===t.sourceMap)return;o(t=e)}else r()}}function f(t,e,n,o){var r=n?"":o.css;if(t.styleSheet)t.styleSheet.cssText=x(e,r);else{var i=document.createTextNode(r),a=t.childNodes;a[e]&&t.removeChild(a[e]),a.length?t.insertBefore(i,a[e]):t.appendChild(i)}}function d(t,e){var n=e.css,o=e.media;if(o&&t.setAttribute("media",o),t.styleSheet)t.styleSheet.cssText=n;else{for(;t.firstChild;)t.removeChild(t.firstChild);t.appendChild(document.createTextNode(n))}}function p(t,e,n){var o=n.css,r=n.sourceMap,i=void 0===e.convertToAbsoluteUrls&&r;(e.convertToAbsoluteUrls||i)&&(o=y(o)),r&&(o+="\n/*# sourceMappingURL=data:application/json;base64,"+btoa(unescape(encodeURIComponent(JSON.stringify(r))))+" */");var a=new Blob([o],{type:"text/css"}),s=t.href;t.href=URL.createObjectURL(a),s&&URL.revokeObjectURL(s)}var m={},b=function(t){var e;return function(){return void 0===e&&(e=t.apply(this,arguments)),e}}(function(){return window&&document&&document.all&&!window.atob}),v=function(t){var e={};return function(n){return void 0===e[n]&&(e[n]=t.call(this,n)),e[n]}}(function(t){return document.querySelector(t)}),g=null,h=0,w=[],y=n(15);t.exports=function(t,e){if("undefined"!=typeof DEBUG&&DEBUG&&"object"!=typeof document)throw new Error("The style-loader cannot be used in a non-browser environment");e=e||{},e.attrs="object"==typeof e.attrs?e.attrs:{},e.singleton||(e.singleton=b()),e.insertInto||(e.insertInto="head"),e.insertAt||(e.insertAt="bottom");var n=r(t,e);return o(n,e),function(t){for(var i=[],a=0;a<n.length;a++){var s=n[a],c=m[s.id];c.refs--,i.push(c)}if(t){o(r(t,e),e)}for(var a=0;a<i.length;a++){var c=i[a];if(0===c.refs){for(var l=0;l<c.parts.length;l++)c.parts[l]();delete m[c.id]}}}};var x=function(){var t=[];return function(e,n){return t[e]=n,t.filter(Boolean).join("\n")}}()},function(t,e){t.exports=function(t){var e="undefined"!=typeof window&&window.location;if(!e)throw new Error("fixUrls requires window.location");if(!t||"string"!=typeof t)return t;var n=e.protocol+"//"+e.host,o=n+e.pathname.replace(/\/[^\/]*$/,"/");return t.replace(/url\s*\(((?:[^)(]|\((?:[^)(]+|\([^)(]*\))*\))*)\)/gi,function(t,e){var r=e.trim().replace(/^"(.*)"$/,function(t,e){return e}).replace(/^'(.*)'$/,function(t,e){return e});if(/^(#|data:|http:\/\/|https:\/\/|file:\/\/\/)/i.test(r))return t;var i;return i=0===r.indexOf("//")?r:0===r.indexOf("/")?n+r:o+r.replace(/^\.\//,""),"url("+JSON.stringify(i)+")"})}},function(t,e,n){var o=n(17);"undefined"==typeof window||window.Promise||(window.Promise=o),n(21),String.prototype.includes||(String.prototype.includes=function(t,e){"use strict";return"number"!=typeof e&&(e=0),!(e+t.length>this.length)&&-1!==this.indexOf(t,e)}),Array.prototype.includes||Object.defineProperty(Array.prototype,"includes",{value:function(t,e){if(null==this)throw new TypeError('"this" is null or not defined');var n=Object(this),o=n.length>>>0;if(0===o)return!1;for(var r=0|e,i=Math.max(r>=0?r:o-Math.abs(r),0);i<o;){if(function(t,e){return t===e||"number"==typeof t&&"number"==typeof e&&isNaN(t)&&isNaN(e)}(n[i],t))return!0;i++}return!1}}),"undefined"!=typeof window&&function(t){t.forEach(function(t){t.hasOwnProperty("remove")||Object.defineProperty(t,"remove",{configurable:!0,enumerable:!0,writable:!0,value:function(){this.parentNode.removeChild(this)}})})}([Element.prototype,CharacterData.prototype,DocumentType.prototype])},function(t,e,n){(function(e){!function(n){function o(){}function r(t,e){return function(){t.apply(e,arguments)}}function i(t){if("object"!=typeof this)throw new TypeError("Promises must be constructed via new");if("function"!=typeof t)throw new TypeError("not a function");this._state=0,this._handled=!1,this._value=void 0,this._deferreds=[],f(t,this)}function a(t,e){for(;3===t._state;)t=t._value;if(0===t._state)return void t._deferreds.push(e);t._handled=!0,i._immediateFn(function(){var n=1===t._state?e.onFulfilled:e.onRejected;if(null===n)return void(1===t._state?s:c)(e.promise,t._value);var o;try{o=n(t._value)}catch(t){return void c(e.promise,t)}s(e.promise,o)})}function s(t,e){try{if(e===t)throw new TypeError("A promise cannot be resolved with itself.");if(e&&("object"==typeof e||"function"==typeof e)){var n=e.then;if(e instanceof i)return t._state=3,t._value=e,void l(t);if("function"==typeof n)return void f(r(n,e),t)}t._state=1,t._value=e,l(t)}catch(e){c(t,e)}}function c(t,e){t._state=2,t._value=e,l(t)}function l(t){2===t._state&&0===t._deferreds.length&&i._immediateFn(function(){t._handled||i._unhandledRejectionFn(t._value)});for(var e=0,n=t._deferreds.length;e<n;e++)a(t,t._deferreds[e]);t._deferreds=null}function u(t,e,n){this.onFulfilled="function"==typeof t?t:null,this.onRejected="function"==typeof e?e:null,this.promise=n}function f(t,e){var n=!1;try{t(function(t){n||(n=!0,s(e,t))},function(t){n||(n=!0,c(e,t))})}catch(t){if(n)return;n=!0,c(e,t)}}var d=setTimeout;i.prototype.catch=function(t){return this.then(null,t)},i.prototype.then=function(t,e){var n=new this.constructor(o);return a(this,new u(t,e,n)),n},i.all=function(t){var e=Array.prototype.slice.call(t);return new i(function(t,n){function o(i,a){try{if(a&&("object"==typeof a||"function"==typeof a)){var s=a.then;if("function"==typeof s)return void s.call(a,function(t){o(i,t)},n)}e[i]=a,0==--r&&t(e)}catch(t){n(t)}}if(0===e.length)return t([]);for(var r=e.length,i=0;i<e.length;i++)o(i,e[i])})},i.resolve=function(t){return t&&"object"==typeof t&&t.constructor===i?t:new i(function(e){e(t)})},i.reject=function(t){return new i(function(e,n){n(t)})},i.race=function(t){return new i(function(e,n){for(var o=0,r=t.length;o<r;o++)t[o].then(e,n)})},i._immediateFn="function"==typeof e&&function(t){e(t)}||function(t){d(t,0)},i._unhandledRejectionFn=function(t){"undefined"!=typeof console&&console&&console.warn("Possible Unhandled Promise Rejection:",t)},i._setImmediateFn=function(t){i._immediateFn=t},i._setUnhandledRejectionFn=function(t){i._unhandledRejectionFn=t},void 0!==t&&t.exports?t.exports=i:n.Promise||(n.Promise=i)}(this)}).call(e,n(18).setImmediate)},function(t,e,n){function o(t,e){this._id=t,this._clearFn=e}var r=Function.prototype.apply;e.setTimeout=function(){return new o(r.call(setTimeout,window,arguments),clearTimeout)},e.setInterval=function(){return new o(r.call(setInterval,window,arguments),clearInterval)},e.clearTimeout=e.clearInterval=function(t){t&&t.close()},o.prototype.unref=o.prototype.ref=function(){},o.prototype.close=function(){this._clearFn.call(window,this._id)},e.enroll=function(t,e){clearTimeout(t._idleTimeoutId),t._idleTimeout=e},e.unenroll=function(t){clearTimeout(t._idleTimeoutId),t._idleTimeout=-1},e._unrefActive=e.active=function(t){clearTimeout(t._idleTimeoutId);var e=t._idleTimeout;e>=0&&(t._idleTimeoutId=setTimeout(function(){t._onTimeout&&t._onTimeout()},e))},n(19),e.setImmediate=setImmediate,e.clearImmediate=clearImmediate},function(t,e,n){(function(t,e){!function(t,n){"use strict";function o(t){"function"!=typeof t&&(t=new Function(""+t));for(var e=new Array(arguments.length-1),n=0;n<e.length;n++)e[n]=arguments[n+1];var o={callback:t,args:e};return l[c]=o,s(c),c++}function r(t){delete l[t]}function i(t){var e=t.callback,o=t.args;switch(o.length){case 0:e();break;case 1:e(o[0]);break;case 2:e(o[0],o[1]);break;case 3:e(o[0],o[1],o[2]);break;default:e.apply(n,o)}}function a(t){if(u)setTimeout(a,0,t);else{var e=l[t];if(e){u=!0;try{i(e)}finally{r(t),u=!1}}}}if(!t.setImmediate){var s,c=1,l={},u=!1,f=t.document,d=Object.getPrototypeOf&&Object.getPrototypeOf(t);d=d&&d.setTimeout?d:t,"[object process]"==={}.toString.call(t.process)?function(){s=function(t){e.nextTick(function(){a(t)})}}():function(){if(t.postMessage&&!t.importScripts){var e=!0,n=t.onmessage;return t.onmessage=function(){e=!1},t.postMessage("","*"),t.onmessage=n,e}}()?function(){var e="setImmediate$"+Math.random()+"$",n=function(n){n.source===t&&"string"==typeof n.data&&0===n.data.indexOf(e)&&a(+n.data.slice(e.length))};t.addEventListener?t.addEventListener("message",n,!1):t.attachEvent("onmessage",n),s=function(n){t.postMessage(e+n,"*")}}():t.MessageChannel?function(){var t=new MessageChannel;t.port1.onmessage=function(t){a(t.data)},s=function(e){t.port2.postMessage(e)}}():f&&"onreadystatechange"in f.createElement("script")?function(){var t=f.documentElement;s=function(e){var n=f.createElement("script");n.onreadystatechange=function(){a(e),n.onreadystatechange=null,t.removeChild(n),n=null},t.appendChild(n)}}():function(){s=function(t){setTimeout(a,0,t)}}(),d.setImmediate=o,d.clearImmediate=r}}("undefined"==typeof self?void 0===t?this:t:self)}).call(e,n(7),n(20))},function(t,e){function n(){throw new Error("setTimeout has not been defined")}function o(){throw new Error("clearTimeout has not been defined")}function r(t){if(u===setTimeout)return setTimeout(t,0);if((u===n||!u)&&setTimeout)return u=setTimeout,setTimeout(t,0);try{return u(t,0)}catch(e){try{return u.call(null,t,0)}catch(e){return u.call(this,t,0)}}}function i(t){if(f===clearTimeout)return clearTimeout(t);if((f===o||!f)&&clearTimeout)return f=clearTimeout,clearTimeout(t);try{return f(t)}catch(e){try{return f.call(null,t)}catch(e){return f.call(this,t)}}}function a(){b&&p&&(b=!1,p.length?m=p.concat(m):v=-1,m.length&&s())}function s(){if(!b){var t=r(a);b=!0;for(var e=m.length;e;){for(p=m,m=[];++v<e;)p&&p[v].run();v=-1,e=m.length}p=null,b=!1,i(t)}}function c(t,e){this.fun=t,this.array=e}function l(){}var u,f,d=t.exports={};!function(){try{u="function"==typeof setTimeout?setTimeout:n}catch(t){u=n}try{f="function"==typeof clearTimeout?clearTimeout:o}catch(t){f=o}}();var p,m=[],b=!1,v=-1;d.nextTick=function(t){var e=new Array(arguments.length-1);if(arguments.length>1)for(var n=1;n<arguments.length;n++)e[n-1]=arguments[n];m.push(new c(t,e)),1!==m.length||b||r(s)},c.prototype.run=function(){this.fun.apply(null,this.array)},d.title="browser",d.browser=!0,d.env={},d.argv=[],d.version="",d.versions={},d.on=l,d.addListener=l,d.once=l,d.off=l,d.removeListener=l,d.removeAllListeners=l,d.emit=l,d.prependListener=l,d.prependOnceListener=l,d.listeners=function(t){return[]},d.binding=function(t){throw new Error("process.binding is not supported")},d.cwd=function(){return"/"},d.chdir=function(t){throw new Error("process.chdir is not supported")},d.umask=function(){return 0}},function(t,e,n){"use strict";n(22).polyfill()},function(t,e,n){"use strict";function o(t,e){if(void 0===t||null===t)throw new TypeError("Cannot convert first argument to object");for(var n=Object(t),o=1;o<arguments.length;o++){var r=arguments[o];if(void 0!==r&&null!==r)for(var i=Object.keys(Object(r)),a=0,s=i.length;a<s;a++){var c=i[a],l=Object.getOwnPropertyDescriptor(r,c);void 0!==l&&l.enumerable&&(n[c]=r[c])}}return n}function r(){Object.assign||Object.defineProperty(Object,"assign",{enumerable:!1,configurable:!0,writable:!0,value:o})}t.exports={assign:o,polyfill:r}},function(t,e,n){"use strict";Object.defineProperty(e,"__esModule",{value:!0});var o=n(24),r=n(6),i=n(5),a=n(36),s=function(){for(var t=[],e=0;e<arguments.length;e++)t[e]=arguments[e];if("undefined"!=typeof window){var n=a.getOpts.apply(void 0,t);return new Promise(function(t,e){i.default.promise={resolve:t,reject:e},o.default(n),setTimeout(function(){r.openModal()})})}};s.close=r.onAction,s.getState=r.getState,s.setActionValue=i.setActionValue,s.stopLoading=r.stopLoading,s.setDefaults=a.setDefaults,e.default=s},function(t,e,n){"use strict";Object.defineProperty(e,"__esModule",{value:!0});var o=n(1),r=n(0),i=r.default.MODAL,a=n(4),s=n(34),c=n(35),l=n(1);e.init=function(t){o.getNode(i)||(document.body||l.throwErr("You can only use SweetAlert AFTER the DOM has loaded!"),s.default(),a.default()),a.initModalContent(t),c.default(t)},e.default=e.init},function(t,e,n){"use strict";Object.defineProperty(e,"__esModule",{value:!0});var o=n(0),r=o.default.MODAL;e.modalMarkup='\n  <div class="'+r+'" role="dialog" aria-modal="true"></div>',e.default=e.modalMarkup},function(t,e,n){"use strict";Object.defineProperty(e,"__esModule",{value:!0});var o=n(0),r=o.default.OVERLAY,i='<div \n    class="'+r+'"\n    tabIndex="-1">\n  </div>';e.default=i},function(t,e,n){"use strict";Object.defineProperty(e,"__esModule",{value:!0});var o=n(0),r=o.default.ICON;e.errorIconMarkup=function(){var t=r+"--error",e=t+"__line";return'\n    <div class="'+t+'__x-mark">\n      <span class="'+e+" "+e+'--left"></span>\n      <span class="'+e+" "+e+'--right"></span>\n    </div>\n  '},e.warningIconMarkup=function(){var t=r+"--warning";return'\n    <span class="'+t+'__body">\n      <span class="'+t+'__dot"></span>\n    </span>\n  '},e.successIconMarkup=function(){var t=r+"--success";return'\n    <span class="'+t+"__line "+t+'__line--long"></span>\n    <span class="'+t+"__line "+t+'__line--tip"></span>\n\n    <div class="'+t+'__ring"></div>\n    <div class="'+t+'__hide-corners"></div>\n  '}},function(t,e,n){"use strict";Object.defineProperty(e,"__esModule",{value:!0});var o=n(0),r=o.default.CONTENT;e.contentMarkup='\n  <div class="'+r+'">\n\n  </div>\n'},function(t,e,n){"use strict";Object.defineProperty(e,"__esModule",{value:!0});var o=n(0),r=o.default.BUTTON_CONTAINER,i=o.default.BUTTON,a=o.default.BUTTON_LOADER;e.buttonMarkup='\n  <div class="'+r+'">\n\n    <button\n      class="'+i+'"\n    ></button>\n\n    <div class="'+a+'">\n      <div></div>\n      <div></div>\n      <div></div>\n    </div>\n\n  </div>\n'},function(t,e,n){"use strict";Object.defineProperty(e,"__esModule",{value:!0});var o=n(4),r=n(2),i=n(0),a=i.default.ICON,s=i.default.ICON_CUSTOM,c=["error","warning","success","info"],l={error:r.errorIconMarkup(),warning:r.warningIconMarkup(),success:r.successIconMarkup()},u=function(t,e){var n=a+"--"+t;e.classList.add(n);var o=l[t];o&&(e.innerHTML=o)},f=function(t,e){e.classList.add(s);var n=document.createElement("img");n.src=t,e.appendChild(n)},d=function(t){if(t){var e=o.injectElIntoModal(r.iconMarkup);c.includes(t)?u(t,e):f(t,e)}};e.default=d},function(t,e,n){"use strict";Object.defineProperty(e,"__esModule",{value:!0});var o=n(2),r=n(4),i=function(t){navigator.userAgent.includes("AppleWebKit")&&(t.style.display="none",t.offsetHeight,t.style.display="")};e.initTitle=function(t){if(t){var e=r.injectElIntoModal(o.titleMarkup);e.textContent=t,i(e)}},e.initText=function(t){if(t){var e=document.createDocumentFragment();t.split("\n").forEach(function(t,n,o){e.appendChild(document.createTextNode(t)),n<o.length-1&&e.appendChild(document.createElement("br"))});var n=r.injectElIntoModal(o.textMarkup);n.appendChild(e),i(n)}}},function(t,e,n){"use strict";Object.defineProperty(e,"__esModule",{value:!0});var o=n(1),r=n(4),i=n(0),a=i.default.BUTTON,s=i.default.DANGER_BUTTON,c=n(3),l=n(2),u=n(6),f=n(5),d=function(t,e,n){var r=e.text,i=e.value,d=e.className,p=e.closeModal,m=o.stringToNode(l.buttonMarkup),b=m.querySelector("."+a),v=a+"--"+t;if(b.classList.add(v),d){(Array.isArray(d)?d:d.split(" ")).filter(function(t){return t.length>0}).forEach(function(t){b.classList.add(t)})}n&&t===c.CONFIRM_KEY&&b.classList.add(s),b.textContent=r;var g={};return g[t]=i,f.setActionValue(g),f.setActionOptionsFor(t,{closeModal:p}),b.addEventListener("click",function(){return u.onAction(t)}),m},p=function(t,e){var n=r.injectElIntoModal(l.footerMarkup);for(var o in t){var i=t[o],a=d(o,i,e);i.visible&&n.appendChild(a)}0===n.children.length&&n.remove()};e.default=p},function(t,e,n){"use strict";Object.defineProperty(e,"__esModule",{value:!0});var o=n(3),r=n(4),i=n(2),a=n(5),s=n(6),c=n(0),l=c.default.CONTENT,u=function(t){t.addEventListener("input",function(t){var e=t.target,n=e.value;a.setActionValue(n)}),t.addEventListener("keyup",function(t){if("Enter"===t.key)return s.onAction(o.CONFIRM_KEY)}),setTimeout(function(){t.focus(),a.setActionValue("")},0)},f=function(t,e,n){var o=document.createElement(e),r=l+"__"+e;o.classList.add(r);for(var i in n){var a=n[i];o[i]=a}"input"===e&&u(o),t.appendChild(o)},d=function(t){if(t){var e=r.injectElIntoModal(i.contentMarkup),n=t.element,o=t.attributes;"string"==typeof n?f(e,n,o):e.appendChild(n)}};e.default=d},function(t,e,n){"use strict";Object.defineProperty(e,"__esModule",{value:!0});var o=n(1),r=n(2),i=function(){var t=o.stringToNode(r.overlayMarkup);document.body.appendChild(t)};e.default=i},function(t,e,n){"use strict";Object.defineProperty(e,"__esModule",{value:!0});var o=n(5),r=n(6),i=n(1),a=n(3),s=n(0),c=s.default.MODAL,l=s.default.BUTTON,u=s.default.OVERLAY,f=function(t){t.preventDefault(),v()},d=function(t){t.preventDefault(),g()},p=function(t){if(o.default.isOpen)switch(t.key){case"Escape":return r.onAction(a.CANCEL_KEY)}},m=function(t){if(o.default.isOpen)switch(t.key){case"Tab":return f(t)}},b=function(t){if(o.default.isOpen)return"Tab"===t.key&&t.shiftKey?d(t):void 0},v=function(){var t=i.getNode(l);t&&(t.tabIndex=0,t.focus())},g=function(){var t=i.getNode(c),e=t.querySelectorAll("."+l),n=e.length-1,o=e[n];o&&o.focus()},h=function(t){t[t.length-1].addEventListener("keydown",m)},w=function(t){t[0].addEventListener("keydown",b)},y=function(){var t=i.getNode(c),e=t.querySelectorAll("."+l);e.length&&(h(e),w(e))},x=function(t){if(i.getNode(u)===t.target)return r.onAction(a.CANCEL_KEY)},_=function(t){var e=i.getNode(u);e.removeEventListener("click",x),t&&e.addEventListener("click",x)},k=function(t){o.default.timer&&clearTimeout(o.default.timer),t&&(o.default.timer=window.setTimeout(function(){return r.onAction(a.CANCEL_KEY)},t))},O=function(t){t.closeOnEsc?document.addEventListener("keyup",p):document.removeEventListener("keyup",p),t.dangerMode?v():g(),y(),_(t.closeOnClickOutside),k(t.timer)};e.default=O},function(t,e,n){"use strict";Object.defineProperty(e,"__esModule",{value:!0});var o=n(1),r=n(3),i=n(37),a=n(38),s={title:null,text:null,icon:null,buttons:r.defaultButtonList,content:null,className:null,closeOnClickOutside:!0,closeOnEsc:!0,dangerMode:!1,timer:null},c=Object.assign({},s);e.setDefaults=function(t){c=Object.assign({},s,t)};var l=function(t){var e=t&&t.button,n=t&&t.buttons;return void 0!==e&&void 0!==n&&o.throwErr("Cannot set both 'button' and 'buttons' options!"),void 0!==e?{confirm:e}:n},u=function(t){return o.ordinalSuffixOf(t+1)},f=function(t,e){o.throwErr(u(e)+" argument ('"+t+"') is invalid")},d=function(t,e){var n=t+1,r=e[n];o.isPlainObject(r)||void 0===r||o.throwErr("Expected "+u(n)+" argument ('"+r+"') to be a plain object")},p=function(t,e){var n=t+1,r=e[n];void 0!==r&&o.throwErr("Unexpected "+u(n)+" argument ("+r+")")},m=function(t,e,n,r){var i=typeof e,a="string"===i,s=e instanceof Element;if(a){if(0===n)return{text:e};if(1===n)return{text:e,title:r[0]};if(2===n)return d(n,r),{icon:e};f(e,n)}else{if(s&&0===n)return d(n,r),{content:e};if(o.isPlainObject(e))return p(n,r),e;f(e,n)}};e.getOpts=function(){for(var t=[],e=0;e<arguments.length;e++)t[e]=arguments[e];var n={};t.forEach(function(e,o){var r=m(0,e,o,t);Object.assign(n,r)});var o=l(n);n.buttons=r.getButtonListOpts(o),delete n.button,n.content=i.getContentOpts(n.content);var u=Object.assign({},s,c,n);return Object.keys(u).forEach(function(t){a.DEPRECATED_OPTS[t]&&a.logDeprecation(t)}),u}},function(t,e,n){"use strict";Object.defineProperty(e,"__esModule",{value:!0});var o=n(1),r={element:"input",attributes:{placeholder:""}};e.getContentOpts=function(t){var e={};return o.isPlainObject(t)?Object.assign(e,t):t instanceof Element?{element:t}:"input"===t?r:null}},function(t,e,n){"use strict";Object.defineProperty(e,"__esModule",{value:!0}),e.logDeprecation=function(t){var n=e.DEPRECATED_OPTS[t],o=n.onlyRename,r=n.replacement,i=n.subOption,a=n.link,s=o?"renamed":"deprecated",c='SweetAlert warning: "'+t+'" option has been '+s+".";if(r){c+=" Please use"+(i?' "'+i+'" in ':" ")+'"'+r+'" instead.'}var l="https://sweetalert.js.org";c+=a?" More details: "+l+a:" More details: "+l+"/guides/#upgrading-from-1x",console.warn(c)},e.DEPRECATED_OPTS={type:{replacement:"icon",link:"/docs/#icon"},imageUrl:{replacement:"icon",link:"/docs/#icon"},customClass:{replacement:"className",onlyRename:!0,link:"/docs/#classname"},imageSize:{},showCancelButton:{replacement:"buttons",link:"/docs/#buttons"},showConfirmButton:{replacement:"button",link:"/docs/#button"},confirmButtonText:{replacement:"button",link:"/docs/#button"},confirmButtonColor:{},cancelButtonText:{replacement:"buttons",link:"/docs/#buttons"},closeOnConfirm:{replacement:"button",subOption:"closeModal",link:"/docs/#button"},closeOnCancel:{replacement:"buttons",subOption:"closeModal",link:"/docs/#buttons"},showLoaderOnConfirm:{replacement:"buttons"},animation:{},inputType:{replacement:"content",link:"/docs/#content"},inputValue:{replacement:"content",link:"/docs/#content"},inputPlaceholder:{replacement:"content",link:"/docs/#content"},html:{replacement:"content",link:"/docs/#content"},allowEscapeKey:{replacement:"closeOnEsc",onlyRename:!0,link:"/docs/#closeonesc"},allowClickOutside:{replacement:"closeOnClickOutside",onlyRename:!0,link:"/docs/#closeonclickoutside"}}}])});

/***/ }),

/***/ "./node_modules/xss/lib/default.js":
/*!*****************************************!*\
  !*** ./node_modules/xss/lib/default.js ***!
  \*****************************************/
/***/ ((__unused_webpack_module, exports, __webpack_require__) => {

/**
 * default settings
 *
 * @author Zongmin Lei<leizongmin@gmail.com>
 */

var FilterCSS = (__webpack_require__(/*! cssfilter */ "./node_modules/cssfilter/lib/index.js").FilterCSS);
var getDefaultCSSWhiteList = (__webpack_require__(/*! cssfilter */ "./node_modules/cssfilter/lib/index.js").getDefaultWhiteList);
var _ = __webpack_require__(/*! ./util */ "./node_modules/xss/lib/util.js");

function getDefaultWhiteList() {
  return {
    a: ["target", "href", "title"],
    abbr: ["title"],
    address: [],
    area: ["shape", "coords", "href", "alt"],
    article: [],
    aside: [],
    audio: [
      "autoplay",
      "controls",
      "crossorigin",
      "loop",
      "muted",
      "preload",
      "src",
    ],
    b: [],
    bdi: ["dir"],
    bdo: ["dir"],
    big: [],
    blockquote: ["cite"],
    br: [],
    caption: [],
    center: [],
    cite: [],
    code: [],
    col: ["align", "valign", "span", "width"],
    colgroup: ["align", "valign", "span", "width"],
    dd: [],
    del: ["datetime"],
    details: ["open"],
    div: [],
    dl: [],
    dt: [],
    em: [],
    figcaption: [],
    figure: [],
    font: ["color", "size", "face"],
    footer: [],
    h1: [],
    h2: [],
    h3: [],
    h4: [],
    h5: [],
    h6: [],
    header: [],
    hr: [],
    i: [],
    img: ["src", "alt", "title", "width", "height"],
    ins: ["datetime"],
    li: [],
    mark: [],
    nav: [],
    ol: [],
    p: [],
    pre: [],
    s: [],
    section: [],
    small: [],
    span: [],
    sub: [],
    summary: [],
    sup: [],
    strong: [],
    strike: [],
    table: ["width", "border", "align", "valign"],
    tbody: ["align", "valign"],
    td: ["width", "rowspan", "colspan", "align", "valign"],
    tfoot: ["align", "valign"],
    th: ["width", "rowspan", "colspan", "align", "valign"],
    thead: ["align", "valign"],
    tr: ["rowspan", "align", "valign"],
    tt: [],
    u: [],
    ul: [],
    video: [
      "autoplay",
      "controls",
      "crossorigin",
      "loop",
      "muted",
      "playsinline",
      "poster",
      "preload",
      "src",
      "height",
      "width",
    ],
  };
}

var defaultCSSFilter = new FilterCSS();

/**
 * default onTag function
 *
 * @param {String} tag
 * @param {String} html
 * @param {Object} options
 * @return {String}
 */
function onTag(tag, html, options) {
  // do nothing
}

/**
 * default onIgnoreTag function
 *
 * @param {String} tag
 * @param {String} html
 * @param {Object} options
 * @return {String}
 */
function onIgnoreTag(tag, html, options) {
  // do nothing
}

/**
 * default onTagAttr function
 *
 * @param {String} tag
 * @param {String} name
 * @param {String} value
 * @return {String}
 */
function onTagAttr(tag, name, value) {
  // do nothing
}

/**
 * default onIgnoreTagAttr function
 *
 * @param {String} tag
 * @param {String} name
 * @param {String} value
 * @return {String}
 */
function onIgnoreTagAttr(tag, name, value) {
  // do nothing
}

/**
 * default escapeHtml function
 *
 * @param {String} html
 */
function escapeHtml(html) {
  return html.replace(REGEXP_LT, "&lt;").replace(REGEXP_GT, "&gt;");
}

/**
 * default safeAttrValue function
 *
 * @param {String} tag
 * @param {String} name
 * @param {String} value
 * @param {Object} cssFilter
 * @return {String}
 */
function safeAttrValue(tag, name, value, cssFilter) {
  // unescape attribute value firstly
  value = friendlyAttrValue(value);

  if (name === "href" || name === "src") {
    // filter `href` and `src` attribute
    // only allow the value that starts with `http://` | `https://` | `mailto:` | `/` | `#`
    value = _.trim(value);
    if (value === "#") return "#";
    if (
      !(
        value.substr(0, 7) === "http://" ||
        value.substr(0, 8) === "https://" ||
        value.substr(0, 7) === "mailto:" ||
        value.substr(0, 4) === "tel:" ||
        value.substr(0, 11) === "data:image/" ||
        value.substr(0, 6) === "ftp://" ||
        value.substr(0, 2) === "./" ||
        value.substr(0, 3) === "../" ||
        value[0] === "#" ||
        value[0] === "/"
      )
    ) {
      return "";
    }
  } else if (name === "background") {
    // filter `background` attribute (maybe no use)
    // `javascript:`
    REGEXP_DEFAULT_ON_TAG_ATTR_4.lastIndex = 0;
    if (REGEXP_DEFAULT_ON_TAG_ATTR_4.test(value)) {
      return "";
    }
  } else if (name === "style") {
    // `expression()`
    REGEXP_DEFAULT_ON_TAG_ATTR_7.lastIndex = 0;
    if (REGEXP_DEFAULT_ON_TAG_ATTR_7.test(value)) {
      return "";
    }
    // `url()`
    REGEXP_DEFAULT_ON_TAG_ATTR_8.lastIndex = 0;
    if (REGEXP_DEFAULT_ON_TAG_ATTR_8.test(value)) {
      REGEXP_DEFAULT_ON_TAG_ATTR_4.lastIndex = 0;
      if (REGEXP_DEFAULT_ON_TAG_ATTR_4.test(value)) {
        return "";
      }
    }
    if (cssFilter !== false) {
      cssFilter = cssFilter || defaultCSSFilter;
      value = cssFilter.process(value);
    }
  }

  // escape `<>"` before returns
  value = escapeAttrValue(value);
  return value;
}

// RegExp list
var REGEXP_LT = /</g;
var REGEXP_GT = />/g;
var REGEXP_QUOTE = /"/g;
var REGEXP_QUOTE_2 = /&quot;/g;
var REGEXP_ATTR_VALUE_1 = /&#([a-zA-Z0-9]*);?/gim;
var REGEXP_ATTR_VALUE_COLON = /&colon;?/gim;
var REGEXP_ATTR_VALUE_NEWLINE = /&newline;?/gim;
// var REGEXP_DEFAULT_ON_TAG_ATTR_3 = /\/\*|\*\//gm;
var REGEXP_DEFAULT_ON_TAG_ATTR_4 =
  /((j\s*a\s*v\s*a|v\s*b|l\s*i\s*v\s*e)\s*s\s*c\s*r\s*i\s*p\s*t\s*|m\s*o\s*c\s*h\s*a):/gi;
// var REGEXP_DEFAULT_ON_TAG_ATTR_5 = /^[\s"'`]*(d\s*a\s*t\s*a\s*)\:/gi;
// var REGEXP_DEFAULT_ON_TAG_ATTR_6 = /^[\s"'`]*(d\s*a\s*t\s*a\s*)\:\s*image\//gi;
var REGEXP_DEFAULT_ON_TAG_ATTR_7 =
  /e\s*x\s*p\s*r\s*e\s*s\s*s\s*i\s*o\s*n\s*\(.*/gi;
var REGEXP_DEFAULT_ON_TAG_ATTR_8 = /u\s*r\s*l\s*\(.*/gi;

/**
 * escape double quote
 *
 * @param {String} str
 * @return {String} str
 */
function escapeQuote(str) {
  return str.replace(REGEXP_QUOTE, "&quot;");
}

/**
 * unescape double quote
 *
 * @param {String} str
 * @return {String} str
 */
function unescapeQuote(str) {
  return str.replace(REGEXP_QUOTE_2, '"');
}

/**
 * escape html entities
 *
 * @param {String} str
 * @return {String}
 */
function escapeHtmlEntities(str) {
  return str.replace(REGEXP_ATTR_VALUE_1, function replaceUnicode(str, code) {
    return code[0] === "x" || code[0] === "X"
      ? String.fromCharCode(parseInt(code.substr(1), 16))
      : String.fromCharCode(parseInt(code, 10));
  });
}

/**
 * escape html5 new danger entities
 *
 * @param {String} str
 * @return {String}
 */
function escapeDangerHtml5Entities(str) {
  return str
    .replace(REGEXP_ATTR_VALUE_COLON, ":")
    .replace(REGEXP_ATTR_VALUE_NEWLINE, " ");
}

/**
 * clear nonprintable characters
 *
 * @param {String} str
 * @return {String}
 */
function clearNonPrintableCharacter(str) {
  var str2 = "";
  for (var i = 0, len = str.length; i < len; i++) {
    str2 += str.charCodeAt(i) < 32 ? " " : str.charAt(i);
  }
  return _.trim(str2);
}

/**
 * get friendly attribute value
 *
 * @param {String} str
 * @return {String}
 */
function friendlyAttrValue(str) {
  str = unescapeQuote(str);
  str = escapeHtmlEntities(str);
  str = escapeDangerHtml5Entities(str);
  str = clearNonPrintableCharacter(str);
  return str;
}

/**
 * unescape attribute value
 *
 * @param {String} str
 * @return {String}
 */
function escapeAttrValue(str) {
  str = escapeQuote(str);
  str = escapeHtml(str);
  return str;
}

/**
 * `onIgnoreTag` function for removing all the tags that are not in whitelist
 */
function onIgnoreTagStripAll() {
  return "";
}

/**
 * remove tag body
 * specify a `tags` list, if the tag is not in the `tags` list then process by the specify function (optional)
 *
 * @param {array} tags
 * @param {function} next
 */
function StripTagBody(tags, next) {
  if (typeof next !== "function") {
    next = function () {};
  }

  var isRemoveAllTag = !Array.isArray(tags);
  function isRemoveTag(tag) {
    if (isRemoveAllTag) return true;
    return _.indexOf(tags, tag) !== -1;
  }

  var removeList = [];
  var posStart = false;

  return {
    onIgnoreTag: function (tag, html, options) {
      if (isRemoveTag(tag)) {
        if (options.isClosing) {
          var ret = "[/removed]";
          var end = options.position + ret.length;
          removeList.push([
            posStart !== false ? posStart : options.position,
            end,
          ]);
          posStart = false;
          return ret;
        } else {
          if (!posStart) {
            posStart = options.position;
          }
          return "[removed]";
        }
      } else {
        return next(tag, html, options);
      }
    },
    remove: function (html) {
      var rethtml = "";
      var lastPos = 0;
      _.forEach(removeList, function (pos) {
        rethtml += html.slice(lastPos, pos[0]);
        lastPos = pos[1];
      });
      rethtml += html.slice(lastPos);
      return rethtml;
    },
  };
}

/**
 * remove html comments
 *
 * @param {String} html
 * @return {String}
 */
function stripCommentTag(html) {
  var retHtml = "";
  var lastPos = 0;
  while (lastPos < html.length) {
    var i = html.indexOf("<!--", lastPos);
    if (i === -1) {
      retHtml += html.slice(lastPos);
      break;
    }
    retHtml += html.slice(lastPos, i);
    var j = html.indexOf("-->", i);
    if (j === -1) {
      break;
    }
    lastPos = j + 3;
  }
  return retHtml;
}

/**
 * remove invisible characters
 *
 * @param {String} html
 * @return {String}
 */
function stripBlankChar(html) {
  var chars = html.split("");
  chars = chars.filter(function (char) {
    var c = char.charCodeAt(0);
    if (c === 127) return false;
    if (c <= 31) {
      if (c === 10 || c === 13) return true;
      return false;
    }
    return true;
  });
  return chars.join("");
}

exports.whiteList = getDefaultWhiteList();
exports.getDefaultWhiteList = getDefaultWhiteList;
exports.onTag = onTag;
exports.onIgnoreTag = onIgnoreTag;
exports.onTagAttr = onTagAttr;
exports.onIgnoreTagAttr = onIgnoreTagAttr;
exports.safeAttrValue = safeAttrValue;
exports.escapeHtml = escapeHtml;
exports.escapeQuote = escapeQuote;
exports.unescapeQuote = unescapeQuote;
exports.escapeHtmlEntities = escapeHtmlEntities;
exports.escapeDangerHtml5Entities = escapeDangerHtml5Entities;
exports.clearNonPrintableCharacter = clearNonPrintableCharacter;
exports.friendlyAttrValue = friendlyAttrValue;
exports.escapeAttrValue = escapeAttrValue;
exports.onIgnoreTagStripAll = onIgnoreTagStripAll;
exports.StripTagBody = StripTagBody;
exports.stripCommentTag = stripCommentTag;
exports.stripBlankChar = stripBlankChar;
exports.cssFilter = defaultCSSFilter;
exports.getDefaultCSSWhiteList = getDefaultCSSWhiteList;


/***/ }),

/***/ "./node_modules/xss/lib/index.js":
/*!***************************************!*\
  !*** ./node_modules/xss/lib/index.js ***!
  \***************************************/
/***/ ((module, exports, __webpack_require__) => {

/**
 * xss
 *
 * @author Zongmin Lei<leizongmin@gmail.com>
 */

var DEFAULT = __webpack_require__(/*! ./default */ "./node_modules/xss/lib/default.js");
var parser = __webpack_require__(/*! ./parser */ "./node_modules/xss/lib/parser.js");
var FilterXSS = __webpack_require__(/*! ./xss */ "./node_modules/xss/lib/xss.js");

/**
 * filter xss function
 *
 * @param {String} html
 * @param {Object} options { whiteList, onTag, onTagAttr, onIgnoreTag, onIgnoreTagAttr, safeAttrValue, escapeHtml }
 * @return {String}
 */
function filterXSS(html, options) {
  var xss = new FilterXSS(options);
  return xss.process(html);
}

exports = module.exports = filterXSS;
exports.filterXSS = filterXSS;
exports.FilterXSS = FilterXSS;

(function () {
  for (var i in DEFAULT) {
    exports[i] = DEFAULT[i];
  }
  for (var j in parser) {
    exports[j] = parser[j];
  }
})();

// using `xss` on the browser, output `filterXSS` to the globals
if (typeof window !== "undefined") {
  window.filterXSS = module.exports;
}

// using `xss` on the WebWorker, output `filterXSS` to the globals
function isWorkerEnv() {
  return (
    typeof self !== "undefined" &&
    typeof DedicatedWorkerGlobalScope !== "undefined" &&
    self instanceof DedicatedWorkerGlobalScope
  );
}
if (isWorkerEnv()) {
  self.filterXSS = module.exports;
}


/***/ }),

/***/ "./node_modules/xss/lib/parser.js":
/*!****************************************!*\
  !*** ./node_modules/xss/lib/parser.js ***!
  \****************************************/
/***/ ((__unused_webpack_module, exports, __webpack_require__) => {

/**
 * Simple HTML Parser
 *
 * @author Zongmin Lei<leizongmin@gmail.com>
 */

var _ = __webpack_require__(/*! ./util */ "./node_modules/xss/lib/util.js");

/**
 * get tag name
 *
 * @param {String} html e.g. '<a hef="#">'
 * @return {String}
 */
function getTagName(html) {
  var i = _.spaceIndex(html);
  var tagName;
  if (i === -1) {
    tagName = html.slice(1, -1);
  } else {
    tagName = html.slice(1, i + 1);
  }
  tagName = _.trim(tagName).toLowerCase();
  if (tagName.slice(0, 1) === "/") tagName = tagName.slice(1);
  if (tagName.slice(-1) === "/") tagName = tagName.slice(0, -1);
  return tagName;
}

/**
 * is close tag?
 *
 * @param {String} html 如：'<a hef="#">'
 * @return {Boolean}
 */
function isClosing(html) {
  return html.slice(0, 2) === "</";
}

/**
 * parse input html and returns processed html
 *
 * @param {String} html
 * @param {Function} onTag e.g. function (sourcePosition, position, tag, html, isClosing)
 * @param {Function} escapeHtml
 * @return {String}
 */
function parseTag(html, onTag, escapeHtml) {
  "use strict";

  var rethtml = "";
  var lastPos = 0;
  var tagStart = false;
  var quoteStart = false;
  var currentPos = 0;
  var len = html.length;
  var currentTagName = "";
  var currentHtml = "";

  chariterator: for (currentPos = 0; currentPos < len; currentPos++) {
    var c = html.charAt(currentPos);
    if (tagStart === false) {
      if (c === "<") {
        tagStart = currentPos;
        continue;
      }
    } else {
      if (quoteStart === false) {
        if (c === "<") {
          rethtml += escapeHtml(html.slice(lastPos, currentPos));
          tagStart = currentPos;
          lastPos = currentPos;
          continue;
        }
        if (c === ">" || currentPos === len - 1) {
          rethtml += escapeHtml(html.slice(lastPos, tagStart));
          currentHtml = html.slice(tagStart, currentPos + 1);
          currentTagName = getTagName(currentHtml);
          rethtml += onTag(
            tagStart,
            rethtml.length,
            currentTagName,
            currentHtml,
            isClosing(currentHtml)
          );
          lastPos = currentPos + 1;
          tagStart = false;
          continue;
        }
        if (c === '"' || c === "'") {
          var i = 1;
          var ic = html.charAt(currentPos - i);

          while (ic.trim() === "" || ic === "=") {
            if (ic === "=") {
              quoteStart = c;
              continue chariterator;
            }
            ic = html.charAt(currentPos - ++i);
          }
        }
      } else {
        if (c === quoteStart) {
          quoteStart = false;
          continue;
        }
      }
    }
  }
  if (lastPos < len) {
    rethtml += escapeHtml(html.substr(lastPos));
  }

  return rethtml;
}

var REGEXP_ILLEGAL_ATTR_NAME = /[^a-zA-Z0-9\\_:.-]/gim;

/**
 * parse input attributes and returns processed attributes
 *
 * @param {String} html e.g. `href="#" target="_blank"`
 * @param {Function} onAttr e.g. `function (name, value)`
 * @return {String}
 */
function parseAttr(html, onAttr) {
  "use strict";

  var lastPos = 0;
  var lastMarkPos = 0;
  var retAttrs = [];
  var tmpName = false;
  var len = html.length;

  function addAttr(name, value) {
    name = _.trim(name);
    name = name.replace(REGEXP_ILLEGAL_ATTR_NAME, "").toLowerCase();
    if (name.length < 1) return;
    var ret = onAttr(name, value || "");
    if (ret) retAttrs.push(ret);
  }

  // 逐个分析字符
  for (var i = 0; i < len; i++) {
    var c = html.charAt(i);
    var v, j;
    if (tmpName === false && c === "=") {
      tmpName = html.slice(lastPos, i);
      lastPos = i + 1;
      lastMarkPos = html.charAt(lastPos) === '"' || html.charAt(lastPos) === "'" ? lastPos : findNextQuotationMark(html, i + 1);
      continue;
    }
    if (tmpName !== false) {
      if (
        i === lastMarkPos
      ) {
        j = html.indexOf(c, i + 1);
        if (j === -1) {
          break;
        } else {
          v = _.trim(html.slice(lastMarkPos + 1, j));
          addAttr(tmpName, v);
          tmpName = false;
          i = j;
          lastPos = i + 1;
          continue;
        }
      }
    }
    if (/\s|\n|\t/.test(c)) {
      html = html.replace(/\s|\n|\t/g, " ");
      if (tmpName === false) {
        j = findNextEqual(html, i);
        if (j === -1) {
          v = _.trim(html.slice(lastPos, i));
          addAttr(v);
          tmpName = false;
          lastPos = i + 1;
          continue;
        } else {
          i = j - 1;
          continue;
        }
      } else {
        j = findBeforeEqual(html, i - 1);
        if (j === -1) {
          v = _.trim(html.slice(lastPos, i));
          v = stripQuoteWrap(v);
          addAttr(tmpName, v);
          tmpName = false;
          lastPos = i + 1;
          continue;
        } else {
          continue;
        }
      }
    }
  }

  if (lastPos < html.length) {
    if (tmpName === false) {
      addAttr(html.slice(lastPos));
    } else {
      addAttr(tmpName, stripQuoteWrap(_.trim(html.slice(lastPos))));
    }
  }

  return _.trim(retAttrs.join(" "));
}

function findNextEqual(str, i) {
  for (; i < str.length; i++) {
    var c = str[i];
    if (c === " ") continue;
    if (c === "=") return i;
    return -1;
  }
}

function findNextQuotationMark(str, i) {
  for (; i < str.length; i++) {
    var c = str[i];
    if (c === " ") continue;
    if (c === "'" || c === '"') return i;
    return -1;
  }
}

function findBeforeEqual(str, i) {
  for (; i > 0; i--) {
    var c = str[i];
    if (c === " ") continue;
    if (c === "=") return i;
    return -1;
  }
}

function isQuoteWrapString(text) {
  if (
    (text[0] === '"' && text[text.length - 1] === '"') ||
    (text[0] === "'" && text[text.length - 1] === "'")
  ) {
    return true;
  } else {
    return false;
  }
}

function stripQuoteWrap(text) {
  if (isQuoteWrapString(text)) {
    return text.substr(1, text.length - 2);
  } else {
    return text;
  }
}

exports.parseTag = parseTag;
exports.parseAttr = parseAttr;


/***/ }),

/***/ "./node_modules/xss/lib/util.js":
/*!**************************************!*\
  !*** ./node_modules/xss/lib/util.js ***!
  \**************************************/
/***/ ((module) => {

module.exports = {
  indexOf: function (arr, item) {
    var i, j;
    if (Array.prototype.indexOf) {
      return arr.indexOf(item);
    }
    for (i = 0, j = arr.length; i < j; i++) {
      if (arr[i] === item) {
        return i;
      }
    }
    return -1;
  },
  forEach: function (arr, fn, scope) {
    var i, j;
    if (Array.prototype.forEach) {
      return arr.forEach(fn, scope);
    }
    for (i = 0, j = arr.length; i < j; i++) {
      fn.call(scope, arr[i], i, arr);
    }
  },
  trim: function (str) {
    if (String.prototype.trim) {
      return str.trim();
    }
    return str.replace(/(^\s*)|(\s*$)/g, "");
  },
  spaceIndex: function (str) {
    var reg = /\s|\n|\t/;
    var match = reg.exec(str);
    return match ? match.index : -1;
  },
};


/***/ }),

/***/ "./node_modules/xss/lib/xss.js":
/*!*************************************!*\
  !*** ./node_modules/xss/lib/xss.js ***!
  \*************************************/
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {

/**
 * filter xss
 *
 * @author Zongmin Lei<leizongmin@gmail.com>
 */

var FilterCSS = (__webpack_require__(/*! cssfilter */ "./node_modules/cssfilter/lib/index.js").FilterCSS);
var DEFAULT = __webpack_require__(/*! ./default */ "./node_modules/xss/lib/default.js");
var parser = __webpack_require__(/*! ./parser */ "./node_modules/xss/lib/parser.js");
var parseTag = parser.parseTag;
var parseAttr = parser.parseAttr;
var _ = __webpack_require__(/*! ./util */ "./node_modules/xss/lib/util.js");

/**
 * returns `true` if the input value is `undefined` or `null`
 *
 * @param {Object} obj
 * @return {Boolean}
 */
function isNull(obj) {
  return obj === undefined || obj === null;
}

/**
 * get attributes for a tag
 *
 * @param {String} html
 * @return {Object}
 *   - {String} html
 *   - {Boolean} closing
 */
function getAttrs(html) {
  var i = _.spaceIndex(html);
  if (i === -1) {
    return {
      html: "",
      closing: html[html.length - 2] === "/",
    };
  }
  html = _.trim(html.slice(i + 1, -1));
  var isClosing = html[html.length - 1] === "/";
  if (isClosing) html = _.trim(html.slice(0, -1));
  return {
    html: html,
    closing: isClosing,
  };
}

/**
 * shallow copy
 *
 * @param {Object} obj
 * @return {Object}
 */
function shallowCopyObject(obj) {
  var ret = {};
  for (var i in obj) {
    ret[i] = obj[i];
  }
  return ret;
}

function keysToLowerCase(obj) {
  var ret = {};
  for (var i in obj) {
    if (Array.isArray(obj[i])) {
      ret[i.toLowerCase()] = obj[i].map(function (item) {
        return item.toLowerCase();
      });
    } else {
      ret[i.toLowerCase()] = obj[i];
    }
  }
  return ret;
}

/**
 * FilterXSS class
 *
 * @param {Object} options
 *        whiteList (or allowList), onTag, onTagAttr, onIgnoreTag,
 *        onIgnoreTagAttr, safeAttrValue, escapeHtml
 *        stripIgnoreTagBody, allowCommentTag, stripBlankChar
 *        css{whiteList, onAttr, onIgnoreAttr} `css=false` means don't use `cssfilter`
 */
function FilterXSS(options) {
  options = shallowCopyObject(options || {});

  if (options.stripIgnoreTag) {
    if (options.onIgnoreTag) {
      console.error(
        'Notes: cannot use these two options "stripIgnoreTag" and "onIgnoreTag" at the same time'
      );
    }
    options.onIgnoreTag = DEFAULT.onIgnoreTagStripAll;
  }
  if (options.whiteList || options.allowList) {
    options.whiteList = keysToLowerCase(options.whiteList || options.allowList);
  } else {
    options.whiteList = DEFAULT.whiteList;
  }

  options.onTag = options.onTag || DEFAULT.onTag;
  options.onTagAttr = options.onTagAttr || DEFAULT.onTagAttr;
  options.onIgnoreTag = options.onIgnoreTag || DEFAULT.onIgnoreTag;
  options.onIgnoreTagAttr = options.onIgnoreTagAttr || DEFAULT.onIgnoreTagAttr;
  options.safeAttrValue = options.safeAttrValue || DEFAULT.safeAttrValue;
  options.escapeHtml = options.escapeHtml || DEFAULT.escapeHtml;
  this.options = options;

  if (options.css === false) {
    this.cssFilter = false;
  } else {
    options.css = options.css || {};
    this.cssFilter = new FilterCSS(options.css);
  }
}

/**
 * start process and returns result
 *
 * @param {String} html
 * @return {String}
 */
FilterXSS.prototype.process = function (html) {
  // compatible with the input
  html = html || "";
  html = html.toString();
  if (!html) return "";

  var me = this;
  var options = me.options;
  var whiteList = options.whiteList;
  var onTag = options.onTag;
  var onIgnoreTag = options.onIgnoreTag;
  var onTagAttr = options.onTagAttr;
  var onIgnoreTagAttr = options.onIgnoreTagAttr;
  var safeAttrValue = options.safeAttrValue;
  var escapeHtml = options.escapeHtml;
  var cssFilter = me.cssFilter;

  // remove invisible characters
  if (options.stripBlankChar) {
    html = DEFAULT.stripBlankChar(html);
  }

  // remove html comments
  if (!options.allowCommentTag) {
    html = DEFAULT.stripCommentTag(html);
  }

  // if enable stripIgnoreTagBody
  var stripIgnoreTagBody = false;
  if (options.stripIgnoreTagBody) {
    stripIgnoreTagBody = DEFAULT.StripTagBody(
      options.stripIgnoreTagBody,
      onIgnoreTag
    );
    onIgnoreTag = stripIgnoreTagBody.onIgnoreTag;
  }

  var retHtml = parseTag(
    html,
    function (sourcePosition, position, tag, html, isClosing) {
      var info = {
        sourcePosition: sourcePosition,
        position: position,
        isClosing: isClosing,
        isWhite: Object.prototype.hasOwnProperty.call(whiteList, tag),
      };

      // call `onTag()`
      var ret = onTag(tag, html, info);
      if (!isNull(ret)) return ret;

      if (info.isWhite) {
        if (info.isClosing) {
          return "</" + tag + ">";
        }

        var attrs = getAttrs(html);
        var whiteAttrList = whiteList[tag];
        var attrsHtml = parseAttr(attrs.html, function (name, value) {
          // call `onTagAttr()`
          var isWhiteAttr = _.indexOf(whiteAttrList, name) !== -1;
          var ret = onTagAttr(tag, name, value, isWhiteAttr);
          if (!isNull(ret)) return ret;

          if (isWhiteAttr) {
            // call `safeAttrValue()`
            value = safeAttrValue(tag, name, value, cssFilter);
            if (value) {
              return name + '="' + value + '"';
            } else {
              return name;
            }
          } else {
            // call `onIgnoreTagAttr()`
            ret = onIgnoreTagAttr(tag, name, value, isWhiteAttr);
            if (!isNull(ret)) return ret;
            return;
          }
        });

        // build new tag html
        html = "<" + tag;
        if (attrsHtml) html += " " + attrsHtml;
        if (attrs.closing) html += " /";
        html += ">";
        return html;
      } else {
        // call `onIgnoreTag()`
        ret = onIgnoreTag(tag, html, info);
        if (!isNull(ret)) return ret;
        return escapeHtml(html);
      }
    },
    escapeHtml
  );

  // if enable stripIgnoreTagBody
  if (stripIgnoreTagBody) {
    retHtml = stripIgnoreTagBody.remove(retHtml);
  }

  return retHtml;
};

module.exports = FilterXSS;


/***/ }),

/***/ "shiny":
/*!************************!*\
  !*** external "Shiny" ***!
  \************************/
/***/ ((module) => {

"use strict";
module.exports = Shiny;

/***/ })

/******/ 	});
/************************************************************************/
/******/ 	// The module cache
/******/ 	var __webpack_module_cache__ = {};
/******/ 	
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/ 		// Check if module is in cache
/******/ 		var cachedModule = __webpack_module_cache__[moduleId];
/******/ 		if (cachedModule !== undefined) {
/******/ 			return cachedModule.exports;
/******/ 		}
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = __webpack_module_cache__[moduleId] = {
/******/ 			// no module.id needed
/******/ 			// no module.loaded needed
/******/ 			exports: {}
/******/ 		};
/******/ 	
/******/ 		// Execute the module function
/******/ 		__webpack_modules__[moduleId].call(module.exports, module, module.exports, __webpack_require__);
/******/ 	
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/ 	
/************************************************************************/
/******/ 	/* webpack/runtime/compat get default export */
/******/ 	(() => {
/******/ 		// getDefaultExport function for compatibility with non-harmony modules
/******/ 		__webpack_require__.n = (module) => {
/******/ 			var getter = module && module.__esModule ?
/******/ 				() => (module['default']) :
/******/ 				() => (module);
/******/ 			__webpack_require__.d(getter, { a: getter });
/******/ 			return getter;
/******/ 		};
/******/ 	})();
/******/ 	
/******/ 	/* webpack/runtime/define property getters */
/******/ 	(() => {
/******/ 		// define getter functions for harmony exports
/******/ 		__webpack_require__.d = (exports, definition) => {
/******/ 			for(var key in definition) {
/******/ 				if(__webpack_require__.o(definition, key) && !__webpack_require__.o(exports, key)) {
/******/ 					Object.defineProperty(exports, key, { enumerable: true, get: definition[key] });
/******/ 				}
/******/ 			}
/******/ 		};
/******/ 	})();
/******/ 	
/******/ 	/* webpack/runtime/global */
/******/ 	(() => {
/******/ 		__webpack_require__.g = (function() {
/******/ 			if (typeof globalThis === 'object') return globalThis;
/******/ 			try {
/******/ 				return this || new Function('return this')();
/******/ 			} catch (e) {
/******/ 				if (typeof window === 'object') return window;
/******/ 			}
/******/ 		})();
/******/ 	})();
/******/ 	
/******/ 	/* webpack/runtime/hasOwnProperty shorthand */
/******/ 	(() => {
/******/ 		__webpack_require__.o = (obj, prop) => (Object.prototype.hasOwnProperty.call(obj, prop))
/******/ 	})();
/******/ 	
/******/ 	/* webpack/runtime/make namespace object */
/******/ 	(() => {
/******/ 		// define __esModule on exports
/******/ 		__webpack_require__.r = (exports) => {
/******/ 			if(typeof Symbol !== 'undefined' && Symbol.toStringTag) {
/******/ 				Object.defineProperty(exports, Symbol.toStringTag, { value: 'Module' });
/******/ 			}
/******/ 			Object.defineProperty(exports, '__esModule', { value: true });
/******/ 		};
/******/ 	})();
/******/ 	
/************************************************************************/
var __webpack_exports__ = {};
// This entry need to be wrapped in an IIFE because it need to be in strict mode.
(() => {
"use strict";
/*!*********************************!*\
  !*** ./srcjs/exts/myDataset.js ***!
  \*********************************/
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var shiny__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! shiny */ "shiny");
/* harmony import */ var shiny__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(shiny__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var file_saver__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! file-saver */ "./node_modules/file-saver/dist/FileSaver.min.js");
/* harmony import */ var file_saver__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(file_saver__WEBPACK_IMPORTED_MODULE_1__);
/* harmony import */ var sweetalert__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! sweetalert */ "./node_modules/sweetalert/dist/sweetalert.min.js");
/* harmony import */ var sweetalert__WEBPACK_IMPORTED_MODULE_2___default = /*#__PURE__*/__webpack_require__.n(sweetalert__WEBPACK_IMPORTED_MODULE_2__);
/* harmony import */ var xss__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! xss */ "./node_modules/xss/lib/index.js");
/* harmony import */ var xss__WEBPACK_IMPORTED_MODULE_3___default = /*#__PURE__*/__webpack_require__.n(xss__WEBPACK_IMPORTED_MODULE_3__);






Shiny.addCustomMessageHandler("build-myDataset", (data) => {
    /**
     * Build the custom dataset table.
     * @param data The data.
     * @param data.id The id of the parent element.
     * @param data.max_rows The maximum number of rows allowed.
     */
    let parent = data["id"]
    let max_rows = data["maxRows"]
    let $parentElement = $("#" + parent)

    if ($parentElement.length > 0) {
        buildCustomDatasetTable(parent, max_rows);

    }


})


Shiny.addCustomMessageHandler("add-row-myDataset", (data) => {
    /**
     * Add a row to the custom dataset table.
     * @param data The data.
     * @param data.id The id of the parent element.
     * @param data.name The name of the dataset.
     * @param data.description The description of the dataset.
     * @param data.size The size of the dataset (number of donors).
     * @param data.rowId The id of the row.
     */
    let parent = data["id"]
    let rowId = data["row_id"]
    let name = xss__WEBPACK_IMPORTED_MODULE_3___default()(data["name"])
    let size = data["size"]
    let description = xss__WEBPACK_IMPORTED_MODULE_3___default()(data["description"])

    name = validateName(parent, name)
    if (name !== false) {
        addRowToCustomDatasetTable(parent, rowId, name, description, size)
    }
})

Shiny.addCustomMessageHandler("download-handler-myDataset", (data) => {
    /**
     * A handler that downloads the data. This is called when the user clicks the download button.
     * The data is sent to the server and the server sends it back to the client.
     * @param data The data to download.
     * @param extension The extension of the file.
     * @param filename The name of the file.
     */
    // Check if data has the following properties: [filename, extension, content]
    if (data.hasOwnProperty("filename") && data.hasOwnProperty("extension") && data.hasOwnProperty("content")) {
        if (data["extension"] === "csv") {
            let blob = new Blob([data["content"]], {type: "text/csv;charset=utf-8"})
            ;(0,file_saver__WEBPACK_IMPORTED_MODULE_1__.saveAs)(blob, data["filename"] + "." + data["extension"])

        } else if (data["extension"] === "json") {
            let blob = new Blob([JSON.stringify(data["content"], null, 2)], {type: "text/plain;charset=utf-8"});
            (0,file_saver__WEBPACK_IMPORTED_MODULE_1__.saveAs)(blob, data["filename"] + "." + data["extension"]);
        } else {
            Error("Extension not supported.")
        }

    } else {
        Error("Data does not have the correct properties.")
    }
})


Shiny.addCustomMessageHandler("toggle-download-button", (data) => {
    /**
     * Toggle the download button.
     * @param data The data.
     * @param data.parent The id of the parent element.
     * @param data.datasetID The id of the dataset.
     * @param data.action The action to perform. Either "show" or "hide".
     */
    let parentID = data["parentID"]
    let datasetID = data["datasetID"]
    let action = data["action"]

    // If action is not show or hide, do nothing.
    if (action !== "show" && action !== "hide") {
        Error("Action is not show or hide.")
    }

    // Get the download button which is inside the $row with id "download-data-" + datasetID
    let $downloadButton = $("#" + parentID).find("#download-data-" + datasetID)


    // If the action is "show", show the button. Otherwise, 'hide' the button.
    if (action === "show") {
        $downloadButton.data("blocked", false)
        $downloadButton.css("text-decoration", "none")
    } else {
        $downloadButton.data("blocked", true)
        $downloadButton.css("text-decoration", "line-through")
    }
})


Shiny.addCustomMessageHandler("set-cookie", (data) => {
    /**
     * Add a cookie.
     * @param name The name of the cookie.
     * @param msg The message of the cookie.
     */

    let name = data["name"]
    let msg = data["msg"]

    // Add the cookie.
    localStorage.setItem(name, JSON.stringify(msg))
})

function row_in_table(table, checkParam, paramValue, $ownRow) {
    /**
     * Check if a row exists in a table.
     * @param table The table.
     * @param checkParam The parameter to check.
     * @returns {boolean}
     */

    let isDuplicate = false

    // Get the rows excluding the own row.
    let $rows;
    if ($ownRow) {
        $rows = table.find("tbody tr").not($ownRow)
    } else {
        $rows = table.find("tbody tr")
    }

    // Check if the row has a data(checkParam) that matches paramValue.
    $rows.filter(function () {
        if ($(this).data(checkParam) === paramValue) {
            isDuplicate = true
        }
    })
    return isDuplicate
}

function validateName(id, name, $row) {
    /**
     * Validate the name of the dataset. If the name already exists, append a number to the end.
     * @param id The id of the parent element.
     * @param name The name of the dataset.
     * @returns {string} The validated name.
     * @type {*|jQuery|HTMLElement}
     */
    let $table = $("#my-dataset-table-" + id)
    name = name.trim()
    if (row_in_table($table, "name", name, $row)) {
        sweetalert__WEBPACK_IMPORTED_MODULE_2___default()({
            title: "Name already exists?",
            text: "Please change the name of the dataset to a name that does not exist.",
            icon: "warning",
        })
    } else {
        return name
    }
}



function buildCustomDatasetTable(id, max_rows = 10) {
    /**
     * Create a table that has 4 columns: name, description, size and buttons.
     * @type {*|jQuery|HTMLElement}
     * @param id The id of the parent element.
     * @returns {jQuery|HTMLElement} The table.
     */
    let $table = $("<table class='table table-striped' id='my-dataset-table-" + id + "'></table>")
    $table.data("maxRows", max_rows)

    let headers = ["Name", "Description", "Size", "Actions"]
    // Add the headers to the table.
    $table.append("<thead><tr></tr></thead>")

    headers.forEach(function (header) {
        $table.find("thead tr").append("<th scope='col'>" + header + "</th>")
    })
    // Add the body to the table.
    $table.append("<tbody></tbody>")
    $("#" + id).append($table)
    let cookieRows = getRowCookie()
    if (cookieRows !== undefined) {
        Shiny.setInputValue(id + "_cookies", cookieRows, {priority: "event"})
    }

    return $table
}


function getRowCookie() {
    /**
     * Get the rows from the cookie.
     * @returns {Array} The rows.
     */
    let myDataset = localStorage.getItem("myDataset")
    if (myDataset !== undefined) {
        return JSON.parse(myDataset)
    }
}

function addRowToCustomDatasetTable(id, rowId, name, description, size) {
    /**
     * Add a row to the custom dataset table.
     * @param id The id of the parent element.
     * @param name The name of the dataset.
     * @param description The description of the dataset.
     * @param size The size of the dataset.
     * @returns {jQuery|HTMLElement}
     */

        // Get the current date
    let date = new Date()
    let $table = $("#my-dataset-table-" + id)
    let $tbody = $table.find("tbody")
    let $row = $("<tr id='my-dataset-row-" + rowId + "' class='allign-middle'></tr>")
    $row.data("rowId", rowId)
    $row.data("inputID", id)
    $row.data("name", name)
    $row.data("description", description)
    $row.data("size", size)
    $row.data("date", date)

    // Communicating the date time to the server. The date time is created on client side to avoid timezone issues.
    let dateString = date.getFullYear() + "-" + (date.getMonth() + 1) + "-" + date.getDate() + " " + date.getHours() + ":" + date.getMinutes() + ":" + date.getSeconds() + " GMT" + (date.getTimezoneOffset() / 60 * -1)
    Shiny.setInputValue($row.data("inputID"), {
        "action": "set_time",
        "id": rowId,
        "time": dateString
    }, {priority: "event"})

    $row.append(create_name(name))
    $row.append(create_description(description))
    $row.append(create_size(size))
    $row.append(create_actions(id, rowId))
    $tbody.append($row)
    return $row
}

function download_data_pressed(rowId) {
    // Get the id of the parent element.
    let $row = $("#my-dataset-row-" + rowId)

    // Get the id of
    let id = $row.data("rowId")
    // Get the name of the dataset.

    // Get the parent id
    let inputID = $row.data("inputID")

    Shiny.setInputValue(inputID, {"action": "download_data", "id": id}, {priority: "event"})

}

function download_filter_pressed(rowId) {
    let $row = $("#my-dataset-row-" + rowId)
    let id = $row.data("rowId")
    let inputID = $row.data("inputID")

    Shiny.setInputValue(inputID, {"action": "download_filter", "id": id}, {priority: "event"})
}

function createDownloadDropdown(id, rowId) {
    /**
     * Create a dropdown menu that has two options: download data and download filter.
     * @param id The id of the row
     * @returns {jQuery|HTMLElement} The dropdown menu.
     */
    let dropdownID = "download-dropdown-" + id
    let $dropdown = $("<div class='dropdown'></div>")
    let $dropdownButton = $("<button class='btn btn-outline-primary btn-sm dropdown-toggle' type='button' data-bs-toggle='dropdown' aria-expanded='false'><i class='fas fa-download'></i></button>")
    $dropdownButton.attr("id", dropdownID)

    let $dropdownMenu = $("<ul class='dropdown-menu' aria-labelledby='dropdownMenuButton'></ul>")
    $dropdownMenu.attr("aria-labelledby", dropdownID)

    let $downloadDataButton = $("<li><a class='dropdown-item' href='#'><i class='fas fa-file-arrow-down'></i> Download data</a></li>")
    $downloadDataButton.attr("id", "download-data-" + rowId)
    $downloadDataButton.data("blocked", false)

    $downloadDataButton.on("click", function () {
        if ($downloadDataButton.data("blocked") === false) {
            download_data_pressed(rowId)
        } else {
            alert(
                `This dataset is currently being processed for download. Please wait until the download is complete.\n\n` +
                "(The download can take a while if the dataset is large, and clinical history data is included.)"
            )
        }
    })

    let $downloadFilterButton = $("<li><a class='dropdown-item' href='#'><i class='fas fa-filter'></i> Download filters</a></li>")
    $downloadFilterButton.attr("id", "download-filter-" + rowId)
    $downloadFilterButton.on("click", function () {
        download_filter_pressed(rowId)
    })

    $dropdownMenu.append($downloadDataButton)
    $dropdownMenu.append($downloadFilterButton)

    $dropdown.append($dropdownButton)
    $dropdown.append($dropdownMenu)

    return $dropdown
}

function createDeleteButton(id, rowId) {
    /**
     * Create a delete button for the row.
     * @param id The id of the parent
     * @param rowId The id of the row.
     * @returns {jQuery|HTMLElement} The delete button.
     */
    let $deleteButton = $("<button class='btn btn-danger btn-sm' type='button' data-toggle='tooltip' data-placement='top' title='Delete'></button>")
    $deleteButton.append("<i class='fas fa-trash-alt'></i>")
    $deleteButton.click(function () {
        let $row = $("#my-dataset-row-" + rowId)
        let name = $row.data("name") ? '"' + $row.data("name") + '"' : "this unnamed dataset"

        if (confirm(`Are you sure you want to delete ${name}?`)) {
            let inputID = $row.data("inputID")
            Shiny.setInputValue(inputID, {"action": "delete", "id": rowId}, {priority: "event"})
            deleteRow(id, rowId)
        }
    })
    return $deleteButton
}



function create_actions(id, rowId) {
    /**
     * Create the actions column. This column contains a dropdown menu with two options: download data and download filter.
     * @param id The id of the parent element.
     * @param rowId The id of the row.
     */
    let $actions = $("<td class='align-middle'></td>")

    // Create a button group for the actions.
    let $btnGroup = $("<div class='btn-group' role='group'></div>")
    $actions.append($btnGroup)

    $btnGroup.append(createDownloadDropdown(id, rowId))
    $btnGroup.append(createDeleteButton(id, rowId))



    return $actions
}

function create_size(size) {
    /**
     * Handles the creation of the size TD.
     * @type {*|jQuery|HTMLElement}
     */
    let $td = $("<td class='align-middle'></td>")
    $td.append($("<p>" + `${size} ${size <= 1 ? "donor" : "donors"}` + "</p>"))

    return $td
}

function create_name(name) {
    /**
     * Handles the creation of the title.
     * @type {*|jQuery|HTMLElement}
     */
    let $td = $("<td class='align-middle'></td>")
    let $name = $("<b>" + name + "</b>")
    make_name_editable($name)
    $td.append($name)
    return $td
}

function create_description(description = "") {
    /**
     * Handles the creation of the description.
     * @type {*|jQuery|HTMLElement}
     */

    let $td = $("<td class='align-middle'></td>")

    // Set font style to italic if there is no description.
    if (description === "") {
        $td.css("font-style", "italic")
        description = "No description..."
    }

    let $description = $("<p>" + description + "</p>")
    make_description_editable($description)
    $td.append($description)
    return $td
}

function deleteRow(id, rowId) {
    /**
     * Delete a row from the table.
     * @param id The id of the parent element.
     * @param rowId The id of the row.
     */
    let $table = $("#my-dataset-table-" + id)
    let $tbody = $table.find("tbody")
    let $row = $tbody.find("#my-dataset-row-" + rowId)
    $row.remove()
}

function make_description_editable($description) {
    /**
     * Make the description editable. When the user clicks on the description, it will become editable.
     * @param $description The description.
     * @returns NULL
     */

    $description.click(function () {
        // Remove the italic style.
        $description.css("font-style", "normal")
        $description.attr("contenteditable", "true")
        $description.focus()

    })


    $description.keypress(function (e) {
        if (e.which === 13) {
            $description.attr("contenteditable", false)
            $description.blur()
        }
    })

    $description.blur(function () {
        // Update function
        $description.attr("contenteditable", "false")
        let $row = $description.closest("tr")
        let newDescription = xss__WEBPACK_IMPORTED_MODULE_3___default()($description.text())
        newDescription = newDescription.trim()

        if (newDescription.length === 0) {
            // Set the font style to italic.
            $description.css("font-style", "italic")
            $description.text("No description...")
            $row.data("description", "")
        }
        let inputID = $row.data("inputID")
        let rowId = $row.data("rowId")
        Shiny.setInputValue(inputID, {
            "action": "description_change",
            "id": rowId,
            "description": newDescription
        }, {priority: "event"})
        $row.data("description", newDescription)

    })
}

function make_name_editable($name) {
    /**
     * Make the title editable. When the user clicks on the title, it will become editable.
     * @param $title The title.
     * @returns NULL
     */

    $name.click(function () {
        $name.attr("contenteditable", "true")
        $name.focus()
        $name.css("font-style", "normal")
    })

    $name.keypress(function (e) {
        if (e.which === 13) {
            $name.attr("contenteditable", false)
            $name.blur()
        }
    })

    $name.blur(function () {
        $name.attr("contenteditable", "false")
        let $row = $name.closest("tr")
        let newTitle = xss__WEBPACK_IMPORTED_MODULE_3___default()($name.text())
        let inputID = $row.data("inputID")
        let rowId = $row.data("rowId")
        newTitle = newTitle.trim()
        if (newTitle.length === 0) {
            $name.text($row.data("name"))
            sweetalert__WEBPACK_IMPORTED_MODULE_2___default()({
                title: "Error",
                text: "The name cannot be empty.",
                icon: "error",
            })
        } else if (newTitle.length > 50) {
            $name.text($row.data("name"))
            sweetalert__WEBPACK_IMPORTED_MODULE_2___default()({
                title: "Error",
                text: "The name cannot be longer than 50 characters.",
                icon: "error",
            })
        } else {
            if (validateName($row.data("inputID"), newTitle, $row)) {
                $row.data("name", newTitle)
                $name.text(newTitle)
                $name.css("font-style", "normal")
                Shiny.setInputValue(inputID, {
                    "action": "name_change",
                    "id": rowId,
                    "name": newTitle
                }, {priority: "event"})
            } else {
                // Name is not valid so we set it back to the old name.
                $name.text($row.data("name"))
            }
        }
    })
}

})();

/******/ })()
;
//# sourceMappingURL=data:application/json;charset=utf-8;base64,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Q0E7QUFDQSxjQUFjO0FBQ2Q7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0EsY0FBYztBQUNkOztBQUVBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBLEtBQUs7OztBQUdMO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxLQUFLOztBQUVMO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsNkJBQTZCLDBDQUFHO0FBQ2hDOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLFNBQVMsR0FBRyxrQkFBa0I7QUFDOUI7O0FBRUEsS0FBSztBQUNMOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLEtBQUs7O0FBRUw7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLEtBQUs7O0FBRUw7QUFDQTtBQUNBO0FBQ0EsdUJBQXVCLDBDQUFHO0FBQzFCO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxZQUFZLGlEQUFJO0FBQ2hCO0FBQ0E7QUFDQTtBQUNBLGFBQWE7QUFDYixVQUFVO0FBQ1Y7QUFDQSxZQUFZLGlEQUFJO0FBQ2hCO0FBQ0E7QUFDQTtBQUNBLGFBQWE7QUFDYixVQUFVO0FBQ1Y7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLGlCQUFpQixHQUFHLGtCQUFrQjtBQUN0QyxjQUFjO0FBQ2Q7QUFDQTtBQUNBO0FBQ0E7QUFDQSxLQUFLO0FBQ0wiLCJzb3VyY2VzIjpbIndlYnBhY2s6Ly9ubmJ3aWRnZXRzLy4vbm9kZV9tb2R1bGVzL2Nzc2ZpbHRlci9saWIvY3NzLmpzIiwid2VicGFjazovL25uYndpZGdldHMvLi9ub2RlX21vZHVsZXMvY3NzZmlsdGVyL2xpYi9kZWZhdWx0LmpzIiwid2VicGFjazovL25uYndpZGdldHMvLi9ub2RlX21vZHVsZXMvY3NzZmlsdGVyL2xpYi9pbmRleC5qcyIsIndlYnBhY2s6Ly9ubmJ3aWRnZXRzLy4vbm9kZV9tb2R1bGVzL2Nzc2ZpbHRlci9saWIvcGFyc2VyLmpzIiwid2VicGFjazovL25uYndpZGdldHMvLi9ub2RlX21vZHVsZXMvY3NzZmlsdGVyL2xpYi91dGlsLmpzIiwid2VicGFjazovL25uYndpZGdldHMvLi9ub2RlX21vZHVsZXMvZmlsZS1zYXZlci9kaXN0L0ZpbGVTYXZlci5taW4uanMiLCJ3ZWJwYWNrOi8vbm5id2lkZ2V0cy8uL25vZGVfbW9kdWxlcy9zd2VldGFsZXJ0L2Rpc3Qvc3dlZXRhbGVydC5taW4uanMiLCJ3ZWJwYWNrOi8vbm5id2lkZ2V0cy8uL25vZGVfbW9kdWxlcy94c3MvbGliL2RlZmF1bHQuanMiLCJ3ZWJwYWNrOi8vbm5id2lkZ2V0cy8uL25vZGVfbW9kdWxlcy94c3MvbGliL2luZGV4LmpzIiwid2VicGFjazovL25uYndpZGdldHMvLi9ub2RlX21vZHVsZXMveHNzL2xpYi9wYXJzZXIuanMiLCJ3ZWJwYWNrOi8vbm5id2lkZ2V0cy8uL25vZGVfbW9kdWxlcy94c3MvbGliL3V0aWwuanMiLCJ3ZWJwYWNrOi8vbm5id2lkZ2V0cy8uL25vZGVfbW9kdWxlcy94c3MvbGliL3hzcy5qcyIsIndlYnBhY2s6Ly9ubmJ3aWRnZXRzL2V4dGVybmFsIHZhciBcIlNoaW55XCIiLCJ3ZWJwYWNrOi8vbm5id2lkZ2V0cy93ZWJwYWNrL2Jvb3RzdHJhcCIsIndlYnBhY2s6Ly9ubmJ3aWRnZXRzL3dlYnBhY2svcnVudGltZS9jb21wYXQgZ2V0IGRlZmF1bHQgZXhwb3J0Iiwid2VicGFjazovL25uYndpZGdldHMvd2VicGFjay9ydW50aW1lL2RlZmluZSBwcm9wZXJ0eSBnZXR0ZXJzIiwid2VicGFjazovL25uYndpZGdldHMvd2VicGFjay9ydW50aW1lL2dsb2JhbCIsIndlYnBhY2s6Ly9ubmJ3aWRnZXRzL3dlYnBhY2svcnVudGltZS9oYXNPd25Qcm9wZXJ0eSBzaG9ydGhhbmQiLCJ3ZWJwYWNrOi8vbm5id2lkZ2V0cy93ZWJwYWNrL3J1bnRpbWUvbWFrZSBuYW1lc3BhY2Ugb2JqZWN0Iiwid2VicGFjazovL25uYndpZGdldHMvLi9zcmNqcy9leHRzL215RGF0YXNldC5qcyJdLCJzb3VyY2VzQ29udGVudCI6WyIvKipcbiAqIGNzc2ZpbHRlclxuICpcbiAqIEBhdXRob3Ig6ICB6Zu3PGxlaXpvbmdtaW5AZ21haWwuY29tPlxuICovXG5cbnZhciBERUZBVUxUID0gcmVxdWlyZSgnLi9kZWZhdWx0Jyk7XG52YXIgcGFyc2VTdHlsZSA9IHJlcXVpcmUoJy4vcGFyc2VyJyk7XG52YXIgXyA9IHJlcXVpcmUoJy4vdXRpbCcpO1xuXG5cbi8qKlxuICog6L+U5Zue5YC85piv5ZCm5Li656m6XG4gKlxuICogQHBhcmFtIHtPYmplY3R9IG9ialxuICogQHJldHVybiB7Qm9vbGVhbn1cbiAqL1xuZnVuY3Rpb24gaXNOdWxsIChvYmopIHtcbiAgcmV0dXJuIChvYmogPT09IHVuZGVmaW5lZCB8fCBvYmogPT09IG51bGwpO1xufVxuXG4vKipcbiAqIOa1heaLt+i0neWvueixoVxuICpcbiAqIEBwYXJhbSB7T2JqZWN0fSBvYmpcbiAqIEByZXR1cm4ge09iamVjdH1cbiAqL1xuZnVuY3Rpb24gc2hhbGxvd0NvcHlPYmplY3QgKG9iaikge1xuICB2YXIgcmV0ID0ge307XG4gIGZvciAodmFyIGkgaW4gb2JqKSB7XG4gICAgcmV0W2ldID0gb2JqW2ldO1xuICB9XG4gIHJldHVybiByZXQ7XG59XG5cbi8qKlxuICog5Yib5bu6Q1NT6L+H5ruk5ZmoXG4gKlxuICogQHBhcmFtIHtPYmplY3R9IG9wdGlvbnNcbiAqICAgLSB7T2JqZWN0fSB3aGl0ZUxpc3RcbiAqICAgLSB7RnVuY3Rpb259IG9uQXR0clxuICogICAtIHtGdW5jdGlvbn0gb25JZ25vcmVBdHRyXG4gKiAgIC0ge0Z1bmN0aW9ufSBzYWZlQXR0clZhbHVlXG4gKi9cbmZ1bmN0aW9uIEZpbHRlckNTUyAob3B0aW9ucykge1xuICBvcHRpb25zID0gc2hhbGxvd0NvcHlPYmplY3Qob3B0aW9ucyB8fCB7fSk7XG4gIG9wdGlvbnMud2hpdGVMaXN0ID0gb3B0aW9ucy53aGl0ZUxpc3QgfHwgREVGQVVMVC53aGl0ZUxpc3Q7XG4gIG9wdGlvbnMub25BdHRyID0gb3B0aW9ucy5vbkF0dHIgfHwgREVGQVVMVC5vbkF0dHI7XG4gIG9wdGlvbnMub25JZ25vcmVBdHRyID0gb3B0aW9ucy5vbklnbm9yZUF0dHIgfHwgREVGQVVMVC5vbklnbm9yZUF0dHI7XG4gIG9wdGlvbnMuc2FmZUF0dHJWYWx1ZSA9IG9wdGlvbnMuc2FmZUF0dHJWYWx1ZSB8fCBERUZBVUxULnNhZmVBdHRyVmFsdWU7XG4gIHRoaXMub3B0aW9ucyA9IG9wdGlvbnM7XG59XG5cbkZpbHRlckNTUy5wcm90b3R5cGUucHJvY2VzcyA9IGZ1bmN0aW9uIChjc3MpIHtcbiAgLy8g5YW85a655ZCE56eN5aWH6JGp6L6T5YWlXG4gIGNzcyA9IGNzcyB8fCAnJztcbiAgY3NzID0gY3NzLnRvU3RyaW5nKCk7XG4gIGlmICghY3NzKSByZXR1cm4gJyc7XG5cbiAgdmFyIG1lID0gdGhpcztcbiAgdmFyIG9wdGlvbnMgPSBtZS5vcHRpb25zO1xuICB2YXIgd2hpdGVMaXN0ID0gb3B0aW9ucy53aGl0ZUxpc3Q7XG4gIHZhciBvbkF0dHIgPSBvcHRpb25zLm9uQXR0cjtcbiAgdmFyIG9uSWdub3JlQXR0ciA9IG9wdGlvbnMub25JZ25vcmVBdHRyO1xuICB2YXIgc2FmZUF0dHJWYWx1ZSA9IG9wdGlvbnMuc2FmZUF0dHJWYWx1ZTtcblxuICB2YXIgcmV0Q1NTID0gcGFyc2VTdHlsZShjc3MsIGZ1bmN0aW9uIChzb3VyY2VQb3NpdGlvbiwgcG9zaXRpb24sIG5hbWUsIHZhbHVlLCBzb3VyY2UpIHtcblxuICAgIHZhciBjaGVjayA9IHdoaXRlTGlzdFtuYW1lXTtcbiAgICB2YXIgaXNXaGl0ZSA9IGZhbHNlO1xuICAgIGlmIChjaGVjayA9PT0gdHJ1ZSkgaXNXaGl0ZSA9IGNoZWNrO1xuICAgIGVsc2UgaWYgKHR5cGVvZiBjaGVjayA9PT0gJ2Z1bmN0aW9uJykgaXNXaGl0ZSA9IGNoZWNrKHZhbHVlKTtcbiAgICBlbHNlIGlmIChjaGVjayBpbnN0YW5jZW9mIFJlZ0V4cCkgaXNXaGl0ZSA9IGNoZWNrLnRlc3QodmFsdWUpO1xuICAgIGlmIChpc1doaXRlICE9PSB0cnVlKSBpc1doaXRlID0gZmFsc2U7XG5cbiAgICAvLyDlpoLmnpzov4fmu6TlkI4gdmFsdWUg5Li656m65YiZ55u05o6l5b+955WlXG4gICAgdmFsdWUgPSBzYWZlQXR0clZhbHVlKG5hbWUsIHZhbHVlKTtcbiAgICBpZiAoIXZhbHVlKSByZXR1cm47XG5cbiAgICB2YXIgb3B0cyA9IHtcbiAgICAgIHBvc2l0aW9uOiBwb3NpdGlvbixcbiAgICAgIHNvdXJjZVBvc2l0aW9uOiBzb3VyY2VQb3NpdGlvbixcbiAgICAgIHNvdXJjZTogc291cmNlLFxuICAgICAgaXNXaGl0ZTogaXNXaGl0ZVxuICAgIH07XG5cbiAgICBpZiAoaXNXaGl0ZSkge1xuXG4gICAgICB2YXIgcmV0ID0gb25BdHRyKG5hbWUsIHZhbHVlLCBvcHRzKTtcbiAgICAgIGlmIChpc051bGwocmV0KSkge1xuICAgICAgICByZXR1cm4gbmFtZSArICc6JyArIHZhbHVlO1xuICAgICAgfSBlbHNlIHtcbiAgICAgICAgcmV0dXJuIHJldDtcbiAgICAgIH1cblxuICAgIH0gZWxzZSB7XG5cbiAgICAgIHZhciByZXQgPSBvbklnbm9yZUF0dHIobmFtZSwgdmFsdWUsIG9wdHMpO1xuICAgICAgaWYgKCFpc051bGwocmV0KSkge1xuICAgICAgICByZXR1cm4gcmV0O1xuICAgICAgfVxuXG4gICAgfVxuICB9KTtcblxuICByZXR1cm4gcmV0Q1NTO1xufTtcblxuXG5tb2R1bGUuZXhwb3J0cyA9IEZpbHRlckNTUztcbiIsIi8qKlxuICogY3NzZmlsdGVyXG4gKlxuICogQGF1dGhvciDogIHpm7c8bGVpem9uZ21pbkBnbWFpbC5jb20+XG4gKi9cblxuZnVuY3Rpb24gZ2V0RGVmYXVsdFdoaXRlTGlzdCAoKSB7XG4gIC8vIOeZveWQjeWNleWAvOivtOaYju+8mlxuICAvLyB0cnVlOiDlhYHorrjor6XlsZ7mgKdcbiAgLy8gRnVuY3Rpb246IGZ1bmN0aW9uICh2YWwpIHsgfSDov5Tlm550cnVl6KGo56S65YWB6K646K+l5bGe5oCn77yM5YW25LuW5YC85Z2H6KGo56S65LiN5YWB6K64XG4gIC8vIFJlZ0V4cDogcmVnZXhwLnRlc3QodmFsKSDov5Tlm550cnVl6KGo56S65YWB6K646K+l5bGe5oCn77yM5YW25LuW5YC85Z2H6KGo56S65LiN5YWB6K64XG4gIC8vIOmZpOS4iumdouWIl+WHuueahOWAvOWkluWdh+ihqOekuuS4jeWFgeiuuFxuICB2YXIgd2hpdGVMaXN0ID0ge307XG5cbiAgd2hpdGVMaXN0WydhbGlnbi1jb250ZW50J10gPSBmYWxzZTsgLy8gZGVmYXVsdDogYXV0b1xuICB3aGl0ZUxpc3RbJ2FsaWduLWl0ZW1zJ10gPSBmYWxzZTsgLy8gZGVmYXVsdDogYXV0b1xuICB3aGl0ZUxpc3RbJ2FsaWduLXNlbGYnXSA9IGZhbHNlOyAvLyBkZWZhdWx0OiBhdXRvXG4gIHdoaXRlTGlzdFsnYWxpZ25tZW50LWFkanVzdCddID0gZmFsc2U7IC8vIGRlZmF1bHQ6IGF1dG9cbiAgd2hpdGVMaXN0WydhbGlnbm1lbnQtYmFzZWxpbmUnXSA9IGZhbHNlOyAvLyBkZWZhdWx0OiBiYXNlbGluZVxuICB3aGl0ZUxpc3RbJ2FsbCddID0gZmFsc2U7IC8vIGRlZmF1bHQ6IGRlcGVuZGluZyBvbiBpbmRpdmlkdWFsIHByb3BlcnRpZXNcbiAgd2hpdGVMaXN0WydhbmNob3ItcG9pbnQnXSA9IGZhbHNlOyAvLyBkZWZhdWx0OiBub25lXG4gIHdoaXRlTGlzdFsnYW5pbWF0aW9uJ10gPSBmYWxzZTsgLy8gZGVmYXVsdDogZGVwZW5kaW5nIG9uIGluZGl2aWR1YWwgcHJvcGVydGllc1xuICB3aGl0ZUxpc3RbJ2FuaW1hdGlvbi1kZWxheSddID0gZmFsc2U7IC8vIGRlZmF1bHQ6IDBcbiAgd2hpdGVMaXN0WydhbmltYXRpb24tZGlyZWN0aW9uJ10gPSBmYWxzZTsgLy8gZGVmYXVsdDogbm9ybWFsXG4gIHdoaXRlTGlzdFsnYW5pbWF0aW9uLWR1cmF0aW9uJ10gPSBmYWxzZTsgLy8gZGVmYXVsdDogMFxuICB3aGl0ZUxpc3RbJ2FuaW1hdGlvbi1maWxsLW1vZGUnXSA9IGZhbHNlOyAvLyBkZWZhdWx0OiBub25lXG4gIHdoaXRlTGlzdFsnYW5pbWF0aW9uLWl0ZXJhdGlvbi1jb3VudCddID0gZmFsc2U7IC8vIGRlZmF1bHQ6IDFcbiAgd2hpdGVMaXN0WydhbmltYXRpb24tbmFtZSddID0gZmFsc2U7IC8vIGRlZmF1bHQ6IG5vbmVcbiAgd2hpdGVMaXN0WydhbmltYXRpb24tcGxheS1zdGF0ZSddID0gZmFsc2U7IC8vIGRlZmF1bHQ6IHJ1bm5pbmdcbiAgd2hpdGVMaXN0WydhbmltYXRpb24tdGltaW5nLWZ1bmN0aW9uJ10gPSBmYWxzZTsgLy8gZGVmYXVsdDogZWFzZVxuICB3aGl0ZUxpc3RbJ2F6aW11dGgnXSA9IGZhbHNlOyAvLyBkZWZhdWx0OiBjZW50ZXJcbiAgd2hpdGVMaXN0WydiYWNrZmFjZS12aXNpYmlsaXR5J10gPSBmYWxzZTsgLy8gZGVmYXVsdDogdmlzaWJsZVxuICB3aGl0ZUxpc3RbJ2JhY2tncm91bmQnXSA9IHRydWU7IC8vIGRlZmF1bHQ6IGRlcGVuZGluZyBvbiBpbmRpdmlkdWFsIHByb3BlcnRpZXNcbiAgd2hpdGVMaXN0WydiYWNrZ3JvdW5kLWF0dGFjaG1lbnQnXSA9IHRydWU7IC8vIGRlZmF1bHQ6IHNjcm9sbFxuICB3aGl0ZUxpc3RbJ2JhY2tncm91bmQtY2xpcCddID0gdHJ1ZTsgLy8gZGVmYXVsdDogYm9yZGVyLWJveFxuICB3aGl0ZUxpc3RbJ2JhY2tncm91bmQtY29sb3InXSA9IHRydWU7IC8vIGRlZmF1bHQ6IHRyYW5zcGFyZW50XG4gIHdoaXRlTGlzdFsnYmFja2dyb3VuZC1pbWFnZSddID0gdHJ1ZTsgLy8gZGVmYXVsdDogbm9uZVxuICB3aGl0ZUxpc3RbJ2JhY2tncm91bmQtb3JpZ2luJ10gPSB0cnVlOyAvLyBkZWZhdWx0OiBwYWRkaW5nLWJveFxuICB3aGl0ZUxpc3RbJ2JhY2tncm91bmQtcG9zaXRpb24nXSA9IHRydWU7IC8vIGRlZmF1bHQ6IDAlIDAlXG4gIHdoaXRlTGlzdFsnYmFja2dyb3VuZC1yZXBlYXQnXSA9IHRydWU7IC8vIGRlZmF1bHQ6IHJlcGVhdFxuICB3aGl0ZUxpc3RbJ2JhY2tncm91bmQtc2l6ZSddID0gdHJ1ZTsgLy8gZGVmYXVsdDogYXV0b1xuICB3aGl0ZUxpc3RbJ2Jhc2VsaW5lLXNoaWZ0J10gPSBmYWxzZTsgLy8gZGVmYXVsdDogYmFzZWxpbmVcbiAgd2hpdGVMaXN0WydiaW5kaW5nJ10gPSBmYWxzZTsgLy8gZGVmYXVsdDogbm9uZVxuICB3aGl0ZUxpc3RbJ2JsZWVkJ10gPSBmYWxzZTsgLy8gZGVmYXVsdDogNnB0XG4gIHdoaXRlTGlzdFsnYm9va21hcmstbGFiZWwnXSA9IGZhbHNlOyAvLyBkZWZhdWx0OiBjb250ZW50KClcbiAgd2hpdGVMaXN0Wydib29rbWFyay1sZXZlbCddID0gZmFsc2U7IC8vIGRlZmF1bHQ6IG5vbmVcbiAgd2hpdGVMaXN0Wydib29rbWFyay1zdGF0ZSddID0gZmFsc2U7IC8vIGRlZmF1bHQ6IG9wZW5cbiAgd2hpdGVMaXN0Wydib3JkZXInXSA9IHRydWU7IC8vIGRlZmF1bHQ6IGRlcGVuZGluZyBvbiBpbmRpdmlkdWFsIHByb3BlcnRpZXNcbiAgd2hpdGVMaXN0Wydib3JkZXItYm90dG9tJ10gPSB0cnVlOyAvLyBkZWZhdWx0OiBkZXBlbmRpbmcgb24gaW5kaXZpZHVhbCBwcm9wZXJ0aWVzXG4gIHdoaXRlTGlzdFsnYm9yZGVyLWJvdHRvbS1jb2xvciddID0gdHJ1ZTsgLy8gZGVmYXVsdDogY3VycmVudCBjb2xvclxuICB3aGl0ZUxpc3RbJ2JvcmRlci1ib3R0b20tbGVmdC1yYWRpdXMnXSA9IHRydWU7IC8vIGRlZmF1bHQ6IDBcbiAgd2hpdGVMaXN0Wydib3JkZXItYm90dG9tLXJpZ2h0LXJhZGl1cyddID0gdHJ1ZTsgLy8gZGVmYXVsdDogMFxuICB3aGl0ZUxpc3RbJ2JvcmRlci1ib3R0b20tc3R5bGUnXSA9IHRydWU7IC8vIGRlZmF1bHQ6IG5vbmVcbiAgd2hpdGVMaXN0Wydib3JkZXItYm90dG9tLXdpZHRoJ10gPSB0cnVlOyAvLyBkZWZhdWx0OiBtZWRpdW1cbiAgd2hpdGVMaXN0Wydib3JkZXItY29sbGFwc2UnXSA9IHRydWU7IC8vIGRlZmF1bHQ6IHNlcGFyYXRlXG4gIHdoaXRlTGlzdFsnYm9yZGVyLWNvbG9yJ10gPSB0cnVlOyAvLyBkZWZhdWx0OiBkZXBlbmRpbmcgb24gaW5kaXZpZHVhbCBwcm9wZXJ0aWVzXG4gIHdoaXRlTGlzdFsnYm9yZGVyLWltYWdlJ10gPSB0cnVlOyAvLyBkZWZhdWx0OiBub25lXG4gIHdoaXRlTGlzdFsnYm9yZGVyLWltYWdlLW91dHNldCddID0gdHJ1ZTsgLy8gZGVmYXVsdDogMFxuICB3aGl0ZUxpc3RbJ2JvcmRlci1pbWFnZS1yZXBlYXQnXSA9IHRydWU7IC8vIGRlZmF1bHQ6IHN0cmV0Y2hcbiAgd2hpdGVMaXN0Wydib3JkZXItaW1hZ2Utc2xpY2UnXSA9IHRydWU7IC8vIGRlZmF1bHQ6IDEwMCVcbiAgd2hpdGVMaXN0Wydib3JkZXItaW1hZ2Utc291cmNlJ10gPSB0cnVlOyAvLyBkZWZhdWx0OiBub25lXG4gIHdoaXRlTGlzdFsnYm9yZGVyLWltYWdlLXdpZHRoJ10gPSB0cnVlOyAvLyBkZWZhdWx0OiAxXG4gIHdoaXRlTGlzdFsnYm9yZGVyLWxlZnQnXSA9IHRydWU7IC8vIGRlZmF1bHQ6IGRlcGVuZGluZyBvbiBpbmRpdmlkdWFsIHByb3BlcnRpZXNcbiAgd2hpdGVMaXN0Wydib3JkZXItbGVmdC1jb2xvciddID0gdHJ1ZTsgLy8gZGVmYXVsdDogY3VycmVudCBjb2xvclxuICB3aGl0ZUxpc3RbJ2JvcmRlci1sZWZ0LXN0eWxlJ10gPSB0cnVlOyAvLyBkZWZhdWx0OiBub25lXG4gIHdoaXRlTGlzdFsnYm9yZGVyLWxlZnQtd2lkdGgnXSA9IHRydWU7IC8vIGRlZmF1bHQ6IG1lZGl1bVxuICB3aGl0ZUxpc3RbJ2JvcmRlci1yYWRpdXMnXSA9IHRydWU7IC8vIGRlZmF1bHQ6IDBcbiAgd2hpdGVMaXN0Wydib3JkZXItcmlnaHQnXSA9IHRydWU7IC8vIGRlZmF1bHQ6IGRlcGVuZGluZyBvbiBpbmRpdmlkdWFsIHByb3BlcnRpZXNcbiAgd2hpdGVMaXN0Wydib3JkZXItcmlnaHQtY29sb3InXSA9IHRydWU7IC8vIGRlZmF1bHQ6IGN1cnJlbnQgY29sb3JcbiAgd2hpdGVMaXN0Wydib3JkZXItcmlnaHQtc3R5bGUnXSA9IHRydWU7IC8vIGRlZmF1bHQ6IG5vbmVcbiAgd2hpdGVMaXN0Wydib3JkZXItcmlnaHQtd2lkdGgnXSA9IHRydWU7IC8vIGRlZmF1bHQ6IG1lZGl1bVxuICB3aGl0ZUxpc3RbJ2JvcmRlci1zcGFjaW5nJ10gPSB0cnVlOyAvLyBkZWZhdWx0OiAwXG4gIHdoaXRlTGlzdFsnYm9yZGVyLXN0eWxlJ10gPSB0cnVlOyAvLyBkZWZhdWx0OiBkZXBlbmRpbmcgb24gaW5kaXZpZHVhbCBwcm9wZXJ0aWVzXG4gIHdoaXRlTGlzdFsnYm9yZGVyLXRvcCddID0gdHJ1ZTsgLy8gZGVmYXVsdDogZGVwZW5kaW5nIG9uIGluZGl2aWR1YWwgcHJvcGVydGllc1xuICB3aGl0ZUxpc3RbJ2JvcmRlci10b3AtY29sb3InXSA9IHRydWU7IC8vIGRlZmF1bHQ6IGN1cnJlbnQgY29sb3JcbiAgd2hpdGVMaXN0Wydib3JkZXItdG9wLWxlZnQtcmFkaXVzJ10gPSB0cnVlOyAvLyBkZWZhdWx0OiAwXG4gIHdoaXRlTGlzdFsnYm9yZGVyLXRvcC1yaWdodC1yYWRpdXMnXSA9IHRydWU7IC8vIGRlZmF1bHQ6IDBcbiAgd2hpdGVMaXN0Wydib3JkZXItdG9wLXN0eWxlJ10gPSB0cnVlOyAvLyBkZWZhdWx0OiBub25lXG4gIHdoaXRlTGlzdFsnYm9yZGVyLXRvcC13aWR0aCddID0gdHJ1ZTsgLy8gZGVmYXVsdDogbWVkaXVtXG4gIHdoaXRlTGlzdFsnYm9yZGVyLXdpZHRoJ10gPSB0cnVlOyAvLyBkZWZhdWx0OiBkZXBlbmRpbmcgb24gaW5kaXZpZHVhbCBwcm9wZXJ0aWVzXG4gIHdoaXRlTGlzdFsnYm90dG9tJ10gPSBmYWxzZTsgLy8gZGVmYXVsdDogYXV0b1xuICB3aGl0ZUxpc3RbJ2JveC1kZWNvcmF0aW9uLWJyZWFrJ10gPSB0cnVlOyAvLyBkZWZhdWx0OiBzbGljZVxuICB3aGl0ZUxpc3RbJ2JveC1zaGFkb3cnXSA9IHRydWU7IC8vIGRlZmF1bHQ6IG5vbmVcbiAgd2hpdGVMaXN0Wydib3gtc2l6aW5nJ10gPSB0cnVlOyAvLyBkZWZhdWx0OiBjb250ZW50LWJveFxuICB3aGl0ZUxpc3RbJ2JveC1zbmFwJ10gPSB0cnVlOyAvLyBkZWZhdWx0OiBub25lXG4gIHdoaXRlTGlzdFsnYm94LXN1cHByZXNzJ10gPSB0cnVlOyAvLyBkZWZhdWx0OiBzaG93XG4gIHdoaXRlTGlzdFsnYnJlYWstYWZ0ZXInXSA9IHRydWU7IC8vIGRlZmF1bHQ6IGF1dG9cbiAgd2hpdGVMaXN0WydicmVhay1iZWZvcmUnXSA9IHRydWU7IC8vIGRlZmF1bHQ6IGF1dG9cbiAgd2hpdGVMaXN0WydicmVhay1pbnNpZGUnXSA9IHRydWU7IC8vIGRlZmF1bHQ6IGF1dG9cbiAgd2hpdGVMaXN0WydjYXB0aW9uLXNpZGUnXSA9IGZhbHNlOyAvLyBkZWZhdWx0OiB0b3BcbiAgd2hpdGVMaXN0WydjaGFpbnMnXSA9IGZhbHNlOyAvLyBkZWZhdWx0OiBub25lXG4gIHdoaXRlTGlzdFsnY2xlYXInXSA9IHRydWU7IC8vIGRlZmF1bHQ6IG5vbmVcbiAgd2hpdGVMaXN0WydjbGlwJ10gPSBmYWxzZTsgLy8gZGVmYXVsdDogYXV0b1xuICB3aGl0ZUxpc3RbJ2NsaXAtcGF0aCddID0gZmFsc2U7IC8vIGRlZmF1bHQ6IG5vbmVcbiAgd2hpdGVMaXN0WydjbGlwLXJ1bGUnXSA9IGZhbHNlOyAvLyBkZWZhdWx0OiBub256ZXJvXG4gIHdoaXRlTGlzdFsnY29sb3InXSA9IHRydWU7IC8vIGRlZmF1bHQ6IGltcGxlbWVudGF0aW9uIGRlcGVuZGVudFxuICB3aGl0ZUxpc3RbJ2NvbG9yLWludGVycG9sYXRpb24tZmlsdGVycyddID0gdHJ1ZTsgLy8gZGVmYXVsdDogYXV0b1xuICB3aGl0ZUxpc3RbJ2NvbHVtbi1jb3VudCddID0gZmFsc2U7IC8vIGRlZmF1bHQ6IGF1dG9cbiAgd2hpdGVMaXN0Wydjb2x1bW4tZmlsbCddID0gZmFsc2U7IC8vIGRlZmF1bHQ6IGJhbGFuY2VcbiAgd2hpdGVMaXN0Wydjb2x1bW4tZ2FwJ10gPSBmYWxzZTsgLy8gZGVmYXVsdDogbm9ybWFsXG4gIHdoaXRlTGlzdFsnY29sdW1uLXJ1bGUnXSA9IGZhbHNlOyAvLyBkZWZhdWx0OiBkZXBlbmRpbmcgb24gaW5kaXZpZHVhbCBwcm9wZXJ0aWVzXG4gIHdoaXRlTGlzdFsnY29sdW1uLXJ1bGUtY29sb3InXSA9IGZhbHNlOyAvLyBkZWZhdWx0OiBjdXJyZW50IGNvbG9yXG4gIHdoaXRlTGlzdFsnY29sdW1uLXJ1bGUtc3R5bGUnXSA9IGZhbHNlOyAvLyBkZWZhdWx0OiBtZWRpdW1cbiAgd2hpdGVMaXN0Wydjb2x1bW4tcnVsZS13aWR0aCddID0gZmFsc2U7IC8vIGRlZmF1bHQ6IG1lZGl1bVxuICB3aGl0ZUxpc3RbJ2NvbHVtbi1zcGFuJ10gPSBmYWxzZTsgLy8gZGVmYXVsdDogbm9uZVxuICB3aGl0ZUxpc3RbJ2NvbHVtbi13aWR0aCddID0gZmFsc2U7IC8vIGRlZmF1bHQ6IGF1dG9cbiAgd2hpdGVMaXN0Wydjb2x1bW5zJ10gPSBmYWxzZTsgLy8gZGVmYXVsdDogZGVwZW5kaW5nIG9uIGluZGl2aWR1YWwgcHJvcGVydGllc1xuICB3aGl0ZUxpc3RbJ2NvbnRhaW4nXSA9IGZhbHNlOyAvLyBkZWZhdWx0OiBub25lXG4gIHdoaXRlTGlzdFsnY29udGVudCddID0gZmFsc2U7IC8vIGRlZmF1bHQ6IG5vcm1hbFxuICB3aGl0ZUxpc3RbJ2NvdW50ZXItaW5jcmVtZW50J10gPSBmYWxzZTsgLy8gZGVmYXVsdDogbm9uZVxuICB3aGl0ZUxpc3RbJ2NvdW50ZXItcmVzZXQnXSA9IGZhbHNlOyAvLyBkZWZhdWx0OiBub25lXG4gIHdoaXRlTGlzdFsnY291bnRlci1zZXQnXSA9IGZhbHNlOyAvLyBkZWZhdWx0OiBub25lXG4gIHdoaXRlTGlzdFsnY3JvcCddID0gZmFsc2U7IC8vIGRlZmF1bHQ6IGF1dG9cbiAgd2hpdGVMaXN0WydjdWUnXSA9IGZhbHNlOyAvLyBkZWZhdWx0OiBkZXBlbmRpbmcgb24gaW5kaXZpZHVhbCBwcm9wZXJ0aWVzXG4gIHdoaXRlTGlzdFsnY3VlLWFmdGVyJ10gPSBmYWxzZTsgLy8gZGVmYXVsdDogbm9uZVxuICB3aGl0ZUxpc3RbJ2N1ZS1iZWZvcmUnXSA9IGZhbHNlOyAvLyBkZWZhdWx0OiBub25lXG4gIHdoaXRlTGlzdFsnY3Vyc29yJ10gPSBmYWxzZTsgLy8gZGVmYXVsdDogYXV0b1xuICB3aGl0ZUxpc3RbJ2RpcmVjdGlvbiddID0gZmFsc2U7IC8vIGRlZmF1bHQ6IGx0clxuICB3aGl0ZUxpc3RbJ2Rpc3BsYXknXSA9IHRydWU7IC8vIGRlZmF1bHQ6IGRlcGVuZGluZyBvbiBpbmRpdmlkdWFsIHByb3BlcnRpZXNcbiAgd2hpdGVMaXN0WydkaXNwbGF5LWluc2lkZSddID0gdHJ1ZTsgLy8gZGVmYXVsdDogYXV0b1xuICB3aGl0ZUxpc3RbJ2Rpc3BsYXktbGlzdCddID0gdHJ1ZTsgLy8gZGVmYXVsdDogbm9uZVxuICB3aGl0ZUxpc3RbJ2Rpc3BsYXktb3V0c2lkZSddID0gdHJ1ZTsgLy8gZGVmYXVsdDogaW5saW5lLWxldmVsXG4gIHdoaXRlTGlzdFsnZG9taW5hbnQtYmFzZWxpbmUnXSA9IGZhbHNlOyAvLyBkZWZhdWx0OiBhdXRvXG4gIHdoaXRlTGlzdFsnZWxldmF0aW9uJ10gPSBmYWxzZTsgLy8gZGVmYXVsdDogbGV2ZWxcbiAgd2hpdGVMaXN0WydlbXB0eS1jZWxscyddID0gZmFsc2U7IC8vIGRlZmF1bHQ6IHNob3dcbiAgd2hpdGVMaXN0WydmaWx0ZXInXSA9IGZhbHNlOyAvLyBkZWZhdWx0OiBub25lXG4gIHdoaXRlTGlzdFsnZmxleCddID0gZmFsc2U7IC8vIGRlZmF1bHQ6IGRlcGVuZGluZyBvbiBpbmRpdmlkdWFsIHByb3BlcnRpZXNcbiAgd2hpdGVMaXN0WydmbGV4LWJhc2lzJ10gPSBmYWxzZTsgLy8gZGVmYXVsdDogYXV0b1xuICB3aGl0ZUxpc3RbJ2ZsZXgtZGlyZWN0aW9uJ10gPSBmYWxzZTsgLy8gZGVmYXVsdDogcm93XG4gIHdoaXRlTGlzdFsnZmxleC1mbG93J10gPSBmYWxzZTsgLy8gZGVmYXVsdDogZGVwZW5kaW5nIG9uIGluZGl2aWR1YWwgcHJvcGVydGllc1xuICB3aGl0ZUxpc3RbJ2ZsZXgtZ3JvdyddID0gZmFsc2U7IC8vIGRlZmF1bHQ6IDBcbiAgd2hpdGVMaXN0WydmbGV4LXNocmluayddID0gZmFsc2U7IC8vIGRlZmF1bHQ6IDFcbiAgd2hpdGVMaXN0WydmbGV4LXdyYXAnXSA9IGZhbHNlOyAvLyBkZWZhdWx0OiBub3dyYXBcbiAgd2hpdGVMaXN0WydmbG9hdCddID0gZmFsc2U7IC8vIGRlZmF1bHQ6IG5vbmVcbiAgd2hpdGVMaXN0WydmbG9hdC1vZmZzZXQnXSA9IGZhbHNlOyAvLyBkZWZhdWx0OiAwIDBcbiAgd2hpdGVMaXN0WydmbG9vZC1jb2xvciddID0gZmFsc2U7IC8vIGRlZmF1bHQ6IGJsYWNrXG4gIHdoaXRlTGlzdFsnZmxvb2Qtb3BhY2l0eSddID0gZmFsc2U7IC8vIGRlZmF1bHQ6IDFcbiAgd2hpdGVMaXN0WydmbG93LWZyb20nXSA9IGZhbHNlOyAvLyBkZWZhdWx0OiBub25lXG4gIHdoaXRlTGlzdFsnZmxvdy1pbnRvJ10gPSBmYWxzZTsgLy8gZGVmYXVsdDogbm9uZVxuICB3aGl0ZUxpc3RbJ2ZvbnQnXSA9IHRydWU7IC8vIGRlZmF1bHQ6IGRlcGVuZGluZyBvbiBpbmRpdmlkdWFsIHByb3BlcnRpZXNcbiAgd2hpdGVMaXN0Wydmb250LWZhbWlseSddID0gdHJ1ZTsgLy8gZGVmYXVsdDogaW1wbGVtZW50YXRpb24gZGVwZW5kZW50XG4gIHdoaXRlTGlzdFsnZm9udC1mZWF0dXJlLXNldHRpbmdzJ10gPSB0cnVlOyAvLyBkZWZhdWx0OiBub3JtYWxcbiAgd2hpdGVMaXN0Wydmb250LWtlcm5pbmcnXSA9IHRydWU7IC8vIGRlZmF1bHQ6IGF1dG9cbiAgd2hpdGVMaXN0Wydmb250LWxhbmd1YWdlLW92ZXJyaWRlJ10gPSB0cnVlOyAvLyBkZWZhdWx0OiBub3JtYWxcbiAgd2hpdGVMaXN0Wydmb250LXNpemUnXSA9IHRydWU7IC8vIGRlZmF1bHQ6IG1lZGl1bVxuICB3aGl0ZUxpc3RbJ2ZvbnQtc2l6ZS1hZGp1c3QnXSA9IHRydWU7IC8vIGRlZmF1bHQ6IG5vbmVcbiAgd2hpdGVMaXN0Wydmb250LXN0cmV0Y2gnXSA9IHRydWU7IC8vIGRlZmF1bHQ6IG5vcm1hbFxuICB3aGl0ZUxpc3RbJ2ZvbnQtc3R5bGUnXSA9IHRydWU7IC8vIGRlZmF1bHQ6IG5vcm1hbFxuICB3aGl0ZUxpc3RbJ2ZvbnQtc3ludGhlc2lzJ10gPSB0cnVlOyAvLyBkZWZhdWx0OiB3ZWlnaHQgc3R5bGVcbiAgd2hpdGVMaXN0Wydmb250LXZhcmlhbnQnXSA9IHRydWU7IC8vIGRlZmF1bHQ6IG5vcm1hbFxuICB3aGl0ZUxpc3RbJ2ZvbnQtdmFyaWFudC1hbHRlcm5hdGVzJ10gPSB0cnVlOyAvLyBkZWZhdWx0OiBub3JtYWxcbiAgd2hpdGVMaXN0Wydmb250LXZhcmlhbnQtY2FwcyddID0gdHJ1ZTsgLy8gZGVmYXVsdDogbm9ybWFsXG4gIHdoaXRlTGlzdFsnZm9udC12YXJpYW50LWVhc3QtYXNpYW4nXSA9IHRydWU7IC8vIGRlZmF1bHQ6IG5vcm1hbFxuICB3aGl0ZUxpc3RbJ2ZvbnQtdmFyaWFudC1saWdhdHVyZXMnXSA9IHRydWU7IC8vIGRlZmF1bHQ6IG5vcm1hbFxuICB3aGl0ZUxpc3RbJ2ZvbnQtdmFyaWFudC1udW1lcmljJ10gPSB0cnVlOyAvLyBkZWZhdWx0OiBub3JtYWxcbiAgd2hpdGVMaXN0Wydmb250LXZhcmlhbnQtcG9zaXRpb24nXSA9IHRydWU7IC8vIGRlZmF1bHQ6IG5vcm1hbFxuICB3aGl0ZUxpc3RbJ2ZvbnQtd2VpZ2h0J10gPSB0cnVlOyAvLyBkZWZhdWx0OiBub3JtYWxcbiAgd2hpdGVMaXN0WydncmlkJ10gPSBmYWxzZTsgLy8gZGVmYXVsdDogZGVwZW5kaW5nIG9uIGluZGl2aWR1YWwgcHJvcGVydGllc1xuICB3aGl0ZUxpc3RbJ2dyaWQtYXJlYSddID0gZmFsc2U7IC8vIGRlZmF1bHQ6IGRlcGVuZGluZyBvbiBpbmRpdmlkdWFsIHByb3BlcnRpZXNcbiAgd2hpdGVMaXN0WydncmlkLWF1dG8tY29sdW1ucyddID0gZmFsc2U7IC8vIGRlZmF1bHQ6IGF1dG9cbiAgd2hpdGVMaXN0WydncmlkLWF1dG8tZmxvdyddID0gZmFsc2U7IC8vIGRlZmF1bHQ6IG5vbmVcbiAgd2hpdGVMaXN0WydncmlkLWF1dG8tcm93cyddID0gZmFsc2U7IC8vIGRlZmF1bHQ6IGF1dG9cbiAgd2hpdGVMaXN0WydncmlkLWNvbHVtbiddID0gZmFsc2U7IC8vIGRlZmF1bHQ6IGRlcGVuZGluZyBvbiBpbmRpdmlkdWFsIHByb3BlcnRpZXNcbiAgd2hpdGVMaXN0WydncmlkLWNvbHVtbi1lbmQnXSA9IGZhbHNlOyAvLyBkZWZhdWx0OiBhdXRvXG4gIHdoaXRlTGlzdFsnZ3JpZC1jb2x1bW4tc3RhcnQnXSA9IGZhbHNlOyAvLyBkZWZhdWx0OiBhdXRvXG4gIHdoaXRlTGlzdFsnZ3JpZC1yb3cnXSA9IGZhbHNlOyAvLyBkZWZhdWx0OiBkZXBlbmRpbmcgb24gaW5kaXZpZHVhbCBwcm9wZXJ0aWVzXG4gIHdoaXRlTGlzdFsnZ3JpZC1yb3ctZW5kJ10gPSBmYWxzZTsgLy8gZGVmYXVsdDogYXV0b1xuICB3aGl0ZUxpc3RbJ2dyaWQtcm93LXN0YXJ0J10gPSBmYWxzZTsgLy8gZGVmYXVsdDogYXV0b1xuICB3aGl0ZUxpc3RbJ2dyaWQtdGVtcGxhdGUnXSA9IGZhbHNlOyAvLyBkZWZhdWx0OiBkZXBlbmRpbmcgb24gaW5kaXZpZHVhbCBwcm9wZXJ0aWVzXG4gIHdoaXRlTGlzdFsnZ3JpZC10ZW1wbGF0ZS1hcmVhcyddID0gZmFsc2U7IC8vIGRlZmF1bHQ6IG5vbmVcbiAgd2hpdGVMaXN0WydncmlkLXRlbXBsYXRlLWNvbHVtbnMnXSA9IGZhbHNlOyAvLyBkZWZhdWx0OiBub25lXG4gIHdoaXRlTGlzdFsnZ3JpZC10ZW1wbGF0ZS1yb3dzJ10gPSBmYWxzZTsgLy8gZGVmYXVsdDogbm9uZVxuICB3aGl0ZUxpc3RbJ2hhbmdpbmctcHVuY3R1YXRpb24nXSA9IGZhbHNlOyAvLyBkZWZhdWx0OiBub25lXG4gIHdoaXRlTGlzdFsnaGVpZ2h0J10gPSB0cnVlOyAvLyBkZWZhdWx0OiBhdXRvXG4gIHdoaXRlTGlzdFsnaHlwaGVucyddID0gZmFsc2U7IC8vIGRlZmF1bHQ6IG1hbnVhbFxuICB3aGl0ZUxpc3RbJ2ljb24nXSA9IGZhbHNlOyAvLyBkZWZhdWx0OiBhdXRvXG4gIHdoaXRlTGlzdFsnaW1hZ2Utb3JpZW50YXRpb24nXSA9IGZhbHNlOyAvLyBkZWZhdWx0OiBhdXRvXG4gIHdoaXRlTGlzdFsnaW1hZ2UtcmVzb2x1dGlvbiddID0gZmFsc2U7IC8vIGRlZmF1bHQ6IG5vcm1hbFxuICB3aGl0ZUxpc3RbJ2ltZS1tb2RlJ10gPSBmYWxzZTsgLy8gZGVmYXVsdDogYXV0b1xuICB3aGl0ZUxpc3RbJ2luaXRpYWwtbGV0dGVycyddID0gZmFsc2U7IC8vIGRlZmF1bHQ6IG5vcm1hbFxuICB3aGl0ZUxpc3RbJ2lubGluZS1ib3gtYWxpZ24nXSA9IGZhbHNlOyAvLyBkZWZhdWx0OiBsYXN0XG4gIHdoaXRlTGlzdFsnanVzdGlmeS1jb250ZW50J10gPSBmYWxzZTsgLy8gZGVmYXVsdDogYXV0b1xuICB3aGl0ZUxpc3RbJ2p1c3RpZnktaXRlbXMnXSA9IGZhbHNlOyAvLyBkZWZhdWx0OiBhdXRvXG4gIHdoaXRlTGlzdFsnanVzdGlmeS1zZWxmJ10gPSBmYWxzZTsgLy8gZGVmYXVsdDogYXV0b1xuICB3aGl0ZUxpc3RbJ2xlZnQnXSA9IGZhbHNlOyAvLyBkZWZhdWx0OiBhdXRvXG4gIHdoaXRlTGlzdFsnbGV0dGVyLXNwYWNpbmcnXSA9IHRydWU7IC8vIGRlZmF1bHQ6IG5vcm1hbFxuICB3aGl0ZUxpc3RbJ2xpZ2h0aW5nLWNvbG9yJ10gPSB0cnVlOyAvLyBkZWZhdWx0OiB3aGl0ZVxuICB3aGl0ZUxpc3RbJ2xpbmUtYm94LWNvbnRhaW4nXSA9IGZhbHNlOyAvLyBkZWZhdWx0OiBibG9jayBpbmxpbmUgcmVwbGFjZWRcbiAgd2hpdGVMaXN0WydsaW5lLWJyZWFrJ10gPSBmYWxzZTsgLy8gZGVmYXVsdDogYXV0b1xuICB3aGl0ZUxpc3RbJ2xpbmUtZ3JpZCddID0gZmFsc2U7IC8vIGRlZmF1bHQ6IG1hdGNoLXBhcmVudFxuICB3aGl0ZUxpc3RbJ2xpbmUtaGVpZ2h0J10gPSBmYWxzZTsgLy8gZGVmYXVsdDogbm9ybWFsXG4gIHdoaXRlTGlzdFsnbGluZS1zbmFwJ10gPSBmYWxzZTsgLy8gZGVmYXVsdDogbm9uZVxuICB3aGl0ZUxpc3RbJ2xpbmUtc3RhY2tpbmcnXSA9IGZhbHNlOyAvLyBkZWZhdWx0OiBkZXBlbmRpbmcgb24gaW5kaXZpZHVhbCBwcm9wZXJ0aWVzXG4gIHdoaXRlTGlzdFsnbGluZS1zdGFja2luZy1ydWJ5J10gPSBmYWxzZTsgLy8gZGVmYXVsdDogZXhjbHVkZS1ydWJ5XG4gIHdoaXRlTGlzdFsnbGluZS1zdGFja2luZy1zaGlmdCddID0gZmFsc2U7IC8vIGRlZmF1bHQ6IGNvbnNpZGVyLXNoaWZ0c1xuICB3aGl0ZUxpc3RbJ2xpbmUtc3RhY2tpbmctc3RyYXRlZ3knXSA9IGZhbHNlOyAvLyBkZWZhdWx0OiBpbmxpbmUtbGluZS1oZWlnaHRcbiAgd2hpdGVMaXN0WydsaXN0LXN0eWxlJ10gPSB0cnVlOyAvLyBkZWZhdWx0OiBkZXBlbmRpbmcgb24gaW5kaXZpZHVhbCBwcm9wZXJ0aWVzXG4gIHdoaXRlTGlzdFsnbGlzdC1zdHlsZS1pbWFnZSddID0gdHJ1ZTsgLy8gZGVmYXVsdDogbm9uZVxuICB3aGl0ZUxpc3RbJ2xpc3Qtc3R5bGUtcG9zaXRpb24nXSA9IHRydWU7IC8vIGRlZmF1bHQ6IG91dHNpZGVcbiAgd2hpdGVMaXN0WydsaXN0LXN0eWxlLXR5cGUnXSA9IHRydWU7IC8vIGRlZmF1bHQ6IGRpc2NcbiAgd2hpdGVMaXN0WydtYXJnaW4nXSA9IHRydWU7IC8vIGRlZmF1bHQ6IGRlcGVuZGluZyBvbiBpbmRpdmlkdWFsIHByb3BlcnRpZXNcbiAgd2hpdGVMaXN0WydtYXJnaW4tYm90dG9tJ10gPSB0cnVlOyAvLyBkZWZhdWx0OiAwXG4gIHdoaXRlTGlzdFsnbWFyZ2luLWxlZnQnXSA9IHRydWU7IC8vIGRlZmF1bHQ6IDBcbiAgd2hpdGVMaXN0WydtYXJnaW4tcmlnaHQnXSA9IHRydWU7IC8vIGRlZmF1bHQ6IDBcbiAgd2hpdGVMaXN0WydtYXJnaW4tdG9wJ10gPSB0cnVlOyAvLyBkZWZhdWx0OiAwXG4gIHdoaXRlTGlzdFsnbWFya2VyLW9mZnNldCddID0gZmFsc2U7IC8vIGRlZmF1bHQ6IGF1dG9cbiAgd2hpdGVMaXN0WydtYXJrZXItc2lkZSddID0gZmFsc2U7IC8vIGRlZmF1bHQ6IGxpc3QtaXRlbVxuICB3aGl0ZUxpc3RbJ21hcmtzJ10gPSBmYWxzZTsgLy8gZGVmYXVsdDogbm9uZVxuICB3aGl0ZUxpc3RbJ21hc2snXSA9IGZhbHNlOyAvLyBkZWZhdWx0OiBib3JkZXItYm94XG4gIHdoaXRlTGlzdFsnbWFzay1ib3gnXSA9IGZhbHNlOyAvLyBkZWZhdWx0OiBzZWUgaW5kaXZpZHVhbCBwcm9wZXJ0aWVzXG4gIHdoaXRlTGlzdFsnbWFzay1ib3gtb3V0c2V0J10gPSBmYWxzZTsgLy8gZGVmYXVsdDogMFxuICB3aGl0ZUxpc3RbJ21hc2stYm94LXJlcGVhdCddID0gZmFsc2U7IC8vIGRlZmF1bHQ6IHN0cmV0Y2hcbiAgd2hpdGVMaXN0WydtYXNrLWJveC1zbGljZSddID0gZmFsc2U7IC8vIGRlZmF1bHQ6IDAgZmlsbFxuICB3aGl0ZUxpc3RbJ21hc2stYm94LXNvdXJjZSddID0gZmFsc2U7IC8vIGRlZmF1bHQ6IG5vbmVcbiAgd2hpdGVMaXN0WydtYXNrLWJveC13aWR0aCddID0gZmFsc2U7IC8vIGRlZmF1bHQ6IGF1dG9cbiAgd2hpdGVMaXN0WydtYXNrLWNsaXAnXSA9IGZhbHNlOyAvLyBkZWZhdWx0OiBib3JkZXItYm94XG4gIHdoaXRlTGlzdFsnbWFzay1pbWFnZSddID0gZmFsc2U7IC8vIGRlZmF1bHQ6IG5vbmVcbiAgd2hpdGVMaXN0WydtYXNrLW9yaWdpbiddID0gZmFsc2U7IC8vIGRlZmF1bHQ6IGJvcmRlci1ib3hcbiAgd2hpdGVMaXN0WydtYXNrLXBvc2l0aW9uJ10gPSBmYWxzZTsgLy8gZGVmYXVsdDogY2VudGVyXG4gIHdoaXRlTGlzdFsnbWFzay1yZXBlYXQnXSA9IGZhbHNlOyAvLyBkZWZhdWx0OiBuby1yZXBlYXRcbiAgd2hpdGVMaXN0WydtYXNrLXNpemUnXSA9IGZhbHNlOyAvLyBkZWZhdWx0OiBib3JkZXItYm94XG4gIHdoaXRlTGlzdFsnbWFzay1zb3VyY2UtdHlwZSddID0gZmFsc2U7IC8vIGRlZmF1bHQ6IGF1dG9cbiAgd2hpdGVMaXN0WydtYXNrLXR5cGUnXSA9IGZhbHNlOyAvLyBkZWZhdWx0OiBsdW1pbmFuY2VcbiAgd2hpdGVMaXN0WydtYXgtaGVpZ2h0J10gPSB0cnVlOyAvLyBkZWZhdWx0OiBub25lXG4gIHdoaXRlTGlzdFsnbWF4LWxpbmVzJ10gPSBmYWxzZTsgLy8gZGVmYXVsdDogbm9uZVxuICB3aGl0ZUxpc3RbJ21heC13aWR0aCddID0gdHJ1ZTsgLy8gZGVmYXVsdDogbm9uZVxuICB3aGl0ZUxpc3RbJ21pbi1oZWlnaHQnXSA9IHRydWU7IC8vIGRlZmF1bHQ6IDBcbiAgd2hpdGVMaXN0WydtaW4td2lkdGgnXSA9IHRydWU7IC8vIGRlZmF1bHQ6IDBcbiAgd2hpdGVMaXN0Wydtb3ZlLXRvJ10gPSBmYWxzZTsgLy8gZGVmYXVsdDogbm9ybWFsXG4gIHdoaXRlTGlzdFsnbmF2LWRvd24nXSA9IGZhbHNlOyAvLyBkZWZhdWx0OiBhdXRvXG4gIHdoaXRlTGlzdFsnbmF2LWluZGV4J10gPSBmYWxzZTsgLy8gZGVmYXVsdDogYXV0b1xuICB3aGl0ZUxpc3RbJ25hdi1sZWZ0J10gPSBmYWxzZTsgLy8gZGVmYXVsdDogYXV0b1xuICB3aGl0ZUxpc3RbJ25hdi1yaWdodCddID0gZmFsc2U7IC8vIGRlZmF1bHQ6IGF1dG9cbiAgd2hpdGVMaXN0WyduYXYtdXAnXSA9IGZhbHNlOyAvLyBkZWZhdWx0OiBhdXRvXG4gIHdoaXRlTGlzdFsnb2JqZWN0LWZpdCddID0gZmFsc2U7IC8vIGRlZmF1bHQ6IGZpbGxcbiAgd2hpdGVMaXN0WydvYmplY3QtcG9zaXRpb24nXSA9IGZhbHNlOyAvLyBkZWZhdWx0OiA1MCUgNTAlXG4gIHdoaXRlTGlzdFsnb3BhY2l0eSddID0gZmFsc2U7IC8vIGRlZmF1bHQ6IDFcbiAgd2hpdGVMaXN0WydvcmRlciddID0gZmFsc2U7IC8vIGRlZmF1bHQ6IDBcbiAgd2hpdGVMaXN0WydvcnBoYW5zJ10gPSBmYWxzZTsgLy8gZGVmYXVsdDogMlxuICB3aGl0ZUxpc3RbJ291dGxpbmUnXSA9IGZhbHNlOyAvLyBkZWZhdWx0OiBkZXBlbmRpbmcgb24gaW5kaXZpZHVhbCBwcm9wZXJ0aWVzXG4gIHdoaXRlTGlzdFsnb3V0bGluZS1jb2xvciddID0gZmFsc2U7IC8vIGRlZmF1bHQ6IGludmVydFxuICB3aGl0ZUxpc3RbJ291dGxpbmUtb2Zmc2V0J10gPSBmYWxzZTsgLy8gZGVmYXVsdDogMFxuICB3aGl0ZUxpc3RbJ291dGxpbmUtc3R5bGUnXSA9IGZhbHNlOyAvLyBkZWZhdWx0OiBub25lXG4gIHdoaXRlTGlzdFsnb3V0bGluZS13aWR0aCddID0gZmFsc2U7IC8vIGRlZmF1bHQ6IG1lZGl1bVxuICB3aGl0ZUxpc3RbJ292ZXJmbG93J10gPSBmYWxzZTsgLy8gZGVmYXVsdDogZGVwZW5kaW5nIG9uIGluZGl2aWR1YWwgcHJvcGVydGllc1xuICB3aGl0ZUxpc3RbJ292ZXJmbG93LXdyYXAnXSA9IGZhbHNlOyAvLyBkZWZhdWx0OiBub3JtYWxcbiAgd2hpdGVMaXN0WydvdmVyZmxvdy14J10gPSBmYWxzZTsgLy8gZGVmYXVsdDogdmlzaWJsZVxuICB3aGl0ZUxpc3RbJ292ZXJmbG93LXknXSA9IGZhbHNlOyAvLyBkZWZhdWx0OiB2aXNpYmxlXG4gIHdoaXRlTGlzdFsncGFkZGluZyddID0gdHJ1ZTsgLy8gZGVmYXVsdDogZGVwZW5kaW5nIG9uIGluZGl2aWR1YWwgcHJvcGVydGllc1xuICB3aGl0ZUxpc3RbJ3BhZGRpbmctYm90dG9tJ10gPSB0cnVlOyAvLyBkZWZhdWx0OiAwXG4gIHdoaXRlTGlzdFsncGFkZGluZy1sZWZ0J10gPSB0cnVlOyAvLyBkZWZhdWx0OiAwXG4gIHdoaXRlTGlzdFsncGFkZGluZy1yaWdodCddID0gdHJ1ZTsgLy8gZGVmYXVsdDogMFxuICB3aGl0ZUxpc3RbJ3BhZGRpbmctdG9wJ10gPSB0cnVlOyAvLyBkZWZhdWx0OiAwXG4gIHdoaXRlTGlzdFsncGFnZSddID0gZmFsc2U7IC8vIGRlZmF1bHQ6IGF1dG9cbiAgd2hpdGVMaXN0WydwYWdlLWJyZWFrLWFmdGVyJ10gPSBmYWxzZTsgLy8gZGVmYXVsdDogYXV0b1xuICB3aGl0ZUxpc3RbJ3BhZ2UtYnJlYWstYmVmb3JlJ10gPSBmYWxzZTsgLy8gZGVmYXVsdDogYXV0b1xuICB3aGl0ZUxpc3RbJ3BhZ2UtYnJlYWstaW5zaWRlJ10gPSBmYWxzZTsgLy8gZGVmYXVsdDogYXV0b1xuICB3aGl0ZUxpc3RbJ3BhZ2UtcG9saWN5J10gPSBmYWxzZTsgLy8gZGVmYXVsdDogc3RhcnRcbiAgd2hpdGVMaXN0WydwYXVzZSddID0gZmFsc2U7IC8vIGRlZmF1bHQ6IGltcGxlbWVudGF0aW9uIGRlcGVuZGVudFxuICB3aGl0ZUxpc3RbJ3BhdXNlLWFmdGVyJ10gPSBmYWxzZTsgLy8gZGVmYXVsdDogaW1wbGVtZW50YXRpb24gZGVwZW5kZW50XG4gIHdoaXRlTGlzdFsncGF1c2UtYmVmb3JlJ10gPSBmYWxzZTsgLy8gZGVmYXVsdDogaW1wbGVtZW50YXRpb24gZGVwZW5kZW50XG4gIHdoaXRlTGlzdFsncGVyc3BlY3RpdmUnXSA9IGZhbHNlOyAvLyBkZWZhdWx0OiBub25lXG4gIHdoaXRlTGlzdFsncGVyc3BlY3RpdmUtb3JpZ2luJ10gPSBmYWxzZTsgLy8gZGVmYXVsdDogNTAlIDUwJVxuICB3aGl0ZUxpc3RbJ3BpdGNoJ10gPSBmYWxzZTsgLy8gZGVmYXVsdDogbWVkaXVtXG4gIHdoaXRlTGlzdFsncGl0Y2gtcmFuZ2UnXSA9IGZhbHNlOyAvLyBkZWZhdWx0OiA1MFxuICB3aGl0ZUxpc3RbJ3BsYXktZHVyaW5nJ10gPSBmYWxzZTsgLy8gZGVmYXVsdDogYXV0b1xuICB3aGl0ZUxpc3RbJ3Bvc2l0aW9uJ10gPSBmYWxzZTsgLy8gZGVmYXVsdDogc3RhdGljXG4gIHdoaXRlTGlzdFsncHJlc2VudGF0aW9uLWxldmVsJ10gPSBmYWxzZTsgLy8gZGVmYXVsdDogMFxuICB3aGl0ZUxpc3RbJ3F1b3RlcyddID0gZmFsc2U7IC8vIGRlZmF1bHQ6IHRleHRcbiAgd2hpdGVMaXN0WydyZWdpb24tZnJhZ21lbnQnXSA9IGZhbHNlOyAvLyBkZWZhdWx0OiBhdXRvXG4gIHdoaXRlTGlzdFsncmVzaXplJ10gPSBmYWxzZTsgLy8gZGVmYXVsdDogbm9uZVxuICB3aGl0ZUxpc3RbJ3Jlc3QnXSA9IGZhbHNlOyAvLyBkZWZhdWx0OiBkZXBlbmRpbmcgb24gaW5kaXZpZHVhbCBwcm9wZXJ0aWVzXG4gIHdoaXRlTGlzdFsncmVzdC1hZnRlciddID0gZmFsc2U7IC8vIGRlZmF1bHQ6IG5vbmVcbiAgd2hpdGVMaXN0WydyZXN0LWJlZm9yZSddID0gZmFsc2U7IC8vIGRlZmF1bHQ6IG5vbmVcbiAgd2hpdGVMaXN0WydyaWNobmVzcyddID0gZmFsc2U7IC8vIGRlZmF1bHQ6IDUwXG4gIHdoaXRlTGlzdFsncmlnaHQnXSA9IGZhbHNlOyAvLyBkZWZhdWx0OiBhdXRvXG4gIHdoaXRlTGlzdFsncm90YXRpb24nXSA9IGZhbHNlOyAvLyBkZWZhdWx0OiAwXG4gIHdoaXRlTGlzdFsncm90YXRpb24tcG9pbnQnXSA9IGZhbHNlOyAvLyBkZWZhdWx0OiA1MCUgNTAlXG4gIHdoaXRlTGlzdFsncnVieS1hbGlnbiddID0gZmFsc2U7IC8vIGRlZmF1bHQ6IGF1dG9cbiAgd2hpdGVMaXN0WydydWJ5LW1lcmdlJ10gPSBmYWxzZTsgLy8gZGVmYXVsdDogc2VwYXJhdGVcbiAgd2hpdGVMaXN0WydydWJ5LXBvc2l0aW9uJ10gPSBmYWxzZTsgLy8gZGVmYXVsdDogYmVmb3JlXG4gIHdoaXRlTGlzdFsnc2hhcGUtaW1hZ2UtdGhyZXNob2xkJ10gPSBmYWxzZTsgLy8gZGVmYXVsdDogMC4wXG4gIHdoaXRlTGlzdFsnc2hhcGUtb3V0c2lkZSddID0gZmFsc2U7IC8vIGRlZmF1bHQ6IG5vbmVcbiAgd2hpdGVMaXN0WydzaGFwZS1tYXJnaW4nXSA9IGZhbHNlOyAvLyBkZWZhdWx0OiAwXG4gIHdoaXRlTGlzdFsnc2l6ZSddID0gZmFsc2U7IC8vIGRlZmF1bHQ6IGF1dG9cbiAgd2hpdGVMaXN0WydzcGVhayddID0gZmFsc2U7IC8vIGRlZmF1bHQ6IGF1dG9cbiAgd2hpdGVMaXN0WydzcGVhay1hcyddID0gZmFsc2U7IC8vIGRlZmF1bHQ6IG5vcm1hbFxuICB3aGl0ZUxpc3RbJ3NwZWFrLWhlYWRlciddID0gZmFsc2U7IC8vIGRlZmF1bHQ6IG9uY2VcbiAgd2hpdGVMaXN0WydzcGVhay1udW1lcmFsJ10gPSBmYWxzZTsgLy8gZGVmYXVsdDogY29udGludW91c1xuICB3aGl0ZUxpc3RbJ3NwZWFrLXB1bmN0dWF0aW9uJ10gPSBmYWxzZTsgLy8gZGVmYXVsdDogbm9uZVxuICB3aGl0ZUxpc3RbJ3NwZWVjaC1yYXRlJ10gPSBmYWxzZTsgLy8gZGVmYXVsdDogbWVkaXVtXG4gIHdoaXRlTGlzdFsnc3RyZXNzJ10gPSBmYWxzZTsgLy8gZGVmYXVsdDogNTBcbiAgd2hpdGVMaXN0WydzdHJpbmctc2V0J10gPSBmYWxzZTsgLy8gZGVmYXVsdDogbm9uZVxuICB3aGl0ZUxpc3RbJ3RhYi1zaXplJ10gPSBmYWxzZTsgLy8gZGVmYXVsdDogOFxuICB3aGl0ZUxpc3RbJ3RhYmxlLWxheW91dCddID0gZmFsc2U7IC8vIGRlZmF1bHQ6IGF1dG9cbiAgd2hpdGVMaXN0Wyd0ZXh0LWFsaWduJ10gPSB0cnVlOyAvLyBkZWZhdWx0OiBzdGFydFxuICB3aGl0ZUxpc3RbJ3RleHQtYWxpZ24tbGFzdCddID0gdHJ1ZTsgLy8gZGVmYXVsdDogYXV0b1xuICB3aGl0ZUxpc3RbJ3RleHQtY29tYmluZS11cHJpZ2h0J10gPSB0cnVlOyAvLyBkZWZhdWx0OiBub25lXG4gIHdoaXRlTGlzdFsndGV4dC1kZWNvcmF0aW9uJ10gPSB0cnVlOyAvLyBkZWZhdWx0OiBub25lXG4gIHdoaXRlTGlzdFsndGV4dC1kZWNvcmF0aW9uLWNvbG9yJ10gPSB0cnVlOyAvLyBkZWZhdWx0OiBjdXJyZW50Q29sb3JcbiAgd2hpdGVMaXN0Wyd0ZXh0LWRlY29yYXRpb24tbGluZSddID0gdHJ1ZTsgLy8gZGVmYXVsdDogbm9uZVxuICB3aGl0ZUxpc3RbJ3RleHQtZGVjb3JhdGlvbi1za2lwJ10gPSB0cnVlOyAvLyBkZWZhdWx0OiBvYmplY3RzXG4gIHdoaXRlTGlzdFsndGV4dC1kZWNvcmF0aW9uLXN0eWxlJ10gPSB0cnVlOyAvLyBkZWZhdWx0OiBzb2xpZFxuICB3aGl0ZUxpc3RbJ3RleHQtZW1waGFzaXMnXSA9IHRydWU7IC8vIGRlZmF1bHQ6IGRlcGVuZGluZyBvbiBpbmRpdmlkdWFsIHByb3BlcnRpZXNcbiAgd2hpdGVMaXN0Wyd0ZXh0LWVtcGhhc2lzLWNvbG9yJ10gPSB0cnVlOyAvLyBkZWZhdWx0OiBjdXJyZW50Q29sb3JcbiAgd2hpdGVMaXN0Wyd0ZXh0LWVtcGhhc2lzLXBvc2l0aW9uJ10gPSB0cnVlOyAvLyBkZWZhdWx0OiBvdmVyIHJpZ2h0XG4gIHdoaXRlTGlzdFsndGV4dC1lbXBoYXNpcy1zdHlsZSddID0gdHJ1ZTsgLy8gZGVmYXVsdDogbm9uZVxuICB3aGl0ZUxpc3RbJ3RleHQtaGVpZ2h0J10gPSB0cnVlOyAvLyBkZWZhdWx0OiBhdXRvXG4gIHdoaXRlTGlzdFsndGV4dC1pbmRlbnQnXSA9IHRydWU7IC8vIGRlZmF1bHQ6IDBcbiAgd2hpdGVMaXN0Wyd0ZXh0LWp1c3RpZnknXSA9IHRydWU7IC8vIGRlZmF1bHQ6IGF1dG9cbiAgd2hpdGVMaXN0Wyd0ZXh0LW9yaWVudGF0aW9uJ10gPSB0cnVlOyAvLyBkZWZhdWx0OiBtaXhlZFxuICB3aGl0ZUxpc3RbJ3RleHQtb3ZlcmZsb3cnXSA9IHRydWU7IC8vIGRlZmF1bHQ6IGNsaXBcbiAgd2hpdGVMaXN0Wyd0ZXh0LXNoYWRvdyddID0gdHJ1ZTsgLy8gZGVmYXVsdDogbm9uZVxuICB3aGl0ZUxpc3RbJ3RleHQtc3BhY2UtY29sbGFwc2UnXSA9IHRydWU7IC8vIGRlZmF1bHQ6IGNvbGxhcHNlXG4gIHdoaXRlTGlzdFsndGV4dC10cmFuc2Zvcm0nXSA9IHRydWU7IC8vIGRlZmF1bHQ6IG5vbmVcbiAgd2hpdGVMaXN0Wyd0ZXh0LXVuZGVybGluZS1wb3NpdGlvbiddID0gdHJ1ZTsgLy8gZGVmYXVsdDogYXV0b1xuICB3aGl0ZUxpc3RbJ3RleHQtd3JhcCddID0gdHJ1ZTsgLy8gZGVmYXVsdDogbm9ybWFsXG4gIHdoaXRlTGlzdFsndG9wJ10gPSBmYWxzZTsgLy8gZGVmYXVsdDogYXV0b1xuICB3aGl0ZUxpc3RbJ3RyYW5zZm9ybSddID0gZmFsc2U7IC8vIGRlZmF1bHQ6IG5vbmVcbiAgd2hpdGVMaXN0Wyd0cmFuc2Zvcm0tb3JpZ2luJ10gPSBmYWxzZTsgLy8gZGVmYXVsdDogNTAlIDUwJSAwXG4gIHdoaXRlTGlzdFsndHJhbnNmb3JtLXN0eWxlJ10gPSBmYWxzZTsgLy8gZGVmYXVsdDogZmxhdFxuICB3aGl0ZUxpc3RbJ3RyYW5zaXRpb24nXSA9IGZhbHNlOyAvLyBkZWZhdWx0OiBkZXBlbmRpbmcgb24gaW5kaXZpZHVhbCBwcm9wZXJ0aWVzXG4gIHdoaXRlTGlzdFsndHJhbnNpdGlvbi1kZWxheSddID0gZmFsc2U7IC8vIGRlZmF1bHQ6IDBzXG4gIHdoaXRlTGlzdFsndHJhbnNpdGlvbi1kdXJhdGlvbiddID0gZmFsc2U7IC8vIGRlZmF1bHQ6IDBzXG4gIHdoaXRlTGlzdFsndHJhbnNpdGlvbi1wcm9wZXJ0eSddID0gZmFsc2U7IC8vIGRlZmF1bHQ6IGFsbFxuICB3aGl0ZUxpc3RbJ3RyYW5zaXRpb24tdGltaW5nLWZ1bmN0aW9uJ10gPSBmYWxzZTsgLy8gZGVmYXVsdDogZWFzZVxuICB3aGl0ZUxpc3RbJ3VuaWNvZGUtYmlkaSddID0gZmFsc2U7IC8vIGRlZmF1bHQ6IG5vcm1hbFxuICB3aGl0ZUxpc3RbJ3ZlcnRpY2FsLWFsaWduJ10gPSBmYWxzZTsgLy8gZGVmYXVsdDogYmFzZWxpbmVcbiAgd2hpdGVMaXN0Wyd2aXNpYmlsaXR5J10gPSBmYWxzZTsgLy8gZGVmYXVsdDogdmlzaWJsZVxuICB3aGl0ZUxpc3RbJ3ZvaWNlLWJhbGFuY2UnXSA9IGZhbHNlOyAvLyBkZWZhdWx0OiBjZW50ZXJcbiAgd2hpdGVMaXN0Wyd2b2ljZS1kdXJhdGlvbiddID0gZmFsc2U7IC8vIGRlZmF1bHQ6IGF1dG9cbiAgd2hpdGVMaXN0Wyd2b2ljZS1mYW1pbHknXSA9IGZhbHNlOyAvLyBkZWZhdWx0OiBpbXBsZW1lbnRhdGlvbiBkZXBlbmRlbnRcbiAgd2hpdGVMaXN0Wyd2b2ljZS1waXRjaCddID0gZmFsc2U7IC8vIGRlZmF1bHQ6IG1lZGl1bVxuICB3aGl0ZUxpc3RbJ3ZvaWNlLXJhbmdlJ10gPSBmYWxzZTsgLy8gZGVmYXVsdDogbWVkaXVtXG4gIHdoaXRlTGlzdFsndm9pY2UtcmF0ZSddID0gZmFsc2U7IC8vIGRlZmF1bHQ6IG5vcm1hbFxuICB3aGl0ZUxpc3RbJ3ZvaWNlLXN0cmVzcyddID0gZmFsc2U7IC8vIGRlZmF1bHQ6IG5vcm1hbFxuICB3aGl0ZUxpc3RbJ3ZvaWNlLXZvbHVtZSddID0gZmFsc2U7IC8vIGRlZmF1bHQ6IG1lZGl1bVxuICB3aGl0ZUxpc3RbJ3ZvbHVtZSddID0gZmFsc2U7IC8vIGRlZmF1bHQ6IG1lZGl1bVxuICB3aGl0ZUxpc3RbJ3doaXRlLXNwYWNlJ10gPSBmYWxzZTsgLy8gZGVmYXVsdDogbm9ybWFsXG4gIHdoaXRlTGlzdFsnd2lkb3dzJ10gPSBmYWxzZTsgLy8gZGVmYXVsdDogMlxuICB3aGl0ZUxpc3RbJ3dpZHRoJ10gPSB0cnVlOyAvLyBkZWZhdWx0OiBhdXRvXG4gIHdoaXRlTGlzdFsnd2lsbC1jaGFuZ2UnXSA9IGZhbHNlOyAvLyBkZWZhdWx0OiBhdXRvXG4gIHdoaXRlTGlzdFsnd29yZC1icmVhayddID0gdHJ1ZTsgLy8gZGVmYXVsdDogbm9ybWFsXG4gIHdoaXRlTGlzdFsnd29yZC1zcGFjaW5nJ10gPSB0cnVlOyAvLyBkZWZhdWx0OiBub3JtYWxcbiAgd2hpdGVMaXN0Wyd3b3JkLXdyYXAnXSA9IHRydWU7IC8vIGRlZmF1bHQ6IG5vcm1hbFxuICB3aGl0ZUxpc3RbJ3dyYXAtZmxvdyddID0gZmFsc2U7IC8vIGRlZmF1bHQ6IGF1dG9cbiAgd2hpdGVMaXN0Wyd3cmFwLXRocm91Z2gnXSA9IGZhbHNlOyAvLyBkZWZhdWx0OiB3cmFwXG4gIHdoaXRlTGlzdFsnd3JpdGluZy1tb2RlJ10gPSBmYWxzZTsgLy8gZGVmYXVsdDogaG9yaXpvbnRhbC10YlxuICB3aGl0ZUxpc3RbJ3otaW5kZXgnXSA9IGZhbHNlOyAvLyBkZWZhdWx0OiBhdXRvXG5cbiAgcmV0dXJuIHdoaXRlTGlzdDtcbn1cblxuXG4vKipcbiAqIOWMuemFjeWIsOeZveWQjeWNleS4iueahOS4gOS4quWxnuaAp+aXtlxuICpcbiAqIEBwYXJhbSB7U3RyaW5nfSBuYW1lXG4gKiBAcGFyYW0ge1N0cmluZ30gdmFsdWVcbiAqIEBwYXJhbSB7T2JqZWN0fSBvcHRpb25zXG4gKiBAcmV0dXJuIHtTdHJpbmd9XG4gKi9cbmZ1bmN0aW9uIG9uQXR0ciAobmFtZSwgdmFsdWUsIG9wdGlvbnMpIHtcbiAgLy8gZG8gbm90aGluZ1xufVxuXG4vKipcbiAqIOWMuemFjeWIsOS4jeWcqOeZveWQjeWNleS4iueahOS4gOS4quWxnuaAp+aXtlxuICpcbiAqIEBwYXJhbSB7U3RyaW5nfSBuYW1lXG4gKiBAcGFyYW0ge1N0cmluZ30gdmFsdWVcbiAqIEBwYXJhbSB7T2JqZWN0fSBvcHRpb25zXG4gKiBAcmV0dXJuIHtTdHJpbmd9XG4gKi9cbmZ1bmN0aW9uIG9uSWdub3JlQXR0ciAobmFtZSwgdmFsdWUsIG9wdGlvbnMpIHtcbiAgLy8gZG8gbm90aGluZ1xufVxuXG52YXIgUkVHRVhQX1VSTF9KQVZBU0NSSVBUID0gL2phdmFzY3JpcHRcXHMqXFw6L2ltZztcblxuLyoqXG4gKiDov4fmu6TlsZ7mgKflgLxcbiAqXG4gKiBAcGFyYW0ge1N0cmluZ30gbmFtZVxuICogQHBhcmFtIHtTdHJpbmd9IHZhbHVlXG4gKiBAcmV0dXJuIHtTdHJpbmd9XG4gKi9cbmZ1bmN0aW9uIHNhZmVBdHRyVmFsdWUobmFtZSwgdmFsdWUpIHtcbiAgaWYgKFJFR0VYUF9VUkxfSkFWQVNDUklQVC50ZXN0KHZhbHVlKSkgcmV0dXJuICcnO1xuICByZXR1cm4gdmFsdWU7XG59XG5cblxuZXhwb3J0cy53aGl0ZUxpc3QgPSBnZXREZWZhdWx0V2hpdGVMaXN0KCk7XG5leHBvcnRzLmdldERlZmF1bHRXaGl0ZUxpc3QgPSBnZXREZWZhdWx0V2hpdGVMaXN0O1xuZXhwb3J0cy5vbkF0dHIgPSBvbkF0dHI7XG5leHBvcnRzLm9uSWdub3JlQXR0ciA9IG9uSWdub3JlQXR0cjtcbmV4cG9ydHMuc2FmZUF0dHJWYWx1ZSA9IHNhZmVBdHRyVmFsdWU7XG4iLCIvKipcbiAqIGNzc2ZpbHRlclxuICpcbiAqIEBhdXRob3Ig6ICB6Zu3PGxlaXpvbmdtaW5AZ21haWwuY29tPlxuICovXG5cbnZhciBERUZBVUxUID0gcmVxdWlyZSgnLi9kZWZhdWx0Jyk7XG52YXIgRmlsdGVyQ1NTID0gcmVxdWlyZSgnLi9jc3MnKTtcblxuXG4vKipcbiAqIFhTU+i/h+a7pFxuICpcbiAqIEBwYXJhbSB7U3RyaW5nfSBjc3Mg6KaB6L+H5ruk55qEQ1NT5Luj56CBXG4gKiBAcGFyYW0ge09iamVjdH0gb3B0aW9ucyDpgInpobnvvJp3aGl0ZUxpc3QsIG9uQXR0ciwgb25JZ25vcmVBdHRyXG4gKiBAcmV0dXJuIHtTdHJpbmd9XG4gKi9cbmZ1bmN0aW9uIGZpbHRlckNTUyAoaHRtbCwgb3B0aW9ucykge1xuICB2YXIgeHNzID0gbmV3IEZpbHRlckNTUyhvcHRpb25zKTtcbiAgcmV0dXJuIHhzcy5wcm9jZXNzKGh0bWwpO1xufVxuXG5cbi8vIOi+k+WHulxuZXhwb3J0cyA9IG1vZHVsZS5leHBvcnRzID0gZmlsdGVyQ1NTO1xuZXhwb3J0cy5GaWx0ZXJDU1MgPSBGaWx0ZXJDU1M7XG5mb3IgKHZhciBpIGluIERFRkFVTFQpIGV4cG9ydHNbaV0gPSBERUZBVUxUW2ldO1xuXG4vLyDlnKjmtY/op4jlmajnq6/kvb/nlKhcbmlmICh0eXBlb2Ygd2luZG93ICE9PSAndW5kZWZpbmVkJykge1xuICB3aW5kb3cuZmlsdGVyQ1NTID0gbW9kdWxlLmV4cG9ydHM7XG59XG4iLCIvKipcbiAqIGNzc2ZpbHRlclxuICpcbiAqIEBhdXRob3Ig6ICB6Zu3PGxlaXpvbmdtaW5AZ21haWwuY29tPlxuICovXG5cbnZhciBfID0gcmVxdWlyZSgnLi91dGlsJyk7XG5cblxuLyoqXG4gKiDop6PmnpBzdHlsZVxuICpcbiAqIEBwYXJhbSB7U3RyaW5nfSBjc3NcbiAqIEBwYXJhbSB7RnVuY3Rpb259IG9uQXR0ciDlpITnkIblsZ7mgKfnmoTlh73mlbBcbiAqICAg5Y+C5pWw5qC85byP77yaIGZ1bmN0aW9uIChzb3VyY2VQb3NpdGlvbiwgcG9zaXRpb24sIG5hbWUsIHZhbHVlLCBzb3VyY2UpXG4gKiBAcmV0dXJuIHtTdHJpbmd9XG4gKi9cbmZ1bmN0aW9uIHBhcnNlU3R5bGUgKGNzcywgb25BdHRyKSB7XG4gIGNzcyA9IF8udHJpbVJpZ2h0KGNzcyk7XG4gIGlmIChjc3NbY3NzLmxlbmd0aCAtIDFdICE9PSAnOycpIGNzcyArPSAnOyc7XG4gIHZhciBjc3NMZW5ndGggPSBjc3MubGVuZ3RoO1xuICB2YXIgaXNQYXJlbnRoZXNpc09wZW4gPSBmYWxzZTtcbiAgdmFyIGxhc3RQb3MgPSAwO1xuICB2YXIgaSA9IDA7XG4gIHZhciByZXRDU1MgPSAnJztcblxuICBmdW5jdGlvbiBhZGROZXdBdHRyICgpIHtcbiAgICAvLyDlpoLmnpzmsqHmnInmraPluLjnmoTpl63lkIjlnIbmi6zlj7fvvIzliJnnm7TmjqXlv73nlaXlvZPliY3lsZ7mgKdcbiAgICBpZiAoIWlzUGFyZW50aGVzaXNPcGVuKSB7XG4gICAgICB2YXIgc291cmNlID0gXy50cmltKGNzcy5zbGljZShsYXN0UG9zLCBpKSk7XG4gICAgICB2YXIgaiA9IHNvdXJjZS5pbmRleE9mKCc6Jyk7XG4gICAgICBpZiAoaiAhPT0gLTEpIHtcbiAgICAgICAgdmFyIG5hbWUgPSBfLnRyaW0oc291cmNlLnNsaWNlKDAsIGopKTtcbiAgICAgICAgdmFyIHZhbHVlID0gXy50cmltKHNvdXJjZS5zbGljZShqICsgMSkpO1xuICAgICAgICAvLyDlv4XpobvmnInlsZ7mgKflkI3np7BcbiAgICAgICAgaWYgKG5hbWUpIHtcbiAgICAgICAgICB2YXIgcmV0ID0gb25BdHRyKGxhc3RQb3MsIHJldENTUy5sZW5ndGgsIG5hbWUsIHZhbHVlLCBzb3VyY2UpO1xuICAgICAgICAgIGlmIChyZXQpIHJldENTUyArPSByZXQgKyAnOyAnO1xuICAgICAgICB9XG4gICAgICB9XG4gICAgfVxuICAgIGxhc3RQb3MgPSBpICsgMTtcbiAgfVxuXG4gIGZvciAoOyBpIDwgY3NzTGVuZ3RoOyBpKyspIHtcbiAgICB2YXIgYyA9IGNzc1tpXTtcbiAgICBpZiAoYyA9PT0gJy8nICYmIGNzc1tpICsgMV0gPT09ICcqJykge1xuICAgICAgLy8g5aSH5rOo5byA5aeLXG4gICAgICB2YXIgaiA9IGNzcy5pbmRleE9mKCcqLycsIGkgKyAyKTtcbiAgICAgIC8vIOWmguaenOayoeacieato+W4uOeahOWkh+azqOe7k+adn++8jOWImeWQjumdoueahOmDqOWIhuWFqOmDqOi3s+i/h1xuICAgICAgaWYgKGogPT09IC0xKSBicmVhaztcbiAgICAgIC8vIOebtOaOpeWwhuW9k+WJjeS9jee9ruiwg+WIsOWkh+azqOe7k+Wwvu+8jOW5tuS4lOWIneWni+WMlueKtuaAgVxuICAgICAgaSA9IGogKyAxO1xuICAgICAgbGFzdFBvcyA9IGkgKyAxO1xuICAgICAgaXNQYXJlbnRoZXNpc09wZW4gPSBmYWxzZTtcbiAgICB9IGVsc2UgaWYgKGMgPT09ICcoJykge1xuICAgICAgaXNQYXJlbnRoZXNpc09wZW4gPSB0cnVlO1xuICAgIH0gZWxzZSBpZiAoYyA9PT0gJyknKSB7XG4gICAgICBpc1BhcmVudGhlc2lzT3BlbiA9IGZhbHNlO1xuICAgIH0gZWxzZSBpZiAoYyA9PT0gJzsnKSB7XG4gICAgICBpZiAoaXNQYXJlbnRoZXNpc09wZW4pIHtcbiAgICAgICAgLy8g5Zyo5ZyG5ous5Y+36YeM6Z2i77yM5b+955WlXG4gICAgICB9IGVsc2Uge1xuICAgICAgICBhZGROZXdBdHRyKCk7XG4gICAgICB9XG4gICAgfSBlbHNlIGlmIChjID09PSAnXFxuJykge1xuICAgICAgYWRkTmV3QXR0cigpO1xuICAgIH1cbiAgfVxuXG4gIHJldHVybiBfLnRyaW0ocmV0Q1NTKTtcbn1cblxubW9kdWxlLmV4cG9ydHMgPSBwYXJzZVN0eWxlO1xuIiwibW9kdWxlLmV4cG9ydHMgPSB7XG4gIGluZGV4T2Y6IGZ1bmN0aW9uIChhcnIsIGl0ZW0pIHtcbiAgICB2YXIgaSwgajtcbiAgICBpZiAoQXJyYXkucHJvdG90eXBlLmluZGV4T2YpIHtcbiAgICAgIHJldHVybiBhcnIuaW5kZXhPZihpdGVtKTtcbiAgICB9XG4gICAgZm9yIChpID0gMCwgaiA9IGFyci5sZW5ndGg7IGkgPCBqOyBpKyspIHtcbiAgICAgIGlmIChhcnJbaV0gPT09IGl0ZW0pIHtcbiAgICAgICAgcmV0dXJuIGk7XG4gICAgICB9XG4gICAgfVxuICAgIHJldHVybiAtMTtcbiAgfSxcbiAgZm9yRWFjaDogZnVuY3Rpb24gKGFyciwgZm4sIHNjb3BlKSB7XG4gICAgdmFyIGksIGo7XG4gICAgaWYgKEFycmF5LnByb3RvdHlwZS5mb3JFYWNoKSB7XG4gICAgICByZXR1cm4gYXJyLmZvckVhY2goZm4sIHNjb3BlKTtcbiAgICB9XG4gICAgZm9yIChpID0gMCwgaiA9IGFyci5sZW5ndGg7IGkgPCBqOyBpKyspIHtcbiAgICAgIGZuLmNhbGwoc2NvcGUsIGFycltpXSwgaSwgYXJyKTtcbiAgICB9XG4gIH0sXG4gIHRyaW06IGZ1bmN0aW9uIChzdHIpIHtcbiAgICBpZiAoU3RyaW5nLnByb3RvdHlwZS50cmltKSB7XG4gICAgICByZXR1cm4gc3RyLnRyaW0oKTtcbiAgICB9XG4gICAgcmV0dXJuIHN0ci5yZXBsYWNlKC8oXlxccyopfChcXHMqJCkvZywgJycpO1xuICB9LFxuICB0cmltUmlnaHQ6IGZ1bmN0aW9uIChzdHIpIHtcbiAgICBpZiAoU3RyaW5nLnByb3RvdHlwZS50cmltUmlnaHQpIHtcbiAgICAgIHJldHVybiBzdHIudHJpbVJpZ2h0KCk7XG4gICAgfVxuICAgIHJldHVybiBzdHIucmVwbGFjZSgvKFxccyokKS9nLCAnJyk7XG4gIH1cbn07XG4iLCIoZnVuY3Rpb24oYSxiKXtpZihcImZ1bmN0aW9uXCI9PXR5cGVvZiBkZWZpbmUmJmRlZmluZS5hbWQpZGVmaW5lKFtdLGIpO2Vsc2UgaWYoXCJ1bmRlZmluZWRcIiE9dHlwZW9mIGV4cG9ydHMpYigpO2Vsc2V7YigpLGEuRmlsZVNhdmVyPXtleHBvcnRzOnt9fS5leHBvcnRzfX0pKHRoaXMsZnVuY3Rpb24oKXtcInVzZSBzdHJpY3RcIjtmdW5jdGlvbiBiKGEsYil7cmV0dXJuXCJ1bmRlZmluZWRcIj09dHlwZW9mIGI/Yj17YXV0b0JvbTohMX06XCJvYmplY3RcIiE9dHlwZW9mIGImJihjb25zb2xlLndhcm4oXCJEZXByZWNhdGVkOiBFeHBlY3RlZCB0aGlyZCBhcmd1bWVudCB0byBiZSBhIG9iamVjdFwiKSxiPXthdXRvQm9tOiFifSksYi5hdXRvQm9tJiYvXlxccyooPzp0ZXh0XFwvXFxTKnxhcHBsaWNhdGlvblxcL3htbHxcXFMqXFwvXFxTKlxcK3htbClcXHMqOy4qY2hhcnNldFxccyo9XFxzKnV0Zi04L2kudGVzdChhLnR5cGUpP25ldyBCbG9iKFtcIlxcdUZFRkZcIixhXSx7dHlwZTphLnR5cGV9KTphfWZ1bmN0aW9uIGMoYSxiLGMpe3ZhciBkPW5ldyBYTUxIdHRwUmVxdWVzdDtkLm9wZW4oXCJHRVRcIixhKSxkLnJlc3BvbnNlVHlwZT1cImJsb2JcIixkLm9ubG9hZD1mdW5jdGlvbigpe2coZC5yZXNwb25zZSxiLGMpfSxkLm9uZXJyb3I9ZnVuY3Rpb24oKXtjb25zb2xlLmVycm9yKFwiY291bGQgbm90IGRvd25sb2FkIGZpbGVcIil9LGQuc2VuZCgpfWZ1bmN0aW9uIGQoYSl7dmFyIGI9bmV3IFhNTEh0dHBSZXF1ZXN0O2Iub3BlbihcIkhFQURcIixhLCExKTt0cnl7Yi5zZW5kKCl9Y2F0Y2goYSl7fXJldHVybiAyMDA8PWIuc3RhdHVzJiYyOTk+PWIuc3RhdHVzfWZ1bmN0aW9uIGUoYSl7dHJ5e2EuZGlzcGF0Y2hFdmVudChuZXcgTW91c2VFdmVudChcImNsaWNrXCIpKX1jYXRjaChjKXt2YXIgYj1kb2N1bWVudC5jcmVhdGVFdmVudChcIk1vdXNlRXZlbnRzXCIpO2IuaW5pdE1vdXNlRXZlbnQoXCJjbGlja1wiLCEwLCEwLHdpbmRvdywwLDAsMCw4MCwyMCwhMSwhMSwhMSwhMSwwLG51bGwpLGEuZGlzcGF0Y2hFdmVudChiKX19dmFyIGY9XCJvYmplY3RcIj09dHlwZW9mIHdpbmRvdyYmd2luZG93LndpbmRvdz09PXdpbmRvdz93aW5kb3c6XCJvYmplY3RcIj09dHlwZW9mIHNlbGYmJnNlbGYuc2VsZj09PXNlbGY/c2VsZjpcIm9iamVjdFwiPT10eXBlb2YgZ2xvYmFsJiZnbG9iYWwuZ2xvYmFsPT09Z2xvYmFsP2dsb2JhbDp2b2lkIDAsYT1mLm5hdmlnYXRvciYmL01hY2ludG9zaC8udGVzdChuYXZpZ2F0b3IudXNlckFnZW50KSYmL0FwcGxlV2ViS2l0Ly50ZXN0KG5hdmlnYXRvci51c2VyQWdlbnQpJiYhL1NhZmFyaS8udGVzdChuYXZpZ2F0b3IudXNlckFnZW50KSxnPWYuc2F2ZUFzfHwoXCJvYmplY3RcIiE9dHlwZW9mIHdpbmRvd3x8d2luZG93IT09Zj9mdW5jdGlvbigpe306XCJkb3dubG9hZFwiaW4gSFRNTEFuY2hvckVsZW1lbnQucHJvdG90eXBlJiYhYT9mdW5jdGlvbihiLGcsaCl7dmFyIGk9Zi5VUkx8fGYud2Via2l0VVJMLGo9ZG9jdW1lbnQuY3JlYXRlRWxlbWVudChcImFcIik7Zz1nfHxiLm5hbWV8fFwiZG93bmxvYWRcIixqLmRvd25sb2FkPWcsai5yZWw9XCJub29wZW5lclwiLFwic3RyaW5nXCI9PXR5cGVvZiBiPyhqLmhyZWY9YixqLm9yaWdpbj09PWxvY2F0aW9uLm9yaWdpbj9lKGopOmQoai5ocmVmKT9jKGIsZyxoKTplKGosai50YXJnZXQ9XCJfYmxhbmtcIikpOihqLmhyZWY9aS5jcmVhdGVPYmplY3RVUkwoYiksc2V0VGltZW91dChmdW5jdGlvbigpe2kucmV2b2tlT2JqZWN0VVJMKGouaHJlZil9LDRFNCksc2V0VGltZW91dChmdW5jdGlvbigpe2Uoail9LDApKX06XCJtc1NhdmVPck9wZW5CbG9iXCJpbiBuYXZpZ2F0b3I/ZnVuY3Rpb24oZixnLGgpe2lmKGc9Z3x8Zi5uYW1lfHxcImRvd25sb2FkXCIsXCJzdHJpbmdcIiE9dHlwZW9mIGYpbmF2aWdhdG9yLm1zU2F2ZU9yT3BlbkJsb2IoYihmLGgpLGcpO2Vsc2UgaWYoZChmKSljKGYsZyxoKTtlbHNle3ZhciBpPWRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoXCJhXCIpO2kuaHJlZj1mLGkudGFyZ2V0PVwiX2JsYW5rXCIsc2V0VGltZW91dChmdW5jdGlvbigpe2UoaSl9KX19OmZ1bmN0aW9uKGIsZCxlLGcpe2lmKGc9Z3x8b3BlbihcIlwiLFwiX2JsYW5rXCIpLGcmJihnLmRvY3VtZW50LnRpdGxlPWcuZG9jdW1lbnQuYm9keS5pbm5lclRleHQ9XCJkb3dubG9hZGluZy4uLlwiKSxcInN0cmluZ1wiPT10eXBlb2YgYilyZXR1cm4gYyhiLGQsZSk7dmFyIGg9XCJhcHBsaWNhdGlvbi9vY3RldC1zdHJlYW1cIj09PWIudHlwZSxpPS9jb25zdHJ1Y3Rvci9pLnRlc3QoZi5IVE1MRWxlbWVudCl8fGYuc2FmYXJpLGo9L0NyaU9TXFwvW1xcZF0rLy50ZXN0KG5hdmlnYXRvci51c2VyQWdlbnQpO2lmKChqfHxoJiZpfHxhKSYmXCJ1bmRlZmluZWRcIiE9dHlwZW9mIEZpbGVSZWFkZXIpe3ZhciBrPW5ldyBGaWxlUmVhZGVyO2sub25sb2FkZW5kPWZ1bmN0aW9uKCl7dmFyIGE9ay5yZXN1bHQ7YT1qP2E6YS5yZXBsYWNlKC9eZGF0YTpbXjtdKjsvLFwiZGF0YTphdHRhY2htZW50L2ZpbGU7XCIpLGc/Zy5sb2NhdGlvbi5ocmVmPWE6bG9jYXRpb249YSxnPW51bGx9LGsucmVhZEFzRGF0YVVSTChiKX1lbHNle3ZhciBsPWYuVVJMfHxmLndlYmtpdFVSTCxtPWwuY3JlYXRlT2JqZWN0VVJMKGIpO2c/Zy5sb2NhdGlvbj1tOmxvY2F0aW9uLmhyZWY9bSxnPW51bGwsc2V0VGltZW91dChmdW5jdGlvbigpe2wucmV2b2tlT2JqZWN0VVJMKG0pfSw0RTQpfX0pO2Yuc2F2ZUFzPWcuc2F2ZUFzPWcsXCJ1bmRlZmluZWRcIiE9dHlwZW9mIG1vZHVsZSYmKG1vZHVsZS5leHBvcnRzPWcpfSk7XG5cbi8vIyBzb3VyY2VNYXBwaW5nVVJMPUZpbGVTYXZlci5taW4uanMubWFwIiwiIWZ1bmN0aW9uKHQsZSl7XCJvYmplY3RcIj09dHlwZW9mIGV4cG9ydHMmJlwib2JqZWN0XCI9PXR5cGVvZiBtb2R1bGU/bW9kdWxlLmV4cG9ydHM9ZSgpOlwiZnVuY3Rpb25cIj09dHlwZW9mIGRlZmluZSYmZGVmaW5lLmFtZD9kZWZpbmUoW10sZSk6XCJvYmplY3RcIj09dHlwZW9mIGV4cG9ydHM/ZXhwb3J0cy5zd2FsPWUoKTp0LnN3YWw9ZSgpfSh0aGlzLGZ1bmN0aW9uKCl7cmV0dXJuIGZ1bmN0aW9uKHQpe2Z1bmN0aW9uIGUobyl7aWYobltvXSlyZXR1cm4gbltvXS5leHBvcnRzO3ZhciByPW5bb109e2k6byxsOiExLGV4cG9ydHM6e319O3JldHVybiB0W29dLmNhbGwoci5leHBvcnRzLHIsci5leHBvcnRzLGUpLHIubD0hMCxyLmV4cG9ydHN9dmFyIG49e307cmV0dXJuIGUubT10LGUuYz1uLGUuZD1mdW5jdGlvbih0LG4sbyl7ZS5vKHQsbil8fE9iamVjdC5kZWZpbmVQcm9wZXJ0eSh0LG4se2NvbmZpZ3VyYWJsZTohMSxlbnVtZXJhYmxlOiEwLGdldDpvfSl9LGUubj1mdW5jdGlvbih0KXt2YXIgbj10JiZ0Ll9fZXNNb2R1bGU/ZnVuY3Rpb24oKXtyZXR1cm4gdC5kZWZhdWx0fTpmdW5jdGlvbigpe3JldHVybiB0fTtyZXR1cm4gZS5kKG4sXCJhXCIsbiksbn0sZS5vPWZ1bmN0aW9uKHQsZSl7cmV0dXJuIE9iamVjdC5wcm90b3R5cGUuaGFzT3duUHJvcGVydHkuY2FsbCh0LGUpfSxlLnA9XCJcIixlKGUucz04KX0oW2Z1bmN0aW9uKHQsZSxuKXtcInVzZSBzdHJpY3RcIjtPYmplY3QuZGVmaW5lUHJvcGVydHkoZSxcIl9fZXNNb2R1bGVcIix7dmFsdWU6ITB9KTt2YXIgbz1cInN3YWwtYnV0dG9uXCI7ZS5DTEFTU19OQU1FUz17TU9EQUw6XCJzd2FsLW1vZGFsXCIsT1ZFUkxBWTpcInN3YWwtb3ZlcmxheVwiLFNIT1dfTU9EQUw6XCJzd2FsLW92ZXJsYXktLXNob3ctbW9kYWxcIixNT0RBTF9USVRMRTpcInN3YWwtdGl0bGVcIixNT0RBTF9URVhUOlwic3dhbC10ZXh0XCIsSUNPTjpcInN3YWwtaWNvblwiLElDT05fQ1VTVE9NOlwic3dhbC1pY29uLS1jdXN0b21cIixDT05URU5UOlwic3dhbC1jb250ZW50XCIsRk9PVEVSOlwic3dhbC1mb290ZXJcIixCVVRUT05fQ09OVEFJTkVSOlwic3dhbC1idXR0b24tY29udGFpbmVyXCIsQlVUVE9OOm8sQ09ORklSTV9CVVRUT046bytcIi0tY29uZmlybVwiLENBTkNFTF9CVVRUT046bytcIi0tY2FuY2VsXCIsREFOR0VSX0JVVFRPTjpvK1wiLS1kYW5nZXJcIixCVVRUT05fTE9BRElORzpvK1wiLS1sb2FkaW5nXCIsQlVUVE9OX0xPQURFUjpvK1wiX19sb2FkZXJcIn0sZS5kZWZhdWx0PWUuQ0xBU1NfTkFNRVN9LGZ1bmN0aW9uKHQsZSxuKXtcInVzZSBzdHJpY3RcIjtPYmplY3QuZGVmaW5lUHJvcGVydHkoZSxcIl9fZXNNb2R1bGVcIix7dmFsdWU6ITB9KSxlLmdldE5vZGU9ZnVuY3Rpb24odCl7dmFyIGU9XCIuXCIrdDtyZXR1cm4gZG9jdW1lbnQucXVlcnlTZWxlY3RvcihlKX0sZS5zdHJpbmdUb05vZGU9ZnVuY3Rpb24odCl7dmFyIGU9ZG9jdW1lbnQuY3JlYXRlRWxlbWVudChcImRpdlwiKTtyZXR1cm4gZS5pbm5lckhUTUw9dC50cmltKCksZS5maXJzdENoaWxkfSxlLmluc2VydEFmdGVyPWZ1bmN0aW9uKHQsZSl7dmFyIG49ZS5uZXh0U2libGluZztlLnBhcmVudE5vZGUuaW5zZXJ0QmVmb3JlKHQsbil9LGUucmVtb3ZlTm9kZT1mdW5jdGlvbih0KXt0LnBhcmVudEVsZW1lbnQucmVtb3ZlQ2hpbGQodCl9LGUudGhyb3dFcnI9ZnVuY3Rpb24odCl7dGhyb3cgdD10LnJlcGxhY2UoLyArKD89ICkvZyxcIlwiKSxcIlN3ZWV0QWxlcnQ6IFwiKyh0PXQudHJpbSgpKX0sZS5pc1BsYWluT2JqZWN0PWZ1bmN0aW9uKHQpe2lmKFwiW29iamVjdCBPYmplY3RdXCIhPT1PYmplY3QucHJvdG90eXBlLnRvU3RyaW5nLmNhbGwodCkpcmV0dXJuITE7dmFyIGU9T2JqZWN0LmdldFByb3RvdHlwZU9mKHQpO3JldHVybiBudWxsPT09ZXx8ZT09PU9iamVjdC5wcm90b3R5cGV9LGUub3JkaW5hbFN1ZmZpeE9mPWZ1bmN0aW9uKHQpe3ZhciBlPXQlMTAsbj10JTEwMDtyZXR1cm4gMT09PWUmJjExIT09bj90K1wic3RcIjoyPT09ZSYmMTIhPT1uP3QrXCJuZFwiOjM9PT1lJiYxMyE9PW4/dCtcInJkXCI6dCtcInRoXCJ9fSxmdW5jdGlvbih0LGUsbil7XCJ1c2Ugc3RyaWN0XCI7ZnVuY3Rpb24gbyh0KXtmb3IodmFyIG4gaW4gdCllLmhhc093blByb3BlcnR5KG4pfHwoZVtuXT10W25dKX1PYmplY3QuZGVmaW5lUHJvcGVydHkoZSxcIl9fZXNNb2R1bGVcIix7dmFsdWU6ITB9KSxvKG4oMjUpKTt2YXIgcj1uKDI2KTtlLm92ZXJsYXlNYXJrdXA9ci5kZWZhdWx0LG8obigyNykpLG8obigyOCkpLG8obigyOSkpO3ZhciBpPW4oMCksYT1pLmRlZmF1bHQuTU9EQUxfVElUTEUscz1pLmRlZmF1bHQuTU9EQUxfVEVYVCxjPWkuZGVmYXVsdC5JQ09OLGw9aS5kZWZhdWx0LkZPT1RFUjtlLmljb25NYXJrdXA9J1xcbiAgPGRpdiBjbGFzcz1cIicrYysnXCI+PC9kaXY+JyxlLnRpdGxlTWFya3VwPSdcXG4gIDxkaXYgY2xhc3M9XCInK2ErJ1wiPjwvZGl2PlxcbicsZS50ZXh0TWFya3VwPSdcXG4gIDxkaXYgY2xhc3M9XCInK3MrJ1wiPjwvZGl2PicsZS5mb290ZXJNYXJrdXA9J1xcbiAgPGRpdiBjbGFzcz1cIicrbCsnXCI+PC9kaXY+XFxuJ30sZnVuY3Rpb24odCxlLG4pe1widXNlIHN0cmljdFwiO09iamVjdC5kZWZpbmVQcm9wZXJ0eShlLFwiX19lc01vZHVsZVwiLHt2YWx1ZTohMH0pO3ZhciBvPW4oMSk7ZS5DT05GSVJNX0tFWT1cImNvbmZpcm1cIixlLkNBTkNFTF9LRVk9XCJjYW5jZWxcIjt2YXIgcj17dmlzaWJsZTohMCx0ZXh0Om51bGwsdmFsdWU6bnVsbCxjbGFzc05hbWU6XCJcIixjbG9zZU1vZGFsOiEwfSxpPU9iamVjdC5hc3NpZ24oe30scix7dmlzaWJsZTohMSx0ZXh0OlwiQ2FuY2VsXCIsdmFsdWU6bnVsbH0pLGE9T2JqZWN0LmFzc2lnbih7fSxyLHt0ZXh0OlwiT0tcIix2YWx1ZTohMH0pO2UuZGVmYXVsdEJ1dHRvbkxpc3Q9e2NhbmNlbDppLGNvbmZpcm06YX07dmFyIHM9ZnVuY3Rpb24odCl7c3dpdGNoKHQpe2Nhc2UgZS5DT05GSVJNX0tFWTpyZXR1cm4gYTtjYXNlIGUuQ0FOQ0VMX0tFWTpyZXR1cm4gaTtkZWZhdWx0OnZhciBuPXQuY2hhckF0KDApLnRvVXBwZXJDYXNlKCkrdC5zbGljZSgxKTtyZXR1cm4gT2JqZWN0LmFzc2lnbih7fSxyLHt0ZXh0Om4sdmFsdWU6dH0pfX0sYz1mdW5jdGlvbih0LGUpe3ZhciBuPXModCk7cmV0dXJuITA9PT1lP09iamVjdC5hc3NpZ24oe30sbix7dmlzaWJsZTohMH0pOlwic3RyaW5nXCI9PXR5cGVvZiBlP09iamVjdC5hc3NpZ24oe30sbix7dmlzaWJsZTohMCx0ZXh0OmV9KTpvLmlzUGxhaW5PYmplY3QoZSk/T2JqZWN0LmFzc2lnbih7dmlzaWJsZTohMH0sbixlKTpPYmplY3QuYXNzaWduKHt9LG4se3Zpc2libGU6ITF9KX0sbD1mdW5jdGlvbih0KXtmb3IodmFyIGU9e30sbj0wLG89T2JqZWN0LmtleXModCk7bjxvLmxlbmd0aDtuKyspe3ZhciByPW9bbl0sYT10W3JdLHM9YyhyLGEpO2Vbcl09c31yZXR1cm4gZS5jYW5jZWx8fChlLmNhbmNlbD1pKSxlfSx1PWZ1bmN0aW9uKHQpe3ZhciBuPXt9O3N3aXRjaCh0Lmxlbmd0aCl7Y2FzZSAxOm5bZS5DQU5DRUxfS0VZXT1PYmplY3QuYXNzaWduKHt9LGkse3Zpc2libGU6ITF9KTticmVhaztjYXNlIDI6bltlLkNBTkNFTF9LRVldPWMoZS5DQU5DRUxfS0VZLHRbMF0pLG5bZS5DT05GSVJNX0tFWV09YyhlLkNPTkZJUk1fS0VZLHRbMV0pO2JyZWFrO2RlZmF1bHQ6by50aHJvd0VycihcIkludmFsaWQgbnVtYmVyIG9mICdidXR0b25zJyBpbiBhcnJheSAoXCIrdC5sZW5ndGgrXCIpLlxcbiAgICAgIElmIHlvdSB3YW50IG1vcmUgdGhhbiAyIGJ1dHRvbnMsIHlvdSBuZWVkIHRvIHVzZSBhbiBvYmplY3QhXCIpfXJldHVybiBufTtlLmdldEJ1dHRvbkxpc3RPcHRzPWZ1bmN0aW9uKHQpe3ZhciBuPWUuZGVmYXVsdEJ1dHRvbkxpc3Q7cmV0dXJuXCJzdHJpbmdcIj09dHlwZW9mIHQ/bltlLkNPTkZJUk1fS0VZXT1jKGUuQ09ORklSTV9LRVksdCk6QXJyYXkuaXNBcnJheSh0KT9uPXUodCk6by5pc1BsYWluT2JqZWN0KHQpP249bCh0KTohMD09PXQ/bj11KFshMCwhMF0pOiExPT09dD9uPXUoWyExLCExXSk6dm9pZCAwPT09dCYmKG49ZS5kZWZhdWx0QnV0dG9uTGlzdCksbn19LGZ1bmN0aW9uKHQsZSxuKXtcInVzZSBzdHJpY3RcIjtPYmplY3QuZGVmaW5lUHJvcGVydHkoZSxcIl9fZXNNb2R1bGVcIix7dmFsdWU6ITB9KTt2YXIgbz1uKDEpLHI9bigyKSxpPW4oMCksYT1pLmRlZmF1bHQuTU9EQUwscz1pLmRlZmF1bHQuT1ZFUkxBWSxjPW4oMzApLGw9bigzMSksdT1uKDMyKSxmPW4oMzMpO2UuaW5qZWN0RWxJbnRvTW9kYWw9ZnVuY3Rpb24odCl7dmFyIGU9by5nZXROb2RlKGEpLG49by5zdHJpbmdUb05vZGUodCk7cmV0dXJuIGUuYXBwZW5kQ2hpbGQobiksbn07dmFyIGQ9ZnVuY3Rpb24odCl7dC5jbGFzc05hbWU9YSx0LnRleHRDb250ZW50PVwiXCJ9LHA9ZnVuY3Rpb24odCxlKXtkKHQpO3ZhciBuPWUuY2xhc3NOYW1lO24mJnQuY2xhc3NMaXN0LmFkZChuKX07ZS5pbml0TW9kYWxDb250ZW50PWZ1bmN0aW9uKHQpe3ZhciBlPW8uZ2V0Tm9kZShhKTtwKGUsdCksYy5kZWZhdWx0KHQuaWNvbiksbC5pbml0VGl0bGUodC50aXRsZSksbC5pbml0VGV4dCh0LnRleHQpLGYuZGVmYXVsdCh0LmNvbnRlbnQpLHUuZGVmYXVsdCh0LmJ1dHRvbnMsdC5kYW5nZXJNb2RlKX07dmFyIG09ZnVuY3Rpb24oKXt2YXIgdD1vLmdldE5vZGUocyksZT1vLnN0cmluZ1RvTm9kZShyLm1vZGFsTWFya3VwKTt0LmFwcGVuZENoaWxkKGUpfTtlLmRlZmF1bHQ9bX0sZnVuY3Rpb24odCxlLG4pe1widXNlIHN0cmljdFwiO09iamVjdC5kZWZpbmVQcm9wZXJ0eShlLFwiX19lc01vZHVsZVwiLHt2YWx1ZTohMH0pO3ZhciBvPW4oMykscj17aXNPcGVuOiExLHByb21pc2U6bnVsbCxhY3Rpb25zOnt9LHRpbWVyOm51bGx9LGk9T2JqZWN0LmFzc2lnbih7fSxyKTtlLnJlc2V0U3RhdGU9ZnVuY3Rpb24oKXtpPU9iamVjdC5hc3NpZ24oe30scil9LGUuc2V0QWN0aW9uVmFsdWU9ZnVuY3Rpb24odCl7aWYoXCJzdHJpbmdcIj09dHlwZW9mIHQpcmV0dXJuIGEoby5DT05GSVJNX0tFWSx0KTtmb3IodmFyIGUgaW4gdClhKGUsdFtlXSl9O3ZhciBhPWZ1bmN0aW9uKHQsZSl7aS5hY3Rpb25zW3RdfHwoaS5hY3Rpb25zW3RdPXt9KSxPYmplY3QuYXNzaWduKGkuYWN0aW9uc1t0XSx7dmFsdWU6ZX0pfTtlLnNldEFjdGlvbk9wdGlvbnNGb3I9ZnVuY3Rpb24odCxlKXt2YXIgbj0odm9pZCAwPT09ZT97fTplKS5jbG9zZU1vZGFsLG89dm9pZCAwPT09bnx8bjtPYmplY3QuYXNzaWduKGkuYWN0aW9uc1t0XSx7Y2xvc2VNb2RhbDpvfSl9LGUuZGVmYXVsdD1pfSxmdW5jdGlvbih0LGUsbil7XCJ1c2Ugc3RyaWN0XCI7T2JqZWN0LmRlZmluZVByb3BlcnR5KGUsXCJfX2VzTW9kdWxlXCIse3ZhbHVlOiEwfSk7dmFyIG89bigxKSxyPW4oMyksaT1uKDApLGE9aS5kZWZhdWx0Lk9WRVJMQVkscz1pLmRlZmF1bHQuU0hPV19NT0RBTCxjPWkuZGVmYXVsdC5CVVRUT04sbD1pLmRlZmF1bHQuQlVUVE9OX0xPQURJTkcsdT1uKDUpO2Uub3Blbk1vZGFsPWZ1bmN0aW9uKCl7by5nZXROb2RlKGEpLmNsYXNzTGlzdC5hZGQocyksdS5kZWZhdWx0LmlzT3Blbj0hMH07dmFyIGY9ZnVuY3Rpb24oKXtvLmdldE5vZGUoYSkuY2xhc3NMaXN0LnJlbW92ZShzKSx1LmRlZmF1bHQuaXNPcGVuPSExfTtlLm9uQWN0aW9uPWZ1bmN0aW9uKHQpe3ZvaWQgMD09PXQmJih0PXIuQ0FOQ0VMX0tFWSk7dmFyIGU9dS5kZWZhdWx0LmFjdGlvbnNbdF0sbj1lLnZhbHVlO2lmKCExPT09ZS5jbG9zZU1vZGFsKXt2YXIgaT1jK1wiLS1cIit0O28uZ2V0Tm9kZShpKS5jbGFzc0xpc3QuYWRkKGwpfWVsc2UgZigpO3UuZGVmYXVsdC5wcm9taXNlLnJlc29sdmUobil9LGUuZ2V0U3RhdGU9ZnVuY3Rpb24oKXt2YXIgdD1PYmplY3QuYXNzaWduKHt9LHUuZGVmYXVsdCk7cmV0dXJuIGRlbGV0ZSB0LnByb21pc2UsZGVsZXRlIHQudGltZXIsdH0sZS5zdG9wTG9hZGluZz1mdW5jdGlvbigpe2Zvcih2YXIgdD1kb2N1bWVudC5xdWVyeVNlbGVjdG9yQWxsKFwiLlwiK2MpLGU9MDtlPHQubGVuZ3RoO2UrKyl7dFtlXS5jbGFzc0xpc3QucmVtb3ZlKGwpfX19LGZ1bmN0aW9uKHQsZSl7dmFyIG47bj1mdW5jdGlvbigpe3JldHVybiB0aGlzfSgpO3RyeXtuPW58fEZ1bmN0aW9uKFwicmV0dXJuIHRoaXNcIikoKXx8KDAsZXZhbCkoXCJ0aGlzXCIpfWNhdGNoKHQpe1wib2JqZWN0XCI9PXR5cGVvZiB3aW5kb3cmJihuPXdpbmRvdyl9dC5leHBvcnRzPW59LGZ1bmN0aW9uKHQsZSxuKXsoZnVuY3Rpb24oZSl7dC5leHBvcnRzPWUuc3dlZXRBbGVydD1uKDkpfSkuY2FsbChlLG4oNykpfSxmdW5jdGlvbih0LGUsbil7KGZ1bmN0aW9uKGUpe3QuZXhwb3J0cz1lLnN3YWw9bigxMCl9KS5jYWxsKGUsbig3KSl9LGZ1bmN0aW9uKHQsZSxuKXtcInVuZGVmaW5lZFwiIT10eXBlb2Ygd2luZG93JiZuKDExKSxuKDE2KTt2YXIgbz1uKDIzKS5kZWZhdWx0O3QuZXhwb3J0cz1vfSxmdW5jdGlvbih0LGUsbil7dmFyIG89bigxMik7XCJzdHJpbmdcIj09dHlwZW9mIG8mJihvPVtbdC5pLG8sXCJcIl1dKTt2YXIgcj17aW5zZXJ0QXQ6XCJ0b3BcIn07ci50cmFuc2Zvcm09dm9pZCAwO24oMTQpKG8scik7by5sb2NhbHMmJih0LmV4cG9ydHM9by5sb2NhbHMpfSxmdW5jdGlvbih0LGUsbil7ZT10LmV4cG9ydHM9bigxMykodm9pZCAwKSxlLnB1c2goW3QuaSwnLnN3YWwtaWNvbi0tZXJyb3J7Ym9yZGVyLWNvbG9yOiNmMjc0NzQ7LXdlYmtpdC1hbmltYXRpb246YW5pbWF0ZUVycm9ySWNvbiAuNXM7YW5pbWF0aW9uOmFuaW1hdGVFcnJvckljb24gLjVzfS5zd2FsLWljb24tLWVycm9yX194LW1hcmt7cG9zaXRpb246cmVsYXRpdmU7ZGlzcGxheTpibG9jazstd2Via2l0LWFuaW1hdGlvbjphbmltYXRlWE1hcmsgLjVzO2FuaW1hdGlvbjphbmltYXRlWE1hcmsgLjVzfS5zd2FsLWljb24tLWVycm9yX19saW5le3Bvc2l0aW9uOmFic29sdXRlO2hlaWdodDo1cHg7d2lkdGg6NDdweDtiYWNrZ3JvdW5kLWNvbG9yOiNmMjc0NzQ7ZGlzcGxheTpibG9jazt0b3A6MzdweDtib3JkZXItcmFkaXVzOjJweH0uc3dhbC1pY29uLS1lcnJvcl9fbGluZS0tbGVmdHstd2Via2l0LXRyYW5zZm9ybTpyb3RhdGUoNDVkZWcpO3RyYW5zZm9ybTpyb3RhdGUoNDVkZWcpO2xlZnQ6MTdweH0uc3dhbC1pY29uLS1lcnJvcl9fbGluZS0tcmlnaHR7LXdlYmtpdC10cmFuc2Zvcm06cm90YXRlKC00NWRlZyk7dHJhbnNmb3JtOnJvdGF0ZSgtNDVkZWcpO3JpZ2h0OjE2cHh9QC13ZWJraXQta2V5ZnJhbWVzIGFuaW1hdGVFcnJvckljb257MCV7LXdlYmtpdC10cmFuc2Zvcm06cm90YXRlWCgxMDBkZWcpO3RyYW5zZm9ybTpyb3RhdGVYKDEwMGRlZyk7b3BhY2l0eTowfXRvey13ZWJraXQtdHJhbnNmb3JtOnJvdGF0ZVgoMGRlZyk7dHJhbnNmb3JtOnJvdGF0ZVgoMGRlZyk7b3BhY2l0eToxfX1Aa2V5ZnJhbWVzIGFuaW1hdGVFcnJvckljb257MCV7LXdlYmtpdC10cmFuc2Zvcm06cm90YXRlWCgxMDBkZWcpO3RyYW5zZm9ybTpyb3RhdGVYKDEwMGRlZyk7b3BhY2l0eTowfXRvey13ZWJraXQtdHJhbnNmb3JtOnJvdGF0ZVgoMGRlZyk7dHJhbnNmb3JtOnJvdGF0ZVgoMGRlZyk7b3BhY2l0eToxfX1ALXdlYmtpdC1rZXlmcmFtZXMgYW5pbWF0ZVhNYXJrezAley13ZWJraXQtdHJhbnNmb3JtOnNjYWxlKC40KTt0cmFuc2Zvcm06c2NhbGUoLjQpO21hcmdpbi10b3A6MjZweDtvcGFjaXR5OjB9NTAley13ZWJraXQtdHJhbnNmb3JtOnNjYWxlKC40KTt0cmFuc2Zvcm06c2NhbGUoLjQpO21hcmdpbi10b3A6MjZweDtvcGFjaXR5OjB9ODAley13ZWJraXQtdHJhbnNmb3JtOnNjYWxlKDEuMTUpO3RyYW5zZm9ybTpzY2FsZSgxLjE1KTttYXJnaW4tdG9wOi02cHh9dG97LXdlYmtpdC10cmFuc2Zvcm06c2NhbGUoMSk7dHJhbnNmb3JtOnNjYWxlKDEpO21hcmdpbi10b3A6MDtvcGFjaXR5OjF9fUBrZXlmcmFtZXMgYW5pbWF0ZVhNYXJrezAley13ZWJraXQtdHJhbnNmb3JtOnNjYWxlKC40KTt0cmFuc2Zvcm06c2NhbGUoLjQpO21hcmdpbi10b3A6MjZweDtvcGFjaXR5OjB9NTAley13ZWJraXQtdHJhbnNmb3JtOnNjYWxlKC40KTt0cmFuc2Zvcm06c2NhbGUoLjQpO21hcmdpbi10b3A6MjZweDtvcGFjaXR5OjB9ODAley13ZWJraXQtdHJhbnNmb3JtOnNjYWxlKDEuMTUpO3RyYW5zZm9ybTpzY2FsZSgxLjE1KTttYXJnaW4tdG9wOi02cHh9dG97LXdlYmtpdC10cmFuc2Zvcm06c2NhbGUoMSk7dHJhbnNmb3JtOnNjYWxlKDEpO21hcmdpbi10b3A6MDtvcGFjaXR5OjF9fS5zd2FsLWljb24tLXdhcm5pbmd7Ym9yZGVyLWNvbG9yOiNmOGJiODY7LXdlYmtpdC1hbmltYXRpb246cHVsc2VXYXJuaW5nIC43NXMgaW5maW5pdGUgYWx0ZXJuYXRlO2FuaW1hdGlvbjpwdWxzZVdhcm5pbmcgLjc1cyBpbmZpbml0ZSBhbHRlcm5hdGV9LnN3YWwtaWNvbi0td2FybmluZ19fYm9keXt3aWR0aDo1cHg7aGVpZ2h0OjQ3cHg7dG9wOjEwcHg7Ym9yZGVyLXJhZGl1czoycHg7bWFyZ2luLWxlZnQ6LTJweH0uc3dhbC1pY29uLS13YXJuaW5nX19ib2R5LC5zd2FsLWljb24tLXdhcm5pbmdfX2RvdHtwb3NpdGlvbjphYnNvbHV0ZTtsZWZ0OjUwJTtiYWNrZ3JvdW5kLWNvbG9yOiNmOGJiODZ9LnN3YWwtaWNvbi0td2FybmluZ19fZG90e3dpZHRoOjdweDtoZWlnaHQ6N3B4O2JvcmRlci1yYWRpdXM6NTAlO21hcmdpbi1sZWZ0Oi00cHg7Ym90dG9tOi0xMXB4fUAtd2Via2l0LWtleWZyYW1lcyBwdWxzZVdhcm5pbmd7MCV7Ym9yZGVyLWNvbG9yOiNmOGQ0ODZ9dG97Ym9yZGVyLWNvbG9yOiNmOGJiODZ9fUBrZXlmcmFtZXMgcHVsc2VXYXJuaW5nezAle2JvcmRlci1jb2xvcjojZjhkNDg2fXRve2JvcmRlci1jb2xvcjojZjhiYjg2fX0uc3dhbC1pY29uLS1zdWNjZXNze2JvcmRlci1jb2xvcjojYTVkYzg2fS5zd2FsLWljb24tLXN1Y2Nlc3M6YWZ0ZXIsLnN3YWwtaWNvbi0tc3VjY2VzczpiZWZvcmV7Y29udGVudDpcIlwiO2JvcmRlci1yYWRpdXM6NTAlO3Bvc2l0aW9uOmFic29sdXRlO3dpZHRoOjYwcHg7aGVpZ2h0OjEyMHB4O2JhY2tncm91bmQ6I2ZmZjstd2Via2l0LXRyYW5zZm9ybTpyb3RhdGUoNDVkZWcpO3RyYW5zZm9ybTpyb3RhdGUoNDVkZWcpfS5zd2FsLWljb24tLXN1Y2Nlc3M6YmVmb3Jle2JvcmRlci1yYWRpdXM6MTIwcHggMCAwIDEyMHB4O3RvcDotN3B4O2xlZnQ6LTMzcHg7LXdlYmtpdC10cmFuc2Zvcm06cm90YXRlKC00NWRlZyk7dHJhbnNmb3JtOnJvdGF0ZSgtNDVkZWcpOy13ZWJraXQtdHJhbnNmb3JtLW9yaWdpbjo2MHB4IDYwcHg7dHJhbnNmb3JtLW9yaWdpbjo2MHB4IDYwcHh9LnN3YWwtaWNvbi0tc3VjY2VzczphZnRlcntib3JkZXItcmFkaXVzOjAgMTIwcHggMTIwcHggMDt0b3A6LTExcHg7bGVmdDozMHB4Oy13ZWJraXQtdHJhbnNmb3JtOnJvdGF0ZSgtNDVkZWcpO3RyYW5zZm9ybTpyb3RhdGUoLTQ1ZGVnKTstd2Via2l0LXRyYW5zZm9ybS1vcmlnaW46MCA2MHB4O3RyYW5zZm9ybS1vcmlnaW46MCA2MHB4Oy13ZWJraXQtYW5pbWF0aW9uOnJvdGF0ZVBsYWNlaG9sZGVyIDQuMjVzIGVhc2UtaW47YW5pbWF0aW9uOnJvdGF0ZVBsYWNlaG9sZGVyIDQuMjVzIGVhc2UtaW59LnN3YWwtaWNvbi0tc3VjY2Vzc19fcmluZ3t3aWR0aDo4MHB4O2hlaWdodDo4MHB4O2JvcmRlcjo0cHggc29saWQgaHNsYSg5OCw1NSUsNjklLC4yKTtib3JkZXItcmFkaXVzOjUwJTtib3gtc2l6aW5nOmNvbnRlbnQtYm94O3Bvc2l0aW9uOmFic29sdXRlO2xlZnQ6LTRweDt0b3A6LTRweDt6LWluZGV4OjJ9LnN3YWwtaWNvbi0tc3VjY2Vzc19faGlkZS1jb3JuZXJze3dpZHRoOjVweDtoZWlnaHQ6OTBweDtiYWNrZ3JvdW5kLWNvbG9yOiNmZmY7cGFkZGluZzoxcHg7cG9zaXRpb246YWJzb2x1dGU7bGVmdDoyOHB4O3RvcDo4cHg7ei1pbmRleDoxOy13ZWJraXQtdHJhbnNmb3JtOnJvdGF0ZSgtNDVkZWcpO3RyYW5zZm9ybTpyb3RhdGUoLTQ1ZGVnKX0uc3dhbC1pY29uLS1zdWNjZXNzX19saW5le2hlaWdodDo1cHg7YmFja2dyb3VuZC1jb2xvcjojYTVkYzg2O2Rpc3BsYXk6YmxvY2s7Ym9yZGVyLXJhZGl1czoycHg7cG9zaXRpb246YWJzb2x1dGU7ei1pbmRleDoyfS5zd2FsLWljb24tLXN1Y2Nlc3NfX2xpbmUtLXRpcHt3aWR0aDoyNXB4O2xlZnQ6MTRweDt0b3A6NDZweDstd2Via2l0LXRyYW5zZm9ybTpyb3RhdGUoNDVkZWcpO3RyYW5zZm9ybTpyb3RhdGUoNDVkZWcpOy13ZWJraXQtYW5pbWF0aW9uOmFuaW1hdGVTdWNjZXNzVGlwIC43NXM7YW5pbWF0aW9uOmFuaW1hdGVTdWNjZXNzVGlwIC43NXN9LnN3YWwtaWNvbi0tc3VjY2Vzc19fbGluZS0tbG9uZ3t3aWR0aDo0N3B4O3JpZ2h0OjhweDt0b3A6MzhweDstd2Via2l0LXRyYW5zZm9ybTpyb3RhdGUoLTQ1ZGVnKTt0cmFuc2Zvcm06cm90YXRlKC00NWRlZyk7LXdlYmtpdC1hbmltYXRpb246YW5pbWF0ZVN1Y2Nlc3NMb25nIC43NXM7YW5pbWF0aW9uOmFuaW1hdGVTdWNjZXNzTG9uZyAuNzVzfUAtd2Via2l0LWtleWZyYW1lcyByb3RhdGVQbGFjZWhvbGRlcnswJXstd2Via2l0LXRyYW5zZm9ybTpyb3RhdGUoLTQ1ZGVnKTt0cmFuc2Zvcm06cm90YXRlKC00NWRlZyl9NSV7LXdlYmtpdC10cmFuc2Zvcm06cm90YXRlKC00NWRlZyk7dHJhbnNmb3JtOnJvdGF0ZSgtNDVkZWcpfTEyJXstd2Via2l0LXRyYW5zZm9ybTpyb3RhdGUoLTQwNWRlZyk7dHJhbnNmb3JtOnJvdGF0ZSgtNDA1ZGVnKX10b3std2Via2l0LXRyYW5zZm9ybTpyb3RhdGUoLTQwNWRlZyk7dHJhbnNmb3JtOnJvdGF0ZSgtNDA1ZGVnKX19QGtleWZyYW1lcyByb3RhdGVQbGFjZWhvbGRlcnswJXstd2Via2l0LXRyYW5zZm9ybTpyb3RhdGUoLTQ1ZGVnKTt0cmFuc2Zvcm06cm90YXRlKC00NWRlZyl9NSV7LXdlYmtpdC10cmFuc2Zvcm06cm90YXRlKC00NWRlZyk7dHJhbnNmb3JtOnJvdGF0ZSgtNDVkZWcpfTEyJXstd2Via2l0LXRyYW5zZm9ybTpyb3RhdGUoLTQwNWRlZyk7dHJhbnNmb3JtOnJvdGF0ZSgtNDA1ZGVnKX10b3std2Via2l0LXRyYW5zZm9ybTpyb3RhdGUoLTQwNWRlZyk7dHJhbnNmb3JtOnJvdGF0ZSgtNDA1ZGVnKX19QC13ZWJraXQta2V5ZnJhbWVzIGFuaW1hdGVTdWNjZXNzVGlwezAle3dpZHRoOjA7bGVmdDoxcHg7dG9wOjE5cHh9NTQle3dpZHRoOjA7bGVmdDoxcHg7dG9wOjE5cHh9NzAle3dpZHRoOjUwcHg7bGVmdDotOHB4O3RvcDozN3B4fTg0JXt3aWR0aDoxN3B4O2xlZnQ6MjFweDt0b3A6NDhweH10b3t3aWR0aDoyNXB4O2xlZnQ6MTRweDt0b3A6NDVweH19QGtleWZyYW1lcyBhbmltYXRlU3VjY2Vzc1RpcHswJXt3aWR0aDowO2xlZnQ6MXB4O3RvcDoxOXB4fTU0JXt3aWR0aDowO2xlZnQ6MXB4O3RvcDoxOXB4fTcwJXt3aWR0aDo1MHB4O2xlZnQ6LThweDt0b3A6MzdweH04NCV7d2lkdGg6MTdweDtsZWZ0OjIxcHg7dG9wOjQ4cHh9dG97d2lkdGg6MjVweDtsZWZ0OjE0cHg7dG9wOjQ1cHh9fUAtd2Via2l0LWtleWZyYW1lcyBhbmltYXRlU3VjY2Vzc0xvbmd7MCV7d2lkdGg6MDtyaWdodDo0NnB4O3RvcDo1NHB4fTY1JXt3aWR0aDowO3JpZ2h0OjQ2cHg7dG9wOjU0cHh9ODQle3dpZHRoOjU1cHg7cmlnaHQ6MDt0b3A6MzVweH10b3t3aWR0aDo0N3B4O3JpZ2h0OjhweDt0b3A6MzhweH19QGtleWZyYW1lcyBhbmltYXRlU3VjY2Vzc0xvbmd7MCV7d2lkdGg6MDtyaWdodDo0NnB4O3RvcDo1NHB4fTY1JXt3aWR0aDowO3JpZ2h0OjQ2cHg7dG9wOjU0cHh9ODQle3dpZHRoOjU1cHg7cmlnaHQ6MDt0b3A6MzVweH10b3t3aWR0aDo0N3B4O3JpZ2h0OjhweDt0b3A6MzhweH19LnN3YWwtaWNvbi0taW5mb3tib3JkZXItY29sb3I6I2M5ZGFlMX0uc3dhbC1pY29uLS1pbmZvOmJlZm9yZXt3aWR0aDo1cHg7aGVpZ2h0OjI5cHg7Ym90dG9tOjE3cHg7Ym9yZGVyLXJhZGl1czoycHg7bWFyZ2luLWxlZnQ6LTJweH0uc3dhbC1pY29uLS1pbmZvOmFmdGVyLC5zd2FsLWljb24tLWluZm86YmVmb3Jle2NvbnRlbnQ6XCJcIjtwb3NpdGlvbjphYnNvbHV0ZTtsZWZ0OjUwJTtiYWNrZ3JvdW5kLWNvbG9yOiNjOWRhZTF9LnN3YWwtaWNvbi0taW5mbzphZnRlcnt3aWR0aDo3cHg7aGVpZ2h0OjdweDtib3JkZXItcmFkaXVzOjUwJTttYXJnaW4tbGVmdDotM3B4O3RvcDoxOXB4fS5zd2FsLWljb257d2lkdGg6ODBweDtoZWlnaHQ6ODBweDtib3JkZXItd2lkdGg6NHB4O2JvcmRlci1zdHlsZTpzb2xpZDtib3JkZXItcmFkaXVzOjUwJTtwYWRkaW5nOjA7cG9zaXRpb246cmVsYXRpdmU7Ym94LXNpemluZzpjb250ZW50LWJveDttYXJnaW46MjBweCBhdXRvfS5zd2FsLWljb246Zmlyc3QtY2hpbGR7bWFyZ2luLXRvcDozMnB4fS5zd2FsLWljb24tLWN1c3RvbXt3aWR0aDphdXRvO2hlaWdodDphdXRvO21heC13aWR0aDoxMDAlO2JvcmRlcjpub25lO2JvcmRlci1yYWRpdXM6MH0uc3dhbC1pY29uIGltZ3ttYXgtd2lkdGg6MTAwJTttYXgtaGVpZ2h0OjEwMCV9LnN3YWwtdGl0bGV7Y29sb3I6cmdiYSgwLDAsMCwuNjUpO2ZvbnQtd2VpZ2h0OjYwMDt0ZXh0LXRyYW5zZm9ybTpub25lO3Bvc2l0aW9uOnJlbGF0aXZlO2Rpc3BsYXk6YmxvY2s7cGFkZGluZzoxM3B4IDE2cHg7Zm9udC1zaXplOjI3cHg7bGluZS1oZWlnaHQ6bm9ybWFsO3RleHQtYWxpZ246Y2VudGVyO21hcmdpbi1ib3R0b206MH0uc3dhbC10aXRsZTpmaXJzdC1jaGlsZHttYXJnaW4tdG9wOjI2cHh9LnN3YWwtdGl0bGU6bm90KDpmaXJzdC1jaGlsZCl7cGFkZGluZy1ib3R0b206MH0uc3dhbC10aXRsZTpub3QoOmxhc3QtY2hpbGQpe21hcmdpbi1ib3R0b206MTNweH0uc3dhbC10ZXh0e2ZvbnQtc2l6ZToxNnB4O3Bvc2l0aW9uOnJlbGF0aXZlO2Zsb2F0Om5vbmU7bGluZS1oZWlnaHQ6bm9ybWFsO3ZlcnRpY2FsLWFsaWduOnRvcDt0ZXh0LWFsaWduOmxlZnQ7ZGlzcGxheTppbmxpbmUtYmxvY2s7bWFyZ2luOjA7cGFkZGluZzowIDEwcHg7Zm9udC13ZWlnaHQ6NDAwO2NvbG9yOnJnYmEoMCwwLDAsLjY0KTttYXgtd2lkdGg6Y2FsYygxMDAlIC0gMjBweCk7b3ZlcmZsb3ctd3JhcDpicmVhay13b3JkO2JveC1zaXppbmc6Ym9yZGVyLWJveH0uc3dhbC10ZXh0OmZpcnN0LWNoaWxke21hcmdpbi10b3A6NDVweH0uc3dhbC10ZXh0Omxhc3QtY2hpbGR7bWFyZ2luLWJvdHRvbTo0NXB4fS5zd2FsLWZvb3Rlcnt0ZXh0LWFsaWduOnJpZ2h0O3BhZGRpbmctdG9wOjEzcHg7bWFyZ2luLXRvcDoxM3B4O3BhZGRpbmc6MTNweCAxNnB4O2JvcmRlci1yYWRpdXM6aW5oZXJpdDtib3JkZXItdG9wLWxlZnQtcmFkaXVzOjA7Ym9yZGVyLXRvcC1yaWdodC1yYWRpdXM6MH0uc3dhbC1idXR0b24tY29udGFpbmVye21hcmdpbjo1cHg7ZGlzcGxheTppbmxpbmUtYmxvY2s7cG9zaXRpb246cmVsYXRpdmV9LnN3YWwtYnV0dG9ue2JhY2tncm91bmQtY29sb3I6IzdjZDFmOTtjb2xvcjojZmZmO2JvcmRlcjpub25lO2JveC1zaGFkb3c6bm9uZTtib3JkZXItcmFkaXVzOjVweDtmb250LXdlaWdodDo2MDA7Zm9udC1zaXplOjE0cHg7cGFkZGluZzoxMHB4IDI0cHg7bWFyZ2luOjA7Y3Vyc29yOnBvaW50ZXJ9LnN3YWwtYnV0dG9uOm5vdChbZGlzYWJsZWRdKTpob3ZlcntiYWNrZ3JvdW5kLWNvbG9yOiM3OGNiZjJ9LnN3YWwtYnV0dG9uOmFjdGl2ZXtiYWNrZ3JvdW5kLWNvbG9yOiM3MGJjZTB9LnN3YWwtYnV0dG9uOmZvY3Vze291dGxpbmU6bm9uZTtib3gtc2hhZG93OjAgMCAwIDFweCAjZmZmLDAgMCAwIDNweCByZ2JhKDQzLDExNCwxNjUsLjI5KX0uc3dhbC1idXR0b25bZGlzYWJsZWRde29wYWNpdHk6LjU7Y3Vyc29yOmRlZmF1bHR9LnN3YWwtYnV0dG9uOjotbW96LWZvY3VzLWlubmVye2JvcmRlcjowfS5zd2FsLWJ1dHRvbi0tY2FuY2Vse2NvbG9yOiM1NTU7YmFja2dyb3VuZC1jb2xvcjojZWZlZmVmfS5zd2FsLWJ1dHRvbi0tY2FuY2VsOm5vdChbZGlzYWJsZWRdKTpob3ZlcntiYWNrZ3JvdW5kLWNvbG9yOiNlOGU4ZTh9LnN3YWwtYnV0dG9uLS1jYW5jZWw6YWN0aXZle2JhY2tncm91bmQtY29sb3I6I2Q3ZDdkN30uc3dhbC1idXR0b24tLWNhbmNlbDpmb2N1c3tib3gtc2hhZG93OjAgMCAwIDFweCAjZmZmLDAgMCAwIDNweCByZ2JhKDExNiwxMzYsMTUwLC4yOSl9LnN3YWwtYnV0dG9uLS1kYW5nZXJ7YmFja2dyb3VuZC1jb2xvcjojZTY0OTQyfS5zd2FsLWJ1dHRvbi0tZGFuZ2VyOm5vdChbZGlzYWJsZWRdKTpob3ZlcntiYWNrZ3JvdW5kLWNvbG9yOiNkZjQ3NDB9LnN3YWwtYnV0dG9uLS1kYW5nZXI6YWN0aXZle2JhY2tncm91bmQtY29sb3I6I2NmNDIzYn0uc3dhbC1idXR0b24tLWRhbmdlcjpmb2N1c3tib3gtc2hhZG93OjAgMCAwIDFweCAjZmZmLDAgMCAwIDNweCByZ2JhKDE2NSw0Myw0MywuMjkpfS5zd2FsLWNvbnRlbnR7cGFkZGluZzowIDIwcHg7bWFyZ2luLXRvcDoyMHB4O2ZvbnQtc2l6ZTptZWRpdW19LnN3YWwtY29udGVudDpsYXN0LWNoaWxke21hcmdpbi1ib3R0b206MjBweH0uc3dhbC1jb250ZW50X19pbnB1dCwuc3dhbC1jb250ZW50X190ZXh0YXJlYXstd2Via2l0LWFwcGVhcmFuY2U6bm9uZTtiYWNrZ3JvdW5kLWNvbG9yOiNmZmY7Ym9yZGVyOm5vbmU7Zm9udC1zaXplOjE0cHg7ZGlzcGxheTpibG9jaztib3gtc2l6aW5nOmJvcmRlci1ib3g7d2lkdGg6MTAwJTtib3JkZXI6MXB4IHNvbGlkIHJnYmEoMCwwLDAsLjE0KTtwYWRkaW5nOjEwcHggMTNweDtib3JkZXItcmFkaXVzOjJweDt0cmFuc2l0aW9uOmJvcmRlci1jb2xvciAuMnN9LnN3YWwtY29udGVudF9faW5wdXQ6Zm9jdXMsLnN3YWwtY29udGVudF9fdGV4dGFyZWE6Zm9jdXN7b3V0bGluZTpub25lO2JvcmRlci1jb2xvcjojNmRiOGZmfS5zd2FsLWNvbnRlbnRfX3RleHRhcmVhe3Jlc2l6ZTp2ZXJ0aWNhbH0uc3dhbC1idXR0b24tLWxvYWRpbmd7Y29sb3I6dHJhbnNwYXJlbnR9LnN3YWwtYnV0dG9uLS1sb2FkaW5nfi5zd2FsLWJ1dHRvbl9fbG9hZGVye29wYWNpdHk6MX0uc3dhbC1idXR0b25fX2xvYWRlcntwb3NpdGlvbjphYnNvbHV0ZTtoZWlnaHQ6YXV0bzt3aWR0aDo0M3B4O3otaW5kZXg6MjtsZWZ0OjUwJTt0b3A6NTAlOy13ZWJraXQtdHJhbnNmb3JtOnRyYW5zbGF0ZVgoLTUwJSkgdHJhbnNsYXRlWSgtNTAlKTt0cmFuc2Zvcm06dHJhbnNsYXRlWCgtNTAlKSB0cmFuc2xhdGVZKC01MCUpO3RleHQtYWxpZ246Y2VudGVyO3BvaW50ZXItZXZlbnRzOm5vbmU7b3BhY2l0eTowfS5zd2FsLWJ1dHRvbl9fbG9hZGVyIGRpdntkaXNwbGF5OmlubGluZS1ibG9jaztmbG9hdDpub25lO3ZlcnRpY2FsLWFsaWduOmJhc2VsaW5lO3dpZHRoOjlweDtoZWlnaHQ6OXB4O3BhZGRpbmc6MDtib3JkZXI6bm9uZTttYXJnaW46MnB4O29wYWNpdHk6LjQ7Ym9yZGVyLXJhZGl1czo3cHg7YmFja2dyb3VuZC1jb2xvcjpoc2xhKDAsMCUsMTAwJSwuOSk7dHJhbnNpdGlvbjpiYWNrZ3JvdW5kIC4yczstd2Via2l0LWFuaW1hdGlvbjpzd2FsLWxvYWRpbmctYW5pbSAxcyBpbmZpbml0ZTthbmltYXRpb246c3dhbC1sb2FkaW5nLWFuaW0gMXMgaW5maW5pdGV9LnN3YWwtYnV0dG9uX19sb2FkZXIgZGl2Om50aC1jaGlsZCgzbisyKXstd2Via2l0LWFuaW1hdGlvbi1kZWxheTouMTVzO2FuaW1hdGlvbi1kZWxheTouMTVzfS5zd2FsLWJ1dHRvbl9fbG9hZGVyIGRpdjpudGgtY2hpbGQoM24rMyl7LXdlYmtpdC1hbmltYXRpb24tZGVsYXk6LjNzO2FuaW1hdGlvbi1kZWxheTouM3N9QC13ZWJraXQta2V5ZnJhbWVzIHN3YWwtbG9hZGluZy1hbmltezAle29wYWNpdHk6LjR9MjAle29wYWNpdHk6LjR9NTAle29wYWNpdHk6MX10b3tvcGFjaXR5Oi40fX1Aa2V5ZnJhbWVzIHN3YWwtbG9hZGluZy1hbmltezAle29wYWNpdHk6LjR9MjAle29wYWNpdHk6LjR9NTAle29wYWNpdHk6MX10b3tvcGFjaXR5Oi40fX0uc3dhbC1vdmVybGF5e3Bvc2l0aW9uOmZpeGVkO3RvcDowO2JvdHRvbTowO2xlZnQ6MDtyaWdodDowO3RleHQtYWxpZ246Y2VudGVyO2ZvbnQtc2l6ZTowO292ZXJmbG93LXk6YXV0bztiYWNrZ3JvdW5kLWNvbG9yOnJnYmEoMCwwLDAsLjQpO3otaW5kZXg6MTAwMDA7cG9pbnRlci1ldmVudHM6bm9uZTtvcGFjaXR5OjA7dHJhbnNpdGlvbjpvcGFjaXR5IC4zc30uc3dhbC1vdmVybGF5OmJlZm9yZXtjb250ZW50OlwiIFwiO2Rpc3BsYXk6aW5saW5lLWJsb2NrO3ZlcnRpY2FsLWFsaWduOm1pZGRsZTtoZWlnaHQ6MTAwJX0uc3dhbC1vdmVybGF5LS1zaG93LW1vZGFse29wYWNpdHk6MTtwb2ludGVyLWV2ZW50czphdXRvfS5zd2FsLW92ZXJsYXktLXNob3ctbW9kYWwgLnN3YWwtbW9kYWx7b3BhY2l0eToxO3BvaW50ZXItZXZlbnRzOmF1dG87Ym94LXNpemluZzpib3JkZXItYm94Oy13ZWJraXQtYW5pbWF0aW9uOnNob3dTd2VldEFsZXJ0IC4zczthbmltYXRpb246c2hvd1N3ZWV0QWxlcnQgLjNzO3dpbGwtY2hhbmdlOnRyYW5zZm9ybX0uc3dhbC1tb2RhbHt3aWR0aDo0NzhweDtvcGFjaXR5OjA7cG9pbnRlci1ldmVudHM6bm9uZTtiYWNrZ3JvdW5kLWNvbG9yOiNmZmY7dGV4dC1hbGlnbjpjZW50ZXI7Ym9yZGVyLXJhZGl1czo1cHg7cG9zaXRpb246c3RhdGljO21hcmdpbjoyMHB4IGF1dG87ZGlzcGxheTppbmxpbmUtYmxvY2s7dmVydGljYWwtYWxpZ246bWlkZGxlOy13ZWJraXQtdHJhbnNmb3JtOnNjYWxlKDEpO3RyYW5zZm9ybTpzY2FsZSgxKTstd2Via2l0LXRyYW5zZm9ybS1vcmlnaW46NTAlIDUwJTt0cmFuc2Zvcm0tb3JpZ2luOjUwJSA1MCU7ei1pbmRleDoxMDAwMTt0cmFuc2l0aW9uOm9wYWNpdHkgLjJzLC13ZWJraXQtdHJhbnNmb3JtIC4zczt0cmFuc2l0aW9uOnRyYW5zZm9ybSAuM3Msb3BhY2l0eSAuMnM7dHJhbnNpdGlvbjp0cmFuc2Zvcm0gLjNzLG9wYWNpdHkgLjJzLC13ZWJraXQtdHJhbnNmb3JtIC4zc31AbWVkaWEgKG1heC13aWR0aDo1MDBweCl7LnN3YWwtbW9kYWx7d2lkdGg6Y2FsYygxMDAlIC0gMjBweCl9fUAtd2Via2l0LWtleWZyYW1lcyBzaG93U3dlZXRBbGVydHswJXstd2Via2l0LXRyYW5zZm9ybTpzY2FsZSgxKTt0cmFuc2Zvcm06c2NhbGUoMSl9MSV7LXdlYmtpdC10cmFuc2Zvcm06c2NhbGUoLjUpO3RyYW5zZm9ybTpzY2FsZSguNSl9NDUley13ZWJraXQtdHJhbnNmb3JtOnNjYWxlKDEuMDUpO3RyYW5zZm9ybTpzY2FsZSgxLjA1KX04MCV7LXdlYmtpdC10cmFuc2Zvcm06c2NhbGUoLjk1KTt0cmFuc2Zvcm06c2NhbGUoLjk1KX10b3std2Via2l0LXRyYW5zZm9ybTpzY2FsZSgxKTt0cmFuc2Zvcm06c2NhbGUoMSl9fUBrZXlmcmFtZXMgc2hvd1N3ZWV0QWxlcnR7MCV7LXdlYmtpdC10cmFuc2Zvcm06c2NhbGUoMSk7dHJhbnNmb3JtOnNjYWxlKDEpfTEley13ZWJraXQtdHJhbnNmb3JtOnNjYWxlKC41KTt0cmFuc2Zvcm06c2NhbGUoLjUpfTQ1JXstd2Via2l0LXRyYW5zZm9ybTpzY2FsZSgxLjA1KTt0cmFuc2Zvcm06c2NhbGUoMS4wNSl9ODAley13ZWJraXQtdHJhbnNmb3JtOnNjYWxlKC45NSk7dHJhbnNmb3JtOnNjYWxlKC45NSl9dG97LXdlYmtpdC10cmFuc2Zvcm06c2NhbGUoMSk7dHJhbnNmb3JtOnNjYWxlKDEpfX0nLFwiXCJdKX0sZnVuY3Rpb24odCxlKXtmdW5jdGlvbiBuKHQsZSl7dmFyIG49dFsxXXx8XCJcIixyPXRbM107aWYoIXIpcmV0dXJuIG47aWYoZSYmXCJmdW5jdGlvblwiPT10eXBlb2YgYnRvYSl7dmFyIGk9byhyKTtyZXR1cm5bbl0uY29uY2F0KHIuc291cmNlcy5tYXAoZnVuY3Rpb24odCl7cmV0dXJuXCIvKiMgc291cmNlVVJMPVwiK3Iuc291cmNlUm9vdCt0K1wiICovXCJ9KSkuY29uY2F0KFtpXSkuam9pbihcIlxcblwiKX1yZXR1cm5bbl0uam9pbihcIlxcblwiKX1mdW5jdGlvbiBvKHQpe3JldHVyblwiLyojIHNvdXJjZU1hcHBpbmdVUkw9ZGF0YTphcHBsaWNhdGlvbi9qc29uO2NoYXJzZXQ9dXRmLTg7YmFzZTY0LFwiK2J0b2EodW5lc2NhcGUoZW5jb2RlVVJJQ29tcG9uZW50KEpTT04uc3RyaW5naWZ5KHQpKSkpK1wiICovXCJ9dC5leHBvcnRzPWZ1bmN0aW9uKHQpe3ZhciBlPVtdO3JldHVybiBlLnRvU3RyaW5nPWZ1bmN0aW9uKCl7cmV0dXJuIHRoaXMubWFwKGZ1bmN0aW9uKGUpe3ZhciBvPW4oZSx0KTtyZXR1cm4gZVsyXT9cIkBtZWRpYSBcIitlWzJdK1wie1wiK28rXCJ9XCI6b30pLmpvaW4oXCJcIil9LGUuaT1mdW5jdGlvbih0LG4pe1wic3RyaW5nXCI9PXR5cGVvZiB0JiYodD1bW251bGwsdCxcIlwiXV0pO2Zvcih2YXIgbz17fSxyPTA7cjx0aGlzLmxlbmd0aDtyKyspe3ZhciBpPXRoaXNbcl1bMF07XCJudW1iZXJcIj09dHlwZW9mIGkmJihvW2ldPSEwKX1mb3Iocj0wO3I8dC5sZW5ndGg7cisrKXt2YXIgYT10W3JdO1wibnVtYmVyXCI9PXR5cGVvZiBhWzBdJiZvW2FbMF1dfHwobiYmIWFbMl0/YVsyXT1uOm4mJihhWzJdPVwiKFwiK2FbMl0rXCIpIGFuZCAoXCIrbitcIilcIiksZS5wdXNoKGEpKX19LGV9fSxmdW5jdGlvbih0LGUsbil7ZnVuY3Rpb24gbyh0LGUpe2Zvcih2YXIgbj0wO248dC5sZW5ndGg7bisrKXt2YXIgbz10W25dLHI9bVtvLmlkXTtpZihyKXtyLnJlZnMrKztmb3IodmFyIGk9MDtpPHIucGFydHMubGVuZ3RoO2krKylyLnBhcnRzW2ldKG8ucGFydHNbaV0pO2Zvcig7aTxvLnBhcnRzLmxlbmd0aDtpKyspci5wYXJ0cy5wdXNoKHUoby5wYXJ0c1tpXSxlKSl9ZWxzZXtmb3IodmFyIGE9W10saT0wO2k8by5wYXJ0cy5sZW5ndGg7aSsrKWEucHVzaCh1KG8ucGFydHNbaV0sZSkpO21bby5pZF09e2lkOm8uaWQscmVmczoxLHBhcnRzOmF9fX19ZnVuY3Rpb24gcih0LGUpe2Zvcih2YXIgbj1bXSxvPXt9LHI9MDtyPHQubGVuZ3RoO3IrKyl7dmFyIGk9dFtyXSxhPWUuYmFzZT9pWzBdK2UuYmFzZTppWzBdLHM9aVsxXSxjPWlbMl0sbD1pWzNdLHU9e2NzczpzLG1lZGlhOmMsc291cmNlTWFwOmx9O29bYV0/b1thXS5wYXJ0cy5wdXNoKHUpOm4ucHVzaChvW2FdPXtpZDphLHBhcnRzOlt1XX0pfXJldHVybiBufWZ1bmN0aW9uIGkodCxlKXt2YXIgbj12KHQuaW5zZXJ0SW50byk7aWYoIW4pdGhyb3cgbmV3IEVycm9yKFwiQ291bGRuJ3QgZmluZCBhIHN0eWxlIHRhcmdldC4gVGhpcyBwcm9iYWJseSBtZWFucyB0aGF0IHRoZSB2YWx1ZSBmb3IgdGhlICdpbnNlcnRJbnRvJyBwYXJhbWV0ZXIgaXMgaW52YWxpZC5cIik7dmFyIG89d1t3Lmxlbmd0aC0xXTtpZihcInRvcFwiPT09dC5pbnNlcnRBdClvP28ubmV4dFNpYmxpbmc/bi5pbnNlcnRCZWZvcmUoZSxvLm5leHRTaWJsaW5nKTpuLmFwcGVuZENoaWxkKGUpOm4uaW5zZXJ0QmVmb3JlKGUsbi5maXJzdENoaWxkKSx3LnB1c2goZSk7ZWxzZXtpZihcImJvdHRvbVwiIT09dC5pbnNlcnRBdCl0aHJvdyBuZXcgRXJyb3IoXCJJbnZhbGlkIHZhbHVlIGZvciBwYXJhbWV0ZXIgJ2luc2VydEF0Jy4gTXVzdCBiZSAndG9wJyBvciAnYm90dG9tJy5cIik7bi5hcHBlbmRDaGlsZChlKX19ZnVuY3Rpb24gYSh0KXtpZihudWxsPT09dC5wYXJlbnROb2RlKXJldHVybiExO3QucGFyZW50Tm9kZS5yZW1vdmVDaGlsZCh0KTt2YXIgZT13LmluZGV4T2YodCk7ZT49MCYmdy5zcGxpY2UoZSwxKX1mdW5jdGlvbiBzKHQpe3ZhciBlPWRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoXCJzdHlsZVwiKTtyZXR1cm4gdC5hdHRycy50eXBlPVwidGV4dC9jc3NcIixsKGUsdC5hdHRycyksaSh0LGUpLGV9ZnVuY3Rpb24gYyh0KXt2YXIgZT1kb2N1bWVudC5jcmVhdGVFbGVtZW50KFwibGlua1wiKTtyZXR1cm4gdC5hdHRycy50eXBlPVwidGV4dC9jc3NcIix0LmF0dHJzLnJlbD1cInN0eWxlc2hlZXRcIixsKGUsdC5hdHRycyksaSh0LGUpLGV9ZnVuY3Rpb24gbCh0LGUpe09iamVjdC5rZXlzKGUpLmZvckVhY2goZnVuY3Rpb24obil7dC5zZXRBdHRyaWJ1dGUobixlW25dKX0pfWZ1bmN0aW9uIHUodCxlKXt2YXIgbixvLHIsaTtpZihlLnRyYW5zZm9ybSYmdC5jc3Mpe2lmKCEoaT1lLnRyYW5zZm9ybSh0LmNzcykpKXJldHVybiBmdW5jdGlvbigpe307dC5jc3M9aX1pZihlLnNpbmdsZXRvbil7dmFyIGw9aCsrO249Z3x8KGc9cyhlKSksbz1mLmJpbmQobnVsbCxuLGwsITEpLHI9Zi5iaW5kKG51bGwsbixsLCEwKX1lbHNlIHQuc291cmNlTWFwJiZcImZ1bmN0aW9uXCI9PXR5cGVvZiBVUkwmJlwiZnVuY3Rpb25cIj09dHlwZW9mIFVSTC5jcmVhdGVPYmplY3RVUkwmJlwiZnVuY3Rpb25cIj09dHlwZW9mIFVSTC5yZXZva2VPYmplY3RVUkwmJlwiZnVuY3Rpb25cIj09dHlwZW9mIEJsb2ImJlwiZnVuY3Rpb25cIj09dHlwZW9mIGJ0b2E/KG49YyhlKSxvPXAuYmluZChudWxsLG4sZSkscj1mdW5jdGlvbigpe2Eobiksbi5ocmVmJiZVUkwucmV2b2tlT2JqZWN0VVJMKG4uaHJlZil9KToobj1zKGUpLG89ZC5iaW5kKG51bGwsbikscj1mdW5jdGlvbigpe2Eobil9KTtyZXR1cm4gbyh0KSxmdW5jdGlvbihlKXtpZihlKXtpZihlLmNzcz09PXQuY3NzJiZlLm1lZGlhPT09dC5tZWRpYSYmZS5zb3VyY2VNYXA9PT10LnNvdXJjZU1hcClyZXR1cm47byh0PWUpfWVsc2UgcigpfX1mdW5jdGlvbiBmKHQsZSxuLG8pe3ZhciByPW4/XCJcIjpvLmNzcztpZih0LnN0eWxlU2hlZXQpdC5zdHlsZVNoZWV0LmNzc1RleHQ9eChlLHIpO2Vsc2V7dmFyIGk9ZG9jdW1lbnQuY3JlYXRlVGV4dE5vZGUociksYT10LmNoaWxkTm9kZXM7YVtlXSYmdC5yZW1vdmVDaGlsZChhW2VdKSxhLmxlbmd0aD90Lmluc2VydEJlZm9yZShpLGFbZV0pOnQuYXBwZW5kQ2hpbGQoaSl9fWZ1bmN0aW9uIGQodCxlKXt2YXIgbj1lLmNzcyxvPWUubWVkaWE7aWYobyYmdC5zZXRBdHRyaWJ1dGUoXCJtZWRpYVwiLG8pLHQuc3R5bGVTaGVldCl0LnN0eWxlU2hlZXQuY3NzVGV4dD1uO2Vsc2V7Zm9yKDt0LmZpcnN0Q2hpbGQ7KXQucmVtb3ZlQ2hpbGQodC5maXJzdENoaWxkKTt0LmFwcGVuZENoaWxkKGRvY3VtZW50LmNyZWF0ZVRleHROb2RlKG4pKX19ZnVuY3Rpb24gcCh0LGUsbil7dmFyIG89bi5jc3Mscj1uLnNvdXJjZU1hcCxpPXZvaWQgMD09PWUuY29udmVydFRvQWJzb2x1dGVVcmxzJiZyOyhlLmNvbnZlcnRUb0Fic29sdXRlVXJsc3x8aSkmJihvPXkobykpLHImJihvKz1cIlxcbi8qIyBzb3VyY2VNYXBwaW5nVVJMPWRhdGE6YXBwbGljYXRpb24vanNvbjtiYXNlNjQsXCIrYnRvYSh1bmVzY2FwZShlbmNvZGVVUklDb21wb25lbnQoSlNPTi5zdHJpbmdpZnkocikpKSkrXCIgKi9cIik7dmFyIGE9bmV3IEJsb2IoW29dLHt0eXBlOlwidGV4dC9jc3NcIn0pLHM9dC5ocmVmO3QuaHJlZj1VUkwuY3JlYXRlT2JqZWN0VVJMKGEpLHMmJlVSTC5yZXZva2VPYmplY3RVUkwocyl9dmFyIG09e30sYj1mdW5jdGlvbih0KXt2YXIgZTtyZXR1cm4gZnVuY3Rpb24oKXtyZXR1cm4gdm9pZCAwPT09ZSYmKGU9dC5hcHBseSh0aGlzLGFyZ3VtZW50cykpLGV9fShmdW5jdGlvbigpe3JldHVybiB3aW5kb3cmJmRvY3VtZW50JiZkb2N1bWVudC5hbGwmJiF3aW5kb3cuYXRvYn0pLHY9ZnVuY3Rpb24odCl7dmFyIGU9e307cmV0dXJuIGZ1bmN0aW9uKG4pe3JldHVybiB2b2lkIDA9PT1lW25dJiYoZVtuXT10LmNhbGwodGhpcyxuKSksZVtuXX19KGZ1bmN0aW9uKHQpe3JldHVybiBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKHQpfSksZz1udWxsLGg9MCx3PVtdLHk9bigxNSk7dC5leHBvcnRzPWZ1bmN0aW9uKHQsZSl7aWYoXCJ1bmRlZmluZWRcIiE9dHlwZW9mIERFQlVHJiZERUJVRyYmXCJvYmplY3RcIiE9dHlwZW9mIGRvY3VtZW50KXRocm93IG5ldyBFcnJvcihcIlRoZSBzdHlsZS1sb2FkZXIgY2Fubm90IGJlIHVzZWQgaW4gYSBub24tYnJvd3NlciBlbnZpcm9ubWVudFwiKTtlPWV8fHt9LGUuYXR0cnM9XCJvYmplY3RcIj09dHlwZW9mIGUuYXR0cnM/ZS5hdHRyczp7fSxlLnNpbmdsZXRvbnx8KGUuc2luZ2xldG9uPWIoKSksZS5pbnNlcnRJbnRvfHwoZS5pbnNlcnRJbnRvPVwiaGVhZFwiKSxlLmluc2VydEF0fHwoZS5pbnNlcnRBdD1cImJvdHRvbVwiKTt2YXIgbj1yKHQsZSk7cmV0dXJuIG8obixlKSxmdW5jdGlvbih0KXtmb3IodmFyIGk9W10sYT0wO2E8bi5sZW5ndGg7YSsrKXt2YXIgcz1uW2FdLGM9bVtzLmlkXTtjLnJlZnMtLSxpLnB1c2goYyl9aWYodCl7byhyKHQsZSksZSl9Zm9yKHZhciBhPTA7YTxpLmxlbmd0aDthKyspe3ZhciBjPWlbYV07aWYoMD09PWMucmVmcyl7Zm9yKHZhciBsPTA7bDxjLnBhcnRzLmxlbmd0aDtsKyspYy5wYXJ0c1tsXSgpO2RlbGV0ZSBtW2MuaWRdfX19fTt2YXIgeD1mdW5jdGlvbigpe3ZhciB0PVtdO3JldHVybiBmdW5jdGlvbihlLG4pe3JldHVybiB0W2VdPW4sdC5maWx0ZXIoQm9vbGVhbikuam9pbihcIlxcblwiKX19KCl9LGZ1bmN0aW9uKHQsZSl7dC5leHBvcnRzPWZ1bmN0aW9uKHQpe3ZhciBlPVwidW5kZWZpbmVkXCIhPXR5cGVvZiB3aW5kb3cmJndpbmRvdy5sb2NhdGlvbjtpZighZSl0aHJvdyBuZXcgRXJyb3IoXCJmaXhVcmxzIHJlcXVpcmVzIHdpbmRvdy5sb2NhdGlvblwiKTtpZighdHx8XCJzdHJpbmdcIiE9dHlwZW9mIHQpcmV0dXJuIHQ7dmFyIG49ZS5wcm90b2NvbCtcIi8vXCIrZS5ob3N0LG89bitlLnBhdGhuYW1lLnJlcGxhY2UoL1xcL1teXFwvXSokLyxcIi9cIik7cmV0dXJuIHQucmVwbGFjZSgvdXJsXFxzKlxcKCgoPzpbXikoXXxcXCgoPzpbXikoXSt8XFwoW14pKF0qXFwpKSpcXCkpKilcXCkvZ2ksZnVuY3Rpb24odCxlKXt2YXIgcj1lLnRyaW0oKS5yZXBsYWNlKC9eXCIoLiopXCIkLyxmdW5jdGlvbih0LGUpe3JldHVybiBlfSkucmVwbGFjZSgvXicoLiopJyQvLGZ1bmN0aW9uKHQsZSl7cmV0dXJuIGV9KTtpZigvXigjfGRhdGE6fGh0dHA6XFwvXFwvfGh0dHBzOlxcL1xcL3xmaWxlOlxcL1xcL1xcLykvaS50ZXN0KHIpKXJldHVybiB0O3ZhciBpO3JldHVybiBpPTA9PT1yLmluZGV4T2YoXCIvL1wiKT9yOjA9PT1yLmluZGV4T2YoXCIvXCIpP24rcjpvK3IucmVwbGFjZSgvXlxcLlxcLy8sXCJcIiksXCJ1cmwoXCIrSlNPTi5zdHJpbmdpZnkoaSkrXCIpXCJ9KX19LGZ1bmN0aW9uKHQsZSxuKXt2YXIgbz1uKDE3KTtcInVuZGVmaW5lZFwiPT10eXBlb2Ygd2luZG93fHx3aW5kb3cuUHJvbWlzZXx8KHdpbmRvdy5Qcm9taXNlPW8pLG4oMjEpLFN0cmluZy5wcm90b3R5cGUuaW5jbHVkZXN8fChTdHJpbmcucHJvdG90eXBlLmluY2x1ZGVzPWZ1bmN0aW9uKHQsZSl7XCJ1c2Ugc3RyaWN0XCI7cmV0dXJuXCJudW1iZXJcIiE9dHlwZW9mIGUmJihlPTApLCEoZSt0Lmxlbmd0aD50aGlzLmxlbmd0aCkmJi0xIT09dGhpcy5pbmRleE9mKHQsZSl9KSxBcnJheS5wcm90b3R5cGUuaW5jbHVkZXN8fE9iamVjdC5kZWZpbmVQcm9wZXJ0eShBcnJheS5wcm90b3R5cGUsXCJpbmNsdWRlc1wiLHt2YWx1ZTpmdW5jdGlvbih0LGUpe2lmKG51bGw9PXRoaXMpdGhyb3cgbmV3IFR5cGVFcnJvcignXCJ0aGlzXCIgaXMgbnVsbCBvciBub3QgZGVmaW5lZCcpO3ZhciBuPU9iamVjdCh0aGlzKSxvPW4ubGVuZ3RoPj4+MDtpZigwPT09bylyZXR1cm4hMTtmb3IodmFyIHI9MHxlLGk9TWF0aC5tYXgocj49MD9yOm8tTWF0aC5hYnMociksMCk7aTxvOyl7aWYoZnVuY3Rpb24odCxlKXtyZXR1cm4gdD09PWV8fFwibnVtYmVyXCI9PXR5cGVvZiB0JiZcIm51bWJlclwiPT10eXBlb2YgZSYmaXNOYU4odCkmJmlzTmFOKGUpfShuW2ldLHQpKXJldHVybiEwO2krK31yZXR1cm4hMX19KSxcInVuZGVmaW5lZFwiIT10eXBlb2Ygd2luZG93JiZmdW5jdGlvbih0KXt0LmZvckVhY2goZnVuY3Rpb24odCl7dC5oYXNPd25Qcm9wZXJ0eShcInJlbW92ZVwiKXx8T2JqZWN0LmRlZmluZVByb3BlcnR5KHQsXCJyZW1vdmVcIix7Y29uZmlndXJhYmxlOiEwLGVudW1lcmFibGU6ITAsd3JpdGFibGU6ITAsdmFsdWU6ZnVuY3Rpb24oKXt0aGlzLnBhcmVudE5vZGUucmVtb3ZlQ2hpbGQodGhpcyl9fSl9KX0oW0VsZW1lbnQucHJvdG90eXBlLENoYXJhY3RlckRhdGEucHJvdG90eXBlLERvY3VtZW50VHlwZS5wcm90b3R5cGVdKX0sZnVuY3Rpb24odCxlLG4peyhmdW5jdGlvbihlKXshZnVuY3Rpb24obil7ZnVuY3Rpb24gbygpe31mdW5jdGlvbiByKHQsZSl7cmV0dXJuIGZ1bmN0aW9uKCl7dC5hcHBseShlLGFyZ3VtZW50cyl9fWZ1bmN0aW9uIGkodCl7aWYoXCJvYmplY3RcIiE9dHlwZW9mIHRoaXMpdGhyb3cgbmV3IFR5cGVFcnJvcihcIlByb21pc2VzIG11c3QgYmUgY29uc3RydWN0ZWQgdmlhIG5ld1wiKTtpZihcImZ1bmN0aW9uXCIhPXR5cGVvZiB0KXRocm93IG5ldyBUeXBlRXJyb3IoXCJub3QgYSBmdW5jdGlvblwiKTt0aGlzLl9zdGF0ZT0wLHRoaXMuX2hhbmRsZWQ9ITEsdGhpcy5fdmFsdWU9dm9pZCAwLHRoaXMuX2RlZmVycmVkcz1bXSxmKHQsdGhpcyl9ZnVuY3Rpb24gYSh0LGUpe2Zvcig7Mz09PXQuX3N0YXRlOyl0PXQuX3ZhbHVlO2lmKDA9PT10Ll9zdGF0ZSlyZXR1cm4gdm9pZCB0Ll9kZWZlcnJlZHMucHVzaChlKTt0Ll9oYW5kbGVkPSEwLGkuX2ltbWVkaWF0ZUZuKGZ1bmN0aW9uKCl7dmFyIG49MT09PXQuX3N0YXRlP2Uub25GdWxmaWxsZWQ6ZS5vblJlamVjdGVkO2lmKG51bGw9PT1uKXJldHVybiB2b2lkKDE9PT10Ll9zdGF0ZT9zOmMpKGUucHJvbWlzZSx0Ll92YWx1ZSk7dmFyIG87dHJ5e289bih0Ll92YWx1ZSl9Y2F0Y2godCl7cmV0dXJuIHZvaWQgYyhlLnByb21pc2UsdCl9cyhlLnByb21pc2Usbyl9KX1mdW5jdGlvbiBzKHQsZSl7dHJ5e2lmKGU9PT10KXRocm93IG5ldyBUeXBlRXJyb3IoXCJBIHByb21pc2UgY2Fubm90IGJlIHJlc29sdmVkIHdpdGggaXRzZWxmLlwiKTtpZihlJiYoXCJvYmplY3RcIj09dHlwZW9mIGV8fFwiZnVuY3Rpb25cIj09dHlwZW9mIGUpKXt2YXIgbj1lLnRoZW47aWYoZSBpbnN0YW5jZW9mIGkpcmV0dXJuIHQuX3N0YXRlPTMsdC5fdmFsdWU9ZSx2b2lkIGwodCk7aWYoXCJmdW5jdGlvblwiPT10eXBlb2YgbilyZXR1cm4gdm9pZCBmKHIobixlKSx0KX10Ll9zdGF0ZT0xLHQuX3ZhbHVlPWUsbCh0KX1jYXRjaChlKXtjKHQsZSl9fWZ1bmN0aW9uIGModCxlKXt0Ll9zdGF0ZT0yLHQuX3ZhbHVlPWUsbCh0KX1mdW5jdGlvbiBsKHQpezI9PT10Ll9zdGF0ZSYmMD09PXQuX2RlZmVycmVkcy5sZW5ndGgmJmkuX2ltbWVkaWF0ZUZuKGZ1bmN0aW9uKCl7dC5faGFuZGxlZHx8aS5fdW5oYW5kbGVkUmVqZWN0aW9uRm4odC5fdmFsdWUpfSk7Zm9yKHZhciBlPTAsbj10Ll9kZWZlcnJlZHMubGVuZ3RoO2U8bjtlKyspYSh0LHQuX2RlZmVycmVkc1tlXSk7dC5fZGVmZXJyZWRzPW51bGx9ZnVuY3Rpb24gdSh0LGUsbil7dGhpcy5vbkZ1bGZpbGxlZD1cImZ1bmN0aW9uXCI9PXR5cGVvZiB0P3Q6bnVsbCx0aGlzLm9uUmVqZWN0ZWQ9XCJmdW5jdGlvblwiPT10eXBlb2YgZT9lOm51bGwsdGhpcy5wcm9taXNlPW59ZnVuY3Rpb24gZih0LGUpe3ZhciBuPSExO3RyeXt0KGZ1bmN0aW9uKHQpe258fChuPSEwLHMoZSx0KSl9LGZ1bmN0aW9uKHQpe258fChuPSEwLGMoZSx0KSl9KX1jYXRjaCh0KXtpZihuKXJldHVybjtuPSEwLGMoZSx0KX19dmFyIGQ9c2V0VGltZW91dDtpLnByb3RvdHlwZS5jYXRjaD1mdW5jdGlvbih0KXtyZXR1cm4gdGhpcy50aGVuKG51bGwsdCl9LGkucHJvdG90eXBlLnRoZW49ZnVuY3Rpb24odCxlKXt2YXIgbj1uZXcgdGhpcy5jb25zdHJ1Y3RvcihvKTtyZXR1cm4gYSh0aGlzLG5ldyB1KHQsZSxuKSksbn0saS5hbGw9ZnVuY3Rpb24odCl7dmFyIGU9QXJyYXkucHJvdG90eXBlLnNsaWNlLmNhbGwodCk7cmV0dXJuIG5ldyBpKGZ1bmN0aW9uKHQsbil7ZnVuY3Rpb24gbyhpLGEpe3RyeXtpZihhJiYoXCJvYmplY3RcIj09dHlwZW9mIGF8fFwiZnVuY3Rpb25cIj09dHlwZW9mIGEpKXt2YXIgcz1hLnRoZW47aWYoXCJmdW5jdGlvblwiPT10eXBlb2YgcylyZXR1cm4gdm9pZCBzLmNhbGwoYSxmdW5jdGlvbih0KXtvKGksdCl9LG4pfWVbaV09YSwwPT0tLXImJnQoZSl9Y2F0Y2godCl7bih0KX19aWYoMD09PWUubGVuZ3RoKXJldHVybiB0KFtdKTtmb3IodmFyIHI9ZS5sZW5ndGgsaT0wO2k8ZS5sZW5ndGg7aSsrKW8oaSxlW2ldKX0pfSxpLnJlc29sdmU9ZnVuY3Rpb24odCl7cmV0dXJuIHQmJlwib2JqZWN0XCI9PXR5cGVvZiB0JiZ0LmNvbnN0cnVjdG9yPT09aT90Om5ldyBpKGZ1bmN0aW9uKGUpe2UodCl9KX0saS5yZWplY3Q9ZnVuY3Rpb24odCl7cmV0dXJuIG5ldyBpKGZ1bmN0aW9uKGUsbil7bih0KX0pfSxpLnJhY2U9ZnVuY3Rpb24odCl7cmV0dXJuIG5ldyBpKGZ1bmN0aW9uKGUsbil7Zm9yKHZhciBvPTAscj10Lmxlbmd0aDtvPHI7bysrKXRbb10udGhlbihlLG4pfSl9LGkuX2ltbWVkaWF0ZUZuPVwiZnVuY3Rpb25cIj09dHlwZW9mIGUmJmZ1bmN0aW9uKHQpe2UodCl9fHxmdW5jdGlvbih0KXtkKHQsMCl9LGkuX3VuaGFuZGxlZFJlamVjdGlvbkZuPWZ1bmN0aW9uKHQpe1widW5kZWZpbmVkXCIhPXR5cGVvZiBjb25zb2xlJiZjb25zb2xlJiZjb25zb2xlLndhcm4oXCJQb3NzaWJsZSBVbmhhbmRsZWQgUHJvbWlzZSBSZWplY3Rpb246XCIsdCl9LGkuX3NldEltbWVkaWF0ZUZuPWZ1bmN0aW9uKHQpe2kuX2ltbWVkaWF0ZUZuPXR9LGkuX3NldFVuaGFuZGxlZFJlamVjdGlvbkZuPWZ1bmN0aW9uKHQpe2kuX3VuaGFuZGxlZFJlamVjdGlvbkZuPXR9LHZvaWQgMCE9PXQmJnQuZXhwb3J0cz90LmV4cG9ydHM9aTpuLlByb21pc2V8fChuLlByb21pc2U9aSl9KHRoaXMpfSkuY2FsbChlLG4oMTgpLnNldEltbWVkaWF0ZSl9LGZ1bmN0aW9uKHQsZSxuKXtmdW5jdGlvbiBvKHQsZSl7dGhpcy5faWQ9dCx0aGlzLl9jbGVhckZuPWV9dmFyIHI9RnVuY3Rpb24ucHJvdG90eXBlLmFwcGx5O2Uuc2V0VGltZW91dD1mdW5jdGlvbigpe3JldHVybiBuZXcgbyhyLmNhbGwoc2V0VGltZW91dCx3aW5kb3csYXJndW1lbnRzKSxjbGVhclRpbWVvdXQpfSxlLnNldEludGVydmFsPWZ1bmN0aW9uKCl7cmV0dXJuIG5ldyBvKHIuY2FsbChzZXRJbnRlcnZhbCx3aW5kb3csYXJndW1lbnRzKSxjbGVhckludGVydmFsKX0sZS5jbGVhclRpbWVvdXQ9ZS5jbGVhckludGVydmFsPWZ1bmN0aW9uKHQpe3QmJnQuY2xvc2UoKX0sby5wcm90b3R5cGUudW5yZWY9by5wcm90b3R5cGUucmVmPWZ1bmN0aW9uKCl7fSxvLnByb3RvdHlwZS5jbG9zZT1mdW5jdGlvbigpe3RoaXMuX2NsZWFyRm4uY2FsbCh3aW5kb3csdGhpcy5faWQpfSxlLmVucm9sbD1mdW5jdGlvbih0LGUpe2NsZWFyVGltZW91dCh0Ll9pZGxlVGltZW91dElkKSx0Ll9pZGxlVGltZW91dD1lfSxlLnVuZW5yb2xsPWZ1bmN0aW9uKHQpe2NsZWFyVGltZW91dCh0Ll9pZGxlVGltZW91dElkKSx0Ll9pZGxlVGltZW91dD0tMX0sZS5fdW5yZWZBY3RpdmU9ZS5hY3RpdmU9ZnVuY3Rpb24odCl7Y2xlYXJUaW1lb3V0KHQuX2lkbGVUaW1lb3V0SWQpO3ZhciBlPXQuX2lkbGVUaW1lb3V0O2U+PTAmJih0Ll9pZGxlVGltZW91dElkPXNldFRpbWVvdXQoZnVuY3Rpb24oKXt0Ll9vblRpbWVvdXQmJnQuX29uVGltZW91dCgpfSxlKSl9LG4oMTkpLGUuc2V0SW1tZWRpYXRlPXNldEltbWVkaWF0ZSxlLmNsZWFySW1tZWRpYXRlPWNsZWFySW1tZWRpYXRlfSxmdW5jdGlvbih0LGUsbil7KGZ1bmN0aW9uKHQsZSl7IWZ1bmN0aW9uKHQsbil7XCJ1c2Ugc3RyaWN0XCI7ZnVuY3Rpb24gbyh0KXtcImZ1bmN0aW9uXCIhPXR5cGVvZiB0JiYodD1uZXcgRnVuY3Rpb24oXCJcIit0KSk7Zm9yKHZhciBlPW5ldyBBcnJheShhcmd1bWVudHMubGVuZ3RoLTEpLG49MDtuPGUubGVuZ3RoO24rKyllW25dPWFyZ3VtZW50c1tuKzFdO3ZhciBvPXtjYWxsYmFjazp0LGFyZ3M6ZX07cmV0dXJuIGxbY109byxzKGMpLGMrK31mdW5jdGlvbiByKHQpe2RlbGV0ZSBsW3RdfWZ1bmN0aW9uIGkodCl7dmFyIGU9dC5jYWxsYmFjayxvPXQuYXJncztzd2l0Y2goby5sZW5ndGgpe2Nhc2UgMDplKCk7YnJlYWs7Y2FzZSAxOmUob1swXSk7YnJlYWs7Y2FzZSAyOmUob1swXSxvWzFdKTticmVhaztjYXNlIDM6ZShvWzBdLG9bMV0sb1syXSk7YnJlYWs7ZGVmYXVsdDplLmFwcGx5KG4sbyl9fWZ1bmN0aW9uIGEodCl7aWYodSlzZXRUaW1lb3V0KGEsMCx0KTtlbHNle3ZhciBlPWxbdF07aWYoZSl7dT0hMDt0cnl7aShlKX1maW5hbGx5e3IodCksdT0hMX19fX1pZighdC5zZXRJbW1lZGlhdGUpe3ZhciBzLGM9MSxsPXt9LHU9ITEsZj10LmRvY3VtZW50LGQ9T2JqZWN0LmdldFByb3RvdHlwZU9mJiZPYmplY3QuZ2V0UHJvdG90eXBlT2YodCk7ZD1kJiZkLnNldFRpbWVvdXQ/ZDp0LFwiW29iamVjdCBwcm9jZXNzXVwiPT09e30udG9TdHJpbmcuY2FsbCh0LnByb2Nlc3MpP2Z1bmN0aW9uKCl7cz1mdW5jdGlvbih0KXtlLm5leHRUaWNrKGZ1bmN0aW9uKCl7YSh0KX0pfX0oKTpmdW5jdGlvbigpe2lmKHQucG9zdE1lc3NhZ2UmJiF0LmltcG9ydFNjcmlwdHMpe3ZhciBlPSEwLG49dC5vbm1lc3NhZ2U7cmV0dXJuIHQub25tZXNzYWdlPWZ1bmN0aW9uKCl7ZT0hMX0sdC5wb3N0TWVzc2FnZShcIlwiLFwiKlwiKSx0Lm9ubWVzc2FnZT1uLGV9fSgpP2Z1bmN0aW9uKCl7dmFyIGU9XCJzZXRJbW1lZGlhdGUkXCIrTWF0aC5yYW5kb20oKStcIiRcIixuPWZ1bmN0aW9uKG4pe24uc291cmNlPT09dCYmXCJzdHJpbmdcIj09dHlwZW9mIG4uZGF0YSYmMD09PW4uZGF0YS5pbmRleE9mKGUpJiZhKCtuLmRhdGEuc2xpY2UoZS5sZW5ndGgpKX07dC5hZGRFdmVudExpc3RlbmVyP3QuYWRkRXZlbnRMaXN0ZW5lcihcIm1lc3NhZ2VcIixuLCExKTp0LmF0dGFjaEV2ZW50KFwib25tZXNzYWdlXCIsbikscz1mdW5jdGlvbihuKXt0LnBvc3RNZXNzYWdlKGUrbixcIipcIil9fSgpOnQuTWVzc2FnZUNoYW5uZWw/ZnVuY3Rpb24oKXt2YXIgdD1uZXcgTWVzc2FnZUNoYW5uZWw7dC5wb3J0MS5vbm1lc3NhZ2U9ZnVuY3Rpb24odCl7YSh0LmRhdGEpfSxzPWZ1bmN0aW9uKGUpe3QucG9ydDIucG9zdE1lc3NhZ2UoZSl9fSgpOmYmJlwib25yZWFkeXN0YXRlY2hhbmdlXCJpbiBmLmNyZWF0ZUVsZW1lbnQoXCJzY3JpcHRcIik/ZnVuY3Rpb24oKXt2YXIgdD1mLmRvY3VtZW50RWxlbWVudDtzPWZ1bmN0aW9uKGUpe3ZhciBuPWYuY3JlYXRlRWxlbWVudChcInNjcmlwdFwiKTtuLm9ucmVhZHlzdGF0ZWNoYW5nZT1mdW5jdGlvbigpe2EoZSksbi5vbnJlYWR5c3RhdGVjaGFuZ2U9bnVsbCx0LnJlbW92ZUNoaWxkKG4pLG49bnVsbH0sdC5hcHBlbmRDaGlsZChuKX19KCk6ZnVuY3Rpb24oKXtzPWZ1bmN0aW9uKHQpe3NldFRpbWVvdXQoYSwwLHQpfX0oKSxkLnNldEltbWVkaWF0ZT1vLGQuY2xlYXJJbW1lZGlhdGU9cn19KFwidW5kZWZpbmVkXCI9PXR5cGVvZiBzZWxmP3ZvaWQgMD09PXQ/dGhpczp0OnNlbGYpfSkuY2FsbChlLG4oNyksbigyMCkpfSxmdW5jdGlvbih0LGUpe2Z1bmN0aW9uIG4oKXt0aHJvdyBuZXcgRXJyb3IoXCJzZXRUaW1lb3V0IGhhcyBub3QgYmVlbiBkZWZpbmVkXCIpfWZ1bmN0aW9uIG8oKXt0aHJvdyBuZXcgRXJyb3IoXCJjbGVhclRpbWVvdXQgaGFzIG5vdCBiZWVuIGRlZmluZWRcIil9ZnVuY3Rpb24gcih0KXtpZih1PT09c2V0VGltZW91dClyZXR1cm4gc2V0VGltZW91dCh0LDApO2lmKCh1PT09bnx8IXUpJiZzZXRUaW1lb3V0KXJldHVybiB1PXNldFRpbWVvdXQsc2V0VGltZW91dCh0LDApO3RyeXtyZXR1cm4gdSh0LDApfWNhdGNoKGUpe3RyeXtyZXR1cm4gdS5jYWxsKG51bGwsdCwwKX1jYXRjaChlKXtyZXR1cm4gdS5jYWxsKHRoaXMsdCwwKX19fWZ1bmN0aW9uIGkodCl7aWYoZj09PWNsZWFyVGltZW91dClyZXR1cm4gY2xlYXJUaW1lb3V0KHQpO2lmKChmPT09b3x8IWYpJiZjbGVhclRpbWVvdXQpcmV0dXJuIGY9Y2xlYXJUaW1lb3V0LGNsZWFyVGltZW91dCh0KTt0cnl7cmV0dXJuIGYodCl9Y2F0Y2goZSl7dHJ5e3JldHVybiBmLmNhbGwobnVsbCx0KX1jYXRjaChlKXtyZXR1cm4gZi5jYWxsKHRoaXMsdCl9fX1mdW5jdGlvbiBhKCl7YiYmcCYmKGI9ITEscC5sZW5ndGg/bT1wLmNvbmNhdChtKTp2PS0xLG0ubGVuZ3RoJiZzKCkpfWZ1bmN0aW9uIHMoKXtpZighYil7dmFyIHQ9cihhKTtiPSEwO2Zvcih2YXIgZT1tLmxlbmd0aDtlOyl7Zm9yKHA9bSxtPVtdOysrdjxlOylwJiZwW3ZdLnJ1bigpO3Y9LTEsZT1tLmxlbmd0aH1wPW51bGwsYj0hMSxpKHQpfX1mdW5jdGlvbiBjKHQsZSl7dGhpcy5mdW49dCx0aGlzLmFycmF5PWV9ZnVuY3Rpb24gbCgpe312YXIgdSxmLGQ9dC5leHBvcnRzPXt9OyFmdW5jdGlvbigpe3RyeXt1PVwiZnVuY3Rpb25cIj09dHlwZW9mIHNldFRpbWVvdXQ/c2V0VGltZW91dDpufWNhdGNoKHQpe3U9bn10cnl7Zj1cImZ1bmN0aW9uXCI9PXR5cGVvZiBjbGVhclRpbWVvdXQ/Y2xlYXJUaW1lb3V0Om99Y2F0Y2godCl7Zj1vfX0oKTt2YXIgcCxtPVtdLGI9ITEsdj0tMTtkLm5leHRUaWNrPWZ1bmN0aW9uKHQpe3ZhciBlPW5ldyBBcnJheShhcmd1bWVudHMubGVuZ3RoLTEpO2lmKGFyZ3VtZW50cy5sZW5ndGg+MSlmb3IodmFyIG49MTtuPGFyZ3VtZW50cy5sZW5ndGg7bisrKWVbbi0xXT1hcmd1bWVudHNbbl07bS5wdXNoKG5ldyBjKHQsZSkpLDEhPT1tLmxlbmd0aHx8Ynx8cihzKX0sYy5wcm90b3R5cGUucnVuPWZ1bmN0aW9uKCl7dGhpcy5mdW4uYXBwbHkobnVsbCx0aGlzLmFycmF5KX0sZC50aXRsZT1cImJyb3dzZXJcIixkLmJyb3dzZXI9ITAsZC5lbnY9e30sZC5hcmd2PVtdLGQudmVyc2lvbj1cIlwiLGQudmVyc2lvbnM9e30sZC5vbj1sLGQuYWRkTGlzdGVuZXI9bCxkLm9uY2U9bCxkLm9mZj1sLGQucmVtb3ZlTGlzdGVuZXI9bCxkLnJlbW92ZUFsbExpc3RlbmVycz1sLGQuZW1pdD1sLGQucHJlcGVuZExpc3RlbmVyPWwsZC5wcmVwZW5kT25jZUxpc3RlbmVyPWwsZC5saXN0ZW5lcnM9ZnVuY3Rpb24odCl7cmV0dXJuW119LGQuYmluZGluZz1mdW5jdGlvbih0KXt0aHJvdyBuZXcgRXJyb3IoXCJwcm9jZXNzLmJpbmRpbmcgaXMgbm90IHN1cHBvcnRlZFwiKX0sZC5jd2Q9ZnVuY3Rpb24oKXtyZXR1cm5cIi9cIn0sZC5jaGRpcj1mdW5jdGlvbih0KXt0aHJvdyBuZXcgRXJyb3IoXCJwcm9jZXNzLmNoZGlyIGlzIG5vdCBzdXBwb3J0ZWRcIil9LGQudW1hc2s9ZnVuY3Rpb24oKXtyZXR1cm4gMH19LGZ1bmN0aW9uKHQsZSxuKXtcInVzZSBzdHJpY3RcIjtuKDIyKS5wb2x5ZmlsbCgpfSxmdW5jdGlvbih0LGUsbil7XCJ1c2Ugc3RyaWN0XCI7ZnVuY3Rpb24gbyh0LGUpe2lmKHZvaWQgMD09PXR8fG51bGw9PT10KXRocm93IG5ldyBUeXBlRXJyb3IoXCJDYW5ub3QgY29udmVydCBmaXJzdCBhcmd1bWVudCB0byBvYmplY3RcIik7Zm9yKHZhciBuPU9iamVjdCh0KSxvPTE7bzxhcmd1bWVudHMubGVuZ3RoO28rKyl7dmFyIHI9YXJndW1lbnRzW29dO2lmKHZvaWQgMCE9PXImJm51bGwhPT1yKWZvcih2YXIgaT1PYmplY3Qua2V5cyhPYmplY3QocikpLGE9MCxzPWkubGVuZ3RoO2E8czthKyspe3ZhciBjPWlbYV0sbD1PYmplY3QuZ2V0T3duUHJvcGVydHlEZXNjcmlwdG9yKHIsYyk7dm9pZCAwIT09bCYmbC5lbnVtZXJhYmxlJiYobltjXT1yW2NdKX19cmV0dXJuIG59ZnVuY3Rpb24gcigpe09iamVjdC5hc3NpZ258fE9iamVjdC5kZWZpbmVQcm9wZXJ0eShPYmplY3QsXCJhc3NpZ25cIix7ZW51bWVyYWJsZTohMSxjb25maWd1cmFibGU6ITAsd3JpdGFibGU6ITAsdmFsdWU6b30pfXQuZXhwb3J0cz17YXNzaWduOm8scG9seWZpbGw6cn19LGZ1bmN0aW9uKHQsZSxuKXtcInVzZSBzdHJpY3RcIjtPYmplY3QuZGVmaW5lUHJvcGVydHkoZSxcIl9fZXNNb2R1bGVcIix7dmFsdWU6ITB9KTt2YXIgbz1uKDI0KSxyPW4oNiksaT1uKDUpLGE9bigzNikscz1mdW5jdGlvbigpe2Zvcih2YXIgdD1bXSxlPTA7ZTxhcmd1bWVudHMubGVuZ3RoO2UrKyl0W2VdPWFyZ3VtZW50c1tlXTtpZihcInVuZGVmaW5lZFwiIT10eXBlb2Ygd2luZG93KXt2YXIgbj1hLmdldE9wdHMuYXBwbHkodm9pZCAwLHQpO3JldHVybiBuZXcgUHJvbWlzZShmdW5jdGlvbih0LGUpe2kuZGVmYXVsdC5wcm9taXNlPXtyZXNvbHZlOnQscmVqZWN0OmV9LG8uZGVmYXVsdChuKSxzZXRUaW1lb3V0KGZ1bmN0aW9uKCl7ci5vcGVuTW9kYWwoKX0pfSl9fTtzLmNsb3NlPXIub25BY3Rpb24scy5nZXRTdGF0ZT1yLmdldFN0YXRlLHMuc2V0QWN0aW9uVmFsdWU9aS5zZXRBY3Rpb25WYWx1ZSxzLnN0b3BMb2FkaW5nPXIuc3RvcExvYWRpbmcscy5zZXREZWZhdWx0cz1hLnNldERlZmF1bHRzLGUuZGVmYXVsdD1zfSxmdW5jdGlvbih0LGUsbil7XCJ1c2Ugc3RyaWN0XCI7T2JqZWN0LmRlZmluZVByb3BlcnR5KGUsXCJfX2VzTW9kdWxlXCIse3ZhbHVlOiEwfSk7dmFyIG89bigxKSxyPW4oMCksaT1yLmRlZmF1bHQuTU9EQUwsYT1uKDQpLHM9bigzNCksYz1uKDM1KSxsPW4oMSk7ZS5pbml0PWZ1bmN0aW9uKHQpe28uZ2V0Tm9kZShpKXx8KGRvY3VtZW50LmJvZHl8fGwudGhyb3dFcnIoXCJZb3UgY2FuIG9ubHkgdXNlIFN3ZWV0QWxlcnQgQUZURVIgdGhlIERPTSBoYXMgbG9hZGVkIVwiKSxzLmRlZmF1bHQoKSxhLmRlZmF1bHQoKSksYS5pbml0TW9kYWxDb250ZW50KHQpLGMuZGVmYXVsdCh0KX0sZS5kZWZhdWx0PWUuaW5pdH0sZnVuY3Rpb24odCxlLG4pe1widXNlIHN0cmljdFwiO09iamVjdC5kZWZpbmVQcm9wZXJ0eShlLFwiX19lc01vZHVsZVwiLHt2YWx1ZTohMH0pO3ZhciBvPW4oMCkscj1vLmRlZmF1bHQuTU9EQUw7ZS5tb2RhbE1hcmt1cD0nXFxuICA8ZGl2IGNsYXNzPVwiJytyKydcIiByb2xlPVwiZGlhbG9nXCIgYXJpYS1tb2RhbD1cInRydWVcIj48L2Rpdj4nLGUuZGVmYXVsdD1lLm1vZGFsTWFya3VwfSxmdW5jdGlvbih0LGUsbil7XCJ1c2Ugc3RyaWN0XCI7T2JqZWN0LmRlZmluZVByb3BlcnR5KGUsXCJfX2VzTW9kdWxlXCIse3ZhbHVlOiEwfSk7dmFyIG89bigwKSxyPW8uZGVmYXVsdC5PVkVSTEFZLGk9JzxkaXYgXFxuICAgIGNsYXNzPVwiJytyKydcIlxcbiAgICB0YWJJbmRleD1cIi0xXCI+XFxuICA8L2Rpdj4nO2UuZGVmYXVsdD1pfSxmdW5jdGlvbih0LGUsbil7XCJ1c2Ugc3RyaWN0XCI7T2JqZWN0LmRlZmluZVByb3BlcnR5KGUsXCJfX2VzTW9kdWxlXCIse3ZhbHVlOiEwfSk7dmFyIG89bigwKSxyPW8uZGVmYXVsdC5JQ09OO2UuZXJyb3JJY29uTWFya3VwPWZ1bmN0aW9uKCl7dmFyIHQ9citcIi0tZXJyb3JcIixlPXQrXCJfX2xpbmVcIjtyZXR1cm4nXFxuICAgIDxkaXYgY2xhc3M9XCInK3QrJ19feC1tYXJrXCI+XFxuICAgICAgPHNwYW4gY2xhc3M9XCInK2UrXCIgXCIrZSsnLS1sZWZ0XCI+PC9zcGFuPlxcbiAgICAgIDxzcGFuIGNsYXNzPVwiJytlK1wiIFwiK2UrJy0tcmlnaHRcIj48L3NwYW4+XFxuICAgIDwvZGl2PlxcbiAgJ30sZS53YXJuaW5nSWNvbk1hcmt1cD1mdW5jdGlvbigpe3ZhciB0PXIrXCItLXdhcm5pbmdcIjtyZXR1cm4nXFxuICAgIDxzcGFuIGNsYXNzPVwiJyt0KydfX2JvZHlcIj5cXG4gICAgICA8c3BhbiBjbGFzcz1cIicrdCsnX19kb3RcIj48L3NwYW4+XFxuICAgIDwvc3Bhbj5cXG4gICd9LGUuc3VjY2Vzc0ljb25NYXJrdXA9ZnVuY3Rpb24oKXt2YXIgdD1yK1wiLS1zdWNjZXNzXCI7cmV0dXJuJ1xcbiAgICA8c3BhbiBjbGFzcz1cIicrdCtcIl9fbGluZSBcIit0KydfX2xpbmUtLWxvbmdcIj48L3NwYW4+XFxuICAgIDxzcGFuIGNsYXNzPVwiJyt0K1wiX19saW5lIFwiK3QrJ19fbGluZS0tdGlwXCI+PC9zcGFuPlxcblxcbiAgICA8ZGl2IGNsYXNzPVwiJyt0KydfX3JpbmdcIj48L2Rpdj5cXG4gICAgPGRpdiBjbGFzcz1cIicrdCsnX19oaWRlLWNvcm5lcnNcIj48L2Rpdj5cXG4gICd9fSxmdW5jdGlvbih0LGUsbil7XCJ1c2Ugc3RyaWN0XCI7T2JqZWN0LmRlZmluZVByb3BlcnR5KGUsXCJfX2VzTW9kdWxlXCIse3ZhbHVlOiEwfSk7dmFyIG89bigwKSxyPW8uZGVmYXVsdC5DT05URU5UO2UuY29udGVudE1hcmt1cD0nXFxuICA8ZGl2IGNsYXNzPVwiJytyKydcIj5cXG5cXG4gIDwvZGl2Plxcbid9LGZ1bmN0aW9uKHQsZSxuKXtcInVzZSBzdHJpY3RcIjtPYmplY3QuZGVmaW5lUHJvcGVydHkoZSxcIl9fZXNNb2R1bGVcIix7dmFsdWU6ITB9KTt2YXIgbz1uKDApLHI9by5kZWZhdWx0LkJVVFRPTl9DT05UQUlORVIsaT1vLmRlZmF1bHQuQlVUVE9OLGE9by5kZWZhdWx0LkJVVFRPTl9MT0FERVI7ZS5idXR0b25NYXJrdXA9J1xcbiAgPGRpdiBjbGFzcz1cIicrcisnXCI+XFxuXFxuICAgIDxidXR0b25cXG4gICAgICBjbGFzcz1cIicraSsnXCJcXG4gICAgPjwvYnV0dG9uPlxcblxcbiAgICA8ZGl2IGNsYXNzPVwiJythKydcIj5cXG4gICAgICA8ZGl2PjwvZGl2PlxcbiAgICAgIDxkaXY+PC9kaXY+XFxuICAgICAgPGRpdj48L2Rpdj5cXG4gICAgPC9kaXY+XFxuXFxuICA8L2Rpdj5cXG4nfSxmdW5jdGlvbih0LGUsbil7XCJ1c2Ugc3RyaWN0XCI7T2JqZWN0LmRlZmluZVByb3BlcnR5KGUsXCJfX2VzTW9kdWxlXCIse3ZhbHVlOiEwfSk7dmFyIG89big0KSxyPW4oMiksaT1uKDApLGE9aS5kZWZhdWx0LklDT04scz1pLmRlZmF1bHQuSUNPTl9DVVNUT00sYz1bXCJlcnJvclwiLFwid2FybmluZ1wiLFwic3VjY2Vzc1wiLFwiaW5mb1wiXSxsPXtlcnJvcjpyLmVycm9ySWNvbk1hcmt1cCgpLHdhcm5pbmc6ci53YXJuaW5nSWNvbk1hcmt1cCgpLHN1Y2Nlc3M6ci5zdWNjZXNzSWNvbk1hcmt1cCgpfSx1PWZ1bmN0aW9uKHQsZSl7dmFyIG49YStcIi0tXCIrdDtlLmNsYXNzTGlzdC5hZGQobik7dmFyIG89bFt0XTtvJiYoZS5pbm5lckhUTUw9byl9LGY9ZnVuY3Rpb24odCxlKXtlLmNsYXNzTGlzdC5hZGQocyk7dmFyIG49ZG9jdW1lbnQuY3JlYXRlRWxlbWVudChcImltZ1wiKTtuLnNyYz10LGUuYXBwZW5kQ2hpbGQobil9LGQ9ZnVuY3Rpb24odCl7aWYodCl7dmFyIGU9by5pbmplY3RFbEludG9Nb2RhbChyLmljb25NYXJrdXApO2MuaW5jbHVkZXModCk/dSh0LGUpOmYodCxlKX19O2UuZGVmYXVsdD1kfSxmdW5jdGlvbih0LGUsbil7XCJ1c2Ugc3RyaWN0XCI7T2JqZWN0LmRlZmluZVByb3BlcnR5KGUsXCJfX2VzTW9kdWxlXCIse3ZhbHVlOiEwfSk7dmFyIG89bigyKSxyPW4oNCksaT1mdW5jdGlvbih0KXtuYXZpZ2F0b3IudXNlckFnZW50LmluY2x1ZGVzKFwiQXBwbGVXZWJLaXRcIikmJih0LnN0eWxlLmRpc3BsYXk9XCJub25lXCIsdC5vZmZzZXRIZWlnaHQsdC5zdHlsZS5kaXNwbGF5PVwiXCIpfTtlLmluaXRUaXRsZT1mdW5jdGlvbih0KXtpZih0KXt2YXIgZT1yLmluamVjdEVsSW50b01vZGFsKG8udGl0bGVNYXJrdXApO2UudGV4dENvbnRlbnQ9dCxpKGUpfX0sZS5pbml0VGV4dD1mdW5jdGlvbih0KXtpZih0KXt2YXIgZT1kb2N1bWVudC5jcmVhdGVEb2N1bWVudEZyYWdtZW50KCk7dC5zcGxpdChcIlxcblwiKS5mb3JFYWNoKGZ1bmN0aW9uKHQsbixvKXtlLmFwcGVuZENoaWxkKGRvY3VtZW50LmNyZWF0ZVRleHROb2RlKHQpKSxuPG8ubGVuZ3RoLTEmJmUuYXBwZW5kQ2hpbGQoZG9jdW1lbnQuY3JlYXRlRWxlbWVudChcImJyXCIpKX0pO3ZhciBuPXIuaW5qZWN0RWxJbnRvTW9kYWwoby50ZXh0TWFya3VwKTtuLmFwcGVuZENoaWxkKGUpLGkobil9fX0sZnVuY3Rpb24odCxlLG4pe1widXNlIHN0cmljdFwiO09iamVjdC5kZWZpbmVQcm9wZXJ0eShlLFwiX19lc01vZHVsZVwiLHt2YWx1ZTohMH0pO3ZhciBvPW4oMSkscj1uKDQpLGk9bigwKSxhPWkuZGVmYXVsdC5CVVRUT04scz1pLmRlZmF1bHQuREFOR0VSX0JVVFRPTixjPW4oMyksbD1uKDIpLHU9big2KSxmPW4oNSksZD1mdW5jdGlvbih0LGUsbil7dmFyIHI9ZS50ZXh0LGk9ZS52YWx1ZSxkPWUuY2xhc3NOYW1lLHA9ZS5jbG9zZU1vZGFsLG09by5zdHJpbmdUb05vZGUobC5idXR0b25NYXJrdXApLGI9bS5xdWVyeVNlbGVjdG9yKFwiLlwiK2EpLHY9YStcIi0tXCIrdDtpZihiLmNsYXNzTGlzdC5hZGQodiksZCl7KEFycmF5LmlzQXJyYXkoZCk/ZDpkLnNwbGl0KFwiIFwiKSkuZmlsdGVyKGZ1bmN0aW9uKHQpe3JldHVybiB0Lmxlbmd0aD4wfSkuZm9yRWFjaChmdW5jdGlvbih0KXtiLmNsYXNzTGlzdC5hZGQodCl9KX1uJiZ0PT09Yy5DT05GSVJNX0tFWSYmYi5jbGFzc0xpc3QuYWRkKHMpLGIudGV4dENvbnRlbnQ9cjt2YXIgZz17fTtyZXR1cm4gZ1t0XT1pLGYuc2V0QWN0aW9uVmFsdWUoZyksZi5zZXRBY3Rpb25PcHRpb25zRm9yKHQse2Nsb3NlTW9kYWw6cH0pLGIuYWRkRXZlbnRMaXN0ZW5lcihcImNsaWNrXCIsZnVuY3Rpb24oKXtyZXR1cm4gdS5vbkFjdGlvbih0KX0pLG19LHA9ZnVuY3Rpb24odCxlKXt2YXIgbj1yLmluamVjdEVsSW50b01vZGFsKGwuZm9vdGVyTWFya3VwKTtmb3IodmFyIG8gaW4gdCl7dmFyIGk9dFtvXSxhPWQobyxpLGUpO2kudmlzaWJsZSYmbi5hcHBlbmRDaGlsZChhKX0wPT09bi5jaGlsZHJlbi5sZW5ndGgmJm4ucmVtb3ZlKCl9O2UuZGVmYXVsdD1wfSxmdW5jdGlvbih0LGUsbil7XCJ1c2Ugc3RyaWN0XCI7T2JqZWN0LmRlZmluZVByb3BlcnR5KGUsXCJfX2VzTW9kdWxlXCIse3ZhbHVlOiEwfSk7dmFyIG89bigzKSxyPW4oNCksaT1uKDIpLGE9big1KSxzPW4oNiksYz1uKDApLGw9Yy5kZWZhdWx0LkNPTlRFTlQsdT1mdW5jdGlvbih0KXt0LmFkZEV2ZW50TGlzdGVuZXIoXCJpbnB1dFwiLGZ1bmN0aW9uKHQpe3ZhciBlPXQudGFyZ2V0LG49ZS52YWx1ZTthLnNldEFjdGlvblZhbHVlKG4pfSksdC5hZGRFdmVudExpc3RlbmVyKFwia2V5dXBcIixmdW5jdGlvbih0KXtpZihcIkVudGVyXCI9PT10LmtleSlyZXR1cm4gcy5vbkFjdGlvbihvLkNPTkZJUk1fS0VZKX0pLHNldFRpbWVvdXQoZnVuY3Rpb24oKXt0LmZvY3VzKCksYS5zZXRBY3Rpb25WYWx1ZShcIlwiKX0sMCl9LGY9ZnVuY3Rpb24odCxlLG4pe3ZhciBvPWRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoZSkscj1sK1wiX19cIitlO28uY2xhc3NMaXN0LmFkZChyKTtmb3IodmFyIGkgaW4gbil7dmFyIGE9bltpXTtvW2ldPWF9XCJpbnB1dFwiPT09ZSYmdShvKSx0LmFwcGVuZENoaWxkKG8pfSxkPWZ1bmN0aW9uKHQpe2lmKHQpe3ZhciBlPXIuaW5qZWN0RWxJbnRvTW9kYWwoaS5jb250ZW50TWFya3VwKSxuPXQuZWxlbWVudCxvPXQuYXR0cmlidXRlcztcInN0cmluZ1wiPT10eXBlb2Ygbj9mKGUsbixvKTplLmFwcGVuZENoaWxkKG4pfX07ZS5kZWZhdWx0PWR9LGZ1bmN0aW9uKHQsZSxuKXtcInVzZSBzdHJpY3RcIjtPYmplY3QuZGVmaW5lUHJvcGVydHkoZSxcIl9fZXNNb2R1bGVcIix7dmFsdWU6ITB9KTt2YXIgbz1uKDEpLHI9bigyKSxpPWZ1bmN0aW9uKCl7dmFyIHQ9by5zdHJpbmdUb05vZGUoci5vdmVybGF5TWFya3VwKTtkb2N1bWVudC5ib2R5LmFwcGVuZENoaWxkKHQpfTtlLmRlZmF1bHQ9aX0sZnVuY3Rpb24odCxlLG4pe1widXNlIHN0cmljdFwiO09iamVjdC5kZWZpbmVQcm9wZXJ0eShlLFwiX19lc01vZHVsZVwiLHt2YWx1ZTohMH0pO3ZhciBvPW4oNSkscj1uKDYpLGk9bigxKSxhPW4oMykscz1uKDApLGM9cy5kZWZhdWx0Lk1PREFMLGw9cy5kZWZhdWx0LkJVVFRPTix1PXMuZGVmYXVsdC5PVkVSTEFZLGY9ZnVuY3Rpb24odCl7dC5wcmV2ZW50RGVmYXVsdCgpLHYoKX0sZD1mdW5jdGlvbih0KXt0LnByZXZlbnREZWZhdWx0KCksZygpfSxwPWZ1bmN0aW9uKHQpe2lmKG8uZGVmYXVsdC5pc09wZW4pc3dpdGNoKHQua2V5KXtjYXNlXCJFc2NhcGVcIjpyZXR1cm4gci5vbkFjdGlvbihhLkNBTkNFTF9LRVkpfX0sbT1mdW5jdGlvbih0KXtpZihvLmRlZmF1bHQuaXNPcGVuKXN3aXRjaCh0LmtleSl7Y2FzZVwiVGFiXCI6cmV0dXJuIGYodCl9fSxiPWZ1bmN0aW9uKHQpe2lmKG8uZGVmYXVsdC5pc09wZW4pcmV0dXJuXCJUYWJcIj09PXQua2V5JiZ0LnNoaWZ0S2V5P2QodCk6dm9pZCAwfSx2PWZ1bmN0aW9uKCl7dmFyIHQ9aS5nZXROb2RlKGwpO3QmJih0LnRhYkluZGV4PTAsdC5mb2N1cygpKX0sZz1mdW5jdGlvbigpe3ZhciB0PWkuZ2V0Tm9kZShjKSxlPXQucXVlcnlTZWxlY3RvckFsbChcIi5cIitsKSxuPWUubGVuZ3RoLTEsbz1lW25dO28mJm8uZm9jdXMoKX0saD1mdW5jdGlvbih0KXt0W3QubGVuZ3RoLTFdLmFkZEV2ZW50TGlzdGVuZXIoXCJrZXlkb3duXCIsbSl9LHc9ZnVuY3Rpb24odCl7dFswXS5hZGRFdmVudExpc3RlbmVyKFwia2V5ZG93blwiLGIpfSx5PWZ1bmN0aW9uKCl7dmFyIHQ9aS5nZXROb2RlKGMpLGU9dC5xdWVyeVNlbGVjdG9yQWxsKFwiLlwiK2wpO2UubGVuZ3RoJiYoaChlKSx3KGUpKX0seD1mdW5jdGlvbih0KXtpZihpLmdldE5vZGUodSk9PT10LnRhcmdldClyZXR1cm4gci5vbkFjdGlvbihhLkNBTkNFTF9LRVkpfSxfPWZ1bmN0aW9uKHQpe3ZhciBlPWkuZ2V0Tm9kZSh1KTtlLnJlbW92ZUV2ZW50TGlzdGVuZXIoXCJjbGlja1wiLHgpLHQmJmUuYWRkRXZlbnRMaXN0ZW5lcihcImNsaWNrXCIseCl9LGs9ZnVuY3Rpb24odCl7by5kZWZhdWx0LnRpbWVyJiZjbGVhclRpbWVvdXQoby5kZWZhdWx0LnRpbWVyKSx0JiYoby5kZWZhdWx0LnRpbWVyPXdpbmRvdy5zZXRUaW1lb3V0KGZ1bmN0aW9uKCl7cmV0dXJuIHIub25BY3Rpb24oYS5DQU5DRUxfS0VZKX0sdCkpfSxPPWZ1bmN0aW9uKHQpe3QuY2xvc2VPbkVzYz9kb2N1bWVudC5hZGRFdmVudExpc3RlbmVyKFwia2V5dXBcIixwKTpkb2N1bWVudC5yZW1vdmVFdmVudExpc3RlbmVyKFwia2V5dXBcIixwKSx0LmRhbmdlck1vZGU/digpOmcoKSx5KCksXyh0LmNsb3NlT25DbGlja091dHNpZGUpLGsodC50aW1lcil9O2UuZGVmYXVsdD1PfSxmdW5jdGlvbih0LGUsbil7XCJ1c2Ugc3RyaWN0XCI7T2JqZWN0LmRlZmluZVByb3BlcnR5KGUsXCJfX2VzTW9kdWxlXCIse3ZhbHVlOiEwfSk7dmFyIG89bigxKSxyPW4oMyksaT1uKDM3KSxhPW4oMzgpLHM9e3RpdGxlOm51bGwsdGV4dDpudWxsLGljb246bnVsbCxidXR0b25zOnIuZGVmYXVsdEJ1dHRvbkxpc3QsY29udGVudDpudWxsLGNsYXNzTmFtZTpudWxsLGNsb3NlT25DbGlja091dHNpZGU6ITAsY2xvc2VPbkVzYzohMCxkYW5nZXJNb2RlOiExLHRpbWVyOm51bGx9LGM9T2JqZWN0LmFzc2lnbih7fSxzKTtlLnNldERlZmF1bHRzPWZ1bmN0aW9uKHQpe2M9T2JqZWN0LmFzc2lnbih7fSxzLHQpfTt2YXIgbD1mdW5jdGlvbih0KXt2YXIgZT10JiZ0LmJ1dHRvbixuPXQmJnQuYnV0dG9ucztyZXR1cm4gdm9pZCAwIT09ZSYmdm9pZCAwIT09biYmby50aHJvd0VycihcIkNhbm5vdCBzZXQgYm90aCAnYnV0dG9uJyBhbmQgJ2J1dHRvbnMnIG9wdGlvbnMhXCIpLHZvaWQgMCE9PWU/e2NvbmZpcm06ZX06bn0sdT1mdW5jdGlvbih0KXtyZXR1cm4gby5vcmRpbmFsU3VmZml4T2YodCsxKX0sZj1mdW5jdGlvbih0LGUpe28udGhyb3dFcnIodShlKStcIiBhcmd1bWVudCAoJ1wiK3QrXCInKSBpcyBpbnZhbGlkXCIpfSxkPWZ1bmN0aW9uKHQsZSl7dmFyIG49dCsxLHI9ZVtuXTtvLmlzUGxhaW5PYmplY3Qocil8fHZvaWQgMD09PXJ8fG8udGhyb3dFcnIoXCJFeHBlY3RlZCBcIit1KG4pK1wiIGFyZ3VtZW50ICgnXCIrcitcIicpIHRvIGJlIGEgcGxhaW4gb2JqZWN0XCIpfSxwPWZ1bmN0aW9uKHQsZSl7dmFyIG49dCsxLHI9ZVtuXTt2b2lkIDAhPT1yJiZvLnRocm93RXJyKFwiVW5leHBlY3RlZCBcIit1KG4pK1wiIGFyZ3VtZW50IChcIityK1wiKVwiKX0sbT1mdW5jdGlvbih0LGUsbixyKXt2YXIgaT10eXBlb2YgZSxhPVwic3RyaW5nXCI9PT1pLHM9ZSBpbnN0YW5jZW9mIEVsZW1lbnQ7aWYoYSl7aWYoMD09PW4pcmV0dXJue3RleHQ6ZX07aWYoMT09PW4pcmV0dXJue3RleHQ6ZSx0aXRsZTpyWzBdfTtpZigyPT09bilyZXR1cm4gZChuLHIpLHtpY29uOmV9O2YoZSxuKX1lbHNle2lmKHMmJjA9PT1uKXJldHVybiBkKG4scikse2NvbnRlbnQ6ZX07aWYoby5pc1BsYWluT2JqZWN0KGUpKXJldHVybiBwKG4sciksZTtmKGUsbil9fTtlLmdldE9wdHM9ZnVuY3Rpb24oKXtmb3IodmFyIHQ9W10sZT0wO2U8YXJndW1lbnRzLmxlbmd0aDtlKyspdFtlXT1hcmd1bWVudHNbZV07dmFyIG49e307dC5mb3JFYWNoKGZ1bmN0aW9uKGUsbyl7dmFyIHI9bSgwLGUsbyx0KTtPYmplY3QuYXNzaWduKG4scil9KTt2YXIgbz1sKG4pO24uYnV0dG9ucz1yLmdldEJ1dHRvbkxpc3RPcHRzKG8pLGRlbGV0ZSBuLmJ1dHRvbixuLmNvbnRlbnQ9aS5nZXRDb250ZW50T3B0cyhuLmNvbnRlbnQpO3ZhciB1PU9iamVjdC5hc3NpZ24oe30scyxjLG4pO3JldHVybiBPYmplY3Qua2V5cyh1KS5mb3JFYWNoKGZ1bmN0aW9uKHQpe2EuREVQUkVDQVRFRF9PUFRTW3RdJiZhLmxvZ0RlcHJlY2F0aW9uKHQpfSksdX19LGZ1bmN0aW9uKHQsZSxuKXtcInVzZSBzdHJpY3RcIjtPYmplY3QuZGVmaW5lUHJvcGVydHkoZSxcIl9fZXNNb2R1bGVcIix7dmFsdWU6ITB9KTt2YXIgbz1uKDEpLHI9e2VsZW1lbnQ6XCJpbnB1dFwiLGF0dHJpYnV0ZXM6e3BsYWNlaG9sZGVyOlwiXCJ9fTtlLmdldENvbnRlbnRPcHRzPWZ1bmN0aW9uKHQpe3ZhciBlPXt9O3JldHVybiBvLmlzUGxhaW5PYmplY3QodCk/T2JqZWN0LmFzc2lnbihlLHQpOnQgaW5zdGFuY2VvZiBFbGVtZW50P3tlbGVtZW50OnR9OlwiaW5wdXRcIj09PXQ/cjpudWxsfX0sZnVuY3Rpb24odCxlLG4pe1widXNlIHN0cmljdFwiO09iamVjdC5kZWZpbmVQcm9wZXJ0eShlLFwiX19lc01vZHVsZVwiLHt2YWx1ZTohMH0pLGUubG9nRGVwcmVjYXRpb249ZnVuY3Rpb24odCl7dmFyIG49ZS5ERVBSRUNBVEVEX09QVFNbdF0sbz1uLm9ubHlSZW5hbWUscj1uLnJlcGxhY2VtZW50LGk9bi5zdWJPcHRpb24sYT1uLmxpbmsscz1vP1wicmVuYW1lZFwiOlwiZGVwcmVjYXRlZFwiLGM9J1N3ZWV0QWxlcnQgd2FybmluZzogXCInK3QrJ1wiIG9wdGlvbiBoYXMgYmVlbiAnK3MrXCIuXCI7aWYocil7Yys9XCIgUGxlYXNlIHVzZVwiKyhpPycgXCInK2krJ1wiIGluICc6XCIgXCIpKydcIicrcisnXCIgaW5zdGVhZC4nfXZhciBsPVwiaHR0cHM6Ly9zd2VldGFsZXJ0LmpzLm9yZ1wiO2MrPWE/XCIgTW9yZSBkZXRhaWxzOiBcIitsK2E6XCIgTW9yZSBkZXRhaWxzOiBcIitsK1wiL2d1aWRlcy8jdXBncmFkaW5nLWZyb20tMXhcIixjb25zb2xlLndhcm4oYyl9LGUuREVQUkVDQVRFRF9PUFRTPXt0eXBlOntyZXBsYWNlbWVudDpcImljb25cIixsaW5rOlwiL2RvY3MvI2ljb25cIn0saW1hZ2VVcmw6e3JlcGxhY2VtZW50OlwiaWNvblwiLGxpbms6XCIvZG9jcy8jaWNvblwifSxjdXN0b21DbGFzczp7cmVwbGFjZW1lbnQ6XCJjbGFzc05hbWVcIixvbmx5UmVuYW1lOiEwLGxpbms6XCIvZG9jcy8jY2xhc3NuYW1lXCJ9LGltYWdlU2l6ZTp7fSxzaG93Q2FuY2VsQnV0dG9uOntyZXBsYWNlbWVudDpcImJ1dHRvbnNcIixsaW5rOlwiL2RvY3MvI2J1dHRvbnNcIn0sc2hvd0NvbmZpcm1CdXR0b246e3JlcGxhY2VtZW50OlwiYnV0dG9uXCIsbGluazpcIi9kb2NzLyNidXR0b25cIn0sY29uZmlybUJ1dHRvblRleHQ6e3JlcGxhY2VtZW50OlwiYnV0dG9uXCIsbGluazpcIi9kb2NzLyNidXR0b25cIn0sY29uZmlybUJ1dHRvbkNvbG9yOnt9LGNhbmNlbEJ1dHRvblRleHQ6e3JlcGxhY2VtZW50OlwiYnV0dG9uc1wiLGxpbms6XCIvZG9jcy8jYnV0dG9uc1wifSxjbG9zZU9uQ29uZmlybTp7cmVwbGFjZW1lbnQ6XCJidXR0b25cIixzdWJPcHRpb246XCJjbG9zZU1vZGFsXCIsbGluazpcIi9kb2NzLyNidXR0b25cIn0sY2xvc2VPbkNhbmNlbDp7cmVwbGFjZW1lbnQ6XCJidXR0b25zXCIsc3ViT3B0aW9uOlwiY2xvc2VNb2RhbFwiLGxpbms6XCIvZG9jcy8jYnV0dG9uc1wifSxzaG93TG9hZGVyT25Db25maXJtOntyZXBsYWNlbWVudDpcImJ1dHRvbnNcIn0sYW5pbWF0aW9uOnt9LGlucHV0VHlwZTp7cmVwbGFjZW1lbnQ6XCJjb250ZW50XCIsbGluazpcIi9kb2NzLyNjb250ZW50XCJ9LGlucHV0VmFsdWU6e3JlcGxhY2VtZW50OlwiY29udGVudFwiLGxpbms6XCIvZG9jcy8jY29udGVudFwifSxpbnB1dFBsYWNlaG9sZGVyOntyZXBsYWNlbWVudDpcImNvbnRlbnRcIixsaW5rOlwiL2RvY3MvI2NvbnRlbnRcIn0saHRtbDp7cmVwbGFjZW1lbnQ6XCJjb250ZW50XCIsbGluazpcIi9kb2NzLyNjb250ZW50XCJ9LGFsbG93RXNjYXBlS2V5OntyZXBsYWNlbWVudDpcImNsb3NlT25Fc2NcIixvbmx5UmVuYW1lOiEwLGxpbms6XCIvZG9jcy8jY2xvc2VvbmVzY1wifSxhbGxvd0NsaWNrT3V0c2lkZTp7cmVwbGFjZW1lbnQ6XCJjbG9zZU9uQ2xpY2tPdXRzaWRlXCIsb25seVJlbmFtZTohMCxsaW5rOlwiL2RvY3MvI2Nsb3Nlb25jbGlja291dHNpZGVcIn19fV0pfSk7IiwiLyoqXG4gKiBkZWZhdWx0IHNldHRpbmdzXG4gKlxuICogQGF1dGhvciBab25nbWluIExlaTxsZWl6b25nbWluQGdtYWlsLmNvbT5cbiAqL1xuXG52YXIgRmlsdGVyQ1NTID0gcmVxdWlyZShcImNzc2ZpbHRlclwiKS5GaWx0ZXJDU1M7XG52YXIgZ2V0RGVmYXVsdENTU1doaXRlTGlzdCA9IHJlcXVpcmUoXCJjc3NmaWx0ZXJcIikuZ2V0RGVmYXVsdFdoaXRlTGlzdDtcbnZhciBfID0gcmVxdWlyZShcIi4vdXRpbFwiKTtcblxuZnVuY3Rpb24gZ2V0RGVmYXVsdFdoaXRlTGlzdCgpIHtcbiAgcmV0dXJuIHtcbiAgICBhOiBbXCJ0YXJnZXRcIiwgXCJocmVmXCIsIFwidGl0bGVcIl0sXG4gICAgYWJicjogW1widGl0bGVcIl0sXG4gICAgYWRkcmVzczogW10sXG4gICAgYXJlYTogW1wic2hhcGVcIiwgXCJjb29yZHNcIiwgXCJocmVmXCIsIFwiYWx0XCJdLFxuICAgIGFydGljbGU6IFtdLFxuICAgIGFzaWRlOiBbXSxcbiAgICBhdWRpbzogW1xuICAgICAgXCJhdXRvcGxheVwiLFxuICAgICAgXCJjb250cm9sc1wiLFxuICAgICAgXCJjcm9zc29yaWdpblwiLFxuICAgICAgXCJsb29wXCIsXG4gICAgICBcIm11dGVkXCIsXG4gICAgICBcInByZWxvYWRcIixcbiAgICAgIFwic3JjXCIsXG4gICAgXSxcbiAgICBiOiBbXSxcbiAgICBiZGk6IFtcImRpclwiXSxcbiAgICBiZG86IFtcImRpclwiXSxcbiAgICBiaWc6IFtdLFxuICAgIGJsb2NrcXVvdGU6IFtcImNpdGVcIl0sXG4gICAgYnI6IFtdLFxuICAgIGNhcHRpb246IFtdLFxuICAgIGNlbnRlcjogW10sXG4gICAgY2l0ZTogW10sXG4gICAgY29kZTogW10sXG4gICAgY29sOiBbXCJhbGlnblwiLCBcInZhbGlnblwiLCBcInNwYW5cIiwgXCJ3aWR0aFwiXSxcbiAgICBjb2xncm91cDogW1wiYWxpZ25cIiwgXCJ2YWxpZ25cIiwgXCJzcGFuXCIsIFwid2lkdGhcIl0sXG4gICAgZGQ6IFtdLFxuICAgIGRlbDogW1wiZGF0ZXRpbWVcIl0sXG4gICAgZGV0YWlsczogW1wib3BlblwiXSxcbiAgICBkaXY6IFtdLFxuICAgIGRsOiBbXSxcbiAgICBkdDogW10sXG4gICAgZW06IFtdLFxuICAgIGZpZ2NhcHRpb246IFtdLFxuICAgIGZpZ3VyZTogW10sXG4gICAgZm9udDogW1wiY29sb3JcIiwgXCJzaXplXCIsIFwiZmFjZVwiXSxcbiAgICBmb290ZXI6IFtdLFxuICAgIGgxOiBbXSxcbiAgICBoMjogW10sXG4gICAgaDM6IFtdLFxuICAgIGg0OiBbXSxcbiAgICBoNTogW10sXG4gICAgaDY6IFtdLFxuICAgIGhlYWRlcjogW10sXG4gICAgaHI6IFtdLFxuICAgIGk6IFtdLFxuICAgIGltZzogW1wic3JjXCIsIFwiYWx0XCIsIFwidGl0bGVcIiwgXCJ3aWR0aFwiLCBcImhlaWdodFwiXSxcbiAgICBpbnM6IFtcImRhdGV0aW1lXCJdLFxuICAgIGxpOiBbXSxcbiAgICBtYXJrOiBbXSxcbiAgICBuYXY6IFtdLFxuICAgIG9sOiBbXSxcbiAgICBwOiBbXSxcbiAgICBwcmU6IFtdLFxuICAgIHM6IFtdLFxuICAgIHNlY3Rpb246IFtdLFxuICAgIHNtYWxsOiBbXSxcbiAgICBzcGFuOiBbXSxcbiAgICBzdWI6IFtdLFxuICAgIHN1bW1hcnk6IFtdLFxuICAgIHN1cDogW10sXG4gICAgc3Ryb25nOiBbXSxcbiAgICBzdHJpa2U6IFtdLFxuICAgIHRhYmxlOiBbXCJ3aWR0aFwiLCBcImJvcmRlclwiLCBcImFsaWduXCIsIFwidmFsaWduXCJdLFxuICAgIHRib2R5OiBbXCJhbGlnblwiLCBcInZhbGlnblwiXSxcbiAgICB0ZDogW1wid2lkdGhcIiwgXCJyb3dzcGFuXCIsIFwiY29sc3BhblwiLCBcImFsaWduXCIsIFwidmFsaWduXCJdLFxuICAgIHRmb290OiBbXCJhbGlnblwiLCBcInZhbGlnblwiXSxcbiAgICB0aDogW1wid2lkdGhcIiwgXCJyb3dzcGFuXCIsIFwiY29sc3BhblwiLCBcImFsaWduXCIsIFwidmFsaWduXCJdLFxuICAgIHRoZWFkOiBbXCJhbGlnblwiLCBcInZhbGlnblwiXSxcbiAgICB0cjogW1wicm93c3BhblwiLCBcImFsaWduXCIsIFwidmFsaWduXCJdLFxuICAgIHR0OiBbXSxcbiAgICB1OiBbXSxcbiAgICB1bDogW10sXG4gICAgdmlkZW86IFtcbiAgICAgIFwiYXV0b3BsYXlcIixcbiAgICAgIFwiY29udHJvbHNcIixcbiAgICAgIFwiY3Jvc3NvcmlnaW5cIixcbiAgICAgIFwibG9vcFwiLFxuICAgICAgXCJtdXRlZFwiLFxuICAgICAgXCJwbGF5c2lubGluZVwiLFxuICAgICAgXCJwb3N0ZXJcIixcbiAgICAgIFwicHJlbG9hZFwiLFxuICAgICAgXCJzcmNcIixcbiAgICAgIFwiaGVpZ2h0XCIsXG4gICAgICBcIndpZHRoXCIsXG4gICAgXSxcbiAgfTtcbn1cblxudmFyIGRlZmF1bHRDU1NGaWx0ZXIgPSBuZXcgRmlsdGVyQ1NTKCk7XG5cbi8qKlxuICogZGVmYXVsdCBvblRhZyBmdW5jdGlvblxuICpcbiAqIEBwYXJhbSB7U3RyaW5nfSB0YWdcbiAqIEBwYXJhbSB7U3RyaW5nfSBodG1sXG4gKiBAcGFyYW0ge09iamVjdH0gb3B0aW9uc1xuICogQHJldHVybiB7U3RyaW5nfVxuICovXG5mdW5jdGlvbiBvblRhZyh0YWcsIGh0bWwsIG9wdGlvbnMpIHtcbiAgLy8gZG8gbm90aGluZ1xufVxuXG4vKipcbiAqIGRlZmF1bHQgb25JZ25vcmVUYWcgZnVuY3Rpb25cbiAqXG4gKiBAcGFyYW0ge1N0cmluZ30gdGFnXG4gKiBAcGFyYW0ge1N0cmluZ30gaHRtbFxuICogQHBhcmFtIHtPYmplY3R9IG9wdGlvbnNcbiAqIEByZXR1cm4ge1N0cmluZ31cbiAqL1xuZnVuY3Rpb24gb25JZ25vcmVUYWcodGFnLCBodG1sLCBvcHRpb25zKSB7XG4gIC8vIGRvIG5vdGhpbmdcbn1cblxuLyoqXG4gKiBkZWZhdWx0IG9uVGFnQXR0ciBmdW5jdGlvblxuICpcbiAqIEBwYXJhbSB7U3RyaW5nfSB0YWdcbiAqIEBwYXJhbSB7U3RyaW5nfSBuYW1lXG4gKiBAcGFyYW0ge1N0cmluZ30gdmFsdWVcbiAqIEByZXR1cm4ge1N0cmluZ31cbiAqL1xuZnVuY3Rpb24gb25UYWdBdHRyKHRhZywgbmFtZSwgdmFsdWUpIHtcbiAgLy8gZG8gbm90aGluZ1xufVxuXG4vKipcbiAqIGRlZmF1bHQgb25JZ25vcmVUYWdBdHRyIGZ1bmN0aW9uXG4gKlxuICogQHBhcmFtIHtTdHJpbmd9IHRhZ1xuICogQHBhcmFtIHtTdHJpbmd9IG5hbWVcbiAqIEBwYXJhbSB7U3RyaW5nfSB2YWx1ZVxuICogQHJldHVybiB7U3RyaW5nfVxuICovXG5mdW5jdGlvbiBvbklnbm9yZVRhZ0F0dHIodGFnLCBuYW1lLCB2YWx1ZSkge1xuICAvLyBkbyBub3RoaW5nXG59XG5cbi8qKlxuICogZGVmYXVsdCBlc2NhcGVIdG1sIGZ1bmN0aW9uXG4gKlxuICogQHBhcmFtIHtTdHJpbmd9IGh0bWxcbiAqL1xuZnVuY3Rpb24gZXNjYXBlSHRtbChodG1sKSB7XG4gIHJldHVybiBodG1sLnJlcGxhY2UoUkVHRVhQX0xULCBcIiZsdDtcIikucmVwbGFjZShSRUdFWFBfR1QsIFwiJmd0O1wiKTtcbn1cblxuLyoqXG4gKiBkZWZhdWx0IHNhZmVBdHRyVmFsdWUgZnVuY3Rpb25cbiAqXG4gKiBAcGFyYW0ge1N0cmluZ30gdGFnXG4gKiBAcGFyYW0ge1N0cmluZ30gbmFtZVxuICogQHBhcmFtIHtTdHJpbmd9IHZhbHVlXG4gKiBAcGFyYW0ge09iamVjdH0gY3NzRmlsdGVyXG4gKiBAcmV0dXJuIHtTdHJpbmd9XG4gKi9cbmZ1bmN0aW9uIHNhZmVBdHRyVmFsdWUodGFnLCBuYW1lLCB2YWx1ZSwgY3NzRmlsdGVyKSB7XG4gIC8vIHVuZXNjYXBlIGF0dHJpYnV0ZSB2YWx1ZSBmaXJzdGx5XG4gIHZhbHVlID0gZnJpZW5kbHlBdHRyVmFsdWUodmFsdWUpO1xuXG4gIGlmIChuYW1lID09PSBcImhyZWZcIiB8fCBuYW1lID09PSBcInNyY1wiKSB7XG4gICAgLy8gZmlsdGVyIGBocmVmYCBhbmQgYHNyY2AgYXR0cmlidXRlXG4gICAgLy8gb25seSBhbGxvdyB0aGUgdmFsdWUgdGhhdCBzdGFydHMgd2l0aCBgaHR0cDovL2AgfCBgaHR0cHM6Ly9gIHwgYG1haWx0bzpgIHwgYC9gIHwgYCNgXG4gICAgdmFsdWUgPSBfLnRyaW0odmFsdWUpO1xuICAgIGlmICh2YWx1ZSA9PT0gXCIjXCIpIHJldHVybiBcIiNcIjtcbiAgICBpZiAoXG4gICAgICAhKFxuICAgICAgICB2YWx1ZS5zdWJzdHIoMCwgNykgPT09IFwiaHR0cDovL1wiIHx8XG4gICAgICAgIHZhbHVlLnN1YnN0cigwLCA4KSA9PT0gXCJodHRwczovL1wiIHx8XG4gICAgICAgIHZhbHVlLnN1YnN0cigwLCA3KSA9PT0gXCJtYWlsdG86XCIgfHxcbiAgICAgICAgdmFsdWUuc3Vic3RyKDAsIDQpID09PSBcInRlbDpcIiB8fFxuICAgICAgICB2YWx1ZS5zdWJzdHIoMCwgMTEpID09PSBcImRhdGE6aW1hZ2UvXCIgfHxcbiAgICAgICAgdmFsdWUuc3Vic3RyKDAsIDYpID09PSBcImZ0cDovL1wiIHx8XG4gICAgICAgIHZhbHVlLnN1YnN0cigwLCAyKSA9PT0gXCIuL1wiIHx8XG4gICAgICAgIHZhbHVlLnN1YnN0cigwLCAzKSA9PT0gXCIuLi9cIiB8fFxuICAgICAgICB2YWx1ZVswXSA9PT0gXCIjXCIgfHxcbiAgICAgICAgdmFsdWVbMF0gPT09IFwiL1wiXG4gICAgICApXG4gICAgKSB7XG4gICAgICByZXR1cm4gXCJcIjtcbiAgICB9XG4gIH0gZWxzZSBpZiAobmFtZSA9PT0gXCJiYWNrZ3JvdW5kXCIpIHtcbiAgICAvLyBmaWx0ZXIgYGJhY2tncm91bmRgIGF0dHJpYnV0ZSAobWF5YmUgbm8gdXNlKVxuICAgIC8vIGBqYXZhc2NyaXB0OmBcbiAgICBSRUdFWFBfREVGQVVMVF9PTl9UQUdfQVRUUl80Lmxhc3RJbmRleCA9IDA7XG4gICAgaWYgKFJFR0VYUF9ERUZBVUxUX09OX1RBR19BVFRSXzQudGVzdCh2YWx1ZSkpIHtcbiAgICAgIHJldHVybiBcIlwiO1xuICAgIH1cbiAgfSBlbHNlIGlmIChuYW1lID09PSBcInN0eWxlXCIpIHtcbiAgICAvLyBgZXhwcmVzc2lvbigpYFxuICAgIFJFR0VYUF9ERUZBVUxUX09OX1RBR19BVFRSXzcubGFzdEluZGV4ID0gMDtcbiAgICBpZiAoUkVHRVhQX0RFRkFVTFRfT05fVEFHX0FUVFJfNy50ZXN0KHZhbHVlKSkge1xuICAgICAgcmV0dXJuIFwiXCI7XG4gICAgfVxuICAgIC8vIGB1cmwoKWBcbiAgICBSRUdFWFBfREVGQVVMVF9PTl9UQUdfQVRUUl84Lmxhc3RJbmRleCA9IDA7XG4gICAgaWYgKFJFR0VYUF9ERUZBVUxUX09OX1RBR19BVFRSXzgudGVzdCh2YWx1ZSkpIHtcbiAgICAgIFJFR0VYUF9ERUZBVUxUX09OX1RBR19BVFRSXzQubGFzdEluZGV4ID0gMDtcbiAgICAgIGlmIChSRUdFWFBfREVGQVVMVF9PTl9UQUdfQVRUUl80LnRlc3QodmFsdWUpKSB7XG4gICAgICAgIHJldHVybiBcIlwiO1xuICAgICAgfVxuICAgIH1cbiAgICBpZiAoY3NzRmlsdGVyICE9PSBmYWxzZSkge1xuICAgICAgY3NzRmlsdGVyID0gY3NzRmlsdGVyIHx8IGRlZmF1bHRDU1NGaWx0ZXI7XG4gICAgICB2YWx1ZSA9IGNzc0ZpbHRlci5wcm9jZXNzKHZhbHVlKTtcbiAgICB9XG4gIH1cblxuICAvLyBlc2NhcGUgYDw+XCJgIGJlZm9yZSByZXR1cm5zXG4gIHZhbHVlID0gZXNjYXBlQXR0clZhbHVlKHZhbHVlKTtcbiAgcmV0dXJuIHZhbHVlO1xufVxuXG4vLyBSZWdFeHAgbGlzdFxudmFyIFJFR0VYUF9MVCA9IC88L2c7XG52YXIgUkVHRVhQX0dUID0gLz4vZztcbnZhciBSRUdFWFBfUVVPVEUgPSAvXCIvZztcbnZhciBSRUdFWFBfUVVPVEVfMiA9IC8mcXVvdDsvZztcbnZhciBSRUdFWFBfQVRUUl9WQUxVRV8xID0gLyYjKFthLXpBLVowLTldKik7Py9naW07XG52YXIgUkVHRVhQX0FUVFJfVkFMVUVfQ09MT04gPSAvJmNvbG9uOz8vZ2ltO1xudmFyIFJFR0VYUF9BVFRSX1ZBTFVFX05FV0xJTkUgPSAvJm5ld2xpbmU7Py9naW07XG4vLyB2YXIgUkVHRVhQX0RFRkFVTFRfT05fVEFHX0FUVFJfMyA9IC9cXC9cXCp8XFwqXFwvL2dtO1xudmFyIFJFR0VYUF9ERUZBVUxUX09OX1RBR19BVFRSXzQgPVxuICAvKChqXFxzKmFcXHMqdlxccyphfHZcXHMqYnxsXFxzKmlcXHMqdlxccyplKVxccypzXFxzKmNcXHMqclxccyppXFxzKnBcXHMqdFxccyp8bVxccypvXFxzKmNcXHMqaFxccyphKTovZ2k7XG4vLyB2YXIgUkVHRVhQX0RFRkFVTFRfT05fVEFHX0FUVFJfNSA9IC9eW1xcc1wiJ2BdKihkXFxzKmFcXHMqdFxccyphXFxzKilcXDovZ2k7XG4vLyB2YXIgUkVHRVhQX0RFRkFVTFRfT05fVEFHX0FUVFJfNiA9IC9eW1xcc1wiJ2BdKihkXFxzKmFcXHMqdFxccyphXFxzKilcXDpcXHMqaW1hZ2VcXC8vZ2k7XG52YXIgUkVHRVhQX0RFRkFVTFRfT05fVEFHX0FUVFJfNyA9XG4gIC9lXFxzKnhcXHMqcFxccypyXFxzKmVcXHMqc1xccypzXFxzKmlcXHMqb1xccypuXFxzKlxcKC4qL2dpO1xudmFyIFJFR0VYUF9ERUZBVUxUX09OX1RBR19BVFRSXzggPSAvdVxccypyXFxzKmxcXHMqXFwoLiovZ2k7XG5cbi8qKlxuICogZXNjYXBlIGRvdWJsZSBxdW90ZVxuICpcbiAqIEBwYXJhbSB7U3RyaW5nfSBzdHJcbiAqIEByZXR1cm4ge1N0cmluZ30gc3RyXG4gKi9cbmZ1bmN0aW9uIGVzY2FwZVF1b3RlKHN0cikge1xuICByZXR1cm4gc3RyLnJlcGxhY2UoUkVHRVhQX1FVT1RFLCBcIiZxdW90O1wiKTtcbn1cblxuLyoqXG4gKiB1bmVzY2FwZSBkb3VibGUgcXVvdGVcbiAqXG4gKiBAcGFyYW0ge1N0cmluZ30gc3RyXG4gKiBAcmV0dXJuIHtTdHJpbmd9IHN0clxuICovXG5mdW5jdGlvbiB1bmVzY2FwZVF1b3RlKHN0cikge1xuICByZXR1cm4gc3RyLnJlcGxhY2UoUkVHRVhQX1FVT1RFXzIsICdcIicpO1xufVxuXG4vKipcbiAqIGVzY2FwZSBodG1sIGVudGl0aWVzXG4gKlxuICogQHBhcmFtIHtTdHJpbmd9IHN0clxuICogQHJldHVybiB7U3RyaW5nfVxuICovXG5mdW5jdGlvbiBlc2NhcGVIdG1sRW50aXRpZXMoc3RyKSB7XG4gIHJldHVybiBzdHIucmVwbGFjZShSRUdFWFBfQVRUUl9WQUxVRV8xLCBmdW5jdGlvbiByZXBsYWNlVW5pY29kZShzdHIsIGNvZGUpIHtcbiAgICByZXR1cm4gY29kZVswXSA9PT0gXCJ4XCIgfHwgY29kZVswXSA9PT0gXCJYXCJcbiAgICAgID8gU3RyaW5nLmZyb21DaGFyQ29kZShwYXJzZUludChjb2RlLnN1YnN0cigxKSwgMTYpKVxuICAgICAgOiBTdHJpbmcuZnJvbUNoYXJDb2RlKHBhcnNlSW50KGNvZGUsIDEwKSk7XG4gIH0pO1xufVxuXG4vKipcbiAqIGVzY2FwZSBodG1sNSBuZXcgZGFuZ2VyIGVudGl0aWVzXG4gKlxuICogQHBhcmFtIHtTdHJpbmd9IHN0clxuICogQHJldHVybiB7U3RyaW5nfVxuICovXG5mdW5jdGlvbiBlc2NhcGVEYW5nZXJIdG1sNUVudGl0aWVzKHN0cikge1xuICByZXR1cm4gc3RyXG4gICAgLnJlcGxhY2UoUkVHRVhQX0FUVFJfVkFMVUVfQ09MT04sIFwiOlwiKVxuICAgIC5yZXBsYWNlKFJFR0VYUF9BVFRSX1ZBTFVFX05FV0xJTkUsIFwiIFwiKTtcbn1cblxuLyoqXG4gKiBjbGVhciBub25wcmludGFibGUgY2hhcmFjdGVyc1xuICpcbiAqIEBwYXJhbSB7U3RyaW5nfSBzdHJcbiAqIEByZXR1cm4ge1N0cmluZ31cbiAqL1xuZnVuY3Rpb24gY2xlYXJOb25QcmludGFibGVDaGFyYWN0ZXIoc3RyKSB7XG4gIHZhciBzdHIyID0gXCJcIjtcbiAgZm9yICh2YXIgaSA9IDAsIGxlbiA9IHN0ci5sZW5ndGg7IGkgPCBsZW47IGkrKykge1xuICAgIHN0cjIgKz0gc3RyLmNoYXJDb2RlQXQoaSkgPCAzMiA/IFwiIFwiIDogc3RyLmNoYXJBdChpKTtcbiAgfVxuICByZXR1cm4gXy50cmltKHN0cjIpO1xufVxuXG4vKipcbiAqIGdldCBmcmllbmRseSBhdHRyaWJ1dGUgdmFsdWVcbiAqXG4gKiBAcGFyYW0ge1N0cmluZ30gc3RyXG4gKiBAcmV0dXJuIHtTdHJpbmd9XG4gKi9cbmZ1bmN0aW9uIGZyaWVuZGx5QXR0clZhbHVlKHN0cikge1xuICBzdHIgPSB1bmVzY2FwZVF1b3RlKHN0cik7XG4gIHN0ciA9IGVzY2FwZUh0bWxFbnRpdGllcyhzdHIpO1xuICBzdHIgPSBlc2NhcGVEYW5nZXJIdG1sNUVudGl0aWVzKHN0cik7XG4gIHN0ciA9IGNsZWFyTm9uUHJpbnRhYmxlQ2hhcmFjdGVyKHN0cik7XG4gIHJldHVybiBzdHI7XG59XG5cbi8qKlxuICogdW5lc2NhcGUgYXR0cmlidXRlIHZhbHVlXG4gKlxuICogQHBhcmFtIHtTdHJpbmd9IHN0clxuICogQHJldHVybiB7U3RyaW5nfVxuICovXG5mdW5jdGlvbiBlc2NhcGVBdHRyVmFsdWUoc3RyKSB7XG4gIHN0ciA9IGVzY2FwZVF1b3RlKHN0cik7XG4gIHN0ciA9IGVzY2FwZUh0bWwoc3RyKTtcbiAgcmV0dXJuIHN0cjtcbn1cblxuLyoqXG4gKiBgb25JZ25vcmVUYWdgIGZ1bmN0aW9uIGZvciByZW1vdmluZyBhbGwgdGhlIHRhZ3MgdGhhdCBhcmUgbm90IGluIHdoaXRlbGlzdFxuICovXG5mdW5jdGlvbiBvbklnbm9yZVRhZ1N0cmlwQWxsKCkge1xuICByZXR1cm4gXCJcIjtcbn1cblxuLyoqXG4gKiByZW1vdmUgdGFnIGJvZHlcbiAqIHNwZWNpZnkgYSBgdGFnc2AgbGlzdCwgaWYgdGhlIHRhZyBpcyBub3QgaW4gdGhlIGB0YWdzYCBsaXN0IHRoZW4gcHJvY2VzcyBieSB0aGUgc3BlY2lmeSBmdW5jdGlvbiAob3B0aW9uYWwpXG4gKlxuICogQHBhcmFtIHthcnJheX0gdGFnc1xuICogQHBhcmFtIHtmdW5jdGlvbn0gbmV4dFxuICovXG5mdW5jdGlvbiBTdHJpcFRhZ0JvZHkodGFncywgbmV4dCkge1xuICBpZiAodHlwZW9mIG5leHQgIT09IFwiZnVuY3Rpb25cIikge1xuICAgIG5leHQgPSBmdW5jdGlvbiAoKSB7fTtcbiAgfVxuXG4gIHZhciBpc1JlbW92ZUFsbFRhZyA9ICFBcnJheS5pc0FycmF5KHRhZ3MpO1xuICBmdW5jdGlvbiBpc1JlbW92ZVRhZyh0YWcpIHtcbiAgICBpZiAoaXNSZW1vdmVBbGxUYWcpIHJldHVybiB0cnVlO1xuICAgIHJldHVybiBfLmluZGV4T2YodGFncywgdGFnKSAhPT0gLTE7XG4gIH1cblxuICB2YXIgcmVtb3ZlTGlzdCA9IFtdO1xuICB2YXIgcG9zU3RhcnQgPSBmYWxzZTtcblxuICByZXR1cm4ge1xuICAgIG9uSWdub3JlVGFnOiBmdW5jdGlvbiAodGFnLCBodG1sLCBvcHRpb25zKSB7XG4gICAgICBpZiAoaXNSZW1vdmVUYWcodGFnKSkge1xuICAgICAgICBpZiAob3B0aW9ucy5pc0Nsb3NpbmcpIHtcbiAgICAgICAgICB2YXIgcmV0ID0gXCJbL3JlbW92ZWRdXCI7XG4gICAgICAgICAgdmFyIGVuZCA9IG9wdGlvbnMucG9zaXRpb24gKyByZXQubGVuZ3RoO1xuICAgICAgICAgIHJlbW92ZUxpc3QucHVzaChbXG4gICAgICAgICAgICBwb3NTdGFydCAhPT0gZmFsc2UgPyBwb3NTdGFydCA6IG9wdGlvbnMucG9zaXRpb24sXG4gICAgICAgICAgICBlbmQsXG4gICAgICAgICAgXSk7XG4gICAgICAgICAgcG9zU3RhcnQgPSBmYWxzZTtcbiAgICAgICAgICByZXR1cm4gcmV0O1xuICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgIGlmICghcG9zU3RhcnQpIHtcbiAgICAgICAgICAgIHBvc1N0YXJ0ID0gb3B0aW9ucy5wb3NpdGlvbjtcbiAgICAgICAgICB9XG4gICAgICAgICAgcmV0dXJuIFwiW3JlbW92ZWRdXCI7XG4gICAgICAgIH1cbiAgICAgIH0gZWxzZSB7XG4gICAgICAgIHJldHVybiBuZXh0KHRhZywgaHRtbCwgb3B0aW9ucyk7XG4gICAgICB9XG4gICAgfSxcbiAgICByZW1vdmU6IGZ1bmN0aW9uIChodG1sKSB7XG4gICAgICB2YXIgcmV0aHRtbCA9IFwiXCI7XG4gICAgICB2YXIgbGFzdFBvcyA9IDA7XG4gICAgICBfLmZvckVhY2gocmVtb3ZlTGlzdCwgZnVuY3Rpb24gKHBvcykge1xuICAgICAgICByZXRodG1sICs9IGh0bWwuc2xpY2UobGFzdFBvcywgcG9zWzBdKTtcbiAgICAgICAgbGFzdFBvcyA9IHBvc1sxXTtcbiAgICAgIH0pO1xuICAgICAgcmV0aHRtbCArPSBodG1sLnNsaWNlKGxhc3RQb3MpO1xuICAgICAgcmV0dXJuIHJldGh0bWw7XG4gICAgfSxcbiAgfTtcbn1cblxuLyoqXG4gKiByZW1vdmUgaHRtbCBjb21tZW50c1xuICpcbiAqIEBwYXJhbSB7U3RyaW5nfSBodG1sXG4gKiBAcmV0dXJuIHtTdHJpbmd9XG4gKi9cbmZ1bmN0aW9uIHN0cmlwQ29tbWVudFRhZyhodG1sKSB7XG4gIHZhciByZXRIdG1sID0gXCJcIjtcbiAgdmFyIGxhc3RQb3MgPSAwO1xuICB3aGlsZSAobGFzdFBvcyA8IGh0bWwubGVuZ3RoKSB7XG4gICAgdmFyIGkgPSBodG1sLmluZGV4T2YoXCI8IS0tXCIsIGxhc3RQb3MpO1xuICAgIGlmIChpID09PSAtMSkge1xuICAgICAgcmV0SHRtbCArPSBodG1sLnNsaWNlKGxhc3RQb3MpO1xuICAgICAgYnJlYWs7XG4gICAgfVxuICAgIHJldEh0bWwgKz0gaHRtbC5zbGljZShsYXN0UG9zLCBpKTtcbiAgICB2YXIgaiA9IGh0bWwuaW5kZXhPZihcIi0tPlwiLCBpKTtcbiAgICBpZiAoaiA9PT0gLTEpIHtcbiAgICAgIGJyZWFrO1xuICAgIH1cbiAgICBsYXN0UG9zID0gaiArIDM7XG4gIH1cbiAgcmV0dXJuIHJldEh0bWw7XG59XG5cbi8qKlxuICogcmVtb3ZlIGludmlzaWJsZSBjaGFyYWN0ZXJzXG4gKlxuICogQHBhcmFtIHtTdHJpbmd9IGh0bWxcbiAqIEByZXR1cm4ge1N0cmluZ31cbiAqL1xuZnVuY3Rpb24gc3RyaXBCbGFua0NoYXIoaHRtbCkge1xuICB2YXIgY2hhcnMgPSBodG1sLnNwbGl0KFwiXCIpO1xuICBjaGFycyA9IGNoYXJzLmZpbHRlcihmdW5jdGlvbiAoY2hhcikge1xuICAgIHZhciBjID0gY2hhci5jaGFyQ29kZUF0KDApO1xuICAgIGlmIChjID09PSAxMjcpIHJldHVybiBmYWxzZTtcbiAgICBpZiAoYyA8PSAzMSkge1xuICAgICAgaWYgKGMgPT09IDEwIHx8IGMgPT09IDEzKSByZXR1cm4gdHJ1ZTtcbiAgICAgIHJldHVybiBmYWxzZTtcbiAgICB9XG4gICAgcmV0dXJuIHRydWU7XG4gIH0pO1xuICByZXR1cm4gY2hhcnMuam9pbihcIlwiKTtcbn1cblxuZXhwb3J0cy53aGl0ZUxpc3QgPSBnZXREZWZhdWx0V2hpdGVMaXN0KCk7XG5leHBvcnRzLmdldERlZmF1bHRXaGl0ZUxpc3QgPSBnZXREZWZhdWx0V2hpdGVMaXN0O1xuZXhwb3J0cy5vblRhZyA9IG9uVGFnO1xuZXhwb3J0cy5vbklnbm9yZVRhZyA9IG9uSWdub3JlVGFnO1xuZXhwb3J0cy5vblRhZ0F0dHIgPSBvblRhZ0F0dHI7XG5leHBvcnRzLm9uSWdub3JlVGFnQXR0ciA9IG9uSWdub3JlVGFnQXR0cjtcbmV4cG9ydHMuc2FmZUF0dHJWYWx1ZSA9IHNhZmVBdHRyVmFsdWU7XG5leHBvcnRzLmVzY2FwZUh0bWwgPSBlc2NhcGVIdG1sO1xuZXhwb3J0cy5lc2NhcGVRdW90ZSA9IGVzY2FwZVF1b3RlO1xuZXhwb3J0cy51bmVzY2FwZVF1b3RlID0gdW5lc2NhcGVRdW90ZTtcbmV4cG9ydHMuZXNjYXBlSHRtbEVudGl0aWVzID0gZXNjYXBlSHRtbEVudGl0aWVzO1xuZXhwb3J0cy5lc2NhcGVEYW5nZXJIdG1sNUVudGl0aWVzID0gZXNjYXBlRGFuZ2VySHRtbDVFbnRpdGllcztcbmV4cG9ydHMuY2xlYXJOb25QcmludGFibGVDaGFyYWN0ZXIgPSBjbGVhck5vblByaW50YWJsZUNoYXJhY3RlcjtcbmV4cG9ydHMuZnJpZW5kbHlBdHRyVmFsdWUgPSBmcmllbmRseUF0dHJWYWx1ZTtcbmV4cG9ydHMuZXNjYXBlQXR0clZhbHVlID0gZXNjYXBlQXR0clZhbHVlO1xuZXhwb3J0cy5vbklnbm9yZVRhZ1N0cmlwQWxsID0gb25JZ25vcmVUYWdTdHJpcEFsbDtcbmV4cG9ydHMuU3RyaXBUYWdCb2R5ID0gU3RyaXBUYWdCb2R5O1xuZXhwb3J0cy5zdHJpcENvbW1lbnRUYWcgPSBzdHJpcENvbW1lbnRUYWc7XG5leHBvcnRzLnN0cmlwQmxhbmtDaGFyID0gc3RyaXBCbGFua0NoYXI7XG5leHBvcnRzLmNzc0ZpbHRlciA9IGRlZmF1bHRDU1NGaWx0ZXI7XG5leHBvcnRzLmdldERlZmF1bHRDU1NXaGl0ZUxpc3QgPSBnZXREZWZhdWx0Q1NTV2hpdGVMaXN0O1xuIiwiLyoqXG4gKiB4c3NcbiAqXG4gKiBAYXV0aG9yIFpvbmdtaW4gTGVpPGxlaXpvbmdtaW5AZ21haWwuY29tPlxuICovXG5cbnZhciBERUZBVUxUID0gcmVxdWlyZShcIi4vZGVmYXVsdFwiKTtcbnZhciBwYXJzZXIgPSByZXF1aXJlKFwiLi9wYXJzZXJcIik7XG52YXIgRmlsdGVyWFNTID0gcmVxdWlyZShcIi4veHNzXCIpO1xuXG4vKipcbiAqIGZpbHRlciB4c3MgZnVuY3Rpb25cbiAqXG4gKiBAcGFyYW0ge1N0cmluZ30gaHRtbFxuICogQHBhcmFtIHtPYmplY3R9IG9wdGlvbnMgeyB3aGl0ZUxpc3QsIG9uVGFnLCBvblRhZ0F0dHIsIG9uSWdub3JlVGFnLCBvbklnbm9yZVRhZ0F0dHIsIHNhZmVBdHRyVmFsdWUsIGVzY2FwZUh0bWwgfVxuICogQHJldHVybiB7U3RyaW5nfVxuICovXG5mdW5jdGlvbiBmaWx0ZXJYU1MoaHRtbCwgb3B0aW9ucykge1xuICB2YXIgeHNzID0gbmV3IEZpbHRlclhTUyhvcHRpb25zKTtcbiAgcmV0dXJuIHhzcy5wcm9jZXNzKGh0bWwpO1xufVxuXG5leHBvcnRzID0gbW9kdWxlLmV4cG9ydHMgPSBmaWx0ZXJYU1M7XG5leHBvcnRzLmZpbHRlclhTUyA9IGZpbHRlclhTUztcbmV4cG9ydHMuRmlsdGVyWFNTID0gRmlsdGVyWFNTO1xuXG4oZnVuY3Rpb24gKCkge1xuICBmb3IgKHZhciBpIGluIERFRkFVTFQpIHtcbiAgICBleHBvcnRzW2ldID0gREVGQVVMVFtpXTtcbiAgfVxuICBmb3IgKHZhciBqIGluIHBhcnNlcikge1xuICAgIGV4cG9ydHNbal0gPSBwYXJzZXJbal07XG4gIH1cbn0pKCk7XG5cbi8vIHVzaW5nIGB4c3NgIG9uIHRoZSBicm93c2VyLCBvdXRwdXQgYGZpbHRlclhTU2AgdG8gdGhlIGdsb2JhbHNcbmlmICh0eXBlb2Ygd2luZG93ICE9PSBcInVuZGVmaW5lZFwiKSB7XG4gIHdpbmRvdy5maWx0ZXJYU1MgPSBtb2R1bGUuZXhwb3J0cztcbn1cblxuLy8gdXNpbmcgYHhzc2Agb24gdGhlIFdlYldvcmtlciwgb3V0cHV0IGBmaWx0ZXJYU1NgIHRvIHRoZSBnbG9iYWxzXG5mdW5jdGlvbiBpc1dvcmtlckVudigpIHtcbiAgcmV0dXJuIChcbiAgICB0eXBlb2Ygc2VsZiAhPT0gXCJ1bmRlZmluZWRcIiAmJlxuICAgIHR5cGVvZiBEZWRpY2F0ZWRXb3JrZXJHbG9iYWxTY29wZSAhPT0gXCJ1bmRlZmluZWRcIiAmJlxuICAgIHNlbGYgaW5zdGFuY2VvZiBEZWRpY2F0ZWRXb3JrZXJHbG9iYWxTY29wZVxuICApO1xufVxuaWYgKGlzV29ya2VyRW52KCkpIHtcbiAgc2VsZi5maWx0ZXJYU1MgPSBtb2R1bGUuZXhwb3J0cztcbn1cbiIsIi8qKlxuICogU2ltcGxlIEhUTUwgUGFyc2VyXG4gKlxuICogQGF1dGhvciBab25nbWluIExlaTxsZWl6b25nbWluQGdtYWlsLmNvbT5cbiAqL1xuXG52YXIgXyA9IHJlcXVpcmUoXCIuL3V0aWxcIik7XG5cbi8qKlxuICogZ2V0IHRhZyBuYW1lXG4gKlxuICogQHBhcmFtIHtTdHJpbmd9IGh0bWwgZS5nLiAnPGEgaGVmPVwiI1wiPidcbiAqIEByZXR1cm4ge1N0cmluZ31cbiAqL1xuZnVuY3Rpb24gZ2V0VGFnTmFtZShodG1sKSB7XG4gIHZhciBpID0gXy5zcGFjZUluZGV4KGh0bWwpO1xuICB2YXIgdGFnTmFtZTtcbiAgaWYgKGkgPT09IC0xKSB7XG4gICAgdGFnTmFtZSA9IGh0bWwuc2xpY2UoMSwgLTEpO1xuICB9IGVsc2Uge1xuICAgIHRhZ05hbWUgPSBodG1sLnNsaWNlKDEsIGkgKyAxKTtcbiAgfVxuICB0YWdOYW1lID0gXy50cmltKHRhZ05hbWUpLnRvTG93ZXJDYXNlKCk7XG4gIGlmICh0YWdOYW1lLnNsaWNlKDAsIDEpID09PSBcIi9cIikgdGFnTmFtZSA9IHRhZ05hbWUuc2xpY2UoMSk7XG4gIGlmICh0YWdOYW1lLnNsaWNlKC0xKSA9PT0gXCIvXCIpIHRhZ05hbWUgPSB0YWdOYW1lLnNsaWNlKDAsIC0xKTtcbiAgcmV0dXJuIHRhZ05hbWU7XG59XG5cbi8qKlxuICogaXMgY2xvc2UgdGFnP1xuICpcbiAqIEBwYXJhbSB7U3RyaW5nfSBodG1sIOWmgu+8mic8YSBoZWY9XCIjXCI+J1xuICogQHJldHVybiB7Qm9vbGVhbn1cbiAqL1xuZnVuY3Rpb24gaXNDbG9zaW5nKGh0bWwpIHtcbiAgcmV0dXJuIGh0bWwuc2xpY2UoMCwgMikgPT09IFwiPC9cIjtcbn1cblxuLyoqXG4gKiBwYXJzZSBpbnB1dCBodG1sIGFuZCByZXR1cm5zIHByb2Nlc3NlZCBodG1sXG4gKlxuICogQHBhcmFtIHtTdHJpbmd9IGh0bWxcbiAqIEBwYXJhbSB7RnVuY3Rpb259IG9uVGFnIGUuZy4gZnVuY3Rpb24gKHNvdXJjZVBvc2l0aW9uLCBwb3NpdGlvbiwgdGFnLCBodG1sLCBpc0Nsb3NpbmcpXG4gKiBAcGFyYW0ge0Z1bmN0aW9ufSBlc2NhcGVIdG1sXG4gKiBAcmV0dXJuIHtTdHJpbmd9XG4gKi9cbmZ1bmN0aW9uIHBhcnNlVGFnKGh0bWwsIG9uVGFnLCBlc2NhcGVIdG1sKSB7XG4gIFwidXNlIHN0cmljdFwiO1xuXG4gIHZhciByZXRodG1sID0gXCJcIjtcbiAgdmFyIGxhc3RQb3MgPSAwO1xuICB2YXIgdGFnU3RhcnQgPSBmYWxzZTtcbiAgdmFyIHF1b3RlU3RhcnQgPSBmYWxzZTtcbiAgdmFyIGN1cnJlbnRQb3MgPSAwO1xuICB2YXIgbGVuID0gaHRtbC5sZW5ndGg7XG4gIHZhciBjdXJyZW50VGFnTmFtZSA9IFwiXCI7XG4gIHZhciBjdXJyZW50SHRtbCA9IFwiXCI7XG5cbiAgY2hhcml0ZXJhdG9yOiBmb3IgKGN1cnJlbnRQb3MgPSAwOyBjdXJyZW50UG9zIDwgbGVuOyBjdXJyZW50UG9zKyspIHtcbiAgICB2YXIgYyA9IGh0bWwuY2hhckF0KGN1cnJlbnRQb3MpO1xuICAgIGlmICh0YWdTdGFydCA9PT0gZmFsc2UpIHtcbiAgICAgIGlmIChjID09PSBcIjxcIikge1xuICAgICAgICB0YWdTdGFydCA9IGN1cnJlbnRQb3M7XG4gICAgICAgIGNvbnRpbnVlO1xuICAgICAgfVxuICAgIH0gZWxzZSB7XG4gICAgICBpZiAocXVvdGVTdGFydCA9PT0gZmFsc2UpIHtcbiAgICAgICAgaWYgKGMgPT09IFwiPFwiKSB7XG4gICAgICAgICAgcmV0aHRtbCArPSBlc2NhcGVIdG1sKGh0bWwuc2xpY2UobGFzdFBvcywgY3VycmVudFBvcykpO1xuICAgICAgICAgIHRhZ1N0YXJ0ID0gY3VycmVudFBvcztcbiAgICAgICAgICBsYXN0UG9zID0gY3VycmVudFBvcztcbiAgICAgICAgICBjb250aW51ZTtcbiAgICAgICAgfVxuICAgICAgICBpZiAoYyA9PT0gXCI+XCIgfHwgY3VycmVudFBvcyA9PT0gbGVuIC0gMSkge1xuICAgICAgICAgIHJldGh0bWwgKz0gZXNjYXBlSHRtbChodG1sLnNsaWNlKGxhc3RQb3MsIHRhZ1N0YXJ0KSk7XG4gICAgICAgICAgY3VycmVudEh0bWwgPSBodG1sLnNsaWNlKHRhZ1N0YXJ0LCBjdXJyZW50UG9zICsgMSk7XG4gICAgICAgICAgY3VycmVudFRhZ05hbWUgPSBnZXRUYWdOYW1lKGN1cnJlbnRIdG1sKTtcbiAgICAgICAgICByZXRodG1sICs9IG9uVGFnKFxuICAgICAgICAgICAgdGFnU3RhcnQsXG4gICAgICAgICAgICByZXRodG1sLmxlbmd0aCxcbiAgICAgICAgICAgIGN1cnJlbnRUYWdOYW1lLFxuICAgICAgICAgICAgY3VycmVudEh0bWwsXG4gICAgICAgICAgICBpc0Nsb3NpbmcoY3VycmVudEh0bWwpXG4gICAgICAgICAgKTtcbiAgICAgICAgICBsYXN0UG9zID0gY3VycmVudFBvcyArIDE7XG4gICAgICAgICAgdGFnU3RhcnQgPSBmYWxzZTtcbiAgICAgICAgICBjb250aW51ZTtcbiAgICAgICAgfVxuICAgICAgICBpZiAoYyA9PT0gJ1wiJyB8fCBjID09PSBcIidcIikge1xuICAgICAgICAgIHZhciBpID0gMTtcbiAgICAgICAgICB2YXIgaWMgPSBodG1sLmNoYXJBdChjdXJyZW50UG9zIC0gaSk7XG5cbiAgICAgICAgICB3aGlsZSAoaWMudHJpbSgpID09PSBcIlwiIHx8IGljID09PSBcIj1cIikge1xuICAgICAgICAgICAgaWYgKGljID09PSBcIj1cIikge1xuICAgICAgICAgICAgICBxdW90ZVN0YXJ0ID0gYztcbiAgICAgICAgICAgICAgY29udGludWUgY2hhcml0ZXJhdG9yO1xuICAgICAgICAgICAgfVxuICAgICAgICAgICAgaWMgPSBodG1sLmNoYXJBdChjdXJyZW50UG9zIC0gKytpKTtcbiAgICAgICAgICB9XG4gICAgICAgIH1cbiAgICAgIH0gZWxzZSB7XG4gICAgICAgIGlmIChjID09PSBxdW90ZVN0YXJ0KSB7XG4gICAgICAgICAgcXVvdGVTdGFydCA9IGZhbHNlO1xuICAgICAgICAgIGNvbnRpbnVlO1xuICAgICAgICB9XG4gICAgICB9XG4gICAgfVxuICB9XG4gIGlmIChsYXN0UG9zIDwgbGVuKSB7XG4gICAgcmV0aHRtbCArPSBlc2NhcGVIdG1sKGh0bWwuc3Vic3RyKGxhc3RQb3MpKTtcbiAgfVxuXG4gIHJldHVybiByZXRodG1sO1xufVxuXG52YXIgUkVHRVhQX0lMTEVHQUxfQVRUUl9OQU1FID0gL1teYS16QS1aMC05XFxcXF86Li1dL2dpbTtcblxuLyoqXG4gKiBwYXJzZSBpbnB1dCBhdHRyaWJ1dGVzIGFuZCByZXR1cm5zIHByb2Nlc3NlZCBhdHRyaWJ1dGVzXG4gKlxuICogQHBhcmFtIHtTdHJpbmd9IGh0bWwgZS5nLiBgaHJlZj1cIiNcIiB0YXJnZXQ9XCJfYmxhbmtcImBcbiAqIEBwYXJhbSB7RnVuY3Rpb259IG9uQXR0ciBlLmcuIGBmdW5jdGlvbiAobmFtZSwgdmFsdWUpYFxuICogQHJldHVybiB7U3RyaW5nfVxuICovXG5mdW5jdGlvbiBwYXJzZUF0dHIoaHRtbCwgb25BdHRyKSB7XG4gIFwidXNlIHN0cmljdFwiO1xuXG4gIHZhciBsYXN0UG9zID0gMDtcbiAgdmFyIGxhc3RNYXJrUG9zID0gMDtcbiAgdmFyIHJldEF0dHJzID0gW107XG4gIHZhciB0bXBOYW1lID0gZmFsc2U7XG4gIHZhciBsZW4gPSBodG1sLmxlbmd0aDtcblxuICBmdW5jdGlvbiBhZGRBdHRyKG5hbWUsIHZhbHVlKSB7XG4gICAgbmFtZSA9IF8udHJpbShuYW1lKTtcbiAgICBuYW1lID0gbmFtZS5yZXBsYWNlKFJFR0VYUF9JTExFR0FMX0FUVFJfTkFNRSwgXCJcIikudG9Mb3dlckNhc2UoKTtcbiAgICBpZiAobmFtZS5sZW5ndGggPCAxKSByZXR1cm47XG4gICAgdmFyIHJldCA9IG9uQXR0cihuYW1lLCB2YWx1ZSB8fCBcIlwiKTtcbiAgICBpZiAocmV0KSByZXRBdHRycy5wdXNoKHJldCk7XG4gIH1cblxuICAvLyDpgJDkuKrliIbmnpDlrZfnrKZcbiAgZm9yICh2YXIgaSA9IDA7IGkgPCBsZW47IGkrKykge1xuICAgIHZhciBjID0gaHRtbC5jaGFyQXQoaSk7XG4gICAgdmFyIHYsIGo7XG4gICAgaWYgKHRtcE5hbWUgPT09IGZhbHNlICYmIGMgPT09IFwiPVwiKSB7XG4gICAgICB0bXBOYW1lID0gaHRtbC5zbGljZShsYXN0UG9zLCBpKTtcbiAgICAgIGxhc3RQb3MgPSBpICsgMTtcbiAgICAgIGxhc3RNYXJrUG9zID0gaHRtbC5jaGFyQXQobGFzdFBvcykgPT09ICdcIicgfHwgaHRtbC5jaGFyQXQobGFzdFBvcykgPT09IFwiJ1wiID8gbGFzdFBvcyA6IGZpbmROZXh0UXVvdGF0aW9uTWFyayhodG1sLCBpICsgMSk7XG4gICAgICBjb250aW51ZTtcbiAgICB9XG4gICAgaWYgKHRtcE5hbWUgIT09IGZhbHNlKSB7XG4gICAgICBpZiAoXG4gICAgICAgIGkgPT09IGxhc3RNYXJrUG9zXG4gICAgICApIHtcbiAgICAgICAgaiA9IGh0bWwuaW5kZXhPZihjLCBpICsgMSk7XG4gICAgICAgIGlmIChqID09PSAtMSkge1xuICAgICAgICAgIGJyZWFrO1xuICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgIHYgPSBfLnRyaW0oaHRtbC5zbGljZShsYXN0TWFya1BvcyArIDEsIGopKTtcbiAgICAgICAgICBhZGRBdHRyKHRtcE5hbWUsIHYpO1xuICAgICAgICAgIHRtcE5hbWUgPSBmYWxzZTtcbiAgICAgICAgICBpID0gajtcbiAgICAgICAgICBsYXN0UG9zID0gaSArIDE7XG4gICAgICAgICAgY29udGludWU7XG4gICAgICAgIH1cbiAgICAgIH1cbiAgICB9XG4gICAgaWYgKC9cXHN8XFxufFxcdC8udGVzdChjKSkge1xuICAgICAgaHRtbCA9IGh0bWwucmVwbGFjZSgvXFxzfFxcbnxcXHQvZywgXCIgXCIpO1xuICAgICAgaWYgKHRtcE5hbWUgPT09IGZhbHNlKSB7XG4gICAgICAgIGogPSBmaW5kTmV4dEVxdWFsKGh0bWwsIGkpO1xuICAgICAgICBpZiAoaiA9PT0gLTEpIHtcbiAgICAgICAgICB2ID0gXy50cmltKGh0bWwuc2xpY2UobGFzdFBvcywgaSkpO1xuICAgICAgICAgIGFkZEF0dHIodik7XG4gICAgICAgICAgdG1wTmFtZSA9IGZhbHNlO1xuICAgICAgICAgIGxhc3RQb3MgPSBpICsgMTtcbiAgICAgICAgICBjb250aW51ZTtcbiAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICBpID0gaiAtIDE7XG4gICAgICAgICAgY29udGludWU7XG4gICAgICAgIH1cbiAgICAgIH0gZWxzZSB7XG4gICAgICAgIGogPSBmaW5kQmVmb3JlRXF1YWwoaHRtbCwgaSAtIDEpO1xuICAgICAgICBpZiAoaiA9PT0gLTEpIHtcbiAgICAgICAgICB2ID0gXy50cmltKGh0bWwuc2xpY2UobGFzdFBvcywgaSkpO1xuICAgICAgICAgIHYgPSBzdHJpcFF1b3RlV3JhcCh2KTtcbiAgICAgICAgICBhZGRBdHRyKHRtcE5hbWUsIHYpO1xuICAgICAgICAgIHRtcE5hbWUgPSBmYWxzZTtcbiAgICAgICAgICBsYXN0UG9zID0gaSArIDE7XG4gICAgICAgICAgY29udGludWU7XG4gICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgY29udGludWU7XG4gICAgICAgIH1cbiAgICAgIH1cbiAgICB9XG4gIH1cblxuICBpZiAobGFzdFBvcyA8IGh0bWwubGVuZ3RoKSB7XG4gICAgaWYgKHRtcE5hbWUgPT09IGZhbHNlKSB7XG4gICAgICBhZGRBdHRyKGh0bWwuc2xpY2UobGFzdFBvcykpO1xuICAgIH0gZWxzZSB7XG4gICAgICBhZGRBdHRyKHRtcE5hbWUsIHN0cmlwUXVvdGVXcmFwKF8udHJpbShodG1sLnNsaWNlKGxhc3RQb3MpKSkpO1xuICAgIH1cbiAgfVxuXG4gIHJldHVybiBfLnRyaW0ocmV0QXR0cnMuam9pbihcIiBcIikpO1xufVxuXG5mdW5jdGlvbiBmaW5kTmV4dEVxdWFsKHN0ciwgaSkge1xuICBmb3IgKDsgaSA8IHN0ci5sZW5ndGg7IGkrKykge1xuICAgIHZhciBjID0gc3RyW2ldO1xuICAgIGlmIChjID09PSBcIiBcIikgY29udGludWU7XG4gICAgaWYgKGMgPT09IFwiPVwiKSByZXR1cm4gaTtcbiAgICByZXR1cm4gLTE7XG4gIH1cbn1cblxuZnVuY3Rpb24gZmluZE5leHRRdW90YXRpb25NYXJrKHN0ciwgaSkge1xuICBmb3IgKDsgaSA8IHN0ci5sZW5ndGg7IGkrKykge1xuICAgIHZhciBjID0gc3RyW2ldO1xuICAgIGlmIChjID09PSBcIiBcIikgY29udGludWU7XG4gICAgaWYgKGMgPT09IFwiJ1wiIHx8IGMgPT09ICdcIicpIHJldHVybiBpO1xuICAgIHJldHVybiAtMTtcbiAgfVxufVxuXG5mdW5jdGlvbiBmaW5kQmVmb3JlRXF1YWwoc3RyLCBpKSB7XG4gIGZvciAoOyBpID4gMDsgaS0tKSB7XG4gICAgdmFyIGMgPSBzdHJbaV07XG4gICAgaWYgKGMgPT09IFwiIFwiKSBjb250aW51ZTtcbiAgICBpZiAoYyA9PT0gXCI9XCIpIHJldHVybiBpO1xuICAgIHJldHVybiAtMTtcbiAgfVxufVxuXG5mdW5jdGlvbiBpc1F1b3RlV3JhcFN0cmluZyh0ZXh0KSB7XG4gIGlmIChcbiAgICAodGV4dFswXSA9PT0gJ1wiJyAmJiB0ZXh0W3RleHQubGVuZ3RoIC0gMV0gPT09ICdcIicpIHx8XG4gICAgKHRleHRbMF0gPT09IFwiJ1wiICYmIHRleHRbdGV4dC5sZW5ndGggLSAxXSA9PT0gXCInXCIpXG4gICkge1xuICAgIHJldHVybiB0cnVlO1xuICB9IGVsc2Uge1xuICAgIHJldHVybiBmYWxzZTtcbiAgfVxufVxuXG5mdW5jdGlvbiBzdHJpcFF1b3RlV3JhcCh0ZXh0KSB7XG4gIGlmIChpc1F1b3RlV3JhcFN0cmluZyh0ZXh0KSkge1xuICAgIHJldHVybiB0ZXh0LnN1YnN0cigxLCB0ZXh0Lmxlbmd0aCAtIDIpO1xuICB9IGVsc2Uge1xuICAgIHJldHVybiB0ZXh0O1xuICB9XG59XG5cbmV4cG9ydHMucGFyc2VUYWcgPSBwYXJzZVRhZztcbmV4cG9ydHMucGFyc2VBdHRyID0gcGFyc2VBdHRyO1xuIiwibW9kdWxlLmV4cG9ydHMgPSB7XG4gIGluZGV4T2Y6IGZ1bmN0aW9uIChhcnIsIGl0ZW0pIHtcbiAgICB2YXIgaSwgajtcbiAgICBpZiAoQXJyYXkucHJvdG90eXBlLmluZGV4T2YpIHtcbiAgICAgIHJldHVybiBhcnIuaW5kZXhPZihpdGVtKTtcbiAgICB9XG4gICAgZm9yIChpID0gMCwgaiA9IGFyci5sZW5ndGg7IGkgPCBqOyBpKyspIHtcbiAgICAgIGlmIChhcnJbaV0gPT09IGl0ZW0pIHtcbiAgICAgICAgcmV0dXJuIGk7XG4gICAgICB9XG4gICAgfVxuICAgIHJldHVybiAtMTtcbiAgfSxcbiAgZm9yRWFjaDogZnVuY3Rpb24gKGFyciwgZm4sIHNjb3BlKSB7XG4gICAgdmFyIGksIGo7XG4gICAgaWYgKEFycmF5LnByb3RvdHlwZS5mb3JFYWNoKSB7XG4gICAgICByZXR1cm4gYXJyLmZvckVhY2goZm4sIHNjb3BlKTtcbiAgICB9XG4gICAgZm9yIChpID0gMCwgaiA9IGFyci5sZW5ndGg7IGkgPCBqOyBpKyspIHtcbiAgICAgIGZuLmNhbGwoc2NvcGUsIGFycltpXSwgaSwgYXJyKTtcbiAgICB9XG4gIH0sXG4gIHRyaW06IGZ1bmN0aW9uIChzdHIpIHtcbiAgICBpZiAoU3RyaW5nLnByb3RvdHlwZS50cmltKSB7XG4gICAgICByZXR1cm4gc3RyLnRyaW0oKTtcbiAgICB9XG4gICAgcmV0dXJuIHN0ci5yZXBsYWNlKC8oXlxccyopfChcXHMqJCkvZywgXCJcIik7XG4gIH0sXG4gIHNwYWNlSW5kZXg6IGZ1bmN0aW9uIChzdHIpIHtcbiAgICB2YXIgcmVnID0gL1xcc3xcXG58XFx0LztcbiAgICB2YXIgbWF0Y2ggPSByZWcuZXhlYyhzdHIpO1xuICAgIHJldHVybiBtYXRjaCA/IG1hdGNoLmluZGV4IDogLTE7XG4gIH0sXG59O1xuIiwiLyoqXG4gKiBmaWx0ZXIgeHNzXG4gKlxuICogQGF1dGhvciBab25nbWluIExlaTxsZWl6b25nbWluQGdtYWlsLmNvbT5cbiAqL1xuXG52YXIgRmlsdGVyQ1NTID0gcmVxdWlyZShcImNzc2ZpbHRlclwiKS5GaWx0ZXJDU1M7XG52YXIgREVGQVVMVCA9IHJlcXVpcmUoXCIuL2RlZmF1bHRcIik7XG52YXIgcGFyc2VyID0gcmVxdWlyZShcIi4vcGFyc2VyXCIpO1xudmFyIHBhcnNlVGFnID0gcGFyc2VyLnBhcnNlVGFnO1xudmFyIHBhcnNlQXR0ciA9IHBhcnNlci5wYXJzZUF0dHI7XG52YXIgXyA9IHJlcXVpcmUoXCIuL3V0aWxcIik7XG5cbi8qKlxuICogcmV0dXJucyBgdHJ1ZWAgaWYgdGhlIGlucHV0IHZhbHVlIGlzIGB1bmRlZmluZWRgIG9yIGBudWxsYFxuICpcbiAqIEBwYXJhbSB7T2JqZWN0fSBvYmpcbiAqIEByZXR1cm4ge0Jvb2xlYW59XG4gKi9cbmZ1bmN0aW9uIGlzTnVsbChvYmopIHtcbiAgcmV0dXJuIG9iaiA9PT0gdW5kZWZpbmVkIHx8IG9iaiA9PT0gbnVsbDtcbn1cblxuLyoqXG4gKiBnZXQgYXR0cmlidXRlcyBmb3IgYSB0YWdcbiAqXG4gKiBAcGFyYW0ge1N0cmluZ30gaHRtbFxuICogQHJldHVybiB7T2JqZWN0fVxuICogICAtIHtTdHJpbmd9IGh0bWxcbiAqICAgLSB7Qm9vbGVhbn0gY2xvc2luZ1xuICovXG5mdW5jdGlvbiBnZXRBdHRycyhodG1sKSB7XG4gIHZhciBpID0gXy5zcGFjZUluZGV4KGh0bWwpO1xuICBpZiAoaSA9PT0gLTEpIHtcbiAgICByZXR1cm4ge1xuICAgICAgaHRtbDogXCJcIixcbiAgICAgIGNsb3Npbmc6IGh0bWxbaHRtbC5sZW5ndGggLSAyXSA9PT0gXCIvXCIsXG4gICAgfTtcbiAgfVxuICBodG1sID0gXy50cmltKGh0bWwuc2xpY2UoaSArIDEsIC0xKSk7XG4gIHZhciBpc0Nsb3NpbmcgPSBodG1sW2h0bWwubGVuZ3RoIC0gMV0gPT09IFwiL1wiO1xuICBpZiAoaXNDbG9zaW5nKSBodG1sID0gXy50cmltKGh0bWwuc2xpY2UoMCwgLTEpKTtcbiAgcmV0dXJuIHtcbiAgICBodG1sOiBodG1sLFxuICAgIGNsb3Npbmc6IGlzQ2xvc2luZyxcbiAgfTtcbn1cblxuLyoqXG4gKiBzaGFsbG93IGNvcHlcbiAqXG4gKiBAcGFyYW0ge09iamVjdH0gb2JqXG4gKiBAcmV0dXJuIHtPYmplY3R9XG4gKi9cbmZ1bmN0aW9uIHNoYWxsb3dDb3B5T2JqZWN0KG9iaikge1xuICB2YXIgcmV0ID0ge307XG4gIGZvciAodmFyIGkgaW4gb2JqKSB7XG4gICAgcmV0W2ldID0gb2JqW2ldO1xuICB9XG4gIHJldHVybiByZXQ7XG59XG5cbmZ1bmN0aW9uIGtleXNUb0xvd2VyQ2FzZShvYmopIHtcbiAgdmFyIHJldCA9IHt9O1xuICBmb3IgKHZhciBpIGluIG9iaikge1xuICAgIGlmIChBcnJheS5pc0FycmF5KG9ialtpXSkpIHtcbiAgICAgIHJldFtpLnRvTG93ZXJDYXNlKCldID0gb2JqW2ldLm1hcChmdW5jdGlvbiAoaXRlbSkge1xuICAgICAgICByZXR1cm4gaXRlbS50b0xvd2VyQ2FzZSgpO1xuICAgICAgfSk7XG4gICAgfSBlbHNlIHtcbiAgICAgIHJldFtpLnRvTG93ZXJDYXNlKCldID0gb2JqW2ldO1xuICAgIH1cbiAgfVxuICByZXR1cm4gcmV0O1xufVxuXG4vKipcbiAqIEZpbHRlclhTUyBjbGFzc1xuICpcbiAqIEBwYXJhbSB7T2JqZWN0fSBvcHRpb25zXG4gKiAgICAgICAgd2hpdGVMaXN0IChvciBhbGxvd0xpc3QpLCBvblRhZywgb25UYWdBdHRyLCBvbklnbm9yZVRhZyxcbiAqICAgICAgICBvbklnbm9yZVRhZ0F0dHIsIHNhZmVBdHRyVmFsdWUsIGVzY2FwZUh0bWxcbiAqICAgICAgICBzdHJpcElnbm9yZVRhZ0JvZHksIGFsbG93Q29tbWVudFRhZywgc3RyaXBCbGFua0NoYXJcbiAqICAgICAgICBjc3N7d2hpdGVMaXN0LCBvbkF0dHIsIG9uSWdub3JlQXR0cn0gYGNzcz1mYWxzZWAgbWVhbnMgZG9uJ3QgdXNlIGBjc3NmaWx0ZXJgXG4gKi9cbmZ1bmN0aW9uIEZpbHRlclhTUyhvcHRpb25zKSB7XG4gIG9wdGlvbnMgPSBzaGFsbG93Q29weU9iamVjdChvcHRpb25zIHx8IHt9KTtcblxuICBpZiAob3B0aW9ucy5zdHJpcElnbm9yZVRhZykge1xuICAgIGlmIChvcHRpb25zLm9uSWdub3JlVGFnKSB7XG4gICAgICBjb25zb2xlLmVycm9yKFxuICAgICAgICAnTm90ZXM6IGNhbm5vdCB1c2UgdGhlc2UgdHdvIG9wdGlvbnMgXCJzdHJpcElnbm9yZVRhZ1wiIGFuZCBcIm9uSWdub3JlVGFnXCIgYXQgdGhlIHNhbWUgdGltZSdcbiAgICAgICk7XG4gICAgfVxuICAgIG9wdGlvbnMub25JZ25vcmVUYWcgPSBERUZBVUxULm9uSWdub3JlVGFnU3RyaXBBbGw7XG4gIH1cbiAgaWYgKG9wdGlvbnMud2hpdGVMaXN0IHx8IG9wdGlvbnMuYWxsb3dMaXN0KSB7XG4gICAgb3B0aW9ucy53aGl0ZUxpc3QgPSBrZXlzVG9Mb3dlckNhc2Uob3B0aW9ucy53aGl0ZUxpc3QgfHwgb3B0aW9ucy5hbGxvd0xpc3QpO1xuICB9IGVsc2Uge1xuICAgIG9wdGlvbnMud2hpdGVMaXN0ID0gREVGQVVMVC53aGl0ZUxpc3Q7XG4gIH1cblxuICBvcHRpb25zLm9uVGFnID0gb3B0aW9ucy5vblRhZyB8fCBERUZBVUxULm9uVGFnO1xuICBvcHRpb25zLm9uVGFnQXR0ciA9IG9wdGlvbnMub25UYWdBdHRyIHx8IERFRkFVTFQub25UYWdBdHRyO1xuICBvcHRpb25zLm9uSWdub3JlVGFnID0gb3B0aW9ucy5vbklnbm9yZVRhZyB8fCBERUZBVUxULm9uSWdub3JlVGFnO1xuICBvcHRpb25zLm9uSWdub3JlVGFnQXR0ciA9IG9wdGlvbnMub25JZ25vcmVUYWdBdHRyIHx8IERFRkFVTFQub25JZ25vcmVUYWdBdHRyO1xuICBvcHRpb25zLnNhZmVBdHRyVmFsdWUgPSBvcHRpb25zLnNhZmVBdHRyVmFsdWUgfHwgREVGQVVMVC5zYWZlQXR0clZhbHVlO1xuICBvcHRpb25zLmVzY2FwZUh0bWwgPSBvcHRpb25zLmVzY2FwZUh0bWwgfHwgREVGQVVMVC5lc2NhcGVIdG1sO1xuICB0aGlzLm9wdGlvbnMgPSBvcHRpb25zO1xuXG4gIGlmIChvcHRpb25zLmNzcyA9PT0gZmFsc2UpIHtcbiAgICB0aGlzLmNzc0ZpbHRlciA9IGZhbHNlO1xuICB9IGVsc2Uge1xuICAgIG9wdGlvbnMuY3NzID0gb3B0aW9ucy5jc3MgfHwge307XG4gICAgdGhpcy5jc3NGaWx0ZXIgPSBuZXcgRmlsdGVyQ1NTKG9wdGlvbnMuY3NzKTtcbiAgfVxufVxuXG4vKipcbiAqIHN0YXJ0IHByb2Nlc3MgYW5kIHJldHVybnMgcmVzdWx0XG4gKlxuICogQHBhcmFtIHtTdHJpbmd9IGh0bWxcbiAqIEByZXR1cm4ge1N0cmluZ31cbiAqL1xuRmlsdGVyWFNTLnByb3RvdHlwZS5wcm9jZXNzID0gZnVuY3Rpb24gKGh0bWwpIHtcbiAgLy8gY29tcGF0aWJsZSB3aXRoIHRoZSBpbnB1dFxuICBodG1sID0gaHRtbCB8fCBcIlwiO1xuICBodG1sID0gaHRtbC50b1N0cmluZygpO1xuICBpZiAoIWh0bWwpIHJldHVybiBcIlwiO1xuXG4gIHZhciBtZSA9IHRoaXM7XG4gIHZhciBvcHRpb25zID0gbWUub3B0aW9ucztcbiAgdmFyIHdoaXRlTGlzdCA9IG9wdGlvbnMud2hpdGVMaXN0O1xuICB2YXIgb25UYWcgPSBvcHRpb25zLm9uVGFnO1xuICB2YXIgb25JZ25vcmVUYWcgPSBvcHRpb25zLm9uSWdub3JlVGFnO1xuICB2YXIgb25UYWdBdHRyID0gb3B0aW9ucy5vblRhZ0F0dHI7XG4gIHZhciBvbklnbm9yZVRhZ0F0dHIgPSBvcHRpb25zLm9uSWdub3JlVGFnQXR0cjtcbiAgdmFyIHNhZmVBdHRyVmFsdWUgPSBvcHRpb25zLnNhZmVBdHRyVmFsdWU7XG4gIHZhciBlc2NhcGVIdG1sID0gb3B0aW9ucy5lc2NhcGVIdG1sO1xuICB2YXIgY3NzRmlsdGVyID0gbWUuY3NzRmlsdGVyO1xuXG4gIC8vIHJlbW92ZSBpbnZpc2libGUgY2hhcmFjdGVyc1xuICBpZiAob3B0aW9ucy5zdHJpcEJsYW5rQ2hhcikge1xuICAgIGh0bWwgPSBERUZBVUxULnN0cmlwQmxhbmtDaGFyKGh0bWwpO1xuICB9XG5cbiAgLy8gcmVtb3ZlIGh0bWwgY29tbWVudHNcbiAgaWYgKCFvcHRpb25zLmFsbG93Q29tbWVudFRhZykge1xuICAgIGh0bWwgPSBERUZBVUxULnN0cmlwQ29tbWVudFRhZyhodG1sKTtcbiAgfVxuXG4gIC8vIGlmIGVuYWJsZSBzdHJpcElnbm9yZVRhZ0JvZHlcbiAgdmFyIHN0cmlwSWdub3JlVGFnQm9keSA9IGZhbHNlO1xuICBpZiAob3B0aW9ucy5zdHJpcElnbm9yZVRhZ0JvZHkpIHtcbiAgICBzdHJpcElnbm9yZVRhZ0JvZHkgPSBERUZBVUxULlN0cmlwVGFnQm9keShcbiAgICAgIG9wdGlvbnMuc3RyaXBJZ25vcmVUYWdCb2R5LFxuICAgICAgb25JZ25vcmVUYWdcbiAgICApO1xuICAgIG9uSWdub3JlVGFnID0gc3RyaXBJZ25vcmVUYWdCb2R5Lm9uSWdub3JlVGFnO1xuICB9XG5cbiAgdmFyIHJldEh0bWwgPSBwYXJzZVRhZyhcbiAgICBodG1sLFxuICAgIGZ1bmN0aW9uIChzb3VyY2VQb3NpdGlvbiwgcG9zaXRpb24sIHRhZywgaHRtbCwgaXNDbG9zaW5nKSB7XG4gICAgICB2YXIgaW5mbyA9IHtcbiAgICAgICAgc291cmNlUG9zaXRpb246IHNvdXJjZVBvc2l0aW9uLFxuICAgICAgICBwb3NpdGlvbjogcG9zaXRpb24sXG4gICAgICAgIGlzQ2xvc2luZzogaXNDbG9zaW5nLFxuICAgICAgICBpc1doaXRlOiBPYmplY3QucHJvdG90eXBlLmhhc093blByb3BlcnR5LmNhbGwod2hpdGVMaXN0LCB0YWcpLFxuICAgICAgfTtcblxuICAgICAgLy8gY2FsbCBgb25UYWcoKWBcbiAgICAgIHZhciByZXQgPSBvblRhZyh0YWcsIGh0bWwsIGluZm8pO1xuICAgICAgaWYgKCFpc051bGwocmV0KSkgcmV0dXJuIHJldDtcblxuICAgICAgaWYgKGluZm8uaXNXaGl0ZSkge1xuICAgICAgICBpZiAoaW5mby5pc0Nsb3NpbmcpIHtcbiAgICAgICAgICByZXR1cm4gXCI8L1wiICsgdGFnICsgXCI+XCI7XG4gICAgICAgIH1cblxuICAgICAgICB2YXIgYXR0cnMgPSBnZXRBdHRycyhodG1sKTtcbiAgICAgICAgdmFyIHdoaXRlQXR0ckxpc3QgPSB3aGl0ZUxpc3RbdGFnXTtcbiAgICAgICAgdmFyIGF0dHJzSHRtbCA9IHBhcnNlQXR0cihhdHRycy5odG1sLCBmdW5jdGlvbiAobmFtZSwgdmFsdWUpIHtcbiAgICAgICAgICAvLyBjYWxsIGBvblRhZ0F0dHIoKWBcbiAgICAgICAgICB2YXIgaXNXaGl0ZUF0dHIgPSBfLmluZGV4T2Yod2hpdGVBdHRyTGlzdCwgbmFtZSkgIT09IC0xO1xuICAgICAgICAgIHZhciByZXQgPSBvblRhZ0F0dHIodGFnLCBuYW1lLCB2YWx1ZSwgaXNXaGl0ZUF0dHIpO1xuICAgICAgICAgIGlmICghaXNOdWxsKHJldCkpIHJldHVybiByZXQ7XG5cbiAgICAgICAgICBpZiAoaXNXaGl0ZUF0dHIpIHtcbiAgICAgICAgICAgIC8vIGNhbGwgYHNhZmVBdHRyVmFsdWUoKWBcbiAgICAgICAgICAgIHZhbHVlID0gc2FmZUF0dHJWYWx1ZSh0YWcsIG5hbWUsIHZhbHVlLCBjc3NGaWx0ZXIpO1xuICAgICAgICAgICAgaWYgKHZhbHVlKSB7XG4gICAgICAgICAgICAgIHJldHVybiBuYW1lICsgJz1cIicgKyB2YWx1ZSArICdcIic7XG4gICAgICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgICByZXR1cm4gbmFtZTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgLy8gY2FsbCBgb25JZ25vcmVUYWdBdHRyKClgXG4gICAgICAgICAgICByZXQgPSBvbklnbm9yZVRhZ0F0dHIodGFnLCBuYW1lLCB2YWx1ZSwgaXNXaGl0ZUF0dHIpO1xuICAgICAgICAgICAgaWYgKCFpc051bGwocmV0KSkgcmV0dXJuIHJldDtcbiAgICAgICAgICAgIHJldHVybjtcbiAgICAgICAgICB9XG4gICAgICAgIH0pO1xuXG4gICAgICAgIC8vIGJ1aWxkIG5ldyB0YWcgaHRtbFxuICAgICAgICBodG1sID0gXCI8XCIgKyB0YWc7XG4gICAgICAgIGlmIChhdHRyc0h0bWwpIGh0bWwgKz0gXCIgXCIgKyBhdHRyc0h0bWw7XG4gICAgICAgIGlmIChhdHRycy5jbG9zaW5nKSBodG1sICs9IFwiIC9cIjtcbiAgICAgICAgaHRtbCArPSBcIj5cIjtcbiAgICAgICAgcmV0dXJuIGh0bWw7XG4gICAgICB9IGVsc2Uge1xuICAgICAgICAvLyBjYWxsIGBvbklnbm9yZVRhZygpYFxuICAgICAgICByZXQgPSBvbklnbm9yZVRhZyh0YWcsIGh0bWwsIGluZm8pO1xuICAgICAgICBpZiAoIWlzTnVsbChyZXQpKSByZXR1cm4gcmV0O1xuICAgICAgICByZXR1cm4gZXNjYXBlSHRtbChodG1sKTtcbiAgICAgIH1cbiAgICB9LFxuICAgIGVzY2FwZUh0bWxcbiAgKTtcblxuICAvLyBpZiBlbmFibGUgc3RyaXBJZ25vcmVUYWdCb2R5XG4gIGlmIChzdHJpcElnbm9yZVRhZ0JvZHkpIHtcbiAgICByZXRIdG1sID0gc3RyaXBJZ25vcmVUYWdCb2R5LnJlbW92ZShyZXRIdG1sKTtcbiAgfVxuXG4gIHJldHVybiByZXRIdG1sO1xufTtcblxubW9kdWxlLmV4cG9ydHMgPSBGaWx0ZXJYU1M7XG4iLCJtb2R1bGUuZXhwb3J0cyA9IFNoaW55OyIsIi8vIFRoZSBtb2R1bGUgY2FjaGVcbnZhciBfX3dlYnBhY2tfbW9kdWxlX2NhY2hlX18gPSB7fTtcblxuLy8gVGhlIHJlcXVpcmUgZnVuY3Rpb25cbmZ1bmN0aW9uIF9fd2VicGFja19yZXF1aXJlX18obW9kdWxlSWQpIHtcblx0Ly8gQ2hlY2sgaWYgbW9kdWxlIGlzIGluIGNhY2hlXG5cdHZhciBjYWNoZWRNb2R1bGUgPSBfX3dlYnBhY2tfbW9kdWxlX2NhY2hlX19bbW9kdWxlSWRdO1xuXHRpZiAoY2FjaGVkTW9kdWxlICE9PSB1bmRlZmluZWQpIHtcblx0XHRyZXR1cm4gY2FjaGVkTW9kdWxlLmV4cG9ydHM7XG5cdH1cblx0Ly8gQ3JlYXRlIGEgbmV3IG1vZHVsZSAoYW5kIHB1dCBpdCBpbnRvIHRoZSBjYWNoZSlcblx0dmFyIG1vZHVsZSA9IF9fd2VicGFja19tb2R1bGVfY2FjaGVfX1ttb2R1bGVJZF0gPSB7XG5cdFx0Ly8gbm8gbW9kdWxlLmlkIG5lZWRlZFxuXHRcdC8vIG5vIG1vZHVsZS5sb2FkZWQgbmVlZGVkXG5cdFx0ZXhwb3J0czoge31cblx0fTtcblxuXHQvLyBFeGVjdXRlIHRoZSBtb2R1bGUgZnVuY3Rpb25cblx0X193ZWJwYWNrX21vZHVsZXNfX1ttb2R1bGVJZF0uY2FsbChtb2R1bGUuZXhwb3J0cywgbW9kdWxlLCBtb2R1bGUuZXhwb3J0cywgX193ZWJwYWNrX3JlcXVpcmVfXyk7XG5cblx0Ly8gUmV0dXJuIHRoZSBleHBvcnRzIG9mIHRoZSBtb2R1bGVcblx0cmV0dXJuIG1vZHVsZS5leHBvcnRzO1xufVxuXG4iLCIvLyBnZXREZWZhdWx0RXhwb3J0IGZ1bmN0aW9uIGZvciBjb21wYXRpYmlsaXR5IHdpdGggbm9uLWhhcm1vbnkgbW9kdWxlc1xuX193ZWJwYWNrX3JlcXVpcmVfXy5uID0gKG1vZHVsZSkgPT4ge1xuXHR2YXIgZ2V0dGVyID0gbW9kdWxlICYmIG1vZHVsZS5fX2VzTW9kdWxlID9cblx0XHQoKSA9PiAobW9kdWxlWydkZWZhdWx0J10pIDpcblx0XHQoKSA9PiAobW9kdWxlKTtcblx0X193ZWJwYWNrX3JlcXVpcmVfXy5kKGdldHRlciwgeyBhOiBnZXR0ZXIgfSk7XG5cdHJldHVybiBnZXR0ZXI7XG59OyIsIi8vIGRlZmluZSBnZXR0ZXIgZnVuY3Rpb25zIGZvciBoYXJtb255IGV4cG9ydHNcbl9fd2VicGFja19yZXF1aXJlX18uZCA9IChleHBvcnRzLCBkZWZpbml0aW9uKSA9PiB7XG5cdGZvcih2YXIga2V5IGluIGRlZmluaXRpb24pIHtcblx0XHRpZihfX3dlYnBhY2tfcmVxdWlyZV9fLm8oZGVmaW5pdGlvbiwga2V5KSAmJiAhX193ZWJwYWNrX3JlcXVpcmVfXy5vKGV4cG9ydHMsIGtleSkpIHtcblx0XHRcdE9iamVjdC5kZWZpbmVQcm9wZXJ0eShleHBvcnRzLCBrZXksIHsgZW51bWVyYWJsZTogdHJ1ZSwgZ2V0OiBkZWZpbml0aW9uW2tleV0gfSk7XG5cdFx0fVxuXHR9XG59OyIsIl9fd2VicGFja19yZXF1aXJlX18uZyA9IChmdW5jdGlvbigpIHtcblx0aWYgKHR5cGVvZiBnbG9iYWxUaGlzID09PSAnb2JqZWN0JykgcmV0dXJuIGdsb2JhbFRoaXM7XG5cdHRyeSB7XG5cdFx0cmV0dXJuIHRoaXMgfHwgbmV3IEZ1bmN0aW9uKCdyZXR1cm4gdGhpcycpKCk7XG5cdH0gY2F0Y2ggKGUpIHtcblx0XHRpZiAodHlwZW9mIHdpbmRvdyA9PT0gJ29iamVjdCcpIHJldHVybiB3aW5kb3c7XG5cdH1cbn0pKCk7IiwiX193ZWJwYWNrX3JlcXVpcmVfXy5vID0gKG9iaiwgcHJvcCkgPT4gKE9iamVjdC5wcm90b3R5cGUuaGFzT3duUHJvcGVydHkuY2FsbChvYmosIHByb3ApKSIsIi8vIGRlZmluZSBfX2VzTW9kdWxlIG9uIGV4cG9ydHNcbl9fd2VicGFja19yZXF1aXJlX18uciA9IChleHBvcnRzKSA9PiB7XG5cdGlmKHR5cGVvZiBTeW1ib2wgIT09ICd1bmRlZmluZWQnICYmIFN5bWJvbC50b1N0cmluZ1RhZykge1xuXHRcdE9iamVjdC5kZWZpbmVQcm9wZXJ0eShleHBvcnRzLCBTeW1ib2wudG9TdHJpbmdUYWcsIHsgdmFsdWU6ICdNb2R1bGUnIH0pO1xuXHR9XG5cdE9iamVjdC5kZWZpbmVQcm9wZXJ0eShleHBvcnRzLCAnX19lc01vZHVsZScsIHsgdmFsdWU6IHRydWUgfSk7XG59OyIsImltcG9ydCBcInNoaW55XCI7XG5pbXBvcnQge3NhdmVBc30gZnJvbSBcImZpbGUtc2F2ZXJcIjtcbmltcG9ydCBzd2FsIGZyb20gJ3N3ZWV0YWxlcnQnXG5pbXBvcnQgeHNzIGZyb20gXCJ4c3NcIjtcblxuXG5TaGlueS5hZGRDdXN0b21NZXNzYWdlSGFuZGxlcihcImJ1aWxkLW15RGF0YXNldFwiLCAoZGF0YSkgPT4ge1xuICAgIC8qKlxuICAgICAqIEJ1aWxkIHRoZSBjdXN0b20gZGF0YXNldCB0YWJsZS5cbiAgICAgKiBAcGFyYW0gZGF0YSBUaGUgZGF0YS5cbiAgICAgKiBAcGFyYW0gZGF0YS5pZCBUaGUgaWQgb2YgdGhlIHBhcmVudCBlbGVtZW50LlxuICAgICAqIEBwYXJhbSBkYXRhLm1heF9yb3dzIFRoZSBtYXhpbXVtIG51bWJlciBvZiByb3dzIGFsbG93ZWQuXG4gICAgICovXG4gICAgbGV0IHBhcmVudCA9IGRhdGFbXCJpZFwiXVxuICAgIGxldCBtYXhfcm93cyA9IGRhdGFbXCJtYXhSb3dzXCJdXG4gICAgbGV0ICRwYXJlbnRFbGVtZW50ID0gJChcIiNcIiArIHBhcmVudClcblxuICAgIGlmICgkcGFyZW50RWxlbWVudC5sZW5ndGggPiAwKSB7XG4gICAgICAgIGJ1aWxkQ3VzdG9tRGF0YXNldFRhYmxlKHBhcmVudCwgbWF4X3Jvd3MpO1xuXG4gICAgfVxuXG5cbn0pXG5cblxuU2hpbnkuYWRkQ3VzdG9tTWVzc2FnZUhhbmRsZXIoXCJhZGQtcm93LW15RGF0YXNldFwiLCAoZGF0YSkgPT4ge1xuICAgIC8qKlxuICAgICAqIEFkZCBhIHJvdyB0byB0aGUgY3VzdG9tIGRhdGFzZXQgdGFibGUuXG4gICAgICogQHBhcmFtIGRhdGEgVGhlIGRhdGEuXG4gICAgICogQHBhcmFtIGRhdGEuaWQgVGhlIGlkIG9mIHRoZSBwYXJlbnQgZWxlbWVudC5cbiAgICAgKiBAcGFyYW0gZGF0YS5uYW1lIFRoZSBuYW1lIG9mIHRoZSBkYXRhc2V0LlxuICAgICAqIEBwYXJhbSBkYXRhLmRlc2NyaXB0aW9uIFRoZSBkZXNjcmlwdGlvbiBvZiB0aGUgZGF0YXNldC5cbiAgICAgKiBAcGFyYW0gZGF0YS5zaXplIFRoZSBzaXplIG9mIHRoZSBkYXRhc2V0IChudW1iZXIgb2YgZG9ub3JzKS5cbiAgICAgKiBAcGFyYW0gZGF0YS5yb3dJZCBUaGUgaWQgb2YgdGhlIHJvdy5cbiAgICAgKi9cbiAgICBsZXQgcGFyZW50ID0gZGF0YVtcImlkXCJdXG4gICAgbGV0IHJvd0lkID0gZGF0YVtcInJvd19pZFwiXVxuICAgIGxldCBuYW1lID0geHNzKGRhdGFbXCJuYW1lXCJdKVxuICAgIGxldCBzaXplID0gZGF0YVtcInNpemVcIl1cbiAgICBsZXQgZGVzY3JpcHRpb24gPSB4c3MoZGF0YVtcImRlc2NyaXB0aW9uXCJdKVxuXG4gICAgbmFtZSA9IHZhbGlkYXRlTmFtZShwYXJlbnQsIG5hbWUpXG4gICAgaWYgKG5hbWUgIT09IGZhbHNlKSB7XG4gICAgICAgIGFkZFJvd1RvQ3VzdG9tRGF0YXNldFRhYmxlKHBhcmVudCwgcm93SWQsIG5hbWUsIGRlc2NyaXB0aW9uLCBzaXplKVxuICAgIH1cbn0pXG5cblNoaW55LmFkZEN1c3RvbU1lc3NhZ2VIYW5kbGVyKFwiZG93bmxvYWQtaGFuZGxlci1teURhdGFzZXRcIiwgKGRhdGEpID0+IHtcbiAgICAvKipcbiAgICAgKiBBIGhhbmRsZXIgdGhhdCBkb3dubG9hZHMgdGhlIGRhdGEuIFRoaXMgaXMgY2FsbGVkIHdoZW4gdGhlIHVzZXIgY2xpY2tzIHRoZSBkb3dubG9hZCBidXR0b24uXG4gICAgICogVGhlIGRhdGEgaXMgc2VudCB0byB0aGUgc2VydmVyIGFuZCB0aGUgc2VydmVyIHNlbmRzIGl0IGJhY2sgdG8gdGhlIGNsaWVudC5cbiAgICAgKiBAcGFyYW0gZGF0YSBUaGUgZGF0YSB0byBkb3dubG9hZC5cbiAgICAgKiBAcGFyYW0gZXh0ZW5zaW9uIFRoZSBleHRlbnNpb24gb2YgdGhlIGZpbGUuXG4gICAgICogQHBhcmFtIGZpbGVuYW1lIFRoZSBuYW1lIG9mIHRoZSBmaWxlLlxuICAgICAqL1xuICAgIC8vIENoZWNrIGlmIGRhdGEgaGFzIHRoZSBmb2xsb3dpbmcgcHJvcGVydGllczogW2ZpbGVuYW1lLCBleHRlbnNpb24sIGNvbnRlbnRdXG4gICAgaWYgKGRhdGEuaGFzT3duUHJvcGVydHkoXCJmaWxlbmFtZVwiKSAmJiBkYXRhLmhhc093blByb3BlcnR5KFwiZXh0ZW5zaW9uXCIpICYmIGRhdGEuaGFzT3duUHJvcGVydHkoXCJjb250ZW50XCIpKSB7XG4gICAgICAgIGlmIChkYXRhW1wiZXh0ZW5zaW9uXCJdID09PSBcImNzdlwiKSB7XG4gICAgICAgICAgICBsZXQgYmxvYiA9IG5ldyBCbG9iKFtkYXRhW1wiY29udGVudFwiXV0sIHt0eXBlOiBcInRleHQvY3N2O2NoYXJzZXQ9dXRmLThcIn0pXG4gICAgICAgICAgICBzYXZlQXMoYmxvYiwgZGF0YVtcImZpbGVuYW1lXCJdICsgXCIuXCIgKyBkYXRhW1wiZXh0ZW5zaW9uXCJdKVxuXG4gICAgICAgIH0gZWxzZSBpZiAoZGF0YVtcImV4dGVuc2lvblwiXSA9PT0gXCJqc29uXCIpIHtcbiAgICAgICAgICAgIGxldCBibG9iID0gbmV3IEJsb2IoW0pTT04uc3RyaW5naWZ5KGRhdGFbXCJjb250ZW50XCJdLCBudWxsLCAyKV0sIHt0eXBlOiBcInRleHQvcGxhaW47Y2hhcnNldD11dGYtOFwifSk7XG4gICAgICAgICAgICBzYXZlQXMoYmxvYiwgZGF0YVtcImZpbGVuYW1lXCJdICsgXCIuXCIgKyBkYXRhW1wiZXh0ZW5zaW9uXCJdKTtcbiAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgIEVycm9yKFwiRXh0ZW5zaW9uIG5vdCBzdXBwb3J0ZWQuXCIpXG4gICAgICAgIH1cblxuICAgIH0gZWxzZSB7XG4gICAgICAgIEVycm9yKFwiRGF0YSBkb2VzIG5vdCBoYXZlIHRoZSBjb3JyZWN0IHByb3BlcnRpZXMuXCIpXG4gICAgfVxufSlcblxuXG5TaGlueS5hZGRDdXN0b21NZXNzYWdlSGFuZGxlcihcInRvZ2dsZS1kb3dubG9hZC1idXR0b25cIiwgKGRhdGEpID0+IHtcbiAgICAvKipcbiAgICAgKiBUb2dnbGUgdGhlIGRvd25sb2FkIGJ1dHRvbi5cbiAgICAgKiBAcGFyYW0gZGF0YSBUaGUgZGF0YS5cbiAgICAgKiBAcGFyYW0gZGF0YS5wYXJlbnQgVGhlIGlkIG9mIHRoZSBwYXJlbnQgZWxlbWVudC5cbiAgICAgKiBAcGFyYW0gZGF0YS5kYXRhc2V0SUQgVGhlIGlkIG9mIHRoZSBkYXRhc2V0LlxuICAgICAqIEBwYXJhbSBkYXRhLmFjdGlvbiBUaGUgYWN0aW9uIHRvIHBlcmZvcm0uIEVpdGhlciBcInNob3dcIiBvciBcImhpZGVcIi5cbiAgICAgKi9cbiAgICBsZXQgcGFyZW50SUQgPSBkYXRhW1wicGFyZW50SURcIl1cbiAgICBsZXQgZGF0YXNldElEID0gZGF0YVtcImRhdGFzZXRJRFwiXVxuICAgIGxldCBhY3Rpb24gPSBkYXRhW1wiYWN0aW9uXCJdXG5cbiAgICAvLyBJZiBhY3Rpb24gaXMgbm90IHNob3cgb3IgaGlkZSwgZG8gbm90aGluZy5cbiAgICBpZiAoYWN0aW9uICE9PSBcInNob3dcIiAmJiBhY3Rpb24gIT09IFwiaGlkZVwiKSB7XG4gICAgICAgIEVycm9yKFwiQWN0aW9uIGlzIG5vdCBzaG93IG9yIGhpZGUuXCIpXG4gICAgfVxuXG4gICAgLy8gR2V0IHRoZSBkb3dubG9hZCBidXR0b24gd2hpY2ggaXMgaW5zaWRlIHRoZSAkcm93IHdpdGggaWQgXCJkb3dubG9hZC1kYXRhLVwiICsgZGF0YXNldElEXG4gICAgbGV0ICRkb3dubG9hZEJ1dHRvbiA9ICQoXCIjXCIgKyBwYXJlbnRJRCkuZmluZChcIiNkb3dubG9hZC1kYXRhLVwiICsgZGF0YXNldElEKVxuXG5cbiAgICAvLyBJZiB0aGUgYWN0aW9uIGlzIFwic2hvd1wiLCBzaG93IHRoZSBidXR0b24uIE90aGVyd2lzZSwgJ2hpZGUnIHRoZSBidXR0b24uXG4gICAgaWYgKGFjdGlvbiA9PT0gXCJzaG93XCIpIHtcbiAgICAgICAgJGRvd25sb2FkQnV0dG9uLmRhdGEoXCJibG9ja2VkXCIsIGZhbHNlKVxuICAgICAgICAkZG93bmxvYWRCdXR0b24uY3NzKFwidGV4dC1kZWNvcmF0aW9uXCIsIFwibm9uZVwiKVxuICAgIH0gZWxzZSB7XG4gICAgICAgICRkb3dubG9hZEJ1dHRvbi5kYXRhKFwiYmxvY2tlZFwiLCB0cnVlKVxuICAgICAgICAkZG93bmxvYWRCdXR0b24uY3NzKFwidGV4dC1kZWNvcmF0aW9uXCIsIFwibGluZS10aHJvdWdoXCIpXG4gICAgfVxufSlcblxuXG5TaGlueS5hZGRDdXN0b21NZXNzYWdlSGFuZGxlcihcInNldC1jb29raWVcIiwgKGRhdGEpID0+IHtcbiAgICAvKipcbiAgICAgKiBBZGQgYSBjb29raWUuXG4gICAgICogQHBhcmFtIG5hbWUgVGhlIG5hbWUgb2YgdGhlIGNvb2tpZS5cbiAgICAgKiBAcGFyYW0gbXNnIFRoZSBtZXNzYWdlIG9mIHRoZSBjb29raWUuXG4gICAgICovXG5cbiAgICBsZXQgbmFtZSA9IGRhdGFbXCJuYW1lXCJdXG4gICAgbGV0IG1zZyA9IGRhdGFbXCJtc2dcIl1cblxuICAgIC8vIEFkZCB0aGUgY29va2llLlxuICAgIGxvY2FsU3RvcmFnZS5zZXRJdGVtKG5hbWUsIEpTT04uc3RyaW5naWZ5KG1zZykpXG59KVxuXG5mdW5jdGlvbiByb3dfaW5fdGFibGUodGFibGUsIGNoZWNrUGFyYW0sIHBhcmFtVmFsdWUsICRvd25Sb3cpIHtcbiAgICAvKipcbiAgICAgKiBDaGVjayBpZiBhIHJvdyBleGlzdHMgaW4gYSB0YWJsZS5cbiAgICAgKiBAcGFyYW0gdGFibGUgVGhlIHRhYmxlLlxuICAgICAqIEBwYXJhbSBjaGVja1BhcmFtIFRoZSBwYXJhbWV0ZXIgdG8gY2hlY2suXG4gICAgICogQHJldHVybnMge2Jvb2xlYW59XG4gICAgICovXG5cbiAgICBsZXQgaXNEdXBsaWNhdGUgPSBmYWxzZVxuXG4gICAgLy8gR2V0IHRoZSByb3dzIGV4Y2x1ZGluZyB0aGUgb3duIHJvdy5cbiAgICBsZXQgJHJvd3M7XG4gICAgaWYgKCRvd25Sb3cpIHtcbiAgICAgICAgJHJvd3MgPSB0YWJsZS5maW5kKFwidGJvZHkgdHJcIikubm90KCRvd25Sb3cpXG4gICAgfSBlbHNlIHtcbiAgICAgICAgJHJvd3MgPSB0YWJsZS5maW5kKFwidGJvZHkgdHJcIilcbiAgICB9XG5cbiAgICAvLyBDaGVjayBpZiB0aGUgcm93IGhhcyBhIGRhdGEoY2hlY2tQYXJhbSkgdGhhdCBtYXRjaGVzIHBhcmFtVmFsdWUuXG4gICAgJHJvd3MuZmlsdGVyKGZ1bmN0aW9uICgpIHtcbiAgICAgICAgaWYgKCQodGhpcykuZGF0YShjaGVja1BhcmFtKSA9PT0gcGFyYW1WYWx1ZSkge1xuICAgICAgICAgICAgaXNEdXBsaWNhdGUgPSB0cnVlXG4gICAgICAgIH1cbiAgICB9KVxuICAgIHJldHVybiBpc0R1cGxpY2F0ZVxufVxuXG5mdW5jdGlvbiB2YWxpZGF0ZU5hbWUoaWQsIG5hbWUsICRyb3cpIHtcbiAgICAvKipcbiAgICAgKiBWYWxpZGF0ZSB0aGUgbmFtZSBvZiB0aGUgZGF0YXNldC4gSWYgdGhlIG5hbWUgYWxyZWFkeSBleGlzdHMsIGFwcGVuZCBhIG51bWJlciB0byB0aGUgZW5kLlxuICAgICAqIEBwYXJhbSBpZCBUaGUgaWQgb2YgdGhlIHBhcmVudCBlbGVtZW50LlxuICAgICAqIEBwYXJhbSBuYW1lIFRoZSBuYW1lIG9mIHRoZSBkYXRhc2V0LlxuICAgICAqIEByZXR1cm5zIHtzdHJpbmd9IFRoZSB2YWxpZGF0ZWQgbmFtZS5cbiAgICAgKiBAdHlwZSB7KnxqUXVlcnl8SFRNTEVsZW1lbnR9XG4gICAgICovXG4gICAgbGV0ICR0YWJsZSA9ICQoXCIjbXktZGF0YXNldC10YWJsZS1cIiArIGlkKVxuICAgIG5hbWUgPSBuYW1lLnRyaW0oKVxuICAgIGlmIChyb3dfaW5fdGFibGUoJHRhYmxlLCBcIm5hbWVcIiwgbmFtZSwgJHJvdykpIHtcbiAgICAgICAgc3dhbCh7XG4gICAgICAgICAgICB0aXRsZTogXCJOYW1lIGFscmVhZHkgZXhpc3RzP1wiLFxuICAgICAgICAgICAgdGV4dDogXCJQbGVhc2UgY2hhbmdlIHRoZSBuYW1lIG9mIHRoZSBkYXRhc2V0IHRvIGEgbmFtZSB0aGF0IGRvZXMgbm90IGV4aXN0LlwiLFxuICAgICAgICAgICAgaWNvbjogXCJ3YXJuaW5nXCIsXG4gICAgICAgIH0pXG4gICAgfSBlbHNlIHtcbiAgICAgICAgcmV0dXJuIG5hbWVcbiAgICB9XG59XG5cblxuXG5mdW5jdGlvbiBidWlsZEN1c3RvbURhdGFzZXRUYWJsZShpZCwgbWF4X3Jvd3MgPSAxMCkge1xuICAgIC8qKlxuICAgICAqIENyZWF0ZSBhIHRhYmxlIHRoYXQgaGFzIDQgY29sdW1uczogbmFtZSwgZGVzY3JpcHRpb24sIHNpemUgYW5kIGJ1dHRvbnMuXG4gICAgICogQHR5cGUgeyp8alF1ZXJ5fEhUTUxFbGVtZW50fVxuICAgICAqIEBwYXJhbSBpZCBUaGUgaWQgb2YgdGhlIHBhcmVudCBlbGVtZW50LlxuICAgICAqIEByZXR1cm5zIHtqUXVlcnl8SFRNTEVsZW1lbnR9IFRoZSB0YWJsZS5cbiAgICAgKi9cbiAgICBsZXQgJHRhYmxlID0gJChcIjx0YWJsZSBjbGFzcz0ndGFibGUgdGFibGUtc3RyaXBlZCcgaWQ9J215LWRhdGFzZXQtdGFibGUtXCIgKyBpZCArIFwiJz48L3RhYmxlPlwiKVxuICAgICR0YWJsZS5kYXRhKFwibWF4Um93c1wiLCBtYXhfcm93cylcblxuICAgIGxldCBoZWFkZXJzID0gW1wiTmFtZVwiLCBcIkRlc2NyaXB0aW9uXCIsIFwiU2l6ZVwiLCBcIkFjdGlvbnNcIl1cbiAgICAvLyBBZGQgdGhlIGhlYWRlcnMgdG8gdGhlIHRhYmxlLlxuICAgICR0YWJsZS5hcHBlbmQoXCI8dGhlYWQ+PHRyPjwvdHI+PC90aGVhZD5cIilcblxuICAgIGhlYWRlcnMuZm9yRWFjaChmdW5jdGlvbiAoaGVhZGVyKSB7XG4gICAgICAgICR0YWJsZS5maW5kKFwidGhlYWQgdHJcIikuYXBwZW5kKFwiPHRoIHNjb3BlPSdjb2wnPlwiICsgaGVhZGVyICsgXCI8L3RoPlwiKVxuICAgIH0pXG4gICAgLy8gQWRkIHRoZSBib2R5IHRvIHRoZSB0YWJsZS5cbiAgICAkdGFibGUuYXBwZW5kKFwiPHRib2R5PjwvdGJvZHk+XCIpXG4gICAgJChcIiNcIiArIGlkKS5hcHBlbmQoJHRhYmxlKVxuICAgIGxldCBjb29raWVSb3dzID0gZ2V0Um93Q29va2llKClcbiAgICBpZiAoY29va2llUm93cyAhPT0gdW5kZWZpbmVkKSB7XG4gICAgICAgIFNoaW55LnNldElucHV0VmFsdWUoaWQgKyBcIl9jb29raWVzXCIsIGNvb2tpZVJvd3MsIHtwcmlvcml0eTogXCJldmVudFwifSlcbiAgICB9XG5cbiAgICByZXR1cm4gJHRhYmxlXG59XG5cblxuZnVuY3Rpb24gZ2V0Um93Q29va2llKCkge1xuICAgIC8qKlxuICAgICAqIEdldCB0aGUgcm93cyBmcm9tIHRoZSBjb29raWUuXG4gICAgICogQHJldHVybnMge0FycmF5fSBUaGUgcm93cy5cbiAgICAgKi9cbiAgICBsZXQgbXlEYXRhc2V0ID0gbG9jYWxTdG9yYWdlLmdldEl0ZW0oXCJteURhdGFzZXRcIilcbiAgICBpZiAobXlEYXRhc2V0ICE9PSB1bmRlZmluZWQpIHtcbiAgICAgICAgcmV0dXJuIEpTT04ucGFyc2UobXlEYXRhc2V0KVxuICAgIH1cbn1cblxuZnVuY3Rpb24gYWRkUm93VG9DdXN0b21EYXRhc2V0VGFibGUoaWQsIHJvd0lkLCBuYW1lLCBkZXNjcmlwdGlvbiwgc2l6ZSkge1xuICAgIC8qKlxuICAgICAqIEFkZCBhIHJvdyB0byB0aGUgY3VzdG9tIGRhdGFzZXQgdGFibGUuXG4gICAgICogQHBhcmFtIGlkIFRoZSBpZCBvZiB0aGUgcGFyZW50IGVsZW1lbnQuXG4gICAgICogQHBhcmFtIG5hbWUgVGhlIG5hbWUgb2YgdGhlIGRhdGFzZXQuXG4gICAgICogQHBhcmFtIGRlc2NyaXB0aW9uIFRoZSBkZXNjcmlwdGlvbiBvZiB0aGUgZGF0YXNldC5cbiAgICAgKiBAcGFyYW0gc2l6ZSBUaGUgc2l6ZSBvZiB0aGUgZGF0YXNldC5cbiAgICAgKiBAcmV0dXJucyB7alF1ZXJ5fEhUTUxFbGVtZW50fVxuICAgICAqL1xuXG4gICAgICAgIC8vIEdldCB0aGUgY3VycmVudCBkYXRlXG4gICAgbGV0IGRhdGUgPSBuZXcgRGF0ZSgpXG4gICAgbGV0ICR0YWJsZSA9ICQoXCIjbXktZGF0YXNldC10YWJsZS1cIiArIGlkKVxuICAgIGxldCAkdGJvZHkgPSAkdGFibGUuZmluZChcInRib2R5XCIpXG4gICAgbGV0ICRyb3cgPSAkKFwiPHRyIGlkPSdteS1kYXRhc2V0LXJvdy1cIiArIHJvd0lkICsgXCInIGNsYXNzPSdhbGxpZ24tbWlkZGxlJz48L3RyPlwiKVxuICAgICRyb3cuZGF0YShcInJvd0lkXCIsIHJvd0lkKVxuICAgICRyb3cuZGF0YShcImlucHV0SURcIiwgaWQpXG4gICAgJHJvdy5kYXRhKFwibmFtZVwiLCBuYW1lKVxuICAgICRyb3cuZGF0YShcImRlc2NyaXB0aW9uXCIsIGRlc2NyaXB0aW9uKVxuICAgICRyb3cuZGF0YShcInNpemVcIiwgc2l6ZSlcbiAgICAkcm93LmRhdGEoXCJkYXRlXCIsIGRhdGUpXG5cbiAgICAvLyBDb21tdW5pY2F0aW5nIHRoZSBkYXRlIHRpbWUgdG8gdGhlIHNlcnZlci4gVGhlIGRhdGUgdGltZSBpcyBjcmVhdGVkIG9uIGNsaWVudCBzaWRlIHRvIGF2b2lkIHRpbWV6b25lIGlzc3Vlcy5cbiAgICBsZXQgZGF0ZVN0cmluZyA9IGRhdGUuZ2V0RnVsbFllYXIoKSArIFwiLVwiICsgKGRhdGUuZ2V0TW9udGgoKSArIDEpICsgXCItXCIgKyBkYXRlLmdldERhdGUoKSArIFwiIFwiICsgZGF0ZS5nZXRIb3VycygpICsgXCI6XCIgKyBkYXRlLmdldE1pbnV0ZXMoKSArIFwiOlwiICsgZGF0ZS5nZXRTZWNvbmRzKCkgKyBcIiBHTVRcIiArIChkYXRlLmdldFRpbWV6b25lT2Zmc2V0KCkgLyA2MCAqIC0xKVxuICAgIFNoaW55LnNldElucHV0VmFsdWUoJHJvdy5kYXRhKFwiaW5wdXRJRFwiKSwge1xuICAgICAgICBcImFjdGlvblwiOiBcInNldF90aW1lXCIsXG4gICAgICAgIFwiaWRcIjogcm93SWQsXG4gICAgICAgIFwidGltZVwiOiBkYXRlU3RyaW5nXG4gICAgfSwge3ByaW9yaXR5OiBcImV2ZW50XCJ9KVxuXG4gICAgJHJvdy5hcHBlbmQoY3JlYXRlX25hbWUobmFtZSkpXG4gICAgJHJvdy5hcHBlbmQoY3JlYXRlX2Rlc2NyaXB0aW9uKGRlc2NyaXB0aW9uKSlcbiAgICAkcm93LmFwcGVuZChjcmVhdGVfc2l6ZShzaXplKSlcbiAgICAkcm93LmFwcGVuZChjcmVhdGVfYWN0aW9ucyhpZCwgcm93SWQpKVxuICAgICR0Ym9keS5hcHBlbmQoJHJvdylcbiAgICByZXR1cm4gJHJvd1xufVxuXG5mdW5jdGlvbiBkb3dubG9hZF9kYXRhX3ByZXNzZWQocm93SWQpIHtcbiAgICAvLyBHZXQgdGhlIGlkIG9mIHRoZSBwYXJlbnQgZWxlbWVudC5cbiAgICBsZXQgJHJvdyA9ICQoXCIjbXktZGF0YXNldC1yb3ctXCIgKyByb3dJZClcblxuICAgIC8vIEdldCB0aGUgaWQgb2ZcbiAgICBsZXQgaWQgPSAkcm93LmRhdGEoXCJyb3dJZFwiKVxuICAgIC8vIEdldCB0aGUgbmFtZSBvZiB0aGUgZGF0YXNldC5cblxuICAgIC8vIEdldCB0aGUgcGFyZW50IGlkXG4gICAgbGV0IGlucHV0SUQgPSAkcm93LmRhdGEoXCJpbnB1dElEXCIpXG5cbiAgICBTaGlueS5zZXRJbnB1dFZhbHVlKGlucHV0SUQsIHtcImFjdGlvblwiOiBcImRvd25sb2FkX2RhdGFcIiwgXCJpZFwiOiBpZH0sIHtwcmlvcml0eTogXCJldmVudFwifSlcblxufVxuXG5mdW5jdGlvbiBkb3dubG9hZF9maWx0ZXJfcHJlc3NlZChyb3dJZCkge1xuICAgIGxldCAkcm93ID0gJChcIiNteS1kYXRhc2V0LXJvdy1cIiArIHJvd0lkKVxuICAgIGxldCBpZCA9ICRyb3cuZGF0YShcInJvd0lkXCIpXG4gICAgbGV0IGlucHV0SUQgPSAkcm93LmRhdGEoXCJpbnB1dElEXCIpXG5cbiAgICBTaGlueS5zZXRJbnB1dFZhbHVlKGlucHV0SUQsIHtcImFjdGlvblwiOiBcImRvd25sb2FkX2ZpbHRlclwiLCBcImlkXCI6IGlkfSwge3ByaW9yaXR5OiBcImV2ZW50XCJ9KVxufVxuXG5mdW5jdGlvbiBjcmVhdGVEb3dubG9hZERyb3Bkb3duKGlkLCByb3dJZCkge1xuICAgIC8qKlxuICAgICAqIENyZWF0ZSBhIGRyb3Bkb3duIG1lbnUgdGhhdCBoYXMgdHdvIG9wdGlvbnM6IGRvd25sb2FkIGRhdGEgYW5kIGRvd25sb2FkIGZpbHRlci5cbiAgICAgKiBAcGFyYW0gaWQgVGhlIGlkIG9mIHRoZSByb3dcbiAgICAgKiBAcmV0dXJucyB7alF1ZXJ5fEhUTUxFbGVtZW50fSBUaGUgZHJvcGRvd24gbWVudS5cbiAgICAgKi9cbiAgICBsZXQgZHJvcGRvd25JRCA9IFwiZG93bmxvYWQtZHJvcGRvd24tXCIgKyBpZFxuICAgIGxldCAkZHJvcGRvd24gPSAkKFwiPGRpdiBjbGFzcz0nZHJvcGRvd24nPjwvZGl2PlwiKVxuICAgIGxldCAkZHJvcGRvd25CdXR0b24gPSAkKFwiPGJ1dHRvbiBjbGFzcz0nYnRuIGJ0bi1vdXRsaW5lLXByaW1hcnkgYnRuLXNtIGRyb3Bkb3duLXRvZ2dsZScgdHlwZT0nYnV0dG9uJyBkYXRhLWJzLXRvZ2dsZT0nZHJvcGRvd24nIGFyaWEtZXhwYW5kZWQ9J2ZhbHNlJz48aSBjbGFzcz0nZmFzIGZhLWRvd25sb2FkJz48L2k+PC9idXR0b24+XCIpXG4gICAgJGRyb3Bkb3duQnV0dG9uLmF0dHIoXCJpZFwiLCBkcm9wZG93bklEKVxuXG4gICAgbGV0ICRkcm9wZG93bk1lbnUgPSAkKFwiPHVsIGNsYXNzPSdkcm9wZG93bi1tZW51JyBhcmlhLWxhYmVsbGVkYnk9J2Ryb3Bkb3duTWVudUJ1dHRvbic+PC91bD5cIilcbiAgICAkZHJvcGRvd25NZW51LmF0dHIoXCJhcmlhLWxhYmVsbGVkYnlcIiwgZHJvcGRvd25JRClcblxuICAgIGxldCAkZG93bmxvYWREYXRhQnV0dG9uID0gJChcIjxsaT48YSBjbGFzcz0nZHJvcGRvd24taXRlbScgaHJlZj0nIyc+PGkgY2xhc3M9J2ZhcyBmYS1maWxlLWFycm93LWRvd24nPjwvaT4gRG93bmxvYWQgZGF0YTwvYT48L2xpPlwiKVxuICAgICRkb3dubG9hZERhdGFCdXR0b24uYXR0cihcImlkXCIsIFwiZG93bmxvYWQtZGF0YS1cIiArIHJvd0lkKVxuICAgICRkb3dubG9hZERhdGFCdXR0b24uZGF0YShcImJsb2NrZWRcIiwgZmFsc2UpXG5cbiAgICAkZG93bmxvYWREYXRhQnV0dG9uLm9uKFwiY2xpY2tcIiwgZnVuY3Rpb24gKCkge1xuICAgICAgICBpZiAoJGRvd25sb2FkRGF0YUJ1dHRvbi5kYXRhKFwiYmxvY2tlZFwiKSA9PT0gZmFsc2UpIHtcbiAgICAgICAgICAgIGRvd25sb2FkX2RhdGFfcHJlc3NlZChyb3dJZClcbiAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgIGFsZXJ0KFxuICAgICAgICAgICAgICAgIGBUaGlzIGRhdGFzZXQgaXMgY3VycmVudGx5IGJlaW5nIHByb2Nlc3NlZCBmb3IgZG93bmxvYWQuIFBsZWFzZSB3YWl0IHVudGlsIHRoZSBkb3dubG9hZCBpcyBjb21wbGV0ZS5cXG5cXG5gICtcbiAgICAgICAgICAgICAgICBcIihUaGUgZG93bmxvYWQgY2FuIHRha2UgYSB3aGlsZSBpZiB0aGUgZGF0YXNldCBpcyBsYXJnZSwgYW5kIGNsaW5pY2FsIGhpc3RvcnkgZGF0YSBpcyBpbmNsdWRlZC4pXCJcbiAgICAgICAgICAgIClcbiAgICAgICAgfVxuICAgIH0pXG5cbiAgICBsZXQgJGRvd25sb2FkRmlsdGVyQnV0dG9uID0gJChcIjxsaT48YSBjbGFzcz0nZHJvcGRvd24taXRlbScgaHJlZj0nIyc+PGkgY2xhc3M9J2ZhcyBmYS1maWx0ZXInPjwvaT4gRG93bmxvYWQgZmlsdGVyczwvYT48L2xpPlwiKVxuICAgICRkb3dubG9hZEZpbHRlckJ1dHRvbi5hdHRyKFwiaWRcIiwgXCJkb3dubG9hZC1maWx0ZXItXCIgKyByb3dJZClcbiAgICAkZG93bmxvYWRGaWx0ZXJCdXR0b24ub24oXCJjbGlja1wiLCBmdW5jdGlvbiAoKSB7XG4gICAgICAgIGRvd25sb2FkX2ZpbHRlcl9wcmVzc2VkKHJvd0lkKVxuICAgIH0pXG5cbiAgICAkZHJvcGRvd25NZW51LmFwcGVuZCgkZG93bmxvYWREYXRhQnV0dG9uKVxuICAgICRkcm9wZG93bk1lbnUuYXBwZW5kKCRkb3dubG9hZEZpbHRlckJ1dHRvbilcblxuICAgICRkcm9wZG93bi5hcHBlbmQoJGRyb3Bkb3duQnV0dG9uKVxuICAgICRkcm9wZG93bi5hcHBlbmQoJGRyb3Bkb3duTWVudSlcblxuICAgIHJldHVybiAkZHJvcGRvd25cbn1cblxuZnVuY3Rpb24gY3JlYXRlRGVsZXRlQnV0dG9uKGlkLCByb3dJZCkge1xuICAgIC8qKlxuICAgICAqIENyZWF0ZSBhIGRlbGV0ZSBidXR0b24gZm9yIHRoZSByb3cuXG4gICAgICogQHBhcmFtIGlkIFRoZSBpZCBvZiB0aGUgcGFyZW50XG4gICAgICogQHBhcmFtIHJvd0lkIFRoZSBpZCBvZiB0aGUgcm93LlxuICAgICAqIEByZXR1cm5zIHtqUXVlcnl8SFRNTEVsZW1lbnR9IFRoZSBkZWxldGUgYnV0dG9uLlxuICAgICAqL1xuICAgIGxldCAkZGVsZXRlQnV0dG9uID0gJChcIjxidXR0b24gY2xhc3M9J2J0biBidG4tZGFuZ2VyIGJ0bi1zbScgdHlwZT0nYnV0dG9uJyBkYXRhLXRvZ2dsZT0ndG9vbHRpcCcgZGF0YS1wbGFjZW1lbnQ9J3RvcCcgdGl0bGU9J0RlbGV0ZSc+PC9idXR0b24+XCIpXG4gICAgJGRlbGV0ZUJ1dHRvbi5hcHBlbmQoXCI8aSBjbGFzcz0nZmFzIGZhLXRyYXNoLWFsdCc+PC9pPlwiKVxuICAgICRkZWxldGVCdXR0b24uY2xpY2soZnVuY3Rpb24gKCkge1xuICAgICAgICBsZXQgJHJvdyA9ICQoXCIjbXktZGF0YXNldC1yb3ctXCIgKyByb3dJZClcbiAgICAgICAgbGV0IG5hbWUgPSAkcm93LmRhdGEoXCJuYW1lXCIpID8gJ1wiJyArICRyb3cuZGF0YShcIm5hbWVcIikgKyAnXCInIDogXCJ0aGlzIHVubmFtZWQgZGF0YXNldFwiXG5cbiAgICAgICAgaWYgKGNvbmZpcm0oYEFyZSB5b3Ugc3VyZSB5b3Ugd2FudCB0byBkZWxldGUgJHtuYW1lfT9gKSkge1xuICAgICAgICAgICAgbGV0IGlucHV0SUQgPSAkcm93LmRhdGEoXCJpbnB1dElEXCIpXG4gICAgICAgICAgICBTaGlueS5zZXRJbnB1dFZhbHVlKGlucHV0SUQsIHtcImFjdGlvblwiOiBcImRlbGV0ZVwiLCBcImlkXCI6IHJvd0lkfSwge3ByaW9yaXR5OiBcImV2ZW50XCJ9KVxuICAgICAgICAgICAgZGVsZXRlUm93KGlkLCByb3dJZClcbiAgICAgICAgfVxuICAgIH0pXG4gICAgcmV0dXJuICRkZWxldGVCdXR0b25cbn1cblxuXG5cbmZ1bmN0aW9uIGNyZWF0ZV9hY3Rpb25zKGlkLCByb3dJZCkge1xuICAgIC8qKlxuICAgICAqIENyZWF0ZSB0aGUgYWN0aW9ucyBjb2x1bW4uIFRoaXMgY29sdW1uIGNvbnRhaW5zIGEgZHJvcGRvd24gbWVudSB3aXRoIHR3byBvcHRpb25zOiBkb3dubG9hZCBkYXRhIGFuZCBkb3dubG9hZCBmaWx0ZXIuXG4gICAgICogQHBhcmFtIGlkIFRoZSBpZCBvZiB0aGUgcGFyZW50IGVsZW1lbnQuXG4gICAgICogQHBhcmFtIHJvd0lkIFRoZSBpZCBvZiB0aGUgcm93LlxuICAgICAqL1xuICAgIGxldCAkYWN0aW9ucyA9ICQoXCI8dGQgY2xhc3M9J2FsaWduLW1pZGRsZSc+PC90ZD5cIilcblxuICAgIC8vIENyZWF0ZSBhIGJ1dHRvbiBncm91cCBmb3IgdGhlIGFjdGlvbnMuXG4gICAgbGV0ICRidG5Hcm91cCA9ICQoXCI8ZGl2IGNsYXNzPSdidG4tZ3JvdXAnIHJvbGU9J2dyb3VwJz48L2Rpdj5cIilcbiAgICAkYWN0aW9ucy5hcHBlbmQoJGJ0bkdyb3VwKVxuXG4gICAgJGJ0bkdyb3VwLmFwcGVuZChjcmVhdGVEb3dubG9hZERyb3Bkb3duKGlkLCByb3dJZCkpXG4gICAgJGJ0bkdyb3VwLmFwcGVuZChjcmVhdGVEZWxldGVCdXR0b24oaWQsIHJvd0lkKSlcblxuXG5cbiAgICByZXR1cm4gJGFjdGlvbnNcbn1cblxuZnVuY3Rpb24gY3JlYXRlX3NpemUoc2l6ZSkge1xuICAgIC8qKlxuICAgICAqIEhhbmRsZXMgdGhlIGNyZWF0aW9uIG9mIHRoZSBzaXplIFRELlxuICAgICAqIEB0eXBlIHsqfGpRdWVyeXxIVE1MRWxlbWVudH1cbiAgICAgKi9cbiAgICBsZXQgJHRkID0gJChcIjx0ZCBjbGFzcz0nYWxpZ24tbWlkZGxlJz48L3RkPlwiKVxuICAgICR0ZC5hcHBlbmQoJChcIjxwPlwiICsgYCR7c2l6ZX0gJHtzaXplIDw9IDEgPyBcImRvbm9yXCIgOiBcImRvbm9yc1wifWAgKyBcIjwvcD5cIikpXG5cbiAgICByZXR1cm4gJHRkXG59XG5cbmZ1bmN0aW9uIGNyZWF0ZV9uYW1lKG5hbWUpIHtcbiAgICAvKipcbiAgICAgKiBIYW5kbGVzIHRoZSBjcmVhdGlvbiBvZiB0aGUgdGl0bGUuXG4gICAgICogQHR5cGUgeyp8alF1ZXJ5fEhUTUxFbGVtZW50fVxuICAgICAqL1xuICAgIGxldCAkdGQgPSAkKFwiPHRkIGNsYXNzPSdhbGlnbi1taWRkbGUnPjwvdGQ+XCIpXG4gICAgbGV0ICRuYW1lID0gJChcIjxiPlwiICsgbmFtZSArIFwiPC9iPlwiKVxuICAgIG1ha2VfbmFtZV9lZGl0YWJsZSgkbmFtZSlcbiAgICAkdGQuYXBwZW5kKCRuYW1lKVxuICAgIHJldHVybiAkdGRcbn1cblxuZnVuY3Rpb24gY3JlYXRlX2Rlc2NyaXB0aW9uKGRlc2NyaXB0aW9uID0gXCJcIikge1xuICAgIC8qKlxuICAgICAqIEhhbmRsZXMgdGhlIGNyZWF0aW9uIG9mIHRoZSBkZXNjcmlwdGlvbi5cbiAgICAgKiBAdHlwZSB7KnxqUXVlcnl8SFRNTEVsZW1lbnR9XG4gICAgICovXG5cbiAgICBsZXQgJHRkID0gJChcIjx0ZCBjbGFzcz0nYWxpZ24tbWlkZGxlJz48L3RkPlwiKVxuXG4gICAgLy8gU2V0IGZvbnQgc3R5bGUgdG8gaXRhbGljIGlmIHRoZXJlIGlzIG5vIGRlc2NyaXB0aW9uLlxuICAgIGlmIChkZXNjcmlwdGlvbiA9PT0gXCJcIikge1xuICAgICAgICAkdGQuY3NzKFwiZm9udC1zdHlsZVwiLCBcIml0YWxpY1wiKVxuICAgICAgICBkZXNjcmlwdGlvbiA9IFwiTm8gZGVzY3JpcHRpb24uLi5cIlxuICAgIH1cblxuICAgIGxldCAkZGVzY3JpcHRpb24gPSAkKFwiPHA+XCIgKyBkZXNjcmlwdGlvbiArIFwiPC9wPlwiKVxuICAgIG1ha2VfZGVzY3JpcHRpb25fZWRpdGFibGUoJGRlc2NyaXB0aW9uKVxuICAgICR0ZC5hcHBlbmQoJGRlc2NyaXB0aW9uKVxuICAgIHJldHVybiAkdGRcbn1cblxuZnVuY3Rpb24gZGVsZXRlUm93KGlkLCByb3dJZCkge1xuICAgIC8qKlxuICAgICAqIERlbGV0ZSBhIHJvdyBmcm9tIHRoZSB0YWJsZS5cbiAgICAgKiBAcGFyYW0gaWQgVGhlIGlkIG9mIHRoZSBwYXJlbnQgZWxlbWVudC5cbiAgICAgKiBAcGFyYW0gcm93SWQgVGhlIGlkIG9mIHRoZSByb3cuXG4gICAgICovXG4gICAgbGV0ICR0YWJsZSA9ICQoXCIjbXktZGF0YXNldC10YWJsZS1cIiArIGlkKVxuICAgIGxldCAkdGJvZHkgPSAkdGFibGUuZmluZChcInRib2R5XCIpXG4gICAgbGV0ICRyb3cgPSAkdGJvZHkuZmluZChcIiNteS1kYXRhc2V0LXJvdy1cIiArIHJvd0lkKVxuICAgICRyb3cucmVtb3ZlKClcbn1cblxuZnVuY3Rpb24gbWFrZV9kZXNjcmlwdGlvbl9lZGl0YWJsZSgkZGVzY3JpcHRpb24pIHtcbiAgICAvKipcbiAgICAgKiBNYWtlIHRoZSBkZXNjcmlwdGlvbiBlZGl0YWJsZS4gV2hlbiB0aGUgdXNlciBjbGlja3Mgb24gdGhlIGRlc2NyaXB0aW9uLCBpdCB3aWxsIGJlY29tZSBlZGl0YWJsZS5cbiAgICAgKiBAcGFyYW0gJGRlc2NyaXB0aW9uIFRoZSBkZXNjcmlwdGlvbi5cbiAgICAgKiBAcmV0dXJucyBOVUxMXG4gICAgICovXG5cbiAgICAkZGVzY3JpcHRpb24uY2xpY2soZnVuY3Rpb24gKCkge1xuICAgICAgICAvLyBSZW1vdmUgdGhlIGl0YWxpYyBzdHlsZS5cbiAgICAgICAgJGRlc2NyaXB0aW9uLmNzcyhcImZvbnQtc3R5bGVcIiwgXCJub3JtYWxcIilcbiAgICAgICAgJGRlc2NyaXB0aW9uLmF0dHIoXCJjb250ZW50ZWRpdGFibGVcIiwgXCJ0cnVlXCIpXG4gICAgICAgICRkZXNjcmlwdGlvbi5mb2N1cygpXG5cbiAgICB9KVxuXG5cbiAgICAkZGVzY3JpcHRpb24ua2V5cHJlc3MoZnVuY3Rpb24gKGUpIHtcbiAgICAgICAgaWYgKGUud2hpY2ggPT09IDEzKSB7XG4gICAgICAgICAgICAkZGVzY3JpcHRpb24uYXR0cihcImNvbnRlbnRlZGl0YWJsZVwiLCBmYWxzZSlcbiAgICAgICAgICAgICRkZXNjcmlwdGlvbi5ibHVyKClcbiAgICAgICAgfVxuICAgIH0pXG5cbiAgICAkZGVzY3JpcHRpb24uYmx1cihmdW5jdGlvbiAoKSB7XG4gICAgICAgIC8vIFVwZGF0ZSBmdW5jdGlvblxuICAgICAgICAkZGVzY3JpcHRpb24uYXR0cihcImNvbnRlbnRlZGl0YWJsZVwiLCBcImZhbHNlXCIpXG4gICAgICAgIGxldCAkcm93ID0gJGRlc2NyaXB0aW9uLmNsb3Nlc3QoXCJ0clwiKVxuICAgICAgICBsZXQgbmV3RGVzY3JpcHRpb24gPSB4c3MoJGRlc2NyaXB0aW9uLnRleHQoKSlcbiAgICAgICAgbmV3RGVzY3JpcHRpb24gPSBuZXdEZXNjcmlwdGlvbi50cmltKClcblxuICAgICAgICBpZiAobmV3RGVzY3JpcHRpb24ubGVuZ3RoID09PSAwKSB7XG4gICAgICAgICAgICAvLyBTZXQgdGhlIGZvbnQgc3R5bGUgdG8gaXRhbGljLlxuICAgICAgICAgICAgJGRlc2NyaXB0aW9uLmNzcyhcImZvbnQtc3R5bGVcIiwgXCJpdGFsaWNcIilcbiAgICAgICAgICAgICRkZXNjcmlwdGlvbi50ZXh0KFwiTm8gZGVzY3JpcHRpb24uLi5cIilcbiAgICAgICAgICAgICRyb3cuZGF0YShcImRlc2NyaXB0aW9uXCIsIFwiXCIpXG4gICAgICAgIH1cbiAgICAgICAgbGV0IGlucHV0SUQgPSAkcm93LmRhdGEoXCJpbnB1dElEXCIpXG4gICAgICAgIGxldCByb3dJZCA9ICRyb3cuZGF0YShcInJvd0lkXCIpXG4gICAgICAgIFNoaW55LnNldElucHV0VmFsdWUoaW5wdXRJRCwge1xuICAgICAgICAgICAgXCJhY3Rpb25cIjogXCJkZXNjcmlwdGlvbl9jaGFuZ2VcIixcbiAgICAgICAgICAgIFwiaWRcIjogcm93SWQsXG4gICAgICAgICAgICBcImRlc2NyaXB0aW9uXCI6IG5ld0Rlc2NyaXB0aW9uXG4gICAgICAgIH0sIHtwcmlvcml0eTogXCJldmVudFwifSlcbiAgICAgICAgJHJvdy5kYXRhKFwiZGVzY3JpcHRpb25cIiwgbmV3RGVzY3JpcHRpb24pXG5cbiAgICB9KVxufVxuXG5mdW5jdGlvbiBtYWtlX25hbWVfZWRpdGFibGUoJG5hbWUpIHtcbiAgICAvKipcbiAgICAgKiBNYWtlIHRoZSB0aXRsZSBlZGl0YWJsZS4gV2hlbiB0aGUgdXNlciBjbGlja3Mgb24gdGhlIHRpdGxlLCBpdCB3aWxsIGJlY29tZSBlZGl0YWJsZS5cbiAgICAgKiBAcGFyYW0gJHRpdGxlIFRoZSB0aXRsZS5cbiAgICAgKiBAcmV0dXJucyBOVUxMXG4gICAgICovXG5cbiAgICAkbmFtZS5jbGljayhmdW5jdGlvbiAoKSB7XG4gICAgICAgICRuYW1lLmF0dHIoXCJjb250ZW50ZWRpdGFibGVcIiwgXCJ0cnVlXCIpXG4gICAgICAgICRuYW1lLmZvY3VzKClcbiAgICAgICAgJG5hbWUuY3NzKFwiZm9udC1zdHlsZVwiLCBcIm5vcm1hbFwiKVxuICAgIH0pXG5cbiAgICAkbmFtZS5rZXlwcmVzcyhmdW5jdGlvbiAoZSkge1xuICAgICAgICBpZiAoZS53aGljaCA9PT0gMTMpIHtcbiAgICAgICAgICAgICRuYW1lLmF0dHIoXCJjb250ZW50ZWRpdGFibGVcIiwgZmFsc2UpXG4gICAgICAgICAgICAkbmFtZS5ibHVyKClcbiAgICAgICAgfVxuICAgIH0pXG5cbiAgICAkbmFtZS5ibHVyKGZ1bmN0aW9uICgpIHtcbiAgICAgICAgJG5hbWUuYXR0cihcImNvbnRlbnRlZGl0YWJsZVwiLCBcImZhbHNlXCIpXG4gICAgICAgIGxldCAkcm93ID0gJG5hbWUuY2xvc2VzdChcInRyXCIpXG4gICAgICAgIGxldCBuZXdUaXRsZSA9IHhzcygkbmFtZS50ZXh0KCkpXG4gICAgICAgIGxldCBpbnB1dElEID0gJHJvdy5kYXRhKFwiaW5wdXRJRFwiKVxuICAgICAgICBsZXQgcm93SWQgPSAkcm93LmRhdGEoXCJyb3dJZFwiKVxuICAgICAgICBuZXdUaXRsZSA9IG5ld1RpdGxlLnRyaW0oKVxuICAgICAgICBpZiAobmV3VGl0bGUubGVuZ3RoID09PSAwKSB7XG4gICAgICAgICAgICAkbmFtZS50ZXh0KCRyb3cuZGF0YShcIm5hbWVcIikpXG4gICAgICAgICAgICBzd2FsKHtcbiAgICAgICAgICAgICAgICB0aXRsZTogXCJFcnJvclwiLFxuICAgICAgICAgICAgICAgIHRleHQ6IFwiVGhlIG5hbWUgY2Fubm90IGJlIGVtcHR5LlwiLFxuICAgICAgICAgICAgICAgIGljb246IFwiZXJyb3JcIixcbiAgICAgICAgICAgIH0pXG4gICAgICAgIH0gZWxzZSBpZiAobmV3VGl0bGUubGVuZ3RoID4gNTApIHtcbiAgICAgICAgICAgICRuYW1lLnRleHQoJHJvdy5kYXRhKFwibmFtZVwiKSlcbiAgICAgICAgICAgIHN3YWwoe1xuICAgICAgICAgICAgICAgIHRpdGxlOiBcIkVycm9yXCIsXG4gICAgICAgICAgICAgICAgdGV4dDogXCJUaGUgbmFtZSBjYW5ub3QgYmUgbG9uZ2VyIHRoYW4gNTAgY2hhcmFjdGVycy5cIixcbiAgICAgICAgICAgICAgICBpY29uOiBcImVycm9yXCIsXG4gICAgICAgICAgICB9KVxuICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgaWYgKHZhbGlkYXRlTmFtZSgkcm93LmRhdGEoXCJpbnB1dElEXCIpLCBuZXdUaXRsZSwgJHJvdykpIHtcbiAgICAgICAgICAgICAgICAkcm93LmRhdGEoXCJuYW1lXCIsIG5ld1RpdGxlKVxuICAgICAgICAgICAgICAgICRuYW1lLnRleHQobmV3VGl0bGUpXG4gICAgICAgICAgICAgICAgJG5hbWUuY3NzKFwiZm9udC1zdHlsZVwiLCBcIm5vcm1hbFwiKVxuICAgICAgICAgICAgICAgIFNoaW55LnNldElucHV0VmFsdWUoaW5wdXRJRCwge1xuICAgICAgICAgICAgICAgICAgICBcImFjdGlvblwiOiBcIm5hbWVfY2hhbmdlXCIsXG4gICAgICAgICAgICAgICAgICAgIFwiaWRcIjogcm93SWQsXG4gICAgICAgICAgICAgICAgICAgIFwibmFtZVwiOiBuZXdUaXRsZVxuICAgICAgICAgICAgICAgIH0sIHtwcmlvcml0eTogXCJldmVudFwifSlcbiAgICAgICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICAgICAgLy8gTmFtZSBpcyBub3QgdmFsaWQgc28gd2Ugc2V0IGl0IGJhY2sgdG8gdGhlIG9sZCBuYW1lLlxuICAgICAgICAgICAgICAgICRuYW1lLnRleHQoJHJvdy5kYXRhKFwibmFtZVwiKSlcbiAgICAgICAgICAgIH1cbiAgICAgICAgfVxuICAgIH0pXG59XG4iXSwibmFtZXMiOltdLCJzb3VyY2VSb290IjoiIn0=