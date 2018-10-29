function FilmListPresenter(_view, _model) {
  let view;
  let model;
  function init() {
    view = _view;
    model = _model;
  }

  const public = {
    presentView: function(list,totalResults) {
      view.presentView(list,totalResults);
      view.addSearchFilmsHandler(function(query) {
        console.log({ query });
        document.location.hash = '/' + encodeURIComponent(query);
      });
      if (list) {
        view.addShowFilmDetailsHandler(function(imdbID) {
          document.location.hash += '/' + encodeURIComponent(imdbID);
        });
        view.addLikeHandler(function(imdbID,element) {
          if (model.getUser() !== null) {
            model.addDeleteLike(imdbID);
            view.toogleLikeButton(element,true);
          } else {
          	view.alertLogin();
          }
        });
        view.deleteLikeHandler(function(imdbID,element) {
          if (model.getUser() !== null) {
            model.addDeleteLike(imdbID);
            view.toogleLikeButton(element,false);
          } else {
          	view.alertLogin();
          }
        });
        view.addOnScrollSearchResultsHandler(function(element) {
          if(!model.getState().paginating && model.getState().hasMoreFilms) {
            if ((model.getState().films.length - 1) * 150 < element.clientHeight + element.scrollTop) {
              view.showLoading(true);
              model.setPaginating(true);
              model.paginateSearchMovies().then(res => {
                if (res.films.length > 0) {
                  view.paginateView(res.films);
                }
                model.setPaginating(false);
                view.showLoading(false);
              });
            }
          }
        });
      }
    }
  };

  init();
  return public;
}
