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
        view.addShowFilmDetailsFromEmHandler(function(imdbID) {
          document.location.hash += '/' + encodeURIComponent(imdbID);
        });
        view.addShowFilmDetailsFromImgHandler(function(imdbID) {
          document.location.hash += '/' + encodeURIComponent(imdbID);
        });
        view.addLikeHandler(function(imdbID,element) {
          model.addDeleteLike(imdbID);
          element.innerHTML = "Liked!";
          setTimeout(function(){
            element.classList.remove("like");
            element.classList.add("liked");
          }, 500);
        });
        view.deleteLikeHandler(function(imdbID,element) {
          model.addDeleteLike(imdbID);
          element.innerHTML = "Like";
          setTimeout(function(){
            element.classList.remove("liked");
            element.classList.add("like");
          }, 500);
        });
        view.addOnScrollSearchResultsHandler(function(element) {
          if(!model.getState().paginating) {
            if ((model.getState().films.length - 1) * 150 < element.clientHeight + element.scrollTop) {
              console.log("next page");
              model.setPaginating(true);
            }
          }
        });
      }
    }
  };

  init();
  return public;
}
