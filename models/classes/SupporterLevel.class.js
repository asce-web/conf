module.exports = (function () {
  // CONSTRUCTOR
  function SupporterLevel(name) {
    var self = this
    self._NAME = name
    self._classname = ''
  }

  // ACCESSOR FUNCTIONS
  SupporterLevel.prototype.name = function name() {
    return this._NAME
  }

  SupporterLevel.prototype.setClassname = function setClassname(newname) {
    this._classname = newname
    return this
  }
  SupporterLevel.prototype.getClassname = function getClassname() {
    return this._classname
  }

  return SupporterLevel
})()
