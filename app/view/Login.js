Ext.define('LearningEnglish.view.Login', {
	extend: 'Ext.form.Panel',
	xtype: 'login_panel',

	config: {

		title: 'Login',
		styleHtmlContent: true,


		items: [
			{
				xtype: 'titlebar',
				title: 'Login2',
				docked: 'top',
			},
			{
	            xtype: 'panel',
				styleHtmlContent: true,
				html: [
					'<h2>LOGIN TO SALESFORCE</h2>'
				]
			},
	        {
	            xtype: 'button',
	            name: 'sing_in', 
	            ui: 'action', 
	            text: 'Sign in',
	            id: 'login_sing_in'
	        },
		]
	}
});