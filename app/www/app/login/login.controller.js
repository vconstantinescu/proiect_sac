(function () {
  'use strict';
  angular
    .module('savingsApp')
    .controller('LoginController', LoginController);

  LoginController.$inject = ['$scope','$state'];

  function LoginController($scope, $state) {

    $scope.register = function () {$state.go('register');}


  }
})();

