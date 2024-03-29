/* Create Application */
angular
  .module('movieApp', ['ngRoute', 'ngMockE2E', 'ui.bootstrap'])
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
  })
  .run(function ($httpBackend) {
    e2eMocks($httpBackend);
  });