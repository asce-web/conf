var Util = require('./Util.class.js')

module.exports = (function () {
  // CONSTRUCTOR
  function RegistrationPeriod($periodinfo) {
    var self = this
    $periodinfo = $periodinfo || {} // NOTE constructor overloading
    self.name      = $periodinfo.name
    self.startDate = $periodinfo.startDate
    self.endDate   = $periodinfo.endDate
    self._icon = null
  }

  // ACCESSOR FUNCTIONS
  RegistrationPeriod.prototype.setIcon = function setIcon(key) {
    this._icon = Util.ICON_DATA.find(function (item) { return item.content === key })
    return this
  }
  RegistrationPeriod.prototype.getIcon = function getIcon(fallback) {
    return (this._icon) ? Util.iconToString(this._icon, fallback) : ''
  }

  return RegistrationPeriod
})()
