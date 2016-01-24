Meteor.methods({
	addTask(text) {
		check(text, String);

		if (! Meteor.userId()) {
			throw new Meteor.Error('not-authorized');
			// throw new Meteor.Error("not-authorized");
		}

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
