AddTaskForm = React.createClass({
	propTypes: {
		handleSubmit: React.PropTypes.func.isRequired
	},

	componentDidMount() {
		const input = ReactDOM.findDOMNode(this.refs.taskText);
		input.focus();
	},

	render() {
		return (
			<form className="new-task" onSubmit={ this.handleSubmit } >
				<input
					type="text"
					ref="taskText"
				placeholder="Type to add new tasks" />
			</form>
		);
	},

	handleSubmit(e) {
		e.preventDefault();

		const input = ReactDOM.findDOMNode(this.refs.taskText);
		const value = input.value.trim();

		if (input.value !== '') {
			input.value = '';

			this.props.handleSubmit(value);
		}
	}
});
