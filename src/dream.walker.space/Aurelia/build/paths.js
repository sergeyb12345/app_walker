var appRoot = 'Aurelia/src/';
var outputRoot = 'Aurelia/dist/';
var exportSrvRoot = 'Aurelia/export/';

module.exports = {
  root: appRoot,
  source: appRoot + '**/*.js',
  html: appRoot + '**/*.html',
  css: appRoot + '**/*.css',
  style: 'Content/**/*.css',
  output: outputRoot,
  exportSrv: exportSrvRoot,
  doc: './doc',
  e2eSpecsSrc: 'Aurelia/test/e2e/src/**/*.js',
  e2eSpecsDist: 'Aurelia/test/e2e/dist/'
};
