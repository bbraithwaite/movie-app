/* Create Application */
angular
  .module('movieApp', ['ngRoute', 'ui.bootstrap'])
  .config(function ($routeProvider) {
    $routeProvider
      .when('/', {
        templateUrl: 'views/home.html',
        controller: 'HomeController'
      })
      .when('/results', {
        templateUrl: 'views/search-results.html',
        controller: 'SearchResultsController'
      })
      .otherwise({
        redirectTo: '/'
      });
  });
