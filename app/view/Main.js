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
                html: [
                    '<h2>Choose a game</h2>'
                ]
            },
            {
                xtype: 'panel',
                layout: 'hbox',
                defaults: {
                    flex: 1,
                    style: {
                        'height' : '100px',
                        'margin' : '10px'
                    }
                },
                items: [
                    {
                        xtype: 'button',
                        name: 'main_continueOldGame',
                        ui: 'action',
                        text: 'Old Game',
                        id: 'main_continueOldGame'
                    },
                    {
                        xtype: 'button',
                        name: 'main_random',
                        ui: 'action',
                        text: 'Random Words',
                        id: 'main_random'
                    }
                ]
            },
            {
                xtype: 'panel',
                layout: 'hbox',
                defaults: {
                    flex: 1,
                    style: {
                        'height' : '100px',
                        'margin' : '10px'
                    }
                },
                items: [
                    {
                        xtype: 'button',
                        name: 'main_mostFailed',
                        ui: 'action',
                        text: 'Most Failed',
                        id: 'main_mostFailed'
                    },
                    {
                        xtype: 'button',
                        name: 'main_lessPlayed',
                        ui: 'action',
                        text: 'Less Played',
                        id: 'main_lessPlayed'
                    }
                ]
            },
            {
                xtype: 'panel',
                styleHtmlContent: true,
                html: [
                    '<h2>Insert a new word</h2>'
                ]
            },
            {
                xtype: 'panel',
                styleHtmlContent: true,
                layout: 'vbox',
                defaults: {
                    // flex: 1,
                    style: {
                        'height' : '100px',
                        'margin' : '10px'
                    }
                },
                items: [
                    {
                        xtype: 'button',
                        name: 'main_insertWord',
                        ui: 'action',
                        text: 'New word',
                        id: 'main_insertWord'
                    }
                ]
            }
        ]
    }
});
