describe('Controller: SearchResultsController', function() {

  var location;
  var q;
  var scope;
  var omdbApi;
  var controller;
  var rootScope;

  beforeEach(module('movieApp'));

  beforeEach(inject(function (_$rootScope_, _$controller_, _$location_, _$q_, _omdbApi_) {
    location = _$location_;
    omdbApi = _omdbApi_;
    rootScope = _$rootScope_;
    scope = _$rootScope_.$new();
    controller = _$controller_;
    q = _$q_;
  }));

  it('should get populate first search result by default', function() {
    spyOn(omdbApi, 'getById').and.callFake(function() {
      var deferred = q.defer();

      if (omdbApi.getById.calls.mostRecent().args[0] === 'tt1000') {
        deferred.resolve({ Title: 'Terminator' });
      } else if (omdbApi.getById.calls.mostRecent().args[0] === 'tt2000') {
        deferred.resolve({ Title: 'Star Wars' });
      } else {
        deferred.reject();
      }
      
      return deferred.promise;
    });

    spyOn(omdbApi, 'search').and.callFake(function() {
      var deferred = q.defer();
      deferred.resolve({ Search: [{ imdbID: 'tt1000' }, { imdbID: 'tt2000' }] });
      return deferred.promise;
    });

    controller('SearchResultsController', {
      $scope: scope
    });

    scope.getById(1, 'tt2000');

    rootScope.$apply();

    expect(scope.results[0].data.Title).toBe('Terminator');
    expect(scope.results[1].data.Title).toBe('Star Wars');
  });

  it('should get search results', function() {
    spyOn(omdbApi, 'getById').and.callFake(function() {
      var deferred = q.defer();

      if (omdbApi.getById.calls.argsFor(0)[0] === 'tt1000') {
        deferred.resolve({ Title: 'Terminator' });
      } else {
        deferred.reject();
      }
      
      return deferred.promise;
    });

    spyOn(omdbApi, 'search').and.callFake(function() {
      var deferred = q.defer();
      deferred.resolve({ Search: [{ imdbID: 'tt1000' }] });
      return deferred.promise;
    });

    controller('SearchResultsController', {
      $scope: scope
    });


    rootScope.$apply();

    expect(scope.results[0].data.Title).toBe('Terminator');
  });

});