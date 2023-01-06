'use strict';

module.exports = {
  client: {
    lib: {
      css: [
        'public/lib/bootstrap/dist/css/bootstrap.css',
        'public/lib/bootstrap/dist/css/bootstrap-theme.css',
        'public/lib/angular-ui-grid/ui-grid.css',
        'public/lib/AngularJS-Toaster/toaster.css'
      ],
      js: [
        'public/lib/jquery/dist/jquery.min.js',
        'public/lib/angular/angular.js',
        'public/lib/angular-resource/angular-resource.js',
        'public/lib/angular-animate/angular-animate.js',
        'public/lib/angular-touch/angular-touch.js',
        'public/lib/angular-ui-router/release/angular-ui-router.js',
        'public/lib/angular-ui-utils/ui-utils.js',
        'public/lib/angular-bootstrap/ui-bootstrap-tpls.js',
        'public/lib/angular-ui-grid/ui-grid.js',
        'public/lib/angular-file-upload/angular-file-upload.js',
        'public/lib/CSV-JS/csv.js',
        'public/lib/pdfmake/build/pdfmake.js',
        'public/lib/pdfmake/build/vfs_fonts.js',
        'public/lib/AngularJS-Toaster/toaster.js',
        'public/lib/checklist-model/checklist-model.js'
      ]
    },
    css: ['modules/*/client/css/*.css'],
    less: ['modules/*/client/less/*.less'],
    sass: ['modules/*/client/sass/*.sass'],
    js: [
      'modules/core/client/app/config.js',
      'modules/core/client/app/init.js',
      'modules/*/client/*.js',
      'modules/*/client/**/*.js'
    ],
    views: ['modules/*/client/views/**/*.html']
  },
  server: {
    allJS: [
      'gruntfile.js',
      'server.js',
      'config/**/*.js',
      'modules/*/server/**/*.js'
    ],
    models: 'modules/*/server/models/**/*.js',
    routes: [
      'modules/!(core)/server/routes/**/*.js',
      'modules/core/server/routes/**/*.js'
    ],
    sockets: 'modules/*/server/sockets/**/*.js',
    config: 'modules/*/server/config/*.js',
    policies: 'modules/*/server/policies/*.js',
    views: 'modules/*/server/views/*.html'
  }
};
