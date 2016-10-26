// Options and locals for compiling Pug pages.

//- ///////////////////////////////////////////////////////////////////////////////
//- //
//- // This file holds 'local' data for the styleguide pattern library.
//- //
//- ///////////////////////////////////////////////////////////////////////////////


module.exports = Object.assign(require('../../_models/options.js'), {
  Color             : require('csscolor').Color
, ConfPage          : require('../../_models/classes/ConfPage.class.js')
, Conference        : require('../../_models/classes/Conference.class.js')
, SupporterLevel    : require('../../_models/classes/SupporterLevel.class.js')
, Supporter         : require('../../_models/classes/Supporter.class.js')
, Person            : require('../../_models/classes/Person.class.js')
, RegistrationPeriod: require('../../_models/classes/RegistrationPeriod.class.js')
, Pass              : require('../../_models/classes/Pass.class.js')
, ProgramEvent      : require('../../_models/classes/ProgramEvent.class.js')
, ImportantDate     : require('../../_models/classes/ImportantDate.class.js')
, ConfDocs          : require('./classes/ConfDocs.class.js')
})
