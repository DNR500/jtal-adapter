require.def('jtal/recipes/containerrecipe',
    [
        'antie/widgets/container',
        'cheesecake/utils/recipeutils'
    ],
    function (Container, recipeUtils) {
        'use strict';
        return function (data) {
            if(!data.children){
                throw "container recipe requires that children be set";
            }
            var container = new Container(data.id);
            recipeUtils.addCssClasses(container, data.cssClasses);
            return container;
        };
    }
);