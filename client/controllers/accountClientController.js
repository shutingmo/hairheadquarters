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
        })

    }

]);