function FilmListView() {
  const showFilms = function showFilms(films) {
    let i;
    let view = '';
    for (i = 0; i < films.length; i++) {
      let filmimage = '';
      if (films[i].Poster === 'N/A') {
        filmimage = `<div class="noimage"></div>`;
      } else {
        filmimage = `<img src=${films[i].Poster} alt=${films[i].Title} />`;
      }
      let template = `<li class="resultsrow" data-id=${films[i].imdbID}>
				<div class="resultsrow-in">` + filmimage + `
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
    presentView: function(films,totalResults) {
      if (films) {
        document.querySelector('#main').innerHTML = `<div class="searchform">Search a film:
					      		<input class="searchinput" id="searchinput" type="text" placeholder="Insert film" />
                    <div class="searchbutton">Search</div>
                    <div class="searchtotalresults">${totalResults} films found</div>
					      	</div>
					      	<ul class="searchresults">` + showFilms(films) + `</ul>`;
      } else {
        document.querySelector('#main').innerHTML = `<div class="searchform">Search a film:
					      		<input class="searchinput" id="searchinput" type="text" placeholder="Insert film" />
					      		<div class="searchbutton">Search</div>
					      	</div>`;
      }
    },
    paginateView: function(films) {
      if (films) {
        document.querySelector('.searchresults').innerHTML += showFilms(films);
      }
    },
    addSearchFilmsHandler: function(handler) {
    	document.querySelector('#searchinput').addEventListener('change', function() {
        handler(document.querySelector('#searchinput').value);
      });
    },
    addShowFilmDetailsHandler: function(handler) {
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
    addLikeHandler: function(handler) {
      $delegate(document.querySelector('.searchresults'), 'li .like', 'click', function() {
        handler(itemId(this),this);
      });
    },
    deleteLikeHandler: function(handler) {
      $delegate(document.querySelector('.searchresults'), 'li .liked', 'click', function() {
        handler(itemId(this),this);
      });
    },
    addOnScrollSearchResultsHandler: function(handler) {
    	document.querySelector('.searchresults').addEventListener("scroll", function() {
        handler(this);
      });
    },
  };

  return public;
}
