const jsonAssertion = require("./../index")
const _ = require("lodash");


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
        console.log(JSON.stringify(expected))
        jsonAssertion.softContainsJsonArray(actual, expected, ["value", "name"], "not equal");
        jsonAssertion.softContains(actual, expected, "not equal by soft contains - failure");
        expected[1].value="Saru2";
        jsonAssertion.softContainsJsonArray(actual, expected, ["value", "name"], "not equal");
        jsonAssertion.softContains(actual, expected, "not equal by soft contains");
        jsonAssertion.softAssertAll();
    })
})