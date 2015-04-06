/**
 * Created by ltandat on 6/13/14.
 */
(function(){
  'use strict';
  angular.module('playlistApp').controller('EditPlaylistCtrl',['$scope','$location', '$routeParams', 'songFactory', 'playlistService','$i18next','$timeout','revertFactory',
    function ($scope, $location, $routeParams, songFactory, playlistService,$i18next,$timeout,revertFactory) {
      $scope.$emit('changeActiveMenu', 'playlist');
      $scope.linkCtrl = 'playlist';
      $scope.viewLinkCtrl = $i18next('msmHeading.txtMenuPlaylist');
      $scope.currentPageCtrl = $i18next('msmHeading.txtHeadingEditPlaylist');

      $scope.$on('i18nextLanguageChange', function () {
        $scope.viewLinkCtrl = $i18next('msmHeading.txtMenuPlaylist');
        $scope.currentPageCtrl = $i18next('msmHeading.txtHeadingEditPlaylist');
        $timeout(function(){
        });
      });
      $scope.showInputSearchList = false;
      $scope.showCloseSearchList = false;
      $scope.showButtonAdd = true;
      $scope.showButtonDeleteMul = true;
      $scope.showButtonSearch = true;
      $scope.idDeleteSongCurrentInListCurrent = 0;
      $scope.songData = [];
      $scope.listData = [];
      $scope.songInListAdd = [];
      $scope.songInListData = [];
      $scope.songInListDataView = [];
      $scope.idEdit = $routeParams.id;
      $scope.infoListCurrent = [];
      $scope.valueCheckAllView = {'select': false};
      $scope.checkChoose = {'select': false};
      $scope.enableDeleteMul= true;

      $scope.revert = [];

      function init() {
        $scope.revert = revertFactory.getRevertSongInPlayList('m'+$scope.idEdit);
        $scope.listData = playlistService.getPlaylist();
        for (var k = 0; k < $scope.listData.length; k++) {
          if ($scope.listData[k].id.toString() === $scope.idEdit.toString()) {
            $scope.infoListCurrent.push($scope.listData[k]);
            break;
          }
        }
        $scope.songData = songFactory.getDataSong();
        $scope.songInListCurrentData = playlistService.getSongInPlaylistCurrent($scope.idEdit);
        for (var i = 0; i < $scope.songInListCurrentData.length; i++) {
          for (var j = 0; j < $scope.songData.length; j++) {
            if ($scope.songInListCurrentData[i].idS.toString() === $scope.songData[j].id.toString()) {
              $scope.songData[j].select = false;
              $scope.songInListDataView.push($scope.songData[j]);
              break;
            }
          }
        }

        /* code revert */
        var ktr = 0;
        for (var h=0; h<$scope.revert.length; h++){
          for(var l =0; l < $scope.songInListDataView.length; l++){
            if($scope.revert[h].id === $scope.songInListDataView[l].id){
              $scope.songInListDataView[l].select = true;
              ktr += 1;
            }
          }
        }


        if ((ktr) >= $scope.songInListDataView.length) {
          $scope.valueCheckAllView.select = true;
        }



      }

      function showView() {
        $scope.songInListDataView.length = 0;
        $scope.songInListCurrentData = playlistService.getSongInPlaylistCurrent($scope.idEdit);
        for (var i = 0; i < $scope.songInListCurrentData.length; i++) {
          for (var j = 0; j < $scope.songData.length; j++) {
            if ($scope.songInListCurrentData[i].idS.toString() === $scope.songData[j].id.toString()) {
              //$scope.songData[j].select = false;
              $scope.songInListDataView.push($scope.songData[j]);
              break;

            }
          }
        }
      }

      init();

      $scope.clickSearch = function ($event) {
        $event.preventDefault();
        $scope.showInputSearchList = true;
        $scope.showCloseSearchList = true;
        $scope.showButtonDeleteMul = false;
        $scope.showButtonAdd = false;
        $scope.showButtonSearch = false;
      };

      $scope.clickCloseSearchList = function ($event) {
        $event.preventDefault();
        $scope.keySearch = '';
        $scope.showInputSearchList = false;
        $scope.showCloseSearchList = false;
        $scope.showButtonDeleteMul = true;
        $scope.showButtonAdd = true;
        $scope.showButtonSearch = true;

      };

      $scope.getIdDeleteSongInList = function (songInList) {
        $scope.idDeleteSongCurrentInListCurrent = songInList.id;

      };

      $scope.loadNewSongList = function () {
        $scope.songInListAdd.length = 0;
        for (var i = 0; i < $scope.songData.length; i++) {
          var kt = false;
          for (var j = 0; j < $scope.songInListCurrentData.length; j++) {
            if ($scope.songData[i].id.toString() === $scope.songInListCurrentData[j].idS.toString()) {
              kt = true;
              break;
            }
          }
          if (kt === false) {
            $scope.songInListAdd.push($scope.songData[i]);

          }


        }

      };

      $scope.deleteCurrentSongInListCurrent = function () {
        playlistService.deleteCurrentSongInPlaylistCurrent($scope.idEdit, $scope.idDeleteSongCurrentInListCurrent);

        for (var j=0;j<$scope.revert.length;j++){
          if($scope.revert[j].id === $scope.idDeleteSongCurrentInListCurrent){
            $scope.revert.splice(j, 1);
            break;
          }
        }
        showView();
        var ktr = 0;
        for (var i = 0; i < $scope.songInListDataView.length; i++) {
          if ($scope.songInListDataView[i].select) {
            ktr += 1;
          }
        }
        if ((ktr) >= $scope.songInListDataView.length) {
          $scope.valueCheckAllView.select = true;
        }
        //$scope.closeDeleteBox();
      };

      $scope.addSongIntoPlaylist = function () {
        angular.forEach($scope.songInListAdd, function (songAddList) {
          if (songAddList.select && songAddList.fil === ('1' + $scope.searchSongListView)) {
            songAddList.select = false;
            playlistService.addSongInPlaylistInServices($scope.idEdit, songAddList.id);

          }
        });
        showView();
        $scope.searchSongListView = '';
        $scope.checkChoose.select = false;
        $scope.valueCheckAllView.select = false;
      };

      $scope.$watch('revert.length', function (newValue) {//, oldValue
        if (newValue === 0) {
          $scope.enableDeleteMul = true;

        } else {
          $scope.enableDeleteMul= false;
        }
      });

      $scope.deleteMultiSongInCurrentList = function () {
        angular.forEach($scope.songInListDataView, function (data) {
          if (data.select && data.fil === ('1' + $scope.keySearch)) {

            for (var j=0;j<$scope.revert.length;j++){
              if($scope.revert[j].id === data.id){
                $scope.revert.splice(j, 1);
                break;
              }
            }


            playlistService.deleteCurrentSongInPlaylistCurrent($scope.idEdit, data.id);
          }
        });
        showView();
        $scope.keySearch = '';
        $scope.valueCheckAllView = false;
        $scope.closeDeleteBox();
      };

      var flashBoxSmall = true;
      $scope.clickParentBoxSmall = function(){
        if(flashBoxSmall){
          flashBoxSmall = false;
          $scope.showBoxAction = true;
          $scope.effectShow = 'effectShow';
        }else{
          flashBoxSmall = true;
          $scope.showBoxAction = false;
          $scope.effectShow = '';
        }

      };

      $scope.$on('closeBoxSmall',function(event, data) {
        $scope.flashBoxSmall = true;
        $scope.showBoxAction = false;
        $scope.effectShow = '';

      });



    }]);

})();
