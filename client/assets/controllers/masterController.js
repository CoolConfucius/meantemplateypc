console.log("masterCtrl");

var app = angular.module('app');
var defaulthome = {
  join: "Join",
  donate: "Donate",
  ourpurpose: "Our Purpose",
  mission: "MISSION",
  missionp: "Recognizing the desire of young professionals in Santa Clara County to contribute to the welfare of their communities and connect with like-minded peers, the VMC Foundation is introducing The Young Professional Council (YPC). YPC supports the efforts of the VMC Foundation to provide critical funds for the creation of the Women and Children’s Center at VMC. The focus of the Young Professional Council is to raise funds, volunteer, promote community awareness, and build partnerships with the local business community.",
  whoweare: "Who we are",
  aboutus: "ABOUT US",
  aboutusp: "The YPC is composed of emerging leaders in the business community who are dedicated to promoting the level of health care in the County of Santa Clara and addressing the current health-related issues affecting the community. Members, ages 21-35, contribute by engaging their energy and talents to advance the mission of the Santa Clara Valley Medical Center. These young leaders enhance the positive impact of the VMC Foundation while advancing their personal and professional goals and expanding their professional networks.",
  connectwith: "Connect with like-minded professionals",
  happy: "HAPPY MEMBERS",
  happyp: "Come see what the community has to say about their experience with YPC.",
  member1p: "Facilis ipsum reprehenderit nemo molestias. Aut cum mollitia reprehenderit. Eos cumque dicta adipisci architecto culpa amet.",
  member1: "Mike Adam",
  member2p: "Dignissimos asperiores vitae velit veniam totam fuga molestias accusamus alias autem provident. Odit ab aliquam dolor eius. Facilis ipsum reprehenderit nemo molestias. Aut cum mollitia reprehenderit. Eos cumque dicta adipisci architecto culpa amet.",
  member2: "Eric Miller",
  member3p: "Dignissimos asperiores vitae velit veniam totam fuga molestias accusamus alias autem provident. Odit ab aliquam dolor eius. Facilis ipsum reprehenderit nemo molestias. Aut cum mollitia reprehenderit. Eos cumque dicta adipisci architecto culpa amet.",
  member3: "Eric Miller",
  member4p: "Facilis ipsum reprehenderit nemo molestias. Aut cum mollitia reprehenderit. Eos cumque dicta adipisci architecto culpa amet.",
  member4: "Mike Adam"
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

  $scope.usernameerrorshow = false;
  $scope.usernameerror = "No username.";

  $scope.first_nameerrorshow = false;
  $scope.first_nameerror = "No first name.";

  $scope.last_nameerrorshow = false;
  $scope.last_nameerror = "No last name.";

  $scope.phoneerrorshow = false;
  $scope.phoneerror = "No Phone Number.";

  $scope.emailerrorshow = false;
  $scope.emailerror = "No E-Mail Address.";

  $scope.pw1errorshow = false;
  $scope.pw1error = "No Password Entered.";

  $scope.pw2errorshow = false;
  $scope.pw2error = "Passwords Do Not Match.";


  $scope.register = function(){
    if ($scope.loguser) {
      swal("Logout first before registering!");
      return;
    };
    if (!$scope.username && !$scope.email) {
      $scope.usernameerrorshow = true;
      return;
    };
    if (!$scope.first_name) {
      $scope.first_nameerrorshow = true;
      return;
    };
    if (!$scope.last_name) {
      $scope.last_nameerrorshow = true;
      return;
    };
    if (!$scope.phone) {
      $scope.phoneerrorshow = true;
      return;
    };
    if (!$scope.email) {
      $scope.emailerrorshow = true;
      return;
    };
    // if (!$scope.pw1) {
    //   $scope.pw1errorshow = true;
    //   return;
    // };
    if ($scope.pw1 !== $scope.pw2) {
      $scope.pw2errorshow = true;
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
  var homenames = ['join', 'donate', 'ourpurpose', 'mission', 'missionp', 'whoweare', 'aboutus', 'aboutusp', 'connectwith', 'happy', 'happyp', 'member1p', 'member1', 'member2p', 'member2', 'member3p', 'member3', 'member4p', 'member4'];
  $scope.loguser = null;
  $scope.token = $localStorage.token;
  $scope.editables = [];
  $scope.join = defaulthome.join;
  $scope.donate = defaulthome.donate;
  $scope.ourpurpose = defaulthome.ourpurpose;
  $scope.mission = defaulthome.mission;
  $scope.missionp = defaulthome.missionp;
  $scope.whoweare = defaulthome.whoweare;
  $scope.aboutus = defaulthome.aboutus;
  $scope.aboutusp = defaulthome.aboutusp;
  $scope.connectwith = defaulthome.connectwith;
  $scope.happy = defaulthome.happy;
  $scope.happyp = defaulthome.happyp;
  $scope.member1p = defaulthome.member1p;
  $scope.member1 = defaulthome.member1;
  $scope.member2p = defaulthome.member2p;
  $scope.member2 = defaulthome.member2;
  $scope.member3p = defaulthome.member3p;
  $scope.member3 = defaulthome.member3;
  $scope.member4p = defaulthome.member4p;
  $scope.member4 = defaulthome.member4;
  $scope.homeedit = {
    join: false,
    donate: false,
    ourpurpose: false,
    mission: false,
    missionp: false,
    whoweare: false,
    aboutus: false,
    aboutusp: false,
    connectwith: false,
    happy: false,
    happyp: false,
    member1p: false,
    member1: false,
    member2p: false,
    member2: false,
    member3p: false,
    member3: false,
    member4p: false,
    member4: false
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
          $scope.loguser.admin = data.admin;
        })
      };
    })
  })


  $scope.toggleeditable = function(name){
    console.log("$localStorage token", $localStorage.token);
    console.log("$scope loguser: ", $scope.loguser);
    if (!$localStorage.token || !$scope.loguser || !$scope.loguser.admin) {
      swal("Not logged in as an admin. Login as admin to edit");
      // console.log("Not logged in as an admin. Login as admin to edit");
      return;
    };
    console.log("toggleeditable ", name);
    $scope['homeedit'][name] = true;
  }

  $scope.saveeditable = function(name){
    console.log("saveeditable ", name);
    var createneweditable = () => {
      if ($scope[name] === defaulthome[name]) {
        console.log("Same as default, no changes.");
        $scope.homeedit[name] = false;
        return;
      };
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

    if ($scope.editables.length > 0) {
      console.log("$scope editables: ", $scope.editables);
      var index = 0;
      while(index < $scope.editables.length){
        var editable = $scope.editables[index]
        if (editable.name === name) {
          if ($scope[name] === editable.content) {
            $scope.homeedit[name] = false;
            return;
          };
          console.log("content has changed");
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
          return;
        };
        index++;
      }
      console.log("Here? akjlsdfjsadfl;sdjl;");
      createneweditable();
    } else {
      console.log("Or Here? akjlsdfjsadfl;sdjlads fdsaf;");
      createneweditable();
    }

  }

  // $scope.makeEditable = function(div){
  //   console.log("div: ", div);
  //   div.style.border = "1px solid #000";
  //   div.style.padding = "20px";
  //   div.contentEditable = true;
  // }

  // $scope.makeReadOnly = function(div, cb){
  //   div.style.border = "none";
  //   div.style.padding = "0px";
  //   div.contentEditable = false;
  //    // alert("Run Ajax POST request here to save the div.innerHTML \ or div.textContent to the database.");
  //  console.log("Run Ajax POST request here to save the div.innerHTML \ or div.textContent to the database.");
  //  cb();
  // }

}])
