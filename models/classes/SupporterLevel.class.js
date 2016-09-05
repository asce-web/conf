module.exports = (function () {
  function SupporterLevel(name) {
    var self = this
    self.name = name
    self.classname = ''
  }
  SupporterLevel.prototype.setClassname = function setClassname(newname) {
    this.classname = newname
    return this
  }
  SupporterLevel.prototype.getClassname = function getClassname() {
    return this.classname
  }
  return SupporterLevel
})()
