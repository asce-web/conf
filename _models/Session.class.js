/**
 * A program event.
 * @type {Session}
 */
module.exports = (function () {
  // CONSTRUCTOR
  /**
   * Construct a Session object.
   * The name, start date, and end date
   * are immutable and must be provided during construction.
   * @param {Object} $sessioninfo an object with the following immutable properties:
   * @param {string} $sessioninfo.name the name of the session
   * @param {string} $sessioninfo.start_date the start date of the session
   * @param {string} $sessioninfo.end_date the end date of the session
   */
  function Session($sessioninfo) {
    var self = this
    $sessioninfo = $sessioninfo || {} // NOTE constructor overloading
    self._NAME  = $sessioninfo.name
    self._START = $sessioninfo.start_date
    self._END   = $sessioninfo.end_date
    self._url = ''
    self._is_starred = false
  }

  // ACCESSOR FUNCTIONS
  /**
   * Get the name of this session.
   * @return {string} the name of this session
   */
  Session.prototype.name = function name() {
    return this._NAME
  }

  /**
   * Get the start date of this session.
   * @return {string} the start date of this session
   */
  Session.prototype.startDate = function startDate() {
    return this._START
  }

  /**
   * Get the end date of this session.
   * @return {string} the end date of this session
   */
  Session.prototype.endDate = function endDate() {
    return this._END
  }

  /**
   * Set or get the url of this session.
   * @param  {string=} url the url of this session
   * @return {(Session|string)} this session || the url of this session
   */
  Session.prototype.url = function url(url) {
    if (arguments.length) {
      this._url = url
      return this
    } else return this._url
  }

  /**
   * Mark this session as starred.
   * @param  {boolean=true} bool if true, mark as starred
   * @return {Session} this session
   */
  Session.prototype.star = function star(bool) {
    this._is_starred = (arguments.length) ? bool : true
    return this
  }
  /**
   * Get the starred status of this session.
   * @return {boolean} whether this session is starred
   */
  Session.prototype.isStarred = function isStarred() {
    return this._is_starred
  }

  return Session
})()
