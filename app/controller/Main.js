Ext.define('LearningEnglish.controller.Main', {
	extend: 'Ext.app.Controller',

	init : function(){

        document.addEventListener("deviceready",

            function(){

                // ANDROID BACK BUTTON
                document.addEventListener("backbutton",
                    function(){
                        console.log("back button clicked with this Viewport active type: ", Ext.Viewport.getActiveItem().xtype);
                        if( Ext.Viewport.getActiveItem().xtype === 'main_panel'
                            ||  Ext.Viewport.getActiveItem().xtype === 'login_panel' ){
                            console.log("back button clicked being in main panel or login panel");
                            // back on home page must quit the app
                            navigator.app.exitApp();
                        }else{
                            console.log("back button clicked not exit!!!!");
                            history.back();
                        }
                    }

                , false);

            }
        , false);


	},

	config: {
		refs: {

			salesforceSingInButton : '#login_sing_in',
            getLatestWordsButton : '#main_getLatestWords',
            mainPanel : 'main_panel',
            gamePanel : 'game_panel',
            backMain: '#backMain_button',
            // newGameButton: '#main_newGame',
            lessPlayedButton: '#main_lessPlayed',
            mostFailedButton: '#main_mostFailed',
            randomButton: '#main_random',
            continueOldGameButton: '#main_continueOldGame',
            checkWordButton:'#game_checkAnswer',
            rightAnswerdButton:'#game_rightAnswer',
            wrongAnswerButton:'#game_wrongAnswer',
            rightAnswerLabel: '#game_rightAnswer_label',
            wrongAnswerLabel: '#game_wrongAnswer_label'

		},
		control: {

            backMain : {
                tap: 'goBackHome'
            },
			salesforceSingInButton : {
				tap: 'salesforceSingIn'
			},
            // newGameButton : {
            //     tap: 'startNewGame'
            // },
            lessPlayedButton : {
                tap : function() {
                    this.startNewGame('lessPlayed');
                }
            },
            mostFailedButton : {
                tap : function() {
                    this.startNewGame('mostFailed');
                }
            },
            randomButton : {
                tap : function() {
                    this.startNewGame('random');
                }
            },
            checkWordButton : {
                tap: 'checkAnswer'
            },
            rightAnswerdButton : {
                tap: 'rightAnswer'
            },
            wrongAnswerButton : {
                tap: 'wrongAnswer'
            },
            continueOldGameButton : {
                tap: 'continueOldGame'
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

    goBackHome: function(){
        var words_store = Ext.getStore('Word');
        words_store.sync();
        console.log('errorWordsList', currentGame['errorWordsList']);
        if(currentGame['errorWordsList'] != null){
            var errorWordsListJSON = new Array();
            console.log('errorWordsList size: ', currentGame['errorWordsList'].length);
            for(i = 0; i < currentGame['errorWordsList'].length; i++){
                console.log('errorWordsList i: '+i);
                errorWordsListJSON[i] = {
                    id : currentGame['errorWordsList'][i].data['recordId']
                }
            }
            var JSONobjet = {
                paramList : errorWordsListJSON
            };


            console.log('JSONobjet', JSONobjet);
            console.log('JSONobjet2', JSON.stringify(JSONobjet));
            LearningEnglish['sfdcClient'].apexrest('/learningEnglish/v1.0/saveErrorWords', function(success){
                console.log("Everything went well. Error words saved succesfully", success);
                currentGame['errorWordsList'] = null;
            }, function(error){
                console.log("ERROR!!!!!! Saving error words", error);
            }, 'POST', JSON.stringify(JSONobjet), null);
        }
        localStorage.setItem('rightCount', currentGame['rightCount']);
        localStorage.setItem('wrongCount', currentGame['wrongCount']);
        this.redirectTo('home');
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

    startNewGame: function (gameType) {
        var mainController = LearningEnglish.app.getController('Main');
        mainController._authenticate('getLatestWords', function(error){
            alert("Error trying to create a new game.");
        }, gameType);
    },

    continueOldGame: function () {

        var words_store = Ext.getStore('Word');
        var mainController = LearningEnglish.app.getController('Main');
        if(words_store != null && words_store.data.all.length > 0){
            currentGame['rightCount'] = localStorage.getItem('rightCount');
            currentGame['wrongCount'] = localStorage.getItem('wrongCount');
            mainController.redirectTo('game');
            mainController.getWord();mainController.getRightAnswerLabel().setHtml("Right Answers: "+currentGame['rightCount']);
            mainController.getWord();mainController.getWrongAnswerLabel().setHtml("Right Answers: "+currentGame['wrongCount']);
        } else {
            alert("No old game to continue");
        }
    },

    checkAnswer: function() {

        var mainController = LearningEnglish.app.getController('Main');
        var words_store = Ext.getStore('Word');
        var formValues = mainController.getGamePanel();
        if(currentGame['language'] === 'english'){
            console.log("english word");
            formValues.setValues({
                game_answer : words_store.getAt(currentGame['wordPosition']).data['spanish']
            });
        } else {
            console.log("spanish word");
            formValues.setValues({
                game_answer : words_store.getAt(currentGame['wordPosition']).data['english']
            });
        }

    },

    rightAnswer: function() {

        var words_store = Ext.getStore('Word');
        var mainController = LearningEnglish.app.getController('Main');

        if(currentGame['wordPosition'] != null){
            words_store.removeAt(currentGame['wordPosition']);
        }
        currentGame['rightCount'] = parseInt(currentGame['rightCount']) + 1;
        mainController.getRightAnswerLabel().setHtml("Right Answers: "+currentGame['rightCount']);
        mainController.getWord();
    },

    wrongAnswer: function() {

        var mainController = LearningEnglish.app.getController('Main');
        var words_store = Ext.getStore('Word');

        currentGame['wrongCount'] = parseInt(currentGame['wrongCount']) + 1;
        mainController.getWrongAnswerLabel().setHtml("Wrong Answers: "+currentGame['wrongCount']);
        var actualWord = words_store.getAt(currentGame['wordPosition']);
        if(actualWord['mistakes'] === null){
            actualWord['mistakes'] = 1;
        } else {
            actualWord['mistakes'] = parseInt(actualWord['mistakes']) + 1;
        }
        if(currentGame['errorWordsList'] === null){
            console.log('wrong answer >>>>> currentGame[\'errorWordsList\'] is empty');
            currentGame['errorWordsList'] = new Array();
            // currentGame['errorWordsList'][0] = words_store.getAt(currentGame['wordPosition']);
            currentGame['errorWordsList'].push(words_store.getAt(currentGame['wordPosition']));
            console.log('wrong answer >>>>> currentGame[\'errorWordsList\'][0]', currentGame['errorWordsList']);
        } else {
            var errorListSize = currentGame['errorWordsList'].length;
            // currentGame['errorWordsList'][errorListSize-1] = words_store.getAt(currentGame['wordPosition']);
            currentGame['errorWordsList'].push(words_store.getAt(currentGame['wordPosition']));
            console.log('currentGame[\'errorWordsList\'][currentGame[\'errorWordsList\'].length]', currentGame['errorWordsList'][errorListSize-1]);
        }
        words_store.sync();
        mainController.getWord();
    },

    getLatestWords: function(gameType) {

        console.log('getLatestWords starts');

        console.log('getLatestWords gameType: '+gameType);
        var mainController = LearningEnglish.app.getController('Main');

        LearningEnglish['sfdcClient'].apexrest('/learningEnglish/v1.0/getLatestWords?gameType='+gameType,
        function(success){
            console.log('getLatestWords Callback');
            var words_store = Ext.create('LearningEnglish.model.Word');
            words_store.saveWords(JSON.parse(success), true);
            mainController.redirectTo('game');
            currentGame['wrongCount'] = 0;
            currentGame['rightCount'] = 0;
            mainController.getRightAnswerLabel().setHtml("Right Answers: 0");
            mainController.getWrongAnswerLabel().setHtml("Wrong Answers: 0");
            mainController.getWord();
            console.log('opening game view');
        }, function(error){
            console.log('getLatestWords Callback');
            console.log('error', error);
        }
        );

    },

    getWord: function() {
        var words_store = Ext.getStore('Word');
        var storeLenght = words_store.data.all.length;
        var storePosition = Math.round(Math.random()*storeLenght);
        var formValues = LearningEnglish.app.getController('Main').getGamePanel();
        currentGame['wordPosition'] = storePosition;

        console.log('storeLenght', storeLenght);
        console.log('storePosition', storePosition);

        if(Math.random() > 0.5){
            formValues['game_question'] = words_store.getAt(storePosition).data['english'];
            currentGame['language'] = 'english';
            formValues.setValues({
                game_question : words_store.getAt(storePosition).data['english'],
                game_answer : null
            });
            console.log(words_store.getAt(storePosition).data['english']);
        } else {
            formValues['game_question'] = words_store.getAt(storePosition).data['spanish'];
            currentGame['language'] = 'spanish';
            formValues.setValues({
                game_question : words_store.getAt(storePosition).data['spanish'],
                game_answer : null
            });
            console.log(words_store.getAt(storePosition).data['spanish']);
        }

    },

    _authenticate: function(callback, errorCallback, callbackParam) {

        console.log('_authenticate starts');
        var refreshToken = localStorage.getItem('ftkui_refresh_token_learningEnglish');
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
                console.log('callbackParam', callbackParam);
                mainController[callback].call(this, callbackParam);
            },
            function refreshAccessToken_errorHandler(jqXHR, textStatus, errorThrown) {
                console.log('ERROR: OAuth login!')
                errorCallback.call();
            }
        );
    }

});