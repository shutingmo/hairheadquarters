angular.module('hairHeadquarters').factory('userFactory', function($http){
    var userFactoryMethods = {
        signupUser: function(user){
            console.log('in user factory signup ' + JSON.stringify(user))
            return $http.post('/signup', user);
        },

        loginUser: function(returnUser){
            console.log('in user factory ' + JSON.stringify(returnUser))

            return $http.post('/login/auth', returnUser)
                // .success(
                //     function(res){
                //         console.log('Fac,res.data is '+ JSON.stringify(res.data))
                //         return res.data
                //     }
                // )
                // .error(
                //     function(status){
                //         console.log('status is ' + JSON.stringify(status))
                //         // alert('please work')
                //         return status
                //     }
                // )
                ;
        },
        getCurrentUser: function(){
            console.log('in fac id')
            return $http.get('/account/getinfo');

        },
        sendPassLink: function(returnUser) {
            return $http.put('/login/auth', returnUser);
        },
        submitJourEntry: function(journal){
            console.log(JSON.stringify(journal));
            return $http.post('/account/hairJournal', journal);
        }
    };

    return userFactoryMethods;
});