Ext.define('LearningEnglish.view.Login', {
	extend: 'Ext.form.Panel',
	xtype: 'login_panel',

	config: {

		title: 'Login',
		styleHtmlContent: true,


		items: [
			{
				xtype: 'titlebar',
				title: 'Learning English',
				docked: 'top',
			},
	        {
	            xtype: 'button',
	            name: 'sing_in',
	            ui: 'action',
	            text: 'Sign in',
	            id: 'login_sing_in',
                style: {
                    'height' : '100px'
                }
	        },
		]
	}
});