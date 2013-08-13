'use strict'

# I know you're not meant to do this, but not having an array removal function
# is incredibly annoying. Nice one JavaScript.
Array::remove = (e) -> @splice i, 1 if (i = @indexOf e) isnt -1

angular.module('resourceFoundryApp', ['resourceFoundryDirectives', 'resourceFoundryServices', 'resourceFoundryData', 'ui.bootstrap', 'ngResource'])
  .config ($routeProvider, $locationProvider) ->
    $routeProvider
      .when '/',
        templateUrl: 'views/main.html'
        controller: 'MainCtrl'
      .when '/edit/:id',
        templateUrl: 'views/main.html'
        controller: 'MainCtrl'
      .when '/list/:path',
        templateUrl: 'views/list.html'
        controller: 'ListCtrl'
      .otherwise
        redirectTo: '/'

    # $locationProvider.html5Mode true
    return
