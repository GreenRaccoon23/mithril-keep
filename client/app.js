var Nav = Nav || {};
var Auth = Auth || {};
var ErrorPage = ErrorPage || {};
var NoteCollection = NoteCollection || {};

function startApp() {
  // m.mount(document.body, StoryBoardApp);
  m.mount(document.getElementById('nav'), Nav);
  
  m.route(document.getElementById('main'), '/', {
    '/': NoteCollection,
    '/login': Auth,
    '/signup': Auth,
    '/error-page': ErrorPage
  });
}
