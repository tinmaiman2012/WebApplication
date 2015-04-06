'use strict';

//angular.module('jm.i18next').config(['$i18nextProvider', function ($i18nextProvider) {
//  $i18nextProvider.options = {
//    lng: 'en',
//    useCookie: false,
//    useLocalStorage: false,
//    fallbackLng: 'vi',
//    resGetPath: 'locales/__lng__/__ns__.json'
//  };
//}]);



angular.module('musicApp', [
    'ngCookies',
    'ngResource',
    'ngSanitize',
    'ngRoute',
    'SongApp',
    'playlistApp',
    'jm.i18next'
  ])
  .config(function ($routeProvider, $i18nextProvider) {
    $i18nextProvider.options = {
      lng: 'en',
      useCookie: false,
      useLocalStorage: false,
      fallbackLng: 'vi',
      resGetPath: 'locales/__lng__/__ns__.json'
    };

    $routeProvider
      .when('/', {
        templateUrl: 'views/song/main.html',
        controller: 'SongCtrl'
      })
      .when('/song', {
        templateUrl: 'views/song/main.html',
        controller: 'SongCtrl'
      })
      .when('/song/createsong', {
        templateUrl: 'views/song/createsong.html',
        controller: 'CreateSongCtrl'
      })
      .when('/song/editsong/:id', {
        templateUrl: 'views/song/editsong.html',
        controller: 'EditSongCtrl'
      })
      .when('/playlist', {
        templateUrl: 'views/playlist/main.html',
        controller: 'PlaylistCtrl'
      })
      .when('/playlist/edit-playlist/:id', {
        templateUrl: 'views/playlist/edit-playlist.html',
        controller: 'EditPlaylistCtrl'
      })
      .otherwise({
        redirectTo: '/'
      });
  });
