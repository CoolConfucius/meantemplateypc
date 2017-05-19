console.log("masterCtrl");

var app = angular.module('app');

app.controller('navCtrl', ['$scope', '$state', '$location', 'usersFactory', function($scope, $state, $location, usersFactory){
  console.log("navCtrl");
  console.log("$location: ", $location.url());
  $scope.$url = $location.url(); 
  $scope.loguser = null; 
  usersFactory.getUser(function(data){
    $scope.loguser = data; 
    console.log("navCtrl usersFactory getUser, ", data);
  })

  $scope.login = function(){
    var user = {
      password: $scope.logpassword,
      username: $scope.logusername
    }
    usersFactory.login(user, function(data){
      console.log('login data', data);
      if (data === "No user in the database" || data === "Invalid password") {
        swal(data);  
      } else {
        $scope.loguser = data; 
        $state.go('home');
      }
    })
  }

  $scope.logout = function(){
    console.log("Logging out");
    usersFactory.logout(function(){
      $scope.loguser = null;   
      $state.go('home')
    })
  }

  $scope.active = function(string){
    console.log(string);
    $scope.$url = string;
  }

}])


app.controller('registerCtrl', ['$scope', '$state', '$localStorage', 'usersFactory', function($scope, $state, $localStorage, usersFactory){
  console.log("registerCtrl");
  $scope.username = '';
  $scope.isadmin = false; 

  $scope.register = function(){
    if ($scope.pw1 !== $scope.pw2) {
      swal("Passwords not the same!");
      return;
    };
    var user = {
      username: $scope.username,
      password: $scope.pw1
    }
    usersFactory.register(user, function(data){
      console.log("user controller factory register", data);
      if (data === "Username already taken") {
        swal("Username already taken!");  
      } else {
        $scope.loguser = data; 
        $state.go('home');
      }
    })
  }


  

}])

app.controller('homeCtrl', ['$scope', '$location', 'usersFactory', function($scope, $location, usersFactory){
  console.log("homeCtrl");
  
  $scope.loguser = null; 
  usersFactory.getUser(function(data){
    console.log("navCtrl usersFactory getUser, ", data);
    if (data) {
      $scope.loguser = data; 
      $scope.newcollection.owner = data.username;
      $scope.username = data.username;
      usersFactory.show($scope.username, function(data){
        console.log("homeCtrl usersFactory show: ");
        console.log("data , ", data);
        $scope.loguser._collections = data._collections; 
      })
    };
  })

  

  $scope.users = [];

  console.log($scope.users);

}])



