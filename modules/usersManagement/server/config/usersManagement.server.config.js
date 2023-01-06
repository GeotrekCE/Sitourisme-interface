'use strict';

/**
 * Module dependencies.
 */
var path = require('path'),
  config = require(path.resolve('./config/config'));

module.exports = function () {
  // roles are sorted in decreasing importance order !
  config.roles = ['admin', 'manager', 'user'];
  config.apiKeys = [
    'adt04',
    'var83-grimaud',
    'var83-hyeres',
    'var83-croixvalmer',
    'var83-ramatuelle',
    'var83-frejus',
    'var83-cavalaire',
    'var83-fayence',
    'var83-aiguines',
    'var83-lelavandou',
    'var83-dracenie',
    'var83-gapeau',
    'var83-bormeslesmimosas',
    'var83-lalondelesmaures',
    'var83-toulon',
    'var83-cogolin',
    'var83-rayol',
    'var83-lepradet',
    'var83-carqueiranne',
    'var83-adt83',
    'var83-lessallessurverdon',
    'var83-aupsetregusse',
    'var83-pierrefeu',
    'var83-lagardefreinet',
    'var83-lavaletteduvar',
    'var83-sudstebaume',
    'var83-saintemaxime',
    'var83-vinonsurverdon',
    'constellation',
    'alpes-maritimes',
    'bouches-du-rhone',
    'AM06',
    'Geotrek',
    'Nice',
    'RegionDo',
    'Cannes'
  ];
  config.apiKeysRequest = {
    adt04: {
      importType: 'adt04',
      importSubType: null
    },
    'var83-grimaud': {
      importType: 'VAR83',
      importSubType: 'GRIMAUD'
    },
    'var83-hyeres': {
      importType: 'VAR83',
      importSubType: 'HYERES'
    },
    'var83-croixvalmer': {
      importType: 'VAR83',
      importSubType: 'CROIXVALMER'
    },
    'var83-ramatuelle': {
      importType: 'VAR83',
      importSubType: 'RAMATUELLE'
    },
    'var83-frejus': {
      importType: 'VAR83',
      importSubType: 'FREJUS'
    },
    'var83-cavalaire': {
      importType: 'VAR83',
      importSubType: 'CAVALAIRE'
    },
    'var83-fayence': {
      importType: 'VAR83',
      importSubType: 'FAYENCE'
    },
    'var83-aiguines': {
      importType: 'VAR83',
      importSubType: 'AIGUINES'
    },
    'var83-lelavandou': {
      importType: 'VAR83',
      importSubType: 'LELAVANDOU'
    },
    'var83-dracenie': {
      importType: 'VAR83',
      importSubType: 'DRACENIE'
    },
    'var83-gapeau': {
      importType: 'VAR83',
      importSubType: 'GAPEAU'
    },
    'var83-bormeslesmimosas': {
      importType: 'VAR83',
      importSubType: 'BORMESLESMIMOSAS'
    },
    'var83-lalondelesmaures': {
      importType: 'VAR83',
      importSubType: 'LALONDELESMAURES'
    },
    'var83-adt83': {
      importType: 'VAR83',
      importSubType: 'ADT83'
    },
    'var83-toulon': {
      importType: 'VAR83',
      importSubType: 'TOULON'
    },
    'var83-lessallessurverdon': {
      importType: 'VAR83',
      importSubType: 'LESSALLESSURVERDON'
    },
    'var83-aupsetregusse': {
      importType: 'VAR83',
      importSubType: 'AUPSETREGUSSE'
    },
    'var83-pierrefeu': {
      importType: 'VAR83',
      importSubType: 'PIERREFEU'
    },
    'var83-lagardefreinet': {
      importType: 'VAR83',
      importSubType: 'LAGARDEFREINET'
    },
    'var83-lavaletteduvar': {
      importType: 'VAR83',
      importSubType: 'LAVALETTEDUVAR'
    },
    'var83-cogolin': {
      importType: 'VAR83',
      importSubType: 'COGOLIN'
    },
    'var83-rayol': {
      importType: 'VAR83',
      importSubType: 'RAYOL'
    },
    'var83-sudstebaume': {
      importType: 'VAR83',
      importSubType: 'SUDSTEBAUME'
    },
    'var83-saintemaxime': {
      importType: 'VAR83',
      importSubType: 'SAINTEMAXIME'
    },
    'var83-vinonsurverdon': {
      importType: 'VAR83',
      importSubType: 'VINONSURVERDON'
    },
    'var83-lepradet': {
      importType: 'VAR83',
      importSubType: 'LEPRADET'
    },
    'var83-carqueiranne': {
      importType: 'VAR83',
      importSubType: 'CARQUEIRANNE'
    },
    constellation: {
      importType: 'CONSTELLATION',
      importSubType: 'CONSTELLATION'
    },
    AM06: {
      importType: 'AM06',
      importSubType: null
    },
    'alpes-maritimes': {
      importType: 'AM06',
      importSubType: null
    },
    'bouches-du-rhone': {
      importType: 'BR13',
      importSubType: null
    },
    Geotrek: {
      importType: 'GEOTREK',
      importSubType: null
    },
    Nice: {
      importType: 'Nice',
      importSubType: null
    },
    RegionDo: {
      importType: 'RegionDo',
      importSubType: null
    },
    Cannes: {
      importType: 'Cannes',
      importSubType: null
    },
    Avesnois: {
      importType: 'Avesnois',
      importSubType: null
    }
  };
};
