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

        describe("launch application action", function() {
            var validatorOptions = {
                noEmptyArrays: true,
                noEmptyStrings: true
            };
            var validator = new ZSchema(validatorOptions);
            jTalAdapter.configureFactory(cheesecakeFactory);

            it("should call the launch application function with a full set of params", function() {
                var mockApplication = { launchAppFromURL: function () {} };
                spyOn(Application, "getCurrentApplication").and.returnValue(mockApplication);
                spyOn(mockApplication, "launchAppFromURL");

                var jTalSample = {
                    "cheesecake": {
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
                };

                var schemaTestResult = validator.validate(jTalSample, jTalSchema);
                if(!schemaTestResult){
                    reportSchemaErrors(validator);
                }
                expect(schemaTestResult).toBeTruthy();

                var talWidget = cheesecakeFactory.createCheeseCake(jTalSample);

                talWidget.fireEvent(new Event("select"));

                expect(mockApplication.launchAppFromURL.calls.mostRecent().args[0]).toEqual("http://www.google.com/");
                expect(mockApplication.launchAppFromURL.calls.mostRecent().args[1]).toEqual({ querystringparam1:"value_1", querystringparam2:"value_2" });
                expect(mockApplication.launchAppFromURL.calls.mostRecent().args[2]).toEqual(["some", "route"]);
                expect(mockApplication.launchAppFromURL.calls.mostRecent().args[3]).toBeTruthy();
            });

            it("should call the launch application function with only basic requirements for parameters", function() {
                var mockApplication = { launchAppFromURL: function () {} };
                spyOn(Application, "getCurrentApplication").and.returnValue(mockApplication);
                spyOn(mockApplication, "launchAppFromURL");


                var jTalSample = {
                    "cheesecake": {
                        "recipeName": "button",
                        "actions": [
                            {
                                "eventType": "select",
                                "command": "launchApp",
                                "parameters": {
                                    "url":"http://www.google.com/"
                                }
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

                expect(mockApplication.launchAppFromURL.calls.mostRecent().args[0]).toEqual("http://www.google.com/");
                expect(mockApplication.launchAppFromURL.calls.mostRecent().args[1]).toBeUndefined();
                expect(mockApplication.launchAppFromURL.calls.mostRecent().args[2]).toBeUndefined();
                expect(mockApplication.launchAppFromURL.calls.mostRecent().args[3]).toBeFalsy();
            });

            it("should fail schema validation when additional properties are added", function() {
                var jTalSample = {
                    "cheesecake": {
                        "recipeName": "button",
                        "actions": [
                            {
                                "eventType": "select",
                                "command": "launchApp",
                                "parameters": {
                                    "url":"http://www.google.com/",
                                },
                                "hello":"betty"
                            }
                        ]
                    }
                };
                var schemaTestResult = validator.validate(jTalSample, jTalSchema);
                expect(schemaTestResult).toBeFalsy();
            });

            it("should fail schema validation when additional properties are added to paramters", function() {
                var jTalSample = {
                    "cheesecake": {
                        "recipeName": "button",
                        "actions": [
                            {
                                "eventType": "select",
                                "command": "launchApp",
                                "parameters": {
                                    "url":"http://www.google.com/",
                                    "hello":"betty"
                                }
                            }
                        ]
                    }
                };
                var schemaTestResult = validator.validate(jTalSample, jTalSchema);
                expect(schemaTestResult).toBeFalsy();
            });
        });
    }
);