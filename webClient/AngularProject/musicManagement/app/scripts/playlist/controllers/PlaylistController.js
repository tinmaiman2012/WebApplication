/**
 * Created by ltandat on 6/10/14.
 */
'use strict';
(function () {
  angular.module('playlistApp').controller('PlaylistCtrl', ['$scope', '$location', 'playlistService', 'songFactory','$i18next',
    'revertFactory','$timeout',
    function ($scope, $location, playlistService, songFactory,$i18next,revertFactory,$timeout) {
    $scope.$emit('changeActiveMenu', 'playlist');
    $scope.revert = [];
    $scope.linkCtrl = 'playlist';
    $scope.viewLinkCtrl = $i18next('msmHeading.txtMenuPlaylist');
    $scope.currentPageCtrl = $i18next('msmHeading.txtHeadingPlaylist');
    $scope.$on('i18nextLanguageChange', function () {
      $scope.viewLinkCtrl = $i18next('msmHeading.txtMenuPlaylist');
      $scope.currentPageCtrl = $i18next('msmHeading.txtHeadingPlaylist');
      $timeout(function(){
      });
    });
    $scope.keySearchPlaylist = '';
    $scope.playlistData = [];
    $scope.songData = [];
    $scope.listSongView = [];
    $scope.listSongChose = [];
    $scope.songInListData = [];
    $scope.showInputSearchList = false;
    $scope.showCloseSearchList = false;
    $scope.showButtonAdd = true;
    $scope.showButtonDeleteMul = true;
    $scope.showButtonSearch = true;
    $scope.showButtonCreate = true;
    $scope.enableDown = false;
    $scope.enableUp = true;
    $scope.idDeletePlay = -1;
    $scope.valueCheckAllView = {'select': false};
    $scope.checkChoose = {'select': false};
    $scope.checkChose = {'select': false};

    function init() {
      $scope.playlistData = playlistService.getPlaylist();
      $scope.songData = songFactory.getDataSong();
      $scope.songInListData = playlistService.getSongInPlaylist();

      $scope.revert = revertFactory.getRevertPlayList();
      var ktr = 0;
      for (var j=0;j<$scope.revert.length;j++){
        for(var k =0;k<$scope.playlistData.length; k++){
          if($scope.revert[j].id === $scope.playlistData[k].id){
            $scope.playlistData[k].select = true;
            ktr += 1;
          }
        }
      }
      if ((ktr) >= $scope.playlistData.length) {
        $scope.valueCheckAllView.select = true;
      }


      //$scope.listSongView = angular.copy($scope.songData);
      //console.log($scope.listSongView);

    }

    init();

    $scope.loadDataForModal = function () {

      $scope.listSongView.length = 0;
      $scope.listSongView = angular.copy($scope.songData);
      $scope.listSongChose.length = 0;
    };

    $scope.moveSongDown = function () {
      for (var j = $scope.listSongView.length - 1; j >= 0; j--) {
        if ($scope.listSongView[j].select && $scope.listSongView[j].fil.toString() === ('1' + $scope.searchSongListView).toString()) {
          if ($scope.checkChose.select) {
            $scope.listSongView[j].select = true;
            //$scope.listSongView[j].select = false;
          } else {
            $scope.listSongView[j].select = false;
          }

          $scope.listSongChose.push($scope.listSongView[j]);
          $scope.listSongView.splice(j, 1);
        } else {
          $scope.listSongView[j].select = false;
        }
      }
      $scope.searchSongListView = '';
      $scope.checkChoose.select = false;
      //console.log($scope.listSongView);
    };

    $scope.moveSongUp = function () {
      for (var j = $scope.listSongChose.length - 1; j >= 0; j--) {
        if ($scope.listSongChose[j].select) {
          if ($scope.checkChoose.select) {
            $scope.listSongChose[j].select = true;
            //$scope.listSongChose[j].select = false;
          } else {
            $scope.listSongChose[j].select = false;
          }

          $scope.listSongView.push($scope.listSongChose[j]);
          $scope.listSongChose.splice(j, 1);
        }
      }
      $scope.searchSongListView = '';
      $scope.checkChose.select = false;

    };

    $scope.$watch(function () {
      return $scope.viewNewPlaylist;
    }, function (newVal) {//, oldVal
      if (!newVal) {
        $scope.showButtonCreate = true;
        $scope.showTextError =  true;
      } else {
        $scope.showButtonCreate = false;
        $scope.showTextError =  false;

      }
    });

    $scope.$watch('revert.length', function (newValue) {//, oldValue
      if (newValue === 0) {
        $scope.enableDeleteMul = true;

      } else {
        $scope.enableDeleteMul= false;
      }
    });

    $scope.$watch('listSongView.length', function (newValue) {//, oldValue
      if (newValue === 0) {
        $scope.enableDown = true;

      } else {
        $scope.enableDown = false;
      }
    });

    $scope.$watch('listSongChose.length', function (newValue) {//, oldValue
      //console.log(newValue);
      if (newValue === 0) {
        $scope.enableUp = true;

      } else {
        $scope.enableUp = false;
      }
    });

    $scope.addPlaylist = function (viewNewPlaylist) {
      $scope.showTextError =  true;
      if (!viewNewPlaylist || viewNewPlaylist === '') {
        $scope.showTextError =  true;
      }
      else {
        var to = new Date();
        var dateNew = to.getDate() + '-' + (to.getMonth() + 1) + '-' + to.getFullYear();
        var idNew = playlistService.findMaxId()+1;
        $scope.playlistData.push({id:idNew, name: viewNewPlaylist, date:dateNew});
        playlistService.addPlaylistInServices(viewNewPlaylist);
        // console.log($scope.listSongChose);
        angular.forEach($scope.listSongChose, function (songChose) {
          playlistService.addSongInPlaylistInServices(playlistService.findMaxId(), songChose.id);

        });
       //$('.bs-add-list-modal-lg').modal('hide');
        $scope.viewNewPlaylist = '';
        $scope.valueCheckAllView = false;
        // console.log($scope.playlistData);
        //console.log( $scope.songInListData);
      }

    };

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
      $scope.keySearchPlaylist = '';
      $scope.showInputSearchList = false;
      $scope.showCloseSearchList = false;
      $scope.showButtonDeleteMul = true;
      $scope.showButtonAdd = true;
      $scope.showButtonSearch = true;

    };

    $scope.getIdDeletePlay = function (play) {
      $scope.idDeletePlay = play.id;

    };

    $scope.closeDeleteBox = function () {
//      $(".bs-example-modal-lg").modal('hide');
//      $(".bs-deleteMulti-modal-lg").modal('hide');
    };

    $scope.deleteCurrentList = function () {
      for (var m= 0; m < $scope.playlistData.length;) {
        if ($scope.idDeletePlay === $scope.playlistData[m].id) {

          for (var j=0;j<$scope.revert.length;j++){
            if($scope.revert[j].id === $scope.playlistData[m].id){
              $scope.revert.splice(j, 1);
              break;
            }
          }

          $scope.playlistData.splice(m, 1);

          break;
        }else{
          m++;
        }

      }
      playlistService.deletePlaylist($scope.idDeletePlay);

      var ktr = 0;
      for (var i = 0; i < $scope.playlistData.length; i++) {
        if ($scope.playlistData[i].select) {
          ktr += 1;
        }
      }
      if ((ktr) >= $scope.playlistData.length) {
        $scope.valueCheckAllView.select = true;
      }else{
        $scope.valueCheckAllView.select = false;
      }

      $scope.closeDeleteBox();

    };

    $scope.deleteMultiplesplaylist = function (){
      $scope.valueCheckAllView.select = false;
      for (var j = $scope.playlistData.length - 1; j >= 0; j--) {
        if ($scope.playlistData[j].select && $scope.playlistData[j].fil === ('1' + $scope.keySearchPlaylist)) {

          $scope.revert.splice( $scope.revert.indexOf($scope.playlistData[j]),1);
          $scope.playlistData.splice(j, 1);

          // run for to delete song in playlist
        }
      }
      $scope.keySearchPlaylist = '';
      $scope.valueCheckAllView.select = false;
      //$scope.closeDeleteBox();
    };

    $scope.goToEditPlaylist = function (play) {
      $location.url('playlist/edit-playlist/' + play.id);
    };

    $scope.checkCurrentPlay = function (play) {
      if (!play.select) {
        var ktr = 0;
        for (var i = 0; i < $scope.playlistData.length; i++) {
          if ($scope.playlistData[i].select) {
            ktr += 1;
          }
        }
        if ((ktr + 1) >= $scope.playlistData.length) {
          $scope.valueCheckAllView = true;
        }
        $scope.revert.push(play);
      } else {
        for (var j=0;j<$scope.revert.length;j++){
          if($scope.revert[j].id === play.id){
            $scope.revert.splice(j, 1);
            break;
          }
        }
        $scope.valueCheckAllView = false;
      }
      //console.log($scope.revert);
      //$scope.checkChooseSong();

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

    $scope.$on('closeBoxSmall',function() {
      $scope.flashBoxSmall = true;
      $scope.showBoxAction = false;
      $scope.effectShow = '';

    });


  }]);

})();



