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

  SupporterLevel.prototype.classname = function classname(class_str) {
    if (arguments.length) {
      this._classname = class_str
      return this
    } else {
      return this._classname
    }
  }

  return SupporterLevel
})()
