'use strict';

app.authentication2 = kendo.observable({
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
        authentication2Model = kendo.observable({
            displayName: '',
            email: '',
            password: '',
            signin: function() {
                var email = authentication2Model.email.toLowerCase(),
                    password = authentication2Model.password;

                provider.Users.login(email, password, successHandler, init);
            }
        });

    parent.set('authentication2Model', authentication2Model);
    parent.set('onShow', function() {
        provider.Users.currentUser().then(successHandler, init);
    });
})(app.authentication2);