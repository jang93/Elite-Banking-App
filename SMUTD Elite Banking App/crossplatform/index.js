'use strict';

app.crossplatform = kendo.observable({
    onShow: function() {}
});
(function(parent) {
    var crossplatformModel = kendo.observable({
        fields: {
            group1: '',
        }
    });

    parent.set('crossplatformModel', crossplatformModel);
})(app.crossplatform);