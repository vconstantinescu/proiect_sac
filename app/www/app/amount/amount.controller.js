(function () {
  'use strict';
  angular
    .module('savingsApp')
    .controller('AmountController', AmountController);

  AmountController.$inject = ['$scope','$state', 'Memory'];

  function AmountController($scope, $state, memory) {

    if (memory.get('amount')) {
      $scope.amount = memory.get('amount');
    } else {
      $scope.amount = '';
    }
    $scope.category = '';

    function clearScope() {
      $scope.amount = '';
      $scope.category = '';
    }

    $scope.save = function () {
      var spendings = [];
      if (angular.isArray(memory.get('spendings'))) {
        spendings = memory.get('spendings');
      }
      var spending = {
        amount: $scope.amount,
        category: $scope.category
      };
      spendings.push(spending);
      memory.put('spendings', spendings);
      clearScope();
      $state.go("history");
    }
  }
})();
