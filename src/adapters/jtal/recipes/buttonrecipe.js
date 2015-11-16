require.def('jtal/recipes/buttonrecipe',
    [
        'antie/widgets/button',
        'cheesecake/utils/recipeutils'
    ],
    function (Button, recipeUtils) {
        'use strict';
        return function (data) {
            var button = new Button(data.id);
            recipeUtils.addCssClasses(button, data.cssClasses);
            return button;
        };
    }
);