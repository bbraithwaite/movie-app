describe('Directives: FilmResult', function() {
  
  var compilel
  var rootScope;

  beforeEach(module('movieApp'));

  beforeEach(inject(function(_$compile_, _$rootScope_){
    compile = _$compile_;
    rootScope = _$rootScope_;
  }));

  it('should display the correct movie data', function() {
    
    rootScope.data = {
      Poster: 'foo.jpg',
      Title: 'Terminator',
      Director: 'James Cameron',
      Actors: 'Arnold Schwarzenegger',
      Released: '26 Oct 1984',
      Genre: 'Science-fiction',
    };

    var element = compile("<film-result data='data'></film-result>")(rootScope);

    rootScope.$digest();

    expect(element.html()).toBe('<div class="col-sm-4"><img ng-src="foo.jpg" alt="Terminator" width="220" src="foo.jpg"></div><div class="col-sm-8"><h3 class="ng-binding">Terminator</h3><p class="ng-binding"></p><p class="ng-binding"><strong>Director:</strong> James Cameron</p><p class="ng-binding"><strong>Actors:</strong> Arnold Schwarzenegger</p><p class="ng-binding"><strong>Released:</strong> 26 Oct 1984 (30 years ago)</p><p class="ng-binding"><strong>Genre:</strong> Science-fiction</p><rating ng-model="data.imdbRating" max="10" readonly="true" class="ng-pristine ng-untouched ng-valid"></rating></div>');

    expect(rootScope.$countChildScopes()).toBe(1);
    expect(rootScope.$countWatchers()).toBe(12);

  });

});