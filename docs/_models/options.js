// Options and locals for compiling Pug pages.

//- ///////////////////////////////////////////////////////////////////////////////
//- //
//- // This file holds 'local' data for the styleguide pattern library.
//- //
//- ///////////////////////////////////////////////////////////////////////////////


module.exports = Object.assign(require('../../_models/options.js'), {
  Color             : require('csscolor').Color
, ConfSite          : require('../../_models/ConfSite.class.js')
, ConfPage          : require('../../_models/ConfPage.class.js')
, Conference        : require('../../_models/Conference.class.js')
, SupporterLevel    : require('../../_models/SupporterLevel.class.js')
, Supporter         : require('../../_models/Supporter.class.js')
, Person            : require('../../_models/Person.class.js')
, Place             : require('../../_models/Place.class.js')
, RegistrationPeriod: require('../../_models/RegistrationPeriod.class.js')
, Pass              : require('../../_models/Pass.class.js')
, ProgramEvent      : require('../../_models/ProgramEvent.class.js')
, ImportantDate     : require('../../_models/ImportantDate.class.js')
, ConfDocs          : require('./ConfDocs.class.js')
})