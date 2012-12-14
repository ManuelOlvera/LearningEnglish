Ext.define('LearningEnglish.store.Word', {
	extend: 'Ext.data.Store',

	config: {

        model: 'LearningEnglish.model.Word',

        autoLoad: true,

        proxy: {
            type:'localstorage',
            id:'word_localStorage'
        }
	},

  saveWords: function(words_list){

        this.removeAll();
        this.sync();

        var words = new Array();
        for(var i in words_list){

            // recordId, groundName
            var word = {

                recordId: grounds_list[i]['Id'],
                english: grounds_list[i]['English__c'],
                spanish: grounds_list[i]['Spanish__c'],

            }
            words.push(word);
        }
        // one single dml
        this.add(words);
        this.sync();
  }

});