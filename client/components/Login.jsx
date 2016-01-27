// App component - represents the whole app
Login = React.createClass({
	render() {
		return (
			<div className="container login">
				<h1>Shoplist</h1>
				<button onClick={ this.loginWithGoogle }>Login with Google</button>
			</div>
		);
	},

	loginWithGoogle() {
		Meteor.loginWithGoogle({
			requestPermissions: ['email', 'profile'],
			requestOfflineToken: false,
			redirectUrl: Meteor.settings.public.google.web.redirect_uris
		});
	}
});
