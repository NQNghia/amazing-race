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
        //Define a route that has a route parameter in it (:playGame)
        .when('/login',
        {
            controller: 'GamePlayController',
            templateUrl: '/app/views/login.html'
        })
        .otherwise({ redirectTo: '/login' });
});