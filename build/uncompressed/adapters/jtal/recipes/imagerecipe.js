require.def('jtal/recipes/imagerecipe',
    [
        'antie/widgets/image',
        'cheesecake/utils/recipeutils'
    ],
    function (Image, recipeUtils) {
        'use strict';
        return function (data) {
            if(!data.source){
                throw "image recipe requires that source be set";
            }
            var image = new Image(data.id, data.source);
            recipeUtils.addCssClasses(image, data.cssClasses);
            return image;
        };
    }
);