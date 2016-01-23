Meteor.publish("tasks", function () {
	return TaskCollection.find();
	// return Tasks.find({
	// 	$or: [
	// 		{ private: { $ne: true } },
	// 		{ owner: this.userId }
	// 	]
	// });
});
