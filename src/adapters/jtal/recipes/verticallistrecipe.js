require.def('jtal/recipes/verticallistrecipe',
    [
        'antie/widgets/verticallist',
        'cheesecake/utils/recipeutils'
    ],
    function (VerticalList, recipeUtils) {
        'use strict';
        return function (uniqueId, data) {
            if(!data.children){
                throw "verticallist recipe requires that children be set";
            }
            var verticalList = new VerticalList(uniqueId);
            recipeUtils.addCssClasses(verticalList, data.cssClasses);
            return verticalList;
        };
    }
);