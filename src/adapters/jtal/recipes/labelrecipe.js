require.def('jtal/recipes/labelrecipe',
    [
        'antie/widgets/label',
        'cheesecake/utils/recipeutils'
    ],
    function (Label, recipeUtils) {
        'use strict';
        return function (uniqueId, data) {
            if(!data.text){
                throw "label recipe requires that text be set";
            }
            var label = new Label(uniqueId, data.text);
            recipeUtils.addCssClasses(label, data.cssClasses);
            return label;
        };
    }
);