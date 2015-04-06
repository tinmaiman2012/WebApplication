/**
 * Created by ltandat on 6/5/14.
 */
'use strict';
(function () {

  angular.module('SongApp', []).factory('songFactory', function () {
    // create dataSong
    this.dataSong = [
      {
        id: 1,
        name: 'Need You Now',
        author: 'Lady Antebellum'
      },
      {
        id: 2,
        name: 'Until You',
        author: 'Shayne Ward'
      },
      {
        id: 3,
        name: 'Every Day I Love You',
        author: 'Boyzone'
      },
      {
        id: 4,
        name: 'Let You Go',
        author: 'Do not remember'
      },
      {
        id: 5,
        name: 'Can\'t I let go',
        author: 'Tokyo square'
      },
      {
        id: 6,
        name: 'Take my to you heart',
        author: 'Do not remember'
      },
      {
        id: 7,
        name: 'My heart will go on',
        author: ' James Horner'
      },

      {
        id: 8,
        name: 'Say you will',
        author: 'Christine McVie'
      }

    ];
    // function getDataSong
    this.getDataSong = function () {
      return angular.copy(this.dataSong);
    };

    this.getDataSongEdit = function () {
      return this.dataSong;
    };

    this.findMaxId = function () {
      var idMax = this.dataSong[0].id;
      for (var i = 0; i < this.dataSong.length - 1; i++) {
        if (idMax < this.dataSong[i + 1].id) {
          idMax = this.dataSong[i + 1].id;
        }
      }
      return idMax;
    };

    this.addSongInServices = function (objSong) {
      var maxId = this.findMaxId() + 1;
      this.dataSong.push({id: maxId, name: objSong.name, author: objSong.author});
    };

    this.deleteSongCurrentInServices = function (songId) {
      for (var i = 0; i < this.dataSong.length;) {
        if (songId === this.dataSong[i].id) {
          this.dataSong.splice(i, 1);
          break;
        } else {
          i++;
        }

      }

    };

    return this;
  });

})();
