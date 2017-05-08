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
  .state('addlink', { 
    url: '/addlink', templateUrl: 'partials/addlink.html'
    // , 
    // controller: 'navCtrl' 
  })
  .state('collection', { 
    url: '/collections/:collectionid', templateUrl: 'partials/collection.html'
    // , 
    // controller: 'collectionCtrl' 
  })
  .state('profile', { 
    url: '/users/:username', templateUrl: 'partials/profile.html'
    // , 
    // controller: 'profileCtrl' 
  })
  .state('usercollections', { 
    url: '/usercollections/:username', templateUrl: 'partials/usercollections.html'
    // , 
    // controller: 'profileCtrl' 
  })
  .state('userlinks', { 
    url: '/userlinks/:username', templateUrl: 'partials/userlinks.html'
    // , 
    // controller: 'profileCtrl' 
  })


  $urlRouterProvider.otherwise('/');
});

app.run(function($rootScope, usersFactory){
  console.log("App.run! ");
  usersFactory.getUser(function(data){
    $rootScope.rootuser = data; 
  }); 
})
