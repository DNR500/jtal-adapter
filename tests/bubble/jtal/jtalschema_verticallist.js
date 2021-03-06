require(
    [
        "cheesecake/cheesecakefactory",
        "jtal/jtaladapter",
        "antie/widgets/verticallist",
        "antie/widgets/label"
    ],
    function(cheesecakeFactory, jTalAdapter, VerticalList, Label) {
        'use strict';

        function reportSchemaErrors(validator){
            var errors = validator.getLastErrors();
            errors.forEach(function(listItem){
                console.error("Schema error:", listItem.code, listItem.message, listItem.path);
            })
        }

        describe("vertical list recipe", function() {
            var validatorOptions = {
                noEmptyArrays: true,
                noEmptyStrings: true
            };
            var validator = new ZSchema(validatorOptions);
            jTalAdapter.configureFactory(cheesecakeFactory);


            it("should create a horizontal list with expected id, children and css classes correctly populated", function() {
                var jTalSample = {
                    "cheesecake": {
                        "id": "settingsPanel",
                        "recipeName": "verticallist",
                        "cssClasses": [
                            "hList"
                        ],
                        "children": [
                            {
                                "recipeName": "label",
                                "text": "Which service would you like to launch when you press the Red Button?"
                            },
                            {
                                "recipeName": "label",
                                "text": "Which service would you like to launch when you press the Red Button?"
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

                expect(talWidget instanceof VerticalList).toBeTruthy();
                expect(talWidget.hasClass("hList")).toBeTruthy();
                expect(talWidget.id).toEqual("settingsPanel");

                expect(talWidget.getChildWidgets()[0] instanceof Label).toBeTruthy();
                expect(talWidget.getChildWidgets()[1] instanceof Label).toBeTruthy();
            });

            it("should create a horizontal list with using only the recipeName and children", function() {
                var jTalSample = {
                    "cheesecake": {
                        "recipeName": "verticallist",
                        "children": [
                            {
                                "recipeName": "label",
                                "text": "Which service would you like to launch when you press the Red Button?"
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

                expect(talWidget instanceof VerticalList).toBeTruthy();
                expect(talWidget.getChildWidgets()[0] instanceof Label).toBeTruthy();
            });

            it("should create a horizontal list with using only the recipeName and children", function(done) {
                var jTalSample = {
                    "cheesecake": {
                        "recipeName": "verticallist"
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
                        "recipeName": "verticallist",
                        "children": [
                            {
                                "recipeName": "label",
                                "text": "Which service would you like to launch when you press the Red Button?"
                            }
                        ],
                        "crazy":"daisy"
                    }
                };

                var schemaTestResult = validator.validate(jTalSample, jTalSchema);

                expect(schemaTestResult).toBeFalsy();
            });
        });
    }
);