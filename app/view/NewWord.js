Ext.define("LearningEnglish.view.NewWord", {
    extend: 'Ext.form.Panel',
    xtype: 'newWord_panel',

        config: {

            title: 'New Word',
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
                            ui: 'back',
                            id: 'backMainFromNewWord_button',
                            align: 'left'
                        },
                        {
                            xtype: 'button',
                            text: 'Save',
                            ui: 'confirm',
                            id: 'saveNewWord_button',
                            align: 'right'
                        }
                    ]
                },
                {
                    xtype: 'panel',
                    html: [
                        '<h2>Insert new word</h2>'
                    ]
                },
                {
                    xtype: 'textareafield',
                    styleHtmlContent: true,
                    name: 'newWord_english',
                    id :  'newWord_english',
                    label: 'English',
                    maxRows: 4
                },
                {
                    xtype: 'textareafield',
                    styleHtmlContent: true,
                    name: 'newWord_spanish',
                    id :  'newWord_spanish',
                    label: 'Spanish',
                    maxRows: 4
                }
            ]
        }
});