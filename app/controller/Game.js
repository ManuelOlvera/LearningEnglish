Ext.define('LearningEnglish.controller.Game', {
	extend: 'Ext.app.Controller',

	config: {

		refs: {

            insertWordButton: '#main_insertWord',
            lessPlayedButton: '#main_lessPlayed',
            mostFailedButton: '#main_mostFailed',
            randomButton: '#main_random',
            continueOldGameButton: '#main_continueOldGame',
            checkWordButton:'#game_checkAnswer',
            rightAnswerdButton:'#game_rightAnswer',
            wrongAnswerButton:'#game_wrongAnswer',
            rightAnswerLabel: '#game_rightAnswer_label',
            wrongAnswerLabel: '#game_wrongAnswer_label',
            saveNewWordButton: '#saveNewWord_button'

		},
		control: {

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
            },
            insertWordButton : {
                tap: 'insertNewWord'
            },
            saveNewWordButton: {
                tap: 'postNewWordToSFDC'
            }
		}
	},

    startNewGame: function (gameType) {
        var loginController = LearningEnglish.app.getController('Login');
        loginController._authenticate('getLatestWords', function(error){
            alert("Error trying to create a new game.");
        }, gameType, 'Game');
    },

    continueOldGame: function () {

        var wordsStore = Ext.getStore('Word');
        var mainController = LearningEnglish.app.getController('Main');
        var gameController = this;
        if(wordsStore != null && wordsStore.data.all.length > 0){
            currentGame['rightCount'] = localStorage.getItem('rightCount');
            currentGame['wrongCount'] = localStorage.getItem('wrongCount');
            mainController.redirectTo('game');
            gameController.getWord();
            gameController.getRightAnswerLabel().setHtml("Right Answers: "+currentGame['rightCount']);
            gameController.getWrongAnswerLabel().setHtml("Right Answers: "+currentGame['wrongCount']);
        } else {
            alert("No old game to continue");
        }
    },

    checkAnswer: function() {

        var mainController = LearningEnglish.app.getController('Main');
        var wordsStore = Ext.getStore('Word');
        var gameForm = mainController.getGamePanel();
        var userGameAnswer = gameForm.getValues()['game_answer'];
        console.log('userGameAnswer', userGameAnswer);
        if(currentGame['language'] === 'english'){
            console.log("english word");
            gameForm.setValues({
                game_answer : userGameAnswer + wordsStore.getAt(currentGame['wordPosition']).data['spanish']
            });
        } else {
            console.log("spanish word");
            gameForm.setValues({
                game_answer : userGameAnswer + '\n\n' + wordsStore.getAt(currentGame['wordPosition']).data['english']
            });
        }

    },

    rightAnswer: function() {

        var wordsStore = Ext.getStore('Word');
        var gameController = this;

        if(currentGame['wordPosition'] != null){
            wordsStore.removeAt(currentGame['wordPosition']);
        }
        currentGame['rightCount'] = parseInt(currentGame['rightCount']) + 1;
        gameController.getRightAnswerLabel().setHtml("Right Answers: "+currentGame['rightCount']);
        gameController.getWord();
    },

    wrongAnswer: function() {

        var gameController = this;
        var wordsStore = Ext.getStore('Word');

        currentGame['wrongCount'] = parseInt(currentGame['wrongCount']) + 1;
        gameController.getWrongAnswerLabel().setHtml("Wrong Answers: "+currentGame['wrongCount']);
        var actualWord = wordsStore.getAt(currentGame['wordPosition']);
        if(actualWord['mistakes'] === null){
            actualWord['mistakes'] = 1;
        } else {
            actualWord['mistakes'] = parseInt(actualWord['mistakes']) + 1;
        }
        if(currentGame['errorWordsList'] === null){
            console.log('wrong answer >>>>> currentGame[\'errorWordsList\'] is empty');
            currentGame['errorWordsList'] = new Array();
            // currentGame['errorWordsList'][0] = words_store.getAt(currentGame['wordPosition']);
            currentGame['errorWordsList'].push(wordsStore.getAt(currentGame['wordPosition']));
            console.log('wrong answer >>>>> currentGame[\'errorWordsList\'][0]', currentGame['errorWordsList']);
        } else {
            var errorListSize = currentGame['errorWordsList'].length;
            // currentGame['errorWordsList'][errorListSize-1] = words_store.getAt(currentGame['wordPosition']);
            currentGame['errorWordsList'].push(wordsStore.getAt(currentGame['wordPosition']));
            console.log('currentGame[\'errorWordsList\'][currentGame[\'errorWordsList\'].length]', currentGame['errorWordsList'][errorListSize-1]);
        }
        wordsStore.sync();
        gameController.getWord();
    },

    getLatestWords: function(gameType) {

        console.log('getLatestWords starts');

        console.log('getLatestWords gameType: '+gameType);
        var mainController = LearningEnglish.app.getController('Main');
        var gameController = LearningEnglish.app.getController('Game');

        LearningEnglish['sfdcClient'].apexrest('/learningEnglish/v1.0/getLatestWords?gameType='+gameType,
        function(success){
            console.log('getLatestWords Callback');
            var wordsStore = Ext.create('LearningEnglish.model.Word');
            wordsStore.saveWords(JSON.parse(success), true);
            mainController.redirectTo('game');
            currentGame['wrongCount'] = 0;
            currentGame['rightCount'] = 0;
            gameController.getRightAnswerLabel().setHtml("Right Answers: 0");
            gameController.getWrongAnswerLabel().setHtml("Wrong Answers: 0");
            gameController.getWord();
            console.log('opening game view');
        }, function(error){
            console.log('getLatestWords Callback');
            console.log('error', error);
        });

    },

    getWord: function() {
        var wordsStore = Ext.getStore('Word');
        var storeLenght = wordsStore.data.all.length;
        var storePosition = Math.round(Math.random()*storeLenght);
        var formValues = LearningEnglish.app.getController('Main').getGamePanel();
        currentGame['wordPosition'] = storePosition;

        console.log('storeLenght', storeLenght);
        console.log('storePosition', storePosition);

        if(Math.random() > 0.5){
            formValues['game_question'] = wordsStore.getAt(storePosition).data['english'];
            currentGame['language'] = 'english';
            formValues.setValues({
                game_question : wordsStore.getAt(storePosition).data['english'],
                game_answer : null
            });
            console.log(wordsStore.getAt(storePosition).data['english']);
        } else {
            formValues['game_question'] = wordsStore.getAt(storePosition).data['spanish'];
            currentGame['language'] = 'spanish';
            formValues.setValues({
                game_question : wordsStore.getAt(storePosition).data['spanish'],
                game_answer : null
            });
            console.log(wordsStore.getAt(storePosition).data['spanish']);
        }

    },

    insertNewWord: function(){
        var loginController = LearningEnglish.app.getController('Login');
        loginController._authenticate('redirectNewWord', function(error){
            console.log("error going to insert new word layout", error);
        }, null, 'Main');
        // mainController.redirectTo('newWord');
    },

    postNewWordToSFDC: function(){
        var mainController = LearningEnglish.app.getController('Main');
        var formValues = mainController.getNewWordPanel().getValues();

        if(formValues['newWord_english'].trim() === "" || formValues['newWord_spanish'].trim() === ""){
            alert("All fields are requiered");
        } else {

            var newWord = {
                english: formValues['newWord_english'].trim(),
                spanish: formValues['newWord_spanish'].trim()
            };
            var newWordListJSON = new Array();
            newWordListJSON.push(newWord);

            var JSONobjet = {
                paramList : newWordListJSON
            };

            console.log('JSONobjet', JSONobjet);
            console.log('JSON.stringify(JSONobjet)', JSON.stringify(JSONobjet));

            LearningEnglish['sfdcClient'].apexrest('/learningEnglish/v1.0/insertNewWord', function(success){
                console.log("Everything went well. New word inserted succesfully", success);
                var newWordForm = mainController.getNewWordPanel();
                newWordForm.setValues({
                    newWord_english : "",
                    newWord_spanish : ""
                });
                alert("Word saved succesfully");
            }, function(error){
                console.log("ERROR!!!!!! Inserting new word", error);
                alert("It wasn't possible to save the word. Try again later");
            }, 'POST', JSON.stringify(JSONobjet), null);
        }

        console.log('formValues', formValues);
        console.log('formValues', formValues['newWord_english']);
    },

    _postErrorWordsList: function(){

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
                localStorage.setItem('errorWordsList',JSON.stringify(JSONobjet));
            }, 'POST', JSON.stringify(JSONobjet), null);
        }
    }

});