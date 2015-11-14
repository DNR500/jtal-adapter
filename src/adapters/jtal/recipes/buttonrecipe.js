require.def('jtal/recipes/buttonrecipe',
    [
        'antie/widgets/button',
        'cheesecake/utils/recipeutils'
    ],
    function (Button, recipeUtils) {
        'use strict';
        return function (uniqueId, data) {
            var button = new Button(uniqueId);
            recipeUtils.addCssClasses(button, data.cssClasses);
            return button;
        };
    }
);