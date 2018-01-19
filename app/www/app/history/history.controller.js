(function () {
  'use strict';
  angular
    .module('savingsApp')
    .controller('HistoryController', HistoryController);

  HistoryController.$inject = ['$scope','$state', 'Memory'];

  function HistoryController($scope, $state, memory) {

    if (angular.isArray(memory.get('spendings'))) {
          $scope.spendings = memory.get('spendings');
    }
  }
})();
