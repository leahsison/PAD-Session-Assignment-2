import { Mongo } from 'meteor/mongo';

export const Queue = new Mongo.Collection('queue');
export const Serving = new Mongo.Collection('serving');

if (Meteor.isServer) {
	Meteor.publish('queue', function queuePublication() {
		return Queue.find();
	}),
	Meteor.publish('serving', function servingPublication(){
		return Serving.find();
	});
}

Meteor.methods({
	'queue.insert' (number) {
		Queue.insert({
			number,
			createdAt: new Date()
		});
	}, 
	'serving.insert' (number) {
		Serving.insert({
			number,
			createdAt: new Date()
		}),
		Queue.remove({number: number});
	},
	'serving.delete' (number) {
		Serving.remove({number: number});
	}
});