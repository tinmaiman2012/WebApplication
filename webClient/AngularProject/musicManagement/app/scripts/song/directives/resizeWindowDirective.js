/**
 * Created by ltandat on 6/30/14.
 */

(function () {
  'use strict';
  var app = angular.module('musicApp');
  app.directive('resize', function ($window) {
    return {
      scope:{
        style:'=styleSection',
        mainStyle:'='
      },
      link: function (scope, element){

        var w = angular.element($window);
        w.bind('resize', function () {
          if(w.width()<=768){
            scope.style = {width: '0'};
            scope.mainStyle = { width: '100%'};
            scope.flashIcon = true;
            scope.$apply();
          }

        });
      }

    };

  });

})();


