describe('Factory: popularMoviesFactory', function() {

  var $httpBackend;
  var popularMovies;
  
  beforeEach(module('movieApp'));

  beforeEach(inject(function (_$httpBackend_, _popularMovies_) {
    $httpBackend = _$httpBackend_;
    popularMovies = _popularMovies_;
  }));

  it('should return search data', function() {
    $httpBackend
      .whenGET('http://localhost:3000/api/movies/popular')
      .respond([1, 2, 3]);

    var returnedData;

    popularMovies
      .get()
      .then(function(data) {
        returnedData = data;
      });

    $httpBackend.flush();

    expect(returnedData).not.toBe(undefined);
  });

  it('should catch http error', function() {
    $httpBackend
      .whenGET(/.*/)
      .respond(500);

    var handlesError = false;

    popularMovies
      .get()
      .catch(function() {
        handlesError = true;
      });

    $httpBackend.flush();

    expect(handlesError).toBe(true);
  });

});