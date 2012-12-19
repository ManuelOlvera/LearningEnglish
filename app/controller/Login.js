Ext.define('LearningEnglish.controller.Login', {
	extend: 'Ext.app.Controller',

	config: {
		refs: {

			salesforceSingInButton : '#login_sing_in'

		},
		control: {

			salesforceSingInButton : {
				tap: 'salesforceSingIn'
			}
		}

	},

	salesforceSingIn: function() {

        console.log("login called");

        // Instantiating forcetk ClientUI
        ftkClientUI = new forcetk.ClientUI(LearningEnglish['loginURL'], LearningEnglish['consumerKey'],
            LearningEnglish['callbackURL'], LearningEnglish['proxy'],
            function forceOAuthUI_successHandler(forcetkClient) { // successCallback
                console.log('OAuth success!');
                console.log('forcetkClient', forcetkClient);

                LearningEnglish['sfdcClient)'] = ftkClientUI.client;
                console.log('LearningEnglish[\'sfdcClient)\']', LearningEnglish['sfdcClient)']);
                // Initialize the main view
                Ext.Viewport.add(Ext.create('LearningEnglish.view.Main'));
                Ext.Viewport.setActiveItem(1);

            },
            function forceOAuthUI_errorHandler(error) { // errorCallback
                console.log('error', error);
                alert('OAuth error!');
            }
        );

        // Initiating login process
        ftkClientUI.login();

	},

    _authenticate: function(callback, errorCallback, callbackParam, controller) {

        console.log('_authenticate starts');
        var refreshToken = localStorage.getItem('ftkui_refresh_token_learningEnglish');
        var controller = LearningEnglish.app.getController(controller);

        console.log('refreshToken',refreshToken);
        // Initializes the sfdc client
        LearningEnglish['sfdcClient'] = new forcetk.Client(LearningEnglish['consumerKey'],
                                            LearningEnglish['loginURL'], LearningEnglish['proxy']);
        LearningEnglish['sfdcClient'].setRefreshToken(refreshToken);

        console.log('LearningEnglish[\'sfdcClient\']',LearningEnglish['sfdcClient']);

        LearningEnglish['sfdcClient'].refreshAccessToken(
            function refreshAccessToken_successHandler(sessionToken) {
                LearningEnglish['sfdcClient'].setSessionToken(sessionToken.access_token, null, sessionToken.instance_url);
                console.log('INFO: OAuth login successful!')
                console.log('callback', callback);
                console.log('callbackParam', callbackParam);
                if(callbackParam === null){
                    controller[callback].call();
                } else {
                    controller[callback].call(this, callbackParam);
                }
            },
            function refreshAccessToken_errorHandler(jqXHR, textStatus, errorThrown) {
                console.log('ERROR: OAuth login!')
                errorCallback.call();
            }
        );
    }

});