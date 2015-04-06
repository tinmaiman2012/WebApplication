/**
 * Created by ltandat on 6/5/14.
 */
(function(){
  'use strict';

  angular.module('SongApp').controller('SongCtrl', ['$filter', '$scope', '$routeParams', '$location', 'songFactory', '$i18next', '$timeout','revertFactory',
    function ($filter, $scope, $routeParams, $location, songFactory, $i18next, $timeout,revertFactory) {
      $scope.$emit('changeActiveMenu', 'song');
      $scope.idSongdelete = -1;
      var RONG = '';
      $scope.valueCheckAllView = {'select': false};
      $scope.enableBtnDeleteMul = false;
      $scope.songCtrlName = RONG;
      $scope.songCtrlAuthor = RONG;
      $scope.keySearch = RONG;
      $scope.revert = [];
      $scope.revertkeySearch = '';
      $scope.songList = [];
      $scope.showInputSearchSong = false;
      $scope.showCloseSearchSong = false;
      $scope.showButtonDeleteMulSong = true;
      $scope.showButtonAddSong = true;
      $scope.showButtonSearchSong = true;
      $scope.linkCtrl = 'song';
      $scope.viewLinkCtrl = $i18next('msmHeading.txtMenuSong');
      $scope.currentPageCtrl = $i18next('msmHeading.txtHeadingSongList');
      $scope.enableDeleteMul = true;

      function init() {
        $scope.songList = songFactory.getDataSong();
        $scope.revert = revertFactory.getRevertSongList();
        var ktr = 0;
        for (var j=0;j<$scope.revert.length;j++){
          for(var k =0;k<$scope.songList.length; k++){
            if($scope.revert[j].id === $scope.songList[k].id){
              $scope.songList[k].select = true;
              ktr += 1;
            }
          }
        }
        if ((ktr) >= $scope.songList.length) {
          $scope.valueCheckAllView.select = true;
        }
      }

      init();

      $scope.$watch('revert.length', function (newValue) {//, oldValue
        if (newValue === 0) {
          $scope.enableDeleteMul = true;

        } else {
          $scope.enableDeleteMul= false;
        }
      });

      $scope.clickSearchSong = function ($event) {
        $event.preventDefault();
        $scope.showInputSearchSong = true;
        $scope.showCloseSearchSong = true;
        $scope.showButtonDeleteMulSong = false;
        $scope.showButtonAddSong = false;
        $scope.showButtonSearchSong = false;
//      $("#msm-cls-id-search").focus();

      };

      $scope.clickCloseSearch = function ($event) {
        $event.preventDefault();
        $scope.keySearch = '';
        $scope.showInputSearchSong = false;
        $scope.showCloseSearchSong = false;
        $scope.showButtonDeleteMulSong = true;
        $scope.showButtonAddSong = true;
        $scope.showButtonSearchSong = true;

      };

      $scope.findIdSongCurrentAfterDelete = function () {
        for (var i = 0; i < $scope.songList.length;) {
          if ($scope.idSongdelete === $scope.songList[i].id) {

            for (var j=0;j<$scope.revert.length;j++){
              if($scope.revert[j].id === $scope.songList[i].id){
                $scope.revert.splice(j, 1);
                break;
              }
            }
            $scope.songList.splice(i, 1);

            break;
          } else {
            i++;
          }

        }
        songFactory.deleteSongCurrentInServices($scope.idSongdelete);
       // $scope.closeDeleteBox();

        var ktr = 0;
        for (var h = 0; h < $scope.songList.length; h++) {
          if ($scope.songList[h].select) {
            ktr += 1;
          }
        }
        if ((ktr) >= $scope.songList.length) {
          $scope.valueCheckAllView.select = true;
        }else{
          $scope.valueCheckAllView.select = false;
        }
      };

      $scope.deleteMultiplesSong = function () {
        //$scope.revert = [];
        $scope.valueCheckAllView.select = false;
        //$scope.checkChooseSong();
        for (var j = $scope.songList.length - 1; j >= 0; j--) {
          if ($scope.songList[j].select && $scope.songList[j].fil === ('1' + $scope.keySearch)) {
            songFactory.deleteSongCurrentInServices($scope.songList[j].id);
            $scope.revert.splice( $scope.revert.indexOf($scope.songList[j]),1);
            $scope.songList.splice(j, 1);

          } else {
            $scope.songList[j].select = false;
          }
        }
        $scope.keySearch = RONG;


      };

      $scope.getIdDelete = function (song) {
        $scope.idSongdelete = song.id;
      };

      $scope.goToCreateSong = function () {
        $location.url('song/createsong');
      };

      $scope.goToEditSong = function (song) {
        $location.url('song/editsong/' + song.id);
      };

      $scope.goToMainSong = function () {
        $location.url('song');
      };

      $scope.$on('i18nextLanguageChange', function () {
        $scope.currentPageCtrl = $i18next('msmHeading.txtHeadingSongList');
        $scope.viewLinkCtrl = $i18next('msmHeading.txtMenuSong');
        $timeout(function(){
        });
      });

      $scope.flashBoxSmall = true;

      $scope.clickParentBoxSmall = function(){
        if($scope.flashBoxSmall){
          $scope.flashBoxSmall = false;
          $scope.showBoxAction = true;
          $scope.effectShow = 'effectShow';
        }else{
          $scope.flashBoxSmall = true;
          $scope.showBoxAction = false;
          $scope.effectShow = '';
        }

      };

      $scope.$on('closeBoxSmall',function(event , data) {
        $scope.flashBoxSmall = true;
        $scope.showBoxAction = false;
        $scope.effectShow = '';
      });



    }]);


})();