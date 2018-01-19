(function () {
  'use strict';
  angular
    .module('savingsApp')
    .controller('HomeController', HomeController);

  HomeController.$inject = ['$scope','$state'];

  function HomeController($scope, $state) {

    $scope.receipt = function () {
      $state.go("receipt");
    };

    $scope.history = function () {
      $state.go("history");
    };

    $scope.expenses = function () {
      $state.go("expenses");
    };
  }
})();

