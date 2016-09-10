// Options and locals for compiling Pug pages.

//- ///////////////////////////////////////////////////////////////////////////////
//- //
//- // This file holds 'local' data for the default site instance.
//- // Each microsite should have its own copy of this file.
//- //
//- ///////////////////////////////////////////////////////////////////////////////


var Util               = require('../../../models/classes/Util.class.js')
  , ConfSite           = require('../../../models/classes/ConfSite.class.js')
  , Conference         = require('../../../models/classes/Conference.class.js')
  , SupporterLevel     = require('../../../models/classes/SupporterLevel.class.js')
  , Supporter          = require('../../../models/classes/Supporter.class.js')
  , Person             = require('../../../models/classes/Person.class.js')
  , RegistrationPeriod = require('../../../models/classes/RegistrationPeriod.class.js')
  , Pass               = require('../../../models/classes/Pass.class.js')
  , ProgramEvent       = require('../../../models/classes/ProgramEvent.class.js')
  , ImportantDate      = require('../../../models/classes/ImportantDate.class.js')

module.exports = Object.assign(require('../../all/models/options.js'), {
  site: (function () {
    var site = new ConfSite('An ASCE Event', '/sites/default/')
      .description('Optional Brand Tagline')
      .keywords(['ASCE', 'civil engineering', 'convention'])
      .logo('img/site-logo-white.png')
      .init()

    site
      .addConference('2016', new Conference({
        name      : 'A 2016 Event'
      , theme     : 'Theme for the conference is optional.'
      , start_date: '2016-09-28'
      , end_date  : '2016-10-01'
      , url       : 'http://2016.asceconvention.org/'
      , promo_loc : {
          text : 'Portland, OR'
        , title: 'Portland, Oregon'
        , blurb: 'With sweeping views of the surrounding mountains and a bustling \
            downtown full of shopping, locally sourced dining, and entertainment, \
            Portland is a wonderful destination for business and leisure.'
        }
      })).addConference('2015', new Conference({
        name      : 'A 2015 Event'
      , theme     : ''
      , start_date: '2015-10-11'
      , end_date  : ''
      , url       : 'http://2015.asceconvention.org/'
      , promo_loc : {
          text : 'New York, NY'
        , title: 'New York, New York'
        }
      })).addConference('2017', new Conference({
        name      : 'A 2017 Event'
      , theme     : ''
      , start_date: '2017-10-04'
      , end_date  : ''
      , url       : 'http://2017.asceconvention.org/'
      , promo_loc : {
          text : 'Charlotte, NC'
        , title: 'Charlotte, North Carolina'
        }
      }))

    site
      .currentConference('2016')
      .prevConference('2015')
      .nextConference('2017')

    site
      .addSupporterLevel(new SupporterLevel('Platinum' ).classname('c-SponsorBlock__Logo--lrg'))
      .addSupporterLevel(new SupporterLevel('Corporate').classname('c-SponsorBlock__Logo--med'))
      .addSupporterLevel(new SupporterLevel('Silver'   ).classname('c-SponsorBlock__Logo--med'))
      .addSupporterLevel(new SupporterLevel('Bronze'   ).classname('c-SponsorBlock__Logo--sml'))
      .addSupporterLevel(new SupporterLevel('Copper'   ).classname('c-SponsorBlock__Logo--sml'))

    site
      .addSupporter(new Supporter('ASCE Foundation')
        .url('http://www.ascefoundation.org/')
        .img('http://www.asceconvention.org/sites/asceconvention.org/files/sponsors/asce-foundation-logo.png')
        .level(site.getSupporterLevel('Platinum'))
      ).addSupporter(new Supporter('Bentley')
        .url('https://www.bentley.com/')
        .img('http://www.asceconvention.org/sites/asceconvention.org/files/sponsors/bentley-logo.png')
        .level(site.getSupporterLevel('Platinum'))
      ).addSupporter(new Supporter('Pennoni')
        .url('https://www.pennoni.com/')
        .img('http://www.asceconvention.org/sites/asceconvention.org/files/sponsors/pennoni-50th-anniversary-logo.png')
        .level(site.getSupporterLevel('Silver'))
      ).addSupporter(new Supporter('Innovyze')
        .url('http://www.innovyze.com/')
        .img('http://www.asceconvention.org/sites/asceconvention.org/files/sponsors/innovyze-logo.png')
        .level(site.getSupporterLevel('Silver'))
      ).addSupporter(new Supporter('Fasten Group')
        .url('http://www.chinafasten.com/')
        .img('http://www.asceconvention.org/sites/asceconvention.org/files/sponsors/fasten-group-logo.png')
        .level(site.getSupporterLevel('Bronze'))
      ).addSupporter(new Supporter('David Evans and Associates, Inc.')
        .url('http://www.deainc.com/')
        .img('http://www.asceconvention.org/sites/asceconvention.org/files/sponsors/david-evans-associates-logo.png')
        .level(site.getSupporterLevel('Bronze'))
      ).addSupporter(new Supporter('KCI Technologies')
        .url('http://www.kci.com/')
        .img('http://www.asceconvention.org/sites/asceconvention.org/files/sponsors/kci-technologies-logo.png')
        .level(site.getSupporterLevel('Bronze'))
      ).addSupporter(new Supporter('McCormick & Taylor')
        .url('http://www.mccormicktaylor.com/')
        .img('http://www.asceconvention.org/sites/asceconvention.org/files/sponsors/mccormick-taylor-logo.png')
        .level(site.getSupporterLevel('Bronze'))
      ).addSupporter(new Supporter('Rutgers Center for Advanced Infrastructure and Transportation')
        .url('http://cait.rutgers.edu/')
        .img('http://www.asceconvention.org/sites/asceconvention.org/files/sponsors/rutgers-cait-logo.png')
        .level(site.getSupporterLevel('Copper'))
      ).addSupporter(new Supporter('Kimley-Horn')
        .url('http://www.kimley-horn.com/')
        .img('http://www.asceconvention.org/sites/asceconvention.org/files/sponsors/kimley-horn-logo.png')
        .level(site.getSupporterLevel('Copper'))
      ).addSupporter(new Supporter('Christopher B. Burke Engineering, Ltd.')
        .url('http://cbbel.com/')
        .img('http://www.asceconvention.org/sites/asceconvention.org/files/sponsors/christopher-b-burke-engineering-logo.png')
        .level(site.getSupporterLevel('Copper'))
      ).addSupporter(new Supporter('Bank of America')
        .url('http://www.asce.org/member_advantages/#b')
        .img('http://www.asceconvention.org/sites/asceconvention.org/files/sponsors/bank-of-america-logo.jpg')
        .level(site.getSupporterLevel('Corporate'))
      ).addSupporter(new Supporter('Geico')
        .url('https://www.geico.com/landingpage/member-discount/?logo=00774')
        .img('http://www.asceconvention.org/sites/asceconvention.org/files/sponsors/geico-asce-convention-logo.png')
        .level(site.getSupporterLevel('Corporate'))
      ).addSupporter(new Supporter('Pearl Insurance')
        .url('http://asceinsurance.com/')
        .img('http://www.asceconvention.org/sites/asceconvention.org/files/sponsors/pearl-insurance-logo.jpg')
        .level(site.getSupporterLevel('Corporate'))
      ).addSupporter(new Supporter('UPS')
        .url('http://savewithups.com/asce/')
        .img('http://www.asceconvention.org/sites/asceconvention.org/files/sponsors/ups-logo.jpg')
        .level(site.getSupporterLevel('Corporate'))
      ).addSupporter(new Supporter('Keller North America')
        .url('http://www.keller.co.uk/')
        .img('http://www.asceconvention.org/sites/asceconvention.org/files/sponsors/keller-na-logo.png')
        .level(site.getSupporterLevel('Corporate'))
      )

    site.currentConference()
      .addRegistrationPeriod(new RegistrationPeriod({
        name      : 'Early Bird'
      , end_date  : '2016-07-28'
      }).setIcon('stars')).addRegistrationPeriod(new RegistrationPeriod({
        name      : 'Advance'
      , start_date: '2016-07-29'
      , end_date  : '2016-08-25'
      }).setIcon('date_range')).addRegistrationPeriod(new RegistrationPeriod({
        name      : 'Onsite'
      , start_date: '2016-08-26'
      }).setIcon('account_balance'))

    site.currentConference()
      .currentRegistrationPeriod('Early Bird')

    site.currentConference()
      .addPass(new Pass('Standard Pass')
        .description('Members & Non-Members')
        .addAttendeeType(new Pass.AttendeeType('Member', true))
        .addAttendeeType(new Pass.AttendeeType('Non-Member'))
        .star()
      ).addPass(new Pass('Speaker Pass')
        .description('Speakers and Presenters')
        .addAttendeeType(new Pass.AttendeeType('Member', true))
        .addAttendeeType(new Pass.AttendeeType('Non-Member'))
      ).addPass(new Pass('Moderator Pass')
        .description('Moderators')
        .addAttendeeType(new Pass.AttendeeType('Member', true))
        .addAttendeeType(new Pass.AttendeeType('Non-Member'))
      ).addPass(new Pass('Younger Member')
        .description('Members 18–35')
        .addAttendeeType(new Pass.AttendeeType('Member/Non-Member', true))
        .star()
      ).addPass(new Pass('Student Pass')
        .description('Undergraduates 18–24')
        .addAttendeeType(new Pass.AttendeeType('Member/Non-Member', true))
        .setFineprint('Full-time students must show valid <abbr title="identification">ID</abbr>\
          onsite at the registration desk when picking up name badge.')
        .star()
      ).addPass(new Pass('Guest Pass')
        .description('Speaker and Moderator Guests')
        .addAttendeeType(new Pass.AttendeeType('Member/Non-Member', true))
      ).addPass(new Pass('Daily Pass')
        .description('For One Day Only')
        .addAttendeeType(new Pass.AttendeeType('Member', true))
        .addAttendeeType(new Pass.AttendeeType('Non-Member'))
      )

    //- site.currentConference()
    //-   .setPrice('Early Bird', 'Standard Pass' , 'Member'    ,  745)
    //-   .setPrice('Early Bird', 'Standard Pass' , 'Non-Member',  845)
    //-   .setPrice('Advance'   , 'Standard Pass' , 'Member'    ,  845)
    //-   .setPrice('Advance'   , 'Standard Pass' , 'Non-Member',  945)
    //-   .setPrice('Onsite'    , 'Standard Pass' , 'Member'    ,  945)
    //-   .setPrice('Onsite'    , 'Standard Pass' , 'Non-Member', 1045)
    //-   .setPrice('Early Bird', 'Speaker Pass'  , 'Member'    ,  645)
    //-   .setPrice('Early Bird', 'Speaker Pass'  , 'Non-Member',  745)
    //-   .setPrice('Advance'   , 'Speaker Pass'  , 'Member'    ,  745)
    //-   .setPrice('Advance'   , 'Speaker Pass'  , 'Non-Member',  845)
    //-   .setPrice('Onsite'    , 'Speaker Pass'  , 'Member'    ,  945)
    //-   .setPrice('Onsite'    , 'Speaker Pass'  , 'Non-Member',  945)
    //-   .setPrice('Early Bird', 'Moderator Pass', 'Member'    ,  645)
    //-   .setPrice('Early Bird', 'Moderator Pass', 'Non-Member',  745)
    //-   .setPrice('Advance'   , 'Moderator Pass', 'Member'    ,  745)
    //-   .setPrice('Advance'   , 'Moderator Pass', 'Non-Member',  845)
    //-   .setPrice('Onsite'    , 'Moderator Pass', 'Member'    ,  945)
    //-   .setPrice('Onsite'    , 'Moderator Pass', 'Non-Member',  945)
    //-   .setPrice('Early Bird', 'Younger Member', 'Member/Non-Member',  645)
    //-   .setPrice('Advance'   , 'Younger Member', 'Member/Non-Member',  745)
    //-   .setPrice('Onsite'    , 'Younger Member', 'Member/Non-Member',  845)
    //-   .setPrice('Early Bird', 'Student Pass'  , 'Member/Non-Member',  295)
    //-   .setPrice('Advance'   , 'Student Pass'  , 'Member/Non-Member',  295)
    //-   .setPrice('Onsite'    , 'Student Pass'  , 'Member/Non-Member',  395)
    //-   .setPrice('Early Bird', 'Guest Pass'    , 'Member/Non-Member',  295)
    //-   .setPrice('Advance'   , 'Guest Pass'    , 'Member/Non-Member',  320)
    //-   .setPrice('Onsite'    , 'Guest Pass'    , 'Member/Non-Member',  395)
    //-   .setPrice('Early Bird', 'Daily Pass'    , 'Member'    ,  495)
    //-   .setPrice('Early Bird', 'Daily Pass'    , 'Non-Member',  595)
    //-   .setPrice('Advance'   , 'Daily Pass'    , 'Member'    ,  545)
    //-   .setPrice('Advance'   , 'Daily Pass'    , 'Non-Member',  645)
    //-   .setPrice('Onsite'    , 'Daily Pass'    , 'Member'    ,  645)
    //-   .setPrice('Onsite'    , 'Daily Pass'    , 'Non-Member',  745)

    site.currentConference()
      .addProgramEvent(new ProgramEvent({ start_date: '2016-09-28 10:00', end_date: '2016-09-28 19:00', name: 'Registration'                                                }))
      .addProgramEvent(new ProgramEvent({ start_date: '2016-09-28 10:30', end_date: '2016-09-28 16:30', name: 'Technical Tours'                                             }).url('#0').star())
      .addProgramEvent(new ProgramEvent({ start_date: '2016-09-28 13:00', end_date: '2016-09-28 17:00', name: 'Short Courses'                                               }).url('#0').star())
      .addProgramEvent(new ProgramEvent({ start_date: '2016-09-28 12:00', end_date: '2016-09-28 17:00', name: 'Optional Tours'                                              }).url('#0').star())
      .addProgramEvent(new ProgramEvent({ start_date: '2016-09-28 17:30', end_date: '2016-09-28 19:30', name: 'Opening Welcome Reception'                                   }))
      .addProgramEvent(new ProgramEvent({ start_date: '2016-09-28 13:00', end_date: '2016-09-28 17:00', name: 'Community Service Project'                                   }).star())

      .addProgramEvent(new ProgramEvent({ start_date: '2016-09-29 07:00', end_date: '2016-09-29 16:30', name: 'Registration'                                                }))
      .addProgramEvent(new ProgramEvent({ start_date: '2016-09-29 07:30', end_date: '2016-09-29 08:30', name: 'Student & Emerging Leaders Welcome Breakfast and Orientation'}))
      .addProgramEvent(new ProgramEvent({ start_date: '2016-09-29 08:30', end_date: '2016-09-29 10:00', name: 'Opening Plenary Session'                                     }).star())
      .addProgramEvent(new ProgramEvent({ start_date: '2016-09-29 09:30', end_date: '2016-09-29 15:30', name: 'Guest Program Orientation & Tour'                            }).star())
      .addProgramEvent(new ProgramEvent({ start_date: '2016-09-29 10:00', end_date: '2016-09-29 10:30', name: 'Beverage Break'                                              }))
      .addProgramEvent(new ProgramEvent({ start_date: '2016-09-29 10:30', end_date: '2016-09-29 11:30', name: 'Concurrent Sessions'                                         }))
      .addProgramEvent(new ProgramEvent({ start_date: '2016-09-29 11:45', end_date: '2016-09-29 13:45', name: 'Celebration of Leaders Luncheon'                             }).star())
      .addProgramEvent(new ProgramEvent({ start_date: '2016-09-29 14:00', end_date: '2016-09-29 15:30', name: 'Concurrent Sessions'                                         }))
      .addProgramEvent(new ProgramEvent({ start_date: '2016-09-29 14:00', end_date: '2016-09-29 18:00', name: 'Communities and Pavilion'                                    }))
      .addProgramEvent(new ProgramEvent({ start_date: '2016-09-29 15:30', end_date: '2016-09-29 16:00', name: 'Beverage Break'                                              }))
      .addProgramEvent(new ProgramEvent({ start_date: '2016-09-29 16:00', end_date: '2016-09-29 17:30', name: 'Concurrent Sessions'                                         }))
      .addProgramEvent(new ProgramEvent({ start_date: '2016-09-29 18:45', end_date: '2016-09-29 21:45', name: 'Optional Tour'                                               }).url('#0').star())

      .addProgramEvent(new ProgramEvent({ start_date: '2016-09-30 07:00', end_date: '2016-09-30 16:30', name: 'Registration'                                                }))
      .addProgramEvent(new ProgramEvent({ start_date: '2016-09-30 07:30', end_date: '2016-09-30 08:30', name: 'Leadership & Society Awards Breakfast'                       }))
      .addProgramEvent(new ProgramEvent({ start_date: '2016-09-30 08:30', end_date: '2016-09-30 17:00', name: 'Communities and Pavilion'                                    }))
      .addProgramEvent(new ProgramEvent({ start_date: '2016-09-30 08:45', end_date: '2016-09-30 09:45', name: 'ASCE Annual Business Meeting'                                }).star())
      .addProgramEvent(new ProgramEvent({ start_date: '2016-09-30 09:45', end_date: '2016-09-30 10:15', name: 'Beverage Break'                                              }))
      .addProgramEvent(new ProgramEvent({ start_date: '2016-09-30 10:15', end_date: '2016-09-30 11:45', name: 'Concurrent Sessions'                                         }))
      .addProgramEvent(new ProgramEvent({ start_date: '2016-09-30 11:45', end_date: '2016-09-30 13:15', name: 'Lunch on Your Own'                                           }))
      .addProgramEvent(new ProgramEvent({ start_date: '2016-09-30 11:45', end_date: '2016-09-30 13:15', name: 'International Luncheon (ticketed)'                           }))
      .addProgramEvent(new ProgramEvent({ start_date: '2016-09-30 13:15', end_date: '2016-09-30 14:15', name: 'Concurrent Sessions'                                         }))
      .addProgramEvent(new ProgramEvent({ start_date: '2016-09-30 13:00', end_date: '2016-09-30 17:15', name: 'Optional Tour'                                               }).url('#0').star())
      .addProgramEvent(new ProgramEvent({ start_date: '2016-09-30 14:30', end_date: '2016-09-30 16:00', name: 'Industry Leaders Forum'                                      }).star())
      .addProgramEvent(new ProgramEvent({ start_date: '2016-09-30 16:00', end_date: '2016-09-30 16:30', name: 'Beverage Break'                                              }))
      .addProgramEvent(new ProgramEvent({ start_date: '2016-09-30 16:30', end_date: '2016-09-30 17:30', name: 'Concurrent Sessions'                                         }))
      .addProgramEvent(new ProgramEvent({ start_date: '2016-09-30 18:30', end_date: '2016-09-30 21:30', name: 'Theater Night Out'                                           }).star())

      .addProgramEvent(new ProgramEvent({ start_date: '2016-10-01 07:00', end_date: '2016-10-01 14:30', name: 'Registration'                                                }))
      .addProgramEvent(new ProgramEvent({ start_date: '2016-10-01 07:30', end_date: '2016-10-01 08:15', name: 'Order of the Engineer Ceremony'                              }).star())
      .addProgramEvent(new ProgramEvent({ start_date: '2016-10-01 08:45', end_date: '2016-10-01 11:45', name: 'Optional Tour'                                               }).url('#0'))
      .addProgramEvent(new ProgramEvent({ start_date: '2016-10-01 08:30', end_date: '2016-10-01 10:00', name: 'Concurrent Sessions'                                         }))
      .addProgramEvent(new ProgramEvent({ start_date: '2016-10-01 08:30', end_date: '2016-10-01 14:00', name: 'Communities and Pavilion'                                    }))
      .addProgramEvent(new ProgramEvent({ start_date: '2016-10-01 10:15', end_date: '2016-10-01 11:45', name: 'Concurrent Sessions'                                         }))
      .addProgramEvent(new ProgramEvent({ start_date: '2016-10-01 12:00', end_date: '2016-10-01 14:00', name: 'ASCE Luncheon & Closing General Session'                     }).star())
      .addProgramEvent(new ProgramEvent({ start_date: '2016-10-01 14:30', end_date: '2016-10-01 17:30', name: 'Technical Tours'                                             }).url('#0'))

    site.currentConference()
      .addVenue('Conference Venue', {
        name           : 'Oregon Convention Center'
      , streetAddress  : '777 NE Martin Luther King, Jr. Blvd.'
      , addressLocality: 'Portland'
      , addressRegion  : 'OR'
      , postalCode     : '97232'
      , url            : 'https://www.oregoncc.org/'
      }).addVenue('Official Hotel', {
        name           : 'DoubleTree by Hilton Portland'
      , streetAddress  : '1000 NE Multnomah St'
      , addressLocality: 'Portland'
      , addressRegion  : 'OR'
      , postalCode     : '97232'
      }).addVenue('Overflows', {
        name           : 'Courtyard Portland City Center'
      , streetAddress  : '550 SW Oak St'
      , addressLocality: 'Portland'
      , addressRegion  : 'OR'
      , postalCode     : '97204'
      })

    site.currentConference()
      .conferenceVenue('Conference Venue')

    site.currentConference()
      .addSpeaker(new Person('donna-fulman', {
          given_name      : 'Donna'
        , family_name     : 'Fulman'
        , honorific_suffix: 'P.ASCE'
      }).jobTitle('Administrator of Interior Engineering')
        .affiliation('German Chamber of Architects')
        .img('img/headshot1.jpg')
        .email('example@asce.org')
        .phone('+1(703)555-5555')
        .url('#0')
        .addSocial('linkedin', 'https://www.linkedin.com/groups/143956/profile')
        .addSocial('twitter', Util.SOCIAL_DATA.twitter.toURL('@ASCETweets'), '@ASCETweets')
        .setBio('<p>Donna Fulman is an award-winning, German designer raised in Austria\
          and currently living in New York City.</p>\
          <p>Former Lead Product Designer and Art Director at Spotify, she recently founded\
          Semplice and at the same time serves on the\
          <abbr title="American Institute of Graphic Arts">AIGA</abbr>\
          Board of Directors in New York.</p>')
      )

    site.currentConference()
      .addImportantDate(new ImportantDate({start_time:'2015-10-12', name:'Optional Final Papers Due'     }))
      .addImportantDate(new ImportantDate({start_time:'2015-12-17', name:'Early-Bird Registration Closes'}).url('registration.html'))
      .addImportantDate(new ImportantDate({start_time:'2016-01-12', name:'Advance Registration Closes'   }).url('registration.html'))
      .addImportantDate(new ImportantDate({start_time:'2016-06-12', name:'Convention Begins'             }))
      .addImportantDate(new ImportantDate({start_time:'2016-06-15', name:'Convention Ends'               }).hide())

    site.currentConference()
      .addChair(new Person('thomas-mccollough', {
          given_name      : 'Thomas'
        , additional_name : 'J.'
        , family_name     : 'McCollough'
        , honorific_suffix: 'P.E., M.ASCE'
      })).addChair(new Person('stephen-dickenson', {
          given_name      : 'Stephen'
        , additional_name : 'E.'
        , family_name     : 'Dickenson'
        , honorific_suffix: 'Ph.D., P.E., D.PE, M.ASCE'
      }))

    var rawdata = {
      comment: 'this is draft data that I don’t want to delete yet'
    , pass: {
        standard: {
          name: 'Standard Pass'
        , description: 'Members & Non-Members'
        , periods: [
            {
              name: 'Early Bird'
            , memberships: [
                { name: 'Member', price: 745, is_featured: true }
              , { name: 'Non-Member', price: 845 }
              ]
            }
          , {
              name: 'Advance'
            , memberships: [
                { name: 'Member', price: 845, is_featured: true }
              , { name: 'Non-Member', price: 945 }
              ]
            }
          , {
              name: 'Onsite'
            , memberships: [
                { name: 'Member', price: 945, is_featured: true }
              , { name: 'Non-Member', price: 1045 }
              ]
            }
          ]
        }
      , speaker: {
          name: 'Speaker Pass'
        , description: 'Speakers and Presenters'
        , periods: [
            {
              name: 'Early Bird'
            , memberships: [
                { name: 'Member', price: 645, is_featured: true }
              , { name: 'Non-Member', price: 745 }
              ]
            }
          , {
              name: 'Advance'
            , memberships: [
                { name: 'Member', price: 745, is_featured: true }
              , { name: 'Non-Member', price: 845 }
              ]
            }
          , {
              name: 'Onsite'
            , memberships: [
                { name: 'Member', price: 945, is_featured: true }
              , { name: 'Non-Member', price: 945 }
              ]
            }
          ]
        }
      , moderator: {
          name: 'Moderator Pass'
        , description: 'Moderators'
        , periods: [
            {
              name: 'Early Bird'
            , memberships: [
                { name: 'Member', price: 645, is_featured: true }
              , { name: 'Non-Member', price: 745 }
              ]
            }
          , {
              name: 'Advance'
            , memberships: [
                { name: 'Member', price: 745, is_featured: true }
              , { name: 'Non-Member', price: 845 }
              ]
            }
          , {
              name: 'Onsite'
            , memberships: [
                { name: 'Member', price: 845, is_featured: true }
              , { name: 'Non-Member', price: 945 }
              ]
            }
          ]
        }
      , ym: {
          name: 'Younger Member'
        , description: 'Members 18–35'
        , periods: [
            {
              name: 'Early Bird'
            , memberships: [
                { name: 'Member/Non-Member', price: 645, is_featured: true }
              ]
            }
          , {
              name: 'Advance'
            , memberships: [
                { name: 'Member/Non-Member', price: 745, is_featured: true }
              ]
            }
          , {
              name: 'Onsite'
            , memberships: [
                { name: 'Member/Non-Member', price: 845, is_featured: true }
              ]
            }
          ]
        }
      , student: {
          name: 'Student Pass'
        , description: 'Undergraduates 18–24'
        , fineprint: true
        , periods: [
            {
              name: 'Early Bird'
            , memberships: [
                { name: 'Member/Non-Member', price: 295, is_featured: true }
              ]
            }
          , {
              name: 'Advance'
            , memberships: [
                { name: 'Member/Non-Member', price: 295, is_featured: true }
              ]
            }
          , {
              name: 'Onsite'
            , memberships: [
                { name: 'Member/Non-Member', price: 395, is_featured: true }
              ]
            }
          ]
        }
      , guest: {
          name: 'Guest Pass'
        , description: 'Speaker and Moderator Guests'
        , periods: [
            {
              name: 'Early Bird'
            , memberships: [
                { name: 'Member/Non-Member', price: 295, is_featured: true }
              ]
            }
          , {
              name: 'Advance'
            , memberships: [
                { name: 'Member/Non-Member', price: 320, is_featured: true }
              ]
            }
          , {
              name: 'Onsite'
            , memberships: [
                { name: 'Member/Non-Member', price: 395, is_featured: true }
              ]
            }
          ]
        }
      , daily: {
          name: 'Daily Pass'
        , description: 'For One Day Only'
        , periods: [
            {
              name: 'Early Bird'
            , memberships: [
                { name: 'Member', price: 495, is_featured: true }
              , { name: 'Non-Member', price: 595 }
              ]
            }
          , {
              name: 'Advance'
            , memberships: [
                { name: 'Member', price: 545, is_featured: true }
              , { name: 'Non-Member', price: 645 }
              ]
            }
          , {
              name: 'Onsite'
            , memberships: [
                { name: 'Member', price: 645, is_featured: true }
              , { name: 'Non-Member', price: 745 }
              ]
            }
          ]
        }
      }
    }

    site.getConference('2015')
      .setOtherYearBlurb('Access the 2015 program to see which sessions qualify for \
        <abbr title="professional development hours">PDH</abbr>s and other documentation.')
      .addVenue('Conference Venue', {
        name           : 'New York Marriott Marquis'
      , streetAddress  : '1535 Broadway'
      , addressLocality: 'New York'
      , addressRegion  : 'NY'
      , postalCode     : '10036'
      , url            : 'http://www.marriott.com/hotels/travel/nycmq-new-york-marriott-marquis/'
      })

    site.getConference('2017')
      .setOtherYearBlurb('Plan ahead to attend, sponsor, or exhibit at the annual convention \
        for civil engineering professionals.')
      .addVenue('Conference Venue', {
        name           : 'Westin Charlotte'
      , streetAddress  : '601 South College Street'
      , addressLocality: 'Charlotte'
      , addressRegion  : 'NC'
      , postalCode     : '28202'
      , telephone      : '+1-866-837-4148'
      , url            : 'http://www.westincharlottehotel.com/'
      })

    //- site
    //-   .addSubpage('about.html'       , new ConfPage({name:'Cooperating Orgs'            , url:''}))
    //-   .addSubpage('about.html'       , new ConfPage({name:'Partnering Orgs '            , url:''}))
    //-   .addSubpage('about.html'       , new ConfPage({name:'Volunteer'                   , url:''}))
    //-   .addSubpage('about.html'       , new ConfPage({name:'Why Attend'                  , url:''}))
    //-   .addSubpage('registration.html', new ConfPage({name:'Why Attend'                  , url:''}))
    //-   .addSubpage('registration.html', new ConfPage({name:'Short Courses'               , url:''}))
    //-   .addSubpage('registration.html', new ConfPage({name:'Technical Tours'             , url:''}))
    //-   .addSubpage('registration.html', new ConfPage({name:'Optional Tours'              , url:''}))
    //-   .addSubpage('program.html'     , new ConfPage({name:'Events'                      , url:''}))
    //-   .addSubpage('location.html'    , new ConfPage({name:'International Travel'        , url:''}))
    //-   .addSubpage('speakers.html'    , new ConfPage({name:'Distinguished Lecture Series', url:''}))
    //-   .addSubpage('speakers.html'    , new ConfPage({name:'Exhibitor List'              , url:''}))

    return site
  })()
})
