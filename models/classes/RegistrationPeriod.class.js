var Util = require('./Util.class.js')

module.exports = (function () {
  // CONSTRUCTOR
  function RegistrationPeriod($periodinfo) {
    var self = this
    $periodinfo = $periodinfo || {} // NOTE constructor overloading
    self._NAME  = $periodinfo.name
    self._START = $periodinfo.start_date
    self._END   = $periodinfo.end_date
    self._icon = null
  }

  // ACCESSOR FUNCTIONS
  RegistrationPeriod.prototype.name = function name() {
    return this._NAME
  }
  RegistrationPeriod.prototype.startDate = function startDate() {
    return this._START
  }
  RegistrationPeriod.prototype.endDate = function endDate() {
    return this._END
  }

  RegistrationPeriod.prototype.setIcon = function setIcon(key) {
    this._icon = Util.ICON_DATA.find(function (item) { return item.content === key })
    return this
  }
  RegistrationPeriod.prototype.getIcon = function getIcon(fallback) {
    return (this._icon) ? Util.iconToString(this._icon, fallback) : ''
  }

  return RegistrationPeriod
})()
