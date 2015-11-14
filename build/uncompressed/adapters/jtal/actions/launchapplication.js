require.def('jtal/actions/launchapplication',
    [
        'antie/application'
    ],
    function (Application) {
        'use strict';
        return function (parameters) {
            return function () {
                // TODO - write test
                // TODO - write schemaf
                Application.getCurrentApplication().launchAppFromURL(parameters.url,
                                                                        parameters.data,
                                                                        parameters.route,
                                                                        parameters.overwrite);
            };
        };
    }
);