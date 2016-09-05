module.exports = (function () {
  //- CONSTRUCTOR
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
    self.jobTitle    = ''
    self.affiliation = ''
    self.img         = ''
    self.email       = ''
    self.telephone   = ''
    self.url         = ''
    self.social      = null
    self.bio         = ''
  }

  //- SETTER FUNCTIONS
  Person.prototype.setJobTitle = function setJobTitle(text) {
    this.jobTitle = text
    return this
  }
  Person.prototype.setAffiliation = function setAffiliation(text) {
    this.affiliation = text
    return this
  }
  Person.prototype.setImg = function setImg(arg) {
    var url
    if (typeof arg === 'function') {
      url = arg.call(this)
    } else {
      url = arg
    }
    this.img = url
    return this
  }
  Person.prototype.setEmail = function setEmail(text) {
    this.email = text
    return this
  }
  Person.prototype.setTel = function setTel(text) {
    this.telephone = text
    return this
  }
  Person.prototype.setURL = function setURL(text) {
    this.url = text
    return this
  }
  Person.prototype.setSocial = function setSocial($links) {
    this.social = {
      linkedin: $links.linkedin
    , twitter : $links.twitter
    }
    this.social.twitter.url = $links.twitter.url || Util.SOCIAL_DATA.twitter.toURL($links.twitter.text)
    return this
  }
  Person.prototype.setBio = function setBio(html) {
    this.bio = html
    return this
  }

  //- GETTER FUNCTIONS
  Person.prototype.getJobTitle = function getJobTitle(text) {
    return this.jobTitle
  }
  Person.prototype.getAffiliation = function getAffiliation(text) {
    return this.affiliation
  }
  Person.prototype.getImg = function getImg() {
    return this.img
  }
  Person.prototype.getEmail = function getEmail() {
    return this.email
  }
  Person.prototype.getTel = function getTel() {
    return this.telephone
  }
  Person.prototype.getURL = function getURL() {
    return this.url
  }
  Person.prototype.getSocial = function getSocial() {
    return Object.assign({}, this.social) // shallow clone this.social into {}
  }
  Person.prototype.getBio = function getBio(unescaped) {
    return ((unescaped) ? '<!-- warning: unescaped code -->' : '') + this.bio
  }

  //- MORE PROTO FUNCTIONS
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

  //- STATIC MEMBERS

  return Person
})()
