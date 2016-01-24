// App component - represents the whole app
TaskList = React.createClass({
	propTypes: {
		'tasks': React.PropTypes.array.isRequired
	},

	render() {
		return (
			<ul className="task-list">
				{ this.props.tasks.map((task) => {
					return <Task key={ task._id } task={ task } />;
				}) }
			</ul>
		);
	}
});
