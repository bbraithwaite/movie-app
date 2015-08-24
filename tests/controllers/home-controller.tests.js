describe('Controller: HomeController', function() {

  var popularMovies;
  var omdbApi;
  var scope;
  var rootScope;
  var controller;
  var q;
  var interval;

  beforeEach(module('movieApp'));

  beforeEach(inject(function (_$rootScope_, _$controller_, _$q_, _$interval_, _popularMovies_, _omdbApi_) {
    popularMovies = _popularMovies_;
    omdbApi = _omdbApi_;
    rootScope = _$rootScope_;
    scope = _$rootScope_.$new();
    controller = _$controller_;
    q = _$q_;
    interval = _$interval_;
  }));

  it('should redirect query to results page', function() {
    spyOn(popularMovies, 'get').and.callFake(function() {
      var deferred = q.defer();
      deferred.resolve(['tt1000', 'tt2000', 'tt3000']);
      return deferred.promise;
    });

    spyOn(omdbApi, 'getById').and.callFake(function() {
      var deferred = q.defer();
      var args = omdbApi.getById.calls.mostRecent().args[0];

      if (args === 'tt3000') {
        deferred.resolve({ Title: 'Terminator' });
      } else if (args === 'tt2000') {
        deferred.resolve({ Title: 'Star Wars' });
      } else if (args === 'tt1000') {
        deferred.resolve({ Title: 'Back to the Future' });
      } else {
        deferred.reject();
      }
      
      return deferred.promise;
    });

    controller('HomeController', {
      $scope: scope
    });
    
    rootScope.$apply();

    expect(scope.data).toEqual({ Title: 'Terminator' });

    interval.flush(5000);
    interval.flush(5000);
    interval.flush(5000);

    expect(omdbApi.getById.calls.argsFor(0)).toEqual(['tt3000']);
    expect(omdbApi.getById.calls.argsFor(1)).toEqual(['tt1000']);
    expect(omdbApi.getById.calls.argsFor(2)).toEqual(['tt2000']);
    expect(omdbApi.getById.calls.argsFor(3)).toEqual(['tt3000']);
  });

});