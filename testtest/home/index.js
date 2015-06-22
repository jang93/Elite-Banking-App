'use strict';

app.home = kendo.observable({
    onShow: function() {}
});
(function(parent) {
    var provider = app.data.testBackend,
        mode = 'signin',
        registerRedirect = 'home',
        signinRedirect = 'authenticationView2',
        init = function() {
            var activeView = mode === 'signin' ? '.signin-view' : '.signup-view';

            if (provider.setup && provider.setup.offlineStorage && !app.isOnline()) {
                $('.offline').show().siblings().hide();
            } else {
                $(activeView).show().siblings().hide();
            }
        },
        successHandler = function(data) {
            var redirect = mode === 'signin' ? signinRedirect : registerRedirect;

            if (data && data.result) {
                app.user = data.result;
                app.mobileApp.navigate(redirect + '/view.html');
            } else {
                init();
            }
        },
        homeModel = kendo.observable({
            displayName: '',
            email: '',
            password: '',
            signin: function() {
                var email = homeModel.email.toLowerCase(),
                    password = homeModel.password;

                provider.Users.login(email, password, successHandler, init);
            },
            register: function() {
                var email = homeModel.email.toLowerCase(),
                    password = homeModel.password,
                    displayName = homeModel.displayName,
                    attrs = {
                        Email: email,
                        DisplayName: displayName
                    };

                provider.Users.register(email, password, attrs, successHandler, init);
            },
            toggleView: function() {
                mode = mode === 'signin' ? 'register' : 'signin';
                init();
            }
        });

    parent.set('homeModel', homeModel);
    parent.set('onShow', function() {
        provider.Users.currentUser().then(successHandler, init);
    });
})(app.home);