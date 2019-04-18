angular.module('user').controller('loginController', ['$scope','userFactory', 
    function($scope, userFactory){
        $scope.login = function() {
            console.log('in login scope FE controller')
    
            $scope.user = [];
            $scope.user.push($scope.returnUser);
            console.log(JSON.stringify($scope.returnUser));
    
            userFactory.loginUser($scope.returnUser).then(function(res,err, req, status){
                console.log('in client controller');
    
                console.log('status is ' + status)
                console.log('res is ' + JSON.stringify(res))
                console.log('res.data is ' + JSON.stringify(res.data))
    
                console.log('check')
                
                window.location.replace('../html/user_profile.html');
            }, function (err){
                console.log('shit didn\'t work bro ' + JSON.stringify(err))
                if(err.status !== 200)
                {
                    console.log("\nunable to login user");
                    
                }
            })
        };
        $scope.changePass = function() {
            userFactory.sendPassLink($scope.returnUser).then(function(res, err) {
                if(res.status === 400)
                    console.log("something went wrong");
                else
                    window.location.replace('../login.html');
            })
        }
       

       
    }

]);