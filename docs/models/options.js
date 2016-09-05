// Options and locals for compiling Pug pages.
module.exports = Object.assign(require('../../models/options.js'), {
  Styleguide: require('./classes/Styleguide.class.js')
, ConfDocs  : require('./classes/ConfDocs.class.js')
})
