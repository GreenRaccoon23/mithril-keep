var Checkbox = Checkbox || {};
var Velocity = Velocity || {};

var NoteEditor = {
  note: null,

  visible: false,

  setNote: function(note) {
    console.log('Editing note:', note);
    NoteEditor.note = note;
  },

  show: function(note) {
    if (note) NoteEditor.setNote(note);
    NoteEditor.visible = true;
  },

  controller: function() {
    var ctrl = this;

    ctrl.hide = function(e) {
      if (!e) return;
      e.preventDefault();

      if ( ! e.target || ! e.target.classList ) return;

      var el;
      switch (e.target.classList[0]) {
      case 'note-wrapper-enhanced':
        el = e.target;
        break;
      case 'note-done':
        el = $('button.note-wrapper-enhanced');
        break;
      default:
        return;
      }

      // Don't redraw yet.
      m.redraw.strategy('none');


      Velocity(el, {opacity: 0}, {
        complete: function() {
          // After the animation finishes, redraw.
          m.startComputation();

          NoteEditor.visible = false;
          NoteCollection.viewState = NOTE_VIEW_CLASS_NORMAL;

          m.endComputation();
        }
      });
    };

    ctrl.saveNote = function(e) {
      e.preventDefault();
      console.log('Saving note to:', '/api/users/notes/' + NoteEditor.note.id);
      // m.request({
      //   'method': 'PUT',
      //   'url': '/api/users/notes/' + NoteEditor.note.id
      // }).then(function(res) {
      //     NoteEditor.hide();
      //   });
      ctrl.hide();
    };
  },

  view: function(ctrl) {
    return ( ! NoteEditor.visible || ! NoteEditor.note )
      ? m('')
      : m('.note-wrapper-enhanced', { onclick: ctrl.hide, config: fadesIn }, [
        m('.note-container', [
          m('.note-interior', [
            m('.note-content', [
              (NoteEditor.note.title) ? m('h4.note-title', NoteEditor.note.title) : '',
              (NoteEditor.note.items) ? NoteEditor.note.items.map(viewItem) : ''
            ]),
            m('.note-buttons', [
              m('button.note-done', {onclick: ctrl.saveNote}, 'Done')
            ])
          ])
        ])
      ]);

    function viewItem(item) {
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
        (item.items) ? item.items.map(viewItem) : ''
      ]);
    }
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
  };
}

function editEl(cb) {
  return function(e) {
    e.preventDefault();
    cb(e.target);
  };
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
