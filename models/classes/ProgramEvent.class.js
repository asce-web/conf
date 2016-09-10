module.exports = (function () {
  // CONSTRUCTOR
  function ProgramEvent($eventinfo) {
    var self = this
    $eventinfo = $eventinfo || {} // NOTE constructor overloading
    self._NAME  = $eventinfo.name
    self._START = $eventinfo.start_date
    self._END   = $eventinfo.end_date
    self._url = ''
    self._is_starred = false
  }

  // ACCESSOR FUNCTIONS
  ProgramEvent.prototype.name = function name() {
    return this._NAME
  }
  ProgramEvent.prototype.startDate = function startDate() {
    return this._START
  }
  ProgramEvent.prototype.endDate = function endDate() {
    return this._END
  }

  ProgramEvent.prototype.url = function url(url0) {
    if (arguments.length) {
    this._url = url0
    return this
    } else {
    return this._url
    }
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
