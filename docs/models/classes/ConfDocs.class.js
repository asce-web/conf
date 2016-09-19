var Page = require('sitepage').Page
var StyleGuide = require('sitepage').StyleGuide
var Color = require('../../../models/classes/Color.class.js')

/**
 * A set of static members used for the Conf style guide.
 * Similar to a utility class.
 * @type {ConfDocs}
 */
module.exports = (function () {
  // CONSTRUCTOR
  function ConfDocs() {}

  // METHODS

  // STATIC MEMBERS
  /**
   * The style guide site for this project.
   * @type {StyleGuide}
   */
  ConfDocs.DOCS = (function () {
    var docs = new StyleGuide('ASCE Conferences Style Guide', '/docs/')
    .title('ASCE Conferences Style Guide')
    .description('Pattern Library for conference microsites.')
    .init()
    docs.find('visual.html')
      .add(new Page({ name: 'ASCE'     , url: 'visual.html#asce' }))
      .add(new Page({ name: 'ASCE 2016', url: 'visual.html#asce2016' }))
    docs.find('obj.html')
      .add(new Page({ name: 'The Float Grid'     , url: 'obj.html#float-grid' }))
      .add(new Page({ name: 'The Runner Object'  , url: 'obj.html#runner-object' }))
      .add(new Page({ name: 'Constrain'          , url: 'obj.html#constrain' }))
      .add(new Page({ name: 'The Action List'    , url: 'obj.html#action-list' }))
      .add(new Page({ name: 'The Stacked List'   , url: 'obj.html#stacked-list' }))
      .add(new Page({ name: 'The Drawer Object'  , url: 'obj.html#drawer-object' }))
    docs.find('comp.html')
      .add(new Page({ name: 'The Masthead and Mastfoot', url: 'comp.html#masthead-mastfoot' }))
      .add(new Page({ name: 'The Site Title'           , url: 'comp.html#site-title' }))
      .add(new Page({ name: 'The Top Menu'             , url: 'comp.html#top-menu' }))
      .add(new Page({ name: 'The Main Menu'            , url: 'comp.html#main-menu' }))
      .add(new Page({ name: 'The Sub Menu'             , url: 'comp.html#sub-menu' }))
      .add(new Page({ name: 'The Sitemap Component'    , url: 'comp.html#sitemap-component' }))
      .add(new Page({ name: 'The Page Title'           , url: 'comp.html#page-title' }))
      .add(new Page({ name: 'The Banner Component'     , url: 'comp.html#banner-component' }))
      .add(new Page({ name: 'The Hero Block'           , url: 'comp.html#hero-block' }))
      .add(new Page({ name: 'The Other Year Block'     , url: 'comp.html#other-year-block' }))
      .add(new Page({ name: 'The Overlay Component'    , url: 'comp.html#overlay-component' }))
      .add(new Page({ name: 'The Sponsor Logo'         , url: 'comp.html#sponsor-logo' }))
      .add(new Page({ name: 'The Sponsor Block'        , url: 'comp.html#sponsor-block' }))
      .add(new Page({ name: 'The Date Block'           , url: 'comp.html#date-block' }))
      .add(new Page({ name: 'The Pass Component'       , url: 'comp.html#pass-component' }))
      .add(new Page({ name: 'The Program Component'    , url: 'comp.html#program-component' }))
      .add(new Page({ name: 'The Time Block'           , url: 'comp.html#time-block' }))
      .add(new Page({ name: 'The Speaker Component'    , url: 'comp.html#speaker-component' }))
      .add(new Page({ name: 'The Social List'          , url: 'comp.html#social-list' }))
      .add(new Page({ name: 'The Callout Component'    , url: 'comp.html#callout-component' }))
      .add(new Page({ name: 'Buttons'                  , url: 'comp.html#buttons' }))
      .add(new Page({ name: 'The Toggle Button'        , url: 'comp.html#toggle-button' }))
      .add(new Page({ name: 'The Camo Link'            , url: 'comp.html#camo-link'}))
    return docs
  })()


  /**
   * Static classes for Conf style guide elements.
  // REVIEW may not need this with new xmeter
   * @type {Object}
   */
  ConfDocs.DOCS_CLASSES = {
    figure : 'docs-figure'
  , pre    : 'docs-pre'
  , code   : 'docs-code'
  }

  ConfDocs.COLORS = (function (primary, secondary) {
    // copied directly from ConfSite.class.js#colors()
    var primary   = Color.fromHex(primary)
    var secondary = Color.fromHex(secondary)
    var gray_dk   = primary.desaturate(0.9, true).darken(0.2)
    var gray_lt   = secondary.desaturate(0.9, true).brighten(0.2)
    return {
      '--color-primary'  : primary.toString()
    , '--color-secondary': secondary.toString()
    , '--color-gray-dk'  : gray_dk.toString()
    , '--color-gray-lt'  : gray_lt.toString()

    , '--color-primary-darken1' : primary.darken(0.25, true).toString()
    , '--color-primary-darken2' : primary.darken(0.50, true).toString()
    , '--color-primary-lighten1': primary.brighten(0.25, true).toString()
    , '--color-primary-lighten2': primary.brighten(0.50, true).toString()
    , '--color-primary-fadeout1': 'rgba(130,130,130,0.6)'

    , '--color-secondary-darken1' : secondary.darken(0.25, true).toString()
    , '--color-secondary-darken2' : secondary.darken(0.50, true).toString()
    , '--color-secondary-lighten1': secondary.brighten(0.25, true).toString()
    , '--color-secondary-lighten2': secondary.brighten(0.50, true).toString()

    , '--color-gray-dk-darken1' : gray_dk.darken(0.25, true).toString()
    , '--color-gray-dk-darken2' : gray_dk.darken(0.50, true).toString()
    , '--color-gray-dk-lighten1': gray_dk.brighten(0.25, true).toString()
    , '--color-gray-dk-lighten2': gray_dk.brighten(0.50, true).toString()

    , '--color-gray-lt-darken1' : gray_lt.darken(0.25, true).toString()
    , '--color-gray-lt-darken2' : gray_lt.darken(0.50, true).toString()
    , '--color-gray-lt-lighten1': gray_lt.brighten(0.25, true).toString()
    , '--color-gray-lt-lighten2': gray_lt.brighten(0.50, true).toString()
    }
  })('#660000', '#ff6600')

  return ConfDocs
})()
