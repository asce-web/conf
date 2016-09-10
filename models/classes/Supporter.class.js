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
  Supporter.prototype.setURL = function setURL(url) {
    this._url = url
    return this
  }
  Supporter.prototype.getURL = function getURL() {
    return this._url
  }
  Supporter.prototype.setImg = function setImg(img) {
    this._img = img
    return this
  }
  Supporter.prototype.getImg = function getImg() {
    return this._img
  }
  Supporter.prototype.setLevel = function setLevel(supporter_level) {
    this._level = supporter_level
    return this
  }
  Supporter.prototype.getLevel = function getLevel() {
    return this._level
  }

  return Supporter
})()
