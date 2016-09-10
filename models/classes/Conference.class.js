module.exports = (function () {
  // CONSTRUCTOR
  function Conference($confinfo) {
    var self = this
    $confinfo = $confinfo || {} // NOTE constructor overloading
    self.name      = $confinfo.name
    self.theme     = $confinfo.theme
    self.startDate = $confinfo.startDate
    self.endDate   = $confinfo.endDate
    self.url       = $confinfo.url
    self.promo_loc = $confinfo.promo_loc
    self._reg_periods     = []
    self._passes          = []
    self._program_events  = []
    self._venues          = {}
    self._speakers        = []
    self._important_dates = []
    self._chairs          = []
    self._regpd_current_index    = NaN
    self._venue_conference_index = null
  }

  // ACCESSOR FUNCTIONS
  Conference.prototype.addRegistrationPeriod = function addRegistrationPeriod(reg_period) {
    this._reg_periods.push(reg_period)
    return this
  }
  Conference.prototype.getRegistrationPeriod = function getRegistrationPeriod(reg_period_name) {
    return this._reg_periods.find(function (item) { return item.name === reg_period_name })
  }
  Conference.prototype.removeRegistrationPeriod = function removeRegistrationPeriod(reg_period_name) {
    Util.spliceFromArray(this._reg_periods, this.getRegistrationPeriod(reg_period_name))
    return this
  }
  Conference.prototype.getRegistrationPeriodsAll = function getRegistrationPeriodsAll() {
    return this._reg_periods.slice()
  }

  Conference.prototype.currentRegistrationPeriod = function currentRegistrationPeriod(reg_period_name) {
    if (arguments.length) {
    this._regpd_current_index = this._reg_periods.indexOf(this.getRegistrationPeriod(reg_period_name))
    return this
    } else {
    return this._reg_periods[this._regpd_current_index]
    }
  }

  Conference.prototype.addPass = function addPass(pass) {
    this._passes.push(pass)
    return this
  }
  Conference.prototype.getPass = function getPass(pass_name) {
    return this._passes.find(function (item) { return item.name === pass_name })
  }
  Conference.prototype.removePass = function removePass(pass_name) {
    Util.spliceFromArray(this._passes, this.getPass(pass_name))
    return this
  }
  Conference.prototype.getPassesAll = function getPassesAll() {
    return this._passes.slice()
  }

  Conference.prototype.addProgramEvent = function addProgramEvent(program_event) {
    this._program_events.push(program_event)
    return this
  }
  Conference.prototype.getProgramEvent = function getProgramEvent(program_event_name) {
    return this._program_events.find(function (item) { return item.name === program_event_name })
  }
  Conference.prototype.removeProgramEvent = function removeProgramEvent(program_event_name) {
    Util.spliceFromArray(this._program_events, this.getProgramEvent(program_event_name))
    return this
  }
  Conference.prototype.getProgramEventsAll = function getProgramEventsAll() {
    return this._program_events.slice()
  }

  Conference.prototype.addVenue = function addVenue(venue_label, place) {
    this._venues[venue_label] = place
    return this
  }
  Conference.prototype.getVenue = function getVenue(venue_label) {
    return this._venues[venue_label]
  }
  Conference.prototype.removeVenue = function removeVenue(venue_label) {
    this._venues[venue_label] = null
    return this
  }
  Conference.prototype.getVenuesAll = function getVenuesAll() {
    //- NOTE returns shallow clone (like arr.slice())
    return Object.assign({}, this._venues)
  }

  Conference.prototype.conferenceVenue = function conferenceVenue(venue_label) {
    if (arguments.length) {
    this._venue_conference_index = venue_label
    return this
    } else {
    return this.getVenue(this._venue_conference_index)
    }
  }

  Conference.prototype.addSpeaker = function addSpeaker(person) {
    this._speakers.push(person)
    return this
  }
  Conference.prototype.getSpeaker = function getSpeaker(person_id) {
    return this._speakers.find(function (item) { return item.id === person_id })
  }
  Conference.prototype.removeSpeaker = function removeSpeaker(person_id) {
    Util.spliceFromArray(this._speakers, this.getSpeaker(person_id))
    return this
  }
  Conference.prototype.getSpeakersAll = function getSpeakersAll() {
    return this._speakers.slice()
  }

  Conference.prototype.addImportantDate = function addImportantDate(important_date) {
    this._important_dates.push(important_date)
    return this
  }
  Conference.prototype.getImportantDate = function getImportantDate(important_date_name) {
    return this._important_dates.find(function (item) { return item.name === important_date_name })
  }
  Conference.prototype.removeImportantDate = function removeImportantDate(important_date_name) {
    Util.spliceFromArray(this._important_dates, this.getImportantDate(important_date_name))
    return this
  }
  Conference.prototype.getImportantDatesAll = function getImportantDatesAll() {
    return this._important_dates.slice()
  }

  Conference.prototype.addChair = function addChair(person) {
    this._chairs.push(person)
    return this
  }
  Conference.prototype.getChair = function getChair(person_id) {
    return this._chairs.find(function (item) { return item.id === person_id })
  }
  Conference.prototype.removeChair = function removeChair(person_id) {
    Util.spliceFromArray(this._chairs, this.getChair(person_id))
    return this
  }
  Conference.prototype.getChairsAll = function getChairsAll() {
    return this._chairs.slice()
  }

  // METHODS
  Conference.prototype.setPrice = function setPrice(reg_period, pass, membership, price) {
    //- reg_period = reg_period.name || reg_period
    //- pass        = pass.name        || pass
    //- membership  = membership.name  || membership
    //- this.registration = this.registration || {}
    //- this.registration[reg_period][pass][membership] = price
    return this
  }
  Conference.prototype.groupProgramEvents = function groupProgramEvents() {
    var groupings = []
    var all_events = this.getProgramEventsAll()
    for (event0 of all_events) {
      function dateOf(program_event) { return program_event.startDate.slice(0,10) }
      if (!groupings.find(function (item) { return item.date === dateOf(event0) })) {
        groupings.push({date: dateOf(event0), events: all_events.filter(function (item) {
          return dateOf(item) === dateOf(event0)
        })})
      }
    }
    return groupings
  }

  return Conference
})()
