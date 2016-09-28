var Page = require('sitepage').Page
var ConfPage = require('./ConfPage.class.js')

/**
 * A conference site.
 * A site hosting a series of conferences,
 * with a name, url, taglinne,
 * logo, supporter levels and supporters, exhibitors, and contact information.
 * @type {ConfSite}
 */
module.exports = (function () {
  // CONSTRUCTOR
  /**
   * Construct a ConfSite object, given a name and url.
   * @constructor
   * @extends Page
   * @param {string} name name of this site
   * @param {string} url url of the landing page for this site
   * @param {string} tagline the tagline, or slogan, of this site
   */
  function ConfSite(name, url, tagline) {
    var self = this
    Page.call(self, { name: name, url: url })
    Page.prototype.description.call(self, tagline)
    self._logo             = ''
    self._conferences      = {}
    self._supporter_levels = []
    self._supporters       = []
    self._was_initialized = false
    self._conf_curr_key   = null
    self._conf_prev_key   = null
    self._conf_next_key   = null
  }
  ConfSite.prototype = Object.create(Page.prototype)
  ConfSite.prototype.constructor = ConfSite

  // ACCESSOR FUNCTIONS
  /**
   * Overwrite superclass description() method.
   * This method only gets the description, it does not set it.
   * @override
   * @param  {unknown} arg any argument
   * @return {string} the description of this site
   */
  ConfSite.prototype.description = function description(arg) {
    return Page.prototype.description.call(this)
  }
  /**
   * Get the tagline of this site.
   * The tagline is very brief slogan, and is fixed for the entire series of conferences.
   * Equivalent to calling `Page.prototype.description()`.
   * @return {string} the tagline of this site
   */
  ConfSite.prototype.tagline = function tagline() {
    return this.description()
  }

  /**
   * Set or get the logo of this site.
   * @param  {string=} logo url of the logo file
   * @return {(ConfSite|string)} this site || url of the logo
   */
  ConfSite.prototype.logo = function logo(logo) {
    if (arguments.length) {
      this._logo = logo
      return this
    } else return this._logo
  }

  /**
   * Add a conference to this site.
   * @param {string} conf_label key for accessing the conference
   * @param {Conference} $conference the conference to add
   */
  ConfSite.prototype.addConference = function addConference(conf_label, $conference) {
    this._conferences[conf_label] = $conference
    return this
  }
  /**
   * Retrieve a conference of this site.
   * @param  {string} conf_label key for accessing the conference
   * @return {Conference} the specified conference
   */
  ConfSite.prototype.getConference = function getConference(conf_label) {
    return this._conferences[conf_label]
  }
  /**
   * This method does nothing.
   * @param  {string} conf_label any string
   * @return {ConfSite} this site
   */
  ConfSite.prototype.removeConference = function removeConference(conf_label) {
    console.log('Sorry, you do not have this ability.\
    Instead, add a new conference overwriting the one you wish to delete.')
    return this
  }
  /**
   * Return an object representing all conferences of this site.
   * FIXME this should return a deep clone, not a shallow clone
   * @return {Object} shallow clone of this site’s conferences object
   */
  ConfSite.prototype.getConferencesAll = function getConferencesAll() {
    //- NOTE returns shallow clone (like arr.slice())
    return Object.assign({}, this._conferences)
  }

  /**
   * Set or get the current conference of this site.
   * If setting, provide the argument key for accessing the added conference.
   * If getting, provide no argument.
   * The current conference is the conference that is being promoted this cycle.
   * @param  {string=} conf_label key for accessing the conference
   * @return {(ConfSite|Conference)} this site || the current conference
   */
  ConfSite.prototype.currentConference = function currentConference(conf_label) {
    if (arguments.length) {
      this._conf_curr_key = conf_label
      ;(function (self) {
        if (self._was_initialized) {
          self.find('#main-menu')
            .removeAll() //- NOTE IMPORTANT
            .add(new ConfPage('Home', 'home.html')
              .title(self.currentConference().name())
              .description(self.currentConference().theme())
              .setIcon('home')
              .pagetype('main')
            )
            .add(new ConfPage('Registration', 'registration.html')
              .title(ConfPage.pageTitleMain(self))
              .description('Register for ' + self.currentConference().name() + ' here.')
              .setIcon('shopping_cart')
              .pagetype('main')
            )
            .add(new ConfPage('Program', 'program.html')
              .title(ConfPage.pageTitleMain(self))
              .description('Program and agenda of ' + self.currentConference().name() + '.')
              .setIcon('event')
              .pagetype('main')
            )
            .add(new ConfPage('Hotel & Travel', 'location.html')
              .title(ConfPage.pageTitleMain(self))
              .description('Location and where to stay for ' + self.currentConference().name() + '.')
              .setIcon('flight')
              .pagetype('main')
            )
            .add(new ConfPage('Speakers', 'speakers.html')
              .title(ConfPage.pageTitleMain(self))
              .description('Current and prospective speakers at ' + self.currentConference().name() + '.')
              .setIcon('account_box')
              .pagetype('main')
            )
        }
      })(this)
      return this
    } else {
      return this.getConference(this._conf_curr_key)
    }
  }
  /**
   * Set or get the previous conference of this site.
   * If setting, provide the argument key for accessing the added conference.
   * If getting, provide no argument.
   * The previous conference is the conference that was promoted last cycle.
   * @param  {string=} conf_label key for accessing the conference
   * @return {(ConfSite|Conference)} this site || the previous conference
   */
  ConfSite.prototype.prevConference = function prevConference(conf_label) {
    if (arguments.length) {
      this._conf_prev_key = conf_label
      return this
    } else return this.getConference(this._conf_prev_key)
  }
  /**
   * Set or get the next conference of this site.
   * If setting, provide the argument key for accessing the added conference.
   * If getting, provide no argument.
   * The next conference is the conference that will be promoted next cycle.
   * @param  {string=} conf_label key for accessing the conference
   * @return {(ConfSite|Conference)} this site || the next conference
   */
  ConfSite.prototype.nextConference = function nextConference(conf_label) {
    if (arguments.length) {
      this._conf_next_key = conf_label
      return this
    } else return this.getConference(this._conf_next_key)
  }

  /**
   * Add a supporter level to this site.
   * @param {SupporterLevel} $supporterLevel the supporter level to add
   */
  ConfSite.prototype.addSupporterLevel = function addSupporterLevel($supporterLevel) {
    this._supporter_levels.push($supporterLevel)
    return this
  }
  /**
   * Retrieve a supporter level of this site.
   * @param  {string} name the name of the supporter level
   * @return {?SupporterLevel} the specified supporter level
   */
  ConfSite.prototype.getSupporterLevel = function getSupporterLevel(name) {
    return this._supporter_levels.find(function ($supporterLevel) { return $supporterLevel.name() === name }) || null
  }
  /**
   * Remove a supporter level from this site.
   * @param  {string} name the name of the supporter level
   * @return {ConfSite} this site
   */
  ConfSite.prototype.removeSupporterLevel = function removeSupporterLevel(name) {
    Util.spliceFromArray(this._supporter_levels, this.getSupporterLevel(name))
    return this
  }
  /**
   * Retrieve all supporter levels of this site.
   * @return {Array<SupporterLevel>} a shallow array of all supporter levels of this site
   */
  ConfSite.prototype.getSupporterLevelsAll = function getSupporterLevelsAll() {
    return this._supporter_levels.slice()
  }

  /**
   * Add a supporter to this site.
   * @param {Supporter} $supporter the supporter to add
   */
  ConfSite.prototype.addSupporter = function addSupporter($supporter) {
    this._supporters.push($supporter)
    return this
  }
  /**
   * Retrieve a supporter of this site.
   * @param  {string} name the name of the supporter
   * @return {?Supporter} the specified supporter
   */
  ConfSite.prototype.getSupporter = function getSupporter(name) {
    return this._supporters.find(function ($supporter) { return $supporter.name() === name }) || null
  }
  /**
   * Remove a supporter of this site.
   * @param  {string} name the name of the supporter
   * @return {ConfSite} this site
   */
  ConfSite.prototype.removeSupporter = function removeSupporter(name) {
    Util.spliceFromArray(this._supporters, this.getSupporter(name))
    return this
  }
  /**
   * Retrieve all supporters of this site.
   * @return {Array<Supporter>} a shallow array of all supporters of this site
   */
  ConfSite.prototype.getSupportersAll = function getSupportersAll() {
    return this._supporters.slice()
  }

  // METHODS
  /**
   * Initialize this site: add the proper top-level pages.
   * Return this initialized site, if it had not been initialized before,
   * else return `undefined`.
   * @return {ConfSite=} this site || undefined
   */
  ConfSite.prototype.init = function init() {
    var self = this
    if (!self._was_initialized) {
      self._was_initialized = true
      return self
        .add(new Page({ name: 'Top', url: '#top-menu' })
          .add(new ConfPage(self.name(), 'index.html')
            .title(self.name())
            .description(self.tagline())
            .setIcon('')
            .pagetype('top')
          )
          .add(new ConfPage('About', 'about.html')
            .title(ConfPage.pageTitleTop(self))
            .description('About ' + self.name() + '.')
            .setIcon('info_outline')
            .pagetype('top')
          )
          .add(new ConfPage('Sponsor', 'sponsor.html')
            .title(ConfPage.pageTitleTop(self))
            .description('Sponsors of ' + self.name() + '.')
            .setIcon('people')
            .pagetype('top')
          )
          .add(new ConfPage('Exhibit', 'exhibit.html')
            .title(ConfPage.pageTitleTop(self))
            .description('Exhibitors at ' + self.name() + '.')
            .setIcon('work')
            .pagetype('top')
          )
          .add(new ConfPage('Contact', 'contact.html')
            .title(ConfPage.pageTitleTop(self))
            .description('Contact us for questions and comments about ' + self.name() + '.')
            .setIcon('email')
            .pagetype('top')
          )
        )
        .add(new Page({ name: 'Main', url: '#main-menu' }))
    } else return
  }

  // STATIC MEMBERS
  /**
   * An object describing the menu structures of the Main, Sub, and Sitemap menus.
   * @type {Object}
   */
  ConfSite.MENU_CLASS = {
    main: {
      listclasses: 'o-List o-Flex c-MenuMain'
    , itemclasses: 'o-List__Item o-Flex__Item c-MenuMain__Item'
    , linkclasses: 'c-MenuMain__Link h-Block'
    , sub: {
        listclasses: 'o-List c-MenuSub'
      , itemclasses: 'o-List__Item c-MenuSub__Item'
      , linkclasses: 'c-MenuSub__Link h-Block'
      }
    }
  , sitemap: {
      listclasses: 'o-List o-Flex c-Sitemap'
    , itemclasses: 'o-List__Item o-Flex__Item c-Sitemap__Item'
    , sub: {
        listclasses: 'o-List c-Sitemap__SubList'
      , itemclasses: 'o-List__Item c-Sitemap__SubItem'
      }
    }
  }

  return ConfSite
})()
