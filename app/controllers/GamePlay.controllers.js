app.controller('GamePlayController', function ($scope) {
    // $scope dataBinding
    $scope.field = createField();

    // Event Handler
    var dragging = false;
    var isEnter = false;
    var count = 0;
    $scope.mouseDownSpot = function (spot) {
        spot.isClicked = false;
    };

    $scope.mouseDown = function () {
        dragging = true;
    }

    $scope.mouseMove = function (spot) {
        // console.log(dragging);
        if (dragging && !isEnter) {
            spot.isClicked = false;
            isMove = true;
            count++;
        } else return;
    }

    $scope.mouseLeave = function (spot) {
        isEnter = false;
    }

    $scope.mouseUp = function () {
        dragging = false;
        console.log(count);
        count = 0;
    }

    // getClass for the css receiver to make Responsive website
    $scope.getClass = function () {
        className = 'gamePlayHeight';
        if (window.innerWidth < window.innerHeight) {
            className = 'gamePlayWidth';
        }
        return className;
    };

    // create UI (playing Field) for website
    function createField() {
        var field = {};
        field.rows = [];
        for (var i = 0; i < 20; i++) {
            var row = [];
            for (var j = 0; j < 20; j++) {
                var spot = {};
                spot.isClicked = true;
                spot.x = i;
                spot.y = j;
                row.push(spot);
            }
            field.rows.push(row);
        }
        return field;
    };
})