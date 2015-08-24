describe('Filters: fromnow', function() {
  
  var fromnow;

  beforeEach(module('movieApp'));

  beforeEach(inject(function (_$filter_) {
    fromnow = _$filter_('fromnow');
  }));

  it('should return same value for invalid date', function() {
    expect(fromnow('foo')).toBe('foo');
  });  

  it('should return value for date object', function() {
    var value = new Date('1-Jan-2015');
    var baseDate = new Date('1-Aug-2015');
    expect(fromnow(value, baseDate)).toBe('7 months ago');
  });

  it('should return value for string in valid date format', function() {
    var value = new angular.mock.TzDate(0, '2015-01-01T00:00:00.000Z');
    var baseDate = new angular.mock.TzDate(0, '2015-08-01T21:00:00.000Z');
    expect(fromnow(value, baseDate)).toBe('7 months ago');
  });

  it('should return value of one month ago for date object', function() {
    var value = new angular.mock.TzDate(0, '2015-07-01T00:00:00.000Z');
    var baseDate = new angular.mock.TzDate(0, '2015-08-01T21:00:00.000Z');
    expect(fromnow(value, baseDate)).toBe('1 month ago');
  }); 

  it('should return value of one year ago for date object', function() {
    var value = new angular.mock.TzDate(0, '2014-07-01T00:00:00.000Z');
    var baseDate = new angular.mock.TzDate(0, '2015-08-01T21:00:00.000Z');
    expect(fromnow(value, baseDate)).toBe('1 year ago');
  }); 

  it('should return value of years ago for date object', function() {
    var value = new angular.mock.TzDate(0, '2013-07-01T00:00:00.000Z');
    var baseDate = new angular.mock.TzDate(0, '2015-08-01T21:00:00.000Z');
    expect(fromnow(value, baseDate)).toBe('2 years ago');
  }); 

});