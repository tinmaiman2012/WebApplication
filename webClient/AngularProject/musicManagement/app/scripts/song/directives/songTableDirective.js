/**
 * Created by ltandat on 6/11/14.
 "**/
'use strict';
(function () {
  angular.module('SongApp')
    .directive('tableSong', function ($location) {
      return{
        restrict: 'E',
        scope:{
          dataArr:'=tableData',
          keySearch:'=keysearch',
          revert:'=revert',
          valueCheckAllView:'=valuecheckallview',
          showColumnOne:'=',
          showColumnFour:'=',
          showColumnFourHasEditBtn:'=',
          getIdDelete:'&',
          goToEdit:'&'
        },

        templateUrl: 'scripts/song/templates/song-table.html',
        link: function(scope, element , attrs ){

          scope.keySearch = '';

          scope.checkCurrentSong = function (song) {
            if (!song.select) {
              song.select = true;
              var ktr = 0;
              for (var i = 0; i < scope.dataArr.length; i++) {
                if (scope.dataArr[i].select) {
                  ktr += 1;
                }
              }
              if ((ktr) >= scope.dataArr.length) {
                scope.valueCheckAllView.select = true;
              }
              scope.revert.push(song);
            } else {
              song.select = false;
              for (var j=0;j<scope.revert.length;j++){
                if(scope.revert[j].id === song.id){
                  scope.revert.splice(j, 1);
                  break;
                }
              }
              scope.valueCheckAllView.select = false;
            }


          };

          scope.filterSong = function (song) {
            var s = '1';
            if (scope.keySearch === '' || !scope.keySearch) {
              s = '1';
            } else {
              s = '1' + scope.keySearch;
            }
            song.fil = s;
            return song.fil;
          };

          scope.checkAllSong = function () {

            if (!scope.valueCheckAllView.select) {
              for (var i = 0; i < scope.dataArr.length; i++) {

                if( !scope.dataArr[i].select && scope.dataArr[i].fil === ('1'+scope.keySearch)){
                  //console.log(scope.valueCheckAllView.select);
                  scope.dataArr[i].select = true;
                  scope.revert.push(scope.dataArr[i]);
                }

              }
            } else {
              for (var k = 0; k < scope.dataArr.length; k++) {
                if(scope.dataArr[k].fil === ('1'+scope.keySearch)){
                  scope.dataArr[k].select = false;
                  scope.revert.splice(scope.revert.indexOf(scope.dataArr[k]), 1);
                }

              }
            }
          };

          scope.$watch('keySearch', function () {
            if(scope.revert.length === scope.dataArr.length){
              scope.valueCheckAllView.select = true;
            }else{
              scope.valueCheckAllView.select = false;
            }
          });

        }

      };

    });

})();