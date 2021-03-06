function Model() {
  let state;
  function init() {
    state = {
      searchvalue: '',
      films: [],
      showfilmdetail: {},
      user: JSON.parse(sessionStorage.getItem('user')) || {},
      paginating: false,
      hasMoreFilms: true,
      searchPage: 1,
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
      state.searchvalue = query;
      return new Promise((resolve, reject) => {
          get(`s=${query}`)
            .then(res => {
              if (res.Response === 'True') {
                const movies = res.Search.map(item => {
                  return {
                    ...item,
                    isFavourite: public.getLikes().includes(item.imdbID)
                  };
                });
                state.films = movies;
                state.searchPage = 1;
                state.hasMoreFilms = true;
                resolve({films: state.films,totalResults:res.totalResults});
              } else {
                state.hasMoreFilms = false;
                resolve({films: [],totalResults:0});
              }
            })
            .catch(console.log);
      });
    },
    paginateSearchMovies: function() {
      return new Promise((resolve, reject) => {
          state.searchPage = state.searchPage + 1;
          get(`s=${state.searchvalue}&page=${state.searchPage}`)
            .then(res => {
              if (res.Response === 'True') {
                const movies = res.Search.map(item => {
                  return {
                    ...item,
                    isFavourite: public.getLikes().includes(item.imdbID)
                  };
                });
                movies.forEach(item => {
                  state.films.push(item);
                });
                resolve({films: movies,totalResults:res.totalResults});
              } else {
                state.hasMoreFilms = false;
                resolve({films: [],totalResults:0});
              }
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
                isFavourite: public.getLikes().includes(res.imdbID)
              };
              resolve(state.showfilmdetail);
            })
            .catch(console.log);
      });
    },
    getLikes: function() {
      return JSON.parse(localStorage.getItem(state.user)) || [];
    },
    addDeleteLike: function(imdbID) {
      const likes = JSON.parse(localStorage.getItem(state.user)) || [];
      const index = likes.indexOf(imdbID);
      if (index > -1) {
        likes.splice(index, 1);
      } else {
        likes.push(imdbID);
      }
      localStorage.setItem(state.user, JSON.stringify(likes));
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
      state.user = user;
      document.location.reload();
    },
    setPaginating: function(value) {
      state.paginating = value;
    },
  };

  init();
  return public;
}
