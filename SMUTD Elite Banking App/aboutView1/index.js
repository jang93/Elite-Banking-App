'use strict';

app.aboutView1 = kendo.observable({
    onShow: function() {}
});
(function(parent) {
    var aboutView1Model = kendo.observable({
        openLink: function(url) {
            window.open(url, '_system');
            if (window.event) {
                window.event.preventDefault && window.event.preventDefault();
                window.event.returnValue = false;
            }
        }
    });

    parent.set('aboutView1Model', aboutView1Model);
})(app.aboutView1);