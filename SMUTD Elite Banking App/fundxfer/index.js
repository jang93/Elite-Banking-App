'use strict';

app.fundxfer = kendo.observable({
    onShow: function() {}
});
(function(parent) {
    var fundxferModel = kendo.observable({
        fields: {
            amount: '',
            dropdownlist: '',
        },
        submit: function() {},
        cancel: function() {}
    });

    parent.set('fundxferModel', fundxferModel);
})(app.fundxfer);