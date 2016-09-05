var Page = require('./Page.class.js')
var ConfPage = require('./ConfPage.class.js')

module.exports = (function () {
  //- CONSTRUCTOR
  function ConfSite(name, url) {
    var self = this
    Page.call(self, { name: name, url: url })
    self.was_initialized = false
    self.logo               = ''
    self.conferences        = {}
    self.supporter_levels   = []
    self.supporters         = []
    self._conference_current_index = null
    self._conference_prev_index    = null
    self._conference_next_index    = null
  }
  ConfSite.prototype = Object.create(Page.prototype)
  ConfSite.prototype.constructor = ConfSite

  //- SETTER FUNCTIONS
  ConfSite.prototype.setLogo = function setLogo(logo) {
    this.logo = logo
    return this
  }
  ConfSite.prototype.addConference = function addConference(conf_label, conference) {
    this.conferences[conf_label] = conference
    return this
  }
  ConfSite.prototype.removeConference = function removeConference(conf_label) {
    console.log('Sorry, you do not have this ability.\
    Instead, add a new conference overriding the one you wish to delete.')
    return this
  }
  ConfSite.prototype.setCurrentConference = function setCurrentConference(conf_label) {
    this._conference_current_index = conf_label
    this.initializeMainPages()
    return this
  }
  ConfSite.prototype.setPrevConference = function setPrevConference(conf_label) {
    this._conference_prev_index = conf_label
    return this
  }
  ConfSite.prototype.setNextConference = function setNextConference(conf_label) {
    this._conference_next_index = conf_label
    return this
  }
  ConfSite.prototype.addSupporterLevel = function addSupporterLevel(supporter_level) {
    this.supporter_levels.push(supporter_level)
    return this
  }
  ConfSite.prototype.removeSupporterLevel = function removeSupporterLevel(supporter_level_name) {
    Util.spliceFromArray(this.supporter_levels, this.getSupporterLevel(supporter_level_name))
    return this
  }
  ConfSite.prototype.addSupporter = function addSupporter(supporter) {
    this.supporters.push(supporter)
    return this
  }
  ConfSite.prototype.removeSupporter = function removeSupporter(supporter_name) {
    Util.spliceFromArray(this.supporters, this.getSupporter(supporter_name))
    return this
  }

  //- GETTER FUNCTIONS
  ConfSite.prototype.getLogo = function getLogo() {
    return this.logo
  }
  ConfSite.prototype.getConference = function getConference(conf_label) {
    return this.conferences[conf_label]
  }
  ConfSite.prototype.getCurrentConference = function getCurrentConference() {
    return this.getConference(this._conference_current_index)
  }
  ConfSite.prototype.getPrevConference = function getPrevConference() {
    return this.getConference(this._conference_prev_index)
  }
  ConfSite.prototype.getNextConference = function getNextConference() {
    return this.getConference(this._conference_next_index)
  }
  ConfSite.prototype.getConferencesAll = function getConferencesAll() {
    //- NOTE returns shallow clone (like arr.slice())
    return Object.assign({}, this.conferences)
  }
  ConfSite.prototype.getSupporterLevel = function getSupporterLevel(supporter_level_name) {
    return this.supporter_levels.find(function (item) { return item.name === supporter_level_name })
  }
  ConfSite.prototype.getSupporter = function getSupporter(supporter_name) {
    return this.supporters.find(function (item) { return item.name === supporter_name })
  }
  ConfSite.prototype.getSupporterLevelsAll = function getSupporterLevelsAll() {
    return this.supporter_levels.slice()
  }
  ConfSite.prototype.getSupportersAll = function getSupportersAll() {
    return this.supporters.slice()
  }

  //- MORE PROTO FUNCTIONS
  ConfSite.prototype.init = function init() {
    var self = this
    if (!self.was_initialized) {
      self.was_initialized = true
      return self
        .addPage(new Page({ name: 'Top', url: '#top-menu' })
          .addPage(new ConfPage(self.name, 'index.html')
            .setIcon('')
            .setTitle(self.getName())
            .setDescription(self.getDescription())
            .pagetype('top')
          )
          .addPage(new ConfPage('About', 'about.html')
            .setIcon('info_outline')
            .setTitle(function () { return this.getName() + ' | ' + self.getName() })
            .setDescription('About ' + self.getName() + '.')
            .pagetype('top')
          )
          .addPage(new ConfPage('Sponsor', 'sponsor.html')
            .setIcon('people')
            .setTitle(function () { return this.getName() + ' | ' + self.getName() })
            .setDescription('Sponsors of ' + self.getName() + '.')
            .pagetype('top')
          )
          .addPage(new ConfPage('Exhibit', 'exhibit.html')
            .setIcon('work')
            .setTitle(function () { return this.getName() + ' | ' + self.getName() })
            .setDescription('Exhibitors at ' + self.getName() + '.')
            .pagetype('top')
          )
          .addPage(new ConfPage('Contact', 'contact.html')
            .setIcon('email')
            .setTitle(function () { return this.getName() + ' | ' + self.getName() })
            .setDescription('Contact us for questions and comments about ' + self.getName() + '.')
            .pagetype('top')
          )
        )
        .addPage(new Page({ name: 'Main', url: '#main-menu' }))
    } else return
  }
  ConfSite.prototype.initializeMainPages = function initializeMainPages() {
    var self = this
    if (self.was_initialized) {
      self.getPage('#main-menu')
        .removeAllPages() //- NOTE IMPORTANT
        .addPage(new ConfPage('Home', 'home.html')
          .setIcon('home')
          .setTitle(self.getCurrentConference().name)
          .setDescription(self.getCurrentConference().theme)
          .pagetype('main')
        )
        .addPage(new ConfPage('Registration', 'registration.html')
          .setIcon('shopping_cart')
          .setTitle(function () { return this.getName() + ' | ' + self.getCurrentConference().name })
          .setDescription('Register for ' + self.getCurrentConference().name + ' here.')
          .pagetype('main')
        )
        .addPage(new ConfPage('Program', 'program.html')
          .setIcon('event')
          .setTitle(function () { return this.getName() + ' | ' + self.getCurrentConference().name })
          .setDescription('Program and agenda of ' + self.getCurrentConference().name + '.')
          .pagetype('main')
        )
        .addPage(new ConfPage('Hotel & Travel', 'location.html')
          .setIcon('flight')
          .setTitle(function () { return this.getName() + ' | ' + self.getCurrentConference().name })
          .setDescription('Location and where to stay for ' + self.getCurrentConference().name + '.')
          .pagetype('main')
        )
        .addPage(new ConfPage('Speakers', 'speakers.html')
          .setIcon('account_box')
          .setTitle(function () { return this.getName() + ' | ' + self.getCurrentConference().name })
          .setDescription('Current and prospective speakers at ' + self.getCurrentConference().name + '.')
          .pagetype('main')
        )
      return self
    } else return
  }

  //- STATIC MEMBERS
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
