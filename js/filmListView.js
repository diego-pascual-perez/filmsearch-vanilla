function FilmListView() {
  const showFilms = function showFilms(films) {
    let i;
    let view = '';
    for (i = 0; i < films.length; i++) {
      let template = `<div class="resultsrow">
				<div class="resultsrow-in">
					<img src=` + films[i].Poster + ` alt=` + films[i].Title + `>
					<div class="resultsrow-right">
						<div class="resultsrow-title">` + films[i].Title + `</div>
						<div class="resultsrow-year">Year: ` + films[i].Year + `</div>
						<div class="resultsrow-imdbID">imdbID: ` + films[i].imdbID + `</div>
					</div>
				</div>
				{{likes}}
			</div>`;
     
      if (films[i].isFavourite) {
	      template = template.replace('{{likes}}', `<div class="liked">Liked!</div>`);
      } else {
	      template = template.replace('{{likes}}', `<div class="like">Like</div>`);
      }
      view = view + template;
    }
    return view;
  };

  const itemId = function(element) {
    const li = $parent(element, 'li');
    return li.dataset.id;
  };

  const public = {
    presentView: function(films) {
      if (films) {
        document.querySelector('#main').innerHTML = `<div className="searchform">Search a film:
					      		<input class="searchinput" id="searchinput" type="text" placeholder="Insert film" />
					      		<div class="searchbutton">Search</div>
					      	</div>
					      	<div class="searchresults">` + showFilms(films) + `</div>`;
      } else {
        document.querySelector('#main').innerHTML = `<div className="searchform">Search a film:
					      		<input class="searchinput" id="searchinput" type="text" placeholder="Insert film" />
					      		<div class="searchbutton">Search</div>
					      	</div>`;
      }
    },
    addSearchFilmsHandler: function(handler) {
    	document.querySelector('#searchinput').addEventListener('change', function() {
        handler(document.querySelector('#searchinput').value);
      });
    },
    addShowFilmDetailsHandler: function(handler) {
    	console.log(document.querySelector('.searchresults'));
      //$delegate(document.querySelector('.searchresults'), '.resultsrow', 'click', function() {
      //  handler(this);
      //});
    },
    toogleFavouriteHandler: function(handler) {
      $delegate(document.querySelector('.movie-list'), 'li .list-title span', 'click', function() {
        handler(itemId(this));
      });
    }
  };

  return public;
}
