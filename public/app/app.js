'use strict';

var app = angular
  .module('amazingRace', [
    'ngCookies',
    'ngRoute',
    'ngSanitize',
    'ngStorage',
    'ngLodash'
  ])
  .config(function ($routeProvider, $locationProvider) {
    $locationProvider.html5Mode(true);
    $routeProvider
      .when('/play-game',
        {
            controller: 'GamePlayController',
            templateUrl: 'app/views/gamePlay.html'
        })
        //Define a route that has a route parameter in it (:login)
        .when('/login',
        {
            controller: '',
            templateUrl: 'app/views/login.html'
        })
        .otherwise({ redirectTo: '/login' });
  });
