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
  .config(function($sceDelegateProvider) {
    $sceDelegateProvider.resourceUrlWhitelist([
      // Allow same origin resource loads.
      'self',
      // Allow loading from our assets domain.  Notice the difference between * and **.
      'http://ia.media-imdb.com/images/**'
    ]);
  })
  .run(function ($httpBackend) {
    e2eMocks($httpBackend);
  });