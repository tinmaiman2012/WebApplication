/**
 * Created by ltandat on 6/9/14.
 */
(function(){
  'use strict';
  angular.module('SongApp').controller('EditSongCtrl',[ '$scope', '$location', '$routeParams', 'songFactory','$i18next','$timeout',
    function ($scope, $location, $routeParams, songFactory,$i18next,$timeout) {
    $scope.$emit('changeActiveMenu', 'song');
    $scope.linkCtrl = 'song';
    $scope.currentPageCtrl = $i18next('msmHeading.txtHeadingEditSong');
    $scope.viewLinkCtrl = $i18next('msmHeading.txtMenuSong');
    $scope.view = {
      id: '',
      songCtrlName: '',
      songCtrlAuthor: '',
      editorEnabled: true
    };
    var idEdit = '';
    idEdit = $routeParams.id;
    $scope.showFocus = true;

    function init() {
      $scope.songListEdit = songFactory.getDataSongEdit();
      for(var i=0;i<$scope.songListEdit.length;i++){
        if ($scope.songListEdit[i].id.toString() === idEdit.toString()) {
          $scope.view.id = idEdit;
          $scope.view.songCtrlName = $scope.songListEdit[i].name;
          $scope.view.songCtrlAuthor = $scope.songListEdit[i].author;
          break;
        }
      }

    }

    init();

    $scope.goToMainSong = function () {
      $location.url('song');

    };

    $scope.applyEdit = function () {
      if ($scope.view.songCtrlName === '') {
        $scope.showTextError = true;
        $scope.showFocus = true;

      }else{
        for(var i=0;i<$scope.songListEdit.length;i++){
          $scope.showTextError = false;
          if ($scope.songListEdit[i].id.toString() === $scope.view.id.toString()) {
            $scope.songListEdit[i].name = $scope.view.songCtrlName;
            $scope.songListEdit[i].author = $scope.view.songCtrlAuthor;
            $location.url('song');
            break;
          }
        }
      }
    };

    $scope.$on('i18nextLanguageChange', function () {
      $scope.currentPageCtrl = $i18next('msmHeading.txtHeadingEditSong');
      $scope.viewLinkCtrl = $i18next('msmHeading.txtMenuSong');
      $timeout(function(){
      });
    });

  }]);

})();
