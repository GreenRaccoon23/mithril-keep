// function binds(data) {
//   return {onchange: function(e) {
//     data[e.target.name] = e.target.value;
//   }};
// };

// function bindInput(prop) {
//   return {
//     oninput: m.withAttr('value', prop),
//     value: prop()
//   };
// }

var Auth = {
  controller: function() {
    var ctrl = this;

    ctrl.user = {
      username: '',
      password: ''
    };
    ctrl.err = '';
    ctrl.showErr = false;

    ctrl.signup = function () {
      return m.request({
        method: 'POST',
        url: '/api/users/signup',
        data: ctrl.user
      })
        .then(function(res) {
          localStorage.setItem('sessiontoken', res.data.token);
          localStorage.setItem('username', res.data.username);
          m.route('/');
        })
        .catch(function (err) {
          ctrl.err = err.statusText;
          ctrl.showErr = true;
        });
    };

    ctrl.login = function() {
      // console.log('data', {
      //   username: ctrl.user.username(),
      //   password: ctrl.user.password()
      // });
      // console.log('HERE!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!');
      return m.request({
        method: 'POST',
        url: '/api/users/signin',
        data: ctrl.user
      })
        .then(function(res) {
          console.log('res.username:', res.username);
          console.log('res.token:', res.token);
          localStorage.setItem('username', res.username);
          localStorage.setItem('sessiontoken', res.token);

          ctrl.success = 'Success!';
          // m.route('/');
        })
        .catch(function (err) {
          console.log('login error:', err);
          ctrl.err = 'Invalid Username/Password';
          ctrl.showErr = true;
        });
    };

    localStorage.clear();
  },

  isAuth: function() {
    return !!localStorage.getItem('sessiontoken');
  },

  logout: function(token) {
    localStorage.clear();

    return m.request({
      method: 'POST',
      url: '/api/users/signout',
      config: function(xhr) {
        console.log('token:', token);
        xhr.setRequestHeader('token', token);
      }
    })
      .then(function() {
        m.route('/');
      })
      .catch(function(err) {
        if (token === null) {
          return;
        }
        console.log('logout error:', err);
      });
  },

  view: function(ctrl) {
    switch( m.route() ) {
    case '/login':
      return loginView(ctrl);
    case '/signup':
      return signupView(ctrl);
    default:
      return m('');
    }
  }
};

function loginView(ctrl) {
  return m('#Auth', [
    m('div[id="signin"', [
      m('div[class="col-md-12"', [
        m('div[class="col-md-4 col-md-offset-4"]', [
          m('paper-card[class="log-in-paper-card"]', [
            m('h2[class="sign-in"]',
              'Log In'
            ),
            m('form', {
              onsubmit: function(e) {
                // e.preventDefault();
                console.log('going...');
                // throw new Error('STOP!!!!!');
                ctrl.login();
              }
            }, [
              m('input[type="text"][placeholder="Username"][class="form-control"][name="username"]', {
                value: ctrl.user.username,
                onchange: function(e) {
                  ctrl.user.username = e.currentTarget.value;
                }
              }),
              m('div[class="row clean"]'
              ),
              m('input[type="password"][placeholder="Password"][class="form-control"][name="password"]', {
                value: ctrl.user.password,
                onchange: function(e) {
                  ctrl.user.password = e.currentTarget.value;
                }
                // onsubmit: function() {
                //   console.log('submitting password...');
                // }
              }),
              m('div[class="row clean"]'
              ),
              // m('div[ng-show="showErr"][class="message-error"]',
              // m('div[class="message-error"]',
              //   (ctrl.showErr) ? ctrl.err : ''
              // ),
              (ctrl.err) ? m('.error', ctrl.err) : '',
              (ctrl.success) ? m('.success', ctrl.success) : '',
              m('button[class="btn btn-primary"][type="submit"]', //{
              //   onclick: function() {
              //     console.log('click');
              //     // ctrl.login();
              //   }
              // },
                'Log in'
              ),
              m('div[class="row clean"]'
              ),
              m('div',
                'Don\'t have an account?', [
                  m('a[href="signup"]', {
                    config: m.route,
                    onclick: function() {
                      console.log('signing up...');
                    }
                  },
                    'Sign up here for free!'
                  )
                ]
              )
            ])
          ])
        ])
      ])
    ])
  ]);
}

function signupView(ctrl) {
  return m('div[id="signup" class="col-md-12"]', [
    m('div[class="col-md-4 col-md-offset-4"]', [
      m('paper-card[class="log-in-paper-card"]', [
        m('h2[class="sign-in-up-title fade-in-three-quarter-sec"]',
          'Sign Up'
        ),
        m('form[name="signupForm"]', [
          m('input[type="text"][name="username"][placeholder="Username"][class="form-control my-margin-quarter-em fade-in-three-quarter-sec shadow"][ng-minlength="3"]', {
            oninput: m.withAttr('value', ctrl.user.username),
            value: ctrl.user.username()
          }),
          m('p[style="color:red"][ng-show="signupForm.username.$error.minlength"][class="help-block"]',
            'Username is too short.'
          ),
          m('div[class="row clean"]'
          ),
          m('input[type="password"][placeholder="Password"][name="password"][class="form-control my-margin-quarter-em fade-in-three-quarter-sec shadow"][ng-model="user.password"][ng-minlength="3"]', {
            oninput: m.withAttr('value', ctrl.user.password),
            value: ctrl.user.password()
          }), 
          m('p[style="color:red"][ng-show="signupForm.password.$error.minlength && signupForm.password.$dirty"][class="help-block"]',
            'Password is too short.'
          ),
          m('div[class="row clean"]'
          ),
          m('div[ng-show="showErr"][class="message-error"]',
            ctrl.err
          ),
          m('button[class="btn btn-primary fade-in-1-and-three-quarter-sec sign-in-up-button-text my-margin-half-em shadow"]', {
            onclick: ctrl.signup
          },
            'Sign Up'
          )
        ]),
        m('div[class="row clean"]'
        ),
        m('span',
          'Already[have an account?', [
            m('a[href="signin"][class="account loginlink"]', {
              config: m.route
            },
            'Log in here!'
            )
          ]
        )
      ])
    ])
  ]);
}
