Ext.define('LearningEnglish.store.Word', {
	extend: 'Ext.data.Store',

	config: {

        model: 'LearningEnglish.model.Word',

        autoLoad: true,

        proxy: {
            type:'localstorage',
            id:'word_localStorage'
        }
	}

});