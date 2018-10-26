(function() {
  'use strict';

  function FilmsWeb() {
    this.model = new Model();
    this.filmList = new FilmListPresenter(new FilmListView(), this.model);
    //this.filmDetails = new FilmDetailsPresenter(new FilmDetailView(), this.model);
    //this.user = new UserPresenter(new LoginView(), new UserView(), this.model);
  }

  const films = new FilmsWeb();

  function changeRoute() {
    const locationHash = document.location.hash;
    const search = locationHash.split('/')[1];
    const detail = locationHash.split('/')[2];

    if (detail !== undefined) {
      // show film detail
      films.model.selectDetail(detail).then(res => {
        films.filmDetails.presentView(res);
      });
    } else if (search !== undefined) {
      // show search result
      films.model.searchMovies(search).then(res => {
        films.filmList.presentView(res);
      });
    } else {
      // empty search
      films.filmList.presentView(null);
    }
    //films.user.presentView();
  }
  window.addEventListener('load', changeRoute);
  window.addEventListener('hashchange', changeRoute);

  // Attach a handler to event for all elements that match the selector,
  // now or in the future, based on a root element
  window.$delegate = function(target, selector, type, handler) {
    function dispatchEvent(event) {
      const targetElement = event.target;
      const potentialElements = window.target.querySelectorAll(selector);
      const hasMatch =
        Array.prototype.indexOf.call(potentialElements, targetElement) >= 0;

      if (hasMatch) {
        handler.call(targetElement, event);
      }
    }

    // https://developer.mozilla.org/en-US/docs/Web/Events/blur
    const useCapture = type === 'blur' || type === 'focus';

	  window.target.addEventListener(type, dispatchEvent, useCapture);
  };
})();