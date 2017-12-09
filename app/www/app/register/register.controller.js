(function () {
  'use strict';
  angular
    .module('savingsApp')
    .controller('RegisterController', RegisterController);

  RegisterController.$inject = ['$scope','$state'];

  function RegisterController($scope, $state) {

    $scope.cancel = function () { $state.go("login");}



  }
})();

