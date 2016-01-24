// App component - represents the whole app
App = React.createClass({
	mixins: [ReactMeteorData],

	getMeteorData() {
		let query = {};

		if (this.state.hideCompleted)
			query = {checked: {$ne: true}};

		return {
			tasks: TaskCollection.find(query, { sort: { createdAt: -1 } }).fetch(),
			incompleteCount: TaskCollection.find({ checked: { $ne: true } }).count()
		};
	},

	componentWillMount() {
		Meteor.subscribe("tasks");
	},

	getInitialState() {
		return {
			hideCompleted: false
		}
	},

	renderApp() {
		return (
			<div className="container">
				<header>
					<h1>Shoplist ({ this.data.incompleteCount })</h1>
					<label
						className="hide-completed"
						onClick={ this.toggleHideCompleted }>
						{ this.state.hideCompleted ?
							'Show ' :
							'Hide ' }
						completed
					</label>
					<AddTaskForm
						handleSubmit={ this.handleAddTaskSubmit } />
				</header>

				<TaskList
					tasks={ this.data.tasks }
					hideCompleted={ this.state.hideCompleted } />
			</div>
		);
	},

	renderLogin() {
		return <Login />
	},

	render() {
		return (!Meteor.userId())? this.renderLogin() : this.renderApp();
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
