Meteor.methods({
	addTask(text) {
		if (! Meteor.userId()) {
			throw new Meteor.Error('not-authorized');
		}

		check(text, String);

		TaskCollection.insert({
			text: text,
			createdAt: new Date(),
			owner: Meteor.userId()
		});
	},

	editTask(taskId, text) {
		if (! Meteor.userId()) {
			throw new Meteor.Error('not-authorized');
		}

		check(text, String);
		TaskCollection.update(taskId, {
			$set: {
				text,
				updatedAt: new Date()
			}
		});

	},

	removeTask(taskId) {
		TaskCollection.remove(taskId);
	},

	setChecked(taskId, setChecked) {
		TaskCollection.update(taskId, { $set: { checked: setChecked } });
	}
});
