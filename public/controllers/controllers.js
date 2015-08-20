angular.module('movieApp')
  .controller('HomeController', function ($scope, $interval, movieApi) {

    var idx = 0;
    var ids = ['tt0103064', 'tt0088247', 'tt0181852', 'tt0438488'];

    movieApi
      .getById(ids[ids.length - 1])
      .then(function(data) {
        $scope.plot = data.Plot;
        $scope.title = data.Title;
        $scope.poster = data.Poster;
        $scope.released = data.Released;
        $scope.actors = data.Actors;
        $scope.director = data.Director;
        $scope.rating = data.imdbRating;
      });

    $interval(function() {
      idx++;

      movieApi
        .getById(ids[idx % ids.length])
        .then(function(data) {
          $scope.plot = data.Plot;
          $scope.title = data.Title;
          $scope.poster = data.Poster;
          $scope.released = data.Released;
          $scope.rating = data.imdbRating;
        });
    }, 5000);

  })
  .controller('SearchController', function ($scope, $location) {
    $scope.search = function() {
      if ($scope.query) {
        $location.path('/results').search('q', $scope.query);
      }
    };
  })
  .controller('SearchResultsController', function ($rootScope, $scope, $location, movieApi) {    
    var query = $location.search().q;

    $rootScope.query = query;

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

    if (query && query.length > 2) {
      movieApi
      .search(query)
      .then(function(data) {
        if (data.Search) {
          $scope.getById(0, data.Search[0].imdbID);
          $scope.results = data.Search;
        }
      });
    }



  });