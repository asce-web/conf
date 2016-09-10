module.exports = (function () {
  function SupporterLevel(name) {
    var self = this
    self.name = name
    self.classname = ''
  }

  // REVIEW organize methods by accessor; use args to determine get/set

  SupporterLevel.prototype.setClassname = function setClassname(newname) {
    this.classname = newname
    return this
  }
  SupporterLevel.prototype.getClassname = function getClassname() {
    return this.classname
  }
  return SupporterLevel
})()
