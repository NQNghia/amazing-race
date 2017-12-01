//This handles retrieving data and is used by controllers. 3 options (server, factory, provider) with 
//each doing the same thing just structuring the functions/data differently.
app.service('gamePlayService', function () {
    // create UI (playing Field) for website
    var table_width = 15,
        table_height = 15;
    this.createField = function (startPos, stopPos) {
        // console.log('creating field');
        var field = {};
        field.rows = [];

        for (var i = 0; i < table_width; i++) {
            var row = [];
            for (var j = 0; j < table_height; j++) {
                var spot = {};
                spot.value = -1;
                spot.x = i;
                spot.y = j;
                row.push(spot);
            }
            field.rows.push(row);
        }
        // creating start and stop point
        field.rows[startPos.x][startPos.y].value = 2;
        field.rows[stopPos.x][stopPos.y].value = 0;
        return field;
    };

    this.getNewPos = function (oldPos, keyCode) {
        newPos = {
            x: oldPos.x,
            y: oldPos.y,
        };
        switch (keyCode) {
            case 37: // left arrow
                newPos.y--;
                break;
            case 38: // up arrow
                newPos.x--;
                break;
            case 39: // right arrow
                newPos.y++;
                break;
            case 40: // down arrow
                newPos.x++;
                break;
        }
        if (this.isLegalPos(newPos)) {
            return newPos;
        }
        return oldPos;
    }

    this.isLegalPos = function (position) {
        // check if the position is in field or not?
        if (0 <= position.x && position.x < table_width && 0 <= position.y && position.y < table_height) {
            return true;
        }
        return false;
    }
});