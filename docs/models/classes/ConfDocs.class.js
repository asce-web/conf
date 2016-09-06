var Page = require('sitepage').Page
  , StyleGuide = require('sitepage').StyleGuide

module.exports = (function () {
  //- CONSTRUCTOR
  function ConfDocs() {}

  //- METHODS

  //- STATIC MEMBERS
  ConfDocs.DOCS = new StyleGuide('ASCE Conferences Style Guide', '/docs/')
    .title('ASCE Conferences Style Guide')
    .description('Pattern Library for conference microsites.')
    .init()
  ;(function () {
    //- adding pages to ConfDocs.DOCS
    ConfDocs.DOCS.find('visual.html')
      .add(new Page({ name: 'ASCE'     , url: 'visual.html#asce' }))
      .add(new Page({ name: 'ASCE 2016', url: 'visual.html#asce2016' }))
    ConfDocs.DOCS.find('obj.html')
      .add(new Page({ name: 'The Float Grid'     , url: 'obj.html#float-grid' }))
      .add(new Page({ name: 'The Runner Object'  , url: 'obj.html#runner-object' }))
      .add(new Page({ name: 'Constrain'          , url: 'obj.html#constrain' }))
      .add(new Page({ name: 'The Action List'    , url: 'obj.html#action-list' }))
      .add(new Page({ name: 'The Stacked List'   , url: 'obj.html#stacked-list' }))
      .add(new Page({ name: 'The Drawer Object'  , url: 'obj.html#drawer-object' }))
    ConfDocs.DOCS.find('comp.html')
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
  })()

  // REVIEW may not need this with new xmeter
  ConfDocs.DOCS_CLASSES = {
    figure : 'docs-figure'
  , pre    : 'docs-pre'
  , code   : 'docs-code'
  }

  return ConfDocs
})()
