module.exports = (function () {
  // CONSTRUCTOR
  function ImportantDate($actioninfo) {
    var self = this
    $actioninfo = $actioninfo || {} // NOTE constructor overloading
    self.name      = $actioninfo.name
    self.startTime = $actioninfo.startTime
    self._url       = ''
    self._is_hidden = false
  }

  // ACCESSOR FUNCTIONS
  ImportantDate.prototype.setURL = function setURL(url0) {
    this._url = url0
    return this
  }
  ImportantDate.prototype.getURL = function getURL() {
    return this._url
  }

  ImportantDate.prototype.hide = function hide(bool) {
    this._is_hidden = (arguments.length) ? bool : true
    return this
  }
  ImportantDate.prototype.isHidden = function isHidden() {
    return this._is_hidden
  }

  return ImportantDate
})()
