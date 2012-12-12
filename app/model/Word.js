Ext.define('LearningEnglish.model.Word', {
	extend: 'Ext.data.Model',

	config: {
		identifier: 'uuid',
		fields: ['id','recordId', 'english', 'spanish']	// recordId is the salesforceRecordID
	},


	saveWords: function(words_list){

        var words_store = Ext.getStore('Word');

        words_store.removeAll();
        words_store.sync();

        var words = new Array();
        for(var i in words_list){

            var word = {

                recordId: words_list[i]['Id'],
                english: words_list[i]['English__c'],
                spanish: words_list[i]['Spanish__c'],

            }
            words.push(word);
        }

        words_store.add(words);
        words_store.sync();

	}
});