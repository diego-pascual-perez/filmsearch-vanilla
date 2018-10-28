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
          if (model.getUser() !== null) {
            model.addDeleteLike(imdbID);
            element.innerHTML = "Liked!";
            setTimeout(function(){
              element.classList.remove("like");
              element.classList.add("liked");
            }, 500);
          } else {
            alert('Please, log in first');
          }
        });
        view.deleteLikeHandler(function(imdbID,element) {
          if (model.getUser() !== null) {
            model.addDeleteLike(imdbID);
            element.innerHTML = "Like";
            setTimeout(function(){
              element.classList.remove("liked");
              element.classList.add("like");
            }, 500);
          } else {
            alert('Please, log in first');
          }
        });
        view.addOnScrollSearchResultsHandler(function(element) {
          if(!model.getState().paginating && model.getState().hasMoreFilms) {
            if ((model.getState().films.length - 1) * 150 < element.clientHeight + element.scrollTop) {
              document.querySelector('.loading').classList.remove("hide");
              model.setPaginating(true);
              model.paginateSearchMovies().then(res => {
                if (res.films.length > 0) {
                  view.paginateView(res.films);
                }
                model.setPaginating(false);
                document.querySelector('.loading').classList.add("hide");
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
