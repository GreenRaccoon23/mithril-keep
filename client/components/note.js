var Checkbox = Checkbox || {};

var Note = {
  controller: function(note) {
    var ctrl = this;
    ctrl.viewState = NOTE_VIEW_CLASS_NORMAL;
    note.rowCount = note.rowCount || 0;

    ctrl.showViewEnhanced = function(e) {
      e.preventDefault();
      ctrl.viewState = NOTE_VIEW_CLASS_NORMAL;
      NoteCollection.viewState = NOTE_VIEW_CLASS_NORMAL;
    };

    ctrl.showViewNormal = function(e) {
      e.preventDefault();
      ctrl.viewState = NOTE_VIEW_CLASS_ENHANCED;
      NoteCollection.viewState = NOTE_VIEW_CLASS_ENHANCED;
    };

    ctrl.toggleView = function(e) {
      if (!e) return;
      e.preventDefault();

      NoteEditor.show(note);

      // m.mount(document.getElementsByClassName('notes')[0], NoteEditor, note);

      // switch(ctrl.viewState) {
      // case NOTE_VIEW_CLASS_NORMAL:
      //   ctrl.viewState = NOTE_VIEW_CLASS_ENHANCED;
      //   NoteCollection.viewState = NOTE_VIEW_CLASS_ENHANCED;
      //   break;
      // default:
      //   if ( !e || e.target.classList[0] !== 'note-wrapper' ) {
      //     return;
      //   }
      //   // Don't redraw yet.
      //   m.redraw.strategy("none");

        // Velocity(e.target, {opacity: 0}, {
        //   complete: function() {
        //     // After the animation finishes, redraw.
        //     m.startComputation();

        //     ctrl.viewState = NOTE_VIEW_CLASS_NORMAL;
        //     NoteCollection.viewState = NOTE_VIEW_CLASS_NORMAL;

        //     m.endComputation();
        //   }
        // });
      // }
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
        child.rowIndex = note.rowCount;
        if (child.text) {
          note.rowCount += child.text.split('\n').length;
        }
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
    
    // return (ctrl.viewState === NOTE_VIEW_CLASS_NORMAL)
    //   ? viewNormal(ctrl, note)
    //   : viewEnhanced(ctrl, note);
    return viewNormal(ctrl, note);
    
    function viewNormal(ctrl, note) {
      // return m('.note-wrapper.note-wrapper-' + ctrl.viewState, [
      return mWrap('.note-wrapper', [
        m('.note-container', { onclick: ctrl.toggleView }, [
          m('.note-interior', [
            m('.note-content.note-content-', [
              (note.title) ? m('h4.note-title', note.title) : '',
              (note.items) ? note.items.map(viewItemNormal) : ''
            ])
          ])
        ])
      ]);
    }

    function viewEnhanced(ctrl, note) {
      return mWrap('.note-wrapper', { onclick: ctrl.toggleView, config: fadesIn }, [
        m('.note-container', [
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

    function viewItemNormal(item) {
      return (item.rowIndex > 5)
        ? ''
        : m('.note-items', [
            (item.checkboxState) ? m.component(Checkbox, item) : '',
            item.text.split('\n').map(function(line, i) {
              var rowIndex = item.rowIndex + i;
              return m('p.note-text',
                (rowIndex === 5 && note.rowCount > 6)
                  // ? (item.text + '...')
                  // : item.text
                  ? rowIndex + ' ' + (line + '...')
                  : rowIndex + ' ' + line.substring(0, 200)
              )
            }),
            (item.items) ? item.items.map(viewItemNormal) : ''
          ]);
    }

    function viewItemEnhanced(item) {
      return m('.note-items', [
        (item.checkboxState) ? m.component(Checkbox, item) : '',
        m('textarea.note-text-editable', {
          value: item.text,
          onchange: function(e) {
            e.preventDefault();
            item.text = e.currentTarget.value;
          },
          config: initEl(autoResizeTextarea),
          onkeyup: editEl(autoResizeTextarea)
          // onkeyup: autoResizeTextarea
          // config: function(el) {
          //   // console.log('el:', el);
          //   el.style.height = "14px";
          //   el.style.height = (14 + el.scrollHeight) + "px";
          // }
          // onkeyup: function(e) {
          //   console.log('e:', e);
          //   e.target.style.height = "14px";
          //   e.target.style.height = (14 + e.target.scrollHeight) + "px";
          // }
        }),
        (item.items) ? item.items.map(viewItemEnhanced) : ''
      ]);
    }

    function mWrap(el, ...args) {
      var elWithViewTypeClasses = addViewTypeClasses(el);
      return m(elWithViewTypeClasses, ...args);
    }

    function addViewTypeClasses(el) {
      return el.replace(/(\..*?)(?=$|\.)/g, '$1$1' + '-' + ctrl.viewState);
    }

    // function mWrap(el) {
    //   // '.shoe.glu'.replace(/(\..*?)(?=$|\.)/g, '$1' + 'R')
    //   // 'p.shoe.glu'.replace(/(\..*?)(?=$|\.)/g, '$1$1' + 'R')
    //   var elWithViewTypeClasses = el.replace(/(\..*?)(?=$|\.)/g, '$1$1' + '-' + ctrl.viewState);

    //   return m(elWithViewTypeClasses, [].slice.call(arguments, 1));

    //   // var classes = el.match(/(\..*?)(?=$|\.)/g);
    //   // if (classes === null) return m(...arguments);

    //   // var classes = el.split('.');
    //   // el = classes.map(function(classBase, i) {
    //   //   return (i === 0)
    //   //     ? classBase
    //   //     : '.' + classBase + '.' + classBase + '-' + ctrl.viewState;
    //   // }).join('');
    //   // return m(el, [].slice.call(arguments, 1));
    // }
  }
};

// http://lhorie.github.io/mithril-blog/velocity-animations-in-mithril.html
function fadesIn(el, isInitialized, context) {
  // console.log('el:', el);
  // el.onclick = function(e) {
  //   e.preventDefault();
  // };
  if ( ! isInitialized ) {
    el.style.opacity = 0;
    Velocity(el, {opacity: 1});
  }
}

// http://lhorie.github.io/mithril-blog/velocity-animations-in-mithril.html
function fadesOut(cb) {
  return function(e) {
    //don't redraw yet
    m.redraw.strategy("none");

    Velocity(e.target, {opacity: 0}, {
      complete: function() {
        //now that the animation finished, redraw
        m.startComputation();
        cb && cb();
        m.endComputation();
      }
    });
  };
}

function initEl(cb) {
  return function(el, isInitialized, context) {
    if ( ! isInitialized ) {
      cb(el, context);
    }
  }
}

function editEl(cb) {
  return function(e) {
    e.preventDefault();
    cb(e.target);
  }
}

function autoResizeTextarea(el) {
  el.style.height = 'auto';
  el.style.height = el.scrollHeight + 'px';
}

// function autoResizeTextarea(e) {
//   var el = (e.target === undefined) ? e : e.target;
//   var fontSize = 14;
//   el.style.height = '' + fontSize;
//   el.style.height = (fontSize + el.scrollHeight) + 'px';
// }

// textarea = window.document.querySelector("textarea");
// textarea && textarea.addEventListener("keypress", function() {
//   if(textarea.scrollTop != 0){
//     textarea.style.height = textarea.scrollHeight + "px";
//   }
// }, false);
