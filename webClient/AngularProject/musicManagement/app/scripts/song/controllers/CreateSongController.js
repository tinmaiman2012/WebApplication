/**
 * Created by ltandat on 6/16/14.
 */
'use strict';
angular.module('SongApp').controller('CreateSongCtrl', ['$filter', '$scope', '$routeParams', '$location', 'songFactory','$i18next','$timeout',
  function ($filter, $scope, $routeParams, $location, songFactory,$i18next,$timeout) {
    $scope.$emit('changeActiveMenu', 'song');
    $scope.showTextError = false;
    $scope.showTextSuccess = false;
    $scope.linkCtrl = 'song';
    $scope.currentPageCtrl = $i18next('msmHeading.txtHeadingCreateSong');
    $scope.viewLinkCtrl = $i18next('msmHeading.txtMenuSong');

    $scope.keyUpNameSong = function (viewNewSong) {
      if(viewNewSong.name !==''){
        $scope.showTextSuccess = false;
      }
    };

    $scope.showFocus = true;
    $scope.addSong = function (viewNewSong) {
      $scope.showTextError = false;
      $scope.showTextSuccess = false;
      if (!viewNewSong || viewNewSong.name === '') {
        $scope.showTextError = true;
        $scope.showFocus = true;
      }

      else {
        songFactory.addSongInServices(viewNewSong);

        $scope.showTextSuccess = true;
        $scope.showFocus = true;
        viewNewSong.author = '';
        viewNewSong.name = '';
        $scope.songForm.$setPristine();


      }

    };

    $scope.goToMainSong = function () {
      $location.url('song');
      /////////dong duoi day dung de test emit (cha) , broadcast(con)
      //$scope.$emit('someEvent', [1,2,3]);
      //console.log($scope);
      //$scope.$destroy();
      ///////////////////////////////////////


    };

    $scope.$on('i18nextLanguageChange', function () {
      $scope.currentPageCtrl = $i18next('msmHeading.txtHeadingCreateSong');
      $scope.viewLinkCtrl = $i18next('msmHeading.txtMenuSong');
      $timeout(function(){
      });
    });

    $scope.isUnchanged = function(uName) {
      return angular.equals(uName, $scope.master);
    };

  }]);



