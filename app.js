var LearningEnglish = {
    loginURL : 'https://login.salesforce.com/',
    consumerKey : '3MVG9rFJvQRVOvk7iv8t.9fmXUJpANbmAW2uvnRBffz0Xn41bfe5HGnYRoSaiiJl0CjWBWKkV6.W4iyQzGg69',
    callbackURL : 'https://login.salesforce.com/services/oauth2/success',
    proxy : 'http://localhost/LearningEnglish/proxy/proxy.php?mode=native',
    sfdcClient : null

}
Ext.application({
    name: 'LearningEnglish',

    requires: [
        'Ext.MessageBox',
<<<<<<< HEAD
        'Ext.TitleBar'
=======
        'Ext.TitleBar',
        'Ext.field.DatePicker'
>>>>>>> cc49125b036e8e1af848216253114350b582953c
    ],

    views: ['Main', 'Login'],
    controllers: ['Main'],
<<<<<<< HEAD
=======
    stores: ['Word'],
    models: ['Word'],
>>>>>>> cc49125b036e8e1af848216253114350b582953c

    icon: {
        '57': 'resources/icons/Icon.png',
        '72': 'resources/icons/Icon~ipad.png',
        '114': 'resources/icons/Icon@2x.png',
        '144': 'resources/icons/Icon~ipad@2x.png'
    },

    isIconPrecomposed: true,

    startupImage: {
        '320x460': 'resources/startup/320x460.jpg',
        '640x920': 'resources/startup/640x920.png',
        '768x1004': 'resources/startup/768x1004.png',
        '748x1024': 'resources/startup/748x1024.png',
        '1536x2008': 'resources/startup/1536x2008.png',
        '1496x2048': 'resources/startup/1496x2048.png'
    },

    launch: function() {

<<<<<<< HEAD
        alert("launch function");
=======
        // alert("launch function");
>>>>>>> cc49125b036e8e1af848216253114350b582953c
        // Destroy the #appLoadingIndicator element
        Ext.fly('appLoadingIndicator').destroy();

        var refreshToken = localStorage.getItem('ftkui_refresh_token');


<<<<<<< HEAD
        alert("refreshToken passed");

        if(refreshToken){

        alert("Main to show");
            // Initialize the main view
            Ext.Viewport.add(Ext.create('LearningEnglish.view.Main'));
        } else {
        alert("Login to show");
=======
        // alert("refreshToken passed");

        if(refreshToken){

        // alert("Main to show");
            // Initialize the main view
            Ext.Viewport.add(Ext.create('LearningEnglish.view.Main'));
        } else {
        // alert("Login to show");
>>>>>>> cc49125b036e8e1af848216253114350b582953c
            // Initialize the main view
            Ext.Viewport.add(Ext.create('LearningEnglish.view.Login'));
        }
    },

    onUpdated: function() {
        Ext.Msg.confirm(
            "Application Update",
            "This application has just successfully been updated to the latest version. Reload now?",
            function(buttonId) {
                if (buttonId === 'yes') {
                    window.location.reload();
                }
            }
        );
    }
});
