'use strict';

app.preferredview = kendo.observable({
    onShow: function() {}
});
(function(parent) {
    var preferredviewModel = kendo.observable({
        fields: {
            switch4: '',
            switch3: '',
            switch2: '',
            switch1: '',
            switch: '',
            checkbox4: '',
            checkbox3: '',
            checkbox2: '',
            checkbox1: '',
            checkbox: '',
        },
        submit: function() {},
        cancel: function() {}
    });

    parent.set('preferredviewModel', preferredviewModel);
})(app.preferredview);