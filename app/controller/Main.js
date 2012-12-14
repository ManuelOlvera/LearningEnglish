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
            getLatestWordsButton : '#main_getLatestWords',
            mainPanel : 'main_panel',
            gamePanel : 'game_panel',
            backMain: '#backMain_button'
			// tabpanel buttons - for history support as well
			// homeTabBarButton    : 'tabbar button[title=Home]',

		},
		control: {

			// homeTabBarButton    : {
			// 	tap: function(){
			// 		this.redirectTo('home');
			// 	}
			// }
            backMain : {
                tap: 'showHome'
            },
			salesforceSingInButton : {
				tap: 'salesforceSingIn'
			},
            getLatestWordsButton : {
                tap: function() {
                    // '_authenticate'
                    this._authenticate('getLatestWords', function(){console.log('errorCallback')});
                }
            }
		},

		// history support
		routes: {

			'home'	: 'showHome',
            'game'  : 'showGame'

		}
	},

    showHome: function(){
        var mainController = LearningEnglish.app.getController('Main');
        console.log('mainController.getGamePanel()', mainController.getGamePanel());
        if(mainController.getMainPanel() != null){
            Ext.Viewport.animateActiveItem(mainController.getMainPanel(), {type:'pop'});
        } else {
            Ext.Viewport.animateActiveItem(Ext.create('LearningEnglish.view.Main'), {type:'pop'});
        }
    },
    showGame: function(){
        var mainController = LearningEnglish.app.getController('Main');
        if(mainController.getGamePanel() != null){
            Ext.Viewport.animateActiveItem(mainController.getGamePanel(), {type:'pop'});
        } else {
            Ext.Viewport.animateActiveItem(Ext.create('LearningEnglish.view.Game'), {type:'pop'});
        }
    },

	salesforceSingIn: function() {

    var mainController = this;
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

    getLatestWords: function() {

        console.log('getLatestWords starts');
        var mainController = LearningEnglish.app.getController('Main');

        var formValues = LearningEnglish.app.getController('Main').getMainPanel().getValues();
        var date = formValues['main_date'];
        var formatDate = null;
        if(date != null){
            formatDate = date.getDate() + '-' + (date.getMonth() + 1) + '-' + date.getFullYear() + ' 00:00:00';
        }
        console.log(formatDate);

        LearningEnglish['sfdcClient'].apexrest('/learningEnglish/v1.0/getLatestWords?fromDate='+encodeURIComponent(formatDate),
        function(success){
            console.log('getLatestWords Callback');
            var words_store = Ext.create('LearningEnglish.model.Word');
            words_store.saveWords(JSON.parse(success));
            // Initialize the game view
            // Ext.Viewport.add(Ext.create('LearningEnglish.view.Game'));
            // mainController.redirectTo('game');
            mainController.redirectTo('game');
            console.log('opening game view');
        }, function(error){
            console.log('getLatestWords Callback');
            console.log('error', error);
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