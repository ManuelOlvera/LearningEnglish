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
                        '<h2>Playing</h2>'
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
                },
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
});