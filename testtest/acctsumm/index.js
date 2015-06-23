'use strict';

app.acctsumm = kendo.observable({
    onShow: function() {}
});
(function(parent) {
    var dataProvider = app.data.testBackend,
        dataSourceOptions = {
            type: 'everlive',
            transport: {
                typeName: 'Account_Summary',
                dataProvider: dataProvider
            },
            schema: {
                model: {
                    fields: {
                        'Amount': {
                            field: 'Amount',
                            defaultValue: ''
                        },
                        'Description': {
                            field: 'Description',
                            defaultValue: ''
                        },
                    }
                }
            },
        },
        dataSource = new kendo.data.DataSource(dataSourceOptions),
        acctsummModel = kendo.observable({
            dataSource: dataSource,
            itemClick: function(e) {
                app.mobileApp.navigate('#acctsumm/details.html?uid=' + e.dataItem.uid);
            },
            detailsShow: function(e) {
                var item = e.view.params.uid,
                    itemModel = dataSource.getByUid(item);
                acctsummModel.set('currentItem', itemModel);
            },
            currentItem: null
        });

    parent.set('acctsummModel', acctsummModel);
})(app.acctsumm);