var Note = Note || {};

const NOTE_VIEW_CLASS_NORMAL = 'normal';
const NOTE_VIEW_CLASS_ENHANCED = 'enhanced';

var NoteCollection = {
  viewState: NOTE_VIEW_CLASS_NORMAL,

  noteEditing: null,

  controller: function() {
    var ctrl = this;

    ctrl.notes = [
      {
        title: 'A Title',
        colorBackground: 'A Title',
        isChecklist: false,
        items: [
          {
            text: `Here is some text for a note.\nThis note has another paragraph.`
          },
          {
            text: `and another`
          },
          {
            text: `and\nsome\nmore\nextra\nparagraphs`
          }
        ]
      },
      {
        title: 'A Checklist',
        isChecklist: true,
        items: [
          {
            checkboxState: 'unchecked',
            text: 'A',
            items: [
              {
                checkboxState: 'checked',
                text: '1'
              },
              {
                checkboxState: 'unchecked',
                text: '2'
              },
              {
                checkboxState: 'unchecked',
                text: '3'
              }
            ]
          },
          {
            checkboxState: 'checked',
            text: 'B'
          },
          {
            checkboxState: 'unchecked',
            text: 'C',
            items: [
              {
                checkboxState: 'checked',
                text: '1'
              }
            ]
          }
        ]
      },
      {
        title: 'Another Note',
        isChecklist: false,
        items: [
          {
            text: 'To'
          },
          {
            text: 'fill'
          },
          {
            text: 'up'
          },
          {
            text: 'space'
          }
        ]
      },
      {
        title: 'A Really Long Note',
        isChecklist: false,
        items: [
          {
            text: 'This'
          },
          {
            text: 'is'
          },
          {
            text: 'a'
          },
          {
            text: 'really'
          },
          {
            text: 'long'
          },
          {
            text: 'note'
          },
          {
            text: 'about'
          },
          {
            text: 'nothing'
          },
          {
            text: 'in'
          },
          {
            text: 'particular'
          }
        ]
      },
      {
        title: 'Blank Note',
        isChecklist: false,
      },
      {
        title: 'A Medium Note',
        isChecklist: false,
        items: [
          {
            text: 'This'
          },
          {
            text: 'is'
          },
          {
            text: 'a'
          },
          {
            text: 'medium'
          },
          {
            text: 'sized'
          },
          {
            text: 'note'
          }
        ]
      },
      {
        title: 'Normal Note',
        isChecklist: false,
        items: [
          {
            text: 'This is a normal note'
          }
        ]
      },
      {
        title: 'Normal Note',
        isChecklist: false,
        items: [
          {
            text: 'This is a normal note'
          }
        ]
      },
      {
        title: 'Normal Note',
        isChecklist: false,
        items: [
          {
            text: 'This is a normal note'
          }
        ]
      },
      {
        title: 'Normal Note',
        isChecklist: false,
        items: [
          {
            text: 'This is a normal note'
          }
        ]
      }
    ];

    NoteCollection.noteEditing = NoteCollection.noteEditing || ctrl.notes[0];
    // NoteEditor.note = NoteEditor.note || ctrl.notes[0];
    NoteEditor.setNote(ctrl.notes[0]);

    ctrl.notes.forEach(function(note, i) {
      note.id = note.id || i;
      note.title = i + ' ' + note.title;
    });
  },

  view: function(ctrl) {
    // return m('#notes-container', [
    //   m('#notes', [m('.note-sizer'), ctrl.notes.map(function(note) {
    //     return m.component(Note, note);
    //   })])
    // ]);
    // const ENTER = 13;
    // onkeyup: e.shiftKey bool, e.keyCode int
    return m('.notes-container.notes-container-' + NoteCollection.viewState, [
      m('.notes', [
        ctrl.notes.map(function(note) {
          return m.component(Note, note);
        }),
        m.component(NoteEditor, NoteCollection.noteEditing)
      ])
    ]);
  }
};
