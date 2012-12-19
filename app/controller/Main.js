Ext.define('LearningEnglish.controller.Main', {
	extend: 'Ext.app.Controller',

	init : function(){

        var mainController = this;

        document.addEventListener("deviceready",

            function(){

                // app back online - submit offline reports and get news
                document.addEventListener("backbutton", mainController._backButton, false);

                // app back online - submit offline reports and get news
                document.addEventListener("online", mainController._appOnline, false);

                // app goes offline
                document.addEventListener("offline", mainController._appOffline, false);

            }
        , false);


	},

	config: {

		refs: {

            mainPanel : 'main_panel',
            gamePanel : 'game_panel',
            newWordPanel: 'newWord_panel',
            backMain: '#backMain_button',
            backMainFromNewWordButton: '#backMainFromNewWord_button',

		},
		control: {

            backMain : {
                tap: 'goBackHome'
            },
            backMainFromNewWordButton: {
                tap: 'showHome'
            }
		},

		// history support
		routes: {

			'home'	: 'showHome',
            'game'  : 'showGame',
            'newWord' : 'showNewWord'

		}
	},

    redirectNewWord: function(){
        var mainController = LearningEnglish.app.getController('Main');
        mainController.redirectTo('newWord');
        var newWordForm = mainController.getNewWordPanel();
        newWordForm.setValues({
            newWord_english : "",
            newWord_spanish : ""
        });
    },

    showHome: function(){

        var mainController = this;
        if(mainController.getMainPanel() != null){
            Ext.Viewport.animateActiveItem(mainController.getMainPanel(), {type:'pop'});
        } else {
            Ext.Viewport.animateActiveItem(Ext.create('LearningEnglish.view.Main'), {type:'pop'});
        }
    },

    showGame: function(){

        var mainController = this;
        if(mainController.getGamePanel() != null){
            Ext.Viewport.animateActiveItem(mainController.getGamePanel(), {type:'pop'});
        } else {
            Ext.Viewport.animateActiveItem(Ext.create('LearningEnglish.view.Game'), {type:'pop'});
        }
    },

    showNewWord: function(){

        var mainController = this;
        if(mainController.getNewWordPanel() != null){
            Ext.Viewport.animateActiveItem(mainController.getNewWordPanel(), {type:'pop'});
        } else {
            Ext.Viewport.animateActiveItem(Ext.create('LearningEnglish.view.NewWord'), {type:'pop'});
        }
    },

    goBackHome: function(){
        var wordsStore = Ext.getStore('Word');
        var mainController = this;
        var gameController = LearningEnglish.app.getController('Game');
        wordsStore.sync();
        console.log('errorWordsList', currentGame['errorWordsList']);
        gameController._postErrorWordsList();
        localStorage.setItem('rightCount', currentGame['rightCount']);
        localStorage.setItem('wrongCount', currentGame['wrongCount']);
        mainController.redirectTo('home');
    },

    _backButton: function(){

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
    },

    _appOnline: function() {

        var gameController = LearningEnglish.app.getController('Game');
        currentGame['errorWordsList'] = JSON.parse(localStorage.getItem('errorWordsList'));
        gameController._postErrorWordsList();
    },

    _appOffline: function(){

    }

});