var ErrorPage = {
  controller: function() {
    var ctrl = this;
    ctrl.username = localStorageService.get('username');
  },
  view: function(ctrl) {
    return m('#ErrorPage' [
      m('h1',
        'ERROR PAGE for ' + ctrl.username + '!!'
      )
    ]);
  }
};
