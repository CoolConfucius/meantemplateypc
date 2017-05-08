console.log("appjs");
var app = angular.module('app', ["ui.router", "ngStorage"]);
app.config(function($stateProvider, $urlRouterProvider){
  $stateProvider
  .state('home', { 
    url: '/', templateUrl: 'partials/home.html'
    // , 
    // controller: 'homeCtrl' 
  })
  .state('register', { 
    url: '/register', templateUrl: 'partials/register.html'
    // , 
    // controller: 'registerCtrl' 
  })


  $urlRouterProvider.otherwise('/');
});

app.run(function($rootScope, usersFactory){
  console.log("App.run! ");
  usersFactory.getUser(function(data){
    $rootScope.rootuser = data; 
  }); 
})
