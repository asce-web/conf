module.exports = (function () {
  // CONSTRUCTOR
  function SupporterLevel(name) {
    var self = this
    self.name = name
    self._classname = ''
  }

  // ACCESSOR FUNCTIONS
  SupporterLevel.prototype.setClassname = function setClassname(newname) {
    this._classname = newname
    return this
  }
  SupporterLevel.prototype.getClassname = function getClassname() {
    return this._classname
  }

  return SupporterLevel
})()
