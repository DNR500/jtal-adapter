require.def('jtal/actions/exitapplication',
    [
        'antie/application'
    ],
    function (Application) {
        'use strict';
        return function () {
            return function () {
                Application.getCurrentApplication().exit();
            };
        };
    }
);