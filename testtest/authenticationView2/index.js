'use strict';

app.authenticationView2 = kendo.observable({
    onShow: function() {}
});
(function(parent) {
    var provider = app.data.testBackend,

        signinRedirect = 'homeView',
        init = function() {
            var activeView = '.signin-view';

            if (provider.setup && provider.setup.offlineStorage && !app.isOnline()) {
                $('.offline').show().siblings().hide();
            } else {
                $(activeView).show().siblings().hide();
            }
        },
        successHandler = function(data) {
            var redirect = signinRedirect;

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
            }
        });

    parent.set('authenticationView2Model', authenticationView2Model);
    parent.set('onShow', function() {
        provider.Users.currentUser().then(successHandler, init);
    });
})(app.authenticationView2);