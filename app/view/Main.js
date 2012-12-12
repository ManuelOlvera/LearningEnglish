Ext.define("LearningEnglish.view.Main", {
    extend: 'Ext.form.Panel',
    xtype: 'main_panel',

        config: {

        title: 'Main',
        styleHtmlContent: true,


        items: [
            {
                xtype: 'titlebar',
                title: 'Main',
                docked: 'top',
            },
            {
                xtype: 'panel',
                styleHtmlContent: true,
                html: [
                    '<h2>Logged in Salesforce</h2>'
                ]
            },
            {
                xtype: 'datepickerfield',
                id: 'main_date',
                name : 'main_date',
                dateFormat:'n/j/Y',
                picker: {
                    slotOrder: ['day', 'month', 'year']
                }
            },
            {
                xtype: 'button',
                name: 'get_account_name',
                ui: 'action',
                text: 'Get Words',
                id: 'main_get_words'
            }
        ]
    }
});
