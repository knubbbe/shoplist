// Task component - represents a single todo item
Task = React.createClass({
	propTypes: {
		task: React.PropTypes.object.isRequired
	},

	getInitialState() {
		return {
			'text': this.props.task.text,
			'swiping': false,
			'startpos': 0,
			'touchpos': 0,
			'scrollpos': 0,
			'touchstart': null
		}
	},

	componentDidMount() {
		const taskItem = ReactDOM.findDOMNode(this.refs.taskItem);
		taskItem.addEventListener('touchstart', this._touchStart, false);
		taskItem.addEventListener('touchmove', this._touchMove, false);
		taskItem.addEventListener('touchend', this._touchEnd, false);
	},

	componentWillUnmount() {
		const taskItem = ReactDOM.findDOMNode(this.refs.taskItem);
		taskItem.removeEventListener('touchstart', this._touchStart);
		taskItem.removeEventListener('touchmove', this._touchMove);
		taskItem.removeEventListener('touchend', this._touchEnd);
	},

	_touchStart(e) {
		console.log('start');
		const elem = ReactDOM.findDOMNode(this.refs.taskItem);
		let touchobj = e.changedTouches[0];

		elem.style.transition = '';

		this.setState({
			swiping: false,
			startpos: touchobj.pageX,
			scrollpos: touchobj.pageY,
			touchstart: new Date().getTime()
		});
	},
	_touchMove(e) {
		const elem = ReactDOM.findDOMNode(this.refs.taskItem);
		const touchobj = e.changedTouches[0];
		const newScrollpos = touchobj.pageY - this.state.scrollpos;
		let newPos = touchobj.pageX - this.state.startpos;

		if ((newScrollpos < 5 && newScrollpos > -5) || this.state.swiping) {
			newPos = (newPos <= 0 && newPos > -250)? newPos : this.state.touchpos;
			this.setState({
				swiping: true,
				touchpos: newPos
			});
			e.preventDefault();
		}
	},
	_touchEnd(e) {
		console.log('end');
		const endtime = new Date().getTime();
		const touchtime = endtime - this.state.touchstart;
		const elem = ReactDOM.findDOMNode(this.refs.taskItem);
		const target = ReactDOM.findDOMNode(e.target);

		if (this.state.touchpos < -200) {
			elem.classList.add('remove');
			setTimeout(this.deleteTask, 600);
		}

		elem.style.transition = 'transform .3s ease';
		this.setState({
			swiping: false,
			startpos: 0,
			touchpos: 0,
			touchstart: null
		});
	},

	toggleChecked() {
		Meteor.call('setChecked', this.props.task._id, !this.props.task.checked);
	},

	deleteTask() {
		Meteor.call('removeTask', this.props.task._id);
	},

	handleTextChange(e) {
		const value = e.target.value.trim();
		Meteor.call('editTask', this.props.task._id, value);
		this.setState({
			'text': value
		});
	},

	render() {
		const _class = this.props.task.checked ? ' checked' : '';
		const itemStyle = { transform: 'translateX(' + this.state.touchpos + 'px)' };

		return (
			<li className={ 'task-item' + _class } style={itemStyle} ref="taskItem">

				<label onClick={ this.toggleChecked }>
				{ this.props.task.checked ?
					<i className="ion-checkmark-circled success"></i> :
					<i className="ion-ios-circle-outline"></i> }
				</label>

				<input
					type='text'
					className='edit-task'
					onChange={ this.handleTextChange }
					value={ this.state.text} />
			</li>
		);
	}
});
