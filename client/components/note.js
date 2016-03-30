var Checkbox = Checkbox || {};

var Note = {
  controller: function(note) {
    var ctrl = this;
    ctrl.display = 'simple';
    ctrl.itemsShown = 0;
    ctrl.itemCount = 0;

    ctrl.showEnhancedView = function(e) {
      e.preventDefault();
      ctrl.display = 'enhanced';
    };

    ctrl.showSimpleView = function(e) {
      e.preventDefault();
      ctrl.display = 'simple';
    };

    function countItems(item, i) {
      ctrl.itemCount++;
      if (item.items) {
        item.items.forEach(countItems);
      }
    }

    if (note.items) {
      note.items.forEach(countItems);
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
    


    return m('.note-wrapper', [
      m('.note-container', { onclick: ctrl.showEnhancedView }, [
        m('.note-interior', [
          m('.note-content', [
            (note.title) ? m('h4[class="note-title"]', note.title) : '',
            (note.items) ? note.items.map(itemView) : ''
          ])
        ])
      ])
    ]);

    function itemView(item) {
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
            (item.items) ? item.items.map(itemView) : ''
          ]);
    }
  }
};
