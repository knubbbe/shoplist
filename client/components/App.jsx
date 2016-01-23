// App component - represents the whole app
App = React.createClass({
	mixins: [ReactMeteorData],

	// Loads items from the Tasks collection and puts them on this.data.tasks
	getMeteorData() {
		let query = {};

		if (this.state.hideCompleted)
			query = {checked: {$ne: true}};

		return {
			tasks: TaskCollection.find(query, { sort: { createdAt: -1 } }).fetch(),
			incompleteCount: TaskCollection.find({ checked: { $ne: true } }).count()
		};
	},

	getInitialState() {
		return {
			hideCompleted: false
		}
	},

	componentWillMount() {
		Meteor.subscribe("tasks");
	},

	renderTasks() {
		return this.data.tasks.map((task) => {
			return <Task key={ task._id } task={ task } />;
		});
	},

	render() {
		return (
			<div className="container">
				<header>
					<h1>Shoplist ({ this.data.incompleteCount })</h1>
					<label
						className="hide-completed"
						onClick={ this.toggleHideCompleted }>
						{ this.state.hideCompleted ?
							<i className="ion-checkmark-circled success"></i> :
							<i className="ion-ios-circle-outline"></i> }
						Hide completed
					</label>
					<AddTaskForm handleSubmit={ this.handleAddTaskSubmit } />
				</header>

				<ul>
					{ this.renderTasks() }
				</ul>
			</div>
		);
	},

	toggleHideCompleted() {
		this.setState({
			hideCompleted: ! this.state.hideCompleted
		});
	},

	handleAddTaskSubmit(text) {
		console.log(text);
		Meteor.call("addTask", text);
	}
});
