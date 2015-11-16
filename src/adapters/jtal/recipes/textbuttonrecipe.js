require.def('jtal/recipes/textbuttonrecipe',
    [
        'antie/widgets/button',
        'antie/widgets/label',
        'cheesecake/utils/recipeutils'
    ],
    function (Button, Label, recipeUtils) {
        'use strict';
        return function ( data) {
            if(!data.text){
                throw "textbutton recipe requires that text be set";
            }
            var button = new Button(data.id);
            recipeUtils.addCssClasses(button, data.cssClasses);
            button.appendChildWidget(new Label(undefined, data.text));
            return button;
        };
    }
);