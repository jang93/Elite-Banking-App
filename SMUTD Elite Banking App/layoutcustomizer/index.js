'use strict';

app.layoutcustomizer = kendo.observable({
    onShow: function() {}
});
(function(parent) {
    var layoutcustomizerModel = kendo.observable({
        fields: {
            grouptest: '',
            custom: '',
            default: '',
        },
        submit: function() {}
    });

    parent.set('layoutcustomizerModel', layoutcustomizerModel);
})(app.layoutcustomizer);