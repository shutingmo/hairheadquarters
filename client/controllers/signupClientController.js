angular.module('user').controller('signupController', ['$scope','userFactory', 
    function($scope, userFactory){
        console.log("checking");
        
        $scope.types = ["1", "2A", "2B", "2C", "3A", "3B", "3C", "4A", "4B", "4C"];
        $scope.por = ["Low", "Medium", "High"];
        
        $scope.signup = function(){
            $scope.user = [];

                        

            console.log('scope new user is ' + JSON.stringify($scope.newUser));

            if($scope.newUser === undefined)
            {
                alert('please fill out all the fields')
                return;
            }

            $scope.user.push($scope.newUser);

            userFactory.signupUser($scope.newUser).then(function(res, err){

                if(res.status !== 200)
                {
                   console.log("\nunable to create user");
                   $scope.errorMessage = "didn't create user";
                } 
                else if (res.status === 200)
                {
                    console.log('signup was success, front end');
                    // window.location.replace('js/html/signup2.html');
                }
               $scope.newUser = {};
           })
       }
    }

]);