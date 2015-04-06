/**
 * Created by ltandat on 6/13/14.
 */
'use strict';
(function(){
  angular.module('SongApp').directive('focusMe',['$timeout', function ($timeout) {
    return {
      scope:{
        focusMe: '='
      },
      link: function (scope, element, attrs) {
        scope.$watch('focusMe', function (value) {
          if (value === true) {
            element[0].focus();
            scope.focusMe = false;
          }
        });
      }
    };
  }]);

})();

