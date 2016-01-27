// App component - represents the whole app
App = React.createClass({
	mixins: [ReactMeteorData],

	getMeteorData() {
		let query = {};
		const sub = Meteor.subscribe("tasks");

		if (this.state.hideCompleted)
			query = {checked: {$ne: true}};

		return {
			isLoading: !sub.ready(),
			user: Meteor.user(),
			tasks: TaskCollection.find(query, { sort: { createdAt: -1 } }).fetch(),
			incompleteCount: TaskCollection.find({ checked: { $ne: true } }).count()
		};
	},

	getInitialState() {
		return {
			hideCompleted: false
		}
	},

	renderApp() {
		const fname = this.data.user.profile.name.split(' ');
		return (
			<div className="root">
				<header>
					<h1>Welcome { fname[0] }</h1>
					<h6>{ this.data.incompleteCount } incomplete</h6>
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

				<div className="container">
					<TaskList
						tasks={ this.data.tasks }
						hideCompleted={ this.state.hideCompleted } />
				</div>
			</div>
		);
	},

	renderLogin() {
		return <Login />
	},

	render() {
		if (this.data.isLoading) {
			return (
				<div className='loading'>
					<i className='ion-ios-loop'></i>
				</div>
			);
		}
		return (!this.data.user)? this.renderLogin() : this.renderApp();
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
