(function () {
  'use strict';
  angular
    .module('savingsApp')
    .service('UserService', function() {
      // For the purpose of this example I will store user data on ionic local storage but you should save it on a database

      var setUser = function(user_data) {
        window.localStorage.starter_google_user = JSON.stringify(user_data);
      };

      var getUser = function(){
        return JSON.parse(window.localStorage.starter_google_user || '{}');
      };

      return {
        getUser: getUser,
        setUser: setUser
      };
    })
    .controller('LoginController', LoginController);

  LoginController.$inject = ['$scope','$state', '$http', 'UserService', '$ionicLoading'];

  function LoginController($scope, $state, $http,  UserService, $ionicLoading) {

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

    // This method is executed when the user press the "Sign in with Google" button
    $scope.googleSignIn = function() {
      $ionicLoading.show({
        template: 'Logging in...'
      });

      window.plugins.googleplus.login(
        {},
        function (user_data) {
          // For the purpose of this example I will store user data on local storage
          UserService.setUser({
            userID: user_data.userId,
            name: user_data.displayName,
            email: user_data.email,
            picture: user_data.imageUrl,
            accessToken: user_data.accessToken,
            idToken: user_data.idToken
          });

          $ionicLoading.hide();
          $state.go('home');
        },
        function (msg) {
          $ionicLoading.hide();
        }
      );
    };


  }
})();

