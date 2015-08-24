describe('Controller: SearchController', function() {

  var location;
  var scope;
  var timeout;

  beforeEach(module('movieApp'));

  beforeEach(inject(function (_$rootScope_, _$controller_, _$location_, _$timeout_) {
    location = _$location_;
    scope = _$rootScope_.$new();
    timeout = _$timeout_;
    _$controller_('SearchController', {
      $scope: scope
    });
  }));

  it('should redirect query to results page', function() {
    scope.query = 'star wars';
    scope.search();
    expect(location.url()).toBe('/results?q=star%20wars');
  });

  it('should not redirect query to results page for empty query', function() {
    scope.query = '';
    scope.search();
    expect(location.url()).toBe('');
  });

  it('should cancel timeout on search', function() {
    scope.keyup();
    scope.search();
    expect(timeout.verifyNoPendingTasks).not.toThrow();
  });

  it('should cancel timeout on keydown', function() {
    scope.keyup();
    scope.keydown();
    expect(timeout.verifyNoPendingTasks).not.toThrow();
  });

  it('should redirect to results after 1 second of inactivity', function() {
    scope.query = 'star wars';
    scope.keyup();
    timeout.flush();
    expect(location.url()).toBe('/results?q=star%20wars');
  });

});