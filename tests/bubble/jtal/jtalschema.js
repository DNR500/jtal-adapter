require(
    [
        "cheesecake/cheesecakefactory",
        "jtal/jtaladapter"
    ],
    function(cheesecakeFactory, jTalAdapter) {
        'use strict';

        function reportSchemaErrors(validator){
            var errors = validator.getLastErrors();
            errors.forEach(function(listItem){
                console.error("Schema error:", listItem.code, listItem.message, listItem.path);
            })
        }

        describe("jTal schema and adapter", function() {
            var validatorOptions = {
                noEmptyArrays: true,
                noEmptyStrings: true
            };
            var validator = new ZSchema(validatorOptions);
            jTalAdapter.configureFactory(cheesecakeFactory);


            it("should error if the recipeName is missing even if text is present", function(done) {
                var jTalSample = {
                    "cheesecake":
                    {
                        "text": "Settings"
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

            it("should error if the recipeName is missing even if children are present", function(done) {
                var jTalSample = {
                    "cheesecake": {
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

                expect(schemaTestResult).toBeFalsy();

                try{
                    cheesecakeFactory.createCheeseCake(jTalSample);
                } catch (err) {
                    expect(err).toBeTruthy();
                    done();
                }
            });

            it("should error if the recipeName is missing even if source is present", function(done) {
                var jTalSample = {
                    "cheesecake":
                    {
                        "source": "../path/to/image.jpg"
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
        });
    }
);