/**
 * Created by ltandat on 6/26/14.
 */
(function () {
  'use strict';
  angular.module('SongApp')
    .directive('clickAnywhereButHere', function ($document) {
      var directiveDefinitionObject = {
        link: {
//          pre: function (scope, element, attrs, controller) { },
          post: function (scope, element, attrs) {//, controller
            scope.onClick = function (event) {
              var isChild = element.has(event.target).length > 0;
              var isSelf = element[0] === event.target;
              var isInside = isChild || isSelf;
              if (!isInside) {
                scope.$apply(attrs.clickAnywhereButHere);
              }
            };
            $document.click(scope.onClick);
          }
        }
      };
      return directiveDefinitionObject;
    });

})();