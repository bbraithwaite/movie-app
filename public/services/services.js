angular.module('movieApp')
  .factory('omdbApi', function omdbApiFactory($q, $http) {

    var baseUrl = 'http://www.omdbapi.com/?v=1';
    var service = {};

    var callService = function(url) {
      var deferred = $q.defer();

      $http.get(url)
        .success(function(data) {
          deferred.resolve(data);
        })
        .error(function() {
          deferred.reject();
        });

      return deferred.promise;
    };

    service.search = function search (query) {
      return callService(baseUrl + '&s=' + encodeURIComponent(query));
    };

    service.getById = function search (imdbID) {
      return callService(baseUrl + '&plot=short&i=' + imdbID);
    };

    return service;

  })
  .factory('popularMovies', function popularMoviesFactory($q, $http) {

    var baseUrl = 'http://localhost:3000/api/movies/popular';
    var service = {};

    service.get = function get() {
      var deferred = $q.defer();

      $http.get(baseUrl)
        .success(function(data) {
          deferred.resolve(data);
        })
        .error(function() {
          deferred.reject();
        });

      return deferred.promise;
    };

    return service;
  
});

  