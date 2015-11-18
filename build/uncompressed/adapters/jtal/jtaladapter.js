require.def('jtal/jtaladapter',
    [
        'jtal/recipes/labelrecipe',
        'jtal/recipes/horizontallistrecipe',
        'jtal/recipes/verticallistrecipe',
        'jtal/recipes/textbuttonrecipe',
        'jtal/recipes/containerrecipe',
        'jtal/recipes/imagerecipe',
        'jtal/recipes/buttonrecipe',
        'jtal/recipes/carouselrecipe',

        'jtal/actions/exitapplication',
        'jtal/actions/launchapplication',
        'jtal/actions/pushcomponent',

        'jtal/stats/stat'
    ],
    function (LabelRecipe, HorizontalListRecipe, VerticalListRecipe, TextButtonRecipe, ContainerRecipe,
              ImageRecipe, ButtonRecipe, CarouselRecipe, ExitApplication, LaunchApplication, PushComponent, Stat) {
        'use strict';

        var addApplicationActions = function (cheesecakeFactory) {
            cheesecakeFactory.addAction('exitApp', ExitApplication);
            cheesecakeFactory.addAction('launchApp', LaunchApplication);
            cheesecakeFactory.addAction('pushComponent', PushComponent);
        };

        var addApplicationRecipes = function (cheesecakeFactory) {
            cheesecakeFactory.addRecipe("label", LabelRecipe);
            cheesecakeFactory.addRecipe("horizontallist", HorizontalListRecipe);
            cheesecakeFactory.addRecipe("verticallist", VerticalListRecipe);
            cheesecakeFactory.addRecipe("container", ContainerRecipe);
            cheesecakeFactory.addRecipe("image", ImageRecipe);
            cheesecakeFactory.addRecipe("carousel", CarouselRecipe);
            cheesecakeFactory.addRecipe("button", ButtonRecipe); // consider rename to button
            cheesecakeFactory.addRecipe("textbutton", TextButtonRecipe); // consider rename to textbutton
        };

        var addApplicationStatsCall = function (cheesecakeFactory) {
            cheesecakeFactory.addStatsCallFunction(Stat);
        };

        return {
            configureFactory: function (cheesecakeFactory) {
                addApplicationActions(cheesecakeFactory);
                addApplicationRecipes(cheesecakeFactory);
                addApplicationStatsCall(cheesecakeFactory);
            }
        };
    }
);
