var Util = require('./Util.class.js')

module.exports = (function () {
  function RegistrationPeriod($periodinfo) {
    var self = this
    $periodinfo = $periodinfo || {} // NOTE constructor overloading
    self.name      = $periodinfo.name
    self.startDate = $periodinfo.startDate
    self.endDate   = $periodinfo.endDate
    self.icon = null
  }

  // REVIEW organize methods by accessor; use args to determine get/set

  RegistrationPeriod.prototype.setIcon = function setIcon(key) {
    this.icon = Util.ICON_DATA.find(function (item) { return item.content === key })
    return this
  }
  RegistrationPeriod.prototype.getIcon = function getIcon(fallback) {
    return (this.icon) ? Util.iconToString(this.icon, fallback) : ''
  }
  return RegistrationPeriod
})()
