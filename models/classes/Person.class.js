var Util = require('./Util.class.js')

module.exports = (function () {
  // CONSTRUCTOR
  function Person($personinfo) {
    var self = this
    $personinfo = $personinfo || { name: {} } // NOTE constructor overloading
    self.id   = $personinfo.id
    self.name = {
      honorificPrefix : $personinfo.name.honorificPrefix
    , givenName       : $personinfo.name.givenName
    , additionalName  : $personinfo.name.additionalName
    , familyName      : $personinfo.name.familyName
    , honorificSuffix : $personinfo.name.honorificSuffix
    }
    self._jobTitle    = ''
    self._affiliation = ''
    self._img         = ''
    self._email       = ''
    self._telephone   = ''
    self._url         = ''
    self._social      = null
    self._bio         = ''
  }

  // ACCESSOR FUNCTIONS
  Person.prototype.jobTitle = function jobTitle(text) {
    if (arguments.length) {
      this._jobTitle = text
      return this
    } else {
      return this._jobTitle
    }
  }

  Person.prototype.affiliation = function affiliation(text) {
    if (arguments.length) {
      this._affiliation = text
      return this
    } else {
      return this._affiliation
    }
  }

  Person.prototype.img = function img(arg) {
    if (arguments.length) {
      this._img = (function (self) {
        var url;
        if (typeof arg === 'function') {
          url = arg.call(self)
        } else {
          url = arg
        }
        return url
      })(this)
      return this
    } else {
      return this._img
    }
  }

  Person.prototype.email = function email(text) {
    if (arguments.length) {
      this._email = text
      return this
    } else {
      return this._email
    }
  }

  Person.prototype.phone = function phone(text) {
    if (arguments.length) {
      this._telephone = text
      return this
    } else {
      return this._telephone
    }
  }

  Person.prototype.url = function url(text) {
    if (arguments.length) {
      this._url = text
      return this
    } else {
      return this._url
    }
  }

  Person.prototype.setSocial = function setSocial($links) {
    this._social = {
      linkedin: $links.linkedin
    , twitter : $links.twitter
    }
    this._social.twitter.url = $links.twitter.url || Util.SOCIAL_DATA.twitter.toURL($links.twitter.text)
    return this
  }
  Person.prototype.getSocial = function getSocial() {
    return Object.assign({}, this._social) // shallow clone this.social into {}
  }

  Person.prototype.setBio = function setBio(html) {
    this._bio = html
    return this
  }
  Person.prototype.getBio = function getBio(unescaped) {
    return ((unescaped) ? '<!-- warning: unescaped code -->' : '') + this._bio
  }

  // METHODS
  Person.prototype.printFullName = function printFullName() {
    var returned = ''
    returned += this.name.givenName
    returned += ' ' + this.name.additionalName
    returned += ' ' + this.name.familyName
    return returned
  }
  Person.prototype.printEntireName = function printEntireName() {
    var returned = ''
    if (this.name.honorificPrefix) returned += this.name.honorificPrefix + ' '
    returned += this.printFullName()
    if (this.name.honorificSuffix) returned += ', ' + this.name.honorificSuffix
    return returned
  }

  return Person
})()
