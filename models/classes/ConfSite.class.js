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
    self._was_initialized          = false
    self._conference_current_index = null
    self._conference_prev_index    = null
    self._conference_next_index    = null
  }
  ConfSite.prototype = Object.create(Page.prototype)
  ConfSite.prototype.constructor = ConfSite

  // ACCESSOR FUNCTIONS
  ConfSite.prototype.setLogo = function setLogo(logo) {
    this._logo = logo
    return this
  }
  ConfSite.prototype.getLogo = function getLogo() {
    return this._logo
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

  ConfSite.prototype.setCurrentConference = function setCurrentConference(conf_label) {
    this._conference_current_index = conf_label
    this.initializeMainPages()
    return this
  }
  ConfSite.prototype.getCurrentConference = function getCurrentConference() {
    return this.getConference(this._conference_current_index)
  }
  ConfSite.prototype.setPrevConference = function setPrevConference(conf_label) {
    this._conference_prev_index = conf_label
    return this
  }
  ConfSite.prototype.getPrevConference = function getPrevConference() {
    return this.getConference(this._conference_prev_index)
  }
  ConfSite.prototype.setNextConference = function setNextConference(conf_label) {
    this._conference_next_index = conf_label
    return this
  }
  ConfSite.prototype.getNextConference = function getNextConference() {
    return this.getConference(this._conference_next_index)
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
          .title(self.getCurrentConference().name)
          .description(self.getCurrentConference().theme)
          .setIcon('home')
          .pagetype('main')
        )
        .add(new ConfPage('Registration', 'registration.html')
          .title(function () { return this.name() + ' | ' + self.getCurrentConference().name })
          .description('Register for ' + self.getCurrentConference().name + ' here.')
          .setIcon('shopping_cart')
          .pagetype('main')
        )
        .add(new ConfPage('Program', 'program.html')
          .title(function () { return this.name() + ' | ' + self.getCurrentConference().name })
          .description('Program and agenda of ' + self.getCurrentConference().name + '.')
          .setIcon('event')
          .pagetype('main')
        )
        .add(new ConfPage('Hotel & Travel', 'location.html')
          .title(function () { return this.name() + ' | ' + self.getCurrentConference().name })
          .description('Location and where to stay for ' + self.getCurrentConference().name + '.')
          .setIcon('flight')
          .pagetype('main')
        )
        .add(new ConfPage('Speakers', 'speakers.html')
          .title(function () { return this.name() + ' | ' + self.getCurrentConference().name })
          .description('Current and prospective speakers at ' + self.getCurrentConference().name + '.')
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
