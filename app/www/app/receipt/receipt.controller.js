(function () {
  'use strict';
  angular
    .module('savingsApp')
    .controller('ReceiptController', ReceiptController);

  ReceiptController.$inject = ['$scope','$state','$cordovaCamera'];

  function ReceiptController($scope, $state, $cordovaCamera) {

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
        }, function (err) {
          //error
        });
      };



      $scope.selectPicture = function () {
        var options = {
          destinationType: Camera.DestinationType.FILE_URI,
          sourceType: Camera.PictureSourceType.PHOTOLIBRARY
        };


        $cordovaCamera.getPicture(options).then(function (imageUri) {
          $scope.imgSrc = imageUri;
        }, function (err) {
          //error
        });

      };
  }
})();
