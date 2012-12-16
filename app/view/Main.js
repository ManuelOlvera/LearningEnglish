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
                xtype: 'button',
                name: 'main_continueOldGame',
                ui: 'action',
                text: 'Continue Old Game',
                id: 'main_continueOldGame'
            },
            {
                xtype: 'button',
                name: 'main_random',
                ui: 'action',
                text: 'Get Random Words',
                id: 'main_random'
            },
            {
                xtype: 'button',
                name: 'main_mostFailed',
                ui: 'action',
                text: 'Get Most Failed Words',
                id: 'main_mostFailed'
            },
            {
                xtype: 'button',
                name: 'main_lessPlayed',
                ui: 'action',
                text: 'Get Less Played Words',
                id: 'main_lessPlayed'
            }
        ]
    }
});
