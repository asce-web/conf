module.exports = (function () {
  // CONSTRUCTOR
  function ProgramEvent($eventinfo) {
    var self = this
    $eventinfo = $eventinfo || {} // NOTE constructor overloading
    self.name       = $eventinfo.name
    self.startDate  = $eventinfo.startDate
    self.endDate    = $eventinfo.endDate
    self._url = ''
    self._is_starred = false
  }

  // ACCESSOR FUNCTIONS
  ProgramEvent.prototype.setURL = function setURL(url0) {
    this._url = url0
    return this
  }
  ProgramEvent.prototype.getURL = function getURL() {
    return this._url
  }

  ProgramEvent.prototype.star = function star(bool) {
    this._is_starred = (arguments.length) ? bool : true
    return this
  }
  ProgramEvent.prototype.isStarred = function isStarred() {
    return this._is_starred
  }

  return ProgramEvent
})()
