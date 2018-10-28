(function() {
  'use strict';

  function FilmsWeb() {
    this.model = new Model();
    this.filmList = new FilmListPresenter(new FilmListView(), this.model);
    this.filmDetails = new FilmDetailPresenter(new FilmDetailView(), this.model);
    this.user = new UserPresenter(new UserView(), this.model);
  }

  const films = new FilmsWeb();

  function changeRoute() {
    const locationHash = document.location.hash;
    const search = locationHash.split('/')[1];
    const detail = locationHash.split('/')[2];

    if (detail !== undefined) {
      // show film detail
      films.model.showFilmDetail(detail).then(res => {
        films.filmDetails.presentView(res);
      });
    } else if (search !== undefined) {
      // show search result
      films.model.searchMovies(search).then(res => {
        films.filmList.presentView(res.films,res.totalResults);
      });
    } else {
      // empty search
      films.filmList.presentView(null,null);
    }
    films.user.presentView();
  }
  window.addEventListener('load', changeRoute);
  window.addEventListener('hashchange', changeRoute);

  // Attach a handler to event for all elements that match the selector,
  // now or in the future, based on a root element
  window.$delegate = function(target, selector, type, handler) {
    function dispatchEvent(event) {
      const targetElement = event.target;
      const potentialElements = target.querySelectorAll(selector);
      const hasMatch =
        Array.prototype.indexOf.call(potentialElements, targetElement) >= 0;

      if (hasMatch) {
        handler.call(targetElement, event);
      }
    }

    // https://developer.mozilla.org/en-US/docs/Web/Events/blur
    const useCapture = type === 'blur' || type === 'focus';

    target.addEventListener(type, dispatchEvent, useCapture);
  };
  // Find the element's parent with the given tag name:
  // $parent(qs('a'), 'div');
  window.$parent = function(element, tagName) {
    if (!element.parentNode) {
      return;
    }
    if (element.parentNode.tagName.toLowerCase() === tagName.toLowerCase()) {
      return element.parentNode;
    }
    return window.$parent(element.parentNode, tagName);
  };
})();
