/**
 * A group of supporters with a similar level of support or donation.
 * Assigned at the site level, not at an individual conference.
 * @type {SupporterLevel}
 */
module.exports = (function () {
  // CONSTRUCTOR
  /**
   * Construct a SupporterLevel object, given an (immutable) name.
   * @constructor
   * @param {string} name the name of the level (e.g. 'Gold')
   */
  function SupporterLevel(name) {
    var self = this
    self._NAME = name
    self._classname = ''
  }

  // ACCESSOR FUNCTIONS
  /**
   * Get the name of this supporter level.
   * @return {string} the name of this supporter level
   */
  SupporterLevel.prototype.name = function name() {
    return this._NAME
  }

  /**
   * Set or get the classname of this supporter level.
   * The classname is a CSS class that will be used to determine the styling
   * of the supporter logos in this supporter level.
   * @param  {str=} classname the name of the CSS class
   * @return {(SupporterLevel|string)} this supporter level | the classname of this supporter level
   */
  SupporterLevel.prototype.classname = function classname(classname) {
    if (arguments.length) {
      this._classname = classname
      return this
    } else return this._classname
  }

  return SupporterLevel
})()
