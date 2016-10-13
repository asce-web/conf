// Options and locals for compiling Pug pages.

//- ///////////////////////////////////////////////////////////////////////////////
//- //
//- // This file holds 'local' data for the sample site template.
//- // All microsites share this file.
//- //
//- ///////////////////////////////////////////////////////////////////////////////


var Color = require('csscolor').Color
var ConfSite = require('../../../models/classes/ConfSite.class.js')
var ConfPage = require('../../../models/classes/ConfPage.class.js')
var Conference = require('../../../models/classes/Conference.class.js')

module.exports = Object.assign(require('../../../models/options.js'), {
  site: new ConfSite()
    .colors(Color.fromString('#660000'), Color.fromString('#ff6600')) // default Hokie colors
    .init()
    .addConference('sample', new Conference())
    .currentConference('sample')
    .prevConference('sample')
    .nextConference('sample')
, page: new ConfPage()
})
