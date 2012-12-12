Ext.define('LearningEnglish.controller.Main', {
	extend: 'Ext.app.Controller',

	init : function(){

		document.addEventListener("backbutton",
			function(){
				if( Ext.Viewport.getActiveItem().getActiveItem().xtype === 'main_panel'
                    ||  Ext.Viewport.getActiveItem().getActiveItem().xtype === 'login_panel' ){
					// back on home page must quit the app
					navigator.app.exitApp();
				}else{
					history.back();
				}
			}

		, false);
	},

	config: {
		refs: {

			salesforceSingInButton : '#login_sing_in',
            getWordsButton : '#main_get_words',
			// tabpanel buttons - for history support as well
			// homeTabBarButton    : 'tabbar button[title=Home]',

		},
		control: {

			// homeTabBarButton    : {
			// 	tap: function(){
			// 		this.redirectTo('home');
			// 	}
			// }
			salesforceSingInButton : {
				tap: 'salesforceSingIn'
			},
            getWordsButton : {
                tap: function() {
                    // '_authenticate'
                    this._authenticate('getWords', function(){console.log('errorCallback')});
                }
            }
		},

		// history support
		routes: {

			// 'home'		 		: 'showHome'

		}
	},

	salesforceSingIn: function() {

    var mainController = this;
    console.log("login called");
    // Salesforce login URL
    // var loginURL = 'https://login.salesforce.com/';

    // Consumer Key from Setup | Develop | Remote Access
    // consumerKey = '3MVG9rFJvQRVOvk7iv8t.9fmXUJpANbmAW2uvnRBffz0Xn41bfe5HGnYRoSaiiJl0CjWBWKkV6.W4iyQzGg69';

    // Callback URL from Setup | Develop | Remote Access
    // callbackURL = 'https://login.salesforce.com/services/oauth2/success';

    // proxy = 'http://localhost/LearningEnglish/proxy/proxy.php?mode=native';

    // Instantiating forcetk ClientUI
    ftkClientUI = new forcetk.ClientUI(LearningEnglish['loginURL'], LearningEnglish['consumerKey'],
        LearningEnglish['callbackURL'], LearningEnglish['proxy'],
        function forceOAuthUI_successHandler(forcetkClient) { // successCallback
            console.log('OAuth success!');
            console.log('forcetkClient', forcetkClient);
            // Initialize the main view
            Ext.Viewport.add(Ext.create('LearningEnglish.view.Main'));
            Ext.Viewport.setActiveItem(1);

            mainController.getWords();
        },
        function forceOAuthUI_errorHandler(error) { // errorCallback
            console.log('error', error);
            alert('OAuth error!');
        }
    );

    // Initiating login process
    ftkClientUI.login();
    console.log("sfdcClient", LearningEnglish['sfdcClient)']);
    LearningEnglish['sfdcClient)'] = ftkClientUI.client;
    console.log("sfdcClient", LearningEnglish['sfdcClient)']);

	},

    getWords: function() {

        console.log('getWords starts');

        LearningEnglish['sfdcClient'].query("SELECT English__c, Spanish__c FROM Word__c",
            function(response){
                console.log('getWords Callback');
                console.log('response', response);
                for(i = 0; i < response['records'].length; i++){
                    console.log('Word '+ i +': '+response.records[i].English__c);
                }
            }
        );

    },

    _authenticate: function(callback, errorCallback) {

        console.log('_authenticate starts');
        var refreshToken = localStorage.getItem('ftkui_refresh_token');
        var mainController = this;

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
                mainController[callback].call();
            },
            function refreshAccessToken_errorHandler(jqXHR, textStatus, errorThrown) {
                console.log('ERROR: OAuth login!')
                errorCallback.call();
            }
        );
    }

});