(function () {
  'use strict';
  angular
    .module('savingsApp')
    .controller('ReceiptController', ReceiptController);

  ReceiptController.$inject = ['$scope','$state','$cordovaCamera', '$http'];

  function ReceiptController($scope, $state, $cordovaCamera, $http) {

      $scope.takePicture = function () {
          var options = {
            quality: 75,
            destinationType: Camera.DestinationType.DATA_URL,
            sourceType: Camera.PictureSourceType.CAMERA,
            allowEdit: true,
            encodingType: Camera.EncodingType.JPEG,
            targetWidth: 300,
            targetHeight: 300,
            popoverOptions: Camera.PopopverOptions,
            saveToPhotoAlbum: false
          };

        $cordovaCamera.getPicture(options).then(function (imageData) {
          $scope.imgSrc = "data:image/jpeg;base64," + imageData;
          $scope.imageData = imageData;
        }, function (err) {
          //error
        });
      };



      $scope.selectPicture = function () {
        var options = {
          destinationType: Camera.DestinationType.DATA_URL,
          sourceType: Camera.PictureSourceType.PHOTOLIBRARY
        };


        $cordovaCamera.getPicture(options).then(function (imageData) {
          $scope.imgSrc = "data:image/jpeg;base64," + imageData;
          $scope.imageData = imageData;
        }, function (err) {
          //error
        });

      };

    $scope.processRec1 = function () {

      var request = {
        method: 'POST',
        url: 'https://api.taggun.io/api/receipt/v1/simple/encoded',
        headers: {
          apikey: '8e5c7190fc9111e7ab51516b33cba1b5',
          'Content-Type': 'application/json',
          'Accept': 'application/json'
        },
        data: {
          image: $scope.imageData,
          filename: "example.jpg",
          contentType: "image/jpeg",
          refresh: false,
          incognito: false,
          ipAddress: "32.4.2.223",
          language: "en"
        }

      };

      $http(request)
        .success(function (response) {
          $scope.error = response;
          $scope.result = response.ParsedResults;
        })
        .error(function (response) {
            $scope.error = response;
        })

       // $state.go("amount");

    };
  }
})();
