# jTal
A little adapter for the cheesecake framework that allows you to build components declaratively using TAL and JSON.

This library takes full advantage of the [cheesecake](https://github.com/DNR500/cheesecake) and has been built to use TAL. To see this adapter in action take a look at [cheesecake-jtal-example](https://github.com/DNR500/cheesecake-jtal-example)

#### To import into your project
jTal is available via both npm and bower

npm

```
npm install jtal
```

bower

```
bower install jtal
```

### About jTal

The jTal library is a set of recipes and actions that has been assembled to allow the creation of UI elements using JSON and TAL in a declarative approach. In terms of TAL it provides JSON definitions for..

* **Recipes** - which outline specific UI to be created for render.
* **Actions** - actions are triggered in response to UI events.
* **Stats** - which can be defined on each action.

This JSON presents the basis on which you can create more complex visual components ready for being appended to the DOM.

### AMD Import
To import into your RequireJS project make sure that the paths are correctly configured in your require config - you will need to bring the cheesecake library and TAL into your project as well.

```
paths: {
  antie : 'bower_components/tal/static/script',
  cheesecake : 'bower_components/cheesecake/build/uncompressed/cheesecake',
  jtal : 'bower_components/jtal/build/uncompressed/adapters/jtal'
}

```
To use in your modules you just need the following imports.

```
define(
    [
        "cheesecake/cheesecakefactory",
        jtal/jtaladapter
    ],
    function(cheesecake, jTal) {
        'use strict';
			
		window.cheesecake = cheesecake;
		jTal.configureFactory(window.cheesecake);
		
		// your code here
    }
);

```


### Using jTal..
To make your first UI widget you first need to write your jTal JSON and then pass that JSON to the createCheeseCake method.

```
var jTalSample = {
    "cheesecake": {
        "id": "crazyBox",
        "recipeName": "container",
        "cssClasses": [
            "blue-box", "horse-box"
        ],
        "children": [
            {
                "recipeName": "label",
                "text": "Are you sure?",
                "cssClasses": [
                    "title"
                ]
            },
            {
                "id": "innerBox",
                "recipeName": "container",
                "children": [
                    {
                        "recipeName": "label",
                        "text": "Really sure",
                        "cssClasses": [
                            "title"
                        ]
                    }
                ]
            }
        ]
    }
};

var talWidget = cheesecakeFactory.createCheeseCake(jTalSample);

var container = new Container();
container.appendWidget(talWidget);               

```

### Validating your jTal JSON
A JSON schema is included in the bower/npm imported files you should be able to find it at..

```
jtal/build/uncompressed/schemas/jtal/jtal_schema.json
```

Using this schema you should be able to perform validation tests on your jTal JSON objects.

The the tests used to develop the jTal framework itself use a combination of [Jasmine](https://github.com/gruntjs/grunt-contrib-jasmine) and the client side version of [Z-Schema](https://github.com/zaggino/z-schema). Using the schema should give you reassurance that your jTal JSON will work as expected when creating your UI components.

### Available recipes, action and stats
* **Recipes**
  * label
  * container
  * button
  * textbutton
  * image
  * horizontallist
  * verticallist
  * carousel
* **Actions**
  * label
  * container
  * button
* **Stats**
  * stat *- Note that this is a place holder as at this point the open source version of TAL does not provide a stats interface*

### Recipes
##### Creating a label
JSON sample..

```
{
    "id": "lovelyLabel",
    "recipeName": "label",
    "text": "Settings",
    "cssClasses": [ "title","mainContainer"]
}
```
Creates an instance of a Label - see TAL's [Label](http://fmtvp.github.io/tal/jsdoc/symbols/antie.widgets.Label.html)

* **recipeName** - "label" - **required**
* **text** - string - **required**
* **cssClasses** - array of strings - classes to be added to the widget - optional
* **id** - string - optional

##### Creating a container
JSON sample..

```
{
    "id": "crazyBox",
    "recipeName": "container",
    "cssClasses": [
        "blue-box", "horse-box"
    ],
    "children": [ ],
    "actions": [ ]
}
```
Creates an instance of a Container - see TAL's [Container](http://fmtvp.github.io/tal/jsdoc/symbols/antie.widgets.Container.html)

* **recipeName** - "container" - **required**
* **children** - array of jTal recipes - **required**
* **cssClasses** - array of strings - classes to be added to the widget - optional
* **id** - string - optional
* **actions** - array of jTal actions - optional

##### Creating a button
JSON sample..

```
{
    "id": "crazyButton",
    "recipeName": "button",
    "cssClasses": [
        "blue-box", "horse-box"
    ],
    "children": [ ],
    "actions": [ ]
}
```
Creates an instance of a Button - see TAL's [Button](http://fmtvp.github.io/tal/jsdoc/symbols/antie.widgets.Button.html)

* **recipeName** - "button" - **required**
* **children** - array of jTal recipes - optional
* **cssClasses** - array of strings - classes to be added to the widget - optional
* **id** - string - optional
* **actions** - array of jTal actions - optional

##### Creating a textbutton
JSON sample..

```
{
    "id": "bigTextButton",
    "recipeName": "textbutton",
    "text": "Cancel",
    "cssClasses": [
        "wide-button"
    ],
    "actions":[ ]
}
```
Creates an instance of a Button with a Label as its child - see TAL's [Button](http://fmtvp.github.io/tal/jsdoc/symbols/antie.widgets.Button.html) and [Label](http://fmtvp.github.io/tal/jsdoc/symbols/antie.widgets.Label.html).

* **recipeName** - "textbutton" - **required**
* **text** - string - **required**
* **cssClasses** - array of strings - classes to be added to the widget - optional
* **id** - string - optional
* **actions** - array of jTal actions - optional

##### Creating an image
JSON sample..

```
{
    "id": "title",
    "recipeName": "image",
    "source": "../path/to/image.jpg",
    "cssClasses": [
        "title","mainContainer"
    ]
}
```
Creates an instance of a Image - see TAL's [Image](http://fmtvp.github.io/tal/jsdoc/symbols/antie.widgets.Image.html).

* **recipeName** - "image" - **required**
* **source** - string - path to image file - **required**
* **cssClasses** - array of strings - classes to be added to the widget - optional
* **id** - string - optional

##### Creating a horizontallist
JSON sample..

```
{
  "id": "listyGoodness",
  "recipeName": "horizontallist",
  "cssClasses": [
      "h-list"
  ],
  "children": [ ],
  "actions": [ ]
}
```
Creates an instance of a HorizontalList - see TAL's [HorizontalList](http://fmtvp.github.io/tal/jsdoc/symbols/antie.widgets.HorizontalList.html).

* **recipeName** - "horizontallist" - **required**
* **children** - array of jTal recipes - **required**
* **cssClasses** - array of strings - classes to be added to the widget - optional
* **id** - string - optional
* **actions** - array of jTal actions - optional

##### Creating a verticallist
JSON sample..

```
{
    "id": "anotherLovelyList",
    "recipeName": "verticallist",
    "cssClasses": [
        "v-list"
    ],
    "children": [ ],
    "actions" : [ ]
}
```
Creates an instance of a VerticalList - see TAL's [VerticalList](http://fmtvp.github.io/tal/jsdoc/symbols/antie.widgets.VerticalList.html).

* **recipeName** - "verticallist" - **required**
* **children** - array of jTal recipes - **required**
* **cssClasses** - array of strings - classes to be added to the widget - optional
* **id** - string - optional
* **actions** - array of jTal actions - optional

##### Creating a carousel
JSON sample..

```
{
    "id": "slideshow",
    "recipeName": "carousel",
    "orientation": "vertical",
    "cssClasses": [
        "title","mainContainer"
    ],
    "children": [
        {
            "recipeName": "image",
            "source": "../path/to/image.jpg",
        },
        {
            "recipeName": "image",
            "source": "../path/to/anotherimage.jpg",
        }
    ],
    "actions": [ ]
}
```
Creates an instance of a VerticalList - see TAL's [VerticalList](http://fmtvp.github.io/tal/jsdoc/symbols/antie.widgets.VerticalList.html).

* **recipeName** - "carousel" - **required**
* **children** - array of jTal recipes - **required**
* **orientation** - "vertical" or "horizontal" - defaults to "vertical" - optional
* **cssClasses** - array of strings - classes to be added to the widget - optional
* **id** - string - optional
* **actions** - array of jTal actions - optional

### Actions
Any recipe that supports the actions property can use the actions below. An action is executed by an event fire. The event to listen for is specified by the eventType property. The command property identifies the action to use and the contents of the parameters object is made available to the executing command. 

##### Creating an exitApp action
JSON sample..

```
{
    "recipeName": "button",
    "actions": [
        {
            "eventType": "select",
            "command": "exitApp",
            "stat": { }
        }
    ]
}
```
Executes the exit() method on the Application - see TAL's [Application](http://fmtvp.github.io/tal/jsdoc/symbols/antie.Application.html).

* **eventType** - string - type of the event that the action listens for - **required**
* **command** - string - identifier of the action to execute - **required**
* **stat** - object - to be passed to the stats function - read *"A note on stats"* below - optional

##### Creating an launchApp action
JSON sample..

```
{
    "recipeName": "button",
    "actions": [
        {
            "eventType": "select",
            "command": "launchApp",
            "parameters": {
                "url":"http://www.google.com/",
                "data": {
                    "querystringparam1":"value_1",
                    "querystringparam2":"value_2"
                },
                "route":["some", "route"],
                "overwrite": true
            }
        }
    ]
}
```
Executes the launchAppFromURL() method on the Application - see TAL's [Application](http://fmtvp.github.io/tal/jsdoc/symbols/antie.Application.html).

* **eventType** - string - type of the event that the action listens for - **required**
* **command** - string - identifier of the action to execute - **required**
* **parameters** - object - collection of params needed for the action - **required**
  * **url** - string - url of the app to launch - **required**
  * **data** - object - parameters to pass in the query string - optional
  * **route** - array of strings - route for new application - optional
  * **overwrite** - boolean - set true to overwrite the query parameters of the current application - optional
* **stat** - object - to be passed to the stats function - read *"A note on stats"* below - optional
  
##### Creating a pushComponent action
JSON sample..

```
{
   "recipeName": "button",
   "actions": [
       {
           "eventType": "select",
           "command": "pushComponent",
           "parameters": {
               "id":"http://www.google.com/",
               "modules":"module/to/load",
               "args": {
                   "param1":"value_1",
                   "param2":"value_2"
               }
           }
       }
   ]
}
```
Executes the launchAppFromURL() method on the Application - see TAL's [Application](http://fmtvp.github.io/tal/jsdoc/symbols/antie.Application.html).

* **eventType** - string - type of the event that the action listens for - **required**
* **command** - string - identifier of the action to execute - **required**
* **parameters** - object - collection of params needed for the action - **required**
  * **id** - string - id to be given to the loaded component - **required**
  * **modules** - string - requirejs module name of the component to show - **required**
  * **args** - object -optional object to pass arguments to the component - optional
application - optional
* **stat** - object - to be passed to the stats function - read *"A note on stats"* below - optional

#### A note on stats
The open source version of TAL doesn't provide a stats reporting mechanism even though actions by default are allowed. jTal currently provides a placeholder empty closure for stats - if you wish to report on stats you may wish to replace this closure. This closure essentially has access to the whole stat object that resides on the action.

If you want to formalise your apps approach to stats you should also consider extending the jTal schema to allow for accurate checking.

*Sample of what your resulting stat object might look like..*

```
"stat": {
    "countername":"settings.page.countMe"
}
```


### Using your JSON like a template
Obviously with jTal JSON you can access individual properties and change them as you need before passing them on to Cheesecake for rendering. However you also have the option of treating jTal JSON like template file. You could convert your JSON to string form and use a replace method like in the following example.

```
var jTalSample = {
    "recipeName": "label",
    "text": "Hello %name%",
};

var jTalString = JSON.stringify(jTalSample);
jTalString = jTalString.replace("%name%", "Betty");

jTalSample = JSON.parse(jTalString);

```
To do this using TAL you should look at the encodJson() and decodeJson() methods on the device object. See [Device](http://fmtvp.github.io/tal/jsdoc/symbols/src/antie_static_script_devices_device.js.html).

### For development of jTal - commands of note
* **grunt test** - runs tests and lint checks.
* **grunt build** - creates a new folder in your project and build the version for distribution.
* **grunt release** - bumps the version number, creates a number release tag, commits the new tag to git and updates master with a new - the release should then be available via bower.

