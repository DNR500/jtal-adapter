require(
    [
        "cheesecake/cheesecakefactory",
        "jtal/jtaladapter",
        "antie/widgets/button",
        "antie/widgets/label"
    ],
    function(cheesecakeFactory, jTalAdapter, Button, Label) {
        'use strict';

        function reportSchemaErrors(validator){
            var errors = validator.getLastErrors();
            errors.forEach(function(listItem){
                console.error("Schema error:", listItem.code, listItem.message, listItem.path);
            })
        }

        describe("button recipe", function() {
            var validatorOptions = {
                noEmptyArrays: true,
                noEmptyStrings: true
            };
            var validator = new ZSchema(validatorOptions);
            jTalAdapter.configureFactory(cheesecakeFactory);


            it("should create a button with expected id, children and css classes correctly populated", function() {
                var jTalSample = {
                    "cheesecake": {
                        "id": "crazyHorseButton",
                        "recipeName": "button",
                        "cssClasses": [
                            "blueBox", "horseBox"
                        ],
                        "children": [
                            {
                                "recipeName": "label",
                                "text": "Are you sure?"
                            }
                        ]
                    }
                };

                var schemaTestResult = validator.validate(jTalSample, jTalSchema);
                if(!schemaTestResult){
                    reportSchemaErrors(validator);
                }
                expect(schemaTestResult).toBeTruthy();

                var talWidget = cheesecakeFactory.createCheeseCake(jTalSample);

                expect(talWidget instanceof Button).toBeTruthy();
                expect(talWidget.hasClass("blueBox")).toBeTruthy();
                expect(talWidget.hasClass("horseBox")).toBeTruthy();
                expect(talWidget.id).toEqual("crazyHorseButton");
                expect(talWidget.getChildWidgets()[0] instanceof Label).toBeTruthy();
            });

            it("should create a button with only recipeName and children classes correctly populated", function() {
                var jTalSample = {
                    "cheesecake": {
                        "recipeName": "button"
                    }
                };

                var schemaTestResult = validator.validate(jTalSample, jTalSchema);
                if(!schemaTestResult){
                    reportSchemaErrors(validator);
                }
                expect(schemaTestResult).toBeTruthy();

                var talWidget = cheesecakeFactory.createCheeseCake(jTalSample);

                expect(talWidget instanceof Button).toBeTruthy();
            });

            it("should fail schema validation when additional properties are added", function() {
                var jTalSample = {
                    "cheesecake": {
                        "recipeName": "button",
                        "glug": "bloop"
                    }
                };

                var schemaTestResult = validator.validate(jTalSample, jTalSchema);

                expect(schemaTestResult).toBeFalsy();
            });
        });
    }
);