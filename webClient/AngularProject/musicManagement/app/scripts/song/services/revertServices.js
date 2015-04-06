/**
 * Created by ltandat on 6/20/14.
 */
(function(){
  'use strict';
  angular.module('SongApp').factory('revertFactory', function () {

    this.revertSongList = [];

    this.revertValueSearchSong = '';

    this.revertPlayList = [];

    this.revertSongInPlayList = [];

    this.getRevertSongList = function(){
      return this.revertSongList;
    };

    this.getRevertValueSearchSong = function(){
      return this.revertValueSearchSong;
    };

    this.getRevertPlayList = function(){
      return this.revertPlayList;
    };

    this.getRevertSongInPlayList = function(idList){
      if(!this.revertSongInPlayList[idList]){
        this.revertSongInPlayList[idList] = [];
      }
      return this.revertSongInPlayList[idList];

    };

    return this;

  });

})();