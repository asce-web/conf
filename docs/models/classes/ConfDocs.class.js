var Page = require('../../../models/classes/Page.class.js')
  , Styleguide = require('./Styleguide.class.js')

module.exports = (function () {
  //- CONSTRUCTOR
  function ConfDocs() {}

  //- METHODS

  //- STATIC MEMBERS
  ConfDocs.DOCS = new Styleguide('ASCE Conferences Style Guide', '/docs/')
    .setTitle('ASCE Conferences Style Guide')
    .setDescription('Pattern Library for conference microsites.')
    .init()
  ;(function () {
    //- adding pages to ConfDocs.DOCS
    ConfDocs.DOCS.getPage('visual.html')
      .addPage(new Page({ name: 'ASCE'     , url: 'visual.html#asce' }))
      .addPage(new Page({ name: 'ASCE 2016', url: 'visual.html#asce2016' }))
    ConfDocs.DOCS.getPage('obj.html')
      .addPage(new Page({ name: 'The Float Grid'     , url: 'obj.html#float-grid' }))
      .addPage(new Page({ name: 'The Runner Object'  , url: 'obj.html#runner-object' }))
      .addPage(new Page({ name: 'Constrain'          , url: 'obj.html#constrain' }))
      .addPage(new Page({ name: 'The Action List'    , url: 'obj.html#action-list' }))
      .addPage(new Page({ name: 'The Stacked List'   , url: 'obj.html#stacked-list' }))
      .addPage(new Page({ name: 'The Drawer Object'  , url: 'obj.html#drawer-object' }))
    ConfDocs.DOCS.getPage('comp.html')
      .addPage(new Page({ name: 'The Masthead and Mastfoot', url: 'comp.html#masthead-mastfoot' }))
      .addPage(new Page({ name: 'The Site Title'           , url: 'comp.html#site-title' }))
      .addPage(new Page({ name: 'The Top Menu'             , url: 'comp.html#top-menu' }))
      .addPage(new Page({ name: 'The Main Menu'            , url: 'comp.html#main-menu' }))
      .addPage(new Page({ name: 'The Sub Menu'             , url: 'comp.html#sub-menu' }))
      .addPage(new Page({ name: 'The Sitemap Component'    , url: 'comp.html#sitemap-component' }))
      .addPage(new Page({ name: 'The Page Title'           , url: 'comp.html#page-title' }))
      .addPage(new Page({ name: 'The Banner Component'     , url: 'comp.html#banner-component' }))
      .addPage(new Page({ name: 'The Hero Block'           , url: 'comp.html#hero-block' }))
      .addPage(new Page({ name: 'The Other Year Block'     , url: 'comp.html#other-year-block' }))
      .addPage(new Page({ name: 'The Overlay Component'    , url: 'comp.html#overlay-component' }))
      .addPage(new Page({ name: 'The Sponsor Logo'         , url: 'comp.html#sponsor-logo' }))
      .addPage(new Page({ name: 'The Sponsor Block'        , url: 'comp.html#sponsor-block' }))
      .addPage(new Page({ name: 'The Date Block'           , url: 'comp.html#date-block' }))
      .addPage(new Page({ name: 'The Pass Component'       , url: 'comp.html#pass-component' }))
      .addPage(new Page({ name: 'The Program Component'    , url: 'comp.html#program-component' }))
      .addPage(new Page({ name: 'The Time Block'           , url: 'comp.html#time-block' }))
      .addPage(new Page({ name: 'The Speaker Component'    , url: 'comp.html#speaker-component' }))
      .addPage(new Page({ name: 'The Social List'          , url: 'comp.html#social-list' }))
      .addPage(new Page({ name: 'The Callout Component'    , url: 'comp.html#callout-component' }))
      .addPage(new Page({ name: 'Buttons'                  , url: 'comp.html#buttons' }))
      .addPage(new Page({ name: 'The Toggle Button'        , url: 'comp.html#toggle-button' }))
      .addPage(new Page({ name: 'The Camo Link'            , url: 'comp.html#camo-link'}))
  })()

  ConfDocs.DOCS_CLASSES = {
    figure : 'docs-figure'
  , pre    : 'docs-pre'
  , code   : 'docs-code'
  }

  return ConfDocs
})()
