angular.module('user').controller('accountController', ['$scope','userFactory', 
    function($scope, userFactory){
        
        userFactory.getCurrentUser().then(function(user){
            console.log('client controller get cur user')
            console.log(JSON.stringify(user.data))
            currUser = user.data;
            $scope.currentuser = currUser;
    
            console.log('Hi ' + JSON.stringify(currUser.name) + '!');
            console.log('scope current user' + JSON.stringify($scope.currentuser) + '!');
        
            // getUserOrders()
        }, function(error){
            console.log('unable to get current user ', error)
        });

        $scope.submitEntry = function(){
            $scope.hairJour = [];

            console.log('scope new entry is ' + JSON.stringify($scope.journal));

            if($scope.journal === undefined)
            {
                alert('please fill out all the fields')
                return;
            }
            // $scope.journal.username = currSessionUser;
            $scope.hairJour.push($scope.journal);

            userFactory.submitJourEntry($scope.journal).then(function(res, err){

                if(res.status !== 200)
                {
                   console.log("\nunable to create entry");
                   $scope.errorMessage = "didn't create entry";
                } 
                else if (res.status === 200)
                {
                    console.log('entry was success, front end');
                    // window.location.replace('js/html/signup2.html');
                }
               $scope.journal = {};
           })
        }

    }

]);