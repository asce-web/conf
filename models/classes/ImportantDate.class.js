module.exports = (function () {
  // CONSTRUCTOR
  function ImportantDate($actioninfo) {
    var self = this
    $actioninfo = $actioninfo || {} // NOTE constructor overloading
    self._NAME  = $actioninfo.name
    self._START = $actioninfo.start_time
    self._url       = ''
    self._is_hidden = false
  }

  // ACCESSOR FUNCTIONS
  ImportantDate.prototype.name = function name() {
    return this._NAME
  }
  ImportantDate.prototype.startTime = function startTime() {
    return this._START
  }

  ImportantDate.prototype.url = function url(url0) {
    if (arguments.length) {
    this._url = url0
    return this
    } else {
    return this._url
    }
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
