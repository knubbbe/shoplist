// App component - represents the whole app
Login = React.createClass({
	render() {
		return (
			<div className="container login">
				<button onClick={ this.loginWithGoogle }>Login with Google</button>
			</div>
		);
	},

	loginWithGoogle() {
		Meteor.loginWithGoogle({
			requestPermissions: 'email',
			redirectUrl: Meteor.settings.public.google.web.redirect_uris
		}, (data) => {
			console.log(data);
		});
	}
});
