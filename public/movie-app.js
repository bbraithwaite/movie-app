/* Create Application */
angular.module('movieApp', ['ui.bootstrap']);

/* Services */
angular.module('movieApp')
  .factory('movieApi', function movieApiFactory($q, $http) {

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
    return callService(baseUrl + '&plot=full&i=' + imdbID);
  };

  return service;
});

/* Controllers */
angular.module('movieApp')
  .controller('SearchController', function ($scope, movieApi) {    
    
    $scope.getById = function getById(index, imdbID) {
      movieApi
        .getById(imdbID)
        .then(function(data) {
          $scope.results[index].plot = data.Plot;
          $scope.results[index].poster = data.Poster;
          $scope.results[index].released = data.Released;
          $scope.results[index].rating = data.imdbRating;
          $scope.results[index].open = true;
        });
    };

    $scope.search = function search(query) {
      if (query && query.length > 2) {
        movieApi
          .search(query)
          .then(function(data) {
            if (data.Search) {
              //data.Search[0].open = true;
              $scope.results = data.Search;
            }
          });
      }
    };

  });