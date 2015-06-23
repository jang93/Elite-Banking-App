'use strict';

app.dataListView = kendo.observable({
    onShow: function() {}
});
(function(parent) {
    var dataProvider = app.data.testBackend,
        dataSourceOptions = {
            type: 'everlive',
            transport: {
                typeName: 'Portfolio',
                dataProvider: dataProvider
            },
            schema: {
                model: {
                    fields: {
                        'Stock_Name': {
                            field: 'Stock_Name',
                            defaultValue: ''
                        },
                        'Qty': {
                            field: 'Qty',
                            defaultValue: ''
                        },
                    }
                }
            },
        },
        dataSource = new kendo.data.DataSource(dataSourceOptions),
        dataListViewModel = kendo.observable({
            dataSource: dataSource,
            itemClick: function(e) {
                app.mobileApp.navigate('#dataListView/details.html?uid=' + e.dataItem.uid);
            },
            detailsShow: function(e) {
                var item = e.view.params.uid,
                    itemModel = dataSource.getByUid(item);
                dataListViewModel.set('currentItem', itemModel);
            },
            currentItem: null
        });

    parent.set('dataListViewModel', dataListViewModel);
})(app.dataListView);