require(
    [
        "cheesecake/cheesecakefactory",
        "jtal/jtaladapter",
        "antie/events/event",
        "antie/application"
    ],
    function(cheesecakeFactory, jTalAdapter, Event, Application) {
        'use strict';

        function reportSchemaErrors(validator){
            var errors = validator.getLastErrors();
            errors.forEach(function(listItem){
                console.error("Schema error:", listItem.code, listItem.message, listItem.path);
            })
        }

        describe("exit application action", function() {
            var validatorOptions = {
                noEmptyArrays: true,
                noEmptyStrings: true
            };
            var validator = new ZSchema(validatorOptions);
            jTalAdapter.configureFactory(cheesecakeFactory);

            it("should call the exit application function ", function() {
                var mockApplication = {
                    exit: function () {
                    }
                };
                spyOn(Application, "getCurrentApplication").and.returnValue(mockApplication);
                spyOn(mockApplication, "exit");

                var jTalSample = {
                    "cheesecake": {
                        "recipeName": "button",
                        "actions": [
                            {
                                "eventType": "select",
                                "command": "exitApp"
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

                talWidget.fireEvent(new Event("select"));

                expect(mockApplication.exit).toHaveBeenCalled();
            });

            it("should fail schema validation when additional properties are added", function() {
                var jTalSample = {
                    "cheesecake": {
                        "recipeName": "button",
                        "actions": [
                            {
                                "eventType": "select",
                                "command": "exitApp",
                                "hello":"betty"
                            }
                        ],
                    }
                };

                var schemaTestResult = validator.validate(jTalSample, jTalSchema);

                expect(schemaTestResult).toBeFalsy();
            });
        });
    }
);