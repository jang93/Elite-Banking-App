'use strict';

(function() {
    app.data.testBackend = new Everlive({
        offlineStorage: true,
        apiKey: 'Vd4xCWKnwmfgFnWf',
        url: '//platform.telerik.com/bs-api/v1/',
        scheme: 'https'
    });

    document.addEventListener("online", function() {
        app.data.testBackend.offline(false);
        app.data.testBackend.sync();
    });

    document.addEventListener("offline", function() {
        app.data.testBackend.offline(true);
    });

}());