import { ReactiveVar } from 'meteor/reactive-var';

const template = new ReactiveVar('bootstrap3');
const options = new ReactiveVar({});
const defaults = {
	classes: {
		bootstrap3: 'alert-warning',
		semantic_ui: 'negative',
		uikit: 'warning',
		foundation: 'warning',
	},
};

export const Status = {
	template() {
		return template.get();
	},

	option(option) {
		return options.get()[option] || defaults[option][template.get()];
	},

	setTemplate(name, _options) {
		template.set(name);

		if (_options) options.set(_options);
	},
};
