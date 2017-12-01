(function () {
    
    app.controller('LoginCtrl', LoginCtrl);

    LoginCtrl.$inject = ['$location', '$scope', '$localStorage', 'socket'];

    function LoginCtrl($location, $scope, $localStorage, socket) {

        $scope.join = function () {
            nickname = $scope.name;
            $localStorage.nickName = $scope.name;

            socket.emit('join', {
                nickname: nickname
            });

            console.log("to main", nickname);
            $location.path('/play-game');
        }
    }
})();