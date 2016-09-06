module.exports = (function () {
  // CONSTRUCTOR
  function Place($placeinfo) {
    var self = this
    $placeinfo = $placeinfo || {} // NOTE constructor overloading
    self.name            = $placeinfo.name
    self.address         = {
        streetAddress  : $placeinfo.streetAddress
      , addressLocality: $placeinfo.addressLocality
      , addressRegion  : $placeinfo.addressRegion
      , postalCode     : $placeinfo.postalCode
      , addressCountry : $placeinfo.addressCountry
    }
    self.telephone       = $placeinfo.telephone
    self.url             = $placeinfo.url
  }

  // ACCESSOR FUNCTIONS

  return Place
})()
