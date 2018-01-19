(function () {
  'use strict';
  angular
    .module('savingsApp')
    .controller('AmountController', AmountController);

  AmountController.$inject = ['$scope','$state', 'Memory'];

  function AmountController($scope, $state, memory) {

    $scope.amount = memory.get('amount');

    $scope.save = function () {
      var spendings = [];
      var spending = {
        amount: $scope.amount,
        category: $scope.category
      };
      spendings.push(spending);
      memory.put('spendings', spendings);
    }
  }
})();
