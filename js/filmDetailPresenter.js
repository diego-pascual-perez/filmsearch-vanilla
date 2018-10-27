function FilmDetailPresenter(_view, _model) {
  let view;
  let model;
  function init() {
    view = _view;
    model = _model;
  }

  const public = {
    presentView: detail => {
      view.presentView(detail);
      view.addCloseDetailFilmHandler(function() {
        window.history.back();
      });
    }
  };

  init();
  return public;
}
