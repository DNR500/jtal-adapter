require.def('jtal/recipes/horizontallistrecipe',
    [
        'antie/widgets/horizontallist',
        'cheesecake/utils/recipeutils'
    ],
    function (HorizontalList, recipeUtils) {
        'use strict';
        return function (data) {
            if(!data.children){
                throw "horizontallist recipe requires that children be set";
            }
            var horizontalList = new HorizontalList(data.id);
            recipeUtils.addCssClasses(horizontalList, data.cssClasses);
            return horizontalList;
        };
    }
);