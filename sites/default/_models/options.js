// Options and locals for compiling Pug pages.

//- ///////////////////////////////////////////////////////////////////////////////
//- //
//- // This file holds 'local' data for the default site instance.
//- // Each microsite should have its own copy of this file.
//- //
//- ///////////////////////////////////////////////////////////////////////////////


var Color              = require('csscolor').Color
var Util               = require('../../../_models/Util.class.js')
var ConfSite           = require('../../../_models/ConfSite.class.js')
var ConfPage           = require('../../../_models/ConfPage.class.js')
var Conference         = require('../../../_models/Conference.class.js')
var SupporterLevel     = require('../../../_models/SupporterLevel.class.js')
var Supporter          = require('../../../_models/Supporter.class.js')
var Person             = require('../../../_models/Person.class.js')
var Place              = require('../../../_models/Place.class.js')
var RegistrationPeriod = require('../../../_models/RegistrationPeriod.class.js')
var Pass               = require('../../../_models/Pass.class.js')
var Session            = require('../../../_models/Session.class.js')
var ImportantDate      = require('../../../_models/ImportantDate.class.js')

module.exports = Object.assign(require('../../all/_models/options.js'), {
  site: (function () {
    var site = new ConfSite('An ASCE Event', '/sites/default/', 'Optional Brand Tagline')
      .keywords(['ASCE', 'civil engineering', 'convention'])
      .logo('img/site-logo-white.png')
      .colors(Color.fromString('#3fae2a'), Color.fromString('#00a1e1'))
      .init()

    site
      .addConference('2016', new Conference({
        name      : 'A 2016 Event'
      , theme     : 'Theme for the conference is optional.'
      , start_date: new Date('2016-09-28')
      , end_date  : new Date('2016-10-01')
      , url       : 'http://2016.asceconvention.org/'
      , promo_loc : {
          text : 'Portland, OR'
        , title: 'Portland, Oregon'
        , blurb: 'With sweeping views of the surrounding mountains and a bustling \
            downtown full of shopping, locally sourced dining, and entertainment, \
            Portland is a wonderful destination for business and leisure.'
        }
      }))
      .addConference('2015', new Conference({
        name      : 'A 2015 Event'
      , theme     : ''
      , start_date: new Date('2015-10-11')
      , end_date  : new Date('2015-10-14')
      , url       : 'http://2015.asceconvention.org/'
      , promo_loc : {
          text : 'New York, NY'
        , title: 'New York, New York'
        }
      })
        .otherYearBlurb('Access the 2015 program to see which sessions qualify for \
          PDHs and other documentation.')
        .addVenue('Conference Venue', new Place('New York Marriott Marquis', {
          street_address  : '1535 Broadway'
        , address_locality: 'New York'
        , address_region  : 'NY'
        , postal_code     : '10036'
        , url             : 'http://www.marriott.com/hotels/travel/nycmq-new-york-marriott-marquis/'
        }))
      )
      .addConference('2017', new Conference({
        name      : 'A 2017 Event'
      , theme     : ''
      , start_date: new Date('2017-10-08')
      , end_date  : new Date('2017-10-11')
      , url       : 'http://2017.asceconvention.org/'
      , promo_loc : {
          text : 'New Orleans, LA'
        , title: 'New Orleans, Louisiana'
        }
      })
        .otherYearBlurb('Plan ahead to attend, sponsor, or exhibit at the annual convention \
          for civil engineering professionals.')
        .addVenue('Conference Venue', new Place('New Orleans Mariott', {
          street_address  : '555 Canal Street'
        , address_locality: 'New Orleans'
        , address_region  : 'LA'
        , postal_code     : '70130'
        }))
      )

    site
      .currentConference('2016')
      .prevConference('2015')
      .nextConference('2017')

    site
      .addSupporterLevel(new SupporterLevel('Platinum' ).size('lrg'))
      .addSupporterLevel(new SupporterLevel('Corporate').size('med'))
      .addSupporterLevel(new SupporterLevel('Silver'   ).size('med'))
      .addSupporterLevel(new SupporterLevel('Bronze'   ).size('sml'))
      .addSupporterLevel(new SupporterLevel('Copper'   ).size('sml'))
      .addSupporterLevel(new SupporterLevel('Charter Members').size('lrg'))
      .addSupporterLevel(new SupporterLevel('Cooperating Organizations').size('lrg'))

    site
      .addSupporterLevelList('Sponsors', ['Platinum', 'Corporate', 'Silver', 'Bronze', 'Copper'])
      .addSupporterLevelList('Orgs', ['Charter Members', 'Cooperating Organizations'])

    site
      .addSupporter(new Supporter('ASCE Foundation')
        .url('http://www.ascefoundation.org/')
        .img('http://www.asceconvention.org/sites/asceconvention.org/files/sponsors/asce-foundation-logo.png')
        .level('Platinum')
      )
      .addSupporter(new Supporter('Bentley')
        .url('https://www.bentley.com/')
        .img('http://www.asceconvention.org/sites/asceconvention.org/files/sponsors/bentley-logo.png')
        .level('Platinum')
      )
      .addSupporter(new Supporter('Pennoni')
        .url('https://www.pennoni.com/')
        .img('http://www.asceconvention.org/sites/asceconvention.org/files/sponsors/pennoni-50th-anniversary-logo.png')
        .level('Silver')
      )
      .addSupporter(new Supporter('Innovyze')
        .url('http://www.innovyze.com/')
        .img('http://www.asceconvention.org/sites/asceconvention.org/files/sponsors/innovyze-logo.png')
        .level('Silver')
      )
      .addSupporter(new Supporter('Fasten Group')
        .url('http://www.chinafasten.com/')
        .img('http://www.asceconvention.org/sites/asceconvention.org/files/sponsors/fasten-group-logo.png')
        .level('Bronze')
      )
      .addSupporter(new Supporter('David Evans and Associates, Inc.')
        .url('http://www.deainc.com/')
        .img('http://www.asceconvention.org/sites/asceconvention.org/files/sponsors/david-evans-associates-logo.png')
        .level('Bronze')
      )
      .addSupporter(new Supporter('KCI Technologies')
        .url('http://www.kci.com/')
        .img('http://www.asceconvention.org/sites/asceconvention.org/files/sponsors/kci-technologies-logo.png')
        .level('Bronze')
      )
      .addSupporter(new Supporter('McCormick & Taylor')
        .url('http://www.mccormicktaylor.com/')
        .img('http://www.asceconvention.org/sites/asceconvention.org/files/sponsors/mccormick-taylor-logo.png')
        .level('Bronze')
      )
      .addSupporter(new Supporter('Rutgers Center for Advanced Infrastructure and Transportation')
        .url('http://cait.rutgers.edu/')
        .img('http://www.asceconvention.org/sites/asceconvention.org/files/sponsors/rutgers-cait-logo.png')
        .level('Copper')
      )
      .addSupporter(new Supporter('Kimley-Horn')
        .url('http://www.kimley-horn.com/')
        .img('http://www.asceconvention.org/sites/asceconvention.org/files/sponsors/kimley-horn-logo.png')
        .level('Copper')
      )
      .addSupporter(new Supporter('Christopher B. Burke Engineering, Ltd.')
        .url('http://cbbel.com/')
        .img('http://www.asceconvention.org/sites/asceconvention.org/files/sponsors/christopher-b-burke-engineering-logo.png')
        .level('Copper')
      )
      .addSupporter(new Supporter('Bank of America')
        .url('http://www.asce.org/member_advantages/#b')
        .img('http://www.asceconvention.org/sites/asceconvention.org/files/sponsors/bank-of-america-logo.jpg')
        .level('Corporate')
      )
      .addSupporter(new Supporter('Geico')
        .url('https://www.geico.com/landingpage/member-discount/?logo=00774')
        .img('http://www.asceconvention.org/sites/asceconvention.org/files/sponsors/geico-asce-convention-logo.png')
        .level('Corporate')
      )
      .addSupporter(new Supporter('Pearl Insurance')
        .url('http://asceinsurance.com/')
        .img('http://www.asceconvention.org/sites/asceconvention.org/files/sponsors/pearl-insurance-logo.jpg')
        .level('Corporate')
      )
      .addSupporter(new Supporter('UPS')
        .url('http://savewithups.com/asce/')
        .img('http://www.asceconvention.org/sites/asceconvention.org/files/sponsors/ups-logo.jpg')
        .level('Corporate')
      )
      .addSupporter(new Supporter('Keller North America')
        .url('http://www.keller.co.uk/')
        .img('http://www.asceconvention.org/sites/asceconvention.org/files/sponsors/keller-na-logo.png')
        .level('Corporate')
      )
      .addSupporter(new Supporter('American Cast Iron Pipe Company')
        .url('http://www.american-usa.com/')
        .img('http://stage.pipelinesconference.org/sites/pipelinesconference.org/files/sponsors/american-cast-iron-pipe-company-logo.png')
        .level('Charter Members')
      )
      .addSupporter(new Supporter('Cardno')
        .url('http://www.cardno.com/en-us/Pages/Home.aspx')
        .img('http://stage.pipelinesconference.org/sites/pipelinesconference.org/files/sponsors/cardno-logo.png')
        .level('Charter Members')
      )
      .addSupporter(new Supporter('Innovyze')
        .url('http://innovyze.com/')
        .img('http://stage.pipelinesconference.org/sites/pipelinesconference.org/files/sponsors/innovyze-logo.png')
        .level('Charter Members')
      )
      .addSupporter(new Supporter('Plastics Pipe Institute')
        .url('http://plasticpipe.org/')
        .img('http://stage.pipelinesconference.org/sites/pipelinesconference.org/files/sponsors/plastics-pipe-institute-logo.png')
        .level('Charter Members')
      )
      .addSupporter(new Supporter('Pure Technologies')
        .url('https://www.puretechltd.com/')
        .img('http://stage.pipelinesconference.org/sites/pipelinesconference.org/files/sponsors/pure-technologies-logo.png')
        .level('Charter Members')
      )
      .addSupporter(new Supporter('Structural Technologies')
        .url('http://www.structuraltechnologies.com/')
        .img('http://stage.pipelinesconference.org/sites/pipelinesconference.org/files/sponsors/structural-technologies-logo.png')
        .level('Charter Members')
      )
      .addSupporter(new Supporter('GIEES')
        .url('http://giees.org/')
        .img('http://stage.pipelinesconference.org/sites/pipelinesconference.org/files/sponsors/giees-coop-logo.png')
        .level('Cooperating Organizations')
      )

    site.currentConference()
      .addRegistrationPeriod(new RegistrationPeriod({name:'Early Bird',                                    end_date: new Date('2016-07-28')}).setIcon('stars'))
      .addRegistrationPeriod(new RegistrationPeriod({name:'Advance'   , start_date:new Date('2016-07-29'), end_date: new Date('2016-08-25')}).setIcon('date_range'))
      .addRegistrationPeriod(new RegistrationPeriod({name:'Onsite'    , start_date:new Date('2016-08-26')                                  }).setIcon('account_balance'))

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
        .fineprint('Full-time students must show valid ID\
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
      .addSession(new Session({start_date:new Date('2016-09-28 10:00'), end_date:new Date('2016-09-28 19:00'), name: 'Registration'                           }))
      .addSession(new Session({start_date:new Date('2016-09-28 10:30'), end_date:new Date('2016-09-28 16:30'), name: 'Technical Tours'                        }).url('#0').star())
      .addSession(new Session({start_date:new Date('2016-09-28 13:00'), end_date:new Date('2016-09-28 17:00'), name: 'Short Courses'                          }).url('#0').star())
      .addSession(new Session({start_date:new Date('2016-09-28 12:00'), end_date:new Date('2016-09-28 17:00'), name: 'Optional Tours'                         }).url('#0').star())
      .addSession(new Session({start_date:new Date('2016-09-28 17:30'), end_date:new Date('2016-09-28 19:30'), name: 'Opening Welcome Reception'              }))
      .addSession(new Session({start_date:new Date('2016-09-28 13:00'), end_date:new Date('2016-09-28 17:00'), name: 'Community Service Project'              }))

      .addSession(new Session({start_date:new Date('2016-09-29 07:00'), end_date:new Date('2016-09-29 16:30'), name: 'Registration'                           }))
      .addSession(new Session({start_date:new Date('2016-09-29 07:30'), end_date:new Date('2016-09-29 08:30'), name: 'Student & Emerging Leaders Welcome'     }))
      .addSession(new Session({start_date:new Date('2016-09-29 08:30'), end_date:new Date('2016-09-29 10:00'), name: 'Opening Plenary Session'                }).star())
      .addSession(new Session({start_date:new Date('2016-09-29 09:30'), end_date:new Date('2016-09-29 15:30'), name: 'Guest Program Orientation & Tour'       }).star())
      .addSession(new Session({start_date:new Date('2016-09-29 10:00'), end_date:new Date('2016-09-29 10:30'), name: 'Beverage Break'                         }))
      .addSession(new Session({start_date:new Date('2016-09-29 10:30'), end_date:new Date('2016-09-29 11:30'), name: 'Concurrent Sessions'                    }))
      .addSession(new Session({start_date:new Date('2016-09-29 11:45'), end_date:new Date('2016-09-29 13:45'), name: 'Celebration of Leaders Luncheon'        }).star())
      .addSession(new Session({start_date:new Date('2016-09-29 14:00'), end_date:new Date('2016-09-29 15:30'), name: 'Concurrent Sessions'                    }))
      .addSession(new Session({start_date:new Date('2016-09-29 14:00'), end_date:new Date('2016-09-29 18:00'), name: 'Communities and Pavilion'               }))
      .addSession(new Session({start_date:new Date('2016-09-29 15:30'), end_date:new Date('2016-09-29 16:00'), name: 'Beverage Break'                         }))
      .addSession(new Session({start_date:new Date('2016-09-29 16:00'), end_date:new Date('2016-09-29 17:30'), name: 'Concurrent Sessions'                    }))
      .addSession(new Session({start_date:new Date('2016-09-29 18:45'), end_date:new Date('2016-09-29 21:45'), name: 'Optional Tour'                          }).url('#0').star())

      .addSession(new Session({start_date:new Date('2016-09-30 07:00'), end_date:new Date('2016-09-30 16:30'), name: 'Registration'                           }))
      .addSession(new Session({start_date:new Date('2016-09-30 07:30'), end_date:new Date('2016-09-30 08:30'), name: 'Leadership & Society Awards Breakfast'  }))
      .addSession(new Session({start_date:new Date('2016-09-30 08:30'), end_date:new Date('2016-09-30 17:00'), name: 'Communities and Pavilion'               }))
      .addSession(new Session({start_date:new Date('2016-09-30 08:45'), end_date:new Date('2016-09-30 09:45'), name: 'ASCE Annual Business Meeting'           }).star())
      .addSession(new Session({start_date:new Date('2016-09-30 09:45'), end_date:new Date('2016-09-30 10:15'), name: 'Beverage Break'                         }))
      .addSession(new Session({start_date:new Date('2016-09-30 10:15'), end_date:new Date('2016-09-30 11:45'), name: 'Concurrent Sessions'                    }))
      .addSession(new Session({start_date:new Date('2016-09-30 11:45'), end_date:new Date('2016-09-30 13:15'), name: 'Lunch on Your Own'                      }))
      .addSession(new Session({start_date:new Date('2016-09-30 11:45'), end_date:new Date('2016-09-30 13:15'), name: 'International Luncheon (ticketed)'      }))
      .addSession(new Session({start_date:new Date('2016-09-30 13:15'), end_date:new Date('2016-09-30 14:15'), name: 'Concurrent Sessions'                    }))
      .addSession(new Session({start_date:new Date('2016-09-30 13:00'), end_date:new Date('2016-09-30 17:15'), name: 'Optional Tour'                          }).url('#0').star())
      .addSession(new Session({start_date:new Date('2016-09-30 14:30'), end_date:new Date('2016-09-30 16:00'), name: 'Industry Leaders Forum'                 }).star())
      .addSession(new Session({start_date:new Date('2016-09-30 16:00'), end_date:new Date('2016-09-30 16:30'), name: 'Beverage Break'                         }))
      .addSession(new Session({start_date:new Date('2016-09-30 16:30'), end_date:new Date('2016-09-30 17:30'), name: 'Concurrent Sessions'                    }))
      .addSession(new Session({start_date:new Date('2016-09-30 18:30'), end_date:new Date('2016-09-30 21:30'), name: 'Theater Night Out'                      }).star())

      .addSession(new Session({start_date:new Date('2016-10-01 07:00'), end_date:new Date('2016-10-01 14:30'), name: 'Registration'                           }))
      .addSession(new Session({start_date:new Date('2016-10-01 07:30'), end_date:new Date('2016-10-01 08:15'), name: 'Order of the Engineer Ceremony'         }).star())
      .addSession(new Session({start_date:new Date('2016-10-01 08:45'), end_date:new Date('2016-10-01 11:45'), name: 'Optional Tour'                          }).url('#0'))
      .addSession(new Session({start_date:new Date('2016-10-01 08:30'), end_date:new Date('2016-10-01 10:00'), name: 'Concurrent Sessions'                    }))
      .addSession(new Session({start_date:new Date('2016-10-01 08:30'), end_date:new Date('2016-10-01 14:00'), name: 'Communities and Pavilion'               }))
      .addSession(new Session({start_date:new Date('2016-10-01 10:15'), end_date:new Date('2016-10-01 11:45'), name: 'Concurrent Sessions'                    }))
      .addSession(new Session({start_date:new Date('2016-10-01 12:00'), end_date:new Date('2016-10-01 14:00'), name: 'ASCE Luncheon & Closing General Session'}).star())
      .addSession(new Session({start_date:new Date('2016-10-01 14:30'), end_date:new Date('2016-10-01 17:30'), name: 'Technical Tours'                        }).url('#0'))

    site.currentConference()
      .addVenue('Conference Venue', new Place('Oregon Convention Center', {
        street_address  : '777 NE Martin Luther King, Jr. Blvd.'
      , address_locality: 'Portland'
      , address_region  : 'OR'
      , postal_code     : '97232'
      , url             : 'https://www.oregoncc.org/'
      })).addVenue('Official Hotel', new Place('DoubleTree by Hilton Portland', {
        street_address  : '1000 NE Multnomah St'
      , address_locality: 'Portland'
      , address_region  : 'OR'
      , postal_code     : '97232'
      })).addVenue('Overflows', new Place('Courtyard Portland City Center', {
        street_address  : '550 SW Oak St'
      , address_locality: 'Portland'
      , address_region  : 'OR'
      , postal_code     : '97204'
      }))

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
        .addSocial('linkedin', '#0', 'Connect with Donna on LinkedIn')
        .addSocial('twitter', '#0', 'Follow @Donna on Twitter')
        .addSocial('facebook', '#0', 'Donna’s Facebook Profile')
        .addSocial('google', '#0', 'Donna’s Google+ Profile')
        .addSocial('youtube', '#0', 'Donna’s YouTube Channel')
        .setBio('<p>Donna Fulman is an award-winning, German designer raised in Austria\
          and currently living in New York City.</p>\
          <p>Former Lead Product Designer and Art Director at Spotify, she recently founded\
          Semplice and at the same time serves on the\
          <abbr title="American Institute of Graphic Arts">AIGA</abbr>\
          Board of Directors in New York.</p>')
        .star()
      )

    site.currentConference()
      .addImportantDate(new ImportantDate({start_time:new Date('2015-10-12'), name:'Optional Final Papers Due'     }).star())
      .addImportantDate(new ImportantDate({start_time:new Date('2015-12-17'), name:'Early-Bird Registration Closes'}).star().url('registration.html'))
      .addImportantDate(new ImportantDate({start_time:new Date('2016-01-12'), name:'Advance Registration Closes'   }).star().url('registration.html'))
      .addImportantDate(new ImportantDate({start_time:new Date('2016-06-12'), name:'Convention Begins'             }).star())
      .addImportantDate(new ImportantDate({start_time:new Date('2016-06-15'), name:'Convention Ends'               }))

    site.currentConference()
      .addOrganizer(new Person('thomas-mccollough', {
          given_name      : 'Thomas'
        , additional_name : 'J.'
        , family_name     : 'McCollough'
        , honorific_suffix: 'P.E., M.ASCE'
      }).affiliation('HDR Engineering, Inc.')
      ).addOrganizer(new Person('stephen-dickenson', {
          given_name      : 'Stephen'
        , additional_name : 'E.'
        , family_name     : 'Dickenson'
        , honorific_prefix: 'Dr.'
        , honorific_suffix: 'Ph.D., P.E., D.PE, M.ASCE'
      }).affiliation('HNTB Corporation'))

    site.currentConference()
      .addSocial('twitter', 'https://twitter.com/hashtag/#asce2016', 'Follow #ASCE2016 on Twitter')
      .addSocial('google', '#0', 'Follow #ASCE2016 on Google+')
      .addSocial('facebook', '#0', 'Follow #ASCE2016 on Facebook')

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

    site.find('sponsor.html')
      .add(new ConfPage('Partnering Orgs', '#0')
        .title(function () { return this.name() + ' | ' + site.name() })
        .description('Partnering Organizations at ' + site.name() + '.')
      )
      .add(new ConfPage('Cooperating Orgs', '#0')
        .title(function () { return this.name() + ' | ' + site.name() })
        .description('Cooperating Organizations at ' + site.name() + '.')
      )
    site.find('exhibit.html')
      .add(new ConfPage('Exhibitor List', '#0')
        .title(function () { return this.name() + ' | ' + site.name() })
        .description('Listing of all Exhibitors at ' + site.name() + '.')
      )
    site.find('registration.html')
      .add(new ConfPage('Why Attend', '#0')
        .title(function () { return this.name() + ' | ' + site.currentConference().name() })
        .description('Why you should attend ' + site.currentConference().name() + '.')
      )
      .add(new ConfPage('Volunteer', '#0')
        .title(function () { return this.name() + ' | ' + site.currentConference().name() })
        .description('Volunteer at ' + site.currentConference().name() + '.')
      )
    site.find('program.html')
      .add(new ConfPage('Short Courses', '#0')
        .title(function () { return this.name() + ' | ' + site.currentConference().name() })
        .description('Short Courses for ' + site.currentConference().name() + '.')
      )
      .add(new ConfPage('Technical Tours', '#0')
        .title(function () { return this.name() + ' | ' + site.currentConference().name() })
        .description('Technical Tours for ' + site.currentConference().name() + '.')
      )
      .add(new ConfPage('Optional Tours', '#0')
        .title(function () { return this.name() + ' | ' + site.currentConference().name() })
        .description('Optional Tours for ' + site.currentConference().name() + '.')
      )
    site.find('speakers.html')
      .add(new ConfPage('Distinguished Lecturers', '#0')
        .title(function () { return this.name() + ' | ' + site.currentConference().name() })
        .description('Distinguished lecturers at ' + site.currentConference().name() + '.')
      )

    return site
  })()
})
