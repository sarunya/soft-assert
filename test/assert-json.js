const jsonAssertion = require("./../index")
const _ = require("lodash");
const { AssertionError } = require("chai");


let arr = [1, 2];


describe("test", function () {
    before(function () {
    })

    let json = {
        "glossary": {
            "title": "example glossary",
            "GlossDiv": {
                "title": "S",
                "GlossList": {
                    "GlossEntry": {
                        "ID": "SGML",
                        "SortAs": "SGML",
                        "GlossTerm": "Standard Generalized Markup Language",
                        "Acronym": "SGML",
                        "Abbrev": "ISO 8879:1986",
                        "GlossDef": {
                            "para": "A meta-markup language, used to create markup languages such as DocBook.",
                            "GlossSeeAlso": ["GML", "XML"]
                        },
                        "GlossSee": "markup"
                    }
                }
            }
        }
    };

    it('deep assert json array test', function() {
        let actual = [
            {
                "name": "name1",
                "value": "value1"
            },
            {
                "name": "name4",
                "value": "value14"
            },
            {
                "name": "name2",
                "value": "value2"
            },
            {
                "name": "name13",
                "value": "value3"
            }
        ];
        let expected = [
            {
                "name": "name1",
                "value": "value1"
            },
            {
                "name": "name2",
                "value": "value2"
            },
            {
                "name": "name13",
                "value": "value3"
            },
            {
                "name": "name4",
                "value": "value14"
            }
        ];
        jsonAssertion.deepAssertJsonArray(actual, expected, ["value", "name"], "not equal");
    })
    
    it("deepAssert test", function() {
        let actual = _.cloneDeep(json);
        let expected = _.cloneDeep(json);
        jsonAssertion.deepAssert(actual, expected, "assertion error for deepAssert1");
        expected.glossary.GlossDiv.GlossList2 = "something";
        jsonAssertion.deepAssert(actual, expected, "assertion error for deepAssert2", ["GlossList2"]);
        expected.glossary.GlossDiv.GlossList.GlossEntry.GlossDef.GlossSeeAlso = ["some2"];
        delete expected.glossary.GlossDiv.GlossList.GlossEntry.GlossDef.para;
        jsonAssertion.deepAssert(actual, expected, "assertion error for deepAssert3");
    })

    it("softAssert test", function() {
        let actual = _.cloneDeep(json);
        let expected = _.cloneDeep(json);
        jsonAssertion.softAssert(actual, expected, "assertion error for softAssert 1");
        expected.glossary.GlossDiv.GlossList2 = "something";
        jsonAssertion.softAssert(actual, expected, "assertion error for softAssert 2", ["GlossList2"]);
        expected.glossary.GlossDiv.GlossList.GlossEntry.GlossDef.GlossSeeAlso = ["some2"];
        delete expected.glossary.GlossDiv.GlossList.GlossEntry.GlossDef.para;
        jsonAssertion.softAssert(actual, expected, "assertion error for softAssert 3");
        jsonAssertion.softAssert(actual, expected, "assertion error for softAssert 4");
        jsonAssertion.softAssertAll();
    })

    it("deepContains test", function() {
        let actual = _.cloneDeep(json);
        let expected = _.cloneDeep(json);
        delete expected.glossary.GlossDiv.GlossList.GlossEntry.GlossDef.para;
        jsonAssertion.deepContains(actual, expected, "assertion error for deepAssert1");
        expected.glossary.GlossDiv.GlossList2 = "something";
        jsonAssertion.deepContains(actual, expected, "assertion error for deepAssert2", ["GlossList2"]);
        expected.glossary.GlossDiv.GlossList.GlossEntry.GlossDef.GlossSeeAlso[1] = "some2";
        jsonAssertion.deepContains(actual, expected, "assertion error for deepAssert3");
    })
  
    it("deepAssertKey test", function() {
        let actual = _.cloneDeep(json);
        let expected = _.cloneDeep(json);
        expected.glossary.GlossDiv.GlossList.GlossEntry.GlossDef.GlossSeeAlso[1] = "some2";
        jsonAssertion.deepAssertKey(actual, expected.glossary.GlossDiv.GlossList, "glossary.GlossDiv.GlossList", "assertion error for deepAssertKey 1", ["GlossSeeAlso"]);
        delete expected.glossary.GlossDiv.GlossList.GlossEntry.GlossDef.para;
        jsonAssertion.deepAssertKey(actual, expected.glossary.GlossDiv.GlossList.GlossEntry.GlossDef.para, "glossary.GlossDiv.GlossList.GlossEntry.GlossDef.para", "assertion error for deepAssertKey 2");
    })

    it("deepContainstKey test", function() {
        let actual = _.cloneDeep(json);
        let expected = _.cloneDeep(json);
        expected.glossary.GlossDiv.GlossList.GlossEntry.GlossDef.GlossSeeAlso[1] = "some2";
        jsonAssertion.deepContainstKey(actual, expected.glossary.GlossDiv.GlossList, "glossary.GlossDiv.GlossList", "assertion error for deepAssertKey 1", ["GlossSeeAlso"]);
        delete expected.glossary.GlossDiv.GlossList.GlossEntry.GlossDef.para;
        jsonAssertion.deepContainstKey(actual, expected.glossary.GlossDiv.GlossList.GlossEntry.GlossDef.para, "glossary.GlossDiv.GlossList.GlossEntry.GlossDef.para", "assertion error for deepAssertKey 2");
    })

    it("assert json", ()=> {
        //jsonAssertion.deepAssertType([1,2,3, 5], [1,2,3, 4],"not equal");
        jsonAssertion.deepAssertType([1,2,3, 5], "<array>","not equal");
        jsonAssertion.deepAssertType(1, "<number>","not equal");
        jsonAssertion.deepAssertType("", "<string>","not equal");
        jsonAssertion.deepAssertType({}, "<json>","not equal");
        jsonAssertion.deepAssertType({a:1}, {a:"<number>"},"not equal");
        jsonAssertion.deepAssertType([{a:1, b:[]}, {}], [{a:"<number>", b:"<array>"}, "<json>"],"not equal");
        jsonAssertion.deepAssertType([{a:1, b:[]}, {}], [{a:"<number>", b:"<array>"}, "<json>"],"not equal");
    })

    it("softContainsKey test", function() {
        let actual = _.cloneDeep(json);
        let expected = _.cloneDeep(json);
        expected.glossary.GlossDiv.GlossList.GlossEntry.GlossDef.GlossSeeAlso[1] = "some2";
        jsonAssertion.softContainsKey(actual, expected.glossary.GlossDiv.GlossList, "glossary.GlossDiv.GlossList", "assertion error for deepAssertKey 1", ["GlossSeeAlso"]);
        delete expected.glossary.GlossDiv.GlossList.GlossEntry.GlossDef;
        jsonAssertion.softContainsKey(actual, expected.glossary.GlossDiv.GlossList.GlossEntry.GlossDef, "glossary.GlossDiv.GlossList.GlossEntry.GlossDef.para", "assertion error for deepAssertKey 2");
        jsonAssertion.softContainsKey(actual, expected.glossary.GlossDiv.GlossList.GlossEntry.GlossDef, "glossary.GlossDiv.GlossList.GlossEntry.GlossDef", "assertion error for deepAssertKey 3");
        jsonAssertion.softAssertAll();
    })

    it("softContains test", function() {
        let actual = _.cloneDeep(json);
        let expected = _.cloneDeep(json);
        delete expected.glossary.GlossDiv.GlossList.GlossEntry.GlossDef.para;
        jsonAssertion.softContains(actual, expected, "assertion error for deepAssert1");
        expected.glossary.GlossDiv.GlossList.GlossEntry.GlossDef.GlossSeeAlso[1] = "some2";
        jsonAssertion.softContains(actual, expected, "assertion error for deepAssert3");
        expected.glossary.GlossDiv.GlossList2 = "something";
        expected.glossary.GlossDiv.GlossList.GlossEntry.GlossDef.GlossSeeAlso[1] = "XML";
        jsonAssertion.softContains(actual, expected, "assertion error for deepAssert2", ["GlossList2"]);
        jsonAssertion.softAssertAll();
    })
    
    it('softContainsJsonArray test', function() {
        let actual = [
            {
                "name": "name1",
                "value": "value1"
            },
            {
                "name": "name4",
                "value": "value14"
            },
            {
                "name": "name2",
                "value": "value2"
            },
            {
                "name": "name13",
                "value": "value3"
            }
        ];
        let expected = [
            {
                "name": "name1",
                "value": "value1"
            },
            {
                "name": "name2",
                "value": "value2"
            },
            {
                "name": "name13",
                "value": "value3"
            },
            {
                "name": "name4",
                "value": "value14"
            }
        ];
        jsonAssertion.softContainsJsonArray(actual, expected, ["value", "name"], "not equal");
        jsonAssertion.softContains(actual, expected, "not equal by soft contains - failure");
        expected[1].value="Saru2";
        jsonAssertion.softContainsJsonArray(actual, expected, ["value", "name"], "not equal");
        jsonAssertion.softContains(actual, expected, "not equal by soft contains");
        jsonAssertion.softAssertAll();
    })

    describe("Assert string", () => {
        it("deep assert success", () => {
            jsonAssertion.deepAssert("Saru", "Saru");
        })
        it("deep assert Failures", () => {
            let error;
            try {
                jsonAssertion.deepAssert("Saru", " Saru ");
            } catch (err) {
                error = err.toString();
            }
            jsonAssertion.deepAssert(error, "AssertionError: \n\t1 : key -> $ \t\t message: expected \'Saru\' to deeply equal \' Saru \'\n");
        })
        it("deep contains success", () => {
            jsonAssertion.deepContains("$ Saru #", "Saru");
        })
        it("deep contains failure", () => {
            let err;
            try {
                jsonAssertion.deepContains("$ saru #", "Saru");
            } catch (error) {
                err = error.toString();
            }
            jsonAssertion.deepAssert(err, "AssertionError: \n\t1 : key -> $ \t\t message: expected \'$ saru #\' to deeply equal \'Saru\'\n");
        })
        it("deep contains success in json", () => {
            let data = {"key1": "saru", "key2": "renu2 saran"}
            let data2 = {"key1": "saru", "key2": ".*saran$"}
            jsonAssertion.deepContains(data, data2);
        })
        it("deep contains failure in json", () => {
            let err;
            try {
                let data = {"key1": "saru", "key2": "renu2 saran"}
                let data2 = {"key1": "saru", "key2": ".*sara$"}
                jsonAssertion.deepContains(data, data2);
                
            } catch (error) {
                err = JSON.stringify(error.message);
            }
            jsonAssertion.deepAssert(err, '"Contains assertion comparison failed for following keys in given json: \\n\\tkey2\\n\\t1 : key -> $.key2 \\t\\t message: expected \'renu2 saran\' to deeply equal \'.*sara$\'\\n"');
        })
        it("deep contains check regex in json", () => {
            jsonAssertion.deepContains("BNZAA2318J", "[A-Z]{5}[0-9]{4}[A-Z]{1}");
        })
        it("deep contains check regex in json", () => {
            let err;
            try {
                jsonAssertion.deepContains("BNZAA23189", "[A-Z]{5}[0-9]{4}[A-Z]{1}");
            } catch (error) {
              err = JSON.stringify(error.message);
            }
            jsonAssertion.deepAssert(err, '"\\n\\t1 : key -> $ \\t\\t message: expected \'BNZAA23189\' to deeply equal \'[A-Z]{5}[0-9]{4}[A-Z]{1}\'\\n"');
        })
        it("soft contains check regex in json", () => {
            let err;
            try {
                jsonAssertion.softContains("BNZAA2318A", "[A-Z]{5}[0-9]{4}[A-Z]{1}");
                jsonAssertion.softContains("BNZAA23189", "[A-Z]{5}[0-9]{4}[A-Z]{1}");
                jsonAssertion.softContains("BNZAA2318C", "[A-Z]{5}[0-9]{4}[A-Z]{1}");
                jsonAssertion.softContains("BNZAA23180", "[A-Z]{5}[0-9]{4}[A-Z]{1}");
                jsonAssertion.softContains("saru is good", "\w is bad");
                jsonAssertion.softContains("saru is good", "\w is good");
                jsonAssertion.softContains("saru_1 is good", "\w_\d is good");
                jsonAssertion.softAssertAll();
            } catch (error) {
              err = error.toString();
            }
            jsonAssertion.deepContains(err, "message: expected 'BNZAA23189' to deeply equal '[A-Z]{5}[0-9]{4}[A-Z]{1}'");
            jsonAssertion.deepContains(err, "message: expected 'BNZAA23180' to deeply equal '[A-Z]{5}[0-9]{4}[A-Z]{1}'");
            jsonAssertion.deepContains(err, "message: expected 'saru is good' to deeply equal '\w is bad'");
        })
        it("deep contains check regex in array", () => {
            jsonAssertion.deepContainsJsonArray([{"id":1, "key": "key_saru1"}, {"id":2, "key": "key_saru2"}], [{"id":1, "key": 'key_\\w+\\d'}, {"id":2, "key": 'key_\\w+\\d'}]);
        })
        it("deep contains check regex in array", () => {
            let err;
            try {
                jsonAssertion.deepContainsJsonArray([{"id":1, "key": "key_saru1"}, {"id":2, "key": "key_saru"}], [{"id":1, "key": 'key_\\w+\\d'}, {"id":2, "key": 'key_\\w+\\d'}]);
            } catch (error) {
                err = JSON.stringify(error.message);
            }
            jsonAssertion.deepAssert(err, '"Contains assertion comparison failed for following keys in given json: \\n\\t0\\n\\t1 : key -> $.0.key \\t\\t message: expected \'key_saru\' to deeply equal \'key_\\\\\\\\w+\\\\\\\\d\'\\n"');
        })
    })
})