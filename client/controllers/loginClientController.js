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
    
                // if(res.status === 401) {
                //     console.log("\nunable to login user");
                //     var message = '<strong>Error!</strong> Username or password is wrong';
                //     Flash.create('success', message);
                // }
                // else if(res.status === 412 ) {
                //     console.log("You are not verified");
                //     var message = '<strong>Error!</strong> Check your email to verify your account';
                //     Flash.create('success', message);
                // }
                // else if (res.status === 200) {
                //     console.log('login was success, front end');
                //     var message = '<strong>Success!</strong> Login was successful';
                //     Flash.create('success', message);
    
                //     setTimeout(function(){
                //       if($scope.returnUser.username === 'administrator'){
                //         window.location.replace('js/html/adminLanding.html');
                //       }
                //       else{
                //           console.log('check')
                //         window.location.replace('js/html/userLanding.html');
                //       }
                //     }, 500);
                // }
    
                console.log('check')
                // var message = '<strong>Error!</strong> Username or password is wrong';
                // Flash.create('success', message);
                // $scope.returnUser = {};

                //userLanding page that this goes to after user logs in
                window.location.replace('../html/userHomepage.html');
            }, function (err){
                console.log('shit didn\'t work bro ' + JSON.stringify(err))
                if(err.status !== 200)
                {
                    console.log("\nunable to login user");
                    // var message = '<strong>Error!</strong> Username or password is wrong';
                    // Flash.create('danger', message);
                }
            })
    
            // var message = '<strong>Well done!</strong> You successfully read this important alert message.';
            // Flash.create('success', message);
        };
       

       
    }

]);