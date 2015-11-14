require.def('jtal/stats/stat',
    [],
    function () {
        'use strict';
        return function (stat) {
            console.log("----------- stats log -----------");
            console.log(stat);
            console.log("----------- ensure that this log is replaced for production code -----------");
        };
    }
);