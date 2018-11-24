
var myapp = angular.module('myApp', ['ngRoute']);
 

    myapp.config(['$routeProvider',
      function($routeProvider) {
          console.log($routeProvider);
        $routeProvider.

          when('/login', {
            templateUrl: 'templates/login.html',
            controller: 'loginCtrl'
          }),

          $routeProvider.
        
          when('/dashBoard', {
            templateUrl: 'templates/dashBoard.html',
            controller: 'dashBoardCtrl'
          })
          
        
          .otherwise({
            redirectTo: '/login'
          });
      }]);

    myapp.controller('dashBoardCtrl', function($scope) {
    console.log("dashBoardCtrl");
})
    myapp.controller('loginCtrl', function($scope) {
    console.log("loginCtrl");
});

 