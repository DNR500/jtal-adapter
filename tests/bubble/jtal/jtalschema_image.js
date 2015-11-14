require(
    [
        "cheesecake/cheesecakefactory",
        "jtal/jtaladapter",
        "antie/widgets/image"
    ],
    function(cheesecakeFactory, jTalAdapter, Image) {
        'use strict';

        function reportSchemaErrors(validator){
            var errors = validator.getLastErrors();
            errors.forEach(function(listItem){
                console.error("Schema error:", listItem.code, listItem.message, listItem.path);
            })
        }

        describe("image recipe", function() {
            var validatorOptions = {
                noEmptyArrays: true,
                noEmptyStrings: true
            };
            var validator = new ZSchema(validatorOptions);
            jTalAdapter.configureFactory(cheesecakeFactory);


            it("should create a image with expected id, source and css classes correctly populated", function() {
                var jTalSample = {
                    "cheesecake":
                    {
                        "id": "title",
                        "recipeName": "image",
                        "source": "../path/to/image.jpg",
                        "cssClasses": [
                            "title","mainContainer"
                        ]
                    }
                };

                var schemaTestResult = validator.validate(jTalSample, jTalSchema);
                if(!schemaTestResult){
                    reportSchemaErrors(validator);
                }
                expect(schemaTestResult).toBeTruthy();

                var talWidget = cheesecakeFactory.createCheeseCake(jTalSample);

                expect(talWidget instanceof Image).toBeTruthy();
                expect(talWidget.hasClass("title")).toBeTruthy();
                expect(talWidget.hasClass("mainContainer")).toBeTruthy();
                expect(talWidget.id).toEqual("title");
                expect(talWidget.getSrc()).toEqual("../path/to/image.jpg");
            });

            it("should create a image with source and recipeName", function() {
                var jTalSample = {
                    "cheesecake":
                    {
                        "recipeName": "image",
                        "source": "../path/to/image.jpg"
                    }
                };

                var schemaTestResult = validator.validate(jTalSample, jTalSchema);
                if(!schemaTestResult){
                    reportSchemaErrors(validator);
                }
                expect(schemaTestResult).toBeTruthy();

                var talWidget = cheesecakeFactory.createCheeseCake(jTalSample);

                expect(talWidget instanceof Image).toBeTruthy();
                expect(talWidget.getSrc()).toEqual("../path/to/image.jpg");
            });

            it("should error if source is missing", function(done) {
                var jTalSample = {
                    "cheesecake":
                    {
                        "recipeName": "image"
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
                    "cheesecake":
                    {
                        "recipeName": "image",
                        "source": "../path/to/image.jpg",
                        "glug":"bloop"
                    }
                };

                var schemaTestResult = validator.validate(jTalSample, jTalSchema);

                expect(schemaTestResult).toBeFalsy();
            });
        });
    }
);