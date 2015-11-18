require.def('jtal/actions/launchapplication',
    [
        'antie/application'
    ],
    function (Application) {
        'use strict';
        return function (parameters) {
            if(!parameters.url){
                throw "url should be set in the parameter for the launchapplication action";
            }
            return function () {
                Application.getCurrentApplication().launchAppFromURL(parameters.url,
                                                                        parameters.data,
                                                                        parameters.route,
                                                                        parameters.overwrite);
            };
        };
    }
);