angular.module("savingsApp", ["ngCordova","ionic"])

.run(function ($ionicPlatform) {
    $ionicPlatform.ready(function () {
      if(window.cordova && window.cordova.plugins.Keyboard) {
        cordova.plugins.Keyboard.hideKeyboardAccessoryBar(true);
        cordova.plugins.Keyboard.disableScroll(true);
      }
      if(window.StatusBar) {
        StatusBar.styleDefault();
      }
    });
})
.config(function ($stateProvider, $urlRouterProvider) {

  $stateProvider
    .state('login', {
      url: "/login",
      templateUrl: "app/login/login.html",
      controller: 'LoginController'
    })
    .state('register', {
      url: "/register",
      templateUrl: "app/register/register.html",
      controller: 'RegisterController'
    })
    .state('home', {
      url: "/home",
      templateUrl: "app/home/home.html",
      controller: 'HomeController'
    })
    .state('receipt', {
      url: "/receipt",
      templateUrl: "app/receipt/receipt.html",
      controller: 'ReceiptController'
    })
    .state('amount', {
      url: "/amount",
      templateUrl: "app/amount/amount.html",
      controller: 'AmountController'
    })
    .state('history', {
        url: "/history",
        templateUrl: "app/history/history.html",
        controller: 'HistoryController'
      });
  $urlRouterProvider.otherwise("/login");
});
