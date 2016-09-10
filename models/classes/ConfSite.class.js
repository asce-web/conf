var Page = require('sitepage').Page
var ConfPage = require('./ConfPage.class.js')

module.exports = (function () {
  // CONSTRUCTOR
  function ConfSite(name, url) {
    var self = this
    Page.call(self, { name: name, url: url })
    self._logo               = ''
    self._conferences        = {}
    self._supporter_levels   = []
    self._supporters         = []
    self._was_initialized = false
    self._conf_curr_key   = null
    self._conf_prev_key   = null
    self._conf_next_key   = null
  }
  ConfSite.prototype = Object.create(Page.prototype)
  ConfSite.prototype.constructor = ConfSite

  // ACCESSOR FUNCTIONS
  ConfSite.prototype.logo = function logo(logo) {
    if (arguments.length) {
    this._logo = logo
    return this
    } else {
    return this._logo
    }
  }

  ConfSite.prototype.addConference = function addConference(conf_label, conference) {
    this._conferences[conf_label] = conference
    return this
  }
  ConfSite.prototype.getConference = function getConference(conf_label) {
    return this._conferences[conf_label]
  }
  ConfSite.prototype.removeConference = function removeConference(conf_label) {
    console.log('Sorry, you do not have this ability.\
    Instead, add a new conference overriding the one you wish to delete.')
    return this
  }
  ConfSite.prototype.getConferencesAll = function getConferencesAll() {
    //- NOTE returns shallow clone (like arr.slice())
    return Object.assign({}, this._conferences)
  }

  ConfSite.prototype.currentConference = function currentConference(conf_label) {
    if (arguments.length) {
    this._conf_curr_key = conf_label
    this.initializeMainPages()
    return this
    } else {
    return this.getConference(this._conf_curr_key)
    }
  }
  ConfSite.prototype.prevConference = function prevConference(conf_label) {
    if (arguments.length) {
    this._conf_prev_key = conf_label
    return this
    } else {
    return this.getConference(this._conf_prev_key)
    }
  }
  ConfSite.prototype.nextConference = function nextConference(conf_label) {
    if (arguments.length) {
    this._conf_next_key = conf_label
    return this
    } else {
    return this.getConference(this._conf_next_key)
    }
  }

  ConfSite.prototype.addSupporterLevel = function addSupporterLevel(supporter_level) {
    this._supporter_levels.push(supporter_level)
    return this
  }
  ConfSite.prototype.getSupporterLevel = function getSupporterLevel(supporter_level_name) {
    return this._supporter_levels.find(function (item) { return item.name === supporter_level_name })
  }
  ConfSite.prototype.removeSupporterLevel = function removeSupporterLevel(supporter_level_name) {
    Util.spliceFromArray(this._supporter_levels, this.getSupporterLevel(supporter_level_name))
    return this
  }
  ConfSite.prototype.getSupporterLevelsAll = function getSupporterLevelsAll() {
    return this._supporter_levels.slice()
  }

  ConfSite.prototype.addSupporter = function addSupporter(supporter) {
    this._supporters.push(supporter)
    return this
  }
  ConfSite.prototype.getSupporter = function getSupporter(supporter_name) {
    return this._supporters.find(function (item) { return item.name === supporter_name })
  }
  ConfSite.prototype.removeSupporter = function removeSupporter(supporter_name) {
    Util.spliceFromArray(this._supporters, this.getSupporter(supporter_name))
    return this
  }
  ConfSite.prototype.getSupportersAll = function getSupportersAll() {
    return this._supporters.slice()
  }

  // METHODS
  ConfSite.prototype.init = function init() {
    var self = this
    if (!self._was_initialized) {
      self._was_initialized = true
      function pageTitle($site) {
        return function () { return this.name() + ' | ' + $site.name() }
      }
      return self
        .add(new Page({ name: 'Top', url: '#top-menu' })
          .add(new ConfPage(self.name(), 'index.html')
            .title(self.name())
            .description(self.description())
            .setIcon('')
            .pagetype('top')
          )
          .add(new ConfPage('About', 'about.html')
            .title(pageTitle(self))
            .description('About ' + self.name() + '.')
            .setIcon('info_outline')
            .pagetype('top')
          )
          .add(new ConfPage('Sponsor', 'sponsor.html')
            .title(pageTitle(self))
            .description('Sponsors of ' + self.name() + '.')
            .setIcon('people')
            .pagetype('top')
          )
          .add(new ConfPage('Exhibit', 'exhibit.html')
            .title(pageTitle(self))
            .description('Exhibitors at ' + self.name() + '.')
            .setIcon('work')
            .pagetype('top')
          )
          .add(new ConfPage('Contact', 'contact.html')
            .title(pageTitle(self))
            .description('Contact us for questions and comments about ' + self.name() + '.')
            .setIcon('email')
            .pagetype('top')
          )
        )
        .add(new Page({ name: 'Main', url: '#main-menu' }))
    } else return
  }
  ConfSite.prototype.initializeMainPages = function initializeMainPages() {
    var self = this
    if (self._was_initialized) {
      self.find('#main-menu')
        .removeAll() //- NOTE IMPORTANT
        .add(new ConfPage('Home', 'home.html')
          .title(self.currentConference().name)
          .description(self.currentConference().theme)
          .setIcon('home')
          .pagetype('main')
        )
        .add(new ConfPage('Registration', 'registration.html')
          .title(function () { return this.name() + ' | ' + self.currentConference().name })
          .description('Register for ' + self.currentConference().name + ' here.')
          .setIcon('shopping_cart')
          .pagetype('main')
        )
        .add(new ConfPage('Program', 'program.html')
          .title(function () { return this.name() + ' | ' + self.currentConference().name })
          .description('Program and agenda of ' + self.currentConference().name + '.')
          .setIcon('event')
          .pagetype('main')
        )
        .add(new ConfPage('Hotel & Travel', 'location.html')
          .title(function () { return this.name() + ' | ' + self.currentConference().name })
          .description('Location and where to stay for ' + self.currentConference().name + '.')
          .setIcon('flight')
          .pagetype('main')
        )
        .add(new ConfPage('Speakers', 'speakers.html')
          .title(function () { return this.name() + ' | ' + self.currentConference().name })
          .description('Current and prospective speakers at ' + self.currentConference().name + '.')
          .setIcon('account_box')
          .pagetype('main')
        )
      return self
    } else return
  }

  // STATIC MEMBERS
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
