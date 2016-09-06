module.exports = (function () {
  // CONSTRUCTOR
  function Pass($passinfo) {
    var self = this
    $passinfo = $passinfo || {} // NOTE constructor overloading
    self.name         = $passinfo.name
    self.description  = ''
    self.fineprint    = ''
    self.attend_types = []
    self.is_starred = false
  }

  // ACCESSOR FUNCTIONS
  Pass.prototype.setDescription = function setDescription(text) {
    this.description = text
    return this
  }
  Pass.prototype.getDescription = function getDescription() {
    return this.description
  }

  Pass.prototype.setFineprint = function setFineprint(html) {
    this.fineprint = html
    return this
  }
  Pass.prototype.getFineprint = function getFineprint(unescaped) {
    return ((unescaped) ? '<!-- warning: unescaped code -->' : '') + this.fineprint
  }

  Pass.prototype.addAttendeeType = function addAttendeeType(attend_type) {
    this.attend_types.push(attend_type)
    return this
  }
  Pass.prototype.getAttendeeType = function getAttendeeType(attend_type_name) {
    return this.attend_types.find(function (item) { return item.name === attend_type_name })
  }
  Pass.prototype.removeAttendeeType = function removeAttendeeType(attend_type_name) {
    Util.spliceFromArray(this.attend_types, this.getAttendeeType(attend_type_name))
    return this
  }
  Pass.prototype.getAttendeeTypesAll = function getAttendeeTypesAll() {
    return this.attend_types.slice()
  }

  Pass.prototype.star = function star(bool) {
    //- NOTE method overloading //- param defaults to true
    this.is_starred = (bool === undefined) ? true : bool
    return this
  }
  Pass.prototype.isStarred = function isStarred() {
    return this.is_starred
  }

  // STATIC MEMBERS
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
