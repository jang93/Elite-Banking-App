'use strict';

app.acctSummary = kendo.observable({
    onShow: function() {}
});
(function(parent) {
    var acctSummaryModel = kendo.observable({
        fields: {}
    });

    parent.set('acctSummaryModel', acctSummaryModel);
})(app.acctSummary);