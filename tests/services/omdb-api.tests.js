describe('Factory: omdbApiFactory', function() {

  var $httpBackend;
  var omdbApi;
  
  beforeEach(module('movieApp'));

  beforeEach(inject(function (_$httpBackend_, _omdbApi_) {
    $httpBackend = _$httpBackend_;
    omdbApi = _omdbApi_;
  }));

  describe('search', function() {

    it('should return search data', function() {
      $httpBackend
        .whenGET('http://www.omdbapi.com/?v=1&s=star%20wars')
        .respond({ Search: [] });

      var returnedData;

      omdbApi
        .search('star wars')
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

      omdbApi
        .search('star wars')
        .catch(function() {
          handlesError = true;
        });

      $httpBackend.flush();

      expect(handlesError).toBe(true);
    });

  });

  describe('get by id', function() {

    it('should return data by id', function() {
      $httpBackend
        .whenGET('http://www.omdbapi.com/?v=1&plot=short&i=tt1000')
        .respond({ Search: [] });

      var returnedData;

      omdbApi
        .getById('tt1000')
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

      omdbApi
        .getById('tt1000')
        .catch(function() {
          handlesError = true;
        });

      $httpBackend.flush();

      expect(handlesError).toBe(true);
    });

    
  });

});