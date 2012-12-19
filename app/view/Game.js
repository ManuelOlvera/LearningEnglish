Ext.define("LearningEnglish.view.Game", {
    extend: 'Ext.form.Panel',
    xtype: 'game_panel',

        config: {

            title: 'Game',
            styleHtmlContent: true,
            layout: 'vbox',

            items: [
                {
                    xtype: 'titlebar',
                    title: 'Learning English',
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
                    layout: 'hbox',
                    styleHtmlContent: true,
                    defaults: {
                        flex: 1,
                        style: {
                            'height': '50px'
                        }
                    },
                    items: [
                        {
                            xtype: 'button',
                            name: 'game_checkAnswer',
                            ui: 'action',
                            text: 'Check Answer',
                            id: 'game_checkAnswer'
                        },
                        {
                            xtype: 'button',
                            name: 'game_rightAnswer',
                            ui: 'confirm',
                            text: 'Right Answer',
                            id: 'game_rightAnswer'
                        },
                        {
                            xtype: 'button',
                            name: 'game_wrongAnswer',
                            ui: 'decline',
                            text: 'Wrong Answer',
                            id: 'game_wrongAnswer'
                        }
                    ]
                },
                {
                    xtype: 'textareafield',
                    name: 'game_question',
                    id :  'game_question',
                    label: 'Question',
                    maxRows: 4
                },
                {
                    xtype: 'textareafield',
                    name: 'game_answer',
                    id :  'game_answer',
                    label: 'Answer',
                    maxRows: 4
                },
                {
                    xtype: 'panel',
                    layout: 'vbox',
                    items: [
                        {
                            xtype: 'label',
                            name: 'game_rightAnswer_label',
                            id :  'game_rightAnswer_label',
                            html: 'Right Answers: 0'
                        },
                        {
                            xtype: 'label',
                            name: 'game_wrongAnswer_label',
                            id :  'game_wrongAnswer_label',
                            html: 'Wrong Answers: 0'
                        }
                    ]
                }
            ]
        }
});