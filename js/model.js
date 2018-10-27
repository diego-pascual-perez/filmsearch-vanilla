function Model() {
  let state;
  function init() {
    state = {
      films: [],
      showfilmdetail: {},
      user: {},
      //cache: { movies: {}, details: {} }
    };
  }

  function get(url) {
    return new Promise((resolve, reject) => {
      const xhr = new XMLHttpRequest();
      xhr.onreadystatechange = function() {
        if (xhr.readyState !== 4) return;
        if (xhr.status >= 200 && xhr.status < 300) {
          resolve(JSON.parse(xhr.responseText));
        }
      };
      url = `https://www.omdbapi.com?apikey=f12ba140&${url}`;
      console.log(url);
      xhr.open('GET', url);
      xhr.send();

      //resolve(JSON.parse('{"Search":[{"Title":"Indiana jones","Year":"1978","Type":"Movie","imdbID":"tt0097576","Poster":"https://m.media-amazon.com/images/M/MV5BMjNkMzc2N2QtNjVlNS00ZTk5LTg0MTgtODY2MDAwNTMwZjBjXkEyXkFqcGdeQXVyNDk3NzU2MTQ@._V1_SX300.jpg"}],"totalResults": "88", "Response": "True"}'));
    });
  }

  const public = {
    getState: function() {
      return state;
    },
    searchMovies: function(query) {
      return new Promise((resolve, reject) => {
          get(`s=${query}`)
            .then(res => {
              const movies = res.Search.map(item => {
                return {
                  ...item,
                  isFavourite: public.getFavourites().includes(item.imdbID)
                };
              });
              state.films = movies;
              resolve(state.films);
            })
            .catch(console.log);
      });
    },
    showFilmDetail: function(imdbID) {
      return new Promise((resolve, reject) => {
          get(`i=${imdbID}`)
            .then(res => {
              state.showfilmdetail = {
                ...res,
                isFavourite: public.getFavourites().includes(res.imdbID)
              };
              resolve(state.showfilmdetail);
            })
            .catch(console.log);
      });
    },
    getFavourites: function() {
      return JSON.parse(localStorage.getItem('favourites')) || [];
    },
    addDeleteLike: function(imdbID) {
      const favourites = JSON.parse(localStorage.getItem('favourites')) || [];
      const index = favourites.indexOf(imdbID);
      if (index > -1) {
        favourites.splice(index, 1);
      } else {
        favourites.push(imdbID);
      }
      localStorage.setItem('favourites', JSON.stringify(favourites));
    },
    getUser: function() {
      return JSON.parse(sessionStorage.getItem('user')) || null;
    },
    saveUser: function(user) {
      if (user) {
        sessionStorage.setItem('user', JSON.stringify(user));
      } else {
        sessionStorage.removeItem('user');
      }
    }
  };

  init();
  return public;
}
