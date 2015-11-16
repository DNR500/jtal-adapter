require.def('jtal/recipes/carouselrecipe',
    [
        'antie/widgets/carousel',
        'cheesecake/utils/recipeutils'
    ],
    function (Carousel, recipeUtils) {
        'use strict';
        return function (data) {
            if(!data.children){
                throw "carousel recipe requires that children be set";
            }
            var orientation = (data.orientation === "horizontal") ? Carousel.orientations.HORIZONTAL : Carousel.orientations.VERTICAL;
            var carousel = new Carousel(data.id, orientation);
            recipeUtils.addCssClasses(carousel, data.cssClasses);
            return carousel;
        };
    }
);