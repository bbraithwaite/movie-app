angular.module('movieApp')
.filter('fromnow', function createFromNowFilter() {
  return function fromNowFilter(value, baseDate) {
    var date = new Date(value);
    if (!angular.isDate(date)) {
      return value;
    }

    var now = baseDate || new Date();
    var yearsInMs = 60 * 60 * 24 * 365;
    var monthsInMs = 60 * 60 * 24 * 30;
    var diffInMs = (now.getTime() - date.getTime()) / 1000 + (now.getTimezoneOffset() - date.getTimezoneOffset()) * 60;

    var yearsDiff  = diffInMs / yearsInMs;

    if (yearsDiff > 1) {
      yearsDiff = Math.floor(yearsDiff);
      return (yearsDiff === 1) ? '1 year ago' : yearsDiff + ' years ago';
    } else {
      return Math.floor(diffInMs / monthsInMs) + ' months ago';
    }    
  };
});
