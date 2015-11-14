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

        describe("textbutton recipe", function() {
            var validatorOptions = {
                noEmptyArrays: true,
                noEmptyStrings: true
            };
            var validator = new ZSchema(validatorOptions);
            jTalAdapter.configureFactory(cheesecakeFactory);


            it("should create a textbutton with expected id, label and css classes correctly populated", function() {
                var jTalSample = {
                    "cheesecake": {
                        "id": "bigButton",
                        "recipeName": "textbutton",
                        "text": "Cancel",
                        "cssClasses": [
                            "wide-button"
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
                expect(talWidget.hasClass("wide-button")).toBeTruthy();
                expect(talWidget.id).toEqual("bigButton");
                var buttonLabel = talWidget.getChildWidgets()[0];
                expect(buttonLabel instanceof Label).toBeTruthy();
                expect(buttonLabel.getText()).toEqual("Cancel");
            });

            it("should create a textbutton with only the recipeName and text", function() {
                var jTalSample = {
                    "cheesecake": {
                        "recipeName": "textbutton",
                        "text": "Cancel"
                    }
                };

                var schemaTestResult = validator.validate(jTalSample, jTalSchema);
                if(!schemaTestResult){
                    reportSchemaErrors(validator);
                }
                expect(schemaTestResult).toBeTruthy();

                var talWidget = cheesecakeFactory.createCheeseCake(jTalSample);

                expect(talWidget instanceof Button).toBeTruthy();
                var buttonLabel = talWidget.getChildWidgets()[0];
                expect(buttonLabel instanceof Label).toBeTruthy();
                expect(buttonLabel.getText()).toEqual("Cancel");
            });

            it("should error if text is missing", function(done) {
                var jTalSample = {
                    "cheesecake": {
                        "recipeName": "textbutton"
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
                        "recipeName": "textbutton",
                        "text": "Cancel",
                        "hello": "teddy"
                    }
                };

                var schemaTestResult = validator.validate(jTalSample, jTalSchema);

                expect(schemaTestResult).toBeFalsy();
            });
        });
    }
);