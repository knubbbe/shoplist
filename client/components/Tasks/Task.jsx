// Task component - represents a single todo item
Task = React.createClass({
	propTypes: {
		task: React.PropTypes.object.isRequired
	},

	toggleChecked() {
		Meteor.call('setChecked', this.props.task._id, !this.props.task.checked);
	},

	deleteTask() {
		Meteor.call('removeTask', this.props.task._id);
	},

	render() {
		const _class = this.props.task.checked ? "checked" : "";

		return (
			<li className={ _class }>
				<i className="ion-android-cancel delete" onClick={ this.deleteTask }></i>

				<label onClick={ this.toggleChecked }>

				{ this.props.task.checked ?
					<i className="ion-checkmark-circled success"></i> :
					<i className="ion-ios-circle-outline"></i> }

					<span className="text">
						{ this.props.task.text }
					</span>
				</label>
			</li>
		);
	}
});
