'use strict';

app.homeView = kendo.observable({
    onShow: function() {}
});
(function(parent) {
    var dataProvider = app.data.testBackend,
        processImage = function(img) {
            if (!img) {
                var empty1x1png = 'iVBORw0KGgoAAAANSUhEUgAAAAEAAAABCAQAAAC1HAwCAAAAC0lEQVQI12NgYAAAAAMAASDVlMcAAAAASUVORK5CYII=';
                img = 'data:image/png;base64,' + empty1x1png;
            } else if (img.slice(0, 4) !== 'http' &&
                img.slice(0, 2) !== '//' &&
                img.slice(0, 5) !== 'data:') {
                var setup = dataProvider.setup;
                img = setup.scheme + ':' + setup.url + setup.apiKey + '/Files/' + img + '/Download';
            }

            return img;
        },

        dataSourceOptions = {
            type: 'everlive',
            transport: {
                typeName: 'News',
                dataProvider: dataProvider
            },
            group: {
                field: 'Grouping'
            },
            change: function(e) {
                var data = this.data();
                for (var i = 0; i < data.length; i++) {
                    data[i]['ImageUrl'] = processImage(data[i]['Image']);
                }
            },
            schema: {
                model: {
                    fields: {
                        'Headline': {
                            field: 'Headline',
                            defaultValue: ''
                        },
                        'Time': {
                            field: 'Time',
                            defaultValue: ''
                        },
                        'Image': {
                            field: 'Image',
                            defaultValue: ''
                        },
                    }
                }
            },
        },
        dataSource = new kendo.data.DataSource(dataSourceOptions),
        homeViewModel = kendo.observable({
            dataSource: dataSource,
            itemClick: function(e) {
                app.mobileApp.navigate('#homeView/details.html?uid=' + e.dataItem.uid);
            },
            detailsShow: function(e) {
                var item = e.view.params.uid,
                    itemModel = dataSource.getByUid(item);
                itemModel.SubimageUrl = processImage(itemModel.Subimage);
                homeViewModel.set('currentItem', itemModel);
            },
            currentItem: null
        });

    parent.set('homeViewModel', homeViewModel);
})(app.homeView);