require(
    [
        "cheesecake/cheesecakefactory",
        "jtal/jtaladapter",
        "antie/widgets/container",
        "antie/widgets/label"
    ],
    function(cheesecakeFactory, jTalAdapter, Container, Label) {
        'use strict';

        function reportSchemaErrors(validator){
            var errors = validator.getLastErrors();
            errors.forEach(function(listItem){
                console.error("Schema error:", listItem.code, listItem.message, listItem.path);
            })
        }

        describe("container recipe", function() {
            var validatorOptions = {
                noEmptyArrays: true,
                noEmptyStrings: true
            };
            var validator = new ZSchema(validatorOptions);
            jTalAdapter.configureFactory(cheesecakeFactory);


            it("should create a container with expected id, css classes and children correctly populated", function() {
                var jTalSample = {
                    "cheesecake": {
                        "id": "crazyHorseBox",
                        "recipeName": "container",
                        "cssClasses": [
                            "blueBox", "horseBox"
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

                var schemaTestResult = validator.validate(jTalSample, jTalSchema);
                if(!schemaTestResult){
                    reportSchemaErrors(validator);
                }
                expect(schemaTestResult).toBeTruthy();

                var talWidget = cheesecakeFactory.createCheeseCake(jTalSample);

                expect(talWidget instanceof Container).toBeTruthy();
                expect(talWidget.hasClass("blueBox")).toBeTruthy();
                expect(talWidget.hasClass("horseBox")).toBeTruthy();
                expect(talWidget.id).toEqual("crazyHorseBox");
                expect(talWidget.getChildWidgets()[0] instanceof Label).toBeTruthy();

                var innerBox = talWidget.getChildWidgets()[1];
                expect(innerBox instanceof Container).toBeTruthy();
                expect(innerBox.getChildWidgets()[0] instanceof Label).toBeTruthy();
            });

            it("should create a container with only recipeName and children", function() {
                var jTalSample = {
                    "cheesecake": {
                        "recipeName": "container",
                        "children": [
                            {
                                "recipeName": "label",
                                "text": "Are you sure?",
                                "cssClasses": [
                                    "title"
                                ]
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

                expect(talWidget instanceof Container).toBeTruthy();
                expect(talWidget.getChildWidgets()[0] instanceof Label).toBeTruthy();
            });

            it("should error if the children are missing", function(done) {
                var jTalSample = {
                    "cheesecake": {
                        "recipeName": "container"
                    }
                };

                var schemaTestResult = validator.validate(jTalSample, jTalSchema);

                expect(schemaTestResult).toBeFalsy();

                try{
                    cheesecakeFactory.createCheeseCake(jTalSample);
                } catch (err) {
                    expect(err).toBeTruthy();
                    done();
                }
            });

            it("should fail schema validation when additional properties are added", function() {
                var jTalSample = {
                    "cheesecake": {
                        "recipeName": "container",
                        "children": [
                            {
                                "recipeName": "label",
                                "text": "Are you sure?",
                                "cssClasses": [
                                    "title"
                                ]
                            }
                        ],
                        "glug":"bloop"
                    }
                };

                var schemaTestResult = validator.validate(jTalSample, jTalSchema);

                expect(schemaTestResult).toBeFalsy();
            });
        });
    }
);