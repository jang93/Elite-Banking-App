'use strict';

app.formView = kendo.observable({
    onShow: function() {}
});
(function(parent) {
    var formViewModel = kendo.observable({
        fields: {
            group: '',
        },
        submit: function() {}
    });

    parent.set('formViewModel', formViewModel);
})(app.formView);