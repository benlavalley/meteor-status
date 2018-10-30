import { translate as __ } from '../tapi18n';
var retryTime   = new ReactiveVar(0)
var retryHandle = null

var clearRetryInterval = function () {
  clearInterval(retryHandle)

  retryHandle = null
}

var trackStatus = function () {
  if (Meteor.status().status === 'waiting')
    retryHandle = retryHandle || setInterval(function () {
      var timeDiff   = Meteor.status().retryTime - (new Date).getTime()
      var _retryTime = timeDiff > 0 && Math.round(timeDiff / 1000) || 0

      retryTime.set(_retryTime)
    }, 500)
  else
    clearRetryInterval()
}

var intervalId = null;
var trackStatusExentriq = function () {
  // Start Pinging For Recconect On Interval, only if status is faiting and intervalId is null
  if(Meteor.status().status === "waiting" && intervalId === null) {
      intervalId = Meteor.setInterval( function () {
          console.log("attempt to reconnect...");
          retryTime.set(3000/1000);
          Meteor.reconnect();
      }, 3000);
      console.log(intervalId);
  }
  // Stop Trying to Reconnect If Connected, and clear Interval
  if(Meteor.status().status === "connected" && intervalId != null) {
      console.log("connected...");
      retryTime.set(0);
      Meteor.clearInterval(intervalId);
      intervalId = null;
  }
}

var helpers = {
  connected: function () {
    return Meteor.status().connected
  },

  message: function () {
    return __(`meteor_status_${Meteor.status().status}`)
  },

  extraMessage: function () {
    if (Meteor.status().status === 'waiting') {
      const count = retryTime.get();
      return __(count > 1? 'meteor_status_reconnect_in_plural' : 'meteor_status_reconnect_in', { count })
    }
  },

  showReconnect: function () {
    return _.contains(['waiting', 'offline'], Meteor.status().status)
  },

  reconnectLabel: function () {
    return __(`meteor_status_try_now_${Meteor.status().status}`)
  },

  option: function (option) {
    return Status.option(option)
  }
}

Template.status.onDestroyed(clearRetryInterval)

Template.status.onCreated(function () {
  if(Status.template() === 'exentriq') {
    this.autorun(trackStatusExentriq)
  } else {
    this.autorun(trackStatus)
  }
})

Template.status.helpers({
  template: function () {
    return 'status_' + Status.template()
  },

  helpers: function () {
    return helpers
  }
})

Template.status.events({
  'click a.alert-link': function (e) {
    e.preventDefault()
    Meteor.reconnect()
  }
})
