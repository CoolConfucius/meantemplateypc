console.log("appjs");
var app = angular.module('app', ["ui.router", "ngStorage"]);
app.config(function($stateProvider, $urlRouterProvider){
  $stateProvider
  .state('home', { 
    url: '/', templateUrl: 'partials/home.html',
    controller: 'homeCtrl'    
  })
  .state('blog', { 
    url: '/blog', templateUrl: 'partials/blog.html'    
  })
  .state('contact', { 
    url: '/contact', templateUrl: 'partials/contact.html'    
  })
  .state('donate', { 
    url: '/donate', templateUrl: 'partials/donate.html'    
  })
  .state('events', { 
    url: '/events', templateUrl: 'partials/events.html'    
  })
  .state('execs', { 
    url: '/execs', templateUrl: 'partials/executives.html'    
  })
  .state('join', { 
    url: '/join', templateUrl: 'partials/join.html',
    controller: 'registerCtrl'
  })
  .state('post', { 
    url: '/post', templateUrl: 'partials/post.html'    
  })
  .state('sign_in', { 
    url: '/sign_in', templateUrl: 'partials/sign_in.html',
    controller: 'navCtrl'
  })


  $urlRouterProvider.otherwise('/');
});

app.run(function($rootScope, usersFactory, editablesFactory){
  console.log("App.run! ");
  editablesFactory.index(function(data){
    $rootScope.rooteditables = data; 
  }); 
  usersFactory.getUser(function(data){
    $rootScope.rootuser = data; 
  }); 
})
