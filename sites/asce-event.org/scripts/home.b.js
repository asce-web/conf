(function e(t,n,r){function s(o,u){if(!n[o]){if(!t[o]){var a=typeof require=="function"&&require;if(!u&&a)return a(o,!0);if(i)return i(o,!0);var f=new Error("Cannot find module '"+o+"'");throw f.code="MODULE_NOT_FOUND",f}var l=n[o]={exports:{}};t[o][0].call(l.exports,function(e){var n=t[o][1][e];return s(n?n:e)},l,l.exports,e,t,n,r)}return n[o].exports}var i=typeof require=="function"&&require;for(var o=0;o<r.length;o++)s(r[o]);return s})({1:[function(require,module,exports){
var Util = require('./Util.class.js')

/**
 * A 24-bit color ("True Color") that can be displayed in a pixel, given three primary color components.
 * @type {Color}
 */
module.exports = (function () {
  // CONSTRUCTOR
  /**
   * Construct a Color object.
   * Valid parameters:
   * - new Color([60, 120, 240]) // [red, green, blue]
   * - new Color([192])          // [grayscale]
   * - new Color()               // (black, rgb(0,0,0))
   * The RGB array may be an array of length 3 or 1, containing integers 0–255.
   * If array length is 3, the components are red, green, and blue, in that order.
   * If the length is 1, the red, green, and blue components are equal to that number,
   * which will produce a grayscale color.
   * If no argument is given, the color will be black (#000000).
   * @constructor
   * @param {Array<number>=[0]} $rgb an array of 1 or 3 integers in [0,255]
   */
  function Color($rgb) {
    var self = this
    if (arguments.length >= 1 && $rgb.length >= 3) {
      ;
    } else if (arguments.length >= 1) {
      return Color.call(self, [ $rgb[0], $rgb[0], $rgb[0] ])
    } else /* if (arguments.length < 1) */ {
      return Color.call(self, [0])
    }

    /**
     * The red component of this color. An integer in [0,255].
     * @type {number}
     */
    self._RED = $rgb[0]
    /**
     * The green component of this color. An integer in [0,255].
     * @type {number}
     */
    self._GREEN = $rgb[1]
    /**
     * The blue component of this color. An integer in [0,255].
     * @type {number}
     */
    self._BLUE = $rgb[2]

    var _max = Math.max(self._RED, self._GREEN, self._BLUE) / 255
    var _min = Math.min(self._RED, self._GREEN, self._BLUE) / 255
    var _chroma = _max - _min

    /**
     * The HSV-space hue of this color, or what "color" this color is.
     * A number bound by [0, 360).
     * @type {number}
     */
    self._HSV_HUE = (function () {
      if (_chroma === 0) return 0
      var rgb_norm = [
        self._RED   / 255
      , self._GREEN / 255
      , self._BLUE  / 255
      ]
      return [
        function (r, g, b) { return ((g - b) / _chroma + 6) % 6 * 60 }
      , function (r, g, b) { return ((b - r) / _chroma + 2)     * 60 }
      , function (r, g, b) { return ((r - g) / _chroma + 4)     * 60 }
      ][rgb_norm.indexOf(_max)].apply(null, rgb_norm)
      /*
       * Exercise: prove:
       * _HSV_HUE === Math.atan2(Math.sqrt(3) * (g - b), 2*r - g - b)
       */
    })()

    /**
     * The brightness of this color. A lower value means the color is closer to black, a higher
     * value means the color is more true to its hue.
     * A number bound by [0, 1].
     * @type {number}
     */
    self._HSV_VAL = (function () {
      return _max
    })()

    /**
     * The vividness of this color. A lower saturation means the color is closer to white,
     * a higher saturation means the color is more true to its hue.
     * A number bound by [0, 1].
     * @type {number}
     */
    self._HSV_SAT = (function () {
      if (_chroma === 0) return 0 // avoid div by 0
      return _chroma / self._HSV_VAL
    })()

    /**
     * The Hue of this color. Identical to `this._HSV_HUE`.
     * A number bound by [0, 360).
     * @type {number}
     */
    self._HSL_HUE = (function () {
      return self._HSV_HUE
    })()

    /**
     * How "white" or "black" the color is. A lower luminosity means the color is closer to black,
     * a higher luminosity means the color is closer to white.
     * A number bound by [0, 1].
     * @type {number}
     */
    self._HSL_LUM = (function () {
      return 0.5 * (_max + _min)
    })()

    /**
     * The amount of "color" in the color. A lower saturation means the color is more grayer,
     * a higher saturation means the color is more colorful.
     * A number bound by [0, 1].
     * @type {number}
     */
    self._HSL_SAT = (function () {
      if (_chroma === 0) return 0 // avoid div by 0
      return _chroma / ((self._HSL_LUM <= 0.5)  ?  2*self._HSL_LUM  :  (2 - 2*self._HSL_LUM))
      /*
       * Exercise: prove:
       * _HSL_SAT === _chroma / (1 - Math.abs(2*self._HSL_LUM - 1))
       * Proof:
       * denom == (function (x) {
       *   if (x <= 0.5) return 2x
       *   else          return 2 - 2x
       * })(_HSL_LUM)
       * Part A. Let x <= 0.5. Then 2x - 1 <= 0, and |2x - 1| == -(2x - 1).
       * Then 1 - |2x - 1| == 1 + (2x - 1) = 2x. //
       * Part B. Let 0.5 < x. Then 1 < 2x - 1, and |2x - 1| == 2x - 1.
       * Then 1 - |2x - 1| == 1 - (2x - 1) = 2 - 2x. //
       */
    })()

    /**
     * The Hue of this color. Identical to `this._HSV_HUE`.
     * A number bound by [0, 360).
     * @type {number}
     */
    self._HWB_HUE = (function () {
      return self._HSV_HUE
    })()
    /**
     * The amount of White in this color. A higher white means the color is closer to #fff,
     * a lower white means the color has a true hue (more colorful).
     * A number bound by [0, 1].
     * @type {number}
     */
    self._HWB_WHT = (function () {
      return _min
    })()
    /**
     * The amount of Black in this color. A higher black means the color is closer to #000,
     * a lower black means the color has a true hue (more colorful).
     * A number bound by [0, 1].
     * @type {number}
     */
    self._HWB_BLK = (function () {
      return 1 - _max
    })()
  }


  // ACCESSOR FUNCTIONS
  /**
   * Get the red component of this color.
   * @return {number} the red component of this color
   */
  Color.prototype.red = function red() { return this._RED }
  /**
   * Get the green component of this color.
   * @return {number} the green component of this color
   */
  Color.prototype.green = function green() { return this._GREEN }
  /**
   * Get the blue component of this color.
   * @return {number} the blue component of this color
   */
  Color.prototype.blue = function blue() { return this._BLUE }

  /**
   * Get the hsv-hue of this color.
   * @return {number} the hsv-hue of this color
   */
  Color.prototype.hsvHue = function hsvHue() { return this._HSV_HUE }
  /**
   * Get the hsv-saturation of this color.
   * @return {number} the hsv-saturation of this color
   */
  Color.prototype.hsvSat = function hsvSat() { return this._HSV_SAT }
  /**
   * Get the hsv-value of this color.
   * @return {number} the hsv-value of this color
   */
  Color.prototype.hsvVal = function hsvVal() { return this._HSV_VAL }

  /**
   * Get the hsl-hue of this color.
   * @return {number} the hsl-hue of this color
   */
  Color.prototype.hslHue = function hslHue() { return this._HSL_HUE }
  /**
   * Get the hsl-saturation of this color.
   * @return {number} the hsl-saturation of this color
   */
  Color.prototype.hslSat = function hslSat() { return this._HSL_SAT }
  /**
   * Get the hsl-luminosity of this color.
   * @return {number} the hsl-luminosity of this color
   */
  Color.prototype.hslLum = function hslLum() { return this._HSL_LUM }

  /**
   * Get the hwb-hue of this color.
   * @return {number} the hwb-hue of this color
   */
  Color.prototype.hwbHue = function hwbHue() { return this._HWB_HUE }
  /**
   * Get the hwb-white of this color.
   * @return {number} the hwb-white of this color
   */
  Color.prototype.hwbWht = function hwbWht() { return this._HWB_WHT }
  /**
   * Get the hwb-black of this color.
   * @return {number} the hwb-black of this color
   */
  Color.prototype.hwbBlk = function hwbBlk() { return this._HWB_BLK }

  // Convenience getter functions.
  /**
   * Return an array of RGB components (in that order).
   * @return {Array<number>} an array of RGB components
   */
  Color.prototype.rgb = function rgb() { return [this.red(), this.green(), this.blue()] }
  /**
   * Return an array of HSV components (in that order).
   * @return {Array<number>} an array of HSV components
   */
  Color.prototype.hsv = function hsv() { return [this.hsvHue(), this.hsvSat(), this.hsvVal()] }
  /**
   * Return an array of HSL components (in that order).
   * @return {Array<number>} an array of HSL components
   */
  Color.prototype.hsl = function hsl() { return [this.hslHue(), this.hslSat(), this.hslLum()] }
  /**
   * Return an array of HWB components (in that order).
   * @return {Array<number>} an array of HWB components
   */
  Color.prototype.hwb = function hwb() { return [this.hwbHue(), this.hwbWht(), this.hwbBlk()] }


  // METHODS
  /**
   * Return a new color that is the complement of this color.
   * The complement of a color is the difference between that color and white (#fff).
   * @return {Color} a new Color object that corresponds to this color’s complement
   */
  Color.prototype.complement = function complement() {
    return new Color([
      255 - this.red()
    , 255 - this.green()
    , 255 - this.blue()
    ])
  }

  /**
   * Return a new color that is a hue-rotation of this color.
   * @param  {number} a the number of degrees to rotate
   * @return {Color} a new Color object corresponding to this color rotated by `a` degrees
   */
  Color.prototype.rotate = function rotate(a) {
    var newhue = (this.hsvHue() + a) % 360
    return Color.fromHSV(newhue, this.hsvSat(), this.hsvVal())
  }

  /**
   * Return a new color that is the inverse of this color.
   * The inverse of a color is that color with a hue rotation of 180 degrees.
   * @return {Color} a new Color object that corresponds to this color’s inverse
   */
  Color.prototype.invert = function invert() {
    return this.rotate(180)
  }

  /**
   * Return a new color that is a more saturated (more colorful) version of this color by a percentage.
   * This method calculates saturation in the HSL space.
   * A parameter of 1.0 returns a color with full saturation, and 0.0 returns an identical color.
   * A negative number will {@link Color.desaturate()|desaturate} this color.
   * @param  {number} p must be between -1.0 and 1.0; the value by which to saturate this color
   * @param  {boolean=} relative true if the saturation added is relative
   * @return {Color} a new Color object that corresponds to this color saturated by `p`
   */
  Color.prototype.saturate = function saturate(p, relative) {
    var newsat = this.hslSat() + (relative ? (this.hslSat() * p) : p)
    newsat = Math.min(Math.max(0, newsat), 1)
    return Color.fromHSL(this.hslHue(), newsat, this.hslLum())
  }

  /**
   * Return a new color that is a less saturated version of this color by a percentage.
   * A parameter of 1.0 returns a grayscale color, and 0.0 returns an identical color.
   * @see Color.saturate()
   * @param  {number} p must be between -1.0 and 1.0; the value by which to desaturate this color
   * @param  {boolean=} relative true if the saturation subtracted is relative
   * @return {Color} a new Color object that corresponds to this color desaturated by `p`
   */
  Color.prototype.desaturate = function desaturate(p, relative) {
    return this.saturate(-p, relative)
  }

  /**
   * Return a new color that is a lighter version of this color by a percentage.
   * This method calculates with luminosity in the HSL space.
   * A parameter of 1.0 returns white (#fff), and 0.0 returns an identical color.
   * A negative parameter will {@link Color.darken()|darken} this color.
   *
   * Set `relative = true` to specify the amount as relative to the color’s current luminosity.
   * For example, if `$color` has an HSL-lum of 0.5, then calling `$color.lighten(0.5)` will return
   * a new color with an HSL-lum of 1.0, because the argument 0.5 is simply added to the color’s luminosity.
   * However, calling `$color.lighten(0.5, true)` will return a new color with an HSL-lum of 0.75,
   * because the argument 0.5, relative to the color’s current luminosity of 0.5, results in
   * an added luminosity of 0.25.
   *
   * @param {number} p must be between -1.0 and 1.0; the amount by which to lighten this color
   * @param {boolean=} relative true if the luminosity added is relative
   * @return {Color} a new Color object that corresponds to this color lightened by `p`
   */
  // CHANGED DEPRECATED v2 remove
  Color.prototype.brighten = function brighten(p, relative) {
    return this.lighten(p, relative)
  }
  Color.prototype.lighten = function lighten(p, relative) {
    var newlum = this.hslLum() + (relative ? (this.hslLum() * p) : p)
    newlum = Math.min(Math.max(0, newlum), 1)
    return Color.fromHSL(this.hslHue(), this.hslSat(), newlum)
  }

  /**
   * Return a new color that is a darker version of this color by a percentage.
   * A parameter of 1.0 returns black (#000), and 0.0 returns an identical color.
   * @see Color.lighten()
   * @param {number} p must be between -1.0 and 1.0; the amount by which to darken this color
   * @param {boolean=} relative true if the luminosity subtracted is relative
   * @return {Color} a new Color object that corresponds to this color darkened by `p`
   */
  Color.prototype.darken = function darken(p, relative) {
    return this.lighten(-p, relative)
  }

  /**
   * Mix (average) another color with this color, with a given weight favoring that color.
   * If `w == 0.0`, return exactly this color.
   * `w == 1.0` return exactly the other color.
   * `w == 0.5` (default if omitted) return a perfectly even mix.
   * In other words, `w` is "how much of the other color you want."
   * Note that `color1.mix(color2, w)` returns the same result as `color2.mix(color1, 1-w)`.
   * When param `flag` is provided, this method uses a more mathematically accurate calculation,
   * thus providing a more aesthetically accurate mix.
   * TODO This will be the default behavior starting in v2.
   * @see https://www.youtube.com/watch?v=LKnqECcg6Gw
   * @param {Color} $color the second color
   * @param {number=0.5} w between 0.0 and 1.0; the weight favoring the other color
   * @param {flag=} flag if truthy, will use a more accurate calculation
   * @return {Color} a mix of the two given colors
   */
  Color.prototype.mix = function mix($color, w, flag) {
    if (arguments.length >= 2) {
      ;
    } else return this.mix($color, 0.5)
    // /**
    //  * Helper function. Average two numbers, with a weight favoring the 2nd number.
    //  * The result will always be between the two numbers.
    //  * @param  {number} a 1st number
    //  * @param  {number} b 2nd number
    //  * @param  {number} w number between [0,1]; weight of 2nd number
    //  * @return {number} the weighted average of `a` and `b`
    //  */
    // function average(a, b, w) {
    //   return (a * (1-w)) + (b * w)
    // }
    // return new Color([
    //   average(this.red(),   $color.red(),   w)
    // , average(this.green(), $color.green(), w)
    // , average(this.blue(),  $color.blue(),  w)
    // ].map(Math.round))
    if (flag) {
    return new Color([
      (1-w) * Math.pow(this.red()  , 2)  +  w * Math.pow($color.red()  , 2)
    , (1-w) * Math.pow(this.green(), 2)  +  w * Math.pow($color.green(), 2)
    , (1-w) * Math.pow(this.blue() , 2)  +  w * Math.pow($color.blue() , 2)
    ].map(function (n) { return Math.round(Math.sqrt(n)) }))
    }
    return new Color([
      (1-w) * this.red()    +  w * $color.red()
    , (1-w) * this.green()  +  w * $color.green()
    , (1-w) * this.blue()   +  w * $color.blue()
    ].map(Math.round))
  }

  /**
   * Compare this color with another color.
   * Return `true` if they are the same color.
   * @param  {Color} $color a Color object
   * @return {boolean} true if the argument is the same color as this color
   */
  Color.prototype.equals = function equals($color) {
    return (this.hsvSat()===0 && $color.hsvSat()===0 && (this.hsvVal() === $color.hsvVal())) // NOTE speedy
      || (
         (this.red()   === $color.red())
      && (this.green() === $color.green())
      && (this.blue()  === $color.blue())
      )
  }
  /**
   * Return the *contrast ratio* between two colors.
   * More info can be found at
   * {@link https://www.w3.org/TR/WCAG/#contrast-ratiodef}
   * @param {Color} $color the second color to check
   * @return {number} the contrast ratio of this color with the argument
   */
  Color.prototype.contrastRatio = function contrastRatio($color) {
    /**
     * Return the relative lumance of a color.
     * @param  {Color} c a Color object
     * @return {number} the relative lumance of the color
     */
    function luma(c) {
      /**
       * A helper function.
       * @param  {number} p a decimal representation of an rgb component of a color
       * @return {number} the output of some mathematical function of `p`
       */
      function coef(p) {
        return (p <= 0.03928) ? p/12.92 : Math.pow((p + 0.055)/1.055, 2.4)
      }
      return 0.2126*coef(c.red()  /255)
           + 0.7152*coef(c.green()/255)
           + 0.0722*coef(c.blue() /255)
    }
    var both = [luma(this), luma($color)]
    return (Math.max.apply(null, both) + 0.05) / (Math.min.apply(null, both) + 0.05)
  }

  /**
   * Return a string representation of this color.
   * If `space === 'hex'`, return `#rrggbb`
   * If `space === 'hsv'`, return `hsv(h, s, v)`
   * If `space === 'hsl'`, return `hsl(h, s, l)`
   * If `space === 'hwb'`, return `hwb(h, w, b)`
   * If `space === 'rgb'`, return `rgb(r, g, b)` (default)
   * The format of the numbers returned will be as follows:
   * - all HEX values will be base 16 integers in [00,FF], two digits
   * - HSV/HSL/HWB-hue values will be base 10 decimals in [0,360) rounded to the nearest 0.1
   * - HSV/HSL-sat/val/lum and HWB-wht/blk values will be base 10 decimals in [0,1] rounded to the nearest 0.01
   * - all RGB values will be base 10 integers in [0,255], one to three digits
   * IDEA may change the default to 'hex' instead of 'rgb', once browsers support ColorAlpha hex (#rrggbbaa)
   * https://drafts.csswg.org/css-color/#hex-notation
   * @param {string='rgb'} space represents the space in which this color exists
   * @return {string} a string representing this color.
   */
  Color.prototype.toString = function toString(space) {
    if (space === 'hex') {
      var r = Util.toHex(this.red())
      var g = Util.toHex(this.green())
      var b = Util.toHex(this.blue())
      return '#' + r + g + b
      // return `#${r}${g}${b}` // CHANGED ES6
    }
    if (space === 'hsv') {
      var h = Math.round(this.hsvHue() *  10) /  10
      var s = Math.round(this.hsvSat() * 100) / 100
      var v = Math.round(this.hsvVal() * 100) / 100
      return 'hsv(' + h + ', ' + s + ', ' + v + ')'
      // return `hsv(${h}, ${s}, ${v})` // CHANGED ES6
    }
    if (space === 'hsl') {
      var h = Math.round(this.hslHue() *  10) /  10
      var s = Math.round(this.hslSat() * 100) / 100
      var l = Math.round(this.hslLum() * 100) / 100
      return 'hsl(' + h + ', ' + s + ', ' + l + ')'
      // return `hsl(${h}, ${s}, ${l})` // CHANGED ES6
    }
    if (space === 'hwb') {
      var h = Math.round(this.hwbHue() *  10) /  10
      var w = Math.round(this.hwbWht() * 100) / 100
      var b = Math.round(this.hwbBlk() * 100) / 100
      return 'hwb(' + h + ', ' + w + ', ' + b + ')'
      // return `hwb(${h}, ${w}, ${b})` // CHANGED ES6
    }
    var r = this.red()
    var g = this.green()
    var b = this.blue()
    return 'rgb(' + r + ', ' + g + ', ' + b + ')'
    // return `rgb(${r}, ${g}, ${b})` // CHANGED ES6
  }


  // STATIC MEMBERS
  /**
   * Return a new Color object, given hue, saturation, and value in HSV-space.
   * The HSV-hue must be between 0 and 360.
   * The HSV-saturation must be between 0.0 and 1.0.
   * The HSV-value must be between 0.0 and 1.0.
   * The given argument must be an array of these three values in order.
   * Or, you may pass 3 values as 3 separate arguments.
   * CHANGED DEPRECATED starting in v2, argument must be Array<number>(3)
   * @param {(number|Array<number>)} hue must be between 0 and 360; hue in HSV-space || an Array of HSV components
   * @param {number=} sat must be between 0.0 and 1.0; saturation in HSV-space
   * @param {number=} val must be between 0.0 and 1.0; brightness in HSV-space
   * @return {Color} a new Color object with hsv(hue, sat, val)
   */
  Color.fromHSV = function fromHSV(hue, sat, val) {
    if (Array.isArray(hue)) {
      return Color.fromHSV(hue[0], hue[1], hue[2])
    }
    var c = sat * val
    var x = c * (1 - Math.abs(hue/60 % 2 - 1))
    var m = val - c
    var rgb;
         if (  0 <= hue && hue <  60) { rgb = [c, x, 0] }
    else if ( 60 <= hue && hue < 120) { rgb = [x, c, 0] }
    else if (120 <= hue && hue < 180) { rgb = [0, c, x] }
    else if (180 <= hue && hue < 240) { rgb = [0, x, c] }
    else if (240 <= hue && hue < 300) { rgb = [x, 0, c] }
    else if (300 <= hue && hue < 360) { rgb = [c, 0, x] }
    return new Color(rgb.map(function (el) { return Math.round((el + m) * 255) }))
  }

  /**
   * Return a new Color object, given hue, saturation, and luminosity in HSL-space.
   * The HSL-hue must be between 0 and 360.
   * The HSL-saturation must be between 0.0 and 1.0.
   * The HSL-luminosity must be between 0.0 and 1.0.
   * The given argument must be an array of these three values in order.
   * Or, you may pass 3 values as 3 separate arguments.
   * CHANGED DEPRECATED starting in v2, argument must be Array<number>(3)
   * @param {(number|Array<number>)} hue must be between 0 and 360; hue in HSL-space || an Array of HSL components
   * @param {number=} sat must be between 0.0 and 1.0; saturation in HSL-space
   * @param {number=} lum must be between 0.0 and 1.0; luminosity in HSL-space
   * @return {Color} a new Color object with hsl(hue, sat, lum)
   */
  Color.fromHSL = function fromHSL(hue, sat, lum) {
    if (Array.isArray(hue)) {
      return Color.fromHSL(hue[0], hue[1], hue[2])
    }
    var c = sat * (1 - Math.abs(2*lum - 1))
    var x = c * (1 - Math.abs(hue/60 % 2 - 1))
    var m = lum - c/2
    var rgb;
         if (  0 <= hue && hue <  60) { rgb = [c, x, 0] }
    else if ( 60 <= hue && hue < 120) { rgb = [x, c, 0] }
    else if (120 <= hue && hue < 180) { rgb = [0, c, x] }
    else if (180 <= hue && hue < 240) { rgb = [0, x, c] }
    else if (240 <= hue && hue < 300) { rgb = [x, 0, c] }
    else if (300 <= hue && hue < 360) { rgb = [c, 0, x] }
    return new Color(rgb.map(function (el) { return Math.round((el + m) * 255) }))
  }

  /**
   * Return a new Color object, given hue, white, and black in HWB-space.
   * Credit for formula is due to https://drafts.csswg.org/css-color/#hwb-to-rgb
   * The HWB-hue must be between 0 and 360.
   * The HWB-white must be between 0.0 and 1.0.
   * The HWB-black must be between 0.0 and 1.0.
   * The given argument must be an array of these three values in order.
   * Or, you may pass 3 values as 3 separate arguments.
   * CHANGED DEPRECATED starting in v2, argument must be Array<number>(3)
   * @param {(number|Array<number>)} hue must be between 0 and 360; hue in HWB-space || an Array of HWB components
   * @param {number=} wht must be between 0.0 and 1.0; white in HWB-space
   * @param {number=} blk must be between 0.0 and 1.0; black in HWB-space
   * @return {Color} a new Color object with hwb(hue, wht, blk)
   */
  Color.fromHWB = function fromHWB(hue, wht, blk) {
    if (Array.isArray(hue)) {
      return Color.fromHWB(hue[0], hue[1], hue[2])
    }
    return Color.fromHSV(hue, 1 - wht / (1 - blk), 1 - blk)
    // HWB -> RGB:
    /*
    var rgb = Color.fromHSL(hue, 1, 0.5).rgb().map(function (el) { return el / 255 })
    for (var i = 0; i < 3; i++) {
      rgb[i] *= (1 - white - black);
      rgb[i] += white;
    }
    return new Color(rgb.map(function (el) { return Math.round(el * 255) }))
     */
  }

  /**
   * Return a new Color object, given a string.
   * The string may have either of the following formats:
   * 1. `#rrggbb`, with hexadecimal RGB components (in base 16, out of ff, lowercase). The `#` must be included.
   * 2. `rgb(r,g,b)` or `rgb(r, g, b)`, with integer RGB components (in base 10, out of 255).
   * 3. `hsv(h,s,v)` or `hsv(h, s, v)`, with decimal HSV components (in base 10).
   * 4. `hsl(h,s,l)` or `hsl(h, s, l)`, with decimal HSL components (in base 10).
   * 5. `hwb(h,w,b)` or `hwb(h, w, b)`, with decimal HWB components (in base 10).
   * @param {string} str a string of one of the forms described
   * @return {Color} a new Color object constructed from the given string
   */
  Color.fromString = function fromString(str) {
    if (str.slice(0,1) === '#' && str.length === 7) {
      return new Color([
        str.slice(1,3)
      , str.slice(3,5)
      , str.slice(5,7)
      ].map(Util.toDec))
    }
    if (str.slice(0,4) === 'rgb(') {
      return new Color(Util.components(4, str))
    }
    if (str.slice(0,4) === 'hsv(') {
      return Color.fromHSV.apply(null, Util.components(4, str))
    }
    if (str.slice(0,4) === 'hsl(') {
      return Color.fromHSL.apply(null, Util.components(4, str))
    }
    if (str.slice(0,4) === 'hwb(') {
      return Color.fromHWB.apply(null, Util.components(4, str))
    }
    return null
  }

  /**
   * Mix (average) a set of 2 or more colors. The average will be weighted evenly.
   * If two colors $a and $b are given, calling this static method, `Color.mix([$a, $b])`,
   * is equivalent to calling `$a.mix($b)` without a weight.
   * However, calling `Color.mix([$a, $b, $c])` with 3 or more colors yields an even mix,
   * and will *NOT* yield the same results as calling `$a.mix($b).mix($c)`, which yields an uneven mix.
   * Note that the order of the given colors does not change the result, that is,
   * `Color.mix([$a, $b])` will return the same result as `Color.mix([$b, $a])`.
   * When param `flag` is provided, this method uses a more mathematically accurate calculation,
   * thus providing a more aesthetically accurate mix.
   * TODO This will be the default behavior starting in v2.
   * @param {Array<Color>} $colors an array of Color objects, of length >=2
   * @param {flag=} flag if truthy, will use a more accurate calculation
   * @return {Color} a mix of the given colors
   */
  Color.mix = function mix($colors, flag) {
    return new Color([
      $colors.map(function ($c) { return $c.red()   })
    , $colors.map(function ($c) { return $c.green() })
    , $colors.map(function ($c) { return $c.blue()  })
    ].map(function ($arr) {
      if (flag) return Math.round(Math.sqrt($arr.reduce(function (a, b) { return a*a + b*b }) / $colors.length))
      return Math.round($arr.reduce(function (a, b) { return a + b }) / $colors.length)
    }))
  }

  return Color
})()

},{"./Util.class.js":3}],2:[function(require,module,exports){
var Util = require('./Util.class.js')
var Color = require('./Color.class.js')

/**
 * A 32-bit color that can be displayed in a pixel, given three primary color components
 * and a transparency component.
 * @type {ColorAlpha}
 * @extends Color
 */
module.exports = (function () {
  // CONSTRUCTOR
  /**
   * Construct a ColorAlpha object.
   * Valid parameters:
   * - new ColorAlpha([60, 120, 240], 0.7) // [red, green, blue], alpha (translucent, rgba(r, g, b, alpha))
   * - new ColorAlpha([192], 0.7)          // [grayscale], alpha        (translucent, rgba(r, r, r, alpha))
   * - new ColorAlpha([60, 120, 240])      // [red, green, blue]        (opaque, rgba(r, g, b, 1.0))
   * - new ColorAlpha([192])               // [grayscale]               (opaque, rgba(r, r, r, 1.0))
   * - new ColorAlpha(0.7)                 // alpha                     (rgba(0, 0, 0, alpha), translucent black)
   * - new ColorAlpha()                    //                           (rgba(0, 0, 0, 0.0), transparent)
   * You may pass both an RGB array and an alpha, or either one, or neither.
   * See {@see Color} for specs on the RGB array. The alpha must be a (decimal) number 0–1.
   * If RGB is given, alpha defaults to 1.0 (opaque).
   * If no RGB is given, alpha defaults to 0.0 (transparent).
   * @constructor
   * @param {Array<number>=[0]} $rgb an array of 1 or 3 integers in [0,255]
   * @param {number=(1|0)} alpha a number in [0,1]; the alpha, or opacity, of this color
   */
  function ColorAlpha($rgb, alpha) {
    var self = this
    if (arguments.length >= 2 && $rgb.length >= 3) {
      ;
    } else if (arguments.length >= 2) {
      return ColorAlpha.call(self, [$rgb[0], $rgb[0], $rgb[0]], alpha)
    } else if (arguments.length >= 1 && $rgb instanceof Array) {
      return ColorAlpha.call(self, $rgb, 1)
    } else if (arguments.length >= 1) {
      return ColorAlpha.call(self, [0], $rgb)
    } else /* if (arguments.length < 1) */ {
      return ColorAlpha.call(self, 0)
    }

    // call the super. if alpha===0 then this color’s rgb will be [0,0,0].
    if (alpha !== 0) Color.call(self, $rgb)
    else             Color.call(self)

    /**
     * The alpha component of this color. An number in [0,1].
     * @type {number}
     */
    self._ALPHA = alpha
  }
  ColorAlpha.prototype = Object.create(Color.prototype)
  ColorAlpha.prototype.constructor = ColorAlpha


  // ACCESSOR FUNCTIONS
  /**
   * Get the alpha (opacity) of this color.
   * @return {number} the alpha of this color
   */
  ColorAlpha.prototype.alpha = function alpha() { return this._ALPHA }

  // Convenience getter functions.
  /**
   * Return an array of RGBA components (in that order).
   * @return {Array<number>} an array of RGBA components
   */
  ColorAlpha.prototype.rgba = function rgba() { return this.rgb().concat(this.alpha()) }
  /**
   * Return an array of HSVA components (in that order).
   * @return {Array<number>} an array of HSVA components
   */
  ColorAlpha.prototype.hsva = function hsva() { return this.hsv().concat(this.alpha()) }
  /**
   * Return an array of HSLA components (in that order).
   * @return {Array<number>} an array of HSLA components
   */
  ColorAlpha.prototype.hsla = function hsla() { return this.hsl().concat(this.alpha()) }
  /**
   * Return an array of HWBA components (in that order).
   * @return {Array<number>} an array of HWBA components
   */
  ColorAlpha.prototype.hwba = function hwba() { return this.hwb().concat(this.alpha()) }


  // METHODS

  /**
   * @override
   * @return {ColorAlpha} the complement of this color
   */
  ColorAlpha.prototype.complement = function complement() {
    return new ColorAlpha(Color.prototype.complement.call(this).rgb(), this.alpha())
  }

  /**
   * @override
   * @param  {number} a the number of degrees to rotate
   * @return {ColorAlpha} a new color corresponding to this color rotated by `a` degrees
   */
  ColorAlpha.prototype.rotate = function rotate(a) {
    return new ColorAlpha(Color.prototype.rotate.call(this, a).rgb(), this.alpha())
  }

  /**
   * @override
   * @param  {number} p must be between -1.0 and 1.0; the value by which to saturate this color
   * @param  {boolean=} relative true if the saturation added is relative
   * @return {ColorAlpha} a new ColorAlpha object that corresponds to this color saturated by `p`
   */
  ColorAlpha.prototype.saturate = function saturate(p, relative) {
    return new ColorAlpha(Color.prototype.saturate.call(this, p, relative).rgb(), this.alpha())
  }

  /**
   * @override
   * @param {number} p must be between -1.0 and 1.0; the amount by which to lighten this color
   * @param {boolean=} relative true if the luminosity added is relative
   * @return {ColorAlpha} a new ColorAlpha object that corresponds to this color lightened by `p`
   */
  // CHANGED DEPRECATED v2 remove
  ColorAlpha.prototype.brighten = function brighten(p, relative) {
    return this.lighten(p, relative)
  }
  ColorAlpha.prototype.lighten = function lighten(p, relative) {
    return new ColorAlpha(Color.prototype.lighten.call(this, p, relative).rgb(), this.alpha())
  }

  /**
   * Return a new color with the complemented alpha of this color.
   * An alpha of, for example, 0.7, complemented, is 0.3 (the complement with 1.0).
   * @return {ColorAlpha} a new ColorAlpha object with the same color but complemented alpha
   */
  ColorAlpha.prototype.negative = function negative() {
    return new ColorAlpha(this.rgb(), 1 - this.alpha())
  }

  /**
   * @override
   * @param {Color} $color the second color; may also be an instance of ColorAlpha
   * @param {number=0.5} w between 0.0 and 1.0; the weight favoring the other color
   * @param {flag=} flag if truthy, will use a more accurate mixing calculation
   * @return {ColorAlpha} a mix of the two given colors
   */
  ColorAlpha.prototype.mix = function mix($color, w, flag) {
    var newColor = Color.prototype.mix.call(this, $color, w, flag)
    var newAlpha = (function compoundOpacity(a, b) {
      return 1 - ( (1-a) * (1-b) )
    })(this.alpha(), ($color instanceof ColorAlpha) ? $color.alpha() : 1)
    return new ColorAlpha(newColor.rgb(), newAlpha)
  }

  /**
   * @override
   * @param  {ColorAlpha} $colorAlpha a ColorAlpha object
   * @return {boolean} true if the argument is the same color as this color
   */
  ColorAlpha.prototype.equals = function equals($colorAlpha) {
    var sameAlphas = (this.alpha() === $color.alpha()) // NOTE speedy
    return sameAlphas && (this.alpha()===0 || Color.prototype.equals.call(this, $colorAlpha))
  }

  /**
   * Return a string representation of this color.
   * If `space === 'hex'`,  return `#rrggbbaa`
   * If `space === 'hsva'`, return `hsva(h, s, v, a)`
   * If `space === 'hsla'`, return `hsla(h, s, l, a)`
   * If `space === 'hwba'`, return `hwba(h, w, b, a)` // NOTE not supported yet
   * If `space === 'rgba'`, return `rgba(r, g, b, a)` (default)
   * The format of the numbers returned will be as follows:
   * - all HEX values for RGB, and hue/sat/val/lum will be of the same format as described in
   *   {@link Color#toString}
   * - all alpha values will be base 10 decimals in [0,1], rounded to the nearest 0.001
   * IDEA may change the default to 'hex' instead of 'rgba', once browsers support ColorAlpha hex (#rrggbbaa)
   * https://drafts.csswg.org/css-color/#hex-notation
   * @override
   * @param {string='rgba'} space represents the space in which this color exists
   * @return {string} a string representing this color.
   */
  ColorAlpha.prototype.toString = function toString(space) {
    var a = Math.round(this.alpha() * 1000) / 1000
    // CHANGED v2 remove 'hexa'
    if (space === 'hex' || space==='hexa') {
      return Color.prototype.toString.call(this, 'hex') + Util.toHex(Math.round(this.alpha()*255))
    }
    if (space === 'hsva') {
      return 'hsva(' + Color.prototype.toString.call(this, 'hsv').slice(4, -1) + ', ' + a + ')'
      // return `hsva(${Color.prototype.toString.call(this, 'hsv').slice(4, -1)}, ${a})` // CHANGED ES6
    }
    if (space === 'hsla') {
      return 'hsla(' + Color.prototype.toString.call(this, 'hsl').slice(4, -1) + ', ' + a + ')'
      // return `hsla(${Color.prototype.toString.call(this, 'hsl').slice(4, -1)}, ${a})` // CHANGED ES6
    }
    if (space === 'hwba') {
      return 'hwba(' + Color.prototype.toString.call(this, 'hwb').slice(4, -1) + ', ' + a + ')'
      // return `hwba(${Color.prototype.toString.call(this, 'hwb').slice(4, -1)}, ${a})` // CHANGED ES6
    }
    return 'rgba(' + Color.prototype.toString.call(this, 'rgb').slice(4, -1) + ', ' + a + ')'
    // return `rgba(${Color.prototype.toString.call(this, 'rgb').slice(4, -1)}, ${a})` // CHANGED ES6
  }


  // STATIC MEMBERS
  /**
   * Return a new ColorAlpha object, given hue, saturation, and value in HSV-space,
   * and an alpha component.
   * The alpha must be between 0.0 and 1.0.
   * The first argument must be an array of these three values in order.
   * Or, you may pass 3 values as the first 3 arguments.
   * CHANGED DEPRECATED starting in v2, first argument must be Array<number>(3)
   * @see Color.fromHSV
   * @param {(number|Array<number>)} hue must be between 0 and 360; hue in HSV-space || an Array of HSV components
   * @param {number} sat must be between 0.0 and 1.0; saturation in HSV-space || alpha (opacity)
   * @param {number=} val must be between 0.0 and 1.0; brightness in HSV-space
   * @param {number=} alpha must be between 0.0 and 1.0; alpha (opacity)
   * @return {ColorAlpha} a new ColorAlpha object with hsva(hue, sat, val, alpha)
   */
  ColorAlpha.fromHSVA = function fromHSVA(hue, sat, val, alpha) {
    if (Array.isArray(hue)) {
      return Color.fromHSVA(hue[0], hue[1], hue[2], sat)
    }
    return new ColorAlpha(Color.fromHSV([hue, sat, val]).rgb(), alpha)
  }

  /**
   * Return a new ColorAlpha object, given hue, saturation, and luminosity in HSL-space,
   * and an alpha component.
   * The alpha must be between 0.0 and 1.0.
   * The first argument must be an array of these three values in order.
   * Or, you may pass 3 values as the first 3 arguments.
   * CHANGED DEPRECATED starting in v2, first argument must be Array<number>(3)
   * @see Color.fromHSL
   * @param {(number|Array<number>)} hue must be between 0 and 360; hue in HSL-space || an Array of HSL components
   * @param {number} sat must be between 0.0 and 1.0; saturation in HSL-space || alpha (opacity)
   * @param {number=} lum must be between 0.0 and 1.0; luminosity in HSL-space
   * @param {number=} alpha must be between 0.0 and 1.0; alpha (opacity)
   * @return {ColorAlpha} a new ColorAlpha object with hsla(hue, sat, lum, alpha)
   */
  ColorAlpha.fromHSLA = function fromHSLA(hue, sat, lum, alpha) {
    if (Array.isArray(hue)) {
      return Color.fromHSVA(hue[0], hue[1], hue[2], sat)
    }
    return new ColorAlpha(Color.fromHSL([hue, sat, lum]).rgb(), alpha)
  }

  /**
   * Return a new ColorAlpha object, given hue, white, and black in HWB-space,
   * and an alpha component.
   * The alpha must be between 0.0 and 1.0.
   * The first argument must be an array of these three values in order.
   * Or, you may pass 3 values as the first 3 arguments.
   * CHANGED DEPRECATED starting in v2, first argument must be Array<number>(3)
   * @see Color.fromHWB
   * @param {(number|Array<number>)} hue must be between 0 and 360; hue in HWB-space || an Array of HWB components
   * @param {number} wht must be between 0.0 and 1.0; white in HWB-space || alpha (opacity)
   * @param {number=} blk must be between 0.0 and 1.0; black in HWB-space
   * @param {number=} alpha must be between 0.0 and 1.0; alpha (opacity)
   * @return {ColorAlpha} a new ColorAlpha object with hwba(hue, wht, blk, alpha)
   */
  ColorAlpha.fromHWBA = function fromHWBA(hue, wht, blk, alpha) {
    if (Array.isArray(hue)) {
      return Color.fromHSVA(hue[0], hue[1], hue[2], wht)
    }
    return new ColorAlpha(Color.fromHWB([hue, wht, blk]).rgb(), alpha)
  }

  /**
   * Return a new ColorAlpha object, given a string.
   * The string may have any of the formats described in
   * {@link Color.fromString}, or it may have either of the following formats,
   * with the alpha component as a base 10 decimal between 0.0 and 1.0.
   * 1. `#rrggbbaa`, where `aa` is alpha
   * 2. `rgba(r,g,b,a)` or `rgba(r, g, b, a)`, where `a` is alpha
   * 3. `hsva(h,s,v,a)` or `hsva(h, s, v, a)`, where `a` is alpha
   * 4. `hsla(h,s,l,a)` or `hsla(h, s, l, a)`, where `a` is alpha
   * 4. `hwba(h,w,b,a)` or `hwba(h, w, b, a)`, where `a` is alpha
   * @see Color.fromString
   * @param {string} str a string of one of the forms described
   * @return {ColorAlpha} a new ColorAlpha object constructed from the given string
   */
  ColorAlpha.fromString = function fromString(str) {
    var is_opaque = Color.fromString(str)
    if (is_opaque) {
      return new ColorAlpha(is_opaque.rgb())
    }
    if (str.slice(0,1) === '#' && str.length === 9) {
      return new ColorAlpha([
        str.slice(1,3)
      , str.slice(3,5)
      , str.slice(5,7)
      ].map(Util.toDec), Util.toDec(str.slice(7,9))/255)
    }
    if (str.slice(0,5) === 'rgba(') {
      var comps = Util.components(5, str)
      return new ColorAlpha(comps.slice(0,3), comps[3])
    }
    if (str.slice(0,5) === 'hsva(') {
      return ColorAlpha.fromHSVA.apply(null, Util.components(5, str))
    }
    if (str.slice(0,5) === 'hsla(') {
      return ColorAlpha.fromHSLA.apply(null, Util.components(5, str))
    }
    if (str.slice(0,5) === 'hwba(') {
      return ColorAlpha.fromHWBA.apply(null, Util.components(5, str))
    }
    return null
  }

  /**
   * ColorAlpha equivalent of `Color.mix`.
   * @see Color.mix
   * @param {Array<Color>} $colors an array of Color (or ColorAlpha) objects, of length >=2
   * @return {ColorAlpha} a mix of the given colors
   */
  ColorAlpha.mix = function mix($colors) {
    var newColor = Color.mix($colors, true)
    var newAlpha = 1 - $colors.map(function ($c) {
      return ($c instanceof ColorAlpha) ? $c.alpha() : 1
    }).reduce(function (a, b) { return (1-a) * (1-b) })
    return new ColorAlpha(newColor.rgb(), newAlpha)
  }

  return Color
})()

},{"./Color.class.js":1,"./Util.class.js":3}],3:[function(require,module,exports){
/**
 * A utility class for performing calculations. Contains only static members.
 * This class is *not* exported with the package.
 * @type {Util}
 */
module.exports = (function () {
  // CONSTRUCTOR
  function Util() {}


  // ACCESSOR FUNCTIONS

  // METHODS

  // STATIC MEMBERS
  /**
   * Convert a decimal number to a hexadecimal number, as a string.
   * The given number must be an integer within 0–255.
   * The returned string is in lowercase.
   * @param  {number} n an integer in base 10
   * @return {string} an integer in base 16 as a string
   */
  Util.toHex = function toHex(n) {
    return '0123456789abcdef'.charAt((n - n % 16) / 16) + '0123456789abcdef'.charAt(n % 16)
  }

  /**
   * Convert a hexadecimal number (as a string) to a decimal number.
   * The hexadecimal number must be a string of exactly 2 characters,
   * each of which is a digit `0–9` or `a–f`.
   * @param  {string} n a number in base 16 as a string
   * @return {number} a number in base 10
   */
  Util.toDec = function toDec(n) {
    var tens, ones
    for (var i = 0; i < 16; i++) {
      if ('0123456789abcdef'.charAt(i) === n.slice(0,1)) tens = i*16
      if ('0123456789abcdef'.charAt(i) === n.slice(1,2)) ones = i
    }
    return tens + ones
  }

  /**
   * Return an array of comma-separated numbers extracted from a string.
   * The string must be of the form `xxx(a, b, c, ...)` or `xxx(a,b,c,...)`, where
   * `a`, `b`, and `c`, etc. are numbers, and `xxx` is any `n-1` number of characters
   * (if n===4 then `xxx` must be 3 characters).
   * Any number of prefixed characters and comma-separated numbers may be given. Spaces are optional.
   * Examples:
   * ```
   * components(4, 'rgb(20, 32,044)') === [20, 32, 44]
   * components(5, 'hsva(310,0.7, .3, 1/2)') === [310, 0.7, 0.3, 0.5]
   * ```
   * @param  {number} n the starting point of extraction
   * @param  {string} s the string to dissect
   * @return {Array<number>} an array of numbers
   */
  Util.components = function components(n, s) {
    return s.slice(n, -1).split(',').map(function (el) { return +el })
  }

  return Util
})()

},{}],4:[function(require,module,exports){
module.exports = {
  Color: require('./Color.class.js')
, ColorAlpha: require('./ColorAlpha.class.js')
}

},{"./Color.class.js":1,"./ColorAlpha.class.js":2}],5:[function(require,module,exports){
var Page = require('sitepage').Page
var Util = require('./Util.class.js')

module.exports = class ConfPage extends Page {
  /**
   * Any page or subpage within a ConfSite.
   * Construct a ConfPage object, given a name and url.
   * @see ConfSite
   * @constructor
   * @extends Page
   * @param {string} name name of this page
   * @param {string} url  url of this page
   */
  constructor(name, url) {
    super({ name: name, url: url })
    /** @private */ this._icon     = null
    /** @private */ this._is_hidden = false
  }

  /**
   * Set the icon for this page.
   * @param {string} key the keyword for the icon
   */
  setIcon(key) {
    this._icon = Util.ICON_DATA.find(($icon) => $icon.content===key)
    return this
  }
  /**
   * Get the icon of this page.
   * @param  {boolean=} fallback if true, get the unicode code point
   * @return {string} if fallback, the unicode code point, else, the keyword of the icon
   */
  getIcon(fallback) {
    return (this._icon) ? Util.iconToString(this._icon, fallback) : ''
  }

  /**
   * Hide or show this page.
   * @param  {boolean=true} bool hides or shows this page
   * @return {Page} this page
   */
  hide(bool) {
    this._is_hidden = (arguments.length) ? bool : true
    return this
  }
  /**
   * Get the hidden status of this page.
   * @return {boolean} true if this page is hidden; false otherwise
   */
  isHidden() {
    return this._is_hidden
  }
}

},{"./Util.class.js":17,"sitepage":21}],6:[function(require,module,exports){
var Page = require('sitepage').Page
var Color = require('csscolor').Color
var ConfPage = require('./ConfPage.class.js')

module.exports = class ConfSite extends Page {
  /**
   * A conference site.
   * A site hosting a series of conferences,
   * with a name, url, slogan, logo, and color scheme.
   * Construct a ConfSite object, given a name and url.
   * @constructor
   * @extends Page
   * @param {string} name name of this site
   * @param {string} url url of the landing page for this site
   * @param {string} slogan the tagline, or slogan, of this site
   */
  constructor(name, url, slogan) {
    super({ name: name, url: url })
    super.description(slogan)
    /** @private */ this._logo             = ''
    /** @private */ this._colors           = {}
    /** @private */ this._conferences      = {}
    /** @private */ this._conf_curr_key   = null
    /** @private */ this._conf_prev_key   = null
    /** @private */ this._conf_next_key   = null
  }

  /**
   * Overwrite superclass description() method.
   * This method only gets the description, it does not set it.
   * TODO: update this to an ES6 getter once {@link Page#description()} is updated.
   * @override
   * @param  {*} arg any argument
   * @return {string} the description of this site
   */
  description(arg) {
    return super.description()
  }
  /**
   * Get the slogan of this site.
   * The slogan is very brief, and is fixed for the entire series of conferences.
   * @return {string} the slogan of this site
   */
  get slogan() {
    return this.description() || ''
  }

  /**
   * Set or get the logo of this site.
   * @param  {string=} logo url of the logo file
   * @return {(ConfSite|string)} this site || url of the logo
   */
  logo(logo) {
    if (arguments.length) {
      this._logo = logo
      return this
    } else return this._logo
  }

  /**
   * Set or get the colors for this site.
   * @param {Color=} $primary   a Color object for the primary color
   * @param {Color=} $secondary a Color object for the secondary color
   * @return {(ConfSite|Object)} this || a CSS style object containg custom properties and color string values
   */
  colors($primary, $secondary) {
    if (arguments.length) {
      this._colors = ConfSite.colorStyles($primary, $secondary)
      return this
    } else return this._colors
  }

  /**
   * Add a conference to this site.
   * @param {string} conf_label key for accessing the conference, usually a year
   * @param {Conference} $conference the conference to add
   * @return {ConfSite} this site
   */
  addConference(conf_label, $conference) {
    this._conferences[conf_label] = $conference
    return this
  }
  /**
   * Retrieve a conference of this site.
   * @param  {string} conf_label key for accessing the conference, usually a year
   * @return {Conference} the specified conference
   */
  getConference(conf_label) {
    return this._conferences[conf_label]
  }
  /**
   * Return an object representing all conferences of this site.
   * FIXME this should return a deep clone, not a shallow clone
   * @return {Object} shallow clone of this site’s conferences object
   */
  getConferencesAll() {
    //- NOTE returns shallow clone (like arr.slice())
    return Object.assign({}, this._conferences)
  }

  /**
   * Set or get the current conference of this site.
   * If setting, provide the argument key for accessing the added conference.
   * If getting, provide no argument.
   * The current conference is the conference that is being promoted this cycle.
   * @param  {string=} conf_label key for accessing the conference
   * @return {(ConfSite|Conference)} this site || the current conference
   */
  currentConference(conf_label) {
    if (arguments.length) {
      this._conf_curr_key = conf_label
      return this
    } else {
      return this.getConference(this._conf_curr_key)
    }
  }
  /**
   * Set or get the previous conference of this site.
   * If setting, provide the argument key for accessing the added conference.
   * If getting, provide no argument.
   * The previous conference is the conference that was promoted last cycle.
   * @param  {string=} conf_label key for accessing the conference
   * @return {(ConfSite|Conference)} this site || the previous conference
   */
  prevConference(conf_label) {
    if (arguments.length) {
      this._conf_prev_key = conf_label
      return this
    } else return this.getConference(this._conf_prev_key)
  }
  /**
   * Set or get the next conference of this site.
   * If setting, provide the argument key for accessing the added conference.
   * If getting, provide no argument.
   * The next conference is the conference that will be promoted next cycle.
   * @param  {string=} conf_label key for accessing the conference
   * @return {(ConfSite|Conference)} this site || the next conference
   */
  nextConference(conf_label) {
    if (arguments.length) {
      this._conf_next_key = conf_label
      return this
    } else return this.getConference(this._conf_next_key)
  }

  /**
   * Initialize this site: add the proper pages.
   * This method should only be called once; it resets pages every time called.
   * @return {ConfSite} this site
   */
  init() {
    var self = this
    function pageTitle() { return this.name() + ' | ' + self.name() }
    return self
      .removeAll() //- NOTE IMPORTANT
      .add(new ConfPage('Home', 'index.html')
        .title(self.name())
        .description(self.slogan)
        .setIcon('home')
      )
      .add(new ConfPage('Registration', 'registration.html')
        .title(pageTitle)
        .description(`Register for ${self.name()} here.`)
        .setIcon('shopping_cart')
      )
      .add(new ConfPage('Program', 'program.html')
        .title(pageTitle)
        .description(`Program and agenda of ${self.name()}.`)
        .setIcon('event')
      )
      .add(new ConfPage('Location', 'location.html')
        .title(pageTitle)
        .description(`Location and where to stay for ${self.name()}.`)
        .setIcon('flight')
      )
      .add(new ConfPage('Speakers', 'speakers.html')
        .title(pageTitle)
        .description(`Current and prospective speakers at ${self.name()}.`)
        .setIcon('account_box')
      )
      .add(new ConfPage('Sponsor', 'sponsor.html')
        .title(pageTitle)
        .description(`Sponsors of ${self.name()}.`)
        .setIcon('people')
      )
      .add(new ConfPage('Exhibit', 'exhibit.html')
        .title(pageTitle)
        .description(`Exhibitors at ${self.name()}.`)
        .setIcon('work')
      )
      .add(new ConfPage('About', 'about.html')
        .title(pageTitle)
        .description(`About ${self.name()}.`)
        .setIcon('info_outline')
      )
      .add(new ConfPage('Contact', 'contact.html')
        .title(pageTitle)
        .description(`Contact us for questions and comments about ${self.name()}.`)
        .setIcon('email')
      )
  }


  /**
   * Generate a color palette and return a style object with custom properties.
   * @param  {Color} $primary   the primary color for the site
   * @param  {Color} $secondary the secondary color for the site
   * @return {Object<string>} a style object containg custom properties and color string values
   */
  static colorStyles($primary, $secondary) {
    let   primary_s2  =   $primary.darken(2/3, true)
    let   primary_s1  =   $primary.darken(1/3, true)
    let   primary_t1  =   $primary.darken(1/3, true).lighten(1/3, false) // one-third to white
    let   primary_t2  =   $primary.darken(2/3, true).lighten(2/3, false) // two-thirds to white
    let secondary_s2  = $secondary.darken(2/3, true)
    let secondary_s1  = $secondary.darken(1/3, true)
    let secondary_t1  = $secondary.darken(1/3, true).lighten(1/3, false) // one-third to white
    let secondary_t2  = $secondary.darken(2/3, true).lighten(2/3, false) // two-thirds to white

    let _g1 = $primary.mix($secondary, 1/4).desaturate(7/8, true)
    let _g2 = $secondary.mix($primary, 1/4).desaturate(7/8, true)

    let gray_dk_s2 = _g1.lighten( 1/12 - _g1.hslLum(), false)
    let gray_dk_s1 = _g1.lighten( 2/12 - _g1.hslLum(), false)
    let gray_dk    = _g1.lighten( 3/12 - _g1.hslLum(), false)
    let gray_dk_t1 = _g1.lighten( 4/12 - _g1.hslLum(), false)
    let gray_dk_t2 = _g1.lighten( 5/12 - _g1.hslLum(), false)
    let gray_lt_s2 = _g2.lighten( 7/12 - _g2.hslLum(), false)
    let gray_lt_s1 = _g2.lighten( 8/12 - _g2.hslLum(), false)
    let gray_lt    = _g2.lighten( 9/12 - _g2.hslLum(), false)
    let gray_lt_t1 = _g2.lighten(10/12 - _g2.hslLum(), false)
    let gray_lt_t2 = _g2.lighten(11/12 - _g2.hslLum(), false)

    return {
      '--color-primary'  :   $primary.toString('hex'),
      '--color-secondary': $secondary.toString('hex'),
      '--color-gray_dk'  :    gray_dk.toString('hex'),
      '--color-gray_lt'  :    gray_lt.toString('hex'),

      '--color-primary-shade2'  :   primary_s2.toString('hex'),
      '--color-primary-shade1'  :   primary_s1.toString('hex'),
      '--color-primary-tint1'   :   primary_t1.toString('hex'),
      '--color-primary-tint2'   :   primary_t2.toString('hex'),

      '--color-secondary-shade2': secondary_s2.toString('hex'),
      '--color-secondary-shade1': secondary_s1.toString('hex'),
      '--color-secondary-tint1' : secondary_t1.toString('hex'),
      '--color-secondary-tint2' : secondary_t2.toString('hex'),

      '--color-gray_dk-shade2'  :   gray_dk_s2.toString('hex'),
      '--color-gray_dk-shade1'  :   gray_dk_s1.toString('hex'),
      '--color-gray_dk-tint1'   :   gray_dk_t1.toString('hex'),
      '--color-gray_dk-tint2'   :   gray_dk_t2.toString('hex'),

      '--color-gray_lt-shade2'  :   gray_lt_s2.toString('hex'),
      '--color-gray_lt-shade1'  :   gray_lt_s1.toString('hex'),
      '--color-gray_lt-tint1'   :   gray_lt_t1.toString('hex'),
      '--color-gray_lt-tint2'   :   gray_lt_t2.toString('hex'),
    }
  }
}

},{"./ConfPage.class.js":5,"csscolor":4,"sitepage":21}],7:[function(require,module,exports){
module.exports = class Conference {
  /**
   * A conference event.
   * It may have a name, theme, dates, (promoted) location,
   * passes, sessions, venues, speakers,
   * supporter levels and supporters, exhibitors, contact information,
   * important dates, organizers, and other properties.
   * Construct a Conference object.
   * The name, url, theme, start date, end date, and promoted location
   * are immutable and must be provided during construction.
   * @constructor
   * @param {Object=} $confinfo an object with the following immutable properties:
   * @param {string} $confinfo.name the name of this conference
   * @param {string} $confinfo.url the url of this conference
   * @param {string} $confinfo.theme the theme, or slogan, of this conference
   * @param {Date} $confinfo.start_date the starting date of this conference
   * @param {Date} $confinfo.end_date the ending date of this conference
   * @param {Object} $confinfo.promo_loc the promoted location of this conference
   * @param {string} $confinfo.promo_loc.text the promoted location displayed/abbreviated text (eg, "Portland, OR")
   * @param {string=} $confinfo.promo_loc.alt the accessible text of the location (eg, "Portland, Oregon")
   */
  constructor($confinfo = {}) {
    /** @private @final */ this._NAME      = $confinfo.name
    /** @private @final */ this._URL       = $confinfo.url
    /** @private @final */ this._THEME     = $confinfo.theme
    /** @private @final */ this._START     = $confinfo.start_date
    /** @private @final */ this._END       = $confinfo.end_date
    /** @private @final */ this._PROMO_LOC = $confinfo.promo_loc
    /** @private */ this._reg_periods     = []
    /** @private */ this._passes          = []
    /** @private */ this._sessions        = []
    /** @private */ this._venues          = {}
    /** @private */ this._speakers        = []
    /** @private */ this._supporter_levels = []
    /** @private */ this._supporter_lists  = {}
    /** @private */ this._supporters       = []
    /** @private */ this._exhibitors       = []
    /** @private */ this._important_dates = []
    /** @private */ this._organizers      = []
    /** @private */ this._social          = {}
    /** @private */ this._regpd_curr_index = NaN
    /** @private */ this._venue_conf_key   = ''
  }

  /**
   * Get the name of this conference.
   * @return {string} the name of this conference
   */
  get name() {
    return this._NAME
  }

  /**
   * Get the URL of this conference.
   * @return {string} the URL of this conference
   */
  get url() {
    return this._URL
  }

  /**
   * Get the theme of this conference.
   * The theme is a one-sentence or one-phrase slogan,
   * and may be changed from year to year (from conference to conference).
   * @return {string} the theme of this conference
   */
  get theme() {
    return this._THEME || ''
  }

  /**
   * Get the start date of this conference.
   * @return {Date} the start date of this conference
   */
  get startDate() {
    return this._START || new Date()
  }

  /**
   * Get the end date of this conference.
   * @return {Date} the end date of this conference
   */
  get endDate() {
    return this._END || new Date()
  }

  /**
   * Get the promoted location of this conference.
   * The promoted location is not necessarily the actual postal address of the conference,
   * but rather a major city nearest to the conference used for
   * promotional and advertising purposes.
   * @return {{text:string, alt:string}} the promoted location for this conference
   */
  get promoLoc() {
    return this._PROMO_LOC || {}
  }

  /**
   * Add a registration period to this conference.
   * @param {RegistrationPeriod} $registrationPeriod the registration period to add
   */
  addRegistrationPeriod($registrationPeriod) {
    this._reg_periods.push($registrationPeriod)
    return this
  }
  /**
   * Retrieve a registration period of this conference.
   * @param  {string} name the name of the registration period
   * @return {?RegistrationPeriod} the specified registration period
   */
  getRegistrationPeriod(name) {
    return this._reg_periods.find(($registrationPeriod) => $registrationPeriod.name===name) || null
  }
  /**
   * Retrieve all registration periods of this conference.
   * @return {Array<RegistrationPeriod>} a shallow array of all registration periods of this conference.
   */
  getRegistrationPeriodsAll() {
    return this._reg_periods.slice()
  }

  /**
   * Set or get the current registration period.
   * The current registration period is the registration period that is active at this time.
   * @param  {string=} reg_period_name the name of the registration period to set current
   * @return {(Conference|RegistrationPeriod)} this conference || the set current registration period
   */
  currentRegistrationPeriod(reg_period_name) {
    if (arguments.length) {
      this._regpd_curr_index = this._reg_periods.indexOf(this.getRegistrationPeriod(reg_period_name))
      return this
    } else return this._reg_periods[this._regpd_curr_index]
  }

  /**
   * Add a pass to this conference.
   * @param {Pass} $pass the pass to add
   */
  addPass($pass) {
    this._passes.push($pass)
    return this
  }
  /**
   * Retrieve a pass of this conference.
   * @param  {string} name the name of the pass
   * @return {?Pass} the specified pass
   */
  getPass(name) {
    return this._passes.find(($pass) => $pass.name===name) || null
  }
  /**
   * Retrieve all passes of this conference.
   * @return {Array<Pass>} a shallow array of all passes of this conference
   */
  getPassesAll() {
    return this._passes.slice()
  }

  /**
   * Add a session to this conference.
   * @param {Session} $session the session to add
   */
  addSession($session) {
    this._sessions.push($session)
    return this
  }
  /**
   * Retrieve a session of this conference.
   * @param  {string} name the name of the session
   * @return {?Session} the specified session
   */
  getSession(name) {
    return this._sessions.find(($session) => $session.name===name) || null
  }
  /**
   * Retrieve all sessions of this conference.
   * @return {Array<Session>} a shallow array of all sessions of this conference
   */
  getSessionsAll() {
    return this._sessions.slice()
  }

  /**
   * Add a venue to this conference.
   * @param {string} venue_label key for accessing the venue
   * @param {Place} $place the venue to add
   */
  addVenue(venue_label, $place) {
    this._venues[venue_label] = $place
    return this
  }
  /**
   * Retrieve a venue of this conference.
   * @param  {string} venue_label the key for accessing the venue
   * @return {Place} the specified venue
   */
  getVenue(venue_label) {
    return this._venues[venue_label]
  }
  /**
   * Retrieve all venues of this conference.
   * @return {Object<Place>} a shallow copy of the venues object of this conference
   */
  getVenuesAll() {
    //- NOTE returns shallow clone (like arr.slice())
    return Object.assign({}, this._venues)
  }

  /**
   * Set or get the official conference venue for this conference.
   * The official conference venue is the venue at which this conference is held.
   * @param  {string} venue_label the key for accessing the venue
   * @return {(Conference|Place)} this conference || the set conference venue
   */
  officialVenue(venue_label) {
    if (arguments.length) {
      this._venue_conf_key = venue_label
      return this
    } else return this.getVenue(this._venue_conf_key)
  }

  /**
   * Add a speaker to this conference.
   * @param {Person} $person the speaker to add
   */
  addSpeaker($person) {
    this._speakers.push($person)
    return this
  }
  /**
   * Retrieve a speaker of this conference.
   * @param  {string} id the id of the speaker
   * @return {?Person} the specified speaker
   */
  getSpeaker(id) {
    return this._speakers.find(($person) => $person.id===id) || null
  }
  /**
   * Retrieve all speakers of this conference.
   * @return {Array<Person>} a shallow array of all speakers of this conference
   */
  getSpeakersAll() {
    return this._speakers.slice()
  }

  /**
   * Add a supporter level to this conference.
   * @param {SupporterLevel} $supporterLevel the supporter level to add
   * @return {Conference} this conference
   */
  addSupporterLevel($supporterLevel) {
    this._supporter_levels.push($supporterLevel)
    return this
  }
  /**
   * Retrieve a supporter level of this conference.
   * @param  {string} name the name of the supporter level
   * @return {?SupporterLevel} the specified supporter level
   */
  getSupporterLevel(name) {
    return this._supporter_levels.find(($supporterLevel) => $supporterLevel.name===name) || null
  }
  /**
   * Retrieve all supporter levels of this conference.
   * @return {Array<SupporterLevel>} a shallow array of all supporter levels of this conference
   */
  getSupporterLevelsAll() {
    return this._supporter_levels.slice()
  }

  /**
   * Add a named subarray of supporter levels to this conference.
   * @param {string} type the name of the subarray
   * @param {Array<string>} supporter_level_names an array of pre-existing SupporterLevel names
   * @return {Conference} this conference
   */
  addSupporterLevelQueue(type, supporter_level_names) {
    this._supporter_lists[type] = supporter_level_names
    return this
  }
  /**
   * Get a named subarray of supporter levels of this conference.
   * @param  {string} type the name of the subarray
   * @return {Array<SupporterLevel>} the array of SupporterLevel objects belonging to the type
   */
  getSupporterLevelQueue(type) {
    return (this._supporter_lists[type] || []).map((el) => this.getSupporterLevel(el))
  }

  /**
   * Add a supporter to this conference.
   * @param {Supporter} $supporter the supporter to add
   * @return {Conference} this conference
   */
  addSupporter($supporter) {
    this._supporters.push($supporter)
    return this
  }
  /**
   * Retrieve a supporter of this conference.
   * @param  {string} name the name of the supporter
   * @return {?Supporter} the specified supporter
   */
  getSupporter(name) {
    return this._supporters.find(($supporter) => $supporter.name===name) || null
  }
  /**
   * Retrieve all supporters of this conference.
   * @return {Array<Supporter>} a shallow array of all supporters of this conference
   */
  getSupportersAll() {
    return this._supporters.slice()
  }

  /**
   * Add an exhibitor to this conference.
   * @param {Exhibitor} $exhibitor the exhibitor to add
   * @return {Conference} this conference
   */
  addExhibitor($exhibitor) {
    this._exhibitors.push($exhibitor)
    return this
  }
  /**
   * Retrieve an exhibitor of this conference.
   * @param  {string} name the name of the exhibitor
   * @return {?Exhibitor} the specified exhibitor
   */
  getExhibitor(name) {
    return this._exhibitors.find(($exhibitor) => $exhibitor.name===name) || null
  }
  /**
   * Retrieve all exhibitors of this conference.
   * @return {Array<Exhibitor>} a shallow array of all exhibitors of this conference
   */
  getExhibitorsAll() {
    return this._exhibitors.slice()
  }

  /**
   * Add an important date to this conference.
   * @param {ImportantDate} $importantDate the important date to add
   */
  addImportantDate($importantDate) {
    this._important_dates.push($importantDate)
    return this
  }
  /**
   * Retrieve an important date of this conference.
   * @param  {string} name the name of the important date
   * @return {?ImportantDate} the specified important date
   */
  getImportantDate(name) {
    return this._important_dates.find(($importantDate) => $importantDate.name===name) || null
  }
  /**
   * Retrieve all important dates of this conference.
   * @return {Array<ImportantDate>} a shallow array of all important dates of this conference
   */
  getImportantDatesAll() {
    return this._important_dates.slice()
  }

  /**
   * Add an organizer of this conference.
   * An organizer is a chairperson, steering committee member, or other person who is
   * responsible for organizing the conference.
   * @param {Person} $person the organizer to add
   */
  addOrganizer($person) {
    this._organizers.push($person)
    return this
  }
  /**
   * Retrieve an organizer of this conference.
   * @param  {string} id the name of the organizer
   * @return {?Person} the specified organizer
   */
  getOrganizer(id) {
    return this._organizers.find(($person) => $person.id===id) || null
  }
  /**
   * Retrieve all organizers of this conference.
   * @return {Array<Person>} a shallow array of all organizers of this conference
   */
  getOrganizersAll() {
    return this._organizers.slice()
  }

  /**
   * Add a social network profile to this conference.
   * @param {string} network_name the name of the social network
   * @param {string} url the URL of this conference’s profile on the network
   * @param {string=} text optional advisory text
   * @return {Conference} this conference
   */
  addSocial(network_name, url, text) {
    this._social[network_name] = { url: url, text: text }
    return this
  }
  /**
   * Retrieve a social network profile of this conference.
   * @param  {string} network_name the name of the social network
   * @return {Object} an object representing the social network profile
   */
  getSocial(network_name) {
    return this._social[network_name]
  }
  /**
   * Return an object representing all social network profiles of this conference.
   * @return {Object} shallow clone of this conference’s social object
   */
  getSocialAll() {
    //- NOTE returns shallow clone (like arr.slice())
    return Object.assign({}, this._social) // shallow clone this.social into {}
  }

  // setPrice(reg_period, pass, membership, price) {
  //   reg_period = reg_period.name || reg_period
  //   pass        = pass.name        || pass
  //   membership  = membership.name  || membership
  //   this.registration = this.registration || {}
  //   this.registration[reg_period][pass][membership] = price
  //   return this
  // }
  /**
   * NOTE: TYPE DEFINITION
   * A group of sessions, all of which share the same date (excluding time of day).
   * Contains two properties:
   * - `datestr` - a string representing the date by which the sessions are grouped
   * - `sessions` - an array of those sessions
   * @typedef {Object} SessionGroup
   * @property {string} datestr - string in 'YYYY-MM-DD' format of all the sessions in the group
   * @property {Array<Session>} sessions - an array whose members all have the same date
   */
  /**
   * Categorize all the sessions of this conference by date and return the grouping.
   * Sessions with the same date (excluding time of day) are grouped together.
   * @see Session
   * @param  {boolean=} starred if true, only consider sessions that are starred
   * @return {Array<SessionGroup>} an array grouping the sessions together
   */
  groupSessions(starred) {
    let all_sessions = this.getSessionsAll().filter(($session) => (starred) ? $session.isStarred() : true)
    let $groupings = []
    function equalDays(date1, date2) {
      return date1.toISOString().slice(0,10) === date2.toISOString().slice(0,10)
    }
    all_sessions.forEach(function ($session) {
      if (!$groupings.find(($sessionGroup) => equalDays($sessionGroup.dateday, $session.startDate))) {
        $groupings.push({
          dateday : $session.startDate,
          sessions: all_sessions.filter((_event) => equalDays(_event.startDate, $session.startDate)),
        })
      }
    })
    return $groupings
  }
}

},{}],8:[function(require,module,exports){
module.exports = class Exhibitor {
  /**
   * An organization exhibiting at a conference or series of conferences.
   * Assigned at the site level, not at an individual conference.
   * Construct a new Exhibitor object, given an (immutable) name.
   * @constructor
   * @param {string} name the name of the exhibiting organization
   */
  constructor(name) {
    /** @private @final */ this._NAME = name
    /** @private */ this._url   = ''
    /** @private */ this._img   = ''
    /** @private */ this._description = ''
    /** @private */ this._booth = NaN
    /** @private */ this._is_sponsor = false
  }

  /**
   * Get the name of this exhibitor.
   * @return {string} the name of this exhibitor
   */
  get name() {
    return this._NAME
  }

  /**
   * Set or get the URL of this exhibitor.
   * @param  {string=} url the URL of this exhibitor
   * @return {(Exhibitor|string)} this exhibitor || the URL of this exhibitor
   */
  url(url) {
    if (arguments.length) {
      this._url = url
      return this
    } else return this._url
  }

  /**
   * Set or get the image of this exhibitor.
   * @param  {string=} img the image of this exhibitor
   * @return {(Exhibitor|string)} this exhibitor || the image of this exhibitor
   */
  img(img) {
    if (arguments.length) {
      this._img = img
      return this
    } else return this._img
  }

  /**
   * Set a short, html-friendly description for this exhibitor.
   * @param {string} html html-friendly content
   * @return {Exhibitor} this exhibitor
   */
  setDescription(html) {
    this._description = html
    return this
  }
  /**
   * Get the description of this exhibitor.
   * @param  {boolean=} unescaped whether or not the returned string should be escaped
   * @return {string} the description of this exhibitor
   */
  getDescription(unescaped) {
    return ((unescaped) ? '<!-- warning: unescaped code -->' : '') + this._description
  }

  /**
   * Set or get the booth number of this exhibitor.
   * @param  {number=} num the booth number of this exhibitor
   * @return {(Exhibitor|number)} this exhibitor || the booth number of this exhibitor
   */
  booth(num) {
    if (arguments.length) {
      this._booth = num
      return this
    } else return this._booth
  }

  /**
   * Set or get whether this exhibitor is also a sponsor.
   * @see Supporter
   * @param  {boolean=} flag `true` if this exhibitor is also a sponsor
   * @return {(Exhibitor|boolean)} this exhibitor || `true` if this exhibitor is also a sponsor
   */
  isSponsor(flag) {
    if (arguments.length) {
      this._is_sponsor = flag
      return this
    } else return this._is_sponsor
  }
}

},{}],9:[function(require,module,exports){
module.exports = class ImportantDate {
  /**
   * An important date.
   * Construct an ImportantDate object.
   * The name and start time must be provided during construction
   * and are immutable. End time is optional.
   * @constructor
   * @param {Object=} $actioninfo an object with the following immutable properties:
   * @param {string} $actioninfo.name the name of the important date
   * @param {Date} $actioninfo.start_time the start time of the important date
   * @param {Date=} $actioninfo.end_time the start end of the important date
   */
  constructor($actioninfo = {}) {
    /** @private @final */ this._NAME  = $actioninfo.name
    /** @private @final */ this._START = $actioninfo.start_time
    /** @private @final */ this._END   = $actioninfo.end_time
    /** @private */ this._url          = ''
    /** @private */ this._is_starred   = false
  }

  /**
   * Get the name of this important date.
   * @return {string} the name of this important date
   */
  get name() {
    return this._NAME
  }

  /**
   * Return the start date value of this important date.
   * @return {Date} the start date of this important date
   */
  get startTime() {
    return this._START || new Date()
  }

  /**
   * Return the end date value of this important date.
   * @return {?Date} the end date of this important date
   */
  get endTime() {
    return this._END || null
  }

  /**
   * Set or get the url of this important date.
   * @param  {string=} url the url of this important date
   * @return {(ImportantDate|string)} this important date || the url of this important date
   */
  url(url) {
    if (arguments.length) {
      this._url = url
      return this
    } else return this._url
  }

  /**
   * Mark this important date as starred.
   * @param  {boolean=true} bool if true, mark as starred
   * @return {ImportantDate} this important date
   */
  star(bool) {
    this._is_starred = (arguments.length) ? bool : true
    return this
  }
  /**
   * Get the starred status of this important date.
   * @return {boolean} whether this important date is starred
   */
  isStarred() {
    return this._is_starred
  }
}

},{}],10:[function(require,module,exports){
module.exports = class Pass {
  /**
   * A set of prices for registration.
   * Constructs a Pass object.
   * @constructor
   * @param {string} name the name or type of the pass
   */
  constructor(name) {
    /** @private @final */ this._NAME = name
    /** @private */ this._description  = ''
    /** @private */ this._fineprint    = ''
    /** @private */ this._attend_types = []
    /** @private */ this._is_starred = false
  }

  /**
   * Get the name of this pass.
   * @return {string} the name of this pass
   */
  get name() {
    return this._NAME
  }

  /**
   * Set or get the description of this pass.
   * @param  {string=} text the description of this pass
   * @return {(Pass|string)} this pass || the description of this pass
   */
  description(text) {
    if (arguments.length) {
      this._description = text
      return this
    } else return this._description
  }

  /**
   * Set or get the fine print of this pass.
   * @param  {string=} text the fine print of this pass
   * @return {(Pass|string)} this pass || the fine print of this pass
   */
  fineprint(text) {
    if (arguments.length) {
      this._fineprint = text
      return this
    } else return this._fineprint
  }

  /**
   * Add an attendee type to this pass.
   * @param {Pass.AttendeeType} $attendeeType the attendee type to add
   */
  addAttendeeType($attendeeType) {
    this._attend_types.push($attendeeType)
    return this
  }
  // /**
  //  * REVIEW: use this method if class AttendeeType is removed.
  //  * Add an attendee type to this pass.
  //  * @param {string} name the name of the attendee type
  //  * @param {boolean} is_featured whether this attendee type is marked as “featured”
  //  */
  // addAttendeeType(name, is_featured) {
  //   this._attend_types.push({name: name, isFeatured: is_featured})
  //   return this
  // }
  /**
   * Retrieve an attendee type of this pass.
   * @param  {string} name the name of the attendee type to get
   * @return {?Pass.AtendeeType} the specified attendee type
   */
  getAttendeeType(name) {
    return this._attend_types.find(($attendeeType) => $attendeeType.name===name) || null
  }
  /**
   * Retreive all attendee types of this pass.
   * @return {Array<Pass.AttendeeType>} a shallow array of all attendee types of this pass
   */
  getAttendeeTypesAll() {
    return this._attend_types.slice()
  }

  /**
   * Mark this pass as starred.
   * @param  {boolean=true} bool if true, mark as starred
   * @return {Pass} this pass
   */
  star(bool = true) {
    this._is_starred = bool
    return this
  }
  /**
   * Get the starred status of this pass.
   * @return {boolean} whether this pass is starred
   */
  isStarred() {
    return this._is_starred
  }


  /**
   * REVIEW may not need this class
   * An Attendee Type ("Member", "Non-Member", etc) of a pass.
   * @inner
   */
  static get AttendeeType() {
    return class {
      /**
       * An Attendee Type ("Member", "Non-Member", etc) of a pass.
       * Construct an AttendeeType object, given a name and
       * a boolean specifying whether the object is featured.
       * Both name and “featured” are immutable.
       * @constructor
       * @param {string} name the name of the attendee type
       * @param {boolean} is_featured whether this attendee type is marked as “featured”
       */
      constructor(name, is_featured) {
        /** @private @final */ this._NAME        = name
        /** @private @final */ this._IS_FEATURED = is_featured
      }
      /**
       * Get the name of this attendee type.
       * @return {string} the name of this attendee type
       */
      get name() {
        return this._NAME
      }
      /**
       * Get whether this attendee type is featured.
       * @return {boolean} whether this attendee type is featured
       */
      get isFeatured() {
        return this._IS_FEATURED
      }
    }
  }
}

},{}],11:[function(require,module,exports){
var Util = require('./Util.class.js')

module.exports = class Person {
  /**
   * A person.
   * Can be used for any role on the suite.
   * Constructs a Person object.
   * @constructor
   * @param {string} id a unique identifier of the person
   * @param {Object=} $name an object containing the following:
   * @param {string} $name.honorific_prefix a prefix, if any (e.g. 'Mr.', 'Ms.', 'Dr.')
   * @param {string} $name.given_name the person’s first name
   * @param {string} $name.additional_name  the person’s middle name or initial
   * @param {string} $name.family_name the person’s last name
   * @param {string} $name.honorific_suffix the suffix, if any (e.g. 'M.D.', 'P.ASCE')
   */
  constructor(id, $name = {}) {
    /** @private @final */ this._ID   = id
    /** @private @final */ this._NAME = {
      honorific_prefix: $name.honorific_prefix,
      given_name      : $name.given_name,
      additional_name : $name.additional_name,
      family_name     : $name.family_name,
      honorific_suffix: $name.honorific_suffix,
    }
    /** @private */ this._jobTitle    = ''
    /** @private */ this._affiliation = ''
    /** @private */ this._img         = ''
    /** @private */ this._email       = ''
    /** @private */ this._telephone   = ''
    /** @private */ this._url         = ''
    /** @private */ this._social      = {}
    /** @private */ this._is_starred  = false
  }

  /**
   * Get the id of this person.
   * @return {string} the unique id of this person
   */
  get id() {
    return this._ID
  }

  /**
   * Get the name object of this person.
   * @return {Object} a shallow object representing this person’s name
   */
  get name() {
    //- NOTE returns shallow clone (like arr.slice())
    return Object.assign({}, this._NAME)
  }

  /**
   * Set or get this person’s job title.
   * @param  {string=} text the job title
   * @return {(Person|string)} this person || the job title
   */
  jobTitle(text) {
    if (arguments.length) {
      this._jobTitle = text
      return this
    } else return this._jobTitle
  }

  /**
   * Set or get this person’s affiliation.
   * @param  {string=} text the affiliation
   * @return {(Person|string)} this person || the affiliation
   */
  affiliation(text) {
    if (arguments.length) {
      this._affiliation = text
      return this
    } else return this._affiliation
  }

  /**
   * Set or get this person’s headshot image.
   * @param  {string=} text the url pointing to the headshot image
   * @return {(Person|string)} this person || the headshot image url
   */
  img(url) {
    if (arguments.length) {
      this._img = url
      return this
    } else return this._img
  }

  /**
   * Set or get this person’s email address.
   * @param  {string=} text the email address
   * @return {(Person|string)} this person || the email address
   */
  email(text) {
    if (arguments.length) {
      this._email = text
      return this
    } else return this._email
  }

  /**
   * Set or get this person’s telephone number.
   * @param  {string=} text the telephone number
   * @return {(Person|string)} this person || the telephone number
   */
  phone(text) {
    if (arguments.length) {
      this._telephone = text
      return this
    } else return this._telephone
  }

  /**
   * Set or get this person’s homepage.
   * @param  {string=} text the homepage
   * @return {(Person|string)} this person || the homepage
   */
  url(text) {
    if (arguments.length) {
      this._url = text
      return this
    } else return this._url
  }

  /**
   * Add a social network profile to this person.
   * @param {string} network_name the name of the social network
   * @param {string} url the URL of this person’s profile on the network
   * @param {string=} text optional advisory text
   * @return {Person} this person
   */
  addSocial(network_name, url, text) {
    this._social[network_name] = { url: url, text: text }
    return this
  }
  /**
   * Retrieve a social network profile of this person.
   * @param  {string} network_name the name of the social network
   * @return {Object} an object representing the social network profile
   */
  getSocial(network_name) {
    return this._social[network_name]
  }
  /**
   * Return an object representing all social network profiles of this person.
   * @return {Object} shallow clone of this person’s social object
   */
  getSocialAll() {
    //- NOTE returns shallow clone (like arr.slice())
    return Object.assign({}, this._social) // shallow clone this.social into {}
  }

  /**
   * Mark this person as starred.
   * @param  {boolean=true} bool if true, mark as starred
   * @return {Person} this person
   */
  star(bool) {
    this._is_starred = (arguments.length) ? bool : true
    return this
  }
  /**
   * Get the starred status of this person.
   * @return {boolean} whether this person is starred
   */
  isStarred() {
    return this._is_starred
  }


  /**
   * Output this person’s name and other information as HTML.
   * NOTE: remember to wrap this output with an `[itemscope=""][itemtype="https://schema.org/Person"]`.
   * Also remember to unescape this code, or else you will get `&lt;`s and `&gt;`s.
   * @param  {Person.Format} format how to display the output
   * @return {string} a string representing an HTML DOM snippet
   */
  html(format) {
    switch (format) {
      case Person.Format.NAME:
        return `
          <span itemprop="name">
            <span itemprop="givenName">${this.name.given_name}</span>
            <span itemprop="familiyName">${this.name.family_name}</span>
          </span>
        `
        break;
      case Person.Format.FULL_NAME:
        return `
          <span itemprop="name">
            <span itemprop="givenName">${this.name.given_name}</span>
            <span itemprop="additionalName">${this.name.additional_name}</span>
            <span itemprop="familiyName">${this.name.family_name}</span>
          </span>
        `
        break;
      case Person.Format.ENTIRE_NAME:
        var output = this.html(Person.Format.FULL_NAME) // using `var` because `let` works poorly in `switch`
        if (this.name.honorific_prefix) {
          output = `<span itemprop="honorificPrefix">${this.name.honorific_prefix}</span> ${output}`
        }
        if (this.name.honorific_suffix) {
          output = `${output}, <span itemprop="honorificSuffix">${this.name.honorific_suffix}</span>`
        }
        return output
        break;
      case Person.Format.AFFILIATION:
        return `${this.html(Person.Format.ENTIRE_NAME)},
          <span class="-fs-t" itemprop="affiliation" itemscope="" itemtype="http://schema.org/Organization">
            <span itemprop="name">${this.affiliation()}</span>
          </span>
        `
        break;
      case Person.Format.CONTACT:
        var output = `
          <a href="mailto:${this.email()}">${this.html(Person.Format.NAME)}</a>
        `
        if (this.jobTitle()) {
          output = `${output}, <span itemprop="jobTitle">${this.jobTitle()}</span>`
        }
        if (this.phone()) {
          output = `${output} | <a href="tel:${this.phone()}" itemprop="telephone">${this.phone()}</a>`
        }
        return output
        break;
      default:
        return this.toString()
    }
  }

  /**
   * Enum for name formats.
   * @enum {String}
   */
  static get Format() {
    return {
      /** First Last */                                 NAME       : 'name',
      /** First Middle Last */                          FULL_NAME  : 'full',
      /** Px. First Middle Last, Sx. */                 ENTIRE_NAME: 'entire',
      /** First Middle Last, Affiliation */             AFFILIATION: 'affiliation',
      /** First Last, Director of ... | 555-555-5555 */ CONTACT    : 'contact',
    }
  }
}

},{"./Util.class.js":17}],12:[function(require,module,exports){
var Util = require('./Util.class.js')

module.exports = class Place {
  /**
   * A place.
   * Mostly used for hotel & venue locations.
   * Constructs a Place object.
   * @constructor
   * @param {string} name the name of the place
   * @param {Object=} $placeinfo an object containing the following:
   * @param {string} $placeinfo.street_address the street and number, eg: '1801 Alexander Bell Drive'
   * @param {string} $placeinfo.address_locality the city name, eg: 'Reston'
   * @param {string} $placeinfo.address_region   the state code *[1], eg: 'VA'
   * @param {string} $placeinfo.postal_code      the zip code, eg: '22901-4382'
   * @param {string} $placeinfo.country          the country code *[1], eg: 'US'
   * @param {string} $placeinfo.telephone        the telephone number (no spaces), eg: '+1-800-548-2723'
   * @param {string} $placeinfo.url              the URL of homepage, eg: 'http://www.asce.org/'
   * *[1] zip, state, and country codes should match the ISO-3166 standard format. see https://en.wikipedia.org/wiki/ISO_3166
   */
  constructor(name, $placeinfo = {}) {
    /** @private @final */ this._NAME = name
    /** @private @final */ this._STREET_ADDRESS   = $placeinfo.street_address
    /** @private @final */ this._ADDRESS_LOCALITY = $placeinfo.address_locality
    /** @private @final */ this._ADDRESS_REGION   = $placeinfo.address_region
    /** @private @final */ this._POSTAL_CODE      = $placeinfo.postal_code
    /** @private @final */ this._ADDRESS_COUNTRY  = $placeinfo.address_country
    /** @private @final */ this._TELEPHONE        = $placeinfo.telephone
    /** @private @final */ this._URL              = $placeinfo.url
  }

  /**
   * Get the name of this place.
   * @return {string} the name of this place
   */
  get name() {
    return this._NAME
  }
  /**
   * Get the street address of this place.
   * @return {string} the street address of this place
   */
  get streetAddress() {
    return this._STREET_ADDRESS
  }
  /**
   * Get the address locality (city/town) of this place.
   * @return {string} the address locality (city/town) of this place
   */
  get addressLocality() {
    return this._ADDRESS_LOCALITY
  }
  /**
   * Get the address region (state/province) of this place.
   * @return {string} the address region (state/province) of this place
   */
  get addressRegion() {
    return this._ADDRESS_REGION
  }
  /**
   * Get the postal (zip) code of this place.
   * @return {string} the postal (zip) code of this place
   */
  get postalCode() {
    return this._POSTAL_CODE
  }
  /**
   * Get the country of this place.
   * @return {string} the country of this place
   */
  get addressCountry() {
    return this._ADDRESS_COUNTRY
  }
  /**
   * Get the telephone number for this place.
   * @return {string} the telephone number for this place
   */
  get telephone() {
    return this._TELEPHONE
  }
  /**
   * Get the URL for the homepage of this place.
   * @return {string} the URL for the homepage of this place
   */
  get url() {
    return this._URL
  }


  /**
   * Output this person’s name and other information as HTML.
   * NOTE: remember to wrap this output with an `[itemscope=""][itemtype="https://schema.org/Place"]`.
   * Also remember to unescape this code, or else you will get `&lt;`s and `&gt;`s.
   * @return {string} a string representing an HTML DOM snippet
   */
  html() {
    let $name = `<b class="h-Clearfix" itemprop="name">${this.name}</b>`
    if (this.url) $name = `<a href="${this.url}" itemprop="url">${$name}</a>`
    return `
      ${$name}
      <span itemprop="address" itemscope="" itemtype="https://schema.org/PostalAddress">
        <span class="h-Clearfix" itemprop="streetAddress">${this.streetAddress}</span>
        <span itemprop="addressLocality">${this.addressLocality}</span>,
        <span itemprop="addressRegion">${this.addressRegion}</span>
        <span class="h-Clearfix" itemprop="postalCode">${this.postalCode}</span>
        ${(this.addressCountry) ? `<span class="h-Clearfix" itemprop="addressCountry">${this.addressCountry}</span>` : ''}
      </span>
      ${(this.telephone) ? `<a href="tel:${this.telephone}" itemprop="telephone">${this.telephone}</a>` : ''}
    `
  }
}

},{"./Util.class.js":17}],13:[function(require,module,exports){
var Util = require('./Util.class.js')

module.exports = class RegistrationPeriod {
  /**
   * REVIEW may not need this class
   * An interval of dates in which registration prices are set.
   * Assigned at the conference level.
   * Construct a RegistrationPeriod object.
   * The name, start date, and end date
   * are immutable and must be provided during construction.
   * @constructor
   * @param {Object=} $periodinfo an object with the following immutable properties:
   * @param {string} $periodinfo.name the name of the registration period (e.g., 'Early Bird')
   * @param {Date} $periodinfo.start_date the date on which this registration period starts
   * @param {Date} $periodinfo.end_date the date on which this registration period ends
   */
  constructor($periodinfo = {}) {
    /** @private @final */ this._NAME  = $periodinfo.name
    /** @private @final */ this._START = $periodinfo.start_date
    /** @private @final */ this._END   = $periodinfo.end_date
    /** @private */ this._icon = null
  }

  /**
   * Get the name of this registration period.
   * @return {string} the name of this registration period
   */
  get name() {
    return this._NAME
  }

  /**
   * Get the start date of this registration period.
   * @return {Date} the start date of this registration period
   */
  get startDate() {
    return this._START || new Date()
  }

  /**
   * Get the end date of this registration period.
   * @return {Date} the end date of this registration period
   */
  get endDate() {
    return this._END || new Date()
  }

  /**
   * Set the icon of this registration period.
   * REVIEW: if icons are the same suite-wide, this can be removed.
   * @param {string} key the keyword of the icon to set
   */
  setIcon(key) {
    this._icon = Util.ICON_DATA.find((item) => item.content===key)
    return this
  }
  /**
   * Get the icon of this registration period.
   * REVIEW: if icons are the same suite-wide, this can be removed.
   * @param  {boolean=} fallback if true, get the unicode code point
   * @return {string} if fallback, the unicode code point, else, the keyword of the icon
   */
  getIcon(fallback) {
    return (this._icon) ? Util.iconToString(this._icon, fallback) : ''
  }
}

},{"./Util.class.js":17}],14:[function(require,module,exports){
module.exports = class Session {
  /**
   * A program event.
   * Construct a Session object.
   * The name, start date, and end date
   * are immutable and must be provided during construction.
   * @constructor
   * @param {Object=} $eventinfo an object with the following immutable properties:
   * @param {string} $eventinfo.name the name of the session
   * @param {Date} $eventinfo.start_date the start date of the session
   * @param {Date} $eventinfo.end_date the end date of the session
   */
  constructor($eventinfo = {}) {
    /** @private */ this._NAME  = $eventinfo.name
    /** @private */ this._START = $eventinfo.start_date
    /** @private */ this._END   = $eventinfo.end_date
    /** @private */ this._url = ''
    /** @private */ this._is_starred = false
  }

  /**
   * Get the name of this session.
   * @return {string} the name of this session
   */
  get name() {
    return this._NAME
  }

  /**
   * Get the start date of this session.
   * @return {Date} the start date of this session
   */
  get startDate() {
    return this._START || new Date()
  }

  /**
   * Get the end date of this session.
   * @return {Date} the end date of this session
   */
  get endDate() {
    return this._END || new Date()
  }

  /**
   * Set or get the url of this session.
   * @param  {string=} url the url of this session
   * @return {(Session|string)} this session || the url of this session
   */
  url(url) {
    if (arguments.length) {
      this._url = url
      return this
    } else return this._url
  }

  /**
   * Mark this session as starred.
   * @param  {boolean=true} bool if true, mark as starred
   * @return {Session} this session
   */
  star(bool) {
    this._is_starred = (arguments.length) ? bool : true
    return this
  }
  /**
   * Get the starred status of this session.
   * @return {boolean} whether this session is starred
   */
  isStarred() {
    return this._is_starred
  }
}

},{}],15:[function(require,module,exports){
module.exports = class Supporter {
  /**
   * An organization supporting a conference or series of conferences.
   * Assigned at the site level, not at an individual conference.
   * Construct a supporter object, given an (immutable) name.
   * @constructor
   * @param {string} name the name of the supporting organization
   */
  constructor(name) {
    /** @private @final */ this._NAME = name
    /** @private */ this._url   = ''
    /** @private */ this._img   = ''
    /** @private */ this._level = ''
  }

  /**
   * Get the name of this supporter.
   * @return {string} the name of this supporter
   */
  get name() {
    return this._NAME
  }

  /**
   * Set or get the URL of this supporter.
   * @param  {string=} url the URL of this supporter
   * @return {(Supporter|string)} this supporter || the URL of this suppoter
   */
  url(url) {
    if (arguments.length) {
      this._url = url
      return this
    } else return this._url
  }

  /**
   * Set or get the image of this supporter.
   * @param  {string=} img the image of this supporter
   * @return {(Supporter|string)} this supporter || the image of this suppoter
   */
  img(img) {
    if (arguments.length) {
      this._img = img
      return this
    } else return this._img
  }

  /**
   * Set or get the supporter level in which this supporter belongs.
   * @see SupporterLevel
   * @param  {string=} level a string matching a the name of a SupporterLevel; the level this supporter belongs in
   * @return {(Supporter|string)} this supporter || name of the corresponding SupporterLevel object
   */
  level(level) {
    if (arguments.length) {
      this._level = level
      return this
    } else return this._level
  }
}

},{}],16:[function(require,module,exports){
module.exports = class SupporterLevel {
  /**
   * A group of supporters with a similar level of support or donation.
   * Assigned at the site level, not at an individual conference.
   * Construct a SupporterLevel object, given an (immutable) name.
   * @constructor
   * @param {string} name the name of the level (e.g. 'Gold')
   */
  constructor(name) {
    /** @private @final */ this._NAME = name
    /** @private */ this._size = SupporterLevel.LogoSize.DEFAULT
  }

  /**
   * Get the name of this supporter level.
   * @return {string} the name of this supporter level
   */
  get name() {
    return this._NAME
  }

  /**
   * Set or get the sizing of this supporter level.
   * The sizing informs the size of the supporter logo in this supporter level.
   * @param  {SupporterLevel.LogoSize=} size the sizing of this supporter level’s logos
   * @return {(SupporterLevel|SupporterLevel.LogoSize)} this supporter level | the sizing
   */
  size(size = SupporterLevel.LogoSize.DEFAULT) {
    if (arguments.length) {
      this._size = size
      return this
    } else return this._size
  }

  /**
   * Enum for supporter level logo sizes.
   * @enum {string}
   */
  static get LogoSize() {
    return {
      /** Logo size for top-level supporters. */ LARGE : 'lrg',
      /** Logo size for mid-level supporters. */ MEDIUM: 'med',
      /** Logo size for low-level supporters. */ SMALL : 'sml',
      /** Default value. */                      get DEFAULT() { return this.LARGE },
    }
  }
}

},{}],17:[function(require,module,exports){
module.exports = class Util {
  /**
   * A set of static values and functions used site-wide.
   * @private
   * @constructor
   */
  constructor() {}

  /**
   * List of full month names in English.
   * @type {Array<string>}
   */
  static get MONTH_NAMES() {
    return [
      'January',
      'February',
      'March',
      'April',
      'May',
      'June',
      'July',
      'August',
      'September',
      'October',
      'November',
      'December',
    ]
  }

  /**
   * List of full day names in English.
   * @type {Array<string>}
   */
  static get DAY_NAMES() {
    return [
      'Sunday',
      'Monday',
      'Tuesday',
      'Wednesday',
      'Thursday',
      'Friday',
      'Saturday',
    ]
  }

  /**
   * NOTE: Type Definition
   * @typedef {Object} StateObj
   * @property {string} index  - the postal code for the state
   * @property {string} name   - the name of the state
   * @property {number} pop    - population in people
   * @property {number} area   - area in square km
   * @property {Util.Region} region - region of US
   */

  /**
   * List of US State objects.
   * @type {Array<StateObj>}
   */
  static get STATE_DATA() {
    return [
      { index: 'AL',  name: 'Alabama',         pop:  4779736,  area:  52419, region: Util.Region.SOUTH     },
      { index: 'AK',  name: 'Alaska',          pop:   710231,  area: 663267, region: Util.Region.WEST      },
      { index: 'AZ',  name: 'Arizona',         pop:  6392017,  area: 113998, region: Util.Region.SOUTHWEST },
      { index: 'AR',  name: 'Arkansas',        pop:  2915918,  area:  53179, region: Util.Region.SOUTH     },
      { index: 'CA',  name: 'California',      pop: 37253956,  area: 163696, region: Util.Region.WEST      },
      { index: 'CO',  name: 'Colorado',        pop:  5029196,  area: 104094, region: Util.Region.WEST      },
      { index: 'CT',  name: 'Connecticut',     pop:  3574097,  area:   5543, region: Util.Region.NORTHEAST },
      { index: 'DE',  name: 'Delaware',        pop:   897934,  area:   2489, region: Util.Region.NORTHEAST },
      { index: 'FL',  name: 'Florida',         pop: 18801310,  area:  65755, region: Util.Region.SOUTH     },
      { index: 'GA',  name: 'Georgia',         pop:  9687653,  area:  59425, region: Util.Region.SOUTH     },
      { index: 'HI',  name: 'Hawaii',          pop:  1360301,  area:  10931, region: Util.Region.WEST      },
      { index: 'ID',  name: 'Idaho',           pop:  1567582,  area:  83570, region: Util.Region.WEST      },
      { index: 'IL',  name: 'Illinois',        pop: 12830632,  area:  57914, region: Util.Region.MIDWEST   },
      { index: 'IN',  name: 'Indiana',         pop:  6483802,  area:  36418, region: Util.Region.MIDWEST   },
      { index: 'IA',  name: 'Iowa',            pop:  3046355,  area:  56272, region: Util.Region.MIDWEST   },
      { index: 'KS',  name: 'Kansas',          pop:  2853118,  area:  82277, region: Util.Region.MIDWEST   },
      { index: 'KY',  name: 'Kentucky',        pop:  4339367,  area:  40409, region: Util.Region.SOUTH     },
      { index: 'LA',  name: 'Louisiana',       pop:  4533372,  area:  51840, region: Util.Region.SOUTH     },
      { index: 'ME',  name: 'Maine',           pop:  1328361,  area:  35385, region: Util.Region.NORTHEAST },
      { index: 'MD',  name: 'Maryland',        pop:  5773552,  area:  12407, region: Util.Region.NORTHEAST },
      { index: 'MA',  name: 'Massachusetts',   pop:  6547629,  area:  10555, region: Util.Region.NORTHEAST },
      { index: 'MI',  name: 'Michigan',        pop:  9883640,  area:  96716, region: Util.Region.MIDWEST   },
      { index: 'MN',  name: 'Minnesota',       pop:  5303925,  area:  86939, region: Util.Region.MIDWEST   },
      { index: 'MS',  name: 'Mississippi',     pop:  2967297,  area:  48430, region: Util.Region.SOUTH     },
      { index: 'MO',  name: 'Missouri',        pop:  5988927,  area:  69704, region: Util.Region.MIDWEST   },
      { index: 'MT',  name: 'Montana',         pop:   989415,  area: 147042, region: Util.Region.WEST      },
      { index: 'NE',  name: 'Nebraska',        pop:  1826341,  area:  77354, region: Util.Region.MIDWEST   },
      { index: 'NV',  name: 'Nevada',          pop:  2700551,  area: 110561, region: Util.Region.WEST      },
      { index: 'NH',  name: 'New Hampshire',   pop:  1316470,  area:   9350, region: Util.Region.NORTHEAST },
      { index: 'NJ',  name: 'New Jersey',      pop:  8791894,  area:   8721, region: Util.Region.NORTHEAST },
      { index: 'NM',  name: 'New Mexico',      pop:  2059179,  area: 121589, region: Util.Region.SOUTHWEST },
      { index: 'NY',  name: 'New York',        pop: 19378102,  area:  54556, region: Util.Region.NORTHEAST },
      { index: 'NC',  name: 'North Carolina',  pop:  9535483,  area:  53819, region: Util.Region.SOUTH     },
      { index: 'ND',  name: 'North Dakota',    pop:   672591,  area:  70700, region: Util.Region.MIDWEST   },
      { index: 'OH',  name: 'Ohio',            pop: 11536504,  area:  44825, region: Util.Region.MIDWEST   },
      { index: 'OK',  name: 'Oklahoma',        pop:  3751351,  area:  69898, region: Util.Region.SOUTHWEST },
      { index: 'OR',  name: 'Oregon',          pop:  3831074,  area:  98381, region: Util.Region.WEST      },
      { index: 'PA',  name: 'Pennsylvania',    pop: 12702379,  area:  46055, region: Util.Region.NORTHEAST },
      { index: 'RI',  name: 'Rhode Island',    pop:  1052567,  area:   1545, region: Util.Region.NORTHEAST },
      { index: 'SC',  name: 'South Carolina',  pop:  4625364,  area:  32020, region: Util.Region.SOUTH     },
      { index: 'SD',  name: 'South Dakota',    pop:   814180,  area:  77117, region: Util.Region.MIDWEST   },
      { index: 'TN',  name: 'Tennessee',       pop:  6346105,  area:  42143, region: Util.Region.SOUTH     },
      { index: 'TX',  name: 'Texas',           pop: 25145561,  area: 268581, region: Util.Region.SOUTHWEST },
      { index: 'UT',  name: 'Utah',            pop:  2763885,  area:  84899, region: Util.Region.WEST      },
      { index: 'VT',  name: 'Vermont',         pop:   625741,  area:   9614, region: Util.Region.NORTHEAST },
      { index: 'VA',  name: 'Virginia',        pop:  8260405,  area:  42774, region: Util.Region.SOUTH     },
      { index: 'WA',  name: 'Washington',      pop:  6971406,  area:  71300, region: Util.Region.WEST      },
      { index: 'WV',  name: 'West Virginia',   pop:  1854304,  area:  24230, region: Util.Region.SOUTH     },
      { index: 'WI',  name: 'Wisconsin',       pop:  5686986,  area:  65498, region: Util.Region.MIDWEST   },
      { index: 'WY',  name: 'Wyoming',         pop:   563626,  area:  97814, region: Util.Region.WEST      },
    ]
  }

  /**
   * NOTE: Type Definition
   * @typedef {Object} Icon
   * @property {string} content  - the keyword used for the ligature
   * @property {string} fallback - unicode code point
   * @property {string} html     - html entity
   */

  /**
   * List of icon objects used in Conf styles.
   * @type {Array<Icon>}
   */
  static get ICON_DATA() {
    return [
      { content: 'home'              , fallback: '\uE88A', html: '&#xE88A;' }, // Home page
      { content: 'shopping_cart'     , fallback: '\uE8CC', html: '&#xE8CC;' }, // Registration page
      { content: 'event'             , fallback: '\uE878', html: '&#xE878;' }, // Program page
      { content: 'flight'            , fallback: '\uE539', html: '&#xE539;' }, // Location page
      { content: 'account_box'       , fallback: '\uE851', html: '&#xE851;' }, // Speakers page
      { content: 'people'            , fallback: '\uE7FB', html: '&#xE7FB;' }, // Sponsor page
      { content: 'work'              , fallback: '\uE8F9', html: '&#xE8F9;' }, // Exhibit page
      { content: 'info_outline'      , fallback: '\uE88F', html: '&#xE88F;' }, // About page
      { content: 'email'             , fallback: '\uE0BE', html: '&#xE0BE;' }, // Contact page / social list icon email
      { content: 'stars'             , fallback: '\uE8D0', html: '&#xE8D0;' }, // Early Bird registration period icon
      { content: 'date_range'        , fallback: '\uE916', html: '&#xE916;' }, // Advance registration period icon
      { content: 'account_balance'   , fallback: '\uE84F', html: '&#xE84F;' }, // Onsite registration period icon
      { content: 'insert_drive_file' , fallback: '\uE24D', html: '&#xE24D;' }, // generic page file (only used in Docs)
      { content: 'arrow_upward'      , fallback: '\uE5D8', html: '&#xE5D8;' }, // "return to top" button
      { content: 'phone'             , fallback: '\uE0CD', html: '&#xE0CD;' }, // social list icon phone
      { content: 'phone_iphone'      , fallback: '\uE325', html: '&#xE325;' }, // social list icon phone / mobile app callout
      { content: 'explore'           , fallback: '\uE87A', html: '&#xE87A;' }, // social list icon homepage
      { content: 'expand_more'       , fallback: '\uE5CF', html: '&#xE5CF;' }, // main menu drop-down
    ]
  }

  /**
   * Data for social media networks.
   * @type {Object<{name:string, icon}>}
   */
  static get SOCIAL_DATA() {
    return {
      twitter: {
        name: 'Twitter',
        icon: Util.ICON_DATA[-1],
        // toURL: (handle = '') => `https://twitter.com/${(handle)}`,
      },
      facebook: {
        name: 'Faceboook',
        icon: Util.ICON_DATA[-1],
      },
      google: {
        name: 'Google+',
        icon: Util.ICON_DATA[-1],
      },
      linkedin: {
        name: 'LinkedIn',
        icon: Util.ICON_DATA[-1],
      },
      youtube: {
        name: 'YouTube',
        icon: Util.ICON_DATA[-1],
      },
    }
  }

  /**
   * Display a Date object as a string of the format 'HH:MMrr', where
   * - 'HH' is the 12-hour format hour of day ('1'–'12')
   * - 'MM' is the minutes of the hour
   * - 'rr' is 'am' or 'pm' (“Ante Meridiem” or “Post Meridiem”)
   * @param  {Date} date the datetime to display
   * @return {string} a string of the format HH:MM[am|pm]
   */
  static hourTime12(date) {
    var hour = '' + ((date.getHours() - 1)%12 + 1)
    var minute = ((date.getMinutes() < 10) ? '0' : '') + date.getMinutes()
    var meridiem = (date.getHours() < 12) ? 'am' : 'pm'
    return hour + ((minute !== '00') ? `:${minute}` : '') + meridiem
  }

  /**
   * Display a Date object as a string of the format 'HHHH:MM', where
   * - 'HHHH' is the 24-hour format hour of day ('00'–'23')
   * - 'MM' is the minutes of the hour
   * @param  {Date} date the datetime to display
   * @return {string} a string of the format HHHH:MM
   */
  static hourTime24(date) {
    var hour =   ((date.getHours()   < 10) ? '0' : '') + date.getHours()
    var minute = ((date.getMinutes() < 10) ? '0' : '') + date.getMinutes()
    return hour + ':' + minute
  }

  /**
   * Return an abbreviated form of a date.
   * The format is 'MMM DD', where
   * - 'MMM' is the first 3 letters of the month in English
   * - 'DD' is the date (one or two digits)
   * @param  {Date} date the datetime to display
   * @return {string} a string of the format 'MMM DD'
   */
  static monthDay(date) {
    return Util.MONTH_NAMES[date.getUTCMonth()].slice(0,3) + ' ' + date.getUTCDate()
  }

  /**
   * Return a URL-friendly string.
   * @param  {string} str a string to convert
   * @return {string} a URL-safe variant of the string given
   */
  static toURL(str) {
    return encodeURIComponent(str.toLowerCase().replace(/[\W]+/g, '-'))
  }

  /**
   * Return a new Date object from a given datetime string.
   * @param  {string} str a string in any acceptable datetime format
   * @return {Date} a new Date object representation of the argument
   */
  static toDate(str) {
    return (str) ? new Date(str) : new Date()
  }

  /**
   * Remove an item from an array.
   * This method is destructive: it modifies the given argument.
   * @param  {Array} arr the array to modify
   * @param  {unknown} item  the item to remove from the array
   */
  static spliceFromArray(arr, item) {
    var index = arr.indexOf(item)
    if (index >= 0) arr.splice(index, 1)
  }

  /**
   * Return a string part of an icon.
   * @param  {Object} icon          the icon object to parse
   * @param  {string} icon.content  the keyword of the icon
   * @param  {string} icon.fallback the unicode codepoint of the icon
   * @param  {boolean=} fb          true if the fallback is preferred over the content
   * @return {string}               `icon.fallback` if fallback==true, else `icon.content`
   */
  static iconToString(icon, fb) {
    return (fb) ? icon.fallback : icon.content
  }

  /**
   * Enum for state regions
   * @enum {string}
   */
  static get Region() {
    return {
      SOUTH    : 's',
      WEST     : 'w',
      SOUTHWEST: 'sw',
      NORTHEAST: 'ne',
      MIDWEST  : 'mw',
    }
  }
}

},{}],18:[function(require,module,exports){
module.exports = {
  Util              : require('./_models/Util.class.js'),
  ConfSite          : require('./_models/ConfSite.class.js'),
  ConfPage          : require('./_models/ConfPage.class.js'),
  Conference        : require('./_models/Conference.class.js'),
  RegistrationPeriod: require('./_models/RegistrationPeriod.class.js'),
  Pass              : require('./_models/Pass.class.js'),
  Session           : require('./_models/Session.class.js'),
  Place             : require('./_models/Place.class.js'),
  Person            : require('./_models/Person.class.js'),
  SupporterLevel    : require('./_models/SupporterLevel.class.js'),
  Supporter         : require('./_models/Supporter.class.js'),
  Exhibitor         : require('./_models/Exhibitor.class.js'),
  ImportantDate     : require('./_models/ImportantDate.class.js'),
}

},{"./_models/ConfPage.class.js":5,"./_models/ConfSite.class.js":6,"./_models/Conference.class.js":7,"./_models/Exhibitor.class.js":8,"./_models/ImportantDate.class.js":9,"./_models/Pass.class.js":10,"./_models/Person.class.js":11,"./_models/Place.class.js":12,"./_models/RegistrationPeriod.class.js":13,"./_models/Session.class.js":14,"./_models/Supporter.class.js":15,"./_models/SupporterLevel.class.js":16,"./_models/Util.class.js":17}],19:[function(require,module,exports){
/**
 * A Page is an object with a name and url.
 * Both the name and url are immutable (cannot be changed).
 * The url is used as the page identifier; that is, no two pages within
 * the same structure may have the same url.
 * @type {Page}
 */
module.exports = (function () {
  // CONSTRUCTOR
  /**
   * Construct a Page object, given a name and url.
   * @constructor
   * @param {Object} $pageinfo an object with `name` and `url` properties
   * @param {string} $pageinfo.name the name of this page
   * @param {string} $pageinfo.url the url (and ID) of this page
   */
  function Page($pageinfo) {
    var self = this
    $pageinfo = $pageinfo || {} // NOTE constructor overloading
    self._NAME = $pageinfo.name
    self._URL  = $pageinfo.url
    self._title       = ''
    self._description = ''
    self._keywords    = []
    self._is_hidden   = false
    self._pages       = []
  }

  // ACCESSOR FUNCTIONS
  /**
   * Get the name of this page.
   * @return {string} the name of this page
   */
  Page.prototype.name = function name() {
    return this._NAME
  }

  /**
   * Get the url of this page.
   * @return {string} the url of this page
   */
  Page.prototype.url = function url() {
    return this._URL
  }

  /**
   * Set or get the title of this page.
   * Set the argument, if given, as the title, and return this page.
   * Otherwise, return the title of this page.
   * The `title` should be a more official and formal version of the `name`.
   * @param  {(function():string|string=)} arg the title to set, or function to call
   * @return {(Page|string)} this page || the title of this page
   */
  Page.prototype.title = function title(arg) {
    if (arguments.length) {
      this._title = (typeof arg === 'function') ? arg.call(this) : arg
      return this
    } else return this._title
  }

  /**
   * Set or get the description of this page.
   * Set the argument, if given, as the description, and return this page.
   * Otherwise, return the description of this page.
   * @param  {(function():string|string=)} arg the description to set, or function to call
   * @return {(Page|string)} this page || the description of this page
   */
  Page.prototype.description = function description(arg) {
    if (arguments.length) {
      this._description = (typeof arg === 'function') ? arg.call(this) : arg
      return this
    } else return this._description
  }

  /**
   * Set or get the keywords of this page.
   * Set the argument, if given, as the keywords, and return this page.
   * Otherwise, return the keywords of this page.
   * @param  {(function():string|Array=)} arg the keywords to set, or function to call
   * @return {(Page|string)} this page || the keywords of this page
   */
  Page.prototype.keywords = function keywords(arg) {
    if (arguments.length) {
      this._keywords = (typeof arg === 'function') ? arg.call(this) : arg
      return this
    } else return this._keywords.slice()
  }

  /**
   * Hide or show this page.
   * @param  {boolean=true} bool hides or shows this page
   * @return {Page} this page
   */
  Page.prototype.hide = function hide(bool) {
    this._is_hidden = (arguments.length) ? bool : true
    return this
  }
  /**
   * Get the hidden status of this page.
   * @return {boolean} true if this page is hidden; false otherwise
   */
  Page.prototype.isHidden = function isHidden() {
    return this._is_hidden
  }

  // METHODS
  /**
   * Add a sub-page to this page.
   * A sub-page is another page acting a child of this page in a tree/hierarchy.
   * @param {Page} $page an instance of the Page class
   */
  Page.prototype.add = function add($page) {
    this._pages.push($page)
    return this
  }

  /**
   * Remove a sub-page from this page.
   * @param  {(function():string|string)} arg the url of the page to remove, or function to call
   * @return {Page} this page
   */
  Page.prototype.remove = function remove(arg) {
    var index = this._pages.indexOf((function (self) {
      var page
      if (typeof arg === 'function') {
        page = arg.call(self)
      } else if (typeof arg === 'string') {
        page = self.find(arg)
      } else {
        page = arg
      }
      return page
    })(this))
    if (index >= 0) this._pages.splice(index, 1)
    return this
  }

  /**
   * Remove all sub-pages from this page.
   * @return {Page} this page
   */
  Page.prototype.removeAll = function removeAll() {
    this._pages = []
    return this
  }

  /**
   * Find and return a descendant of this page.
   * @param  {string} url the url of the page to find
   * @return {?Page} the page found, else `null`
   */
  Page.prototype.find = function find(url) {
    return this._pages.find(function (item) { return item._URL === url })
      || (function (self) {
        var ancestor = self._pages.find(function (item) { return item.find(url) })
        return (ancestor) ? ancestor.find(url) : null
      })(this)
  }

  /**
   * Return a shallow copy of all sub-pages of this page.
   *
   * This function is non-destructive. For example, assigning
   * `$page.findAll()[0] = null` will set the first element of
   * a shallow array to `null`, but will not affect the original children of `$page`.
   * @return {Array<Page>} a shallow array containing all sub-pages of this page
   */
  Page.prototype.findAll = function findAll() {
    return this._pages.slice()
  }

  // STATIC MEMBERS

  return Page
})()

},{}],20:[function(require,module,exports){
var Page = require('./Page.class.js')

/**
 * A StyleGuide object has a name and url, and a set of preset pages.
 * @type {StyleGuide}
 * @extends Page
 */
module.exports = (function () {
  // CONSTRUCTOR
  /**
   * Construct a StyleGuide object, given a name and url.
   * @constructor
   * @param {string} name the name of this styleguide
   * @param {string} url  the url of the landing page of this styleguide
   */
  function StyleGuide(name, url) {
    var self = this
    Page.call(self, { name: name, url: url })
    self._was_initialized = false
  }
  StyleGuide.prototype = Object.create(Page.prototype)
  StyleGuide.prototype.constructor = StyleGuide

  // ACCESSOR FUNCTIONS

  // METHODS
  /**
   * Initialize and add starting pages to this styleguide, then return it.
   *
   * Should be called every time `new StyleGuide()` is called,
   * but AFTER `.title()` and `.description()` are called on it.
   * This is because the pages initialized require the title
   * and description of this style guide. E.g. this is the proper order:
   * ```
   * var sg = new StyleGuide('Example Style Guide', '//example.com/style-guide/')
   *   .title('Style Guide of Example Dot Com')
   *   .description('A reference for standard styles at Example Dot Com.')
   *   .init()
   * ```
   * @return {StyleGuide} this styleguide
   */
  StyleGuide.prototype.init = function init() {
    var self = this
    if (!self._was_initialized) {
      self._was_initialized = true
      return self
        .add(new Page({ name: self.name(), url: 'index.html' })
          .description(self.description())
        )
        .add(new Page({ name: 'Visual Design', url: 'visual.html' })
          .description('Color and font schemes, look-and-feel, overall voice and tone.')
        )
        .add(new Page({ name: 'Base Typography', url: 'base.html' })
          .description('Bare, unstyled HTML elements. No classes.')
          .add(new Page({ name: 'Table of Contents'    , url: 'base.html#table-contents' }))
          .add(new Page({ name: 'Headings & Paragraphs', url: 'base.html#headings-paragraphs' }))
          .add(new Page({ name: 'Lists'                , url: 'base.html#lists' }))
          .add(new Page({ name: 'Tables'               , url: 'base.html#tables' }))
          .add(new Page({ name: 'Text-Level Elements'  , url: 'base.html#text-level-elements' })
            .add(new Page({ name: 'Links'        , url: 'base.html#links' }))
            .add(new Page({ name: 'Stress'       , url: 'base.html#stress' }))
            .add(new Page({ name: 'Documentation', url: 'base.html#documentation' }))
            .add(new Page({ name: 'Data'         , url: 'base.html#data' }))
          )
          .add(new Page({ name: 'Embedded Elements'   , url: 'base.html#embedded-elements' }))
          .add(new Page({ name: 'Forms'               , url: 'base.html#forms' }))
          .add(new Page({ name: 'Interactive Elements', url: 'base.html#interactive-elements' }))
        )
        .add(new Page({ name: 'Objects', url: 'obj.html' })
          .description('Patterns of structure that can be reused many times for many different purposes.')
        )
        .add(new Page({ name: 'Components', url: 'comp.html' })
          .description('Patterns of look-and-feel that are each only used for one purpose.')
        )
        .add(new Page({ name: 'Helpers', url: 'help.html' })
          .description('Somewhat explicit classes used for enhancing default styles.')
        )
        .add(new Page({ name: 'Atoms', url: 'atom.html' })
          .description('Very specific classes used for creating anomalies or fixing broken styles.')
        )
    } else return
  }

  // STATIC MEMBERS

  return StyleGuide
})()

},{"./Page.class.js":19}],21:[function(require,module,exports){
module.exports = {
  Page: require('./Page.class.js')
, StyleGuide: require('./StyleGuide.class.js')
}

},{"./Page.class.js":19,"./StyleGuide.class.js":20}],22:[function(require,module,exports){
var Color = require('csscolor').Color
var ConfSite = require('neo').ConfSite

$('input.js-picker').change(function () {
  var primary = Color.fromString($('input.js-picker-primary').val())
  var secondary = Color.fromString($('input.js-picker-secondary').val())
  var styleobj = ConfSite.colorStyles(primary, secondary)
  for (var prop in styleobj) {
    document.querySelector('body').style.setProperty(prop, styleobj[prop])
  }
})

},{"csscolor":4,"neo":18}]},{},[22]);
