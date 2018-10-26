function FilmListPresenter(_view, _model) {
  let view;
  let model;
  function init() {
    view = _view;
    model = _model;
  }

  const public = {
    presentView: function(list) {
      view.presentView(list);
      view.addSearchFilmsHandler(function(query) {
        console.log({ query });
        document.location.hash = '/' + encodeURIComponent(query);
      });
      if (list) {
        view.addShowFilmDetailsHandler(function(imdbID) {
          document.location.hash += '/' + encodeURIComponent(imdbID);
        });
        /*view.toogleFavouriteHandler(function(imdbID) {
          model.toogleFavourite(imdbID);
          document.location.reload();
        });*/
      }
    }
  };

  init();
  return public;
}
