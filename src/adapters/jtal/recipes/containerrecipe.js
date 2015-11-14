require.def('jtal/recipes/containerrecipe',
    [
        'antie/widgets/container',
        'cheesecake/utils/recipeutils'
    ],
    function (Container, recipeUtils) {
        'use strict';
        return function (uniqueId, data) {
            if(!data.children){
                throw "container recipe requires that children be set";
            }
            var container = new Container(uniqueId);
            recipeUtils.addCssClasses(container, data.cssClasses);
            return container;
        };
    }
);