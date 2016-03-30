var PageInfo = PageInfo || {};
var Auth = Auth || {};
var Sidebar = Sidebar || {};

var Nav = {
  controller: function() {
    var ctrl = this;

    ctrl.pageTitle = 'SomethingBig';

    ctrl.currentLocation = '';

    // ctrl.currentUserLoggedIn = !!Auth.isAuth();

    var TOP_STORIES_STR = 'Top Stories';
    var CREATE_STORY_STR = 'Create Story';
    var LIBRARY_STR = 'Library';

    ctrl.logout = function () {
      var token = localStorage.getItem('sessiontoken');
      ctrl.currentUserLoggedIn = false;
      Auth.logout(token)
      .catch(function (error) {
        console.log('incoming error', error);
      });
    };

    ctrl.setPageTitle = function() {
      var state = m.route();
      var endpoint = state.split('/')[1];
      switch (endpoint) {
      case '':
        return TOP_STORIES_STR;
      case 'createStory':
        return CREATE_STORY_STR;
      case 'library':
        return LIBRARY_STR;
      default:
        return PageInfo.title;
      }
    };

    ctrl.isCreateStoryPage = function() {
      return (ctrl.pageTitle == CREATE_STORY_STR);
    };

    ctrl.isLibraryPage = function() {
      return (ctrl.pageTitle == LIBRARY_STR);
    };  

    // ctrl.$watch(ctrl.setPageTitle, function(newTitle) {
    //   if (newTitle !== ctrl.pageTitle) {
    //     ctrl.pageTitle = newTitle;
    //   }
    // });
  },
  view: function(ctrl) {
    return m('#nav-wrapper', [
      m('#nav-container', [
        m('#title-wrapper.nav-section', [
          m('svg#menu-icon[xmlns="http://www.w3.org/2000/svg"][viewBox="0 0 18 12"]', {
            onclick: Sidebar.toggleMenu
          }, [
            m('path#menu-icon-path[d="m0 12h18v-2h-18v2m0-5h18v-2h-18v2m0-7v2h18v-2h-18"]')
          ]),
          m('a#title-link[href="/"]',
            {
              config: m.route
            },
            m('span#title-text', 'Mithril Keep')
          )
          // m('div[class="navbar-subheader"]', [
          //   m('div[class="nav-subheader-container"]', [
          //     m('h2[class="nav-text-color nav-subheader-text"]',
          //       ctrl.pageTitle
          //     )
          //   ])
          // ])
        ]),
        // m('nav#nav-links-wrapper', [
          m('ul#nav-links.nav-section', [
            m('li.nav-link-container', [
              m('a.nav-link[href="/login"]',
                {
                  config: m.route,
                  onclick: function() {
                    console.log('m.route()', m.route());
                  }
                }, [
                  m('span.nav-link-text', 'Log In')
                ]
              )
            ]),
            m('li.nav-link-container', [
              m('a.nav-link[href="/"]',
                {
                  config: m.route,
                  onclick: ctrl.logout
                }, [
                  m('span.nav-link-text', 'Log Out')
                ]
              )
            ])
          ])
        // ])// .nav-collapse
      ])
    ]);
  }
};

function genSvgMenu() {
  return m('svg.menu-icon[xmlns="http://www.w3.org/2000/svg"][width="48"][height="48"][viewBox="0 0 48 48"]', {
    onclick: ctrl.toggleMenu
  }, [
    m('path[d="M6 36h36v-4H6v4zm0-10h36v-4H6v4zm0-14v4h36v-4H6z"]')
  ]);
}
