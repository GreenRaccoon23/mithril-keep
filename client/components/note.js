var Checkbox = Checkbox || {};

const NOTE_VIEW_CLASS_SIMPLE = 'simple';
const NOTE_VIEW_CLASS_ENHANCED = 'enhanced';

var Note = {
  controller: function(note) {
    var ctrl = this;
    ctrl.viewType = NOTE_VIEW_CLASS_SIMPLE;
    ctrl.itemsShown = 0;
    ctrl.itemCount = 0;

    ctrl.showEnhancedView = function(e) {
      e.preventDefault();
      ctrl.viewType = NOTE_VIEW_CLASS_ENHANCED;
    };

    ctrl.showSimpleView = function(e) {
      e.preventDefault();
      ctrl.viewType = NOTE_VIEW_CLASS_SIMPLE;
    };

    ctrl.toggleView = function(e) {
      e.preventDefault();
      ctrl.viewType = (ctrl.viewType === NOTE_VIEW_CLASS_SIMPLE)
        ? NOTE_VIEW_CLASS_ENHANCED
        : NOTE_VIEW_CLASS_SIMPLE;
    };

    ctrl.saveNote = function(e) {
      e.preventDefault();
      m.request({
        'method': 'PUT',
        'url': '/api/users/notes/' + note.id
      });
    };

    countChildItems(note);

    function countChildItems(parent) {
      (parent.items) && parent.items.forEach(function(child) {
        ctrl.itemCount++;
        countChildItems(child);
      });
    }

  },

  view: function(ctrl, note) {
    // setTimeout(function() {
    //   $('#notes').masonry({
    //     // options
    //     itemSelector: '.note-container',
    //     columnWidth: '.note-sizer'
    //   });
    // }, 500);
    
    return (ctrl.viewType === NOTE_VIEW_CLASS_SIMPLE)
      ? viewSimple(ctrl, note)
      : viewEnhanced(ctrl, note);
    
    function viewSimple(ctrl, note) {
      // return m('.note-wrapper.note-wrapper-' + ctrl.viewType, [
      return mWrap('.note-wrapper', [
        m('.note-container', { onclick: ctrl.showEnhancedView }, [
          m('.note-interior', [
            m('.note-content.note-content-', [
              (note.title) ? m('h4.note-title', note.title) : '',
              (note.items) ? note.items.map(viewItemSimple) : ''
            ])
          ])
        ])
      ]);
    }

    function viewEnhanced(ctrl, note) {
      ctrl.itemsShown = 0;
      return mWrap('.note-wrapper', [
        m('.note-container', { onclick: ctrl.showEnhancedView }, [
          m('.note-interior', [
            m('.note-content', [
              (note.title) ? m('h4.note-title', note.title) : '',
              (note.items) ? note.items.map(viewItemEnhanced) : ''
            ]),
            m('.note-buttons', [
              m('button.note-done', {onclick: ctrl.saveNote}, 'Done')
            ])
          ])
        ])
      ]);
    }

    function viewItemSimple(item) {
      ctrl.itemsShown++;

      return (ctrl.itemsShown > 6)
        ? ''
        : m('.note-items', [
            (item.checkboxState) ? m.component(Checkbox, item) : '',
            m('p[class="note-text"]',
              (ctrl.itemsShown === 6 && ctrl.itemCount > 6)
                ? (item.text + '...')
                : item.text
            ),
            (item.items) ? item.items.map(viewItemSimple) : ''
          ]);
    }

    function viewItemEnhanced(item) {
      return m('.note-items', [
        (item.checkboxState) ? m.component(Checkbox, item) : '',
        m('p[class="note-text"]',
          item.text
        ),
        (item.items) ? item.items.map(viewItemSimple) : ''
      ]);
    }

    function mWrap(el, ...args) {
      var elWithViewTypeClasses = addViewTypeClasses(el);
      return m(elWithViewTypeClasses, ...args);
    }

    function addViewTypeClasses(el) {
      return el.replace(/(\..*?)(?=$|\.)/g, '$1$1' + '-' + ctrl.viewType);
    }

    // function mWrap(el) {
    //   // '.shoe.glu'.replace(/(\..*?)(?=$|\.)/g, '$1' + 'R')
    //   // 'p.shoe.glu'.replace(/(\..*?)(?=$|\.)/g, '$1$1' + 'R')
    //   var elWithViewTypeClasses = el.replace(/(\..*?)(?=$|\.)/g, '$1$1' + '-' + ctrl.viewType);

    //   return m(elWithViewTypeClasses, [].slice.call(arguments, 1));

    //   // var classes = el.match(/(\..*?)(?=$|\.)/g);
    //   // if (classes === null) return m(...arguments);

    //   // var classes = el.split('.');
    //   // el = classes.map(function(classBase, i) {
    //   //   return (i === 0)
    //   //     ? classBase
    //   //     : '.' + classBase + '.' + classBase + '-' + ctrl.viewType;
    //   // }).join('');
    //   // return m(el, [].slice.call(arguments, 1));
    // }
  }
};
