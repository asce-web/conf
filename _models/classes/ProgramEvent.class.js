/**
 * A program event.
 * @type {ProgramEvent}
 */
module.exports = (function () {
  // CONSTRUCTOR
  /**
   * Construct a ProgramEvent object.
   * The name, start date, and end date
   * are immutable and must be provided during construction.
   * @param {Object} $eventinfo an object with the following immutable properties:
   * @param {Object} $eventinfo.name the name of the program event
   * @param {Object} $eventinfo.start_date the start date of the program event
   * @param {Object} $eventinfo.end_date the end date of the program event
   */
  function ProgramEvent($eventinfo) {
    var self = this
    $eventinfo = $eventinfo || {} // NOTE constructor overloading
    self._NAME  = $eventinfo.name
    self._START = $eventinfo.start_date
    self._END   = $eventinfo.end_date
    self._url = ''
    self._is_starred = false
  }

  // ACCESSOR FUNCTIONS
  /**
   * Get the name of this program event.
   * @return {string} the name of this program event
   */
  ProgramEvent.prototype.name = function name() {
    return this._NAME
  }

  /**
   * Get the start date of this program event.
   * @return {string} the start date of this program event
   */
  ProgramEvent.prototype.startDate = function startDate() {
    return this._START
  }

  /**
   * Get the end date of this program event.
   * @return {string} the end date of this program event
   */
  ProgramEvent.prototype.endDate = function endDate() {
    return this._END
  }

  /**
   * Set or get the url of this program event.
   * @param  {string=} url the url of this program event
   * @return {(ProgramEvent|string)} this program event || the url of this program event
   */
  ProgramEvent.prototype.url = function url(url) {
    if (arguments.length) {
      this._url = url
      return this
    } else return this._url
  }

  /**
   * Mark this program event as starred.
   * @param  {boolean=true} bool if true, mark as starred
   * @return {ProgramEvent} this program event
   */
  ProgramEvent.prototype.star = function star(bool) {
    this._is_starred = (arguments.length) ? bool : true
    return this
  }
  /**
   * Get the starred status of this program event.
   * @return {boolean} whether this program event is starred
   */
  ProgramEvent.prototype.isStarred = function isStarred() {
    return this._is_starred
  }

  return ProgramEvent
})()
