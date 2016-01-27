
Meteor.startup(() => {
	ServiceConfiguration.configurations.upsert(
		{ service: "google" },
		{
			$set: {
				clientId: Meteor.settings.private.google.web.client_id,
				secret: Meteor.settings.private.google.web.client_secret,
				loginStyle: "popup",
				requestPermissions: 'email'
			}
		}
	);
});
