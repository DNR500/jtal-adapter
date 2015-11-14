require.def('jtal/recipes/imagerecipe',
    [
        'antie/widgets/image',
        'cheesecake/utils/recipeutils'
    ],
    function (Image, recipeUtils) {
        'use strict';
        return function (uniqueId, data) {
            if(!data.source){
                throw "image recipe requires that source be set";
            }
            var image = new Image(uniqueId, data.source);
            recipeUtils.addCssClasses(image, data.cssClasses);
            return image;
        };
    }
);