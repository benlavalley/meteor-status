Package.describe({
  name:    'francocatena:status',
  git:     'https://github.com/francocatena/meteor-status',
  summary: 'Displays the connection status between browser and server',
  version: '1.5.4'
})

Package.onUse(function (api) {
  var client = 'client'
  var both   = ['client', 'server']

  api.versionsFrom('1.8.2')

  api.use('tracker', client);
  api.use('templating',   client)
  api.use('underscore',   client)
  api.use('ecmascript',   both)
  api.use('reactive-var', client)

  api.use('tap:i18n@2.0.1', both)
  api.imply('tap:i18n')
  api.addFiles('package-tap.i18n', ['client', 'server']);

  api.addFiles('lib/status.html',            client)
  api.addFiles('templates/semantic_ui.html',  client)

  // Always after templates
  api.addFiles('i18n/meteorStatus.cn.i18n.json', both);
  api.addFiles('i18n/meteorStatus.cs.i18n.json', both);
  api.addFiles('i18n/meteorStatus.da.i18n.json', both);
  api.addFiles('i18n/meteorStatus.de.i18n.json', both);
  api.addFiles('i18n/meteorStatus.en.i18n.json', both);
  api.addFiles('i18n/meteorStatus.es.i18n.json', both);
  api.addFiles('i18n/meteorStatus.et.i18n.json', both);
  api.addFiles('i18n/meteorStatus.fr.i18n.json', both);
  api.addFiles('i18n/meteorStatus.id.i18n.json', both);
  api.addFiles('i18n/meteorStatus.it.i18n.json', both);
  api.addFiles('i18n/meteorStatus.ms.i18n.json', both);
  api.addFiles('i18n/meteorStatus.nl.i18n.json', both);
  api.addFiles('i18n/meteorStatus.pt.i18n.json', both);
  api.addFiles('i18n/meteorStatus.ru.i18n.json', both);
  api.addFiles('i18n/meteorStatus.tr.i18n.json', both);
  api.addFiles('i18n/meteorStatus.vi.i18n.json', both);
  api.addFiles('i18n/meteorStatus.zh.i18n.json', both);
  api.addFiles('i18n/meteorStatus.zh-TW.i18n.json', both);


  api.mainModule('status.js', client);

  api.addFiles('lib/status.js', client);

  api.export('Status', client);
})

Package.onTest(function (api) {
  var client = 'client'

  api.use('francocatena:status', client)
  api.use('tinytest',            client)
  api.use('test-helpers',        client)

  api.addFiles('test/status_tests.js', client)
})
