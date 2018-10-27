function FilmListView() {
  const showFilms = function showFilms(films) {
    let i;
    let view = '';
    for (i = 0; i < films.length; i++) {
      let template = `<li class="resultsrow" data-id=${films[i].imdbID}>
				<div class="resultsrow-in">
					<img src=` + films[i].Poster + ` alt=` + films[i].Title + `>
					<div class="resultsrow-right">
						<div class="resultsrow-title"><em>` + films[i].Title + `</em></div>
						<div class="resultsrow-year"><em>Year: ` + films[i].Year + `</em></div>
						<div class="resultsrow-imdbID"><em>imdbID: ` + films[i].imdbID + `</em></div>
					</div>
				</div>
				{{likes}}
			</li>`;
     
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
					      	<ul class="searchresults">` + showFilms(films) + `</ul>`;
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
      $delegate(document.querySelector('.searchresults'), 'li .resultsrow-in', 'click', function() {
        handler(itemId(this));
      });
    },
    addShowFilmDetailsFromEmHandler: function(handler) {
      $delegate(document.querySelector('.searchresults'), 'li .resultsrow-in em', 'click', function() {
        handler(itemId(this));
      });
    },
    addShowFilmDetailsFromImgHandler: function(handler) {
      $delegate(document.querySelector('.searchresults'), 'li .resultsrow-in img', 'click', function() {
        handler(itemId(this));
      });
    },
    toogleFavouriteHandler: function(handler) {
      $delegate(document.querySelector('.movie-list'), 'li .list-title span', 'click', function() {
        handler(itemId(this));
      });
    }
  };

  return public;
}
