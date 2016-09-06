module.exports = (function () {
  // CONSTRUCTOR
  function ProgramEvent($eventinfo) {
    var self = this
    $eventinfo = $eventinfo || {} // NOTE constructor overloading
    self.name       = $eventinfo.name
    self.startDate  = $eventinfo.startDate
    self.endDate    = $eventinfo.endDate
    self.url = ''
    self.is_starred = false
  }

  // ACCESSOR FUNCTIONS
  ProgramEvent.prototype.setURL = function setURL(url0) {
    this.url = url0
    return this
  }
  ProgramEvent.prototype.getURL = function getURL() {
    return this.url
  }

  ProgramEvent.prototype.star = function star(bool) {
    //- NOTE method overloading //- param defaults to true
    this.is_starred = (bool === undefined) ? true : bool
    return this
  }
  ProgramEvent.prototype.isStarred = function isStarred() {
    return this.is_starred
  }

  return ProgramEvent
})()
