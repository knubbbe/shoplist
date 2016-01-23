AddTaskForm = React.createClass({
	propTypes: {
		handleSubmit: React.PropTypes.func.isRequired
	},

	render() {
		return (
			<form className="new-task" onSubmit={ this.handleSubmit } >
				<input
					type="text"
					ref="textInput"
					placeholder="Type to add new tasks" />
			</form>
		);
	},

	handleSubmit(e) {
		e.preventDefault();

		const input = ReactDOM.findDOMNode(this.refs.textInput);
		const value = input.value.trim();

		if (input.value !== '') {
			input.value = '';

			this.props.handleSubmit(value);
		}
	}
});
