// Options and locals for compiling Pug pages.

//- ///////////////////////////////////////////////////////////////////////////////
//- //
//- // This file holds 'local' data for the styleguide pattern library.
//- //
//- ///////////////////////////////////////////////////////////////////////////////


module.exports = Object.assign(require('../../models/options.js'), {
  Color             : require('csscolor').Color
, ConfPage          : require('../../models/classes/ConfPage.class.js')
, Conference        : require('../../models/classes/Conference.class.js')
, SupporterLevel    : require('../../models/classes/SupporterLevel.class.js')
, Supporter         : require('../../models/classes/Supporter.class.js')
, Person            : require('../../models/classes/Person.class.js')
, RegistrationPeriod: require('../../models/classes/RegistrationPeriod.class.js')
, Pass              : require('../../models/classes/Pass.class.js')
, ProgramEvent      : require('../../models/classes/ProgramEvent.class.js')
, ImportantDate     : require('../../models/classes/ImportantDate.class.js')
, ConfDocs          : require('./classes/ConfDocs.class.js')
})
