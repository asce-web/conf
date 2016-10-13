var Page = require('sitepage').Page
var Util = require('./Util.class.js')

/**
 * Any page or subpage within a ConfSite.
 * @see ConfSite
 * @type {ConfPage}
 * @extends Page
 */
module.exports = (function () {
  // CONSTRUCTOR
  /**
   * Construct a ConfPage object, given a name and url.
   * @constructor
   * @param {string} name name of this page
   * @param {string} url  url of this page
   */
  function ConfPage(name, url) {
    var self = this
    Page.call(self, { name: name, url: url })
    self._icon     = null
  }
  ConfPage.prototype = Object.create(Page.prototype)
  ConfPage.prototype.constructor = ConfPage

  // ACCESSOR FUNCTIONS
  /**
   * Set the icon for this page.
   * @param {string} key the keyword for the icon
   */
  ConfPage.prototype.setIcon = function setIcon(key) {
    this._icon = Util.ICON_DATA.find(function ($icon) { return $icon.content === key })
    return this
  }
  /**
   * Get the icon of this page.
   * @param  {boolean=} fallback if true, get the unicode code point
   * @return {string} if fallback, the unicode code point, else, the keyword of the icon
   */
  ConfPage.prototype.getIcon = function getIcon(fallback) {
    return (this._icon) ? Util.iconToString(this._icon, fallback) : ''
  }

  // STATIC MEMBERS
  /**
   * Shortcut method for defining the title of a ConfPage object.
   * Call this static function and pass its return value to a ConfPage object’s `.title()` method
   * in order to set its title as one of the following:
   * - `${pagename} | ${sitename}`
   * - `${pagename} | ${conferencename}`
   * The return value of this function will itself be a function, which should be passed to `.title()`.
   * @see ConfPage#title()
   * @param  {ConfSite} $confsite any ConfSite object, whose name will be part of the title
   * @return {Function} a function that should be passed to ConfPage#title() to set its title
   */
  ConfPage.pageTitle = function pageTitle($confsite) {
    return function () { return this.name() + ' | ' + $confsite.currentConference().name() }
    // return function () { return this.name() + ' | ' + $confsite.name() }
  }

  return ConfPage
})()
