var Sidebar = {
  isHidden: true,

  toggleMenu: function(e) {
    e.preventDefault();
    Sidebar.isHidden = !Sidebar.isHidden;
  },

  // controller: function() {
  //   var ctrl = this;
  // },

  view: function(ctrl, item) {
    return m('svg.menu-icon[xmlns="http://www.w3.org/2000/svg"][viewBox="0 0 48 48"]', {
      onclick: ctrl.toggleMenu
    }, [
      m('path[d="M6 36h36v-4H6v4zm0-10h36v-4H6v4zm0-14v4h36v-4H6z"]')
    ]);
  }
};
