'use strict';

function e2eMocks($httpBackend) {
  
  // search
  $httpBackend.whenGET(function(s) {
    return (s.indexOf('http://localhost:3000') !== -1);
  }).respond(200, ['tt0087538', 'tt0089218', 'tt0103064', 'tt0133093', 'tt0076759', 'tt0093894', 'tt0111161', 'tt0088763']);


  $httpBackend.whenGET(/.*/).passThrough();
}