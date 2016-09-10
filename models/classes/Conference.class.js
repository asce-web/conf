module.exports = (function () {
  // CONSTRUCTOR
  function Conference($confinfo) {
    var self = this
    $confinfo = $confinfo || {} // NOTE constructor overloading
    self._NAME      = $confinfo.name
    self._THEME     = $confinfo.theme
    self._START     = $confinfo.start_date
    self._END       = $confinfo.end_date
    self._URL       = $confinfo.url
    self._PROMO_LOC = $confinfo.promo_loc
    self._reg_periods     = []
    self._passes          = []
    self._program_events  = []
    self._venues          = {}
    self._speakers        = []
    self._important_dates = []
    self._chairs          = []
    self._regpd_curr_index = NaN
    self._venue_conf_key   = null
  }

  // ACCESSOR FUNCTIONS
  Conference.prototype.name = function name() {
    return this._NAME
  }
  Conference.prototype.theme = function theme() {
    return this._THEME
  }
  Conference.prototype.startDate = function startDate() {
    return this._START
  }
  Conference.prototype.endDate = function endDate() {
    return this._END
  }
  Conference.prototype.url = function url() {
    return this._URL
  }
  Conference.prototype.promoLoc = function promoLoc() {
    return this._PROMO_LOC
  }

  Conference.prototype.addRegistrationPeriod = function addRegistrationPeriod($registrationPeriod) {
    this._reg_periods.push($registrationPeriod)
    return this
  }
  Conference.prototype.getRegistrationPeriod = function getRegistrationPeriod(name) {
    return this._reg_periods.find(function ($registrationPeriod) { return $registrationPeriod.name() === name })
  }
  Conference.prototype.removeRegistrationPeriod = function removeRegistrationPeriod(name) {
    Util.spliceFromArray(this._reg_periods, this.getRegistrationPeriod(name))
    return this
  }
  Conference.prototype.getRegistrationPeriodsAll = function getRegistrationPeriodsAll() {
    return this._reg_periods.slice()
  }

  Conference.prototype.currentRegistrationPeriod = function currentRegistrationPeriod(reg_period_name) {
    if (arguments.length) {
      this._regpd_curr_index = this._reg_periods.indexOf(this.getRegistrationPeriod(reg_period_name))
      return this
    } else {
      return this._reg_periods[this._regpd_curr_index]
    }
  }

  Conference.prototype.addPass = function addPass($pass) {
    this._passes.push($pass)
    return this
  }
  Conference.prototype.getPass = function getPass(name) {
    return this._passes.find(function ($pass) { return $pass.name() === name })
  }
  Conference.prototype.removePass = function removePass(name) {
    Util.spliceFromArray(this._passes, this.getPass(name))
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
      this._venue_conf_key = venue_label
      return this
    } else {
      return this.getVenue(this._venue_conf_key)
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

  Conference.prototype.addImportantDate = function addImportantDate($importantDate) {
    this._important_dates.push($importantDate)
    return this
  }
  Conference.prototype.getImportantDate = function getImportantDate(name) {
    return this._important_dates.find(function ($importantDate) { return $importantDate.name() === name })
  }
  Conference.prototype.removeImportantDate = function removeImportantDate(name) {
    Util.spliceFromArray(this._important_dates, this.getImportantDate(name))
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
    var all_events = this.getProgramEventsAll()
    return (function ($groupings) {
      for ($programEvent of all_events) {
        function dateOf($programEvent1) { return $programEvent1.startDate().slice(0,10) }
        if (!$groupings.find(function ($obj) { return $obj.date === dateOf($programEvent) })) {
          $groupings.push({
            date  : dateOf($programEvent)
          , events: all_events.filter(function ($programEvent1) {
              return dateOf($programEvent1) === dateOf($programEvent)
            })
          })
        }
      }
      return $groupings
    })([])
  }

  return Conference
})()
