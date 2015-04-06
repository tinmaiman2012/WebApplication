/**
 * Created by ltandat on 6/16/14.
 */
'use strict';
(function(){
  angular.module('SongApp').directive('breadCrumbs', function () {
    return {
      restrict: 'E',
      templateUrl: 'scripts/song/templates/breadcrumb.html',
      scope: {
        link: '=linkCtrl',
        viewLink: '=viewLinkCtrl',
        currentPage: '=currentPageCtrl'
      }
//    link:function (scope , element , attrs) {
//
//    }
    };

  });


})();

