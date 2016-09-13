/**
 * An organization supporting a conference or series of conferences.
 * Assigned at the site level, not at an individual conference.
 * @type {Supporter}
 */
module.exports = (function () {
  // CONSTRUCTOR
  /**
   * Construct a supporter object, given an (immutable) name.
   * @constructor
   * @param {string} name the name of the supporting organization
   */
  function Supporter(name) {
    var self = this
    self._NAME = name
    self._url   = ''
    self._img   = ''
    self._level = null
  }

  // ACCESSOR FUNCTIONS
  /**
   * Get the name of this supporter.
   * @return {string} the name of this supporter
   */
  Supporter.prototype.name = function name() {
    return this._NAME
  }

  /**
   * Set or get the URL of this supporter.
   * @param  {string=} url the URL of this supporter
   * @return {(Supporter|string)} this supporter || the URL of this suppoter
   */
  Supporter.prototype.url = function url(url) {
    if (arguments.length) {
      this._url = url
      return this
    } else {
      return this._url
    }
  }

  /**
   * Set or get the image of this supporter.
   * @param  {string=} img the image of this supporter
   * @return {(Supporter|string)} this supporter || the image of this suppoter
   */
  Supporter.prototype.img = function img(img) {
    if (arguments.length) {
      this._img = img
      return this
    } else {
      return this._img
    }
  }

  /**
   * Set or get the supporter level in which this supporter belongs.
   * @param  {SupporterLevel=} $supporterLevel the supporter level of this supporter
   * @return {(Supporter|SupporterLevel)} this supporter || the supporter level of this supporter
   */
  Supporter.prototype.level = function level($supporterLevel) {
    if (arguments.length) {
      this._level = $supporterLevel
      return this
    } else {
      return this._level
    }
  }

  return Supporter
})()
