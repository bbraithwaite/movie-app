## Setup

Install Node.js
Run: npm install karma

Show how Jamsine can be used without any localhost, server or NPM option.

'public/tests/**/*.js'

Go through Karma init process.

``` javascript
describe('Name of the group', function() {
  
  it('should behave...', function() {
    
    var one = 2;

    expect(one).toBe(2);

  });

});
```

### Angular Stuff

cd lib/
curl -O https://code.angularjs.org/1.4.4/angular.min.js
curl -O https://code.angularjs.org/1.4.4/angular-mocks.min.js
