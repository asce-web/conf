/**
 * A conference event.
 * It may have a name, theme, dates, (promoted) location, passes, events, venues, speakers,
 * important dates, chairs, and other properties.
 * @type {Conference}
 */
module.exports = (function () {
  // CONSTRUCTOR
  /**
   * Construct a Conference object.
   * The name, url, theme, start date, end date, and promoted location
   * are immutable and must be provided during construction.
   * @constructor
   * @param {Object} $confinfo an object with the following immutable properties:
   * @param {string} $confinfo.name the name of this conference
   * @param {string} $confinfo.url the url of this conference
   * @param {string} $confinfo.theme the theme, or slogan, of this conference
   * @param {string} $confinfo.start_date the starting date of this conference
   * @param {string} $confinfo.end_date the ending date of this conference
   * @param {(Object|string)} $confinfo.promo_loc the promoted location of this conference
   * @param {string=} $confinfo.promo_loc.text the promoted location displayed/abbreviated text (eg, "Portland, OR")
   * @param {string=} $confinfo.promo_loc.title the elongated version of the location (eg, "Portland, Oregon")
   * @param {string=} $confinfo.promo_loc.blurb small paragraph about location. escaped plain-text (no HTML)
   */
  function Conference($confinfo) {
    var self = this
    $confinfo = $confinfo || {} // NOTE constructor overloading
    self._NAME      = $confinfo.name
    self._URL       = $confinfo.url
    self._THEME     = $confinfo.theme
    self._START     = $confinfo.start_date
    self._END       = $confinfo.end_date
    self._PROMO_LOC = $confinfo.promo_loc
    self._reg_periods     = []
    self._passes          = []
    self._program_events  = []
    self._venues          = {}
    self._speakers        = []
    self._important_dates = []
    self._organizers      = []
    self._social          = {}
    self._other_year_blurb = ''
    self._regpd_curr_index = NaN
    self._venue_conf_key   = null
  }

  // ACCESSOR FUNCTIONS
  /**
   * Get the name of this conference.
   * @return {string} the name of this conference
   */
  Conference.prototype.name = function name() {
    return this._NAME
  }

  /**
   * Get the URL of this conference.
   * @return {string} the URL of this conference
   */
  Conference.prototype.url = function url() {
    return this._URL
  }

  /**
   * Get the theme of this conference.
   * The theme is a one-sentence or one-phrase slogan,
   * and may be changed from year to year (from conference to conference).
   * @return {string} the theme of this conference
   */
  Conference.prototype.theme = function theme() {
    return this._THEME
  }

  /**
   * Get the name of this conference.
   * @return {string} the name of this conference
   */
  Conference.prototype.startDate = function startDate() {
    return this._START
  }

  /**
   * Get the name of this conference.
   * @return {string} the name of this conference
   */
  Conference.prototype.endDate = function endDate() {
    return this._END
  }

  /**
   * Get the promoted location of this conference.
   * The promoted location is not necessarily the actual postal address of the conference,
   * but rather a major city nearest to the conference used for
   * promotional and advertising purposes.
   * @return {Object} the promoted location for this conference
   */
  Conference.prototype.promoLoc = function promoLoc() {
    return this._PROMO_LOC || {}
  }

  /**
   * Add a registration period to this conference.
   * @param {RegistrationPeriod} $registrationPeriod the registration period to add
   */
  Conference.prototype.addRegistrationPeriod = function addRegistrationPeriod($registrationPeriod) {
    this._reg_periods.push($registrationPeriod)
    return this
  }
  /**
   * Retrieve a registration period of this conference.
   * @param  {string} name the name of the registration period
   * @return {?RegistrationPeriod} the specified registration period
   */
  Conference.prototype.getRegistrationPeriod = function getRegistrationPeriod(name) {
    return this._reg_periods.find(function ($registrationPeriod) { return $registrationPeriod.name() === name }) || null
  }
  /**
   * Remove a registration period from this conference.
   * @param  {string} name the name of the registration period
   * @return {Conference} this conference
   */
  Conference.prototype.removeRegistrationPeriod = function removeRegistrationPeriod(name) {
    Util.spliceFromArray(this._reg_periods, this.getRegistrationPeriod(name))
    return this
  }
  /**
   * Retrieve all registration periods of this conference.
   * @return {Array<RegistrationPeriod>} a shallow array of all registration periods of this conference.
   */
  Conference.prototype.getRegistrationPeriodsAll = function getRegistrationPeriodsAll() {
    return this._reg_periods.slice()
  }

  /**
   * Set or get the current registration period.
   * The current registration period is the registration period that is active at this time.
   * @param  {string=} reg_period_name the name of the registration period to set current
   * @return {(Conference|RegistrationPeriod)} this conference || the set current registration period
   */
  Conference.prototype.currentRegistrationPeriod = function currentRegistrationPeriod(reg_period_name) {
    if (arguments.length) {
      this._regpd_curr_index = this._reg_periods.indexOf(this.getRegistrationPeriod(reg_period_name))
      return this
    } else return this._reg_periods[this._regpd_curr_index]
  }

  /**
   * Add a pass to this conference.
   * @param {Pass} $pass the pass to add
   */
  Conference.prototype.addPass = function addPass($pass) {
    this._passes.push($pass)
    return this
  }
  /**
   * Retrieve a pass of this conference.
   * @param  {string} name the name of the pass
   * @return {?Pass} the specified pass
   */
  Conference.prototype.getPass = function getPass(name) {
    return this._passes.find(function ($pass) { return $pass.name() === name }) || null
  }
  /**
   * Remove a pass of this conference.
   * @param  {string} name the name of the pass
   * @return {Conference} this conference
   */
  Conference.prototype.removePass = function removePass(name) {
    Util.spliceFromArray(this._passes, this.getPass(name))
    return this
  }
  /**
   * Retrieve all passes of this conference.
   * @param  {boolean=} starred if true, only retrieve passes that are starred
   * @return {Array<Pass>} a shallow array of all passes of this conference
   */
  Conference.prototype.getPassesAll = function getPassesAll(starred) {
    // NOTE method overloading convention is redundant for boolean parameters
    // if (arguments.length) {
    //   ;
    // } else return this.getPassesAll(false)
    return this._passes.filter(function ($pass) { return (starred) ? $pass.isStarred() : true })
  }

  /**
   * Add a program event to this conference.
   * @param {ProgramEvent} $programEvent the program event to add
   */
  Conference.prototype.addProgramEvent = function addProgramEvent($programEvent) {
    this._program_events.push($programEvent)
    return this
  }
  /**
   * Retrieve a program event of this conference.
   * @param  {string} name the name of the program event
   * @return {?ProgramEvent} the specified program event
   */
  Conference.prototype.getProgramEvent = function getProgramEvent(name) {
    return this._program_events.find(function ($programEvent) { return $programEvent.name() === name }) || null
  }
  /**
   * Remove a program event of this conference.
   * @param  {string} name the name of the program event
   * @return {Conference} this conference
   */
  Conference.prototype.removeProgramEvent = function removeProgramEvent(name) {
    Util.spliceFromArray(this._program_events, this.getProgramEvent(name))
    return this
  }
  /**
   * Retrieve all program events of this conference.
   * @param  {boolean=} starred if true, only retrieve program events that are starred
   * @return {Array<ProgramEvent>} a shallow array of all program events of this conference
   */
  Conference.prototype.getProgramEventsAll = function getProgramEventsAll(starred) {
    return this._program_events.filter(function ($programEvent) { return (starred) ? $programEvent.isStarred() : true })
  }

  /**
   * Add a venue to this conference.
   * @param {string} venue_label key for accessing the venue
   * @param {Object} $place the venue to add. properties:
   * @param {string} $place.name            the name of the venue or business
   * @param {string} $place.street_address   the venue’s street address
   * @param {string} $place.address_locality the venue’s city or town
   * @param {string} $place.address_region   the venue’s state or province
   * @param {string} $place.postal_code      the venue’s zip code
   * @param {string} $place.url             the venue’s url
   */
  Conference.prototype.addVenue = function addVenue(venue_label, $place) {
    this._venues[venue_label] = $place
    return this
  }
  /**
   * Retrieve a venue of this conference.
   * @param  {string} venue_label the key for accessing the venue
   * @return {Object} the specified venue
   */
  Conference.prototype.getVenue = function getVenue(venue_label) {
    return this._venues[venue_label]
  }
  /**
   * Remove a venue of this conference.
   * @param  {string} venue_label the key for accessing the venue
   * @return {Conference} this conference
   */
  Conference.prototype.removeVenue = function removeVenue(venue_label) {
    this._venues[venue_label] = null
    return this
  }
  /**
   * Retrieve all venues of this conference.
   * @return {Array<Object>} a shallow array of all venues of this conference
   */
  Conference.prototype.getVenuesAll = function getVenuesAll() {
    //- NOTE returns shallow clone (like arr.slice())
    return Object.assign({}, this._venues)
  }

  /**
   * Set or get the official conference venue for this conference.
   * The official conference venue is the venue at which this conference is held.
   * @param  {string} venue_label the key for accessing the venue
   * @return {(Conference|Object)} this conference || the set conference venue
   */
  Conference.prototype.conferenceVenue = function conferenceVenue(venue_label) {
    if (arguments.length) {
      this._venue_conf_key = venue_label
      return this
    } else return this.getVenue(this._venue_conf_key)
  }

  /**
   * Add a speaker to this conference.
   * @param {Person} $person the speaker to add
   */
  Conference.prototype.addSpeaker = function addSpeaker($person) {
    this._speakers.push($person)
    return this
  }
  /**
   * Retrieve a speaker of this conference.
   * @param  {string} id the id of the speaker
   * @return {?Person} the specified speaker
   */
  Conference.prototype.getSpeaker = function getSpeaker(id) {
    return this._speakers.find(function ($person) { return $person.id() === id }) || null
  }
  /**
   * Remove a speaker of this conference.
   * @param  {string} id the id of the speaker
   * @return {Conference} this conference
   */
  Conference.prototype.removeSpeaker = function removeSpeaker(id) {
    Util.spliceFromArray(this._speakers, this.getSpeaker(id))
    return this
  }
  /**
   * Retrieve all speakers of this conference.
   * @return {Array<Person>} a shallow array of all speakers of this conference
   */
  Conference.prototype.getSpeakersAll = function getSpeakersAll() {
    return this._speakers.slice()
  }

  /**
   * Add an important date to this conference.
   * @param {ImportantDate} $importantDate the important date to add
   */
  Conference.prototype.addImportantDate = function addImportantDate($importantDate) {
    this._important_dates.push($importantDate)
    return this
  }
  /**
   * Retrieve an important date of this conference.
   * @param  {string} name the name of the important date
   * @return {?ImportantDate} the specified important date
   */
  Conference.prototype.getImportantDate = function getImportantDate(name) {
    return this._important_dates.find(function ($importantDate) { return $importantDate.name() === name }) || null
  }
  /**
   * Remove an important date of this conference.
   * @param  {string} name the name of the important date
   * @return {Conference} this conference
   */
  Conference.prototype.removeImportantDate = function removeImportantDate(name) {
    Util.spliceFromArray(this._important_dates, this.getImportantDate(name))
    return this
  }
  /**
   * Retrieve all important dates of this conference.
   * @param  {boolean=} starred if true, only retrieve important dates that are starred
   * @return {Array<ImportantDate>} a shallow array of all important dates of this conference
   */
  Conference.prototype.getImportantDatesAll = function getImportantDatesAll(starred) {
    return this._important_dates.filter(function ($importantDate) { return (starred) ? $importantDate.isStarred() : true })
  }

  /**
   * Add an organizer of this conference.
   * An organizer is a chairperson, steering committee member, or other person who is
   * responsible for organizing the conference.
   * @param {Person} $person the organizer to add
   */
  Conference.prototype.addOrganizer = function addOrganizer($person) {
    this._organizers.push($person)
    return this
  }
  /**
   * Retrieve an organizer of this conference.
   * @param  {string} id the name of the organizer
   * @return {?Person} the specified organizer
   */
  Conference.prototype.getOrganizer = function getOrganizer(id) {
    return this._organizers.find(function ($person) { return $person.id() === id }) || null
  }
  /**
   * Remove an organizer of this conference.
   * @param  {string} id the name of the organizer
   * @return {Conference} this conference
   */
  Conference.prototype.removeOrganizer = function removeOrganizer(id) {
    Util.spliceFromArray(this._organizers, this.getOrganizer(id))
    return this
  }
  /**
   * Retrieve all organizers of this conference.
   * @return {Array<Person>} a shallow array of all organizers of this conference
   */
  Conference.prototype.getOrganizersAll = function getOrganizersAll() {
    return this._organizers.slice()
  }

  /**
   * Add a social network profile to this conference.
   * @param {string} network_name the name of the social network
   * @param {string} url the URL of this conference’s profile on the network
   * @param {string=} text optional advisory text
   * @return {Conference} this conference
   */
  Conference.prototype.addSocial = function addSocial(network_name, url, text) {
    this._social[network_name] = { url: url, text: text }
    return this
  }
  /**
   * Retrieve a social network profile of this conference.
   * @param  {string} network_name the name of the social network
   * @return {Object} an object representing the social network profile
   */
  Conference.prototype.getSocial = function getSocial(network_name) {
    return this._social[network_name]
  }
  /**
   * Remove a social network profile from this conference.
   * @param  {string} network_name the name of the social network
   * @return {Conference} this conference
   */
  Conference.prototype.removeSocial = function removeSocial(network_name) {
    this._social[network_name] = null
    return this
  }
  /**
   * Return an object representing all social network profiles of this conference.
   * @return {Object} shallow clone of this conference’s social object
   */
  Conference.prototype.getSocialAll = function getSocialAll() {
    //- NOTE returns shallow clone (like arr.slice())
    return Object.assign({}, this._social) // shallow clone this.social into {}
  }

  /**
   * Set the other year blurb for this conference.
   * This blurb is used if this conference occurs in another year (previous or next year).
   * @param {string} html html-friendly content
   * @return {Conferenct} this conference
   */
  Conference.prototype.setOtherYearBlurb = function setOtherYearBlurb(html) {
    this._other_year_blurb = html
    return this
  }
  /**
   * Get the other year blurb of this conference.
   * @param  {boolean=} unescaped whether or not the returned string should be escaped
   * @return {string} the other year blurb of this pass
   */
  Conference.prototype.getOtherYearBlurb = function getOtherYearBlurb(unescaped) {
    return ((unescaped) ? '<!-- warning: unescaped code -->' : '') + this._other_year_blurb
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
  /**
   * A group of program events, all of which share the same date (excluding time of day).
   * Contains two properties:
   * - `date` is the date by which the events are grouped, and
   * - `events` is an array of those events.
   * @typedef {Object} ProgramEventGrouping
   * @property {string} date - the date of all the events in the group
   * @property {Array<ProgramEvent>} events - an array whose members all have the same date
   */
  /**
   * Categorize all the program events of this conference by date and return the grouping.
   * Program events with the same date (excluding time of day) are grouped together.
   * @see ProgramEvent
   * @param  {boolean=} starred if true, only consider program events that are starred
   * @return {ProgramEventGrouping} an object grouping program events together
   */
  Conference.prototype.groupProgramEvents = function groupProgramEvents(starred) {
    var all_events = this.getProgramEventsAll(starred)
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
