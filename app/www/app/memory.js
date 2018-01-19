angular
  .module('savingsApp')
  .factory('Memory', ['$cacheFactory', function($cacheFactory) {
    return $cacheFactory('memory');
  }]);
