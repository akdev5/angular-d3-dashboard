// Generated by CoffeeScript 1.6.3
(function() {
  "use strict";
  angular.module("jobFoundryApp").controller("LandingCtrl", function($http, $scope) {
    $scope.subscribe = false;
    return $http.get('/api/v1/content/options').success(function(options) {
      return $scope.options = options;
    });
  });

}).call(this);
