/**
 * Created by ltandat on 6/10/14.
 */
'use strict';
(function () {

  angular.module('playlistApp', []).service('playlistService', function () {
    this.dataPlaylist = [
      {id: 1, name: 'List 1', date: '1-1-2014'},
      {id: 2, name: 'List 2', date: '3-5-2014'},
      {id: 3, name: 'List 3', date: '9-6-2014'},
      {id: 4, name: 'List 4', date: '19-12-2013'},
      {id: 5, name: 'List 5', date: '12-1-2014'}
    ];
    this.dataSongInPlaylist = [
      {id: 1, idL: 1, idS: 1},
      {id: 2, idL: 1, idS: 2},
      {id: 3, idL: 1, idS: 3},
      {id: 4, idL: 1, idS: 4},
      {id: 5, idL: 1, idS: 7},
      {id: 6, idL: 2, idS: 1},
      {id: 7, idL: 2, idS: 3},
      {id: 8, idL: 2, idS: 5},
      {id: 9, idL: 2, idS: 4},
      {id: 10, idL: 3, idS: 1},
      {id: 11, idL: 3, idS: 6},
      {id: 12, idL: 3, idS: 7},
      {id: 13, idL: 3, idS: 5},
      {id: 14, idL: 3, idS: 2},
      {id: 15, idL: 4, idS: 1},
      {id: 16, idL: 4, idS: 5},
      {id: 17, idL: 4, idS: 6}

    ];

    this.getPlaylist = function () {
      return angular.copy(this.dataPlaylist);
    };

    this.getSongInPlaylist = function () {
      return this.dataSongInPlaylist;

    };

    this.getSongInPlaylistCurrent = function (idList) {
      var result = [];
      for (var i = 0; i < this.dataSongInPlaylist.length; i++) {
        if (this.dataSongInPlaylist[i].idL.toString() === idList.toString()) {
          result.push(this.dataSongInPlaylist[i]);
        }
      }
      return result;

    };

    this.findMaxId = function () {
      var idMax = this.dataPlaylist[0].id;
      for (var i = 0; i < this.dataPlaylist.length - 1; i++) {
        if (idMax < this.dataPlaylist[i + 1].id) {
          idMax = this.dataPlaylist[i + 1].id;
        }
      }
      return idMax;
    };

    this.findMaxIdSongInPlaylist = function () {
      var idMax = this.dataSongInPlaylist[0].id;
      for (var i = 0; i < this.dataSongInPlaylist.length - 1; i++) {
        if (idMax < this.dataSongInPlaylist[i + 1].id) {
          idMax = this.dataSongInPlaylist[i + 1].id;
        }
      }
      return idMax;
    };

    this.addPlaylistInServices = function (objSong) {
      var today = new Date();
      var dateCreate = today.getDate() + '-' + (today.getMonth() + 1) + '-' + today.getFullYear();
      var maxId = this.findMaxId() + 1;
      this.dataPlaylist.push({id: maxId, name: objSong, date: dateCreate});
    };

    this.addSongInPlaylistInServices = function (idL, idS) {
      var maxId = this.findMaxIdSongInPlaylist() + 1;
      this.dataSongInPlaylist.push({id: maxId, idL: idL, idS: idS});
    };

    this.deletePlaylist = function (listID) {
      for (var i = 0; i < this.dataPlaylist.length;) {
        if (listID.toString() === this.dataPlaylist[i].id.toString()) {
          this.dataPlaylist.splice(i, 1);
          break;
        } else {
          i++;
        }
      }
    };

    this.deleteSongInPlaylist = function (listID) {
      for (var i = 0; i < this.dataSongInPlaylist.length;) {
        if (listID.toString() === this.dataSongInPlaylist[i].idL.toString()) {
          this.dataSongInPlaylist.splice(i, 1);
          // break;
        } else {
          i++;
        }
      }
    };

    this.deleteCurrentSongInPlaylistCurrent = function (idL, idS) {
      //console.log(idL+"---"+idS);
      for (var i = 0; i < this.dataSongInPlaylist.length;) {
        if (this.dataSongInPlaylist[i].idL.toString() === idL.toString() && this.dataSongInPlaylist[i].idS.toString() === idS.toString()) {
          this.dataSongInPlaylist.splice(i, 1);
          //console.log(this.dataSongInPlaylist);
          break;
        } else {
          i++;
        }
      }

    };
  });

})();



