import { Template } from 'meteor/templating';
import { Meteor } from 'meteor/meteor';
import { _ } from 'meteor/underscore';
import { ReactiveVar } from 'meteor/reactive-var';
import { translate as __ } from '../tapi18n'; // NOTE: 'tapi18n' is located in level root
import { Status } from '../status';

const retryTime = new ReactiveVar(0);
let retryHandle = null;

const clearRetryInterval = function () {
	clearInterval(retryHandle);

	retryHandle = null;
};

const trackStatus = function () {
	if (Meteor.status().status === 'waiting') {
		retryHandle = retryHandle || setInterval(function () {
			const timeDiff = Meteor.status().retryTime - (new Date()).getTime();
			const _retryTime = timeDiff > 0 && Math.round(timeDiff / 1000) || 0;

			retryTime.set(_retryTime);
		}, 500);
	} else clearRetryInterval();
};

let intervalId = null;
const trackStatusExentriq = function () {
	// Start Pinging For Recconect On Interval, only if status is faiting and intervalId is null
	if (Meteor.status().status === 'waiting' && intervalId === null) {
		intervalId = Meteor.setInterval(function () {
			console.log('attempt to reconnect...');
			retryTime.set(3000 / 1000);
			Meteor.reconnect();
		}, 3000);
		console.log(intervalId);
	}
	// Stop Trying to Reconnect If Connected, and clear Interval
	if (Meteor.status().status === 'connected' && intervalId != null) {
		console.log('connected...');
		retryTime.set(0);
		Meteor.clearInterval(intervalId);
		intervalId = null;
	}
};

const helpers = {
	connected() {
		return Meteor.status().connected;
	},

	message() {
		return __(`meteor_status_${Meteor.status().status}`);
	},

	extraMessage() {
		if (Meteor.status().status === 'waiting') {
			const count = retryTime.get();
			return __(count > 1 ? 'meteor_status_reconnect_in_plural' : 'meteor_status_reconnect_in', { count });
		}
	},

	showReconnect() {
		return _.contains(['waiting', 'offline'], Meteor.status().status);
	},

	reconnectLabel() {
		return __(`meteor_status_try_now_${Meteor.status().status}`);
	},

	option(option) {
		return Status.option(option);
	},
};

Template.status.onDestroyed(clearRetryInterval);

Template.status.onCreated(function () {
	if (Status.template() === 'exentriq') {
		this.autorun(trackStatusExentriq);
	} else {
		this.autorun(trackStatus);
	}
});

Template.status.helpers({
	template() {
		return `status_${Status.template()}`;
	},

	helpers() {
		return helpers;
	},
});

Template.status.events({
	'click a.alert-link': function (e) {
		e.preventDefault();
		Meteor.reconnect();
	},
});
