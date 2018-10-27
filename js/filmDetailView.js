function FilmDetailView() {
  const public = {
    presentView: function(detail) {
      let content = `<div class="filmdetails">
      <div class="filmdetailsclose">x</div>
      <div class="filmdetailscontainer">
        <div class="filmdetailsheader">`;
      if (detail.Poster === 'N/A') {
        content += `<div class="filmdetailsposternoimage" />`;
      } else {
        content += `<img src=${detail.Poster} alt=${detail.Title} />`;
      }
      content += `<div class="filmdetailsheaderright">
            <div class="filmdetails-title">${detail.Title}</div>
            <div class="filmdetails-year">Year: ${detail.Year}</div>
            <div class="filmdetails-data">imdbID: ${detail.imdbID}</div>
            <div class="filmdetails-data">Director: ${detail.Director}</div>
            <div class="filmdetails-data">Actors: ${detail.Actors}</div>
            <div class="filmdetails-data">Genre: ${detail.Genre}</div>
            <div class="filmdetails-data">Language: ${detail.Language}</div>
            <div class="filmdetails-data">Runtime: ${detail.Runtime}</div>
            <div class="filmdetails-data">Plot: ${detail.Plot}</div>
          </div>
        </div>
      </div>
    </div>`;
      document.querySelector('#main').innerHTML = content;
    },
    addCloseDetailFilmHandler: function(handler) {
    	document.querySelector('.filmdetailsclose').addEventListener('click', function() {
        handler();
      });
    },
  };
  return public;
}
