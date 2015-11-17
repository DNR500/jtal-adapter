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

        describe("push component action", function() {
            var validatorOptions = {
                noEmptyArrays: true,
                noEmptyStrings: true
            };
            var validator = new ZSchema(validatorOptions);
            jTalAdapter.configureFactory(cheesecakeFactory);

            it("should call the push component function with a full set of params", function() {
                var mockApplication = { pushComponent: function () {} };
                spyOn(Application, "getCurrentApplication").and.returnValue(mockApplication);
                spyOn(mockApplication, "pushComponent");

                var jTalSample = {
                    "cheesecake": {
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
                };

                var schemaTestResult = validator.validate(jTalSample, jTalSchema);
                if(!schemaTestResult){
                    reportSchemaErrors(validator);
                }
                expect(schemaTestResult).toBeTruthy();

                var talWidget = cheesecakeFactory.createCheeseCake(jTalSample);

                talWidget.fireEvent(new Event("select"));

                expect(mockApplication.pushComponent).toHaveBeenCalled();
                expect(mockApplication.pushComponent.calls.mostRecent().args[0]).toEqual("http://www.google.com/");
                expect(mockApplication.pushComponent.calls.mostRecent().args[1]).toEqual("module/to/load");
                expect(mockApplication.pushComponent.calls.mostRecent().args[2]).toEqual({ param1:"value_1", param2:"value_2" });
            });

            it("should call the push component function with the minimum set of params", function() {
                var mockApplication = { pushComponent: function () {} };
                spyOn(Application, "getCurrentApplication").and.returnValue(mockApplication);
                spyOn(mockApplication, "pushComponent");

                var jTalSample = {
                    "cheesecake": {
                        "recipeName": "button",
                        "actions": [
                            {
                                "eventType": "select",
                                "command": "pushComponent",
                                "parameters": {
                                    "id":"http://www.google.com/",
                                    "modules":"module/to/load"
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

                expect(mockApplication.pushComponent).toHaveBeenCalled();
                expect(mockApplication.pushComponent.calls.mostRecent().args[0]).toEqual("http://www.google.com/");
                expect(mockApplication.pushComponent.calls.mostRecent().args[1]).toEqual("module/to/load");
                expect(mockApplication.pushComponent.calls.mostRecent().args[2]).toBeUndefined();
            });

            it("should error when modules is missing", function(done) {
                var jTalSample = {
                    "cheesecake": {
                        "recipeName": "button",
                        "actions": [
                            {
                                "eventType": "select",
                                "command": "pushComponent",
                                "parameters": {
                                    "id":"http://www.google.com/"
                                }
                            }
                        ]
                    }
                };

                var schemaTestResult = validator.validate(jTalSample, jTalSchema);
                expect(schemaTestResult).toBeFalsy();

                try {
                    cheesecakeFactory.createCheeseCake(jTalSample);
                } catch (err) {
                    expect(err).toBeTruthy();
                    done();
                }
            });

            it("should fail schema validation when additional property is added to action", function() {
                var jTalSample = {
                    "cheesecake": {
                        "recipeName": "button",
                        "actions": [
                            {
                                "eventType": "select",
                                "command": "pushComponent",
                                "parameters": {
                                    "id":"something",
                                    "modules":"some/module"
                                },
                                "hello":"betty"
                            }
                        ]
                    }
                };

                var schemaTestResult = validator.validate(jTalSample, jTalSchema);
                expect(schemaTestResult).toBeFalsy();
            });

            it("should fail schema validation when additional property is added to parameters", function() {
                var jTalSample = {
                    "cheesecake": {
                        "recipeName": "button",
                        "actions": [
                            {
                                "eventType": "select",
                                "command": "pushComponent",
                                "parameters": {
                                    "id":"something",
                                    "modules":"some/module",
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