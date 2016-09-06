module.exports = (function () {
  // CONSTRUCTOR
  function ImportantDate($actioninfo) {
    var self = this
    $actioninfo = $actioninfo || {} // NOTE constructor overloading
    self.name      = $actioninfo.name
    self.startTime = $actioninfo.startTime
    self.url       = ''
    self.is_hidden = false
  }

  // ACCESSOR FUNCTIONS
  ImportantDate.prototype.setURL = function setURL(url0) {
    this.url = url0
    return this
  }
  ImportantDate.prototype.getURL = function getURL() {
    return this.url
  }

  ImportantDate.prototype.hide = function hide(bool) {
    if (bool === undefined) bool = true // NOTE param defaults to true
    this.is_hidden = bool
    return this
  }
  ImportantDate.prototype.isHidden = function isHidden() {
    return this.is_hidden
  }

  return ImportantDate
})()
