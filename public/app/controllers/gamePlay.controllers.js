(function () {
    app.controller('GamePlayController', GamePlayController);

    GamePlayController.$inject = ['$location', '$scope', '$localStorage', 'socket', 'gamePlayService'];

    function GamePlayController($location, $scope, $localStorage, socket, gamePlayService) {
        //I like to have an init() for controllers that need to perform some initialization. Keeps things in
        //one place...not required though especially in the simple example below

        // Global nessessary variables
        // at the start of the game, curPos is start point

        $scope.mynickname = $localStorage.nickName;
        $scope.winners = [];
        var nickname = $scope.mynickname;
        console.log("Nickname: ", nickname);
        // request to get all user currently join
        socket.emit('get-users');
        // receieve
        socket.on('all-users', function (data) {
            console.log("All-users event: ", data);
            $scope.users = data.filter(function (item) {
                return item.nickname != nickname;
            })
        });
        socket.on('update-leaderboard', function (winners) {
            console.log(winners);
            $scope.winners = winners;
        });
        socket.on('update-position', function (data) {
            console.log("update pos:", data);
            // stub for color ==1
            if ($scope.field.rows[data.oldPosition.x][data.oldPosition.y].value == data.color) {
                $scope.field.rows[data.oldPosition.x][data.oldPosition.y].value = 'white';
            }
            $scope.field.rows[data.position.x][data.position.y].value = data.color;
        })
        var curPos = {
            x: 14,
            y: 0,
        };
        var oldPos = curPos;
        var stopPos = {
            x: 0,
            y: 14,
        };
        // playerNum start by 1
        var playerNum = null;

        // color set for spot
        // -2 (gray) is wall, -1 (white) is available spot (path), 0 (red) is start and stop point
        var colors = ['gray', 'white', 'red', 'yellow', 'blue', 'green', 'cyan', 'purple'];
        init();

        function init() {
            // creating field
            $scope.field = gamePlayService.createField(curPos, stopPos);
        }

        // socket events handlers
        socket.on('newPlayer', function (playerNumber) {
            // if (playerNum != null) return;
            // else if (playerNumber != null) {
            //     // apply scope to load more speed
            //     $scope.$apply(function () {
            //         // get playerNum
            //         playerNum = playerNumber;
            //         // creating field
            //         $scope.field = gamePlayService.createField(curPos, stopPos, playerNum);
            //     });
            // }
        })

        // Register scope envents
        // onload events

        // keydown envents
        var $doc = angular.element(document);
        $doc.on('keydown', function (e) {
            oldPos = curPos;
            // $scope.$apply(function () {
            // $scope.field.rows[curPos.x][curPos.y].value = -1;
            curPos = gamePlayService.getNewPos(curPos, e.keyCode);
            // Stub- server will emit event to clients to update event
            // $scope.field.rows[curPos.x][curPos.y].value = playerNum;
            // });
            console.log(oldPos);
            socket.emit('update-position', {
                old: oldPos,
                current: curPos,
                nickname: $scope.mynickname
            })
        });
        $scope.$on('$destroy', function () {
            $doc.off('keydown');
        })

        // back or next button in browser events (change location in this tab)
        $scope.$on('$locationChangeSuccess', function () {
            if (playerNum == null) return;
            socket.emit('Unload', playerNum);
        });

        // unload events (close or reload tab)
        $scope.$on('onUnload', function (e) {
            if (playerNum == null) return;
            socket.emit('Unload', playerNum);
        });

        // $scope utilities functions
        // getClass for the css receiver to make Responsive website
        $scope.getClass = function () {
            className = 'gamePlayHeight';
            if (window.innerWidth < window.innerHeight) {
                className = 'gamePlayWidth';
            }
            return className;
        };

        // getStyle 
        $scope.getStyle = function (spot) {
            return spot.value;
        }
    }
})();
