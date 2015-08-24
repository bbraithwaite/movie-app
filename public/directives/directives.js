angular.module('movieApp')
  .directive('filmResult', function () {
      return {
          restrict: 'E',
          replace: true,
          scope: {
            data: '=data'
          },
          template: [
            '<div class="row" ng-show="data">',
            '<div class="col-sm-4"><img ng-src="{{data.Poster}}" alt="{{data.Title}}" width="220"></div>',
            '<div class="col-sm-8">',
                '<h3>{{data.Title}}</h3>',
                '<p>{{data.Plot}}</p>',
                '<p><strong>Director:</strong> {{data.Director}}</p>',
                '<p><strong>Actors:</strong> {{data.Actors}}</p>',
                '<p><strong>Released:</strong> {{data.Released}} ({{data.Released | fromnow}})</p>',
                '<p><strong>Genre:</strong> {{data.Genre}}</p>',
                '<rating ng-model="data.imdbRating" max="10" readonly="true"></rating>',
            '</div>',
            '</div>'
          ].join('')
      };
  });