module.exports = (function () {
  //- CONSTRUCTOR
  function Conference($confinfo) {
    var self = this
    $confinfo = $confinfo || {} // NOTE constructor overloading
    self.name      = $confinfo.name
    self.theme     = $confinfo.theme
    self.startDate = $confinfo.startDate
    self.endDate   = $confinfo.endDate
    self.url       = $confinfo.url
    self.promo_loc = $confinfo.promo_loc
    self.reg_periods     = []
    self.passes          = []
    self.program_events  = []
    self.venues          = {}
    self.speakers        = []
    self.important_dates = []
    self.chairs          = []
    self._regpd_current_index    = NaN
    self._venue_conference_index = null
  }

  // REVIEW organize methods by accessor; use args to determine get/set

  //- SETTER FUNCTIONS
  Conference.prototype.addRegistrationPeriod = function addRegistrationPeriod(reg_period) {
    this.reg_periods.push(reg_period)
    return this
  }
  Conference.prototype.removeRegistrationPeriod = function removeRegistrationPeriod(reg_period_name) {
    Util.spliceFromArray(this.reg_periods, this.getRegistrationPeriod(reg_period_name))
    return this
  }
  Conference.prototype.setCurrentRegistrationPeriod = function setCurrentRegistrationPeriod(reg_period_name) {
    this._regpd_current_index = this.reg_periods.indexOf(this.getRegistrationPeriod(reg_period_name))
    return this
  }
  Conference.prototype.addPass = function addPass(pass) {
    this.passes.push(pass)
    return this
  }
  Conference.prototype.removePass = function removePass(pass_name) {
    Util.spliceFromArray(this.passes, this.getPass(pass_name))
    return this
  }
  Conference.prototype.addProgramEvent = function addProgramEvent(program_event) {
    this.program_events.push(program_event)
    return this
  }
  Conference.prototype.removeProgramEvent = function removeProgramEvent(program_event_name) {
    Util.spliceFromArray(this.program_events, this.getProgramEvent(program_event_name))
    return this
  }
  Conference.prototype.addVenue = function addVenue(venue_label, place) {
    this.venues[venue_label] = place
    return this
  }
  Conference.prototype.removeVenue = function removeVenue(venue_label) {
    this[venue_label] = null
    return this
  }
  Conference.prototype.setConferenceVenue = function setConferenceVenue(venue_label) {
    this._venue_conference_index = venue_label
  }
  Conference.prototype.addSpeaker = function addSpeaker(person) {
    this.speakers.push(person)
    return this
  }
  Conference.prototype.removeSpeaker = function removeSpeaker(person_id) {
    Util.spliceFromArray(this.speakers, this.getSpeaker(person_id))
    return this
  }
  Conference.prototype.addImportantDate = function addImportantDate(important_date) {
    this.important_dates.push(important_date)
    return this
  }
  Conference.prototype.removeImportantDate = function removeImportantDate(important_date_name) {
    Util.spliceFromArray(this.important_dates, this.getImportantDate(important_date_name))
    return this
  }
  Conference.prototype.addChair = function addChair(person) {
    this.chairs.push(person)
    return this
  }
  Conference.prototype.removeChair = function removeChair(person_id) {
    Util.spliceFromArray(this.chairs, this.getChair(person_id))
    return this
  }

  //- GETTER FUNCTIONS
  Conference.prototype.getRegistrationPeriod = function getRegistrationPeriod(reg_period_name) {
    return this.reg_periods.find(function (item) { return item.name === reg_period_name })
  }
  Conference.prototype.getCurrentRegistrationPeriod = function getCurrentRegistrationPeriod() {
    return this.reg_periods[this._regpd_current_index]
  }
  Conference.prototype.getPass = function getPass(pass_name) {
    return this.passes.find(function (item) { return item.name === pass_name })
  }
  Conference.prototype.getProgramEvent = function getProgramEvent(program_event_name) {
    return this.program_events.find(function (item) { return item.name === program_event_name })
  }
  Conference.prototype.getVenue = function getVenue(venue_label) {
    return this.venues[venue_label]
  }
  Conference.prototype.getConferenceVenue = function getConferenceVenue() {
    return this.getVenue(this._venue_conference_index)
  }
  Conference.prototype.getSpeaker = function getSpeaker(person_id) {
    return this.speakers.find(function (item) { return item.id === person_id })
  }
  Conference.prototype.getImportantDate = function getImportantDate(important_date_name) {
    return this.important_dates.find(function (item) { return item.name === important_date_name })
  }
  Conference.prototype.getChair = function getChair(person_id) {
    return this.chairs.find(function (item) { return item.id === person_id })
  }
  Conference.prototype.getRegistrationPeriodsAll = function getRegistrationPeriodsAll() {
    return this.reg_periods.slice()
  }
  Conference.prototype.getPassesAll = function getPassesAll() {
    return this.passes.slice()
  }
  Conference.prototype.getProgramEventsAll = function getProgramEventsAll() {
    return this.program_events.slice()
  }
  Conference.prototype.getVenuesAll = function getVenuesAll() {
    //- NOTE returns shallow clone (like arr.slice())
    return Object.assign({}, this.venues)
  }
  Conference.prototype.getSpeakersAll = function getSpeakersAll() {
    return this.speakers.slice()
  }
  Conference.prototype.getImportantDatesAll = function getImportantDatesAll() {
    return this.important_dates.slice()
  }
  Conference.prototype.getChairsAll = function getChairsAll() {
    return this.chairs.slice()
  }

  //- MORE PROTO FUNCTIONS
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
