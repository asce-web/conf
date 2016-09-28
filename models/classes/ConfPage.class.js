var Page = require('sitepage').Page
var Util = require('./Util.class.js')

/**
 * Any page or subpage within a ConfSite.
 * @see ConfSite
 * @type {ConfPage}
 */
module.exports = (function () {
  // CONSTRUCTOR
  /**
   * Construct a ConfPage object, given a name and url.
   * @constructor
   * @extends Page
   * @param {string} name name of this page
   * @param {string} url  url of this page
   */
  function ConfPage(name, url) {
    var self = this
    Page.call(self, { name: name, url: url })
    self._icon     = null
    self._pagetype = ''
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

  /**
   * Set or get the page type of this page.
   * The page type must be either:
   * - 'top' if it is a page of the site (Landing, About, Sponsor, Exhibit, Contact), or
   * - 'main' if it is a page of a conference (Home, Registration, Program, Location, Speakers),
   *   or any subpages thereof
   * @param  {string=} str 'top' or 'main'
   * @return {(ConfPage|string)} this page || the pagetype of this page
   */
  ConfPage.prototype.pagetype = function pagetype(str) {
    if (arguments.length) {
      this._pagetype = str
      return this
    } else return this._pagetype
  }

  // STATIC MEMBERS
  /**
   * Return the title of a Top page or one of its subpages.
   * @param  {ConfSite} $site any ConfSite object, whose name will be part of the title
   * @return {Function} a function that should be passed to {@link ConfPage#title()} to set its title
   */
  ConfPage.pageTitleTop = function pageTitleTop($site) {
    return function () { return this.name() + ' | ' + $site.name() }
  }

  /**
   * Return the title of a Main page or one of its subpages.
   * @param  {ConfSite} $site any ConfSite object, whose current conference’s name will be part of the title
   * @return {Function} a function that should be passed to {@link ConfPage#title()} to set its title
   */
  ConfPage.pageTitleMain = function pageTitleMain($site) {
    return function () { return this.name() + ' | ' + $site.currentConference().name() }
  }

  return ConfPage
})()
