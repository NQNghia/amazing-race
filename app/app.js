var app = angular.module('amazingRace', ['ngRoute']);

//This configures the routes and associates each route with a view and a controller
app.config(function ($routeProvider) {
    $routeProvider
        //Define a route that has a route parameter in it (:playGame)
        .when('/play-game',
        {
            controller: 'GamePlayController',
            templateUrl: '/app/views/gamePlay.html'
        })
        //Define a route that has a route parameter in it (:login)
        .when('/login',
        {
            controller: '',
            templateUrl: '/app/views/login.html'
        })
        .otherwise({ redirectTo: '/login' });
});

app.factory('socket', ['$rootScope', function ($rootScope) {
    var socket = io.connect();

    return {
        on: function (eventName, callback) {
            socket.on(eventName, callback);
        },
        emit: function (eventName, data) {
            socket.emit(eventName, data);
        }
    };
}]);

// Before unload and unload events registers
app.factory('beforeUnload', function ($rootScope, $window) {
    // Events are broadcast outside the Scope Lifecycle

    $window.onbeforeunload = function (e) {
        var confirmation = {};
        var event = $rootScope.$broadcast('onBeforeUnload', confirmation);
        if (event.defaultPrevented) {
            return confirmation.message;
        }
    };

    $window.onunload = function () {
        $rootScope.$broadcast('onUnload');
    };
    return {};
}).run(function (beforeUnload) {
    // Must invoke the service at least once
});

// Change location events registers
app.factory('beforeLocationChanged', function ($rootScope, $route, $location) {
    //Bind the `$locationChangeSuccess` event on the rootScope, so that we dont need to 
    //bind in induvidual controllers.

    $rootScope.$on('$onChangeLocation', function () {
        // $rootScope.actualLocation = $location.path();
    });
    return {};
}).run(function (beforeLocationChanged) {
    // Must invoke the service at least once
});