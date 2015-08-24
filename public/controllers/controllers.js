angular.module('movieApp')
  .controller('HomeController', function ($scope, $interval, popularMovies, omdbApi, $log) {
    var idx = 0;
    var ids;

    var getMovieData = function getMovieData(imdbID) {
      $log.log('calling movie data for: ' + imdbID);
      omdbApi.getById(imdbID)
        .then(function(data) {
          $log.log('data from omdbApi.getById: ' + JSON.stringify(data));
          $scope.data = data;
        });
    };

    popularMovies.get()
      .then(function(data) {
        ids = data;
        $log.log('data from popular movies: ' + data);
        getMovieData(ids[ids.length - 1]);
        $interval(function() {
          getMovieData(ids[idx % ids.length]);
          idx++;
        }, 5000);
      });
      
  })
  .controller('SearchController', function ($scope, $location, $timeout) {
    var timeout;

    $scope.keyup = function() {
      timeout = $timeout(function() {
        $scope.search();
      }, 1000);
    };

    $scope.keydown = function() {
      $timeout.cancel(timeout);
    };

    $scope.search = function() {
      $timeout.cancel(timeout);
      if ($scope.query) {
        $location.path('/results').search('q', $scope.query);
      }
    };

  })
  .controller('SearchResultsController', function ($rootScope, $scope, $location, omdbApi) {    
    var query = $location.search().q;

    $rootScope.query = query;

    $scope.getById = function getById(index, imdbID) {
      omdbApi
        .getById(imdbID)
        .then(function(data) {
          $scope.results[index].data = data;
          $scope.results[index].open = true;
        });
    };

    omdbApi.search(query)
      .then(function(data) {
        if (data.Search) {
          $scope.getById(0, data.Search[0].imdbID);
          $scope.results = data.Search;
        }
      });

  });