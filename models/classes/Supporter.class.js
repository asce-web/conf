module.exports = (function () {
  // CONSTRUCTOR
  function Supporter(name) {
    var self = this
    self._NAME = name
    self._url   = ''
    self._img   = ''
    self._level = null
  }

  // ACCESSOR FUNCTIONS
  Supporter.prototype.name = function name() {
    return this._NAME
  }

  Supporter.prototype.url = function url(url) {
    if (arguments.length) {
      this._url = url
      return this
    } else {
      return this._url
    }
  }
  Supporter.prototype.img = function img(img) {
    if (arguments.length) {
      this._img = img
      return this
    } else {
      return this._img
    }
  }
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
