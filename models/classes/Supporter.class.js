module.exports = (function () {
  //- CONSTRUCTOR
  function Supporter(name) {
    var self = this
    self.name = name
    self.url   = ''
    self.img   = ''
    self.level = null
  }

  // REVIEW organize methods by accessor; use args to determine get/set

  //- SETTER FUNCTIONS
  Supporter.prototype.setURL = function setURL(url0) {
    this.url = url0
    return this
  }
  Supporter.prototype.setImg = function setImg(img0) {
    this.img = img0
    return this
  }
  Supporter.prototype.setLevel = function setLevel(supporter_level) {
    this.level = supporter_level
    return this
  }

  //- GETTER FUNCTIONS
  Supporter.prototype.getURL = function getURL() {
    return this.url
  }
  Supporter.prototype.getImg = function getImg() {
    return this.img
  }
  Supporter.prototype.getLevel = function getLevel() {
    return this.level
  }

  return Supporter
})()
