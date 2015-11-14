require(
    [
        "cheesecake/cheesecakefactory",
        "jtal/jtaladapter",
        "antie/widgets/label"
    ],
    function(cheesecakeFactory, jTalAdapter, Label) {
        'use strict';

        function reportSchemaErrors(validator){
            var errors = validator.getLastErrors();
            errors.forEach(function(listItem){
                console.error("Schema error:", listItem.code, listItem.message, listItem.path);
            })
        }

        describe("label recipe", function() {
            var validatorOptions = {
                noEmptyArrays: true,
                noEmptyStrings: true
            };
            var validator = new ZSchema(validatorOptions);
            jTalAdapter.configureFactory(cheesecakeFactory);


            it("should create a label with expected id, text and css classes correctly populated", function() {
                var jTalSample = {
                    "cheesecake":
                    {
                        "id": "id",
                        "recipeName": "label",
                        "text": "Settings",
                        "cssClasses": [ "title","mainContainer"]
                    }
                };

                var schemaTestResult = validator.validate(jTalSample, jTalSchema);
                if(!schemaTestResult){
                    reportSchemaErrors(validator);
                }
                expect(schemaTestResult).toBeTruthy();

                var talWidget = cheesecakeFactory.createCheeseCake(jTalSample);

                expect(talWidget instanceof Label).toBeTruthy();
                expect(talWidget.hasClass("title")).toBeTruthy();
                expect(talWidget.hasClass("mainContainer")).toBeTruthy();
                expect(talWidget.id).toEqual("id");
                expect(talWidget.getText()).toEqual("Settings");
            });

            it("should create a label with expected text correctly populated", function() {
                var jTalSample = {
                    "cheesecake":
                    {
                        "recipeName": "label",
                        "text": "Settings"
                    }
                };

                var schemaTestResult = validator.validate(jTalSample, jTalSchema);
                if(!schemaTestResult){
                    reportSchemaErrors(validator);
                }
                expect(schemaTestResult).toBeTruthy();

                var talWidget = cheesecakeFactory.createCheeseCake(jTalSample);

                expect(talWidget instanceof Label).toBeTruthy();
                expect(talWidget.getText()).toEqual("Settings");
            });

            it("should error if text is missing", function(done) {
                var jTalSample = {
                    "cheesecake":
                    {
                        "recipeName": "label"
                    }
                };

                var schemaTestResult = validator.validate(jTalSample, jTalSchema);
                expect(schemaTestResult).toBeFalsy();

                try{
                    cheesecakeFactory.createCheeseCake(jTalSample);
                } catch(err) {
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