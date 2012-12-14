Ext.define("LearningEnglish.view.Game", {
    extend: 'Ext.form.Panel',
    xtype: 'game_panel',

        config: {

            title: 'Game',
            styleHtmlContent: true,


            items: [
                {
                    xtype: 'titlebar',
                    title: 'Game',
                    docked: 'top',

                    items: [
                        {
                            xtype: 'button',
                            text: 'Back',
                            ui: 'back ',
                            id: 'backMain_button',
                            align: 'left'
                        }
                    ]
                },
                {
                    xtype: 'panel',
                    styleHtmlContent: true,
                    html: [
                        '<h2>Playing...</h2>'
                    ]
                },
                {
                    xtype: 'button',
                    name: 'get_next_word',
                    ui: 'action',
                    text: 'Get Words',
                    id: 'main_getLatest_words'
                }
            ]
        }
});