console.log("masterCtrl");

var app = angular.module('app');
var defaulthome = {
  h2_1: "Raise Funds, Volunteer, Promote Community Awareness &amp; Build Partnerships with the local business community",
  ourpurpose: "Our Purpose",
  mission: "MISSION",
  missionp: "Recognizing the desire of young professionals in Santa Clara County to contribute to the welfare of their communities and connect with like-minded peers, the VMC Foundation is introducing The Young Professional Council (YPC). YPC supports the efforts of the VMC Foundation to provide critical funds for the creation of the Women and Children’s Center at VMC. The focus of the Young Professional Council is to raise funds, volunteer, promote community awareness, and build partnerships with the local business community."
}

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
    if ($scope.loguser) {
      swal("Logout first before registering!");
      return; 
    };
    if (!$scope.username && !$scope.email) {
      swal("A username or email is required!");
      return; 
    };
    if ($scope.pw1 !== $scope.pw2) {
      swal("Passwords not the same!");
      return;
    };
    var user = {
      username: $scope.username,
      password: $scope.pw1,
      admin: $scope.isadmin
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


app.controller('homeCtrl', ['$scope', '$location', '$localStorage', 'usersFactory', 'editablesFactory', function($scope, $location, $localStorage, usersFactory, editablesFactory){
  console.log("homeCtrl");
  var homenames = ['missionp']; 
  $scope.loguser = null; 
  $scope.editables = null; 
  $scope.missionp = defaulthome.missionp;
  $scope.homeedit = {
    missionp: false
  }
  
  editablesFactory.index(function(data){
    console.log("homeCtrl editablesFactory index data: ", data);
    if (data.length > 0) {
      console.log("data returns true");
      $scope.editables = data; 
      homenames.forEach(function(homename){
        data.forEach(function(element){
          if(element.name === homename) {
            $scope[homename] = element.content;
          }
        })
      })
      // if (data.missionp) { $scope.missionp = data.missionp; };
    };
    usersFactory.getUser(function(data){
      console.log("homeCtrl usersFactory getUser, ", data);
      if (data) {
        $scope.loguser = data; 
        // $scope.newcollection.owner = data.username;
        $scope.username = data.username;
        usersFactory.show($scope.username, function(data){
          console.log("homeCtrl usersFactory show: ");
          console.log("data , ", data);
          // $scope.loguser._collections = data._collections; 
        })
      };
    })
  })


  $scope.toggleeditable = function(name){
    console.log("toggleeditable ", name);
    $scope['homeedit'][name] = true; 
  }

  $scope.saveeditable = function(name){
    console.log("saveeditable ", name);
    if ($scope.editables.length > 0) {
      // console.log("$scope.editables: ", $scope.editables);
      $scope.editables.forEach(function(editable, index){
        if (editable.name === name) {
          if ($scope[name] === editable.content) {
            $scope.homeedit[name] = false;
            return; 
          };
          var updatededitable = {
            name: name,
            content: $scope[name],
            page: "home"
          }
          $scope.editables[index].content = $scope[name]; 
          editablesFactory.update(updatededitable, function(data){
            console.log("editablesFactory update data: ", data);
            $scope.homeedit[name] = false;
            return; 
          })
        };
        
      })
    } else {
      var neweditable = {
        name: name,
        content: $scope[name],
        page: "home"
      }
      $scope.editables.push(neweditable); 
      editablesFactory.create(neweditable, function(data){
        console.log("editablesFactory create data: ", data);
        $scope.homeedit[name] = false;
        return; 
      })
    }
    
  }

  // $scope.togglemissionp = function(){
  //   console.log("togglemissionp");
  //   $scope.homeedit.missionp = true; 
  // }

  // $scope.savemissionp = function(){
  //   console.log("savemissionp");
  //   if ($scope.home) {
  //     $scope.home.missionp = $scope.missionp; 
  //     editablesFactory.update("missionp", function(data){
  //       console.log("editablesFactory update data: ", data);
  //       $scope.homeedit.missionp = false;
  //     })
  //   } else {
  //     $scope.home = {
  //       missionp: $scope.missionp 
  //     }
  //     editablesFactory.create($scope.home, function(data){
  //       console.log("editablesFactory create data: ", data);
  //       $scope.homeedit.missionp = false;
  //     })
  //   }
    
  // }

  // $scope.savehome = function(){
  //   console.log("savehome");
  // }

  $scope.makeEditable = function(div){
    console.log("div: ", div);
    div.style.border = "1px solid #000";
    div.style.padding = "20px";
    div.contentEditable = true;
  }

  $scope.makeReadOnly = function(div, cb){
    div.style.border = "none";
    div.style.padding = "0px";
    div.contentEditable = false;
     // alert("Run Ajax POST request here to save the div.innerHTML \ or div.textContent to the database.");
     console.log("Run Ajax POST request here to save the div.innerHTML \ or div.textContent to the database.");
     cb(); 
   }


   

  // $scope.users = [];
  // console.log($scope.users);

}])



// app.controller('homeCtrl', ['$scope', '$location', '$localStorage', 'usersFactory', 'hometextsFactory', function($scope, $location, $localStorage, usersFactory, hometextsFactory){
//   console.log("homeCtrl");
//   $scope.loguser = null; 
//   $scope.home = null; 
//   $scope.missionp = defaulthome.missionp;
//   $scope.homeedit = {
//     missionp: false
//   }
  
//   hometextsFactory.index(function(data){
//     console.log("homeCtrl hometextsFactory index data: ", data);
//     if (data) {
//       console.log("data returns true");
//       $scope.home = data; 
//       if (data.missionp) { $scope.missionp = data.missionp; };
//     };
//     usersFactory.getUser(function(data){
//       console.log("homeCtrl usersFactory getUser, ", data);
//       if (data) {
//         $scope.loguser = data; 
//         // $scope.newcollection.owner = data.username;
//         $scope.username = data.username;
//         usersFactory.show($scope.username, function(data){
//           console.log("homeCtrl usersFactory show: ");
//           console.log("data , ", data);
//           // $scope.loguser._collections = data._collections; 
//         })
//       };
//     })
//   })


//   $scope.togglemissionp = function(){
//     console.log("togglemissionp");
//     $scope.homeedit.missionp = true; 
//   }

//   $scope.savemissionp = function(){
//     console.log("savemissionp");
//     if ($scope.home) {
//       $scope.home.missionp = $scope.missionp; 
//       hometextsFactory.update("missionp", function(data){
//         console.log("hometextsFactory update data: ", data);
//         $scope.homeedit.missionp = false;
//       })
//     } else {
//       $scope.home = {
//         missionp: $scope.missionp 
//       }
//       hometextsFactory.create($scope.home, function(data){
//         console.log("hometextsFactory create data: ", data);
//         $scope.homeedit.missionp = false;
//       })
//     }
    
//   }

//   // $scope.savehome = function(){
//   //   console.log("savehome");
//   // }

//   $scope.makeEditable = function(div){
//     console.log("div: ", div);
//     div.style.border = "1px solid #000";
//     div.style.padding = "20px";
//     div.contentEditable = true;
//   }

//   $scope.makeReadOnly = function(div, cb){
//     div.style.border = "none";
//     div.style.padding = "0px";
//     div.contentEditable = false;
//      // alert("Run Ajax POST request here to save the div.innerHTML \ or div.textContent to the database.");
//      console.log("Run Ajax POST request here to save the div.innerHTML \ or div.textContent to the database.");
//      cb(); 
//    }




//   // $scope.users = [];
//   // console.log($scope.users);

// }])



