// Options and locals for compiling Pug pages.

//- ///////////////////////////////////////////////////////////////////////////////
//- //
//- // This file holds 'local' data for the sample site template.
//- // All microsites share this file.
//- //
//- ///////////////////////////////////////////////////////////////////////////////


var Color      = require('csscolor').Color
var ConfSite   = require('neo').ConfSite
var ConfPage   = require('neo').ConfPage
var Conference = require('neo').Conference

module.exports = {
  basedir : './'
, Util: require('neo').Util
, site: new ConfSite()
    .colors(Color.fromString('#660000'), Color.fromString('#ff6600')) // default Hokie colors
    .init()
    .addConference('sample', new Conference({
      start_date: new Date()
    , end_date  : new Date()
    }))
    .currentConference('sample')
    .prevConference('sample')
    .nextConference('sample')
, page: new ConfPage()
}
