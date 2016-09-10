module.exports = (function () {
  // CONSTRUCTOR
  function SupporterLevel(name) {
    var self = this
    self.name = name
    self._classname = ''
  }

  // ACCESSOR FUNCTIONS
  SupporterLevel.prototype.classname = function classname(newname) {
    if (arguments.length) {
    this._classname = newname
    return this
    } else {
    return this._classname
    }
  }

  return SupporterLevel
})()
