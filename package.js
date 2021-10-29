Package.describe({
	name: 'francocatena:status',
	git: 'https://github.com/francocatena/meteor-status',
	summary: 'Displays the connection status between browser and server',
	version: '1.5.4',
});

Package.onUse(function (api) {
	const client = 'client';
	const both = ['client', 'server'];

	api.versionsFrom('2.5');

	api.use('tracker', client);
	api.use('templating', client);
	api.use('underscore', client);
	api.use('ecmascript', both);
	api.use('reactive-var', client);

	api.use('tap:i18n@2.0.1', both);
	api.imply('tap:i18n');
	api.addFiles('package-tap.i18n', ['client', 'server']);

	api.addFiles('lib/status.html', client);
	api.addFiles('templates/semantic_ui.html', client);

	// Always after templates
	api.addFiles('i18n/cn.i18n.json', both);
	api.addFiles('i18n/cs.i18n.json', both);
	api.addFiles('i18n/da.i18n.json', both);
	api.addFiles('i18n/de.i18n.json', both);
	api.addFiles('i18n/en.i18n.json', both);
	api.addFiles('i18n/es.i18n.json', both);
	api.addFiles('i18n/et.i18n.json', both);
	api.addFiles('i18n/fr.i18n.json', both);
	api.addFiles('i18n/id.i18n.json', both);
	api.addFiles('i18n/it.i18n.json', both);
	api.addFiles('i18n/ms.i18n.json', both);
	api.addFiles('i18n/nl.i18n.json', both);
	api.addFiles('i18n/pt.i18n.json', both);
	api.addFiles('i18n/ru.i18n.json', both);
	api.addFiles('i18n/tr.i18n.json', both);
	api.addFiles('i18n/vi.i18n.json', both);
	api.addFiles('i18n/zh.i18n.json', both);
	api.addFiles('i18n/zh-TW.i18n.json', both);


	api.mainModule('status.js', client);

	api.addFiles('lib/status.js', client);

	api.export('Status', client);
});

Package.onTest(function (api) {
	const client = 'client';

	api.use('francocatena:status', client);
	api.use('tinytest', client);
	api.use('test-helpers', client);

	api.addFiles('test/status_tests.js', client);
});
