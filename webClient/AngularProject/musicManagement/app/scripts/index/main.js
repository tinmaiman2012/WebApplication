'use strict';


angular.module('musicApp')
  .controller('MainCtrl', function ($scope, $location, $i18next,$window){
    $scope.awesomeThings = [
      'HTML5 Boilerplate',
      'AngularJS',
      'Karma'
    ];
    $scope.showHideMenuLeft = 'msm-section-left-content';
    $scope.showHideContentRight = '';
    $scope.flashIcon = true;

    $scope.clickIconPhone = function(){
      if($scope.flashIcon){
        $scope.$broadcast('closeBoxSmall', 'close');
        $scope.style = {width: '49%'};
        $scope.mainStyle = { width: '50%'};
        $scope.flashIcon = false;
      } else {
        $scope.style = {width: '0'};
        $scope.mainStyle = { width: '100%'};
        $scope.flashIcon = true;
      }

    };

    $scope.myLangs = [
      {id:'en',name: 'English'},
      {id:'vi',name: 'Tiếng Việt'}
    ];

    $scope.myLang = $scope.myLangs[0];

    $scope.$watch(function(){
      return $scope.myLang;
    },function(newValue){
      $scope.myLang = newValue;
      $i18next.options.lng = $scope.myLang.id;

    });
    $scope.showEnglishBtn = false;
    $scope.showVietnamBtn = true;
    $scope.english= 'btn-primary';
    $scope.vietnam= 'bg-default';

    $scope.changeLng = function (lng) {
      if(lng==='vi'){
        $scope.showEnglishBtn = true;
        $scope.showVietnamBtn = false;
        $scope.english= 'bg-default';
        $scope.vietnam= 'btn-primary';
      }else{
        $scope.showEnglishBtn = false;
        $scope.showVietnamBtn = true;
        $scope.english= 'btn-primary';
        $scope.vietnam= 'bg-default';
      }
      $i18next.options.lng = lng;
    };

    $scope.activeSong = 'active';
    $scope.activePlaylist = '';

    $scope.goToSong = function () {
      //console.log("abc");
      $location.url('song');
    };

    $scope.goToPlaylist = function () {
      $location.url('playlist');
    };

    $scope.$on('changeActiveMenu', function (event, data) {
      if(data ==='song'){
        $scope.activeSong = 'active';
        $scope.activePlaylist = '';
      }else{
        $scope.activeSong = '';
        $scope.activePlaylist = 'active';
      }
    });







  });
