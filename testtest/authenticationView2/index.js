'use strict';

app.authenticationView2 = kendo.observable({
    onShow: function() {}
});
(function(parent) {
    var provider = app.data.testBackend,
        mode = 'signin',
        registerRedirect = 'home',
        signinRedirect = 'homeView',
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
        authenticationView2Model = kendo.observable({
            displayName: '',
            email: '',
            password: '',
            signin: function() {
                var email = authenticationView2Model.email.toLowerCase(),
                    password = authenticationView2Model.password;

                provider.Users.login(email, password, successHandler, init);
            },
            register: function() {
                var email = authenticationView2Model.email.toLowerCase(),
                    password = authenticationView2Model.password,
                    displayName = authenticationView2Model.displayName,
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

    parent.set('authenticationView2Model', authenticationView2Model);
    parent.set('onShow', function() {
        provider.Users.currentUser().then(successHandler, init);
    });
})(app.authenticationView2);