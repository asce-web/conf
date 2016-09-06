module.exports = (function () {
  // CONSTRUCTOR
  function Pass($passinfo) {
    var self = this
    $passinfo = $passinfo || {} // NOTE constructor overloading
    self.name         = $passinfo.name
    self._description  = ''
    self._fineprint    = ''
    self._attend_types = []
    self._is_starred = false
  }

  // ACCESSOR FUNCTIONS
  Pass.prototype.setDescription = function setDescription(text) {
    this._description = text
    return this
  }
  Pass.prototype.getDescription = function getDescription() {
    return this._description
  }

  Pass.prototype.setFineprint = function setFineprint(html) {
    this._fineprint = html
    return this
  }
  Pass.prototype.getFineprint = function getFineprint(unescaped) {
    return ((unescaped) ? '<!-- warning: unescaped code -->' : '') + this._fineprint
  }

  Pass.prototype.addAttendeeType = function addAttendeeType(attend_type) {
    this._attend_types.push(attend_type)
    return this
  }
  Pass.prototype.getAttendeeType = function getAttendeeType(attend_type_name) {
    return this._attend_types.find(function (item) { return item.name === attend_type_name })
  }
  Pass.prototype.removeAttendeeType = function removeAttendeeType(attend_type_name) {
    Util.spliceFromArray(this._attend_types, this.getAttendeeType(attend_type_name))
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
      self.name        = name
      self.is_featured = is_featured
    }
    return AttendeeType
  })()

  return Pass
})()
