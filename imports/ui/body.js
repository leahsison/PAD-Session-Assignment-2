import { Template } from 'meteor/templating';
import { Queue } from '../api/queue.js'
import { Serving } from '../api/queue.js'
import { ReactiveVar } from 'meteor/reactive-var';
import '../../client/main.html';

var number = localStorage.getItem("number") || 0;
Template.body.onCreated(function bodyOnCreated() {
	Meteor.subscribe('queue');
})
Template.body.helpers({
	queue() {
		return Queue.find({});
	}, 
	serving() {
		return Serving.find({});
	}
});

Template.body.events({

  'click #submit'(event, instance) {
  	number++;
    localStorage.setItem("number", number);
    Meteor.call('queue.insert', number);
  },
 'click #serve' (event, instance) {
 	if (Queue.find().count() != 0) {
 		Meteor.call('serving.insert', Queue.findOne().number);
 	}
  },
  'click .remove' (event, instance) {
  	Meteor.call('serving.delete', this.number);
  }
});