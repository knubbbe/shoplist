Meteor.methods({
	addTask(text) {
		// Make sure the user is logged in before inserting a task
		// if (! Meteor.userId()) {
		// 	throw new Meteor.Error("not-authorized");
		// }

		TaskCollection.insert({
			text: text,
			createdAt: new Date()
			// owner: Meteor.userId(),
			// username: Meteor.user().username
		});
	},

	removeTask(taskId) {
		TaskCollection.remove(taskId);
	},

	setChecked(taskId, setChecked) {
		TaskCollection.update(taskId, { $set: { checked: setChecked } });
	}
});
