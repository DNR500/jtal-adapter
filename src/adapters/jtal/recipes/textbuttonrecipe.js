require.def('jtal/recipes/textbuttonrecipe',
    [
        'antie/widgets/button',
        'antie/widgets/label',
        'cheesecake/utils/recipeutils'
    ],
    function (Button, Label, recipeUtils) {
        'use strict';
        return function (uniqueId, data) {
            if(!data.text){
                throw "textbutton recipe requires that text be set";
            }
            var button = new Button(uniqueId);
            recipeUtils.addCssClasses(button, data.cssClasses);
            button.appendChildWidget(new Label(undefined, data.text));
            return button;
        };
    }
);