(function () {
  'use strict';
  angular
    .module('savingsApp')
    .controller('LoginController', LoginController);

  LoginController.$inject = ['$scope','$state', '$http'];

  function LoginController($scope, $state, $http) {

    $scope.username = "";
    $scope.password = "";

    $scope.register = function () {$state.go('register');}

    $scope.login = function () {
      $http({
        method: 'POST',
        url: '/someUrl/login',
        data: {
          'username': $scope.username,
          'password': $scope.password
        }
      }).then(function successCallback(response) {
        // this callback will be called asynchronously
        // when the response is available
        state.go("home");
      }, function errorCallback(response) {
        // called asynchronously if an error occurs
        // or server returns response with an error status.
        console.log("yey-wrong");
        //todo remove this:
        $state.go("home");

      });
  }


  }
})();

