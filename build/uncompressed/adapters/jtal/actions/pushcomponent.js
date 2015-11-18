require.def('jtal/actions/pushcomponent',
    [
        'antie/application'
    ],
    function (Application) {
        'use strict';
        return function (parameters) {
            if(!parameters.modules){
                throw "modules should be set in the parameter for the pushcomponents action";
            }
            if(!parameters.id){
                throw "id should be set in the parameter for the pushcomponents action";
            }
            return function () {
                Application.getCurrentApplication().pushComponent(parameters.id, parameters.modules, parameters.args);
            };
        };
    }
);