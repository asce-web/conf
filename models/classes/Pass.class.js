module.exports = (function () {
  // CONSTRUCTOR
  function Pass(name) {
    var self = this
    self._NAME = name
    self._description  = ''
    self._fineprint    = ''
    self._attend_types = []
    self._is_starred = false
  }

  // ACCESSOR FUNCTIONS
  Pass.prototype.name = function name() {
    return this._NAME
  }

  Pass.prototype.description = function description(text) {
    if (arguments.length) {
      this._description = text
      return this
    } else {
      return this._description
    }
  }

  Pass.prototype.setFineprint = function setFineprint(html) {
    this._fineprint = html
    return this
  }
  Pass.prototype.getFineprint = function getFineprint(unescaped) {
    return ((unescaped) ? '<!-- warning: unescaped code -->' : '') + this._fineprint
  }

  Pass.prototype.addAttendeeType = function addAttendeeType($attendType) {
    this._attend_types.push($attendType)
    return this
  }
  Pass.prototype.getAttendeeType = function getAttendeeType(name) {
    return this._attend_types.find(function ($attendType) { return $attendType.name() === name })
  }
  Pass.prototype.removeAttendeeType = function removeAttendeeType(name) {
    Util.spliceFromArray(this._attend_types, this.getAttendeeType(name))
    return this
  }
  Pass.prototype.getAttendeeTypesAll = function getAttendeeTypesAll() {
    return this._attend_types.slice()
  }

  Pass.prototype.star = function star(bool) {
    this._is_starred = (arguments.length) ? bool : true
    return this
  }
  Pass.prototype.isStarred = function isStarred() {
    return this._is_starred
  }

  // STATIC MEMBERS
  // REVIEW may not need this class
  Pass.AttendeeType = (function () {
    function AttendeeType(name, is_featured) {
      var self = this
      self._NAME        = name
      self._IS_FEATURED = is_featured
    }
    AttendeeType.prototype.name = function name() {
      return this._NAME
    }
    AttendeeType.prototype.isFeatured = function isFeatured() {
      return this._IS_FEATURED
    }
    return AttendeeType
  })()

  return Pass
})()
