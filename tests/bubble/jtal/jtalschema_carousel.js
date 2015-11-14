require(
    [
        "cheesecake/cheesecakefactory",
        "jtal/jtaladapter",
        "antie/widgets/carousel",
        "antie/widgets/label",
        "antie/runtimecontext"
    ],
    function(cheesecakeFactory, jTalAdapter, Carousel, Label, RuntimeContext) {
        'use strict';

        function reportSchemaErrors(validator){
            var errors = validator.getLastErrors();
            errors.forEach(function(listItem){
                console.error("Schema error:", listItem.code, listItem.message, listItem.path);
            })
        }

        describe("carousel recipe", function() {
            var validatorOptions = {
                noEmptyArrays: true,
                noEmptyStrings: true
            };
            var validator = new ZSchema(validatorOptions);
            jTalAdapter.configureFactory(cheesecakeFactory);

            beforeEach(function() {
                var application = {
                    getDevice : function() {

                    }
                };
                spyOn(application, "getDevice").and.returnValue({});
                spyOn(RuntimeContext, "getCurrentApplication").and.returnValue(application);
            });

            it("should create a carousel with expected id, horizontal orientation, children and css classes correctly populated", function() {
                var jTalSample = {
                    "cheesecake":
                    {
                        "id": "slideshow",
                        "recipeName": "carousel",
                        "orientation": "horizontal",
                        "cssClasses": [
                            "title","mainContainer"
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

                expect(talWidget instanceof Carousel).toBeTruthy();
                expect(talWidget.orientation()).toBe(Carousel.orientations.HORIZONTAL);
                expect(talWidget.hasClass("title")).toBeTruthy();
                expect(talWidget.hasClass("mainContainer")).toBeTruthy();
                expect(talWidget.id).toEqual("slideshow");

                expect(talWidget.getChildWidgets()[0] instanceof Label).toBeTruthy();
            });

            it("should create a carousel with expected id, vertical orientation, children and css classes correctly populated", function() {
                var jTalSample = {
                    "cheesecake":
                    {
                        "id": "slideshow",
                        "recipeName": "carousel",
                        "orientation": "vertical",
                        "cssClasses": [
                            "title","mainContainer"
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

                expect(talWidget instanceof Carousel).toBeTruthy();
                expect(talWidget.orientation()).toBe(Carousel.orientations.VERTICAL);
                expect(talWidget.hasClass("title")).toBeTruthy();
                expect(talWidget.hasClass("mainContainer")).toBeTruthy();
                expect(talWidget.id).toEqual("slideshow");

                expect(talWidget.getChildWidgets()[0] instanceof Label).toBeTruthy();
            });

            it("should create a carousel with only recipeName and childrec, vertical orientation is set as default", function() {
                var jTalSample = {
                    "cheesecake":
                    {
                        "recipeName": "carousel",
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

                expect(talWidget instanceof Carousel).toBeTruthy();
                expect(talWidget.orientation()).toBe(Carousel.orientations.VERTICAL);

                expect(talWidget.getChildWidgets()[0] instanceof Label).toBeTruthy();
            });

            it("should error if children are missing", function(done) {
                var jTalSample = {
                    "cheesecake":
                    {
                        "recipeName": "carousel"
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

            it("should fail schema validation when additional properties are added", function() {
                var jTalSample = {
                    "cheesecake":
                    {
                        "recipeName": "carousel",
                        "children": [
                            {
                                "recipeName": "label",
                                "text": "Are you sure?"
                            }
                        ],
                        "hello":"betty"
                    }
                };

                var schemaTestResult = validator.validate(jTalSample, jTalSchema);

                expect(schemaTestResult).toBeFalsy();
            });

        });
    }
);