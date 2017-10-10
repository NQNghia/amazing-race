app.controller('GamePlayController', function ($scope) {
    // $scope dataBinding
    $scope.field = createField();

    $scope.clickEvent = function (spot) {
        spot.isClicked = !spot.isClicked;
    };

        // getClas for the css receiver to make Responsive website
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