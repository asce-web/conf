// Options and locals for compiling Pug pages.

//- ///////////////////////////////////////////////////////////////////////////////
//- //
//- // This file holds 'local' data for the sample site template.
//- // All microsites share this file.
//- //
//- ///////////////////////////////////////////////////////////////////////////////


var ConfSite = require('../../../models/classes/ConfSite.class.js')
  , ConfPage = require('../../../models/classes/ConfPage.class.js')
  , Conference = require('../../../models/classes/Conference.class.js')

module.exports = Object.assign(require('../../../models/options.js'), {
  site: new ConfSite()
    .init()
    .addConference('sample', new Conference())
    .setCurrentConference('sample')
    .setPrevConference('sample')
    .setNextConference('sample')
, page: new ConfPage()
})
