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
    return callService(baseUrl + '&plot=short&i=' + imdbID);
  };

  return service;
});
