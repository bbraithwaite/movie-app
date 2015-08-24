angular.module('movieApp')
.filter('fromnow', function fromNowFilter() {
  return function fromNowFilter(value, baseDate) {

    if (!value) { throw 'date value cannot be undefined'; }

    var date = value;

    if (typeof(value) === 'string') {
      date = new Date(date);
    }

    if (isNaN(date.getTime())) {
      return value;
    }

    var now = baseDate || new Date();
    var yearsInMs = 60 * 60 * 24 * 365;
    var monthsInMs = 60 * 60 * 24 * 30;
    var diffInMs = (now.getTime() - date.getTime()) / 1000 + (now.getTimezoneOffset() - date.getTimezoneOffset()) * 60;

    var yearsDiff  = diffInMs / yearsInMs;
    var monthsDiff  = diffInMs / monthsInMs;

    if (yearsDiff > 1) {
      yearsDiff = Math.floor(yearsDiff);
      return (yearsDiff === 1) ? '1 year ago' : yearsDiff + ' years ago';
    } else {
      monthsDiff = Math.floor(monthsDiff);
      return (monthsDiff === 1) ? '1 month ago' : monthsDiff + ' months ago';
    }    
  };
});
