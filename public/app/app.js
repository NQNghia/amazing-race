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
            controller: 'LoginCtrl',
            templateUrl: 'app/views/login.html'
        })
        .otherwise({ redirectTo: '/login' });
  });

app.factory('socket', socket);

socket.$inject = ['$rootScope'];

function socket($rootScope) {
  var socket = io.connect();

  return {
      on: on,
      emit: emit
  }
  // Socket 'on' and 'emit' methods here

  function on(eventName, callback) {
      socket.on(eventName, function () {
          var args = arguments;
          $rootScope.$apply(function () {
              callback.apply(socket, args);
          })
      })
  }

  function emit(eventName, data, callback) {
      socket.emit(eventName, data, function () {
          var args = arguments;
          $rootScope.$apply(function () {
              if (callback) {
                  callback.apply(socket, args);
              }
          })
      })
  }
};