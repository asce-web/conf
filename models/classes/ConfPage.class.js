var Page = require('sitepage').Page
var Util = require('./Util.class.js')

module.exports = (function () {
  // CONSTRUCTOR
  function ConfPage(name, url) {
    var self = this
    Page.call(self, { name: name, url: url })
    self._icon     = null
    self._pagetype = ''
  }
  ConfPage.prototype = Object.create(Page.prototype)
  ConfPage.prototype.constructor = ConfPage

  // ACCESSOR FUNCTIONS
  ConfPage.prototype.setIcon = function setIcon(key) {
    this._icon = Util.ICON_DATA.find(function (item) { return item.content === key })
    return this
  }
  ConfPage.prototype.getIcon = function getIcon(fallback) {
    return (this._icon) ? Util.iconToString(this._icon, fallback) : ''
  }

  ConfPage.prototype.pagetype = function pagetype(arg) {
    if (arguments.length) {
      this._pagetype = arg
      return this
    } else {
      return this._pagetype
    }
  }

  return ConfPage
})()
