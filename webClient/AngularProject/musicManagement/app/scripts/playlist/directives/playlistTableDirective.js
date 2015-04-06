/**
 * Created by ltandat on 6/11/14.
 */

//<div table-directive>
//</div>

(function () {
  'use strict';
  angular.module('playlistApp').directive('tablePlaylist', function () {

    return {
      restrict: 'E',
      templateUrl: 'scripts/playlist/templates/playlist-table.html',
      scope:{
        dataArr:'=tableData',
        revert:'=revert',
        valueCheckAllView:'=valueCheckAllView',
        keySearch:'=keysearch',
        getIdDelete:'&',
        goToEdit:'&'
      },
      link:function(scope,element,atts){

        scope.keySearch = '';

        scope.checkCurrentPlay = function (play) {
          if (!play.select) {
            play.select = true;
            var ktr = 0;
            for (var i = 0; i < scope.dataArr.length; i++) {
              if (scope.dataArr[i].select) {
                ktr += 1;
              }
            }
            if ((ktr) >= scope.dataArr.length) {
              scope.valueCheckAllView.select = true;
            }
            scope.revert.push(play);
          } else {
            play.select = false;
            for (var j=0;j<scope.revert.length;j++){
              if(scope.revert[j].id === play.id){
                scope.revert.splice(j, 1);
                break;
              }
            }
            scope.valueCheckAllView.select = false;
          }


        };

        scope.filterPlay = function (play) {
          var s = '1';
          if (scope.keySearch === '' || !scope.keySearch) {
            s = '1';
          } else {
            s = '1' + scope.keySearch;
          }
          play.fil = s;
          return play.fil;
        };

        scope.checkAllPlay = function () {

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