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
  Person.prototype.setJobTitle = function setJobTitle(text) {
    this._jobTitle = text
    return this
  }
  Person.prototype.getJobTitle = function getJobTitle(text) {
    return this._jobTitle
  }

  Person.prototype.setAffiliation = function setAffiliation(text) {
    this._affiliation = text
    return this
  }
  Person.prototype.getAffiliation = function getAffiliation(text) {
    return this._affiliation
  }

  Person.prototype.setImg = function setImg(arg) {
    var url
    if (typeof arg === 'function') {
      url = arg.call(this)
    } else {
      url = arg
    }
    this._img = url
    return this
  }
  Person.prototype.getImg = function getImg() {
    return this._img
  }

  Person.prototype.setEmail = function setEmail(text) {
    this._email = text
    return this
  }
  Person.prototype.getEmail = function getEmail() {
    return this._email
  }

  Person.prototype.setTel = function setTel(text) {
    this._telephone = text
    return this
  }
  Person.prototype.getTel = function getTel() {
    return this._telephone
  }

  Person.prototype.setURL = function setURL(text) {
    this._url = text
    return this
  }
  Person.prototype.getURL = function getURL() {
    return this._url
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
